// Temporary admin tool — scans Post.content / answerContent / attachments for
// references to /api/uploads/* files that no longer exist on disk (lost when
// Render's ephemeral disk was wiped before persistent disk was attached) and
// either reports them (mode=dry) or rewrites them in-place (mode=apply).
//
// DELETE THIS FILE AFTER THE ONE-TIME CLEANUP IS DONE.

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { existsSync } from 'fs';
import path from 'path';
import type { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

const UPLOAD_DIR =
    process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'uploads');

const IMG_TAG_RE =
    /<img\b[^>]*\bsrc=["']\/api\/uploads\/([^"']+)["'][^>]*>/g;

const PLACEHOLDER =
    '<div class="rich-img-missing" style="padding:0.85rem 1rem;border:1px dashed rgba(239,68,68,0.45);border-radius:0.5rem;background:rgba(239,68,68,0.06);color:#fca5a5;font-size:0.85rem;margin:0.75rem 0;">⚠ 원본 이미지가 사라졌습니다. 작성자께서 다시 업로드해 주세요.</div>';

function fileMissing(filename: string): boolean {
    if (!filename || filename.includes('..') || filename.includes('/')) return true;
    return !existsSync(path.join(UPLOAD_DIR, filename));
}

function scanContent(html: string | null | undefined): {
    missing: string[];
    cleaned: string | null;
    changed: boolean;
} {
    if (!html) return { missing: [], cleaned: html ?? null, changed: false };
    const missing: string[] = [];
    let changed = false;
    const cleaned = html.replace(IMG_TAG_RE, (match, filename: string) => {
        if (fileMissing(filename)) {
            missing.push(filename);
            changed = true;
            return PLACEHOLDER;
        }
        return match;
    });
    return { missing, cleaned: changed ? cleaned : html, changed };
}

interface AttachmentItem {
    name?: string;
    url?: string;
    size?: number;
    mimeType?: string;
}

function scanAttachments(att: Prisma.JsonValue | null | undefined): {
    missing: string[];
    cleaned: AttachmentItem[];
    changed: boolean;
} {
    if (!Array.isArray(att)) return { missing: [], cleaned: [], changed: false };
    const items = att as unknown as AttachmentItem[];
    const missing: string[] = [];
    const kept: AttachmentItem[] = [];
    for (const item of items) {
        const url = item?.url;
        if (typeof url === 'string') {
            const m = url.match(/^\/api\/uploads\/(.+)$/);
            if (m && fileMissing(m[1])) {
                missing.push(m[1]);
                continue;
            }
        }
        kept.push(item);
    }
    return { missing, cleaned: kept, changed: missing.length > 0 };
}

interface AffectedPost {
    id: string;
    title: string;
    board: string;
    contentMissing: string[];
    answerMissing: string[];
    attachmentMissing: string[];
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session?.user || role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden — admin only' }, { status: 403 });
    }

    const mode =
        new URL(req.url).searchParams.get('mode') === 'apply' ? 'apply' : 'dry';

    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            board: true,
            content: true,
            answerContent: true,
            attachments: true,
        },
    });

    const affected: AffectedPost[] = [];
    let updated = 0;

    for (const post of posts) {
        const c = scanContent(post.content);
        const a = scanContent(post.answerContent);
        const att = scanAttachments(post.attachments);

        if (!c.changed && !a.changed && !att.changed) continue;

        affected.push({
            id: post.id,
            title: post.title,
            board: post.board,
            contentMissing: c.missing,
            answerMissing: a.missing,
            attachmentMissing: att.missing,
        });

        if (mode === 'apply') {
            await prisma.post.update({
                where: { id: post.id },
                data: {
                    ...(c.changed ? { content: c.cleaned ?? '' } : {}),
                    ...(a.changed ? { answerContent: a.cleaned } : {}),
                    ...(att.changed
                        ? {
                              attachments: (att.cleaned as unknown) as Prisma.InputJsonValue,
                          }
                        : {}),
                },
            });
            updated++;
        }
    }

    return NextResponse.json({
        mode,
        uploadDir: UPLOAD_DIR,
        scanned: posts.length,
        affected: affected.length,
        updated,
        details: affected.slice(0, 50),
        truncated: affected.length > 50 ? affected.length - 50 : 0,
    });
}
