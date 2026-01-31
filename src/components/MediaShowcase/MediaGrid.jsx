import { useState, useEffect } from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import { mediaItems } from '../../data/mediaData';
import LightboxModal from './LightboxModal';

const MediaGrid = ({ filter = 'All' }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    // Simulate async fetch for performance/loading state
    setLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      try {
        const items = filter === 'All' ? mediaItems : mediaItems.filter((it) => it.category === filter);
        setFilteredItems(items);
      } catch (err) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [filter]);

  if (loading) return <p className="empty-state">{t('media.loading', 'Loading...')}</p>;
  if (error) return <p className="empty-state">{t('media.error', 'Error loading media.')}</p>;
  if (!filteredItems.length) return <p className="empty-state">{t('media.empty', 'No media found in this category.')}</p>;

  return (
    <>
      <div className="media-grid" id="media-grid" role="list">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className="media-item"
            onClick={() => setSelectedIndex(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedIndex(index)}
            aria-label={t('media.viewItem', 'View {title}', { title: t(item.titleKey, item.titleFallback) })}
          >
            <img src={item.thumbnail} alt={t(item.titleKey, item.titleFallback)} loading="lazy" />
            <p className="media-title">{t(item.titleKey, item.titleFallback)}</p>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <LightboxModal
          items={filteredItems}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
};

export default MediaGrid;
