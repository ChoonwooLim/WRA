'use client';

import * as React from 'react';
import { SessionProvider } from 'next-auth/react';
import { LanguageProvider } from '@/components/providers/LanguageProvider';

// Lazy-load heavy Web3 providers — they won't block initial page render
const Web3Provider = React.lazy(() => import('@/components/providers/Web3Provider'));

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <LanguageProvider>
                <React.Suspense fallback={children}>
                    <Web3Provider>
                        {children}
                    </Web3Provider>
                </React.Suspense>
            </LanguageProvider>
        </SessionProvider>
    );
}
