'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, User, ChevronDown, Crown, Building2, GraduationCap, Award, Briefcase, Users } from 'lucide-react';

import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { LoginModal } from '@/components/auth/LoginModal';

interface SubMenuItem {
    label: string;
    href: string;
}

interface MenuItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    submenu?: SubMenuItem[];
}

export function Navbar() {
    const { data: session } = useSession();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { dict } = useLanguage();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuItems: MenuItem[] = [
        {
            label: dict.navbar.crownPrince,
            href: '/crown-prince',
            icon: <Crown className="w-4 h-4" />,
            submenu: [
                { label: dict.navbar.profile, href: '/crown-prince' },
                { label: dict.navbar.lineage, href: '/crown-prince/lineage' },
                { label: dict.navbar.activities, href: '/crown-prince/activities' },
                { label: dict.navbar.message, href: '/crown-prince/message' },
            ],
        },
        {
            label: dict.navbar.about,
            href: '/about',
            icon: <Building2 className="w-4 h-4" />,
            submenu: [
                { label: dict.navbar.vision, href: '/about' },
                { label: dict.navbar.organization, href: '/about/organization' },
                { label: dict.navbar.partners, href: '/about/partners' },
            ],
        },
        {
            label: dict.navbar.education,
            href: '/education',
            icon: <GraduationCap className="w-4 h-4" />,
            submenu: [
                { label: dict.navbar.kLanguage, href: '/education/language' },
                { label: dict.navbar.kLiterature, href: '/education/literature' },
                { label: dict.navbar.kStudies, href: '/education/studies' },
            ],
        },
        {
            label: dict.navbar.certification,
            href: '/certification',
            icon: <Award className="w-4 h-4" />,
            submenu: [
                { label: dict.navbar.royalWarrant, href: '/certification' },
                { label: dict.navbar.royal33, href: '/certification/royal33' },
                { label: dict.navbar.digitalSeal, href: '/certification/digital-seal' },
            ],
        },
        {
            label: dict.navbar.services,
            href: '/services/consulting',
            icon: <Briefcase className="w-4 h-4" />,
            submenu: [
                { label: dict.navbar.consulting, href: '/services/consulting' },
                { label: dict.navbar.tours, href: '/services/tours' },
            ],
        },
        {
            label: dict.navbar.community,
            href: '/community/notices',
            icon: <Users className="w-4 h-4" />,
            submenu: [
                { label: dict.navbar.notices, href: '/community/notices' },
                { label: dict.navbar.newsletter, href: '/community/newsletter' },
                { label: dict.navbar.qna, href: '/community/qna' },
                { label: dict.navbar.contact, href: '/community/contact' },
            ],
        },
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
                scrolled ? 'bg-[#050510]/90 backdrop-blur-xl border-white/5 py-2' : 'bg-transparent py-4'
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between" ref={dropdownRef}>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
                    <div className="relative w-10 h-10 group-hover:scale-110 transition-transform duration-300">
                        <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-[10px] opacity-20 group-hover:opacity-40 transition-opacity" />
                        <img src="/images/wra_logo_main.png" alt="WRA Logo" className="relative w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#d4af37] to-[#fcf6ba] tracking-wider">
                            WRA
                        </span>
                        <span className="text-[0.55rem] text-gray-400 tracking-[0.15em] uppercase hidden sm:block">
                            World Royal Academy
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-1">
                    {menuItems.map((item) => (
                        <div
                            key={item.href}
                            className="relative"
                            onMouseEnter={() => setOpenDropdown(item.href)}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <Link
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                                    'text-gray-300 hover:text-[#d4af37] hover:bg-white/5',
                                    openDropdown === item.href && 'text-[#d4af37] bg-white/5'
                                )}
                            >
                                {item.label}
                                {item.submenu && <ChevronDown className={cn('w-3 h-3 transition-transform duration-200', openDropdown === item.href && 'rotate-180')} />}
                            </Link>

                            {/* Dropdown */}
                            {item.submenu && openDropdown === item.href && (
                                <div className="absolute top-full left-0 pt-2 z-50">
                                    <div className="min-w-[220px] bg-[#0a0a20]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
                                        <div className="p-1">
                                            {item.submenu.map((sub) => (
                                                <Link
                                                    key={sub.href}
                                                    href={sub.href}
                                                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:text-[#d4af37] hover:bg-white/5 transition-all duration-200"
                                                    onClick={() => setOpenDropdown(null)}
                                                >
                                                    <div className="w-1 h-1 rounded-full bg-[#d4af37]/40" />
                                                    {sub.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Auth & Wallet */}
                <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                    <LanguageSwitcher />
                    <ConnectButton accountStatus="avatar" chainStatus="icon" showBalance={false} />

                    {session ? (
                        <div className="flex items-center gap-2 pl-3 border-l border-white/10">
                            {/* @ts-ignore */}
                            {session.user?.role === 'admin' && (
                                <Link
                                    href="/admin"
                                    className="px-2.5 py-1 rounded-lg bg-red-600/20 text-red-500 border border-red-600/50 text-xs font-bold hover:bg-red-600/30 transition-colors"
                                >
                                    ADMIN
                                </Link>
                            )}
                            {session.user?.image ? (
                                <img src={session.user.image} alt="Profile" className="w-7 h-7 rounded-full border border-primary/50" />
                            ) : (
                                <User className="w-5 h-5 text-primary" />
                            )}
                            <button onClick={() => signOut()} className="text-xs text-gray-400 hover:text-white transition-colors">
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setLoginModalOpen(true)}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#d4af37]/20 to-[#d4af37]/10 hover:from-[#d4af37]/30 hover:to-[#d4af37]/20 border border-[#d4af37]/30 text-sm font-medium text-[#d4af37] transition-all hover:shadow-lg hover:shadow-[#d4af37]/10"
                        >
                            {dict.navbar.loginSignup}
                        </button>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button className="lg:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-[#050510]/98 backdrop-blur-xl border-b border-white/10 max-h-[80vh] overflow-y-auto">
                    <div className="p-4 space-y-1">
                        {menuItems.map((item) => (
                            <div key={item.href}>
                                <button
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-300 hover:text-[#d4af37] hover:bg-white/5 transition-all"
                                    onClick={() => setMobileSubmenu(mobileSubmenu === item.href ? null : item.href)}
                                >
                                    <span className="flex items-center gap-3">
                                        {item.icon}
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </span>
                                    {item.submenu && (
                                        <ChevronDown className={cn('w-4 h-4 transition-transform', mobileSubmenu === item.href && 'rotate-180')} />
                                    )}
                                </button>
                                {item.submenu && mobileSubmenu === item.href && (
                                    <div className="ml-8 space-y-0.5 pb-2">
                                        {item.submenu.map((sub) => (
                                            <Link
                                                key={sub.href}
                                                href={sub.href}
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-[#d4af37] hover:bg-white/5 transition-all"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className="w-1 h-1 rounded-full bg-[#d4af37]/40" />
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Mobile Auth */}
                        <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
                            <div className="flex justify-center gap-4">
                                <LanguageSwitcher />
                            </div>
                            <div className="flex justify-center">
                                <ConnectButton />
                            </div>
                            {/* @ts-ignore */}
                            {session?.user?.role === 'admin' && (
                                <Link href="/admin" className="block text-center text-red-400 font-bold py-2" onClick={() => setMobileMenuOpen(false)}>
                                    {dict.navbar.adminDashboard}
                                </Link>
                            )}
                            {!session && (
                                <button
                                    onClick={() => { setMobileMenuOpen(false); setLoginModalOpen(true); }}
                                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#d4af37]/20 to-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] font-medium"
                                >
                                    {dict.navbar.loginSignup}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
        </nav>
    );
}
