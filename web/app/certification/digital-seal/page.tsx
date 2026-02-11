'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Shield, Lock, Fingerprint, Blocks } from 'lucide-react';

export default function DigitalSealPage() {
    const { dict } = useLanguage();
    const d = dict.pages.certification;
    const ds = dict.home.digitalSeal;

    const features = [
        { icon: <Shield className="w-8 h-8" />, title: ds.feature1, desc: '블록체인 기반 위변조 불가능한 인증 시스템' },
        { icon: <Lock className="w-8 h-8" />, title: ds.feature2, desc: '글로벌 표준에 부합하는 블록체인 인증 프로토콜' },
        { icon: <Fingerprint className="w-8 h-8" />, title: 'NFT/SBT 인증', desc: '불변의 디지털 인증서와 멤버십 카드 발행' },
        { icon: <Blocks className="w-8 h-8" />, title: '디지털 자산 보호', desc: '브랜드 가치와 지적 재산의 블록체인 기반 보호' },
    ];

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.sealTitle} subtitle={d.sealDesc} />

            {/* Digital Seal Concept */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <GlassCard className="p-10">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-red-900/10 border-2 border-[#d4af37]/30 flex items-center justify-center mx-auto mb-6">
                            <Shield className="w-10 h-10 text-[#d4af37]" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">{ds.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{ds.description}</p>
                    </GlassCard>
                </div>
            </section>

            {/* Features */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((f, i) => (
                            <GlassCard key={i} delay={i * 0.1}>
                                <div className="flex items-start gap-4">
                                    <div className="text-[#d4af37] flex-shrink-0">{f.icon}</div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">{f.title}</h3>
                                        <p className="text-gray-400 text-sm">{f.desc}</p>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
