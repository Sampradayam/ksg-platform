import React, { useEffect, useState } from "react";
import "./Awards.css";
import { useTranslation } from "../../i18n/useTranslation";

// Props: optional `fetchAwards` function returning Promise<array>
export default function Awards({ fetchAwards }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    let mounted = true;

    const loader = fetchAwards
      ? fetchAwards()
      : Promise.resolve([
          { id: 1, title: "Best Performer 2024", year: "2024", meta: "Regional" },
          { id: 2, title: "Young Talent", year: "2023", meta: "State" },
        ]);

    loader
      .then((data) => {
        if (!mounted) return;
        setAwards(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message || "error");
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [fetchAwards]);

  if (loading) return <div className="loading">{t("achievements.awards.loading")}</div>;
  if (error) return <div className="error">{t("achievements.awards.error")}</div>;
  if (!awards.length) return <div className="empty">{t("achievements.awards.empty")}</div>;

  return (
    <section aria-labelledby="awards-heading">
      <h2 id="awards-heading" style={{ position: "absolute", left: -9999 }}>{t("achievements.awards.title")}</h2>
      <div className="awards-list">
        {awards.map((a) => (
          <article key={a.id} className="award-card" tabIndex={0} aria-label={`${a.title} ${a.year}`}>
            <div className="award-title">{a.title}</div>
            <div className="award-meta">{a.year} — {a.meta}</div>
            <div style={{ marginTop: 8 }}>
              <button aria-label={t("achievements.awards.viewDetails")} onClick={() => alert(a.title)}>
                {t("achievements.awards.viewDetails")}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
