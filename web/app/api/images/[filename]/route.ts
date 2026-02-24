import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(
    request: NextRequest,
    context: any
) {
    const resolvedParams = await context.params;
    const filename = resolvedParams?.filename;

    if (!filename || typeof filename !== 'string') {
        return new NextResponse('Bad request: missing filename', { status: 400 });
    }

    // Try local file first
    const uploadDir = process.env.UPLOAD_DIR?.trim() || join(process.cwd(), 'public', 'uploads');
    const filePath = join(uploadDir, filename);

    if (existsSync(filePath)) {
        try {
            const fileBuffer = await readFile(filePath);
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
            console.error('Error reading local image file:', error);
        }
    }

    // Fallback: proxy from remote image server
    const imageServerUrl = process.env.IMAGE_SERVER_URL;
    if (imageServerUrl) {
        try {
            const remoteUrl = `${imageServerUrl}/api/images/${filename}`;
            const res = await fetch(remoteUrl);
            if (res.ok) {
                const buffer = await res.arrayBuffer();
                return new NextResponse(Buffer.from(buffer), {
                    headers: {
                        'Content-Type': res.headers.get('Content-Type') || 'image/jpeg',
                        'Cache-Control': 'public, max-age=31536000, immutable',
                    },
                });
            }
        } catch (error) {
            console.error('Error proxying image from remote server:', error);
        }
    }

    return new NextResponse('Image not found', { status: 404 });
}
