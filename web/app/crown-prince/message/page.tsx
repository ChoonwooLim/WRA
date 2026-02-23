'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import React from 'react';

/** Parse **bold** markers into styled React elements */
function renderHighlightedText(text: string): React.ReactNode[] {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            const inner = part.slice(2, -2);
            return (
                <span key={i} className="text-[#d4af37] font-semibold">
                    {inner}
                </span>
            );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
    });
}

export default function MessagePage() {
    const { dict } = useLanguage();
    const paragraphs = dict.home.greeting.message.split('\n\n');

    // Detect numbered/ordered items (첫째, 둘째, 셋째, 넷째 / First, Second, Third, Fourth)
    const isNumberedItem = (text: string) =>
        /^(첫째|둘째|셋째|넷째|First|Second|Third|Fourth)/i.test(text);

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={dict.pages.crownPrince.messageTitle} compact />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="glass-card rounded-2xl p-10 md:p-16 relative overflow-hidden"
                    >
                        {/* Decorative gradient orbs */}
                        <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#d4af37]/5 rounded-full blur-[80px] pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#d4af37]/3 rounded-full blur-[80px] pointer-events-none" />

                        {/* Header with Crown icon */}
                        <div className="text-center mb-14 relative z-10">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-center mx-auto mb-6">
                                    <Crown className="w-10 h-10 text-[#d4af37]" />
                                </div>
                            </motion.div>
                            <h2 className="text-sm uppercase tracking-[0.4em] text-[#d4af37] mb-3 font-medium">
                                {dict.home.greeting.title}
                            </h2>
                            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
                        </div>

                        {/* Message Body */}
                        <div className="space-y-5 mb-14 relative z-10">
                            {paragraphs.map((paragraph, index) => {
                                const numbered = isNumberedItem(paragraph);

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 + index * 0.06 }}
                                    >
                                        {numbered ? (
                                            <div className="flex items-start gap-3 pl-4 border-l-2 border-[#d4af37]/30 py-1">
                                                <p className="text-gray-300 text-base md:text-lg leading-[1.9] font-light">
                                                    {renderHighlightedText(paragraph)}
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-gray-300 text-base md:text-lg leading-[1.9] font-light">
                                                {renderHighlightedText(paragraph)}
                                            </p>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent mb-10 relative z-10" />

                        {/* Signature */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="text-right relative z-10"
                        >
                            <p className="text-gray-500 text-sm whitespace-pre-line leading-relaxed mb-3">
                                {dict.home.greeting.role}
                            </p>
                            <p className="text-[#d4af37] font-semibold text-xl">
                                {dict.home.greeting.name}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
