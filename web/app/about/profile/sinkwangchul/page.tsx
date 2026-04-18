'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const bookImages = [
    "k휴먼-평면.jpg", "x9791189141035.jpg", "강궁이옥.jpg", "경영한류.jpg",
    "고진도사.PNG", "공자와열두.PNG", "그림1.png", "그림10.png", "그림11.jpg",
    "그림12.jpg", "그림13.jpg", "그림14.jpg", "그림15.png", "그림16.png",
    "그림17.png", "그림18.png", "그림2.jpg", "그림3.jpg", "그림4.jpg",
    "그림5.jpg", "그림6.jpg", "그림7.jpg", "그림8.png", "그림9.png",
    "긍웃2.PNG", "긍정이.PNG", "논어의재구성.jpg", "다산에게배우다.jpg",
    "아름다운우리한옥.PNG", "옛길.PNG", "인문형인간1.PNG", "인생십계명.PNG",
    "인생지도.PNG", "장보고.PNG", "징기스칸.jpg", "하브루타_표지.PNG",
    "한국세계 기록유산.jpg", "한국의세계문화유산.jpg", "한옥마을.PNG",
    "한옥설계집.png", "환단고기1,2.jpg", "힌옥의 멋.png"
];

export default function SinkwangchulProfilePage() {
    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner
                title="신광철 작가 프로필"
                subtitle="한국문화창조학교 교장 · 작가"
            />

            <section className="py-20 relative z-10">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="mb-16 md:mb-24 rounded-3xl bg-gradient-to-br from-[#1a140a]/90 via-[#0c0903]/90 to-[#050510]/90 border border-[#d4af37]/40 p-8 md:p-16 shadow-[0_10px_50px_rgba(212,175,55,0.15)] backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-[1px] w-8 bg-[#d4af37]" />
                            <h3 className="text-[#d4af37] text-sm uppercase tracking-[0.4em] font-semibold">Profile</h3>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif text-[#fceda6] mb-6 leading-tight">
                            한국문화창조학교 교장 · 신광철
                        </h2>
                        <p className="text-gray-300 text-base md:text-lg leading-[1.9] font-light max-w-4xl">
                            작가 신광철은 한국의 역사·문화·인문학을 넘나들며
                            다수의 저작을 통해 한국인의 정체성과 문화 유전자를 탐구해온 창작자입니다.
                            한국문화창조학교의 교장으로서 한류 문화 보급과 인재 육성의 거점을
                            세우는 데 앞장서고 있습니다.
                        </p>
                        <div className="mt-8 flex items-center gap-6 text-[#d4af37]/80 text-sm">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="w-5 h-5" />
                                <span>한국문화창조학교 교장</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5" />
                                <span>저서 {bookImages.length}권 이상</span>
                            </div>
                        </div>
                    </div>

                    <SectionHeader
                        title="저서 모음"
                        subtitle="Published Works by 신광철"
                    />

                    <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 mt-12 pb-20">
                        {bookImages.map((filename, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: (idx % 8) * 0.1 }}
                                className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-[#d4af37]/20 bg-[#0c0f17] flex justify-center items-center"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 z-10 flex flex-col justify-end p-4">
                                    <BookOpen className="w-8 h-8 text-[#d4af37] mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" />
                                </div>
                                <div className="relative w-full">
                                    <img
                                        src={`/images/books/${filename}`}
                                        alt={`신광철 작가 저서 ${idx + 1}`}
                                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="absolute inset-0 border-2 border-[#d4af37] opacity-0 group-hover:opacity-30 rounded-xl transition-opacity duration-300 pointer-events-none z-20" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
