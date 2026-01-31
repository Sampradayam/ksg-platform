import React, { useEffect, useState } from "react";
import "./StudentAchievements.css";
import { useTranslation } from "../../i18n/useTranslation";

// Props: optional fetchStudents -> Promise<array>
export default function StudentAchievements({ fetchStudents }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    let mounted = true;

    const loader = fetchStudents
      ? fetchStudents()
      : Promise.resolve([
          { id: 1, name: "Anjali", achievement: "Top Grade", year: 2024 },
          { id: 2, name: "Ravi", achievement: "Outstanding Performance", year: 2023 },
        ]);

    loader
      .then((data) => mounted && setStudents(Array.isArray(data) ? data : []))
      .catch((err) => mounted && setError(err?.message || "error"))
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [fetchStudents]);

  if (loading) return <div className="loading">{t("achievements.students.loading")}</div>;
  if (error) return <div className="error">{t("achievements.students.error")}</div>;
  if (!students.length) return <div className="empty">{t("achievements.students.empty")}</div>;

  return (
    <section aria-labelledby="students-heading">
      <h2 id="students-heading" style={{ position: "absolute", left: -9999 }}>{t("achievements.students.title")}</h2>
      <div className="students-list">
        {students.map((s) => (
          <div key={s.id} className="student-card" tabIndex={0} role="article" aria-label={`${s.name} ${s.achievement}`}>
            <div className="student-avatar" aria-hidden="true" />
            <div>
              <div style={{ fontWeight: 600 }}>{s.name}</div>
              <div className="student-meta">{s.achievement} • {s.year}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
