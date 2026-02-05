'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSession, signIn, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Globe, User } from 'lucide-react';

export function Navbar() {
    const { data: session } = useSession();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold text-xl shadow-[0_0_15px_rgba(197,160,89,0.5)] group-hover:scale-105 transition-transform">
                        W
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-wider group-hover:text-white transition-colors">
                        WRA
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/curriculum" className="text-gray-300 hover:text-primary transition-colors text-sm uppercase tracking-widest font-medium">Curriculum</Link>
                    <Link href="/admissions" className="text-gray-300 hover:text-primary transition-colors text-sm uppercase tracking-widest font-medium">Admissions</Link>
                    <Link href="/about" className="text-gray-300 hover:text-primary transition-colors text-sm uppercase tracking-widest font-medium">About</Link>
                </div>

                {/* Auth & Wallet */}
                <div className="hidden md:flex items-center gap-4">
                    <ConnectButton
                        accountStatus="avatar"
                        chainStatus="icon"
                        showBalance={false}
                    />

                    {session ? (
                        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
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
                            onClick={() => signIn('google')}
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
                    <Link href="/curriculum" className="text-gray-300 hover:text-primary py-2 text-center" onClick={() => setMobileMenuOpen(false)}>Curriculum</Link>
                    <Link href="/admissions" className="text-gray-300 hover:text-primary py-2 text-center" onClick={() => setMobileMenuOpen(false)}>Admissions</Link>
                    <div className="flex justify-center pt-4 border-t border-white/10">
                        <ConnectButton />
                    </div>
                    {!session && (
                        <button
                            onClick={() => signIn('google')}
                            className="w-full py-3 rounded-lg bg-primary/20 text-primary border border-primary/50 font-medium"
                        >
                            Google Login
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
}
