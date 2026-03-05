import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = 'https://xn--989ao0kixfkpc53jxpgt2bji2a.org';
const SITE_NAME = '세계왕실아카데미 | World Royal Academy';
const SITE_DESCRIPTION = '세계왕실아카데미는 대한제국 황실의 정통성을 계승하고, 왕실 교육·문화·인증 프로그램을 통해 글로벌 리더를 양성하는 기관입니다. World Royal Academy — The Premier Academy for Future Leaders.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | 세계왕실아카데미`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    '세계왕실아카데미', 'World Royal Academy', '왕실아카데미',
    '대한제국', '황실', '왕실교육', '왕실문화',
    '로열33', 'Royal33', '디지털씰', 'Digital Seal',
    '왕실인증', '왕실컨설팅', '문화유산', '황실교육',
    '왕실투어', '한국왕실', 'Korean Royal Academy',
  ],
  authors: [{ name: '세계왕실아카데미' }],
  creator: '세계왕실아카데미',
  publisher: '세계왕실아카데미',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '세계왕실아카데미 - World Royal Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: ['dr0jCLygk5XqC4jXKXnADen6Hc_Gwd5PcqmpukTwQ6c', 'uxdI5Mwi9vg-ik_ztz-FdGCo6ESGR6HICgOKrf3A9V4'],
    // Naver verification is added via other tag below
  },
  other: {
    'naver-site-verification': 'NAVER_VERIFICATION_CODE_HERE',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${dancingScript.variable} antialiased`}
      >
        <Providers>
          <Suspense>
            <LayoutShell>
              {children}
            </LayoutShell>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
