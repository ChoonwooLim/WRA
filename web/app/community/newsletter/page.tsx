'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Mail, Send, Calendar, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Post {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    author?: {
        name: string | null;
        email: string | null;
    };
}

export default function NewsletterPage() {
    const { dict } = useLanguage();
    const d = dict.pages.community;
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resultMsg, setResultMsg] = useState<string>('구독 신청이 완료되었습니다. 감사합니다!');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!consent) {
            setError('뉴스레터 수신 동의에 체크해주세요.');
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, consent: true }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setError(data.error || '구독 처리에 실패했습니다.');
                return;
            }
            if (data.alreadySubscribed) {
                setResultMsg('이미 구독 중인 이메일입니다. 감사합니다!');
            } else if (data.resubscribed) {
                setResultMsg('다시 구독되었습니다. 환영합니다!');
            } else {
                setResultMsg('구독 신청이 완료되었습니다. 감사합니다!');
            }
            setSubmitted(true);
            setEmail('');
            setConsent(false);
        } catch {
            setError('네트워크 오류가 발생했습니다.');
        } finally {
            setSubmitting(false);
        }
    };

    const [newsletters, setNewsletters] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewsletters = async () => {
            try {
                const res = await fetch('/api/posts?board=newsletter&limit=6');
                const data = await res.json();
                setNewsletters(data.posts || []);
            } catch (error) {
                console.error('Failed to fetch newsletters:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNewsletters();
    }, []);

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.newsletterTitle} subtitle={d.newsletterDesc} compact />

            {/* Subscription Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-lg">
                    <GlassCard className="p-10 text-center">
                        <Mail className="w-12 h-12 text-[#d4af37] mx-auto mb-6" />
                        <h3 className="text-xl font-bold text-white mb-2">{d.newsletterTitle}</h3>
                        <p className="text-gray-400 text-sm mb-8">{d.newsletterDesc}</p>

                        {submitted ? (
                            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                                ✓ {resultMsg}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={d.emailPlaceholder}
                                    required
                                    disabled={submitting}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#d4af37]/40 focus:outline-none transition-colors disabled:opacity-60"
                                />
                                <label className="flex items-start gap-3 text-left text-xs text-gray-400 cursor-pointer leading-relaxed">
                                    <input
                                        type="checkbox"
                                        checked={consent}
                                        onChange={(e) => setConsent(e.target.checked)}
                                        disabled={submitting}
                                        className="mt-0.5 rounded bg-white/10 border-white/20 cursor-pointer flex-shrink-0"
                                    />
                                    <span>
                                        <span className="text-[#d4af37]">(필수)</span> 세계왕립아카데미의 뉴스레터 및 행사·프로그램 소식을 이메일로 수신하는 것에 동의합니다.
                                        언제든지 메일 하단의 수신거부 링크로 해지할 수 있습니다.
                                    </span>
                                </label>
                                {error && (
                                    <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-left">
                                        {error}
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black font-semibold hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4" />
                                    {submitting ? '구독 신청 중...' : d.subscribe}
                                </button>
                            </form>
                        )}
                    </GlassCard>
                </div>
            </section>

            {/* Published Newsletters Section */}
            <section className="py-20 bg-gradient-to-b from-[#0a1128] to-[#050510] relative border-t border-white/5">
                <div className="absolute inset-0 bg-[url('/images/royal_navy_damask_bg.png')] bg-repeat opacity-[0.02] pointer-events-none mix-blend-overlay" />
                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <SectionHeader title="Published Newsletters" subtitle="발간된 뉴스레터 모아보기" />

                    {loading ? (
                        <div className="text-center py-10 text-[#d4af37]/60">불러오는 중...</div>
                    ) : newsletters.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">아직 발간된 뉴스레터가 없습니다.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {newsletters.map((item) => (
                                <Link href={`/community/post/${item.id}`} key={item.id} className="block group h-full">
                                    <GlassCard className="h-full cursor-pointer hover:!border-[#d4af37]/50 transition-all duration-300 flex flex-col bg-[#0a0f25]/60 hover:bg-[#0a0f25]/90">
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex items-center gap-2 text-[#d4af37] text-sm mb-4">
                                                <Calendar className="w-4 h-4" />
                                                <span className="font-medium tracking-wide">
                                                    {new Date(item.createdAt).toLocaleDateString('ko-KR')}
                                                </span>
                                            </div>
                                            <h4 className="text-xl font-bold text-white mb-4 group-hover:text-[#fceda6] transition-colors leading-relaxed break-keep line-clamp-2">
                                                {item.title}
                                            </h4>
                                            <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-8 break-keep line-clamp-3 overflow-hidden text-ellipsis display-webkit-box webkit-line-clamp-3 webkit-box-orient-vertical">
                                                {item.content.replace(/<[^>]*>?/gm, '')}
                                            </p>

                                            <div className="flex items-center text-[#d4af37] text-sm font-semibold mt-auto pt-4 border-t border-white/10 group-hover:border-[#d4af37]/30 transition-colors">
                                                뉴스레터 읽기 <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
                                            </div>
                                        </div>
                                    </GlassCard>
                                </Link>
                            ))}
                        </div>
                    )}

                    {!loading && newsletters.length > 0 && (
                        <div className="mt-16 text-center">
                            <Link href="/community" className="px-8 py-3 rounded-full border border-[#d4af37]/50 text-[#d4af37] font-medium hover:bg-[#d4af37]/10 transition-colors inline-block">
                                커뮤니티 홈으로 가기
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
