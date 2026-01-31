import React from 'react'
import './Button.css'

/**
 * Button Component
 * 
 * Variants: primary, secondary, danger, ghost
 * Sizes: small, medium, large
 * States: disabled, loading
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const baseClass = 'btn'
  const variantClass = `btn-${variant}`
  const sizeClass = `btn-${size}`
  const disabledClass = disabled ? 'btn-disabled' : ''
  const loadingClass = loading ? 'btn-loading' : ''
  const fullWidthClass = fullWidth ? 'btn-full-width' : ''

  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${sizeClass} ${disabledClass} ${loadingClass} ${fullWidthClass} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="btn-loader"></span>}
      {children}
    </button>
  )
}

export default Button
