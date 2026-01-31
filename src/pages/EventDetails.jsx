import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import events from "../data/eventsData";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div className="container py-4">
        <div className="page-navbar d-flex align-items-center mb-4">
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/")}
          >
            ← Back to Events
          </button>
        </div>

        <h2 className="text-center mt-5">Event not found</h2>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="page-navbar d-flex align-items-center mb-4">
        <button
          className="btn btn-outline-primary me-3"
          onClick={() => navigate("/")}
        >
          ← Back to Events
        </button>

        <div className="flex-grow-1 text-center">
          <h5 className="mb-0 text-muted">Event Details</h5>
        </div>
      </div>

      <div className="card event-details p-4">
        <div className="d-md-flex align-items-start">
          <div className="flex-grow-1">
            <h1 className="mb-2">🎭 {event.title || "Untitled Event"}</h1>

            <div className="meta mb-3">
              <span className="me-4">
                📆 <strong>{event.date || "Not available"}</strong>
              </span>
              <span>
                📍 <strong>{event.location || "Not mentioned"}</strong>
              </span>
            </div>

            <hr />

            <div className="description-text mb-4">
              {event.description || "No detailed description available for this event."}
            </div>
          </div>

          <aside className="ms-md-4 mt-3 mt-md-0" style={{ minWidth: 200 }}>
            <div className="card p-3">
              <div className="text-muted small mb-2">Event ID</div>
              <div className="fw-bold mb-3">#{event.id}</div>

              {(() => {
                const now = new Date();
                const eventDate = new Date(event.date);
                const isUpcoming = eventDate >= now;
                return isUpcoming ? (
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => alert("Register clicked")}
                  >
                    Register
                  </button>
                ) : (
                  <div className="text-muted small">Registration closed</div>
                );
              })()}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
