'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { BookOpen } from 'lucide-react';

export default function TextbooksPage() {
    const { dict } = useLanguage();

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner
                title="WRA 교재"
                subtitle="Textbooks & Materials"
            />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader
                        title="발간 교재"
                        subtitle="Published Textbooks & Learning Materials"
                    />

                    <GlassCard delay={0.1} className="!bg-[#0a0f25]/60 !border-[#d4af37]/15">
                        <div className="text-center py-12">
                            <BookOpen className="w-16 h-16 text-[#d4af37]/40 mx-auto mb-6" />
                            <h3 className="text-xl font-bold text-white mb-3">교재 정보 준비 중</h3>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto break-keep">
                                세계왕립아카데미의 교재 및 발간 서적 정보가 곧 업데이트됩니다.<br />
                                한국어, 한국문화, 한국학 분야의 교재를 확인하실 수 있습니다.
                            </p>
                        </div>
                    </GlassCard>
                </div>
            </section>
        </div>
    );
}
