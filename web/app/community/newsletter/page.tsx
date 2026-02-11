'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Mail, Send } from 'lucide-react';
import { useState } from 'react';

export default function NewsletterPage() {
    const { dict } = useLanguage();
    const d = dict.pages.community;
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setEmail('');
    };

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title={d.newsletterTitle} subtitle={d.newsletterDesc} compact />

            <section className="py-20">
                <div className="container mx-auto px-4 max-w-lg">
                    <GlassCard className="p-10 text-center">
                        <Mail className="w-12 h-12 text-[#d4af37] mx-auto mb-6" />
                        <h3 className="text-xl font-bold text-white mb-2">{d.newsletterTitle}</h3>
                        <p className="text-gray-400 text-sm mb-8">{d.newsletterDesc}</p>

                        {submitted ? (
                            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                                ✓ 구독 신청이 완료되었습니다. 감사합니다!
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={d.emailPlaceholder}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#d4af37]/40 focus:outline-none transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black font-semibold hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    {d.subscribe}
                                </button>
                            </form>
                        )}
                    </GlassCard>
                </div>
            </section>
        </div>
    );
}
