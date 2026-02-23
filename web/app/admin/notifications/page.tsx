'use client';

import { motion } from 'framer-motion';
import { Bell, CheckCheck, UserPlus, FileText, Shield, Eye, MessageSquare, Trash2 } from 'lucide-react';

const notifications = [
    { id: 1, type: 'signup', icon: UserPlus, title: '새 회원 가입', message: 'Kim Min-su님이 회원가입했습니다.', time: '2분 전', read: false, color: 'text-green-400', bg: 'bg-green-500' },
    { id: 2, type: 'cert', icon: Shield, title: '인증 신청', message: 'Lee Se-yeon님이 K-Royal Warrant 인증을 신청했습니다.', time: '15분 전', read: false, color: 'text-blue-400', bg: 'bg-blue-500' },
    { id: 3, type: 'post', icon: FileText, title: '새 게시글', message: 'Park Ji-ho님이 자유게시판에 글을 작성했습니다.', time: '1시간 전', read: false, color: 'text-purple-400', bg: 'bg-purple-500' },
    { id: 4, type: 'comment', icon: MessageSquare, title: 'Q&A 질문', message: 'Choi Yu-na님이 Q&A에 질문을 등록했습니다.', time: '2시간 전', read: true, color: 'text-yellow-400', bg: 'bg-yellow-500' },
    { id: 5, type: 'signup', icon: UserPlus, title: '새 회원 가입', message: 'Song Hye-min님이 회원가입했습니다.', time: '3시간 전', read: true, color: 'text-green-400', bg: 'bg-green-500' },
    { id: 6, type: 'cert', icon: Shield, title: '인증 승인 완료', message: 'Park Ji-ho님의 K-Royal Warrant 인증이 승인되었습니다.', time: '5시간 전', read: true, color: 'text-blue-400', bg: 'bg-blue-500' },
    { id: 7, type: 'post', icon: FileText, title: '새 게시글', message: 'Jung Do-yun님이 공지사항을 작성했습니다.', time: '1일 전', read: true, color: 'text-purple-400', bg: 'bg-purple-500' },
    { id: 8, type: 'signup', icon: UserPlus, title: '새 회원 가입', message: 'Oh Seo-jun님이 회원가입했습니다.', time: '2일 전', read: true, color: 'text-green-400', bg: 'bg-green-500' },
];

export default function NotificationsPage() {
    const unreadCount = notifications.filter(n => !n.read).length;

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
                    <button className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-colors flex items-center gap-2">
                        <CheckCheck className="w-4 h-4" />
                        모두 읽음
                    </button>
                    <button className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-red-400 hover:border-red-500/30 transition-colors flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        전체 삭제
                    </button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
                {[
                    { label: '전체', count: notifications.length },
                    { label: '읽지 않음', count: unreadCount },
                    { label: '회원가입', count: notifications.filter(n => n.type === 'signup').length },
                    { label: '인증', count: notifications.filter(n => n.type === 'cert').length },
                    { label: '게시글', count: notifications.filter(n => n.type === 'post' || n.type === 'comment').length },
                ].map((tab, i) => (
                    <button
                        key={i}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${i === 0 ? 'bg-white/10 text-white border border-white/15' : 'bg-white/[0.02] text-gray-400 border border-white/5 hover:bg-white/5 hover:text-white'}`}
                    >
                        {tab.label}
                        <span className="ml-1.5 text-xs text-gray-500">{tab.count}</span>
                    </button>
                ))}
            </div>

            {/* Notifications List */}
            <div className="space-y-2">
                {notifications.map((notif, i) => {
                    const Icon = notif.icon;
                    return (
                        <motion.div
                            key={notif.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`flex items-start gap-4 p-4 rounded-xl border transition-colors cursor-pointer group ${notif.read ? 'bg-[#0a0a1a] border-white/5 hover:bg-white/[0.03]' : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]'}`}
                        >
                            {/* Icon */}
                            <div className="relative shrink-0 mt-0.5">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${notif.bg}/10`}>
                                    <Icon className={`w-5 h-5 ${notif.color}`} />
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
                                <p className="text-sm text-gray-400 truncate">{notif.message}</p>
                            </div>

                            {/* Time + Actions */}
                            <div className="flex flex-col items-end gap-2 shrink-0">
                                <span className="text-xs text-gray-500">{notif.time}</span>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-white">
                                    <Eye className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <p className="text-center text-gray-600 text-xs">※ 샘플 데이터입니다. 실시간 알림 시스템 연동 후 교체됩니다.</p>
        </div>
    );
}
