import React from "react";
import { Link } from "react-router-dom";

function EventCard({ id, title, date, location, description }) {
  return (
    <div className="card event-card h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">🎭 {title || "Untitled Event"}</h5>

        <p className="card-text text-muted mb-1">
          📆 {date || "Date not available"}
        </p>

        <p className="card-text text-muted mb-2">
          📍 {location || "Location not mentioned"}
        </p>

        {description && (
          <p className="card-text mb-3">
            {description}
          </p>
        )}

        <Link to={`/events/${id}`} className="btn btn-outline-primary mt-auto">
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
