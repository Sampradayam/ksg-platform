export function fetchBatches() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    name: "Batch A",
                    start: "10 Mar 2026",
                    end: "10 Jun 2026",
                    startISO: "2026-03-10",
                    status: "Upcoming",
                },
                {
                    id: 2,
                    name: "Batch B",
                    start: "15 Apr 2026",
                    end: "15 Jul 2026",
                    startISO: "2026-04-15",
                    status: "Ongoing",
                },
                {
                    id: 3,
                    name: "Batch C",
                    start: "01 Jan 2026",
                    end: "01 Apr 2026",
                    startISO: "2026-01-01",
                    status: "Completed",
                },
            ]);
        }, 800);
    });
}