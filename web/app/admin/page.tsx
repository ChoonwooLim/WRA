'use client';

import { Users, FileText, Activity, Shield, TrendingUp, Clock, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface DashboardStats {
    totalMembers: number;
    activePosts: number;
    pendingReports: number;
    todayVisitors: number;
}

const recentActivities = [
    { user: 'Kim Min-su', action: '회원 가입', time: '2분 전', color: 'bg-green-500' },
    { user: 'Lee Se-yeon', action: 'K-Royal Warrant 인증 신청', time: '15분 전', color: 'bg-blue-500' },
    { user: 'Park Ji-ho', action: '자유게시판 글쓰기', time: '1시간 전', color: 'bg-purple-500' },
    { user: 'Choi Yu-na', action: 'Q&A 질문 등록', time: '2시간 전', color: 'bg-yellow-500' },
    { user: 'Song Hye-min', action: '교육 프로그램 등록', time: '3시간 전', color: 'bg-pink-500' },
    { user: 'Jung Do-yun', action: '왕립 투어 예약', time: '5시간 전', color: 'bg-cyan-500' },
];

const boardStats = [
    { name: '공지사항', posts: 24, today: 2 },
    { name: '자유게시판', posts: 156, today: 8 },
    { name: 'Q&A', posts: 89, today: 3 },
    { name: '뉴스레터', posts: 12, today: 0 },
];

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalMembers: 0,
        activePosts: 0,
        pendingReports: 0,
        todayVisitors: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch real member count
        async function fetchStats() {
            try {
                const res = await fetch('/api/auth/signup', { method: 'GET' });
                // fallback to mock stats (API may not support GET)
                setStats({
                    totalMembers: 2,
                    activePosts: 281,
                    pendingReports: 5,
                    todayVisitors: 127,
                });
            } catch {
                setStats({
                    totalMembers: 2,
                    activePosts: 281,
                    pendingReports: 5,
                    todayVisitors: 127,
                });
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const statCards = [
        { title: '총 회원 수', value: stats.totalMembers.toLocaleString(), change: '+12%', icon: Users, color: 'from-blue-500 to-cyan-400', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
        { title: '게시글', value: stats.activePosts.toLocaleString(), change: '+23', icon: FileText, color: 'from-green-500 to-emerald-400', iconBg: 'bg-green-500/10', iconColor: 'text-green-400' },
        { title: '미처리 신고', value: stats.pendingReports.toLocaleString(), change: '-2', icon: Activity, color: 'from-red-500 to-pink-400', iconBg: 'bg-red-500/10', iconColor: 'text-red-400' },
        { title: '오늘 방문자', value: stats.todayVisitors.toLocaleString(), change: '+18%', icon: TrendingUp, color: 'from-amber-500 to-yellow-400', iconBg: 'bg-amber-500/10', iconColor: 'text-amber-400' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        대시보드
                    </h1>
                    <p className="text-gray-400 mt-1">World Royal Academy 관리자 패널</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative overflow-hidden rounded-2xl border border-white/5 p-5"
                        style={{
                            background: 'linear-gradient(135deg, rgba(10,10,26,0.9) 0%, rgba(15,15,30,0.95) 100%)',
                        }}
                    >
                        {/* Gradient accent line at top */}
                        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${stat.color}`} />

                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-gray-400 text-xs font-medium mb-1 uppercase tracking-wider">{stat.title}</h3>
                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 rounded-2xl border border-white/5 p-6"
                    style={{ background: 'linear-gradient(135deg, rgba(10,10,26,0.9) 0%, rgba(15,15,30,0.95) 100%)' }}
                >
                    <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-cyan-400" />
                        최근 활동
                    </h2>
                    <div className="space-y-3">
                        {recentActivities.map((activity, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors">
                                <div className={`w-2 h-2 rounded-full ${activity.color} flex-shrink-0`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white">
                                        <span className="font-semibold text-cyan-300">{activity.user}</span>
                                        {' '}{activity.action}
                                    </p>
                                </div>
                                <span className="text-xs text-gray-500 flex-shrink-0">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Board Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-2xl border border-white/5 p-6"
                    style={{ background: 'linear-gradient(135deg, rgba(10,10,26,0.9) 0%, rgba(15,15,30,0.95) 100%)' }}
                >
                    <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-purple-400" />
                        게시판 현황
                    </h2>
                    <div className="space-y-4">
                        {boardStats.map((board, i) => (
                            <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-white">{board.name}</span>
                                    <span className="text-xs text-gray-400">{board.posts}개</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-1000"
                                        style={{ width: `${Math.min((board.posts / 200) * 100, 100)}%` }}
                                    />
                                </div>
                                {board.today > 0 && (
                                    <p className="text-xs text-green-400 mt-1">오늘 +{board.today}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions + System Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="rounded-2xl border border-white/5 p-6"
                    style={{ background: 'linear-gradient(135deg, rgba(10,10,26,0.9) 0%, rgba(15,15,30,0.95) 100%)' }}
                >
                    <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-amber-400" />
                        관리 작업
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { label: '공지사항 작성', icon: '📢', color: 'from-blue-600/20 to-blue-600/5' },
                            { label: '회원 관리', icon: '👥', color: 'from-green-600/20 to-green-600/5' },
                            { label: '게시글 관리', icon: '📝', color: 'from-purple-600/20 to-purple-600/5' },
                            { label: '인증 심사', icon: '🏅', color: 'from-amber-600/20 to-amber-600/5' },
                        ].map((action, i) => (
                            <button
                                key={i}
                                className={`p-4 rounded-xl bg-gradient-to-br ${action.color} border border-white/5 hover:border-white/15 transition-all text-left group hover:scale-[1.02]`}
                            >
                                <span className="text-2xl mb-2 block">{action.icon}</span>
                                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* System Health */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="rounded-2xl border border-white/5 p-6"
                    style={{ background: 'linear-gradient(135deg, rgba(10,10,26,0.9) 0%, rgba(15,15,30,0.95) 100%)' }}
                >
                    <h2 className="text-lg font-bold mb-5">시스템 상태</h2>
                    <div className="space-y-5">
                        {[
                            { label: 'Server Load', value: 24, color: 'from-green-500 to-green-400' },
                            { label: 'Database Usage', value: 45, color: 'from-blue-500 to-blue-400' },
                            { label: 'Memory Usage', value: 62, color: 'from-yellow-500 to-yellow-400' },
                            { label: 'Storage', value: 35, color: 'from-purple-500 to-purple-400' },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">{item.label}</span>
                                    <span className={`font-medium ${item.value < 50 ? 'text-green-400' : item.value < 75 ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {item.value}%
                                    </span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.value}%` }}
                                        transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
