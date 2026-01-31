import React from 'react'
import { t } from '../../../i18n.js'

export default function NewsCards({ items }) {
  if (!items?.length) return <div role="status">{t('media.news.empty')}</div>

  return (
    <ul role="list" style={{ display: 'grid', gap: 12, listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((n) => (
        <li key={n.id} role="listitem">
          <article aria-labelledby={`news-${n.id}`} tabIndex={0} style={{ display: 'flex', gap: 12 }}>
            {n.image && <img src={n.image} alt="" loading="lazy" style={{ width: 96, height: 64, objectFit: 'cover', borderRadius: 6 }} />}
            <div>
              <h3 id={`news-${n.id}`} style={{ margin: 0 }}>{t(n.titleKey)}</h3>
              {n.excerptKey && <p style={{ margin: '6px 0 0 0', color: '#666' }}>{t(n.excerptKey)}</p>}
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}
