'use client';

import { useState } from 'react';
import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Languages, Palette, BookOpen, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const programs = [
    {
        title: '한국어',
        titleEn: 'Korean Language',
        desc: 'AI 기반 한국어 교육, TOPIK 대비,\n클라우드 LMS를 통한 체계적인\n언어 교육 프로그램.',
        href: '/warrant/education/language',
        image: '/images/hunmin.png',
        features: ['한국어', 'AI TOPIK 모의시험', '클라우드 LMS'],
    },
    {
        title: '한국문학',
        titleEn: 'Korean Literature',
        desc: '한국 문학과 예술을 통한 문학 교육.\n독서, 질문, 토론, 인증의\n4단계 창작 커리큘럼.',
        href: '/warrant/education/culture',
        image: '/images/k_literature_icon_v2.png',
        features: ['한국문학', '4단계 창작 커리큘럼', '문학·예술 교육'],
    },
    {
        title: '한국학',
        titleEn: 'Korean Studies',
        desc: '한국의 역사, 문화, 유산에 대한\n학술 및 연구 프로그램.\n경영한류와의 융합.',
        href: '/warrant/education/studies',
        image: '/images/한국학.png',
        features: ['한국학', '학술 연구 프로그램', 'K-헤리티지 기반'],
    },
];

export default function EducationLandingPage() {
    const { dict } = useLanguage();
    const [modalUrl, setModalUrl] = useState<string | null>(null);
    const [modalTitle, setModalTitle] = useState('');

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner
                title="교육"
                subtitle="K-헤리티지의 가치를 세계에 전하는 WRA 교육"
            />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {programs.map((prog, i) => (
                            <div
                                key={i}
                                className="group block cursor-pointer"
                                onClick={() => {
                                    setModalUrl(prog.href);
                                    setModalTitle(prog.title);
                                }}
                            >
                                <GlassCard delay={i * 0.12} className="transition-all duration-300 group-hover:!border-[#d4af37]/40 !p-0 overflow-hidden">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-full h-48 overflow-hidden bg-[#0a0e1a] p-6">
                                            <img src={prog.image} alt={prog.titleEn} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="p-6 pb-8">
                                            <div className="flex items-center justify-center gap-3 mb-1">
                                                <h3 className="text-2xl font-bold text-white group-hover:text-[#d4af37] transition-colors">{prog.title}</h3>
                                                <ArrowRight className="w-5 h-5 text-[#d4af37]/30 group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" />
                                            </div>
                                            <p className="text-[#d4af37]/60 text-sm mb-4">{prog.titleEn}</p>
                                            <p className="text-gray-300 text-base leading-[1.9] mb-6 break-keep whitespace-pre-line">{prog.desc}</p>
                                            <div className="flex flex-col items-center gap-2 w-full px-2">
                                                {prog.features.map((f, j) => (
                                                    <span key={j} className="w-full max-w-[200px] text-center px-5 py-1.5 rounded-full text-sm bg-[#d4af37]/10 text-[#d4af37]/80 border border-[#d4af37]/15">
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Page Modal */}
            <AnimatePresence>
                {modalUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setModalUrl(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-7xl h-[90vh] rounded-2xl overflow-hidden bg-[#050510] border border-[#d4af37]/30 shadow-[0_0_60px_rgba(212,175,55,0.15)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header Bar */}
                            <div className="flex items-center justify-between px-6 py-3 bg-[#0a0e27] border-b border-[#d4af37]/20">
                                <span className="text-[#d4af37] text-sm font-semibold">{modalTitle}</span>
                                <button
                                    onClick={() => setModalUrl(null)}
                                    className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Iframe Content */}
                            <iframe
                                src={`${modalUrl}?embed=1`}
                                className="w-full h-[calc(90vh-48px)] border-0"
                                title={modalTitle}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
