'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { BookOpen, GraduationCap, Compass, Sparkles, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';

/** Parse **bold** markers into golden styled React elements */
function renderHighlighted(text: string): React.ReactNode[] {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <span key={i} className="text-[#d4af37] font-semibold">
                    {part.slice(2, -2)}
                </span>
            );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
    });
}

export default function StudiesPage() {
    const { dict } = useLanguage();
    const d = dict.pages.education;
    const [openStep, setOpenStep] = useState<number | null>(null);
    const [openKStudy, setOpenKStudy] = useState<number | null>(null);

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.studiesTitle} subtitle={d.studiesDesc} compact />

            <section className="py-14 relative overflow-hidden bg-gradient-to-b from-[#050510] to-[#0a0f25]">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="container mx-auto px-4 max-w-6xl relative z-10">

                    {/* 한국학을 공부해야 하는 이유 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37] mb-10 text-center">
                            한국학을 공부해야 하는 이유
                        </h3>

                        <div className="space-y-10 text-gray-300 text-base md:text-lg leading-[2] break-keep">

                            {/* 한민족은 누구인가 */}
                            <div className="space-y-4">
                                <h4 className="text-[#d4af37] text-lg md:text-xl font-semibold flex items-center gap-2">
                                    <span className="w-8 h-px bg-[#d4af37]/50 shrink-0" />
                                    한민족은 누구인가
                                </h4>
                                <p>한국인에게 필요한 것은 한국인은 어떤 정신을 가진 사람들인가에 대한 성찰이다. 한국인은 역사를 잃어버렸고 정신을 파괴당했기 때문이다.</p>
                                <p>우리의 건국이념에 담겨있는 정신을 강제로 잃어버렸다. 우리의 역사를 빼앗겼다. 동북아의 역사는 역사쟁탈의 역사였다. 역사가 중요하게 작동한 이유는 역사에 최고권력자가 가져야 할 권능이 들어있기 때문이다. 패권국가의 왕이 가져야 할 덕목이 들어있기 때문이다.</p>
                                <p>동북아에서는 왕은 하늘이 내린다는 신성을 중요하게 가졌다. 그것이 바로 천손사상이다. 하늘이 내린 천손만이 왕이 될 수 있었다. 왕이 된 자는 천손의 후손이고 천손 중에 하늘에 지명받아 왕이 되었다는 당위를 가져야 했다. 동북아 역사의 장자인 한민족이 박해를 받고 역사를 쟁탈당한 이유가 여기에 있다.</p>
                                <p>한국학은 한국인의 근원정신과 기질을 다루는 학문이다. 또한 한국인의 행동양식과 문화를 공부하는 학문이다. 한국인에게 한국학은 &lsquo;나&rsquo;와 &lsquo;한국&rsquo;을 이해하는 출발점이자 귀착지이다. 세상을 재는 척도가 나 자신이고 내 나라이기 때문이다. 나를 알아야 남을 이해할 수 있다. 내 나라를 알아야 다른 나라를 이해할 수 있다.</p>
                            </div>

                            {/* 위대한 선각자들이 개국한 정신의 나라 */}
                            <div className="space-y-4">
                                <h4 className="text-[#d4af37] text-lg md:text-xl font-semibold flex items-center gap-2">
                                    <span className="w-8 h-px bg-[#d4af37]/50 shrink-0" />
                                    위대한 선각자들이 개국한 정신의 나라
                                </h4>
                                <p>개국을 한 사람들은 두 개의 선진문화를 가진 사람들이었다. 하나는 하늘의 운행원리를 체득한 천문문화를 가진 사람들이었고 또 하나는 몸과 마음을 바로 보는 수행문화의 선각자들이었다.</p>
                                <p>선진문화로 무장한 사람들이 나라를 세워 건국정신으로 내세운 것이 홍익정신이다. 홍익정신의 핵심은 하늘의 법을 사람이 몸과 맘으로 받아들여 몸과 맘이 밝아지는 것을 말한다. 더욱 밝아진 사람이 홍익인간이다. 더욱 밝아진 정신으로 이 땅에 하늘과 같이 완성된 세상을 만들어내는 것이 바로 재세이화이다.</p>
                                <p>한국학을 공부한다는 것은 우리의 건국이념에 대한 정신을 배우고 나라를 세운 사람들이 가졌던 천문과 수행을 통해 나를 이해하고, 내 나라를 파악할 수 있는 기본도구를 갖게 하는 출발이다. 한국의 역사를 배우고 한국인을 배워야 하는 이유다.</p>
                            </div>

                            {/* 한국인의 양 극단 */}
                            <div className="space-y-4">
                                <h4 className="text-[#d4af37] text-lg md:text-xl font-semibold flex items-center gap-2">
                                    <span className="w-8 h-px bg-[#d4af37]/50 shrink-0" />
                                    한국인의 양 극단
                                </h4>
                                <p>한국인은 양 극단을 가지고 있다. 서두르는 냄비 근성과 느긋한 뚝배기 근성. 기질적으로는 슬픔의 한과 기쁨의 흥을 가지고 있다. 서로 다른 대척점에 있는 정신을 함께 가지고 있는 것이 특별하다. 극단을 이해함으로써 중간지대를 이해하는 것이 한국인이다. 결국 전체를 이해하는 종합력과 통찰력을 가지고 있다. 바로 여기에서 한국인의 문제해결능력과 창조능력이 발휘된다.</p>
                            </div>

                            {/* 한류의 전력 */}
                            <div className="space-y-4">
                                <h4 className="text-[#d4af37] text-lg md:text-xl font-semibold flex items-center gap-2">
                                    <span className="w-8 h-px bg-[#d4af37]/50 shrink-0" />
                                    한류의 전력
                                </h4>
                                <p>한민족은 이미 고대에 한류문화를 탄생시켰던 전력을 가지고 있다. 천문과 수행으로 &lsquo;나&rsquo;와 &lsquo;세상&rsquo;을 이해하고 있었던 선진문화의 주역들이었다. 천문을 통해 천자인사상을 태동시켰고 음양오행이라는 동양정신의 뼈대를 만들어냈다. 거기에 세계 최초의 청동기문화를 출발시켰던 위대한 민족이었다.</p>
                                <p>디지털(반도체) 분야의 선두나 게임 그리고 K-pop(BTS·데몬 헌터스) 등이 탄생하는 이유다. 그동안 우리 민족에게 아쉬웠던 개인의 자유가 만개하면서 문화를 다시 만들어가고 있다. 한민족의 두 번째 한류이다.</p>
                            </div>

                            {/* 결론 */}
                            <div className="glass-card rounded-xl p-6 md:p-8 !bg-[#d4af37]/10 !border-[#d4af37]/25 text-center mt-4">
                                <p className="text-white text-lg md:text-xl font-medium leading-[2]">
                                    한국인을 이해하면 한국의 현상이 보이고, 한국인의 행동양식이 보인다.<br />
                                    그리고 세상을 이해하는 첫 열쇠가 한국학에 있다.<br />
                                    <span className="text-[#d4af37] font-semibold">한국학을 배워야 하는 이유다.</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Divider */}
            <div className="relative py-4 bg-[#0a0f25]">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
                </div>
                <div className="relative flex justify-center">
                    <div className="bg-[#0a0f25] px-6 text-[#d4af37]">
                        <Brain className="w-8 h-8 opacity-80" />
                    </div>
                </div>
            </div>

        </div>
    );
}
