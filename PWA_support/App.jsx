import React, { useEffect, useState } from 'react'

export default function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    function handler(e) {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function install() {
    setShowInstall(false)
    if (deferredPrompt) {
      await deferredPrompt.prompt()
      setDeferredPrompt(null)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>PWA App</h1>
      <p>This app works offline.</p>
      <button onClick={install} style={{ display: showInstall ? 'inline-block' : 'none' }}>
        Install App
      </button>
    </div>
  )
}
