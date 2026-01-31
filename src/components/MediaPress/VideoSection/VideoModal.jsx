import React, { useEffect, useRef } from 'react'

export default function VideoModal({ video, onClose }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    const prev = document.activeElement
    dialogRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      prev?.focus()
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.titleKey}
      ref={dialogRef}
      tabIndex={-1}
      style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', zIndex: 1000 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div style={{ maxWidth: 900, width: '98%', background: '#000', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
          <iframe
            title={video.id}
            src={video.src}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div style={{ padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
          <div>{video.titleKey}</div>
          <button onClick={onClose} aria-label="Close video" style={{ padding: 8 }}>Close</button>
        </div>
      </div>
    </div>
  )
}
