'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { Landmark, Handshake, Heart, Globe, Crown, BookOpen, Target, TrendingUp, Shield, Gem } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    const { dict } = useLanguage();
    const d = dict.pages.about;

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.heroTitle} subtitle={d.heroSubtitle} />


            {/* Vision & Mission — Slide 11 */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/about-vision.png"
                        alt="Buyongjeong Pavilion"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-[#050510]/90" />
                </div>
                <div className="relative z-10 container mx-auto px-4 max-w-5xl">
                    <SectionHeader title={d.visionTitle} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <GlassCard className="p-8">
                            <Target className="w-8 h-8 text-[#d4af37] mb-4" />
                            <h3 className="text-xl font-bold text-[#d4af37] mb-4">비전 (Vision)</h3>
                            <ul className="space-y-3 text-gray-300 text-sm leading-relaxed">
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/40 mt-2 flex-shrink-0" />
                                    한국인의 진취적인 도전정신, 독창성, 문제해결능력, 창조능력으로 세계를 선도하는 한국형 인재 육성
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/40 mt-2 flex-shrink-0" />
                                    1인 글로벌 임팩트 스타트업 육성
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/40 mt-2 flex-shrink-0" />
                                    세계를 선도하는 K-창의·융합형, K-뉴리더십 지도자 육성
                                </li>
                            </ul>
                        </GlassCard>
                        <GlassCard className="p-8" delay={0.1}>
                            <TrendingUp className="w-8 h-8 text-[#d4af37] mb-4" />
                            <h3 className="text-xl font-bold text-[#d4af37] mb-4">미션 (Mission)</h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                위대한 한국과 위대한 한국인의 유전자, 한국인의 정체성을 확립하고 한류문화를 보급합니다.
                            </p>
                            <div className="glass-card rounded-lg p-4 !border-[#d4af37]/20 text-center">
                                <p className="text-[#d4af37] font-semibold text-sm italic">
                                    &ldquo;대한민국 왕실의 정체성을 교육하며,<br />
                                    브랜드의 명문화를 재탄생시키는 곳&rdquo;
                                </p>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Why Royal? — Slide 12 */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="Why Royal?" subtitle="왜 '왕립(Royal)'인가?" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <GlassCard className="p-6">
                            <Shield className="w-8 h-8 text-[#d4af37] mb-3" />
                            <h4 className="text-white font-bold mb-2">세대를 잇는 유산 (Legacy)</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                한국의 5년 생존율 34%, 단기 성과 중심의 비즈니스 모델이 한계에 부딪혔습니다.
                                '왕립(Royal)'이라는 키워드는 수백 년의 역사를 전제합니다. '분기별 수익'에서 '세대를 잇는 유산'으로의 전환이 필요합니다.
                            </p>
                        </GlassCard>
                        <GlassCard className="p-6" delay={0.1}>
                            <Gem className="w-8 h-8 text-[#d4af37] mb-3" />
                            <h4 className="text-white font-bold mb-2">블루오션 콘텐츠</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                'K-Human'과 '왕실의 품격'은 글로벌 시장에서 희소성을 갖는 블루오션 콘텐츠입니다.
                                한국의 성공 DNA를 전 세계로 수출하는 '교육의 허브'로서 공간적 확장을 꾀합니다.
                            </p>
                        </GlassCard>
                        <GlassCard className="p-6" delay={0.2}>
                            <Shield className="w-8 h-8 text-[#d4af37] mb-3" />
                            <h4 className="text-white font-bold mb-2">신뢰 자본 (Trust Capital)</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                낮은 생존율의 원인은 '차별화 부재'입니다. '왕실 보증'이라는 강력한 신뢰 자본을 투입하여 진입 장벽을 구축합니다.
                            </p>
                        </GlassCard>
                        <GlassCard className="p-6" delay={0.3}>
                            <Globe className="w-8 h-8 text-[#d4af37] mb-3" />
                            <h4 className="text-white font-bold mb-2">국가적 어젠다</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                개인의 성공을 넘어, 한국적 가치의 세계화라는 국가적 어젠다를 선점합니다.
                            </p>
                        </GlassCard>
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
