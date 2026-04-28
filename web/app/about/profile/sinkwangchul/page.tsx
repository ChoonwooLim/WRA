'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const bookImages = [
    "그림2.png", "그림3.png", "그림1.png", "그림5.png", "그림6.png",
    "그림7.png", "그림8.png", "그림9.png", "그림10.jpg", "그림11.png",
    "그림12.png", "그림13.jpg", "그림14.png", "그림15.png", "그림16.jpg",
    "그림17.jpg", "그림18.png", "그림19.png", "그림20.jpg", "그림21.jpg",
    "그림22.png", "그림23.png", "그림24.png", "그림25.png", "그림26.jpg",
    "그림27.jpg", "그림28.jpg", "그림29.png", "그림30.png", "그림31.jpg",
    "그림32.jpg", "그림33.png", "그림35.png", "그림36.png", "그림37.png",
    "그림38.png"
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
                        title="도서 출판 및 아카데미(강연)"
                        subtitle="Published Works & Academy Lectures by 신광철"
                    />

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 mt-12 pb-20">
                        {bookImages.map((filename, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: (idx % 8) * 0.1 }}
                                className="group relative"
                            >
                                {/* Outer gold frame */}
                                <div className="relative p-[10px] md:p-[14px] rounded-[6px] bg-gradient-to-br from-[#f6e27a] via-[#c9a227] to-[#7a5a0f] shadow-[0_12px_30px_rgba(0,0,0,0.55),0_2px_8px_rgba(212,175,55,0.25)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.65),0_4px_14px_rgba(212,175,55,0.45)]">
                                    {/* Inner bevel ridge */}
                                    <div className="absolute inset-[6px] md:inset-[8px] rounded-[3px] pointer-events-none ring-1 ring-[#3a2a08]/70 shadow-[inset_0_1px_0_rgba(255,235,170,0.55),inset_0_-1px_0_rgba(0,0,0,0.6)]" />
                                    {/* Mat (passe-partout) */}
                                    <div className="relative aspect-[3/4] rounded-[2px] bg-gradient-to-br from-[#15110a] to-[#080604] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                                        <div className="absolute inset-3 md:inset-4 overflow-hidden bg-[#0c0903] rounded-[1px] flex items-center justify-center">
                                            <img
                                                src={`/images/books/sinkwangchul/${filename}`}
                                                alt={`신광철 작가 저서 ${idx + 1}`}
                                                className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                                loading="lazy"
                                            />
                                        </div>
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#050510]/90 via-[#050510]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4 pointer-events-none">
                                            <BookOpen className="w-7 h-7 text-[#d4af37] transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" />
                                        </div>
                                    </div>
                                </div>
                                {/* Floor reflection / shadow */}
                                <div className="mx-auto mt-2 h-2 w-3/4 rounded-full bg-black/60 blur-md opacity-70" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
