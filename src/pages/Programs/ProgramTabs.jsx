import "./ProgramTabs.css";

export default function ProgramTabs({ activeTab, onChange }) {
  return (
    <div className="tabs">
      <button
        className={activeTab === "online" ? "active" : ""}
        onClick={() => onChange("online")}
      >
        Online
      </button>

      <button
        className={activeTab === "offline" ? "active" : ""}
        onClick={() => onChange("offline")}
      >
        Offline
      </button>
    </div>
  );
}
