'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { motion } from 'framer-motion';
import Image from 'next/image';

const OrgNode = ({
    title,
    subtitle,
    isMain = false, // Backwards compatibility
    variant = 'default',
    className = "",
    subTeams = []
}: {
    title: string;
    subtitle?: string;
    isMain?: boolean;
    variant?: 'chancellor' | 'ceo' | 'main' | 'default';
    className?: string;
    subTeams?: string[];
}) => {
    // Determine effective variant
    const effectiveVariant = variant === 'default' && isMain ? 'main' : variant;

    let boxClasses = 'bg-[#0f111a]/85 border border-[#d4af37]/50 px-6 py-4 rounded-xl shadow-lg';
    let textClasses = 'text-gray-100 text-base md:text-lg hover:text-[#d4af37] transition-colors';
    let subtitleClasses = 'text-gray-400 text-xs mt-1';
    let glowElement = null;

    if (effectiveVariant === 'chancellor') {
        boxClasses = 'bg-gradient-to-br from-[#1a140a]/95 via-[#0c0903]/95 to-[#1a140a]/95 border-[2px] border-[#fceda6] px-8 py-5 rounded-2xl shadow-[0_4px_30px_rgba(252,237,166,0.2)] ring-1 ring-[#d4af37]/50 ring-offset-4 ring-offset-[#0c1024]';
        textClasses = 'text-[#fceda6] tracking-widest text-xl md:text-2xl drop-shadow-[0_2px_8px_rgba(252,237,166,0.6)]';
        subtitleClasses = 'text-[#d4af37] font-serif tracking-widest text-sm md:text-base opacity-90 mt-2';
        glowElement = <div className="absolute inset-0 bg-[#fceda6]/10 blur-2xl rounded-full scale-[1.3] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />;
    } else if (effectiveVariant === 'ceo') {
        boxClasses = 'bg-gradient-to-br from-[#1a140a]/95 via-[#0c0903]/95 to-[#1a140a]/95 border border-[#d4af37] px-8 py-4 rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.2)]';
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
                    <p className={`z-10 ${subtitleClasses}`}>
                        {subtitle}
                    </p>
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
    const { dict } = useLanguage();

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

            <HeroBanner title={dict.pages.about.orgTitle} subtitle={dict.pages.about.orgDesc} compact />

            <section className="py-20 relative z-10 w-full">
                <div className="container mx-auto px-4 max-w-6xl relative">

                    {/* 3D Floating Logo VFX & Text */}
                    {/* Aligned horizontally with Level 1 (CEO) and vertically with Level 2 Left Pillar (왕립한국어학당) */}
                    <div className="absolute top-[136px] left-[16.666%] transform -translate-x-1/2 ml-10 -translate-y-1/2 hidden md:flex flex-col items-center z-20">
                        <div className="relative">
                            <motion.div
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="relative w-32 h-32 md:w-36 md:h-36 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] z-10"
                            >
                                <Image
                                    src="/wra_logo-1.png"
                                    alt="WRA 3D Logo"
                                    fill
                                    className="object-contain"
                                />
                            </motion.div>
                            <motion.div
                                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#d4af37] blur-xl rounded-full z-0"
                            />
                        </div>

                        {/* WRA Typography Signature */}
                        <div className="mt-6 z-10 flex flex-col w-max">
                            <h2 className="font-serif text-lg md:text-xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#e6c875] via-[#fff] to-[#e6c875] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase">
                                WORLD ROYAL ACADEMY
                            </h2>
                            <h3 className="mt-1 w-full flex justify-between text-[#d4af37] text-lg md:text-[22px] font-bold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
                                {"세계왕립아카데미".split('').map((char, i) => (
                                    <span key={i}>{char}</span>
                                ))}
                            </h3>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center relative mt-8 lg:mt-0"
                    >
                        {/* Level 0: Chancellor */}
                        <div className="relative flex justify-center w-full z-10">
                            <OrgNode title="황태손 이 원 전하" subtitle="Chancellor" variant="chancellor" />
                        </div>

                        {/* Vertical line 0 -> 1 and Side Branch */}
                        <div className="relative w-full flex flex-col items-center z-0">
                            {/* Main vertical line */}
                            <div className="w-[2px] h-16 md:h-20 bg-gradient-to-b from-[#d4af37] to-[#d4af37]/50 relative flex items-center">
                                {/* Side Branch from the middle of the vertical line */}
                                <div className="hidden md:flex absolute top-1/2 left-[1px] transform -translate-y-1/2 items-center">
                                    <div className="h-[2px] w-[60px] lg:w-[120px] bg-[#d4af37]/70" />
                                    <div className="bg-[#d4af37]/20 border border-[#d4af37]/60 text-[#d4af37] px-4 py-2 rounded-md backdrop-blur-sm whitespace-nowrap text-sm font-medium shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                                        대한왕실문화원
                                    </div>
                                </div>
                                {/* Mobile version of side branch */}
                                <div className="md:hidden absolute top-1/2 left-[1px] transform -translate-y-1/2 flex items-center">
                                    <div className="h-[2px] w-[30px] bg-[#d4af37]/70" />
                                    <div className="bg-[#d4af37]/20 border border-[#d4af37]/60 text-[#d4af37] px-2 py-1 rounded-md text-xs backdrop-blur-sm whitespace-nowrap">
                                        대한왕실문화원
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Level 1: CEO */}
                        <div className="relative flex flex-col items-center w-full z-10">
                            <OrgNode title="제니 킴" subtitle="President & CEO" variant="ceo" />

                            {/* Attached Sub-team: 전략기획실 */}
                            <div className="mt-3 bg-[#1a140a]/80 border border-[#d4af37]/40 text-[#d4af37] px-6 py-2 rounded-md backdrop-blur-md shadow-lg text-sm font-medium z-10 transition-colors hover:bg-[#d4af37]/20">
                                전략기획실
                            </div>
                        </div>

                        {/* Main Branching Lines (CEO -> 3 Pillars) */}
                        <div className="relative w-full max-w-5xl h-[60px] md:h-[90px] mb-8 hidden md:block">
                            {/* Vertical drop from CEO */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-1/2 bg-[#d4af37]/50" />
                            {/* Horizontal span */}
                            <div className="absolute top-1/2 left-[16.666%] right-[16.666%] h-[2px] bg-[#d4af37]/50" />
                            {/* Left drop */}
                            <div className="absolute top-1/2 left-[16.666%] w-[2px] h-1/2 bg-[#d4af37]/50" />
                            {/* Right drop */}
                            <div className="absolute top-1/2 right-[16.666%] w-[2px] h-1/2 bg-[#d4af37]/50" />
                            {/* Center drop (continuation) */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[2px] h-1/2 bg-[#d4af37]/50" />
                        </div>

                        {/* Mobile continuous vertical line */}
                        <div className="md:hidden w-[2px] h-[60px] bg-[#d4af37]/50 -mt-8 mb-4" />

                        {/* Level 2: The Three Pillars */}
                        <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between relative">
                            {/* Mobile connection lines for grid items 2 and 3 */}
                            <div className="md:hidden absolute top-[30%] left-1/2 -translate-x-1/2 w-[2px] h-[60px] bg-[#d4af37]/50 -mt-[40px]" />
                            <div className="md:hidden absolute top-[65%] left-1/2 -translate-x-1/2 w-[2px] h-[60px] bg-[#d4af37]/50 -mt-[40px]" />

                            <div className="w-full md:w-1/3 flex justify-center px-2 mb-8 md:mb-0">
                                <OrgNode
                                    title="왕립한국어학당"
                                    subTeams={["교수설계팀", "글로벌강사팀"]}
                                    variant="ceo"
                                    className="w-full max-w-[280px]"
                                />
                            </div>
                            <div className="w-full md:w-1/3 flex justify-center px-2 mb-8 md:mb-0">
                                <OrgNode
                                    title="왕립문예원"
                                    subTeams={["창작교육팀", "콘텐츠창작팀"]}
                                    variant="ceo"
                                    className="w-full max-w-[280px]"
                                />
                            </div>
                            <div className="w-full md:w-1/3 flex justify-center px-2">
                                <OrgNode
                                    title="미래인재개발원"
                                    subTeams={["인문학교육팀", "토론/논술팀"]}
                                    variant="ceo"
                                    className="w-full max-w-[280px]"
                                />
                            </div>
                        </div>

                        {/* Lines from 3 Pillars -> Bottom Row (REMOVED) */}
                        {/* The user requested to remove the explicit branching lines 
                            since this is a commonly shared operational group supporting the 3 pillars above. */}

                        {/* Level 3: Bottom Row (Unified Shared Container) */}
                        <div className="w-full max-w-5xl mt-12 md:mt-24 relative p-[1px] rounded-2xl bg-gradient-to-b from-[#d4af37]/30 via-transparent to-transparent">
                            {/* Inner Glass Container */}
                            <div className="w-full bg-[#1a140a]/60 backdrop-blur-xl rounded-2xl p-8 md:p-10 flex flex-col items-center">
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
                                            <div className="w-full max-w-[220px] bg-[#0c0f17]/90 border border-[#d4af37]/30 text-gray-200 text-center py-5 px-3 rounded-xl shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-[#d4af37]/15 hover:border-[#d4af37]/80 text-sm md:text-base font-medium relative overflow-hidden group">
                                                {/* Subtle highlight effect on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                                {dept}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
