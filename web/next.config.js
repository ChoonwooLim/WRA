// NOTE: This file was added so that `next start` can load on machines where
// Next's SWC binary for TypeScript-config parsing is unavailable (e.g. Windows
// build running on Linux). It mirrors next.config.ts exactly.
// Safe to delete — Next.js will fall back to next.config.ts as before.
/** @type {import('next').NextConfig} */
module.exports = {
  typescript: { ignoreBuildErrors: true },
  serverExternalPackages: ['pino-pretty', 'lokijs', 'encoding'],
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding', '@base-org/account');
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },
};
