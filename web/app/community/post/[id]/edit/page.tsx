'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

const categoryOptions: Record<string, string[]> = {
    notices: ['활동', '인증', '투어', '교육', '일반'],
    qna: [],
    'free-board': [],
};

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { data: session } = useSession();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [board, setBoard] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`/api/posts/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.post) {
                    setTitle(data.post.title);
                    setContent(data.post.content);
                    setCategory(data.post.category || '');
                    setBoard(data.post.board);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setError('제목과 내용을 모두 입력해주세요.');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content, category: category || undefined }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || '수정에 실패했습니다.');
                setSubmitting(false);
                return;
            }

            router.push(`/community/post/${id}`);
        } catch {
            setError('네트워크 오류가 발생했습니다.');
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-[#050510] min-h-screen pt-[100px] pb-20 px-4">
                <div className="board-container text-center py-20 text-gray-400">로딩 중...</div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="bg-[#050510] min-h-screen pt-[100px] pb-20 px-4">
                <div className="board-container text-center py-20">
                    <p className="text-gray-400 text-lg mb-4">로그인이 필요합니다.</p>
                    <Link href="/" className="text-cyan-400 hover:underline">홈으로 돌아가기</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#050510] min-h-screen pt-[100px] pb-20 px-4">
            <div className="board-container">
                <div className="board-header">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.back()} className="text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h1 className="board-title">✏️ 글 수정</h1>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Category (for notices only) */}
                    {categoryOptions[board]?.length > 0 && (
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">카테고리</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50"
                            >
                                <option value="">선택 안함</option>
                                {categoryOptions[board].map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Title */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">제목</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">내용</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={12}
                            className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="btn-tv-primary disabled:opacity-50"
                        >
                            <Save className="w-3.5 h-3.5" />
                            {submitting ? '저장 중...' : '저장하기'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
