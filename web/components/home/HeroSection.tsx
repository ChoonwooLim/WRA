'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function HeroSection() {
    const { dict } = useLanguage();

    const scrollToFeatures = () => {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
            {/* Video Background */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay for text readability */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Content Container */}
            <div className="relative z-20 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[#d4af37]/30 backdrop-blur-md mb-8">
                        <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                        <span className="text-[#d4af37] text-sm font-medium tracking-wide uppercase">
                            {dict.home.welcome}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-tight text-white">
                        {dict.home.titleLine1} <br />
                        <span className="text-gradient-gold drop-shadow-2xl">
                            {dict.home.titleLine2}
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                        {dict.home.subtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/admissions"
                            className="group relative px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#b38728] text-black font-bold text-lg rounded-xl overflow-hidden transition-transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {dict.home.startApplication}
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>

                        <Link
                            href="/curriculum"
                            className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-colors"
                        >
                            {dict.home.exploreCurriculum}
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.button
                onClick={scrollToFeatures}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-gray-400 hover:text-[#d4af37] transition-colors cursor-pointer"
            >
                <span className="text-xs uppercase tracking-widest">{dict.home.scrollDown}</span>
                <ArrowDown className="w-6 h-6 animate-bounce" />
            </motion.button>
        </section>
    );
}
