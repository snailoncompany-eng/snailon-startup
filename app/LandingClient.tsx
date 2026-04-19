"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { T, type Lang } from "./i18n";

const WHOP_CHECKOUT_URL = "https://whop.com/checkout/plan_Rqh1uX4IZCqly/";

type Spots = {
  total_spots: number;
  spots_taken: number;
  spots_remaining: number;
};

export default function LandingClient({ initial }: { initial: Spots }) {
  const [lang, setLang] = useState<Lang>("en");
  const [spots, setSpots] = useState<Spots>(initial);
  const progressRef = useRef<HTMLDivElement>(null);
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const t = T[lang];
  const spotsRemaining = Math.max(0, spots.spots_remaining);
  const pctTaken =
    spots.total_spots > 0
      ? Math.min(100, Math.round((spots.spots_taken / spots.total_spots) * 100))
      : 0;

  // Apply <html dir> and font class
  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = t.lang;
    document.body.classList.toggle("rtl", t.dir === "rtl");
  }, [t.dir, t.lang]);

  // Fetch a fresh count once on mount (covers the case where the server cache was stale)
  const refreshSpots = useCallback(async () => {
    const { data, error } = await supabase
      .from("spots_summary")
      .select("total_spots, spots_taken, spots_remaining")
      .single();
    if (!error && data) setSpots(data as Spots);
  }, [supabase]);

  useEffect(() => {
    void refreshSpots();
  }, [refreshSpots]);

  // Realtime: re-fetch the summary whenever founding_members changes
  useEffect(() => {
    const channel = supabase
      .channel("spots-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "founding_members" },
        () => {
          void refreshSpots();
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase, refreshSpots]);

  // Animate progress bar width whenever pctTaken changes
  useEffect(() => {
    if (!progressRef.current) return;
    const id = window.setTimeout(() => {
      if (progressRef.current) {
        progressRef.current.style.width = `${pctTaken}%`;
      }
    }, 150);
    return () => window.clearTimeout(id);
  }, [pctTaken]);

  // Fade-in observer
  useEffect(() => {
    const els = document.querySelectorAll(".fade-in");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [lang]); // re-run when language re-renders nodes

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <a className="nav-logo" href="#">
          <div className="logo-mark">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="14" cy="13" r="7" fill="none" stroke="white" strokeWidth="2" />
              <circle cx="14" cy="13" r="3.5" fill="none" stroke="white" strokeWidth="1.8" />
              <circle cx="14" cy="13" r="1.2" fill="white" />
              <path
                d="M7 16 Q4 15 3 13"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="5" cy="11.5" r="2.2" fill="rgba(255,255,255,.9)" />
              <line x1="3.8" y1="10" x2="2.2" y2="6.8" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="5.8" y1="9.4" x2="5.8" y2="6" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="2.2" cy="6.3" r="1" fill="white" />
              <circle cx="5.8" cy="5.5" r="1" fill="white" />
            </svg>
          </div>
          <span className="nav-brand">Snailon</span>
        </a>
        <div className="nav-right">
          <div className="lang-switcher">
            {(["en", "fr", "ar"] as const).map((l) => (
              <button
                key={l}
                type="button"
                className={`lang-btn ${lang === l ? "active" : ""}`}
                onClick={() => setLang(l)}
              >
                {l === "en" ? "EN" : l === "fr" ? "FR" : "ع"}
              </button>
            ))}
          </div>
          <a
            className="btn-primary"
            href={WHOP_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="nav-cta-label">{t.nav_cta}</span>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="badge fade-in">
          <span className="badge-dot" />
          <span>{t.badge}</span>
        </div>
        <h1
          className="hero-h1 fade-in"
          dangerouslySetInnerHTML={{ __html: t.hero_h1 }}
        />
        <p className="hero-sub fade-in">{t.hero_sub}</p>

        <div className="founding-box fade-in">
          <p className="founding-pretitle">{t.founding_pre}</p>
          <div className="founding-pct">{t.pct}</div>
          <p className="founding-forever">{t.founding_forever}</p>
          <p className="founding-note">{t.founding_note}</p>
          <hr className="divider" />
          <div className="progress-head">
            <span>
              <span className="progress-spots">{spotsRemaining}</span>
              &nbsp;<span>{t.spots_label}</span>
            </span>
            <span>
              {spots.spots_taken}/{spots.total_spots}
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              ref={progressRef}
              style={{
                marginInlineStart: t.dir === "rtl" ? "auto" : undefined,
              }}
            />
          </div>
        </div>

        <div className="cta-wrap fade-in">
          <a
            className="btn-big"
            href={WHOP_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.cta_btn}
          </a>
          <p className="cta-meta">{t.cta_meta}</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" style={{ background: "var(--cream-dark)" }}>
        <div className="section-inner">
          <p className="eyebrow">{t.how_eyebrow}</p>
          <h2 className="section-title">{t.how_title}</h2>
          <div className="steps-grid">
            {t.steps.map((s) => (
              <div className="step-card fade-in" key={s.n}>
                <div className="step-num">{s.n}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-body">{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section className="compare-section">
        <div className="compare-inner">
          <p className="eyebrow-light">{t.compare_eyebrow}</p>
          <h2 className="compare-title">{t.compare_title}</h2>
          <div className="compare-card">
            <div className="compare-head">
              <span />
              <span className="col-founding">{t.col_founding}</span>
              <span>{t.col_standard}</span>
            </div>
            <div>
              {t.rows.map((row, i) => (
                <div className="compare-row" key={i}>
                  <span className="label">{row[0]}</span>
                  <span className="val green">{row[1]}</span>
                  <span className="val">{row[2]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section>
        <div className="final-cta fade-in">
          <h2 className="final-h2">{t.final_title(spotsRemaining)}</h2>
          <p className="final-sub">{t.final_sub}</p>
          <a
            className="btn-big"
            href={WHOP_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.final_btn}
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-brand">🐌 Snailon</div>
        <p>{t.footer}</p>
      </footer>
    </>
  );
}
