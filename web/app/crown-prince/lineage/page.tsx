'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { motion } from 'framer-motion';

const lineageData = [
    { year: '1852', name: '고종 (Gojong)', title: '대한제국 초대 황제', desc: 'Emperor of the Korean Empire' },
    { year: '1877', name: '의친왕 (Uichinwang)', title: '고종의 아들', desc: 'Son of Emperor Gojong' },
    { year: '1919', name: '이건 (Lee Geon)', title: '의친왕의 아들', desc: 'Son of Uichinwang' },
    { year: '1947', name: '이충길 (Lee Chung-gil)', title: '이건의 아들', desc: 'Son of Lee Geon' },
    { year: '현재', name: '이원 (Lee Won)', title: '대한제국 5대 황태손', desc: '5th Crown Prince of the Korean Imperial Family' },
];

export default function LineagePage() {
    const { dict } = useLanguage();

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={dict.pages.crownPrince.lineageTitle} subtitle={dict.pages.crownPrince.lineageDesc} compact />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#d4af37]/40 via-[#d4af37]/20 to-transparent" />

                        {lineageData.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                className={`relative flex items-center mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#d4af37] border-4 border-[#050510] z-10 shadow-lg shadow-[#d4af37]/20" />

                                {/* Content */}
                                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                    <div className="glass-card rounded-xl p-6">
                                        <span className="text-[#d4af37] text-sm font-mono">{item.year}</span>
                                        <h3 className="text-xl font-bold text-white mt-1">{item.name}</h3>
                                        <p className="text-[#d4af37]/80 text-sm mt-1">{item.title}</p>
                                        <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
