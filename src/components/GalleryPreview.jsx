import React from 'react';
import { useTranslation } from '../i18n/useTranslation';

const GalleryPreview = ({
  images,
  onViewAllClick,
  loading = false,
  error = null,
  onImageClick,
}) => {
  const { t } = useTranslation();

  // Placeholder images
  const defaultImages = [
    { src: 'https://via.placeholder.com/300x200?text=Image+1', alt: 'Gallery Image 1' },
    { src: 'https://via.placeholder.com/300x200?text=Image+2', alt: 'Gallery Image 2' },
    { src: 'https://via.placeholder.com/300x200?text=Image+3', alt: 'Gallery Image 3' },
    { src: 'https://via.placeholder.com/300x200?text=Image+4', alt: 'Gallery Image 4' },
  ];

  const displayImages = images || defaultImages;

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onImageClick?.(index);
    }
  };

  const handleViewAllKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onViewAllClick?.();
    }
  };

  if (loading) {
    return (
      <section className="gallery-preview py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('gallery.loading')}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="gallery-preview py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <p className="text-red-600">{t('gallery.error')}: {error}</p>
        </div>
      </section>
    );
  }

  if (!displayImages || displayImages.length === 0) {
    return (
      <section className="gallery-preview py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">{t('gallery.empty')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="gallery-preview py-16 px-4 bg-white" aria-labelledby="gallery-title">
      <div className="container mx-auto">
        <h2 id="gallery-title" className="text-3xl font-bold text-center mb-12">
          {t('gallery.title')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {displayImages.slice(0, 4).map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-opacity"
              onClick={() => onImageClick?.(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={0}
              role="button"
            />
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={onViewAllClick}
            onKeyDown={handleViewAllKeyDown}
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            aria-label={t('gallery.viewAll')}
          >
            {t('gallery.viewAll')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;