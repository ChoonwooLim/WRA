'use client';

import { HeroBanner } from '@/components/shared/HeroBanner';
import { GlassCard } from '@/components/shared/GlassCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Phone, Mail, Crown, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const { dict, language } = useLanguage();
    const d = dict.pages.community;
    const f = dict.footer;
    const ko = language === 'ko';
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setError(data.error || (ko ? '전송에 실패했습니다. 잠시 후 다시 시도해주세요.' : 'Send failed. Please try again shortly.'));
                return;
            }
            setSubmitted(true);
        } catch {
            setError(ko ? '네트워크 오류가 발생했습니다.' : 'A network error occurred.');
        } finally {
            setSubmitting(false);
        }
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
                                        <h3 className="text-white font-medium text-sm">{ko ? '전화' : 'Phone'}</h3>
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
                                        <h3 className="text-white font-medium text-sm">{ko ? '이메일' : 'Email'}</h3>
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
                                    <h3 className="text-white font-bold text-lg mb-2">{ko ? '전송 완료' : 'Sent Successfully'}</h3>
                                    <p className="text-gray-400 text-sm">{ko ? '문의가 접수되었습니다. 빠른 시일 내 답변 드리겠습니다.' : 'Your inquiry has been received. We will respond as soon as possible.'}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder={d.namePlaceholder}
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                                        disabled={submitting}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#d4af37]/40 focus:outline-none transition-colors disabled:opacity-60"
                                    />
                                    <input
                                        type="email"
                                        placeholder={d.emailPlaceholder}
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                                        disabled={submitting}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#d4af37]/40 focus:outline-none transition-colors disabled:opacity-60"
                                    />
                                    <input
                                        type="text"
                                        placeholder={d.subjectPlaceholder}
                                        required
                                        value={form.subject}
                                        onChange={(e) => setForm(prev => ({ ...prev, subject: e.target.value }))}
                                        disabled={submitting}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#d4af37]/40 focus:outline-none transition-colors disabled:opacity-60"
                                    />
                                    <textarea
                                        placeholder={d.messagePlaceholder}
                                        required
                                        rows={4}
                                        value={form.message}
                                        onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                                        disabled={submitting}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#d4af37]/40 focus:outline-none transition-colors resize-none disabled:opacity-60"
                                    />
                                    {error && (
                                        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                                            {error}
                                        </p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa771c] text-black font-semibold hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        <Send className="w-4 h-4" />
                                        {submitting ? (ko ? '전송 중...' : 'Sending...') : d.submit}
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
