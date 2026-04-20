'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, FileText, Mail, Bell, ArrowUpRight, ArrowDownRight, Minus, RefreshCw, Eye, Heart } from 'lucide-react';
import Link from 'next/link';

interface MonthlyPoint {
    month: string;
    key: string;
    signups: number;
    posts: number;
    subscribers: number;
}

interface BoardDist {
    board: string;
    label: string;
    count: number;
}

interface TopPost {
    id: string;
    board: string;
    boardLabel: string;
    title: string;
    views: number;
    likes: number;
    createdAt: string;
}

interface RecentNotif {
    id: string;
    type: string;
    title: string;
    message: string;
    createdAt: string;
    isRead: boolean;
}

interface Analytics {
    overview: {
        totalUsers: number;
        totalPosts: number;
        totalSubscribers: number;
        activeSubscribers: number;
        totalNotifications: number;
        thisMonth: { signups: number; posts: number; subscribers: number };
        lastMonth: { signups: number; posts: number; subscribers: number };
        change: { signups: number | null; posts: number | null; subscribers: number | null };
    };
    monthly: MonthlyPoint[];
    boardDistribution: BoardDist[];
    topPosts: TopPost[];
    recentNotifications: RecentNotif[];
    generatedAt: string;
}

type MetricKey = 'signups' | 'posts' | 'subscribers';

const metricConfig: Record<MetricKey, { label: string; color: string; gradientFrom: string; gradientTo: string }> = {
    signups: { label: '회원가입', color: 'text-green-400', gradientFrom: 'from-green-500/60', gradientTo: 'to-emerald-400/30' },
    posts: { label: '게시글', color: 'text-purple-400', gradientFrom: 'from-purple-500/60', gradientTo: 'to-violet-400/30' },
    subscribers: { label: '뉴스레터 구독', color: 'text-cyan-400', gradientFrom: 'from-cyan-500/60', gradientTo: 'to-cyan-400/30' },
};

function ChangeBadge({ value }: { value: number | null }) {
    if (value === null) return <span className="text-xs text-gray-500 flex items-center gap-0.5"><Minus className="w-3 h-3" /> -</span>;
    const up = value > 0;
    const flat = value === 0;
    const colorClass = flat ? 'text-gray-400' : up ? 'text-green-400' : 'text-red-400';
    const Icon = flat ? Minus : up ? ArrowUpRight : ArrowDownRight;
    const sign = flat ? '' : up ? '+' : '';
    return (
        <span className={`text-xs font-semibold flex items-center gap-0.5 ${colorClass}`}>
            <Icon className="w-3 h-3" />
            {sign}{value.toFixed(1)}%
        </span>
    );
}

