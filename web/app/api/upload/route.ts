import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

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

        // Forward to ImgBB
        const imgbbApiKey = process.env.IMGBB_API_KEY;
        if (!imgbbApiKey) {
            return NextResponse.json({ error: 'Server configuration error: Missing ImgBB API Key' }, { status: 500 });
        }

        const imgbbFormData = new FormData();
        imgbbFormData.append('image', file);

        // ImgBB API endpoint requires 'key' as a query parameter or form data. 
        // We'll use the API URL directly with the key.
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
            method: 'POST',
            body: imgbbFormData,
        });

        const data = await response.json();

        if (data.success) {
            return NextResponse.json({ url: data.data.url }, { status: 200 });
        } else {
            console.error('ImgBB Error:', data);
            return NextResponse.json({ error: 'Failed to upload to cloud storage' }, { status: 500 });
        }

    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { error: 'Failed to process upload' },
            { status: 500 }
        );
    }
}
