import React from "react"
import SkeletonCard from "./SkeletonCard"

// Simple demo grid that simulates images. In real app replace with
// actual image sources and consider image lazy-loading and virtualization.
const items = Array.from({ length: 12 }).map((_, i) => ({ id: i + 1 }))

export default function GalleryGrid() {
  // Simulate a small delay or heavy render if needed; for demo we render immediately.
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
      {items.map((item) => (
        <div key={item.id} style={{ border: "1px solid #ddd", padding: 8 }}>
          {/* In a real app use <img loading="lazy" /> and optimized formats */}
          <div style={{ height: 100, background: "#eee" }} aria-hidden>
            Image {item.id}
          </div>
          <h3 style={{ fontSize: 14 }}>Item {item.id}</h3>
          <p style={{ fontSize: 12 }}>Description for item {item.id}</p>
        </div>
      ))}

      {/* Example of showing skeletons while loading heavy content */}
      <SkeletonCard />
    </div>
  )
}
