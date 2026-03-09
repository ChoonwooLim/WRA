'use client';

import { useState } from 'react';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Crown, MapPin, BookOpen, Landmark, Globe, GraduationCap, Shield, X } from 'lucide-react';
import Link from 'next/link';

export default function CrownPrincePage() {
    const { dict, language } = useLanguage();
    const d = dict.pages.crownPrince;
    const isEn = language === 'en';
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("/images/crown-prince-color.jpg");

    const profileImages = [
        "/images/crown-prince-color.jpg",
        "/images/crown-prince-new.jpg",
        "/images/crown-prince-alt2.jpg",
        "/images/crown-prince-alt3.jpg",
    ];

    const subPages = [
        { icon: <Crown className="w-6 h-6" />, title: d.lineageTitle, desc: d.lineageDesc, href: 'https://www.imperialhouse.kr/sub02/sub02_01.php', external: true },
        { icon: <MapPin className="w-6 h-6" />, title: d.activitiesTitle, desc: d.activitiesDesc, href: '/crown-prince/activities' },
        { icon: <BookOpen className="w-6 h-6" />, title: d.messageTitle, desc: d.heroSubtitle, href: '/crown-prince/message' },
    ];

    const profileSections = [
        {
            icon: <Shield className="w-6 h-6" />,
            title: isEn ? 'Identity & Legitimacy' : '신분 및 정통성',
            subtitle: isEn ? '신분 및 정통성' : 'Identity & Legitimacy',
            desc: isEn
                ? 'The 5th head of the Korean Imperial Household. As a great-grandson of Emperor Gojong and grandson of Imperial Prince Uichin, he was adopted by Crown Prince Yi Gu in 2003, inheriting the legitimate succession of the Imperial line.'
                : '대한제국황실 제5대 수장. 고종황제의 증손이자 의친왕의 손자로, 2003년 이 구 황태손의 양자로 입적되어 황실의 법통을 이은 황사손(황위계승 1순위)입니다.',
        },
        {
            icon: <Landmark className="w-6 h-6" />,
            title: isEn ? 'Royal Rites & Ceremonies' : '제향 주관',
            subtitle: isEn ? '제향 주관' : 'Royal Rites & Ceremonies',
            desc: isEn
                ? 'As the holder of the Imperial ancestral tablets, he serves as the Chief Officiant (the role of the King) at the UNESCO-listed Jongmyo Daeje, Sajik Daeje, and Hwangu Daeje ceremonies.'
                : '황제기증보유자로서 유네스코 세계유산으로 등재된 종묘대제와 사직대제, 그리고 환구대제의 초헌관(국왕의 역할)으로 봉직하고 계십니다.',
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: isEn ? 'Cultural Heritage Restoration' : '문화재 환수 활동',
            subtitle: isEn ? '문화재 환수 활동' : 'Cultural Heritage Restoration',
            desc: isEn
                ? 'Dedicated to recovering royal cultural assets lost overseas during Japanese colonial rule. Notable achievements include the return of Empress Myeongseong\'s painted folding fan (donated to Seoul Museum of History) and other national treasure-class artifacts.'
                : '일제강점기 등 해외로 유출된 황실 문화재 환수에 매진하여, 명성황후의 화조도접선(서울역사박물관 기증), 황실 노리개 등 국보급 문화재를 환수하는 성과를 거두었습니다.',
        },
        {
            icon: <GraduationCap className="w-6 h-6" />,
            title: isEn ? 'International Relations & Cultural Projects' : '대외 교류 및 문화 사업',
            subtitle: isEn ? '대외 교류 및 문화 사업' : 'International Relations & Cultural Projects',
            desc: isEn
                ? 'Engaging in exchanges with royal families of Indonesia, Thailand, and other nations, while promoting the 2027 World Royal Traditional Culture Expo. As President of the Korean Imperial Cultural Foundation, he conceived the \'Royal Culture Festival\' in 2014, developing royal cultural heritage into new Hallyu content.'
                : '인도네시아, 태국 등 해외 황실과 교류하며, 2027년 세계황실전통문화엑스포 개최를 추진하고 있습니다. 사단법인 대한황실문화원 총재로서 2014년 \'궁중문화축전\'을 기획하여 황실 문화유산을 신한류 콘텐츠로 발전시켰습니다.',
        },
    ];

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.heroTitle} subtitle={d.heroSubtitle} />

            {/* Profile Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                        <div className="flex-shrink-0">
                            <div
                                className="relative w-64 h-64 rounded-full border-4 border-[#d4af37]/30 overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.2)] cursor-pointer group"
                                onClick={() => setIsImageModalOpen(true)}
                            >
                                <img
                                    src="/images/crown-prince-new.jpg"
                                    alt="His Imperial Highness Crown Prince Lee Won"
                                    className="w-full h-full object-cover object-top scale-[1.45] origin-top translate-y-6 transition-transform duration-500 group-hover:scale-[1.55]"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white text-sm font-semibold tracking-wider border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm">{isEn ? 'View Full' : '크게 보기'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">{d.fullName}</h2>
                            <p className="text-[#d4af37] text-xl md:text-2xl mb-3">{d.title}</p>
                            <p className="text-gray-500 text-base">皇太子 李 源 殿下, 1962~</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Profile Sections */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="About His Imperial Highness" subtitle="황태손 이원 전하에 대하여" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {profileSections.map((section, i) => (
                            <GlassCard key={i} delay={i * 0.1}>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                                        <div className="text-[#d4af37]">{section.icon}</div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{section.title}</h3>
                                        <p className="text-[#d4af37]/60 text-xs mb-3">{section.subtitle}</p>
                                        <p className="text-gray-400 text-sm leading-relaxed">{section.desc}</p>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Academic Activities */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="h-full rounded-xl overflow-hidden border border-[#d4af37]/20 shadow-lg relative min-h-[300px]">
                            <img
                                src="/images/crown-prince-heritage-new.jpg"
                                alt="Crown Prince Activities"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050510] to-transparent opacity-60" />
                        </div>
                        <GlassCard className="p-10 text-center md:text-left !bg-gradient-to-br !from-[#d4af37]/5 !to-[#d4af37]/0 !border-[#d4af37]/20 h-full flex flex-col justify-center">
                            <GraduationCap className="w-10 h-10 text-[#d4af37] mx-auto md:mx-0 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-3">{isEn ? 'Globalization of Korean Imperial Cultural Heritage' : '조선 대한 황실 문화 계승 발전 세계화'}</h3>
                            <p className="text-[#d4af37]/60 text-sm mb-3">{isEn ? '' : 'Globalization of Korean Imperial Cultural Heritage'}</p>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {isEn
                                    ? 'Through lectures at Columbia University and other global engagements, he is dedicated to the preservation, development, and globalization of the Joseon-Korean Imperial cultural heritage, and committed to promoting Korean royal court culture as a world-class cultural legacy.'
                                    : '미국 컬럼비아대학교 강연 등을 통해 조선 대한 황실 문화의 계승 발전과 세계화를 위해 노력하고 계시며, 한국의 궁중문화를 세계적인 문화유산으로 알리는 데 헌신하고 계십니다.'}
                            </p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Sub-pages */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {subPages.map((item, i) => {
                            const card = (
                                <GlassCard delay={i * 0.1} className="text-center h-full cursor-pointer hover:border-[#d4af37]/50 transition-colors">
                                    <div className="text-[#d4af37] mb-4 flex justify-center">{item.icon}</div>
                                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-400 text-sm">{item.desc}</p>
                                </GlassCard>
                            );
                            return item.external ? (
                                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer">{card}</a>
                            ) : (
                                <Link key={i} href={item.href}>{card}</Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Image Modal */}
            {isImageModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                    onClick={() => setIsImageModalOpen(false)}
                >
                    {/* Modal Box */}
                    <div
                        className="relative bg-[#0a0a20] border border-[#d4af37]/30 rounded-2xl p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] max-w-2xl w-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button (Inside Modal) */}
                        <button
                            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 bg-white/5 hover:bg-white/10 rounded-full z-50"
                            onClick={() => setIsImageModalOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <img
                            src={selectedImage}
                            alt="His Imperial Highness Crown Prince Lee Won (Full Profile)"
                            className="w-full max-w-[320px] md:max-w-[420px] aspect-[61/80] object-cover object-top rounded-xl border-2 border-[#d4af37]/40 shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-opacity duration-300 mb-8 mt-2"
                        />

                        {/* Thumbnail Gallery */}
                        <div className="flex items-center justify-center gap-3 overflow-x-auto max-w-full pb-2 px-2 no-scrollbar bg-black/20 rounded-xl p-3 border border-white/5">
                            {profileImages.map((src, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedImage(src);
                                    }}
                                    className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImage === src
                                        ? 'border-[#d4af37] scale-105 shadow-[0_0_15px_rgba(212,175,55,0.5)] z-10'
                                        : 'border-white/10 hover:border-[#d4af37]/50 opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <div className="absolute inset-0 bg-black/20 pointer-events-none mix-blend-overlay" />
                                    <img src={src} alt={`Profile Option ${i + 1}`} className="w-full h-full object-cover object-top" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
