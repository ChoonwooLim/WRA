import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { z } from 'zod';

const resetPasswordSchema = z.object({
    token: z.string().min(1, 'Token is required'),
    password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { token, password } = resetPasswordSchema.parse(body);

        // Find valid token
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
        });

        if (!resetToken) {
            return NextResponse.json(
                { message: '유효하지 않은 재설정 링크입니다.' },
                { status: 400 }
            );
        }

        // Check if expired
        if (resetToken.expires < new Date()) {
            // Delete expired token
            await prisma.passwordResetToken.delete({
                where: { id: resetToken.id },
            });
            return NextResponse.json(
                { message: '재설정 링크가 만료되었습니다. 다시 요청해주세요.' },
                { status: 400 }
            );
        }

        // Hash new password
        const hashedPassword = await hash(password, 10);

        // Update user password
        await prisma.user.update({
            where: { email: resetToken.email },
            data: { password: hashedPassword },
        });

        // Delete used token
        await prisma.passwordResetToken.delete({
            where: { id: resetToken.id },
        });

        return NextResponse.json({
            message: '비밀번호가 성공적으로 변경되었습니다.',
        });
    } catch (error) {
        console.error('Reset password error:', error);
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
