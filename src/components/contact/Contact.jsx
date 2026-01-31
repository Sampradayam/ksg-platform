import React, { useState, useCallback, memo } from 'react'
import ContactInfo from './ContactInfo'
import MapEmbed from './MapEmbed'
import WhatsAppButton from './WhatsAppButton'
import ContactForm from './ContactForm'
import { getI18nValue } from '../../config/i18n.contact'

const contactModuleStyles = `
.contact-module {
  max-width: 1040px;
  margin: 48px auto;
  padding: 0 20px;
}

.contact-module-header {
  margin-bottom: 48px;
  text-align: center;
}

.contact-module-title {
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 700;
  margin: 0 0 12px;
  color: #111;
}

.contact-module-subtitle {
  font-size: clamp(16px, 2.5vw, 18px);
  color: var(--muted);
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.contact-module-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.contact-module-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  align-items: start;
}

.contact-module-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 48px 0;
}

@media (max-width: 768px) {
  .contact-module {
    margin: 32px auto;
  }

  .contact-module-header {
    margin-bottom: 32px;
  }

  .contact-module-section {
    gap: 32px;
    margin-bottom: 32px;
  }

  .contact-module-row {
    gap: 24px;
  }

  .contact-module-divider {
    margin: 32px 0;
  }
}
`

/**
 * Contact Module
 * 
 * Orchestrates all contact submodules: ContactInfo, MapEmbed, WhatsAppButton, and ContactForm.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.lang - Language code (default: 'en')
 * @param {Object} props.config - Contact module configuration
 * @param {Object} props.config.info - Contact info data (phone, email, address, hours)
 * @param {string} props.config.mapUrl - Embed URL for the map
 * @param {string} props.config.whatsappNumber - WhatsApp phone number with country code
 * @param {Object} props.callbacks - Event callbacks for different actions
 * @param {Function} props.onFormSubmit - Handler for contact form submission
 * 
 * @returns {React.ReactElement}
 */
const Contact = memo(function Contact({
  lang = 'en',
  config = {
    info: {
      phone: '+1 (555) 123-4567',
      email: 'hello@sampradayam.org',
      address: '123 Cultural Street, Heritage City, ST 12345',
      hours: 'Monday - Friday: 9am - 6pm'
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345096297!2d-122.38899!3d37.77492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzMwLjkiTiAxMjLCsDIzJzE4LjMiVw!5e0!3m2!1sen!2sus!4v1234567890',
    whatsappNumber: '1234567890',
    whatsappMessage: 'Hello, I am interested in your cultural programs.'
  },
  callbacks = {},
  onFormSubmit = async () => {}
}) {
  const [contactState, setContactState] = useState('idle')
  const [formError, setFormError] = useState('')

  const i18n = useCallback((key) => getI18nValue(`contact.${key}`, lang), [lang])

  // Unified callbacks
  const handleContactMethodClick = useCallback((method) => {
    callbacks.onContactMethodClick?.(method)
  }, [callbacks])

  const handleFormSubmit = useCallback(async (data) => {
    try {
      setContactState('loading')
      setFormError('')
      await onFormSubmit(data)
      setContactState('idle')
      callbacks.onFormSubmit?.(data)
    } catch (error) {
      setFormError(error.message || i18n('form.error'))
      callbacks.onFormSubmitError?.(error)
    }
  }, [onFormSubmit, callbacks, i18n])

  const handleMapLoad = useCallback(() => {
    callbacks.onMapLoad?.()
  }, [callbacks])

  const handleMapError = useCallback(() => {
    callbacks.onMapError?.()
  }, [callbacks])

  const handleWhatsAppClick = useCallback(() => {
    callbacks.onWhatsAppClick?.()
  }, [callbacks])

  const handleWhatsAppSuccess = useCallback(() => {
    callbacks.onWhatsAppSuccess?.()
  }, [callbacks])

  const handleWhatsAppError = useCallback((error) => {
    callbacks.onWhatsAppError?.(error)
  }, [callbacks])

  return (
    <>
      <style>{contactModuleStyles}</style>
      <div className="contact-module">
        {/* Header */}
        <header className="contact-module-header">
          <h1 className="contact-module-title">{i18n('title')}</h1>
          <p className="contact-module-subtitle">{i18n('subtitle')}</p>
        </header>

        {/* Contact Info & WhatsApp Section */}
        <section className="contact-module-section">
          <div className="contact-module-row">
            <div>
              <ContactInfo
                lang={lang}
                data={config.info}
                onContactMethodClick={handleContactMethodClick}
                state={contactState}
              />
            </div>

            <div>
              <WhatsAppButton
                lang={lang}
                phoneNumber={config.whatsappNumber}
                message={config.whatsappMessage || i18n('whatsapp.message')}
                callbacks={{
                  onClick: handleWhatsAppClick,
                  onSuccess: handleWhatsAppSuccess,
                  onError: handleWhatsAppError
                }}
              />
            </div>
          </div>
        </section>

        <div className="contact-module-divider" aria-hidden="true" />

        {/* Map Section */}
        <section className="contact-module-section">
          <MapEmbed
            lang={lang}
            mapUrl={config.mapUrl}
            mapTitle={i18n('info.address')}
            lazyLoad={true}
            loadingDelay={600}
            callbacks={{
              onLoad: handleMapLoad,
              onError: handleMapError
            }}
          />
        </section>

        <div className="contact-module-divider" aria-hidden="true" />

        {/* Contact Form Section */}
        <section className="contact-module-section">
          <ContactForm
            lang={lang}
            onSubmit={handleFormSubmit}
            errorMessage={formError}
            callbacks={{
              onValidationError: callbacks.onFormValidationError,
              onSuccess: callbacks.onFormSuccess,
              onError: callbacks.onFormError
            }}
          />
        </section>
      </div>
    </>
  )
})

Contact.displayName = 'Contact'

export default Contact
