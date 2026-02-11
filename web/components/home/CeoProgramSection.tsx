'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function CeoProgramSection() {
    const { dict } = useLanguage();

    return (
        <section className="py-24 container mx-auto px-4">
            <div className="glass-card rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center border-[#d4af37]/20">
                {/* Background Patterns */}
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(5,5,16,0.9),rgba(5,5,16,0.9)),url('/images/wra_logo.png')] bg-no-repeat bg-center bg-contain opacity-10 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <span className="inline-block py-1 px-4 rounded-full bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 text-sm font-bold mb-8 uppercase tracking-widest">
                        Executive Education
                    </span>

                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
                        {dict.home.ceoProgram.title}
                    </h2>

                    <h3 className="text-2xl text-gradient-gold mb-8 italic">
                        "{dict.home.ceoProgram.subtitle}"
                    </h3>

                    <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
                        {dict.home.ceoProgram.description}
                    </p>

                    <div className="flex flex-col items-center gap-6">
                        <p className="text-sm text-gray-500 uppercase tracking-widest font-mono">
                            {dict.home.ceoProgram.schedule}
                        </p>

                        <button className="group px-10 py-5 bg-[#d4af37] text-black font-bold text-lg rounded-xl hover:bg-[#b38728] transition-all transform hover:scale-105 shadow-[0_4px_20px_rgba(212,175,55,0.3)] flex items-center gap-2">
                            {dict.home.ceoProgram.cta}
                            <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
