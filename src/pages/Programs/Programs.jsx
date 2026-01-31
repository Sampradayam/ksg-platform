import { useState } from "react";
import { Link } from "react-router-dom";
import ProgramTabs from "./ProgramTabs";
import ProgramCard from "./ProgramCard";
import "./Programs.css";

const programsData = {
  online: [
    {
      id: "online-basic",
      title: "Online Kuchipudi – Foundation",
      description:
        "Online structured learning covering adavus, theory, rhythm and abhinaya.",
      duration: "6 Months",
    },
    {
      id: "online-advanced",
      title: "Advanced Online Training",
      description:
        "For experienced dancers focusing on varnams, padams and performance.",
      duration: "1 Year",
    },
  ],
  offline: [
    {
      id: "gurukulam",
      title: "Residential Gurukulam Program",
      description:
        "Traditional Guru–Shishya Parampara with immersive residential training.",
      duration: "3–5 Years",
    },
    {
      id: "weekend",
      title: "Weekend Batch",
      description:
        "Ideal for students balancing academics with classical dance learning.",
      duration: "Ongoing",
    },
  ],
};

export default function Programs() {
  const [activeTab, setActiveTab] = useState("online");

  return (
    <section className="programs">
      <div className="programs-container">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <h1 className="programs-title">Our Programs</h1>
          <Link to="/achievements" style={{fontSize:14,background:'#0b5cff',color:'#fff',padding:'8px 12px',borderRadius:6,textDecoration:'none'}}>
            Achievements
          </Link>
        </div>

        <ProgramTabs activeTab={activeTab} onChange={setActiveTab} />

        <div className="program-grid">
          {programsData[activeTab].map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}
