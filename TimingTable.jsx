export default function TimingTable() {
    return (
        <section>
            <h2>Class Timings</h2>

            <table className="responsive-table">
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Time</th>
                        <th>Mode</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="Day">Monday – Friday</td>
                        <td data-label="Time">10:00 AM – 1:00 PM</td>
                        <td data-label="Mode">Offline</td>
                    </tr>
                    <tr>
                        <td data-label="Day">Saturday</td>
                        <td data-label="Time">10:00 AM – 12:00 PM</td>
                        <td data-label="Mode">Offline</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}