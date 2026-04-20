import nodemailer from 'nodemailer';
import { Resend } from 'resend';

// Create transporter - uses SMTP settings from env, or falls back to console output
function getTransporter() {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587');
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (host && user && pass) {
        return nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: { user, pass },
        });
    }

    return null; // Fallback mode
}

export async function sendPasswordResetEmail(email: string, token: string) {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`;
    const transporter = getTransporter();

    if (!transporter) {
        // Fallback: log to console for development
        console.log('\n========================================');
        console.log('📧 PASSWORD RESET EMAIL (SMTP not configured)');
        console.log(`To: ${email}`);
        console.log(`Reset URL: ${resetUrl}`);
        console.log('========================================\n');
        return;
    }

    const html = `
    <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%); border-radius: 16px; padding: 40px; border: 1px solid rgba(212, 175, 55, 0.3);">
            <h1 style="color: #d4af37; text-align: center; margin-bottom: 8px; font-size: 24px;">
                World Royal Academy
            </h1>
            <p style="color: #888; text-align: center; margin-bottom: 32px; font-size: 14px;">
                비밀번호 재설정 안내
            </p>
            <p style="color: #ccc; line-height: 1.6; margin-bottom: 24px;">
                안녕하세요,<br><br>
                비밀번호 재설정 요청을 받았습니다. 아래 버튼을 클릭하여 새 비밀번호를 설정해주세요.
            </p>
            <div style="text-align: center; margin: 32px 0;">
                <a href="${resetUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(to right, #d4af37, #aa771c); color: #000; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px;">
                    비밀번호 재설정
                </a>
            </div>
            <p style="color: #888; font-size: 12px; line-height: 1.5;">
                이 링크는 1시간 동안만 유효합니다.<br>
                본인이 요청하지 않은 경우, 이 이메일을 무시해주세요.
            </p>
            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;" />
            <p style="color: #555; font-size: 11px; text-align: center;">
                © World Royal Academy. All rights reserved.
            </p>
        </div>
    </div>
    `;

    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject: '[WRA] 비밀번호 재설정 안내',
        html,
    });
}

export async function sendContactEmail(input: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) {
    const to = process.env.CONTACT_TO || 'youna789@gmail.com';
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM || 'World Royal Academy <onboarding@resend.dev>';

    const escape = (s: string) =>
        s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    if (!apiKey) {
        console.log('\n========================================');
        console.log('📧 CONTACT FORM (RESEND_API_KEY not configured)');
        console.log(`From: ${input.name} <${input.email}>`);
        console.log(`To: ${to}`);
        console.log(`Subject: ${input.subject}`);
        console.log(`Message: ${input.message}`);
        console.log('========================================\n');
        return;
    }

    const html = `
    <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%); border-radius: 16px; padding: 40px; border: 1px solid rgba(212, 175, 55, 0.3);">
            <h1 style="color: #d4af37; text-align: center; margin-bottom: 8px; font-size: 24px;">
                World Royal Academy
            </h1>
            <p style="color: #888; text-align: center; margin-bottom: 32px; font-size: 14px;">
                웹사이트 연락처 폼 접수
            </p>
            <table style="width: 100%; color: #ccc; font-size: 14px; line-height: 1.6;">
                <tr>
                    <td style="padding: 8px 0; color: #888; width: 80px;">이름</td>
                    <td style="padding: 8px 0; color: #fff;">${escape(input.name)}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #888;">이메일</td>
                    <td style="padding: 8px 0; color: #fff;"><a href="mailto:${escape(input.email)}" style="color: #d4af37; text-decoration: none;">${escape(input.email)}</a></td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #888;">제목</td>
                    <td style="padding: 8px 0; color: #fff;">${escape(input.subject)}</td>
                </tr>
            </table>
            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;" />
            <p style="color: #888; font-size: 12px; margin-bottom: 8px;">메시지</p>
            <div style="color: #ddd; line-height: 1.7; white-space: pre-wrap; background: rgba(0,0,0,0.2); border-radius: 8px; padding: 16px;">${escape(input.message)}</div>
            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;" />
            <p style="color: #555; font-size: 11px; text-align: center;">
                © World Royal Academy. Contact form submission.
            </p>
        </div>
    </div>
    `;

    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
        from,
        to,
        replyTo: input.email,
        subject: `[WRA 문의] ${input.subject}`,
        html,
    });

    if (result.error) {
        throw new Error(`Resend error: ${result.error.message || 'unknown'}`);
    }
}

function chunk<T>(arr: T[], size: number): T[][] {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
}

export async function sendNewsletterBatch(input: {
    title: string;
    content: string;
    subscribers: { email: string; unsubscribeToken: string }[];
    postId?: string;
}): Promise<{ sent: number; failed: number }> {
    const baseUrl = process.env.NEXTAUTH_URL || 'https://xn--989ao0kixfkpc53jxpgt2bj12a.org';
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM || 'World Royal Academy <onboarding@resend.dev>';

    if (!apiKey) {
        console.log(`📧 NEWSLETTER (RESEND_API_KEY not configured) — would send "${input.title}" to ${input.subscribers.length} subscribers`);
        return { sent: 0, failed: input.subscribers.length };
    }

    const resend = new Resend(apiKey);
    const viewUrl = input.postId ? `${baseUrl}/community/post/${input.postId}` : `${baseUrl}/community/newsletter`;

    const buildHtml = (unsubscribeUrl: string) => `
    <div style="max-width: 640px; margin: 0 auto; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%); border-radius: 16px; padding: 40px; border: 1px solid rgba(212, 175, 55, 0.3);">
            <h1 style="color: #d4af37; text-align: center; margin-bottom: 8px; font-size: 26px;">
                World Royal Academy
            </h1>
            <p style="color: #888; text-align: center; margin-bottom: 32px; font-size: 13px; letter-spacing: 0.15em;">NEWSLETTER</p>
            <h2 style="color: #fff; font-size: 20px; line-height: 1.4; margin-bottom: 24px;">${input.title}</h2>
            <div style="color: #ddd; line-height: 1.8; font-size: 15px;">${input.content}</div>
            <div style="text-align: center; margin: 36px 0 8px;">
                <a href="${viewUrl}" style="display: inline-block; padding: 12px 28px; background: linear-gradient(to right, #d4af37, #aa771c); color: #000; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 14px;">
                    웹에서 보기
                </a>
            </div>
            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 32px 0 16px;" />
            <p style="color: #666; font-size: 11px; text-align: center; line-height: 1.6;">
                © World Royal Academy. 세계왕립아카데미의 뉴스레터를 구독하고 계십니다.<br>
                더 이상 수신을 원치 않으시면 <a href="${unsubscribeUrl}" style="color: #888; text-decoration: underline;">수신 거부</a>를 클릭하세요.
            </p>
        </div>
    </div>`;

    let sent = 0;
    let failed = 0;

    for (const group of chunk(input.subscribers, 100)) {
        const emails = group.map((s) => ({
            from,
            to: [s.email],
            subject: input.title,
            html: buildHtml(`${baseUrl}/api/newsletter/unsubscribe?token=${s.unsubscribeToken}`),
            headers: {
                'List-Unsubscribe': `<${baseUrl}/api/newsletter/unsubscribe?token=${s.unsubscribeToken}>`,
                'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
            },
        }));

        try {
            const result = await resend.batch.send(emails);
            if (result.error) {
                console.error('Resend batch error:', result.error);
                failed += group.length;
            } else {
                sent += group.length;
            }
        } catch (err) {
            console.error('Resend batch threw:', err);
            failed += group.length;
        }
    }

    return { sent, failed };
}
