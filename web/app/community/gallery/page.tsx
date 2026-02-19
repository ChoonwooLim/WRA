
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Pen, Image as ImageIcon, ThumbsUp, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';

interface Post {
    id: string;
    title: string;
    content: string;
    views: number;
    likes: number;
    createdAt: string;
    author: { name: string | null };
}

export default function GalleryPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ board: 'gallery', page: String(page), limit: '12' }); // 12 items for grid
            if (searchTerm) params.set('search', searchTerm);
            const res = await fetch(`/api/posts?${params}`);
            const data = await res.json();
            setPosts(data.posts || []);
            setTotalPages(data.totalPages || 1);
        } catch {
            setPosts([]);
        } finally {
            setLoading(false);
        }
    }, [page, searchTerm]);

    useEffect(() => { fetchPosts(); }, [fetchPosts]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        setSearchTerm(searchInput);
    };

    // Helper to extract first image text from content
    const extractImageSrc = (htmlContent: string) => {
        const match = htmlContent.match(/<img[^>]+src="([^">]+)"/);
        return match ? match[1] : null;
    };

    return (
        <div className="bg-[#050510] min-h-screen pt-[100px] pb-20 px-4">
            <div className="board-container">
                <div className="board-header mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">📸 이미지 갤러리</h1>
                    <p className="text-gray-400">WRA의 다양한 활동 모습을 확인하세요.</p>
                </div>

                <div className="board-controls mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <form onSubmit={handleSearch} className="board-search w-full md:w-auto">
                        <Search className="w-4 h-4" />
                        <input
                            type="text"
                            placeholder="이미지 검색..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500"
                        />
                    </form>
                    <Link href="/community/gallery/write" className="btn-tv-primary whitespace-nowrap">
                        <Pen className="w-3.5 h-3.5" />
                        사진 올리기
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-500">로딩 중...</div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">등록된 이미지가 없습니다.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {posts.map((post, idx) => {
                            const imgSrc = extractImageSrc(post.content);
                            return (
                                <GlassCard
                                    key={post.id}
                                    className="p-0 overflow-hidden cursor-pointer group hover:border-[#d4af37]/50 transition-colors"
                                    delay={idx * 0.05}
                                >
                                    <div onClick={() => router.push(`/community/post/${post.id}`)}>
                                        {/* Image Thumbnail */}
                                        <div className="relative aspect-square bg-black/20 overflow-hidden">
                                            {imgSrc ? (
                                                <img
                                                    src={imgSrc}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-600">
                                                    <ImageIcon className="w-12 h-12 opacity-20" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                                <div className="flex justify-between items-center text-xs text-white/80">
                                                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.views}</span>
                                                    <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {post.likes}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4">
                                            <h3 className="text-white font-medium truncate mb-1 text-lg group-hover:text-[#d4af37] transition-colors">{post.title}</h3>
                                            <div className="flex justify-between items-center text-xs text-gray-500">
                                                <span>{post.author?.name || '익명'}</span>
                                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            );
                        })}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="board-pagination mt-12 flex justify-center gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="p-2 rounded-lg bg-white/5 disabled:opacity-30 hover:bg-white/10 text-white"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).slice(
                            Math.max(0, page - 3), Math.min(totalPages, page + 2)
                        ).map(p => (
                            <button
                                key={p}
                                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-[#d4af37] text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
                                onClick={() => setPage(p)}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="p-2 rounded-lg bg-white/5 disabled:opacity-30 hover:bg-white/10 text-white"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
