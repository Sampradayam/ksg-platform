import EnrollmentCTA from "./EnrollmentCTA";
import "./ProgramCard.css";


export default function ProgramCard({ program }) {
  return (
    <div className="program-card">
      <h3>{program.title}</h3>

      <p>{program.description}</p>

      <p>
        <strong>Duration:</strong> {program.duration}
      </p>

      <EnrollmentCTA programId={program.id} />
    </div>
  );
}
