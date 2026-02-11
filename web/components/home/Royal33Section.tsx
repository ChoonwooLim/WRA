'use client';

import { motion } from 'framer-motion';
import { Crown, Star, Globe, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function Royal33Section() {
    const { dict } = useLanguage();

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Crown className="w-8 h-8 text-[#d4af37]" />
                            <span className="text-[#d4af37] font-bold tracking-widest uppercase">Premium Membership</span>
                        </div>

                        <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                            {dict.home.royal33.title}
                        </h2>

                        <p className="text-xl text-gray-300 mb-8 font-light border-l-4 border-[#d4af37] pl-6 italic">
                            {dict.home.royal33.subtitle}
                        </p>

                        <p className="text-gray-400 mb-10 leading-relaxed text-lg">
                            {dict.home.royal33.description}
                        </p>

                        <div className="space-y-4 mb-10">
                            {[
                                dict.home.royal33.benefit1,
                                dict.home.royal33.benefit2,
                                dict.home.royal33.benefit3
                            ].map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/20 group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                                        <Star className="w-5 h-5" />
                                    </div>
                                    <span className="text-gray-300 text-lg group-hover:text-white transition-colors">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <button className="px-8 py-4 bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-bold rounded-lg transition-all uppercase tracking-wider flex items-center gap-2">
                            {dict.home.royal33.cta}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>

                    {/* Visual Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 w-full max-w-lg"
                    >
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#050510]/80 to-black/80 z-10" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-8 text-center border-2 border-[#d4af37]/30 rounded-2xl m-2">
                                <div className="w-24 h-24 mb-8 relative">
                                    <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-[40px] opacity-20 animate-pulse" />
                                    <img src="/images/wra_logo.png" alt="WRA Seal" className="relative w-full h-full object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-gradient-gold mb-2">The Royal 33</h3>
                                <p className="text-gray-400 uppercase tracking-[0.2em] text-sm mb-8">Global Elite Membership</p>

                                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mb-8" />

                                <div className="grid grid-cols-2 gap-4 w-full text-xs text-gray-500 uppercase tracking-widest">
                                    <div className="text-center">
                                        <div className="text-[#d4af37] text-xl font-bold mb-1">33</div>
                                        <div>Members Only</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-[#d4af37] text-xl font-bold mb-1">DAO</div>
                                        <div>Governance</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
