import { useEffect, useState } from "react";

/* -------------------- Debounce Hook -------------------- */
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

/* -------------------- Highlight Component -------------------- */
function Highlight({ text, query }) {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i}>{part}</mark>
    ) : (
      part
    )
  );
}

/* -------------------- Mock Search API -------------------- */
async function searchApi(query) {
  await new Promise((r) => setTimeout(r, 500)); // simulate latency

  const users = [
    { id: 1, name: "Jane Doe" },
    { id: 2, name: "John Smith" },
    { id: 3, name: "Jenny Wilson" }
  ];

  const projects = [
    { id: 1, title: "Discovery Revamp" },
    { id: 2, title: "Mobile Redesign" },
    { id: 3, title: "Search Improvements" }
  ];

  return {
    users: users.filter((u) =>
      u.name.toLowerCase().includes(query.toLowerCase())
    ),
    projects: projects.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    )
  };
}

/* -------------------- App -------------------- */
export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults({});
      return;
    }

    setLoading(true);
    searchApi(debouncedQuery).then((data) => {
      setResults(data);
      setLoading(false);
    });
  }, [debouncedQuery]);

  const hasResults =
    results.users?.length > 0 || results.projects?.length > 0;

  return (
    <div style={{ padding: 24, maxWidth: 500 }}>
      <h2>Global Search</h2>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users or projects..."
        style={{ width: "100%", padding: 8 }}
      />

      {loading && <p>Searching…</p>}

      {!loading && !query && <p>Start typing to search</p>}

      {!loading && query && !hasResults && (
        <p>No results found for "{query}"</p>
      )}

      {!loading && hasResults && (
        <>
          {results.users?.length > 0 && (
            <>
              <h4>Users</h4>
              <ul>
                {results.users.map((u) => (
                  <li key={u.id}>
                    <Highlight text={u.name} query={query} />
                  </li>
                ))}
              </ul>
            </>
          )}

          {results.projects?.length > 0 && (
            <>
              <h4>Projects</h4>
              <ul>
                {results.projects.map((p) => (
                  <li key={p.id}>
                    <Highlight text={p.title} query={query} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
