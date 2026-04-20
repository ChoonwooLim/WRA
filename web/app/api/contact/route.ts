import { NextResponse, NextRequest } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const name = String(body.name || '').trim();
        const email = String(body.email || '').trim();
        const subject = String(body.subject || '').trim();
        const message = String(body.message || '').trim();

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: '모든 항목을 입력해주세요.' }, { status: 400 });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: '올바른 이메일 주소를 입력해주세요.' }, { status: 400 });
        }

        if (name.length > 100 || subject.length > 200 || message.length > 5000) {
            return NextResponse.json({ error: '입력 길이 제한을 초과했습니다.' }, { status: 400 });
        }

        await sendContactEmail({ name, email, subject, message });

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('POST /api/contact error:', error);
        return NextResponse.json({ error: '메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.' }, { status: 500 });
    }
}
