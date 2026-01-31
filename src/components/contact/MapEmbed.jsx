import React, { useState, useEffect } from 'react'
import { getI18nValue } from '../../config/i18n.contact'

const mapEmbedStyles = `
.map-embed-container {
  width: 100%;
  margin: 24px 0;
  border-radius: 8px;
  overflow: hidden;
  background: #e5e7eb;
  position: relative;
}

.map-embed-wrapper {
  position: relative;
  padding-bottom: 66.66%;
  height: 0;
  overflow: hidden;
}

.map-embed-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
}

.map-embed-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background: #f9fafb;
  border-radius: 8px;
  color: var(--muted);
  font-size: 14px;
}

.map-embed-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-right: 12px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.map-embed-error {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background: #fee2e2;
  border-radius: 8px;
  color: #dc2626;
  font-size: 14px;
  padding: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .map-embed-wrapper {
    padding-bottom: 75%;
  }

  .map-embed-loading,
  .map-embed-error {
    min-height: 300px;
  }
}
`

/**
 * MapEmbed Component
 * 
 * Displays an embedded map with accessibility and performance optimization.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.lang - Language code
 * @param {string} props.mapUrl - Embed URL for the map
 * @param {string} props.mapTitle - Title for the map iframe
 * @param {number} props.loadingDelay - Delay before showing loaded state (ms)
 * @param {boolean} props.lazyLoad - Whether to lazy load the map
 * @param {Object} props.callbacks - Event callbacks
 * @param {string} props.state - Component state ('idle' | 'loading' | 'loaded' | 'error')
 * 
 * @returns {React.ReactElement}
 */
export function MapEmbed({
  lang = 'en',
  mapUrl = '',
  mapTitle = 'Our Location',
  loadingDelay = 800,
  lazyLoad = true,
  callbacks = {},
  state: externalState = null
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(!lazyLoad)

  const i18n = (key) => getI18nValue(`contact.map.${key}`, lang)

  useEffect(() => {
    if (!lazyLoad) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.disconnect()
      }
    })

    const container = document.querySelector('.map-embed-container')
    if (container) observer.observe(container)

    return () => observer.disconnect()
  }, [lazyLoad])

  useEffect(() => {
    if (!isInView) return

    const timer = setTimeout(() => {
      setIsLoading(false)
      callbacks.onLoad?.()
    }, loadingDelay)

    return () => clearTimeout(timer)
  }, [isInView, loadingDelay, callbacks])

  if (!mapUrl) {
    return (
      <div 
        role="alert" 
        aria-live="polite"
        className="map-embed-error"
      >
        {i18n('error')}
      </div>
    )
  }

  const isErrorState = hasError || externalState === 'error'
  const isLoadingState = isLoading && isInView

  return (
    <>
      <style>{mapEmbedStyles}</style>
      <section 
        className="map-embed-container"
        aria-label={i18n('label')}
        role="region"
      >
        {isErrorState ? (
          <div 
            role="alert" 
            aria-live="assertive"
            className="map-embed-error"
          >
            {i18n('error')}
          </div>
        ) : isLoadingState ? (
          <div 
            className="map-embed-loading"
            aria-live="polite"
            aria-busy="true"
          >
            <div className="map-embed-spinner" aria-hidden="true" />
            {i18n('loading')}
          </div>
        ) : isInView ? (
          <div className="map-embed-wrapper">
            <iframe
              src={mapUrl}
              title={mapTitle}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onError={() => {
                setHasError(true)
                callbacks.onError?.()
              }}
              aria-label={i18n('altText')}
            />
          </div>
        ) : (
          <div style={{ minHeight: '400px', background: '#f9fafb' }} />
        )}
      </section>
    </>
  )
}

export default MapEmbed
