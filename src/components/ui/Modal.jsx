import React, { useEffect, useRef } from 'react'
import './Modal.css'

/**
 * Modal Component
 * 
 * Features: Keyboard support (ESC to close), focus trap, accessible
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = 'medium',
  closeButton = true
}) => {
  const modalRef = useRef(null)
  const firstFocusableRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    // Handle ESC key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    // Focus trap
    const modal = modalRef.current
    const focusableElements = modal?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements?.[0]
    const lastElement = focusableElements?.[focusableElements.length - 1]

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }
    }

    firstElement?.focus()
    document.addEventListener('keydown', handleKeyDown)
    modal?.addEventListener('keydown', handleTabKey)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      modal?.removeEventListener('keydown', handleTabKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={`modal modal-${size}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">{title}</h2>
          {closeButton && (
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </button>
          )}
        </div>

        <div className="modal-content">
          {children}
        </div>

        {actions && (
          <div className="modal-footer">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
