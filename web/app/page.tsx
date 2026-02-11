'use client';

import { HeroSection } from '@/components/home/HeroSection';
import { Royal33Section } from '@/components/home/Royal33Section';
import { DigitalSealSection } from '@/components/home/DigitalSealSection';
import { CeoProgramSection } from '@/components/home/CeoProgramSection';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function Home() {
  const { dict } = useLanguage();

  return (
    <div className="relative overflow-hidden bg-[#050510]">
      {/* Hero Section (Video Background) */}
      <HeroSection />

      {/* The Royal 33 Membership */}
      <section id="features">
        <Royal33Section />
      </section>

      {/* Digital Seal (Okiae) */}
      <DigitalSealSection />

      {/* CEO Program */}
      <CeoProgramSection />

      {/* Footer */}
      <footer className="py-10 border-t border-white/5 text-center text-gray-500 text-sm bg-black/50 backdrop-blur-md">
        {dict.home.footer}
      </footer>
    </div>
  );
}
