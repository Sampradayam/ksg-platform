import { useEffect, useMemo, useState } from "react";
import { fetchBatches } from "../services/api";
const STATUS_FILTERS = ["All", "Upcoming", "Ongoing", "Completed"];

export default function BatchSchedule() {
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);

    const [status, setStatus] = useState("All");
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        fetchBatches().then((data) => {
            setBatches(data);
            setLoading(false);
        });
    }, []);

    const filteredBatches = useMemo(() => {
        return batches.filter((batch) => {
            if (status !== "All" && batch.status !== status) return false;

            if (
                search &&
                !batch.name.toLowerCase().includes(search.toLowerCase())
            ) {
                return false;
            }

            const batchStart = new Date(batch.startISO);
            if (startDate && batchStart < new Date(startDate)) return false;
            if (endDate && batchStart > new Date(endDate)) return false;

            return true;
        });
    }, [batches, status, search, startDate, endDate]);

    return (
        <section>
            <h2>Batch Schedule</h2>

            {!loading && batches.length > 0 && (
                <div className="filter-panel">
                    <div className="filters">
                        {STATUS_FILTERS.map((item) => (
                            <button
                                key={item}
                                className={`filter-btn ${status === item ? "active" : ""}`}
                                onClick={() => setStatus(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <input
                        className="search-input"
                        placeholder="Search batch name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="date-filters">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
            )}

            {loading && <p>Loading batches...</p>}

            {!loading && batches.length === 0 && (
                <div className="empty-state">
                    No offline batches are currently scheduled.
                </div>
            )}

            {!loading && batches.length > 0 && filteredBatches.length === 0 && (
                <div className="empty-state">
                    No batches match your filters.
                </div>
            )}

            {!loading && filteredBatches.length > 0 && (
                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>Batch</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBatches.map((batch) => (
                            <tr key={batch.id}>
                                <td data-label="Batch">{batch.name}</td>
                                <td data-label="Start Date">{batch.start}</td>
                                <td data-label="End Date">{batch.end}</td>
                                <td data-label="Status">
                                    <span className={`status ${batch.status.toLowerCase()}`}>
                                        {batch.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}