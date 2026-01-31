import React from 'react'
import { useForm } from '../hooks/useForm'
import { validationRules } from '../utils/validation'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import DatePicker from '../components/ui/DatePicker'
import Card from '../components/ui/Card'
import Alert from '../components/ui/Alert'
import { useToast } from '../context/ToastContext'

const FormsPage = () => {
  const { success } = useToast()

  const validate = (values) => {
    const errors = {}

    // Validate fields
    if (!values.fullName?.trim()) {
      errors.fullName = 'Full name is required'
    }

    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Please enter a valid email'
    }

    if (!values.password) {
      errors.password = 'Password is required'
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    if (!values.phone) {
      errors.phone = 'Phone number is required'
    } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(values.phone)) {
      errors.phone = 'Please enter a valid phone number'
    }

    if (!values.birthDate) {
      errors.birthDate = 'Date of birth is required'
    }

    return errors
  }

  const handleSubmit = (values) => {
    success('Form submitted successfully!')
    console.log('Form values:', values)
    // Reset form after successful submission
    resetForm()
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit: onSubmit,
    resetForm,
    setFieldValue
  } = useForm(
    {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      birthDate: null,
      agreeToTerms: false
    },
    handleSubmit,
    validate
  )

  return (
    <div>
      <h1>Form Examples</h1>
      <p className="subtitle">
        Includes validation, date picker, and comprehensive error handling.
      </p>

      <Card title="Registration Form" description="Complete form with validation">
        <form onSubmit={onSubmit}>
          <Input
            label="Full Name"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.fullName && errors.fullName}
            placeholder="John Doe"
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            placeholder="john@example.com"
            required
          />

          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone && errors.phone}
            placeholder="+1 (555) 123-4567"
            required
          />

          <DatePicker
            label="Date of Birth"
            value={values.birthDate}
            onChange={(date) => setFieldValue('birthDate', date)}
            format="MM/DD/YYYY"
            error={touched.birthDate && errors.birthDate}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
            helpText="Minimum 8 characters"
            required
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword && errors.confirmPassword}
            required
          />

          <div className="checkbox-group">
            <input
              id="terms"
              type="checkbox"
              name="agreeToTerms"
              checked={values.agreeToTerms}
              onChange={handleChange}
            />
            <label htmlFor="terms">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          <div className="button-group">
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Button type="button" variant="secondary" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </form>
      </Card>

      <Card title="Validation Guide" description="Built-in validators">
        <Alert
          variant="info"
          title="Validation Framework"
          message="The form includes email, password strength, phone number, and custom field validators."
        />

        <div className="validation-guide">
          <h4>Available Validators:</h4>
          <ul>
            <li><code>validateRequired()</code> - Check if field has value</li>
            <li><code>validateEmail()</code> - Email format validation</li>
            <li><code>validatePassword()</code> - Password strength check</li>
            <li><code>validatePhoneNumber()</code> - Phone format validation</li>
            <li><code>validateMinLength()</code> - Minimum character check</li>
            <li><code>validateMaxLength()</code> - Maximum character check</li>
            <li><code>validateURL()</code> - URL format validation</li>
            <li><code>validateDate()</code> - Date format validation</li>
          </ul>
        </div>
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

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .checkbox-group input[type="checkbox"] {
          width: auto;
        }

        .checkbox-group label {
          margin: 0;
          font-weight: normal;
        }

        .button-group {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .validation-guide ul {
          list-style-position: inside;
          color: #6b7280;
        }

        .validation-guide li {
          margin-bottom: 0.5rem;
        }

        code {
          background-color: #f3f4f6;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: 'Courier New', monospace;
          color: #ef4444;
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

export default FormsPage
