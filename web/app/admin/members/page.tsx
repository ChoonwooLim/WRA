'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Shield, Crown, Star, UserCheck, ChevronDown, Filter, Search } from 'lucide-react';

interface Member {
    id: string;
    name: string | null;
    email: string | null;
    role: string;
    createdAt: string;
    image: string | null;
}

const ROLES = [
    { value: 'admin', label: '관리자', icon: Shield, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30', dot: 'bg-red-500' },
    { value: 'sub-admin', label: '부관리자', icon: Crown, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30', dot: 'bg-orange-500' },
    { value: 'vip', label: 'VIP 회원', icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30', dot: 'bg-yellow-500' },
    { value: 'member', label: '일반회원', icon: UserCheck, color: 'text-gray-400', bg: 'bg-gray-500/10 border-gray-500/30', dot: 'bg-gray-500' },
] as const;

function getRoleInfo(role: string) {
    return ROLES.find(r => r.value === role) || ROLES[3]; // default to member
}

export default function MembersPage() {
    const { data: session } = useSession();
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filterRole, setFilterRole] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [changingRole, setChangingRole] = useState<string | null>(null); // userId being changed
    const [confirmDialog, setConfirmDialog] = useState<{ userId: string; name: string; newRole: string } | null>(null);
    const [updateMessage, setUpdateMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // @ts-ignore
    const isAdmin = session?.user?.role === 'admin';

    useEffect(() => {
        fetchMembers();
    }, []);

    async function fetchMembers() {
        try {
            const res = await fetch('/api/admin/members');
            const data = await res.json();
            if (data.error) {
                setError(data.error);
            } else {
                setMembers(data.members || []);
            }
        } catch (e) {
            setError('Failed to connect to database');
        } finally {
            setLoading(false);
        }
    }

    async function handleRoleChange(userId: string, newRole: string) {
        setChangingRole(userId);
        setUpdateMessage(null);
        try {
            const res = await fetch('/api/admin/members', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, role: newRole }),
            });
            const data = await res.json();
            if (res.ok && data.member) {
                setMembers(prev => prev.map(m => m.id === userId ? { ...m, role: data.member.role } : m));
                setUpdateMessage({ type: 'success', text: `${data.member.name || data.member.email}님의 등급이 변경되었습니다.` });
            } else {
                setUpdateMessage({ type: 'error', text: data.error || '변경에 실패했습니다.' });
            }
        } catch {
            setUpdateMessage({ type: 'error', text: '서버 연결에 실패했습니다.' });
        } finally {
            setChangingRole(null);
            setConfirmDialog(null);
            setTimeout(() => setUpdateMessage(null), 3000);
        }
    }

    // Filter and search
    const filteredMembers = members.filter(m => {
        const matchesRole = filterRole === 'all' || m.role === filterRole;
        const matchesSearch = !searchQuery ||
            (m.name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (m.email?.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesRole && matchesSearch;
    });

    // Role counts
    const roleCounts = {
        all: members.length,
        admin: members.filter(m => m.role === 'admin').length,
        'sub-admin': members.filter(m => m.role === 'sub-admin').length,
        vip: members.filter(m => m.role === 'vip').length,
        member: members.filter(m => m.role === 'member' || !ROLES.find(r => r.value === m.role)).length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">회원 관리</h1>
                    <p className="text-gray-400 mt-1">회원 등급 분류 및 권한 관리</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>총 {members.length}명</span>
                </div>
            </div>

            {/* Role Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                    { key: 'all', label: '전체', count: roleCounts.all, gradient: 'from-blue-500 to-cyan-400', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
                    { key: 'admin', label: '관리자', count: roleCounts.admin, gradient: 'from-red-500 to-pink-400', iconBg: 'bg-red-500/10', iconColor: 'text-red-400' },
                    { key: 'sub-admin', label: '부관리자', count: roleCounts['sub-admin'], gradient: 'from-orange-500 to-amber-400', iconBg: 'bg-orange-500/10', iconColor: 'text-orange-400' },
                    { key: 'vip', label: 'VIP', count: roleCounts.vip, gradient: 'from-yellow-500 to-yellow-300', iconBg: 'bg-yellow-500/10', iconColor: 'text-yellow-400' },
                    { key: 'member', label: '일반', count: roleCounts.member, gradient: 'from-gray-500 to-gray-400', iconBg: 'bg-gray-500/10', iconColor: 'text-gray-400' },
                ].map((stat) => (
                    <button
                        key={stat.key}
                        onClick={() => setFilterRole(stat.key)}
                        className={`relative overflow-hidden rounded-xl border p-4 text-left transition-all hover:scale-[1.02] ${filterRole === stat.key ? 'border-white/20 bg-white/5' : 'border-white/5 bg-[#0a0a1a]'}`}
                    >
                        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${stat.gradient}`} />
                        <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">{stat.count}</p>
                    </button>
                ))}
            </div>

            {/* Search + Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="이름 또는 이메일 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#0a0a1a] border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors"
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="pl-10 pr-8 py-2.5 bg-[#0a0a1a] border border-white/10 rounded-xl text-white text-sm appearance-none focus:outline-none focus:border-white/20 transition-colors cursor-pointer"
                    >
                        <option value="all">전체 등급</option>
                        {ROLES.map(r => (
                            <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
            </div>

            {/* Update Message Toast */}
            <AnimatePresence>
                {updateMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`px-4 py-3 rounded-xl text-sm font-medium ${updateMessage.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}
                    >
                        {updateMessage.text}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Members Table */}
            <div className="bg-[#0a0a1a] border border-white/5 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="text-center py-10 text-gray-400">로딩 중...</div>
                ) : error ? (
                    <div className="text-center py-10 text-gray-400">
                        {error}
                        <br />
                        Please configure DATABASE_URL in .env
                    </div>
                ) : filteredMembers.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                        {searchQuery || filterRole !== 'all' ? '검색 결과가 없습니다.' : '등록된 회원이 없습니다.'}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-gray-400 text-sm font-medium">
                                <tr>
                                    <th className="px-6 py-4">회원</th>
                                    <th className="px-6 py-4">이메일</th>
                                    <th className="px-6 py-4">등급</th>
                                    <th className="px-6 py-4">가입일</th>
                                    {isAdmin && <th className="px-6 py-4 text-right">등급 변경</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredMembers.map((member) => {
                                    const roleInfo = getRoleInfo(member.role);
                                    const RoleIcon = roleInfo.icon;
                                    const isChanging = changingRole === member.id;

                                    return (
                                        <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-sm font-bold text-white">
                                                        {member.name?.charAt(0) || '?'}
                                                    </div>
                                                    <span className="text-white font-medium">{member.name || '(이름 없음)'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 text-sm">{member.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${roleInfo.bg} ${roleInfo.color}`}>
                                                    <RoleIcon className="w-3 h-3" />
                                                    {roleInfo.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">
                                                {new Date(member.createdAt).toLocaleDateString('ko-KR')}
                                            </td>
                                            {isAdmin && (
                                                <td className="px-6 py-4 text-right">
                                                    <div className="relative inline-block">
                                                        <select
                                                            value={member.role}
                                                            onChange={(e) => {
                                                                const newRole = e.target.value;
                                                                if (newRole !== member.role) {
                                                                    setConfirmDialog({
                                                                        userId: member.id,
                                                                        name: member.name || member.email || 'Unknown',
                                                                        newRole,
                                                                    });
                                                                }
                                                            }}
                                                            disabled={isChanging}
                                                            className={`px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-xs appearance-none pr-7 cursor-pointer hover:border-white/20 focus:outline-none focus:border-white/30 transition-colors ${isChanging ? 'opacity-50' : ''}`}
                                                        >
                                                            {ROLES.map(r => (
                                                                <option key={r.value} value={r.value} className="bg-[#0a0a1a]">
                                                                    {r.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Role Legend */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                {ROLES.map(r => (
                    <div key={r.value} className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${r.dot}`} />
                        <span>{r.label}: {r.value === 'admin' ? '전체 관리 권한' : r.value === 'sub-admin' ? '대시보드 열람 가능' : r.value === 'vip' ? 'VIP 전용 컨텐츠 접근' : '기본 회원 권한'}</span>
                    </div>
                ))}
            </div>

            {/* Confirm Dialog */}
            <AnimatePresence>
                {confirmDialog && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
                        onClick={() => setConfirmDialog(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0f0f1a] border border-white/10 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl"
                        >
                            <h3 className="text-lg font-bold text-white mb-2">등급 변경 확인</h3>
                            <p className="text-gray-400 text-sm mb-6">
                                <span className="text-white font-medium">{confirmDialog.name}</span>님의 등급을{' '}
                                <span className={`font-semibold ${getRoleInfo(confirmDialog.newRole).color}`}>
                                    {getRoleInfo(confirmDialog.newRole).label}
                                </span>
                                (으)로 변경하시겠습니까?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setConfirmDialog(null)}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm hover:bg-white/5 transition-colors"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={() => handleRoleChange(confirmDialog.userId, confirmDialog.newRole)}
                                    disabled={!!changingRole}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                                >
                                    {changingRole ? '변경 중...' : '확인'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
