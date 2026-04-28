'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Crown, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
    const { dict } = useLanguage();

    const quickLinks = [
        { label: dict.navbar.crownPrince, href: '/crown-prince' },
        { label: dict.navbar.about, href: '/about' },
        { label: dict.navbar.warrant, href: '/warrant/education' },
        { label: dict.navbar.community, href: '/community/notices' },
    ];

    return (
        <footer className="relative bg-[#030308] border-t border-white/5">
            {/* Gold accent line */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="relative w-10 h-10">
                                <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-[10px] opacity-20" />
                                <img
                                    src="/images/wra-crown.png?v=4"
                                    alt="WRA Logo"
                                    className="relative w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                <img
                                    src="/images/wra-title-en.png?v=2"
                                    alt="World Royal Academy"
                                    className="h-5 w-auto object-contain"
                                    style={{
                                        filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))',
                                    }}
                                />
                            </div>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            {dict.footer.description}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-[#d4af37] uppercase tracking-widest mb-4">
                            {dict.footer.quickLinks}
                        </h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#d4af37] text-sm transition-colors duration-200 flex items-center gap-2"
                                    >
                                        <div className="w-1 h-1 rounded-full bg-[#d4af37]/30" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold text-[#d4af37] uppercase tracking-widest mb-4">
                            {dict.footer.contactInfo}
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Phone className="w-4 h-4 text-[#d4af37]/60" />
                                {dict.footer.phone}
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail className="w-4 h-4 text-[#d4af37]/60" />
                                {dict.footer.email}
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Crown className="w-4 h-4 text-[#d4af37]/60" />
                                {dict.footer.sns}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-white/5 text-center">
                    <p className="text-gray-600 text-xs">
                        {dict.footer.copyright}
                    </p>
                </div>
            </div>
        </footer>
    );
}
