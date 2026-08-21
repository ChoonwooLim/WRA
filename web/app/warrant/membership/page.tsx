'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Crown, Globe, Shield, Star, Users, Gem } from 'lucide-react';

const membershipBenefits = [
    {
        icon: <Globe className="w-7 h-7" />,
        title: '글로벌 네트워킹',
        desc: '',
    },
    {
        icon: <Crown className="w-7 h-7" />,
        title: '왕실 이너서클 네트워킹',
        desc: 'WRA 공식 멤버 인증 및 디지털 주권(Digital Sovereignty) 확보.',
    },
    {
        icon: <Shield className="w-7 h-7" />,
        title: 'DAO거버넌스',
        desc: '블록체인 스마트계약을 기반으로 운영되는 탈 중앙 조직.',
    },
];

export default function MembershipPage() {
    const { dict } = useLanguage();

    return (
        <div className="bg-[#050510] min-h-screen">
            {/* Overview */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <GlassCard delay={0.1} className="!bg-[#0a0f25]/80 !border-[#d4af37]/20 p-8 md:p-12 text-center mb-12">
                        <Crown className="w-12 h-12 text-[#d4af37] mx-auto mb-6 opacity-80" />
                        <h3 className="text-xl md:text-2xl font-serif text-[#fceda6] font-medium leading-relaxed break-keep mb-4">
                            세계왕립아카데미 멤버십
                        </h3>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed break-keep max-w-2xl mx-auto">
                            WRA 멤버십은 대한민국과 세계를 잇는 문화 외교 네트워크에 참여할 수 있는 특별한 기회입니다.
                            글로벌 리더들과의 독점적인 교류, 프리미엄 교육 프로그램, 그리고 블록체인 기반의 디지털 인증을 경험하세요.
                        </p>
                    </GlassCard>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="pb-24">
                <div className="container mx-auto px-4 max-w-5xl">
                    <SectionHeader
                        title="혜  택"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {membershipBenefits.map((benefit, i) => (
                            <GlassCard key={i} delay={i * 0.08} className="text-center">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 flex items-center justify-center mx-auto mb-4 border border-[#d4af37]/20">
                                    <div className="text-[#d4af37]">{benefit.icon}</div>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed break-keep">{benefit.desc}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-t from-[#020205] to-[#050510]">
                <div className="container mx-auto px-4 max-w-4xl">
                    <GlassCard className="p-10 text-center !bg-gradient-to-br !from-[#d4af37]/5 !to-[#d4af37]/0 !border-[#d4af37]/20">
                        <h3 className="text-xl font-bold text-white mb-3">멤버십 신청</h3>
                        <p className="text-gray-400 text-sm mb-6 max-w-xl mx-auto break-keep">
                            WRA 멤버십에 관심이 있으신 분은 아래 버튼을 통해 상담을 요청해 주세요.
                        </p>
                        <a
                            href="/community/contact"
                            className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black font-semibold hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all"
                        >
                            멤버십 문의하기
                        </a>
                    </GlassCard>
                </div>
            </section>
        </div>
    );
}
