import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(
    request: NextRequest,
    context: any
) {
    // Next.js 15+/16: params is a Promise, must await the whole object first
    const resolvedParams = await context.params;
    const filename = resolvedParams?.filename;

    console.log('[IMAGE DEBUG] context.params resolved:', JSON.stringify(resolvedParams));
    console.log('[IMAGE DEBUG] filename extracted:', filename);

    if (!filename || typeof filename !== 'string') {
        console.error('[IMAGE DEBUG] filename is undefined or not a string:', filename);
        return new NextResponse('Bad request: missing filename', { status: 400 });
    }

    // Use UPLOAD_DIR environment variable or fallback to public/uploads
    const uploadDir = process.env.UPLOAD_DIR?.trim() || join(process.cwd(), 'public', 'uploads');
    const filePath = join(uploadDir, filename);

    console.log('[IMAGE DEBUG] Request for filename:', filename);
    console.log('[IMAGE DEBUG] Resolved filePath:', filePath);

    if (!existsSync(filePath)) {
        console.error('[IMAGE DEBUG] File does not exist at path:', filePath);
        return new NextResponse('Image not found', { status: 404 });
    }

    try {
        const fileBuffer = await readFile(filePath);

        // Basic MIME type guessing based on file extension
        const ext = filename.split('.').pop()?.toLowerCase();
        let contentType = 'application/octet-stream';
        if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
        else if (ext === 'png') contentType = 'image/png';
        else if (ext === 'gif') contentType = 'image/gif';
        else if (ext === 'webp') contentType = 'image/webp';
        else if (ext === 'svg') contentType = 'image/svg+xml';

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error('Error reading image file:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
