"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { T, type Lang } from "../i18n";

type Founding = {
  spot_number: number | null;
  amount_mad: number | null;
  commission_rate: string | number | null;
  whop_order_id: string | null;
  status: string | null;
};

export default function ThanksClient({
  email,
  founding: initialFounding,
}: {
  email: string | null;
  founding: Founding | null;
}) {
  const [lang, setLang] = useState<Lang>("en");
  const [founding, setFounding] = useState<Founding | null>(initialFounding);
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const t = T[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = t.lang;
    document.body.classList.toggle("rtl", t.dir === "rtl");
  }, [t.dir, t.lang]);

  // If the webhook hasn't landed when the user arrives, poll for a short window.
  // This handles the race between Whop redirect and Whop webhook dispatch.
  useEffect(() => {
    if (!email || founding) return;
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 15; // ~30 seconds
    const poll = async () => {
      if (cancelled) return;
      attempts += 1;
      const { data } = await supabase
        .from("founding_members")
        .select("spot_number, amount_mad, commission_rate, whop_order_id, status")
        .eq("email", email.toLowerCase().trim())
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (cancelled) return;
      if (data) {
        setFounding(data as Founding);
        return;
      }
      if (attempts < maxAttempts) {
        window.setTimeout(poll, 2000);
      }
    };
    window.setTimeout(poll, 1500);
    return () => {
      cancelled = true;
    };
  }, [email, founding, supabase]);

  const spot = founding?.spot_number ?? null;
  const mad = founding?.amount_mad ?? null;
  const rateNum = founding?.commission_rate ? Number(founding.commission_rate) : 0.01;
  const rate = `${(rateNum * 100).toFixed(0)}%`;
  const order = founding?.whop_order_id ?? null;

  return (
    <div className="thanks-wrap">
      <div className="thanks-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div className="thanks-stamp">{t.thanks_stamp}</div>
          <div className="lang" role="tablist" aria-label="Language" style={{ marginBottom: 0 }}>
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
        </div>

        <h1 className="thanks-h1" dangerouslySetInnerHTML={{ __html: t.thanks_h1 }} />

        <p className="thanks-p">
          {spot !== null ? t.thanks_p_found(spot) : t.thanks_p_pending}
        </p>

        <div className="thanks-details">
          {order && (
            <div className="thanks-row">
              <span>{t.thanks_row_order}</span>
              <span className="v" style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>
                {order}
              </span>
            </div>
          )}
          {mad !== null && (
            <div className="thanks-row">
              <span>{t.thanks_row_amount}</span>
              <span className="v">{mad} {t.dash_mad}</span>
            </div>
          )}
          {spot !== null && (
            <div className="thanks-row">
              <span>{t.thanks_row_spot}</span>
              <span className="v">#{spot}</span>
            </div>
          )}
          <div className="thanks-row">
            <span>{t.thanks_row_rate}</span>
            <span className="v">{rate} — {t.dash_forever}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href={email ? `/login?next=${encodeURIComponent("/dashboard")}` : "/login"}
            className="btn btn-primary btn-lg"
            style={{ flex: 1, minWidth: 200 }}
          >
            {t.thanks_btn_account} <span className="btn-arrow">→</span>
          </a>
          <a href="/" className="btn btn-ghost btn-lg">
            {t.thanks_btn_home}
          </a>
        </div>
      </div>
    </div>
  );
}
