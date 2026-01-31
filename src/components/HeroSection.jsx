import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

const HeroSection = ({
  onCtaClick,
  loading = false,
  error = null,
}) => {
  const { t } = useTranslation();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onCtaClick?.();
    }
  };

  if (loading) {
    return (
      <section className="hero-section bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4">{t('hero.loading')}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="hero-section bg-red-500 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <p>{t('hero.error')}: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="hero-section bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-4"
      role="banner"
      aria-labelledby="hero-title"
    >
      <div className="container mx-auto text-center max-w-4xl">
        <h1
          id="hero-title"
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          {t('hero.subtitle')}
        </p>
        <button
          onClick={onCtaClick}
          onKeyDown={handleKeyDown}
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors"
          aria-label={t('hero.cta')}
        >
          {t('hero.cta')}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;