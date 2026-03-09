'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { BookOpen, GraduationCap, Compass, Sparkles, Brain, Heart, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    const [sectionOpen, setSectionOpen] = useState<Record<string, boolean>>({
        reason: true,
        expected: false,
        ripple: false,
        curriculum: false,
    });
    const scrollToEl = (el: HTMLElement) => setTimeout(() => {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }, 350);
    const toggleSection = (key: string, el?: HTMLElement) => {
        setSectionOpen(prev => {
            const isClosing = prev[key];
            if (key === 'curriculum' && !isClosing) setCatOpen('cat1');
            return { reason: false, expected: false, ripple: false, curriculum: false, [key]: !isClosing };
        });
        if (el) scrollToEl(el);
    };
    const [catOpen, setCatOpen] = useState<string | null>(null);
    const toggleCat = (key: string, el?: HTMLElement) => {
        setCatOpen(prev => prev === key ? null : key);
        if (el) scrollToEl(el);
    };

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.studiesTitle} subtitle={d.studiesDesc} compact />

            <section className="py-14 relative overflow-hidden bg-gradient-to-b from-[#050510] to-[#0a0f25]">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="container mx-auto px-4 max-w-6xl relative z-10">




                    {/* 한국학을 공부해야 하는 이유 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <button
                            onClick={(e) => toggleSection('reason', e.currentTarget)}
                            className="w-full flex items-center justify-center gap-3 mb-10 group cursor-pointer"
                        >
                            <h3 className="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37]">
                                한국학을 공부해야 하는 이유
                            </h3>
                            <span className={`text-[#d4af37] text-xl transition-transform duration-300 ${sectionOpen.reason ? 'rotate-180' : ''}`}>▾</span>
                        </button>

                        <AnimatePresence initial={false}>
                            {sectionOpen.reason && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="space-y-10 text-gray-300 text-base md:text-lg leading-[2] break-keep">

                                        {/* 한민족은 누구인가 */}
                                        <div className="space-y-4">
                                            <h4 className="text-[#d4af37] text-lg md:text-xl font-semibold flex items-center gap-2">
                                                <span className="w-8 h-px bg-[#d4af37]/50 shrink-0" />
                                                한민족은 누구인가
                                            </h4>
                                            <p>한국인에게 필요한 것은 한국인은 어떤 정신을 가진 사람들인가에 대한 성찰이다. 한국인은 역사를 잃어버렸고 정신을 파괴당했기 때문이다.</p>
                                            <p>우리의 건국이념에 담겨있는 정신을 강제로 잃어버렸다. 우리의 역사를 빼앗겼다. 동북아의 역사는 역사쟁탈의 역사였다. 역사가 중요하게 작동한 이유는 역사에 최고권력자가 가져야 할 권능이 들어있기 때문이다. 패권국가의 왕이 가져야 할 덕목이 들어있기 때문이다.</p>
                                            <p>동북아에서는 왕은 하늘이 내린다는 신성을 중요하게 가졌다. 그것이 바로 천손사상이다. 하늘이 내린 천손만이 왕이 될 수 있었다. 왕이 된 자는 천손의 후손이고 천손 중에 하늘에 지명받아 왕이 되었다는 당위를 가져야 했다. 동북아 역사의 장자인 한민족이 박해를 받고 역사를 쟁탈당한 이유가 여기에 있다.</p>
                                            <p>한국학은 한국인의 근원정신과 기질을 다루는 학문이다. 또한 한국인의 행동양식과 문화를 공부하는 학문이다. 한국인에게 한국학은 &lsquo;나&rsquo;와 &lsquo;한국&rsquo;을 이해하는 출발점이자 귀착지이다. 세상을 재는 척도가 나 자신이고 내 나라이기 때문이다. 나를 알아야 남을 이해할 수 있다. 내 나라를 알아야 다른 나라를 이해할 수 있다.</p>
                                        </div>

                                        {/* 위대한 선각자들이 개국한 정신의 나라 */}
                                        <div className="space-y-4">
                                            <h4 className="text-[#d4af37] text-lg md:text-xl font-semibold flex items-center gap-2">
                                                <span className="w-8 h-px bg-[#d4af37]/50 shrink-0" />
                                                위대한 선각자들이 개국한 정신의 나라
                                            </h4>
                                            <p>개국을 한 사람들은 두 개의 선진문화를 가진 사람들이었다. 하나는 하늘의 운행원리를 체득한 천문문화를 가진 사람들이었고 또 하나는 몸과 마음을 바로 보는 수행문화의 선각자들이었다.</p>
                                            <p>선진문화로 무장한 사람들이 나라를 세워 건국정신으로 내세운 것이 홍익정신이다. 홍익정신의 핵심은 하늘의 법을 사람이 몸과 맘으로 받아들여 몸과 맘이 밝아지는 것을 말한다. 더욱 밝아진 사람이 홍익인간이다. 더욱 밝아진 정신으로 이 땅에 하늘과 같이 완성된 세상을 만들어내는 것이 바로 재세이화이다.</p>
                                            <p>한국학을 공부한다는 것은 우리의 건국이념에 대한 정신을 배우고 나라를 세운 사람들이 가졌던 천문과 수행을 통해 나를 이해하고, 내 나라를 파악할 수 있는 기본도구를 갖게 하는 출발이다. 한국의 역사를 배우고 한국인을 배워야 하는 이유다.</p>
                                        </div>

                                        {/* 한국인의 양 극단 */}
                                        <div className="space-y-4">
                                            <h4 className="text-[#d4af37] text-lg md:text-xl font-semibold flex items-center gap-2">
                                                <span className="w-8 h-px bg-[#d4af37]/50 shrink-0" />
                                                한국인의 양 극단
                                            </h4>
                                            <p>한국인은 양 극단을 가지고 있다. 서두르는 냄비 근성과 느긋한 뚝배기 근성. 기질적으로는 슬픔의 한과 기쁨의 흥을 가지고 있다. 서로 다른 대척점에 있는 정신을 함께 가지고 있는 것이 특별하다. 극단을 이해함으로써 중간지대를 이해하는 것이 한국인이다. 결국 전체를 이해하는 종합력과 통찰력을 가지고 있다. 바로 여기에서 한국인의 문제해결능력과 창조능력이 발휘된다.</p>
                                        </div>

                                        {/* 한류의 전력 */}
                                        <div className="space-y-4">
                                            <h4 className="text-[#d4af37] text-lg md:text-xl font-semibold flex items-center gap-2">
                                                <span className="w-8 h-px bg-[#d4af37]/50 shrink-0" />
                                                한류의 전력
                                            </h4>
                                            <p>한민족은 이미 고대에 한류문화를 탄생시켰던 전력을 가지고 있다. 천문과 수행으로 &lsquo;나&rsquo;와 &lsquo;세상&rsquo;을 이해하고 있었던 선진문화의 주역들이었다. 천문을 통해 천자인사상을 태동시켰고 음양오행이라는 동양정신의 뼈대를 만들어냈다. 거기에 세계 최초의 청동기문화를 출발시켰던 위대한 민족이었다.</p>
                                            <p>디지털(반도체) 분야의 선두나 게임 그리고 K-pop(BTS·데몬 헌터스) 등이 탄생하는 이유다. 그동안 우리 민족에게 아쉬웠던 개인의 자유가 만개하면서 문화를 다시 만들어가고 있다. 한민족의 두 번째 한류이다.</p>
                                        </div>

                                        {/* 결론 */}
                                        <div className="glass-card rounded-xl p-6 md:p-8 !bg-[#d4af37]/10 !border-[#d4af37]/25 text-center mt-4">
                                            <p className="text-white text-lg md:text-xl font-medium leading-[2]">
                                                한국인을 이해하면 한국의 현상이 보이고, 한국인의 행동양식이 보인다.<br />
                                                그리고 세상을 이해하는 첫 열쇠가 한국학에 있다.<br />
                                                <span className="text-[#d4af37] font-semibold">한국학을 배워야 하는 이유다.</span>
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                ♡ 기대효과
            ══════════════════════════════════════════ */}
            <section className="py-16 relative overflow-hidden bg-gradient-to-b from-[#0a0f25] to-[#0a0f25]">
                <div className="absolute inset-0 bg-[url('/images/royal_navy_damask_bg.png')] bg-repeat opacity-[0.03] pointer-events-none" />
                <div className="container mx-auto px-4 max-w-6xl relative z-10">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <p className="text-[#d4af37]/60 text-sm tracking-[0.3em] uppercase mb-3">EXPECTED EFFECTS</p>
                        <button
                            onClick={(e) => toggleSection('expected', e.currentTarget)}
                            className="flex items-center justify-center gap-3 mx-auto group cursor-pointer"
                        >
                            <Heart className="w-6 h-6 text-[#d4af37]" />
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37]">
                                기대효과
                            </h2>
                            <span className={`text-[#d4af37] text-xl transition-transform duration-300 ${sectionOpen.expected ? 'rotate-180' : ''}`}>▾</span>
                        </button>
                    </motion.div>

                    <AnimatePresence initial={false}>
                        {sectionOpen.expected && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="glass-card rounded-xl p-8 !bg-[#d4af37]/5 !border-[#d4af37]/20 hover:!border-[#d4af37]/40 transition-colors">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="w-8 h-8 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] text-sm font-bold">1</span>
                                            <h4 className="text-[#fceda6] text-lg font-bold">한국에 대한 깊은 이해</h4>
                                        </div>
                                        <p className="text-gray-300 text-base leading-[2] break-keep">
                                            주한 외국인들의 한국에 대한 막연한 경험이나 체험으로 한국인의 정신과 한국문화에 대한 깊은 이해와 안목을 가지게 된다.
                                        </p>
                                    </div>
                                    <div className="glass-card rounded-xl p-8 !bg-[#d4af37]/5 !border-[#d4af37]/20 hover:!border-[#d4af37]/40 transition-colors">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="w-8 h-8 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] text-sm font-bold">2</span>
                                            <h4 className="text-[#fceda6] text-lg font-bold">한국문화 전도사 양성</h4>
                                        </div>
                                        <p className="text-gray-300 text-base leading-[2] break-keep">
                                            한국문화가 가진 오랜 역사와 전통을 몸과 마음으로 체험하는 시간으로 한국문화 전도사를 양성하는 효과가 있다.
                                        </p>
                                    </div>
                                    <div className="glass-card rounded-xl p-8 !bg-[#d4af37]/5 !border-[#d4af37]/20 hover:!border-[#d4af37]/40 transition-colors">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="w-8 h-8 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] text-sm font-bold">3</span>
                                            <h4 className="text-[#fceda6] text-lg font-bold">소통과 화해의 장</h4>
                                        </div>
                                        <p className="text-gray-300 text-base leading-[2] break-keep">
                                            한국인에 대한 밀착도가 넓어져 다문화 가정에서는 소통과 화해의 장이 만들어지거나, 외국인의 경우에는 한국인과의 관계가 깊어진다.
                                        </p>
                                    </div>
                                    <div className="glass-card rounded-xl p-8 !bg-[#d4af37]/5 !border-[#d4af37]/20 hover:!border-[#d4af37]/40 transition-colors">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="w-8 h-8 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] text-sm font-bold">4</span>
                                            <h4 className="text-[#fceda6] text-lg font-bold">한국의 정체성</h4>
                                        </div>
                                        <p className="text-gray-300 text-base leading-[2] break-keep">
                                            해외 한국어과 학생들에게 한국학을 통해서 한국의 정체성을 심어줄 수 있다.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Divider */}
            <div className="relative py-4 bg-[#0a0f25]">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
                </div>
                <div className="relative flex justify-center">
                    <div className="bg-[#0a0f25] px-6 text-[#d4af37]">
                        <Heart className="w-8 h-8 opacity-80" />
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════════
                ♡ 파급효과
            ══════════════════════════════════════════ */}
            <section className="py-16 relative overflow-hidden bg-gradient-to-b from-[#0a0f25] to-[#0a0f25]">
                <div className="absolute inset-0 bg-[url('/images/royal_navy_damask_bg.png')] bg-repeat opacity-[0.03] pointer-events-none" />
                <div className="container mx-auto px-4 max-w-6xl relative z-10">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <p className="text-[#d4af37]/60 text-sm tracking-[0.3em] uppercase mb-3">RIPPLE EFFECTS</p>
                        <button
                            onClick={(e) => toggleSection('ripple', e.currentTarget)}
                            className="flex items-center justify-center gap-3 mx-auto group cursor-pointer"
                        >
                            <Zap className="w-6 h-6 text-[#d4af37]" />
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37]">
                                파급효과
                            </h2>
                            <span className={`text-[#d4af37] text-xl transition-transform duration-300 ${sectionOpen.ripple ? 'rotate-180' : ''}`}>▾</span>
                        </button>
                    </motion.div>

                    <AnimatePresence initial={false}>
                        {sectionOpen.ripple && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="glass-card rounded-xl p-8 !bg-[#d4af37]/5 !border-[#d4af37]/20 hover:!border-[#d4af37]/40 transition-colors">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="w-8 h-8 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] text-sm font-bold">1</span>
                                            <h4 className="text-[#fceda6] text-lg font-bold">자긍심 향상</h4>
                                        </div>
                                        <p className="text-gray-300 text-base leading-[2] break-keep">
                                            한국인도 한국인에 대한 이해가 적다. 한국인에 대한 이해도가 넓어지고 자긍심도 커진다.
                                        </p>
                                    </div>
                                    <div className="glass-card rounded-xl p-8 !bg-[#d4af37]/5 !border-[#d4af37]/20 hover:!border-[#d4af37]/40 transition-colors">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="w-8 h-8 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] text-sm font-bold">2</span>
                                            <h4 className="text-[#fceda6] text-lg font-bold">문화적 갈등 해소</h4>
                                        </div>
                                        <p className="text-gray-300 text-base leading-[2] break-keep">
                                            외국인과 다문화가정의 일원인 경우는 한국전통의 이해로 한국에 대한 친한 외국인이 되고, 다문화가정의 경우는 서로 다른 문화적 갈등을 줄이는 계기가 된다.
                                        </p>
                                    </div>
                                    <div className="glass-card rounded-xl p-8 !bg-[#d4af37]/5 !border-[#d4af37]/20 hover:!border-[#d4af37]/40 transition-colors">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="w-8 h-8 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] text-sm font-bold">3</span>
                                            <h4 className="text-[#fceda6] text-lg font-bold">정주효과</h4>
                                        </div>
                                        <p className="text-gray-300 text-base leading-[2] break-keep">
                                            거주하는 마을 주민이 긍지를 가지게 되며 주도적으로 행사를 진행하여 마을에 대한 애정이 생긴다.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
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

            {/* ══════════════════════════════════════════
                한국학 커리큘럼
            ══════════════════════════════════════════ */}
            <section className="py-16 relative overflow-hidden bg-gradient-to-b from-[#0a0f25] to-[#050510]">
                <div className="absolute inset-0 bg-[url('/images/royal_navy_damask_bg.png')] bg-repeat opacity-[0.03] pointer-events-none" />
                <div className="container mx-auto px-4 max-w-6xl relative z-10">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <p className="text-[#d4af37]/60 text-sm tracking-[0.3em] uppercase mb-3">CURRICULUM</p>
                        <button
                            onClick={(e) => toggleSection('curriculum', e.currentTarget)}
                            className="flex items-center justify-center gap-3 mx-auto group cursor-pointer"
                        >
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37]">
                                한국학 커리큘럼
                            </h2>
                            <span className={`text-[#d4af37] text-xl transition-transform duration-300 ${sectionOpen.curriculum ? 'rotate-180' : ''}`}>▾</span>
                        </button>
                    </motion.div>

                    <AnimatePresence initial={false}>
                        {sectionOpen.curriculum && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-12">

                                    {/* ─── 카테고리 1: 한국인과 한국 ─── */}
                                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                        <button onClick={(e) => toggleCat('cat1', e.currentTarget)} className="w-full flex items-center gap-3 mb-6 cursor-pointer group">
                                            <span className="w-2 h-8 bg-gradient-to-b from-[#d4af37] to-[#d4af37]/30 rounded-full" />
                                            <h3 className="text-xl md:text-2xl font-bold text-white">한국인과 한국</h3>
                                            <span className={`text-[#d4af37] text-lg transition-transform duration-300 ml-auto ${catOpen === 'cat1' ? 'rotate-180' : ''}`}>▾</span>
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {catOpen === 'cat1' && (
                                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div className="glass-card rounded-xl p-6 !border-[#d4af37]/15 hover:!border-[#d4af37]/30 transition-colors">
                                                            <h4 className="text-[#fceda6] font-semibold mb-4 text-lg">1. 한국인의 정신과 기질</h4>
                                                            <ul className="text-gray-300 text-sm leading-[2] space-y-0.5 pl-1">
                                                                <li>가. 동이족</li>
                                                                <li>나. 나물문화</li>
                                                                <li>다. 한국말의 특수성: 종성의 뜻글자</li>
                                                                <li>라. 한국어의 변별성</li>
                                                                <li>마. 한국말과 문자공유지역: 타림어, 구자라트한글, 신대문자</li>
                                                                <li>바. 가림토와 훈민정음</li>
                                                                <li>사. 한자의 창조자</li>
                                                            </ul>
                                                        </div>
                                                        <div className="glass-card rounded-xl p-6 !border-[#d4af37]/15 hover:!border-[#d4af37]/30 transition-colors">
                                                            <h4 className="text-[#fceda6] font-semibold mb-4 text-lg">2. 한국인을 여는 열쇠, 극단極端</h4>
                                                            <ul className="text-gray-300 text-sm leading-[2] space-y-0.5 pl-1">
                                                                <li>가. 뚝배기와 냄비</li>
                                                                <li>나. 한恨과 흥興</li>
                                                                <li>다. 대인大人과 선비</li>
                                                                <li>라. 비대칭문화의 탄생</li>
                                                                <li>마. 산해경과 대동여지도</li>
                                                                <li>바. 문제해결능력과 창조능력</li>
                                                            </ul>
                                                        </div>
                                                        <div className="glass-card rounded-xl p-6 !border-[#d4af37]/15 hover:!border-[#d4af37]/30 transition-colors">
                                                            <h4 className="text-[#fceda6] font-semibold mb-4 text-lg">3. 한국인의 탐구정신과 도전정신</h4>
                                                            <ul className="text-gray-300 text-sm leading-[2] space-y-0.5 pl-1">
                                                                <li>가. 장구</li>
                                                                <li>나. 북</li>
                                                                <li>다. 꽹과리</li>
                                                                <li>라. 아쟁</li>
                                                                <li>마. 세계 극지탐험 최대보유</li>
                                                                <li>바. 여행을 가장 많이 하는 민족과 세계에 가장 널리 퍼져 있는 민족</li>
                                                            </ul>
                                                        </div>
                                                        <div className="glass-card rounded-xl p-6 !border-[#d4af37]/15 hover:!border-[#d4af37]/30 transition-colors">
                                                            <h4 className="text-[#fceda6] font-semibold mb-4 text-lg">4. 한국인의 복합적인 기질</h4>
                                                            <ul className="text-gray-300 text-sm leading-[2] space-y-0.5 pl-1">
                                                                <li>가. 정情문화</li>
                                                                <li>나. 씨족전통과 족보</li>
                                                                <li>다. 대충철저大充撤底</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* ─── 카테고리 2: 한국의 문화유산 ─── */}
                                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                        <button onClick={(e) => toggleCat('cat2', e.currentTarget)} className="w-full flex items-center gap-3 mb-6 cursor-pointer group">
                                            <span className="w-2 h-8 bg-gradient-to-b from-[#d4af37] to-[#d4af37]/30 rounded-full" />
                                            <h3 className="text-xl md:text-2xl font-bold text-white">한국의 문화유산</h3>
                                            <span className={`text-[#d4af37] text-lg transition-transform duration-300 ml-auto ${catOpen === 'cat2' ? 'rotate-180' : ''}`}>▾</span>
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {catOpen === 'cat2' && (
                                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div className="glass-card rounded-xl p-6 !border-[#d4af37]/15 hover:!border-[#d4af37]/30 transition-colors">
                                                            <h4 className="text-[#fceda6] font-semibold mb-4 text-lg">5. 한국의 유형문화유산</h4>
                                                            <ul className="text-gray-300 text-sm leading-[2] space-y-0.5 pl-1">
                                                                <li>가. 불국사</li>
                                                                <li>나. 창덕궁</li>
                                                                <li>다. 고인돌</li>
                                                                <li>라. 수원화성 외</li>
                                                            </ul>
                                                        </div>
                                                        <div className="glass-card rounded-xl p-6 !border-[#d4af37]/15 hover:!border-[#d4af37]/30 transition-colors">
                                                            <h4 className="text-[#fceda6] font-semibold mb-4 text-lg">6. 한국의 기록문화유산</h4>
                                                            <ul className="text-gray-300 text-sm leading-[2] space-y-0.5 pl-1">
                                                                <li>가. 한글</li>
                                                                <li>나. 직지심경</li>
                                                                <li>다. 조선의궤</li>
                                                                <li>라. 동의보감 등</li>
                                                            </ul>
                                                        </div>
                                                        <div className="glass-card rounded-xl p-6 !border-[#d4af37]/15 hover:!border-[#d4af37]/30 transition-colors">
                                                            <h4 className="text-[#fceda6] font-semibold mb-4 text-lg">7. 한국의 무형문화유산</h4>
                                                            <ul className="text-gray-300 text-sm leading-[2] space-y-0.5 pl-1">
                                                                <li>가. 매사냥</li>
                                                                <li>나. 김치</li>
                                                                <li>다. 농악</li>
                                                                <li>라. 씨름</li>
                                                                <li>마. 강강술래</li>
                                                                <li>바. 택견</li>
                                                                <li>사. 종묘제례 등</li>
                                                            </ul>
                                                        </div>
                                                        <div className="glass-card rounded-xl p-6 !border-[#d4af37]/15 hover:!border-[#d4af37]/30 transition-colors">
                                                            <h4 className="text-[#fceda6] font-semibold mb-4 text-lg">8. 한국인의 음악과 미술</h4>
                                                            <ul className="text-gray-300 text-sm leading-[2] space-y-0.5 pl-1">
                                                                <li>가. 끝이 없는 노래</li>
                                                                <li>나. 아리랑</li>
                                                                <li>다. 판소리</li>
                                                                <li>라. 인물화와 풍속도</li>
                                                                <li>마. 산사화와 풍속화</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* ─── 카테고리 3: 한국의 문화 ─── */}
                                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                        <button onClick={(e) => toggleCat('cat3', e.currentTarget)} className="w-full flex items-center gap-3 mb-6 cursor-pointer group">
                                            <span className="w-2 h-8 bg-gradient-to-b from-[#d4af37] to-[#d4af37]/30 rounded-full" />
                                            <h3 className="text-xl md:text-2xl font-bold text-white">한국의 문화</h3>
                                            <span className={`text-[#d4af37] text-lg transition-transform duration-300 ml-auto ${catOpen === 'cat3' ? 'rotate-180' : ''}`}>▾</span>
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {catOpen === 'cat3' && (
                                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div className="glass-card rounded-xl p-6 !border-[#d4af37]/15 hover:!border-[#d4af37]/30 transition-colors">
                                                            <h4 className="text-[#fceda6] font-semibold mb-4 text-lg">9. 숙성과 즉흥문화</h4>
                                                            <ul className="text-gray-300 text-sm leading-[2] space-y-0.5 pl-1">
                                                                <li>가. 식탁의 주방화와 즉석불고기</li>
                                                                <li>나. 쌈과 비빔밥</li>
                                                                <li>다. 김치</li>
                                                                <li>라. 젓갈: 식물성과 동물성 젓갈의 나라</li>
                                                            </ul>
                                                        </div>
                                                        <div className="glass-card rounded-xl p-6 !border-[#d4af37]/15 hover:!border-[#d4af37]/30 transition-colors">
                                                            <h4 className="text-[#fceda6] font-semibold mb-4 text-lg">10. 일깔문화</h4>
                                                            <ul className="text-gray-300 text-sm leading-[2] space-y-0.5 pl-1">
                                                                <li>가. 돈내기</li>
                                                                <li>나. 한상</li>
                                                                <li>다. 위임</li>
                                                            </ul>
                                                        </div>
                                                        <div className="glass-card rounded-xl p-6 !border-[#d4af37]/15 hover:!border-[#d4af37]/30 transition-colors">
                                                            <h4 className="text-[#fceda6] font-semibold mb-4 text-lg">11. 한옥의 정신</h4>
                                                            <ul className="text-gray-300 text-sm leading-[2] space-y-0.5 pl-1">
                                                                <li>가. 남방문화와 북방문화</li>
                                                                <li>나. 마당</li>
                                                                <li>다. 중심의 원리</li>
                                                                <li>라. 풍수원리</li>
                                                            </ul>
                                                        </div>
                                                        <div className="glass-card rounded-xl p-6 !border-[#d4af37]/15 hover:!border-[#d4af37]/30 transition-colors">
                                                            <h4 className="text-[#fceda6] font-semibold mb-4 text-lg">12. 인본의 건축물, 한옥</h4>
                                                            <ul className="text-gray-300 text-sm leading-[2] space-y-0.5 pl-1">
                                                                <li>가. 인본정신의 극대화</li>
                                                                <li>나. 대인의 건축물</li>
                                                                <li>다. 과학의 인간화</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* ─── 카테고리 4: 한국인의 현재와 미래 ─── */}
                                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                        <button onClick={(e) => toggleCat('cat4', e.currentTarget)} className="w-full flex items-center gap-3 mb-6 cursor-pointer group">
                                            <span className="w-2 h-8 bg-gradient-to-b from-[#d4af37] to-[#d4af37]/30 rounded-full" />
                                            <h3 className="text-xl md:text-2xl font-bold text-white">한국인의 현재와 미래</h3>
                                            <span className={`text-[#d4af37] text-lg transition-transform duration-300 ml-auto ${catOpen === 'cat4' ? 'rotate-180' : ''}`}>▾</span>
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {catOpen === 'cat4' && (
                                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div className="glass-card rounded-xl p-6 !border-[#d4af37]/15 hover:!border-[#d4af37]/30 transition-colors">
                                                            <h4 className="text-[#fceda6] font-semibold mb-4 text-lg">13. BTS와 케데헌의 음악과 낙천성</h4>
                                                            <ul className="text-gray-300 text-sm leading-[2] space-y-0.5 pl-1">
                                                                <li>가. 한류와 고대전통의 풍류</li>
                                                                <li>나. 사물놀이와 농악</li>
                                                                <li>다. 군무와 군창</li>
                                                                <li>라. 무용총의 춤</li>
                                                                <li>마. 도전정신과 인내심: 한과 흥 그리고 은근과 끈기의 복합적 요소</li>
                                                            </ul>
                                                        </div>
                                                        <div className="glass-card rounded-xl p-6 !border-[#d4af37]/15 hover:!border-[#d4af37]/30 transition-colors">
                                                            <h4 className="text-[#fceda6] font-semibold mb-4 text-lg">14. 한류와 드라마</h4>
                                                            <ul className="text-gray-300 text-sm leading-[2] space-y-0.5 pl-1">
                                                                <li>가. 한국적인 정서의 세계화</li>
                                                                <li>나. 가족 주의</li>
                                                                <li>다. 공동체의식에서 동체화의식 발현</li>
                                                            </ul>
                                                        </div>
                                                        <div className="glass-card rounded-xl p-6 !border-[#d4af37]/15 hover:!border-[#d4af37]/30 transition-colors">
                                                            <h4 className="text-[#fceda6] font-semibold mb-4 text-lg">15. 문화의 탄생과 역사의 한류화</h4>
                                                            <ul className="text-gray-300 text-sm leading-[2] space-y-0.5 pl-1">
                                                                <li>가. 다뉴세문경</li>
                                                                <li>나. 천부경</li>
                                                                <li>다. 피라미드</li>
                                                                <li>라. 금관과 기병문화</li>
                                                            </ul>
                                                        </div>
                                                        <div className="glass-card rounded-xl p-6 !border-[#d4af37]/15 hover:!border-[#d4af37]/30 transition-colors">
                                                            <h4 className="text-[#fceda6] font-semibold mb-4 text-lg">16. 한국문화와 세계문화의 만남</h4>
                                                            <ul className="text-gray-300 text-sm leading-[2] space-y-0.5 pl-1">
                                                                <li>가. 가장 한국적인 것 발굴</li>
                                                                <li>나. 동양과 서양의 만남</li>
                                                                <li>다. 달빛 문화에서 햇빛 문화로</li>
                                                                <li>라. 밖으로의 세계화에서 안으로의 세계</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

        </div>
    );
}
