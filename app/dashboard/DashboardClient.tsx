"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { T, type Lang } from "../i18n";

type Founding = {
  spot_number: number | null;
  email: string | null;
  amount_mad: number | null;
  commission_rate: string | number | null;
  status: string | null;
  paid_at: string | null;
  store_name: string | null;
};

const Icons = {
  overview: (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="6" height="8" />
      <rect x="3" y="13" width="6" height="4" />
      <rect x="11" y="3" width="6" height="4" />
      <rect x="11" y="9" width="6" height="8" />
    </svg>
  ),
  balance: (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="5.5" width="15" height="10" rx="1" />
      <path d="M2.5 8.5h15M6 12h2" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 17l1.3-3.8a7 7 0 1 1 2.7 2.7L3 17z" />
      <path d="M7.2 8.5c.3 1.4 1.4 2.5 2.8 2.9" />
    </svg>
  ),
  orders: (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="14" height="12" rx="1" />
      <path d="M6 8h8M6 11h8M6 14h5" />
    </svg>
  ),
  risk: (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 2l7 4v4c0 4-3 7-7 8-4-1-7-4-7-8V6l7-4z" />
      <path d="M10 7v3M10 13v.5" />
    </svg>
  ),
  team: (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="7" cy="8" r="3" />
      <path d="M1.5 17c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <circle cx="14" cy="7" r="2.3" />
      <path d="M18.5 15c0-2.2-1.8-4-4-4" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="10" r="2.2" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4" />
    </svg>
  ),
  reports: (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 17V7M8 17V3M13 17V10M18 17V6" />
    </svg>
  ),
};

