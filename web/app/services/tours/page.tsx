'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { MapPin, Clock, Users, Landmark, Crown, Globe, X } from 'lucide-react';
import { useState } from 'react';

const palaceTours = [
    {
        name: '경복궁',
        nameEn: 'Gyeongbokgung Palace',
        desc: '조선시대 정궁의 위엄을 체험하는 특별 가이드 투어. 근정전, 경회루, 자경전 등 주요 전각 탐방.',
        highlight: '조선 정궁 · 근정전 · 경회루',
        duration: '3시간', capacity: '15명',
        image: '/images/palaces/gyeongbokgung.png',
        modalImage: '/images/palaces/real-gyeongbokgung.png'
    },
    {
        name: '창덕궁',
        nameEn: 'Changdeokgung Palace',
        desc: 'UNESCO 세계유산으로 등재된 궁궐. 자연과의 조화로운 배치가 돋보이는 비원(후원) 특별 투어.',
        highlight: 'UNESCO 세계유산 · 비원 후원',
        duration: '3시간', capacity: '15명',
        image: '/images/palaces/changdeokgung.png',
        modalImage: '/images/palaces/real-changdeokgung.png'
    },
    {
        name: '덕수궁',
        nameEn: 'Deoksugung Palace',
        desc: '대한제국의 역사가 살아 숨 쉬는 근대 황실 투어. 석조전과 서양식 정원이 특징.',
        highlight: '대한제국 · 석조전 · 서양식 정원',
        duration: '2시간', capacity: '15명',
        image: '/images/palaces/deoksugung.png',
        modalImage: '/images/palaces/real-deoksugung.png'
    },
    {
        name: '창경궁',
        nameEn: 'Changgyeonggung Palace',
        desc: '왕과 왕비의 생활궁궐. 대온실 등 근대적 시설과 전통 건축이 공존하는 독특한 공간.',
        highlight: '생활궁궐 · 대온실',
        duration: '2시간', capacity: '15명',
        image: '/images/palaces/changgyeonggung.png',
        modalImage: '/images/palaces/real-changgyeonggung.png'
    },
    {
        name: '경희궁',
        nameEn: 'Gyeonghuigung Palace',
        desc: '서궐(西闕)로 불리던 도심 속 왕궁. 조선 후기 왕실의 역사와 건축미를 느낄 수 있습니다.',
        highlight: '서궐 · 도심 속 왕궁',
        duration: '1.5시간', capacity: '20명',
        image: '/images/palaces/gyeonghuigung.png',
        modalImage: '/images/palaces/real-gyeonghuigung.png'
    },
];

const ceremonyTours = [
    {
        name: '종묘대제',
        nameEn: 'Jongmyo Daeje',
        desc: 'UNESCO 세계무형유산으로 등재된 조선왕조 역대 왕과 왕비의 신위를 모신 종묘에서 거행되는 대제. 황태손 이원 전하가 초헌관으로 봉직.',
        highlight: 'UNESCO 세계무형유산',
        duration: '반일', capacity: '특별 초대',
    },
    {
        name: '사직대제',
        nameEn: 'Sajik Daeje',
        desc: '토지의 신(사, 社)과 곡식의 신(직, 稷)에게 올리는 국가 제향. 나라의 안녕과 풍요를 기원하는 전통 의례.',
        highlight: '토지신 · 곡식신 제향',
        duration: '반일', capacity: '특별 초대',
    },
    {
        name: '환구대제',
        nameEn: 'Hwangu Daeje',
        desc: '대한제국 고유의 황제 의례. 하늘에 제사를 올리는 천제로, 황제국으로서의 위상을 보여주는 대규모 의식.',
        highlight: '대한제국 황제의례 · 천제',
        duration: '반일', capacity: '특별 초대',
    },
];

const museumTours = [
    {
        name: '국립고궁박물관',
        nameEn: 'National Palace Museum of Korea',
        desc: '조선왕실과 대한제국 황실의 유물을 만나는 프리미엄 투어. 왕실의 의례, 생활, 예술 문화를 체험합니다.',
        duration: '2시간', capacity: '20명',
    },
    {
        name: '대한제국역사관',
        nameEn: 'Korean Empire History Museum',
        desc: '대한제국의 역사를 집중 조명하는 특별 전시. 근대 황실의 외교, 군사, 문화 활동을 소개합니다.',
        duration: '1.5시간', capacity: '20명',
    },
    {
        name: '국립중앙박물관',
        nameEn: 'National Museum of Korea',
        desc: '한국의 5천년 역사와 문화유산을 총망라하는 세계적 규모의 박물관. 왕실 유물 특별 관람 프로그램.',
        duration: '3시간', capacity: '15명',
    },
    {
        name: '국립민속박물관',
        nameEn: 'National Folk Museum of Korea',
        desc: '한국인의 일상생활, 의식주, 세시풍속을 전시. 왕실과 민간 문화의 교류를 이해하는 특별 투어.',
        duration: '2시간', capacity: '20명',
    },
    {
        name: '서울역사박물관',
        nameEn: 'Seoul Museum of History',
        desc: '서울의 역사를 조명하는 박물관. 조선시대 한양에서 대한제국 수도까지의 변천사를 탐구합니다.',
        duration: '2시간', capacity: '20명',
    },
    {
        name: '주미대한제국공사관',
        nameEn: 'Old Korean Legation in Washington D.C.',
        desc: '미국 워싱턴에 위치한 대한제국 외교의 현장. 1889년 설립되어 한국 근대 외교의 상징적 공간.',
        duration: '2시간', capacity: '10명',
    },
];

