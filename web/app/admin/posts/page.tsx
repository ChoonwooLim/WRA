'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Eye, ThumbsUp, Trash2, ExternalLink, Edit, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Post {
    id: string;
    board: string;
    title: string;
    category: string | null;
    views: number;
    likes: number;
    answered: boolean;
    createdAt: string;
    author: { name: string | null; email: string | null };
}

const boardLabels: Record<string, string> = {
    notices: '공지사항',
    qna: 'Q&A',
    'free-board': '자유게시판',
};

const boardColors: Record<string, string> = {
    notices: 'bg-yellow-500/20 text-yellow-300',
    qna: 'bg-purple-500/20 text-purple-300',
    'free-board': 'bg-cyan-500/20 text-cyan-300',
};

export default function AdminPostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [boardFilter, setBoardFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ page: String(page), limit: '15' });
            if (boardFilter) params.set('board', boardFilter);
            if (searchTerm) params.set('search', searchTerm);
            const res = await fetch(`/api/posts?${params}`);
            const data = await res.json();
            setPosts(data.posts || []);
            setTotal(data.total || 0);
            setTotalPages(data.totalPages || 1);
        } catch {
            setPosts([]);
        } finally {
            setLoading(false);
        }
    }, [page, boardFilter, searchTerm]);

    useEffect(() => { fetchPosts(); }, [fetchPosts]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        setSearchTerm(searchInput);
    };

    const toggleSelect = (id: string) => {
        setSelected(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const toggleAll = () => {
        if (selected.size === posts.length) {
            setSelected(new Set());
        } else {
            setSelected(new Set(posts.map(p => p.id)));
        }
    };

    const handleDeleteSelected = async () => {
        if (selected.size === 0) return;
        if (!confirm(`선택한 ${selected.size}개의 게시글을 삭제하시겠습니까?`)) return;

        try {
            await Promise.all(
                Array.from(selected).map(id =>
                    fetch(`/api/posts/${id}`, { method: 'DELETE' })
                )
            );
            setSelected(new Set());
            fetchPosts();
        } catch {
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    const handleDeleteOne = async (id: string, title: string) => {
        if (!confirm(`"${title}" 게시글을 삭제하시겠습니까?`)) return;
        try {
            const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
            if (res.ok) fetchPosts();
            else alert('삭제에 실패했습니다.');
        } catch { alert('네트워크 오류가 발생했습니다.'); }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">게시글 관리</h1>
                    <p className="text-gray-400 mt-1">전체 게시글 {total}개</p>
                </div>
                <div className="flex gap-3">
                    {selected.size > 0 && (
                        <button
                            onClick={handleDeleteSelected}
                            className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all text-sm flex items-center gap-2"
                        >
                            <Trash2 size={16} />
                            {selected.size}개 삭제
                        </button>
                    )}
                    <Link
                        href="/community/write?board=notices"
                        className="px-4 py-2 bg-primary text-black font-bold rounded-xl hover:bg-yellow-500 transition-colors text-sm"
                    >
                        새 공지 작성
                    </Link>
                </div>
            </div>

            <div className="bg-[#0a0a1a] border border-white/5 rounded-2xl overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-white/5 flex items-center gap-4 flex-wrap">
                    <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="게시글 검색..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl py-2 pl-10 pr-3 text-white text-sm focus:outline-none focus:border-primary/50"
                        />
                    </form>
                    <div className="flex gap-2">
                        {['', 'notices', 'qna', 'free-board'].map((b) => (
                            <button
                                key={b}
                                onClick={() => { setBoardFilter(b); setPage(1); }}
                                className={`px-3 py-2 rounded-xl text-sm transition-all ${boardFilter === b
                                    ? 'bg-primary/20 text-primary border border-primary/30'
                                    : 'bg-white/5 text-gray-300 hover:text-white border border-transparent'
                                    }`}
                            >
                                {b === '' ? '전체' : boardLabels[b]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Post List */}
                <div className="divide-y divide-white/5">
                    {/* Header row */}
                    <div className="px-4 py-3 flex items-center gap-4 text-xs text-gray-500 uppercase tracking-wide">
                        <div className="w-6">
                            <input
                                type="checkbox"
                                checked={posts.length > 0 && selected.size === posts.length}
                                onChange={toggleAll}
                                className="rounded bg-white/10 border-white/20 cursor-pointer"
                            />
                        </div>
                        <div className="flex-1">게시글</div>
                        <div className="w-20 text-center">게시판</div>
                        <div className="w-24 text-center">작성일</div>
                        <div className="w-16 text-center">조회</div>
                        <div className="w-16 text-center">추천</div>
                        <div className="w-28 text-center">관리</div>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center text-gray-500">로딩 중...</div>
                    ) : posts.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">게시글이 없습니다.</div>
                    ) : (
                        posts.map((post) => (
                            <div key={post.id} className="px-4 py-3 hover:bg-white/5 transition-colors flex items-center gap-4 group">
                                <div className="w-6">
                                    <input
                                        type="checkbox"
                                        checked={selected.has(post.id)}
                                        onChange={() => toggleSelect(post.id)}
                                        className="rounded bg-white/10 border-white/20 cursor-pointer"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-medium text-sm truncate group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                        {post.category && (
                                            <span className="bg-white/10 px-1.5 py-0.5 rounded text-gray-300">{post.category}</span>
                                        )}
                                        <span>{post.author?.name || '알 수 없음'}</span>
                                        {post.board === 'qna' && (
                                            <span className={`px-1.5 py-0.5 rounded text-[10px] ${post.answered ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                                                {post.answered ? '답변완료' : '답변대기'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-20 text-center">
                                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${boardColors[post.board] || 'bg-white/10 text-gray-300'}`}>
                                        {boardLabels[post.board] || post.board}
                                    </span>
                                </div>
                                <div className="w-24 text-center text-xs text-gray-400">
                                    {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                                </div>
                                <div className="w-16 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                                    <Eye size={12} /> {post.views}
                                </div>
                                <div className="w-16 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                                    <ThumbsUp size={12} /> {post.likes}
                                </div>
                                <div className="w-28 flex items-center justify-center gap-1">
                                    <Link
                                        href={`/community/post/${post.id}`}
                                        className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-cyan-400 transition-all"
                                        title="보기"
                                    >
                                        <ExternalLink size={14} />
                                    </Link>
                                    <Link
                                        href={`/community/post/${post.id}/edit`}
                                        className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-yellow-400 transition-all"
                                        title="수정"
                                    >
                                        <Edit size={14} />
                                    </Link>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDeleteOne(post.id, post.title); }}
                                        className="p-1.5 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-all"
                                        title="삭제"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="p-4 border-t border-white/5 flex items-center justify-center gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 disabled:opacity-30 transition-all"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).slice(
                            Math.max(0, page - 3), Math.min(totalPages, page + 2)
                        ).map(p => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`w-8 h-8 rounded-lg text-sm transition-all ${p === page
                                    ? 'bg-primary/20 text-primary border border-primary/30'
                                    : 'text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 disabled:opacity-30 transition-all"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
