import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

async function requireAdmin() {
    const session = await getServerSession(authOptions);
    // @ts-ignore
    const role = session?.user?.role;
    if (!session || (role !== 'admin' && role !== 'sub-admin')) return null;
    return session;
}

const TYPE_FILTERS: Record<string, any> = {
    all: {},
    unread: { isRead: false },
    signup: { type: 'signup' },
    cert: { type: 'cert' },
    post: { type: { in: ['post', 'comment'] } },
    subscribe: { type: 'subscribe' },
    answer: { type: 'answer' },
};

export async function GET(req: NextRequest) {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 });

    try {
        const { searchParams } = new URL(req.url);
        const filter = searchParams.get('filter') || 'all';
        const where = TYPE_FILTERS[filter] ?? {};

        const [notifications, totalCount, unreadCount] = await Promise.all([
            prisma.notification.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                take: 200,
            }),
            prisma.notification.count(),
            prisma.notification.count({ where: { isRead: false } }),
        ]);

        return NextResponse.json({ notifications, totalCount, unreadCount });
    } catch (error) {
        console.error('GET /api/admin/notifications error:', error);
        return NextResponse.json({ error: '알림을 불러오지 못했습니다.' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 });

    try {
        const body = await req.json();
        const action = String(body.action || '');

        if (action === 'markAllRead') {
            const result = await prisma.notification.updateMany({
                where: { isRead: false },
                data: { isRead: true },
            });
            return NextResponse.json({ ok: true, updated: result.count });
        }

        if (action === 'markRead') {
            const id = String(body.id || '').trim();
            if (!id) return NextResponse.json({ error: 'id가 필요합니다.' }, { status: 400 });
            await prisma.notification.update({
                where: { id },
                data: { isRead: true },
            });
            return NextResponse.json({ ok: true });
        }

        return NextResponse.json({ error: '잘못된 action입니다.' }, { status: 400 });
    } catch (error) {
        console.error('PATCH /api/admin/notifications error:', error);
        return NextResponse.json({ error: '상태 변경에 실패했습니다.' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 });

    try {
        const body = await req.json().catch(() => ({}));
        const all = body.all === true;
        const id = typeof body.id === 'string' ? body.id.trim() : '';

        if (all) {
            const result = await prisma.notification.deleteMany({});
            return NextResponse.json({ ok: true, deleted: result.count });
        }

        if (id) {
            await prisma.notification.delete({ where: { id } });
            return NextResponse.json({ ok: true, deleted: 1 });
        }

        return NextResponse.json({ error: 'id 또는 all: true가 필요합니다.' }, { status: 400 });
    } catch (error) {
        console.error('DELETE /api/admin/notifications error:', error);
        return NextResponse.json({ error: '삭제에 실패했습니다.' }, { status: 500 });
    }
}
