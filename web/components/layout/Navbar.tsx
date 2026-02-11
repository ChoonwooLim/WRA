'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSession, signIn, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Globe, User } from 'lucide-react';

import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { useLanguage } from '@/components/providers/LanguageProvider';

import { LoginModal } from '@/components/auth/LoginModal';

export function Navbar() {
    const { data: session } = useSession();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const { dict } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
                scrolled ? 'bg-[#050510]/80 backdrop-blur-md border-white/5 py-3' : 'bg-transparent py-5'
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 group-hover:scale-110 transition-transform duration-300">
                        <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-[10px] opacity-20 group-hover:opacity-40 transition-opacity" />
                        <img src="/images/wra_logo.png" alt="WRA Logo" className="relative w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#d4af37] to-[#fcf6ba] tracking-wider group-hover:text-white transition-colors">
                            WRA
                        </span>
                        <span className="text-[0.6rem] text-gray-400 tracking-[0.2em] uppercase hidden sm:block">
                            World Royal Academy
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/curriculum" className="text-gray-300 hover:text-primary transition-colors text-sm uppercase tracking-widest font-medium">{dict.navbar.curriculum}</Link>
                    <Link href="/admissions" className="text-gray-300 hover:text-primary transition-colors text-sm uppercase tracking-widest font-medium">{dict.navbar.admissions}</Link>
                    <Link href="/about" className="text-gray-300 hover:text-primary transition-colors text-sm uppercase tracking-widest font-medium">{dict.navbar.about}</Link>
                </div>

                {/* Auth & Wallet */}
                <div className="hidden md:flex items-center gap-4">
                    <LanguageSwitcher />
                    <ConnectButton
                        accountStatus="avatar"
                        chainStatus="icon"
                        showBalance={false}
                    />

                    {session ? (
                        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                            {/* @ts-ignore */}
                            {session.user?.role === 'admin' && (
                                <Link
                                    href="/admin"
                                    className="px-3 py-1.5 rounded-lg bg-red-600/20 text-red-500 border border-red-600/50 text-xs font-bold hover:bg-red-600/30 transition-colors"
                                >
                                    ADMIN
                                </Link>
                            )}
                            <div className="w-px h-6 bg-white/10 mx-2" />
                            {session.user?.image ? (
                                <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full border border-primary/50" />
                            ) : (
                                <User className="w-5 h-5 text-primary" />
                            )}
                            <button
                                onClick={() => signOut()}
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setLoginModalOpen(true)}
                            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-all"
                        >
                            Start Login
                        </button>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-[#050510] border-b border-white/10 p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
                    <Link href="/curriculum" className="text-gray-300 hover:text-primary py-2 text-center" onClick={() => setMobileMenuOpen(false)}>{dict.navbar.curriculum}</Link>
                    <Link href="/admissions" className="text-gray-300 hover:text-primary py-2 text-center" onClick={() => setMobileMenuOpen(false)}>{dict.navbar.admissions}</Link>
                    {/* @ts-ignore */}
                    {session?.user?.role === 'admin' && (
                        <Link href="/admin" className="text-red-400 font-bold py-2 text-center" onClick={() => setMobileMenuOpen(false)}>{dict.navbar.adminDashboard}</Link>
                    )}
                    <div className="flex justify-center gap-4 py-2">
                        <LanguageSwitcher />
                    </div>
                    <div className="flex justify-center pt-4 border-t border-white/10">
                        <ConnectButton />
                    </div>
                    {!session && (
                        <button
                            onClick={() => { setMobileMenuOpen(false); setLoginModalOpen(true); }}
                            className="w-full py-3 rounded-lg bg-primary/20 text-primary border border-primary/50 font-medium"
                        >
                            {dict.navbar.loginSignup}
                        </button>
                    )}
                </div>
            )}

            <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
        </nav>
    );
}
