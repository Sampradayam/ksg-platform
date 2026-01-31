import { useState } from 'react';
import { useTranslation } from '../../i18n/useTranslation';

const categories = ['All', 'Performances', 'Tutorials', 'Festivals'];

const MediaFilter = ({ activeFilter = 'All', onFilterChange }) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(activeFilter);

  const handleFilter = (cat) => {
    setActive(cat);
    onFilterChange?.(cat);
  };

  return (
    <div className="media-filters" role="tablist" aria-label={t('media.filters', 'Media filters')}> 
      {categories.map((cat) => (
        <button
          key={cat}
          className={`filter-btn ${active === cat ? 'active' : ''}`}
          onClick={() => handleFilter(cat)}
          role="tab"
          aria-selected={active === cat}
          aria-controls="media-grid"
        >
          {t(`media.categories.${cat.toLowerCase()}`, cat)}
        </button>
      ))}
    </div>
  );
};

export default MediaFilter;
