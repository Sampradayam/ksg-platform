import React, { useState } from "react";
import events from "../data/eventsData";
import EventCard from "../components/EventCard";
import EventToggle from "../components/EventToggle";

function Events() {
  const [filter, setFilter] = useState("upcoming");
  const today = new Date();

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return filter === "upcoming" ? eventDate >= today : eventDate < today;
  });

  // Sort events: upcoming -> ascending (closest first), past -> descending (most recent first)
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return filter === "upcoming" ? da - db : db - da;
  });

  return (
    <div className="container py-4">
      <h1 className="mb-4">🎶 Kuchipudi Events</h1>

      <EventToggle filter={filter} setFilter={setFilter} />

      {sortedEvents.length === 0 ? (
        <p className="text-muted">No events found.</p>
      ) : (
        <div className="row">
          {sortedEvents.map((event) => (
            <div key={event.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <EventCard {...event} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
