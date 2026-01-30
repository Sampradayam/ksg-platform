import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        width: "100%",
        padding: "15px 40px",
        background: "#6a1b9a",
        display: "flex",
        gap: "20px",
      }}
    >
      <Link to="/" style={{ color: "white" }}>
        Home
      </Link>
      <Link to="/about" style={{ color: "white" }}>
        About
      </Link>
      <Link to="/tourism" style={{ color: "white" }}>
        Tourism
      </Link>
      <Link to="/courses" style={{ color: "white" }}>
        Courses
      </Link>
      <Link to="/login" style={{ color: "white" }}>
        Login
      </Link>
    </nav>
  );
}
