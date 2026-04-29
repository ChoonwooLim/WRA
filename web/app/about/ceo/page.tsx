'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import {
    Award,
    Briefcase,
    Target,
    Globe,
    Building2,
    GraduationCap,
    ExternalLink,
    Quote,
    CheckCircle2
} from 'lucide-react';

export default function CeoProfilePage() {
    const { language } = useLanguage();
    const ko = language === 'ko';

    const pageTitle = ko ? '대표이사 프로필' : 'CEO Profile';
    const pageSubtitle = ko ? '세계왕립아카데미 대표' : 'CEO, World Royal Academy';

    return (
        <div className="bg-[#050510] min-h-screen pb-20">
            <HeroBanner title={pageTitle} subtitle={pageSubtitle} />

            {/* Profile Header & Main Intro */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#64ffda]/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
                </div>

                <div className="relative z-10 container mx-auto px-4 max-w-5xl">
                    <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
                        {/* Profile Image Area */}
                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-1.5 bg-gradient-to-br from-[#d4af37] via-[#a78bfa] to-[#00d4ff] flex-shrink-0 relative group shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                            <div className="w-full h-full rounded-full bg-[#0a0e27] overflow-hidden relative border-4 border-[#050510]">
                                <img
                                    src="/images/jenny-kim.jpg"
                                    alt="CEO 제니킴"
                                    className="w-full h-full object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                            </div>
                        </div>

                        {/* Text Intro */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
                                {ko ? '제니킴' : 'Jenny Kim'} <span className="text-xl md:text-2xl text-gray-400 font-normal ml-2">{ko ? '(최유나)' : '(Choi Yu-na)'}</span>
                            </h1>
                            <h2 className="text-xl md:text-2xl font-semibold text-[#d4af37] mb-6 inline-block"
                                style={{
                                    background: 'linear-gradient(135deg, #d4af37 0%, #ffe699 50%, #d4af37 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}>
                                Global Business Consultant & Talent Headhunting Expert
                            </h2>
                            <GlassCard className="p-6 md:p-8 relative">
                                <Quote className="absolute top-4 left-4 w-12 h-12 text-[#d4af37]/10 rotate-180" />
                                <p className="text-gray-300 text-base md:text-lg leading-relaxed relative z-10 pl-6">
                                    {ko
                                        ? '국민일보·한국일보 주관 브랜드 대상 2관왕에 빛나는, 대한민국 톱티어 글로벌 비즈니스 커뮤니케이션 및 HR 컨설팅 전문가입니다. 성공적인 스타트업 창업(연세대학교 스타트업 경진대회 대상)과 다수의 대기업 신규 사업 계약 체결 실적을 바탕으로, 기업의 해외 진출 및 글로벌 법인 설립에 필요한 맞춤형 인재 발굴(Headhunting)과 조직 역량 세팅에 특화된 솔루션을 제공합니다.'
                                        : 'A two-time Brand Grand Prize winner (Kookmin Ilbo & Hankook Ilbo) and a top-tier Korean expert in global business communication and HR consulting. Building on a successful startup (Yonsei University Startup Competition Grand Prize) and a track record of new-business contracts with major Korean conglomerates, she delivers tailored headhunting and organizational capability solutions for global expansion and overseas entity establishment.'}
                                </p>
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Competencies */}
            <section className="py-16 relative">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="핵심 역량" subtitle="Core Competencies" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <GlassCard className="p-8 border-t-4 border-t-[#8b5cf6]/50 hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-[#8b5cf6]/10 flex items-center justify-center mb-6">
                                <Target className="w-7 h-7 text-[#a78bfa]" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{ko ? '심리·성향 기반 HR 진단 & 헤드헌팅' : 'Psychology-Based HR Diagnostics & Headhunting'}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {ko
                                    ? '영문학과 아동가족학 전공을 기반으로 한 심층적 인간 성향 분석 전문성 보유. 개별 맞춤 진단을 통해 글로벌 비즈니스에 즉시 투입 가능한 최적의 인재를 스크리닝 및 코칭합니다.'
                                    : 'Deep expertise in human disposition analysis grounded in English Literature and Child & Family Studies. Through individualized diagnostics, she screens and coaches top talent ready for immediate deployment in global business.'}
                            </p>
                        </GlassCard>

                        <GlassCard className="p-8 border-t-4 border-t-[#00d4ff]/50 hover:-translate-y-2 transition-transform duration-300" delay={0.1}>
                            <div className="w-14 h-14 rounded-2xl bg-[#00d4ff]/10 flex items-center justify-center mb-6">
                                <Globe className="w-7 h-7 text-[#00d4ff]" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{ko ? '기업 맞춤형 목표 달성 컨설팅' : 'Customized Goal-Achievement Consulting for Enterprises'}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {ko
                                    ? '"영어는 평가의 잣대가 아닌 소통과 확장의 다리"라는 교육 철학 아래, 각 기업과 개인의 목표에 완벽히 부합하는 맞춤형 커리큘럼을 설계하여 압도적인 목표 달성률을 기록합니다.'
                                    : 'Guided by the teaching philosophy that "English is a bridge of communication and expansion, not a yardstick of evaluation," she designs custom curricula precisely matched to each enterprise and individual’s goals — delivering outstanding achievement rates.'}
                            </p>
                        </GlassCard>

                        <GlassCard className="p-8 border-t-4 border-t-[#d4af37]/50 hover:-translate-y-2 transition-transform duration-300" delay={0.2}>
                            <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center mb-6">
                                <Briefcase className="w-7 h-7 text-[#d4af37]" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{ko ? 'B2B 글로벌 특수 목적 프로젝트 총괄' : 'Lead — B2B Global Special-Purpose Projects'}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {ko
                                    ? '삼성, SK, 현대 등 주요 대기업 임원진 및 실무진 대상 해외 진출반, 유럽 법인 설립팀 등 특수 목적 커뮤니케이션 역량 강화 프로젝트를 총괄 리드합니다.'
                                    : 'Leads special-purpose communication capability programs for executives and operators at major Korean conglomerates including Samsung, SK, and Hyundai — overseas-expansion cohorts, European entity establishment teams, and more.'}
                            </p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Corporate Clients & Partners */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="주요 B2B 컨설팅 및 파트너십" subtitle="Corporate Clients & Partners" />
                    <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                        {ko
                            ? '국내외 핵심 기업의 임원진 맞춤형 코칭부터 대중을 위한 대학 출강까지 폭넓은 실적과 영향력을 행사하고 있습니다.'
                            : 'From tailored coaching for executives at leading domestic and international firms to public-facing university lectures, she exerts broad reach and influence.'}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Clients List */}
                        <div className="space-y-4">
                            <GlassCard className="p-5 flex items-start gap-4">
                                <div className="mt-1"><Building2 className="w-5 h-5 text-[#64ffda]" /></div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">IT & Tech</h4>
                                    <p className="text-gray-400 text-sm">{ko ? '삼성전자, SK하이닉스, INFINIQ, LG전자 등' : 'Samsung Electronics, SK Hynix, INFINIQ, LG Electronics, and more'}</p>
                                </div>
                            </GlassCard>
                            <GlassCard className="p-5 flex items-start gap-4">
                                <div className="mt-1"><Building2 className="w-5 h-5 text-[#64ffda]" /></div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">{ko ? '건설 & 엔지니어링' : 'Construction & Engineering'}</h4>
                                    <p className="text-gray-400 text-sm">{ko ? '현대엔지니어링, GS건설, 대우건설 등' : 'Hyundai Engineering, GS E&C, Daewoo E&C, and more'}</p>
                                </div>
                            </GlassCard>
                            <GlassCard className="p-5 flex items-start gap-4">
                                <div className="mt-1"><Building2 className="w-5 h-5 text-[#64ffda]" /></div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">{ko ? '유통 & 화학 & 자동차' : 'Retail · Chemicals · Automotive'}</h4>
                                    <p className="text-gray-400 text-sm">{ko ? 'GS리테일, SKC, 현대자동차, 금호타이어, 도요타(TOYOTA) 등' : 'GS Retail, SKC, Hyundai Motor, Kumho Tire, TOYOTA, and more'}</p>
                                </div>
                            </GlassCard>
                            <GlassCard className="p-5 flex items-start gap-4">
                                <div className="mt-1"><GraduationCap className="w-5 h-5 text-[#64ffda]" /></div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Education & Platform</h4>
                                    <p className="text-gray-400 text-sm">{ko ? '클래스101(CLASS101) 마스터 클래스 진행, 성신여자대학교 출강' : 'CLASS101 Master Class instructor; Sungshin Women’s University guest lecturer'}</p>
                                </div>
                            </GlassCard>
                        </div>

                        {/* Highlight Projects */}
                        <GlassCard className="p-8 h-full bg-gradient-to-br from-[#120e26] to-[#0a081c]">
                            <h3 className="text-xl font-bold text-[#d4af37] mb-6 flex items-center gap-2">
                                <Award className="w-6 h-6" /> {ko ? '주요 프로젝트 실적' : 'Key Project Highlights'}
                            </h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#64ffda] mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">{ko ? 'C-Level 임원진 맞춤형 비즈니스 코칭' : 'Customized Business Coaching for C-Level Executives'}</h4>
                                        <p className="text-gray-400 text-sm">{ko ? 'SKC 실장급 등 핵심 수석 임원진 대상 고위급 비즈니스 스피킹 및 전략 코칭 수행' : 'Senior business-speaking and strategy coaching for top executives, including SKC department heads.'}</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#64ffda] mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">{ko ? '신규 사업 및 해외 법인 진출 지원' : 'New-Business & Overseas Entity Expansion Support'}</h4>
                                        <p className="text-gray-400 text-sm">{ko ? '글로벌 확장을 위한 특화 인재 스크리닝 및 실무 협상 커뮤니케이션 컨설팅 성공적 완수' : 'Successfully delivered specialized talent screening and operational negotiation-communication consulting for global expansion.'}</p>
                                    </div>
                                </li>
                            </ul>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Awards & Media */}
            <section className="py-16 relative">
                <div className="absolute inset-0 bg-[#0a0e27]/50 border-y border-white/5" />
                <div className="container mx-auto px-4 max-w-5xl relative z-10">
                    <SectionHeader title="주요 수상 및 언론 보도" subtitle="Awards & Media" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        {/* Hankook Ilbo Article */}
                        <a href="https://www.hankookilbo.com/news/article/A2023110815200004552" target="_blank" rel="noopener noreferrer" className="group">
                            <GlassCard className="p-6 h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:border-[#00d4ff]/30 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.15)] flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="px-3 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] text-xs font-bold font-serif">{ko ? '📰 한국일보 (2023.11)' : '📰 Hankook Ilbo (Nov 2023)'}</span>
                                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#00d4ff] transition-colors" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#00d4ff] transition-colors">
                                        {ko ? '2023 대한민국 대표 브랜드 TOP100 대상' : '2023 Korea Representative Brand TOP100 Grand Prize'}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {ko
                                            ? '수강생의 실력과 성향에 맞춘 커리큘럼 컨설팅과 기업 전문 출장 강의에서의 전문성을 인정받아 대상(영어 교육 부문)을 수상했습니다. "수준 높은 영어 수업을 제공하기 위해 노력하고 연구할 것"이라는 인터뷰가 실렸습니다.'
                                            : 'Awarded the Grand Prize (English Education) for curriculum consulting tailored to each student’s ability and disposition, and for expertise in corporate-dispatch lectures. The article featured the interview pledge: “I will continue to research and work to deliver English classes of the highest caliber.”'}
                                    </p>
                                </div>
                                <span className="text-xs text-[#64ffda] font-medium flex items-center gap-1">
                                    {ko ? '기사 원문 보기' : 'Read full article'} <ExternalLink className="w-3 h-3" />
                                </span>
                            </GlassCard>
                        </a>

                        {/* Kookmin Ilbo Article */}
                        <a href="https://www.kmib.co.kr/article/view.asp?arcid=0018262272" target="_blank" rel="noopener noreferrer" className="group">
                            <GlassCard className="p-6 h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:border-[#d4af37]/30 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-xs font-bold font-serif">{ko ? '📰 국민일보 (2023.05)' : '📰 Kookmin Ilbo (May 2023)'}</span>
                                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#d4af37] transition-colors" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#d4af37] transition-colors">
                                        {ko ? '국민선호브랜드대상 교육 부문 대상 수상' : 'Citizen’s Preferred Brand Grand Prize — Education Category'}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {ko
                                            ? '단체 및 개인 맞춤형 커리큘럼 제공은 물론, 연세대 스타트업 출신 20대 CEO로서 AI를 활용한 커리큘럼 개발에 힘쓴 혁신적 노력이 자세히 소개되어 있습니다.'
                                            : 'The article details her tailored curricula for groups and individuals, and her innovative AI-powered curriculum development as a Yonsei-startup-born CEO in her 20s.'}
                                    </p>
                                </div>
                                <span className="text-xs text-[#d4af37] font-medium flex items-center gap-1">
                                    {ko ? '기사 원문 보기' : 'Read full article'} <ExternalLink className="w-3 h-3" />
                                </span>
                            </GlassCard>
                        </a>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center mt-8">
                        <span className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium flex items-center gap-2">
                            <Award className="w-4 h-4 text-[#d4af37]" /> {ko ? '연세대 창업경진대회 대상 (2회 우승)' : 'Yonsei Startup Competition — Grand Prize (2-time winner)'}
                        </span>
                        <span className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium flex items-center gap-2">
                            <Award className="w-4 h-4 text-[#d4af37]" /> {ko ? '숨고, 마이멘토 누적 고용 600건 이상' : 'Soomgo · MyMentor — 600+ cumulative engagements'}
                        </span>
                    </div>
                </div>
            </section>

            {/* Career Timeline */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <SectionHeader title="이력 및 글로벌 경험" subtitle="Career Timeline & Background" />

                    <div className="space-y-12">
                        {/* Timeline Item */}
                        <div className="relative pl-8 md:pl-0">
                            {/* Vertical Line for mobile */}
                            <div className="md:hidden absolute left-4 top-2 bottom-[-48px] w-px bg-white/10"></div>

                            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative">
                                <div className="hidden md:flex w-1/3 justify-end text-[#d4af37] font-bold text-lg font-mono tracking-wider">
                                    {ko ? '2021.01 ~ 현재' : 'Jan 2021 – Present'}
                                </div>
                                {/* Center Node */}
                                <div className="absolute left-[8px] md:relative md:left-auto w-4 h-4 rounded-full bg-[#d4af37] border-4 border-[#050510] shadow-[0_0_10px_rgba(212,175,55,0.5)] z-10 translate-x-[-50%] md:translate-x-0 mt-2 md:mt-0" />

                                {/* Vertical Line for desktop */}
                                <div className="hidden md:block absolute left-[33.33%] md:translate-x-[7px] top-6 bottom-[-48px] w-px bg-white/10 z-0"></div>

                                {/* Content */}
                                <div className="w-full md:w-2/3 md:pl-8">
                                    <div className="md:hidden text-[#d4af37] font-bold text-sm font-mono mb-2">{ko ? '2021.01 ~ 현재' : 'Jan 2021 – Present'}</div>
                                    <GlassCard className="p-5 border-l-4 border-l-[#d4af37]">
                                        <h4 className="text-white font-bold text-lg">{ko ? '글로벌 비즈니스 전문 강사 / 컨설턴트' : 'Global Business Specialist Instructor / Consultant'}</h4>
                                        <p className="text-gray-400 text-sm mt-1">{ko ? '기업 관련 맞춤 커뮤니케이션 전략 컨설팅' : 'Customized communication-strategy consulting for enterprises'}</p>
                                    </GlassCard>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Item */}
                        <div className="relative pl-8 md:pl-0">
                            <div className="md:hidden absolute left-4 top-2 bottom-[-48px] w-px bg-white/10"></div>
                            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative">
                                <div className="hidden md:flex w-1/3 justify-end text-white font-bold text-lg font-mono tracking-wider">
                                    {ko ? '2020.01 ~ 현재' : 'Jan 2020 – Present'}
                                </div>
                                <div className="absolute left-[8px] md:relative md:left-auto w-4 h-4 rounded-full bg-white/20 border-4 border-[#050510] z-10 translate-x-[-50%] md:translate-x-0 mt-2 md:mt-0" />
                                <div className="hidden md:block absolute left-[33.33%] md:translate-x-[7px] top-6 bottom-[-48px] w-px bg-white/10 z-0"></div>
                                <div className="w-full md:w-2/3 md:pl-8">
                                    <div className="md:hidden text-white font-bold text-sm font-mono mb-2">{ko ? '2020.01 ~ 현재' : 'Jan 2020 – Present'}</div>
                                    <GlassCard className="p-5">
                                        <h4 className="text-white font-bold text-lg">{ko ? '제니SA 대표 / 세계왕립아카데미 대표' : 'CEO, Jenny SA · CEO, World Royal Academy'}</h4>
                                        <p className="text-gray-400 text-sm mt-1">{ko ? '현재 WRA 글로벌 사업을 리드 및 경영전략 총괄' : 'Currently leads WRA’s global business and oversees corporate strategy'}</p>
                                    </GlassCard>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Item */}
                        <div className="relative pl-8 md:pl-0">
                            <div className="md:hidden absolute left-4 top-2 bottom-[-48px] w-px bg-white/10"></div>
                            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative">
                                <div className="hidden md:flex w-1/3 justify-end text-white/70 font-bold text-lg font-mono tracking-wider">
                                    2019.06 ~ 2019.09
                                </div>
                                <div className="absolute left-[8px] md:relative md:left-auto w-4 h-4 rounded-full bg-white/20 border-4 border-[#050510] z-10 translate-x-[-50%] md:translate-x-0 mt-2 md:mt-0" />
                                <div className="hidden md:block absolute left-[33.33%] md:translate-x-[7px] top-6 bottom-[-48px] w-px bg-white/10 z-0"></div>
                                <div className="w-full md:w-2/3 md:pl-8">
                                    <div className="md:hidden text-white/70 font-bold text-sm font-mono mb-2">2019.06 ~ 2019.09</div>
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                                        <h4 className="text-white font-semibold">{ko ? '알파스터디, 스터디서치 전문 영어강사 (리더)' : 'Alpha Study & StudySearch — Lead English Instructor'}</h4>
                                        <p className="text-gray-500 text-sm mt-1">{ko ? '프리랜서로서 다수 교육 플랫폼에서 활약' : 'Active as a freelance instructor across multiple education platforms'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Item */}
                        <div className="relative pl-8 md:pl-0">
                            <div className="md:hidden absolute left-4 top-2 bottom-[-48px] w-px bg-white/10"></div>
                            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative">
                                <div className="hidden md:flex w-1/3 justify-end text-white/50 font-bold text-lg font-mono tracking-wider">
                                    2016.09
                                </div>
                                <div className="absolute left-[8px] md:relative md:left-auto w-4 h-4 rounded-full bg-white/20 border-4 border-[#050510] z-10 translate-x-[-50%] md:translate-x-0 mt-2 md:mt-0" />
                                <div className="hidden md:block absolute left-[33.33%] md:translate-x-[7px] top-6 bottom-[-48px] w-px bg-white/10 z-0"></div>
                                <div className="w-full md:w-2/3 md:pl-8">
                                    <div className="md:hidden text-white/50 font-bold text-sm font-mono mb-2">2016.09</div>
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                                        <h4 className="text-white/80 font-medium">{ko ? '무역회사 G&M 통번역사' : 'G&M Trading Co. — Interpreter / Translator'}</h4>
                                        <p className="text-gray-500 text-sm mt-1">{ko ? '유럽 세관 담당팀 — 실무 비즈니스 협상 및 전문 커뮤니케이션' : 'European customs team — operational business negotiation and specialized communication'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Item (Last) */}
                        <div className="relative pl-8 md:pl-0">
                            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative">
                                <div className="hidden md:flex w-1/3 justify-end text-white/30 font-bold text-lg font-mono tracking-wider">
                                    2013.12
                                </div>
                                <div className="absolute left-[8px] md:relative md:left-auto w-4 h-4 rounded-full bg-white/10 border-4 border-[#050510] z-10 translate-x-[-50%] md:translate-x-0 mt-2 md:mt-0" />
                                <div className="w-full md:w-2/3 md:pl-8">
                                    <div className="md:hidden text-white/30 font-bold text-sm font-mono mb-2">2013.12</div>
                                    <div className="bg-white/5 border border-white/5 rounded-xl p-5 opacity-70">
                                        <h4 className="text-white/60 font-medium">{ko ? 'E&M 전문 영어학원' : 'E&M Specialized English Academy'}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Global Insight Section */}
                    <div className="mt-16 bg-gradient-to-r from-[#120e26] via-[#1a1442] to-[#120e26] rounded-2xl p-8 border border-white/10 text-center">
                        <Globe className="w-8 h-8 text-[#00d4ff] mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-3">Global Background & Insight</h3>
                        <p className="text-gray-300 text-sm">
                            {ko ? (
                                <>
                                    미국(2010), 중국(2009), 싱가포르(2008) 등 다국적 언어권 유학과 실무 경험을 바탕으로,
                                    <span className="text-white font-semibold"> 현지 비즈니스 문화에 대한 깊이 있는 통찰력</span>을 제공합니다.
                                </>
                            ) : (
                                <>
                                    With study and work experience across multiple language regions — the U.S. (2010), China (2009), and Singapore (2008) — she delivers
                                    <span className="text-white font-semibold"> deep insight into local business cultures</span>.
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </section>

            {/* Closing Quote Banner */}
            <section className="py-20 mt-10">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <Quote className="w-16 h-16 text-[#d4af37]/20 mx-auto mb-8" />
                    <p className="text-xl md:text-3xl font-light text-white leading-relaxed mb-8 italic" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                        {ko ? (
                            <>
                                &ldquo;영어는 판단의 도구가 아닌 <span className="text-[#d4af37] font-bold">소통의 도구</span>입니다.
                                저마다의 원인을 정확히 진단하는 개별 맞춤형 커리큘럼을 통해,
                                여러분과 기업이 해외로 진출하는 <span className="text-[#64ffda] font-bold">완벽한 다리</span>가 되어 드리겠습니다.&rdquo;
                            </>
                        ) : (
                            <>
                                &ldquo;English is not a tool of judgment but a <span className="text-[#d4af37] font-bold">tool of communication</span>.
                                Through individualized curricula that precisely diagnose each learner&rsquo;s root cause,
                                I will be the <span className="text-[#64ffda] font-bold">perfect bridge</span> for you and your company to expand overseas.&rdquo;
                            </>
                        )}
                    </p>
                    <p className="text-[#d4af37] text-sm md:text-base font-medium tracking-wider uppercase">
                        {ko ? '— 2023 대한민국 대표 브랜드 대상 수상 소감 中' : '— Excerpt from 2023 Korea Representative Brand Grand Prize acceptance speech'}
                    </p>
                </div>
            </section>

        </div>
    );
}
