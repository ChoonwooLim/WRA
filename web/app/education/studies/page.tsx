'use client';

import { useState } from 'react';
import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { ProcessDiagram } from '@/components/shared/ProcessDiagram';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Globe, Crown, Users, Target, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const curriculumThemes = [
    {
        title: "한국인과 한국",
        chapters: [
            { num: 1, title: '한국인의 정신과 기질', items: ['동이족', '나물문화', '한국말의 특수성: 종성의 뜻글자', '한국어의 변별성', '한국말과 문자공유지역:\n타림어, 구자라트한글, 신대문자', '가림토와 훈민정음', '한자의 창조자'] },
            { num: 2, title: '한국인을 여는 열쇠, 극단(極端)', items: ['뚝배기와 냄비', '한(恨)과 흥(興)', '대인(大人)과 선비', '비대칭문화의 탄생', '산해경과 대동여지도', '문제해결능력과 창조능력'] },
            { num: 3, title: '한국인의 탐구정신과 도전정신', items: ['장구', '북', '꽹과리', '아쟁', '세계 극지탐험 최대보유', '여행을 가장 많이 하는 민족과\n세계에 가장 널리 퍼져 있는 민족'] },
            { num: 4, title: '한국인의 복합적인 기질', items: ['정(情)문화', '씨족전통과 족보', '대충철저(大充徹底)'] }
        ]
    },
    {
        title: "한국의 문화유산",
        chapters: [
            { num: 5, title: '한국의 유형문화유산', items: ['불국사', '창덕궁', '고인돌', '수원화성 외'] },
            { num: 6, title: '한국의 기록문화유산', items: ['한글', '직지심경', '조선의궤', '동의보감 등'] },
            { num: 7, title: '한국의 무형문화유산', items: ['매사냥', '김치', '농악', '씨름', '강강술래', '택견', '종묘제례 등'] },
            { num: 8, title: '한국인의 음악과 미술', items: ['끝이 없는 노래', '아리랑', '판소리', '인물화와 풍속도', '산수화와 풍속화'] }
        ]
    },
    {
        title: "한국의 문화",
        chapters: [
            { num: 9, title: '숙성과 즉흥문화', items: ['식탁의 주방화와 즉석불고기', '쌈과 비빔밥', '김치', '젓갈: 식물성과 동물성 젓갈의 나라'] },
            { num: 10, title: '일괄문화', items: ['돈내기', '한상', '위임'] },
            { num: 11, title: '한옥의 정신', items: ['남방문화와 북방문화', '마당', '중심의 원리', '풍수원리'] },
            { num: 12, title: '인본(人本)의 건축물, 한옥', items: ['인본정신의 극대화', '대인(大人)의 건축물', '과학의 인간화'] }
        ]
    },
    {
        title: "한국인의 현재와 미래",
        chapters: [
            { num: 13, title: 'BTS와 케데현의 음악과 낙천성', items: ['한류와 고대전통의 풍류', '사물놀이와 농악', '군무와 군창', '무용총의 춤', '도전정신과 인내심:\n한과 흥 그리고 은근과 끈기의\n복합적 요소'] },
            { num: 14, title: '한류와 드라마', items: ['한국적인 정서의 세계화', '가족 주의', '공동체의식에서 동체화의식 발전'] },
            { num: 15, title: '문화의 탄생과 역사의 한류화', items: ['다뉴세문경', '천부경과 환단고기', '피라미드', '금관과 기병문화'] },
            { num: 16, title: '한국문화와 세계문화의 만남', items: ['가장 한국적인 것 발굴', '동양과 서양의 만남', '달빛 문화에서 햇빛 문화로', '밖으로의 세계화에서 안으로의\n세계화'] }
        ]
    }
];

