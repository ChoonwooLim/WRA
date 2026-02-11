'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { ProcessDiagram } from '@/components/shared/ProcessDiagram';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Award, Shield, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CertificationPage() {
    const { dict } = useLanguage();
    const d = dict.pages.certification;

    const processSteps = [
        { label: d.processApply },
        { label: d.processReview },
        { label: d.processCertify },
        { label: d.processRenew },
    ];

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.heroTitle} subtitle={d.heroSubtitle} />

            {/* K-Royal Warrant */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title={d.warrantTitle} subtitle={d.warrantDesc} />

                    {/* Process Diagram */}
                    <div className="mb-16">
                        <ProcessDiagram steps={processSteps} />
                    </div>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <GlassCard className="text-center">
                            <Award className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                            <h3 className="font-bold text-white mb-2">프리미엄 브랜딩</h3>
                            <p className="text-gray-400 text-sm">글로벌 시장(영국, 유럽)을 위한 프리미엄 스토리텔링 지원</p>
                        </GlassCard>
                        <GlassCard className="text-center" delay={0.1}>
                            <Shield className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                            <h3 className="font-bold text-white mb-2">인증 마크</h3>
                            <p className="text-gray-400 text-sm">한국 장인정신과 철학을 체현하는 공식 인증 마크 부여</p>
                        </GlassCard>
                        <GlassCard className="text-center" delay={0.2}>
                            <Star className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                            <h3 className="font-bold text-white mb-2">VVIP 네트워킹</h3>
                            <p className="text-gray-400 text-sm">공식 왕실 선물 우선 선정권 및 VVIP 네트워킹 기회</p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Sub-pages */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/certification/royal33">
                            <GlassCard className="cursor-pointer h-full">
                                <h3 className="text-xl font-bold text-[#d4af37] mb-2">{d.royal33Title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{d.royal33Desc}</p>
                                <span className="inline-flex items-center gap-1 text-[#d4af37] text-sm">
                                    {dict.home.learnMore} <ArrowRight className="w-4 h-4" />
                                </span>
                            </GlassCard>
                        </Link>
                        <Link href="/certification/digital-seal">
                            <GlassCard className="cursor-pointer h-full" delay={0.1}>
                                <h3 className="text-xl font-bold text-[#d4af37] mb-2">{d.sealTitle}</h3>
                                <p className="text-gray-400 text-sm mb-4">{d.sealDesc}</p>
                                <span className="inline-flex items-center gap-1 text-[#d4af37] text-sm">
                                    {dict.home.learnMore} <ArrowRight className="w-4 h-4" />
                                </span>
                            </GlassCard>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
