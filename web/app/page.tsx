'use client';

import { HeroSection } from '@/components/home/HeroSection';
import { GreetingSection } from '@/components/home/GreetingSection';
import { CoreValuesSection } from '@/components/home/CoreValuesSection';
import { WarrantHighlightSection } from '@/components/home/WarrantHighlightSection';
import { Royal33Section } from '@/components/home/Royal33Section';
import { DigitalSealSection } from '@/components/home/DigitalSealSection';
import { CeoProgramSection } from '@/components/home/CeoProgramSection';

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-[#050510]">
      <HeroSection />

      <GreetingSection />

      <CoreValuesSection />

      <section id="features">
        <WarrantHighlightSection />
      </section>

      <Royal33Section />

      <DigitalSealSection />

      <CeoProgramSection />
    </div>
  );
}
