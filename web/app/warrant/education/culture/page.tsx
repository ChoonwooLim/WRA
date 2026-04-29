'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { BookOpen, Brain, Users, Target, Lightbulb, Heart, MessageSquare, Compass, Sparkles, Clock, Layers } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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

/* ── Curriculum Data (KO/EN) ── */
const curriculumStepsKo = [
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

const curriculumStepsEn = [
    {
        icon: BookOpen,
        num: '①',
        title: 'Reading',
        activity: 'Based on “The Mind-Study Journey of Geungjeong & Useum”',
        details: ['One story a day with 365+1 reflective questions', 'Stories on life, self-esteem, relationships, courage, and choice', 'A core question presented in every session'],
    },
    {
        icon: MessageSquare,
        num: '②',
        title: 'Dialogue',
        activity: 'Small-group conversation and perspective shift',
        details: ['Small-group dialogue & deep-listening practice', 'Perspective-shifting debate', 'Training the leader’s art of questioning'],
    },
    {
        icon: Brain,
        num: '③',
        title: 'Neuroscience Insight',
        activity: 'Real-world application, not pure theory',
        details: ['How are emotions formed?', 'Brain plasticity and habit formation', 'Empathy and mirror neurons', 'Stress and prefrontal-cortex function', 'How positive emotion fuels creativity'],
    },
    {
        icon: Target,
        num: '④',
        title: 'Self-Leadership Design',
        activity: 'Practice-driven self-management',
        details: ['Diagnosing my thinking patterns', 'Building emotion-management strategies', 'Drafting my personal leadership manifesto', 'Designing a 30-day practice roadmap'],
    },
];

const expectedEffectsKo = [
    { icon: Heart, text: '감정 조절 능력 향상' },
    { icon: MessageSquare, text: '조직 내 소통 개선' },
    { icon: Lightbulb, text: '창의적 문제 해결력 강화' },
    { icon: Compass, text: '스트레스 대응 능력 향상' },
    { icon: Sparkles, text: '자기성찰을 통한 내적 성장' },
    { icon: Users, text: '긍정적 조직 분위기 형성' },
];

const expectedEffectsEn = [
    { icon: Heart, text: 'Stronger emotional regulation' },
    { icon: MessageSquare, text: 'Better communication within the organization' },
    { icon: Lightbulb, text: 'Sharpened creative problem-solving' },
    { icon: Compass, text: 'Improved stress resilience' },
    { icon: Sparkles, text: 'Inner growth through self-reflection' },
    { icon: Users, text: 'A more positive organizational culture' },
];

const programFormatsKo = [
    { type: '기본형', badge: '4주 과정', details: ['주 1회 / 2시간', '강의 40% + 토론 40% + 실습 20%'] },
    { type: '특강형', badge: '4시간', details: ['AI시대 인문학 리더십 특강', '뇌 과학 기반 자기경영 워크숍'] },
    { type: '기업 맞춤형', badge: 'Custom', details: ['조직문화 진단 연계 가능', '팀 빌딩 프로그램 결합 가능'] },
];

const programFormatsEn = [
    { type: 'Standard', badge: '4-Week Course', details: ['Once a week / 2 hours', '40% lecture + 40% discussion + 20% practice'] },
    { type: 'Master Class', badge: '4 Hours', details: ['AI-Era Humanities Leadership keynote', 'Neuroscience-based self-management workshop'] },
    { type: 'Enterprise Custom', badge: 'Custom', details: ['Pairs with organizational-culture diagnostics', 'Combines with team-building programs'] },
];

export default function LiteraturePage() {
    const { dict, language } = useLanguage();
    const d = dict.pages.education;
    const ko = language === 'ko';
    const curriculumSteps = ko ? curriculumStepsKo : curriculumStepsEn;
    const expectedEffects = ko ? expectedEffectsKo : expectedEffectsEn;
    const programFormats = ko ? programFormatsKo : programFormatsEn;
    const [openStep, setOpenStep] = useState<number | null>(null);
    const [sectionOpen, setSectionOpen] = useState<string | null>(null);
    const toggleSection = (key: string, el?: HTMLElement) => {
        setSectionOpen(prev => prev === key ? null : key);
        if (el) setTimeout(() => {
            const y = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }, 350);
    };

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.literatureTitle} subtitle={d.literatureDesc} compact />

            {/* Introduction Section (Korean Literature) */}
            <section className="py-10 md:py-14 relative overflow-hidden bg-[#050510]">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('/images/royal_navy_damask_bg.png')] bg-repeat opacity-[0.05] pointer-events-none mix-blend-overlay" />
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1e3a8a]/20 blur-[150px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">






                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="mb-8 md:mb-10"
                    >
                        <h3 className="text-xl md:text-3xl text-white font-serif tracking-widest leading-relaxed px-4 md:px-8 whitespace-nowrap">
                            {ko
                                ? <>&ldquo;문학, 영상의 옷을 입고 시대를 노래하다.&rdquo;</>
                                : <>&ldquo;Literature, dressed in the garments of the screen, sings the age.&rdquo;</>}
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                        className="text-gray-300 text-lg md:text-xl md:text-[22px] leading-[1.8] md:leading-[2] font-light flex flex-col items-center max-w-4xl mx-auto space-y-0.5"
                    >
                        {ko ? (
                            <>
                                <p>종이 위의 활자가 카메라의 렌즈를 만났습니다.</p>
                                <p>우리의 시는 시대를 위로하는 가사가 되었고,</p>
                                <p>우리의 이야기는 세계를 울리는 드라마가 되었습니다.</p>
                                <p>형태는 변해도 본질은 변하지 않습니다.</p>
                                <p>변화하는 시대의 길목에서, 한국 인문학의 새로운 가능성을 읽어냅니다.</p>
                            </>
                        ) : (
                            <>
                                <p>The letters on paper have met the lens of the camera.</p>
                                <p>Our poems have become lyrics that console the age,</p>
                                <p>and our stories have become dramas that move the world.</p>
                                <p>Form may change; essence does not.</p>
                                <p>At the crossroads of a changing era, we read the new possibilities of Korean humanities.</p>
                            </>
                        )}
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
                        <button
                            onClick={(e) => toggleSection('humanities', e.currentTarget)}
                            className="flex items-center justify-center gap-3 mx-auto cursor-pointer"
                        >
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37]">
                                {ko ? 'AI시대, 인문학과 놀자' : 'In the Age of AI — Play with the Humanities'}
                            </h2>
                            <span className={`text-[#d4af37] text-xl transition-transform duration-300 ${sectionOpen === 'humanities' ? 'rotate-180' : ''}`}>▾</span>
                        </button>


                    </motion.div>

                    <AnimatePresence initial={false}>
                        {sectionOpen === 'humanities' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                {/* Poetic Intro (from doc 2) */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="glass-card rounded-2xl p-6 md:p-10 mb-8 text-center"
                                >
                                    <div className="max-w-2xl mx-auto space-y-5 text-gray-300 text-lg md:text-xl leading-[2] font-light italic">
                                        {ko ? (
                                            <>
                                                <p>나를 찾아가는 길, 우습지요.</p>
                                                <p>내가 지금 서 있는 자리에 있는<br />나를 찾아간다는 것이 얼마나 우습나요.</p>
                                                <p>지금 이 자리에 내가 실존하고 있는데 말입니다.<br />
                                                    그렇지만 나 자신인 나를<br />
                                                    너무 모른다는 것이 현실이기도 합니다.</p>
                                                <p className="text-[#d4af37] font-semibold not-italic">영원한 숙제지요.</p>
                                            </>
                                        ) : (
                                            <>
                                                <p>The journey to find oneself — isn’t it amusing?</p>
                                                <p>How strange it is to set out in search of the very self<br />who already stands right here.</p>
                                                <p>I exist in this very place,<br />
                                                    and yet, in truth,<br />
                                                    I scarcely know the self that is me.</p>
                                                <p className="text-[#d4af37] font-semibold not-italic">An eternal homework.</p>
                                            </>
                                        )}
                                    </div>

                                    <div className="max-w-2xl mx-auto mt-6 space-y-4 text-gray-300 text-base md:text-lg leading-[1.9]">
                                        {ko ? (
                                            <>
                                                <p>{renderHighlighted('**세상을 바라보고, 판단하는 존재**가 누구지요. **나 자신**입니다.')}</p>
                                                <p>{renderHighlighted('나 자신을 모르면 세상을 판단하는 **척도**가 오류일 수밖에 없습니다.')}</p>
                                                <p>{renderHighlighted('나를 발견하고 깨닫는 일입니다. 핵심은 **나를 찾는 것**입니다. 그것이 **인문학**입니다.')}</p>
                                            </>
                                        ) : (
                                            <>
                                                <p>{renderHighlighted('Who is the **being that observes and judges the world**? **It is myself**.')}</p>
                                                <p>{renderHighlighted('If I do not know myself, the **yardstick** by which I judge the world is bound to be flawed.')}</p>
                                                <p>{renderHighlighted('It is the work of discovering and awakening to oneself. The heart of it is **finding the self**. That is **the humanities**.')}</p>
                                            </>
                                        )}
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
                                                    {ko ? '가장 먼 거리' : 'The Longest Distance'}
                                                </h4>
                                                {ko ? (
                                                    <>
                                                        <p className="text-gray-300 leading-[1.9]">
                                                            {renderHighlighted('세상에서 **가장 먼 거리**는 나에게서 떠나는 두 개의 나를 발견하고 나에게로 다시 돌아오는 거리지요.')}
                                                        </p>
                                                        <p className="text-gray-400 mt-3 leading-[1.9]">
                                                            {renderHighlighted('**깨달음의 거리**입니다. 세상을 다 거치고 인생을 다 살아봐야 나에게로 돌아올 수 있으니 먼 거리지요.')}
                                                        </p>
                                                        <p className="text-gray-400 mt-3 leading-[1.9]">
                                                            {renderHighlighted('발로 걷는 거리에서, 마음으로 걷는 **깨달음까지의 거리**가 **가장 먼 거리**지요.')}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-gray-300 leading-[1.9]">
                                                            {renderHighlighted('The **longest distance** in the world is the journey of discovering the two selves that depart from me, and returning home to myself.')}
                                                        </p>
                                                        <p className="text-gray-400 mt-3 leading-[1.9]">
                                                            {renderHighlighted('It is the **distance of awakening**. Only after passing through the world and living a whole life can one return to oneself — that is why it is so far.')}
                                                        </p>
                                                        <p className="text-gray-400 mt-3 leading-[1.9]">
                                                            {renderHighlighted('Beyond the distance walked by foot, the **distance walked by the heart toward awakening** is **the longest distance**.')}
                                                        </p>
                                                    </>
                                                )}
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
                                                    {ko ? '인문학이란' : 'What Is the Humanities?'}
                                                </h4>
                                                {ko ? (
                                                    <>
                                                        <p className="text-gray-300 leading-[1.9]">
                                                            {renderHighlighted('발로 걷는 거리에서, 마음으로 걷는 **깨달음까지의 거리**가 있습니다. 핵심은 **나를 찾는 것**입니다.')}
                                                        </p>
                                                        <p className="text-gray-400 mt-3 leading-[1.9]">
                                                            {renderHighlighted('사람을 공부하는 길로 들어가 보시지요. 그것이 **"인문학과 놀자"**입니다.')}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-gray-300 leading-[1.9]">
                                                            {renderHighlighted('Beyond the distance walked by foot lies the **distance, walked by the heart, toward awakening**. The heart of it is **finding the self**.')}
                                                        </p>
                                                        <p className="text-gray-400 mt-3 leading-[1.9]">
                                                            {renderHighlighted('Step into the path of studying the human being. That is **“Play with the Humanities.”**')}
                                                        </p>
                                                    </>
                                                )}
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
                                        &ldquo;{renderHighlighted(ko ? '**인문학**은 생각과 노는 **놀이**입니다.' : 'The **humanities** is a **play** that plays with thought.')}&rdquo;
                                    </blockquote>
                                    <p className="text-[#d4af37] mt-4 text-lg font-light">{ko ? '잘 놀아야 길이 보입니다.' : 'Only by playing well does the path reveal itself.'}</p>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
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
                        <p className="text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-3">{ko ? '📘 AI시대, 조용한 질문혁명' : '📘 The Quiet Question Revolution in the AI Age'}</p>
                        <button
                            onClick={(e) => toggleSection('brainscience', e.currentTarget)}
                            className="flex items-center justify-center gap-3 mx-auto cursor-pointer"
                        >
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37]">
                                {ko ? '뇌과학 + 인문학' : 'Neuroscience + Humanities'}
                            </h2>
                            <span className={`text-[#d4af37] text-xl transition-transform duration-300 ${sectionOpen === 'brainscience' ? 'rotate-180' : ''}`}>▾</span>
                        </button>
                        <p className="text-white text-xl md:text-2xl font-light mt-3 mb-2">
                            {ko ? '《긍정이와 웃음이의 마음공부 여행》' : '“The Mind-Study Journey of Geungjeong & Useum”'}
                        </p>
                        <p className="text-gray-400 text-base md:text-lg">
                            {ko ? '융합 자기경영 리더십 · Self-Leadership Program' : 'Integrated Self-Management Leadership · Self-Leadership Program'}
                        </p>
                    </motion.div>

                    <AnimatePresence initial={false}>
                        {sectionOpen === 'brainscience' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                {/* Program Overview */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="glass-card rounded-2xl p-6 md:p-8 mb-8"
                                >
                                    <p className="text-gray-300 text-base md:text-lg leading-[1.9] mb-6">
                                        {renderHighlighted(ko
                                            ? "AI 시대, **'어떻게 자기 자신을 경영할 것인가'**가 경쟁력이 됩니다."
                                            : "In the AI age, **‘how to manage oneself’** becomes the true competitive edge.")}
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {(ko ? [
                                            '인문학적 질문을 통해 사유하고',
                                            '뇌과학적 이해를 통해 자신을 통찰하며',
                                            '토론과 나눔을 통해 의식을 확장하고',
                                            '자기경영 리더십으로 실천하기',
                                        ] : [
                                            'Reflect through humanistic questioning',
                                            'Gain self-insight through neuroscience',
                                            'Expand awareness through dialogue and sharing',
                                            'Put it into practice through self-leadership',
                                        ]).map((item, i) => (
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
                                        {ko ? '프로그램 목표' : 'Program Objectives'}
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {(ko ? [
                                            'AI시대에 필요한 인문학적 사고력 강화',
                                            '뇌 과학 기반 자기이해 및 감정조절 능력 향상',
                                            '공감과 소통 중심의 리더십 함양',
                                            '개인의 내적 각성을 통한 조직문화 개선',
                                            "'긍정'과 '웃음'을 기반으로 한 창의적 사고 확장",
                                        ] : [
                                            'Strengthen humanistic thinking for the AI era',
                                            'Build self-understanding and emotional regulation through neuroscience',
                                            'Cultivate leadership rooted in empathy and communication',
                                            'Transform organizational culture through inner awakening',
                                            'Expand creative thinking grounded in “positivity” and “laughter”',
                                        ]).map((goal, i) => (
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
                                        {ko ? '핵심 구성 요소' : 'Core Components'}
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
                                        {ko ? '프로그램 운영 방식' : 'Program Formats'}
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
                                        {ko ? '차별성' : 'What Makes Us Different'}
                                    </h3>
                                    <div className="glass-card rounded-xl overflow-hidden">
                                        <table className="w-full text-sm md:text-base">
                                            <thead>
                                                <tr className="border-b border-[#d4af37]/20">
                                                    <th className="px-6 py-4 text-left text-gray-400 font-semibold">{ko ? '기존 교육' : 'Conventional Education'}</th>
                                                    <th className="px-6 py-4 text-left text-[#d4af37] font-semibold">{ko ? '본 프로그램' : 'Our Program'}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(ko ? [
                                                    ['기술 중심', '사고 중심'],
                                                    ['성과 중심', '존재 중심'],
                                                    ['지식 전달', '사유와 성찰, 각성'],
                                                    ['일방 강의', '참여형 토론'],
                                                ] : [
                                                    ['Skill-centered', 'Thinking-centered'],
                                                    ['Performance-centered', 'Being-centered'],
                                                    ['Knowledge transfer', 'Reflection, contemplation, awakening'],
                                                    ['One-way lecture', 'Participatory dialogue'],
                                                ]).map(([existing, ours], idx) => (
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
                                        {ko ? '기대 효과' : 'Expected Outcomes'}
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
                                        {ko ? '대상' : 'Audience'}
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {(ko
                                            ? ['기업 임원 및 중간관리자', '대학생 및 대학원생', '취업대상자 · 학부모', '공공기관 · 교육기관', '해외인력개발 담당자']
                                            : ['Executives & mid-level managers', 'Undergraduate & graduate students', 'Job seekers · parents', 'Public institutions · education institutions', 'Overseas talent-development leads']
                                        ).map((target, i) => (
                                            <span key={i} className="px-4 py-2 rounded-full bg-[#0a1128]/80 border border-[#d4af37]/20 text-gray-300 text-sm">
                                                {target}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Curriculum Section 2: 책 글쓰기 */}
            <section className="py-20 relative bg-[#050510]">
                {/* Visual Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#64ffda]/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="mb-16 text-center">
                        <button
                            onClick={(e) => toggleSection('writing', e.currentTarget)}
                            className="flex items-center justify-center gap-3 mx-auto cursor-pointer"
                        >
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37]">
                                {ko ? '책 글쓰기' : 'Book Writing'}
                            </h2>
                            <span className={`text-[#d4af37] text-xl transition-transform duration-300 ${sectionOpen === 'writing' ? 'rotate-180' : ''}`}>▾</span>
                        </button>
                        <p className="text-gray-300 text-lg md:text-xl font-medium tracking-wide mt-3">
                            {ko ? '단행본 만드는 기본 틀 교육' : 'A foundational framework for crafting your own book'}
                        </p>
                    </div>

                    <AnimatePresence initial={false}>
                        {sectionOpen === 'writing' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                {/* Grid Layout */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(ko ? [
                                        { num: 1, title: '단어와 문장에 상상력과 감성 길들이기', bullets: ['생활언어에 문학을', '멋지고 짧은 문장 만들어보기'] },
                                        { num: 2, title: '6가지 글쓰기 방법', bullets: ['눈으로 본 것과 마음으로 본 것을 쓰기', '망원경으로 보기, 현미경으로 보기'] },
                                        { num: 3, title: '기발함과 엉뚱함으로 문장 만들기', bullets: ['최고의 상상력은 기발함', '최고의 신선함은 엉뚱함'] },
                                        { num: 4, title: '문장을 늘이기, 호흡을 길게 하기', bullets: ['글을 늘이는 방법', '묘사와 기술의 차이'] },
                                        { num: 5, title: '비유법 활용하기', bullets: ['은유와 직유', '사물화 (형상화)'] },
                                        { num: 6, title: '문장과 문체 만들기', bullets: ['글쓰기 전에 정해야 할 것', '나만의 문장과 문체 만들기'] },
                                        { num: 7, title: '이야기 만들기 (Storytelling)', bullets: ['이야기의 요소', '실제 이야기 만들기'] },
                                        { num: 8, title: '글쓰기 실전', bullets: ['책을 내기 위한 글쓰기', '주제 정하기와 목차 만들기'] },
                                        { num: 9, title: '책쓰기의 실전', bullets: ['단행본 완성에 필요한 기법', '전문적 글쓰기 방법'] },
                                        { num: 10, title: '철학적 글쓰기', bullets: ['속 것을 끄집어 내기', '안보이는 것을 찾아내기'] },
                                        { num: 11, title: '글 감 찾아내기', bullets: ['주제를 선명하게 하기', '이야기에 숨 불어넣기'] },
                                        { num: 12, title: '다시 기본으로 돌아가기', bullets: ['창조적 문장 만들기', '핵심을 지르는 문장 만들기'] }
                                    ] : [
                                        { num: 1, title: 'Cultivating imagination and feeling in words and sentences', bullets: ['Bringing literature into everyday language', 'Crafting short, beautiful sentences'] },
                                        { num: 2, title: 'Six ways of writing', bullets: ['Writing what the eye sees and what the heart sees', 'Seeing through a telescope, seeing through a microscope'] },
                                        { num: 3, title: 'Sentences born of wit and whimsy', bullets: ['The peak of imagination is wit', 'The peak of freshness is whimsy'] },
                                        { num: 4, title: 'Stretching sentences, lengthening the breath', bullets: ['Methods for extending prose', 'The difference between description and exposition'] },
                                        { num: 5, title: 'Using figurative language', bullets: ['Metaphor and simile', 'Reification (imagery)'] },
                                        { num: 6, title: 'Building sentence and style', bullets: ['What to decide before you write', 'Crafting your own voice and style'] },
                                        { num: 7, title: 'Storytelling', bullets: ['Elements of a story', 'Building a real story'] },
                                        { num: 8, title: 'Writing in practice', bullets: ['Writing aimed at publishing', 'Choosing a theme and outlining the table of contents'] },
                                        { num: 9, title: 'Book-making in practice', bullets: ['Techniques required to finish a manuscript', 'Professional writing methods'] },
                                        { num: 10, title: 'Philosophical writing', bullets: ['Drawing out what is within', 'Uncovering what is unseen'] },
                                        { num: 11, title: 'Finding the seed of a piece', bullets: ['Sharpening the theme', 'Breathing life into the story'] },
                                        { num: 12, title: 'Returning to the basics', bullets: ['Crafting creative sentences', 'Sentences that strike the heart of the matter'] }
                                    ]).map((item, idx) => (
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
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}
