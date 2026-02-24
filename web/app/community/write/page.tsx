'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Send, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

const boardOptions = [
    { value: 'notices', label: '📢 공지사항', adminOnly: true },
    { value: 'newsletter', label: '📰 뉴스레터 발간', adminOnly: true },
    { value: 'qna', label: '❓ Q&A', adminOnly: false },
    { value: 'free-board', label: '💬 자유게시판', adminOnly: false },
];

const categoryOptions: Record<string, string[]> = {
    notices: ['활동', '인증', '투어', '교육', '일반'],
    newsletter: [],
    qna: [],
    'free-board': [],
};

const NEWSLETTER_TEMPLATES = {
    standard: `<div style="font-family: 'Malgun Gothic', sans-serif; line-height: 1.8; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #0d0d20; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-bottom: 20px;">[이곳에 뉴스레터 소제목을 입력하세요]</h2>
    <p style="font-size: 16px;">여기에 뉴스레터 전문 텍스트를 입력해주세요.</p>
    <p style="font-size: 16px;">WRA의 최신 소식과 공지사항을 자유롭게 작성할 수 있는 기본형 템플릿입니다.</p>
</div>`,
    showcase: `<div style="font-family: 'Malgun Gothic', sans-serif; line-height: 1.8; color: #333; max-width: 800px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <div style="width: 100%; height: 300px; background-color: #f3f4f6; position: relative;">
        <!-- 이미지 주소를 src="여기에" 넣어주세요 -->
        <img src="https://via.placeholder.com/800x300?text=Header+Image+Here" alt="Header Image" style="width: 100%; height: 100%; object-fit: cover;" />
    </div>
    <div style="padding: 40px; background-color: #ffffff;">
        <h2 style="color: #0d0d20; font-size: 28px; margin-top: 0; margin-bottom: 20px; font-weight: bold;">[메인 쇼케이스 제목을 입력하세요]</h2>
        <h3 style="color: #d4af37; font-size: 18px; margin-top: 0; margin-bottom: 30px;">서브 타이틀 또는 강조 문구</h3>
        <p style="font-size: 16px; color: #4b5563; margin-bottom: 20px;">
            중요한 행사나 멤버십 도입, 혹은 주요 성과를 소개하기 좋은 프리미엄 이미지 배너형 템플릿입니다. 이 텍스트를 지우고 내용을 입력해주세요. 첫인상을 강력하게 남길 수 있습니다.
        </p>
    </div>
</div>`,
    event: `<div style="font-family: 'Malgun Gothic', sans-serif; line-height: 1.8; color: #333; max-width: 800px; margin: 0 auto; background-color: #fafafa; padding: 40px; border-radius: 16px;">
    <div style="text-align: center; margin-bottom: 40px;">
        <span style="display: inline-block; padding: 6px 16px; background-color: #0d0d20; color: #d4af37; border-radius: 20px; font-size: 14px; font-weight: bold; margin-bottom: 20px;">EVENT INVITATION</span>
        <h2 style="color: #111827; font-size: 32px; margin: 0 0 16px 0;">[행사 또는 이벤트 제목]</h2>
        <p style="font-size: 18px; color: #6b7280; max-width: 600px; margin: 0 auto;">여러분을 특별한 자리에 초대합니다. 행사 목적이나 간단한 소개를 여기에 적어주세요.</p>
    </div>
    
    <div style="background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); margin-bottom: 30px; border: 1px solid #f3f4f6;">
        <h3 style="margin-top: 0; color: #0d0d20; font-size: 18px; border-bottom: 1px solid #e5e7eb; padding-bottom: 15px; margin-bottom: 20px;">행사 개요 (Event Details)</h3>
        <ul style="list-style-type: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 12px;"><strong>🗓️ 일시:</strong> 2026년 00월 00일 (요일) 00:00 AM</li>
            <li style="margin-bottom: 12px;"><strong>📍 장소:</strong> [행사 장소명 및 주소 입력]</li>
            <li style="margin-bottom: 12px;"><strong>👥 대상:</strong> [참석 대상자 기준 입력]</li>
            <li style="margin-bottom: 0;"><strong>👗 드레스코드:</strong> 비즈니스 포멀 (예시)</li>
        </ul>
    </div>
    
    <div style="text-align: center;">
        <a href="#" style="display: inline-block; background-color: #d4af37; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-weight: bold; font-size: 16px;">참석 신청하기 (RSVP)</a>
    </div>
</div>`
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

    // Template states
    const [templateType, setTemplateType] = useState('standard');
    const [templateData, setTemplateData] = useState({
        imageUrl: '',
        mainTitle: '',
        subtitle: '',
        description: '',
        eventDate: '',
        location: '',
        audience: '',
        dressCode: '',
        rsvpLink: ''
    });

    const [submitting, setSubmitting] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [error, setError] = useState('');

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validating file type
        if (!file.type.startsWith('image/')) {
            setError('이미지 파일만 업로드 가능합니다.');
            return;
        }

        setUploadingImage(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || '업로드 실패');
            }

            setTemplateData(prev => ({ ...prev, imageUrl: data.url }));
        } catch (err: any) {
            console.error('Error uploading image:', err);
            setError(err.message || '이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setUploadingImage(false);
        }
    };

    // @ts-ignore
    const isAdmin = session?.user?.role === 'admin' || session?.user?.role === 'sub-admin';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Form Validation
        if (!title.trim()) {
            setError('게시판 제목을 입력해주세요.');
            return;
        }

        let finalContent = content;

        if (board === 'newsletter') {
            if (templateType === 'showcase') {
                if (!templateData.mainTitle || !templateData.description) {
                    setError('쇼케이스 제목과 본문 내용을 모두 입력해주세요.');
                    return;
                }
                finalContent = `<div style="font-family: 'Malgun Gothic', sans-serif; line-height: 1.8; color: #333; max-width: 800px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <div style="width: 100%; height: 300px; background-color: #f3f4f6; position: relative;">
        <img src="${templateData.imageUrl || 'https://via.placeholder.com/800x300?text=Header+Image+Here'}" alt="Header Image" style="width: 100%; height: 100%; object-fit: cover;" />
    </div>
    <div style="padding: 40px; background-color: #ffffff;">
        <h2 style="color: #0d0d20; font-size: 28px; margin-top: 0; margin-bottom: 20px; font-weight: bold;">${templateData.mainTitle}</h2>
        ${templateData.subtitle ? `<h3 style="color: #d4af37; font-size: 18px; margin-top: 0; margin-bottom: 30px;">${templateData.subtitle}</h3>` : ''}
        <p style="font-size: 16px; color: #4b5563; margin-bottom: 20px; white-space: pre-wrap;">${templateData.description}</p>
    </div>
</div>`;
            } else if (templateType === 'event') {
                if (!templateData.mainTitle || !templateData.eventDate) {
                    setError('행사 제목과 일시를 모두 입력해주세요.');
                    return;
                }
                finalContent = `<div style="font-family: 'Malgun Gothic', sans-serif; line-height: 1.8; color: #333; max-width: 800px; margin: 0 auto; background-color: #fafafa; padding: 40px; border-radius: 16px;">
    <div style="text-align: center; margin-bottom: 40px;">
        <span style="display: inline-block; padding: 6px 16px; background-color: #0d0d20; color: #d4af37; border-radius: 20px; font-size: 14px; font-weight: bold; margin-bottom: 20px;">EVENT INVITATION</span>
        <h2 style="color: #111827; font-size: 32px; margin: 0 0 16px 0;">${templateData.mainTitle}</h2>
        <p style="font-size: 18px; color: #6b7280; max-width: 600px; margin: 0 auto; white-space: pre-wrap;">${templateData.description}</p>
    </div>
    
    <div style="background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); margin-bottom: 30px; border: 1px solid #f3f4f6;">
        <h3 style="margin-top: 0; color: #0d0d20; font-size: 18px; border-bottom: 1px solid #e5e7eb; padding-bottom: 15px; margin-bottom: 20px;">행사 개요 (Event Details)</h3>
        <ul style="list-style-type: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 12px;"><strong>🗓️ 일시:</strong> ${templateData.eventDate}</li>
            <li style="margin-bottom: 12px;"><strong>📍 장소:</strong> ${templateData.location}</li>
            <li style="margin-bottom: 12px;"><strong>👥 대상:</strong> ${templateData.audience}</li>
            <li style="margin-bottom: 0;"><strong>👗 드레스코드:</strong> ${templateData.dressCode}</li>
        </ul>
    </div>
    
    ${templateData.rsvpLink ? `<div style="text-align: center;">
        <a href="${templateData.rsvpLink}" target="_blank" style="display: inline-block; background-color: #d4af37; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-weight: bold; font-size: 16px;">참석 신청하기 (RSVP)</a>
    </div>` : ''}
</div>`;
            } else if (templateType === 'full-image') {
                if (!templateData.imageUrl) {
                    setError('업로드된 이미지가 없습니다. 이미지를 첨부해주세요.');
                    return;
                }
                finalContent = `<div style="text-align: center;">
    <img src="${templateData.imageUrl}" alt="Newsletter Image" style="max-width: 100%; height: auto; display: inline-block; border-radius: 8px;" />
</div>`;
            } else if (!finalContent.trim()) {
                setError('본문 내용을 입력해주세요.');
                return;
            }
        } else if (!finalContent.trim()) {
            setError('내용을 입력해주세요.');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ board, title, content: finalContent, category: category || undefined }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || '게시글 작성에 실패했습니다.');
                setSubmitting(false);
                return;
            }

            const boardPath = board === 'free-board' ? 'free-board' : board === 'qna' ? 'qna' : board === 'newsletter' ? 'newsletter' : 'notices';
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

                {board === 'newsletter' && isAdmin && (
                    <div className="p-4 rounded-xl bg-[#0a0f25]/50 border border-blue-500/20">
                        <label className="block text-sm font-bold text-blue-400 mb-3">📰 뉴스레터 양식 선택</label>
                        <p className="text-xs text-gray-400 mb-4">원하시는 양식을 선택하시면 아래에 해당 양식을 채울 수 있는 빈칸 폼이 제공됩니다.</p>
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => setTemplateType('standard')}
                                className={`px-4 py-2 border rounded-lg text-sm transition-colors ${templateType === 'standard' ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}
                            >
                                📝 일반 에디터
                            </button>
                            <button
                                type="button"
                                onClick={() => setTemplateType('showcase')}
                                className={`px-4 py-2 border rounded-lg text-sm transition-colors ${templateType === 'showcase' ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}
                            >
                                🖼️ 쇼케이스 이미지형
                            </button>
                            <button
                                type="button"
                                onClick={() => setTemplateType('event')}
                                className={`px-4 py-2 border rounded-lg text-sm transition-colors ${templateType === 'event' ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}
                            >
                                📅 행사 안내 (RSVP)형
                            </button>
                            <button
                                type="button"
                                onClick={() => setTemplateType('full-image')}
                                className={`px-4 py-2 border rounded-lg text-sm transition-colors ${templateType === 'full-image' ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}
                            >
                                🖼️ 통이미지 (Full Image) 업로드형
                            </button>
                        </div>
                    </div>
                )}

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

                {board === 'newsletter' && templateType !== 'standard' ? (
                    <div className="space-y-4 border border-white/10 p-5 rounded-xl bg-white/5">
                        <h3 className="text-cyan-400 font-bold mb-4 border-b border-white/10 pb-2">기본 정보 (빈칸을 채워주세요)</h3>

                        {templateType !== 'full-image' && (
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">{templateType === 'showcase' ? '메인 쇼케이스 제목' : '행사 또는 이벤트 제목'}</label>
                                <input
                                    type="text"
                                    value={templateData.mainTitle}
                                    onChange={(e) => setTemplateData(prev => ({ ...prev, mainTitle: e.target.value }))}
                                    placeholder="예: 왕립아카데미 출범 행사 안내"
                                    className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50"
                                />
                            </div>
                        )}

                        {(templateType === 'showcase' || templateType === 'full-image') && (
                            <>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">
                                        {templateType === 'full-image' ? '뉴스레터 전체 이미지 (첨부)' : '상단 배너 이미지 (PC 업로드 또는 주소 입력)'}
                                    </label>
                                    <div className="flex gap-2">
                                        <label className="flex-shrink-0 cursor-pointer bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all rounded-xl px-4 py-2.5 flex items-center gap-2 group">
                                            {uploadingImage ? (
                                                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                                            ) : (
                                                <Upload className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                                            )}
                                            <span className="text-sm text-white">{uploadingImage ? '업로드 중...' : 'PC에서 첨부'}</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageUpload}
                                                disabled={uploadingImage}
                                            />
                                        </label>
                                        <div className="relative flex-1">
                                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                                <ImageIcon className="w-4 h-4 text-gray-500" />
                                            </div>
                                            <input
                                                type="text"
                                                value={templateData.imageUrl}
                                                onChange={(e) => setTemplateData(prev => ({ ...prev, imageUrl: e.target.value }))}
                                                placeholder="https://example.com/image.jpg (또는 좌측 'PC에서 첨부' 버튼 사용)"
                                                className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {templateType === 'full-image'
                                            ? "미리 만들어두신 포스터나 세로형 통이미지를 첨부하시면 본문에 화면 꽉 차게 나타납니다."
                                            : "직접 업로드하시거나, 기존 이미지의 웹 주소(URL)를 입력하셔도 됩니다."}
                                    </p>

                                    {templateData.imageUrl && (
                                        <div className="mt-3 w-full max-h-96 rounded-lg border border-white/10 overflow-hidden relative bg-[#050510] flex justify-center">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={templateData.imageUrl}
                                                alt="Preview"
                                                className={templateType === 'full-image' ? "max-h-96 w-auto object-contain" : "w-full h-32 object-cover"}
                                            />
                                        </div>
                                    )}
                                </div>

                                {templateType === 'showcase' && (
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">서브 타이틀</label>
                                        <input
                                            type="text"
                                            value={templateData.subtitle}
                                            onChange={(e) => setTemplateData(prev => ({ ...prev, subtitle: e.target.value }))}
                                            placeholder="예: WRA의 새로운 시작을 함께합니다"
                                            className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50"
                                        />
                                    </div>
                                )}
                            </>
                        )}

                        {templateType === 'event' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-y border-white/10 py-4 my-2">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">🗓️ 행사 일시</label>
                                    <input
                                        type="text"
                                        value={templateData.eventDate}
                                        onChange={(e) => setTemplateData(prev => ({ ...prev, eventDate: e.target.value }))}
                                        placeholder="예: 2026년 00월 00일 (요일) 00:00"
                                        className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">📍 행사 장소</label>
                                    <input
                                        type="text"
                                        value={templateData.location}
                                        onChange={(e) => setTemplateData(prev => ({ ...prev, location: e.target.value }))}
                                        placeholder="예: 서울 신라호텔 다이너스티홀"
                                        className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">👥 참석 대상</label>
                                    <input
                                        type="text"
                                        value={templateData.audience}
                                        onChange={(e) => setTemplateData(prev => ({ ...prev, audience: e.target.value }))}
                                        placeholder="예: WRA 프레스티지 멤버십 회원"
                                        className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">👗 드레스코드</label>
                                    <input
                                        type="text"
                                        value={templateData.dressCode}
                                        onChange={(e) => setTemplateData(prev => ({ ...prev, dressCode: e.target.value }))}
                                        placeholder="예: 비즈니스 포멀"
                                        className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gray-400 mb-1">🔗 참석 신청 화면 링크 (URL 권장)</label>
                                    <input
                                        type="text"
                                        value={templateData.rsvpLink}
                                        onChange={(e) => setTemplateData(prev => ({ ...prev, rsvpLink: e.target.value }))}
                                        placeholder="예: https://forms.gle/..."
                                        className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">상세 내용 (일반 텍스트만 작성)</label>
                            <textarea
                                value={templateData.description}
                                onChange={(e) => setTemplateData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="행사나 내용에 대해 덧붙이고 싶은 상세 설명을 적어주세요. (줄바꿈 지원됨)"
                                rows={6}
                                className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 resize-none text-sm"
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">내용 {board === 'newsletter' && '(일반 텍스트 위주)'}</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="내용을 입력하세요"
                            rows={12}
                            className="w-full bg-[#0a0a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                        />
                    </div>
                )}

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
