import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
