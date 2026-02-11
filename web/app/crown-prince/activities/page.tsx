'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Globe, Landmark, Heart } from 'lucide-react';

const activities = [
    { icon: <Landmark className="w-8 h-8" />, category: '문화유산 환수', categoryEn: 'Heritage Restoration', items: ['해외 유출 문화재 환수 활동', '국립고궁박물관 협력', '황실 유물 보존 프로젝트'] },
    { icon: <Globe className="w-8 h-8" />, category: '국제 외교', categoryEn: 'International Diplomacy', items: ['인도네시아 문화 교류', '태국 왕실 친선 방문', '유럽 문화기관 네트워크 구축'] },
    { icon: <Heart className="w-8 h-8" />, category: '사회 공헌', categoryEn: 'Social Contribution', items: ['노블레스 오블리주 실천', '청소년 문화 교육 지원', '글로벌 장학금 사업'] },
];

export default function ActivitiesPage() {
    const { dict } = useLanguage();

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={dict.pages.crownPrince.activitiesTitle} subtitle={dict.pages.crownPrince.activitiesDesc} compact />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {activities.map((act, i) => (
                            <GlassCard key={i} delay={i * 0.15}>
                                <div className="text-[#d4af37] mb-4">{act.icon}</div>
                                <h3 className="text-lg font-bold text-white mb-1">{act.category}</h3>
                                <p className="text-[#d4af37]/60 text-sm mb-4">{act.categoryEn}</p>
                                <ul className="space-y-2">
                                    {act.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-2 text-gray-400 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/40 mt-1.5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
