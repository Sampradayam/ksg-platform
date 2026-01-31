import React from 'react'
import Card from '../components/ui/Card'
import Alert from '../components/ui/Alert'
import { useToast } from '../context/ToastContext'

const HomePage = () => {
  const { success, error, info } = useToast()

  return (
    <div>
      <section className="hero">
        <h1>Welcome to KSG Platform</h1>
        <p>A modern, accessible, and scalable React application framework</p>
      </section>

      <Alert
        variant="info"
        title="Welcome!"
        message="This is a production-ready React framework with all essential components and patterns."
        dismissible
      />

      <section className="features">
        <Card title="🎨 UI Components" description="Pre-built, accessible components">
          <p>
            Includes Button, Input, Modal, Card, Alert, DatePicker, and Toast components
            with full keyboard navigation and ARIA support.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => success('Navigate to components page!')}
          >
            View Components
          </button>
        </Card>

        <Card title="📋 Form Framework" description="Validation and state management">
          <p>
            Built-in form hook with validation, error handling, and submission management.
            Includes regex and custom validators.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => success('Navigate to forms page!')}
          >
            Try Forms
          </button>
        </Card>

        <Card title="🌐 Routing" description="Full page routing with active highlighting">
          <p>
            React Router integration with active route highlighting and responsive navigation menu.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => info('You are already on the home page!')}
          >
            Explore Navigation
          </button>
        </Card>

        <Card title="⚠️ Error Handling" description="Global error boundary">
          <p>
            Centralized error handling with user-friendly fallback UI and development error details.
          </p>
          <button
            className="btn btn-danger"
            onClick={() => error('Error handling is working!')}
          >
            Test Error
          </button>
        </Card>

        <Card title="🔔 Notifications" description="Toast notification system">
          <p>
            Multi-state toast notifications with auto-dismiss, manual close, and animations.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => success('Toast notifications work!')}
          >
            Show Notification
          </button>
        </Card>

        <Card title="♿ Accessibility" description="WCAG 2.1 compliant">
          <p>
            Full keyboard navigation, ARIA labels, focus management, and semantic HTML throughout.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => info('All components are fully accessible!')}
          >
            Learn More
          </button>
        </Card>
      </section>

      <style jsx>{`
        .hero {
          text-align: center;
          margin-bottom: 3rem;
          padding: 2rem 0;
        }

        .hero h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #1f2937;
        }

        .hero p {
          font-size: 1.25rem;
          color: #6b7280;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2rem;
          }

          .hero p {
            font-size: 1rem;
          }

          .features {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default HomePage
