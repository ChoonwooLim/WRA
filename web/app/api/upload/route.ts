
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
        return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure upload directory exists
    // Fallback to public/uploads if UPLOAD_DIR is not defined
    const uploadDir = process.env.UPLOAD_DIR?.trim() || join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
    }

    // Create a unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, '-'); // Replace spaces with dashes
    const filename = `${timestamp}-${originalName}`;
    const path = join(uploadDir, filename);

    try {
        await writeFile(path, buffer);

        // If UPLOAD_DIR is set, use the custom API route to serve the image.
        // Otherwise, fallback to the static public folder path.
        const url = process.env.UPLOAD_DIR?.trim()
            ? `/api/images/${filename}`
            : `/uploads/${filename}`;

        return NextResponse.json({ success: true, url });
    } catch (error) {
        console.error('Error saving file:', error);
        return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
    }
}