const kManagementTopics = [
    { icon: <Crown className="w-8 h-8" />, title: 'K-Identity 교육', titleEn: 'Korean Identity Education', desc: '한국인의 정체성과 왕실 문화유산을 통한 리더십 교육. CEO가 반드시 이수해야 하는 핵심 과정.' },
    { icon: <Target className="w-8 h-8" />, title: '한국적 경영철학', titleEn: 'Korean Management Philosophy', desc: '홍익인간 정신을 기반으로 한 한국적 경영 철학과 리더십 모델 교육.' },
    { icon: <Users className="w-8 h-8" />, title: '왕실 에티켓', titleEn: 'Royal Etiquette', desc: '대한제국 황실의 예법과 품격을 현대 비즈니스에 적용하는 프리미엄 에티켓 교육.' },
    { icon: <Globe className="w-8 h-8" />, title: '글로벌 K-리더십', titleEn: 'Global K-Leadership', desc: '세계를 선도하는 K-창의·융합형 리더십과 1인 글로벌 임팩트 스타트업 역량 강화.' },
]; export default function StudiesPage() {
    const { dict } = useLanguage();
    const d = dict.pages.education;
    const [activeTheme, setActiveTheme] = useState(0);

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.studiesTitle} subtitle={d.studiesDesc} />

            {/* K-Management Section — Slides 25-34 */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="K-Management 과정" subtitle="CEO 필수 이수 과정 — 한국적 경영과 리더십" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {kManagementTopics.map((t, i) => (
                            <GlassCard key={i} delay={i * 0.1}>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                                        <div className="text-[#d4af37]">{t.icon}</div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{t.title}</h3>
                                        <p className="text-[#d4af37]/60 text-xs mb-2">{t.titleEn}</p>
                                        <p className="text-gray-400 text-sm leading-relaxed">{t.desc}</p>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Korean Studies Special Topics — Dynamic Tabs */}
            <section className="py-24 bg-gradient-to-b from-[#050510] to-[#0a1128] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/royal_navy_damask_bg.png')] bg-repeat opacity-[0.03] pointer-events-none mix-blend-overlay" />
                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <SectionHeader title="한국학 커리큘럼" subtitle="Korean Studies — 한국의 정신과 문화를 깊이 탐구" />

                    {/* Tab Navigation Buttons */}
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16 mt-8">
                        {curriculumThemes.map((theme, idx) => {
                            const isActive = activeTheme === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActiveTheme(idx)}
                                    className={`relative px-6 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-500 flex items-center gap-2 overflow-hidden group
                                        ${isActive
                                            ? 'text-[#0a0e27] shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105'
                                            : 'text-gray-400 bg-white/5 border border-white/10 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37] z-0" />
                                    )}
                                    <span className="relative z-10">{theme.title}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Content Display Area */}
                    <motion.div
                        key={activeTheme}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="bg-[#050a1f]/80 backdrop-blur-xl border border-[#d4af37]/20 rounded-3xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#fceda6] mb-10 text-center md:text-left border-b border-[#d4af37]/20 pb-4 inline-block">
                            {curriculumThemes[activeTheme].title}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            {curriculumThemes[activeTheme].chapters.map((chapter, cIdx) => (
                                <div key={cIdx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 hover:bg-white/[0.04] transition-colors group">
                                    <div className="flex gap-4 items-start mb-6">
                                        <div className="w-8 h-8 rounded-lg bg-[#d4af37]/20 text-[#d4af37] font-bold flex items-center justify-center shrink-0 border border-[#d4af37]/30 mt-1">
                                            {chapter.num}
                                        </div>
                                        <h4 className="text-xl font-bold text-white leading-tight group-hover:text-[#fceda6] transition-colors">{chapter.title}</h4>
                                    </div>
                                    <ul className="space-y-3 pl-[3.25rem]">
                                        {chapter.items.map((item, iIdx) => (
                                            <li key={iIdx} className="text-gray-300 flex items-start gap-2 break-keep text-[0.95rem] md:text-base">
                                                <span className="text-[#d4af37]/70 font-bold shrink-0">{String.fromCharCode(44032 + iIdx)}.</span> {/* 가, 나, 다... */}
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* UNESCO Heritage Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="유네스코 지정" subtitle="한국의 세계문화유산, 세계기록유산" />

                    <div className="grid grid-cols-1 gap-8 mt-10">
                        {/* 세계문화유산 */}
                        <GlassCard className="!bg-gradient-to-br !from-white/[0.03] !to-white/[0.01] !border-white/10 hover:!border-[#d4af37]/30 transition-colors p-8 md:p-10 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#d4af37] to-[#fceda6] opacity-50 group-hover:opacity-100 transition-opacity" />
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-[#d4af37]">◆</span> 한국의 세계문화유산
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-4 break-keep">
                                한국인의 정신과 기질로 만들어낸 가장 한국적이면서도 가장 세계적인 문화재들이다.
                            </p>
                            <p className="text-gray-300 leading-relaxed break-keep">
                                이러한 문화유산은 우리가 선조로부터 물려받아 앞으로 우리 후손들에게 물려주어야 할 자산으로 다른 어느 것으로도 대체할 수 없는 우리들의 삶과 영감의 원천이다.
                            </p>
                        </GlassCard>

                        {/* 세계기록유산 */}
                        <GlassCard className="!bg-gradient-to-br !from-white/[0.03] !to-white/[0.01] !border-white/10 hover:!border-[#d4af37]/30 transition-colors p-8 md:p-10 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#d4af37] to-[#fceda6] opacity-50 group-hover:opacity-100 transition-opacity" />
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-[#d4af37]">◆</span> 한국의 세계기록유산
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-4 break-keep">
                                세계적으로 뛰어난 사회적, 정신적, 문화적 가치를 지닌 자료이며, 인류의 문화를 계승하는 기록을 담고 있는 정보 또는 그 기록을 전하는 매개물이다.
                            </p>
                            <p className="text-gray-300 leading-relaxed break-keep">
                                한국의 세계기록유산은 우리 민족의 창조적 능력과 독창성 및 진취적인 도전 정신을 그대로 문자화 한 기록문화의 결정체라 할 수 있다.
                            </p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Education Philosophy */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <GlassCard className="p-10 text-center !bg-gradient-to-br !from-[#d4af37]/5 !to-[#d4af37]/0 !border-[#d4af37]/20">
                        <GraduationCap className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-3">교육 철학</h3>
                        <p className="text-gray-300 text-sm leading-relaxed max-w-2xl mx-auto">
                            한국인의 진취적인 도전정신, 독창성, 문제해결능력, 창조능력으로 세계를 선도하는 한국형 인재를 육성합니다.
                            K-창의·융합형 사고와 K-뉴리더십을 통해 문제를 해결하는 능력을 갖춘 글로벌 리더를 배출합니다.
                        </p>
                    </GlassCard>
                </div>
            </section>
        </div>
    );
}
