
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const images = [
    {
        title: '경복궁 전경 (Gyeongbokgung Palace View)',
        src: '/images/hero-bg.png',
        description: 'The main royal palace of the Joseon dynasty. (Hero Section Background)',
        category: 'Palace'
    },
    {
        title: '창덕궁 전경 (Changdeokgung Palace View)',
        src: '/images/about-philosophy.png',
        description: 'A UNESCO World Heritage site known for its exquisite architecture. (About Page)',
        category: 'Palace'
    },
    {
        title: '부용정 (Buyongjeong Pavilion)',
        src: '/images/about-vision.png',
        description: 'A beautiful pavilion located in the rear garden of Changdeokgung. (About Page)',
        category: 'Palace'
    },
    {
        title: '황사손 이원 전하 (H.I.H. Crown Prince Lee Won)',
        src: '/images/crown-prince-portrait.jpg',
        description: 'Official ceremonial portrait of the Crown Prince. (Crown Prince Page)',
        category: 'Royal Family'
    },
    {
        title: '황실 문화 활동 (Royal Cultural Activities)',
        src: '/images/crown-prince-activities.jpg',
        description: 'Group photo from a recent royal cultural event. (Crown Prince Page)',
        category: 'Event'
    }
];

async function main() {
    console.log('Start seeding gallery...');

    // Ensure an admin user exists or get the first user
    let admin = await prisma.user.findFirst({
        where: { role: 'admin' }
    });

    if (!admin) {
        console.log('No admin user found. Creating a default admin user for seeding...');
        // Try to find ANY user to attribute posts to, or create one if db is empty
        const anyUser = await prisma.user.findFirst();
        if (anyUser) {
            admin = anyUser;
            console.log(`Using existing user ${admin.name} (ID: ${admin.id}) as author.`);
        } else {
            admin = await prisma.user.create({
                data: {
                    name: 'System Admin',
                    email: 'admin@wra.example.com',
                    role: 'admin',
                }
            });
            console.log(`Created System Admin user (ID: ${admin.id}).`);
        }
    }

    for (const image of images) {
        const content = `<p>${image.description}</p><p><img src="${image.src}" alt="${image.title}" style="max-width: 100%;" /></p>`;

        // Check if post already exists to avoid duplicates
        const existing = await prisma.post.findFirst({
            where: {
                board: 'gallery',
                title: image.title
            }
        });

        if (!existing) {
            await prisma.post.create({
                data: {
                    title: image.title,
                    content: content,
                    board: 'gallery',
                    category: image.category,
                    authorId: admin!.id,
                    views: Math.floor(Math.random() * 100),
                    likes: Math.floor(Math.random() * 20),
                }
            });
            console.log(`Created post: ${image.title}`);
        } else {
            console.log(`Skipping existing post: ${image.title}`);
        }
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