export default function DashboardClient({
  email,
  founding,
}: {
  email: string;
  founding: Founding | null;
}) {
  const [lang, setLang] = useState<Lang>("en");
  const t = T[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = t.lang;
    document.body.classList.toggle("rtl", t.dir === "rtl");
  }, [t.dir, t.lang]);

  const hasFounding =
    founding !== null && (founding.status === "paid" || founding.status === "active");
  const balanceMad = founding?.amount_mad ?? 0;
  const rateNum = founding?.commission_rate ? Number(founding.commission_rate) : 0.01;
  const ratePct = `${(rateNum * 100).toFixed(0)}%`;
  const spot = founding?.spot_number ?? null;

  return (
    <div className="app-shell">
      <aside className="app-side">
        <div>
          <Link
            href="/"
            className="nav-brand"
            style={{ fontSize: 20, display: "flex", alignItems: "center", gap: 8 }}
          >
            <span style={{ color: "var(--moss)" }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="14" cy="12" r="6.5" />
                <circle cx="14" cy="12" r="3.2" />
                <circle cx="14" cy="12" r="1" fill="currentColor" stroke="none" />
                <path d="M7.5 16 Q4 15.5 2.8 13.2" />
                <path d="M5.5 10.8 L4 7.2 M7.3 10.2 L7.3 6.8" />
              </svg>
            </span>
            Snailon
          </Link>
        </div>

        <nav className="app-nav" aria-label="Dashboard">
          <Link className="app-nav-item" aria-current="page" href="/dashboard">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              {Icons.overview} {t.dash_nav_overview}
            </span>
          </Link>
          <Link className="app-nav-item" href="/dashboard/balance">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              {Icons.balance} {t.dash_nav_balance}
            </span>
          </Link>
          <a className="app-nav-item" href="#">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              {Icons.orders} {t.dash_nav_orders}
            </span>
            <span className="soon-badge">{t.dash_soon}</span>
          </a>
          <a className="app-nav-item" href="#">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              {Icons.whatsapp} {t.dash_nav_whatsapp}
            </span>
            <span className="soon-badge">{t.dash_soon}</span>
          </a>
          <a className="app-nav-item" href="#">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              {Icons.risk} {t.dash_nav_risk}
            </span>
            <span className="soon-badge">{t.dash_soon}</span>
          </a>
          <a className="app-nav-item" href="#">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              {Icons.team} {t.dash_nav_team}
            </span>
            <span className="soon-badge">{t.dash_soon}</span>
          </a>
          <a className="app-nav-item" href="#">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              {Icons.settings} {t.dash_nav_settings}
            </span>
            <span className="soon-badge">{t.dash_soon}</span>
          </a>
        </nav>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a
            href={`mailto:${t.dash_nav_support}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "var(--ink-60)",
            }}
          >
            {t.dash_nav_support}
          </a>
          <div className="lang" role="tablist" aria-label="Language" style={{ alignSelf: "flex-start" }}>
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
          <form action="/auth/signout" method="POST">
            <button
              type="submit"
              className="app-nav-item"
              style={{ width: "100%", textAlign: "start", background: "transparent" }}
            >
              {t.dash_nav_signout}
            </button>
          </form>
        </div>
      </aside>

      <main className="app-main">
        <header className="app-header">
          <h1>{t.dash_greeting(email)}</h1>
          <p>{hasFounding ? t.dash_sub_founding : t.dash_sub_pending}</p>
        </header>

        {hasFounding ? (
          <div className="card is-hero" style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "space-between", alignItems: "end" }}>
              <div>
                <div className="card-label">{t.dash_status_founding}</div>
                <div className="card-value">#{spot ?? "—"}</div>
                <div className="card-meta">
                  {t.dash_spot}
                  {founding?.paid_at ? ` · ${new Date(founding.paid_at).toLocaleDateString()}` : ""}
                </div>
              </div>
              <div style={{ textAlign: "end" }}>
                <div className="card-label">{t.dash_balance}</div>
                <div className="card-value" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>
                  {balanceMad} <span style={{ fontSize: "0.45em", color: "var(--ochre)" }}>{t.dash_mad}</span>
                </div>
                <div className="card-meta">
                  {t.dash_commission}: {ratePct} — {t.dash_forever}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="card"
            style={{
              marginBottom: 28,
              padding: "34px 30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: 260 }}>
              <div className="card-label">{t.dash_status_pending}</div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontVariationSettings: `"opsz" 72, "SOFT" 60, "WONK" 1`,
                  fontWeight: 500,
                  fontSize: "clamp(22px, 2.4vw, 28px)",
                  letterSpacing: "-0.02em",
                  marginTop: 8,
                  lineHeight: 1.2,
                  color: "var(--ink)",
                }}
              >
                {t.dash_sub_pending}
              </div>
              <p
                style={{
                  marginTop: 12,
                  fontSize: 14,
                  color: "var(--ink-60)",
                  lineHeight: 1.6,
                  maxWidth: "46ch",
                }}
              >
                {t.dash_claim_note}
              </p>
            </div>
            <Link href="/dashboard/balance" className="btn btn-terracotta btn-lg">
              {t.dash_claim_cta}
            </Link>
          </div>
        )}

        <div style={{ marginTop: 40 }}>
          <div className="eyebrow" style={{ marginBottom: 24 }}>
            {t.dash_tiles_title}
          </div>
          <div className="grid-cols-3">
            {[
              { icon: Icons.whatsapp, t: t.dash_tile_wa_title, b: t.dash_tile_wa_body },
              { icon: Icons.orders, t: t.dash_tile_orders_title, b: t.dash_tile_orders_body },
              { icon: Icons.risk, t: t.dash_tile_risk_title, b: t.dash_tile_risk_body },
              { icon: Icons.team, t: t.dash_tile_team_title, b: t.dash_tile_team_body },
              { icon: Icons.reports, t: t.dash_tile_reports_title, b: t.dash_tile_reports_body },
              { icon: Icons.settings, t: t.dash_tile_settings_title, b: t.dash_tile_settings_body },
            ].map((tile, i) => (
              <div className="tile" data-soon="true" key={i}>
                <div className="tile-head">
                  <div className="tile-icon">{tile.icon}</div>
                  <span className="soon-badge">{t.dash_soon}</span>
                </div>
                <h3 className="tile-title">{tile.t}</h3>
                <p className="tile-body">{tile.b}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
