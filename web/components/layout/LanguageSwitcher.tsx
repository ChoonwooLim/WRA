'use client';

import { Globe } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <button
            onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
            aria-label="Toggle Language"
        >
            <Globe size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
            <span className="text-xs font-semibold text-gray-300 uppercase w-5 text-center">
                {language.toUpperCase()}
            </span>
        </button>
    );
}
