'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Crown } from 'lucide-react';

export function GreetingSection() {
    const { dict } = useLanguage();

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
                    >
                        <h2 className="text-sm uppercase tracking-[0.3em] text-[#d4af37] mb-3">
                            {dict.home.greeting.title}
                        </h2>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            {dict.home.greeting.name}
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            &ldquo;{dict.home.greeting.message}&rdquo;
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
