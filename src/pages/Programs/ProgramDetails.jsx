import { useParams } from "react-router-dom";
import "./ProgramDetails.css";


export default function ProgramDetails() {
  const { programId } = useParams();

  return (
    <section>
      <h2>Program Details</h2>
      <p>Program ID: {programId}</p>

      {/* Later add:
          - syllabus
          - eligibility
          - faculty
          - fee structure
      */}
    </section>
  );
}
