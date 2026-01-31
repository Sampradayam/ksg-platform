import React, { useState, useMemo } from 'react'
import { t } from '../../../i18n.js'

function Post({ post }) {
  return (
    <article style={{ marginBottom: 12 }} aria-labelledby={`post-${post.id}`}>
      <div style={{ fontSize: 13, color: '#666' }}>{post.author} • {post.date}</div>
      <p id={`post-${post.id}`} style={{ margin: '6px 0' }}>{t(post.contentKey)}</p>
    </article>
  )
}

export default function SocialFeed({ posts }) {
  const [limit, setLimit] = useState(2)
  const visible = useMemo(() => posts.slice(0, limit), [posts, limit])

  if (!posts?.length) return <div role="status">{t('media.social.empty')}</div>

  return (
    <div>
      {visible.map((p) => <Post key={p.id} post={p} />)}
      {limit < posts.length && (
        <button onClick={() => setLimit((s) => s + 2)} aria-label="Load more posts">Load more</button>
      )}
    </div>
  )
}
