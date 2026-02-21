'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ProcessDiagram } from '@/components/shared/ProcessDiagram';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { BookOpen, HelpCircle, MessageSquare, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LiteraturePage() {
    const { dict } = useLanguage();
    const d = dict.pages.education;

    const steps = [
        { label: d.step1, icon: <BookOpen className="w-5 h-5 text-[#d4af37]" /> },
        { label: d.step2, icon: <HelpCircle className="w-5 h-5 text-[#d4af37]" /> },
        { label: d.step3, icon: <MessageSquare className="w-5 h-5 text-[#d4af37]" /> },
        { label: d.step4, icon: <PenTool className="w-5 h-5 text-[#d4af37]" /> },
    ];

    const stepDetails = [
        { title: d.step1, desc: '명작과 현대 한국 문학을 깊이 있게 읽고 분석합니다.', descEn: 'Deep reading and analysis of classic and modern Korean literature.' },
        { title: d.step2, desc: '텍스트에 대한 비판적 질문을 통해 사고력을 키웁니다.', descEn: 'Developing critical thinking through questioning texts.' },
        { title: d.step3, desc: '동료들과의 토론을 통해 다양한 시각을 탐구합니다.', descEn: 'Exploring diverse perspectives through peer discussions.' },
        { title: d.step4, desc: '자신만의 작품을 창작하고 출판까지 경험합니다.', descEn: 'Creating and publishing your own literary works.' },
    ];

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.literatureTitle} subtitle={d.literatureDesc} />

            {/* Introduction Section (Korean Literature) */}
            <section className="py-24 md:py-32 relative overflow-hidden bg-[#050510]">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('/images/royal_navy_damask_bg.png')] bg-repeat opacity-[0.05] pointer-events-none mix-blend-overlay" />
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1e3a8a]/20 blur-[150px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">

                    {/* Icon Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative w-full max-w-[400px] mb-12 flex justify-center bg-transparent drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] group"
                    >
                        <Image
                            src="/images/k_literature_icon_v2.png"
                            alt="한국문학 (K-Literature)"
                            width={400}
                            height={225}
                            className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-105"
                            priority
                        />
                    </motion.div>

                    {/* Glowing Typography */}
                    <div className="text-center flex flex-col items-center max-w-3xl mb-4">
                        <motion.h2
                            initial={{ backgroundPosition: "0% 50%" }}
                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                            transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                            className="text-4xl md:text-[46px] font-serif font-bold tracking-widest mb-4
                                       text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37]
                                       bg-[length:200%_auto] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                        >
                            한국문학
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-[#d4af37]/80 font-light text-lg md:text-xl tracking-widest"
                        >
                            -시대의 옷을 갈아입은 문학-
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        whileInView={{ opacity: 1, scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gray-400 to-transparent mb-12 origin-top"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-white text-2xl md:text-3xl font-light mb-20 md:mb-28 tracking-wide flex items-center justify-center gap-2"
                    >
                        <span>:</span>
                        <span>시대의 옷을 갈아입은 문학</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="mb-20 md:mb-28"
                    >
                        <h3 className="text-2xl md:text-4xl text-white font-serif tracking-widest leading-relaxed px-4 md:px-8">
                            &ldquo;문학, 영상의 옷을 입고 시대를 노래하다.&rdquo;
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                        className="text-gray-300 text-lg md:text-xl md:text-[22px] leading-[2.2] md:leading-[2.4] font-light flex flex-col items-center max-w-4xl mx-auto space-y-1 md:space-y-2"
                    >
                        <div className="flex text-left relative">
                            <span className="absolute -left-6 top-0 text-white font-serif">:</span>
                            <p>종이 위의 활자가 카메라의 렌즈를 만났습니다.</p>
                        </div>
                        <p>우리의 시는 시대를 위로하는 가사가 되었고,</p>
                        <p>우리의 이야기는 세계를 울리는 드라마가 되었습니다.</p>
                        <p>형태는 변해도 본질은 변하지 않습니다.</p>
                        <p>변화하는 시대의 길목에서, 한국 문학의 새로운 가능성을 읽어냅니다.</p>
                    </motion.div>
                </div>
            </section>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />

            {/* 4-Step Process */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="4-Step Creative Curriculum" subtitle="체계적인 4단계 창작 커리큘럼" />
                    <ProcessDiagram steps={steps} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                        {stepDetails.map((s, i) => (
                            <GlassCard key={i} delay={i * 0.1}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] text-sm font-bold">
                                        {i + 1}
                                    </div>
                                    <h3 className="font-bold text-white">{s.title}</h3>
                                </div>
                                <p className="text-gray-400 text-sm">{s.desc}</p>
                                <p className="text-gray-500 text-xs mt-1">{s.descEn}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
