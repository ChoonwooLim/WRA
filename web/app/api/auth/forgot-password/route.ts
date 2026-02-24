import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { randomBytes } from 'crypto';
import { sendPasswordResetEmail } from '@/lib/email';

const forgotPasswordSchema = z.object({
    email: z.string().email('유효한 이메일을 입력해주세요.'),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = forgotPasswordSchema.parse(body);

        // Always return success to prevent email enumeration
        const successResponse = NextResponse.json({
            message: '등록된 이메일이라면, 비밀번호 재설정 링크가 발송되었습니다.',
        });

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.password) {
            // Don't reveal if email exists
            return successResponse;
        }

        // Delete existing tokens for this email
        await prisma.passwordResetToken.deleteMany({
            where: { email },
        });

        // Generate token
        const token = randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        // Save token to DB
        await prisma.passwordResetToken.create({
            data: { email, token, expires },
        });

        // Send email (or log to console)
        await sendPasswordResetEmail(email, token);

        return successResponse;
    } catch (error) {
        console.error('Forgot password error:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: '유효한 이메일을 입력해주세요.' },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
