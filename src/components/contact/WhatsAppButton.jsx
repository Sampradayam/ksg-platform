import React, { useState } from 'react'
import { getI18nValue } from '../../config/i18n.contact'

const whatsappButtonStyles = `
.whatsapp-button-container {
  display: flex;
  gap: 12px;
  margin: 24px 0;
  flex-wrap: wrap;
}

.whatsapp-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #25d366;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(37, 211, 102, 0.2);
}

.whatsapp-button:hover {
  background: #20ba5a;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
  transform: translateY(-2px);
}

.whatsapp-button:active {
  transform: translateY(0);
}

.whatsapp-button:focus {
  outline: 2px solid #25d366;
  outline-offset: 2px;
}

.whatsapp-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
  transform: none;
  box-shadow: none;
}

.whatsapp-icon {
  width: 20px;
  height: 20px;
  display: inline-block;
}

.whatsapp-button-loading {
  display: inline-block;
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

.whatsapp-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 8px;
  font-size: 14px;
  margin: 12px 0;
}

@media (max-width: 768px) {
  .whatsapp-button-container {
    flex-direction: column;
  }

  .whatsapp-button {
    width: 100%;
    justify-content: center;
  }
}
`

/**
 * WhatsAppButton Component
 * 
 * Provides a WhatsApp messaging button with customizable message.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.lang - Language code
 * @param {string} props.phoneNumber - Recipient phone number (with country code, e.g., '1234567890')
 * @param {string} props.message - Pre-filled message text
 * @param {Object} props.callbacks - Event callbacks
 * @param {string} props.state - Component state ('idle' | 'loading' | 'error')
 * 
 * @returns {React.ReactElement}
 */
export function WhatsAppButton({
  lang = 'en',
  phoneNumber = '',
  message = '',
  callbacks = {},
  state: externalState = 'idle'
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const i18n = (key) => getI18nValue(`contact.whatsapp.${key}`, lang)

  const handleClick = () => {
    if (!phoneNumber) {
      setHasError(true)
      callbacks.onError?.('No phone number provided')
      return
    }

    setIsLoading(true)
    setHasError(false)

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message || i18n('message'))
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    callbacks.onClick?.()

    // Simulate a small delay before opening
    setTimeout(() => {
      try {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
        callbacks.onSuccess?.()
      } catch (error) {
        setHasError(true)
        callbacks.onError?.(error)
      } finally {
        setIsLoading(false)
      }
    }, 300)
  }

  const isError = hasError || externalState === 'error'

  if (isError) {
    return (
      <div 
        role="alert" 
        aria-live="assertive"
        className="whatsapp-error"
      >
        {i18n('error')}
      </div>
    )
  }

  return (
    <>
      <style>{whatsappButtonStyles}</style>
      <div 
        className="whatsapp-button-container"
        role="region"
        aria-label={i18n('label')}
      >
        <button
          className="whatsapp-button"
          onClick={handleClick}
          disabled={isLoading || !phoneNumber}
          aria-label={i18n('buttonText')}
          aria-busy={isLoading}
          type="button"
        >
          {isLoading ? (
            <>
              <div className="whatsapp-button-loading" aria-hidden="true" />
              {i18n('loading')}
            </>
          ) : (
            <>
              <svg
                className="whatsapp-icon"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.867 1.167c-1.546.925-2.503 2.369-2.503 3.976 0 .779.201 1.531.559 2.233L2.242 22l2.979-.988a9.9 9.9 0 004.646 1.185h.004c5.338 0 9.676-4.337 9.676-9.676 0-2.584-.994-5.007-2.8-6.823-1.805-1.815-4.225-2.816-6.823-2.816" />
              </svg>
              {i18n('buttonText')}
            </>
          )}
        </button>
      </div>
    </>
  )
}

export default WhatsAppButton
