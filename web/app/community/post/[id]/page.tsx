'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Edit, Trash2, Eye, Clock, User, MessageSquareReply, Check, X } from 'lucide-react';
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
    answerContent: string | null;
    answererId: string | null;
    answeredAt: string | null;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    author: { id: string; name: string | null; email: string | null; role: string };
    answerer?: { id: string; name: string | null; email: string | null; role: string } | null;
}

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { data: session } = useSession();
    const [post, setPost] = useState<PostData | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [answerEditing, setAnswerEditing] = useState(false);
    const [answerDraft, setAnswerDraft] = useState('');
    const [answerSaving, setAnswerSaving] = useState(false);

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
        'newsletter': '📰 뉴스레터 발간',
        'qna': '❓ Q&A',
        'free-board': '💬 자유게시판',
        'gallery': '📸 이미지 갤러리',
    };

    const boardPath: Record<string, string> = {
        'notices': '/community/notices',
        'newsletter': '/community/newsletter',
        'qna': '/community/qna',
        'free-board': '/community/free-board',
        'gallery': '/community/gallery',
    };

    // @ts-ignore
    const isAuthor = session?.user?.email === post?.author?.email;
    // @ts-ignore
    const isAdmin = session?.user?.role === 'admin' || session?.user?.role === 'sub-admin';
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

    const startAnswerEdit = () => {
        setAnswerDraft(post?.answerContent || '');
        setAnswerEditing(true);
    };

    const cancelAnswerEdit = () => {
        setAnswerDraft('');
        setAnswerEditing(false);
    };

    const saveAnswer = async () => {
        if (!post) return;
        const trimmed = answerDraft.trim();
        if (trimmed === '') {
            if (!confirm('답변을 삭제하시겠습니까?')) return;
        }
        setAnswerSaving(true);
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answerContent: trimmed }),
            });
            const data = await res.json();
            if (res.ok && data.post) {
                setPost(data.post);
                setAnswerEditing(false);
                setAnswerDraft('');
            } else {
                alert(data.error || '답변 저장에 실패했습니다.');
            }
        } catch {
            alert('네트워크 오류가 발생했습니다.');
        } finally {
            setAnswerSaving(false);
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
                    <button onClick={() => router.back()} className="text-cyan-400 hover:underline">이전 화면으로 돌아가기</button>
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
                <div
                    className="min-h-[200px] text-gray-300 leading-relaxed whitespace-pre-wrap mb-8 prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Q&A Answer Section */}
                {post.board === 'qna' && (
                    <div className="mb-8 border-t border-white/10 pt-6">
                        {/* Existing answer display */}
                        {post.answerContent && !answerEditing && (
                            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-5 mb-4">
                                <div className="flex items-center justify-between mb-3 pb-3 border-b border-cyan-500/10">
                                    <div className="flex items-center gap-2">
                                        <MessageSquareReply className="w-4 h-4 text-cyan-400" />
                                        <span className="text-cyan-400 font-semibold text-sm">관리자 답변</span>
                                        {post.answerer && (
                                            <span className="text-gray-400 text-xs">
                                                · {post.answerer.name || '관리자'}
                                            </span>
                                        )}
                                        {post.answeredAt && (
                                            <span className="text-gray-500 text-xs">
                                                · {new Date(post.answeredAt).toLocaleString('ko-KR')}
                                            </span>
                                        )}
                                    </div>
                                    {isAdmin && (
                                        <button
                                            onClick={startAnswerEdit}
                                            className="flex items-center gap-1 text-xs text-cyan-300 hover:text-cyan-200"
                                        >
                                            <Edit className="w-3 h-3" />
                                            수정
                                        </button>
                                    )}
                                </div>
                                <div
                                    className="text-gray-200 leading-relaxed whitespace-pre-wrap prose prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: post.answerContent }}
                                />
                            </div>
                        )}

                        {/* Admin editor */}
                        {isAdmin && answerEditing && (
                            <div className="bg-white/5 border border-cyan-500/30 rounded-xl p-5 mb-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <MessageSquareReply className="w-4 h-4 text-cyan-400" />
                                    <span className="text-cyan-400 font-semibold text-sm">
                                        {post.answerContent ? '답변 수정' : '답변 작성'}
                                    </span>
                                </div>
                                <textarea
                                    value={answerDraft}
                                    onChange={(e) => setAnswerDraft(e.target.value)}
                                    placeholder="답변 내용을 입력하세요. HTML 태그(예: <br>, <strong>) 사용 가능."
                                    rows={6}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 resize-y"
                                />
                                <div className="flex justify-end gap-2 mt-3">
                                    <button
                                        onClick={cancelAnswerEdit}
                                        disabled={answerSaving}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-sm disabled:opacity-50"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                        취소
                                    </button>
                                    <button
                                        onClick={saveAnswer}
                                        disabled={answerSaving}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-sm disabled:opacity-50"
                                    >
                                        <Check className="w-3.5 h-3.5" />
                                        {answerSaving ? '저장 중...' : '저장'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* No answer yet — admin write button */}
                        {!post.answerContent && !answerEditing && (
                            <div className="text-center py-6">
                                {isAdmin ? (
                                    <button
                                        onClick={startAnswerEdit}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition-all text-sm"
                                    >
                                        <MessageSquareReply className="w-4 h-4" />
                                        답변 작성
                                    </button>
                                ) : (
                                    <p className="text-gray-500 text-sm">아직 답변이 등록되지 않았습니다.</p>
                                )}
                            </div>
                        )}
                    </div>
                )}

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
