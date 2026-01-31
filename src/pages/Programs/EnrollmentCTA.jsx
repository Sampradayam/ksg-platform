import { useNavigate } from "react-router-dom";
import "./EnrollmentCTA.css";

export default function EnrollmentCTA({ programId }) {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(`/enroll/${programId}`)}>
      Enroll Now
    </button>
  );
}
