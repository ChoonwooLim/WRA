'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Crown, MapPin, BookOpen, Landmark, Globe, GraduationCap, Shield } from 'lucide-react';
import Link from 'next/link';

export default function CrownPrincePage() {
    const { dict } = useLanguage();
    const d = dict.pages.crownPrince;

    const subPages = [
        { icon: <Crown className="w-6 h-6" />, title: d.lineageTitle, desc: d.lineageDesc, href: '/crown-prince/lineage' },
        { icon: <MapPin className="w-6 h-6" />, title: d.activitiesTitle, desc: d.activitiesDesc, href: '/crown-prince/activities' },
        { icon: <BookOpen className="w-6 h-6" />, title: d.messageTitle, desc: d.heroSubtitle, href: '/crown-prince/message' },
    ];

    const profileSections = [
        {
            icon: <Shield className="w-6 h-6" />,
            title: '신분 및 정통성',
            titleEn: 'Identity & Legitimacy',
            desc: '대한제국황실 제5대 수장. 고종황제의 증손이자 의친왕의 손자로, 2003년 이 구 황태손의 양자로 입적되어 황실의 법통을 이은 황사손(황위계승 1순위)입니다.',
        },
        {
            icon: <Landmark className="w-6 h-6" />,
            title: '제향 주관',
            titleEn: 'Royal Rites & Ceremonies',
            desc: '황제기증보유자로서 유네스코 세계유산으로 등재된 종묘대제와 사직대제, 그리고 환구대제의 초헌관(국왕의 역할)으로 봉직하고 계십니다.',
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: '문화재 환수 활동',
            titleEn: 'Cultural Heritage Restoration',
            desc: '일제강점기 등 해외로 유출된 왕실 문화재 환수에 매진하여, 명성황후의 화조도접선(서울역사박물관 기증), 황실 노리개 등 국보급 문화재를 환수하는 성과를 거두었습니다.',
        },
        {
            icon: <GraduationCap className="w-6 h-6" />,
            title: '대외 교류 및 문화 사업',
            titleEn: 'International Relations & Cultural Projects',
            desc: '인도네시아, 태국 등 해외 왕실과 교류하며, 2025년 세계왕실전통문화엑스포 개최를 추진하고 있습니다. 사단법인 대한황실문화원 총재로서 2014년 \'궁중문화축전\'을 기획하여 왕실 문화유산을 신한류 콘텐츠로 발전시켰습니다.',
        },
    ];

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.heroTitle} subtitle={d.heroSubtitle} />

            {/* Profile Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-shrink-0">
                            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 border-2 border-[#d4af37]/20 flex items-center justify-center">
                                <Crown className="w-24 h-24 text-[#d4af37]/60" />
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-bold text-white mb-2">{d.fullName}</h2>
                            <p className="text-[#d4af37] text-lg mb-2">{d.title}</p>
                            <p className="text-gray-500 text-sm mb-4">皇太子 李 源 殿下, 1962~</p>
                            <p className="text-gray-400 leading-relaxed text-lg">{d.introduction}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Profile Sections */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="About His Imperial Highness" subtitle="황태손 이원 전하에 대하여" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {profileSections.map((section, i) => (
                            <GlassCard key={i} delay={i * 0.1}>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                                        <div className="text-[#d4af37]">{section.icon}</div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{section.title}</h3>
                                        <p className="text-[#d4af37]/60 text-xs mb-3">{section.titleEn}</p>
                                        <p className="text-gray-400 text-sm leading-relaxed">{section.desc}</p>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Academic Activities */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <GlassCard className="p-10 text-center !bg-gradient-to-br !from-[#d4af37]/5 !to-[#d4af37]/0 !border-[#d4af37]/20">
                        <GraduationCap className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-3">조선 대한 황실 문화 계승 발전 세계화</h3>
                        <p className="text-[#d4af37]/60 text-sm mb-3">Globalization of Korean Imperial Cultural Heritage</p>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto">
                            미국 컬럼비아대학교 강연 등을 통해 조선 대한 황실 문화의 계승 발전과 세계화를 위해
                            노력하고 계시며, 한국의 궁중문화를 세계적인 문화유산으로 알리는 데 헌신하고 계십니다.
                        </p>
                    </GlassCard>
                </div>
            </section>

            {/* Sub-pages */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {subPages.map((item, i) => (
                            <Link key={i} href={item.href}>
                                <GlassCard delay={i * 0.1} className="text-center h-full cursor-pointer">
                                    <div className="text-[#d4af37] mb-4 flex justify-center">{item.icon}</div>
                                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-400 text-sm">{item.desc}</p>
                                </GlassCard>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
