'use client';

import {
    FileText, FileImage, FileVideo, FileAudio, FileArchive, FileCode,
    File as FileIcon, Download, Paperclip,
} from 'lucide-react';

export interface AttachmentItem {
    name: string;
    url: string;
    size: number;
    mimeType: string;
}

function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
    return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

function iconForMime(mime: string) {
    if (mime.startsWith('image/')) return FileImage;
    if (mime.startsWith('video/')) return FileVideo;
    if (mime.startsWith('audio/')) return FileAudio;
    if (mime.includes('zip') || mime.includes('rar') || mime.includes('tar') || mime.includes('7z')) return FileArchive;
    if (mime.includes('pdf') || mime.includes('word') || mime.includes('document') || mime.includes('text')) return FileText;
    if (mime.includes('javascript') || mime.includes('json') || mime.includes('xml') || mime.includes('html')) return FileCode;
    return FileIcon;
}

interface AttachmentListProps {
    attachments: AttachmentItem[];
}

export function AttachmentList({ attachments }: AttachmentListProps) {
    if (!attachments || attachments.length === 0) return null;

    return (
        <div className="mt-8 mb-8 p-5 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/10">
                <Paperclip className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-semibold text-white">첨부파일 ({attachments.length})</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {attachments.map((att, idx) => {
                    const Icon = iconForMime(att.mimeType || '');
                    return (
                        <a
                            key={`${att.url}-${idx}`}
                            href={att.url}
                            download={att.name}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all group"
                        >
                            <Icon className="w-5 h-5 text-cyan-300/80 group-hover:text-cyan-300 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="text-sm text-white truncate group-hover:text-cyan-100">{att.name}</div>
                                <div className="text-xs text-gray-500">{formatSize(att.size)}</div>
                            </div>
                            <Download className="w-4 h-4 text-gray-500 group-hover:text-cyan-300 shrink-0 transition-colors" />
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
