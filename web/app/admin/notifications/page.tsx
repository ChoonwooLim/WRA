'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCheck, UserPlus, FileText, Shield, MessageSquare, Mail, Trash2, ChevronDown, ExternalLink, RefreshCw, MessageSquareReply } from 'lucide-react';
import Link from 'next/link';

type NotifType = 'signup' | 'cert' | 'post' | 'comment' | 'subscribe' | 'answer';

interface Notif {
    id: string;
    type: NotifType;
    title: string;
    message: string;
    detail: string | null;
    actionLabel: string | null;
    actionHref: string | null;
    isRead: boolean;
    createdAt: string;
}

const iconMap: Record<NotifType, any> = {
    signup: UserPlus,
    cert: Shield,
    post: FileText,
    comment: MessageSquare,
    subscribe: Mail,
    answer: MessageSquareReply,
};

const colorMap: Record<NotifType, { text: string; bg: string }> = {
    signup: { text: 'text-green-400', bg: 'bg-green-500/10' },
    cert: { text: 'text-blue-400', bg: 'bg-blue-500/10' },
    post: { text: 'text-purple-400', bg: 'bg-purple-500/10' },
    comment: { text: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    subscribe: { text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    answer: { text: 'text-cyan-300', bg: 'bg-cyan-400/10' },
};

type FilterKey = 'all' | 'unread' | 'signup' | 'cert' | 'post' | 'subscribe' | 'answer';

function timeAgo(iso: string): string {
    const then = new Date(iso).getTime();
    const diff = Date.now() - then;
    const m = Math.floor(diff / 60000);
    if (m < 1) return '방금 전';
    if (m < 60) return `${m}분 전`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}시간 전`;
    const d = Math.floor(h / 24);
    if (d < 7) return `${d}일 전`;
    return new Date(iso).toLocaleDateString('ko-KR');
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notif[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [filter, setFilter] = useState<FilterKey>('all');
    const [unreadCount, setUnreadCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const fetchNotifications = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/notifications?filter=${filter}`, { cache: 'no-store' });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
            setNotifications(data.notifications || []);
            setUnreadCount(data.unreadCount || 0);
            setTotalCount(data.totalCount || 0);
        } catch (e: any) {
            setNotifications([]);
            setMessage({ type: 'error', text: `알림 조회 실패: ${e?.message || 'unknown'}` });
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

    useEffect(() => {
        if (!message) return;
        const t = setTimeout(() => setMessage(null), 3000);
        return () => clearTimeout(t);
    }, [message]);

    const toggleExpand = async (id: string) => {
        const willOpen = expandedId !== id;
        setExpandedId(willOpen ? id : null);
        if (!willOpen) return;
        const target = notifications.find(n => n.id === id);
        if (!target || target.isRead) return;
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
        setUnreadCount(c => Math.max(0, c - 1));
        try {
            await fetch('/api/admin/notifications', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'markRead', id }),
            });
        } catch { /* non-fatal */ }
    };

    const handleDeleteOne = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const target = notifications.find(n => n.id === id);
        setNotifications(prev => prev.filter(n => n.id !== id));
        setTotalCount(c => Math.max(0, c - 1));
        if (target && !target.isRead) setUnreadCount(c => Math.max(0, c - 1));
        if (expandedId === id) setExpandedId(null);
        try {
            const res = await fetch('/api/admin/notifications', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            if (!res.ok) throw new Error();
        } catch {
            setMessage({ type: 'error', text: '삭제에 실패했습니다.' });
            fetchNotifications();
        }
    };

    const handleMarkAllRead = async () => {
        if (unreadCount === 0) return;
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        setUnreadCount(0);
        try {
            const res = await fetch('/api/admin/notifications', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'markAllRead' }),
            });
            if (!res.ok) throw new Error();
            setMessage({ type: 'success', text: '모두 읽음 처리됨' });
        } catch {
            setMessage({ type: 'error', text: '처리 실패' });
            fetchNotifications();
        }
    };

    const handleDeleteAll = async () => {
        if (totalCount === 0) return;
        if (!confirm(`모든 알림 ${totalCount}개를 삭제하시겠습니까? (복구 불가)`)) return;
        try {
            const res = await fetch('/api/admin/notifications', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ all: true }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.error);
            setMessage({ type: 'success', text: `${data.deleted}개 삭제됨` });
            setNotifications([]);
            setTotalCount(0);
            setUnreadCount(0);
            setExpandedId(null);
        } catch (e: any) {
            setMessage({ type: 'error', text: e?.message || '삭제 실패' });
        }
    };

    const tabs: { key: FilterKey; label: string }[] = [
        { key: 'all', label: '전체' },
        { key: 'unread', label: '읽지 않음' },
        { key: 'signup', label: '회원가입' },
        { key: 'subscribe', label: '뉴스레터' },
        { key: 'post', label: '게시글' },
        { key: 'answer', label: 'Q&A 답변' },
        { key: 'cert', label: '인증' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        알림
                        {unreadCount > 0 && (
                            <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold">
                                {unreadCount} 새 알림
                            </span>
                        )}
                    </h1>
                    <p className="text-gray-400 mt-1">시스템 알림 및 활동 내역 · 총 <span className="text-white">{totalCount}</span>건</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetchNotifications}
                        className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-colors flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        새로고침
                    </button>
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
                        disabled={totalCount === 0}
                        className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-red-400 hover:border-red-500/30 transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <Trash2 className="w-4 h-4" />
                        전체 삭제
                    </button>
                </div>
            </div>

            {message && (
                <div
                    className={`p-3 rounded-xl text-sm ${message.type === 'success'
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/10 border border-red-500/20 text-red-400'
                        }`}
                >
                    {message.text}
                </div>
            )}

            {/* Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === tab.key ? 'bg-white/10 text-white border border-white/15' : 'bg-white/[0.02] text-gray-400 border border-white/5 hover:bg-white/5 hover:text-white'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Notifications List */}
            <div className="space-y-2">
                {loading ? (
                    <div className="py-16 text-center text-gray-500 text-sm">불러오는 중...</div>
                ) : notifications.length === 0 ? (
                    <div className="py-16 text-center text-gray-500 text-sm">
                        {filter === 'all' ? '알림이 없습니다.' : '해당 필터에 알림이 없습니다.'}
                    </div>
                ) : (
                    notifications.map((notif, i) => {
                        const Icon = iconMap[notif.type] || FileText;
                        const colors = colorMap[notif.type] || colorMap.post;
                        const isExpanded = expandedId === notif.id;
                        return (
                            <motion.div
                                key={notif.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(i * 0.03, 0.3) }}
                                className={`rounded-xl border transition-colors group ${notif.isRead ? 'bg-[#0a0a1a] border-white/5' : 'bg-white/[0.03] border-white/10'}`}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleExpand(notif.id)}
                                    className={`w-full text-left flex items-start gap-4 p-4 rounded-xl transition-colors ${notif.isRead ? 'hover:bg-white/[0.03]' : 'hover:bg-white/[0.05]'}`}
                                >
                                    <ChevronDown
                                        size={14}
                                        className={`flex-shrink-0 mt-3.5 text-gray-500 transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                                    />

                                    <div className="relative shrink-0 mt-0.5">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.bg}`}>
                                            <Icon className={`w-5 h-5 ${colors.text}`} />
                                        </div>
                                        {!notif.isRead && (
                                            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-[#0a0a1a]" />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className={`text-sm font-semibold ${notif.isRead ? 'text-gray-300' : 'text-white'}`}>
                                                {notif.title}
                                            </h3>
                                            {!notif.isRead && (
                                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-400">NEW</span>
                                            )}
                                        </div>
                                        <p className={`text-sm text-gray-400 ${isExpanded ? '' : 'truncate'}`}>{notif.message}</p>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0 mt-1">
                                        <span className="text-xs text-gray-500 whitespace-nowrap">{timeAgo(notif.createdAt)}</span>
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
                                                {notif.detail && (
                                                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{notif.detail}</p>
                                                )}
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
        </div>
    );
}
