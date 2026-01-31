import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

const CTABand = ({
  title,
  description,
  buttonText,
  onButtonClick,
  loading = false,
  error = null,
}) => {
  const { t } = useTranslation();

  const displayTitle = title || t('cta.title');
  const displayDescription = description || t('cta.description');
  const displayButtonText = buttonText || t('cta.button');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onButtonClick?.();
    }
  };

  if (loading) {
    return (
      <section className="cta-band bg-blue-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4">{t('cta.loading')}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="cta-band bg-red-500 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <p>{t('cta.error')}: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="cta-band bg-blue-600 text-white py-16 px-4"
      role="complementary"
      aria-labelledby="cta-title"
    >
      <div className="container mx-auto text-center max-w-2xl">
        <h2 id="cta-title" className="text-3xl font-bold mb-4">
          {displayTitle}
        </h2>
        <p className="text-lg mb-8 opacity-90">
          {displayDescription}
        </p>
        <button
          onClick={onButtonClick}
          onKeyDown={handleKeyDown}
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors"
          aria-label={displayButtonText}
        >
          {displayButtonText}
        </button>
      </div>
    </section>
  );
};

export default CTABand;