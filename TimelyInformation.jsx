import { useEffect, useState } from "react";

/* ---------- Reusable Banner ---------- */
function Banner({ onDismiss }) {
  return (
    <div className="banner" role="alert">
      <div>
        <strong>Service Interruption</strong>
        <p>
          Admissions portal is under maintenance today from 5:00 PM to 6:00 PM.
          Please plan accordingly.
        </p>
      </div>
      <button onClick={onDismiss} aria-label="Dismiss banner">
        Dismiss
      </button>
    </div>
  );
}

/* ---------- Reusable Toast ---------- */
function Toast({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div className={`toast ${toast.type}`} role="status">
      <div>
        <strong>{toast.title}</strong>
        <p>{toast.message}</p>
      </div>
      <button onClick={() => onClose(toast.id)} aria-label="Close notification">
        ×
      </button>
    </div>
  );
}

/* ---------- Main Page ---------- */
export default function TimelyInformation() {
  const [showBanner, setShowBanner] = useState(true);
  const [toasts, setToasts] = useState([]);

  const addToast = (type, title, message) => {
    setToasts((prev) => [...prev, { id: Date.now(), type, title, message }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const clearAll = () => {
    setShowBanner(false);
    setToasts([]);
  };

  return (
    <div className="page">
      {showBanner && <Banner onDismiss={() => setShowBanner(false)} />}

      <h1 className="title">Timely Information</h1>
      <p className="subtitle">
        Banners for important notices • Toasts for gentle confirmations
      </p>

      <div className="actions">
        <button className="btn primary" onClick={() => setShowBanner(true)}>
          Trigger Banner
        </button>

        <button
          className="btn warning"
          onClick={() =>
            addToast(
              "success",
              "Saved",
              "Your profile has been updated successfully."
            )
          }
        >
          Trigger Toast
        </button>

        <button className="btn" onClick={clearAll}>
          Clear
        </button>
      </div>

      <form className="form">
        <label>
          Student Name
          <input placeholder="Enter student name..." />
        </label>

        <label>
          Batch
          <select>
            <option>Select batch...</option>
            <option>2023</option>
            <option>2024</option>
          </select>
        </label>

        <label>
          Class Schedule
          <select>
            <option>Choose schedule...</option>
            <option>Morning</option>
            <option>Evening</option>
          </select>
        </label>
      </form>

      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>
    </div>
  );
}

