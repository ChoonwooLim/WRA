import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ filename: string }> }
) {
    const { filename } = await context.params;

    // Safety check - prevent directory traversal
    if (filename.includes('..') || filename.includes('/')) {
        return new NextResponse('Invalid filename', { status: 400 });
    }

    try {
        const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'uploads');
        const filepath = path.join(uploadDir, filename);

        const fileBuffer = await readFile(filepath);

        // Ensure proper mime type based on extension
        const ext = path.extname(filename).toLowerCase();
        let mimeType = 'image/jpeg';
        if (ext === '.png') mimeType = 'image/png';
        if (ext === '.webp') mimeType = 'image/webp';
        if (ext === '.gif') mimeType = 'image/gif';
        if (ext === '.svg') mimeType = 'image/svg+xml';

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': mimeType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error('Error serving file:', error);
        return new NextResponse('File not found', { status: 404 });
    }
}
