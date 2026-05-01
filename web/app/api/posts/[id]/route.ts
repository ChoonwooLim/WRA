import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { createNotification } from '@/lib/notifications';
import { Prisma } from '@prisma/client';

// GET /api/posts/[id] — get single post + increment views
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const post = await prisma.post.update({
            where: { id },
            data: { views: { increment: 1 } },
            include: {
                author: {
                    select: { id: true, name: true, email: true, role: true }
                },
                answerer: {
                    select: { id: true, name: true, email: true, role: true }
                }
            }
        });

        if (!post) {
            return NextResponse.json({ error: '게시글을 찾을 수 없습니다.' }, { status: 404 });
        }

        return NextResponse.json({ post });
    } catch (error) {
        console.error('GET /api/posts/[id] error:', error);
        return NextResponse.json({ error: '게시글을 찾을 수 없습니다.' }, { status: 404 });
    }
}

// PUT /api/posts/[id] — update post (author or admin only)
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });
        if (!user) {
            return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
        }

        const existingPost = await prisma.post.findUnique({ where: { id } });
        if (!existingPost) {
            return NextResponse.json({ error: '게시글을 찾을 수 없습니다.' }, { status: 404 });
        }

        // Only author or admin/sub-admin can update
        if (existingPost.authorId !== user.id && user.role !== 'admin' && user.role !== 'sub-admin') {
            return NextResponse.json({ error: '수정 권한이 없습니다.' }, { status: 403 });
        }

        const body = await req.json();
        const { title, content, category, answered, answerContent, attachments } = body;

        const isAdmin = user.role === 'admin' || user.role === 'sub-admin';

        const updateData: Prisma.PostUncheckedUpdateInput = {};
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (category !== undefined) updateData.category = category;
        if (answered !== undefined) updateData.answered = answered;
        if (attachments !== undefined) {
            const sanitized = Array.isArray(attachments)
                ? attachments
                    .filter((a) => a && typeof a.url === 'string' && typeof a.name === 'string')
                    .map((a) => ({
                        name: String(a.name).slice(0, 256),
                        url: String(a.url),
                        size: Number(a.size) || 0,
                        mimeType: typeof a.mimeType === 'string' ? a.mimeType : 'application/octet-stream',
                    }))
                    .slice(0, 20)
                : [];
            updateData.attachments = sanitized.length > 0 ? sanitized : Prisma.JsonNull;
        }

        // Answer handling — admin/sub-admin only, QnA only
        let answerChanged = false;
        if (answerContent !== undefined) {
            if (!isAdmin) {
                return NextResponse.json({ error: '답변 작성 권한이 없습니다.' }, { status: 403 });
            }
            if (existingPost.board !== 'qna') {
                return NextResponse.json({ error: 'Q&A 게시글만 답변할 수 있습니다.' }, { status: 400 });
            }
            const trimmed = String(answerContent).trim();
            if (trimmed === '') {
                // Clear answer
                updateData.answerContent = null;
                updateData.answererId = null;
                updateData.answeredAt = null;
                updateData.answered = false;
            } else {
                updateData.answerContent = trimmed;
                updateData.answererId = user.id;
                updateData.answeredAt = new Date();
                updateData.answered = true;
                answerChanged = !existingPost.answerContent || existingPost.answerContent !== trimmed;
            }
        }

        const post = await prisma.post.update({
            where: { id },
            data: updateData,
            include: {
                author: {
                    select: { id: true, name: true, email: true, role: true }
                },
                answerer: {
                    select: { id: true, name: true, email: true, role: true }
                }
            }
        });

        // Notification when a new/updated answer is posted
        if (answerChanged && updateData.answerContent) {
            await createNotification({
                type: 'answer',
                title: 'Q&A 답변 등록',
                message: post.title,
                detail: `답변자: ${user.name || user.email || '관리자'}`,
                actionLabel: '답변 보기',
                actionHref: `/community/post/${post.id}`,
            });
        }

        return NextResponse.json({ post });
    } catch (error) {
        console.error('PUT /api/posts/[id] error:', error);
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

// DELETE /api/posts/[id] — delete post (author or admin only)
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession();
        if (!session?.user?.email) {
            return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });
        if (!user) {
            return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
        }

        const existingPost = await prisma.post.findUnique({ where: { id } });
        if (!existingPost) {
            return NextResponse.json({ error: '게시글을 찾을 수 없습니다.' }, { status: 404 });
        }

        // Only author or admin/sub-admin can delete
        if (existingPost.authorId !== user.id && user.role !== 'admin' && user.role !== 'sub-admin') {
            return NextResponse.json({ error: '삭제 권한이 없습니다.' }, { status: 403 });
        }

        await prisma.post.delete({ where: { id } });

        return NextResponse.json({ message: '게시글이 삭제되었습니다.' });
    } catch (error) {
        console.error('DELETE /api/posts/[id] error:', error);
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
