import React, { lazy, Suspense } from 'react'
import { t } from '../../i18n.js'
import { videos, news, events, posts } from '../../data/sampleMedia' 

const VideoSection = lazy(() => import('./VideoSection/VideoSection'))
const SocialFeed = lazy(() => import('./SocialFeed/SocialFeed'))
import NewsCards from './NewsCards/NewsCards'
import EventHighlights from './EventHighlights/EventHighlights'

export default function MediaPressPage() {
  return (
    <section aria-labelledby="media-title" className="media-grid" role="region">
      <h2 id="media-title" className="sr-only">{t('media.title')}</h2>

      <div className="card" aria-label={t('media.videos.title')}>
        <h2>{t('media.videos.title')}</h2>
        <Suspense fallback={<div role="status">Loading videos…</div>}>
          <VideoSection videos={videos} />
        </Suspense>
      </div>

      <aside>
        <div className="card" aria-label={t('media.news.title')}>
          <h2>{t('media.news.title')}</h2>
          <NewsCards items={news} />
        </div>

        <div className="card" style={{ marginTop: 16 }} aria-label={t('media.events.title')}>
          <h2>{t('media.events.title')}</h2>
          <EventHighlights items={events} />
        </div>

        <div className="card" style={{ marginTop: 16 }} aria-label={t('media.social.title')}>
          <h2>{t('media.social.title')}</h2>
          <Suspense fallback={<div role="status">Loading social feed…</div>}>
            <SocialFeed posts={posts} />
          </Suspense>
        </div>
      </aside>
    </section>
  )
}
