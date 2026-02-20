'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { User, ChevronDown, Crown, Building2, GraduationCap, Award, Briefcase, Users } from 'lucide-react';

import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { LoginModal } from '@/components/auth/LoginModal';

// Lazy-load heavy Web3 ConnectButton — won't block initial page render
const ConnectButton = dynamic(
    () => import('@rainbow-me/rainbowkit').then((mod) => mod.ConnectButton),
    {
        ssr: false,
        loading: () => (
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-500 animate-pulse">
                지갑 로딩...
            </div>
        ),
    }
);

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
                { label: dict.navbar.ceoProfile, href: '/about/ceo' },
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
                { label: '자유게시판', href: '/community/free-board' },
                { label: '이미지 갤러리', href: '/community/gallery' },
                { label: dict.navbar.newsletter, href: '/community/newsletter' },
                { label: dict.navbar.qna, href: '/community/qna' },
                { label: dict.navbar.contact, href: '/community/contact' },
            ],
        },
    ];

    return (
        <>
            {/* TwinVerse-style Header */}
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    scrolled ? 'shadow-[0_8px_40px_rgba(0,0,0,0.6)]' : ''
                )}
                style={{
                    background: `
                        linear-gradient(90deg,
                            rgba(8,6,20,1) 0%,
                            rgba(12,10,32,1) 15%,
                            rgba(18,14,38,1) 30%,
                            rgba(10,8,28,1) 50%,
                            rgba(18,14,38,1) 70%,
                            rgba(12,10,32,1) 85%,
                            rgba(8,6,20,1) 100%
                        )`,
                    borderBottom: scrolled
                        ? '1px solid rgba(180,160,100,0.25)'
                        : '1px solid rgba(180,160,100,0.15)',
                    boxShadow: scrolled
                        ? '0 8px 40px rgba(0,0,0,0.6), 0 2px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,215,0,0.08), 0 1px 0 rgba(180,160,100,0.15)'
                        : 'inset 0 1px 0 rgba(255,215,0,0.06), 0 1px 0 rgba(180,160,100,0.1)',
                }}
            >
                {/* Decorative overlay layers */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `
                            radial-gradient(ellipse 600px 100px at 20% 50%, rgba(100,80,200,0.06) 0%, transparent 100%),
                            radial-gradient(ellipse 800px 80px at 80% 50%, rgba(0,180,200,0.04) 0%, transparent 100%),
                            radial-gradient(ellipse 400px 60px at 50% 50%, rgba(200,170,80,0.04) 0%, transparent 100%)
                        `,
                    }}
                />
                {/* Bottom accent glow line */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none"
                    style={{
                        background: 'linear-gradient(90deg, transparent 5%, rgba(200,170,80,0.3) 20%, rgba(0,180,220,0.2) 40%, rgba(160,130,220,0.25) 60%, rgba(200,170,80,0.3) 80%, transparent 95%)',
                    }}
                />
                <nav className="py-3">
                    <div
                        className="flex items-center max-w-[1920px] mx-auto px-5 relative"
                        ref={dropdownRef}
                    >
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
                            <div className="relative w-12 h-12 group-hover:scale-110 transition-transform duration-300">
                                <img src="/images/wra_logo_main.png" alt="WRA Logo" className="relative w-full h-full object-contain" />
                            </div>
                            <span
                                className="text-[1.4rem] font-extrabold tracking-[0.12em]"
                                style={{
                                    background: 'linear-gradient(135deg, #00d4ff 0%, #64ffda 25%, #8b5cf6 50%, #a78bfa 75%, #06ffa5 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    filter: 'drop-shadow(0 2px 8px rgba(0, 212, 255, 0.3)) drop-shadow(0 0 20px rgba(100, 255, 218, 0.2))',
                                }}
                            >
                                WRA
                            </span>
                        </Link>

                        {/* Desktop Nav Menu — TwinVerse capsule style */}
                        <ul className="hidden lg:flex items-center gap-[0.4rem] ml-10 flex-wrap list-none">
                            {menuItems.map((item) => (
                                <li
                                    key={item.href}
                                    className="relative"
                                    onMouseEnter={() => setOpenDropdown(item.href)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    {/* Capsule Nav Link */}
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-1.5 px-4 py-2 rounded-xl text-[0.85rem] font-semibold whitespace-nowrap transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
                                            'text-white border border-white/20',
                                            openDropdown === item.href
                                                ? 'text-[#0a0e27] font-bold scale-105 -translate-y-[2px]'
                                                : 'hover:scale-105 hover:-translate-y-[2px]'
                                        )}
                                        style={{
                                            textShadow: openDropdown === item.href
                                                ? '0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.3)'
                                                : '0 3px 10px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)',
                                            background: openDropdown === item.href
                                                ? 'linear-gradient(135deg, #00d4ff 0%, #64ffda 25%, #8b5cf6 50%, #a78bfa 75%, #06ffa5 100%)'
                                                : 'rgba(10, 14, 39, 0.5)',
                                            boxShadow: openDropdown === item.href
                                                ? '0 10px 40px rgba(0,212,255,0.4), 0 5px 20px rgba(139,92,246,0.3), 0 0 60px rgba(100,255,218,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
                                                : 'none',
                                            borderColor: openDropdown === item.href ? '#00d4ff' : undefined,
                                        }}
                                    >
                                        {item.label}
                                        {item.submenu && (
                                            <span
                                                className={cn(
                                                    'text-[0.6rem] ml-1 transition-transform duration-300',
                                                    openDropdown === item.href ? 'rotate-180' : ''
                                                )}
                                                style={{ display: 'inline-block' }}
                                            >
                                                ▼
                                            </span>
                                        )}
                                    </Link>

                                    {/* Dropdown Menu — TwinVerse glassmorphism style */}
                                    {item.submenu && (
                                        <ul
                                            className={cn(
                                                'absolute top-full left-0 min-w-[240px] rounded-2xl z-[1000] py-3 list-none transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
                                                openDropdown === item.href
                                                    ? 'opacity-100 visible translate-y-0'
                                                    : 'opacity-0 invisible -translate-y-2.5 pointer-events-none'
                                            )}
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.6) 100%)',
                                                backdropFilter: 'blur(15px)',
                                                border: '1px solid rgba(255,255,255,0.2)',
                                                boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 8px 25px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                                            }}
                                        >
                                            {item.submenu.map((sub) => (
                                                <li key={sub.href} className="mx-3 my-1">
                                                    <Link
                                                        href={sub.href}
                                                        className="block px-5 py-2.5 rounded-xl text-[0.85rem] font-medium text-white transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-[#0a0e27] hover:font-semibold hover:translate-x-3 hover:scale-[1.02]"
                                                        style={{
                                                            textShadow: '0 2px 8px rgba(10,14,39,0.6), 0 0 15px rgba(100,255,218,0.08)',
                                                            background: 'linear-gradient(135deg, rgba(10,14,39,0.6) 0%, rgba(37,42,82,0.4) 40%, rgba(124,58,237,0.06) 70%, rgba(21,24,43,0.6) 100%)',
                                                            border: '1px solid rgba(100,255,218,0.1)',
                                                            backdropFilter: 'blur(8px)',
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            const el = e.currentTarget;
                                                            el.style.background = 'linear-gradient(135deg, #64ffda 0%, #00d4ff 30%, #8b5cf6 60%, #a78bfa 100%)';
                                                            el.style.borderColor = '#64ffda';
                                                            el.style.boxShadow = '0 8px 32px rgba(100,255,218,0.3), 0 4px 16px rgba(139,92,246,0.2), 0 0 40px rgba(0,212,255,0.15), inset 0 1px 0 rgba(255,255,255,0.15)';
                                                            el.style.textShadow = '0 2px 8px rgba(0,0,0,0.4), 0 0 15px rgba(255,255,255,0.2)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            const el = e.currentTarget;
                                                            el.style.background = 'linear-gradient(135deg, rgba(10,14,39,0.6) 0%, rgba(37,42,82,0.4) 40%, rgba(124,58,237,0.06) 70%, rgba(21,24,43,0.6) 100%)';
                                                            el.style.borderColor = 'rgba(100,255,218,0.1)';
                                                            el.style.boxShadow = 'none';
                                                            el.style.textShadow = '0 2px 8px rgba(10,14,39,0.6), 0 0 15px rgba(100,255,218,0.08)';
                                                        }}
                                                        onClick={() => setOpenDropdown(null)}
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Right side — Auth & Wallet */}
                        <div className="hidden lg:flex items-center gap-3 ml-auto flex-shrink-0">
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
                                    className="px-5 py-2 rounded-xl font-semibold text-sm text-white border border-white/20 transition-all duration-[400ms] hover:scale-105 hover:-translate-y-[2px]"
                                    style={{
                                        textShadow: '0 3px 10px rgba(0,0,0,0.8)',
                                        background: 'rgba(10, 14, 39, 0.5)',
                                    }}
                                    onMouseEnter={(e) => {
                                        const el = e.currentTarget;
                                        el.style.background = 'linear-gradient(135deg, #00d4ff 0%, #64ffda 25%, #8b5cf6 50%, #a78bfa 75%, #06ffa5 100%)';
                                        el.style.color = '#0a0e27';
                                        el.style.borderColor = '#00d4ff';
                                        el.style.boxShadow = '0 10px 40px rgba(0,212,255,0.4), 0 5px 20px rgba(139,92,246,0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        const el = e.currentTarget;
                                        el.style.background = 'rgba(10, 14, 39, 0.5)';
                                        el.style.color = 'white';
                                        el.style.borderColor = 'rgba(255,255,255,0.2)';
                                        el.style.boxShadow = 'none';
                                    }}
                                >
                                    {dict.navbar.loginSignup}
                                </button>
                            )}
                        </div>

                        {/* Mobile Hamburger Toggle — TwinVerse 3-bar style */}
                        <button
                            className="lg:hidden ml-auto flex flex-col gap-[5px] p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className={cn(
                                'block w-6 h-[3px] bg-white transition-all duration-300',
                                mobileMenuOpen && 'rotate-45 translate-y-[8px]'
                            )} />
                            <span className={cn(
                                'block w-6 h-[3px] bg-white transition-all duration-300',
                                mobileMenuOpen && 'opacity-0'
                            )} />
                            <span className={cn(
                                'block w-6 h-[3px] bg-white transition-all duration-300',
                                mobileMenuOpen && '-rotate-45 -translate-y-[8px]'
                            )} />
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div
                        className="lg:hidden max-h-[80vh] overflow-y-auto"
                        style={{
                            background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(5,5,16,0.95) 100%)',
                            backdropFilter: 'blur(15px)',
                            borderTop: '1px solid rgba(255,255,255,0.1)',
                        }}
                    >
                        <div className="p-4 space-y-1">
                            {menuItems.map((item) => (
                                <div key={item.href}>
                                    <button
                                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-white/80 hover:text-white transition-all"
                                        style={{
                                            background: mobileSubmenu === item.href
                                                ? 'linear-gradient(135deg, rgba(10,14,39,0.8) 0%, rgba(37,42,82,0.5) 100%)'
                                                : 'transparent',
                                            border: mobileSubmenu === item.href ? '1px solid rgba(100,255,218,0.2)' : '1px solid transparent',
                                        }}
                                        onClick={() => setMobileSubmenu(mobileSubmenu === item.href ? null : item.href)}
                                    >
                                        <span className="flex items-center gap-3">
                                            {item.icon}
                                            <span className="text-sm font-semibold">{item.label}</span>
                                        </span>
                                        {item.submenu && (
                                            <ChevronDown className={cn('w-4 h-4 transition-transform', mobileSubmenu === item.href && 'rotate-180')} />
                                        )}
                                    </button>
                                    {item.submenu && mobileSubmenu === item.href && (
                                        <div className="ml-4 space-y-1 pb-2 mt-1">
                                            {item.submenu.map((sub) => (
                                                <Link
                                                    key={sub.href}
                                                    href={sub.href}
                                                    className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm text-white/60 hover:text-[#64ffda] transition-all"
                                                    style={{
                                                        background: 'linear-gradient(135deg, rgba(10,14,39,0.4) 0%, rgba(37,42,82,0.2) 100%)',
                                                        border: '1px solid rgba(100,255,218,0.05)',
                                                    }}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#64ffda]/40" />
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
                                        className="w-full py-3 rounded-xl font-semibold text-white border border-white/20"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(0,212,255,0.15) 0%, rgba(139,92,246,0.1) 50%, rgba(100,255,218,0.15) 100%)',
                                        }}
                                    >
                                        {dict.navbar.loginSignup}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
        </>
    );
}
