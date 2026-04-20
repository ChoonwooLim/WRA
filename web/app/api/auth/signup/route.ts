import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createNotification } from '@/lib/notifications';
import { z } from 'zod';

// Input validation schema
const userSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, phone } = userSchema.parse(body);

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { user: null, message: "User with this email already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await hash(password, 10);

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone: phone || null,
                role: 'student', // Default role
            },
        });

        // Remove password from response
        const { password: newUserPassword, ...rest } = newUser;

        await createNotification({
            type: 'signup',
            title: '새 회원 가입',
            message: `${name}님이 회원가입했습니다.`,
            detail: `이메일: ${email}${phone ? ` · 전화: ${phone}` : ''}`,
            actionLabel: '회원 관리로 이동',
            actionHref: '/admin/members',
        });

        return NextResponse.json(
            { user: rest, message: "User created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup error:", error);
        if (error instanceof z.ZodError) {
            const message = (error as any).errors?.[0]?.message || (error as any).issues?.[0]?.message || "Validation error";
            return NextResponse.json(
                { user: null, message },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { user: null, message: "Internal server error" },
            { status: 500 }
        );
    }
}
