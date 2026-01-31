import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

export function MetaTags({ config, isLoading = false, error = null }) {
  const { t } = useTranslation()
  if (isLoading || error || !config) return null
  return (
    <Helmet>
      <title>{t(config.titleKey)}</title>
      {config.descriptionKey && (
        <meta name="description" content={t(config.descriptionKey)} />
      )}
      {config.keywordsKey && (
        <meta name="keywords" content={t(config.keywordsKey)} />
      )}
    </Helmet>
  )
}

export function OpenGraphTags({ config, isLoading = false, error = null }) {
  const { t } = useTranslation()
  if (isLoading || error || !config) return null
  return (
    <Helmet>
      <meta property="og:type" content={config.type || 'website'} />
      <meta property="og:title" content={t(config.titleKey)} />
      {config.descriptionKey && (
        <meta property="og:description" content={t(config.descriptionKey)} />
      )}
      {config.imageUrl && <meta property="og:image" content={config.imageUrl} />}
      {config.pageUrl && <meta property="og:url" content={config.pageUrl} />}
    </Helmet>
  )
}

export function SharePreview({ config, isLoading = false, error = null }) {
  const { t } = useTranslation()
  if (isLoading) {
    return <div role="status">{t('seo.preview.loading')}</div>
  }
  if (error || !config) {
    return <div role="alert">{t('seo.preview.error')}</div>
  }
  return (
    <article
      tabIndex={0}
      aria-label={t('seo.preview.label')}
      className="share-preview"
      style={{ display: 'flex', gap: 12, alignItems: 'center' }}
    >
      {config.imageUrl ? (
        <img
          src={config.imageUrl}
          alt={t('seo.preview.imageAlt')}
          loading="lazy"
          style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 4 }}
        />
      ) : (
        <div
          style={{
            width: 120,
            height: 80,
            backgroundColor: '#f0f0f0',
            borderRadius: 4,
          }}
          aria-hidden
        />
      )}
      <div>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>{t(config.titleKey)}</h3>
        {config.descriptionKey && (
          <p style={{ margin: 0 }}>{t(config.descriptionKey)}</p>
        )}
      </div>
    </article>
  )
}

export function SeoSocialSharing({ meta, openGraph, isLoading = false, error = null }) {
  return (
    <>
      <MetaTags config={meta} isLoading={isLoading} error={error} />
      <OpenGraphTags config={openGraph} isLoading={isLoading} error={error} />
      <SharePreview config={openGraph} isLoading={isLoading} error={error} />
    </>
  )
}

export default SeoSocialSharing
