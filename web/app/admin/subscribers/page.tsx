'use client';

import { useState, useEffect, useCallback } from 'react';
import { Mail, Search, Trash2, Download, UserX, UserCheck, RefreshCw } from 'lucide-react';

interface Subscriber {
    id: string;
    email: string;
    consent: boolean;
    createdAt: string;
    unsubscribedAt: string | null;
}

type StatusFilter = 'all' | 'active' | 'unsubscribed';

export default function AdminSubscribersPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [activeCount, setActiveCount] = useState(0);
    const [unsubCount, setUnsubCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState<StatusFilter>('all');
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const fetchSubscribers = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ status });
            if (searchTerm) params.set('search', searchTerm);
            const res = await fetch(`/api/admin/subscribers?${params}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'failed');
            setSubscribers(data.subscribers || []);
            setActiveCount(data.activeCount || 0);
            setUnsubCount(data.unsubscribedCount || 0);
        } catch {
            setSubscribers([]);
        } finally {
            setLoading(false);
        }
    }, [status, searchTerm]);

    useEffect(() => { fetchSubscribers(); }, [fetchSubscribers]);

    useEffect(() => {
        if (!message) return;
        const t = setTimeout(() => setMessage(null), 3000);
        return () => clearTimeout(t);
    }, [message]);

    const toggleSelect = (id: string) => {
        setSelected(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    const toggleAll = () => {
        if (selected.size === subscribers.length) setSelected(new Set());
        else setSelected(new Set(subscribers.map(s => s.id)));
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchTerm(searchInput.trim());
    };

    const handleDeleteSelected = async () => {
        if (selected.size === 0) return;
        if (!confirm(`선택한 ${selected.size}명의 구독자를 완전히 삭제하시겠습니까? (복구 불가)`)) return;
        try {
            const res = await fetch('/api/admin/subscribers', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: Array.from(selected) }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setMessage({ type: 'success', text: `${data.deleted}명 삭제됨` });
            setSelected(new Set());
            fetchSubscribers();
        } catch (e: any) {
            setMessage({ type: 'error', text: e.message || '삭제 실패' });
        }
    };

    const handleToggleStatus = async (sub: Subscriber) => {
        const action = sub.unsubscribedAt ? 'resubscribe' : 'unsubscribe';
        try {
            const res = await fetch('/api/admin/subscribers', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: sub.id, action }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setMessage({ type: 'success', text: action === 'unsubscribe' ? '수신 거부 처리됨' : '재구독 처리됨' });
            fetchSubscribers();
        } catch (e: any) {
            setMessage({ type: 'error', text: e.message || '상태 변경 실패' });
        }
    };

    const handleExportCSV = () => {
        const rows = [['email', 'consent', 'createdAt', 'unsubscribedAt']];
        for (const s of subscribers) {
            rows.push([
                s.email,
                s.consent ? 'true' : 'false',
                s.createdAt,
                s.unsubscribedAt || '',
            ]);
        }
        const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Mail className="text-cyan-400" /> 뉴스레터 구독자
                    </h1>
                    <p className="text-gray-400 mt-1">
                        활성 <span className="text-emerald-400 font-semibold">{activeCount}</span>명 ·
                        수신거부 <span className="text-gray-500 font-semibold">{unsubCount}</span>명
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetchSubscribers}
                        className="px-4 py-2 bg-white/5 text-gray-300 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm flex items-center gap-2"
                    >
                        <RefreshCw size={14} /> 새로고침
                    </button>
                    <button
                        onClick={handleExportCSV}
                        disabled={subscribers.length === 0}
                        className="px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/30 transition-all text-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <Download size={14} /> CSV 다운로드
                    </button>
                    {selected.size > 0 && (
                        <button
                            onClick={handleDeleteSelected}
                            className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all text-sm flex items-center gap-2"
                        >
                            <Trash2 size={14} /> {selected.size}명 삭제
                        </button>
                    )}
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

            <div className="bg-[#0a0a1a] border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-white/5 flex items-center gap-4 flex-wrap">
                    <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="이메일 검색..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl py-2 pl-10 pr-3 text-white text-sm focus:outline-none focus:border-primary/50"
                        />
                    </form>
                    <div className="flex gap-2">
                        {(['all', 'active', 'unsubscribed'] as StatusFilter[]).map((s) => (
                            <button
                                key={s}
                                onClick={() => setStatus(s)}
                                className={`px-3 py-2 rounded-xl text-sm transition-all ${status === s
                                    ? 'bg-primary/20 text-primary border border-primary/30'
                                    : 'bg-white/5 text-gray-300 hover:text-white border border-transparent'
                                    }`}
                            >
                                {s === 'all' ? '전체' : s === 'active' ? '활성' : '수신거부'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="divide-y divide-white/5">
                    <div className="px-4 py-3 flex items-center gap-4 text-xs text-gray-500 uppercase tracking-wide">
                        <div className="w-6">
                            <input
                                type="checkbox"
                                checked={subscribers.length > 0 && selected.size === subscribers.length}
                                onChange={toggleAll}
                                className="rounded bg-white/10 border-white/20 cursor-pointer"
                            />
                        </div>
                        <div className="flex-1">이메일</div>
                        <div className="w-24 text-center">상태</div>
                        <div className="w-28 text-center">구독일</div>
                        <div className="w-28 text-center">해지일</div>
                        <div className="w-24 text-center">관리</div>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center text-gray-500">로딩 중...</div>
                    ) : subscribers.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            {searchTerm ? '검색 결과가 없습니다.' : '구독자가 없습니다.'}
                        </div>
                    ) : (
                        subscribers.map((sub) => (
                            <div key={sub.id} className="px-4 py-3 hover:bg-white/5 transition-colors flex items-center gap-4">
                                <div className="w-6">
                                    <input
                                        type="checkbox"
                                        checked={selected.has(sub.id)}
                                        onChange={() => toggleSelect(sub.id)}
                                        className="rounded bg-white/10 border-white/20 cursor-pointer"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm text-white truncate">{sub.email}</div>
                                </div>
                                <div className="w-24 text-center">
                                    {sub.unsubscribedAt ? (
                                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-500/20 text-gray-400">수신거부</span>
                                    ) : (
                                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">활성</span>
                                    )}
                                </div>
                                <div className="w-28 text-center text-xs text-gray-400">
                                    {new Date(sub.createdAt).toLocaleDateString('ko-KR')}
                                </div>
                                <div className="w-28 text-center text-xs text-gray-500">
                                    {sub.unsubscribedAt ? new Date(sub.unsubscribedAt).toLocaleDateString('ko-KR') : '-'}
                                </div>
                                <div className="w-24 flex items-center justify-center gap-1">
                                    <button
                                        onClick={() => handleToggleStatus(sub)}
                                        className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-cyan-400 transition-all"
                                        title={sub.unsubscribedAt ? '재구독 처리' : '수신거부 처리'}
                                    >
                                        {sub.unsubscribedAt ? <UserCheck size={14} /> : <UserX size={14} />}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