export default function AnalyticsPage() {
    const [data, setData] = useState<Analytics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [metric, setMetric] = useState<MetricKey>('signups');

    const fetchAnalytics = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/admin/analytics', { cache: 'no-store' });
            const body = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(body.error || `HTTP ${res.status}`);
            setData(body);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'unknown');
            setData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

    const maxValue = data ? Math.max(1, ...data.monthly.map(m => m[metric])) : 1;
    const totalBoardPosts = data?.boardDistribution.reduce((sum, b) => sum + b.count, 0) || 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold">통계</h1>
                    <p className="text-gray-400 mt-1">
                        사이트 활동 현황
                        {data && <span className="ml-2 text-xs text-gray-500">· {new Date(data.generatedAt).toLocaleString('ko-KR')} 기준</span>}
                    </p>
                </div>
                <button
                    onClick={fetchAnalytics}
                    disabled={loading}
                    className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-colors flex items-center gap-2 disabled:opacity-40"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    새로고침
                </button>
            </div>

            {error && (
                <div className="p-3 rounded-xl text-sm bg-red-500/10 border border-red-500/20 text-red-400">
                    통계 조회 실패: {error}
                </div>
            )}

            {loading && !data ? (
                <div className="py-24 text-center text-gray-500">불러오는 중...</div>
            ) : !data ? null : (
                <>
                    {/* Overview Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {
                                label: '총 회원',
                                value: data.overview.totalUsers.toLocaleString(),
                                sub: `이번 달 +${data.overview.thisMonth.signups}`,
                                change: data.overview.change.signups,
                                icon: Users,
                                gradient: 'from-green-500 to-emerald-400',
                            },
                            {
                                label: '총 게시글',
                                value: data.overview.totalPosts.toLocaleString(),
                                sub: `이번 달 +${data.overview.thisMonth.posts}`,
                                change: data.overview.change.posts,
                                icon: FileText,
                                gradient: 'from-purple-500 to-violet-400',
                            },
                            {
                                label: '뉴스레터 구독자',
                                value: `${data.overview.activeSubscribers.toLocaleString()}`,
                                sub: `총 ${data.overview.totalSubscribers.toLocaleString()}명 중 활성`,
                                change: data.overview.change.subscribers,
                                icon: Mail,
                                gradient: 'from-cyan-500 to-sky-400',
                            },
                            {
                                label: '누적 알림',
                                value: data.overview.totalNotifications.toLocaleString(),
                                sub: '회원가입·게시글·구독 이벤트',
                                change: null,
                                icon: Bell,
                                gradient: 'from-amber-500 to-yellow-400',
                            },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="relative overflow-hidden rounded-xl border border-white/5 p-5 bg-[#0a0a1a]"
                            >
                                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${stat.gradient}`} />
                                <div className="flex items-center justify-between mb-3">
                                    <stat.icon className="w-5 h-5 text-gray-500" />
                                    <ChangeBadge value={stat.change} />
                                </div>
                                <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                                <p className="text-[11px] text-gray-500 mt-1">{stat.sub}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Monthly Chart */}
                        <div className="lg:col-span-2 rounded-2xl border border-white/5 p-6 bg-[#0a0a1a]">
                            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-cyan-400" />
                                    월별 추이 (최근 6개월)
                                </h2>
                                <div className="flex gap-1 bg-white/5 rounded-lg p-1">
                                    {(Object.keys(metricConfig) as MetricKey[]).map((k) => (
                                        <button
                                            key={k}
                                            onClick={() => setMetric(k)}
                                            className={`px-3 py-1 text-xs rounded-md transition-colors ${metric === k ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            {metricConfig[k].label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-end gap-3 h-48">
                                {data.monthly.map((d, i) => (
                                    <div key={d.key} className="flex-1 flex flex-col items-center gap-2">
                                        <span className="text-xs text-gray-400 font-semibold">{d[metric]}</span>
                                        <motion.div
                                            className={`w-full rounded-t-lg bg-gradient-to-t ${metricConfig[metric].gradientFrom} ${metricConfig[metric].gradientTo} min-h-[4px]`}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(d[metric] / maxValue) * 100}%` }}
                                            transition={{ duration: 0.6, delay: i * 0.05 }}
                                        />
                                        <span className="text-xs text-gray-500">{d.month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Board Distribution */}
                        <div className="rounded-2xl border border-white/5 p-6 bg-[#0a0a1a]">
                            <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-purple-400" />
                                게시판별 분포
                            </h2>
                            {data.boardDistribution.length === 0 ? (
                                <p className="text-sm text-gray-500 py-8 text-center">게시글 없음</p>
                            ) : (
                                <div className="space-y-3">
                                    {data.boardDistribution.map((b) => {
                                        const pct = totalBoardPosts === 0 ? 0 : (b.count / totalBoardPosts) * 100;
                                        return (
                                            <div key={b.board}>
                                                <div className="flex justify-between items-center mb-1.5">
                                                    <span className="text-sm text-white">{b.label}</span>
                                                    <span className="text-xs text-gray-400">{b.count} · {pct.toFixed(1)}%</span>
                                                </div>
                                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-purple-500/80 to-violet-400/60"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${pct}%` }}
                                                        transition={{ duration: 0.6 }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Top Posts */}
                        <div className="rounded-2xl border border-white/5 bg-[#0a0a1a] overflow-hidden">
                            <div className="p-6 border-b border-white/5">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                                    조회수 Top 5
                                </h2>
                            </div>
                            {data.topPosts.length === 0 ? (
                                <p className="p-6 text-sm text-gray-500 text-center">게시글 없음</p>
                            ) : (
                                <div className="divide-y divide-white/5">
                                    {data.topPosts.map((p, i) => (
                                        <Link
                                            key={p.id}
                                            href={`/community/post/${p.id}`}
                                            className="flex items-center gap-4 p-4 hover:bg-white/[0.03] transition-colors"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm font-bold text-gray-400 shrink-0">
                                                {i + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-white truncate">{p.title}</p>
                                                <p className="text-xs text-gray-500">{p.boardLabel} · {new Date(p.createdAt).toLocaleDateString('ko-KR')}</p>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-gray-400 shrink-0">
                                                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {p.views}</span>
                                                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {p.likes}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Recent Activity */}
                        <div className="rounded-2xl border border-white/5 bg-[#0a0a1a] overflow-hidden">
                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <Bell className="w-5 h-5 text-amber-400" />
                                    최근 활동
                                </h2>
                                <Link href="/admin/notifications" className="text-xs text-cyan-400 hover:text-cyan-300">
                                    전체 보기 →
                                </Link>
                            </div>
                            {data.recentNotifications.length === 0 ? (
                                <p className="p-6 text-sm text-gray-500 text-center">활동 없음</p>
                            ) : (
                                <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto">
                                    {data.recentNotifications.map((n) => (
                                        <div key={n.id} className="p-4 hover:bg-white/[0.03] transition-colors">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-semibold text-white">{n.title}</span>
                                                {!n.isRead && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-400">NEW</span>}
                                            </div>
                                            <p className="text-xs text-gray-400 truncate">{n.message}</p>
                                            <p className="text-[10px] text-gray-600 mt-1">{new Date(n.createdAt).toLocaleString('ko-KR')}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Monthly Details Table */}
                    <div className="rounded-2xl border border-white/5 overflow-hidden bg-[#0a0a1a]">
                        <div className="p-6 border-b border-white/5">
                            <h2 className="text-lg font-bold">월별 상세</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-gray-400 text-sm">
                                    <tr>
                                        <th className="px-6 py-3">월</th>
                                        <th className="px-6 py-3 text-right">가입자</th>
                                        <th className="px-6 py-3 text-right">게시글</th>
                                        <th className="px-6 py-3 text-right">뉴스레터 구독</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {data.monthly.map((d) => (
                                        <tr key={d.key} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-3 text-white font-medium">{d.month}</td>
                                            <td className="px-6 py-3 text-gray-300 text-right">{d.signups.toLocaleString()}</td>
                                            <td className="px-6 py-3 text-gray-300 text-right">{d.posts.toLocaleString()}</td>
                                            <td className="px-6 py-3 text-gray-300 text-right">{d.subscribers.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <p className="text-center text-gray-600 text-xs">※ 방문자 수 · 페이지뷰 · 체류시간은 Google Analytics 연동 후 추가 예정.</p>
                </>
            )}
        </div>
    );
}
