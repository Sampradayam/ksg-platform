import React from "react"
import "../skeleton.css"

export default function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden>
      <div className="skeleton-image" />
      <div className="skeleton-text" />
      <div className="skeleton-text short" />
    </div>
  )
}
