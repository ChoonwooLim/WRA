'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setResult({ success: false, message: '비밀번호가 일치하지 않습니다.' });
            return;
        }

        if (password.length < 6) {
            setResult({ success: false, message: '비밀번호는 최소 6자 이상이어야 합니다.' });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });
            const data = await res.json();
            setResult({ success: res.ok, message: data.message });
        } catch {
            setResult({ success: false, message: '서버 오류가 발생했습니다.' });
        }
        setLoading(false);
    };

    if (!token) {
        return (
            <div className="min-h-screen bg-[#070714] flex items-center justify-center p-4">
                <div className="bg-[#0a0a1a] border border-white/10 rounded-2xl p-8 max-w-md w-full text-center">
                    <XCircle className="mx-auto text-red-400 mb-4" size={48} />
                    <h1 className="text-xl font-bold text-white mb-2">유효하지 않은 링크</h1>
                    <p className="text-gray-400 text-sm">비밀번호 재설정 링크가 올바르지 않습니다.</p>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-6 px-6 py-2 bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black font-semibold rounded-xl hover:scale-105 transition-transform"
                    >
                        홈으로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#070714] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0a0a1a] border border-white/10 rounded-2xl p-8 max-w-md w-full"
            >
                {result?.success ? (
                    <div className="text-center">
                        <CheckCircle className="mx-auto text-green-400 mb-4" size={48} />
                        <h1 className="text-xl font-bold text-white mb-2">비밀번호 변경 완료</h1>
                        <p className="text-gray-400 text-sm mb-6">{result.message}</p>
                        <button
                            onClick={() => router.push('/')}
                            className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black font-semibold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                        >
                            로그인하기 <ArrowRight size={16} />
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#aa771c]/10 flex items-center justify-center">
                                <Lock className="text-[#d4af37]" size={28} />
                            </div>
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                새 비밀번호 설정
                            </h1>
                            <p className="text-gray-500 text-sm mt-2">
                                새로운 비밀번호를 입력해주세요.
                            </p>
                        </div>

                        {result && !result.success && (
                            <div className="rounded-xl p-3 mb-4 bg-red-500/10 border border-red-500/20">
                                <p className="text-red-400 text-sm">{result.message}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative group">
                                <Lock className="absolute left-3 top-3 text-gray-500 group-focus-within:text-[#d4af37] transition-colors" size={18} />
                                <input
                                    type="password"
                                    placeholder="새 비밀번호 (6자 이상)"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-3 top-3 text-gray-500 group-focus-within:text-[#d4af37] transition-colors" size={18} />
                                <input
                                    type="password"
                                    placeholder="비밀번호 확인"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#d4af37]/50 transition-colors"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? '처리 중...' : '비밀번호 변경'}
                                {!loading && <ArrowRight size={18} />}
                            </button>
                        </form>
                    </>
                )}
            </motion.div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#070714] flex items-center justify-center">
                <div className="text-gray-400">로딩 중...</div>
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}
