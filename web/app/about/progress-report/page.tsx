'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { motion } from 'framer-motion';
import { Landmark, Rocket, GraduationCap, Flag, Sparkles } from 'lucide-react';

type Milestone = {
    year: string;
    title: string;
    points: string[];
    icon: React.ReactNode;
};

const milestones: Milestone[] = [
    {
        year: '1990',
        title: '「대중음악의 산업화」 발표',
        points: [
            '문화산업의 경제적 가치 및 산업화 방향 국내 최초 제시',
        ],
        icon: <Rocket className="w-6 h-6" />,
    },
    {
        year: '1995',
        title: '한국형 창업·리더십 연구',
        points: [
            '한국인의 창업가 정신 및 글로벌 리더십 연구·개발',
            '중소기업연구원 공동연구 — 여성의 일자리 창출을 위한 선진국 여성창업 아이템 발굴 및 사업화 방안 연구',
            '해외 뉴 비즈니스의 한국형 모델 개발',
        ],
        icon: <Landmark className="w-6 h-6" />,
    },
    {
        year: '2011. 10',
        title: '한국문화창조 아카데미 1기 개강',
        points: [
            '한국학연구소 주최',
            '한국형 인적자원개발(HRD) 및 인재육성 체계 구축',
        ],
        icon: <GraduationCap className="w-6 h-6" />,
    },
    {
        year: '2015. 11',
        title: '한국문화창조학교 창설 및 개교',
        points: [
            '「사람 안에 문화, 문화 안에 사람」',
            '위대한 한국과 위대한 한국인의 문화 유전자를 품다',
            '한국인의 정체성을 확립하고 한류문화를 보급하는 거점이 되고자 한다',
        ],
        icon: <Flag className="w-6 h-6" />,
    },
    {
        year: 'Vision',
        title: '미래 비전 제시',
        points: [
            '「200년의 익숙한 것들과의 이별」 시대 선언',
            '창작·창직 — 시대를 여는 새로운 창조',
        ],
        icon: <Sparkles className="w-6 h-6" />,
    },
];

export default function ProgressReportPage() {
    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner
                title="한국문화창조학교 및 세계왕립아카데미 추진 경과보고"
                subtitle="Progress Report — Korea Culture Creation School & World Royal Academy"
            />

            <section className="py-20 relative z-10">
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Author card */}
                    <div className="mb-20 rounded-3xl bg-gradient-to-br from-[#1a140a]/90 via-[#0c0903]/90 to-[#050510]/90 border border-[#d4af37]/40 p-8 md:p-12 shadow-[0_10px_50px_rgba(212,175,55,0.15)] backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-[1px] w-8 bg-[#d4af37]" />
                            <h3 className="text-[#d4af37] text-sm uppercase tracking-[0.4em] font-semibold">Founder</h3>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-serif text-[#fceda6] leading-tight mb-3">
                            한국문화창조학교 대표(창설자) · 세계왕립아카데미 창설자
                        </h2>
                        <p className="text-[#d4af37] text-lg md:text-xl">
                            Assembly Foundation 설립준비 위원장 <span className="font-bold ml-2">이 호 종</span>
                        </p>
                    </div>

                    <SectionHeader
                        title="추진 연혁"
                        subtitle="Key Milestones"
                    />

                    <div className="relative mt-16">
                        {/* Vertical line */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#d4af37]/80 via-[#d4af37]/40 to-transparent" />

                        <div className="space-y-12">
                            {milestones.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    transition={{ duration: 0.6, delay: i * 0.08 }}
                                    className={`relative flex flex-col md:flex-row ${
                                        i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    } items-start gap-6 md:gap-12`}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8932a] flex items-center justify-center text-black shadow-[0_0_20px_rgba(212,175,55,0.5)] z-10">
                                        {m.icon}
                                    </div>

                                    <div className="pl-20 md:pl-0 md:w-1/2 md:px-12">
                                        <div className={`rounded-2xl bg-[#0f111a]/90 border border-[#d4af37]/30 p-6 md:p-8 backdrop-blur-md shadow-lg hover:border-[#d4af37]/60 transition-all`}>
                                            <div className="text-[#d4af37] font-bold text-sm tracking-[0.3em] mb-3">
                                                {m.year}
                                            </div>
                                            <h3 className="text-[#fceda6] text-xl md:text-2xl font-serif mb-4 leading-snug">
                                                {m.title}
                                            </h3>
                                            <ul className="space-y-2">
                                                {m.points.map((p, j) => (
                                                    <li key={j} className="text-gray-300 text-sm md:text-base leading-relaxed flex items-start gap-2">
                                                        <span className="text-[#d4af37] mt-1 shrink-0">•</span>
                                                        <span>{p}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
