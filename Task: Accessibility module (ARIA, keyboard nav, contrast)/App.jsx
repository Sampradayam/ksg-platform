import React, { useState, useRef, useEffect } from "react"
import "./App.css"

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const openBtnRef = useRef(null)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && isDialogOpen) {
        setIsDialogOpen(false)
        if (openBtnRef.current) openBtnRef.current.focus()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isDialogOpen])

  useEffect(() => {
    if (isDialogOpen && closeBtnRef.current) {
      closeBtnRef.current.focus()
    }
  }, [isDialogOpen])

  function handleFormSubmit(e) {
    e.preventDefault()
    // handle form submission (placeholder)
    const el = document.getElementById("email")
    if (el) el.blur()
    alert("Form submitted (demo)")
  }

  return (
    <div className="container">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <header>
        <h1>Inclusive Usage & Accessibility</h1>
      </header>
      <main id="main">
        <button
          ref={openBtnRef}
          aria-haspopup="dialog"
          aria-expanded={isDialogOpen}
          onClick={() => setIsDialogOpen(true)}
        >
          Open Dialog
        </button>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required aria-required="true" />
          <button type="submit">Submit</button>
        </form>
      </main>

      {isDialogOpen && (
        <div
          className="dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialogTitle"
        >
          <h2 id="dialogTitle">Accessible Dialog</h2>
          <p>
            This component supports keyboard navigation, ARIA roles, and
            contrast compliance.
          </p>
          <button
            ref={closeBtnRef}
            aria-label="Close dialog"
            onClick={() => {
              setIsDialogOpen(false)
              if (openBtnRef.current) openBtnRef.current.focus()
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}

export default App
