'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Languages, Palette, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const programs = [
    {
        title: '① 한국어',
        titleEn: 'Korean Language',
        desc: 'AI 기반 한국어 교육, TOPIK 대비, 클라우드 LMS를 통한 체계적인 언어 교육 프로그램.',
        href: '/warrant/education/language',
        icon: <Languages className="w-8 h-8" />,
        features: ['한국어', 'AI TOPIK 모의시험', '클라우드 LMS'],
    },
    {
        title: '② 한국문학',
        titleEn: 'Korean Literature',
        desc: '한국 문학과 예술을 통한 문학 교육. 독서, 질문, 토론, 인증의 4단계 창작 커리큘럼.',
        href: '/warrant/education/culture',
        icon: <Palette className="w-8 h-8" />,
        features: ['왕립문예원', '4단계 창작 커리큘럼', '문학·예술 교육'],
    },
    {
        title: '③ 한국학',
        titleEn: 'Korean Studies',
        desc: '한국의 역사, 문화, 유산에 대한 학술 및 연구 프로그램. 경영한류와의 융합.',
        href: '/warrant/education/studies',
        icon: <BookOpen className="w-8 h-8" />,
        features: ['한국학(경영한류)', '학술 연구 프로그램', 'K-헤리티지 기반'],
    },
];

export default function EducationLandingPage() {
    const { dict } = useLanguage();

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner
                title="WRA Warrant — 교육"
                subtitle="한국어 · 한국문학 · 한국학"
            />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader
                        title="교육 프로그램"
                        subtitle="Three Pillars of K-Heritage Education"
                    />

                    <div className="space-y-6">
                        {programs.map((prog, i) => (
                            <Link href={prog.href} key={i} className="group block">
                                <GlassCard delay={i * 0.12} className="transition-all duration-300 group-hover:!border-[#d4af37]/40">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-shrink-0 flex items-start">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 flex items-center justify-center border border-[#d4af37]/20 group-hover:scale-110 transition-transform">
                                                <div className="text-[#d4af37]">{prog.icon}</div>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors">{prog.title}</h3>
                                                <ArrowRight className="w-4 h-4 text-[#d4af37]/30 group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" />
                                            </div>
                                            <p className="text-[#d4af37]/60 text-xs mb-3">{prog.titleEn}</p>
                                            <p className="text-gray-300 text-sm leading-relaxed mb-4 break-keep">{prog.desc}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {prog.features.map((f, j) => (
                                                    <span key={j} className="px-3 py-1 rounded-full text-xs bg-[#d4af37]/10 text-[#d4af37]/80 border border-[#d4af37]/15">
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
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
