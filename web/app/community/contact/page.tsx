'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Phone, Mail, Crown, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const { dict } = useLanguage();
    const d = dict.pages.community;
    const f = dict.footer;
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.contactTitle} subtitle={d.contactDesc} compact />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact Info */}
                        <div className="space-y-4">
                            <GlassCard>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium text-sm">전화</h3>
                                        <p className="text-gray-400">{f.phone}</p>
                                    </div>
                                </div>
                            </GlassCard>
                            <GlassCard delay={0.1}>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium text-sm">이메일</h3>
                                        <p className="text-gray-400">{f.email}</p>
                                    </div>
                                </div>
                            </GlassCard>
                            <GlassCard delay={0.2}>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                                        <Crown className="w-5 h-5 text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium text-sm">SNS</h3>
                                        <p className="text-gray-400">{f.sns}</p>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>

                        {/* Contact Form */}
                        <GlassCard>
                            {submitted ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                                        <Send className="w-7 h-7 text-emerald-400" />
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-2">전송 완료</h3>
                                    <p className="text-gray-400 text-sm">문의가 접수되었습니다. 빠른 시일 내 답변 드리겠습니다.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder={d.namePlaceholder}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#d4af37]/40 focus:outline-none transition-colors"
                                    />
                                    <input
                                        type="email"
                                        placeholder={d.emailPlaceholder}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#d4af37]/40 focus:outline-none transition-colors"
                                    />
                                    <input
                                        type="text"
                                        placeholder={d.subjectPlaceholder}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#d4af37]/40 focus:outline-none transition-colors"
                                    />
                                    <textarea
                                        placeholder={d.messagePlaceholder}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#d4af37]/40 focus:outline-none transition-colors resize-none"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black font-semibold hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        {d.submit}
                                    </button>
                                </form>
                            )}
                        </GlassCard>
                    </div>
                </div>
            </section>
        </div>
    );
}
