import React from 'react'
import './Input.css'

/**
 * Input Component
 * 
 * Variants: text, email, password, number, tel, url
 * States: error, success, disabled
 * Includes label and error message support
 */
const Input = React.forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  success,
  disabled = false,
  required = false,
  helpText,
  className = '',
  ...props
}, ref) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="required-indicator">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`input ${error ? 'input-error' : ''} ${success ? 'input-success' : ''} ${disabled ? 'input-disabled' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
        {...props}
      />
      {error && (
        <span id={`${inputId}-error`} className="input-error-message">
          {error}
        </span>
      )}
      {helpText && !error && (
        <span id={`${inputId}-help`} className="input-help-text">
          {helpText}
        </span>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
