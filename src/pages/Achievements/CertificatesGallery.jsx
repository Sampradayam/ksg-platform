import React, { useEffect, useState, useCallback } from "react";
import "./CertificatesGallery.css";
import { useTranslation } from "../../i18n/useTranslation";

export default function CertificatesGallery({ fetchCertificates }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [openIndex, setOpenIndex] = useState(-1);

  useEffect(() => {
    let mounted = true;

    const loader = fetchCertificates
      ? fetchCertificates()
      : Promise.resolve([
          { id: 1, src: "https://via.placeholder.com/600x420?text=Certificate+1", alt: "Certificate 1" },
          { id: 2, src: "https://via.placeholder.com/600x420?text=Certificate+2", alt: "Certificate 2" },
        ]);

    loader
      .then((data) => mounted && setItems(Array.isArray(data) ? data : []))
      .catch((err) => mounted && setError(err?.message || "error"))
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [fetchCertificates]);

  const close = useCallback(() => setOpenIndex(-1), []);

  useEffect(() => {
    if (openIndex < 0) return;
    function onKey(e) {
      if (e.key === "Escape") return close();
      if (e.key === "ArrowRight") setOpenIndex((i) => Math.min(items.length - 1, i + 1));
      if (e.key === "ArrowLeft") setOpenIndex((i) => Math.max(0, i - 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, items.length, close]);

  if (loading) return <div className="loading">{t("achievements.certificates.loading")}</div>;
  if (error) return <div className="error">{t("achievements.certificates.error")}</div>;
  if (!items.length) return <div className="empty">{t("achievements.certificates.empty")}</div>;

  return (
    <section aria-labelledby="certs-heading">
      <h2 id="certs-heading" style={{ position: "absolute", left: -9999 }}>{t("achievements.certificates.title")}</h2>
      <div className="cert-grid">
        {items.map((it, idx) => (
          <button
            key={it.id}
            className="cert-thumb"
            onClick={() => setOpenIndex(idx)}
            aria-label={t("achievements.certificates.open") + ": " + it.alt}
          >
            <img src={it.src} alt={it.alt} />
          </button>
        ))}
      </div>

      {openIndex >= 0 && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={items[openIndex].src} alt={items[openIndex].alt} />
            <div style={{ marginTop: 8, textAlign: "right" }}>
              <button onClick={close}>{t("achievements.certificates.close")}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
