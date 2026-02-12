'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

const boardOptions = [
    { value: 'notices', label: '📢 공지사항', adminOnly: true },
    { value: 'qna', label: '❓ Q&A', adminOnly: false },
    { value: 'free-board', label: '💬 자유게시판', adminOnly: false },
];

const categoryOptions: Record<string, string[]> = {
    notices: ['활동', '인증', '투어', '교육', '일반'],
    qna: [],
    'free-board': [],
};

function WriteForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const defaultBoard = searchParams.get('board') || 'free-board';

    const [board, setBoard] = useState(defaultBoard);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    // @ts-ignore
    const isAdmin = session?.user?.role === 'admin';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setError('제목과 내용을 모두 입력해주세요.');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ board, title, content, category: category || undefined }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || '게시글 작성에 실패했습니다.');
                setSubmitting(false);
                return;
            }

            const boardPath = board === 'free-board' ? 'free-board' : board === 'qna' ? 'qna' : 'notices';
            router.push(`/community/${boardPath}`);
        } catch {
            setError('네트워크 오류가 발생했습니다.');
            setSubmitting(false);
        }
    };

    if (!session) {
        return (
            <div className="board-container text-center py-20">
                <p className="text-gray-400 text-lg mb-4">로그인이 필요합니다.</p>
                <Link href="/" className="text-cyan-400 hover:underline">홈으로 돌아가기</Link>
            </div>
        );
    }

    return (
        <div className="board-container">
            <div className="board-header">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="board-title">✏️ 글쓰기</h1>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">게시판 선택</label>
                    <div className="flex gap-3 flex-wrap">
                        {boardOptions.map((opt) => {
                            if (opt.adminOnly && !isAdmin) return null;
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => { setBoard(opt.value); setCategory(''); }}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${board === opt.value
                                        ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300'
                                        : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

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

                <div>
                    <label className="block text-sm text-gray-400 mb-2">제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                        className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-2">내용</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요"
                        rows={12}
                        className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                    />
                </div>

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
                        <Send className="w-3.5 h-3.5" />
                        {submitting ? '등록 중...' : '등록하기'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function WritePage() {
    return (
        <div className="bg-[#050510] min-h-screen pt-[100px] pb-20 px-4">
            <Suspense fallback={<div className="board-container text-center py-20 text-gray-400">로딩 중...</div>}>
                <WriteForm />
            </Suspense>
        </div>
    );
}
