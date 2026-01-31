import React from 'react'
import Card from '../components/ui/Card'

const DocumentationPage = () => {
  return (
    <div>
      <h1>Documentation</h1>
      <p className="subtitle">
        Complete guide to the KSG Platform framework and components.
      </p>

      <Card
        title="Getting Started"
        description="Quick start guide"
      >
        <h3>Installation</h3>
        <pre><code>{`npm install
npm run dev`}</code></pre>

        <h3>Project Structure</h3>
        <pre><code>{`src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ErrorBoundary.jsx
│   └── Toast.jsx
├── layouts/             # Layout components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── context/             # Context API providers
└── App.jsx`}</code></pre>
      </Card>

      <Card
        title="Form Validation"
        description="Using the validation framework"
      >
        <h3>Example</h3>
        <pre><code>{`import { useForm } from '../hooks/useForm'

const MyForm = () => {
  const validate = (values) => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Email required'
    }
    return errors
  }

  const { values, errors, handleChange, handleSubmit } = 
    useForm({ email: '' }, onSubmit, validate)

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
    </form>
  )
}`}</code></pre>
      </Card>

      <Card
        title="Toast Notifications"
        description="Using the toast notification system"
      >
        <h3>Usage</h3>
        <pre><code>{`import { useToast } from '../context/ToastContext'

const MyComponent = () => {
  const { success, error, info, warning } = useToast()

  return (
    <>
      <button onClick={() => success('Success!')}>
        Show Success
      </button>
      <button onClick={() => error('Error occurred!')}>
        Show Error
      </button>
    </>
  )
}`}</code></pre>
      </Card>

      <Card
        title="Accessibility Features"
        description="WCAG 2.1 Compliant"
      >
        <ul>
          <li>✓ Full keyboard navigation (Tab, Shift+Tab, Enter, ESC)</li>
          <li>✓ ARIA labels and roles for screen readers</li>
          <li>✓ Focus management and focus trapping in modals</li>
          <li>✓ Semantic HTML5 elements</li>
          <li>✓ Color contrast ratios meeting WCAG standards</li>
          <li>✓ Error messages linked to inputs via aria-describedby</li>
          <li>✓ Disabled state visual and functional indicators</li>
        </ul>
      </Card>

      <style jsx>{`
        h1 {
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          color: #6b7280;
          font-size: 1.125rem;
          margin-bottom: 2rem;
        }

        h3 {
          color: #374151;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }

        h3:first-child {
          margin-top: 0;
        }

        pre {
          background-color: #1f2937;
          color: #e5e7eb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin-bottom: 1rem;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        code {
          font-family: 'Courier New', monospace;
        }

        ul {
          list-style-position: inside;
          color: #6b7280;
        }

        li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  )
}

export default DocumentationPage
