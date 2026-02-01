import BatchSchedule from "./components/BatchSchedule";
import TimingTable from "./components/TimingTable";
import Eligibility from "./components/Eligibility";
import "./styles.css";

export default function App() {
  return (
    <main className="container">
      <BatchSchedule />
      <TimingTable />
      <Eligibility />
    </main>
  );
}