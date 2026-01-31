import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import { ToastProvider } from './context/ToastContext'
import Toast from './components/Toast'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import ComponentsPage from './pages/ComponentsPage'
import FormsPage from './pages/FormsPage'
import DocumentationPage from './pages/DocumentationPage'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ToastProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/components" element={<ComponentsPage />} />
              <Route path="/forms" element={<FormsPage />} />
              <Route path="/docs" element={<DocumentationPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </MainLayout>
          <Toast />
        </ToastProvider>
      </Router>
    </ErrorBoundary>
  )
}

const NotFoundPage = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
      Go Home
    </a>
  </div>
)

export default App
