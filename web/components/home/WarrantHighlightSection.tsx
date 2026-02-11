'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { GraduationCap, Award, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function WarrantHighlightSection() {
    const { dict } = useLanguage();

    const warrants = [
        {
            icon: <GraduationCap className="w-8 h-8" />,
            title: dict.home.warrantHighlights.education.title,
            desc: dict.home.warrantHighlights.education.desc,
            href: '/education/language',
            color: 'from-emerald-500/20 to-teal-600/10',
            borderColor: 'hover:border-emerald-500/30',
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: dict.home.warrantHighlights.certification.title,
            desc: dict.home.warrantHighlights.certification.desc,
            href: '/certification',
            color: 'from-[#d4af37]/20 to-amber-700/10',
            borderColor: 'hover:border-[#d4af37]/30',
        },
        {
            icon: <Briefcase className="w-8 h-8" />,
            title: dict.home.warrantHighlights.consulting.title,
            desc: dict.home.warrantHighlights.consulting.desc,
            href: '/services/consulting',
            color: 'from-violet-500/20 to-purple-600/10',
            borderColor: 'hover:border-violet-500/30',
        },
    ];

    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#080818] to-[#050510]" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#d4af37]">
                        {dict.home.warrantHighlights.title}
                    </h2>
                    <p className="text-gray-400 text-lg">{dict.home.warrantHighlights.subtitle}</p>
                    <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent max-w-md mx-auto" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {warrants.map((w, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                        >
                            <Link
                                href={w.href}
                                className={`group block relative rounded-2xl p-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 ${w.borderColor} transition-all duration-300 h-full`}
                            >
                                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${w.color} mb-6`}>
                                    <div className="text-[#d4af37]">{w.icon}</div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{w.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">{w.desc}</p>
                                <span className="inline-flex items-center gap-1 text-[#d4af37] text-sm font-medium group-hover:gap-2 transition-all">
                                    {dict.home.learnMore} <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
