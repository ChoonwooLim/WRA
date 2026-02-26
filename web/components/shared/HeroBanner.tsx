'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeroBannerProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    className?: string;
    compact?: boolean;
}

export function HeroBanner({ title, subtitle, backgroundImage, className, compact = false }: HeroBannerProps) {
    return (
        <section
            className={cn(
                'relative flex items-center justify-center overflow-hidden',
                compact ? 'min-h-[25vh]' : 'min-h-[30vh]',
                className
            )}
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#0a0a20] to-[#050510]" />
            {backgroundImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
            )}
            {/* Gold glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-24 pb-8">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#d4af37]">
                        {title}
                    </span>
                </motion.h1>
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"

                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>
        </section>
    );
}
