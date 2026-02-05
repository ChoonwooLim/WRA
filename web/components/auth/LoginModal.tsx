'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { cn } from '@/lib/utils';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
    const [loading, setLoading] = useState(false);

    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

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
                alert('Login failed. Please check your credentials.');
            } else {
                onClose();
            }
        } else {
            // Real Sign Up Logic
            try {
                const res = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: name || 'New Student',
                        email,
                        password
                    })
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || 'Registration failed');
                }

                alert('Registration successful! Please log in.');
                setActiveTab('login');
            } catch (error: any) {
                alert(error.message);
            }
        }
        setLoading(false);
    };

    if (!isOpen) return null;

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
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
                            Welcome to WRA
                        </h2>

                        <div className="flex bg-white/5 p-1 rounded-xl mb-8 relative">
                            <button
                                onClick={() => setActiveTab('login')}
                                className={cn(
                                    "flex-1 py-2 rounded-lg text-sm font-medium transition-all relative z-10",
                                    activeTab === 'login' ? "text-black" : "text-gray-400 hover:text-white"
                                )}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setActiveTab('signup')}
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
                    </div>

                    {/* Form */}
                    <div className="p-8 pt-0">
                        <form onSubmit={handleSubmit} className="space-y-4">

                            <AnimatePresence mode="popLayout">
                                {activeTab === 'signup' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="relative group">
                                            <User className="absolute left-3 top-3 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

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

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-primary to-yellow-600 text-black font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
                            >
                                {loading ? 'Processing...' : (activeTab === 'login' ? 'Sign In' : 'Create Account')}
                                {!loading && <ArrowRight size={18} />}
                            </button>
                        </form>

                        {/* Divider */}
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

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
