import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding sample newsletters...');

    // Find an admin user to author the posts
    const admin = await prisma.user.findFirst({
        where: { role: 'admin' },
    });

    if (!admin) {
        console.error('No admin user found. Please ensure at least one admin exists.');
        return;
    }

    const newsletters = [
        {
            title: '[일반형 샘플] WRA 2026년 봄학기 소식지',
            board: 'newsletter',
            category: null,
            authorId: admin.id,
            content: `<div style="font-family: 'Malgun Gothic', sans-serif; line-height: 1.8; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #0d0d20; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-bottom: 20px;">[Vol.1] WRA 2026년 정규 시즌 개막</h2>
    <p style="font-size: 16px;">안녕하십니까, 세계왕립아카데미입니다.</p>
    <p style="font-size: 16px;">2026년 봄을 맞이하여 새롭게 단장한 WRA의 최고위 교육 프로그램과 최신 뉴스레터를 전해드립니다. 이번 시즌부터는 글로벌 리더십 코스와 맞춤형 네트워킹 세션이 한층 강화되었습니다.</p>
    <p style="font-size: 16px;">회원 여러분의 많은 관심과 참여를 부탁드리며, 자세한 사항은 홈페이지 공지사항을 참조해 주시기 바랍니다.</p>
</div>`
        },
        {
            title: '[쇼케이스 샘플] 세계왕립아카데미 유럽 순방 리포트',
            board: 'newsletter',
            category: null,
            authorId: admin.id,
            content: `<div style="font-family: 'Malgun Gothic', sans-serif; line-height: 1.8; color: #333; max-width: 800px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <div style="width: 100%; height: 300px; background-color: #f3f4f6; position: relative;">
        <img src="/uploads/sample_showcase.png" alt="Header Image" style="width: 100%; height: 100%; object-fit: cover;" />
    </div>
    <div style="padding: 40px; background-color: #ffffff;">
        <h2 style="color: #0d0d20; font-size: 28px; margin-top: 0; margin-bottom: 20px; font-weight: bold;">[특집] 유럽 왕실 문화 탐방 리포트</h2>
        <h3 style="color: #d4af37; font-size: 18px; margin-top: 0; margin-bottom: 30px;">글로벌 로열 다이내믹스와의 교류</h3>
        <p style="font-size: 16px; color: #4b5563; margin-bottom: 20px; white-space: pre-wrap;">지난 달, WRA 대표단은 영국과 스페인 등 유럽 주요 국가를 방문하여 심도 깊은 문화 교류와 차세대 리더십 교육 협약을 체결하였습니다. 

이번 순방을 통해 확보한 글로벌 네트워크는 향후 WRA 정회원님들께 특별한 혜택으로 제공될 예정입니다. 세부 내용은 다가오는 세미나에서 독점 공개됩니다.</p>
    </div>
</div>`
        },
        {
            title: '[행사안내 샘플] 2026 WRA 프레스티지 갈라 디너 초대',
            board: 'newsletter',
            category: null,
            authorId: admin.id,
            content: `<div style="font-family: 'Malgun Gothic', sans-serif; line-height: 1.8; color: #333; max-width: 800px; margin: 0 auto; background-color: #fafafa; padding: 40px; border-radius: 16px;">
    <div style="text-align: center; margin-bottom: 40px;">
        <span style="display: inline-block; padding: 6px 16px; background-color: #0d0d20; color: #d4af37; border-radius: 20px; font-size: 14px; font-weight: bold; margin-bottom: 20px;">EVENT INVITATION</span>
        <h2 style="color: #111827; font-size: 32px; margin: 0 0 16px 0;">2026 WRA 프레스티지 갈라 디너</h2>
        <p style="font-size: 18px; color: #6b7280; max-width: 600px; margin: 0 auto; white-space: pre-wrap;">올 한 해 WRA를 향해 보내주신 변함없는 성원에 감사드립니다. 최고급 정찬과 클래식 공연, 그리고 특별 강연이 어우러지는 프라이빗한 연회에 VVIP 멤버스 여러분을 초대합니다.</p>
    </div>
    
    <div style="background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); margin-bottom: 30px; border: 1px solid #f3f4f6;">
        <h3 style="margin-top: 0; color: #0d0d20; font-size: 18px; border-bottom: 1px solid #e5e7eb; padding-bottom: 15px; margin-bottom: 20px;">행사 개요 (Event Details)</h3>
        <ul style="list-style-type: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 12px;"><strong>🗓️ 일시:</strong> 2026년 11월 20일 (금) 18:30</li>
            <li style="margin-bottom: 12px;"><strong>📍 장소:</strong> 서울 시그니엘 그랜드볼룸</li>
            <li style="margin-bottom: 12px;"><strong>👥 대상:</strong> WRA 시그니처 멤버십 및 초청 VIP 한정</li>
            <li style="margin-bottom: 0;"><strong>👗 드레스코드:</strong> 블랙 타이 (Black Tie) 또는 정식 이브닝 드레스</li>
        </ul>
    </div>
    
    <div style="text-align: center;">
        <a href="https://example.com/rsvp" target="_blank" style="display: inline-block; background-color: #d4af37; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-weight: bold; font-size: 16px;">참석 신청하기 (RSVP)</a>
    </div>
</div>`
        },
        {
            title: '[통이미지형 샘플] WRA 멤버십 혜택 안내 포스터',
            board: 'newsletter',
            category: null,
            authorId: admin.id,
            content: `<div style="text-align: center;">
    <img src="/uploads/sample_poster.png" alt="Newsletter Image" style="max-width: 100%; height: auto; display: inline-block; border-radius: 8px;" />
</div>`
        }
    ];

    for (const data of newsletters) {
        await prisma.post.create({
            data,
        });
        console.log(`Created sample post: ${data.title}`);
    }

    console.log('Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
