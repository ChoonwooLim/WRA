'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { motion } from 'framer-motion';

const orgData = [
    { role: '총재 (Chancellor)', name: 'HRH Crown Prince Lee Won', nameKo: '황태손 이원 전하', level: 0 },
    { role: '이사장/CEO (Chairperson)', name: 'Jenny Kim', nameKo: '김제니', level: 1 },
    { role: '왕립한국어학당', name: 'Royal Korean Language Institute', nameKo: '', level: 2 },
    { role: '왕립문예원', name: 'Royal Arts & Literature Center', nameKo: '', level: 2 },
    { role: '미래인재개발원', name: 'Future Talent Development Center', nameKo: '', level: 2 },
    { role: 'K-Royal 인증센터', name: 'K-Royal Certification Center', nameKo: '', level: 2 },
    { role: 'DX 혁신본부', name: 'DX Innovation HQ', nameKo: '', level: 2 },
    { role: '미디어 홍보실', name: 'Media PR Office', nameKo: '', level: 2 },
];

export default function OrganizationPage() {
    const { dict } = useLanguage();

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={dict.pages.about.orgTitle} subtitle={dict.pages.about.orgDesc} compact />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-6">
                        {orgData.map((org, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                style={{ marginLeft: org.level * 40 }}
                            >
                                <div className={`glass-card rounded-xl p-5 border-l-4 ${org.level === 0 ? 'border-l-[#d4af37]' : org.level === 1 ? 'border-l-[#d4af37]/60' : 'border-l-[#d4af37]/30'}`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className={`font-bold ${org.level < 2 ? 'text-lg text-[#d4af37]' : 'text-base text-white'}`}>{org.role}</h3>
                                            <p className="text-gray-400 text-sm mt-1">{org.name}</p>
                                            {org.nameKo && <p className="text-gray-500 text-xs mt-0.5">{org.nameKo}</p>}
                                        </div>
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
