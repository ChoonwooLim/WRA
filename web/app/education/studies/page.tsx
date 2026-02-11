'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { BookOpen, Globe, Sparkles, Music } from 'lucide-react';

const topics = [
    { icon: <BookOpen className="w-8 h-8" />, title: '선비정신 (Scholar Spirit)', desc: '조선시대 선비의 학문적 정신과 윤리적 리더십을 탐구합니다.' },
    { icon: <Sparkles className="w-8 h-8" />, title: '한(恨)과 흥(興)', desc: '한국 문화의 깊은 정서를 이해하고 현대적으로 재해석합니다.' },
    { icon: <Globe className="w-8 h-8" />, title: 'UNESCO 문화유산', desc: '한국의 세계문화유산을 통해 한국 문명의 가치를 배웁니다.' },
    { icon: <Music className="w-8 h-8" />, title: '전통과 K-Wave', desc: 'BTS, K-Drama 등 현대 K-Wave와 전통 문화의 연결고리를 발견합니다.' },
];

export default function StudiesPage() {
    const { dict } = useLanguage();
    const d = dict.pages.education;

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.studiesTitle} subtitle={d.studiesDesc} />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {topics.map((t, i) => (
                            <GlassCard key={i} delay={i * 0.1}>
                                <div className="text-[#d4af37] mb-4">{t.icon}</div>
                                <h3 className="text-lg font-bold text-white mb-2">{t.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{t.desc}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
