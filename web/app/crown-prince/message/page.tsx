'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { motion } from 'framer-motion';
import { Crown, MessageSquare } from 'lucide-react';

export default function MessagePage() {
    const { dict } = useLanguage();

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={dict.pages.crownPrince.messageTitle} compact />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="glass-card rounded-2xl p-10 md:p-14 text-center"
                    >
                        <Crown className="w-12 h-12 text-[#d4af37] mx-auto mb-8" />
                        <h3 className="text-2xl font-bold text-white mb-6">축사 및 환영사</h3>
                        <p className="text-[#d4af37]/60 text-sm mb-8">Congratulatory & Welcome Address</p>

                        <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent mb-8" />

                        {/* Greeting Message */}
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
                            &ldquo;{dict.home.greeting.message}&rdquo;
                        </p>

                        <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent mb-8" />

                        {/* Placeholder for 축사 */}
                        <div className="glass-card rounded-xl p-8 !border-dashed !border-[#d4af37]/20 !bg-[#d4af37]/5">
                            <MessageSquare className="w-8 h-8 text-[#d4af37]/40 mx-auto mb-4" />
                            <p className="text-gray-500 text-sm italic">
                                축사 내용이 전달되는 대로 이 공간에 게시될 예정입니다.
                            </p>
                            <p className="text-gray-600 text-xs mt-2">
                                The congratulatory address will be posted here once received.
                            </p>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent my-8" />

                        <p className="text-[#d4af37] font-semibold text-lg">{dict.home.greeting.name}</p>
                        <p className="text-gray-500 text-sm mt-1">{dict.pages.crownPrince.title}</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
