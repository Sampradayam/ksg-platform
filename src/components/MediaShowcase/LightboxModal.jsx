import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from '../../i18n/useTranslation';

const LightboxModal = ({ items = [], initialIndex = 0, onClose }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const previouslyFocused = useRef(null);
  const touchStart = useRef(null);

  const currentItem = items[currentIndex] || {};
  const total = items.length;

  const next = useCallback(() => setCurrentIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setCurrentIndex((i) => (i - 1 + total) % total), [total]);

  // keyboard
  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === 'Escape') return onClose();
      if (e.key === 'ArrowRight') return next();
      if (e.key === 'ArrowLeft') return prev();
      if (e.key === 'Tab') {
        // basic focus trap
        const focusable = contentRef.current?.querySelectorAll('button,a,[tabindex]:not([tabindex="-1"])') || [];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [onClose, next, prev]);

  // focus management
  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    overlayRef.current?.focus();
    return () => {
      previouslyFocused.current?.focus?.();
    };
  }, []);

  // swipe gestures
  const handleTouchStart = (e) => (touchStart.current = e.touches[0].clientX);
  const handleTouchMove = (e) => {
    if (!touchStart.current) return;
    const delta = touchStart.current - e.touches[0].clientX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) next();
      else prev();
      touchStart.current = null;
    }
  };

  if (!items.length) return null;

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      ref={overlayRef}
      tabIndex={-1}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()} ref={contentRef}>
        <button className="close-btn" onClick={onClose} aria-label={t('media.close', 'Close')}>
          &times;
        </button>

        <h2 id="lightbox-title">{t(currentItem.titleKey, currentItem.titleFallback)}</h2>
        <p>{t(currentItem.descriptionKey, currentItem.descriptionFallback)}</p>

        <div className="lightbox-media-wrap">
          {currentItem.type === 'image' ? (
            <img src={currentItem.src} alt={t(currentItem.titleKey, currentItem.titleFallback)} className="lightbox-media" />
          ) : (
            <video src={currentItem.src} controls autoPlay className="lightbox-media">
              {t('media.videoNotSupported', 'Your browser does not support the video tag.')}
            </video>
          )}
        </div>

        <div className="nav-arrows" aria-hidden={false}>
          <button onClick={prev} aria-label={t('media.prev', 'Previous')}>←</button>
          <button onClick={next} aria-label={t('media.next', 'Next')}>→</button>
        </div>

        <p className="sr-only">{t('media.position', 'Item {{index}} of {{total}}', { index: currentIndex + 1, total })}</p>
      </div>
    </div>
  );
};

export default LightboxModal;
