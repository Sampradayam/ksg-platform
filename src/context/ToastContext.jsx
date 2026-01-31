import React, { createContext, useCallback, useContext, useState } from 'react'

const ToastContext = createContext(null)

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now()
    const toast = { id, message, type, duration }
    
    setToasts((prev) => [...prev, toast])

    if (duration > 0) {
      const timer = setTimeout(() => {
        removeToast(id)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const value = {
    toasts,
    addToast,
    removeToast,
    success: (message, duration = 3000) => addToast(message, 'success', duration),
    error: (message, duration = 5000) => addToast(message, 'error', duration),
    info: (message, duration = 3000) => addToast(message, 'info', duration),
    warning: (message, duration = 4000) => addToast(message, 'warning', duration)
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
