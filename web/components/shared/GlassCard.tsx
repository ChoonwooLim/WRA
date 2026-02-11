'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    hover?: boolean;
}

export function GlassCard({ children, className, delay = 0, hover = true }: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className={cn(
                'relative rounded-2xl p-6 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-md border border-[#d4af37]/10',
                'shadow-lg shadow-black/30',
                hover && 'transition-all duration-300 hover:border-[#d4af37]/30 hover:shadow-xl hover:shadow-[#d4af37]/5 hover:-translate-y-1',
                className
            )}
        >
            {children}
        </motion.div>
    );
}
