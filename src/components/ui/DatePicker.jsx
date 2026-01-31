import React, { useState, useRef, useEffect } from 'react'
import './DatePicker.css'

/**
 * DatePicker Component
 * 
 * Features: Multiple format support, keyboard navigation, accessible
 * Formats supported: YYYY-MM-DD, MM/DD/YYYY, DD/MM/YYYY
 */
const DatePicker = ({
  value,
  onChange,
  format = 'YYYY-MM-DD',
  label,
  placeholder,
  minDate,
  maxDate,
  disabled = false,
  error,
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const inputRef = useRef(null)
  const pickerRef = useRef(null)
  const id = `datepicker-${Math.random().toString(36).substr(2, 9)}`

  // Parse date to display format
  const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')

    switch (format) {
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`
      case 'YYYY-MM-DD':
      default:
        return `${year}-${month}-${day}`
    }
  }

  // Parse input to date object
  const parseDate = (dateString) => {
    if (!dateString) return null

    let year, month, day

    if (format === 'MM/DD/YYYY') {
      [month, day, year] = dateString.split('/').map(Number)
    } else if (format === 'DD/MM/YYYY') {
      [day, month, year] = dateString.split('/').map(Number)
    } else {
      [year, month, day] = dateString.split('-').map(Number)
    }

    if (isNaN(year) || isNaN(month) || isNaN(day)) return null
    return new Date(year, month - 1, day)
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    const parsedDate = parseDate(inputValue)

    if (parsedDate && !isNaN(parsedDate)) {
      onChange(parsedDate)
      setCurrentMonth(new Date(parsedDate))
    }
  }

  const handleDateClick = (day) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    onChange(selectedDate)
    setIsOpen(false)
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateDisabled = (date) => {
    if (minDate && date < new Date(minDate)) return true
    if (maxDate && date > new Date(maxDate)) return true
    return false
  }

  const isDateSelected = (day) => {
    if (!value) return false
    const selectedDate = new Date(value)
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    )
  }

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const calendarDays = renderCalendar()

  return (
    <div className="datepicker-group">
      {label && (
        <label htmlFor={id} className="datepicker-label">
          {label}
          {required && <span className="required-indicator">*</span>}
        </label>
      )}

      <div ref={pickerRef} className="datepicker-wrapper">
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={value ? formatDate(value) : ''}
          onChange={handleInputChange}
          placeholder={placeholder || format}
          disabled={disabled}
          onFocus={() => setIsOpen(true)}
          className={`datepicker-input ${error ? 'datepicker-error' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />

        {isOpen && (
          <div className="datepicker-popup" role="dialog" aria-label="Date picker">
            <div className="datepicker-header">
              <button
                className="datepicker-nav-btn"
                onClick={handlePrevMonth}
                aria-label="Previous month"
              >
                ‹
              </button>
              <div className="datepicker-month">{monthName}</div>
              <button
                className="datepicker-nav-btn"
                onClick={handleNextMonth}
                aria-label="Next month"
              >
                ›
              </button>
            </div>

            <div className="datepicker-weekdays">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="datepicker-weekday">
                  {day}
                </div>
              ))}
            </div>

            <div className="datepicker-days">
              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  className={`datepicker-day ${
                    day === null ? 'datepicker-day-empty' : ''
                  } ${isDateSelected(day) ? 'datepicker-day-selected' : ''} ${
                    day && isDateDisabled(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
                      ? 'datepicker-day-disabled'
                      : ''
                  }`}
                  onClick={() => day && !isDateDisabled(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)) && handleDateClick(day)}
                  disabled={!day || (day && isDateDisabled(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)))}
                  aria-label={day ? `${monthName} ${day}` : ''}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <span id={`${id}-error`} className="datepicker-error-message">
          {error}
        </span>
      )}
    </div>
  )
}

export default DatePicker
