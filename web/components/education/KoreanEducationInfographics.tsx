'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
    Users, GraduationCap, TrendingUp, LineChart, Globe2, Building2,
    AlertTriangle, XCircle, CheckCircle2, Building, Briefcase, FileText,
    AlertCircle, Laptop, Database, Sparkles, Award, Brain, Video, Cloud,
    X, ArrowRight, PlayCircle, BookOpen, MonitorPlay, Check, PieChart, Bot,
    ShieldCheck, LayoutGrid, Cpu, Target, Share2, Map, MapPin, Settings
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

function Counter({ from = 0, to, duration = 2, suffix = '', prefix = '', decimals = 0 }: any) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(nodeRef, { once: true, margin: "-50px" });

    useEffect(() => {
        if (inView && nodeRef.current) {
            const controls = animate(from, to, {
                duration,
                ease: "easeOut",
                onUpdate(value: number) {
                    if (nodeRef.current) {
                        const factor = Math.pow(10, decimals);
                        const formatted = (Math.round(value * factor) / factor).toLocaleString(undefined, {
                            minimumFractionDigits: decimals,
                            maximumFractionDigits: decimals
                        });
                        nodeRef.current.textContent = `${prefix}${formatted}${suffix}`;
                    }
                }
            });
            return () => controls.stop();
        }
    }, [from, to, duration, inView, prefix, suffix, decimals]);

    return <span ref={nodeRef}>{prefix}{from}{suffix}</span>;
}

