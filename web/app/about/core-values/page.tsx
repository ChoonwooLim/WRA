'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function CoreValuesPage() {
    const { dict } = useLanguage();
    const cv = dict.home.coreValues;

    const values = [
        { ...cv.hongik, color: 'from-amber-500/20 to-amber-600/5' },
        { ...cv.wisdom, color: 'from-blue-500/20 to-blue-600/5' },
        { ...cv.peace, color: 'from-green-500/20 to-green-600/5' },
        { ...cv.creation, color: 'from-purple-500/20 to-purple-600/5' },
        { ...cv.heritage, color: 'from-rose-500/20 to-rose-600/5' },
        { ...cv.harmony, color: 'from-cyan-500/20 to-cyan-600/5' },
        { ...cv.humanity, color: 'from-orange-500/20 to-orange-600/5' },
    ];

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner
                title={cv.title}
                subtitle={cv.subtitle}
            />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader
                        title="7대 핵심가치"
                        subtitle="Seven Core Values that Define WRA"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((v, i) => (
                            <GlassCard key={i} delay={i * 0.08}>
                                <div className={`absolute inset-0 bg-gradient-to-br ${v.color} rounded-2xl opacity-50`} />
                                <div className="relative z-10 text-center py-4">
                                    <h3 className="text-xl font-bold text-[#fceda6] mb-3">{v.title}</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line break-keep">{v.desc}</p>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
