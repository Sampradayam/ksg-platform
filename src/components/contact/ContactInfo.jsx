import React from 'react'
import { getI18nValue } from '../../config/i18n.contact'

const contactInfoStyles = `
.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin: 24px 0;
}

.contact-info-item {
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid var(--accent);
  transition: box-shadow 0.2s ease;
}

.contact-info-item:hover {
  box-shadow: 0 4px 12px rgba(15, 98, 254, 0.1);
}

.contact-info-item-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.contact-info-item-value {
  font-size: 16px;
  font-weight: 500;
  color: #111;
  word-break: break-word;
}

.contact-info-item-value a {
  color: var(--accent);
  text-decoration: none;
  transition: text-decoration 0.2s ease;
}

.contact-info-item-value a:hover {
  text-decoration: underline;
}

.contact-info-item-value a:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .contact-info {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
`

/**
 * ContactInfo Component
 * 
 * Displays contact information with multiple contact methods.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.lang - Language code (e.g., 'en', 'es')
 * @param {Object} props.data - Contact data
 * @param {string} props.data.phone - Phone number
 * @param {string} props.data.email - Email address
 * @param {string} props.data.address - Physical address
 * @param {string} props.data.hours - Business hours
 * @param {Object} props.onContactMethodClick - Callback when contact method is clicked
 * @param {string} props.state - Loading state ('idle' | 'loading' | 'error')
 * 
 * @returns {React.ReactElement}
 */
export function ContactInfo({ 
  lang = 'en', 
  data = {}, 
  onContactMethodClick = () => {},
  state = 'idle'
}) {
  const i18n = (key) => getI18nValue(`contact.info.${key}`, lang)
  
  if (state === 'error') {
    return (
      <div role="alert" aria-live="polite">
        <p style={{ color: '#dc2626' }}>
          {getI18nValue('contact.map.error', lang)}
        </p>
      </div>
    )
  }

  return (
    <>
      <style>{contactInfoStyles}</style>
      <section 
        className="contact-info"
        aria-label={i18n('label')}
        role="region"
      >
        {data.phone && (
          <article className="contact-info-item">
            <div className="contact-info-item-label">{i18n('phone')}</div>
            <div className="contact-info-item-value">
              <a 
                href={`tel:${data.phone}`}
                onClick={() => onContactMethodClick('phone')}
              >
                {data.phone}
              </a>
            </div>
          </article>
        )}

        {data.email && (
          <article className="contact-info-item">
            <div className="contact-info-item-label">{i18n('email')}</div>
            <div className="contact-info-item-value">
              <a 
                href={`mailto:${data.email}`}
                onClick={() => onContactMethodClick('email')}
              >
                {data.email}
              </a>
            </div>
          </article>
        )}

        {data.address && (
          <article className="contact-info-item">
            <div className="contact-info-item-label">{i18n('address')}</div>
            <div className="contact-info-item-value">
              {data.address}
            </div>
          </article>
        )}

        {data.hours && (
          <article className="contact-info-item">
            <div className="contact-info-item-label">{i18n('hours')}</div>
            <div className="contact-info-item-value">
              {data.hours}
            </div>
          </article>
        )}
      </section>
    </>
  )
}

export default ContactInfo
