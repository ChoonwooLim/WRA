'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Landmark, Handshake, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    const { dict } = useLanguage();
    const d = dict.pages.about;

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.heroTitle} subtitle={d.heroSubtitle} />

            {/* Vision & Mission */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <SectionHeader title={d.visionTitle} />
                    <GlassCard className="p-10">
                        <h3 className="text-2xl md:text-3xl font-bold text-[#d4af37] mb-6">{d.visionStatement}</h3>
                        <p className="text-gray-300 text-lg leading-relaxed">{d.missionStatement}</p>
                    </GlassCard>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title={dict.home.coreValues.title} subtitle={dict.home.coreValues.subtitle} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <Landmark className="w-8 h-8" />, ...dict.home.coreValues.heritage },
                            { icon: <Handshake className="w-8 h-8" />, ...dict.home.coreValues.harmony },
                            { icon: <Heart className="w-8 h-8" />, ...dict.home.coreValues.humanity },
                        ].map((v, i) => (
                            <GlassCard key={i} delay={i * 0.1} className="text-center">
                                <div className="text-[#d4af37] mb-4 flex justify-center">{v.icon}</div>
                                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                                <p className="text-gray-400 text-sm">{v.desc}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Links */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/about/organization">
                            <GlassCard className="cursor-pointer">
                                <h3 className="text-xl font-bold text-white mb-2">{d.orgTitle}</h3>
                                <p className="text-gray-400 text-sm">{d.orgDesc}</p>
                            </GlassCard>
                        </Link>
                        <Link href="/about/partners">
                            <GlassCard className="cursor-pointer" delay={0.1}>
                                <h3 className="text-xl font-bold text-white mb-2">{d.partnersTitle}</h3>
                                <p className="text-gray-400 text-sm">{d.partnersDesc}</p>
                            </GlassCard>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
