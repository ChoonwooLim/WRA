'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, ArrowLeft, Search, KeyRound, Phone } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { cn } from '@/lib/utils';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ModalTab = 'login' | 'signup' | 'find-email' | 'forgot-password';

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [activeTab, setActiveTab] = useState<ModalTab>('login');
    const [loading, setLoading] = useState(false);

    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+82');

    // Find email result
    const [findResult, setFindResult] = useState<{ found: boolean; accounts?: { name: string; email: string }[]; message: string } | null>(null);

    // Forgot password result
    const [forgotResult, setForgotResult] = useState<string | null>(null);

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setName('');
        setPhone('');
        setCountryCode('+82');
        setFindResult(null);
        setForgotResult(null);
    };

    const switchTab = (tab: ModalTab) => {
        resetForm();
        setActiveTab(tab);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (activeTab === 'login') {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
            } else {
                onClose();
            }
        } else if (activeTab === 'signup') {
            try {
                const res = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: name || 'New Student',
                        email,
                        password,
                        phone: phone ? `${countryCode} ${phone}` : undefined,
                    })
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || 'Registration failed');
                }

                alert('회원가입이 완료되었습니다! 로그인해주세요.');
                switchTab('login');
            } catch (error: any) {
                alert(error.message);
            }
        } else if (activeTab === 'find-email') {
            try {
                const res = await fetch('/api/auth/find-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name }),
                });
                const data = await res.json();
                setFindResult(data);
            } catch {
                setFindResult({ found: false, message: '서버 오류가 발생했습니다.' });
            }
        } else if (activeTab === 'forgot-password') {
            try {
                const res = await fetch('/api/auth/forgot-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });
                const data = await res.json();
                setForgotResult(data.message);
            } catch {
                setForgotResult('서버 오류가 발생했습니다.');
            }
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    const isRecoveryTab = activeTab === 'find-email' || activeTab === 'forgot-password';

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-[#0a0a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Header & Tabs */}
                    <div className="p-8 pb-0 text-center">
                        {isRecoveryTab ? (
                            <>
                                <button
                                    onClick={() => switchTab('login')}
                                    className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-sm"
                                >
                                    <ArrowLeft size={16} />
                                    돌아가기
                                </button>
                                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">
                                    {activeTab === 'find-email' ? '아이디 찾기' : '비밀번호 찾기'}
                                </h2>
                                <p className="text-gray-500 text-sm mb-6">
                                    {activeTab === 'find-email'
                                        ? '가입 시 입력한 이름으로 이메일을 찾을 수 있습니다.'
                                        : '가입한 이메일로 비밀번호 재설정 링크를 보내드립니다.'
                                    }
                                </p>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
                                    Welcome to WRA
                                </h2>

                                <div className="flex bg-white/5 p-1 rounded-xl mb-8 relative">
                                    <button
                                        onClick={() => switchTab('login')}
                                        className={cn(
                                            "flex-1 py-2 rounded-lg text-sm font-medium transition-all relative z-10",
                                            activeTab === 'login' ? "text-black" : "text-gray-400 hover:text-white"
                                        )}
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => switchTab('signup')}
                                        className={cn(
                                            "flex-1 py-2 rounded-lg text-sm font-medium transition-all relative z-10",
                                            activeTab === 'signup' ? "text-black" : "text-gray-400 hover:text-white"
                                        )}
                                    >
                                        Sign Up
                                    </button>

                                    {/* Tab Indicator */}
                                    <motion.div
                                        layoutId="tab-indicator"
                                        className="absolute top-1 bottom-1 bg-gradient-to-r from-primary to-yellow-600 rounded-lg shadow-lg"
                                        initial={false}
                                        animate={{
                                            left: activeTab === 'login' ? '4px' : '50%',
                                            width: 'calc(50% - 4px)',
                                            x: activeTab === 'signup' ? 0 : 0
                                        }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {/* Form */}
                    <div className="p-8 pt-0">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {/* ===== FIND EMAIL TAB ===== */}
                                {activeTab === 'find-email' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-4"
                                    >
                                        <div className="relative group">
                                            <User className="absolute left-3 top-3 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                                            <input
                                                type="text"
                                                placeholder="이름을 입력하세요"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>

                                        {findResult && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="overflow-hidden"
                                            >
                                                <div className={cn(
                                                    "rounded-xl p-4 text-sm",
                                                    findResult.found ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"
                                                )}>
                                                    <p className={findResult.found ? "text-green-400 mb-2" : "text-red-400"}>
                                                        {findResult.message}
                                                    </p>
                                                    {findResult.found && findResult.accounts?.map((acc, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-gray-300 mt-1">
                                                            <Mail size={14} className="text-primary" />
                                                            <span>{acc.name}: <strong className="text-white">{acc.email}</strong></span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}

                                {/* ===== FORGOT PASSWORD TAB ===== */}
                                {activeTab === 'forgot-password' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-4"
                                    >
                                        <div className="relative group">
                                            <Mail className="absolute left-3 top-3 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                                            <input
                                                type="email"
                                                placeholder="가입한 이메일 주소"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>

                                        {forgotResult && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="overflow-hidden"
                                            >
                                                <div className="rounded-xl p-4 text-sm bg-blue-500/10 border border-blue-500/20">
                                                    <p className="text-blue-400">{forgotResult}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}

                                {/* ===== SIGNUP NAME & PHONE FIELDS ===== */}
                                {activeTab === 'signup' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden space-y-4"
                                    >
                                        <div className="relative group">
                                            <User className="absolute left-3 top-3 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                                            <input
                                                type="text"
                                                placeholder="이름 (Full Name)"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="relative shrink-0">
                                                <Phone className="absolute left-2.5 top-3 text-gray-500 z-10 pointer-events-none" size={16} />
                                                <select
                                                    value={countryCode}
                                                    onChange={(e) => setCountryCode(e.target.value)}
                                                    className="w-[130px] bg-white/5 border border-white/10 rounded-xl py-3 pl-9 pr-2 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
                                                >
                                                    <option value="+82" className="bg-[#0a0a1a] text-white">🇰🇷 +82 한국</option>
                                                    <option value="+1" className="bg-[#0a0a1a] text-white">🇺🇸 +1 미국</option>
                                                    <option value="+81" className="bg-[#0a0a1a] text-white">🇯🇵 +81 일본</option>
                                                    <option value="+86" className="bg-[#0a0a1a] text-white">🇨🇳 +86 중국</option>
                                                    <option value="+44" className="bg-[#0a0a1a] text-white">🇬🇧 +44 영국</option>
                                                    <option value="+49" className="bg-[#0a0a1a] text-white">🇩🇪 +49 독일</option>
                                                    <option value="+33" className="bg-[#0a0a1a] text-white">🇫🇷 +33 프랑스</option>
                                                    <option value="+61" className="bg-[#0a0a1a] text-white">🇦🇺 +61 호주</option>
                                                    <option value="+65" className="bg-[#0a0a1a] text-white">🇸🇬 +65 싱가포르</option>
                                                    <option value="+66" className="bg-[#0a0a1a] text-white">🇹🇭 +66 태국</option>
                                                    <option value="+84" className="bg-[#0a0a1a] text-white">🇻🇳 +84 베트남</option>
                                                    <option value="+62" className="bg-[#0a0a1a] text-white">🇮🇩 +62 인도네시아</option>
                                                    <option value="+60" className="bg-[#0a0a1a] text-white">🇲🇾 +60 말레이시아</option>
                                                    <option value="+63" className="bg-[#0a0a1a] text-white">🇵🇭 +63 필리핀</option>
                                                    <option value="+91" className="bg-[#0a0a1a] text-white">🇮🇳 +91 인도</option>
                                                    <option value="+7" className="bg-[#0a0a1a] text-white">🇷🇺 +7 러시아</option>
                                                    <option value="+55" className="bg-[#0a0a1a] text-white">🇧🇷 +55 브라질</option>
                                                    <option value="+52" className="bg-[#0a0a1a] text-white">🇲🇽 +52 멕시코</option>
                                                    <option value="+971" className="bg-[#0a0a1a] text-white">🇦🇪 +971 UAE</option>
                                                    <option value="+966" className="bg-[#0a0a1a] text-white">🇸🇦 +966 사우디</option>
                                                </select>
                                            </div>
                                            <div className="relative group flex-1">
                                                <input
                                                    type="tel"
                                                    placeholder="전화번호 (010-0000-0000)"
                                                    value={phone}
                                                    onChange={(e) => {
                                                        const digits = e.target.value.replace(/\D/g, '');
                                                        let formatted = digits;
                                                        if (digits.length <= 3) {
                                                            formatted = digits;
                                                        } else if (digits.length <= 7) {
                                                            formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
                                                        } else {
                                                            formatted = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
                                                        }
                                                        setPhone(formatted);
                                                    }}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* ===== EMAIL & PASSWORD (login/signup only) ===== */}
                            {(activeTab === 'login' || activeTab === 'signup') && (
                                <>
                                    <div className="relative group">
                                        <Mail className="absolute left-3 top-3 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <Lock className="absolute left-3 top-3 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                                        />
                                    </div>
                                </>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-primary to-yellow-600 text-black font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
                            >
                                {loading ? '처리 중...' : (
                                    activeTab === 'login' ? 'Sign In' :
                                        activeTab === 'signup' ? 'Create Account' :
                                            activeTab === 'find-email' ? '아이디 찾기' :
                                                '재설정 링크 발송'
                                )}
                                {!loading && (
                                    activeTab === 'find-email' ? <Search size={18} /> :
                                        activeTab === 'forgot-password' ? <KeyRound size={18} /> :
                                            <ArrowRight size={18} />
                                )}
                            </button>
                        </form>

                        {/* ===== Recovery Links (login tab only) ===== */}
                        {activeTab === 'login' && (
                            <div className="flex justify-center gap-3 mt-4 text-xs">
                                <button
                                    onClick={() => switchTab('find-email')}
                                    className="text-gray-500 hover:text-primary transition-colors"
                                >
                                    아이디 찾기
                                </button>
                                <span className="text-gray-700">|</span>
                                <button
                                    onClick={() => switchTab('forgot-password')}
                                    className="text-gray-500 hover:text-primary transition-colors"
                                >
                                    비밀번호 찾기
                                </button>
                            </div>
                        )}

                        {/* Divider - only for login/signup */}
                        {!isRecoveryTab && (
                            <>
                                <div className="relative my-8">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/10"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-[#0a0a1a] px-2 text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                {/* Social Login */}
                                <button
                                    onClick={() => signIn('google')}
                                    className="w-full bg-white text-black font-medium py-3 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                                    </svg>
                                    Google Account
                                </button>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
