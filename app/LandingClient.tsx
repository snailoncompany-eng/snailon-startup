"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Spots = {
  total_spots: number;
  spots_taken: number;
  spots_remaining: number;
};

// ── Brand mark ────────────────────────────────────────────
function SnailMark({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className}>
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

// ── WhatsApp chat mock ─────────────────────────────────────
interface WAMsgData {
  from?: "in" | "out";
  text?: string;
  time?: string;
  system?: boolean;
  tag?: string;
  pin?: boolean;
}

function WAChatBubble({ msg }: { msg: WAMsgData }) {
  if (msg.system) {
    return (
      <div className="wa-system">
        <span className="wa-system-tag">{msg.tag}</span>
      </div>
    );
  }
  if (msg.pin) {
    return (
      <div className="wa-row wa-row-out">
        <div className="wa-pin">
          <div className="wa-pin-map">
            <svg width="100%" height="100%" viewBox="0 0 180 100" style={{ position: "absolute", inset: 0 }}>
              <path d="M0 60 Q40 50 80 55 T180 40" stroke="#3a4a3a" strokeWidth="1" fill="none" />
              <path d="M0 75 Q50 70 100 72 T180 65" stroke="#3a4a3a" strokeWidth="1" fill="none" />
              <path d="M20 0 Q25 40 30 100" stroke="#3a4a3a" strokeWidth="1" fill="none" />
              <path d="M120 0 Q130 50 125 100" stroke="#3a4a3a" strokeWidth="1" fill="none" />
            </svg>
            <div className="wa-pin-marker" />
          </div>
          <div className="wa-pin-label">Maarif, Casablanca</div>
          <div className="wa-pin-time">{msg.time} <span className="wa-read">✓✓</span></div>
        </div>
      </div>
    );
  }
  const isOut = msg.from === "out";
  return (
    <div className={`wa-row ${isOut ? "wa-row-out" : "wa-row-in"}`}>
      <div className={`wa-bubble ${isOut ? "wa-bubble-out" : "wa-bubble-in"}`}>
        <p className="wa-text">{msg.text}</p>
        <div className="wa-meta">
          {msg.time}{isOut && <span className="wa-read"> ✓✓</span>}
        </div>
      </div>
    </div>
  );
}

function WAChat() {
  const msgs: WAMsgData[] = [
    { from: "in", text: "Salam, je veux commander le sweat beige taille M", time: "14:32" },
    { from: "out", text: "Wa 3alaykum salam 🤝 Le sweat beige M à 389 MAD. Casablanca ?", time: "14:32" },
    { from: "in", text: "Ah oui, Maarif", time: "14:33" },
    { from: "out", text: "Parfait. Partagez votre position 📍", time: "14:33" },
    { pin: true, time: "14:34" },
    { system: true, tag: "PIN RECEIVED · RISK 24/100 · AUTO-SHIP" },
    { from: "out", text: "Merci! Rider en route dans 2h.\nSuivi: snailon.ma/t/0412", time: "14:34" },
  ];
  return (
    <div className="wa-shell">
      <div className="wa-header">
        <div className="wa-header-back">‹</div>
        <div className="wa-avatar">CT</div>
        <div className="wa-header-info">
          <div className="wa-header-name">Casa Threads</div>
          <div className="wa-header-sub">online · via snailon</div>
        </div>
        <div className="wa-header-menu">⋮</div>
      </div>
      <div className="wa-body">
        {msgs.map((m, i) => <WAChatBubble key={i} msg={m} />)}
      </div>
      <div className="wa-input-bar">
        <div className="wa-input-fake">Message</div>
        <div className="wa-send">→</div>
      </div>
    </div>
  );
}

// ── Main landing client ────────────────────────────────────
export default function LandingClient({ initial }: { initial: Spots }) {
  const [spots, setSpots] = useState<Spots>(initial);
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const remaining = Math.max(0, spots.spots_remaining);
  const pctTaken =
    spots.total_spots > 0
      ? Math.min(100, Math.round((spots.spots_taken / spots.total_spots) * 100))
      : 0;

  const refreshSpots = useCallback(async () => {
    const { data, error } = await supabase
      .from("spots_summary")
      .select("total_spots, spots_taken, spots_remaining")
      .single();
    if (!error && data) setSpots(data as Spots);
  }, [supabase]);

  useEffect(() => { void refreshSpots(); }, [refreshSpots]);

  useEffect(() => {
    const channel = supabase
      .channel("spots-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "founding_members" }, () => {
        void refreshSpots();
      })
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [supabase, refreshSpots]);

  // Animated counter
  const [displayNum, setDisplayNum] = useState(remaining);
  const didAnimateRef = useRef(false);
  useEffect(() => {
    if (didAnimateRef.current) { setDisplayNum(remaining); return; }
    didAnimateRef.current = true;
    const start = Math.min(remaining + 18, 120);
    const end = remaining;
    const duration = 1400;
    const startTime = performance.now();
    let rafId = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayNum(Math.round(start + (end - start) * eased));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [remaining]);

  // Progress bar
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!progressRef.current) return;
    const id = window.setTimeout(() => {
      if (progressRef.current) progressRef.current.style.width = `${pctTaken}%`;
    }, 200);
    return () => window.clearTimeout(id);
  }, [pctTaken]);

  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); }); },
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    // Immediately reveal items already in view
    requestAnimationFrame(() => {
      document.querySelectorAll(".reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) el.classList.add("is-visible");
      });
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-brand" aria-label="Snailon home">
            <span className="nav-mark"><SnailMark /></span>
            Snailon
          </Link>
          <div className="nav-right">
            <a href="#how" className="nav-link nav-link-how">How it works</a>
            <a href="#pricing" className="nav-link nav-link-how">Pricing</a>
            <Link href="/login" className="btn btn-ghost">Sign in</Link>
            <Link href="/login" className="btn btn-primary" prefetch>
              Get started <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-hero-grid">
          <div className="lp-hero-left">
            <div className="lp-pill reveal is-visible">
              <span className="lp-pill-dot" />
              AI · WhatsApp · COD · Morocco
            </div>
            <h1 className="hero-h1 reveal is-visible" data-delay="1">
              Your orders confirm{" "}
              <em>themselves.</em>
            </h1>
            <p className="hero-lede reveal is-visible" data-delay="2">
              Snailon confirms every WhatsApp order, scores COD risk, and builds your
              customer relationships — all in Darija, French, or Arabic. You only pay
              per order that ships.
            </p>
            <div className="hero-cta-row reveal is-visible" data-delay="3">
              <Link href="/login" className="btn btn-primary btn-lg" prefetch>
                GET STARTED FREE <span className="btn-arrow">→</span>
              </Link>
              <a href="#how" className="btn btn-ghost btn-lg">See how it works</a>
            </div>
            <p className="lp-hero-note reveal is-visible" data-delay="4">
              No subscription. No setup fee. First 10 orders free.
            </p>
          </div>

          <div className="lp-hero-right">
            <div className="lp-chat-wrap reveal is-visible" data-delay="2">
              <WAChat />
            </div>
            <aside className="counter lp-counter reveal is-visible" data-delay="3" aria-live="polite">
              <span className="counter-stamp">Founding access</span>
              <div className="counter-label">Spots remaining</div>
              <span className="counter-num">{displayNum}</span>
              <div className="counter-divider"><span>of {spots.total_spots} founding spots</span></div>
              <p className="counter-sub">Lock in 1% commission per order — forever.</p>
              <div className="counter-progress">
                <div className="counter-progress-fill" ref={progressRef} style={{ width: 0 }} />
              </div>
              <div className="counter-rate">
                <span className="counter-rate-pct">1%</span>
                <span className="counter-rate-text">per order for life —<br />founding members only</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="lp-section lp-section-warm" id="problem">
        <div className="lp-inner">
          <span className="eyebrow reveal">§ 01 · The problem</span>
          <h2 className="lp-h2 reveal" data-delay="1">
            You lose <em>40%</em> of your revenue before the rider leaves.
          </h2>
          <div className="lp-stats-grid">
            {[
              ["38%", "average return rate in Morocco"],
              ["6.2 min", "average time spent confirming orders manually"],
              ["1 in 4", "customers ghosts after ordering"],
            ].map(([n, l]) => (
              <div key={l} className="lp-stat reveal">
                <div className="lp-stat-num">{n}</div>
                <div className="lp-stat-label">{l}</div>
              </div>
            ))}
          </div>
          <p className="lp-body reveal">
            Every unconfirmed order costs you rider time, packaging, and trust.
            Manual confirmation doesn&apos;t scale past 50 orders a day.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="lp-section lp-section-ink" id="how">
        <div className="lp-inner">
          <span className="eyebrow eyebrow-light reveal">§ 02 · How it works</span>
          <h2 className="lp-h2 lp-h2-light reveal" data-delay="1">
            A soft onboarding.<br /><em className="em-ochre">A patient machine.</em>
          </h2>
          <div className="lp-how-steps">
            {[
              ["I", "Scan the QR.", "Your WhatsApp Business connects to a dedicated instance. Under 60 seconds."],
              ["II", "We read your catalog.", "Products, prices, variants, and tone pulled from YouCan, Shopify, or your last 6 months of chats."],
              ["III", "We reply in your voice.", "Darija, French, Arabic — the AI speaks like you already do. You approve before it goes live."],
              ["IV", "We ship, track, bill.", "Confirmed orders create shipments. You pay 2.9% only when they actually ship."],
            ].map(([num, title, body]) => (
              <div key={num} className="lp-how-step reveal">
                <div className="lp-how-step-num">{num}</div>
                <h3 className="lp-how-step-title">{title}</h3>
                <p className="lp-how-step-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DASHBOARD PREVIEW ── */}
      <section className="lp-section lp-section-charcoal">
        <div className="lp-inner">
          <span className="eyebrow eyebrow-light reveal">§ 03 · The dashboard</span>
          <h2 className="lp-h2 lp-h2-light reveal" data-delay="1">
            Revenue is <em className="em-ochre">compounding.</em>
          </h2>
          <p className="lp-body lp-body-muted reveal">
            One dashboard for today&apos;s orders, tonight&apos;s shipments, this week&apos;s risk.
            Everything else happens in WhatsApp.
          </p>
          <div className="lp-dash reveal">
            <div className="lp-dash-top">
              <div className="lp-dash-brand-row">
                <SnailMark size={14} />
                <span>snailon</span>
              </div>
              <div className="lp-dash-store-name">CASA THREADS · BALANCE 2,840 MAD</div>
            </div>
            <div className="lp-dash-metrics">
              {[
                ["Orders today", "47", "+12"],
                ["AOV", "412 MAD", "+18.2%"],
                ["Assisted", "4,812", "this month"],
                ["Incremental", "142 MAD", "today"],
              ].map(([l, v, s]) => (
                <div key={l} className="lp-dash-metric">
                  <div className="lp-dash-label">{l}</div>
                  <div className="lp-dash-val">{v}</div>
                  <div className="lp-dash-sub">{s}</div>
                </div>
              ))}
            </div>
            <svg width="100%" height="72" viewBox="0 0 800 72" preserveAspectRatio="none" style={{ display: "block" }}>
              <defs>
                <linearGradient id="cg" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#C4622A" />
                  <stop offset="1" stopColor="#C4622A" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 55 C80 45, 160 50, 240 35 S 400 20, 480 26 S 640 10, 800 6 L800 72 L0 72 Z" fill="url(#cg)" opacity="0.22" />
              <path d="M0 55 C80 45, 160 50, 240 35 S 400 20, 480 26 S 640 10, 800 6" stroke="#C4622A" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="lp-proof-row">
            {[
              ["+18.2%", "AOV lift"],
              ["4,812", "orders assisted this month"],
              ["142 MAD", "incremental revenue today"],
            ].map(([n, l]) => (
              <div key={l} className="lp-proof-item reveal">
                <div className="lp-proof-n">{n}</div>
                <div className="lp-proof-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="lp-section lp-section-light" id="pricing">
        <div className="lp-inner">
          <span className="eyebrow reveal">§ 04 · Pricing</span>
          <h2 className="lp-h2 reveal" data-delay="1">
            Start free. <em>Scale when ready.</em>
          </h2>
          <div className="lp-tiers">
            <div className="lp-tier reveal">
              <div className="lp-tier-name">Standard</div>
              <div className="lp-tier-price">2.9<span>%</span></div>
              <div className="lp-tier-sub">per confirmed order · min 3 MAD · max 15 MAD</div>
              <div className="lp-tier-features">
                {[
                  "AI confirmation in Darija/FR/AR",
                  "GPS pin collection",
                  "Cross-store risk score",
                  "10 free orders to start",
                  "Balance top-up from 100 MAD",
                ].map((f) => (
                  <div key={f} className="lp-tier-f">
                    <span className="lp-tier-arrow">→</span>{f}
                  </div>
                ))}
              </div>
              <Link href="/login" className="btn btn-ghost lp-cta-btn" style={{ width: "100%", justifyContent: "center", marginTop: "28px" }}>
                Start free →
              </Link>
            </div>
            <div className="lp-tier lp-tier-dark reveal" data-delay="1">
              <div className="lp-tier-badge">Recommended</div>
              <div className="lp-tier-name" style={{ color: "rgba(240,234,224,0.65)" }}>Growth</div>
              <div className="lp-tier-price" style={{ color: "#F0EAE0" }}>12.9<span>%</span></div>
              <div className="lp-tier-sub" style={{ color: "rgba(240,234,224,0.55)" }}>per confirmed order · all-inclusive</div>
              <div className="lp-tier-features">
                {[
                  "Everything in Standard",
                  "Unlimited retry attempts",
                  "Post-delivery review & upsell",
                  "Win-back: 30/60/90 day",
                  "Abandoned order recovery",
                  "Customer CRM + LTV",
                  "Smart send-time learning",
                  "Monthly performance report",
                ].map((f) => (
                  <div key={f} className="lp-tier-f" style={{ borderColor: "#2E2E28", color: "#F0EAE0" }}>
                    <span style={{ color: "#E89568" }}>→</span>{f}
                  </div>
                ))}
              </div>
              <Link href="/login" className="lp-cta-btn" style={{
                display: "block", width: "100%", textAlign: "center",
                marginTop: "28px", padding: "16px 24px",
                background: "#C4622A", color: "#F0EAE0",
                borderRadius: "999px", fontFamily: "var(--font-sans)",
                fontSize: "15px", fontWeight: 500, textDecoration: "none",
              }}>
                Activate Growth →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROOF ── */}
      <section className="lp-section lp-section-ink">
        <div className="lp-inner">
          <span className="eyebrow eyebrow-light reveal">§ 05 · Proof</span>
          <h2 className="lp-h2 lp-h2-light reveal" data-delay="1">
            Numbers that <em className="em-ochre">don&apos;t lie.</em>
          </h2>
          <div className="lp-proof-grid">
            {[
              ["67%", "reduction in return rate"],
              ["4.1×", "average ROI"],
              ["< 60s", "to connect"],
            ].map(([n, l]) => (
              <div key={l} className="lp-proof-big reveal">
                <div className="lp-proof-big-n">{n}</div>
                <div className="lp-proof-big-l">{l}</div>
              </div>
            ))}
          </div>
          <div className="lp-works-with reveal">
            <span className="lp-works-label">Works with</span>
            {["YouCan", "Shopify", "WooCommerce", "TikTok Shop"].map((n) => (
              <div key={n} className="lp-works-chip">{n}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="final-statement">
        <div className="final-inner reveal">
          <div className="final-mark" aria-hidden="true">
            <SnailMark size={28} />
          </div>
          <div className="final-brand">Snailon</div>
          <div className="final-tagline">BUILT FOR MOROCCAN E-COMMERCE</div>
          <h2 className="final-h2">
            Your orders confirm <em>themselves.</em>
          </h2>
          <Link href="/login" className="btn btn-cream btn-lg" prefetch>
            GET STARTED FREE <span className="btn-arrow">→</span>
          </Link>
          <div className="final-contact">
            <a href="mailto:hello@snailon.ma">hello@snailon.ma</a>
            <span>Casablanca, Morocco</span>
            <span>© 2026 Snailon</span>
          </div>
        </div>
      </section>
    </>
  );
}
