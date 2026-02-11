'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
    { q: 'WRA 회원가입은 어떻게 하나요?', a: '홈페이지 우측 상단의 "로그인 / 회원가입" 버튼을 클릭하여 가입할 수 있습니다. 구글 계정 또는 이메일로 가입이 가능합니다.', qEn: 'How do I sign up?', aEn: 'Click the "Login / Sign Up" button at the top right of the homepage. You can register with a Google account or email.' },
    { q: 'K-Royal Warrant 인증을 받으려면?', a: '인증 페이지에서 신청 양식을 작성하고 제출하시면, 심사 위원회의 검토를 거쳐 인증 여부가 결정됩니다.', qEn: 'How to get K-Royal Warrant certification?', aEn: 'Fill out the application form on the certification page. After review by the committee, the certification decision will be made.' },
    { q: 'The Royal 33 멤버십 자격요건은?', a: 'The Royal 33은 K-Royal Warrant 인증을 받은 CEO 중에서 선정됩니다. 자세한 자격요건은 멤버십 페이지를 참고하세요.', qEn: 'What are the qualifications for The Royal 33?', aEn: 'The Royal 33 is selected from K-Royal Warrant certified CEOs. See the membership page for details.' },
    { q: '교육 프로그램은 온라인으로 참여할 수 있나요?', a: '네, LMS 플랫폼을 통해 VOD 강의와 온라인 학습이 가능합니다. 일부 프로그램은 오프라인 참석이 필요할 수 있습니다.', qEn: 'Can I participate in education programs online?', aEn: 'Yes, VOD lectures and online learning are available through our LMS platform. Some programs may require offline attendance.' },
];

export default function QnAPage() {
    const { dict } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={dict.pages.community.qnaTitle} compact />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <GlassCard key={i} delay={i * 0.06} hover={false} className="cursor-pointer" >
                                <button
                                    className="w-full text-left flex items-start justify-between gap-4"
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                >
                                    <div className="flex items-start gap-3">
                                        <HelpCircle className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h3 className="text-white font-medium">{faq.q}</h3>
                                            <p className="text-gray-500 text-xs mt-1">{faq.qEn}</p>
                                        </div>
                                    </div>
                                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                                </button>
                                {openIndex === i && (
                                    <div className="mt-4 pt-4 border-t border-white/5 ml-8">
                                        <p className="text-gray-300 text-sm">{faq.a}</p>
                                        <p className="text-gray-500 text-xs mt-2">{faq.aEn}</p>
                                    </div>
                                )}
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
