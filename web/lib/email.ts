import nodemailer from 'nodemailer';

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
