import React from 'react'
import './Card.css'

/**
 * Card Component
 * 
 * Variants: default, elevated
 * Flexible container for organizing content
 */
const Card = ({
  children,
  title,
  description,
  footer,
  variant = 'default',
  className = ''
}) => {
  return (
    <article className={`card card-${variant} ${className}`}>
      {title && (
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          {description && <p className="card-description">{description}</p>}
        </div>
      )}

      <div className="card-content">
        {children}
      </div>

      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </article>
  )
}

export default Card
