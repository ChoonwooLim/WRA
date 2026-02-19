
import { PrismaClient } from '@prisma/client';
import { readdir, copyFile, stat } from 'fs/promises';
import { join, parse, basename } from 'path';
import { existsSync, mkdirSync } from 'fs';

const prisma = new PrismaClient();

// Configuration
const SOURCE_DIR = 'C:\\WORK\\WRA\\Sorces\\WebSiteSorces\\image';
const TARGET_DIR = join(process.cwd(), 'public', 'uploads');

async function main() {
    console.log(`Starting bulk upload from: ${SOURCE_DIR}`);

    // Ensure target directory exists
    if (!existsSync(TARGET_DIR)) {
        mkdirSync(TARGET_DIR, { recursive: true });
        console.log(`Created target directory: ${TARGET_DIR}`);
    }

    // Get Admin User
    let admin = await prisma.user.findFirst({ where: { role: 'admin' } });
    if (!admin) {
        admin = await prisma.user.findFirst();
        if (admin) {
            console.log(`No admin found, using first user: ${admin.name}`);
        } else {
            console.error('No users found in database. Please create a user first.');
            return;
        }
    }

    // Read Source Directory
    const files = await readdir(SOURCE_DIR);
    let count = 0;
    let skipped = 0;

    for (const file of files) {
        const sourcePath = join(SOURCE_DIR, file);
        const fileStat = await stat(sourcePath);

        if (fileStat.isDirectory()) continue;

        const { name, ext } = parse(file);
        const lowerExt = ext.toLowerCase();

        // Filter images
        if (!['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(lowerExt)) {
            console.log(`Skipping non-image: ${file}`);
            continue;
        }

        // Check if post already exists (by title)
        // We strictly check title matches to avoid duplicates if script runs twice
        const title = name;
        const existing = await prisma.post.findFirst({
            where: {
                board: 'gallery',
                title: title
            }
        });

        if (existing) {
            console.log(`Skipping existing post: ${title}`);
            skipped++;
            continue;
        }

        // Prepare Target File
        // Sanitize filename for web safety, but keep it unique enough
        const sanitizedName = file.replace(/[^a-zA-Z0-9.\-_가-힣]/g, '-');
        const timestamp = Date.now();
        const newFilename = `${timestamp}-${sanitizedName}`;
        const targetPath = join(TARGET_DIR, newFilename);
        const webPath = `/uploads/${newFilename}`;

        try {
            // Copy File
            await copyFile(sourcePath, targetPath);

            // Create DB Entry
            await prisma.post.create({
                data: {
                    title: title,
                    content: `<p><img src="${webPath}" alt="${title}" style="max-width: 100%;" /></p>`,
                    board: 'gallery',
                    category: 'Bulk Upload',
                    authorId: admin.id,
                    views: Math.floor(Math.random() * 50),
                    likes: Math.floor(Math.random() * 10),
                }
            });

            console.log(`[${++count}] Uploaded: ${title}`);

        } catch (err) {
            console.error(`Failed to upload ${file}:`, err);
        }
    }

    console.log(`\nBulk upload finished.`);
    console.log(`Total Uploaded: ${count}`);
    console.log(`Skipped (Duplicate): ${skipped}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
