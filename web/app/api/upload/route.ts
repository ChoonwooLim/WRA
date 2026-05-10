import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

function sanitizeExt(name: string): string {
    const m = name.match(/\.([A-Za-z0-9]{1,8})$/);
    return m ? `.${m[1].toLowerCase()}` : '';
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
        }

        // Parse the multipart body ONCE — re-parsing throws because the body stream is consumed.
        const formData = await (req as unknown as { formData: () => Promise<globalThis.FormData> }).formData();
        const file = formData.get('file') as unknown as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }
        if (file.size > MAX_SIZE_BYTES) {
            return NextResponse.json(
                { error: `파일 크기가 ${MAX_SIZE_BYTES / 1024 / 1024}MB를 초과합니다.` },
                { status: 413 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const ext = sanitizeExt(file.name);
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;

        // UPLOAD_DIR must point at the Render persistent disk in production
        // (e.g. /var/data/uploads). Without it the container's ephemeral disk
        // is used and files vanish on every redeploy.
        const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'uploads');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (err: unknown) {
            if ((err as { code?: string })?.code !== 'EEXIST') throw err;
        }

        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        return NextResponse.json(
            {
                url: `/api/uploads/${filename}`,
                name: file.name,
                size: file.size,
                mimeType: file.type || 'application/octet-stream',
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Failed to process upload' }, { status: 500 });
    }
}
