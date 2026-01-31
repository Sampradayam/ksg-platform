import React from 'react'
import './Alert.css'

/**
 * Alert Component
 * 
 * Variants: success, error, warning, info
 * Dismissible support with close button
 */
const Alert = ({
  variant = 'info',
  title,
  message,
  onClose,
  dismissible = false,
  className = ''
}) => {
  return (
    <div
      className={`alert alert-${variant} ${className}`}
      role="alert"
    >
      <div className="alert-content">
        <div className="alert-icon">{getIcon(variant)}</div>
        <div className="alert-text">
          {title && <strong className="alert-title">{title}</strong>}
          {message && <p className="alert-message">{message}</p>}
        </div>
      </div>
      {dismissible && (
        <button
          className="alert-close"
          onClick={onClose}
          aria-label="Close alert"
        >
          ✕
        </button>
      )}
    </div>
  )
}

const getIcon = (variant) => {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }
  return icons[variant] || icons.info
}

export default Alert
