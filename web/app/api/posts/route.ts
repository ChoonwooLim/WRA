import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// GET /api/posts?board=notices&search=xxx&page=1&limit=10
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const board = searchParams.get('board') || '';
        const search = searchParams.get('search') || '';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        const where: any = {};
        if (board) where.board = board;
        if (search) {
            where.title = { contains: search, mode: 'insensitive' };
        }

        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                include: {
                    author: {
                        select: { id: true, name: true, email: true, role: true }
                    }
                }
            }),
            prisma.post.count({ where })
        ]);

        return NextResponse.json({
            posts,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error('GET /api/posts error:', error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

// POST /api/posts — create new post
export async function POST(req: NextRequest) {
    try {
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

        const body = await req.json();
        const { board, title, content, category } = body;

        if (!board || !title || !content) {
            return NextResponse.json({ error: '제목과 내용을 모두 입력해주세요.' }, { status: 400 });
        }

        // Only admin or sub-admin can post to notices and newsletter
        if ((board === 'notices' || board === 'newsletter') && user.role !== 'admin' && user.role !== 'sub-admin') {
            return NextResponse.json({ error: '공지사항 및 뉴스레터는 관리자만 작성할 수 있습니다.' }, { status: 403 });
        }

        const post = await prisma.post.create({
            data: {
                board,
                title,
                content,
                category: category || null,
                authorId: user.id,
            },
            include: {
                author: {
                    select: { id: true, name: true, email: true, role: true }
                }
            }
        });

        return NextResponse.json({ post }, { status: 201 });
    } catch (error) {
        console.error('POST /api/posts error:', error);
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
