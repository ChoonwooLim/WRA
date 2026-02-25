'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Crown, Globe, Gem, Users, Award, Star, Shield, Sparkles } from 'lucide-react';

export default function Royal33Page() {
    const { dict } = useLanguage();
    const d = dict.pages.certification;
    const r = dict.home.royal33;

    const benefits = [
        { icon: <Globe className="w-8 h-8" />, title: r.benefit1, desc: '글로벌 왕실 네트워크에 직접 참여하고, 해외 왕실과의 비즈니스 교류 기회를 확보합니다.' },
        { icon: <Crown className="w-8 h-8" />, title: r.benefit2, desc: '왕실 공식 행사 초대 및 왕실 선물 우선 선정권을 부여받습니다.' },
        { icon: <Gem className="w-8 h-8" />, title: r.benefit3, desc: '대한민국 상위 1% 프리미엄 네트워킹과 비즈니스 매칭 기회를 제공합니다.' },
    ];

    const tiers = [
        { name: 'The Royal 33', desc: '최상위 33개 기업/개인 — 왕실 직접 보증', badge: 'ULTRA PREMIUM', color: 'from-[#d4af37] to-[#aa771c]' },
        { name: 'Royal Heritage Partners', desc: '정기 파트너십 — 왕실 브랜드 공유', badge: 'PREMIUM', color: 'from-[#8b5cf6] to-[#6d28d9]' },
        { name: 'K-Royal Warrant 인증 기업', desc: 'K-Royal 인증 획득 기업', badge: 'CERTIFIED', color: 'from-[#0ea5e9] to-[#0284c7]' },
    ];

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.royal33Title} subtitle={d.royal33Desc} />

            {/* Membership Tiers */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="멤버십 등급" subtitle="Membership Tiers — K-Royal 인증 체계" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {tiers.map((tier, i) => (
                            <GlassCard key={i} delay={i * 0.1} className="text-center">
                                <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${tier.color} text-white text-xs font-bold mb-4`}>
                                    {tier.badge}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{tier.name}</h3>
                                <p className="text-gray-400 text-sm">{tier.desc}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
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
                                <p className="text-gray-400 text-sm">{b.desc}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Benefits */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <GlassCard>
                            <Award className="w-8 h-8 text-[#d4af37] mb-3" />
                            <h3 className="font-bold text-white mb-2">왕실 보증 브랜딩</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">K-Royal 인증 마크를 통해 제품과 서비스에 왕실의 품격과 신뢰를 부여합니다. 글로벌 시장에서 프리미엄 스토리텔링으로 차별화됩니다.</p>
                        </GlassCard>
                        <GlassCard delay={0.1}>
                            <Star className="w-8 h-8 text-[#d4af37] mb-3" />
                            <h3 className="font-bold text-white mb-2">프리미엄 이벤트 초대</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">궁중문화축전, 세계왕실전통문화엑스포 등 왕실 공식 행사에 VVIP로 초대됩니다. 글로벌 왕실 네트워크와의 교류 기회.</p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <div className="text-center py-16">
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
    );
}
