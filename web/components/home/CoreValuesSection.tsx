'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Landmark, Handshake, Heart, Lightbulb, Shield } from 'lucide-react';

export function CoreValuesSection() {
    const { dict } = useLanguage();

    const values = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: dict.home.coreValues.hongik.title,
            desc: dict.home.coreValues.hongik.desc,
            gradient: 'from-amber-500/20 to-yellow-600/20',
        },
        {
            icon: <Lightbulb className="w-8 h-8" />,
            title: dict.home.coreValues.wisdom.title,
            desc: dict.home.coreValues.wisdom.desc,
            gradient: 'from-blue-500/20 to-cyan-600/20',
        },
        {
            icon: <Handshake className="w-8 h-8" />,
            title: dict.home.coreValues.peace.title,
            desc: dict.home.coreValues.peace.desc,
            gradient: 'from-emerald-500/20 to-teal-600/20',
        },
        {
            icon: <Landmark className="w-8 h-8" />,
            title: dict.home.coreValues.creation.title,
            desc: dict.home.coreValues.creation.desc,
            gradient: 'from-purple-500/20 to-fuchsia-600/20',
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: dict.home.coreValues.heritage.title,
            desc: dict.home.coreValues.heritage.desc,
            gradient: 'from-rose-500/20 to-pink-600/20',
        },
    ];

    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-[#050510]" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#d4af37]">
                        {dict.home.coreValues.title}
                    </h2>
                    <p className="text-gray-400 text-lg">{dict.home.coreValues.subtitle}</p>
                    <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent max-w-md mx-auto" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto justify-center">
                    {values.map((v, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className={`group relative rounded-2xl p-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 hover:border-[#d4af37]/20 transition-all duration-300 text-center ${i >= 3 ? 'lg:col-span-1 lg:col-start-2 lg:[&:last-child]:col-start-3 md:[&:last-child]:col-span-2 lg:[&:last-child]:col-span-1' : ''}`}
                        >
                            <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${v.gradient} mb-6`}>
                                <div className="text-[#d4af37]">{v.icon}</div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
