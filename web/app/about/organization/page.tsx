'use client';

import { useState } from 'react';
import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Award,
    Briefcase,
    Target,
    Globe,
    Building2,
    GraduationCap,
    ExternalLink,
    Quote,
    CheckCircle2,
    X,
    Shield,
    Landmark
} from 'lucide-react';

const OrgNode = ({
    title,
    subtitle,
    isMain = false,
    variant = 'default',
    className = "",
    subTeams = [],
    showProfile = false
}: {
    title: string;
    subtitle?: string;
    isMain?: boolean;
    variant?: 'chancellor' | 'ceo' | 'main' | 'default';
    className?: string;
    subTeams?: string[];
    showProfile?: boolean;
}) => {
    // Determine effective variant
    const effectiveVariant = variant === 'default' && isMain ? 'main' : variant;

    let boxClasses = 'bg-[#0f111a]/85 border border-[#d4af37]/50 px-6 py-4 rounded-xl shadow-lg';
    let textClasses = 'text-gray-100 text-base md:text-lg hover:text-[#d4af37] transition-colors';
    let subtitleClasses = 'text-gray-400 text-xs mt-1';
    let glowElement = null;

    if (effectiveVariant === 'chancellor') {
        boxClasses = 'bg-gradient-to-br from-[#1a140a]/95 via-[#0c0903]/95 to-[#1a140a]/95 border border-[#fceda6] px-8 py-5 rounded-2xl shadow-[0_4px_30px_rgba(252,237,166,0.2)] outline outline-[3px] outline-[#fceda6] outline-offset-[4px]';
        textClasses = 'text-[#fceda6] tracking-widest text-xl md:text-2xl drop-shadow-[0_2px_8px_rgba(252,237,166,0.6)]';
        subtitleClasses = 'text-[#d4af37] font-serif tracking-widest text-sm md:text-base opacity-90 mt-2';
        glowElement = <div className="absolute inset-0 bg-[#fceda6]/10 blur-2xl rounded-full scale-[1.3] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />;
    } else if (effectiveVariant === 'ceo') {
        boxClasses = 'bg-gradient-to-br from-[#1a140a]/95 via-[#0c0903]/95 to-[#1a140a]/95 border border-[#d4af37] px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.2)] outline outline-[2px] outline-[#d4af37]/70 outline-offset-[3px]';
        textClasses = 'text-[#e6c875] tracking-widest text-lg md:text-xl drop-shadow-[0_2px_4px_rgba(212,175,55,0.5)]';
        subtitleClasses = 'text-[#d4af37] font-serif tracking-widest text-sm md:text-base opacity-90 mt-1';
        glowElement = <div className="absolute inset-0 bg-[#d4af37]/10 blur-xl rounded-full scale-125 animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />;
    } else if (effectiveVariant === 'main') {
        boxClasses = 'bg-gradient-to-br from-[#1a140a]/95 via-[#0c0903]/95 to-[#1a140a]/95 border-2 border-[#d4af37] px-8 py-5 rounded-2xl shadow-[0_4px_30px_rgba(212,175,55,0.2)]';
        textClasses = 'text-[#e6c875] tracking-wide text-xl md:text-2xl drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]';
        subtitleClasses = 'text-[#d4af37] font-serif tracking-widest text-sm md:text-base opacity-90 mt-1';
        glowElement = <div className="absolute inset-0 bg-[#d4af37]/20 blur-xl rounded-full scale-150 animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />;
    }

    return (
        <div className={`relative flex flex-col items-center ${className}`}>
            {glowElement}
            <div className={`
                glass-card z-10 flex flex-col items-center justify-center text-center backdrop-blur-md relative overflow-hidden
                transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(212,175,55,0.4)]
                ${boxClasses}
            `}>
                {/* Shimmer overlay effect */}
                {effectiveVariant !== 'default' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />
                )}

                <h3 className={`font-bold z-10 ${textClasses}`}>
                    {title}
                </h3>
                {subtitle && (
                    <p className={`z-10 ${subtitleClasses}`} style={{ fontFamily: 'var(--font-dancing), cursive' }}>
                        {subtitle}
                    </p>
                )}
                {showProfile && (
                    <span className="inline-block mt-3 px-3 py-1 text-xs tracking-widest uppercase text-[#d4af37] border border-[#d4af37]/50 rounded-full group-hover:bg-[#d4af37]/15 group-hover:border-[#d4af37] transition-all z-10">프로필 →</span>
                )}
            </div>
            {subTeams.length > 0 && (
                <div className="mt-3 flex flex-col gap-1 w-full z-10">
                    {subTeams.map((team, idx) => (
                        <div key={idx} className="bg-[#1a140a]/60 border border-[#d4af37]/30 text-gray-300 text-sm py-1.5 px-3 rounded-md text-center backdrop-blur-sm transition-all duration-300 hover:bg-[#d4af37]/20 hover:text-[#fceda6] hover:border-[#d4af37]/80 hover:shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                            {team}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function OrganizationPage() {
    const { dict, language } = useLanguage();
    const [showCeoModal, setShowCeoModal] = useState(false);
    const [showChancellorModal, setShowChancellorModal] = useState(false);

    return (
        <div className="bg-[#050510] min-h-screen relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-[#d4af37]/15 to-transparent pointer-events-none opacity-60" />
            <div className="absolute inset-0 bg-[url('/images/royal_navy_damask_bg.png')] bg-repeat opacity-5 pointer-events-none mix-blend-overlay" />

            {/* Floating Particles (VFX) */}
            <motion.div
                animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-[#fceda6] blur-[2px]"
            />
            <motion.div
                animate={{ y: [0, 30, 0], opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[40%] right-[15%] w-3 h-3 rounded-full bg-[#d4af37] blur-[3px]"
            />

            <HeroBanner title={dict.pages.about.orgTitle} compact />

            <section className="py-20 relative z-10 w-full">
                <div className="container mx-auto px-4 max-w-6xl relative">


                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center relative mt-8 lg:mt-0"
                    >
                        {/* Level 0: Chancellor */}
                        <div className="relative flex flex-col items-center justify-center w-full z-10">
                            <div onClick={() => setShowChancellorModal(true)} className="cursor-pointer group flex flex-col items-center">
                                <OrgNode title="황태손 이 원 전하" subtitle="KING" variant="chancellor" className="cursor-pointer" showProfile />
                            </div>
                        </div>

                        {/* ── 수직선: 황태손 → 신광철 ── */}
                        <div className="w-[2px] h-12 bg-gradient-to-b from-[#d4af37] to-[#d4af37]/50" />

                        {/* ── 신광철 노드 (중앙) ── */}
                        <div className="bg-[#0f111a]/85 border border-[#d4af37]/50 outline outline-[1.5px] outline-[#d4af37]/25 outline-offset-[3px] text-center px-10 py-5 rounded-xl backdrop-blur-md shadow-[0_4px_20px_rgba(212,175,55,0.15)] transition-all hover:border-[#d4af37]/80 hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] z-10">
                            <p className="text-[#e6c875] font-bold text-base md:text-lg tracking-wide">한국문화창조학교</p>
                            <p className="text-[#d4af37] text-sm mt-1">교장 <span className="font-bold text-lg">신광철</span><span className="text-[#d4af37]/70 text-xs">(작가)</span></p>
                            <Link href="/about/profile/sinkwangchul" className="inline-block mt-3 px-3 py-1 text-xs tracking-widest uppercase text-[#d4af37] border border-[#d4af37]/50 rounded-full hover:bg-[#d4af37]/15 hover:border-[#d4af37] transition-all">
                                프로필 →
                            </Link>
                        </div>

                        {/* ── Junction 행: absolute 포지셔닝으로 겹침 없이 배치 ── */}
                        <div className="hidden md:block relative w-full z-10" style={{ height: '160px' }}>

                            {/* 중앙 수직관통선 — left:50% 기준 */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#d4af37]/60 via-[#d4af37]/70 to-[#d4af37]/60" />

                            {/* 좌측 수평선 — 중앙에서 왼쪽으로 140px */}
                            <div className="absolute top-1/2 -translate-y-1/2 h-[1.5px] bg-gradient-to-l from-[#d4af37]/70 to-[#d4af37]/40"
                                style={{ right: '50%', width: '140px' }} />

                            {/* 우측 수평선 — 중앙에서 오른쪽으로 140px */}
                            <div className="absolute top-1/2 -translate-y-1/2 h-[1.5px] bg-gradient-to-r from-[#d4af37]/70 to-[#d4af37]/40"
                                style={{ left: '50%', width: '140px' }} />

                            {/* 왼쪽 박스: 수평선 끝 바로 왼쪽 */}
                            <div className="absolute top-1/2 -translate-y-1/2 bg-[#0f111a]/85 border border-[#d4af37]/40 px-8 py-6 rounded-xl backdrop-blur-md shadow-lg text-center transition-all hover:border-[#d4af37]/70 hover:bg-[#d4af37]/10"
                                style={{ right: 'calc(50% + 140px)' }}>
                                <p className="text-[#e6c875] font-semibold text-base">한국학 연구소</p>
                                <p className="text-[#e6c875] font-semibold text-base mt-2">AI 브레인 헬스 연구소</p>
                            </div>

                            {/* 오른쪽 박스: 수평선 끝 바로 오른쪽 */}
                            <div className="absolute top-1/2 -translate-y-1/2 bg-[#0f111a]/85 border border-[#d4af37]/40 px-8 py-6 rounded-xl backdrop-blur-md shadow-lg transition-all hover:border-[#d4af37]/70 hover:bg-[#d4af37]/10 text-center"
                                style={{ left: 'calc(50% + 140px)' }}>
                                <p className="text-[#e6c875] font-semibold text-base">브랜드경영 윤리위원회</p>
                                <Link href="/about/progress-report" className="inline-block mt-3 px-3 py-1 text-xs tracking-widest uppercase text-[#d4af37] border border-[#d4af37]/50 rounded-full hover:bg-[#d4af37]/15 hover:border-[#d4af37] transition-all">
                                    경과보고 →
                                </Link>
                            </div>
                        </div>

                        {/* 모바일 레이아웃 */}
                        <div className="md:hidden flex flex-col items-center gap-0 w-full z-10">
                            <div className="self-center w-[1.5px] h-6 bg-[#d4af37]/50" />
                            <div className="bg-[#0f111a]/85 border border-[#d4af37]/40 text-gray-200 px-5 py-4 rounded-xl text-center w-full">
                                <p className="text-[#e6c875] font-semibold">한국학 연구소</p>
                                <p className="text-[#e6c875] font-semibold mt-1">AI 브레인 헬스 연구소</p>
                            </div>
                            <div className="self-center w-[1.5px] h-4 bg-[#d4af37]/40" />
                            <div className="bg-[#0f111a]/85 border border-[#d4af37]/40 text-gray-200 px-5 py-4 rounded-xl w-full text-center">
                                <p className="text-[#e6c875] font-semibold">브랜드경영 윤리위원회</p>
                                <Link href="/about/progress-report" className="inline-block mt-2 px-3 py-1 text-xs tracking-widest uppercase text-[#d4af37] border border-[#d4af37]/50 rounded-full hover:bg-[#d4af37]/15 transition-all">
                                    경과보고 →
                                </Link>
                            </div>
                            <div className="self-center w-[1.5px] h-6 bg-[#d4af37]/50" />
                        </div>

                        {/* Level 1: CEO + 전략기획실 */}
                        <div className="relative flex flex-col items-center w-full z-10">
                            <div onClick={() => setShowCeoModal(true)} className="cursor-pointer group flex flex-col items-center">
                                <OrgNode title="제니 킴" subtitle="CEO" variant="ceo" showProfile />
                            </div>

                            {/* 전략기획실 - absolute positioned to the right */}
                            <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 items-center" style={{ left: 'calc(50% + 90px)' }}>
                                <div className="w-12 h-[1.5px] bg-gradient-to-r from-[#d4af37]/60 to-[#d4af37]/30" />
                                <div className="bg-gradient-to-br from-[#1a140a]/95 via-[#0c0903]/95 to-[#1a140a]/95 border border-[#d4af37]/40 outline outline-[1.5px] outline-[#d4af37]/20 outline-offset-[3px] text-[#d4af37] px-8 py-4 rounded-xl backdrop-blur-md shadow-[0_4px_20px_rgba(212,175,55,0.1)] text-base font-medium z-10 transition-all duration-300 hover:bg-[#d4af37]/10 hover:border-[#d4af37]/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                                    전략기획실
                                </div>
                            </div>
                        </div>

                        {/* Main Branching Lines (CEO -> 2 Pillars) - Desktop */}
                        <div className="relative w-full max-w-5xl hidden md:flex flex-col items-center">
                            {/* Vertical drop from CEO */}
                            <div className="w-[2px] h-12 bg-gradient-to-b from-[#d4af37] to-[#d4af37]/50" />
                            {/* T-junction: horizontal bar + 2 drops */}
                            <div className="relative w-full">
                                {/* Horizontal bar spanning across 2 columns */}
                                <div className="absolute top-0 left-[25%] right-[25%] h-[2px] bg-[#d4af37]/40" />
                                {/* 2 vertical drops */}
                                <div className="absolute top-0 left-[25%] w-[2px] h-10 bg-[#d4af37]/40" />
                                <div className="absolute top-0 right-[25%] w-[2px] h-10 bg-[#d4af37]/40" />
                                {/* Spacer */}
                                <div className="h-10" />
                            </div>
                        </div>

                        {/* Mobile vertical line */}
                        <div className="md:hidden w-[2px] h-10 bg-[#d4af37]/30" />

                        {/* Level 2: The Two Pillars */}
                        <div className="w-full max-w-5xl flex flex-col md:flex-row justify-center gap-8 relative">
                            <div className="w-full md:w-1/2 flex justify-center px-2 mb-4 md:mb-0">
                                <OrgNode
                                    title="국내운영본부"
                                    subtitle="Domestic Operations"
                                    variant="ceo"
                                    className="w-full max-w-[280px]"
                                />
                            </div>
                            {/* Mobile spacer */}
                            <div className="md:hidden w-[2px] h-4 bg-[#d4af37]/30 self-center" />
                            <div className="w-full md:w-1/2 flex justify-center px-2">
                                <OrgNode
                                    title="국제운영본부"
                                    subtitle="International Operations"
                                    variant="ceo"
                                    className="w-full max-w-[280px]"
                                />
                            </div>
                        </div>

                        {/* Lines from 3 Pillars -> Bottom Row (REMOVED) */}
                        {/* The user requested to remove the explicit branching lines 
                            since this is a commonly shared operational group supporting the 3 pillars above. */}

                        {/* Level 3: Bottom Row (Unified Shared Container) */}
                        <div className="w-full max-w-5xl mt-12 md:mt-24 relative p-[1px] rounded-2xl border border-[#d4af37]/20">
                            {/* Inner Glass Container */}
                            <div className="w-full bg-[#0c1024]/80 backdrop-blur-xl rounded-2xl p-8 md:p-10 flex flex-col items-center">
                                {/* Bridging Top Label (Optional, but gives context) */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0c1024] px-6 py-1 border border-[#d4af37]/40 rounded-full text-[#d4af37] text-xs md:text-sm tracking-widest font-medium whitespace-nowrap shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                                    공통 협력 · 지원 본부
                                </div>

                                <div className="w-full flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center relative z-10 w-full pt-2">
                                    {[
                                        "K-로얄 인증센터",
                                        "글로벌 협력단",
                                        "DX 혁신본부",
                                        "미디어 홍보실"
                                    ].map((dept, idx) => (
                                        <div key={idx} className="w-full md:w-1/4 flex justify-center px-3 mb-4 md:mb-0">
                                            <div className="w-full max-w-[220px] bg-[#0c0f17]/90 border border-[#d4af37]/30 outline outline-[2px] outline-[#d4af37]/30 outline-offset-[3px] text-gray-200 text-center py-5 px-3 rounded-xl shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-[#d4af37]/15 hover:border-[#d4af37]/80 hover:outline-[#d4af37]/60 text-sm md:text-base font-medium relative overflow-hidden group">
                                                {/* Subtle highlight effect on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                                                <span className="relative z-10">{dept}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CEO Profile Modal */}
            <AnimatePresence>
                {showCeoModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShowCeoModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-[#0a0e27] via-[#0c1024] to-[#0a0e27] border border-[#d4af37]/30 shadow-[0_0_60px_rgba(212,175,55,0.15)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowCeoModal(false)}
                                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Modal Content */}
                            <div className="p-8 md:p-12">
                                {/* Profile Header */}
                                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
                                    <div className="w-36 h-36 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-br from-[#d4af37] via-[#a78bfa] to-[#00d4ff] flex-shrink-0 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                                        <div className="w-full h-full rounded-full bg-[#0a0e27] overflow-hidden border-4 border-[#050510]">
                                            <img
                                                src="/images/jenny-kim.jpg"
                                                alt="CEO 제니킴"
                                                className="w-full h-full object-cover object-[center_15%]"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2">
                                            제니킴 <span className="text-lg md:text-xl text-gray-400 font-normal ml-2">(최유나)</span>
                                        </h2>
                                        <h3 className="text-lg md:text-xl font-semibold mb-4 inline-block"
                                            style={{
                                                background: 'linear-gradient(135deg, #d4af37 0%, #ffe699 50%, #d4af37 100%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                            }}>
                                            Global Business Consultant & Talent Headhunting Expert
                                        </h3>
                                        <GlassCard className="p-5 relative">
                                            <Quote className="absolute top-3 left-3 w-10 h-10 text-[#d4af37]/10 rotate-180" />
                                            <p className="text-gray-300 text-sm leading-relaxed relative z-10 pl-4">
                                                국민일보·한국일보 주관 브랜드 대상 2관왕에 빛나는, 대한민국 톱티어 글로벌 비즈니스 커뮤니케이션 및 HR 컨설팅 전문가입니다.
                                            </p>
                                        </GlassCard>
                                    </div>
                                </div>

                                {/* Core Competencies */}
                                <div className="mb-12">
                                    <h3 className="text-xl font-bold text-[#d4af37] mb-6 text-center">핵심 역량</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <GlassCard className="p-5 border-t-4 border-t-[#8b5cf6]/50">
                                            <Target className="w-6 h-6 text-[#a78bfa] mb-3" />
                                            <h4 className="text-white font-bold text-sm mb-2">심리·성향 기반 HR 진단 & 헤드헌팅</h4>
                                            <p className="text-gray-400 text-xs leading-relaxed">개별 맞춤 진단을 통해 글로벌 비즈니스에 즉시 투입 가능한 최적의 인재를 스크리닝 및 코칭합니다.</p>
                                        </GlassCard>
                                        <GlassCard className="p-5 border-t-4 border-t-[#00d4ff]/50">
                                            <Globe className="w-6 h-6 text-[#00d4ff] mb-3" />
                                            <h4 className="text-white font-bold text-sm mb-2">기업 맞춤형 목표 달성 컨설팅</h4>
                                            <p className="text-gray-400 text-xs leading-relaxed">각 기업과 개인의 목표에 부합하는 맞춤형 커리큘럼을 설계하여 압도적인 목표 달성률을 기록합니다.</p>
                                        </GlassCard>
                                        <GlassCard className="p-5 border-t-4 border-t-[#d4af37]/50">
                                            <Briefcase className="w-6 h-6 text-[#d4af37] mb-3" />
                                            <h4 className="text-white font-bold text-sm mb-2">B2B 글로벌 특수 목적 프로젝트 총괄</h4>
                                            <p className="text-gray-400 text-xs leading-relaxed">삼성, SK, 현대 등 주요 대기업 임원진 대상 해외 진출 프로젝트를 총괄 리드합니다.</p>
                                        </GlassCard>
                                    </div>
                                </div>

                                {/* Awards */}
                                <div className="mb-12">
                                    <h3 className="text-xl font-bold text-[#d4af37] mb-6 text-center">주요 수상 및 언론 보도</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <a href="https://www.hankookilbo.com/news/article/A2023110815200004552" target="_blank" rel="noopener noreferrer" className="group">
                                            <GlassCard className="p-5 h-full transition-all group-hover:border-[#00d4ff]/30">
                                                <span className="px-2 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] text-xs font-bold">📰 한국일보 (2023.11)</span>
                                                <h4 className="text-white font-bold mt-3 mb-2 text-sm group-hover:text-[#00d4ff] transition-colors">2023 대한민국 대표 브랜드 TOP100 대상</h4>
                                                <span className="text-xs text-[#64ffda] flex items-center gap-1">기사 원문 보기 <ExternalLink className="w-3 h-3" /></span>
                                            </GlassCard>
                                        </a>
                                        <a href="https://www.kmib.co.kr/article/view.asp?arcid=0018262272" target="_blank" rel="noopener noreferrer" className="group">
                                            <GlassCard className="p-5 h-full transition-all group-hover:border-[#d4af37]/30">
                                                <span className="px-2 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-xs font-bold">📰 국민일보 (2023.05)</span>
                                                <h4 className="text-white font-bold mt-3 mb-2 text-sm group-hover:text-[#d4af37] transition-colors">국민선호브랜드대상 교육 부문 대상 수상</h4>
                                                <span className="text-xs text-[#d4af37] flex items-center gap-1">기사 원문 보기 <ExternalLink className="w-3 h-3" /></span>
                                            </GlassCard>
                                        </a>
                                    </div>
                                    <div className="flex flex-wrap gap-3 justify-center mt-6">
                                        <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium flex items-center gap-1">
                                            <Award className="w-3 h-3 text-[#d4af37]" /> 연세대 창업경진대회 대상 (2회 우승)
                                        </span>
                                        <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium flex items-center gap-1">
                                            <Award className="w-3 h-3 text-[#d4af37]" /> 숨고, 마이멘토 누적 고용 600건+
                                        </span>
                                    </div>
                                </div>

                                {/* Career Timeline */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-[#d4af37] mb-6 text-center">이력 및 글로벌 경험</h3>
                                    <div className="space-y-3">
                                        {[
                                            { period: '2021.01 ~ 현재', title: '글로벌 비즈니스 전문 강사 / 컨설턴트', highlight: true },
                                            { period: '2020.01 ~ 현재', title: '제니SA 대표 / 세계왕립아카데미 대표', highlight: true },
                                            { period: '2019.06 ~ 2019.09', title: '알파스터디, 스터디서치 전문 영어강사 (리더)' },
                                            { period: '2016.09', title: '무역회사 G&M 통번역사' },
                                            { period: '2013.12', title: 'E&M 전문 영어학원' },
                                        ].map((item, idx) => (
                                            <div key={idx} className={`flex items-center gap-4 p-3 rounded-lg ${item.highlight ? 'bg-[#d4af37]/5 border border-[#d4af37]/20' : 'bg-white/5 border border-white/5'}`}>
                                                <span className={`text-xs font-mono whitespace-nowrap ${item.highlight ? 'text-[#d4af37]' : 'text-gray-500'}`}>{item.period}</span>
                                                <span className={`text-sm ${item.highlight ? 'text-white font-semibold' : 'text-gray-400'}`}>{item.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Global Insight */}
                                <div className="bg-gradient-to-r from-[#120e26] via-[#1a1442] to-[#120e26] rounded-xl p-6 border border-white/10 text-center mb-8">
                                    <Globe className="w-6 h-6 text-[#00d4ff] mx-auto mb-3" />
                                    <p className="text-gray-300 text-sm">
                                        미국, 중국, 싱가포르 등 다국적 언어권 유학과 실무 경험을 바탕으로
                                        <span className="text-white font-semibold"> 현지 비즈니스 문화에 대한 깊이 있는 통찰력</span>을 제공합니다.
                                    </p>
                                </div>

                                {/* Closing Quote */}
                                <div className="text-center">
                                    <Quote className="w-10 h-10 text-[#d4af37]/20 mx-auto mb-4" />
                                    <p className="text-base md:text-lg font-light text-white leading-relaxed italic mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                                        "영어는 판단의 도구가 아닌 <span className="text-[#d4af37] font-bold">소통의 도구</span>입니다.
                                        여러분과 기업이 해외로 진출하는 <span className="text-[#64ffda] font-bold">완벽한 다리</span>가 되어 드리겠습니다."
                                    </p>
                                    <p className="text-[#d4af37] text-xs font-medium tracking-wider uppercase">
                                        — 2023 대한민국 대표 브랜드 대상 수상 소감 中
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Chancellor Profile Modal */}
            <AnimatePresence>
                {showChancellorModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShowChancellorModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-[#0a0e27] via-[#0c1024] to-[#0a0e27] border border-[#d4af37]/30 shadow-[0_0_60px_rgba(212,175,55,0.15)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowChancellorModal(false)}
                                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Modal Content */}
                            <div className="p-8 md:p-12">
                                {/* Profile Header */}
                                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
                                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-[#d4af37]/30 overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.2)] flex-shrink-0">
                                        <img
                                            src="/images/crown-prince-new.jpg"
                                            alt="황태손 이원 전하"
                                            className="w-full h-full object-cover object-top scale-[1.45] origin-top translate-y-6"
                                        />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2">
                                            황태손 이 원 전하
                                        </h2>
                                        <p className="text-[#d4af37] text-lg mb-1">대한제국왕실 제5대 수장</p>
                                        <p className="text-gray-500 text-sm mb-4">皇太子 李 源 殿下, 1962~</p>
                                        <GlassCard className="p-5 relative !bg-gradient-to-br !from-[#d4af37]/5 !to-transparent">
                                            <p className="text-gray-300 text-sm leading-relaxed">
                                                고종황제의 증손이자 의친왕의 손자로, 2003년 이 구 황태손의 양자로 입적되어 왕실의 법통을 이은 황사손(황위계승 1순위)입니다. 왕실 문화유산을 세계적인 한류 콘텐츠로 만들어가고 있습니다.
                                            </p>
                                        </GlassCard>
                                    </div>
                                </div>

                                {/* Profile Sections */}
                                <div className="mb-12">
                                    <h3 className="text-xl font-bold text-[#d4af37] mb-6 text-center">About His Imperial Highness</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <GlassCard className="p-5">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                                                    <Shield className="w-5 h-5 text-[#d4af37]" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-sm mb-1">신분 및 정통성</h4>
                                                    <p className="text-[#d4af37]/50 text-xs mb-2">Identity & Legitimacy</p>
                                                    <p className="text-gray-400 text-xs leading-relaxed">대한제국왕실 제5대 수장. 고종황제의 증손이자 의친왕의 손자로, 2003년 이 구 황태손의 양자로 입적되어 왕실의 법통을 이은 황사손입니다.</p>
                                                </div>
                                            </div>
                                        </GlassCard>
                                        <GlassCard className="p-5">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                                                    <Landmark className="w-5 h-5 text-[#d4af37]" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-sm mb-1">제향 주관</h4>
                                                    <p className="text-[#d4af37]/50 text-xs mb-2">Royal Rites & Ceremonies</p>
                                                    <p className="text-gray-400 text-xs leading-relaxed">황제기증보유자로서 유네스코 세계유산으로 등재된 종베대제와 사직대제, 환구대제의 초헌관으로 봉직하고 계십니다.</p>
                                                </div>
                                            </div>
                                        </GlassCard>
                                        <GlassCard className="p-5">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                                                    <Globe className="w-5 h-5 text-[#d4af37]" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-sm mb-1">문화재 환수 활동</h4>
                                                    <p className="text-[#d4af37]/50 text-xs mb-2">Cultural Heritage Restoration</p>
                                                    <p className="text-gray-400 text-xs leading-relaxed">해외로 유출된 왕실 문화재 환수에 매진하여, 명성황후의 화조도접선 등 국보급 문화재를 환수하는 성과를 거두었습니다.</p>
                                                </div>
                                            </div>
                                        </GlassCard>
                                        <GlassCard className="p-5">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                                                    <GraduationCap className="w-5 h-5 text-[#d4af37]" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-sm mb-1">대외 교류 및 문화 사업</h4>
                                                    <p className="text-[#d4af37]/50 text-xs mb-2">International Relations & Cultural Projects</p>
                                                    <p className="text-gray-400 text-xs leading-relaxed">인도네시아, 태국 등 해외 왕실과 교류하며, 2025년 세계왕실전통문화엑스포 개최를 추진하고 있습니다.</p>
                                                </div>
                                            </div>
                                        </GlassCard>
                                    </div>
                                </div>

                                {/* Academic Activity Highlight */}
                                <div className="bg-gradient-to-r from-[#120e26] via-[#1a1442] to-[#120e26] rounded-xl p-6 border border-white/10 text-center mb-8">
                                    <GraduationCap className="w-6 h-6 text-[#d4af37] mx-auto mb-3" />
                                    <h4 className="text-white font-bold mb-2">조선 대한 왕실 문화 계승 발전 세계화</h4>
                                    <p className="text-gray-300 text-sm">
                                        미국 컴럼비아대학교 강연 등을 통해 조선 대한 왕실 문화의 계승 발전과 세계화를 위해 노력하고 계시며,
                                        <span className="text-white font-semibold"> 한국의 궁중문화를 세계적인 문화유산으로 알리는 데 헌신</span>하고 계십니다.
                                    </p>
                                </div>

                                {/* Link to Full Page */}
                                <div className="text-center">
                                    <Link
                                        href="/crown-prince"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-sm font-medium hover:bg-[#d4af37]/20 transition-colors"
                                        onClick={() => setShowChancellorModal(false)}
                                    >
                                        황태손 소개 페이지 바로가기 <ExternalLink className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
