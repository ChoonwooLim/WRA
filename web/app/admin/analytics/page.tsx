'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Eye, FileText, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const monthlyData = [
    { month: '9월', visitors: 420, signups: 12, posts: 34 },
    { month: '10월', visitors: 580, signups: 18, posts: 45 },
    { month: '11월', visitors: 750, signups: 25, posts: 52 },
    { month: '12월', visitors: 680, signups: 20, posts: 48 },
    { month: '1월', visitors: 920, signups: 32, posts: 67 },
    { month: '2월', visitors: 1150, signups: 41, posts: 78 },
];

const topPages = [
    { path: '/', name: '메인 페이지', views: 3420, change: '+15%' },
    { path: '/education/literature', name: '한국 인문학', views: 1280, change: '+42%' },
    { path: '/tours', name: '왕립 투어', views: 980, change: '+8%' },
    { path: '/crown-prince/message', name: '황태손 인사말', views: 760, change: '+23%' },
    { path: '/education/korean', name: '한국어 교육', views: 540, change: '-3%' },
];

export default function AnalyticsPage() {
    const maxVisitors = Math.max(...monthlyData.map(d => d.visitors));

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">통계</h1>
                <p className="text-gray-400 mt-1">사이트 방문 및 활동 통계</p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: '이번 달 방문자', value: '1,150', change: '+25%', up: true, icon: Eye, gradient: 'from-blue-500 to-cyan-400' },
                    { label: '이번 달 가입', value: '41', change: '+28%', up: true, icon: Users, gradient: 'from-green-500 to-emerald-400' },
                    { label: '이번 달 게시글', value: '78', change: '+16%', up: true, icon: FileText, gradient: 'from-purple-500 to-violet-400' },
                    { label: '평균 체류시간', value: '4분 32초', change: '+12%', up: true, icon: TrendingUp, gradient: 'from-amber-500 to-yellow-400' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative overflow-hidden rounded-xl border border-white/5 p-5 bg-[#0a0a1a]"
                    >
                        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${stat.gradient}`} />
                        <div className="flex items-center justify-between mb-3">
                            <stat.icon className="w-5 h-5 text-gray-500" />
                            <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Monthly Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 rounded-2xl border border-white/5 p-6 bg-[#0a0a1a]"
                >
                    <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-cyan-400" />
                        월별 방문자 추이
                    </h2>
                    <div className="flex items-end gap-3 h-48">
                        {monthlyData.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <span className="text-xs text-gray-400">{d.visitors}</span>
                                <motion.div
                                    className="w-full rounded-t-lg bg-gradient-to-t from-cyan-500/60 to-cyan-400/30 min-h-[4px]"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(d.visitors / maxVisitors) * 100}%` }}
                                    transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                                />
                                <span className="text-xs text-gray-500">{d.month}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Top Pages */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-2xl border border-white/5 p-6 bg-[#0a0a1a]"
                >
                    <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-400" />
                        인기 페이지
                    </h2>
                    <div className="space-y-4">
                        {topPages.map((page, i) => (
                            <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-white truncate">{page.name}</span>
                                    <span className={`text-xs font-semibold ${page.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                        {page.change}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">{page.path}</span>
                                    <span className="text-xs text-gray-400">{page.views.toLocaleString()} views</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Monthly Details Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-2xl border border-white/5 overflow-hidden bg-[#0a0a1a]"
            >
                <div className="p-6 border-b border-white/5">
                    <h2 className="text-lg font-bold">월별 상세</h2>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400 text-sm">
                        <tr>
                            <th className="px-6 py-3">월</th>
                            <th className="px-6 py-3">방문자</th>
                            <th className="px-6 py-3">가입자</th>
                            <th className="px-6 py-3">게시글</th>
                            <th className="px-6 py-3">전환율</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {monthlyData.map((d, i) => (
                            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-3 text-white font-medium">{d.month}</td>
                                <td className="px-6 py-3 text-gray-300">{d.visitors.toLocaleString()}</td>
                                <td className="px-6 py-3 text-gray-300">{d.signups}</td>
                                <td className="px-6 py-3 text-gray-300">{d.posts}</td>
                                <td className="px-6 py-3 text-cyan-400">{((d.signups / d.visitors) * 100).toFixed(1)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            <p className="text-center text-gray-600 text-xs">※ 샘플 데이터입니다. Google Analytics 또는 자체 분석 API 연동 후 실시간 데이터로 교체됩니다.</p>
        </div>
    );
}
