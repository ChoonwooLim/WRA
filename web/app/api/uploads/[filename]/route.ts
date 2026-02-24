import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ filename: string }> }
) {
    const { filename } = await context.params;

    // Safety check - prevent directory traversal
    if (filename.includes('..') || filename.includes('/')) {
        return new NextResponse('Invalid filename', { status: 400 });
    }

    // Try local file first
    const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'uploads');
    const filepath = path.join(uploadDir, filename);

    if (existsSync(filepath)) {
        try {
            const fileBuffer = await readFile(filepath);
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
            console.error('Error reading local file:', error);
        }
    }

    // Fallback: proxy from remote image server
    const imageServerUrl = process.env.IMAGE_SERVER_URL;
    if (imageServerUrl) {
        try {
            const remoteUrl = `${imageServerUrl}/api/uploads/${filename}`;
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
            console.error('Error proxying from remote server:', error);
        }
    }

    return new NextResponse('File not found', { status: 404 });
}
