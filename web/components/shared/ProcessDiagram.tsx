'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProcessStep {
    label: string;
    description?: string;
    icon?: React.ReactNode;
}

interface ProcessDiagramProps {
    steps: ProcessStep[];
    className?: string;
}

export function ProcessDiagram({ steps, className }: ProcessDiagramProps) {
    return (
        <div className={cn('py-8', className)}>
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {/* Connecting line (desktop) */}
                <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37]/40 to-[#d4af37]/20" />

                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        className="relative flex-1 flex flex-col items-center text-center"
                    >
                        {/* Step circle */}
                        <div className="relative z-10 w-12 h-12 rounded-full bg-[#0a0a20] border-2 border-[#d4af37]/40 flex items-center justify-center mb-3 group-hover:border-[#d4af37]">
                            {step.icon || (
                                <span className="text-[#d4af37] font-bold text-sm">{index + 1}</span>
                            )}
                        </div>
                        <h4 className="text-sm font-semibold text-[#d4af37] mb-1">{step.label}</h4>
                        {step.description && (
                            <p className="text-xs text-gray-500 max-w-[140px]">{step.description}</p>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
