'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Fingerprint, Lock } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function DigitalSealSection() {
    const { dict } = useLanguage();

    return (
        <section className="relative py-32 bg-[#0a0a20] overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="text-white">{dict.home.digitalSeal.title}</span>
                        </h2>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            {dict.home.digitalSeal.description}
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-8 rounded-2xl relative group overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Fingerprint className="w-32 h-32 text-primary" />
                        </div>
                        <ShieldCheck className="w-12 h-12 text-[#d4af37] mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">The Digital Seal</h3>
                        <p className="text-gray-400">{dict.home.digitalSeal.feature1}</p>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass-card p-8 rounded-2xl relative group overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Lock className="w-32 h-32 text-blue-500" />
                        </div>
                        <Lock className="w-12 h-12 text-blue-400 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">Blockchain Security</h3>
                        <p className="text-gray-400">{dict.home.digitalSeal.feature2}</p>
                    </motion.div>

                    {/* Visual Tech Representation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="glass-card p-1 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#d4af37]/20 to-transparent"
                    >
                        <div className="w-full h-full bg-[#050510] rounded-xl flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-40 h-40 border-2 border-[#d4af37]/30 rounded-full animate-[spin_10s_linear_infinite]" />
                                <div className="w-32 h-32 border-2 border-[#d4af37]/50 rounded-full animate-[spin_15s_linear_infinite_reverse] absolute" />
                                <div className="w-4 h-4 bg-[#d4af37] rounded-full shadow-[0_0_20px_#d4af37] animate-pulse relative z-10" />
                            </div>
                            <span className="relative z-10 text-xs font-mono text-[#d4af37]/80 tracking-widest mt-24">VERIFIED ON-CHAIN</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
