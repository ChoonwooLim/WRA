'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { motion } from 'framer-motion';
import {
    Landmark,
    Rocket,
    GraduationCap,
    Flag,
    Sparkles,
    Globe,
    BookOpen,
    Library,
    Palette,
} from 'lucide-react';

type Bullet = string | { heading: string; items: string[] };

type Milestone = {
    year: string;
    title: string;
    points: Bullet[];
    icon: React.ReactNode;
};

const milestonesKo: Milestone[] = [
    {
        year: '1990',
        title: '「대중음악의 산업화」 발표',
        points: ['문화산업의 경제적 가치 및 산업화 방향 국내 최초 제시'],
        icon: <Rocket className="w-6 h-6" />,
    },
    {
        year: '1995',
        title: '한국형 창업·리더십 연구',
        points: [
            '한국인의 창업가 정신 및 글로벌 리더십 연구·개발',
            '중소기업연구원 공동연구 — 여성 일자리 창출을 위한 선진국 여성창업 아이템 발굴 및 사업화 방안 연구',
            '해외 뉴 비즈니스의 한국형 모델 개발',
        ],
        icon: <Landmark className="w-6 h-6" />,
    },
    {
        year: '2011. 10',
        title: '한국문화창조 아카데미 1기 개강',
        points: ['한국학연구소 주최', '인적자원개발(HRD) 및 한국형 인재육성 체계 구축'],
        icon: <GraduationCap className="w-6 h-6" />,
    },
    {
        year: '2015. 11',
        title: '한국문화창조학교 창설 및 개교',
        points: [
            '「사람 안에 문화, 문화 안에 사람」',
            '위대한 한국과 위대한 한국인의 문화유전자를 품다',
            '한국인의 정체성을 확립하고 한류문화를 보급하는 거점이 되고자 한다',
        ],
        icon: <Flag className="w-6 h-6" />,
    },
    {
        year: 'Vision',
        title: '미래 비전 제시',
        points: [
            '「200년의 익숙한 것들과의 이별」 시대 선언',
            '창작·창직·창업 — 자기 스스로 고용 (Self-Employment)',
            '글로벌 임팩트 스타트업 — 비상장 기업 1인 유니콘 기업 (10억 달러) 육성',
            '인간의 모든 능력을 초월하는 AGI(범용인공지능) 시대 — 조용한 질문 혁명 비전 제시 (독서 + 글쓰기)',
            '한·아세안 순방 출정식 — 필리핀 일로일로 콘셉션시 폴리테크닉 칼리지 강연 (주제: 한국인의 창조적 DNA와 BTS)',
            '한국형 인문학 개발 — 긍정이와 웃음이 캐릭터 공모 / 철학마을 / 긍정이와 웃음이 마음공부 여행 (사유 + 성찰 + 각성) / 꿈은 이루어서 자신에게 선물하는 거야',
            'AI 브레인헬스연구소 — 뉴로피드백 기술 기반 / 뇌 과학 명상치유 프로그램 개발',
        ],
        icon: <Sparkles className="w-6 h-6" />,
    },
    {
        year: '2026. 03  ·  2025–2030',
        title: '프로젝트 경영한류 — 한국인의 창조, 안으로 세계화',
        points: [
            '비전 선포 및 세계왕립아카데미 · 세계왕립헤리티지 설립 출범식',
            '문화강국을 넘어 문명의 중심 대한민국',
            '국가 브랜드 K-HUMAN 전략',
            'K-컬처 하이브리드 소프트웨어 산업화',
            '전통·기술 융합 플랫폼 구축',
            'K-로얄 헤리티지 기반 공공외교 거버넌스 — 세계 왕실·황실 및 전통문화 기관 협력 네트워크',
            '글로벌 청년 K-뉴 리더십 프로그램 운영 — 문화·지식 외교 통합 프로젝트 추진',
            'K-로얄 헤리티지 기반 학문·산업 연계',
        ],
        icon: <Globe className="w-6 h-6" />,
    },
    {
        year: '2026. 10',
        title: 'K-Edupop',
        points: [
            {
                heading: 'K-HUMAN 캠퍼스',
                items: [
                    'IBT토픽 (한국어능력시험) 모의고사',
                    '한국인문학',
                    '한국학',
                    '글쓰기',
                    '책쓰기',
                ],
            },
        ],
        icon: <BookOpen className="w-6 h-6" />,
    },
    {
        year: '2027. 10',
        title: 'K-라이브러리',
        points: [
            '세계 최초 실시간 MARC 자동 생성 시스템 구축',
            'The World’s First Real-Time MARC Solution',
            {
                heading: 'E-CIP (Electronic Cataloging in Publication)',
                items: [
                    '국내·외 7개국 약 2,400만 종 도서 정보 보유',
                    '도서관 소장 도서의 복본 상태 실시간 표시',
                    '약 1억 1천만 종 논문 및 저널의 90% 제공',
                ],
            },
        ],
        icon: <Library className="w-6 h-6" />,
    },
    {
        year: '2027. 11',
        title: '세계왕실문화엑스포',
        points: [
            '세계왕실문화엑스포 개최',
            '세계왕실 비엔날레 & 인터렉티브 아트 전시',
        ],
        icon: <Palette className="w-6 h-6" />,
    },
];

