import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

function htmlPage(title: string, bodyHtml: string) {
    return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${title} | 세계왕립아카데미</title>
<style>
  body { margin: 0; background: #050510; color: #e5e5e5; font-family: 'Segoe UI', Tahoma, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .card { max-width: 480px; width: 100%; background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%); border: 1px solid rgba(212,175,55,0.3); border-radius: 16px; padding: 40px; text-align: center; }
  h1 { color: #d4af37; font-size: 22px; margin: 0 0 12px; }
  p { color: #bbb; line-height: 1.6; font-size: 14px; }
  a { display: inline-block; margin-top: 24px; padding: 12px 28px; background: linear-gradient(to right, #d4af37, #aa771c); color: #000; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 14px; }
</style>
</head>
<body><div class="card">${bodyHtml}</div></body>
</html>`;
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token') || '';

    if (!token) {
        return new Response(
            htmlPage('잘못된 요청', '<h1>잘못된 요청</h1><p>유효하지 않은 해지 링크입니다.</p><a href="/">홈으로</a>'),
            { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
    }

    try {
        const sub = await prisma.subscriber.findUnique({ where: { unsubscribeToken: token } });
        if (!sub) {
            return new Response(
                htmlPage('해지 실패', '<h1>해지 실패</h1><p>이미 해지되었거나 잘못된 링크입니다.</p><a href="/">홈으로</a>'),
                { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
            );
        }

        if (!sub.unsubscribedAt) {
            await prisma.subscriber.update({
                where: { id: sub.id },
                data: { unsubscribedAt: new Date() },
            });
        }

        return new Response(
            htmlPage(
                '수신 거부 완료',
                `<h1>수신 거부 완료</h1><p><strong style="color:#fff">${sub.email}</strong> 주소는 더 이상 뉴스레터를 받지 않습니다.</p><p style="margin-top:12px;color:#888;font-size:12px">마음이 바뀌시면 언제든 다시 구독하실 수 있습니다.</p><a href="/">홈으로</a>`
            ),
            { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
    } catch (error) {
        console.error('GET /api/newsletter/unsubscribe error:', error);
        return new Response(
            htmlPage('서버 오류', '<h1>서버 오류</h1><p>잠시 후 다시 시도해주세요.</p><a href="/">홈으로</a>'),
            { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
    }
}
