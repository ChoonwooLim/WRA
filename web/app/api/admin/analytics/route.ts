import { NextResponse } from 'next/server';
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

function monthStart(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), 1);
}

function pctChange(now: number, prev: number): number | null {
    if (prev === 0) return now === 0 ? 0 : null;
    return ((now - prev) / prev) * 100;
}

const BOARD_LABEL: Record<string, string> = {
    notices: '공지사항',
    qna: 'Q&A',
    'free-board': '자유게시판',
    newsletter: '뉴스레터',
};

export async function GET() {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 });

    try {
        const now = new Date();
        const thisMonth = monthStart(now);
        const lastMonth = new Date(thisMonth.getFullYear(), thisMonth.getMonth() - 1, 1);

        // Last 6 months window — start of 5 months ago
        const sixMonthsStart = new Date(thisMonth.getFullYear(), thisMonth.getMonth() - 5, 1);

        const [
            totalUsers,
            totalPosts,
            totalSubscribers,
            totalActiveSubscribers,
            totalNotifications,
            thisMonthSignups,
            lastMonthSignups,
            thisMonthPosts,
            lastMonthPosts,
            thisMonthSubs,
            lastMonthSubs,
            boardCounts,
            topPosts,
            recentNotifs,
            users6m,
            posts6m,
            subs6m,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.post.count(),
            prisma.subscriber.count(),
            prisma.subscriber.count({ where: { unsubscribedAt: null } }),
            prisma.notification.count(),
            prisma.user.count({ where: { createdAt: { gte: thisMonth } } }),
            prisma.user.count({ where: { createdAt: { gte: lastMonth, lt: thisMonth } } }),
            prisma.post.count({ where: { createdAt: { gte: thisMonth } } }),
            prisma.post.count({ where: { createdAt: { gte: lastMonth, lt: thisMonth } } }),
            prisma.subscriber.count({ where: { createdAt: { gte: thisMonth } } }),
            prisma.subscriber.count({ where: { createdAt: { gte: lastMonth, lt: thisMonth } } }),
            prisma.post.groupBy({ by: ['board'], _count: { _all: true } }),
            prisma.post.findMany({
                orderBy: { views: 'desc' },
                take: 5,
                select: { id: true, board: true, title: true, views: true, likes: true, createdAt: true },
            }),
            prisma.notification.findMany({
                orderBy: { createdAt: 'desc' },
                take: 10,
                select: { id: true, type: true, title: true, message: true, createdAt: true, isRead: true },
            }),
            prisma.user.findMany({
                where: { createdAt: { gte: sixMonthsStart } },
                select: { createdAt: true },
            }),
            prisma.post.findMany({
                where: { createdAt: { gte: sixMonthsStart } },
                select: { createdAt: true },
            }),
            prisma.subscriber.findMany({
                where: { createdAt: { gte: sixMonthsStart } },
                select: { createdAt: true },
            }),
        ]);

        // Build monthly series — 6 buckets
        const monthly: { month: string; key: string; signups: number; posts: number; subscribers: number }[] = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date(thisMonth.getFullYear(), thisMonth.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            monthly.push({
                month: `${d.getMonth() + 1}월`,
                key,
                signups: 0,
                posts: 0,
                subscribers: 0,
            });
        }
        const bucketOf = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const indexByKey = new Map(monthly.map((m, i) => [m.key, i]));
        for (const u of users6m) {
            const k = bucketOf(u.createdAt);
            const i = indexByKey.get(k); if (i !== undefined) monthly[i].signups++;
        }
        for (const p of posts6m) {
            const k = bucketOf(p.createdAt);
            const i = indexByKey.get(k); if (i !== undefined) monthly[i].posts++;
        }
        for (const s of subs6m) {
            const k = bucketOf(s.createdAt);
            const i = indexByKey.get(k); if (i !== undefined) monthly[i].subscribers++;
        }

        const boardDistribution = boardCounts.map((b) => ({
            board: b.board,
            label: BOARD_LABEL[b.board] || b.board,
            count: b._count._all,
        })).sort((a, b) => b.count - a.count);

        return NextResponse.json({
            overview: {
                totalUsers,
                totalPosts,
                totalSubscribers,
                activeSubscribers: totalActiveSubscribers,
                totalNotifications,
                thisMonth: {
                    signups: thisMonthSignups,
                    posts: thisMonthPosts,
                    subscribers: thisMonthSubs,
                },
                lastMonth: {
                    signups: lastMonthSignups,
                    posts: lastMonthPosts,
                    subscribers: lastMonthSubs,
                },
                change: {
                    signups: pctChange(thisMonthSignups, lastMonthSignups),
                    posts: pctChange(thisMonthPosts, lastMonthPosts),
                    subscribers: pctChange(thisMonthSubs, lastMonthSubs),
                },
            },
            monthly,
            boardDistribution,
            topPosts: topPosts.map((p) => ({
                ...p,
                boardLabel: BOARD_LABEL[p.board] || p.board,
            })),
            recentNotifications: recentNotifs,
            generatedAt: now.toISOString(),
        });
    } catch (error) {
        console.error('GET /api/admin/analytics error:', error);
        return NextResponse.json({ error: '통계를 불러오지 못했습니다.' }, { status: 500 });
    }
}
