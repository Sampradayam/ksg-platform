import { useState, useCallback } from 'react'

/**
 * useForm Hook
 * 
 * Manages form state, validation, and submission
 * Usage:
 *   const { values, errors, handleChange, handleSubmit } = useForm(initialValues, onSubmit, validate)
 */
export const useForm = (initialValues, onSubmit, validate) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    setValues((prev) => ({
      ...prev,
      [name]: newValue
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }))
    }
  }, [errors])

  const handleBlur = useCallback((e) => {
    const { name } = e.target

    setTouched((prev) => ({
      ...prev,
      [name]: true
    }))

    if (validate) {
      const fieldErrors = validate({ [name]: values[name] })
      setErrors((prev) => ({
        ...prev,
        ...fieldErrors
      }))
    }
  }, [values, validate])

  const handleSubmit = useCallback(
    (e) => {
      if (e) {
        e.preventDefault()
      }

      if (validate) {
        const fieldErrors = validate(values)
        setErrors(fieldErrors)

        if (Object.keys(fieldErrors).length > 0) {
          return
        }
      }

      setIsSubmitting(true)

      Promise.resolve(onSubmit(values))
        .then(() => {
          setIsSubmitting(false)
        })
        .catch((err) => {
          console.error('Form submission error:', err)
          setIsSubmitting(false)
        })
    },
    [values, onSubmit, validate]
  )

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const setFieldError = useCallback((name, error) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }))
  }, [])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError
  }
}
