import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const IMGBB_API_KEY = "b914d79da1646ee86de35a60e0a4f5f9";

async function uploadToImgBB(fileName: string) {
    const filePath = path.join('C:\\Users\\choon\\.gemini\\antigravity\\brain\\0cfa82e0-4421-420a-91e7-39942fcb9b9f', fileName);
    const buffer = fs.readFileSync(filePath);
    const base64Image = buffer.toString('base64');

    console.log(`Uploading ${fileName} to ImgBB...`);

    // ImgBB accepts pure base64 strings in the 'image' field when sent as application/x-www-form-urlencoded
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `image=${encodeURIComponent(base64Image)}`
    });

    const data = await res.json();
    if (!data.success) {
        throw new Error(`Failed to upload ${fileName}: ${JSON.stringify(data)}`);
    }
    console.log(`Uploaded ${fileName} successfully -> ${data.data.url}`);
    return data.data.url;
}

async function main() {
    console.log('Starting cloud seeding process...');

    const adminUser = await prisma.user.findFirst({
        where: { role: 'admin' },
    });

    if (!adminUser) {
        throw new Error('Admin user not found. Cannot seed posts.');
    }

    // Prepare content
    const uploads = [
        {
            file: 'news_simple_gala_1771728765582.png',
            title: '[초청] 2026 글로벌 노블레스 자선 갈라 참여 안내',
            template: 'showcase',
            mainTitle: '글로벌 리더십과 나눔, 2026 자선 갈라',
            subTitle: '미래를 밝히는 숭고한 동행',
            desc: 'WRA의 핵심 철학인 노블레스 오블리주를 실천하는 2026 자선 갈라에 회원 여러분을 정중히 초대합니다.\n\n올해 행사에서는 차세대 글로벌 장학 재단 설립을 위한 특별 기금 마련이 진행될 예정이며, 세계적인 정·재계 인사들이 참석하여 자리를 빛낼 예정입니다.'
        },
        {
            file: 'news_simple_summit_1771728748741.png',
            title: '[안내] 2026 WRA 글로벌 리더십 포럼 포스터',
            template: 'full-image',
        },
        {
            file: 'news_simple_ceo_1771728804165.png',
            title: '[리포트] 2026 1분기 고위급 경영 리포트',
            template: 'showcase',
            mainTitle: '2026년 1분기 WRA 경영 성과 브리핑',
            subTitle: '안정적 성장과 프리미엄 가치 창출',
            desc: '새롭게 도약하는 2026년 1분기, WRA는 글로벌 파트너십 확장 및 프리미엄 회원 서비스 고도화에서 괄목할 성장을 이루었습니다.\n\n첨부된 경영 리포트를 통해 자세한 글로벌 프로젝트 진행 현황 및 향후 분기별 추진 목표를 확인해 보시기 바랍니다.'
        },
        {
            file: 'news_simple_concert_1771728789534.png',
            title: '[예술] 프라이빗 클래식 콘서트 예약 안내',
            template: 'full-image',
        },
        {
            file: 'news_simple_library_1771728848478.png',
            title: '[학술] 2026 유럽 명문 학술 기행 모집 안내',
            template: 'full-image',
        }
    ];

    // Wipe all existing newsletters to ensure a clean slate
    const deleted = await prisma.post.deleteMany({
        where: {
            board: 'newsletter'
        }
    });
    console.log(`Cleaned up ${deleted.count} old newsletters.`);

    for (const item of uploads) {
        try {
            const url = await uploadToImgBB(item.file);

            let htmlContent = '';

            if (item.template === 'showcase') {
                htmlContent = `
<div style="font-family: 'Inter', sans-serif; max-width: 800px; margin: 0 auto; background: #0a0a1a; color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
    <div style="width: 100%; height: 350px; background-image: url('${url}'); background-size: cover; background-position: center; border-bottom: 2px solid #3b82f6;"></div>
    <div style="padding: 40px;">
        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 8px; color: #ffffff; letter-spacing: -0.5px;">${item.mainTitle}</h2>
        <h3 style="font-size: 18px; color: #94a3b8; font-weight: 400; margin-bottom: 30px; letter-spacing: -0.02em;">${item.subTitle}</h3>
        <div style="width: 40px; height: 3px; background: #3b82f6; margin-bottom: 30px;"></div>
        <p style="font-size: 16px; line-height: 1.8; color: #cbd5e1; white-space: pre-wrap;">${item.desc}</p>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
            <p style="font-size: 14px; color: #64748b;">World Royal Academy Official Newsletter</p>
        </div>
    </div>
</div>`;
            } else {
                htmlContent = `<div style="text-align: center;"><img src="${url}" alt="Newsletter Image" style="max-width: 100%; height: auto; display: inline-block; border-radius: 12px;" /></div>`;
            }

            await prisma.post.create({
                data: {
                    title: item.title,
                    content: htmlContent,
                    board: 'newsletter',
                    authorId: adminUser.id,
                }
            });
            console.log(`Created newsletter: ${item.title}`);

        } catch (e) {
            console.error(`Error processing ${item.file}:`, e);
        }
    }

    console.log('Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
