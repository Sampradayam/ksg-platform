const events = [];

const locations = [
  "Hyderabad",
  "Vijayawada",
  "Guntur",
  "Chennai",
  "Bengaluru",
  "Vizag",
  "Tirupati",
  "Warangal",
];

for (let i = 1; i <= 20; i++) {
  const isUpcoming = i % 2 === 0;

  events.push({
    id: i,
    title: `Kuchipudi ${
      isUpcoming ? "Performance" : "Workshop"
    } ${i}`,
    date: isUpcoming
      ? `2026-${String((i % 12) + 1).padStart(2, "0")}-15`
      : `2024-${String((i % 12) + 1).padStart(2, "0")}-10`,
    location: locations[i % locations.length],
    description:
      "A classical Kuchipudi event featuring traditional repertoire, expressive abhinaya, and rhythmic footwork.",
    image: "",
  });
}

export default events;
