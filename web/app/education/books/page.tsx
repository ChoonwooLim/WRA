'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const bookImages = [
    "k휴먼-평면.jpg", "x9791189141035.jpg", "강궁이옥.jpg", "경영한류.jpg", "고진도사.PNG", "공자와열두.PNG", "그림1.png", "그림10.png", "그림11.jpg", "그림12.jpg", "그림13.jpg", "그림14.jpg", "그림15.png", "그림16.png", "그림17.png", "그림18.png", "그림2.jpg", "그림3.jpg", "그림4.jpg", "그림5.jpg", "그림6.jpg", "그림7.jpg", "그림8.png", "그림9.png", "긍웃2.PNG", "긍정이.PNG", "논어의재구성.jpg", "다산에게배우다.jpg", "아름다운우리한옥.PNG", "옛길.PNG", "인문형인간1.PNG", "인생십계명.PNG", "인생지도.PNG", "장보고.PNG", "징기스칸.jpg", "하브루타_표지.PNG", "한국세계 기록유산.jpg", "한국의세계문화유산.jpg", "한옥마을.PNG", "한옥설계집.png", "환단고기1,2.jpg", "힌옥의 멋.png"
];

export default function BooksGalleryPage() {
    const { dict } = useLanguage();

    // Safely fallback if dict hasn't updated yet or if keys are missing from older dicts
    const title = dict.pages?.education?.textbooksTitle || "발간 서적 및 교재";
    const desc = dict.pages?.education?.textbooksDesc || "세계왕립아카데미 및 유관 기관에서 발간한 도서와 교육 자료들을 소개합니다.";

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner
                title={title}
                subtitle={desc}
            />

            <section className="py-20 relative z-10">
                <div className="container mx-auto px-4 max-w-7xl">
                    <SectionHeader
                        title="Publications"
                        subtitle={title}
                    />

                    {/* Featured Main Book Section */}
                    <div className="mb-16 md:mb-24 rounded-3xl bg-gradient-to-br from-[#1a140a]/90 via-[#0c0903]/90 to-[#050510]/90 border border-[#d4af37]/40 p-8 md:p-16 overflow-hidden relative shadow-[0_10px_50px_rgba(212,175,55,0.15)] flex flex-col md:flex-row items-center gap-12 group backdrop-blur-xl">
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-[#d4af37]/10 to-transparent blur-[80px] pointer-events-none" />

                        {/* Book Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full md:w-2/5 flex justify-center relative z-10 perspective-1000"
                        >
                            <div className="relative">
                                {/* Golden Aura on Hover */}
                                <div className="absolute -inset-6 bg-gradient-to-r from-[#d4af37]/30 via-[#fceda6]/30 to-[#d4af37]/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
                                <img
                                    src="/images/books/MainBook.png"
                                    alt="Representative Main Publication"
                                    className="relative w-full max-w-[340px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-10 rounded-sm group-hover:scale-105 group-hover:rotate-y-6 transition-all duration-700 ease-out"
                                />
                            </div>
                        </motion.div>

                        {/* Book Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full md:w-3/5 relative z-10 text-center md:text-left flex flex-col items-center md:items-start"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-[1px] w-8 bg-[#d4af37]" />
                                <h3 className="text-[#d4af37] text-sm uppercase tracking-[0.4em] font-semibold">대표 서적 (Featured)</h3>
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#fceda6] mb-6 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                                세계왕립아카데미 <br className="hidden md:block" />철학과 비전의 정수
                            </h2>

                            <p className="text-gray-300 text-base md:text-lg leading-[1.8] mb-10 whitespace-pre-line font-light max-w-xl">
                                "한국의 찬란한 왕실 유산과 현대 경영 철학이 만나는 기념비적인 저작입니다.{'\n'}시대를 초월하는 지혜와 글로벌 리더십의 본질을 담아내어, 세상을 이롭게 하는 홍익인간의 가치를 전 세계에 널리 알리고자 합니다."
                            </p>

                            <div className="flex gap-4">
                                <button className="px-8 py-3.5 bg-gradient-to-r from-[#d4af37] to-[#e6c875] text-black hover:scale-105 transition-transform duration-300 rounded-full text-sm tracking-widest uppercase font-bold shadow-[0_4px_20px_rgba(212,175,55,0.4)]">
                                    도서 상세정보
                                </button>
                                <button className="px-8 py-3.5 bg-transparent border border-[#d4af37]/60 text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors duration-300 rounded-full text-sm tracking-widest uppercase font-medium">
                                    목차 보기
                                </button>
                            </div>
                        </motion.div>
                    </div>

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
                                    {/* Using standard img tag for masonry flexibility */}
                                    <img
                                        src={`/images/books/${filename}`}
                                        alt={`Published Book ${idx + 1}`}
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
