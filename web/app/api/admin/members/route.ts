import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const VALID_ROLES = ['admin', 'sub-admin', 'member', 'vip'] as const;

// GET /api/admin/members
export async function GET() {
    try {
        const members = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                image: true,
            },
        });
        return NextResponse.json({ members });
    } catch (error) {
        console.error('GET /api/admin/members error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch members' },
            { status: 500 }
        );
    }
}

// PATCH /api/admin/members — Update a member's role
export async function PATCH(req: NextRequest) {
    try {
        // Check that the requester is an admin
        const session = await getServerSession(authOptions);
        // @ts-ignore
        const requesterRole = session?.user?.role;

        if (!session || requesterRole !== 'admin') {
            return NextResponse.json(
                { error: '관리자 권한이 필요합니다.' },
                { status: 403 }
            );
        }

        const body = await req.json();
        const { userId, role } = body;

        if (!userId || !role) {
            return NextResponse.json(
                { error: 'userId와 role이 필요합니다.' },
                { status: 400 }
            );
        }

        if (!VALID_ROLES.includes(role)) {
            return NextResponse.json(
                { error: `유효하지 않은 역할입니다. 허용: ${VALID_ROLES.join(', ')}` },
                { status: 400 }
            );
        }

        // Prevent admin from changing their own role
        // @ts-ignore
        const requesterEmail = session?.user?.email;
        const targetUser = await prisma.user.findUnique({ where: { id: userId } });

        if (!targetUser) {
            return NextResponse.json(
                { error: '사용자를 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        if (targetUser.email === requesterEmail) {
            return NextResponse.json(
                { error: '자신의 역할은 변경할 수 없습니다.' },
                { status: 403 }
            );
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { role },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                image: true,
            },
        });

        return NextResponse.json({ member: updatedUser });
    } catch (error) {
        console.error('PATCH /api/admin/members error:', error);
        return NextResponse.json(
            { error: '역할 변경에 실패했습니다.' },
            { status: 500 }
        );
    }
}
