import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Programs from "./pages/Programs/Programs";
import ProgramDetails from "./pages/Programs/ProgramDetails";
import Achievements from "./pages/Achievements/Achievements";

function App() {
  return (
    <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <BrowserRouter>
        <header style={{ padding: 12, borderBottom: "1px solid rgba(0,0,0,0.06)", background: "transparent" }}>
          <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit", fontWeight: 600 }}>Home</Link>
            <Link to="/programs" style={{ textDecoration: "none", color: "inherit" }}>Programs</Link>
            <Link to="/achievements" style={{ textDecoration: "none", color: "inherit" }}>Achievements</Link>
          </nav>
        </header>

        <main style={{ flex: 1, display: "flex", justifyContent: "center", padding: 20 }}>
          <div style={{ width: "100%", maxWidth: 1200 }}>
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Programs */}
              <Route path="/programs" element={<Programs />} />
              <Route path="/programs/:programId" element={<ProgramDetails />} />

              {/* Enrollment */}
              <Route path="/enroll/:programId" element={<div>Enrollment Page</div>} />
              {/* Achievements */}
              <Route path="/achievements" element={<Achievements />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

