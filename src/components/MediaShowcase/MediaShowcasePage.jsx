import { useState } from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import MediaFilter from './MediaFilter';
import MediaGrid from './MediaGrid';
import './media.css';

const MediaShowcasePage = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('All');

  return (
    <section className="media-section" aria-labelledby="media-heading">
      <h1 id="media-heading">{t('media.title', 'Media Showcase')}</h1>

      <MediaFilter activeFilter={filter} onFilterChange={setFilter} />

      <MediaGrid filter={filter} />
    </section>
  );
};

export default MediaShowcasePage;
