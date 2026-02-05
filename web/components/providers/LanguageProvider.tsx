'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dictionary, en, ko } from '@/dictionaries';

type Language = 'ko' | 'en';

interface LanguageContextType {
    language: Language;
    dict: Dictionary;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    // Default to Korean
    const [language, setLanguage] = useState<Language>('ko');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Optional: Load from localStorage here if needed persistence
        const saved = localStorage.getItem('wra-lang') as Language;
        if (saved) setLanguage(saved);
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('wra-lang', lang);
    };

    const dict = language === 'ko' ? ko : en;

    // Prevent hydration mismatch by rendering children only after mount (or handle carefully)
    // For simplicity in this demo, we'll return children immediately but `dict` will switch on client
    // which might cause a flash. To fix flash, we use `isMounted` but that delays FCP.
    // Better approach for App Router is server components, but for fully dynamic toggle without reload:

    if (!isMounted) {
        // Return with default (Korean) or empty to prevent hydration error
        // returning null hurts SEO, so we return with default 'ko'
    }

    return (
        <LanguageContext.Provider value={{ language, dict, setLanguage: handleSetLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
