import React, { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Alert from '../components/ui/Alert'
import Modal from '../components/ui/Modal'

const ComponentsPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [showAlert, setShowAlert] = useState(true)

  return (
    <div>
      <h1>UI Components Showcase</h1>
      <p className="subtitle">
        All components are fully accessible, keyboard-navigable, and production-ready.
      </p>

      {/* Buttons */}
      <Card title="Buttons" description="Multiple variants and sizes">
        <div className="component-demo">
          <div>
            <h4>Variants</h4>
            <div className="button-group">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          <div>
            <h4>Sizes</h4>
            <div className="button-group">
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </div>
          </div>

          <div>
            <h4>States</h4>
            <div className="button-group">
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
              <Button fullWidth>Full Width</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Inputs */}
      <Card title="Input Fields" description="Various input types with validation">
        <div className="component-demo">
          <Input
            label="Text Input"
            placeholder="Enter text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            helpText="This is helper text"
          />

          <Input
            label="Email Input"
            type="email"
            placeholder="your@email.com"
            error="Invalid email format"
          />

          <Input
            label="Success State"
            type="text"
            placeholder="Valid input"
            success
          />

          <Input
            label="Password Input"
            type="password"
            placeholder="Enter password"
            required
          />

          <Input
            label="Disabled Input"
            type="text"
            placeholder="Cannot edit"
            disabled
          />
        </div>
      </Card>

      {/* Alerts */}
      <Card title="Alerts" description="Different alert variants">
        {showAlert && (
          <>
            <Alert
              variant="success"
              title="Success!"
              message="Your action was completed successfully."
              onClose={() => setShowAlert(false)}
              dismissible
            />

            <Alert
              variant="error"
              title="Error"
              message="Something went wrong. Please try again."
              dismissible
              onClose={() => setShowAlert(false)}
            />

            <Alert
              variant="warning"
              title="Warning"
              message="Please review your input before proceeding."
              dismissible
              onClose={() => setShowAlert(false)}
            />

            <Alert
              variant="info"
              title="Information"
              message="This is an informational message."
              dismissible
              onClose={() => setShowAlert(false)}
            />
          </>
        )}
      </Card>

      {/* Modal */}
      <Card title="Modal Dialog" description="Keyboard-navigable modal with focus trap">
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Open Modal
        </Button>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Example Modal"
          size="medium"
          actions={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setModalOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <p>
            This modal includes keyboard navigation (Tab/Shift+Tab to navigate, ESC to close),
            focus trap, and ARIA labels for accessibility.
          </p>
        </Modal>
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

        h4 {
          color: #374151;
          margin-bottom: 1rem;
          margin-top: 1.5rem;
        }

        h4:first-child {
          margin-top: 0;
        }

        .component-demo {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .button-group {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        @media (max-width: 640px) {
          .button-group {
            flex-direction: column;
          }

          .button-group button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default ComponentsPage
