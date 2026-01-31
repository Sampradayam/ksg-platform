import React, { useRef } from 'react'
import { t } from '../../../i18n'

export default function EventHighlights({ items }) {
  const containerRef = useRef(null)

  if (!items?.length) return <div role="status">{t('media.events.empty')}</div>

  const onKey = (e) => {
    if (!containerRef.current) return
    const el = containerRef.current
    if (e.key === 'ArrowRight') el.scrollBy({ left: 240, behavior: 'smooth' })
    if (e.key === 'ArrowLeft') el.scrollBy({ left: -240, behavior: 'smooth' })
  }

  return (
    <div>
      <div
        ref={containerRef}
        role="list"
        tabIndex={0}
        onKeyDown={onKey}
        aria-label={t('media.events.title')}
        style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}
      >
        {items.map((it) => (
          <article key={it.id} role="listitem" style={{ minWidth: 220, background: '#fff', padding: 12, borderRadius: 8 }} tabIndex={-1}>
            <div style={{ fontSize: 13, color: '#666' }}>{it.date}</div>
            <h3 style={{ margin: '6px 0' }}>{t(it.titleKey)}</h3>
            {it.descriptionKey && <p style={{ margin: 0, color: '#444' }}>{t(it.descriptionKey)}</p>}
          </article>
        ))}
      </div>
      <div style={{ marginTop: 8, color: '#666', fontSize: 12 }}>Tip: Use <span className="kbd">←</span>/<span className="kbd">→</span> to navigate</div>
    </div>
  )
}
