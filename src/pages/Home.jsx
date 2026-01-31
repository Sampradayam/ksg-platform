import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutPreview from '../components/AboutPreview';
import FeaturedPrograms from '../components/FeaturedPrograms';
import GalleryPreview from '../components/GalleryPreview';
import HighlightsCards from '../components/HighlightsCards';
import CTABand from '../components/CTABand';

function Home() {
  return (
    <div>
      <HeroSection />
      <AboutPreview />
      <FeaturedPrograms />
      <GalleryPreview />
      <HighlightsCards />
      <CTABand />
    </div>
  );
}

export default Home;