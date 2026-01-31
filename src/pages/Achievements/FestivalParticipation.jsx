import React, { useEffect, useState } from "react";
import "./FestivalParticipation.css";
import { useTranslation } from "../../i18n/useTranslation";

export default function FestivalParticipation({ fetchFestivals }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    let mounted = true;

    const loader = fetchFestivals
      ? fetchFestivals()
      : Promise.resolve([
          { id: 1, name: "Diwali Utsav", year: 2024, role: "Group" },
          { id: 2, name: "Spring Festival", year: 2023, role: "Solo" },
        ]);

    loader
      .then((data) => mounted && setFestivals(Array.isArray(data) ? data : []))
      .catch((err) => mounted && setError(err?.message || "error"))
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [fetchFestivals]);

  if (loading) return <div className="loading">{t("achievements.festivals.loading")}</div>;
  if (error) return <div className="error">{t("achievements.festivals.error")}</div>;
  if (!festivals.length) return <div className="empty">{t("achievements.festivals.empty")}</div>;

  return (
    <section aria-labelledby="festivals-heading">
      <h2 id="festivals-heading" style={{ position: "absolute", left: -9999 }}>{t("achievements.festivals.title")}</h2>
      <div className="festivals-list">
        {festivals.map((f) => (
          <article key={f.id} className="festival-card" tabIndex={0} aria-label={`${f.name} ${f.year}`}>
            <div className="festival-name">{f.name}</div>
            <div className="festival-meta">{f.year} • {f.role}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
