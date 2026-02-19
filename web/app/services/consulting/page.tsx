'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { ProcessDiagram } from '@/components/shared/ProcessDiagram';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Search, FileCheck, Lightbulb, Play, BarChart3, Globe, Crown, Gem, Target, Award } from 'lucide-react';

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
        {
            icon: <Crown className="w-8 h-8" />,
            title: '국가 프로젝트 전략',
            titleEn: 'National Project Strategy',
            desc: '정부 및 공공기관 프로젝트 기획 및 수주 전략. 국가적 어젠다를 선점하고, 왕실 브랜드의 공신력을 활용한 대규모 프로젝트 컨설팅.',
            features: ['정부 협력 프로젝트 기획', '국가 브랜드 전략 수립', '공공 문화 프로젝트 기획/수주'],
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: '글로벌 확장 전략',
            titleEn: 'Global Expansion Strategy',
            desc: '해외 시장 진출을 위한 종합 전략 수립 및 실행 지원. K-Human과 왕실의 품격을 활용한 글로벌 블루오션 콘텐츠 전략.',
            features: ['해외 시장 진출 전략', '글로벌 파트너십 구축', '문화 콘텐츠 수출 전략'],
        },
        {
            icon: <Gem className="w-8 h-8" />,
            title: '브랜드 포지셔닝',
            titleEn: 'Brand Positioning & Localization',
            desc: '프리미엄·럭셔리 시장에서의 브랜드 차별화 전략. 왕실 보증(Trust Capital)을 활용한 진입 장벽 구축 컨설팅.',
            features: ['프리미엄 브랜드 전략', '로컬라이제이션 컨설팅', '스토리텔링 개발'],
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: 'K-Royal 인증 컨설팅',
            titleEn: 'K-Royal Certification Consulting',
            desc: 'K-Royal Warrant 인증 취득을 위한 전문 컨설팅. CEO 교육 과정부터 인증 신청, 심사 준비까지 전 과정을 지원합니다.',
            features: ['인증 취득 로드맵 수립', 'CEO 교육 과정 안내', '심사 준비 및 서류 지원'],
        },
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

            {/* Service Areas — Slides 67-70 */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="Service Areas" subtitle="컨설팅 서비스 영역" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((s, i) => (
                            <GlassCard key={i} delay={i * 0.1}>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                                        <div className="text-[#d4af37]">{s.icon}</div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
                                        <p className="text-[#d4af37]/60 text-xs mb-3">{s.titleEn}</p>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                                        <div className="space-y-1.5">
                                            {s.features.map((f, j) => (
                                                <div key={j} className="flex items-center gap-2 text-gray-500 text-xs">
                                                    <div className="w-1 h-1 rounded-full bg-[#d4af37]/40" />
                                                    {f}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <GlassCard className="p-10 text-center !bg-gradient-to-br !from-[#d4af37]/5 !to-[#d4af37]/0 !border-[#d4af37]/20">
                        <Target className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-3">맞춤형 컨설팅 상담</h3>
                        <p className="text-gray-400 text-sm mb-6 max-w-xl mx-auto">
                            귀사의 비즈니스 목표와 시장 상황에 맞는 최적의 전략을 수립해 드립니다.
                            K-Royal 브랜드의 가치를 활용한 프리미엄 포지셔닝을 경험하세요.
                        </p>
                        <a href="/community/contact" className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black font-semibold hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all">
                            상담 신청하기
                        </a>
                    </GlassCard>
                </div>
            </section>
        </div>
    );
}
