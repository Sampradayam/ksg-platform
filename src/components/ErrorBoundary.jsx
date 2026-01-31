import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Error caught by ErrorBoundary:', error)
    console.error('Error Info:', errorInfo)
    
    // Update state with error details
    this.setState({
      error,
      errorInfo
    })

    // In production, you can send this to an error tracking service
    // Example: Sentry.captureException(error)
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <div style={styles.card}>
            <h1 style={styles.title}>⚠️ Oops! Something went wrong</h1>
            <p style={styles.message}>
              We're sorry for the inconvenience. An unexpected error has occurred.
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <details style={styles.details}>
                <summary style={styles.summary}>Error Details (Development Only)</summary>
                <pre style={styles.pre}>
                  <strong>Error:</strong> {this.state.error && this.state.error.toString()}
                  {'\n\n'}
                  <strong>Stack Trace:</strong>
                  {'\n'}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div style={styles.buttonContainer}>
              <button onClick={this.handleReset} style={styles.button}>
                Try Again
              </button>
              <a href="/" style={{ ...styles.button, ...styles.secondaryButton }}>
                Go to Home
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '1rem'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    maxWidth: '600px',
    textAlign: 'center'
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#1f2937'
  },
  message: {
    fontSize: '1rem',
    color: '#6b7280',
    marginBottom: '1.5rem',
    lineHeight: '1.6'
  },
  details: {
    marginBottom: '1.5rem',
    textAlign: 'left'
  },
  summary: {
    cursor: 'pointer',
    color: '#3b82f6',
    fontWeight: '500',
    marginBottom: '0.5rem'
  },
  pre: {
    backgroundColor: '#f3f4f6',
    padding: '1rem',
    borderRadius: '0.5rem',
    overflow: 'auto',
    fontSize: '0.875rem',
    color: '#1f2937',
    marginTop: '0.5rem'
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '500',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    display: 'inline-block'
  },
  secondaryButton: {
    backgroundColor: '#e5e7eb',
    color: '#1f2937'
  }
}

export default ErrorBoundary
