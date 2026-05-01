'use client';

import { useState, useRef, useCallback, DragEvent } from 'react';
import {
    Paperclip, X, Upload, FileText, FileImage, FileVideo, FileAudio,
    FileArchive, FileCode, File as FileIcon, CheckCircle2, AlertCircle,
} from 'lucide-react';

export interface Attachment {
    name: string;
    url: string;
    size: number;
    mimeType: string;
}

interface UploadingItem {
    id: string;
    name: string;
    size: number;
    progress: number; // 0..100
    error?: string;
}

interface AttachmentUploaderProps {
    value: Attachment[];
    onChange: (next: Attachment[]) => void;
    maxFiles?: number;
    maxSizeMB?: number;
}

const DEFAULT_MAX_FILES = 10;
const DEFAULT_MAX_SIZE_MB = 50;

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

export function AttachmentUploader({
    value,
    onChange,
    maxFiles = DEFAULT_MAX_FILES,
    maxSizeMB = DEFAULT_MAX_SIZE_MB,
}: AttachmentUploaderProps) {
    const [uploading, setUploading] = useState<UploadingItem[]>([]);
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const uploadOne = useCallback((file: File) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const item: UploadingItem = { id, name: file.name, size: file.size, progress: 0 };
        setUploading((prev) => [...prev, item]);

        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/upload');

        xhr.upload.addEventListener('progress', (e) => {
            if (!e.lengthComputable) return;
            const pct = Math.round((e.loaded / e.total) * 100);
            setUploading((prev) => prev.map((u) => (u.id === id ? { ...u, progress: pct } : u)));
        });

        xhr.addEventListener('load', () => {
            try {
                const data = JSON.parse(xhr.responseText);
                if (xhr.status >= 200 && xhr.status < 300 && data.url) {
                    onChange([
                        ...value,
                        {
                            name: file.name,
                            url: data.url,
                            size: file.size,
                            mimeType: file.type || 'application/octet-stream',
                        },
                    ]);
                    setUploading((prev) => prev.filter((u) => u.id !== id));
                } else {
                    setUploading((prev) =>
                        prev.map((u) => (u.id === id ? { ...u, error: data.error || '업로드 실패' } : u))
                    );
                }
            } catch {
                setUploading((prev) =>
                    prev.map((u) => (u.id === id ? { ...u, error: '응답 파싱 실패' } : u))
                );
            }
        });

        xhr.addEventListener('error', () => {
            setUploading((prev) =>
                prev.map((u) => (u.id === id ? { ...u, error: '네트워크 오류' } : u))
            );
        });

        xhr.send(formData);
    }, [onChange, value]);

    const handleFiles = useCallback((files: FileList | File[]) => {
        const list = Array.from(files);
        if (list.length === 0) return;

        const remaining = maxFiles - value.length - uploading.length;
        if (remaining <= 0) {
            alert(`첨부파일은 최대 ${maxFiles}개까지 업로드 가능합니다.`);
            return;
        }

        const tooLarge = list.find((f) => f.size > maxSizeMB * 1024 * 1024);
        if (tooLarge) {
            alert(`'${tooLarge.name}' 의 크기가 너무 큽니다. (최대 ${maxSizeMB}MB)`);
        }

        const valid = list
            .filter((f) => f.size <= maxSizeMB * 1024 * 1024)
            .slice(0, remaining);

        valid.forEach(uploadOne);
    }, [maxFiles, maxSizeMB, uploadOne, uploading.length, value.length]);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
        if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
    };

    const removeAttachment = (idx: number) => {
        const next = value.slice();
        next.splice(idx, 1);
        onChange(next);
    };

    const dismissUpload = (id: string) => {
        setUploading((prev) => prev.filter((u) => u.id !== id));
    };

    const total = value.length + uploading.length;

    return (
        <div className="space-y-3">
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all p-6 text-center ${
                    dragOver
                        ? 'border-cyan-400 bg-cyan-500/10'
                        : 'border-white/15 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]'
                }`}
            >
                <Upload className="w-7 h-7 mx-auto mb-2 text-cyan-400/80" />
                <p className="text-sm text-gray-300">
                    파일을 이곳에 드래그하거나 <span className="text-cyan-300 font-semibold">클릭하여 선택</span>하세요
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    최대 {maxFiles}개 · 파일당 {maxSizeMB}MB · 모든 형식 지원 ({total}/{maxFiles})
                </p>
                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files) handleFiles(e.target.files);
                        e.target.value = '';
                    }}
                />
            </div>

            {(value.length > 0 || uploading.length > 0) && (
                <div className="space-y-2">
                    {value.map((att, idx) => {
                        const Icon = iconForMime(att.mimeType);
                        return (
                            <div
                                key={`${att.url}-${idx}`}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                            >
                                <Icon className="w-5 h-5 text-cyan-300 shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm text-white truncate">{att.name}</div>
                                    <div className="text-xs text-gray-500">{formatSize(att.size)}</div>
                                </div>
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <button
                                    type="button"
                                    onClick={() => removeAttachment(idx)}
                                    className="text-gray-500 hover:text-red-400 p-1 rounded transition-colors"
                                    title="제거"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        );
                    })}

                    {uploading.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10"
                        >
                            <Paperclip className="w-5 h-5 text-gray-400 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <div className="text-sm text-white truncate">{item.name}</div>
                                    <span className="text-xs text-gray-400 shrink-0">
                                        {item.error ? '실패' : `${item.progress}%`}
                                    </span>
                                </div>
                                <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                                    <div
                                        className={`h-full transition-all ${item.error ? 'bg-red-500' : 'bg-gradient-to-r from-cyan-400 to-purple-400'}`}
                                        style={{ width: `${item.error ? 100 : item.progress}%` }}
                                    />
                                </div>
                                {item.error && (
                                    <div className="flex items-center gap-1 mt-1 text-xs text-red-400">
                                        <AlertCircle className="w-3 h-3" />
                                        {item.error}
                                    </div>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => dismissUpload(item.id)}
                                className="text-gray-500 hover:text-red-400 p-1 rounded transition-colors"
                                title={item.error ? '닫기' : '취소'}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
