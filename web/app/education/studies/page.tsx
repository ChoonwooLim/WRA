'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { ProcessDiagram } from '@/components/shared/ProcessDiagram';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { BookOpen, Globe, Sparkles, Music, Crown, Users, Target, GraduationCap } from 'lucide-react';

const kManagementTopics = [
    { icon: <Crown className="w-8 h-8" />, title: 'K-Identity 교육', titleEn: 'Korean Identity Education', desc: '한국인의 정체성과 왕실 문화유산을 통한 리더십 교육. CEO가 반드시 이수해야 하는 핵심 과정.' },
    { icon: <Target className="w-8 h-8" />, title: '한국적 경영철학', titleEn: 'Korean Management Philosophy', desc: '홍익인간 정신을 기반으로 한 한국적 경영 철학과 리더십 모델 교육.' },
    { icon: <Users className="w-8 h-8" />, title: '왕실 에티켓', titleEn: 'Royal Etiquette', desc: '대한제국 황실의 예법과 품격을 현대 비즈니스에 적용하는 프리미엄 에티켓 교육.' },
    { icon: <Globe className="w-8 h-8" />, title: '글로벌 K-리더십', titleEn: 'Global K-Leadership', desc: '세계를 선도하는 K-창의·융합형 리더십과 1인 글로벌 임팩트 스타트업 역량 강화.' },
];

const topics = [
    { icon: <BookOpen className="w-8 h-8" />, title: '선비정신 (Scholar Spirit)', titleEn: 'Confucian Scholar Ethics', desc: '조선시대 선비의 학문적 정신과 윤리적 리더십을 탐구합니다. 의리, 청렴, 절개의 가치를 현대적으로 재해석하여 비즈니스 리더십에 적용합니다.' },
    { icon: <Sparkles className="w-8 h-8" />, title: '한(恨)과 흥(興)', titleEn: 'Han & Heung — Korean Soul', desc: '한국 문화의 깊은 정서를 이해하고 현대적으로 재해석합니다. 역경을 창조적 에너지로 승화시키는 한국인 특유의 정서적 역량을 탐구합니다.' },
    { icon: <Globe className="w-8 h-8" />, title: 'UNESCO 문화유산', titleEn: 'UNESCO World Heritage', desc: '한국의 세계문화유산을 통해 한국 문명의 가치를 배웁니다. 종묘, 창덕궁, 수원화성 등 유네스코 등재 유산의 의미와 현대적 활용.' },
    { icon: <Music className="w-8 h-8" />, title: '전통과 K-Wave', titleEn: 'Tradition meets K-Wave', desc: 'BTS, K-Drama, K-Food 등 현대 K-Wave와 전통 문화의 연결고리를 발견합니다. 한류의 근원은 한국의 전통문화 역량에서 비롯됩니다.' },
];

export default function StudiesPage() {
    const { dict } = useLanguage();
    const d = dict.pages.education;

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.studiesTitle} subtitle={d.studiesDesc} />

            {/* K-Management Section — Slides 25-34 */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="K-Management 과정" subtitle="CEO 필수 이수 과정 — 한국적 경영과 리더십" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {kManagementTopics.map((t, i) => (
                            <GlassCard key={i} delay={i * 0.1}>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                                        <div className="text-[#d4af37]">{t.icon}</div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{t.title}</h3>
                                        <p className="text-[#d4af37]/60 text-xs mb-2">{t.titleEn}</p>
                                        <p className="text-gray-400 text-sm leading-relaxed">{t.desc}</p>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Korean Studies Special Topics — Slides 35-39 */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="한국학 특별 과정" subtitle="Korean Studies — 한국의 정신과 문화를 깊이 탐구" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {topics.map((t, i) => (
                            <GlassCard key={i} delay={i * 0.1}>
                                <div className="text-[#d4af37] mb-4">{t.icon}</div>
                                <h3 className="text-lg font-bold text-white mb-1">{t.title}</h3>
                                <p className="text-[#d4af37]/60 text-xs mb-3">{t.titleEn}</p>
                                <p className="text-gray-400 text-sm leading-relaxed">{t.desc}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Education Philosophy */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <GlassCard className="p-10 text-center !bg-gradient-to-br !from-[#d4af37]/5 !to-[#d4af37]/0 !border-[#d4af37]/20">
                        <GraduationCap className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-3">교육 철학</h3>
                        <p className="text-gray-300 text-sm leading-relaxed max-w-2xl mx-auto">
                            한국인의 진취적인 도전정신, 독창성, 문제해결능력, 창조능력으로 세계를 선도하는 한국형 인재를 육성합니다.
                            K-창의·융합형 사고와 K-뉴리더십을 통해 문제를 해결하는 능력을 갖춘 글로벌 리더를 배출합니다.
                        </p>
                    </GlassCard>
                </div>
            </section>
        </div>
    );
}
