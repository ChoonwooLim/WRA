import { PrismaClient } from '@prisma/client';
import { readdir, readFile, stat } from 'fs/promises';
import { join, parse } from 'path';
import { existsSync } from 'fs';

const prisma = new PrismaClient();

// Configuration
const SOURCE_DIR = 'C:\\WORK\\WRA\\Sorces\\WebSiteSorces\\image';

async function main() {
    console.log(`Starting bulk upload (Base64 to DB) from: ${SOURCE_DIR}`);

    // Get Admin User
    let admin = await prisma.user.findFirst({ where: { role: 'admin' } });
    if (!admin) {
        admin = await prisma.user.findFirst();
        if (!admin) {
            console.error('No users found in database. Please create a user first.');
            return;
        }
    }

    // Clear existing gallery posts to prevent duplicates and clean up file-based links
    console.log('Clearing existing gallery posts...');
    await prisma.post.deleteMany({
        where: { board: 'gallery' }
    });
    console.log('Existing gallery posts deleted.');

    // Read Source Directory
    const files = await readdir(SOURCE_DIR);
    let count = 0;

    for (const file of files) {
        const sourcePath = join(SOURCE_DIR, file);
        const fileStat = await stat(sourcePath);

        if (fileStat.isDirectory()) continue;

        const { name, ext } = parse(file);
        const lowerExt = ext.toLowerCase();

        // Filter images
        if (!['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(lowerExt)) {
            continue;
        }

        try {
            // Read file buffer
            const buffer = await readFile(sourcePath);
            // Convert to Base64
            const base64Image = `data:image/${lowerExt.replace('.', '')};base64,${buffer.toString('base64')}`;

            const title = name;

            // Create DB Entry with Base64 content
            await prisma.post.create({
                data: {
                    title: title,
                    content: `<p><img src="${base64Image}" alt="${title}" style="max-width: 100%;" /></p>`,
                    board: 'gallery',
                    category: 'Gallery Image',
                    authorId: admin.id,
                    views: Math.floor(Math.random() * 50),
                    likes: Math.floor(Math.random() * 10),
                }
            });

            console.log(`[${++count}] Uploaded to DB: ${title}`);

        } catch (err) {
            console.error(`Failed to upload ${file}:`, err);
        }
    }

    console.log(`\nBulk upload finished.`);
    console.log(`Total Uploaded: ${count}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
