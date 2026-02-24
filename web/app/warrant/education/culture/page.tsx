'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { BookOpen, Brain, Users, Target, Lightbulb, Heart, MessageSquare, Compass, Sparkles, Clock, Layers } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/* ── Curriculum Data ── */
const curriculumSteps = [
    {
        icon: BookOpen,
        num: '①',
        title: '독서 (Reading)',
        activity: '《긍정이와 웃음이의 마음공부 여행》 기반',
        details: ['하루 한 이야기, 365+1 사유 질문 활용', '인생 · 자존감 · 관계 · 용기 · 선택에 대한 이야기', '매 회차 핵심 질문 제시'],
    },
    {
        icon: MessageSquare,
        num: '②',
        title: '토론 (Dialogue)',
        activity: '소그룹 대화와 관점 전환',
        details: ['소그룹 대화 & 경청 훈련', '관점 전환 토론', '리더의 질문 훈련'],
    },
    {
        icon: Brain,
        num: '③',
        title: '뇌 과학 적용 (Neuroscience Insight)',
        activity: '이론이 아닌 실생활 적용 중심',
        details: ['감정은 어떻게 형성되는가?', '뇌의 가소성과 습관 형성', '공감 능력과 거울 뉴런', '스트레스와 전전두엽 기능', '긍정 정서가 창의성에 미치는 영향'],
    },
    {
        icon: Target,
        num: '④',
        title: '자기경영 리더십 설계',
        activity: '실천 중심 자기경영',
        details: ['나의 사고패턴 진단', '감정관리 전략 수립', '나만의 리더십 선언문 작성', '30일 실천 로드맵 설계'],
    },
];

const expectedEffects = [
    { icon: Heart, text: '감정 조절 능력 향상' },
    { icon: MessageSquare, text: '조직 내 소통 개선' },
    { icon: Lightbulb, text: '창의적 문제 해결력 강화' },
    { icon: Compass, text: '스트레스 대응 능력 향상' },
    { icon: Sparkles, text: '자기성찰을 통한 내적 성장' },
    { icon: Users, text: '긍정적 조직 분위기 형성' },
];

const programFormats = [
    {
        type: '기본형',
        badge: '4주 과정',
        details: ['주 1회 / 2시간', '강의 40% + 토론 40% + 실습 20%'],
    },
    {
        type: '특강형',
        badge: '4시간',
        details: ['AI시대 인문학 리더십 특강', '뇌 과학 기반 자기경영 워크숍'],
    },
    {
        type: '기업 맞춤형',
        badge: 'Custom',
        details: ['조직문화 진단 연계 가능', '팀 빌딩 프로그램 결합 가능'],
    },
];

