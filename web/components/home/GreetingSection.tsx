'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Crown } from 'lucide-react';
import Link from 'next/link';
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

export function GreetingSection() {
    const { dict } = useLanguage();

    // Show only the first paragraph as preview on the homepage
    const previewMessage = dict.home.greeting.message.split('\n\n')[0];

    return (
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
                        <p className="text-gray-500 text-sm mb-6 whitespace-pre-line">
                            {dict.home.greeting.role}
                        </p>
                        <div className="text-white leading-[1.8] text-lg md:text-xl font-light mb-6">
                            &ldquo;{renderHighlightedText(previewMessage)}&rdquo;
                        </div>
                        <Link
                            href="/crown-prince/message"
                            className="inline-flex items-center gap-2 text-[#d4af37] hover:text-[#fceda6] transition-colors text-sm font-medium"
                        >
                            {dict.home.learnMore} →
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}


