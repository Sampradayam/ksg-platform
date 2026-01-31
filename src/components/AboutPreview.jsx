import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

const AboutPreview = ({
  description,
  onReadMoreClick,
  loading = false,
  error = null,
}) => {
  const { t } = useTranslation();

  const displayDescription = description || t('about.description');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onReadMoreClick?.();
    }
  };

  if (loading) {
    return (
      <section className="about-preview py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('about.loading')}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="about-preview py-16 px-4">
        <div className="container mx-auto text-center">
          <p className="text-red-600">{t('about.error')}: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="about-preview py-16 px-4 bg-white" aria-labelledby="about-title">
      <div className="container mx-auto max-w-4xl">
        <h2 id="about-title" className="text-3xl font-bold text-center mb-8">
          {t('about.title')}
        </h2>
        <p className="text-lg text-gray-700 mb-8 text-center">
          {displayDescription}
        </p>
        <div className="text-center">
          <button
            onClick={onReadMoreClick}
            onKeyDown={handleKeyDown}
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            aria-label={t('about.readMore')}
          >
            {t('about.readMore')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;