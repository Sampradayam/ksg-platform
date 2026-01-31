/**
 * Form Validation Framework
 * 
 * Provides reusable validation rules and utilities
 */

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePassword = (password, minLength = 8) => {
  return password.length >= minLength
}

export const validatePasswordStrength = (password) => {
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*]/.test(password)

  const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(
    Boolean
  ).length

  return {
    score: strength,
    isStrong: strength >= 3,
    feedback: {
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar
    }
  }
}

export const validatePhoneNumber = (phone) => {
  const regex = /^[\d\s\-\+\(\)]{10,}$/
  return regex.test(phone)
}

export const validateURL = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const validateMinLength = (value, minLength) => {
  return value.length >= minLength
}

export const validateMaxLength = (value, maxLength) => {
  return value.length <= maxLength
}

export const validateMinValue = (value, min) => {
  return Number(value) >= min
}

export const validateMaxValue = (value, max) => {
  return Number(value) <= max
}

export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return value !== undefined && value !== null
}

export const validateDate = (date) => {
  return !isNaN(Date.parse(date))
}

export const validateDateRange = (date, minDate, maxDate) => {
  const dateObj = new Date(date)
  const min = new Date(minDate)
  const max = new Date(maxDate)
  return dateObj >= min && dateObj <= max
}

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword
}

// Validation rules object for easy composition
export const validationRules = {
  required: (value) => validateRequired(value) || 'This field is required',
  email: (value) => !value || validateEmail(value) || 'Invalid email address',
  minLength: (minLength) => (value) =>
    !value || validateMinLength(value, minLength) || `Minimum ${minLength} characters required`,
  maxLength: (maxLength) => (value) =>
    !value || validateMaxLength(value, maxLength) || `Maximum ${maxLength} characters allowed`,
  pattern: (regex, message) => (value) =>
    !value || regex.test(value) || message,
  password: (minLength = 8) => (value) =>
    !value || validatePassword(value, minLength) || `Password must be at least ${minLength} characters`,
  confirmPassword: (password) => (confirmPassword) =>
    confirmPassword === password || 'Passwords do not match',
  phoneNumber: (value) =>
    !value || validatePhoneNumber(value) || 'Invalid phone number',
  url: (value) =>
    !value || validateURL(value) || 'Invalid URL',
  date: (value) =>
    !value || validateDate(value) || 'Invalid date',
  dateRange: (minDate, maxDate) => (value) =>
    !value || validateDateRange(value, minDate, maxDate) || `Date must be between ${minDate} and ${maxDate}`
}
