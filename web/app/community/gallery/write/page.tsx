
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ChevronLeft, Upload, Loader2, Image as ImageIcon, X } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';

export default function GalleryWritePage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!selectedFile) {
            alert('이미지를 선택해주세요.');
            return;
        }
        if (!session?.user) {
            alert('로그인이 필요합니다. 관리자 로그인 후 다시 시도해주세요.');
            return;
        }

        setUploading(true);

        try {
            // 1. Upload Image
            const formData = new FormData();
            formData.append('file', selectedFile);

            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!uploadRes.ok) {
                const errData = await uploadRes.json();
                throw new Error(errData.error || 'Upload failed');
            }

            const uploadData = await uploadRes.json();
            const imageUrl = uploadData.url;

            // 2. Create Post
            // We construct HTML content with the image for consistency with the generic Post model
            const htmlContent = `
                <p><img src="${imageUrl}" alt="${title}" style="max-width: 100%;" /></p>
                <div class="description">${description.replace(/\n/g, '<br/>')}</div>
            `;

            const postRes = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    content: htmlContent,
                    board: 'gallery',
                    category: 'General',
                    authorId: (session.user as any).id,
                }),
            });

            if (!postRes.ok) throw new Error('Failed to create post');

            router.push('/community/gallery');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('업로드 중 오류가 발생했습니다.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-[#050510] min-h-screen pt-[100px] pb-20 px-4">
            <div className="container mx-auto max-w-2xl">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    돌아가기
                </button>

                <GlassCard className="p-8">
                    <h1 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">
                        📸 사진 올리기
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Image Uploader */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">이미지 선택</label>
                            {!previewUrl ? (
                                <div
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleDrop}
                                    className="border-2 border-dashed border-white/20 rounded-xl p-10 text-center hover:border-[#d4af37]/50 hover:bg-white/5 transition-all cursor-pointer relative"
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex flex-col items-center pointer-events-none">
                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                            <Upload className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <p className="text-white font-medium mb-1">클릭하거나 이미지를 드래그하세요</p>
                                        <p className="text-gray-500 text-xs">JPG, PNG, GIF, WebP (Max 10MB)</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative rounded-xl overflow-hidden border border-white/20 bg-black/40">
                                    <img src={previewUrl} alt="Preview" className="max-h-[400px] w-full object-contain mx-auto" />
                                    <button
                                        type="button"
                                        onClick={clearFile}
                                        className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-red-500/80 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Title Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">제목</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#d4af37] text-white transition-colors"
                                placeholder="제목을 입력하세요"
                                required
                            />
                        </div>

                        {/* Description Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">설명</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#d4af37] text-white transition-colors min-h-[120px]"
                                placeholder="사진에 대한 설명을 입력하세요..."
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={uploading || !selectedFile || !title}
                                className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#b38728] text-black font-bold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        업로드 중...
                                    </>
                                ) : (
                                    <>
                                        <ImageIcon className="w-5 h-5" />
                                        등록하기
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </GlassCard>
            </div>
        </div>
    );
}
