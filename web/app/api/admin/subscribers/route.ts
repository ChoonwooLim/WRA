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

export async function GET(req: NextRequest) {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 });

    try {
        const { searchParams } = new URL(req.url);
        const search = (searchParams.get('search') || '').trim().toLowerCase();
        const status = searchParams.get('status') || 'all'; // all | active | unsubscribed

        const where: any = {};
        if (search) where.email = { contains: search, mode: 'insensitive' };
        if (status === 'active') where.unsubscribedAt = null;
        if (status === 'unsubscribed') where.unsubscribedAt = { not: null };

        const [subscribers, activeCount, unsubscribedCount] = await Promise.all([
            prisma.subscriber.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    email: true,
                    consent: true,
                    createdAt: true,
                    unsubscribedAt: true,
                },
            }),
            prisma.subscriber.count({ where: { unsubscribedAt: null } }),
            prisma.subscriber.count({ where: { unsubscribedAt: { not: null } } }),
        ]);

        return NextResponse.json({ subscribers, activeCount, unsubscribedCount });
    } catch (error) {
        console.error('GET /api/admin/subscribers error:', error);
        return NextResponse.json({ error: '구독자 목록을 불러오지 못했습니다.' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 });

    try {
        const body = await req.json();
        const ids = Array.isArray(body.ids) ? body.ids.filter((x: unknown) => typeof x === 'string') : [];
        if (ids.length === 0) {
            return NextResponse.json({ error: '삭제할 구독자를 선택해주세요.' }, { status: 400 });
        }
        const result = await prisma.subscriber.deleteMany({ where: { id: { in: ids } } });
        return NextResponse.json({ ok: true, deleted: result.count });
    } catch (error) {
        console.error('DELETE /api/admin/subscribers error:', error);
        return NextResponse.json({ error: '삭제에 실패했습니다.' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 });

    try {
        const body = await req.json();
        const id = String(body.id || '').trim();
        const action = String(body.action || '').trim(); // 'unsubscribe' | 'resubscribe'
        if (!id || !['unsubscribe', 'resubscribe'].includes(action)) {
            return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
        }
        const updated = await prisma.subscriber.update({
            where: { id },
            data: { unsubscribedAt: action === 'unsubscribe' ? new Date() : null },
        });
        return NextResponse.json({ ok: true, subscriber: updated });
    } catch (error) {
        console.error('PATCH /api/admin/subscribers error:', error);
        return NextResponse.json({ error: '상태 변경에 실패했습니다.' }, { status: 500 });
    }
}
