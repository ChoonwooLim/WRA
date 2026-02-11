'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Bell } from 'lucide-react';

const sampleNotices = [
    { id: 1, title: '세계왕립아카데미 2026년 상반기 교육과정 안내', date: '2026-02-10', category: '교육' },
    { id: 2, title: 'The Royal 33 제2기 멤버 모집 안내', date: '2026-02-05', category: '인증' },
    { id: 3, title: '왕립 투어 프로그램 일정 업데이트', date: '2026-01-28', category: '투어' },
    { id: 4, title: 'K-Royal Warrant 인증 절차 개선 공지', date: '2026-01-20', category: '인증' },
    { id: 5, title: '황태손 전하 인도네시아 문화교류 활동 보고', date: '2026-01-15', category: '활동' },
];

export default function NoticesPage() {
    const { dict } = useLanguage();

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={dict.pages.community.noticesTitle} subtitle={dict.pages.community.heroSubtitle} compact />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-3">
                        {sampleNotices.map((notice, i) => (
                            <GlassCard key={notice.id} delay={i * 0.06} hover className="cursor-pointer">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <Bell className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                                        <div className="min-w-0">
                                            <h3 className="text-white font-medium truncate">{notice.title}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20">{notice.category}</span>
                                                <span className="text-gray-500 text-xs">{notice.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
