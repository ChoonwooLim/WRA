import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        // Security check: Only allow admins and sub-admins to upload images
        // @ts-ignore
        if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'sub-admin')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const imageServerUrl = process.env.IMAGE_SERVER_URL;

        // If IMAGE_SERVER_URL is set, proxy upload to remote server
        if (imageServerUrl) {
            try {
                const formData = await req.formData();
                const file = formData.get('file') as File;

                if (!file) {
                    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
                }

                // Forward to remote server
                const remoteFormData = new FormData();
                remoteFormData.append('file', file);

                const res = await fetch(`${imageServerUrl}/api/upload`, {
                    method: 'POST',
                    body: remoteFormData,
                    headers: {
                        // Forward auth cookie for remote server authentication
                        'Cookie': req.headers.get('cookie') || '',
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    return NextResponse.json(data, { status: 200 });
                }

                // If remote upload failed, fall through to local upload
                console.warn('Remote upload failed, falling back to local:', await res.text());
            } catch (error) {
                console.error('Error proxying upload to remote server:', error);
                // Fall through to local upload
            }
        }

        // Local upload fallback
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Clean filename and make it unique
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
        const filename = `${Date.now()}-${originalName}`;

        const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'uploads');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (err: any) {
            if (err.code !== 'EEXIST') throw err;
        }

        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

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