function TourCard({ tour, index, onImageClick }: { tour: any; index: number; onImageClick?: (img: string, title: string) => void }) {
    return (
        <GlassCard delay={index * 0.08}>
            <div className="flex flex-col h-full -mx-6 -mt-6">
                {tour.image && (
                    <div
                        className="relative h-56 w-full overflow-hidden cursor-pointer group shrink-0"
                        onClick={() => onImageClick && onImageClick(tour.modalImage || tour.image, tour.name)}
                    >
                        <img src={tour.image} alt={tour.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/50">
                            <span className="text-[#d4af37] font-semibold tracking-wider text-sm px-4 py-2 border border-[#d4af37]/50 rounded-full backdrop-blur-md bg-black/40 shadow-lg">크게 보기</span>
                        </div>
                    </div>
                )}
                <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-1">{tour.name}</h3>
                    <p className="text-[#d4af37]/60 text-xs mb-2">{tour.nameEn}</p>
                    {'highlight' in tour && (
                        <div className="inline-block self-start px-2 py-1 rounded-md bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-xs mb-3">
                            {(tour as any).highlight}
                        </div>
                    )}
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-grow">{tour.desc}</p>
                    <div className="flex items-center gap-4 text-gray-500 text-xs mt-auto pt-4 border-t border-white/5">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {tour.duration}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {tour.capacity}</span>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}

export default function ToursPage() {
    const { dict } = useLanguage();
    const d = dict.pages.services;
    const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.toursTitle} subtitle={d.toursDesc} />

            {/* 5 Palaces Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <SectionHeader
                        title="5대궁 투어"
                        subtitle="Royal Palaces of Seoul — 서울의 5대 궁궐 프리미엄 투어"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {palaceTours.map((t, i) => (
                            <TourCard key={i} tour={t} index={i} onImageClick={(src, title) => setSelectedImage({ src, title })} />
                        ))}
                        {/* 6th Slot: Palace Map Infographic */}
                        <GlassCard delay={palaceTours.length * 0.08}>
                            <div className="flex flex-col h-full -mx-6 -mt-6">
                                <div
                                    className="relative h-56 w-full overflow-hidden cursor-pointer group shrink-0"
                                    onClick={() => setSelectedImage({ src: '/images/palaces/palaces-map.png', title: '서울 5대궁 안내도 (Map of 5 Royal Palaces)' })}
                                >
                                    <img src="/images/palaces/palaces-map.png" alt="Map of 5 Royal Palaces" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/50">
                                        <span className="text-[#d4af37] font-semibold tracking-wider text-sm px-4 py-2 border border-[#d4af37]/50 rounded-full backdrop-blur-md bg-black/40 shadow-lg">크게 보기</span>
                                    </div>
                                </div>
                                <div className="p-6 flex-grow flex flex-col items-center justify-center text-center">
                                    <MapPin className="w-8 h-8 text-[#d4af37] mb-3 opacity-80" />
                                    <h3 className="text-lg font-bold text-white mb-1">서울 5대궁 안내도</h3>
                                    <p className="text-[#d4af37]/60 text-xs mb-3">Map of the 5 Royal Palaces</p>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        경복궁, 창덕궁, 덕수궁, 창경궁, 경희궁의 전체 위치를 한눈에 확인할 수 있는 스페셜 안내 지도입니다.
                                    </p>
                                    <button
                                        className="mt-6 px-4 py-2 rounded-full border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold hover:bg-[#d4af37]/10 transition-colors"
                                        onClick={() => setSelectedImage({ src: '/images/palaces/palaces-map.png', title: '서울 5대궁 안내도 (Map of 5 Royal Palaces)' })}
                                    >
                                        지도 크게 보기
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Ceremonies Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <SectionHeader
                        title="대제 (Royal Ceremonies)"
                        subtitle="대한제국 황실의 전통 제향 — 황태손 전하가 초헌관으로 봉직하시는 국가 의례"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {ceremonyTours.map((t, i) => (
                            <TourCard key={i} tour={t} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Museums Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <SectionHeader
                        title="박물관 투어"
                        subtitle="Museums & Historical Sites — 왕실 문화유산을 만나는 프리미엄 박물관 투어"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {museumTours.map((t, i) => (
                            <TourCard key={i} tour={t} index={i} />
                        ))}
                    </div>
                </div>
            </section>
            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 p-3 rounded-full transition-colors z-[110]"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div
                        className="relative max-w-5xl max-h-[90vh] w-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-[#050510] border-2 border-[#d4af37]/30 rounded-2xl p-2 relative">
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
                            />
                            <div className="absolute bottom-4 left-4 right-4 p-6 bg-gradient-to-t from-black via-black/80 to-transparent rounded-b-xl pointer-events-none">
                                <h3 className="text-3xl font-bold text-[#d4af37] tracking-wider mb-1">{selectedImage.title}</h3>
                                <p className="text-white/70">World Royal Academy Premium Tour</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
