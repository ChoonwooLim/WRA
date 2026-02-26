'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Globe, Crown, BookOpen } from 'lucide-react';

export default function FoundingPhilosophyPage() {
    const { dict } = useLanguage();

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner
                title="WRA 설립이념"
                subtitle="Founding Philosophy"
            />

            {/* 설립이념 본문 — from about page */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/about-philosophy.png"
                        alt="Changdeokgung Palace"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#050510]/80 to-[#050510]" />
                </div>
                <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
                    <SectionHeader title="설립이념" subtitle="Founding Philosophy" />
                    <GlassCard className="p-10 !bg-gradient-to-br !from-[#d4af37]/10 !to-[#d4af37]/5 !border-[#d4af37]/30 backdrop-blur-xl">
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6 break-keep whitespace-pre-line">
                            세계왕립아카데미는 한국, 한국인, 한민족의 뿌리사상인
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mb-10 w-full max-w-4xl mx-auto">
                            <div className="group cursor-default transition-all duration-300 hover:scale-110 hover:-translate-y-1 flex-1 min-w-[200px] flex flex-col items-center justify-center bg-transparent py-2">
                                <span className="text-2xl md:text-[2rem] font-black tracking-widest relative top-[2px] transition-colors duration-300 animate-pulse-gold" style={{ animationDelay: "0s" }}>홍익인간</span>
                                <span className="text-sm md:text-base text-[#d4af37]/70 group-hover:text-[#d4af37] font-serif tracking-[0.25em] relative bottom-[2px] mt-2 transition-colors duration-300 animate-pulse-gold" style={{ animationDelay: "0s" }}>弘益人間</span>
                            </div>
                            <span className="hidden md:block text-[#d4af37]/50 text-2xl font-light">·</span>
                            <div className="group cursor-default transition-all duration-300 hover:scale-110 hover:-translate-y-1 flex-1 min-w-[200px] flex flex-col items-center justify-center bg-transparent py-2">
                                <span className="text-2xl md:text-[2rem] font-black tracking-widest relative top-[2px] transition-colors duration-300 animate-pulse-gold" style={{ animationDelay: "1.3s" }}>성통공완</span>
                                <span className="text-sm md:text-base text-[#d4af37]/70 group-hover:text-[#d4af37] font-serif tracking-[0.25em] relative bottom-[2px] mt-2 transition-colors duration-300 animate-pulse-gold" style={{ animationDelay: "1.3s" }}>成通功完</span>
                            </div>
                            <span className="hidden md:block text-[#d4af37]/50 text-2xl font-light">·</span>
                            <div className="group cursor-default transition-all duration-300 hover:scale-110 hover:-translate-y-1 flex-1 min-w-[200px] flex flex-col items-center justify-center bg-transparent py-2">
                                <span className="text-2xl md:text-[2rem] font-black tracking-widest relative top-[2px] transition-colors duration-300 animate-pulse-gold" style={{ animationDelay: "2.6s" }}>재세이화</span>
                                <span className="text-sm md:text-base text-[#d4af37]/70 group-hover:text-[#d4af37] font-serif tracking-[0.25em] relative bottom-[2px] mt-2 transition-colors duration-300 animate-pulse-gold" style={{ animationDelay: "2.6s" }}>在世理化</span>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4 text-gray-300 text-base md:text-lg leading-relaxed break-keep w-full max-w-3xl mx-auto px-4 text-center">
                            <p className="w-full">
                                세상을 널리 이롭게 하는 정신을 근본을 기초로 한, 세계 어느 나라도 따라할 수 없는
                            </p>
                            <p className="w-full text-base md:text-lg">
                                전쟁과 갈등의 지구촌에 필요한 이타적인 건국이념입니다.
                            </p>
                        </div>
                    </GlassCard>
                </div>
            </section>

            {/* WRA 의미 */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="WRA의 의미" subtitle="The Meaning of WRA" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <GlassCard className="text-center">
                            <Globe className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">World</h3>
                            <p className="text-[#d4af37]/80 text-sm mb-3">글로벌 스탠다드</p>
                            <p className="text-gray-400 text-sm">세계를 무대로 하는 글로벌 스탠다드</p>
                        </GlassCard>
                        <GlassCard className="text-center" delay={0.1}>
                            <Crown className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">Royal</h3>
                            <p className="text-[#d4af37]/80 text-sm mb-3">대한제국 왕실의 정통성</p>
                            <p className="text-gray-400 text-sm">대한제국 왕실의 정통성을 잇는 대변인으로서의 위상</p>
                        </GlassCard>
                        <GlassCard className="text-center" delay={0.2}>
                            <BookOpen className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">Academy</h3>
                            <p className="text-[#d4af37]/80 text-sm mb-3">브랜드의 명문화</p>
                            <p className="text-gray-400 text-sm">대한민국 왕실의 정체성을 교육하며, 브랜드의 명문화를 재탄생시키는 곳</p>
                        </GlassCard>
                    </div>
                </div>
            </section>
        </div>
    );
}
