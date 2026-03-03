'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { motion } from 'framer-motion';

export default function LineagePage() {
    const { dict, language } = useLanguage();
    const isEn = language === 'en';

    const lineageData = isEn ? [
        { year: '1852–1919', name: 'Gojong (高宗)', title: 'First Emperor of the Korean Empire', desc: 'The 26th King of Joseon and the first Emperor of the Korean Empire. He proclaimed the Korean Empire in 1897 and promoted modernization.' },
        { year: '1877–1955', name: 'Imperial Prince Uichin (義親王 義剛)', title: 'Fifth son of Emperor Gojong', desc: 'Son of Emperor Gojong, he participated in the independence movement and was a key figure in carrying on the modern history of the royal family.' },
        { year: '1931–2005', name: 'Yi Gu (李 玖)', title: 'Grandson of Imperial Prince Uichin / Son of Crown Prince Yeong', desc: 'Son of Crown Prince Yeong and Lady Yi Bangja, he was the last direct-line Crown Prince of the Korean Imperial Household.' },
        { year: '1962–', name: 'Yi Won (李 源)', title: '5th Crown Prince of the Korean Empire', desc: 'Adopted as the heir of Crown Prince Yi Gu in 2003, inheriting the legitimate succession of the Imperial line. As the current head of the Korean Imperial Household, he is dedicated to the globalization of royal cultural heritage through cultural asset recovery, international exchanges, and planning the Royal Culture Festival.' },
    ] : [
        { year: '1852–1919', name: '고종 (高宗)', title: '대한제국 초대 황제', desc: '조선 제26대 국왕이자 대한제국 초대 황제. 1897년 대한제국을 선포하고 근대화를 추진하였습니다.' },
        { year: '1877–1955', name: '의친왕 의강 (義親王 義剛)', title: '고종의 다섯째 아들', desc: '고종황제의 아들로, 독립운동에 참여하였으며 왕실의 근대 역사를 이어온 핵심 인물입니다.' },
        { year: '1931–2005', name: '이 구 (李 玖)', title: '의친왕의 손자 / 영친왕의 아들', desc: '영친왕과 이방자 여사의 아들로, 대한제국 왕실의 마지막 직계 황태자였습니다.' },
        { year: '1962–', name: '이 원 (李 源)', title: '대한제국 제5대 황태손', desc: '2003년 이 구 황태손의 양자로 입적되어 왕실의 법통을 이은 황사손입니다. 현재 대한제국 왕실의 수장으로서 문화재 환수, 국제 교류, 궁중문화축전 기획 등을 통해 왕실 문화유산의 세계화에 헌신하고 계십니다.' },
    ];

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={dict.pages.crownPrince.lineageTitle} subtitle={dict.pages.crownPrince.lineageDesc} compact />

            {/* Reference Note */}
            <section className="pt-10 pb-0">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <p className="text-gray-500 text-xs">
                        {isEn ? 'Reference: Korean Imperial Cultural Foundation' : '참조: 대한황실문화원'}{' '}
                        <a href="https://www.imperialhouse.kr/sub02/sub02_01.php" target="_blank" rel="noopener noreferrer" className="text-[#d4af37]/60 hover:text-[#d4af37] transition-colors">
                            imperialhouse.kr
                        </a>
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#d4af37]/40 via-[#d4af37]/20 to-transparent" />

                        {lineageData.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                className={`relative flex items-center mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Timeline dot */}
                                <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#050510] z-10 shadow-lg ${i === lineageData.length - 1 ? 'bg-[#d4af37] shadow-[#d4af37]/40 w-5 h-5' : 'bg-[#d4af37]/70 shadow-[#d4af37]/20'}`} />

                                {/* Content */}
                                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                    <div className={`glass-card rounded-xl p-6 ${i === lineageData.length - 1 ? 'border-[#d4af37]/30 !border-2' : ''}`}>
                                        <span className="text-[#d4af37] text-sm font-mono">{item.year}</span>
                                        <h3 className="text-xl font-bold text-white mt-1">{item.name}</h3>
                                        <p className="text-[#d4af37]/80 text-sm mt-1">{item.title}</p>
                                        <p className="text-gray-400 text-sm mt-2 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
