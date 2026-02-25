'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { MapPin, Clock, Users, Landmark, Crown, Globe, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        desc: '대한제국의 역사가 살아 숨 쉬는 근대 왕실 투어. 석조전과 서양식 정원이 특징.',
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
        duration: '매년', capacity: '특별 초대',
        image: '/images/tours/ceremonies/jongmyo_daeje_1771719234508.png',
        modalImage: '/images/tours/ceremonies/jongmyo_daeje_1771719234508.png'
    },
    {
        name: '사직대제',
        nameEn: 'Sajik Daeje',
        desc: '토지의 신(사, 社)과 곡식의 신(직, 稷)에게 올리는 국가 제향. 나라의 안녕과 풍요를 기원하는 신동 의례.',
        highlight: '토지신 · 곡식신 제향',
        duration: '매년', capacity: '특별 초대',
        image: '/images/tours/ceremonies/sajik_daeje_1771719257413.png',
        modalImage: '/images/tours/ceremonies/sajik_daeje_1771719257413.png'
    },
    {
        name: '환구대제',
        nameEn: 'Hwangu Daeje',
        desc: '대한제국 고유의 황제 의례. 하늘에 제사를 올리는 천제로, 황제국으로서의 위상을 보여주는 대규모 의식.',
        highlight: '대한제국 황제의례 · 선제',
        duration: '매년', capacity: '특별 초대',
        image: '/images/tours/ceremonies/hwangu_daeje_1771719276005.png',
        modalImage: '/images/tours/ceremonies/hwangu_daeje_1771719276005.png'
    },
];

