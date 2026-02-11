'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ProcessDiagram } from '@/components/shared/ProcessDiagram';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { BookOpen, HelpCircle, MessageSquare, PenTool } from 'lucide-react';

export default function LiteraturePage() {
    const { dict } = useLanguage();
    const d = dict.pages.education;

    const steps = [
        { label: d.step1, icon: <BookOpen className="w-5 h-5 text-[#d4af37]" /> },
        { label: d.step2, icon: <HelpCircle className="w-5 h-5 text-[#d4af37]" /> },
        { label: d.step3, icon: <MessageSquare className="w-5 h-5 text-[#d4af37]" /> },
        { label: d.step4, icon: <PenTool className="w-5 h-5 text-[#d4af37]" /> },
    ];

    const stepDetails = [
        { title: d.step1, desc: '명작과 현대 한국 문학을 깊이 있게 읽고 분석합니다.', descEn: 'Deep reading and analysis of classic and modern Korean literature.' },
        { title: d.step2, desc: '텍스트에 대한 비판적 질문을 통해 사고력을 키웁니다.', descEn: 'Developing critical thinking through questioning texts.' },
        { title: d.step3, desc: '동료들과의 토론을 통해 다양한 시각을 탐구합니다.', descEn: 'Exploring diverse perspectives through peer discussions.' },
        { title: d.step4, desc: '자신만의 작품을 창작하고 출판까지 경험합니다.', descEn: 'Creating and publishing your own literary works.' },
    ];

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.literatureTitle} subtitle={d.literatureDesc} />

            {/* 4-Step Process */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="4-Step Creative Curriculum" subtitle="체계적인 4단계 창작 커리큘럼" />
                    <ProcessDiagram steps={steps} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                        {stepDetails.map((s, i) => (
                            <GlassCard key={i} delay={i * 0.1}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] text-sm font-bold">
                                        {i + 1}
                                    </div>
                                    <h3 className="font-bold text-white">{s.title}</h3>
                                </div>
                                <p className="text-gray-400 text-sm">{s.desc}</p>
                                <p className="text-gray-500 text-xs mt-1">{s.descEn}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
