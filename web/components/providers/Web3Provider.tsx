'use client';

import * as React from 'react';
import {
    RainbowKitProvider,
    darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    QueryClientProvider,
    QueryClient,
} from '@tanstack/react-query';
import { config } from '@/lib/config';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

export default function Web3Provider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme()}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
