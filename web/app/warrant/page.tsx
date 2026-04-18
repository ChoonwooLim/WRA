'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { GraduationCap, Map, Users, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const warrantAreas = [
    {
        title: '교육',
        titleEn: 'Education',
        desc: '한국어, 한국문화, 한국학 프로그램을 통해 K-헤리티지의 가치를 세계에 전파합니다.',
        href: '/warrant/education',
        icon: <GraduationCap className="w-8 h-8" />,
    },
    {
        title: '투어',
        titleEn: 'Royal Tours',
        desc: '5대궁, 왕릉, 박물관 등 프리미엄 문화유산 투어를 제공합니다.',
        href: '/warrant/tours',
        icon: <Map className="w-8 h-8" />,
    },
    {
        title: '멤버십',
        titleEn: 'Membership',
        desc: '글로벌 리더를 위한 프리미엄 네트워크 멤버십 프로그램.',
        href: '/warrant/membership',
        icon: <Users className="w-8 h-8" />,
    },
    {
        title: '컨설팅',
        titleEn: 'Consulting',
        desc: '경영한류컨설팅으로 비즈니스에 품격과 전략을 더합니다.',
        href: '/warrant/consulting',
        icon: <Briefcase className="w-8 h-8" />,
    },
];

export default function WarrantPage() {
    const { dict } = useLanguage();

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner
                title="WRA K-HUMAN"
                subtitle="교육 · 투어 · 멤버십 · 컨설팅"
            />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader
                        title="WRA K-HUMAN 프로그램"
                        subtitle="Four Pillars of WRA K-HUMAN Excellence"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {warrantAreas.map((area, i) => (
                            <Link href={area.href} key={i} className="group">
                                <GlassCard delay={i * 0.1} className="h-full transition-all duration-300 group-hover:!border-[#d4af37]/40">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 flex items-center justify-center flex-shrink-0 border border-[#d4af37]/20 group-hover:scale-110 transition-transform">
                                            <div className="text-[#d4af37]">{area.icon}</div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#d4af37] transition-colors">{area.title}</h3>
                                            <p className="text-[#d4af37]/60 text-xs mb-3">{area.titleEn}</p>
                                            <p className="text-gray-400 text-sm leading-relaxed break-keep">{area.desc}</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-[#d4af37]/30 group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all mt-1" />
                                    </div>
                                </GlassCard>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
