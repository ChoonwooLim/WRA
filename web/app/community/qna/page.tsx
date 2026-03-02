'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { Search, Pen, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Post {
    id: string;
    title: string;
    views: number;
    answered: boolean;
    createdAt: string;
    author: { name: string | null };
}

export default function QnAPage() {
    const { dict } = useLanguage();
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ board: 'qna', page: String(page), limit: '10' });
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
    }, [page, searchTerm]);

    useEffect(() => { fetchPosts(); }, [fetchPosts]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        setSearchTerm(searchInput);
    };

    return (
        <div className="bg-[#050510] min-h-screen pt-[100px] pb-20 px-4">
            <div className="board-container">
                <div className="board-header">
                    <h1 className="board-title">Q&A</h1>
                </div>

                <div className="board-controls">
                    <form onSubmit={handleSearch} className="board-search">
                        <Search className="w-4 h-4" />
                        <input
                            type="text"
                            placeholder="질문 검색..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </form>
                    <Link href="/community/write?board=qna" className="btn-tv-primary">
                        <Pen className="w-3.5 h-3.5" />
                        질문하기
                    </Link>
                </div>

                <table className="board-table">
                    <thead>
                        <tr>
                            <th style={{ width: '70px' }}>번호</th>
                            <th style={{ width: '100px' }}>상태</th>
                            <th>제목</th>
                            <th style={{ width: '120px' }}>작성자</th>
                            <th style={{ width: '110px' }}>작성일</th>
                            <th style={{ width: '80px' }}>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} className="text-center py-8 text-gray-500">로딩 중...</td></tr>
                        ) : posts.length === 0 ? (
                            <tr><td colSpan={6} className="text-center py-8 text-gray-500">게시글이 없습니다.</td></tr>
                        ) : (
                            posts.map((item, idx) => (
                                <tr key={item.id} className="cursor-pointer" onClick={() => router.push(`/community/post/${item.id}`)}>
                                    <td className="text-center text-gray-400">{total - ((page - 1) * 10 + idx)}</td>
                                    <td className="text-center">
                                        <span className={item.answered ? 'status-answered' : 'status-pending'}>
                                            {item.answered ? '답변완료' : '답변대기'}
                                        </span>
                                    </td>
                                    <td className="post-title">{item.title}</td>
                                    <td className="text-center text-gray-400">{item.author?.name || '-'}</td>
                                    <td className="text-center text-gray-400">{new Date(item.createdAt).toLocaleDateString('ko-KR')}</td>
                                    <td className="text-center text-gray-400">{item.views}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {totalPages > 1 && (
                    <div className="board-pagination">
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).slice(
                            Math.max(0, page - 3), Math.min(totalPages, page + 2)
                        ).map(p => (
                            <button key={p} className={p === page ? 'active' : ''} onClick={() => setPage(p)}>{p}</button>
                        ))}
                        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
