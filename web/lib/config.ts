import { http, createStorage, cookieStorage } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

// Wagmi / RainbowKit Config
// Replace the projectId with your own from https://cloud.walletconnect.com for production
export const config = getDefaultConfig({
    appName: 'World Royal Academy',
    projectId: '3a8170812b534d0ff9d794f19a901d64', // Demo ID
    chains: [mainnet, sepolia],
    ssr: true,
    storage: createStorage({
        storage: cookieStorage,
    }),
});
