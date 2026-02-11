'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    className?: string;
    align?: 'left' | 'center';
    gold?: boolean;
}

export function SectionHeader({ title, subtitle, className, align = 'center', gold = true }: SectionHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn('mb-12', align === 'center' ? 'text-center' : 'text-left', className)}
        >
            <h2 className={cn(
                'text-3xl md:text-4xl font-bold mb-3',
                gold ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#d4af37]' : 'text-white'
            )}>
                {title}
            </h2>
            {subtitle && (
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
            <div className={cn(
                'mt-4 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent',
                align === 'left' && 'max-w-xs'
            )} />
        </motion.div>
    );
}
