'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { MapPin, Clock, Users, Landmark, Crown, Globe, X, ChevronDown } from 'lucide-react';
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
                        "죽어있는 유적지는 감동을 줄 수 없습니다.\n그러기에 끊어진 황실의 제례와 문화를 현대적으로 재해석하여 <궁중문화축전>을 기획했습니다.",
                        "매년 열리는 이 축전은 단순한 관광 상품이 아닙니다.\n격조 높은 황실의 진수를 전 세계인과 공유하며, 과거의 아픔을 평화와 축제의 장으로 승화시킨 '문화 외교'의 현장입니다.\n가장 한국적인 것이 가장 세계적인 것임을 증명하며, 이제 경복궁은 세계인이 찾아와 한국의 미(美)와 정신을 체험하는 글로벌 명소가 되었습니다."
                    ]
                }
            ],
            gallery: [
                { src: '/images/palaces/real-gyeongbokgung.png', caption: '근정전의 장엄한 자태' },
                { src: '/images/palaces/gyeongbokgung.png', caption: '경회루의 고즈넉한 풍경' },
                { src: '/images/palaces/changdeokgung.png', caption: '창덕궁 전경 (준비중)' },
                { src: '/images/palaces/deoksugung.png', caption: '덕수궁 석조전 (준비중)' },
                { src: '/images/palaces/gyeonghuigung.png', caption: '경희궁 숭정전 (준비중)' }
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
                    title: "황실의 마지막 숨결: 낙선재와 대한제국",
                    paragraphs: [
                        "이곳은 단순한 유적지가 아닙니다.\n대한제국의 마지막 황태자비인 이방자 여사(의민황태손비)와 비운의 덕혜옹주가 1989년까지, 그리고 마지막 황세손인 이구(회은황태손) 저하께서 2005년까지 실제로 거주하셨던 '살아있는 집'이었습니다.",
                        "망국의 한을 품고도 끝까지 기품을 잃지 않았던 순정효황후, 한국 사회봉사에 평생을 바친 이방자 여사, 그리고 역사의 소용돌이 속에서 고뇌했던 회은황태손과 줄리아 리(Julia Mullock) 여사의 삶.\n이 모든 기쁨과 슬픔, 그리고 평범한 일상이 서려 있는 공간이기에 창덕궁은 더욱 특별한 울림을 줍니다."
                    ]
                },
                {
                    title: "법통의 계승: 황사손의 3년상과 새로운 약속",
                    paragraphs: [
                        "이곳은 더욱 각별한 의미를 지닙니다.\n지난 2003년, 회은황태손(이구) 저하의 양자로 이원 황사손께서 입적되어 대한제국 황실의 법통을 계승했습니다.\n그리고 2005년, 마지막 황세손께서 서거하셨을 때 저는 이곳 낙선재에서 전통 예법에 따라 3년 상을 치렀습니다.",
                        "현대 사회에서 사라져가는 '효'와 '예'의 정신을 몸소 실천하는 곳이 되었습니다.\n창덕궁은 과거의 유물이 아니라, 우리 국민들의 정신 속에 살아 숨 쉬는 현재진행형의 역사입니다."
                    ]
                }
            ],
            gallery: [
                { src: '/images/palaces/changdeokgung.png', caption: '창덕궁의 고즈넉한 정경' },
                { src: '/images/palaces/real-gyeongbokgung.png', caption: '창덕궁 갤러리 2 (임시)' },
                { src: '/images/palaces/gyeongbokgung.png', caption: '창덕궁 갤러리 3 (임시)' },
                { src: '/images/palaces/deoksugung.png', caption: '창덕궁 갤러리 4 (임시)' },
                { src: '/images/palaces/gyeonghuigung.png', caption: '창덕궁 갤러리 5 (임시)' }
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
                { src: '/images/palaces/gyeongbokgung.png', caption: '창경궁 갤러리 1 (임시)' },
                { src: '/images/palaces/real-gyeongbokgung.png', caption: '창경궁 갤러리 2 (임시)' },
                { src: '/images/palaces/changdeokgung.png', caption: '창경궁 갤러리 3 (임시)' },
                { src: '/images/palaces/deoksugung.png', caption: '창경궁 갤러리 4 (임시)' },
                { src: '/images/palaces/gyeonghuigung.png', caption: '창경궁 갤러리 5 (임시)' }
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
                { src: '/images/palaces/deoksugung.png', caption: '덕수궁의 야경' },
                { src: '/images/palaces/real-gyeongbokgung.png', caption: '덕수궁 갤러리 2 (임시)' },
                { src: '/images/palaces/gyeongbokgung.png', caption: '덕수궁 갤러리 3 (임시)' },
                { src: '/images/palaces/changdeokgung.png', caption: '덕수궁 갤러리 4 (임시)' },
                { src: '/images/palaces/gyeonghuigung.png', caption: '덕수궁 갤러리 5 (임시)' }
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
                { src: '/images/palaces/gyeonghuigung.png', caption: '경희궁의 정경' },
                { src: '/images/palaces/real-gyeongbokgung.png', caption: '경희궁 갤러리 2 (임시)' },
                { src: '/images/palaces/gyeongbokgung.png', caption: '경희궁 갤러리 3 (임시)' },
                { src: '/images/palaces/changdeokgung.png', caption: '경희궁 갤러리 4 (임시)' },
                { src: '/images/palaces/deoksugung.png', caption: '경희궁 갤러리 5 (임시)' }
            ]
        }
    };

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
                                    <button
                                        className="mt-6 px-4 py-2 rounded-full border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold hover:bg-[#d4af37]/10 transition-colors"
                                        onClick={() => setSelectedImage({ src: '/images/palaces/palaces-map.png', title: '서울 5대궁 안내도 (Map of 5 Royal Palaces)' })}
                                    >
                                        상세보기
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Royal Tombs Section */}
            <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#0a1128] to-[#050510]">
                <div className="absolute inset-0 bg-[url('/images/royal_navy_damask_bg.png')] bg-repeat opacity-[0.03] pointer-events-none mix-blend-overlay" />
                <div className="container mx-auto px-4 max-w-5xl relative z-10">
                    <SectionHeader
                        title="왕릉/왕릉제향"
                        subtitle="UNESCO World Heritage — 500년 왕조의 숨결이 깃든 신의 정원"
                    />

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
                                        <p className="text-[#d4af37]/80 font-serif tracking-widest mt-2 text-sm md:text-base">{palaceData[selectedImage.title].subtitle}</p>
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
