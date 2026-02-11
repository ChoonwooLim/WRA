'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { ProcessDiagram } from '@/components/shared/ProcessDiagram';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Search, FileCheck, Lightbulb, Play, BarChart3 } from 'lucide-react';

export default function ConsultingPage() {
    const { dict } = useLanguage();
    const d = dict.pages.services;

    const steps = [
        { label: d.step1, icon: <Search className="w-5 h-5 text-[#d4af37]" /> },
        { label: d.step2, icon: <FileCheck className="w-5 h-5 text-[#d4af37]" /> },
        { label: d.step3, icon: <Lightbulb className="w-5 h-5 text-[#d4af37]" /> },
        { label: d.step4, icon: <Play className="w-5 h-5 text-[#d4af37]" /> },
        { label: d.step5, icon: <BarChart3 className="w-5 h-5 text-[#d4af37]" /> },
    ];

    const services = [
        { title: '글로벌 확장 전략', titleEn: 'Global Expansion Strategy', desc: '해외 시장 진출을 위한 종합 전략 수립 및 실행 지원' },
        { title: '국가 프로젝트 전략', titleEn: 'National Project Strategy', desc: '정부 및 공공기관 프로젝트 기획 및 수주 전략' },
        { title: '브랜드 포지셔닝', titleEn: 'Brand Positioning', desc: '프리미엄·럭셔리 시장에서의 브랜드 차별화 전략' },
    ];

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.consultingTitle} subtitle={d.consultingDesc} />

            {/* 5-Step Process */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="5-Step Strategic Process" subtitle="체계적인 5단계 전략 컨설팅 프로세스" />
                    <ProcessDiagram steps={steps} />
                </div>
            </section>

            {/* Service Areas */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="Service Areas" subtitle="컨설팅 서비스 영역" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {services.map((s, i) => (
                            <GlassCard key={i} delay={i * 0.1} className="text-center">
                                <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
                                <p className="text-[#d4af37]/60 text-xs mb-3">{s.titleEn}</p>
                                <p className="text-gray-400 text-sm">{s.desc}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
