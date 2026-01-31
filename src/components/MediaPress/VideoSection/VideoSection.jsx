import React, { useState, useCallback } from 'react'
import VideoModal from './VideoModal'
import { t } from '../../../i18n'

export default function VideoSection({ videos }) {
  const [active, setActive] = useState(null)

  const open = useCallback((v) => setActive(v), [])
  const close = useCallback(() => setActive(null), [])

  if (!videos?.length) return <div role="status">{t('media.videos.empty')}</div>

  return (
    <div>
      <ul role="list" aria-label={t('media.videos.title')} style={{ display: 'grid', gap: 12 }}>
        {videos.map((v) => (
          <li key={v.id} role="listitem">
            <button
              aria-label={t(v.titleKey) ?? v.id}
              onClick={() => open(v)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') open(v)
              }}
              style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
            >
              <img src={v.thumbnail} alt={t(v.titleKey)} loading="lazy" style={{ width: '100%', borderRadius: 6 }} />
              <div style={{ paddingTop: 8 }}>
                <strong>{t(v.titleKey)}</strong>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {active && <VideoModal video={active} onClose={close} />}
    </div>
  )
}
