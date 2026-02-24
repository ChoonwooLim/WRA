'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { BookOpen, GraduationCap, Compass, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';

/** Parse **bold** markers into golden styled React elements */
function renderHighlighted(text: string): React.ReactNode[] {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <span key={i} className="text-[#d4af37] font-semibold">
                    {part.slice(2, -2)}
                </span>
            );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
    });
}

export default function StudiesPage() {
    const { dict } = useLanguage();
    const d = dict.pages.education;
    const [openStep, setOpenStep] = useState<number | null>(null);
    const [openKStudy, setOpenKStudy] = useState<number | null>(null);

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.studiesTitle} subtitle={d.studiesDesc} />

            {/* Korean Studies Image */}
            <div className="bg-[#050510] flex justify-center pt-14 pb-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative w-full max-w-[400px] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] group"
                >
                    <Image
                        src="/images/k_studies_icon.png"
                        alt="한국학 (Korean Studies)"
                        width={400}
                        height={400}
                        className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-105"
                        priority
                    />
                </motion.div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 2: 한국학을 공부해야 하는 이유 (from doc 1)
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-14 relative overflow-hidden bg-gradient-to-b from-[#050510] to-[#0a0f25]">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="container mx-auto px-4 max-w-5xl relative z-10">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37] mb-4">
                            한국학
                        </h2>
                        <p className="text-gray-400 text-lg">Korean Studies</p>
                    </motion.div>

                    {/* Why Study Korean Studies */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-10"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#0a1128] border border-[#d4af37]/30 flex items-center justify-center">
                                <GraduationCap className="w-5 h-5 text-[#d4af37]" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white">한국학을 공부해야 하는 이유</h3>
                        </div>

                        {/* Accordion Items */}
                        <div className="space-y-3 mb-8">
                            {[
                                {
                                    title: '한민족은 누구인가: 역사와 정신의 성찰',
                                    content: [
                                        '한국인에게 필요한 것은 **한국인은 어떤 정신을 가진 사람들인가**에 대한 성찰입니다. 한국인은 역사를 잃어버렸고 정신을 파괴당했기 때문입니다.',
                                        '우리의 **건국이념**에 담겨 있는 정신을 강제로 잃어버렸습니다. 우리의 역사를 빼앗겼습니다.',
                                        '동북아의 역사는 **역사쟁탈의 역사**였습니다. 역사가 중요하게 작동한 이유는, 역사에 최고 권력자가 가져야 할 **권능**이 들어 있기 때문입니다. 패권국가의 왕이 가져야 할 **덕목**이 들어 있기 때문입니다.',
                                    ],
                                },
                                {
                                    title: '천손사상: 하늘이 내린 왕의 정통성',
                                    content: [
                                        '동북아에서는 왕은 **하늘이 내린다**는 신성을 중요하게 가졌습니다. 그것이 바로 **천손사상**입니다. 하늘이 내린 **천손**만이 왕이 될 수 있었습니다.',
                                        '왕이 된 자는 천손의 후손이고, 천손 중에 하늘에 지명 받아 왕이 되었다는 **당위**를 가져야 했습니다. 동북아 역사의 장자인 **한민족**이 박해를 받고 역사를 쟁탈당한 이유가 여기에 있습니다.',
                                    ],
                                },
                                {
                                    title: '위대한 선각자들이 개국한 정신의 나라',
                                    content: [
                                        '개국을 한 사람들은 **두 개의 선진문화**를 가진 사람들이었습니다. 하나는 하늘의 운행원리를 체득한 **천문문화**를 가진 사람들이었고, 또 하나는 몸과 마음을 바로 보는 **수행문화**의 선각자들이었습니다.',
                                        '선진문화로 무장한 사람들이 나라를 세워 건국정신으로 내세운 것이 **홍익정신**입니다.',
                                        '홍익정신의 핵심은 하늘의 법을 사람이 몸과 맘으로 받아들여 몸과 맘이 밝아지는 것을 말합니다. 더욱 밝아진 사람이 **홍익인간**입니다. 더욱 밝아진 정신으로 이 땅에 하늘과 같이 완성된 세상을 만들어내는 것이 바로 **재세이화**입니다.',
                                    ],
                                },
                                {
                                    title: '한국인의 양 극단: 종합력과 창조능력',
                                    content: [
                                        '한국인은 **양 극단**을 가지고 있습니다. 서두르는 **냄비 근성**과 느긋한 **뚝배기 근성**. 기질적으로는 슬픔의 **한(恨)**과 기쁨의 **흥(興)**을 가지고 있습니다.',
                                        '서로 다른 대척점에 있는 정신을 함께 가지고 있는 것이 특별합니다. 극단을 이해함으로써 중간지대를 이해하는 것이 한국인입니다. 결국 전체를 이해하는 **종합력과 통찰력**을 가지고 있습니다.',
                                        '바로 여기에서 한국인의 **문제해결능력**과 **창조능력**이 발휘됩니다.',
                                    ],
                                },
                                {
                                    title: '한류의 전력: 고대에서 현대까지',
                                    content: [
                                        "한민족은 이미 고대에 **한류문화**를 탄생시켰던 전력을 가지고 있습니다. 천문과 수행으로 **'나'와 '세상'**을 이해하고 있었던 선진문화의 주역들이었습니다.",
                                        '천문을 통해 **천자인사상**을 태동시켰고 **음양오행**이라는 동양정신의 뼈대를 만들어냈습니다. 거기에 세계 최초의 **청동기문화**를 출발시켰던 위대한 민족이었습니다.',
                                        '디지털(반도체) 분야의 선두, 게임, 그리고 **K-pop(BTS)** 등이 탄생하는 이유입니다. 그동안 우리 민족에게 아쉬웠던 개인의 자유가 만개하면서 문화를 다시 만들어가고 있습니다. 한민족의 **두 번째 한류**입니다.',
                                    ],
                                },
                            ].map((item, idx) => {
                                const isOpen = openKStudy === idx;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="glass-card rounded-xl overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setOpenKStudy(isOpen ? null : idx)}
                                            className="w-full flex items-center justify-between p-5 text-left hover:bg-[#d4af37]/5 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-[#d4af37] text-xl font-serif font-bold shrink-0">{idx + 1}.</span>
                                                <span className="text-white font-semibold text-base md:text-lg">{item.title}</span>
                                            </div>
                                            <span className={`text-[#d4af37] text-xl transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}>
                                                ▾
                                            </span>
                                        </button>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="px-5 pb-5 pt-1"
                                            >
                                                <div className="ml-10 space-y-3 text-gray-300 text-base leading-[1.9]">
                                                    {item.content.map((text, ci) => (
                                                        <p key={ci}>{renderHighlighted(text)}</p>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Side-by-side summary cards */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="glass-card rounded-xl p-6 !bg-[#d4af37]/5 !border-[#d4af37]/15">
                                <h5 className="text-[#fceda6] font-semibold mb-3 flex items-center gap-2">
                                    <Compass className="w-4 h-4" />
                                    한국학이란
                                </h5>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {renderHighlighted("한국학은 한국인의 **근원정신과 기질**을 다루는 학문입니다. 한국인의 **행동양식과 문화**를 공부하며, **'나'와 '한국'**을 이해하는 출발점이자 귀착지입니다.")}
                                </p>
                                <p className="text-gray-300 text-sm leading-relaxed mt-2">
                                    {renderHighlighted('**나를 알아야 남을 이해할 수 있습니다.** 내 나라를 알아야 다른 나라를 이해할 수 있습니다.')}
                                </p>
                            </div>
                            <div className="glass-card rounded-xl p-6 !bg-[#d4af37]/5 !border-[#d4af37]/15">
                                <h5 className="text-[#fceda6] font-semibold mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    한국학을 공부한다는 것
                                </h5>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {renderHighlighted('우리의 **건국이념**에 대한 정신을 배우고, 나라를 세운 사람들이 가졌던 **천문과 수행**을 통해 나를 이해하고, 내 나라를 파악할 수 있는 기본 도구를 갖게 하는 출발입니다.')}
                                </p>
                                <p className="text-gray-300 text-sm leading-relaxed mt-2">
                                    {renderHighlighted('한국의 역사를 배우고 **한국인을 배워야 하는 이유**입니다.')}
                                </p>
                            </div>
                        </div>

                        {/* Conclusion */}
                        <div className="glass-card rounded-xl p-6 !bg-[#d4af37]/10 !border-[#d4af37]/25 text-center">
                            <p className="text-white text-base md:text-lg font-medium leading-[1.9]">
                                {renderHighlighted('한국인을 이해하면 한국의 현상이 보이고, 한국인의 **행동양식**이 보입니다. 그리고 세상을 이해하는 첫 열쇠가 **한국학**에 있습니다. **한국학을 배워야 하는 이유**입니다.')}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Divider */}
            <div className="relative py-4 bg-[#0a0f25]">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
                </div>
                <div className="relative flex justify-center">
                    <div className="bg-[#0a0f25] px-6 text-[#d4af37]">
                        <Brain className="w-8 h-8 opacity-80" />
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 3: AI시대, 인문학과 놀자 (from doc 2)
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-14 relative overflow-hidden bg-gradient-to-b from-[#0a0f25] to-[#050510]">
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#64ffda]/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="container mx-auto px-4 max-w-5xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37] mb-4">
                            AI시대, 인문학과 놀자
                        </h2>
                        <p className="text-gray-400 text-lg">In the Age of AI, Let&apos;s Play with the Humanities</p>
                    </motion.div>

                    {/* Poetic Intro (from doc 2) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card rounded-2xl p-6 md:p-10 mb-8 text-center"
                    >
                        <div className="max-w-2xl mx-auto space-y-5 text-gray-300 text-lg md:text-xl leading-[2] font-light italic">
                            <p>나를 찾아가는 길, 우습지요.</p>
                            <p>내가 지금 서 있는 자리에 있는<br />나를 찾아간다는 것이 얼마나 우습나요.</p>
                            <p>지금 이 자리에 내가 실존하고 있는데 말입니다.<br />
                                그렇지만 나 자신인 나를<br />
                                너무 모른다는 것이 현실이기도 합니다.</p>
                            <p className="text-[#d4af37] font-semibold not-italic">영원한 숙제지요.</p>
                        </div>

                        <div className="max-w-2xl mx-auto mt-6 space-y-4 text-gray-300 text-base md:text-lg leading-[1.9]">
                            <p>
                                {renderHighlighted('**세상을 바라보고, 판단하는 존재**가 누구지요. **나 자신**입니다.')}
                            </p>
                            <p>
                                {renderHighlighted('나 자신을 모르면 세상을 판단하는 **척도**가 오류일 수밖에 없습니다.')}
                            </p>
                            <p>
                                {renderHighlighted('나를 발견하고 깨닫는 일입니다. 핵심은 **나를 찾는 것**입니다. 그것이 **인문학**입니다.')}
                            </p>
                        </div>
                    </motion.div>

                    {/* Key Message Cards */}
                    <div className="grid md:grid-cols-2 gap-5 mb-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <GlassCard delay={0}>
                                <div className="p-2">
                                    <h4 className="text-[#d4af37] font-semibold text-lg mb-4 flex items-center gap-2">
                                        <Compass className="w-5 h-5" />
                                        가장 먼 거리
                                    </h4>
                                    <p className="text-gray-300 leading-[1.9]">
                                        {renderHighlighted('세상에서 **가장 먼 거리**는 나에게서 떠나는 두 개의 나를 발견하고 나에게로 다시 돌아오는 거리지요.')}
                                    </p>
                                    <p className="text-gray-400 mt-3 leading-[1.9]">
                                        {renderHighlighted('**깨달음의 거리**입니다. 세상을 다 거치고 인생을 다 살아봐야 나에게로 돌아올 수 있으니 먼 거리지요.')}
                                    </p>
                                    <p className="text-gray-400 mt-3 leading-[1.9]">
                                        {renderHighlighted('발로 걷는 거리에서, 마음으로 걷는 **깨달음까지의 거리**가 **가장 먼 거리**지요.')}
                                    </p>
                                </div>
                            </GlassCard>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <GlassCard delay={0.1}>
                                <div className="p-2">
                                    <h4 className="text-[#d4af37] font-semibold text-lg mb-4 flex items-center gap-2">
                                        <Lightbulb className="w-5 h-5" />
                                        인문학이란
                                    </h4>
                                    <p className="text-gray-300 leading-[1.9]">
                                        {renderHighlighted('발로 걷는 거리에서, 마음으로 걷는 **깨달음까지의 거리**가 있습니다. 핵심은 **나를 찾는 것**입니다.')}
                                    </p>
                                    <p className="text-gray-400 mt-3 leading-[1.9]">
                                        {renderHighlighted('사람을 공부하는 길로 들어가 보시지요. 그것이 **"인문학과 놀자"**입니다.')}
                                    </p>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>

                    {/* Quote */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-center py-6"
                    >
                        <blockquote className="text-2xl md:text-3xl font-serif text-white tracking-wide leading-relaxed">
                            &ldquo;{renderHighlighted('**인문학**은 생각과 노는 **놀이**입니다.')}&rdquo;
                        </blockquote>
                        <p className="text-[#d4af37] mt-4 text-lg font-light">잘 놀아야 길이 보입니다.</p>
                    </motion.div>
                </div>
            </section>

            {/* Divider */}
            <div className="relative py-4 bg-[#050510]">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
                </div>
                <div className="relative flex justify-center">
                    <div className="bg-[#050510] px-6 text-[#d4af37]">
                        <Layers className="w-8 h-8 opacity-80" />
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 4: 인문학 커리큘럼 (from doc 3)
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-14 relative overflow-hidden bg-[#050510]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#1e3a8a]/10 blur-[200px] rounded-full pointer-events-none" />
                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    {/* Program Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-6"
                    >
                        <p className="text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-3">📘 AI시대, 조용한 질문혁명</p>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37] mb-4">
                            뇌과학 + 인문학
                        </h2>
                        <p className="text-white text-xl md:text-2xl font-light mb-2">
                            《긍정이와 웃음이의 마음공부 여행》
                        </p>
                        <p className="text-gray-400 text-base md:text-lg">
                            융합 자기경영 리더십 · Self-Leadership Program
                        </p>
                    </motion.div>

                    {/* Program Overview */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card rounded-2xl p-6 md:p-8 mb-8"
                    >
                        <p className="text-gray-300 text-base md:text-lg leading-[1.9] mb-6">
                            {renderHighlighted("AI 시대, **'어떻게 자기 자신을 경영할 것인가'**가 경쟁력이 됩니다.")}
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {[
                                '인문학적 질문을 통해 사유하고',
                                '뇌과학적 이해를 통해 자신을 통찰하며',
                                '토론과 나눔을 통해 의식을 확장하고',
                                '자기경영 리더십으로 실천하기',
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-[#d4af37]/5 border border-[#d4af37]/10">
                                    <span className="text-[#d4af37] shrink-0">✔</span>
                                    <span className="text-gray-300 text-sm leading-relaxed break-keep">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Program Goals */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Target className="w-6 h-6 text-[#d4af37]" />
                            프로그램 목표
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                'AI시대에 필요한 인문학적 사고력 강화',
                                '뇌 과학 기반 자기이해 및 감정조절 능력 향상',
                                '공감과 소통 중심의 리더십 함양',
                                '개인의 내적 각성을 통한 조직문화 개선',
                                "'긍정'과 '웃음'을 기반으로 한 창의적 사고 확장",
                            ].map((goal, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="glass-card rounded-xl p-5 !border-[#d4af37]/15 hover:!border-[#d4af37]/40 transition-colors"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 shrink-0 rounded-lg bg-gradient-to-br from-[#d4af37]/20 to-[#0a1128] border border-[#d4af37]/30 flex items-center justify-center">
                                            <span className="text-[#fceda6] text-xs font-bold">{i + 1}</span>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">{goal}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 4 Core Steps — Accordion */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Layers className="w-6 h-6 text-[#d4af37]" />
                            핵심 구성 요소
                        </h3>
                        <div className="space-y-3">
                            {curriculumSteps.map((step, idx) => {
                                const Icon = step.icon;
                                const isOpen = openStep === idx;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <button
                                            onClick={() => setOpenStep(isOpen ? null : idx)}
                                            className="w-full glass-card rounded-xl p-5 flex items-center gap-4 text-left hover:!border-[#d4af37]/40 transition-all"
                                        >
                                            <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#0a1128] border border-[#d4af37]/30 flex items-center justify-center">
                                                <Icon className="w-6 h-6 text-[#d4af37]" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[#d4af37] font-bold">{step.num}</span>
                                                    <span className="text-white font-semibold text-lg">{step.title}</span>
                                                </div>
                                                <p className="text-gray-400 text-sm mt-1">{step.activity}</p>
                                            </div>
                                            <span className={`text-[#d4af37] text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                                ▾
                                            </span>
                                        </button>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="px-5 pb-5 pt-2"
                                            >
                                                <ul className="space-y-2 ml-16">
                                                    {step.details.map((detail, dIdx) => (
                                                        <li key={dIdx} className="flex items-start gap-2.5 text-gray-300 text-sm">
                                                            <span className="text-[#d4af37] text-xs mt-1.5 shrink-0">◆</span>
                                                            <span className="leading-relaxed">{detail}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Program Formats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Clock className="w-6 h-6 text-[#d4af37]" />
                            프로그램 운영 방식
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {programFormats.map((fmt, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <GlassCard delay={idx * 0.05}>
                                        <div className="text-center mb-4">
                                            <span className="inline-block px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold tracking-wider">
                                                {fmt.badge}
                                            </span>
                                        </div>
                                        <h4 className="text-white font-bold text-lg text-center mb-4">▶ {fmt.type}</h4>
                                        <ul className="space-y-2">
                                            {fmt.details.map((d, i) => (
                                                <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                                    <span className="text-[#d4af37] mt-0.5 shrink-0">•</span>
                                                    <span className="leading-relaxed">{d}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Differentiation Table (6. 차별성) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Compass className="w-6 h-6 text-[#d4af37]" />
                            차별성
                        </h3>
                        <div className="glass-card rounded-xl overflow-hidden">
                            <table className="w-full text-sm md:text-base">
                                <thead>
                                    <tr className="border-b border-[#d4af37]/20">
                                        <th className="px-6 py-4 text-left text-gray-400 font-semibold">기존 교육</th>
                                        <th className="px-6 py-4 text-left text-[#d4af37] font-semibold">본 프로그램</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['기술 중심', '사고 중심'],
                                        ['성과 중심', '존재 중심'],
                                        ['지식 전달', '사유와 성찰, 각성'],
                                        ['일방 강의', '참여형 토론'],
                                    ].map(([existing, ours], idx) => (
                                        <tr key={idx} className="border-b border-white/5 hover:bg-[#d4af37]/5 transition-colors">
                                            <td className="px-6 py-3 text-gray-400">{existing}</td>
                                            <td className="px-6 py-3 text-gray-200 font-medium">{ours}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Expected Effects */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Sparkles className="w-6 h-6 text-[#d4af37]" />
                            기대 효과
                        </h3>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {expectedEffects.map((effect, idx) => {
                                const Icon = effect.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.06 }}
                                        className="glass-card rounded-xl p-5 flex items-center gap-4 hover:!border-[#d4af37]/40 transition-colors group"
                                    >
                                        <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-center group-hover:from-[#d4af37]/30 transition-colors">
                                            <Icon className="w-5 h-5 text-[#d4af37]" />
                                        </div>
                                        <span className="text-gray-200 font-medium text-sm">{effect.text}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Target Audience */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-8 glass-card rounded-2xl p-6 md:p-8 !bg-[#d4af37]/5 !border-[#d4af37]/15"
                    >
                        <h3 className="text-lg font-bold text-[#d4af37] mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            대상
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {['기업 임원 및 중간관리자', '대학생 및 대학원생', '취업대상자 · 학부모', '공공기관 · 교육기관', '해외인력개발 담당자'].map((target, i) => (
                                <span key={i} className="px-4 py-2 rounded-full bg-[#0a1128]/80 border border-[#d4af37]/20 text-gray-300 text-sm">
                                    {target}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
