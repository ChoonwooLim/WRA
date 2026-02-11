'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Crown, MapPin, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function CrownPrincePage() {
    const { dict } = useLanguage();
    const d = dict.pages.crownPrince;

    const subPages = [
        { icon: <Crown className="w-6 h-6" />, title: d.lineageTitle, desc: d.lineageDesc, href: '/crown-prince/lineage' },
        { icon: <MapPin className="w-6 h-6" />, title: d.activitiesTitle, desc: d.activitiesDesc, href: '/crown-prince/activities' },
        { icon: <BookOpen className="w-6 h-6" />, title: d.messageTitle, desc: d.heroSubtitle, href: '/crown-prince/message' },
    ];

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.heroTitle} subtitle={d.heroSubtitle} />

            {/* Profile Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-shrink-0">
                            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 border-2 border-[#d4af37]/20 flex items-center justify-center">
                                <Crown className="w-24 h-24 text-[#d4af37]/60" />
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-bold text-white mb-2">{d.fullName}</h2>
                            <p className="text-[#d4af37] text-lg mb-4">{d.title}</p>
                            <p className="text-gray-400 leading-relaxed text-lg">{d.introduction}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sub-pages */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {subPages.map((item, i) => (
                            <Link key={i} href={item.href}>
                                <GlassCard delay={i * 0.1} className="text-center h-full cursor-pointer">
                                    <div className="text-[#d4af37] mb-4 flex justify-center">{item.icon}</div>
                                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-400 text-sm">{item.desc}</p>
                                </GlassCard>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
