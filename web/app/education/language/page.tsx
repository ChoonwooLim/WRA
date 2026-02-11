'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { ProcessDiagram } from '@/components/shared/ProcessDiagram';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Languages, Bot, Cloud, BookOpen, Scroll, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LanguagePage() {
    const { dict } = useLanguage();
    const d = dict.pages.education;

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.languageTitle} subtitle={d.languageDesc} />

            {/* TOPIK AI */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title={d.topikTitle} subtitle={d.topikDesc} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <GlassCard className="text-center">
                            <Bot className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                            <h3 className="font-bold text-white mb-2">AI 분석</h3>
                            <p className="text-gray-400 text-sm">개인별 취약 영역을 AI가 분석하여 맞춤형 학습을 추천합니다.</p>
                        </GlassCard>
                        <GlassCard className="text-center" delay={0.1}>
                            <Sparkles className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                            <h3 className="font-bold text-white mb-2">모의시험</h3>
                            <p className="text-gray-400 text-sm">실제 TOPIK 시험과 동일한 환경에서 모의고사를 제공합니다.</p>
                        </GlassCard>
                        <GlassCard className="text-center" delay={0.2}>
                            <Languages className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                            <h3 className="font-bold text-white mb-2">맞춤 학습</h3>
                            <p className="text-gray-400 text-sm">수준별 맞춤 커리큘럼으로 체계적 학습을 지원합니다.</p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* LMS */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title={d.lmsTitle} subtitle={d.lmsDesc} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <GlassCard>
                            <Cloud className="w-8 h-8 text-[#d4af37] mb-4" />
                            <h3 className="font-bold text-white mb-2">클라우드 기반</h3>
                            <p className="text-gray-400 text-sm">언제 어디서나 접근 가능한 클라우드 기반 학습 관리 시스템.</p>
                        </GlassCard>
                        <GlassCard delay={0.1}>
                            <BookOpen className="w-8 h-8 text-[#d4af37] mb-4" />
                            <h3 className="font-bold text-white mb-2">인터랙티브 커뮤니티</h3>
                            <p className="text-gray-400 text-sm">VOD 강의, 진도 추적, 학습 커뮤니티까지 한곳에서 관리합니다.</p>
                        </GlassCard>
                    </div>
                </div>
            </section>
        </div>
    );
}
