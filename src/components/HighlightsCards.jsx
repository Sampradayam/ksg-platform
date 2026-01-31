import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

const HighlightsCards = ({
  highlights,
  loading = false,
  error = null,
  onCardClick,
}) => {
  const { t } = useTranslation();

  const defaultHighlights = t('highlights.cards', { returnObjects: true });

  const displayHighlights = highlights || defaultHighlights;

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onCardClick?.(index);
    }
  };

  if (loading) {
    return (
      <section className="highlights-section py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('highlights.loading')}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="highlights-section py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <p className="text-red-600">{t('highlights.error')}: {error}</p>
        </div>
      </section>
    );
  }

  if (!displayHighlights || displayHighlights.length === 0) {
    return (
      <section className="highlights-section py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">{t('highlights.empty')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="highlights-section py-16 px-4 bg-gray-50" aria-labelledby="highlights-title">
      <div className="container mx-auto">
        <h2 id="highlights-title" className="text-3xl font-bold text-center mb-12">
          {t('highlights.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayHighlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => onCardClick?.(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={0}
              role="button"
              aria-label={`${highlight.title}: ${highlight.description}`}
            >
              <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
              <p className="text-gray-600">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsCards;