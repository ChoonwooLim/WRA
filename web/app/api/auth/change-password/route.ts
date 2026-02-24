import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash, compare } from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';
import { z } from 'zod';

// Self password change (logged-in user)
const selfChangeSchema = z.object({
    mode: z.literal('self'),
    currentPassword: z.string().min(1, '현재 비밀번호를 입력해주세요.'),
    newPassword: z.string().min(6, '새 비밀번호는 최소 6자 이상이어야 합니다.'),
});

// Admin password change
const adminChangeSchema = z.object({
    mode: z.literal('admin'),
    userId: z.string().min(1, 'User ID is required'),
    newPassword: z.string().min(6, '새 비밀번호는 최소 6자 이상이어야 합니다.'),
});

const changePasswordSchema = z.discriminatedUnion('mode', [selfChangeSchema, adminChangeSchema]);

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json(
                { message: '로그인이 필요합니다.' },
                { status: 401 }
            );
        }

        const body = await req.json();
        const data = changePasswordSchema.parse(body);

        if (data.mode === 'self') {
            // Self change: verify current password
            const user = await prisma.user.findUnique({
                where: { email: session.user.email },
            });

            if (!user || !user.password) {
                return NextResponse.json(
                    { message: '비밀번호를 변경할 수 없습니다. (소셜 로그인 계정)' },
                    { status: 400 }
                );
            }

            const isValid = await compare(data.currentPassword, user.password);
            if (!isValid) {
                return NextResponse.json(
                    { message: '현재 비밀번호가 일치하지 않습니다.' },
                    { status: 400 }
                );
            }

            const hashedPassword = await hash(data.newPassword, 10);
            await prisma.user.update({
                where: { id: user.id },
                data: { password: hashedPassword },
            });

            return NextResponse.json({
                message: '비밀번호가 성공적으로 변경되었습니다.',
            });

        } else {
            // Admin change: verify admin role
            const admin = await prisma.user.findUnique({
                where: { email: session.user.email },
            });

            if (!admin || admin.role !== 'admin') {
                return NextResponse.json(
                    { message: '관리자 권한이 필요합니다.' },
                    { status: 403 }
                );
            }

            const hashedPassword = await hash(data.newPassword, 10);
            await prisma.user.update({
                where: { id: data.userId },
                data: { password: hashedPassword },
            });

            return NextResponse.json({
                message: '비밀번호가 변경되었습니다.',
            });
        }
    } catch (error) {
        console.error('Change password error:', error);
        if (error instanceof z.ZodError) {
            const message = error.issues?.[0]?.message || '입력값을 확인해주세요.';
            return NextResponse.json({ message }, { status: 400 });
        }
        return NextResponse.json(
            { message: '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
