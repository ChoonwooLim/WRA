'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Edit, Trash2, Eye, Clock, User } from 'lucide-react';
import Link from 'next/link';

interface PostData {
    id: string;
    board: string;
    title: string;
    content: string;
    category: string | null;
    views: number;
    likes: number;
    answered: boolean;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    author: { id: string; name: string | null; email: string | null; role: string };
}

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { data: session } = useSession();
    const [post, setPost] = useState<PostData | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetch(`/api/posts/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.post) setPost(data.post);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const boardLabel: Record<string, string> = {
        'notices': '📢 공지사항',
        'qna': '❓ Q&A',
        'free-board': '💬 자유게시판',
    };

    const boardPath: Record<string, string> = {
        'notices': '/community/notices',
        'qna': '/community/qna',
        'free-board': '/community/free-board',
    };

    // @ts-ignore
    const isAuthor = session?.user?.email === post?.author?.email;
    // @ts-ignore
    const isAdmin = session?.user?.role === 'admin';
    const canEdit = isAuthor || isAdmin;

    const handleDelete = async () => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        setDeleting(true);
        try {
            const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
            if (res.ok && post) {
                router.push(boardPath[post.board] || '/community/free-board');
            } else {
                alert('삭제에 실패했습니다.');
                setDeleting(false);
            }
        } catch {
            alert('네트워크 오류가 발생했습니다.');
            setDeleting(false);
        }
    };

    // Toggle answered status (admin only, QnA only)
    const handleToggleAnswered = async () => {
        if (!post || !isAdmin) return;
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answered: !post.answered }),
            });
            const data = await res.json();
            if (data.post) setPost(data.post);
        } catch {
            alert('상태 변경에 실패했습니다.');
        }
    };

    if (loading) {
        return (
            <div className="bg-[#050510] min-h-screen pt-[100px] pb-20 px-4">
                <div className="board-container text-center py-20 text-gray-400">
                    로딩 중...
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="bg-[#050510] min-h-screen pt-[100px] pb-20 px-4">
                <div className="board-container text-center py-20">
                    <p className="text-gray-400 text-lg mb-4">게시글을 찾을 수 없습니다.</p>
                    <Link href="/community/free-board" className="text-cyan-400 hover:underline">목록으로 돌아가기</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#050510] min-h-screen pt-[100px] pb-20 px-4">
            <div className="board-container">
                {/* Back button + Board label */}
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => router.push(boardPath[post.board] || '/community/free-board')}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm text-gray-500">{boardLabel[post.board]}</span>
                    {post.category && (
                        <span className="board-badge">{post.category}</span>
                    )}
                    {post.board === 'qna' && (
                        <span
                            className={`cursor-pointer ${post.answered ? 'status-answered' : 'status-pending'}`}
                            onClick={isAdmin ? handleToggleAnswered : undefined}
                            title={isAdmin ? '클릭하여 상태 변경' : ''}
                        >
                            {post.answered ? '답변완료' : '답변대기'}
                        </span>
                    )}
                </div>

                {/* Post Header */}
                <div className="border-b border-white/10 pb-5 mb-6">
                    <h1 className="text-2xl font-bold text-white mb-3">{post.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                        <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {post.author?.name || '알 수 없음'}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            조회 {post.views}
                        </span>
                    </div>
                </div>

                {/* Post Content */}
                <div className="min-h-[200px] text-gray-300 leading-relaxed whitespace-pre-wrap mb-8">
                    {post.content}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-5 border-t border-white/10">
                    <button
                        onClick={() => router.push(boardPath[post.board] || '/community/free-board')}
                        className="px-4 py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm"
                    >
                        목록
                    </button>
                    {canEdit && (
                        <div className="flex gap-3">
                            <Link
                                href={`/community/post/${post.id}/edit`}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all text-sm"
                            >
                                <Edit className="w-3.5 h-3.5" />
                                수정
                            </Link>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all text-sm disabled:opacity-50"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                {deleting ? '삭제 중...' : '삭제'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
