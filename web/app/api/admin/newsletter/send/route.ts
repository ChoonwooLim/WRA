import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { sendNewsletterBatch } from '@/lib/email';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        // @ts-ignore
        const role = session?.user?.role;
        if (!session || (role !== 'admin' && role !== 'sub-admin')) {
            return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 });
        }

        const body = await req.json();
        const postId = String(body.postId || '').trim();
        if (!postId) {
            return NextResponse.json({ error: 'postId가 필요합니다.' }, { status: 400 });
        }

        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (!post) {
            return NextResponse.json({ error: '게시글을 찾을 수 없습니다.' }, { status: 404 });
        }
        if (post.board !== 'newsletter') {
            return NextResponse.json({ error: '뉴스레터 게시판의 글만 발송할 수 있습니다.' }, { status: 400 });
        }

        const subscribers = await prisma.subscriber.findMany({
            where: { unsubscribedAt: null, consent: true },
            select: { email: true, unsubscribeToken: true },
        });

        if (subscribers.length === 0) {
            return NextResponse.json({ ok: true, sent: 0, failed: 0, total: 0, message: '활성 구독자가 없습니다.' });
        }

        const result = await sendNewsletterBatch({
            title: post.title,
            content: post.content,
            subscribers,
            postId: post.id,
        });

        return NextResponse.json({ ok: true, total: subscribers.length, ...result });
    } catch (error) {
        console.error('POST /api/admin/newsletter/send error:', error);
        return NextResponse.json({ error: '뉴스레터 발송에 실패했습니다.' }, { status: 500 });
    }
}
