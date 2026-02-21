'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Languages, Bot, Cloud, BookOpen, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LanguagePage() {
    const { dict } = useLanguage();
    const d = dict.pages.education;

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.languageTitle} subtitle={d.languageDesc} compact />

            {/* Custom Hunminjeongeum Hero Section */}
            <section className="relative w-full py-24 overflow-hidden border-b border-[#d4af37]/20">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('/images/royal_navy_damask_bg.png')] bg-repeat opacity-[0.05] pointer-events-none mix-blend-overlay" />

                <div className="container mx-auto px-4 max-w-5xl relative z-10 flex flex-col items-center">
                    {/* Removed Top Accent Line with Title per user request */}

                    {/* Scroll Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative w-full max-w-[400px] mb-16 flex justify-center bg-transparent drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] group"
                    >
                        <Image
                            src="/images/hunmin_scroll_transparent.png"
                            alt="훈민정음 (Hunminjeongeum)"
                            width={400}
                            height={225}
                            className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-105"
                            priority
                        />
                    </motion.div>

                    {/* Typography Content */}
                    <div className="text-center flex flex-col items-center max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-10"
                        >
                            <motion.h2
                                initial={{ backgroundPosition: "0% 50%" }}
                                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                                className="text-4xl md:text-[46px] font-serif font-bold tracking-widest mb-4 
                                           text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37] 
                                           background-size-200 drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)]"
                                style={{ backgroundSize: "200% auto" }}
                            >
                                한국어
                            </motion.h2>
                            <p className="text-[#d4af37] text-xl md:text-2xl font-serif tracking-widest mb-8 opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                -바른 가르침-
                            </p>
                            <p className="text-white text-xl md:text-2xl font-serif tracking-wide leading-relaxed font-medium">
                                "천지(天地)의 소리가 당신의 언어가 되는 순간,"
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-gray-300 font-serif text-base md:text-[17px] leading-[2.2] space-y-1 opacity-80"
                        >
                            <p>: 태초에 소리가 있었고, 그 소리는 자연의 이치였습니다.</p>
                            <p>1446년, 세종은 바람의 소리와 대지의 울림을 글자로 빚어냈습니다.</p>
                            <p>자연을 닮은 가장 완벽한 문자,</p>
                            <p>이제 세계왕립아카데미에서 그 위대한 유산의 주인이 되십시오.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* TOPIK AI */}
            <section className="py-20 relative z-10 w-full">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title={d.topikTitle} subtitle={d.topikDesc} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <GlassCard className="text-center">
                            <Bot className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                            <h3 className="font-bold text-white mb-2">AI 분석</h3>
                            <p className="text-gray-400 text-sm">개인별 취약 영역을 AI가 분석하여 맞춤형 학습을 추천합니다.</p>
                        </GlassCard>
                        <GlassCard className="text-center" delay={0.1}>
                            <Sparkles className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                            <h3 className="font-bold text-white mb-2">모의시험</h3>
                            <p className="text-gray-400 text-sm">실제 TOPIK 시험과 동일한 환경에서 모의고사를 제공합니다.</p>
                        </GlassCard>
                        <GlassCard className="text-center" delay={0.2}>
                            <Languages className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                            <h3 className="font-bold text-white mb-2">맞춤 학습</h3>
                            <p className="text-gray-400 text-sm">수준별 맞춤 커리큘럼으로 체계적 학습을 지원합니다.</p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* LMS */}
            <section className="py-20 relative z-10 w-full">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title={d.lmsTitle} subtitle={d.lmsDesc} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <GlassCard>
                            <Cloud className="w-8 h-8 text-[#d4af37] mb-4" />
                            <h3 className="font-bold text-white mb-2">클라우드 기반</h3>
                            <p className="text-gray-400 text-sm">언제 어디서나 접근 가능한 클라우드 기반 학습 관리 시스템.</p>
                        </GlassCard>
                        <GlassCard delay={0.1}>
                            <BookOpen className="w-8 h-8 text-[#d4af37] mb-4" />
                            <h3 className="font-bold text-white mb-2">인터랙티브 커뮤니티</h3>
                            <p className="text-gray-400 text-sm">VOD 강의, 진도 추적, 학습 커뮤니티까지 한곳에서 관리합니다.</p>
                        </GlassCard>
                    </div>
                </div>
            </section>
        </div>
    );
}
