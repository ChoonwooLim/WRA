'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Crown, X } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';

/** Parse **bold** markers into styled React elements */
function renderHighlightedText(text: string): React.ReactNode[] {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            const inner = part.slice(2, -2);
            return (
                <span key={i} className="text-white font-semibold">
                    {inner}
                </span>
            );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
    });
}

export function GreetingSection() {
    const { dict } = useLanguage();
    const [modalOpen, setModalOpen] = useState(false);

    // Show only the first paragraph as preview on the homepage
    const previewMessage = dict.home.greeting.message.split('\n\n')[0];

    // Full message split into paragraphs
    const fullParagraphs = dict.home.greeting.message.split('\n\n');

    // Escape key & body scroll lock
    const closeModal = useCallback(() => setModalOpen(false), []);

    useEffect(() => {
        if (!modalOpen) return;
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [modalOpen, closeModal]);

    return (
        <>
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#080818] to-[#050510]" />
                <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#d4af37]/3 rounded-full blur-[150px]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                        {/* Crown icon area */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-shrink-0"
                        >
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-center">
                                <Crown className="w-16 h-16 text-[#d4af37]" />
                            </div>
                        </motion.div>

                        {/* Message */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-left"
                        >
                            <h2 className="text-sm uppercase tracking-[0.4em] text-[#d4af37] mb-2 font-medium">
                                {dict.home.greeting.title}
                            </h2>
                            <h3 className="text-3xl md:text-4xl font-serif text-[#fceda6] mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                                {dict.home.greeting.name}
                            </h3>
                            <div className="text-base md:text-lg mb-6 tracking-wide">
                                {dict.home.greeting.role.split('\n').map((line, i) => (
                                    <p key={i} className={i === 0 ? 'text-gray-400' : 'text-[#d4af37] font-bold text-lg md:text-xl mt-1'}>
                                        {line}
                                    </p>
                                ))}
                            </div>
                            <div className="text-white leading-[1.8] text-lg md:text-xl font-light mb-6">
                                &ldquo;{renderHighlightedText(previewMessage)}&rdquo;
                            </div>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="inline-flex items-center gap-2 text-[#d4af37] hover:text-[#fceda6] transition-colors text-sm font-medium cursor-pointer"
                            >
                                {dict.home.learnMore} →
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Greeting Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={closeModal}
                        />

                        {/* Modal Content */}
                        <motion.div
                            className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl"
                            style={{
                                background: 'linear-gradient(135deg, rgba(10,10,30,0.97) 0%, rgba(15,12,35,0.98) 50%, rgba(10,10,30,0.97) 100%)',
                                border: '1px solid rgba(212,175,55,0.25)',
                                boxShadow: '0 25px 80px rgba(0,0,0,0.7), 0 0 60px rgba(212,175,55,0.08), inset 0 1px 0 rgba(212,175,55,0.15)',
                            }}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        >
                            {/* Header */}
                            <div
                                className="sticky top-0 z-10 flex items-center justify-between px-8 py-5"
                                style={{
                                    background: 'linear-gradient(180deg, rgba(10,10,30,1) 0%, rgba(10,10,30,0.95) 80%, rgba(10,10,30,0) 100%)',
                                    borderBottom: '1px solid rgba(212,175,55,0.15)',
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/25 to-[#d4af37]/5 border border-[#d4af37]/30 flex items-center justify-center">
                                        <Crown className="w-6 h-6 text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm uppercase tracking-[0.3em] text-[#d4af37] font-medium">
                                            {dict.home.greeting.title}
                                        </h2>
                                        <h3 className="text-lg font-serif text-[#fceda6]">
                                            {dict.home.greeting.name}
                                        </h3>
                                    </div>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Scrollable body */}
                            <div className="overflow-y-auto max-h-[calc(85vh-90px)] px-8 pb-8 pt-2 custom-scrollbar">
                                <p className="text-gray-500 text-sm mb-6 whitespace-pre-line">
                                    {dict.home.greeting.role}
                                </p>
                                <div className="space-y-5">
                                    {fullParagraphs.map((para, i) => (
                                        <p key={i} className="text-gray-200 leading-[1.9] text-[0.95rem] md:text-base font-light">
                                            {i === 0 ? <>&ldquo;</> : null}
                                            {renderHighlightedText(para)}
                                            {i === fullParagraphs.length - 1 ? <>&rdquo;</> : null}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* Decorative bottom glow */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none"
                                style={{
                                    background: 'linear-gradient(90deg, transparent 10%, rgba(212,175,55,0.3) 50%, transparent 90%)',
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
