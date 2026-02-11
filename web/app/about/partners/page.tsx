'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Globe } from 'lucide-react';

const partners = [
    { name: 'AMCHAM', full: 'American Chamber of Commerce in Korea', desc: '주한미국상공회의소' },
    { name: 'BCCK', full: 'British Chamber of Commerce in Korea', desc: '주한영국상공회의소' },
    { name: 'ECCK', full: 'European Chamber of Commerce in Korea', desc: '주한유럽상공회의소' },
    { name: '국립고궁박물관', full: 'National Palace Museum of Korea', desc: 'National Palace Museum of Korea' },
    { name: '한국문화재재단', full: 'Korea Cultural Heritage Foundation', desc: 'Korea Cultural Heritage Foundation' },
    { name: '대한제국황실문화원', full: 'Imperial Culture Institute', desc: 'imperialhouse.kr' },
];

export default function PartnersPage() {
    const { dict } = useLanguage();

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={dict.pages.about.partnersTitle} subtitle={dict.pages.about.partnersDesc} compact />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {partners.map((p, i) => (
                            <GlassCard key={i} delay={i * 0.08} className="text-center">
                                <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center mx-auto mb-4">
                                    <Globe className="w-7 h-7 text-[#d4af37]" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                                <p className="text-[#d4af37]/60 text-xs mb-2">{p.full}</p>
                                <p className="text-gray-400 text-sm">{p.desc}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
