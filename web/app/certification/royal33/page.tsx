'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Crown, Globe, Gem, Users } from 'lucide-react';

export default function Royal33Page() {
    const { dict } = useLanguage();
    const d = dict.pages.certification;
    const r = dict.home.royal33;

    const benefits = [
        { icon: <Globe className="w-8 h-8" />, title: r.benefit1 },
        { icon: <Crown className="w-8 h-8" />, title: r.benefit2 },
        { icon: <Gem className="w-8 h-8" />, title: r.benefit3 },
    ];

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.royal33Title} subtitle={d.royal33Desc} />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="Membership Benefits" subtitle="Royal 33 멤버십이 제공하는 특별한 혜택" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((b, i) => (
                            <GlassCard key={i} delay={i * 0.15} className="text-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-amber-700/10 flex items-center justify-center mx-auto mb-4">
                                    <div className="text-[#d4af37]">{b.icon}</div>
                                </div>
                                <h3 className="text-white font-semibold mb-2">{b.title}</h3>
                            </GlassCard>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-16">
                        <GlassCard className="inline-block px-12 py-8 !bg-gradient-to-br !from-[#d4af37]/10 !to-[#d4af37]/5 !border-[#d4af37]/20">
                            <Users className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-3">{r.cta}</h3>
                            <p className="text-gray-400 text-sm mb-4">대한민국 상위 1%를 위한 초프리미엄 네트워킹</p>
                            <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black font-semibold hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all">
                                {r.cta}
                            </button>
                        </GlassCard>
                    </div>
                </div>
            </section>
        </div>
    );
}
