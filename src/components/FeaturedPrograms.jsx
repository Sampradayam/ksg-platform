import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

const FeaturedPrograms = ({
  programs,
  loading = false,
  error = null,
  onProgramClick,
}) => {
  const { t } = useTranslation();

  const defaultPrograms = t('featuredPrograms.programs', { returnObjects: true });

  const displayPrograms = programs || defaultPrograms;

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onProgramClick?.(index);
    }
  };

  if (loading) {
    return (
      <section className="featured-programs py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('featuredPrograms.loading')}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="featured-programs py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <p className="text-red-600">{t('featuredPrograms.error')}: {error}</p>
        </div>
      </section>
    );
  }

  if (!displayPrograms || displayPrograms.length === 0) {
    return (
      <section className="featured-programs py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">{t('featuredPrograms.empty')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-programs py-16 px-4 bg-gray-50" aria-labelledby="programs-title">
      <div className="container mx-auto">
        <h2 id="programs-title" className="text-3xl font-bold text-center mb-12">
          {t('featuredPrograms.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPrograms.map((program, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => onProgramClick?.(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={0}
              role="button"
              aria-label={`${program.title}: ${program.description}`}
            >
              <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
              <p className="text-gray-600">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;