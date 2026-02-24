import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const findEmailSchema = z.object({
    name: z.string().min(1, 'Name is required'),
});

// Mask email: ch***@gmail.com
function maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (local.length <= 2) {
        return `${local[0]}***@${domain}`;
    }
    return `${local.slice(0, 2)}***@${domain}`;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name } = findEmailSchema.parse(body);

        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
                email: { not: null },
                password: { not: null }, // Only credential users
            },
            select: {
                name: true,
                email: true,
            },
        });

        if (users.length === 0) {
            return NextResponse.json({
                found: false,
                message: '입력하신 이름으로 등록된 계정을 찾을 수 없습니다.',
            });
        }

        const maskedEmails = users.map((u) => ({
            name: u.name,
            email: maskEmail(u.email!),
        }));

        return NextResponse.json({
            found: true,
            accounts: maskedEmails,
            message: `${maskedEmails.length}개의 계정을 찾았습니다.`,
        });
    } catch (error) {
        console.error('Find email error:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { found: false, message: '이름을 입력해주세요.' },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { found: false, message: '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