const milestonesEn: Milestone[] = [
    {
        year: '1990',
        title: 'Publication of “The Industrialization of Popular Music”',
        points: ['First Korean proposal to articulate the economic value of the cultural industry and a roadmap for its industrialization'],
        icon: <Rocket className="w-6 h-6" />,
    },
    {
        year: '1995',
        title: 'Korean Entrepreneurship & Leadership Research',
        points: [
            'Research on Korean entrepreneurial spirit and global leadership',
            'Joint research with the Korea Small Business Institute — discovering women’s startup ideas from advanced economies and crafting commercialization strategies for women’s job creation',
            'Developing Korean-style models for overseas new-business ventures',
        ],
        icon: <Landmark className="w-6 h-6" />,
    },
    {
        year: 'Oct 2011',
        title: 'Inaugural Class of the Korea Culture Creation Academy',
        points: ['Hosted by the Institute of Korean Studies', 'Establishing HRD and Korean-style talent development systems'],
        icon: <GraduationCap className="w-6 h-6" />,
    },
    {
        year: 'Nov 2015',
        title: 'Founding & Opening of the Korea Culture Creation School',
        points: [
            '“Culture within people, people within culture.”',
            'Embracing the cultural DNA of a great Korea and a great Korean people',
            'Aspiring to be a hub that establishes Korean identity and shares Hallyu culture with the world',
        ],
        icon: <Flag className="w-6 h-6" />,
    },
    {
        year: 'Vision',
        title: 'A Vision for the Future',
        points: [
            'Declaring the era of “Parting with Two Centuries of the Familiar”',
            'Creation · Job-creation · Entrepreneurship — Self-Employment',
            'Global Impact Startups — cultivating private one-person unicorns ($1B)',
            'In the AGI era that transcends all human capabilities — a vision for a quiet revolution of questions (Reading + Writing)',
            'Korea–ASEAN tour kickoff — lecture at Polytechnic College in Concepción, Iloilo, Philippines (Topic: Korea’s creative DNA and BTS)',
            'Developing Korean-style humanities — Geungjeong & Useum character contest / Philosophy Village / “The Mind-Study Journey of Geungjeong & Useum” (reflection + introspection + awakening) / “Dreams are gifts you give yourself by making them come true.”',
            'AI Brain Health Research Center — neurofeedback-based / brain-science meditation healing programs',
        ],
        icon: <Sparkles className="w-6 h-6" />,
    },
    {
        year: 'Mar 2026  ·  2025–2030',
        title: 'Project Hallyu Management — Korea’s Creation, Globalized from Within',
        points: [
            'Vision proclamation and inauguration of World Royal Academy & World Royal Heritage',
            'Beyond a cultural power — Korea at the center of civilization',
            'K-HUMAN national-brand strategy',
            'Industrialization of K-Culture hybrid software',
            'Building a tradition–technology fusion platform',
            'K-Royal Heritage public-diplomacy governance — partnership network with global royal, imperial, and traditional-culture institutions',
            'Global Youth K-New Leadership Program — integrated cultural and knowledge diplomacy projects',
            'K-Royal Heritage academic–industrial collaboration',
        ],
        icon: <Globe className="w-6 h-6" />,
    },
    {
        year: 'Oct 2026',
        title: 'K-Edupop',
        points: [
            {
                heading: 'K-HUMAN Campus',
                items: [
                    'IBT TOPIK (Test of Proficiency in Korean) Mock Test',
                    'Korean Humanities',
                    'Korean Studies',
                    'Writing',
                    'Book Writing',
                ],
            },
        ],
        icon: <BookOpen className="w-6 h-6" />,
    },
    {
        year: 'Oct 2027',
        title: 'K-Library',
        points: [
            'Building the world’s first real-time automated MARC generation system',
            'The World’s First Real-Time MARC Solution',
            {
                heading: 'E-CIP (Electronic Cataloging in Publication)',
                items: [
                    '~24 million bibliographic records across 7 countries',
                    'Real-time display of duplicate-copy status for library holdings',
                    '90% of ~110 million academic papers and journals',
                ],
            },
        ],
        icon: <Library className="w-6 h-6" />,
    },
    {
        year: 'Nov 2027',
        title: 'World Royal Culture Expo',
        points: [
            'Hosting the World Royal Culture Expo',
            'World Royal Biennale & Interactive Art Exhibition',
        ],
        icon: <Palette className="w-6 h-6" />,
    },
];

