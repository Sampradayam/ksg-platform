# KSG Platform - React UI Framework

A production-ready React application framework with a comprehensive UI component library, form validation, routing, and full accessibility support.

## ✨ Features

✅ **Global Layout System** - Consistent navbar and footer across all pages  
✅ **React Router Integration** - Full routing with active route highlighting  
✅ **Error Boundary** - Centralized error handling with user-friendly UI  
✅ **Navigation System** - Responsive navbar with keyboard navigation and mobile menu  
✅ **UI Component Library** - Button, Input, Modal, Card, Alert, DatePicker  
✅ **Form Validation Framework** - Comprehensive validation utilities with useForm hook  
✅ **Toast Notifications** - Multi-state notifications (success/error/info/warning) with auto-dismiss  
✅ **Accessibility (WCAG 2.1)** - Full keyboard support, ARIA labels, focus management  
✅ **Responsive Design** - Mobile-first approach with CSS Grid/Flexbox

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.jsx           # Primary, secondary, danger, ghost variants
│   │   ├── Button.css
│   │   ├── Input.jsx            # Text, email, password, tel types
│   │   ├── Input.css
│   │   ├── Modal.jsx            # Focus trap, ESC to close
│   │   ├── Modal.css
│   │   ├── Card.jsx             # Content container with optional header/footer
│   │   ├── Card.css
│   │   ├── Alert.jsx            # Success/error/warning/info states
│   │   ├── Alert.css
│   │   ├── DatePicker.jsx       # Multi-format date selection
│   │   └── DatePicker.css
│   ├── Navbar.jsx               # Responsive nav with active route highlight
│   ├── Navbar.css
│   ├── Footer.jsx               # Footer with links and copyright
│   ├── Footer.css
│   ├── ErrorBoundary.jsx        # Global error handling
│   ├── Toast.jsx                # Notification display
│   └── Toast.css
├── layouts/
│   ├── MainLayout.jsx           # Global layout wrapper
│   └── MainLayout.css
├── pages/
│   ├── HomePage.jsx             # Landing page with features
│   ├── ComponentsPage.jsx       # Component showcase
│   ├── FormsPage.jsx            # Form examples and validation
│   └── DocumentationPage.jsx    # Getting started guide
├── hooks/
│   └── useForm.js               # Form state, validation, submission
├── utils/
│   └── validation.js            # 15+ validation rules and utilities
├── context/
│   └── ToastContext.jsx         # Toast notification system
├── App.jsx                      # Main router setup
├── main.jsx                     # Entry point
└── index.css                    # Global design tokens and styles
```

## 🚀 Quick Start

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build & Deploy

```bash
npm run build
npm run preview
```

## 🎨 Components

### Button
Variants: `primary`, `secondary`, `danger`, `ghost`  
Sizes: `small`, `medium`, `large`

```jsx
<Button variant="primary" size="medium" disabled={false} loading={false}>
  Click Me
</Button>
```

### Input
Supports email, password, tel, number, text, and textarea

```jsx
<Input
  label="Email"
  type="email"
  placeholder="user@example.com"
  error={errors.email}
  helpText="We'll never share your email"
  required
/>
```

### DatePicker
Formats: `YYYY-MM-DD`, `MM/DD/YYYY`, `DD/MM/YYYY`

```jsx
<DatePicker
  label="Date of Birth"
  value={date}
  onChange={setDate}
  format="MM/DD/YYYY"
  minDate="1990-01-01"
  maxDate="2010-12-31"
/>
```

### Modal
Focus trap, ESC to close, keyboard navigation

```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="medium"
  actions={
    <>
      <Button onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

### Alert
Variants: `success`, `error`, `warning`, `info`

```jsx
<Alert
  variant="success"
  title="Success!"
  message="Your changes have been saved."
  dismissible
  onClose={handleClose}
/>
```

### Card
Flexible content container

```jsx
<Card
  title="Card Title"
  description="Subtitle or description text"
  footer={<Button>Action</Button>}
>
  <p>Card content goes here</p>
</Card>
```

## 📋 Form Validation

```jsx
import { useForm } from './hooks/useForm'

const MyForm = () => {
  const validate = (values) => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Invalid email format'
    }
    return errors
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  } = useForm(
    { email: '', password: '' },
    onSubmit,
    validate
  )

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && errors.email}
      />
      <Input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        error={touched.password && errors.password}
      />
      <Button type="submit">Submit</Button>
      <Button type="button" variant="secondary" onClick={resetForm}>
        Reset
      </Button>
    </form>
  )
}
```

### Available Validators

```javascript
validateEmail(email)                        // RFC compliant
validatePassword(password, minLength = 8)   // Length check
validatePasswordStrength(password)          // Score 0-4
validatePhoneNumber(phone)                  // International formats
validateURL(url)                            // URL format
validateMinLength(value, minLength)         // Minimum chars
validateMaxLength(value, maxLength)         // Maximum chars
validateRequired(value)                     // Non-empty
validateDate(date)                          // Valid date
validateDateRange(date, min, max)           // Date range
validationRules                             // Composable validators
```

## 🔔 Toast Notifications

```jsx
import { useToast } from './context/ToastContext'

const MyComponent = () => {
  const { success, error, info, warning } = useToast()

  return (
    <>
      <button onClick={() => success('Saved!')}>Save</button>
      <button onClick={() => error('Something went wrong!')}>Error</button>
      <button onClick={() => info('FYI: This is a heads up')}>Info</button>
      <button onClick={() => warning('Warning: Action required!')}>
        Warning
      </button>
    </>
  )
}
```

Auto-dismiss durations:
- `success`: 3 seconds
- `error`: 5 seconds
- `info`: 3 seconds
- `warning`: 4 seconds

## ♿ Accessibility

All components are built with WCAG 2.1 Level AA compliance:

- ✓ **Keyboard Navigation**: Tab/Shift+Tab, Enter, Space, ESC
- ✓ **ARIA Labels**: `aria-label`, `aria-describedby`, `aria-invalid`
- ✓ **Focus Management**: Focus trap in modals, focus restoration
- ✓ **Semantic HTML**: Proper elements (button, nav, main, footer, etc.)
- ✓ **Color Contrast**: All text meets 4.5:1 minimum ratio
- ✓ **Error Association**: Error messages linked to fields
- ✓ **Screen Reader Support**: Proper roles and live regions

## 📱 Responsive Design

Mobile-first approach with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🛠️ Technologies

- **React 18** - UI library
- **React Router 6** - Client-side routing
- **Vite 5** - Build tool
- **CSS3** - Styling (Grid, Flexbox, custom properties)
- **JavaScript ES2020+** - Modern syntax

## 📚 Documentation Pages

- **Home** (`/`) - Feature overview and quick start
- **Components** (`/components`) - Interactive component showcase
- **Forms** (`/forms`) - Form validation examples
- **Documentation** (`/docs`) - Getting started guide

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT

---

If you want the architecture tailored to a specific cloud provider or stack, share the target platform and preferred technologies.
