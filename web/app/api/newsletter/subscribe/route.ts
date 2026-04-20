import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const email = String(body.email || '').trim().toLowerCase();
        const consent = body.consent === true;

        if (!email) {
            return NextResponse.json({ error: '이메일을 입력해주세요.' }, { status: 400 });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: '올바른 이메일 주소를 입력해주세요.' }, { status: 400 });
        }

        if (!consent) {
            return NextResponse.json({ error: '뉴스레터 수신 동의가 필요합니다.' }, { status: 400 });
        }

        if (email.length > 254) {
            return NextResponse.json({ error: '이메일이 너무 깁니다.' }, { status: 400 });
        }

        const existing = await prisma.subscriber.findUnique({ where: { email } });

        if (existing) {
            if (existing.unsubscribedAt) {
                await prisma.subscriber.update({
                    where: { email },
                    data: { unsubscribedAt: null, consent: true },
                });
                return NextResponse.json({ ok: true, resubscribed: true });
            }
            return NextResponse.json({ ok: true, alreadySubscribed: true });
        }

        await prisma.subscriber.create({
            data: { email, consent: true },
        });

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('POST /api/newsletter/subscribe error:', error);
        return NextResponse.json({ error: '구독 처리에 실패했습니다.' }, { status: 500 });
    }
}
