import React from "react";

function EventToggle({ filter, setFilter }) {
  return (
    <div className="btn-group mb-4">
      <button
        className={`btn ${
          filter === "upcoming" ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={() => setFilter("upcoming")}
      >
        📅 Upcoming Events
      </button>

      <button
        className={`btn ${
          filter === "past" ? "btn-dark" : "btn-outline-dark"
        }`}
        onClick={() => setFilter("past")}
      >
        🕰 Past Events
      </button>
    </div>
  );
}

export default EventToggle;
