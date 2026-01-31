import React, { useState } from 'react'
import { getI18nValue } from '../../config/i18n.contact'

const contactFormStyles = `
.contact-form {
  max-width: 600px;
  margin: 24px 0;
  padding: 28px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.contact-form-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 20px;
  color: #111;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-group:last-of-type {
  margin-bottom: 24px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #111;
}

.form-label-required {
  color: #dc2626;
  margin-left: 4px;
}

.form-input,
.form-textarea {
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(15, 98, 254, 0.1);
}

.form-input:invalid:not(:placeholder-shown),
.form-textarea:invalid:not(:placeholder-shown) {
  border-color: #dc2626;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-error {
  font-size: 12px;
  color: #dc2626;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.form-error-icon {
  width: 14px;
  height: 14px;
  display: inline-block;
}

.form-submit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  justify-content: center;
}

.form-submit:hover:not(:disabled) {
  background: #0d51d0;
  box-shadow: 0 4px 12px rgba(15, 98, 254, 0.3);
}

.form-submit:active:not(:disabled) {
  transform: scale(0.98);
}

.form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.form-message {
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
}

.form-message-success {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

.form-message-error {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.form-message-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 2px;
}

@media (max-width: 768px) {
  .contact-form {
    padding: 20px;
  }

  .form-submit {
    width: 100%;
  }
}
`

/**
 * ContactForm Component
 * 
 * A fully accessible, performant contact form with validation.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.lang - Language code
 * @param {Object} props.onSubmit - Callback function receiving form data
 * @param {Object} props.callbacks - Event callbacks
 * @param {string} props.state - Component state ('idle' | 'loading' | 'success' | 'error')
 * @param {string} props.errorMessage - Custom error message
 * 
 * @returns {React.ReactElement}
 */
export function ContactForm({
  lang = 'en',
  onSubmit = () => {},
  callbacks = {},
  state: externalState = 'idle',
  errorMessage = ''
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitState, setSubmitState] = useState('idle')
  const [formMessage, setFormMessage] = useState('')

  const i18n = (key) => getI18nValue(`contact.form.${key}`, lang)

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = i18n('fields.name.required')
    }

    if (!formData.email.trim()) {
      newErrors.email = i18n('fields.email.required')
    } else if (!validateEmail(formData.email)) {
      newErrors.email = i18n('fields.email.invalid')
    }

    if (!formData.subject.trim()) {
      newErrors.subject = i18n('fields.subject.required')
    }

    if (!formData.message.trim()) {
      newErrors.message = i18n('fields.message.required')
    } else if (formData.message.trim().length < 10) {
      newErrors.message = i18n('fields.message.minLength')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      callbacks.onValidationError?.()
      return
    }

    setIsLoading(true)
    setSubmitState('loading')

    try {
      // Call external submit handler
      await onSubmit(formData)

      setSubmitState('success')
      setFormMessage(i18n('success'))
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      
      callbacks.onSuccess?.(formData)

      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setSubmitState('idle')
        setFormMessage('')
      }, 5000)
    } catch (error) {
      setSubmitState('error')
      setFormMessage(errorMessage || i18n('error'))
      callbacks.onError?.(error)
    } finally {
      setIsLoading(false)
    }
  }

  const displayState = externalState !== 'idle' ? externalState : submitState
  const displayMessage = errorMessage || formMessage

  return (
    <>
      <style>{contactFormStyles}</style>
      <form 
        className="contact-form"
        onSubmit={handleSubmit}
        aria-label={i18n('label')}
        noValidate
      >
        <h3 className="contact-form-title">{i18n('title')}</h3>

        {displayMessage && (
          <div 
            className={`form-message form-message-${displayState}`}
            role="alert"
            aria-live="polite"
          >
            <svg
              className="form-message-icon"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {displayState === 'success' ? (
                <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18 .393 8.393 1.808 6.978z" />
              ) : (
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              )}
            </svg>
            <div>
              <strong>{i18n(displayState === 'success' ? 'success' : 'error')}</strong>
              <p style={{ margin: '4px 0 0' }}>
                {i18n(displayState === 'success' ? 'successDescription' : 'errorDescription')}
              </p>
            </div>
          </div>
        )}

        <div className="form-group">
          <label className="form-label" htmlFor="name">
            {i18n('fields.name.label')}
            <span className="form-label-required" aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder={i18n('fields.name.placeholder')}
            value={formData.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            disabled={isLoading}
          />
          {errors.name && (
            <div id="name-error" className="form-error">
              <span role="img" aria-hidden="true">⚠️</span>
              {errors.name}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">
            {i18n('fields.email.label')}
            <span className="form-label-required" aria-hidden="true">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder={i18n('fields.email.placeholder')}
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            disabled={isLoading}
          />
          {errors.email && (
            <div id="email-error" className="form-error">
              <span role="img" aria-hidden="true">⚠️</span>
              {errors.email}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="phone">
            {i18n('fields.phone.label')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            placeholder={i18n('fields.phone.placeholder')}
            value={formData.phone}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="subject">
            {i18n('fields.subject.label')}
            <span className="form-label-required" aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="form-input"
            placeholder={i18n('fields.subject.placeholder')}
            value={formData.subject}
            onChange={handleChange}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            disabled={isLoading}
          />
          {errors.subject && (
            <div id="subject-error" className="form-error">
              <span role="img" aria-hidden="true">⚠️</span>
              {errors.subject}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="message">
            {i18n('fields.message.label')}
            <span className="form-label-required" aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            className="form-textarea"
            placeholder={i18n('fields.message.placeholder')}
            value={formData.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            disabled={isLoading}
          />
          {errors.message && (
            <div id="message-error" className="form-error">
              <span role="img" aria-hidden="true">⚠️</span>
              {errors.message}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="form-submit"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <div className="form-spinner" aria-hidden="true" />
              {i18n('sending')}
            </>
          ) : (
            i18n('submit')
          )}
        </button>
      </form>
    </>
  )
}

export default ContactForm
