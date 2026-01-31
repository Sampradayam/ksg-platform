import React, { useState, useRef } from "react";
import "./Achievements.css";
import Awards from "./Awards";
import StudentAchievements from "./StudentAchievements";
import FestivalParticipation from "./FestivalParticipation";
import CertificatesGallery from "./CertificatesGallery";
import { useTranslation } from "../../i18n/useTranslation";

const TAB_KEYS = ["awards", "students", "festivals", "certificates"];

export default function Achievements() {
  const { t } = useTranslation();
  const [active, setActive] = useState(TAB_KEYS[0]);
  const tabsRef = useRef([]);

  function onKeyDown(e) {
    const idx = TAB_KEYS.indexOf(active);
    if (e.key === "ArrowRight") setActive(TAB_KEYS[(idx + 1) % TAB_KEYS.length]);
    if (e.key === "ArrowLeft") setActive(TAB_KEYS[(idx - 1 + TAB_KEYS.length) % TAB_KEYS.length]);
  }

  return (
    <div className="achievements-container">
      <div className="achievements-header">
        <h1>{t("achievements.title")}</h1>
      </div>

      <div
        role="tablist"
        aria-label={t("achievements.title")}
        className="achievements-tabs"
        onKeyDown={onKeyDown}
      >
        <button
          ref={(el) => (tabsRef.current[0] = el)}
          role="tab"
          aria-selected={active === "awards"}
          tabIndex={active === "awards" ? 0 : -1}
          className="achievements-tab"
          onClick={() => setActive("awards")}
        >
          {t("achievements.awards.title")}
        </button>

        <button
          ref={(el) => (tabsRef.current[1] = el)}
          role="tab"
          aria-selected={active === "students"}
          tabIndex={active === "students" ? 0 : -1}
          className="achievements-tab"
          onClick={() => setActive("students")}
        >
          {t("achievements.students.title")}
        </button>

        <button
          ref={(el) => (tabsRef.current[2] = el)}
          role="tab"
          aria-selected={active === "festivals"}
          tabIndex={active === "festivals" ? 0 : -1}
          className="achievements-tab"
          onClick={() => setActive("festivals")}
        >
          {t("achievements.festivals.title")}
        </button>

        <button
          ref={(el) => (tabsRef.current[3] = el)}
          role="tab"
          aria-selected={active === "certificates"}
          tabIndex={active === "certificates" ? 0 : -1}
          className="achievements-tab"
          onClick={() => setActive("certificates")}
        >
          {t("achievements.certificates.title")}
        </button>
      </div>

      <div className="achievements-panel" role="tabpanel">
        {active === "awards" && <Awards />}
        {active === "students" && <StudentAchievements />}
        {active === "festivals" && <FestivalParticipation />}
        {active === "certificates" && <CertificatesGallery />}
      </div>
    </div>
  );
}
