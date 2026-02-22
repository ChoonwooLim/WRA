import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        // Security check: Only allow admins to upload images for now
        // @ts-ignore
        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Clean filename and make it unique
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
        const filename = `${Date.now()}-${originalName}`;

        // Ensure the directory exists (prioritizing the external UPLOAD_DIR from TwinVerse)
        const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'uploads');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (err: any) {
            if (err.code !== 'EEXIST') {
                throw err;
            }
        }

        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        // Return the dynamic API URL which safely serves files from external UPLOAD_DIR
        const fileUrl = `/api/uploads/${filename}`;

        return NextResponse.json({ url: fileUrl }, { status: 200 });

    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { error: 'Failed to process upload' },
            { status: 500 }
        );
    }
}
