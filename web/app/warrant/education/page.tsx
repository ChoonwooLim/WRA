'use client';

import { useState } from 'react';
import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { BookText, Globe2, ArrowRight, X } from 'lucide-react';
import React from 'react';

/* Custom Hangul icon — styled '한' character */
function HangeulIcon({ className }: { className?: string }) {
    return (
        <span className={`font-black select-none ${className ?? ''}`} style={{ fontFamily: 'serif', fontSize: '2rem', lineHeight: 1, color: '#d4af37' }}>
            한
        </span>
    );
}
import { motion, AnimatePresence } from 'framer-motion';

const programs = [
    {
        title: '한국어',
        titleEn: 'Korean Language',
        desc: 'AI 기술 기반의 체계적인 한국어 교육',
        href: '/warrant/education/language',
    },
    {
        title: '한국인문학',
        titleEn: 'Korean Humanities',
        desc: 'AI시대 인문학과 놀자',
        href: '/warrant/education/culture',
    },
    {
        title: '한국학',
        titleEn: 'Korean Studies',
        desc: '한국학을 공부해야 하는 이유',
        href: '/warrant/education/studies',
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {programs.map((prog, i) => {
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.15 }}
                                    className="group block cursor-pointer"
                                    onClick={() => {
                                        setModalUrl(prog.href);
                                        setModalTitle(prog.title);
                                    }}
                                >
                                    <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.12)]"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(15,15,35,0.95), rgba(10,10,25,0.98))',
                                            border: '1px solid rgba(212,175,55,0.15)',
                                        }}
                                    >
                                        {/* Top gold accent line */}
                                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent group-hover:via-[#d4af37] transition-all duration-500" />

                                        <div className="flex flex-col items-center text-center px-8 py-10 min-h-[220px] justify-center">

                                            {/* Title */}
                                            <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-[#fceda6] transition-colors duration-300 tracking-wide">{prog.title}</h3>
                                            <span className="text-[#d4af37]/70 text-xl md:text-2xl mt-2 group-hover:text-[#d4af37] transition-colors duration-300" style={{ fontFamily: 'var(--font-dancing), cursive' }}>{prog.titleEn}</span>

                                            {/* Decorative divider */}
                                            <div className="flex items-center gap-3 my-5">
                                                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/50 group-hover:w-12 transition-all duration-500" />
                                                <div className="w-2 h-2 rotate-45 bg-[#d4af37]/50 group-hover:bg-[#d4af37] transition-all duration-500" />
                                                <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/50 group-hover:w-12 transition-all duration-500" />
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-400 text-sm leading-[1.9] break-keep whitespace-pre-line group-hover:text-gray-300 transition-colors duration-300">{prog.desc}</p>

                                            {/* Arrow */}
                                            <div className="mt-6 flex items-center gap-2 text-[#d4af37]/40 group-hover:text-[#d4af37] transition-all duration-300">
                                                <span className="text-xs tracking-widest uppercase font-medium">자세히 보기</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                            </div>
                                        </div>

                                        {/* Bottom gold accent line */}
                                        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />
                                    </div>
                                </motion.div>
                            );
                        })}
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