export default function LiteraturePage() {
    const { dict } = useLanguage();
    const d = dict.pages.education;
    const [openStep, setOpenStep] = useState<number | null>(null);

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.literatureTitle} subtitle={d.literatureDesc} />

            {/* Introduction Section (Korean Literature) */}
            <section className="py-24 md:py-32 relative overflow-hidden bg-[#050510]">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('/images/royal_navy_damask_bg.png')] bg-repeat opacity-[0.05] pointer-events-none mix-blend-overlay" />
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1e3a8a]/20 blur-[150px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">

                    {/* Icon Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative w-full max-w-[400px] mb-12 flex justify-center bg-transparent drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] group"
                    >
                        <Image
                            src="/images/k_literature_icon_v2.png"
                            alt="한국문학 (K-Literature)"
                            width={400}
                            height={225}
                            className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-105"
                            priority
                        />
                    </motion.div>

                    {/* Glowing Typography */}
                    <div className="text-center flex flex-col items-center max-w-3xl mb-4">
                        <motion.h2
                            initial={{ backgroundPosition: "0% 50%" }}
                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                            transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                            className="text-4xl md:text-[46px] font-serif font-bold tracking-widest mb-4
                                       text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37]
                                       bg-[length:200%_auto] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                        >
                            한국문학
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-[#d4af37]/80 font-light text-lg md:text-xl tracking-widest"
                        >
                            -시대의 옷을 갈아입은 문학-
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        whileInView={{ opacity: 1, scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gray-400 to-transparent mb-12 origin-top"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-white text-2xl md:text-3xl font-light mb-20 md:mb-28 tracking-wide flex items-center justify-center gap-2"
                    >
                        <span>:</span>
                        <span>시대의 옷을 갈아입은 문학</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="mb-20 md:mb-28"
                    >
                        <h3 className="text-2xl md:text-4xl text-white font-serif tracking-widest leading-relaxed px-4 md:px-8">
                            &ldquo;문학, 영상의 옷을 입고 시대를 노래하다.&rdquo;
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                        className="text-gray-300 text-lg md:text-xl md:text-[22px] leading-[2.2] md:leading-[2.4] font-light flex flex-col items-center max-w-4xl mx-auto space-y-1 md:space-y-2"
                    >
                        <div className="flex text-left relative">
                            <span className="absolute -left-6 top-0 text-white font-serif">:</span>
                            <p>종이 위의 활자가 카메라의 렌즈를 만났습니다.</p>
                        </div>
                        <p>우리의 시는 시대를 위로하는 가사가 되었고,</p>
                        <p>우리의 이야기는 세계를 울리는 드라마가 되었습니다.</p>
                        <p>형태는 변해도 본질은 변하지 않습니다.</p>
                        <p>변화하는 시대의 길목에서, 한국 문학의 새로운 가능성을 읽어냅니다.</p>
                    </motion.div>
                </div>
            </section>

            {/* Curriculum Divider */}
            <div className="relative py-12 bg-[#050510]">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
                </div>
                <div className="relative flex justify-center">
                    <div className="bg-[#050510] px-6 text-[#d4af37]">
                        <BookOpen className="w-8 h-8 opacity-80" />
                    </div>
                </div>
            </div>

            {/* Curriculum Section 2: 책 글쓰기 */}
            <section className="py-20 relative bg-[#050510]">
                {/* Visual Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#64ffda]/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37] mb-4">
                            책 글쓰기
                        </h2>
                        <p className="text-gray-300 text-lg md:text-xl font-medium tracking-wide">
                            단행본 만드는 기본 틀 교육
                        </p>
                    </div>

                    {/* Masonry Columns Layout */}
                    <div className="columns-1 md:columns-2 gap-6 space-y-6">
                        {[
                            { num: 1, title: '단어와 문장에 상상력과 감성 길들이기', bullets: ['생활언어에 문학을', '멋지고 짧은 문장 만들어보기'] },
                            { num: 4, title: '문장을 늘이기, 호흡을 길게 하기', bullets: ['글을 늘이는 방법', '묘사와 기술의 차이'] },
                            { num: 2, title: '6가지 글쓰기 방법', bullets: ['눈으로 본 것과 마음으로 본 것을 쓰기', '망원경으로 보기, 현미경으로 보기'] },
                            { num: 5, title: '비유법 활용하기', bullets: ['은유와 직유', '사물화 (형상화)'] },
                            { num: 3, title: '기발함과 엉뚱함으로 문장 만들기', bullets: ['최고의 상상력은 기발함', '최고의 신선함은 엉뚱함'] },
                            { num: 6, title: '문장과 문체 만들기', bullets: ['글쓰기 전에 정해야 할 것', '나만의 문장과 문체 만들기'] },
                            { num: 7, title: '이야기 만들기 (Storytelling)', bullets: ['이야기의 요소', '실제 이야기 만들기'] },
                            { num: 10, title: '철학적 글쓰기', bullets: ['속 것을 끄집어 내기', '안보이는 것을 찾아내기'] },
                            { num: 8, title: '글쓰기 실전', bullets: ['책을 내기 위한 글쓰기', '주제 정하기와 목차 만들기'] },
                            { num: 11, title: '글 감 찾아내기', bullets: ['주제를 선명하게 하기', '이야기에 숨 불어넣기'] },
                            { num: 9, title: '책쓰기의 실전', bullets: ['단행본 완성에 필요한 기법', '전문적 글쓰기 방법'] },
                            { num: 12, title: '다시 기본으로 돌아가기', bullets: ['창조적 문장 만들기', '핵심을 지르는 문장 만들기'] }
                        ].map((item, idx) => (
                            <div key={idx} className="break-inside-avoid shadow-lg relative group">
                                <GlassCard delay={(idx % 6) * 0.1}>
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#d4af37] to-transparent rounded-l-2xl opacity-50 group-hover:opacity-100 transition-opacity" />

                                    <div className="pl-2">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#0a1128] border border-[#d4af37]/30 flex items-center justify-center">
                                                <span className="text-[#fceda6] font-serif font-bold text-lg">{item.num}</span>
                                            </div>
                                            <h3 className="font-bold text-white text-lg md:text-xl leading-tight pt-1 break-keep group-hover:text-[#d4af37] transition-colors">{item.title}</h3>
                                        </div>

                                        <ul className="space-y-2.5 ml-14">
                                            {item.bullets.map((bullet, bIdx) => (
                                                <li key={bIdx} className="flex items-start gap-2.5 text-gray-300">
                                                    <span className="text-[#d4af37] text-sm mt-1 shrink-0">◆</span>
                                                    <span className="leading-relaxed break-keep">{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </GlassCard>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
