'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import {
    Users, GraduationCap, TrendingUp, LineChart, Globe2, Building2,
    AlertTriangle, XCircle, CheckCircle2, Building, Briefcase, FileText,
    AlertCircle, Laptop, Database, Sparkles, Award, Brain, Video, Cloud
} from 'lucide-react';

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
                        className="bg-white/5 border border-[#d4af37]/30 rounded-2xl p-8 relative overflow-hidden group"
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
                    </motion.div>

                    {/* Card 2: Video Lectures */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 border border-[#d4af37]/30 rounded-2xl p-8 group"
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
                    </motion.div>

                    {/* Card 3: Cloud LMS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 border border-[#d4af37]/30 rounded-2xl p-8 group"
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

        </div>
    );
}
