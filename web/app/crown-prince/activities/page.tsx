'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Globe, Landmark, Heart, Crown, GraduationCap, Trophy } from 'lucide-react';

const activities = [
    {
        icon: <Crown className="w-8 h-8" />,
        category: '제향 주관',
        categoryEn: 'Royal Rites & Ceremonies',
        items: [
            '종묘대제 초헌관 봉직 (UNESCO 세계무형유산)',
            '사직대제 초헌관 봉직',
            '환구대제 초헌관 봉직 (대한제국 고유 황제의례)',
            '왕실과 황실의 주요 5대 제향에서 국왕 역할 수행',
        ],
    },
    {
        icon: <Landmark className="w-8 h-8" />,
        category: '문화재 환수',
        categoryEn: 'Heritage Restoration',
        items: [
            '명성황후 화조도접선 환수 (서울역사박물관 기증)',
            '황실 노리개 등 국보급 문화재 환수',
            '일제강점기 해외 유출 왕실 문화재 환수 활동',
            '국립고궁박물관 협력 보존 프로젝트',
        ],
    },
    {
        icon: <Globe className="w-8 h-8" />,
        category: '국제 외교 및 교류',
        categoryEn: 'International Diplomacy',
        items: [
            '인도네시아 왕실 문화 교류',
            '태국 왕실 친선 방문',
            '2025 세계왕실전통문화엑스포 개최 추진',
            '유럽 문화기관 네트워크 구축',
        ],
    },
    {
        icon: <Trophy className="w-8 h-8" />,
        category: '궁중문화축전',
        categoryEn: 'Royal Culture Festival',
        items: [
            '대한황실문화원 총재로서 2014년 기획',
            '왕실 문화유산을 신한류 콘텐츠로 발전',
            '매년 개최되는 대한민국 대표 왕실 문화 행사',
        ],
    },
    {
        icon: <GraduationCap className="w-8 h-8" />,
        category: '학술 활동',
        categoryEn: 'Academic Activities',
        items: [
            '미국 컬럼비아대학교 강연',
            '조선 대한 황실 문화 계승 발전 세계화 연구',
            '한국 궁중문화의 글로벌 학술 활동',
        ],
    },
    {
        icon: <Heart className="w-8 h-8" />,
        category: '사회 공헌',
        categoryEn: 'Social Contribution',
        items: [
            '노블레스 오블리주 실천',
            '청소년 문화 교육 지원',
            '글로벌 장학금 사업',
        ],
    },
];

export default function ActivitiesPage() {
    const { dict } = useLanguage();

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={dict.pages.crownPrince.activitiesTitle} subtitle={dict.pages.crownPrince.activitiesDesc} compact />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader title="황태손 전하의 주요 활동" subtitle="Activities of His Imperial Highness the Crown Prince" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activities.map((act, i) => (
                            <GlassCard key={i} delay={i * 0.1}>
                                <div className="text-[#d4af37] mb-4">{act.icon}</div>
                                <h3 className="text-lg font-bold text-white mb-1">{act.category}</h3>
                                <p className="text-[#d4af37]/60 text-sm mb-4">{act.categoryEn}</p>
                                <ul className="space-y-2">
                                    {act.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-2 text-gray-400 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/40 mt-1.5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