const museumTours = [
    {
        name: '국립고궁박물관',
        nameEn: 'National Palace Museum of Korea',
        desc: '조선왕실과 대한제국 왕실의 역사를 집대성한 보물창고. 어보, 순종황제 어차 등 왕실의 눈물이 배어 있는 역사적 유물 전시.',
        highlight: '조선·대한제국 왕실 보물창고',
        duration: '2시간', capacity: '20명',
        image: '/images/tours/museums/national_palace_museum_1771721177147.png',
        modalImage: '/images/tours/museums/national_palace_museum_1771721177147.png'
    },
    {
        name: '서울역사박물관',
        nameEn: 'Seoul Museum of History',
        desc: '경희궁 터에 자리한 박물관. 알렌 컬렉션, 명성황후의 부채 등 외교와 문화 주권 회복의 생생한 증거를 만날 수 있는 곳.',
        highlight: '경희궁 터 · 알렌 컬렉션',
        duration: '2시간', capacity: '20명',
        image: '/images/tours/museums/seoul_museum_history_1771721194719.png',
        modalImage: '/images/tours/museums/seoul_museum_history_1771721194719.png'
    },
    {
        name: '대한제국역사관',
        nameEn: 'Korean Empire History Museum',
        desc: '덕수궁 석조전 내에 위치한 특별 전시. 근대 왕실의 외교, 군사, 문화 활동을 소개합니다.',
        highlight: '덕수궁 석조전 · 근대 왕실 전시',
        duration: '1.5시간', capacity: '20명',
        image: '/images/tours/museums/korean_empire_history_museum_1771721421146.png',
        modalImage: '/images/tours/museums/korean_empire_history_museum_1771721421146.png'
    },
    {
        name: '국립중앙박물관',
        nameEn: 'National Museum of Korea',
        desc: '한국의 5천년 역사와 문화유산을 총망라하는 세계적 규모의 박물관. 신라 금관부터 조선 백자까지 아우르는 정수.',
        highlight: '5천년 역사 · 세계적 박물관',
        duration: '3시간', capacity: '15명',
        image: '/images/tours/museums/national_museum_korea_1771721439376.png',
        modalImage: '/images/tours/museums/national_museum_korea_1771721439376.png'
    },
    {
        name: '국립민속박물관',
        nameEn: 'National Folk Museum of Korea',
        desc: '한국인의 일상생활, 의식주, 세시풍속을 전시. 원형대로 보전된 왕실과 민간 문화를 생생히 기록.',
        highlight: '전통 생활상 · 의식주 문화',
        duration: '2시간', capacity: '20명',
        image: '/images/tours/museums/national_folk_museum_1771721456474.png',
        modalImage: '/images/tours/museums/national_folk_museum_1771721456474.png'
    },
    {
        name: '주미대한제국공사관',
        nameEn: 'Old Korean Legation in Washington D.C.',
        desc: '미국 워싱턴 D.C.에 위치한 19세기 대한제국 자주외교의 상징. 외교관들의 발자취가 서린 빅토리아풍 공사관.',
        highlight: '워싱턴 D.C. · 자주외교의 장',
        duration: '2시간', capacity: '10명',
        image: '/images/tours/museums/old_korean_legation_1771721475089.png',
        modalImage: '/images/tours/museums/old_korean_legation_1771721475089.png'
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
                            <span className="text-[#d4af37] font-semibold tracking-wider text-sm px-4 py-2 border border-[#d4af37]/50 rounded-full backdrop-blur-md bg-black/40 shadow-lg">상세보기</span>
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
    const [expandedSection, setExpandedSection] = useState<number | null>(null);
    const [expandedTombSection, setExpandedTombSection] = useState<number | null>(null);
    const [tourSection, setTourSection] = useState<string | null>('palaces');
    const scrollToEl = (el: HTMLElement) => setTimeout(() => {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }, 350);
    const toggleTourSection = (key: string, el?: HTMLElement) => {
        setTourSection(prev => prev === key ? null : key);
        if (el) scrollToEl(el);
    };

    const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

    // Dynamic data for all 5 palaces
    const palaceData: Record<string, any> = {
        '경복궁': {
            subtitle: "Gyeongbokgung Palace",
            intro: [
                "500년 조선의 찬란한 건국 이념과, 자주독립을 외쳤던 대한제국의 좌절,",
                "그리고 식민 지배의 아픔을 딛고 다시 일어선 '대한민국의 살아있는 심장'."
            ],
            sections: [
                {
                    title: "창조와 위용: 세계와 어깨를 나란히 한 법궁",
                    paragraphs: [
                        "경복궁은 1395년 태조 고황제께서 창건하신 조선의 법궁입니다.\n특히 고종 광무태황제 시절, 흥선헌의대원왕에 의해 1867년 중건된 경복궁의 모습은 동아시아 건축의 정점이었습니다.",
                        "당시 500여 동의 전각들이 미로처럼 들어선 모습은 중국의 자금성과 비견될 만큼 웅장했으나, 자금성이 압도적인 권위를 내세웠다면 경복궁은 자연과 인간의 합일을 중시한 철학적 깊이를 담고 있습니다.\n이는 우리 민족이 무력보다는 문화와 조화를 숭상했던 고귀한 정신을 보여주는 증거입니다."
                    ]
                },
                {
                    title: "시련과 야만: 문화를 말살하려던 제국주의의 폭력",
                    paragraphs: [
                        "그러나 경복궁은 세계사에서 유례를 찾기 힘든 야만적인 문화 파괴의 현장이기도 합니다.\n1592년 임진왜란으로 전소된 아픔을 딛고 일어섰으나, 일제 강점기 동안 궁궐의 90% 이상이 의도적으로 철거되었습니다.",
                        "특히 1895년 건청궁에서는 명성황후께서 일본 낭인들에 의해 시해당하셨고, 순종 효황제께서 치욕을 겪으시기도 했습니다.\n일제는 궁궐의 가장 신성한 중심축을 막아서며 '조선총독부' 청사를 세웠습니다.\n이것은 한 나라의 왕조를 무너뜨리는 것을 넘어, 한 민족의 정신과 정체성을 말살하려던 시도였습니다."
                    ]
                },
                {
                    title: "부활과 긍지: 위대한 국민이 다시 세운 역사",
                    paragraphs: [
                        "하지만 우리 민족은 꺾이지 않았습니다.\n1990년대, 대한민국 정부와 국민은 식민 잔재인 조선총독부 건물을 철거하고 경복궁을 되찾는 대역사를 시작했습니다.\n이것은 단순한 건축물의 복원이 아닌 훼손된 민족의 자존심을 회복하고, 단절된 역사의 맥을 잇는 '정신적 광복'이었습니다.",
                        "현재 40% 이상 복원된 경복궁은 폐허 속에서도 기어이 문화를 꽃피워낸 대한민국 국민들의 끈기와 저력을 전 세계에 증명하는 상징물입니다."
                    ]
                },
                {
                    title: "미래와 외교: 살아있는 유산, 궁중문화축전",
                    paragraphs: [
                        "죽어있는 유적지는 감동을 줄 수 없습니다.\n그러기에 끊어진 왕실의 제례와 문화를 현대적으로 재해석하여 <궁중문화축전>을 기획했습니다.",
                        "매년 열리는 이 축전은 단순한 관광 상품이 아닙니다.\n격조 높은 왕실의 진수를 전 세계인과 공유하며, 과거의 아픔을 평화와 축제의 장으로 승화시킨 '문화 외교'의 현장입니다.\n가장 한국적인 것이 가장 세계적인 것임을 증명하며, 이제 경복궁은 세계인이 찾아와 한국의 미(美)와 정신을 체험하는 글로벌 명소가 되었습니다."
                    ]
                }
            ],
            gallery: [
                { src: '/images/palaces/gwanghwamun_real.png', caption: '광화문의 웅장한 모습' },
                { src: '/images/palaces/gyeonghoeru_real.png', caption: '경회루의 고즈넉한 풍경' },
                { src: '/images/palaces/hyangwonjeong_real.png', caption: '향원정의 아름다운 자태' },
                { src: '/images/palaces/real-gyeongbokgung.png', caption: '근정전의 장엄한 자태' },
                { src: '/images/palaces/dancheong_real.png', caption: '화려한 단청의 아름다움' }
            ]
        },
        '창덕궁': {
            subtitle: "Changdeokgung Palace",
            intro: [
                "창덕궁은 왕들이 가장 사랑했던 공간이자 '자연과 인간의 완벽한 합일'을 보여주는 걸작입니다.",
                "1997년 유네스코는 이 궁궐을 세계문화유산으로 등재하며 '동아시아 궁궐 건축과 조경의 모범'이라 극찬했습니다.",
                "서양의 정원이 자연을 인공적으로 조각했다면, 창덕궁은 자연의 지형을 전혀 훼손하지 않고 그 품에 안기듯 지어졌습니다.",
                "이는 21세기 인류가 지향해야 할 '환경과 공존하는 삶'의 철학을 600년 전 이미 실현한 것입니다."
            ],
            sections: [
                {
                    title: "역사의 중심무대: 500년 권력의 산실",
                    paragraphs: [
                        "창덕궁은 1405년 태종 때 건립된 이래, 사실상 조선 왕조 500년 역사 중 가장 오랜 기간(약 270년) 동안 왕들이 거처하며 국정을 돌봤던 실질적인 법궁 역할을 했습니다.",
                        "1592년 임진왜란으로 전소되는 아픔을 겪었으나, 우리 민족은 폐허 위에서 다시 문화를 일으켜 세웠습니다.\n광해군 때 재건된 이후 1867년 경복궁이 중건되기 전까지, 이곳은 조선의 정치와 외교, 문화가 꽃피웠던 심장부였습니다."
                    ]
                },
                {
                    title: "왕실의 마지막 숨결: 낙선재와 대한제국",
                    paragraphs: [
                        "이곳은 단순한 유적지가 아닙니다.\n대한제국의 마지막 황태자비인 이방자 여사(의민황태손비)와 비운의 덕혜옹주가 1989년까지, 그리고 마지막 황세손인 이구(회은황태손) 저하께서 2005년까지 실제로 거주하셨던 '살아있는 집'이었습니다.",
                        "망국의 한을 품고도 끝까지 기품을 잃지 않았던 순정효황후, 한국 사회봉사에 평생을 바친 이방자 여사, 그리고 역사의 소용돌이 속에서 고뇌했던 회은황태손과 줄리아 리(Julia Mullock) 여사의 삶.\n이 모든 기쁨과 슬픔, 그리고 평범한 일상이 서려 있는 공간이기에 창덕궁은 더욱 특별한 울림을 줍니다."
                    ]
                },
                {
                    title: "법통의 계승: 황사손의 3년상과 새로운 약속",
                    paragraphs: [
                        "이곳은 더욱 각별한 의미를 지닙니다.\n지난 2003년, 회은황태손(이구) 저하의 양자로 이원 황사손께서 입적되어 대한제국 왕실의 법통을 계승했습니다.\n그리고 2005년, 마지막 황세손께서 서거하셨을 때 저는 이곳 낙선재에서 전통 예법에 따라 3년 상을 치렀습니다.",
                        "현대 사회에서 사라져가는 '효'와 '예'의 정신을 몸소 실천하는 곳이 되었습니다.\n창덕궁은 과거의 유물이 아니라, 우리 국민들의 정신 속에 살아 숨 쉬는 현재진행형의 역사입니다."
                    ]
                }
            ],
            gallery: [
                { src: '/images/palaces/changdeokgung_injeongjeon.png', caption: '인정전의 장엄한 전경' },
                { src: '/images/palaces/changdeokgung_buyongjeong.png', caption: '비원 부용정의 아름다운 가을' },
                { src: '/images/palaces/changdeokgung_nakseonjae.png', caption: '낙선재의 단아한 건축미' },
                { src: '/images/palaces/changdeokgung_donhwamun.png', caption: '돈화문의 웅장한 야경' },
                { src: '/images/palaces/changdeokgung_juhamnu.png', caption: '녹음이 우거진 주합루' }
            ]
        },
        '창경궁': {
            subtitle: "Changgyeonggung Palace",
            intro: [
                "창경궁은 1483년 성종 대왕께서 세 분의 대비를 모시기 위해 지으셨습니다.",
                "권력을 과시하기 위한 곳이 아니라, 어머니와 할머니를 공경하는 마음,",
                "바로 '효'라는 인류 보편의 사랑이 건축으로 승화된 공간입니다.",
                "하지만 이 아름다운 공간은 한국 역사상 가장 비극적인 사건들의 무대이자,",
                "제국주의 폭력의 가장 큰 피해자가 된 궁입니다."
            ],
            sections: [
                {
                    title: "비극의 무대: 왕관의 무게를 견디다",
                    paragraphs: [
                        "이곳은 조선 왕실 가족들의 내밀한 생활 공간이었기에, 가장 인간적인 비극도 이곳에서 일어났습니다.\n숙종 대왕 시절 인현왕후와 장희빈의 이야기, 그리고 영조대왕의 아들인 사도세자가 뒤주에 갇혀 생을 마감한 비극적인 사건이 이곳 문정전 앞마당에서 벌어졌습니다.",
                        "왕실이라는 화려함 이면에 감춰진, 권력의 무게와 인간적 고뇌가 서린 이곳의 공기는 셰익스피어의 비극보다 더 깊은 울림을 줍니다."
                    ]
                },
                {
                    title: "제국의 만행: 창경원에서 동물원으로",
                    paragraphs: [
                        "그러나 가장 큰 비극은 타의에 의해 저질러졌습니다.\n1909년, 일제 통감부와 친일 세력은 대한제국 마지막 황제 순종 윤희황제의 마음을 위로한다는 명분으로 이 신성한 궁궐을 동물원과 식물원으로 전락시켰습니다.\n이름마저 '창경궁'에서 '창경원'으로 격하시켰습니다.",
                        "왕이 정사를 돌보던 전각은 헐려나갔고, 그 자리에 일본의 상징인 벚꽃이 심어졌으며, 밤에는 일본식 연못 위로 유흥의 불빛이 번쩍였습니다.\n이는 한 나라의 정신적 구심점을 유희의 대상으로 만들어 민족혼을 말살하려 했던 고도의 정치적 폭력이었습니다."
                    ]
                },
                {
                    title: "끊어진 맥, 그리고 망각의 시간",
                    paragraphs: [
                        "일제의 만행은 여기서 그치지 않았습니다.\n그들은 창경궁과 조선 왕실의 신주를 모신 신성한 공간인 '종묘' 사이의 산줄기를 끊고 도로(율곡로)를 냈습니다.\n민족의 정기가 흐르는 맥을 물리적으로 절단한 것입니다.",
                        "해방 후에도 우리는 가난과 혼란 속에 이 아픔을 바로잡지 못했고, 한때 이곳은 술판이 벌어지는 유원지로 방치되기도 했습니다.\n이는 우리가 힘을 잃었을 때 역사가 얼마나 처참하게 망가질 수 있는지를 보여주는 뼈아픈 교훈입니다."
                    ]
                },
                {
                    title: "위대한 복원: 다시 이어진 민족의 혼",
                    paragraphs: [
                        "하지만 대한민국은 여기서 멈추지 않았습니다.\n1980년대부터 시작된 복원 사업으로 동물원은 과천으로 옮겨졌고, 벚나무는 다시 소나무로 교체되었습니다.\n그리고 마침내 2022년, 90년 만에 끊어졌던 창경궁과 종묘 사이의 숲길이 다시 연결되었습니다.",
                        "일제가 끊어놓은 민족의 맥을 우리 손으로 다시 이은 것입니다.\n지금 보시는 창경궁은 단순한 옛 건물이 아닌 식민지의 상처를 스스로 치유하고, 훼손된 존엄을 되찾은 대한민국의 '꺾이지 않는 마음' 그 자체입니다."
                    ]
                }
            ],
            gallery: [
                { src: '/images/palaces/changgyeonggung_myeongjeongjeon.png', caption: '명정전의 우아한 자태' },
                { src: '/images/palaces/changgyeonggung_daeonsil.png', caption: '대온실의 고풍스러운 식물원' },
                { src: '/images/palaces/changgyeonggung_chundangji.png', caption: '춘당지의 환상적인 야경' },
                { src: '/images/palaces/changgyeonggung_honghwamun.png', caption: '홍화문의 단청과 건축미' },
                { src: '/images/palaces/changgyeonggung_tongmyeongjeon.png', caption: '통명전의 고즈넉한 풍경' }
            ]
        },
        '덕수궁': {
            subtitle: "Deoksugung Palace (Gyeongungung)",
            intro: [
                "덕수궁의 원래 이름은 '경운궁'이었습니다.",
                "1907년, 일제가 헤이그 특사 파견을 빌미로 고종 황제를 강제 퇴위시키고,",
                "'물러나서 조용히 덕을 쌓고 오래 살라'는 조롱 섞인 의미로 이름이 변경되었습니다."
            ],
            sections: [
                {
                    title: "제국의 선포: 자주권의 상징, 대한제국",
                    paragraphs: [
                        "1896년, 일본의 위협 속에 러시아 공사관으로 피신(아관파천)하셨던 고종 황제께서는 1897년 이곳 경운궁으로 환궁하여 '대한제국'을 선포하셨습니다.",
                        "이는 단순한 왕정 복고가 아닌 중국의 제후국이 아닌 '완전한 자주 독립국'임을 만방에 선포하고, 서구 열강과 대등한 외교 관계를 맺겠다는 '근대 국가로의 대전환'이었습니다.\n경운궁은 바로 그 새로운 역사가 시작된 성지입니다."
                    ]
                },
                {
                    title: "근대와 전통의 공존: 석조전과 글로벌 비전",
                    paragraphs: [
                        "1910년 영국인 하딩(Harding)의 설계로 지어진 석조전은 단순한 건축물이 아닙니다.",
                        "\"조선은 낡은 나라가 아니다. 우리도 서구 문명을 받아들여 근대화를 이룰 준비가 되었다.\"\n고종 황제께서는 이 웅장한 서양식 궁전을 통해 전 세계에 '개방과 개혁의 의지'를 보여주고자 했습니다.",
                        "해방 후 미-소 공동위원회가 열렸던 이곳은 한국 현대사의 격랑을 온몸으로 견뎌낸 역사의 산증인입니다."
                    ]
                },
                {
                    title: "비극과 저항: 을사늑약과 승하",
                    paragraphs: [
                        "그러나 제국의 꿈은 일본의 무력 앞에 짓밟혔습니다.\n1905년 중명전에서 외교권을 박탈당하는 을사늑약이 강제로 체결되었고, 1919년 고종 황제께서는 이곳 함녕전에서 의문의 죽음(독살설)을 맞이하셨습니다.",
                        "하지만 황제의 죽음은 끝이 아니었습니다.\n그 슬픔은 3.1 만세 운동의 도화선이 되었고, 대한민국 임시정부 수립으로 이어졌습니다.\n즉, 경운궁은 제국의 마침표가 아니라, 민주 공화국 대한민국의 씨앗이 뿌려진 곳입니다."
                    ]
                },
                {
                    title: "역사의 재현: 다시 잇는 맥",
                    paragraphs: [
                        "2017년, 대한제국 선포 120주년을 맞아 이곳에서 고종 황제의 즉위식을 재현했습니다.\n그것은 과거로 돌아가자는 것이 아닌 120년 전 우리 선조들이 그토록 갈망했던 '부강하고 자주적인 나라'를 오늘날 우리가 이루어냈음을 황제 영전에 고(告)하는 의식이었습니다.",
                        "이제 경운궁은 과거의 아픔을 넘어, 세계 10위권 경제 대국으로 성장한 대한민국의 자부심을 확인하는 장소가 되었습니다."
                    ]
                }
            ],
            gallery: [
                { src: '/images/palaces/deoksugung_seokjojeon.png', caption: '석조전의 이국적인 야경' },
                { src: '/images/palaces/deoksugung_junghwajeon.png', caption: '중화전의 위엄 있는 자태' },
                { src: '/images/palaces/deoksugung_jeonggwanheon.png', caption: '정관헌의 아름다운 낭만' },
                { src: '/images/palaces/deoksugung_doldamgil.png', caption: '덕수궁 돌담길의 가을 정취' },
                { src: '/images/palaces/deoksugung_jungmyeongjeon.png', caption: '중명전의 고풍스러운 전경' }
            ]
        },
        '경희궁': {
            subtitle: "Gyeonghuigung Palace",
            intro: [
                "경희궁은 1617년 광해군 때 건립되어 '서궐'이라 불렸고,",
                "숙종 대왕과 영조 대왕을 비롯한 10명의 왕들이 정사를 돌보았던 거대한 정치 중심지였습니다."
            ],
            sections: [
                {
                    title: "영광의 시대: 왕들의 꿈이 서린 곳",
                    paragraphs: [
                        "원래 경희궁은 7만 2천 평의 대지 위에 100여 동의 전각들이 웅장하게 들어서 있었습니다.\n특히 개혁 군주 정조 대왕께서 즉위하신 숭정전은 조선 후기 르네상스의 산실이었습니다.",
                        "당시 경희궁은 구름다리(홍교)를 통해 덕수궁과 연결되어 있었으며, 인왕산의 산세와 어우러진 가장 아름다운 이궁이었습니다."
                    ]
                },
                {
                    title: "파괴의 기록: 제국주의가 남긴 흉터",
                    paragraphs: [
                        "경희궁의 비극은 일제 강점기에 절정에 달했습니다.\n일본은 우리 궁궐 중 경희궁을 가장 철저하고 악랄하게 파괴했습니다.",
                        "숭정전: 불교 사찰의 법당으로 팔려가 동국대학교 안으로 옮겨졌습니다.\n흥화문: 조선 침략의 원흉인 이토 히로부미(이등박문)를 추모하는 사당의 정문으로 쓰이는 치욕을 겪었습니다.",
                        "남은 전각들은 헐값에 팔려나갔고, 궁궐 지하에는 일본군의 거대한 방공호가 뚫려, 왕의 기운이 서린 땅은 전쟁의 도구로 전락했습니다.\n이는 단순한 파괴가 아니라, 한 민족의 존엄을 짓밟는 '문화적 테러'였습니다."
                    ]
                },
                {
                    title: "현대의 자화상: 성장의 그늘과 반성",
                    paragraphs: [
                        "하지만 더 뼈아픈 역사는 해방 이후 우리 스스로에게서 비롯되었습니다.\n전쟁 직후 '생존'과 '경제 성장'이 최우선이었던 시절, 우리는 역사를 지킬 여유가 없었습니다.",
                        "궁궐이 있던 자리에는 서울시 교육청, 기상청, 교회, 그리고 고층 아파트들이 우후죽순 들어섰습니다.\n심지어 역사를 보존해야 할 '서울역사박물관'조차 궁궐 터 위에 지어졌습니다.\n이는 대한민국이 세계 최빈국에서 경제 대국으로 기적처럼 성장하는 과정에서 치러야 했던 '혹독한 대가'였습니다."
                    ]
                },
                {
                    title: "미래를 위한 제언: 빈 공간의 미학",
                    paragraphs: [
                        "지금 복원된 것은 전체의 극히 일부에 불과합니다.",
                        "이 텅 빈 공간과 주변을 둘러싼 콘크리트 빌딩들의 부조화.\n이것이야말로 \"역사를 잊은 민족에게 미래는 없다\"는 사실을 웅변하는 현대 미술과도 같은 전시품입니다.",
                        "우리는 이제 경제력을 넘어, 잃어버린 가치를 되찾고 역사를 바로 세우는 '진정한 선진국'으로 나아가고 있습니다.\n경희궁은 그 다짐의 현장입니다."
                    ]
                }
            ],
            gallery: [
                { src: '/images/palaces/gyeonghuigung_sungjeongjeon.png', caption: '숭정전의 우아한 전경' },
                { src: '/images/palaces/gyeonghuigung_taeryeongjeon.png', caption: '태령전의 고풍스러운 지붕' },
                { src: '/images/palaces/gyeonghuigung_jajeongjeon.png', caption: '자정전 앞의 고즈넉한 봄날' },
                { src: '/images/palaces/gyeonghuigung_heunghwamun.png', caption: '흥화문의 당당한 모습' },
                { src: '/images/palaces/gyeonghuigung_seogwol_view.png', caption: '도심 속 서궐(경희궁)의 환상적인 야경' }
            ]
        },
        '서울 5대궁 안내도': {
            subtitle: "Map of the 5 Royal Palaces",
            intro: [
                "서울의 중심에 위치한 5대 궁궐의 위치와 동선을 한눈에 파악할 수 있는 스페셜 안내 지도입니다."
            ],
            sections: [
                {
                    title: "직관적인 클래식 지도와 상세 안내도",
                    paragraphs: [
                        "첫 번째 지도는 대략적인 이동 동선과 인근 역들을 직관적으로 보여주는 클래식 안내도입니다.",
                        "두 번째 지도는 5대 궁궐의 구체적인 권역과 위치를 명확히 보여주는 상세 통합 안내도입니다."
                    ]
                }
            ],
            gallery: [
                { src: '/images/palaces/palaces-map.png', caption: '서울 5대궁 클래식 안내도' },
                { src: '/images/palaces/seoul-royal-palaces-map.png', caption: '서울 5대궁 상세 통합 안내도' }
            ]
        },
        '종묘대제': {
            subtitle: "Jongmyo Daeje",
            intro: [
                "종묘는 조선 왕조의 역대 왕과 왕비들의 신주를 모신 왕실의 사당입니다.",
                "1995년 유네스코는 이곳을 세계유산으로 지정하며 '건축적 아름다움과 제례 문화가 완벽하게 보존된 인류의 유산'이라고 평가했습니다.",
                "화려한 장식으로 권위를 내세우는 서양의 신전과 달리, 종묘는 '절제'와 '침묵'을 통해 신성함을 드러냅니다. 100미터가 넘는 정전의 지붕 선이 만들어내는 장엄한 침묵 앞에서, 우리는 인간의 유한함과 역사의 영원함을 동시에 느끼게 됩니다."
            ],
            sections: [
                {
                    title: "1. 살아있는 600년: 종묘제례와 일체감",
                    paragraphs: [
                        "종묘가 특별한 진짜 이유는 건물이 아니라 '사람'에 있습니다. 왕조는 사라졌지만 우리는 600년 전과 똑같은 옷을 입고 똑같은 음악(종묘제례악)을 연주하며 똑같은 춤(일무)을 춥니다.",
                        "이것이 바로 국가무형문화재 제1호이자 유네스코 인류무형문화유산인 <종묘제례>입니다. 매년 5월과 11월, 이곳에서 '초헌관'을 수행합니다. 이는 선조들과 대화하고, 국가의 안녕을 기원하는 '살아있는 역사' 그 자체입니다."
                    ]
                },
                {
                    title: "2. 건축의 미학: 정전과 영녕전",
                    paragraphs: [
                        "종묘의 핵심은 정전과 영녕전입니다. 국보인 정전에는 태조 고황제를 비롯해 공덕이 높은 19분의 왕과 30분의 왕후를 모셨고, 영녕전에는 추존된 왕들을 모셨습니다.",
                        "단순하고 반복적인 기둥의 배열, 끝없이 이어질 듯한 수평적인 지붕 라인은 왕조의 무궁한 번영을 상징합니다. 프랭크 게리 같은 세계적인 건축가들도 이 압도적인 '비움의 미학' 앞에 찬사를 보냈습니다."
                    ]
                },
                {
                    title: "3. 상처와 치유: 끊어진 맥을 잇다",
                    paragraphs: [
                        "이 신성한 공간도 제국주의의 상처를 피할 수는 없었습니다. 일제는 조선의 정기를 끊겠다며 창덕궁과 종묘 사이의 숲을 파헤치고 도로(율곡로)를 냈습니다.",
                        "하지만 우리는 포기하지 않았습니다. 지난 2022년, 우리는 그 도로를 터널로 지하화하고 위쪽의 숲을 복원하여 90년 만에 궁궐과 종묘의 맥을 다시 이었습니다. 지금 여러분이 밟고 있는 이 땅은 단순한 흙이 아니라 역사의 상처를 치유해낸 대한민국의 회복력을 상징합니다."
                    ]
                },
                {
                    title: "4. 포용의 정신: 공민왕 신당",
                    paragraphs: [
                        "종묘에는 특이하게도 고려의 왕인 '공민왕 신당'이 있습니다. 조선을 건국한 태조 이성계께서 전 왕조인 고려의 왕을 모시는 사당을 지은 것입니다.",
                        "이는 전 왕조를 부정하지 않고, 역사의 일부로 포용하며 계승하겠다는 '화합과 포용'의 정신을 보여줍니다. 승자가 패자를 지우는 것이 아니라 예우를 갖추는 것. 이것이 진정한 왕의 품격입니다."
                    ]
                }
            ],
            gallery: [
                { src: '/images/tours/ceremonies/jongmyo_daeje_1771719234508.png', caption: '종묘대제 제향과 건축의 미학' }
            ]
        },
        '사직대제': {
            subtitle: "Sajik Daeje",
            intro: [
                "조선의 도읍 한양은 완벽한 계획도시였습니다. 법궁인 경복궁을 중심으로 왼쪽에는 왕실의 조상을 모신 '종묘'를, 오른쪽에는 이곳 '사직단'을 배치했습니다(좌묘우사, 左廟右社).",
                "종묘가 과거의 역사를 기리는 곳이라면, 사직단은 현재 백성들의 먹고사는 문제 즉 '경제와 복지'를 기원하는 곳입니다.",
                "토지의 신(社)과 곡식의 신(稷)에게 제사를 지내는 것은 통치자가 권력을 누리기 위함이 아니라 '오직 백성의 안위만을 생각하겠다'는 대국민 약속의 실천이었습니다."
            ],
            sections: [
                {
                    title: "1. 천원지방: 하늘은 둥글고 땅은 네모나다",
                    paragraphs: [
                        "사직단의 제단 모양을 보십시오. 지붕이 없고 네모난 형태를 하고 있습니다. 이는 '하늘은 둥글고 땅은 네모나다'는 천원지방(天圓地方)의 우주관을 반영한 것입니다.",
                        "화려한 건물이 없는 이유는 땅의 기운을 그대로 받기 위함입니다. 인공적인 장식을 배제하고 오직 흙과 곡식만을 생각하는 이 단순함 속에 자연 앞에서 겸허해지는 동양의 '생태주의'가 담겨 있습니다."
                    ]
                },
                {
                    title: "2. 상처받은 대지: 개발독재와 훼손",
                    paragraphs: [
                        "그러나 이 신성한 땅은 근현대사의 아픔을 온몸으로 겪었습니다. 일제 강점기에는 공원으로 격하되어 원형이 훼손되었고, 해방 후 고도성장기에는 도시 개발 논리에 밀려 사직터널과 도로가 뚫리며 제단이 잘려나갔습니다.",
                        "심지어 도서관과 공공건물들이 들어서며 제단은 좁아지고 축소되었습니다. 이는 우리가 가난을 벗어나기 위해 몸부림치는 동안 정작 지켜야 할 '정신적 토대'를 잠시 잊었음을 보여주는 뼈아픈 자화상입니다."
                    ]
                },
                {
                    title: "3. 사직대제: 다시 올리는 기원",
                    paragraphs: [
                        "하지만 다시 제단을 쌓고 의례를 복원했습니다. 매년 9월, 이곳에서 <사직대제>를 봉행합니다. 어가행렬을 이끌고 제단에 올라 술잔을 올리는 것(초헌관)은 단순히 옛 의식을 흉내 내는 것이 아닙니다.",
                        "이 시대의 '식량 안보'와 '환경 보존' 그리고 '평화'를 위해 기도합니다. 2019년에는 멕시코 정부 사절단이 사직대제를 참관하고 깊은 감명을 받아 전통 공예품을 선물하기도 했습니다. 농업과 대지를 중시하는 마음은 국경을 초월한 '인류 공통의 가치'이기 때문입니다."
                    ]
                },
                {
                    title: "4. 미래의 유산: 생명과 평화의 제단",
                    paragraphs: [
                        "지금 사직단은 복원 정비 사업이 한창입니다. 잃어버린 영역을 되찾고 끊어진 맥을 잇고 있습니다.",
                        "기후 변화로 전 세계가 고통받는 지금 땅과 곡식을 신성시했던 우리 선조들의 지혜는 '지속 가능한 미래'를 위한 해답이 될 수 있습니다. 사직단은 이제 대한민국을 넘어 지구촌의 생명과 평화를 기원하는 열린 성소가 될 것입니다."
                    ]
                }
            ],
            gallery: [
                { src: '/images/tours/ceremonies/sajik_daeje_1771719257413.png', caption: '사직단과 전통 공예의 혼' }
            ]
        },
        '환구대제': {
            subtitle: "Hwangu Daeje",
            intro: [
                "환구단은 하늘과 땅이 만나는 가장 신성한 장소였습니다. 고종 광무태황제께서는 1897년 이곳에서 황제로 등극하시고 '대한제국'을 선포하셨습니다.",
                "중국 사신이 머물던 곳(남별궁)을 허물고 하늘에 제사를 지내는 단을 쌓은 것은, 더 이상 누구의 간섭도 받지 않는 '완전한 자주 독립국'임을 전 세계에 알린 대사건이었습니다.",
                "그러나 지금 그 웅장했던 제단은 사라지고 호텔 정원의 장식품처럼 남았습니다."
            ],
            sections: [
                {
                    title: "1. 자주 독립의 선언: 황제국, 대한제국",
                    paragraphs: [
                        "환구단은 일반적인 제사 터가 아닙니다. 1897년 10월 12일 고종 황제께서는 이곳에서 하늘에 제사(환구대제)를 올리며 국호를 '대한제국'이라 천명하셨습니다.",
                        "과거 중국의 황제만이 하늘에 제사를 지낼 수 있다는 사대주의 질서를 깨뜨리고, 우리도 대등한 황제국임을 선포한 것입니다. 독립문이 눈에 보이는 상징이라면 환구단은 '정신적 자주독립'의 완성이었습니다. 3층의 웅장한 원형 제단은 로마의 콜로세움이나 베이징의 천단에 비견될 만큼 장엄했습니다."
                    ]
                },
                {
                    title: "2. 파괴된 성소: 제국주의와 철도호텔",
                    paragraphs: [
                        "그러나 1912년 일제는 이 신성한 곳을 철저히 파괴했습니다. 조선의 혼을 말살하기 위해 제단을 헐어버리고, 그 위에 서구식 위락 시설인 '철도호텔'을 지었습니다.",
                        "가장 신성해야 할 제천(祭天)의 공간이 일본인과 서양인들이 먹고 마시며 즐기는 유흥가로 전락한 것입니다. 이는 물리적 파괴를 넘어 한 민족의 '자존심과 정체성'을 짓밟은 야만적인 행위였습니다. 지금 남아있는 것은 신위를 모시던 3층 팔각 건물인 '황궁우'뿐입니다."
                    ]
                },
                {
                    title: "3. 현대의 비극: 자본에 포위된 역사",
                    paragraphs: [
                        "더욱 뼈아픈 것은 해방 후의 모습입니다. 우리는 일제가 지은 호텔을 철거하고 제단을 복원하는 대신 더 크고 높은 현대식 호텔(웨스틴 조선호텔)을 지었습니다. 심지어 영빈관이었던 대관정 터에는 또 다른 고층 호텔(부영)이 들어설 예정입니다.",
                        "호텔 투숙객들은 객실 창문 너머로 황궁우를 바라보며 커피를 마시고 결혼식 배경으로 사용합니다. 역사의 성지가 '상업적 뷰'로 소비되는 이 현실은 우리가 경제 성장을 위해 얼마나 소중한 가치를 희생했는지 보여주는 '자본주의의 그늘'입니다."
                    ]
                },
                {
                    title: "4. 부활하는 정신: 환구대제 복원",
                    paragraphs: [
                        "건물은 파괴되었지만 정신은 사라지지 않았습니다. 일제에 의해 금지되었던 <환구대제>가 2008년 100년 만에 복원되었습니다.",
                        "매년 10월 이곳에서 하늘에 제를 올립니다(초헌관). 비록 호텔 빌딩 숲에 둘러싸여 하늘조차 잘 보이지 않는 좁은 공간이지만, 올리는 술잔에는 '다시는 역사를 잃어버리지 않겠다'는 굳은 다짐이 담겨 있습니다. 우리는 멈추지 않고 환구단의 완전한 원형 복원을 요구할 것입니다. 그것이 바로 대한민국의 진정한 광복이기 때문입니다."
                    ]
                }
            ],
            gallery: [
                { src: '/images/tours/ceremonies/hwangu_daeje_1771719276005.png', caption: '환구단의 황궁우와 황제 의례' }
            ]
        },
        '국립고궁박물관': {
            subtitle: "National Palace Museum of Korea",
            intro: [
                "국립고궁박물관은 조선 왕실과 대한제국 왕실의 역사와 문화를 집대성한 보물창고입니다.",
                "하지만 이 박물관의 역사 자체가 우리 근현대사의 아픔을 그대로 닮아 있습니다.",
                "1908년 '제실박물관'으로 시작된 이곳은 일제 강점기 동안 '이왕가미술관'으로 격하되어 덕수궁 석조전으로 쫓겨나는 수모를 겪었습니다. 해방 후에도 여러 이름을 전전하다가 2005년에야 비로소 경복궁의 품으로 돌아왔습니다. 이곳에 전시된 유물 하나하나에는 망국의 슬픔을 견디며 정통성을 지키려 했던 왕실의 눈물이 배어 있습니다."
            ],
            sections: [
                {
                    title: "1. 돌아온 국권: 어보와 문화 주권",
                    paragraphs: [
                        "이곳의 하이라이트는 왕권의 상징인 '어보'입니다. 2014년, 오바마 미국 대통령 방한 당시 우리는 불법 반출되었던 대한제국 국새와 어보 9과를 환수받았습니다.",
                        "이는 물건의 반환만이 아닌 잃어버렸던 국가의 '주권'과 '자존심'을 되찾은 사건입니다. 문화재는 제자리에 있을 때 가장 빛나는 법입니다."
                    ]
                },
                {
                    title: "2. 근대의 증거: 순종황제의 리무진",
                    paragraphs: [
                        "전시실 중앙에는 거대한 캐딜락 리무진이 있습니다. 이는 1918년 미국 GM사가 제작한 이 차는 순종 윤희황제와 순정효황후께서 타시던 어차입니다. 전 세계적으로도 희귀한 이 차종은, 대한제국이 결코 쇄국에 갇힌 나라가 아니었음을 증명합니다.",
                        "우리는 서구의 문물을 적극적으로 받아들여 근대 국가로 나아가려 했습니다. 비록 식민 지배로 그 꿈은 좌절되었으나, 이 자동차는 '세계와 어깨를 나란히 하려 했던 제국의 꿈'을 싣고 지금도 우리 앞에 서 있습니다."
                    ]
                },
                {
                    title: "3. 가족의 이야기: 덕혜옹주의 옷과 해경왕녀",
                    paragraphs: [
                        "저기 보이는 작은 당의(치마저고리)는 고종 황제의 고명딸, 덕혜옹주께서 입으셨던 옷입니다. 나라를 잃고 일본으로 끌려가 평생을 고독 속에 사셨던 옹주의 아픔이 이 옷에 고스란히 남아 있습니다.",
                        "또한 2012년, 의친왕의 딸이신 해경왕녀(이해경 여사)께서 이곳을 방문해 아버지가 타시던 차와 유물들을 보며 눈시울을 붉히셨습니다.\n박물관은 죽은 역사가 아니라, 숨결이 살아있는 공간입니다."
                    ]
                }
            ],
            gallery: [
                { src: '/images/tours/museums/national_palace_museum_1771721177147.png', caption: '국립고궁박물관의 왕실 유물 전시' }
            ]
        },
        '서울역사박물관': {
            subtitle: "Seoul Museum of History",
            intro: [
                "서울역사박물관이 서 있는 자리는 원래 조선의 궁궐인 '경희궁'의 터였습니다.",
                "2002년 개관 당시, 궁궐을 복원해야 할 자리에 현대식 박물관을 짓는 것에 대해 많은 비판이 있었습니다. 역사를 보존하겠다는 박물관이 역설적으로 역사의 현장을 훼손했기 때문입니다."
            ],
            sections: [
                {
                    title: "1. 왕실의 유산: 운현궁과 이우 왕자의 기증",
                    paragraphs: [
                        "비록 건립 과정은 아팠지만, 이곳의 콘텐츠는 왕실의 헌신으로 채워졌습니다. 1991년, 흥선대원군의 사가였던 운현궁의 유물들이 이우 왕자의 장자인 이청 황손에 의해 기증되었습니다.",
                        "이는 왕실의 유물이 개인의 소유물이 아니라, '국민 모두가 공유해야 할 공공의 자산'이라는 왕실 가족들의 뜻이 담긴 것입니다."
                    ]
                },
                {
                    title: "2. 외교의 증거: 알렌 컬렉션과 명성황후의 부채",
                    paragraphs: [
                        "이곳에서 가장 주목해야 할 것은 <알렌 컬렉션>입니다. 호러스 알렌(Horace Allen) 박사는 1884년 한국에 온 최초의 미국 외교관이자 선교사로, 고종 황제와 각별한 우정을 나눴던 인물입니다.",
                        "2018년, 미국을 방문해 알렌 박사의 증손녀(Lydia C. Allen) 등 후손들을 설득했고, 그들이 보관하던 귀중한 유물들을 환수받아 이곳에 기증했습니다. 그중 하이라이트는 바로 '명성황후의 화조도 접선'입니다.",
                        "상아로 만든 이 부채는 명성황후께서 알렌 부인에게 하사한 것으로, 국내외를 통틀어 유일한 조선 왕실의 상아 부채입니다. 이 작은 부채에는 서구 열강과 교류하며 자주 독립을 꿈꾸었던 왕실의 '글로벌 마인드'와 비극적으로 생을 마감하신 황후의 체취가 서려 있습니다."
                    ]
                },
                {
                    title: "3. 문화 주권의 회복: 기증의 가치",
                    paragraphs: [
                        "이 유물들을 개인적으로 소장하지 않고 박물관에 기증한 이유는 명확합니다. 문화재는 '제자리'에 있을 때, 그리고 '미래 세대'가 보고 배울 때 진정한 가치를 발휘하기 때문입니다.",
                        "알렌 박사의 친필 편지와 『외아교관계 연대기』 같은 기록물들은 100년 전 한미 외교사의 생생한 증거입니다. 이것을 되찾은 것은 잃어버린 역사의 퍼즐을 맞추는 것이며, 대한민국이 문화적으로도 '주권 국가'임을 선포하는 행위입니다."
                    ]
                },
                {
                    title: "4. 미래를 위한 약속: 교육의 장으로",
                    paragraphs: [
                        "경희궁 터 위에 지어진 이 박물관은 역설적으로 우리에게 '어떻게 역사를 대할 것인가'를 묻고 있습니다. 이곳은 자라나는 아이들이 \"우리나라는 문화를 소중히 여기는 민족\"이라는 자긍심을 배우는 학교가 되기를 바랍니다.",
                        "해외에 흩어진 수많은 우리 문화재들이 고국의 품으로 돌아오는 '제2, 제3의 알렌 컬렉션' 운동으로 이어지기를 희망합니다."
                    ]
                }
            ],
            gallery: [
                { src: '/images/tours/museums/seoul_museum_history_1771721194719.png', caption: '서울역사박물관 알렌 컬렉션 전시' }
            ]
        },
        '대한제국역사관': {
            subtitle: "Korean Empire History Museum",
            intro: [
                "덕수궁 석조전 내에 위치한 대한제국역사관은, 자주적 근대 국가를 꿈꾸었던 왕실의 비전이 담긴 곳입니다.",
                "전시된 서양식 가구와 외교 문서들은 제국주의의 격랑 속에서도 당당히 세계와 교류하고자 했던 대한제국의 치열한 노력을 생생하게 보여줍니다."
            ],
            sections: [
                {
                    title: "1. 서양 건축에 담은 근대의 꿈",
                    paragraphs: [
                        "석조전은 19세기의 신고전주의 양식을 따른 장엄한 석조 건물로, 내부는 화려한 샹들리에와 카펫으로 장식되어 있습니다. 이는 단순한 서구 모방이 아니라, 국제 사회에서 문명국으로 대우받기 위해 필수적인 외교의 장을 마련한 것입니다."
                    ]
                },
                {
                    title: "2. 황제의 집무실과 연회장",
                    paragraphs: [
                        "각국 공사들을 접견했던 접견실과 대식당 등은 화려하고 격조 높게 복원되었습니다. 이 공간에서 고종 황제는 각국의 사절들을 환대하며 대한제국의 자주독립 의지를 국제 사회에 널리 알리고자 하였습니다."
                    ]
                }
            ],
            gallery: [
                { src: '/images/tours/museums/korean_empire_history_museum_1771721421146.png', caption: '석조전 내 대한제국역사관의 모습' }
            ]
        },
        '국립중앙박물관': {
            subtitle: "National Museum of Korea",
            intro: [
                "한국을 대표하는 최고(最高)의 박물관인 국립중앙박물관은 수천 년의 찬란한 문화유산을 품고 있습니다.",
                "구석기 시대의 뗀석기부터 조선 왕조의 화려한 예술품까지, 한반도의 유구한 역사와 미의식을 한자리에서 감상할 수 있는 세계적인 문화 공간입니다."
            ],
            sections: [
                {
                    title: "1. 시대와 분야를 아우르는 방대한 컬렉션",
                    paragraphs: [
                        "선사시대부터 근대까지, 그리고 금속공예부터 도자기, 서화에 이르기까지 한국 문화의 진수를 보여주는 수많은 국보와 보물들이 전시되어 있습니다. 신라의 금관, 고려의 청자, 조선의 백자가 내뿜는 독창적인 미학을 경험할 수 있습니다."
                    ]
                },
                {
                    title: "2. 사유의 방과 디지털 실감 영상관",
                    paragraphs: [
                        "반가사유상 두 점이 나란히 전시된 '사유의 방'은 동양 철학의 깊은 평온을 선사합니다. 더불어 최첨단 디지털 기술로 재탄생한 실감 영상관은, 박물관이 단순한 유물의 저장소를 넘어 현대적으로 소통하는 살아있는 공간임을 증명합니다."
                    ]
                }
            ],
            gallery: [
                { src: '/images/tours/museums/national_museum_korea_1771721439376.png', caption: '국립중앙박물관의 장엄한 전시 전경' }
            ]
        },
        '국립민속박물관': {
            subtitle: "National Folk Museum of Korea",
            intro: [
                "경복궁 궐내에 위치한 국립민속박물관은, 이 땅에 살아온 평범한 사람들의 삶과 문화를 가장 가까이서 느낄 수 있는 곳입니다.",
                "왕실의 화려함 이면에 존재하는 백성들의 진솔한 일상과 의식주, 그리고 세시풍속이 담긴 아름다운 공간입니다."
            ],
            sections: [
                {
                    title: "1. 한국인의 일생과 사계절",
                    paragraphs: [
                        "탄생에서부터 죽음에 이르기까지 경험하는 통과의례와, 농경 사회를 바탕으로 한 춘하추동의 세시풍속이 생생하게 전시되어 있습니다. 자연의 순리에 순응하며 지혜롭게 살아온 선조들의 발자취를 따라가 봅니다."
                    ]
                },
                {
                    title: "2. 전통 복식과 주거 문화의 미학",
                    paragraphs: [
                        "기품 있는 한복부터 서민들의 질박한 옷차림까지, 그리고 자연과 조화를 이루는 전통 한옥의 구조가 전시되어 있습니다. 화려한 궁중 문화와는 또 다른, 소박하지만 단아한 한국적 미의 원형을 발견할 수 있습니다."
                    ]
                }
            ],
            gallery: [
                { src: '/images/tours/museums/national_folk_museum_1771721456474.png', caption: '국립민속박물관의 따뜻한 전시 공간' }
            ]
        },
        '주미대한제국공사관': {
            subtitle: "Old Korean Legation in Washington D.C.",
            intro: [
                "미국의 수도 워싱턴 D.C. 로건 서클에 위치한 주미대한제국공사관은, 19세기 말 서구 열강 사이에서 자주 외교를 펼치려 했던 대한제국의 숭고한 노력이 깃든 상징적 장소입니다.",
                "망국의 아픔으로 소유권을 빼앗겼으나, 한 세기가 지나 대한민국 정부와 국민의 힘으로 다시 품에 안은 기적 같은 역사의 현장입니다."
            ],
            sections: [
                {
                    title: "1. 가장 오래된 외교 공관의 부활",
                    paragraphs: [
                        "이 붉은 벽돌의 빅토리아 양식 건물은 당시 워싱턴에 세워진 외교 공관 중 유일하게 원형을 유지하고 있습니다. 1889년 설치된 이후, 이역만리에서 국권을 수호하기 위해 헌신했던 외교관들의 숨결이 1층 객당과 2층 집무실에 고스란히 남아있습니다."
                    ]
                },
                {
                    title: "2. 102년 만의 귀환이 주는 감동",
                    paragraphs: [
                        "1910년 한일병합으로 단돈 5달러에 강제 매각되는 수모를 당했지만, 2012년 우리 손으로 귀환시켰습니다. 찬란했던 자주 외교의 꿈이 꺾였던 슬픈 역사를 넘어, 세계 10위권 국력으로 성장한 대한민국의 국격을 상징하는 자랑스러운 문화유산으로 거듭났습니다."
                    ]
                }
            ],
            gallery: [
                { src: '/images/tours/museums/old_korean_legation_1771721475089.png', caption: '워싱턴 D.C.의 주미대한제국공사관' }
            ]
        }
    };

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.toursTitle} subtitle={d.toursDesc} />

            {/* 5 Palaces Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-12">
                        <button onClick={(e) => toggleTourSection('palaces', e.currentTarget)} className="flex items-center justify-center gap-3 mx-auto cursor-pointer group">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37]">5대궁 투어</h2>
                            <span className={`text-[#d4af37] text-xl transition-transform duration-300 ${tourSection === 'palaces' ? 'rotate-180' : ''}`}>▾</span>
                        </button>
                        <p className="text-gray-400 text-sm mt-3">Royal Palaces of Seoul — 서울의 5대 궁궐 프리미엄 투어</p>
                        <div className="h-1 w-20 bg-[#d4af37] mx-auto rounded-full mt-4"></div>
                    </div>
                    <AnimatePresence initial={false}>
                        {tourSection === 'palaces' && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {palaceTours.map((t, i) => (
                                        <TourCard key={i} tour={t} index={i} onImageClick={(src, title) => { setActiveGalleryIndex(0); setExpandedSection(null); setSelectedImage({ src, title }); }} />
                                    ))}
                                    {/* 6th Slot: Palace Map Infographic */}
                                    <GlassCard delay={palaceTours.length * 0.08}>
                                        <div className="flex flex-col h-full -mx-6 -mt-6">
                                            <div
                                                className="relative h-56 w-full overflow-hidden cursor-pointer group shrink-0"
                                                onClick={() => { setActiveGalleryIndex(0); setExpandedSection(null); setSelectedImage({ src: '/images/palaces/palaces-map.png', title: '서울 5대궁 안내도' }); }}
                                            >
                                                <img src="/images/palaces/palaces-map.png" alt="Map of 5 Royal Palaces" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                <div className="absolute inset-0 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/50">
                                                    <span className="text-[#d4af37] font-semibold tracking-wider text-sm px-4 py-2 border border-[#d4af37]/50 rounded-full backdrop-blur-md bg-black/40 shadow-lg">상세보기</span>
                                                </div>
                                            </div>
                                            <div className="p-6 flex-grow flex flex-col items-center justify-center text-center">
                                                <MapPin className="w-8 h-8 text-[#d4af37] mb-3 opacity-80" />
                                                <h3 className="text-lg font-bold text-white mb-1">서울 5대궁 안내도</h3>
                                                <p className="text-[#d4af37]/60 text-xs mb-3">Map of the 5 Royal Palaces</p>
                                                <p className="text-gray-400 text-sm leading-relaxed">
                                                    경복궁, 창덕궁, 덕수궁, 창경궁, 경희궁의 전체 위치를 한눈에 확인할 수 있는 스페셜 안내 지도입니다.
                                                </p>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Royal Tombs Section */}
            <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#0a1128] to-[#050510]">
                <div className="absolute inset-0 bg-[url('/images/royal_navy_damask_bg.png')] bg-repeat opacity-[0.03] pointer-events-none mix-blend-overlay" />
                <div className="container mx-auto px-4 max-w-5xl relative z-10">
                    <div className="text-center mb-12">
                        <button onClick={(e) => toggleTourSection('tombs', e.currentTarget)} className="flex items-center justify-center gap-3 mx-auto cursor-pointer group">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37]">왕릉제향</h2>
                            <span className={`text-[#d4af37] text-xl transition-transform duration-300 ${tourSection === 'tombs' ? 'rotate-180' : ''}`}>▾</span>
                        </button>
                        <p className="text-gray-400 text-sm mt-3">UNESCO World Heritage — 500년 왕조의 숨결이 깃든 신의 정원</p>
                        <div className="h-1 w-20 bg-[#d4af37] mx-auto rounded-full mt-4"></div>
                    </div>

                    <AnimatePresence initial={false}>
                        {tourSection === 'tombs' && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">

                                {/* Intro text */}
                                <GlassCard delay={0.1} className="!bg-[#0a0f25]/80 !border-[#d4af37]/20 p-8 md:p-12 text-center mb-12 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                    <Crown className="w-10 h-10 text-[#d4af37] mx-auto mb-6 opacity-80" />
                                    <p className="text-[#fceda6] text-lg md:text-xl font-serif font-medium leading-relaxed break-keep mb-6">
                                        서양의 왕릉이 권력을 과시하기 위한 거대한 석조 기념물이라면,<br className="hidden md:block" /> 조선의 왕릉은 자연으로 돌아가고자 했던 겸손함이 빚어낸 '신의 정원'입니다.
                                    </p>
                                    <p className="text-gray-300 text-sm md:text-base leading-relaxed break-keep">
                                        이곳은 500년 조선 왕조의 역대 왕과 왕비 40기가 단 한 기의 훼손도 없이 보존된 세계 유일의 현장입니다. 하지만 유네스코가 진정으로 감동한 것은 이 무덤 자체가 아닙니다. 왕조가 사라진 지 100년이 지났음에도, 후손들이 매년 이곳에서 600년 전 방식 그대로 제사를 올리고 있다는 사실입니다.
                                    </p>
                                </GlassCard>

                                {/* Wangneung Image Gallery */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                    <div className="rounded-2xl overflow-hidden border border-[#d4af37]/20 relative group aspect-[4/3] shadow-lg">
                                        <img src="/images/tours/tombs/myungneung.png" alt="서오릉 내 명릉" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="rounded-2xl overflow-hidden border border-[#d4af37]/20 relative group aspect-[4/3] shadow-lg">
                                        <img src="/images/tours/tombs/hongsalmun.png" alt="속세의 지위를 내려놓는 홍살문" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="rounded-2xl overflow-hidden border border-[#d4af37]/20 relative group aspect-[4/3] shadow-lg">
                                        <img src="/images/tours/tombs/hyangro.png" alt="왕조차 조상 앞에서 예를 차렸던 향로" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                </div>

                                {/* Features Accordion */}
                                <div className="space-y-4 text-white/80 text-base md:text-lg leading-relaxed md:leading-[1.8] tracking-wide text-justify break-keep mb-8">
                                    {[
                                        {
                                            title: "자연을 섬기는 건축: 풍수와 합일",
                                            paragraphs: [
                                                "조선왕릉의 입지는 풍수지리 사상에 기반합니다. 산을 등지고(背山) 물을 바라보는(臨水) 지형을 찾아, 인공적인 조형물이 자연의 선을 거스르지 않도록 배치했습니다.",
                                                "능역을 조성하기 위해 산을 깎아내는 것이 아니라, 산의 품에 봉분이 안기도록 설계했습니다. 이는 자연을 정복의 대상이 아닌 공존의 대상으로 보았던 우리 민족의 '친환경적 세계관'을 보여줍니다. 도심 가까이에 이토록 울창한 숲이 원형 그대로 보존될 수 있었던 것은 이곳을 신성불가침의 성역으로 지켜온 덕분입니다."
                                            ]
                                        },
                                        {
                                            title: "공간의 철학: 속세에서 성역으로",
                                            paragraphs: [
                                                "왕릉은 세 단계의 공간으로 나뉩니다. 관리자가 머무는 진입 공간, 산 자와 죽은 자가 만나는 제향 공간, 그리고 왕이 잠든 능침 공간입니다.",
                                                "특히 홍살문을 지나는 순간, 우리는 속세의 지위를 내려놓아야 합니다. 왼쪽의 약간 높은 길은 조상의 혼령이 다니는 '향로'이고, 오른쪽의 낮은 길은 왕이 다니는 '어로'입니다. 왕조차도 조상 앞에서는 한 단계 낮은 길을 걸으며 겸손과 효를 실천했던, '예의 공간'입니다."
                                            ]
                                        },
                                        {
                                            title: "기록의 위대함: 의궤와 복원",
                                            paragraphs: [
                                                "어떻게 500년 전의 모습을 그대로 유지할 수 있었을까요? 그 비결은 바로 기록에 있습니다. 왕릉을 조성할 때 투입된 인원, 재료, 석물의 위치, 심지어 못 하나까지 기록한 『산릉도감의궤』가 있었기에 가능했습니다.",
                                                "이 기록 문화 덕분에 우리는 전쟁이나 재해로 일부가 훼손되어도 100% 완벽하게 원형을 복원할 수 있습니다. 조선왕릉은 돌로 만든 유산일 뿐만 아니라, 종이 위에 지은 '기록의 궁전'이기도 합니다."
                                            ]
                                        },
                                        {
                                            title: "살아있는 유산: 600년의 제례",
                                            paragraphs: [
                                                "가장 중요한 점은 이곳이 '과거 완료형' 유적지가 아니라 '현재 진행형'의 공간이라는 것입니다. 조선은 멸망했지만, 제례는 멈추지 않았습니다. 일제 강점기와 한국전쟁이라는 참혹한 시련 속에서도 우리 후손들은 제사상을 차렸습니다.",
                                                "매년 이곳에서 역대 제왕들께 술잔을 올립니다(초헌관). 이는 과거의 역사를 기억하고, 현재의 우리를 성찰하며, 미래의 번영을 기원하는 '정신적 대화'입니다. 이 끊이지 않는 의식이야말로 조선왕릉을 세계문화유산으로 만든 결정적인 근거입니다."
                                            ]
                                        }
                                    ].map((section, idx) => (
                                        <div
                                            key={idx}
                                            className="border border-[#d4af37]/30 bg-[#0a1128]/60 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 shadow-lg"
                                        >
                                            <button
                                                onClick={() => setExpandedTombSection(expandedTombSection === idx ? null : idx)}
                                                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-[#d4af37]/10 transition-colors"
                                            >
                                                <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-3 break-keep">
                                                    <span className="text-[#d4af37] text-2xl font-serif italic">{idx + 1}.</span>
                                                    {section.title}
                                                </h3>
                                                <ChevronDown className={`w-5 h-5 text-[#d4af37] transition-transform duration-300 shrink-0 ${expandedTombSection === idx ? 'rotate-180' : ''}`} />
                                            </button>

                                            <div
                                                className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedTombSection === idx ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}
                                            >
                                                <div className="p-6 pt-0 border-t border-[#d4af37]/10 mt-2 space-y-6">
                                                    {section.paragraphs.map((p, pIdx) => (
                                                        <p key={pIdx} className="whitespace-pre-line text-gray-300 text-sm md:text-base leading-relaxed">{p}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Ceremonies Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-12">
                        <button onClick={(e) => toggleTourSection('ceremonies', e.currentTarget)} className="flex items-center justify-center gap-3 mx-auto cursor-pointer group">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37]">유네스코 "세계인류무형유산"</h2>
                            <span className={`text-[#d4af37] text-xl transition-transform duration-300 ${tourSection === 'ceremonies' ? 'rotate-180' : ''}`}>▾</span>
                        </button>
                        <p className="text-gray-400 text-sm mt-3">대한제국 왕실의 전통 제향 — 황태손 전하가 초헌관으로 봉직하시는 국가 의례</p>
                        <div className="h-1 w-20 bg-[#d4af37] mx-auto rounded-full mt-4"></div>
                    </div>
                    <AnimatePresence initial={false}>
                        {tourSection === 'ceremonies' && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {ceremonyTours.map((t, i) => (
                                        <TourCard key={i} tour={t} index={i} onImageClick={(src, title) => { setActiveGalleryIndex(0); setExpandedSection(null); setSelectedImage({ src, title }); }} />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Museums Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-12">
                        <button onClick={(e) => toggleTourSection('museums', e.currentTarget)} className="flex items-center justify-center gap-3 mx-auto cursor-pointer group">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fceda6] to-[#d4af37]">박물관 투어</h2>
                            <span className={`text-[#d4af37] text-xl transition-transform duration-300 ${tourSection === 'museums' ? 'rotate-180' : ''}`}>▾</span>
                        </button>
                        <p className="text-gray-400 text-sm mt-3">Museums & Historical Sites — 왕실 문화유산을 만나는 프리미엄 박물관 투어</p>
                        <div className="h-1 w-20 bg-[#d4af37] mx-auto rounded-full mt-4"></div>
                    </div>
                    <AnimatePresence initial={false}>
                        {tourSection === 'museums' && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {museumTours.map((t, i) => (
                                        <TourCard key={i} tour={t} index={i} onImageClick={(src, title) => { setActiveGalleryIndex(0); setExpandedSection(null); setSelectedImage({ src, title }); }} />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050510]/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    {palaceData[selectedImage.title] ? (
                        <div
                            className="relative w-full max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-500 border border-[#d4af37]/40 bg-[#0a1128] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button Inside Modal */}
                            <button
                                className="absolute top-4 right-4 z-[120] text-white/70 hover:text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors backdrop-blur-sm"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X className="w-5 h-5" />
                            </button>
                            {/* Background Image Layer */}
                            <div
                                className="absolute inset-0 z-0 opacity-20 mix-blend-screen"
                                style={{
                                    backgroundImage: `url(${selectedImage.src})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a1128]/95 via-[#0a1128]/90 to-[#0a1128]" />

                            <div className="relative z-10 p-8 md:p-12 h-full overflow-y-auto custom-scrollbar flex-1">
                                <div className="max-w-4xl mx-auto text-center space-y-8">
                                    {/* Header Section */}
                                    <div className="flex flex-col items-center justify-center border-b border-[#d4af37]/30 pb-8 mb-8 relative">
                                        <div className="absolute -bottom-[1px] w-24 h-[2px] bg-[#d4af37]" />
                                        <div className="flex items-center gap-3 mb-4">
                                            <Crown className="w-6 h-6 text-[#d4af37]" />
                                            <h2 className="text-[#d4af37] font-semibold text-sm tracking-[0.2em] uppercase">WRA Warrant Tour</h2>
                                            <Crown className="w-6 h-6 text-[#d4af37]" />
                                        </div>
                                        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-widest font-serif drop-shadow-lg">{selectedImage.title}</h1>
                                        <p className="text-[#d4af37]/80 font-serif tracking-widest mt-2 text-sm md:text-base">{palaceData[selectedImage.title]?.subtitle}</p>
                                    </div>

                                    {/* Intro Text */}
                                    <div className="relative py-6 px-4">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 opacity-20">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1"><path d="M10 11h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4l-2 8zm10 0h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4l-2 8z"></path></svg>
                                        </div>
                                        <p className="text-xl md:text-2xl font-serif font-medium text-[#fceda6] leading-[1.8] tracking-wide drop-shadow-md z-10 relative break-keep word-break-keep-all text-center">
                                            {palaceData[selectedImage.title].intro.map((line: string, idx: number) => (
                                                <span key={idx} className="block mb-2 md:mb-1 last:mb-0">
                                                    {line}
                                                </span>
                                            ))}
                                        </p>
                                    </div>

                                    {/* Detailed Content API */}
                                    <div className="space-y-4 text-white/80 text-base md:text-lg leading-relaxed md:leading-[1.8] tracking-wide text-justify px-4 md:px-8 break-keep">
                                        {palaceData[selectedImage.title].sections.map((section: any, idx: number) => (
                                            <div
                                                key={idx}
                                                className="border border-[#d4af37]/30 bg-[#0a1128]/60 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300"
                                            >
                                                <button
                                                    onClick={() => setExpandedSection(expandedSection === idx ? null : idx)}
                                                    className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-[#d4af37]/10 transition-colors"
                                                >
                                                    <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-3 break-keep">
                                                        <span className="text-[#d4af37] text-2xl font-serif italic">{idx + 1}.</span>
                                                        {section.title}
                                                    </h3>
                                                    <ChevronDown className={`w-5 h-5 text-[#d4af37] transition-transform duration-300 shrink-0 ${expandedSection === idx ? 'rotate-180' : ''}`} />
                                                </button>

                                                <div
                                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedSection === idx ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}
                                                >
                                                    <div className="p-6 pt-0 border-t border-[#d4af37]/10 mt-2 space-y-6">
                                                        {section.paragraphs.map((p: string, pIdx: number) => (
                                                            <p key={pIdx} className="whitespace-pre-line">{p}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Thumbnail Image Gallery */}
                                    <div className="pt-12 pb-8">
                                        <div className="flex items-center justify-center gap-4 mb-8 opacity-60">
                                            <div className="w-16 h-[1px] bg-[#d4af37]"></div>
                                            <span className="text-[#d4af37] font-serif italic text-sm">{selectedImage.title} Gallery</span>
                                            <div className="w-16 h-[1px] bg-[#d4af37]"></div>
                                        </div>

                                        <div className="bg-[#0a1128]/80 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-[#d4af37]/20 shadow-xl max-w-4xl mx-auto">
                                            {/* Main Image */}
                                            <div className="relative w-full aspect-[3/4] md:aspect-[4/5] rounded-xl overflow-hidden mb-6 shadow-lg border border-[#d4af37]/30 bg-black/50">
                                                <img
                                                    src={palaceData[selectedImage.title].gallery[activeGalleryIndex].src}
                                                    alt={palaceData[selectedImage.title].gallery[activeGalleryIndex].caption}
                                                    className="w-full h-full object-contain"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-12">
                                                    <p className="text-white text-center font-serif text-lg md:text-xl tracking-wide">
                                                        {palaceData[selectedImage.title].gallery[activeGalleryIndex].caption}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Thumbnails bg-[#050510]/50 rounded-xl p-3 */}
                                            <div className="flex justify-center flex-wrap gap-3">
                                                {palaceData[selectedImage.title].gallery.map((img: any, idx: number) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setActiveGalleryIndex(idx)}
                                                        className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${activeGalleryIndex === idx
                                                            ? 'ring-2 ring-[#d4af37] ring-offset-2 ring-offset-[#0a1128] scale-105 opacity-100'
                                                            : 'border border-white/10 opacity-60 hover:opacity-100 hover:scale-105'
                                                            }`}
                                                    >
                                                        <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="relative max-w-5xl max-h-[85vh] flex flex-col w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300 bg-[#050510]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button Inside Modal (For Standard Image Modal) */}
                            <button
                                className="absolute top-4 right-4 z-[120] text-white/70 hover:text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition-colors backdrop-blur-sm"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="border-2 border-[#d4af37]/30 rounded-2xl p-2 relative flex flex-col items-center justify-center flex-1 overflow-hidden">
                                <img
                                    src={selectedImage.src}
                                    alt={selectedImage.title}
                                    className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                                />
                                <div className="absolute bottom-4 left-4 right-4 p-6 bg-gradient-to-t from-black via-black/80 to-transparent rounded-b-xl pointer-events-none">
                                    <h3 className="text-3xl font-bold text-[#d4af37] tracking-wider mb-1">{selectedImage.title}</h3>
                                    <p className="text-white/70">World Royal Academy Premium Tour</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
