'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { MapPin, Clock, Users } from 'lucide-react';

const tours = [
    { name: '국립고궁박물관', nameEn: 'National Palace Museum of Korea', desc: '조선왕실과 대한제국 황실의 유물을 만나는 프리미엄 투어', duration: '2시간', capacity: '20명' },
    { name: '경복궁', nameEn: 'Gyeongbokgung Palace', desc: '조선시대 정궁의 위엄을 체험하는 특별 가이드 투어', duration: '3시간', capacity: '15명' },
    { name: '덕수궁', nameEn: 'Deoksugung Palace', desc: '대한제국의 역사가 살아 숨 쉬는 근대 황실 투어', duration: '2시간', capacity: '15명' },
    { name: '주미대한제국공사관', nameEn: 'Old Korean Legation in Washington D.C.', desc: '미국 워싱턴에 위치한 대한제국 외교의 현장', duration: '2시간', capacity: '10명' },
];

export default function ToursPage() {
    const { dict } = useLanguage();
    const d = dict.pages.services;

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.toursTitle} subtitle={d.toursDesc} />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {tours.map((t, i) => (
                            <GlassCard key={i} delay={i * 0.1}>
                                <h3 className="text-lg font-bold text-white mb-1">{t.name}</h3>
                                <p className="text-[#d4af37]/60 text-xs mb-3">{t.nameEn}</p>
                                <p className="text-gray-400 text-sm mb-4">{t.desc}</p>
                                <div className="flex items-center gap-4 text-gray-500 text-xs">
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {t.duration}</span>
                                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {t.capacity}</span>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