export default function ProgressReportPage() {
    const { language } = useLanguage();
    const ko = language === 'ko';
    const milestones = ko ? milestonesKo : milestonesEn;
    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner
                title={ko ? '한국문화창조학교 및 세계왕립아카데미 추진 경과보고' : 'Progress Report — Korea Culture Creation School & World Royal Academy'}
                subtitle={ko ? 'Progress Report — Korea Culture Creation School & World Royal Academy' : '한국문화창조학교 및 세계왕립아카데미 추진 경과보고'}
            />

            <section className="py-20 relative z-10">
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Founder card */}
                    <div className="mb-20 rounded-3xl bg-gradient-to-br from-[#1a140a]/90 via-[#0c0903]/90 to-[#050510]/90 border border-[#d4af37]/40 p-8 md:p-12 shadow-[0_10px_50px_rgba(212,175,55,0.15)] backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="h-[1px] w-8 bg-[#d4af37]" />
                            <h3 className="text-[#d4af37] text-sm uppercase tracking-[0.4em] font-semibold">Founder</h3>
                        </div>
                        <ul className="space-y-2 text-[#fceda6] font-serif text-lg md:text-2xl leading-snug mb-5">
                            <li>{ko ? '한국문화창조학교 대표' : 'President, Korea Culture Creation School'} <span className="text-[#d4af37]/80 text-base md:text-lg ml-1">{ko ? '(창설자)' : '(Founder)'}</span></li>
                            <li>{ko ? '세계왕립아카데미' : 'World Royal Academy'} <span className="text-[#d4af37]/80 text-base md:text-lg ml-1">{ko ? '(창설자)' : '(Founder)'}</span></li>
                            <li>{ko ? '세계왕립헤리티지' : 'World Royal Heritage'} <span className="text-[#d4af37]/80 text-base md:text-lg ml-1">{ko ? '(창설자)' : '(Founder)'}</span></li>
                        </ul>
                        <div className="flex items-baseline gap-3 pt-4 border-t border-[#d4af37]/20">
                            <span className="text-[#d4af37] text-sm md:text-base tracking-widest">{ko ? '설립 위원장' : 'Founding Chairman'}</span>
                            <span className="text-[#fceda6] text-2xl md:text-3xl font-bold tracking-[0.2em]">
                                {ko ? '이호종' : 'Lee Ho-jong'}
                                <span className="ml-2 text-sm md:text-base font-normal tracking-normal text-[#d4af37]/80">
                                    {ko ? '(교육 운동가)' : '(Education Activist)'}
                                </span>
                            </span>
                        </div>
                    </div>

                    <SectionHeader
                        title={ko ? '추진 연혁' : 'Key Milestones'}
                        subtitle="Key Milestones"
                    />

                    <div className="relative mt-16">
                        {/* Vertical line */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#d4af37]/80 via-[#d4af37]/40 to-transparent" />

                        <div className="space-y-12">
                            {milestones.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    transition={{ duration: 0.6, delay: i * 0.05 }}
                                    className={`relative flex flex-col md:flex-row ${
                                        i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    } items-start gap-6 md:gap-12`}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8932a] flex items-center justify-center text-black shadow-[0_0_20px_rgba(212,175,55,0.5)] z-10">
                                        {m.icon}
                                    </div>

                                    <div className="pl-20 md:pl-0 md:w-1/2 md:px-12">
                                        <div className="rounded-2xl bg-[#0f111a]/90 border border-[#d4af37]/30 p-6 md:p-8 backdrop-blur-md shadow-lg hover:border-[#d4af37]/60 transition-all">
                                            <div className="text-[#d4af37] font-bold text-sm tracking-[0.3em] mb-3">
                                                {m.year}
                                            </div>
                                            <h3 className="text-[#fceda6] text-xl md:text-2xl font-serif mb-4 leading-snug">
                                                {m.title}
                                            </h3>
                                            <ul className="space-y-2">
                                                {m.points.map((p, j) =>
                                                    typeof p === 'string' ? (
                                                        <li key={j} className="text-gray-300 text-sm md:text-base leading-relaxed flex items-start gap-2">
                                                            <span className="text-[#d4af37] mt-1 shrink-0">•</span>
                                                            <span>{p}</span>
                                                        </li>
                                                    ) : (
                                                        <li key={j} className="space-y-1.5 pt-1">
                                                            <div className="flex items-start gap-2">
                                                                <span className="text-[#d4af37] mt-1 shrink-0">•</span>
                                                                <span className="text-[#e6c875] font-semibold text-base md:text-lg">{p.heading}</span>
                                                            </div>
                                                            <ul className="ml-5 space-y-1">
                                                                {p.items.map((item, k) => (
                                                                    <li key={k} className="text-gray-400 text-sm leading-relaxed flex items-start gap-2">
                                                                        <span className="text-[#d4af37]/60 mt-[5px] shrink-0 text-[10px]">◦</span>
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
