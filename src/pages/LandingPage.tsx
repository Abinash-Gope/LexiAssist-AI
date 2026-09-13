import React from 'react';
import { HeroSection, ContractTeaserSection } from '@/components/landing';
import { Footer } from '@/components/layout/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-10 sm:space-y-12 pb-0">
      {/* Hero Section */}
      <HeroSection />

      {/* Live Contract Teaser Preview Card */}
      <ContractTeaserSection />

      {/* Footer is rendered ONLY on the Hero Screen */}
      <Footer />
    </div>
  );
};
