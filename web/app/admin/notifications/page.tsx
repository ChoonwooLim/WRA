'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCheck, UserPlus, FileText, Shield, MessageSquare, Trash2, ChevronDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';

type NotifType = 'signup' | 'cert' | 'post' | 'comment';

interface Notif {
    id: number;
    type: NotifType;
    title: string;
    message: string;
    detail: string;
    actionLabel?: string;
    actionHref?: string;
    time: string;
    read: boolean;
}

const iconMap = {
    signup: UserPlus,
    cert: Shield,
    post: FileText,
    comment: MessageSquare,
};

const colorMap: Record<NotifType, { text: string; bg: string }> = {
    signup: { text: 'text-green-400', bg: 'bg-green-500/10' },
    cert: { text: 'text-blue-400', bg: 'bg-blue-500/10' },
    post: { text: 'text-purple-400', bg: 'bg-purple-500/10' },
    comment: { text: 'text-yellow-400', bg: 'bg-yellow-500/10' },
};

const typeFilterMap: Record<string, (n: Notif) => boolean> = {
    all: () => true,
    unread: (n) => !n.read,
    signup: (n) => n.type === 'signup',
    cert: (n) => n.type === 'cert',
    post: (n) => n.type === 'post' || n.type === 'comment',
};

const initialNotifications: Notif[] = [
    { id: 1, type: 'signup', title: '새 회원 가입', message: 'Kim Min-su님이 회원가입했습니다.', detail: '이메일: kim.minsu@example.com · 가입 경로: 웹사이트 직접 가입 · 승인 대기 상태입니다.', actionLabel: '회원 관리로 이동', actionHref: '/admin/members', time: '2분 전', read: false },
    { id: 2, type: 'cert', title: '인증 신청', message: 'Lee Se-yeon님이 K-Royal Warrant 인증을 신청했습니다.', detail: '신청 등급: Royal 33 · 제출 서류: 2건 · 승인 검토가 필요합니다.', actionLabel: '인증 관리로 이동', actionHref: '/admin/verifications', time: '15분 전', read: false },
    { id: 3, type: 'post', title: '새 게시글', message: 'Park Ji-ho님이 자유게시판에 글을 작성했습니다.', detail: '제목: "2026년 상반기 행사 일정 정리해봤습니다" · 조회 425 · 추천 28', actionLabel: '게시글 관리로 이동', actionHref: '/admin/posts', time: '1시간 전', read: false },
    { id: 4, type: 'comment', title: 'Q&A 질문', message: 'Choi Yu-na님이 Q&A에 질문을 등록했습니다.', detail: '카테고리: 인증 절차 · 답변 대기 상태 · 관리자 답변이 필요합니다.', actionLabel: 'Q&A 확인', actionHref: '/community/qna', time: '2시간 전', read: true },
    { id: 5, type: 'signup', title: '새 회원 가입', message: 'Song Hye-min님이 회원가입했습니다.', detail: '이메일: song.hm@example.com · 가입 경로: 추천 링크 · 승인 완료.', actionLabel: '회원 관리로 이동', actionHref: '/admin/members', time: '3시간 전', read: true },
    { id: 6, type: 'cert', title: '인증 승인 완료', message: 'Park Ji-ho님의 K-Royal Warrant 인증이 승인되었습니다.', detail: '승인 등급: Royal 33 · 승인자: admin@wra.com · 인증서 발급 완료.', actionLabel: '인증 관리로 이동', actionHref: '/admin/verifications', time: '5시간 전', read: true },
    { id: 7, type: 'post', title: '새 게시글', message: 'Jung Do-yun님이 공지사항을 작성했습니다.', detail: '제목: "WRA 커뮤니티에 오신 것을 환영합니다!" · 공지사항 보드 · 전체 공개.', actionLabel: '게시글 관리로 이동', actionHref: '/admin/posts', time: '1일 전', read: true },
    { id: 8, type: 'signup', title: '새 회원 가입', message: 'Oh Seo-jun님이 회원가입했습니다.', detail: '이메일: oh.seojun@example.com · 가입 경로: 웹사이트 직접 가입 · 승인 완료.', actionLabel: '회원 관리로 이동', actionHref: '/admin/members', time: '2일 전', read: true },
];

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notif[]>(initialNotifications);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [filter, setFilter] = useState<string>('all');

    const unreadCount = notifications.filter(n => !n.read).length;
    const filtered = notifications.filter(typeFilterMap[filter]);

    const toggleExpand = (id: number) => {
        setExpandedId(prev => (prev === id ? null : id));
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const handleDeleteOne = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setNotifications(prev => prev.filter(n => n.id !== id));
        if (expandedId === id) setExpandedId(null);
    };

    const handleMarkAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const handleDeleteAll = () => {
        if (notifications.length === 0) return;
        if (!confirm(`모든 알림 ${notifications.length}개를 삭제하시겠습니까?`)) return;
        setNotifications([]);
        setExpandedId(null);
    };

    const tabs = [
        { key: 'all', label: '전체', count: notifications.length },
        { key: 'unread', label: '읽지 않음', count: unreadCount },
        { key: 'signup', label: '회원가입', count: notifications.filter(n => n.type === 'signup').length },
        { key: 'cert', label: '인증', count: notifications.filter(n => n.type === 'cert').length },
        { key: 'post', label: '게시글', count: notifications.filter(n => n.type === 'post' || n.type === 'comment').length },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        알림
                        {unreadCount > 0 && (
                            <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold">
                                {unreadCount} 새 알림
                            </span>
                        )}
                    </h1>
                    <p className="text-gray-400 mt-1">시스템 알림 및 활동 내역</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleMarkAllRead}
                        disabled={unreadCount === 0}
                        className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <CheckCheck className="w-4 h-4" />
                        모두 읽음
                    </button>
                    <button
                        onClick={handleDeleteAll}
                        disabled={notifications.length === 0}
                        className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-red-400 hover:border-red-500/30 transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <Trash2 className="w-4 h-4" />
                        전체 삭제
                    </button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === tab.key ? 'bg-white/10 text-white border border-white/15' : 'bg-white/[0.02] text-gray-400 border border-white/5 hover:bg-white/5 hover:text-white'}`}
                    >
                        {tab.label}
                        <span className="ml-1.5 text-xs text-gray-500">{tab.count}</span>
                    </button>
                ))}
            </div>

            {/* Notifications List */}
            <div className="space-y-2">
                {filtered.length === 0 ? (
                    <div className="py-16 text-center text-gray-500 text-sm">알림이 없습니다.</div>
                ) : (
                    filtered.map((notif, i) => {
                        const Icon = iconMap[notif.type];
                        const colors = colorMap[notif.type];
                        const isExpanded = expandedId === notif.id;
                        return (
                            <motion.div
                                key={notif.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04 }}
                                className={`rounded-xl border transition-colors group ${notif.read ? 'bg-[#0a0a1a] border-white/5' : 'bg-white/[0.03] border-white/10'}`}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleExpand(notif.id)}
                                    className={`w-full text-left flex items-start gap-4 p-4 rounded-xl transition-colors ${notif.read ? 'hover:bg-white/[0.03]' : 'hover:bg-white/[0.05]'}`}
                                >
                                    <ChevronDown
                                        size={14}
                                        className={`flex-shrink-0 mt-3.5 text-gray-500 transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                                    />

                                    {/* Icon */}
                                    <div className="relative shrink-0 mt-0.5">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.bg}`}>
                                            <Icon className={`w-5 h-5 ${colors.text}`} />
                                        </div>
                                        {!notif.read && (
                                            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-[#0a0a1a]" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className={`text-sm font-semibold ${notif.read ? 'text-gray-300' : 'text-white'}`}>
                                                {notif.title}
                                            </h3>
                                            {!notif.read && (
                                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-400">NEW</span>
                                            )}
                                        </div>
                                        <p className={`text-sm text-gray-400 ${isExpanded ? '' : 'truncate'}`}>{notif.message}</p>
                                    </div>

                                    {/* Time + Delete */}
                                    <div className="flex items-center gap-2 shrink-0 mt-1">
                                        <span className="text-xs text-gray-500 whitespace-nowrap">{notif.time}</span>
                                        <button
                                            onClick={(e) => handleDeleteOne(notif.id, e)}
                                            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-all"
                                            title="이 알림 삭제"
                                            aria-label="이 알림 삭제"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </button>

                                {/* Expanded Panel */}
                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 pb-4 pl-[76px] border-t border-white/5 pt-3 space-y-3 bg-black/20">
                                                <p className="text-sm text-gray-300 leading-relaxed">{notif.detail}</p>
                                                {notif.actionHref && (
                                                    <Link
                                                        href={notif.actionHref}
                                                        className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                        {notif.actionLabel || '상세 보기'}
                                                    </Link>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })
                )}
            </div>

            <p className="text-center text-gray-600 text-xs">※ 샘플 데이터입니다. 실시간 알림 시스템 연동 후 교체됩니다.</p>
        </div>
    );
}