export function KoreanEducationInfographics() {
    const [activeModal, setActiveModal] = useState<'ai' | 'video' | 'lms' | null>(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (activeModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [activeModal]);

    return (
        <div className="w-full flex flex-col gap-32 py-16">

            {/* Section 1: 왜 지금 한국어 교육인가? */}
            <section className="container mx-auto px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">왜 지금 한국어 교육인가?</h2>
                    <div className="h-1 w-20 bg-[#d4af37] mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left Column */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                        <h3 className="text-[#d4af37] text-xl font-bold mb-8 text-center">글로벌 한국어 열풍의 숫자</h3>
                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-full bg-[#d4af37]/20 flex items-center justify-center shrink-0">
                                    <Users className="text-[#d4af37] w-7 h-7" />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white mb-1"><Counter to={1770} suffix="만 명" /></div>
                                    <div className="text-gray-400 text-sm">전 세계 한국어 학습자</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-full bg-[#d4af37]/20 flex items-center justify-center shrink-0">
                                    <GraduationCap className="text-[#d4af37] w-7 h-7" />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white mb-1"><Counter to={21} suffix="만 6천 명" /></div>
                                    <div className="text-gray-400 text-sm">세종학당 수강생 (3년간 2배 증가)</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-full bg-[#d4af37]/20 flex items-center justify-center shrink-0">
                                    <TrendingUp className="text-[#d4af37] w-7 h-7" />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white mb-1"><Counter to={9} suffix="조 9천억 원" /></div>
                                    <div className="text-gray-400 text-sm">글로벌 시장 규모 (2024년)</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-full bg-[#d4af37]/20 flex items-center justify-center shrink-0">
                                    <LineChart className="text-[#d4af37] w-7 h-7" />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white mb-1"><Counter to={92} suffix="조 원" /></div>
                                    <div className="text-gray-400 text-sm">2034년 전망 (CAGR 25.1%)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm flex-1">
                            <h3 className="text-[#d4af37] text-xl font-bold mb-6 text-center">K-컬처가 만든 변화</h3>

                            <ul className="space-y-4 text-white mb-8">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                                    <span>한류 경험자의 <strong className="text-[#d4af37] text-lg">26.8%</strong>가 한국어 학습 경험</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                                    <span>'오징어 게임' 방영 후 학습자 급증</span>
                                </li>
                            </ul>

                            {/* Animated Bars */}
                            <div className="space-y-6 px-4">
                                <div>
                                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                                        <span>미국 (US)</span>
                                        <span className="text-[#d4af37] font-bold">40% 증가</span>
                                    </div>
                                    <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "40%" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-[#d4af37]/50 to-[#d4af37] rounded-full"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                                        <span>영국 (UK)</span>
                                        <span className="text-[#d4af37] font-bold">75% 증가</span>
                                    </div>
                                    <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "75%" }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-[#d4af37]/50 to-[#d4af37] rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-[#d4af37]/20 to-transparent border-l-4 border-[#d4af37] rounded-r-2xl p-6 flex items-center justify-between">
                            <p className="text-white font-medium text-lg leading-snug">
                                "한국어는 이제 글로벌 주류<br />언어 교육 시장의 한 축"
                            </p>
                            <Globe2 className="w-12 h-12 text-[#d4af37] opacity-80" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: TOPIK - 한국어 학습의 핵심 목표 */}
            <section className="container mx-auto px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#fceda6]">TOPIK</span> - 한국어 학습의 핵심 목표
                    </h2>
                    <div className="h-1 w-20 bg-[#d4af37] mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* TOPIK Market */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center relative overflow-hidden">
                        <h3 className="text-[#d4af37] text-xl font-bold mb-10 w-full">TOPIK이 만든 5,000억 원 시장</h3>

                        <motion.div
                            animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0 rgba(212,175,55,0)", "0 0 40px rgba(212,175,55,0.4)", "0 0 0 rgba(212,175,55,0)"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="w-48 h-48 rounded-full bg-gradient-to-br from-white/10 to-white/5 border p-1 border-[#d4af37]/30 flex flex-col items-center justify-center mb-10 relative z-10"
                        >
                            <div className="text-4xl font-bold text-[#d4af37] mb-2"><Counter to={5000} />억</div>
                            <div className="text-gray-300 text-sm">시장 규모</div>
                            <div className="absolute bottom-4 right-[-40px] text-xs text-gray-500 whitespace-nowrap">2024년 기준</div>
                        </motion.div>

                        <div className="w-full space-y-4">
                            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
                                <Globe2 className="w-6 h-6 text-[#d4af37]" />
                                <div>
                                    <div className="text-white font-medium text-sm">2025년 IBT 해외 시행</div>
                                    <div className="text-[#d4af37] text-xs font-bold">연 8회 확대</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
                                <Building className="w-6 h-6 text-[#d4af37]" />
                                <div>
                                    <div className="text-white font-medium text-sm">전 세계</div>
                                    <div className="text-gray-300 text-xs text-balance">87개국 314개 시험 센터</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Growth & Retake Market */}
                    <div className="flex flex-col gap-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                            <h3 className="text-[#d4af37] text-xl font-bold mb-8">응시 규모</h3>
                            <div className="relative pt-6">
                                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2"></div>
                                <div className="flex justify-between items-center relative z-10">
                                    <div className="text-center">
                                        <div className="text-gray-400 text-sm mb-2">1997년</div>
                                        <div className="text-xl text-white font-bold bg-[#050510] px-2">2,274명</div>
                                    </div>

                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        className="bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] px-4 py-1 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                                    >
                                        <TrendingUp className="w-4 h-4 inline mr-1 -mt-0.5" />
                                        185배 성장
                                    </motion.div>

                                    <div className="text-center">
                                        <div className="text-gray-400 text-sm mb-2">2023년</div>
                                        <div className="text-xl text-[#d4af37] font-bold bg-[#050510] px-2"><Counter to={42} suffix="만 명" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-red-500/30 rounded-2xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
                            <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                                <AlertTriangle className="text-red-400 w-5 h-5" />
                                현실: 응시자의 약 <span className="text-red-400">50%가 불합격</span>
                            </h3>

                            <div className="flex items-center justify-between bg-[#050510] border border-white/10 rounded-xl p-6">
                                <div className="text-center flex-1">
                                    <XCircle className="w-10 h-10 text-red-500/60 mx-auto mb-2" />
                                    <span className="text-red-400/80 text-sm font-medium">불합격</span>
                                </div>
                                <div className="text-3xl text-gray-600 px-4">=</div>
                                <div className="text-center flex-1 bg-gradient-to-br from-[#d4af37]/20 to-transparent p-4 rounded-lg border border-[#d4af37]/30">
                                    <div className="text-[#d4af37] font-bold mb-1">재응시 시장</div>
                                    <div className="text-sm text-white">연 20만 명+</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Section 3: TOPIK이 결정하는 기회 */}
            <section className="container mx-auto px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        <span className="text-[#d4af37]">TOPIK</span>이 결정하는 기회
                    </h2>
                    <p className="text-xl text-gray-300 mb-6">대학 · 취업 · 비자의 필수 관문</p>
                    <div className="h-1 w-20 bg-[#d4af37] rounded-full"></div>
                </motion.div>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-2xl">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="border-b border-white/10 bg-[#d4af37]/10">
                                <th className="p-5 text-[#d4af37] font-bold text-lg">분야</th>
                                <th className="p-5 text-[#d4af37] font-bold text-lg">요구사항</th>
                                <th className="p-5 text-[#d4af37] font-bold text-lg">경제적 가치</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            <motion.tr initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="hover:bg-white/5 transition-colors">
                                <td className="p-5 flex items-center gap-3 text-white font-medium">
                                    <GraduationCap className="w-5 h-5 text-gray-400" /> 대학 입학
                                </td>
                                <td className="p-5"><span className="text-red-400 font-bold">3급</span> <span className="text-gray-300">이상 필수</span></td>
                                <td className="p-5 text-gray-300">GKS 장학금 연 <strong className="text-white">1,000만원+</strong></td>
                            </motion.tr>
                            <motion.tr initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="hover:bg-white/5 transition-colors">
                                <td className="p-5 flex items-center gap-3 text-white font-medium">
                                    <Building2 className="w-5 h-5 text-gray-400" /> 삼성/LG
                                </td>
                                <td className="p-5"><span className="text-red-400 font-bold">3급</span> <span className="text-gray-300">이상</span></td>
                                <td className="p-5 text-gray-300">신입 연봉 차이 <strong className="text-white">300-500만원</strong></td>
                            </motion.tr>
                            <motion.tr initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="hover:bg-white/5 transition-colors">
                                <td className="p-5 flex items-center gap-3 text-white font-medium">
                                    <Briefcase className="w-5 h-5 text-gray-400" /> 현대자동차
                                </td>
                                <td className="p-5"><span className="text-red-400 font-bold">4급</span> <span className="text-gray-300">이상</span></td>
                                <td className="p-5 text-gray-300">인턴십 <strong className="text-white">기회</strong></td>
                            </motion.tr>
                            <motion.tr initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="hover:bg-white/5 transition-colors">
                                <td className="p-5 flex items-center gap-3 text-white font-medium">
                                    <Globe2 className="w-5 h-5 text-gray-400" /> 비자(E-7)
                                </td>
                                <td className="p-5 text-gray-300">TOPIK <strong className="text-white">필수</strong></td>
                                <td className="p-5 text-gray-300">특정활동 <strong className="text-white">취업 비자</strong></td>
                            </motion.tr>
                            <motion.tr initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="hover:bg-white/5 transition-colors">
                                <td className="p-5 flex items-center gap-3 text-white font-medium">
                                    <FileText className="w-5 h-5 text-gray-400" /> 비자(F-2-7)
                                </td>
                                <td className="p-5 text-gray-300">점수제 <strong className="text-white">가산점</strong></td>
                                <td className="p-5 text-gray-300">장기체류 <strong className="text-white">자격</strong></td>
                            </motion.tr>
                        </tbody>
                    </table>
                </div>

                <div className="bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent border-t border-[#d4af37]/30 py-4 text-center">
                    <p className="text-gray-300">
                        TOPIK은 단순한 언어 시험을 넘어 <strong className="text-white">경제적 기회와 진로 성장</strong>의 열쇠입니다.
                    </p>
                </div>
            </section>

            {/* Section 4: 온라인 TOPIK 모의고사 시장 현황 */}
            <section className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        온라인 <span className="text-[#d4af37]">TOPIK</span> 모의고사 시장 현황
                    </h2>
                    <div className="h-1 w-20 bg-[#d4af37] rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Market Comparison Table */}
                    <div className="lg:col-span-7 overflow-x-auto border border-[#d4af37]/20 rounded-2xl bg-white/5 backdrop-blur-sm self-start">
                        <table className="w-full text-left text-sm whitespace-nowrap lg:whitespace-normal">
                            <thead>
                                <tr className="bg-[#d4af37]/10 text-[#d4af37] border-b border-[#d4af37]/20">
                                    <th className="p-4 font-bold">서비스명</th>
                                    <th className="p-4 font-bold">가격</th>
                                    <th className="p-4 font-bold">주요특징</th>
                                    <th className="p-4 font-bold border-l border-[#d4af37]/20 text-center">한계점</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-gray-300">
                                <tr className="hover:bg-white/5">
                                    <td className="p-4 text-white font-medium">A사</td>
                                    <td className="p-4">무료기본형</td>
                                    <td className="p-4 text-gray-400">기초 AI해설, 과거 기출문제</td>
                                    <td rowSpan={5} className="p-6 text-center border-l border-[#d4af37]/20 bg-red-500/5 align-middle">
                                        <div className="flex flex-col items-center justify-center gap-2 h-full">
                                            <AlertCircle className="w-6 h-6 text-red-400" />
                                            <span className="text-red-300 font-bold whitespace-nowrap">체계적 학습경로 부재</span>
                                            <span className="text-red-300 font-bold whitespace-nowrap">피드백 제한적</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="hover:bg-white/5">
                                    <td className="p-4 text-white font-medium">B사</td>
                                    <td className="p-4">5회 20,000원</td>
                                    <td className="p-4 text-gray-400">온라인 즉시 채점, 기본통계</td>
                                </tr>
                                <tr className="hover:bg-white/5">
                                    <td className="p-4 text-white font-medium">C사</td>
                                    <td className="p-4">온라인 코스 49,000</td>
                                    <td className="p-4 text-gray-400">과거 기출문제 DB, 기초해설</td>
                                </tr>
                                <tr className="hover:bg-white/5">
                                    <td className="p-4 text-white font-medium">D사</td>
                                    <td className="p-4">월16,900원 구독제</td>
                                    <td className="p-4 text-gray-400">종합 TOPIK 대비코스, 강의 제공</td>
                                </tr>
                                <tr className="hover:bg-white/5">
                                    <td className="p-4 text-white font-medium">E사</td>
                                    <td className="p-4">무료/프리미엄 혼합형</td>
                                    <td className="p-4 text-gray-400">기본 모의고사, 커뮤니티 지원</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="p-3 text-xs text-gray-500 border-t border-white/5">
                            * 2025년 9월 기준 주요 시장 점유 서비스 분석
                        </div>
                    </div>

                    {/* Core Problems & WRA Solution */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-[#d4af37] text-xl font-bold mb-6 flex items-center gap-2">
                                시장의 핵심 문제점
                            </h3>

                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <Database className="w-5 h-5 text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">데이터 기반 맞춤 학습 부재</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">학습자의 오답 패턴, 취약점, 학습 진도를 정밀 분석하여 제공하는 AI 기반 맞춤형 학습 경로 설계 시스템이 전무함</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <Laptop className="w-5 h-5 text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">IBT 전환 대응 미흡</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">2025년 확대되는 IBT 형식에 대응하는 실전 환경 시뮬레이션과 디지털 응시 환경 적응 훈련 부족</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <LineChart className="w-5 h-5 text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">메타분석 시스템 부재</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">문항 유형별 난이도, 출제 경향, 응시자 성취도를 체계적으로 분석하여 최적화된 학습 전략을 제시하는 메타분석 시스템 없음</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-[#d4af37]/20 to-[#050510] border-l-4 border-[#d4af37] border-y border-r border-y-[#d4af37]/30 border-r-[#d4af37]/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(212,175,55,0.15)] relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Award className="w-24 h-24 text-[#d4af37]" />
                            </div>
                            <h3 className="text-white text-lg font-bold mb-3 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-[#d4af37]" /> GHIP의 시장 기회
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed relative z-10 font-medium">
                                메타인덱스 기반 문항 분석, AI 맞춤형 학습 경로 설계, IBT 완벽 대응이 결합된 <strong className="text-[#d4af37]">차세대 통합 솔루션</strong>
                            </p>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* Section 5: 검증된 콘텐츠와 기술의 결합 */}
            <section className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        검증된 콘텐츠와 기술의 결합
                    </h2>
                    <div className="h-1 w-20 bg-[#d4af37] mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1: AI TOPIK */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        onClick={() => setActiveModal('ai')}
                        className="bg-white/5 border border-[#d4af37]/30 rounded-2xl p-8 relative overflow-hidden group cursor-pointer hover:bg-white/10 hover:border-[#d4af37]/60 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                    >
                        <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]">
                            핵심
                        </div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-[#1e3a8a] border border-blue-500/50 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(30,58,138,0.8)]">
                                <Brain className="w-6 h-6 text-blue-200" />
                            </div>
                            <h3 className="text-xl font-bold text-white leading-tight">AI 기반 TOPIK<br />모의고사 시스템</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm break-keep">메타인덱스 테이블 기반 체계적 <br />문제 관리</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm break-keep">IBT 실전 시뮬레이션</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm break-keep">AI 기반 개인 맞춤 분석</span>
                            </li>
                        </ul>
                        <div className="mt-8 flex justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-[#d4af37] text-sm font-bold flex items-center gap-2">상세보기 <ArrowRight className="w-4 h-4" /></span>
                        </div>
                    </motion.div>

                    {/* Card 2: Video Lectures */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        onClick={() => setActiveModal('video')}
                        className="bg-white/5 border border-[#d4af37]/30 rounded-2xl p-8 group cursor-pointer hover:bg-white/10 hover:border-[#d4af37]/60 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-[#1e3a8a] border border-blue-500/50 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(30,58,138,0.8)]">
                                <Video className="w-6 h-6 text-blue-200" />
                            </div>
                            <h3 className="text-xl font-bold text-white leading-tight">한글 동영상 강좌</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">현지 언어별 맞춤형 자막 지원</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">학습자 참여형 상호작용 콘텐츠</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">레벨별 단계적 커리큘럼 제공</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">마이크로러닝 방식 (8-15분)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">필요에 따라 유연한 콘텐츠 교체</span>
                            </li>
                        </ul>
                        <div className="mt-8 flex justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-[#d4af37] text-sm font-bold flex items-center gap-2">상세보기 <ArrowRight className="w-4 h-4" /></span>
                        </div>
                    </motion.div>

                    {/* Card 3: Cloud LMS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        onClick={() => setActiveModal('lms')}
                        className="bg-white/5 border border-[#d4af37]/30 rounded-2xl p-8 group cursor-pointer hover:bg-white/10 hover:border-[#d4af37]/60 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-[#1e3a8a] border border-blue-500/50 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(30,58,138,0.8)]">
                                <Cloud className="w-6 h-6 text-blue-200" />
                            </div>
                            <h3 className="text-xl font-bold text-white leading-tight">클라우드 LMS 플랫폼</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">통합 학습 관리 시스템</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">실시간 진도 추적</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">교육기관용 대시보드</span>
                            </li>
                        </ul>
                        <div className="mt-8 flex justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-[#d4af37] text-sm font-bold flex items-center gap-2">상세보기 <ArrowRight className="w-4 h-4" /></span>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute left-0 top-0 w-2 h-full bg-[#1e3a8a]"></div>
                    <p className="text-white text-lg md:text-xl font-medium tracking-wide">
                        "검증된 기술과 유연한 콘텐츠로 한국어 교육의 새로운 표준을 만듭니다."
                    </p>
                </motion.div>
            </section>

            {/* Section 6: 목표 시장 분석 */}
            <section className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        목표 시장 분석
                    </h2>
                    <p className="text-xl text-[#d4af37] mb-6">누가 필요로 하는가?</p>
                    <div className="h-1 w-20 bg-[#d4af37] mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* B2C */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col h-full relative overflow-hidden group hover:bg-white/10 transition-colors"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-blue-900/40 border border-blue-500/20 flex items-center justify-center shrink-0">
                                <Users className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white">개인 학습자 (B2C)</h3>
                        </div>
                        <ul className="space-y-6 flex-grow">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-gray-300 text-sm block mb-1">TOPIK 응시자:</span>
                                    <span className="text-white font-bold text-sm">연 42만 명</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-gray-300 text-sm block mb-1">한국어 학습시장 규모:</span>
                                    <span className="text-white font-bold text-sm">9조 9천억 원 (2024년)</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-gray-300 text-sm block mb-1">온라인학습 플랫폼:</span>
                                    <span className="text-white font-bold text-sm">2억명 잠재 시장 (2조원)</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-gray-300 text-sm block mb-1">한류 팬:</span>
                                    <span className="text-white font-bold text-sm">전 세계 1억 명+</span>
                                </div>
                            </li>
                        </ul>
                        <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                            <TrendingUp className="w-5 h-5 text-[#d4af37]" />
                            <span className="text-[#d4af37] font-bold text-sm">연평균 성장률 25.1% (2025-2034)</span>
                        </div>
                    </motion.div>

                    {/* B2B */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col h-full relative overflow-hidden group hover:bg-white/10 transition-colors"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-blue-900/40 border border-blue-500/20 flex items-center justify-center shrink-0">
                                <Building2 className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white">교육 기관 (B2B)</h3>
                        </div>
                        <ul className="space-y-6 flex-grow">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-gray-300 text-sm block mb-1">해외 대학 한국어학과:</span>
                                    <span className="text-white font-bold text-sm">1,421개 대학 (106개국+)</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-gray-300 text-sm block mb-1">중국 한국어학과:</span>
                                    <span className="text-white font-bold text-sm">271개 (1995년 20개에서 급증)</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-gray-300 text-sm block mb-1">한국어학원/어학원:</span>
                                    <span className="text-white font-bold text-sm">글로벌 500개+ 기관 네트워크</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-gray-300 text-sm block mb-1">다문화/국제교류센터:</span>
                                    <span className="text-white font-bold text-sm">전 세계 300개+ </span>
                                </div>
                            </li>
                        </ul>
                        <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-blue-400" />
                            <span className="text-blue-400 font-bold text-sm">안정적 장기 계약 시장</span>
                        </div>
                    </motion.div>

                    {/* New Market */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                        className="bg-[#050510] border border-[#d4af37]/30 rounded-2xl p-8 flex flex-col h-full relative overflow-hidden group hover:bg-[#050510]/80 transition-colors shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl -z-10"></div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center shrink-0">
                                <Briefcase className="w-6 h-6 text-[#d4af37]" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-[#d4af37]">신규 시장 기회</h3>
                        </div>
                        <ul className="space-y-6 flex-grow">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-gray-300 text-sm block mb-1">기업 한국어 교육:</span>
                                    <span className="text-white font-medium text-sm">해외 진출 기업 현지 직원 (E-7 비자 대비)</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-gray-300 text-sm block mb-1">교육기술(에듀테크):</span>
                                    <span className="text-white font-medium text-sm">2025년 61억 달러 시장 전망</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-gray-300 text-sm block mb-1">정부파트너십:</span>
                                    <span className="text-white font-medium text-sm">Study Korea 300K, 국제교류재단</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                                <div>
                                    <span className="text-gray-300 text-sm block mb-1">특화 시장:</span>
                                    <span className="text-white font-medium text-sm">산업별 맞춤형 한국어 (IT, 제조, 서비스)</span>
                                </div>
                            </li>
                        </ul>
                        <div className="mt-8 pt-6 border-t border-[#d4af37]/20 flex items-center gap-3">
                            <LayoutGrid className="w-5 h-5 text-[#d4af37]" />
                            <span className="text-[#d4af37] font-bold text-sm">고부가가치 블루오션 시장</span>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                    className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#1e3a8a]/40 via-[#d4af37]/10 to-transparent border border-white/10 rounded-xl p-6 shadow-xl"
                >
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <LineChart className="w-8 h-8 text-[#d4af37]" />
                        <h3 className="text-lg md:text-2xl font-bold text-white tracking-wide">
                            시장 성장 전망: 2034년 <span className="text-[#d4af37]">92조 원</span> 규모로 확대 예상
                        </h3>
                    </div>
                    <div className="text-gray-400 text-sm font-medium">
                        글로벌 마켓 인사이트 리포트 (2024)
                    </div>
                </motion.div>
            </section>

            {/* Section 7: 국내유학시장 기회와 전망 */}
            <section className="container mx-auto px-4 max-w-6xl mt-16 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        국내유학시장 <span className="text-[#d4af37]">기회와 전망</span>
                    </h2>
                    <div className="h-1 w-20 bg-[#d4af37] rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Col - Study Korea 300K */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="space-y-6 flex flex-col h-full"
                    >
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm flex-grow flex flex-col">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 pb-4 border-b border-white/10">
                                    <span className="text-blue-400">Study Korea 300K</span> 프로젝트
                                </h3>

                                <div className="space-y-8 mb-10">
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 rounded-full bg-blue-900/40 border border-blue-500/20 flex items-center justify-center shrink-0">
                                            <GraduationCap className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-white mb-1">20만 → 30만 유학생</div>
                                            <div className="text-sm text-gray-400 font-medium">2027년까지 50% 증가 목표</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 rounded-full bg-blue-900/40 border border-blue-500/20 flex items-center justify-center shrink-0">
                                            <FileText className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-white mb-1">5,000억 원</div>
                                            <div className="text-sm text-gray-400 font-medium">TOPIK 교육 시장</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 rounded-full bg-blue-900/40 border border-blue-500/20 flex items-center justify-center shrink-0">
                                            <Briefcase className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-white mb-1">유학 → 취업 → 정주</div>
                                            <div className="text-sm text-gray-400 font-medium">원스톱 지원 체계 구축</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#050510]/50 border border-white/5 rounded-xl p-6 mb-8 mt-auto">
                                <h4 className="text-center font-bold text-white mb-8 border-b border-white/5 pb-3">글로벌 유학생 정책 비교</h4>
                                <div className="flex justify-around items-end h-32 px-4 mb-3 text-center">
                                    <div className="flex flex-col items-center gap-2 group w-1/3">
                                        <span className="text-[#d4af37] font-bold text-sm">30만 명</span>
                                        <div className="w-10 md:w-14 bg-gradient-to-t from-[#1e3a8a] to-blue-500 rounded-t-md h-[60%] group-hover:h-[65%] shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300"></div>
                                        <span className="text-white text-sm font-bold">한국</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 group w-1/3">
                                        <span className="text-gray-400 text-sm">50만 명</span>
                                        <div className="w-10 md:w-14 bg-white/10 rounded-t-md h-[100%] group-hover:bg-white/20 transition-all duration-300"></div>
                                        <span className="text-gray-400 text-sm font-medium">일본</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 group w-1/3">
                                        <span className="text-gray-400 text-sm">50만 명+</span>
                                        <div className="w-10 md:w-14 bg-white/10 rounded-t-md h-[100%] group-hover:bg-white/20 transition-all duration-300"></div>
                                        <span className="text-gray-400 text-sm font-medium">중국</span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 px-2 md:px-6">
                                    <span className="w-1/3 text-center text-[#d4af37] font-semibold">2027 목표</span>
                                    <span className="w-1/3 text-center">2027 목표</span>
                                    <span className="w-1/3 text-center">이미 달성</span>
                                </div>
                            </div>

                            <ul className="space-y-3 text-sm text-gray-300 bg-white/5 p-5 rounded-xl border border-white/5">
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-[#d4af37]" />
                                    <span className="font-medium text-white">시간제 취업 확대</span> (30시간/주)
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-[#d4af37]" />
                                    <span className="font-medium text-white">E-9 비자자 대학 진학 허용</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-[#d4af37]" />
                                    <span className="font-medium text-white">졸업 후 취업비자 지원 강화</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Right Col */}
                    <div className="flex flex-col gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
                        >
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Target className="w-5 h-5 text-blue-400" /> 핵심 기회 요인
                            </h3>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-500/20">
                                        <Laptop className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">TOPIK IBT 확대</h4>
                                        <p className="text-sm text-gray-400">2025년부터 해외 시행 연 8회로 확대되며 온라인 모의고사 시장 확대 예상</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-500/20">
                                        <Bot className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">AI 교육기술 시장 성장</h4>
                                        <p className="text-sm text-gray-400">2018년 8억 달러 → 2025년 61억 달러 맞춤형 학습·평가 기술 수요 급증</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-500/20">
                                        <Building className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">기업 한국어 교육 확대</h4>
                                        <p className="text-sm text-gray-400">현지 채용 외국인 대상 한국어 교육 및 해외 진출 기업 현지직원 역량강화</p>
                                    </div>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm flex-grow"
                        >
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Globe2 className="w-5 h-5 text-[#d4af37]" /> 지역별 기회
                            </h3>
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between items-end mb-3">
                                        <span className="text-white font-medium">동남아시아</span>
                                        <span className="text-[#d4af37] font-bold text-sm bg-[#d4af37]/10 px-2 py-1 rounded">가장 빠른 성장</span>
                                    </div>
                                    <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden shadow-inner">
                                        <motion.div initial={{ width: 0 }} whileInView={{ width: '90%' }} transition={{ duration: 1.5, ease: "easeOut" }} className="bg-gradient-to-r from-blue-700 to-[#d4af37] h-full rounded-full"></motion.div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-3">
                                        <span className="text-white font-medium">중앙아시아</span>
                                        <span className="text-blue-300 text-sm">3년간 2배 증가</span>
                                    </div>
                                    <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden shadow-inner">
                                        <motion.div initial={{ width: 0 }} whileInView={{ width: '65%' }} transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }} className="bg-gradient-to-r from-blue-900 to-blue-400 h-full rounded-full"></motion.div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-3">
                                        <span className="text-white font-medium">미주/유럽</span>
                                        <span className="text-gray-400 text-sm">꾸준한 성장</span>
                                    </div>
                                    <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden shadow-inner">
                                        <motion.div initial={{ width: 0 }} whileInView={{ width: '45%' }} transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }} className="bg-white/20 h-full rounded-full"></motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                            className="bg-gradient-to-r from-transparent via-blue-900/20 to-transparent border-l-4 border-blue-500 p-5 text-[15px] text-gray-300 tracking-wide font-medium relative"
                        >
                            "정부 주도의 유학생 정책과 AI 교육기술 발전은 한국어 교육 시장의 <strong className="text-white">양적·질적 성장을 동시에 견인</strong>하고 있습니다."
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 8: 차별점 OR 경쟁력 */}
            <section className="container mx-auto px-4 max-w-6xl mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        차별점 <span className="text-gray-500 font-light mx-2">OR</span> 경쟁력
                    </h2>
                    <div className="h-1 w-20 bg-[#d4af37] mx-auto rounded-full mt-4"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* 기술적 우위 */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 group"
                    >
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/5">
                            <div className="w-12 h-12 bg-blue-900/40 rounded-xl flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-900/60 transition-colors">
                                <Cpu className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">기술적 우위</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">국내 유일 메타인덱스기반 TOPIK 시스템</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">AI 기반 개인 맞춤 분석</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">IBT 완벽 대응 (2025년 확대)</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* 콘텐츠 신뢰도 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-300 group lg:translate-y-8"
                    >
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/5">
                            <div className="w-12 h-12 bg-indigo-900/40 rounded-xl flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-900/60 transition-colors">
                                <Award className="w-6 h-6 text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white">콘텐츠 신뢰도</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">서울대학교 언어교육원 콘텐츠</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">60년 교육 노하우 집약</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">애니메이션 상호작용 학습</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* 교육 생태계 구축 */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#d4af37]/50 transition-all duration-300 group"
                    >
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/5">
                            <div className="w-12 h-12 bg-[#d4af37]/20 rounded-xl flex items-center justify-center border border-[#d4af37]/30 group-hover:bg-[#d4af37]/30 transition-colors">
                                <Share2 className="w-6 h-6 text-[#d4af37]" />
                            </div>
                            <h3 className="text-xl font-bold text-white">교육 생태계 구축</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">한국어 학습 + TOPIK 대비 + 취업 연계</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">캠퍼스 내 전용 교육 인프라</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                                <span className="text-gray-300 text-sm">정부 지원 NCS 직업교육 연계</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Section 9: 제공되는 것들 & 글로벌 확장 로드맵 */}
            <section className="container mx-auto px-4 max-w-6xl pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left Col - 제공되는 것들 */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-2">제공되는 것들</h2>
                            <div className="text-sm text-gray-400 mb-6">WRA 한국어 교육의 유일무이한 혜택</div>

                            <div className="space-y-4 mb-6">
                                <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-4 hover:bg-white/10 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-blue-900/40 border border-blue-500/20 flex items-center justify-center shrink-0">
                                        <Brain className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-[15px] mb-1">AI 기반 TOPIK 모의고사 시스템</h4>
                                        <p className="text-xs text-gray-400">메타인덱스 분석, IBT 실전 시뮬레이션, 개인 맞춤 학습</p>
                                    </div>
                                </div>

                                <div className="bg-[#1e3a8a]/30 border border-blue-500/30 rounded-xl p-5 flex items-center gap-4 hover:bg-[#1e3a8a]/50 transition-colors relative overflow-hidden shadow-[0_0_20px_rgba(30,58,138,0.2)]">
                                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 z-10">
                                        <Building className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="z-10">
                                        <h4 className="text-white font-bold text-[15px] mb-1">서울대 '사랑해요 한국어' 전 과정</h4>
                                        <p className="text-xs flex flex-wrap gap-2 text-blue-200">
                                            <span>216차시</span>
                                            <span>|</span>
                                            <span>4레벨</span>
                                            <span>|</span>
                                            <span className="text-[#d4af37] font-bold tracking-wide">8개 언어 자막 지원</span>
                                        </p>
                                    </div>
                                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#d4af37]"></div>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-4 hover:bg-white/10 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-cyan-900/40 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                        <Cloud className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-[15px] mb-1">클라우드 LMS 플랫폼</h4>
                                        <p className="text-xs text-gray-400">통합 학습 관리, 실시간 진도 추적, 자료실</p>
                                    </div>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-4 hover:bg-white/10 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-purple-900/40 border border-purple-500/20 flex items-center justify-center shrink-0">
                                        <Settings className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-[15px] mb-1">기관별 맞춤 커스터마이징</h4>
                                        <p className="text-xs text-gray-400">교육기관 요구사항 반영, 현지화 지원</p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-xs text-gray-500 italic bg-white/5 p-3 rounded-lg border border-white/5">
                                (참조) 글로벌 진출 확대를 위해 자막 지원 언어가 기존 6개 언어에서 8개 언어로 변경되었습니다.
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Col - 로드맵 */}
                    <div className="lg:col-span-7 bg-[#050510]/80 border border-white/10 rounded-2xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/10 blur-3xl rounded-full -z-10"></div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-10">
                            <Map className="w-6 h-6 text-[#d4af37]" /> 글로벌 확장 로드맵
                        </h2>

                        <div className="space-y-12 relative before:absolute before:inset-y-0 before:left-[1.25rem] md:before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-indigo-400 before:to-[#d4af37] before:z-0">

                            {/* Phase 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                                className="relative flex items-center w-full z-10 group"
                            >
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050510] bg-blue-500 text-white shadow z-20 transition-transform group-hover:scale-110">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div className="w-[calc(100%-3.5rem)] ml-auto md:ml-0 md:mr-auto md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-6 rounded-xl shadow-lg hover:bg-white/10 transition-colors relative z-10">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-blue-400 text-lg">2025-2026</h3>
                                    </div>
                                    <div className="text-white font-bold mb-3 text-[17px]">인도네시아 거점 완성</div>
                                    <ul className="space-y-2 text-sm text-gray-400">
                                        <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-blue-400"></div> 대학교 수업 모델 완성</li>
                                        <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-blue-400"></div> 동남아시아 5개 대학 확장</li>
                                        <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-blue-400"></div> 현지 파트너십 네트워크 구축</li>
                                    </ul>
                                </div>
                            </motion.div>

                            {/* Phase 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                                className="relative flex items-center w-full z-10 group"
                            >
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050510] bg-indigo-500 text-white shadow z-20 transition-transform group-hover:scale-110">
                                    <Target className="w-4 h-4" />
                                </div>
                                <div className="w-[calc(100%-3.5rem)] ml-auto md:w-[calc(50%-2.5rem)] md:ml-auto md:mr-0 bg-white/5 border border-white/10 p-6 rounded-xl shadow-lg hover:bg-white/10 transition-colors relative z-10">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-indigo-400 text-lg">2027-2030</h3>
                                    </div>
                                    <div className="text-white font-bold mb-3 text-[17px]">아시아 전역 확산</div>
                                    <ul className="space-y-2 text-sm text-gray-400">
                                        <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-indigo-400"></div> 중앙아시아 3개국 진출</li>
                                        <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-indigo-400"></div> 베트남, 태국 대학 연계 확산</li>
                                        <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-indigo-400"></div> 정부 교육 정책 연계</li>
                                    </ul>
                                </div>
                            </motion.div>

                            {/* Phase 3 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                                className="relative flex items-center w-full z-10 group"
                            >
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050510] bg-[#d4af37] text-gray-900 shadow z-20 transition-transform group-hover:scale-110">
                                    <Globe2 className="w-5 h-5" />
                                </div>
                                <div className="w-[calc(100%-3.5rem)] ml-auto md:ml-0 md:mr-auto md:w-[calc(50%-2.5rem)] bg-white/5 border border-[#d4af37]/30 p-6 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.15)] relative overflow-hidden group-hover:bg-[#d4af37]/5 transition-colors z-10">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#d4af37]/20 blur-2xl"></div>
                                    <div className="flex items-center justify-between mb-2 relative z-10">
                                        <h3 className="font-bold text-[#d4af37] text-lg">2030+</h3>
                                    </div>
                                    <div className="text-white font-bold mb-3 text-[17px] relative z-10">글로벌 표준 플랫폼</div>
                                    <ul className="space-y-2 text-sm text-gray-400 relative z-10">
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div> 전 세계 주요 대학 네트워크</li>
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div> AI 기반 맞춤형 교육 고도화</li>
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div> 한국어 교육의 글로벌 스탠다드</li>
                                    </ul>
                                </div>
                            </motion.div>

                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }}
                            className="mt-12 bg-gradient-to-r from-[#d4af37]/20 to-transparent border-l-4 border-[#d4af37] p-6 rounded-r-xl"
                        >
                            <h4 className="text-[#d4af37] text-lg font-bold flex items-center gap-2 mb-3">
                                <Target className="w-6 h-6 text-white" />
                                목표: 글로벌 한국어 교육 표준 플랫폼
                            </h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                한국어 교육의 새로운 표준을 제시하여 전 세계 학습자들에게 양질의 교육기회를 제공합니다.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Feature Modals */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-[#050510]/80 backdrop-blur-md"
                            onClick={() => setActiveModal(null)}
                        />

                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setActiveModal(null)}
                                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-20"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="p-6 sm:p-10">
                                {activeModal === 'ai' && (
                                    <div className="space-y-8">
                                        <div className="border-b border-white/10 pb-6">
                                            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                                                <Brain className="text-[#d4af37] w-8 h-8" />
                                                <span className="text-[#d4af37]">TOPIK</span> 모의고사 시스템 상세
                                            </h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Left Col - Meta Index */}
                                            <div className="space-y-6">
                                                <h3 className="text-xl font-bold text-blue-400">메타인덱스 기반 혁신</h3>
                                                <div className="space-y-4">
                                                    <div className="bg-white/5 rounded-xl p-5 flex gap-4 border border-white/5">
                                                        <Database className="w-8 h-8 text-blue-300 shrink-0" />
                                                        <div>
                                                            <div className="font-bold text-white mb-1">메타인덱스 테이블</div>
                                                            <div className="text-sm text-gray-400 leading-relaxed">문제 유형별 체계적 분류 및 관리 시스템</div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-white/5 rounded-xl p-5 flex gap-4 border border-white/5">
                                                        <Bot className="w-8 h-8 text-blue-300 shrink-0" />
                                                        <div>
                                                            <div className="font-bold text-white mb-1">AI 분석</div>
                                                            <div className="text-sm text-gray-400 leading-relaxed">개인별 취약점 정밀 진단 및 맞춤형 학습 경로 제공</div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-white/5 rounded-xl p-5 flex gap-4 border border-white/5">
                                                        <Laptop className="w-8 h-8 text-blue-300 shrink-0" />
                                                        <div>
                                                            <div className="font-bold text-white mb-1">IBT 대응</div>
                                                            <div className="text-sm text-gray-400 leading-relaxed">2025년 확대되는 IBT 시험 대비</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-gradient-to-r from-blue-900/40 to-transparent border border-blue-500/20 rounded-xl p-6 mt-6">
                                                    <h4 className="font-bold text-white mb-4">메타인덱스 작동 원리</h4>
                                                    <div className="flex items-center justify-between gap-2 max-w-sm mx-auto">
                                                        <div className="flex flex-col items-center gap-2">
                                                            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                                                                <FileText className="w-5 h-5 text-blue-300" />
                                                            </div>
                                                            <span className="text-xs text-gray-300">문제 유형</span>
                                                        </div>
                                                        <ArrowRight className="w-4 h-4 text-gray-500" />
                                                        <div className="flex flex-col items-center gap-2">
                                                            <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
                                                                <Brain className="w-5 h-5 text-indigo-300" />
                                                            </div>
                                                            <span className="text-xs font-bold text-white">AI 분석</span>
                                                        </div>
                                                        <ArrowRight className="w-4 h-4 text-gray-500" />
                                                        <div className="flex flex-col items-center gap-2">
                                                            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                                                                <Award className="w-5 h-5 text-purple-300" />
                                                            </div>
                                                            <span className="text-xs text-gray-300">맞춤 학습</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Col - Differentiation */}
                                            <div className="space-y-6 md:border-l md:border-white/10 md:pl-8">
                                                <h3 className="text-xl font-bold text-indigo-400">차별화 포인트</h3>
                                                <ul className="space-y-6">
                                                    <li className="flex items-start gap-4">
                                                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center shrink-0 mt-1">
                                                            <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-white font-bold mb-1 tracking-wide">체계적 데이터 분석</h4>
                                                            <p className="text-sm text-gray-400 leading-relaxed">단순 문제 풀이가 아닌 세부 유형별 학습 패턴 분석</p>
                                                        </div>
                                                    </li>
                                                    <li className="flex items-start gap-4">
                                                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center shrink-0 mt-1">
                                                            <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-white font-bold mb-1 tracking-wide">개인별 취약점 파악</h4>
                                                            <p className="text-sm text-gray-400 leading-relaxed">문항별·영역별 정확한 취약 영역 도출</p>
                                                        </div>
                                                    </li>
                                                    <li className="flex items-start gap-4">
                                                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center shrink-0 mt-1">
                                                            <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-white font-bold mb-1 tracking-wide">맞춤형 추천 시스템</h4>
                                                            <p className="text-sm text-gray-400 leading-relaxed">AI 기반 개인화된 학습 계획 자동 생성</p>
                                                        </div>
                                                    </li>
                                                    <li className="flex items-start gap-4">
                                                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center shrink-0 mt-1">
                                                            <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-white font-bold mb-1 tracking-wide">IBT 실전 환경 구현</h4>
                                                            <p className="text-sm text-gray-400 leading-relaxed">2025년 확대되는 IBT 시험 완벽 구현</p>
                                                        </div>
                                                    </li>
                                                </ul>

                                                <div className="mt-8 bg-white text-[#050510] rounded-xl p-6 font-bold text-center border-l-4 border-blue-600 shadow-xl">
                                                    <p className="text-lg leading-relaxed">
                                                        "단순히 문제를 푸는 것이 아니라,<br />
                                                        <span className="text-blue-700">데이터 기반으로 합격을 설계</span>합니다"
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeModal === 'video' && (
                                    <div className="space-y-8">
                                        <div className="border-b border-white/10 pb-6">
                                            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                                                <Video className="text-blue-400 w-8 h-8" />
                                                한글 동영상 강좌 상세
                                            </h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Left Column */}
                                            <div className="space-y-8">
                                                <div>
                                                    <h3 className="text-xl font-bold text-blue-400 mb-4">애니메이션 기반 상호작용 학습</h3>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Users className="w-5 h-5 text-blue-300" />
                                                                <h4 className="font-bold text-white">학습자 참여형</h4>
                                                            </div>
                                                            <p className="text-xs text-gray-400 leading-relaxed">강사 중심 일방향에서 직접 참여 방식으로</p>
                                                        </div>
                                                        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <PlayCircle className="w-5 h-5 text-blue-300" />
                                                                <h4 className="font-bold text-white">직접 따라하기</h4>
                                                            </div>
                                                            <p className="text-xs text-gray-400 leading-relaxed">애니메이션 시청하며 실시간 참여</p>
                                                        </div>
                                                        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <FileText className="w-5 h-5 text-blue-300" />
                                                                <h4 className="font-bold text-white">질문-대답 상호작용</h4>
                                                            </div>
                                                            <p className="text-xs text-gray-400 leading-relaxed">실제 대화 상황 시뮬레이션</p>
                                                        </div>
                                                        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <TrendingUp className="w-5 h-5 text-blue-300" />
                                                                <h4 className="font-bold text-white">마이크로러닝</h4>
                                                            </div>
                                                            <p className="text-xs text-gray-400 leading-relaxed">8-15분 단위로 부담없는 학습</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="text-xl font-bold text-blue-400 mb-4">커리큘럼 구성</h3>
                                                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-start gap-4">
                                                        <BookOpen className="w-6 h-6 text-blue-300 mt-1 shrink-0" />
                                                        <div>
                                                            <div className="font-bold text-white mb-1">총 4권, 216차시 <span className="text-gray-400 text-sm font-normal">(54차시 × 4단계)</span></div>
                                                            <div className="text-sm text-gray-400">기초-초급-중급1-중급2 단계별 학습</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Column */}
                                            <div className="space-y-6">
                                                <h3 className="text-xl font-bold text-indigo-400 mb-4">완벽한 현지화</h3>

                                                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <Globe2 className="w-5 h-5 text-indigo-300" />
                                                        <h4 className="font-bold text-white">7개 언어 자막 지원</h4>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        <span className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-xs">한국어</span>
                                                        <span className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-xs">영어</span>
                                                        <span className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-xs">중국어</span>
                                                        <span className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-xs">일본어</span>
                                                        <span className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-xs">베트남어</span>
                                                        <span className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-xs">러시아어</span>
                                                        <span className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-xs">인도네시아어</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                                                        <span className="text-white">학습 초기 <strong className="text-indigo-300">언어 장벽 최소화</strong> 및 현지 문화 맥락 반영</span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-gradient-to-br from-indigo-900/40 to-transparent border border-indigo-500/20 rounded-xl p-5">
                                                        <h4 className="font-bold text-indigo-300 mb-3 border-b border-indigo-500/30 pb-2">1단계 기초(Beginner)</h4>
                                                        <ul className="space-y-2 text-xs text-gray-300">
                                                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div> 한글 읽기/말하기</li>
                                                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div> 인사, 자기소개, 주문</li>
                                                        </ul>
                                                    </div>
                                                    <div className="bg-gradient-to-br from-indigo-900/40 to-transparent border border-indigo-500/20 rounded-xl p-5">
                                                        <h4 className="font-bold text-indigo-300 mb-3 border-b border-indigo-500/30 pb-2">2단계 초급(Basic)</h4>
                                                        <ul className="space-y-2 text-xs text-gray-300">
                                                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div> 긴 문장, 반말/높임말</li>
                                                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div> 가족, 쇼핑, 여행, 취미</li>
                                                        </ul>
                                                    </div>
                                                    <div className="bg-gradient-to-br from-indigo-900/40 to-transparent border border-indigo-500/20 rounded-xl p-5">
                                                        <h4 className="font-bold text-indigo-300 mb-3 border-b border-indigo-500/30 pb-2">3단계 중급1</h4>
                                                        <ul className="space-y-2 text-xs text-gray-300">
                                                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div> 관용 표현, 한자어</li>
                                                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div> 이사, 가전, 계획 표현</li>
                                                        </ul>
                                                    </div>
                                                    <div className="bg-gradient-to-br from-indigo-900/40 to-transparent border border-indigo-500/20 rounded-xl p-5">
                                                        <h4 className="font-bold text-indigo-300 mb-3 border-b border-indigo-500/30 pb-2">4단계 중급2</h4>
                                                        <ul className="space-y-2 text-xs text-gray-300">
                                                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div> 토론, 의견제시</li>
                                                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div> 발표, 업무 의사소통</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                                <GraduationCap className="w-6 h-6 text-gray-300" />
                                            </div>
                                            <div className="text-center sm:text-left">
                                                <h4 className="font-bold text-white mb-1">하사누딘 대학교에서 검증된 운영 경험</h4>
                                                <p className="text-sm text-gray-400">온라인/오프라인 병행 수업으로 효과적인 하이브리드 학습 제공</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeModal === 'lms' && (
                                    <div className="space-y-8">
                                        <div className="border-b border-white/10 pb-6 text-center">
                                            <p className="text-[#d4af37] text-sm font-bold mb-2">LMS 통합 학습 플랫폼 상세</p>
                                            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-3">
                                                LMS의 핵심기능
                                            </h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                                            {/* Center Divider for Desktop */}
                                            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-white/10 -translate-x-1/2"></div>

                                            {/* Card 1: 나의 강의실 */}
                                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center shrink-0">
                                                        <MonitorPlay className="w-6 h-6 text-blue-300" />
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white">나의 강의실</h3>
                                                </div>
                                                <ul className="space-y-4">
                                                    <li className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                                        <span className="text-gray-300 text-sm font-medium hover:text-white transition-colors">VOD 애니메이션 강의 시청</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                                        <span className="text-gray-300 text-sm font-medium hover:text-white transition-colors">PDF 교재 및 보충자료 다운로드</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                                        <span className="text-gray-300 text-sm font-medium hover:text-white transition-colors">온라인 과제 제출 및 실시간 피드백</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                                        <span className="text-gray-300 text-sm font-medium hover:text-white transition-colors">개인별 학습 진도 관리</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* Card 2: 학습 지원 시스템 */}
                                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center shrink-0">
                                                        <Users className="w-6 h-6 text-blue-300" />
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white">학습 지원 시스템</h3>
                                                </div>
                                                <ul className="space-y-4">
                                                    <li className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                                        <span className="text-gray-300 text-sm font-medium hover:text-white transition-colors">주 1회 온라인/오프라인 Q&A 세션</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                                        <span className="text-gray-300 text-sm font-medium hover:text-white transition-colors">개별 상담 및 튜터링</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                                        <span className="text-gray-300 text-sm font-medium hover:text-white transition-colors">스터디 그룹 커뮤니티</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* Card 3: 학습 자료실 */}
                                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center shrink-0">
                                                        <BookOpen className="w-6 h-6 text-blue-300" />
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white">학습 자료실</h3>
                                                </div>
                                                <ul className="space-y-4">
                                                    <li className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                                        <span className="text-gray-300 text-sm font-medium hover:text-white transition-colors">TOPIK 기출문제 및 모의고사</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                                        <span className="text-gray-300 text-sm font-medium hover:text-white transition-colors">추천 학습 사이트 및 앱</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                                        <span className="text-gray-300 text-sm font-medium hover:text-white transition-colors">문법·어휘 정리 자료</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* Card 4: 통합 관리 */}
                                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center shrink-0">
                                                        <PieChart className="w-6 h-6 text-blue-300" />
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white">통합 관리</h3>
                                                </div>
                                                <ul className="space-y-4">
                                                    <li className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                                        <span className="text-gray-300 text-sm font-medium hover:text-white transition-colors">수강 신청 및 과정 안내</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                                        <span className="text-gray-300 text-sm font-medium hover:text-white transition-colors">성취도 평가 및 수료증 발급</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                                        <span className="text-gray-300 text-sm font-medium hover:text-white transition-colors">레벨별 커리큘럼 관리</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                                        <span className="text-gray-300 text-sm font-medium hover:text-white transition-colors">교육기관용 대시보드</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
