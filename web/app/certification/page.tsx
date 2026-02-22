'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { ProcessDiagram } from '@/components/shared/ProcessDiagram';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Award, Shield, Star, ArrowRight, Crown, GraduationCap, Users, Gem, Target, Globe } from 'lucide-react';
import Link from 'next/link';

export default function CertificationPage() {
    const { dict } = useLanguage();
    const d = dict.pages.certification;

    const processSteps = [
        { label: d.processApply },
        { label: d.processReview },
        { label: d.processCertify },
        { label: d.processRenew },
    ];

    const ceoEducation = [
        { icon: <Crown className="w-6 h-6" />, title: 'K-Identity 교육', desc: '한국인의 정체성과 왕실 문화유산을 통한 의식 전환 교육. 왕실의 가치를 제품과 서비스에 투영하는 전략.' },
        { icon: <GraduationCap className="w-6 h-6" />, title: '왕실 에티켓 교육', desc: '대한제국 황실의 예법과 품격을 현대 비즈니스에 적용하는 프리미엄 에티켓 및 프로토콜 교육.' },
        { icon: <Target className="w-6 h-6" />, title: '한국적 경영철학', desc: '홍익인간 정신에 기반한 한국적 경영 철학 교육. K-뉴리더십 역량 강화 프로그램.' },
    ];

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.heroTitle} subtitle={d.heroSubtitle} />

            {/* Philosophy Section */}
            <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#0a1128] to-[#050510]">
                <div className="absolute inset-0 bg-[url('/images/royal_navy_damask_bg.png')] bg-repeat opacity-[0.03] pointer-events-none mix-blend-overlay" />
                <div className="container mx-auto px-4 max-w-5xl relative z-10">
                    <SectionHeader
                        title="인증 철학 (Philosophy)"
                    />

                    <GlassCard delay={0.1} className="!bg-[#0a0f25]/80 !border-[#d4af37]/30 p-10 md:p-14 text-center shadow-[0_10px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#d4af37]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

                        <div className="relative z-10 flex flex-col items-center">
                            <Crown className="w-12 h-12 text-[#d4af37] mb-8 opacity-90 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]" />

                            <h3 className="text-xl md:text-3xl font-serif text-[#fceda6] font-medium leading-[1.6] break-keep mb-10 tracking-wide">
                                "대한민국의 혼(Spirit)을 담은 명품,<br className="hidden md:block" /> 황실이 그 가치를 보증합니다."
                            </h3>

                            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent mb-10"></div>

                            <div className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed md:leading-[1.8] tracking-wide break-keep">
                                <p>
                                    <strong className="text-white font-serif">World Royal Academy</strong>는 단순한 품질 인증을 넘어,<br className="hidden md:block" />
                                    기업가의 철학(Philosophy)과 제품의 장인정신(Craftsmanship)을 엄격히 심사하여<br className="hidden md:block" />
                                    <span className="text-[#d4af37] font-semibold">'Royal Warrant(황실 인증)'</span> 자격을 부여합니다.
                                </p>
                                <p>
                                    이는 대한민국을 대표하는 브랜드로서의 자부심이자,<br className="hidden md:block" />
                                    세계 시장을 향한 신뢰의 징표입니다.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </section>

            {/* K-Royal Warrant Overview */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title={d.warrantTitle} subtitle={d.warrantDesc} />

                    {/* Process Diagram */}
                    <div className="mb-16">
                        <ProcessDiagram steps={processSteps} />
                    </div>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <GlassCard className="text-center">
                            <Award className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                            <h3 className="font-bold text-white mb-2">프리미엄 브랜딩</h3>
                            <p className="text-gray-400 text-sm">글로벌 시장(영국, 유럽)을 위한 프리미엄 스토리텔링 지원. 왕실 보증이라는 강력한 신뢰 자본(Trust Capital) 확보.</p>
                        </GlassCard>
                        <GlassCard className="text-center" delay={0.1}>
                            <Shield className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                            <h3 className="font-bold text-white mb-2">인증 마크</h3>
                            <p className="text-gray-400 text-sm">한국 장인정신과 철학을 체현하는 공식 K-Royal 인증 마크 부여. 제품과 서비스에 왕실의 품격을 부여합니다.</p>
                        </GlassCard>
                        <GlassCard className="text-center" delay={0.2}>
                            <Star className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                            <h3 className="font-bold text-white mb-2">VVIP 네트워킹</h3>
                            <p className="text-gray-400 text-sm">공식 왕실 선물 우선 선정권 및 VVIP 네트워킹 기회. Royal 33 및 Heritage Partners 멤버십 혜택.</p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* CEO Education (필수 이수) — Slides 56-58 */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="CEO 필수 교육" subtitle="K-Royal Warrant 인증을 위한 CEO 필수 이수 과정" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {ceoEducation.map((item, i) => (
                            <GlassCard key={i} delay={i * 0.1}>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                                        <div className="text-[#d4af37]">{item.icon}</div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                    <div className="text-center">
                        <p className="text-gray-500 text-sm italic">
                            ※ K-Royal Warrant 인증 신청 시, CEO가 반드시 이수해야 하는 교육 과정입니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* Sub-pages */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/certification/royal33">
                            <GlassCard className="cursor-pointer h-full">
                                <Gem className="w-8 h-8 text-[#d4af37] mb-3" />
                                <h3 className="text-xl font-bold text-[#d4af37] mb-2">{d.royal33Title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{d.royal33Desc}</p>
                                <span className="inline-flex items-center gap-1 text-[#d4af37] text-sm">
                                    {dict.home.learnMore} <ArrowRight className="w-4 h-4" />
                                </span>
                            </GlassCard>
                        </Link>
                        <Link href="/certification/digital-seal">
                            <GlassCard className="cursor-pointer h-full" delay={0.1}>
                                <Shield className="w-8 h-8 text-[#d4af37] mb-3" />
                                <h3 className="text-xl font-bold text-[#d4af37] mb-2">{d.sealTitle}</h3>
                                <p className="text-gray-400 text-sm mb-4">{d.sealDesc}</p>
                                <span className="inline-flex items-center gap-1 text-[#d4af37] text-sm">
                                    {dict.home.learnMore} <ArrowRight className="w-4 h-4" />
                                </span>
                            </GlassCard>
                        </Link>
                        <GlassCard className="h-full !border-dashed !border-[#d4af37]/20" delay={0.2}>
                            <Users className="w-8 h-8 text-[#d4af37] mb-3" />
                            <h3 className="text-xl font-bold text-[#d4af37] mb-2">로열 헤리티지 파트너스</h3>
                            <p className="text-[#d4af37]/60 text-xs mb-2">Royal Heritage Partners</p>
                            <p className="text-gray-400 text-sm mb-4">정기 파트너십 프로그램을 통해 왕실 브랜드의 가치를 공유하는 비즈니스 파트너 네트워크.</p>
                            <span className="inline-flex items-center gap-1 text-gray-500 text-sm italic">
                                Coming Soon
                            </span>
                        </GlassCard>
                    </div>
                </div>
            </section>
        </div>
    );
}
