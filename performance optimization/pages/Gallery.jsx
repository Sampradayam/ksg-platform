import React, { Suspense, lazy } from "react"

const GalleryGrid = lazy(() => import("../components/GalleryGrid"))

export default function Gallery() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Gallery</h1>
      <Suspense fallback={<div>Loading gallery...</div>}>
        <GalleryGrid />
      </Suspense>
    </div>
  )
}
