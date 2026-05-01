import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

const MIME_BY_EXT: Record<string, string> = {
    // images
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.bmp': 'image/bmp',
    '.avif': 'image/avif',
    '.heic': 'image/heic',
    // documents
    '.pdf': 'application/pdf',
    '.txt': 'text/plain; charset=utf-8',
    '.csv': 'text/csv; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.xml': 'application/xml',
    '.html': 'text/html; charset=utf-8',
    '.md': 'text/markdown; charset=utf-8',
    // office
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.hwp': 'application/x-hwp',
    '.hwpx': 'application/x-hwpx',
    // archives
    '.zip': 'application/zip',
    '.rar': 'application/vnd.rar',
    '.7z': 'application/x-7z-compressed',
    '.tar': 'application/x-tar',
    '.gz': 'application/gzip',
    // av
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ogg': 'audio/ogg',
    '.m4a': 'audio/mp4',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
    '.mkv': 'video/x-matroska',
};

function mimeForFilename(filename: string): string {
    const ext = path.extname(filename).toLowerCase();
    return MIME_BY_EXT[ext] || 'application/octet-stream';
}

export async function GET(
    _request: NextRequest,
    context: { params: Promise<{ filename: string }> }
) {
    const { filename } = await context.params;

    if (filename.includes('..') || filename.includes('/')) {
        return new NextResponse('Invalid filename', { status: 400 });
    }

    const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'uploads');
    const filepath = path.join(uploadDir, filename);

    if (existsSync(filepath)) {
        try {
            const fileBuffer = await readFile(filepath);
            const mimeType = mimeForFilename(filename);
            return new NextResponse(fileBuffer as unknown as BodyInit, {
                headers: {
                    'Content-Type': mimeType,
                    'Cache-Control': 'public, max-age=31536000, immutable',
                },
            });
        } catch (error) {
            console.error('Error reading local file:', error);
        }
    }

    const imageServerUrl = process.env.IMAGE_SERVER_URL;
    if (imageServerUrl) {
        try {
            const remoteUrl = `${imageServerUrl}/api/uploads/${filename}`;
            const res = await fetch(remoteUrl);
            if (res.ok) {
                const buffer = await res.arrayBuffer();
                return new NextResponse(Buffer.from(buffer) as unknown as BodyInit, {
                    headers: {
                        'Content-Type': res.headers.get('Content-Type') || mimeForFilename(filename),
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
