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

/**
 * Tiny Moroccan-inspired 8-point star. Used as an ornament.
 * Intentionally understated — a single geometric mark, not decorative maximalism.
 */
function ZelligeStar({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="0.9">
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
        <path d="M12 4.5 L13.4 10.6 L19.5 12 L13.4 13.4 L12 19.5 L10.6 13.4 L4.5 12 L10.6 10.6 Z" />
      </g>
    </svg>
  );
}

/** Snail / spiral mark for the brand lockup. Single-line, minimal. */
function SnailMark({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="12" r="6.5" />
        <circle cx="14" cy="12" r="3.2" />
        <circle cx="14" cy="12" r="1" fill="currentColor" stroke="none" />
        <path d="M7.5 16 Q4 15.5 2.8 13.2" />
        <path d="M5.5 10.8 L4 7.2 M7.3 10.2 L7.3 6.8" />
      </g>
    </svg>
  );
}

export default function LandingClient({ initial }: { initial: Spots }) {
  const [lang, setLang] = useState<Lang>("en");
  const [spots, setSpots] = useState<Spots>(initial);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const t = T[lang];
  const remaining = Math.max(0, spots.spots_remaining);
  const pctTaken =
    spots.total_spots > 0
      ? Math.min(100, Math.round((spots.spots_taken / spots.total_spots) * 100))
      : 0;

  // Html dir + body rtl toggle
  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = t.lang;
    document.body.classList.toggle("rtl", t.dir === "rtl");
  }, [t.dir, t.lang]);

  // Refresh spots on mount
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

  // Realtime subscription
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

  // Animated number counter: tick down from a higher value to the real remaining on first mount.
  // This is the "one orchestrated moment" — the hero's signature animation.
  const [displayNum, setDisplayNum] = useState(remaining);
  const didAnimateRef = useRef(false);
  useEffect(() => {
    // Only animate on first mount with the true initial value
    if (didAnimateRef.current) {
      setDisplayNum(remaining);
      return;
    }
    didAnimateRef.current = true;
    const start = Math.min(remaining + 18, 120);
    const end = remaining;
    const duration = 1400;
    const startTime = performance.now();
    let rafId = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - startTime) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.round(start + (end - start) * eased);
      setDisplayNum(v);
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [remaining]);

  // Progress bar fill
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!progressRef.current) return;
    const id = window.setTimeout(() => {
      if (progressRef.current) progressRef.current.style.width = `${pctTaken}%`;
    }, 200);
    return () => window.clearTimeout(id);
  }, [pctTaken]);

  // Reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );
    els.forEach((el) => obs.observe(el));
    // Immediately reveal anything above the fold on mount (IntersectionObserver occasionally misses fast first paints)
    requestAnimationFrame(() => {
      document.querySelectorAll(".reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          el.classList.add("is-visible");
        }
      });
    });
    return () => obs.disconnect();
  }, [lang]);

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  return (
    <>
      {/* ──────── NAV ──────── */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="nav-brand" aria-label="Snailon home">
            <span className="nav-mark">
              <SnailMark />
            </span>
            Snailon
          </a>
          <div className="nav-right">
            <a href="#how" className="nav-link nav-link-how">
              {t.nav_how}
            </a>
            <div className="lang" role="tablist" aria-label="Language">
              {(["en", "fr", "ar"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  className={lang === l ? "is-active" : ""}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                >
                  {l === "en" ? "EN" : l === "fr" ? "FR" : "ع"}
                </button>
              ))}
            </div>
            <a href="/login" className="btn btn-ghost">
              {t.nav_signin}
            </a>
            <a
              href={WHOP_CHECKOUT_URL}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.nav_cta} <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ──────── HERO ──────── */}
      <section className="hero">
        <div className="hero-grid">
          {/* Left: headline, lede, CTAs */}
          <div className="hero-left">
            <div className="reveal is-visible hero-eyebrow-row">
              <span className="eyebrow">
                {t.hero_eyebrow_place}
              </span>
              <span className="sep" />
              <span className="meta">{t.hero_eyebrow_year}</span>
            </div>
            <h1
              className="hero-h1 reveal is-visible"
              data-delay="1"
              dangerouslySetInnerHTML={{ __html: t.hero_h1 }}
            />
            <p className="hero-lede reveal is-visible" data-delay="2">
              {t.hero_lede}
            </p>
            <div className="hero-cta-row reveal is-visible" data-delay="3">
              <a
                href={WHOP_CHECKOUT_URL}
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.hero_cta_primary} <span className="btn-arrow">→</span>
              </a>
              <a href="#how" className="btn btn-ghost btn-lg">
                {t.hero_cta_secondary}
              </a>
            </div>
            <div className="hero-meta reveal is-visible" data-delay="4">
              {t.hero_meta.map((m, i) => (
                <span key={i}>
                  <span className="dot" /> {m}
                </span>
              ))}
            </div>
          </div>

          {/* Right: the counter */}
          <aside className="counter reveal is-visible" data-delay="2" aria-live="polite">
            <span className="counter-stamp">{t.counter_stamp}</span>
            <div className="counter-label">{t.counter_label}</div>
            <span className="counter-num">{displayNum}</span>
            <div className="counter-divider">
              <span>{t.counter_of}</span>
            </div>
            <p className="counter-sub">{t.counter_sub}</p>
            <div className="counter-progress">
              <div
                className="counter-progress-fill"
                ref={progressRef}
                style={{ width: 0 }}
              />
            </div>
            <div className="counter-rate">
              <span className="counter-rate-pct">1%</span>
              <span className="counter-rate-text">{t.counter_rate_text}</span>
            </div>
          </aside>
        </div>
      </section>

      {/* ──────── Ornament rule ──────── */}
      <div className="page">
        <div className="ornament reveal is-visible">
          <ZelligeStar />
        </div>
      </div>

      {/* ──────── HOW IT WORKS ──────── */}
      <section className="section" id="how">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">{t.how_eyebrow}</span>
            <h2 className="section-title">{t.how_title}</h2>
          </div>
          <p className="section-note">{t.how_note}</p>
        </div>
        <div className="steps">
          {t.steps.map((s, i) => (
            <div className="step reveal" data-delay={i + 1} key={s.n}>
              <div className="step-num">{s.n}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-body">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ──────── COMPARE ──────── */}
      <div className="compare-section" id="offer">
        <div className="section">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">{t.compare_eyebrow}</span>
              <h2
                className="section-title"
                dangerouslySetInnerHTML={{ __html: t.compare_title }}
              />
            </div>
            <p className="section-note">{t.compare_note}</p>
          </div>
          <div className="compare-table reveal">
            <div className="compare-row is-head">
              <span className="col"></span>
              <span className="col founding">{t.col_founding}</span>
              <span className="col">{t.col_standard}</span>
            </div>
            {t.rows.map((row, i) => (
              <div className="compare-row" key={i}>
                <span className="label">{row[0]}</span>
                <span className="val founding">{row[1]}</span>
                <span className="val">{row[2]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ──────── FAQ ──────── */}
      <section className="section" id="faq">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">{t.faq_eyebrow}</span>
            <h2 className="section-title">{t.faq_title}</h2>
          </div>
          <p className="section-note">{t.faq_note}</p>
        </div>
        <div className="faq-list reveal">
          {t.faq_items.map((item, i) => (
            <div className="faq-item" data-open={openFaq === i} key={i}>
              <button
                type="button"
                className="faq-q"
                onClick={() => toggleFaq(i)}
                aria-expanded={openFaq === i}
              >
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden="true" />
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────── FINAL CTA ──────── */}
      <section className="final-cta reveal" id="join">
        <h2 className="final-h2">{t.final_title(remaining)}</h2>
        <p className="final-sub">{t.final_sub}</p>
        <a
          href={WHOP_CHECKOUT_URL}
          className="btn btn-terracotta btn-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.final_btn} <span className="btn-arrow">→</span>
        </a>
      </section>

      {/* ──────── FOOTER ──────── */}
      <footer>
        <div>
          <div className="footer-brand">Snailon</div>
          <p className="footer-text">{t.footer_text}</p>
        </div>
        <div className="footer-meta">
          <span>{t.footer_year}</span>
          <span>
            <ZelligeStar size={16} />
          </span>
        </div>
      </footer>
    </>
  );
}
