'use client';

import { Settings, Globe, Palette, Bell, Shield, Mail, Database, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SettingsPage() {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">설정</h1>
                    <p className="text-gray-400 mt-1">사이트 환경 설정 및 관리</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
                    style={{
                        background: saved
                            ? 'linear-gradient(135deg, #22c55e, #10b981)'
                            : 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
                    }}
                >
                    <Save className="w-4 h-4" />
                    {saved ? '저장 완료!' : '변경사항 저장'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* General Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-2xl border border-white/5 p-6"
                    style={{ background: 'linear-gradient(135deg, rgba(10,10,26,0.9) 0%, rgba(15,15,30,0.95) 100%)' }}
                >
                    <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-white">
                        <Globe className="w-5 h-5 text-cyan-400" />
                        일반 설정
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-400 mb-1.5 block">사이트 이름</label>
                            <input
                                type="text"
                                defaultValue="World Royal Academy"
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-1.5 block">사이트 설명</label>
                            <textarea
                                defaultValue="세계 왕립 아카데미는 대한제국 황실의 정통 문화유산을 기반으로 교육, 문화, 비즈니스를 융합하는 글로벌 플랫폼입니다."
                                rows={3}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-1.5 block">기본 언어</label>
                            <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 transition-colors">
                                <option value="ko">한국어</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Notification Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-2xl border border-white/5 p-6"
                    style={{ background: 'linear-gradient(135deg, rgba(10,10,26,0.9) 0%, rgba(15,15,30,0.95) 100%)' }}
                >
                    <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-white">
                        <Bell className="w-5 h-5 text-amber-400" />
                        알림 설정
                    </h2>
                    <div className="space-y-4">
                        {[
                            { label: '새 회원 가입 알림', desc: '새 회원이 가입할 때 관리자에게 알림', checked: true },
                            { label: '새 게시글 알림', desc: '게시판에 새 글이 등록될 때 알림', checked: false },
                            { label: '인증 신청 알림', desc: 'K-Royal Warrant 인증 신청 시 알림', checked: true },
                            { label: '신고 접수 알림', desc: '부적절한 콘텐츠 신고가 접수될 때 알림', checked: true },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                <div>
                                    <p className="text-sm font-medium text-white">{item.label}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                                    <div className="w-10 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-600"></div>
                                </label>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Security Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl border border-white/5 p-6"
                    style={{ background: 'linear-gradient(135deg, rgba(10,10,26,0.9) 0%, rgba(15,15,30,0.95) 100%)' }}
                >
                    <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-white">
                        <Shield className="w-5 h-5 text-green-400" />
                        보안 설정
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-400 mb-1.5 block">관리자 이메일</label>
                            <input
                                type="email"
                                defaultValue="admin@wra.com"
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 mb-1.5 block">새 비밀번호</label>
                            <input
                                type="password"
                                placeholder="새 비밀번호를 입력하세요"
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                            />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                            <div>
                                <p className="text-sm font-medium text-white">2단계 인증</p>
                                <p className="text-xs text-gray-500 mt-0.5">보안 강화를 위한 2FA 활성화</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-10 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-600"></div>
                            </label>
                        </div>
                    </div>
                </motion.div>

                {/* Email & Database */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-2xl border border-white/5 p-6"
                    style={{ background: 'linear-gradient(135deg, rgba(10,10,26,0.9) 0%, rgba(15,15,30,0.95) 100%)' }}
                >
                    <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-white">
                        <Database className="w-5 h-5 text-purple-400" />
                        시스템 정보
                    </h2>
                    <div className="space-y-3">
                        {[
                            { label: '데이터베이스', value: 'PostgreSQL (Render)', status: '연결됨', statusColor: 'text-green-400' },
                            { label: '인증 시스템', value: 'NextAuth.js + JWT', status: '활성', statusColor: 'text-green-400' },
                            { label: 'Next.js 버전', value: 'v16.1.6', status: '', statusColor: '' },
                            { label: '총 사용자', value: '2명', status: '', statusColor: '' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                <div>
                                    <p className="text-sm font-medium text-white">{item.label}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{item.value}</p>
                                </div>
                                {item.status && (
                                    <span className={`text-xs font-medium ${item.statusColor}`}>
                                        ● {item.status}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
