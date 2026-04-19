"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { T, type Lang } from "../i18n";

type Stage = "email" | "code";

export default function LoginForm({ next }: { next: string }) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const router = useRouter();

  const [lang, setLang] = useState<Lang>("en");
  const [stage, setStage] = useState<Stage>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const t = T[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = t.lang;
    document.body.classList.toggle("rtl", t.dir === "rtl");
  }, [t.dir, t.lang]);

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setOk(null);
    try {
      const trimmed = email.trim().toLowerCase();
      const { error } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: {
          // shouldCreateUser:true signs up + signs in; one flow for both cases
          shouldCreateUser: true,
        },
      });
      if (error) throw error;
      setEmail(trimmed);
      setStage("code");
      setOk(t.auth_code_sent(trimmed));
    } catch (e: unknown) {
      const m = e instanceof Error ? e.message : t.auth_err_generic;
      setErr(m);
    } finally {
      setBusy(false);
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const token = code.replace(/\s/g, "");
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
      });
      if (error) throw error;
      router.replace(next || "/dashboard");
      router.refresh();
    } catch {
      setErr(t.auth_err_invalid_code);
      setBusy(false);
    }
  }

  return (
    <div className="auth-wrap">
      <aside className="auth-side">
        <div>
          <a href="/" className="nav-brand" style={{ color: "var(--cream)" }}>
            Snailon
          </a>
        </div>
        <div>
          <h2 dangerouslySetInnerHTML={{ __html: t.auth_signin_side_h2 }} />
          <p>{t.auth_signin_side_p}</p>
        </div>
        <div className="auth-side-meta">{t.footer_year}</div>
      </aside>

      <main className="auth-main">
        <div className="auth-form">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <a href="/" className="nav-link" style={{ fontSize: 13 }}>
              {t.auth_back}
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
          </div>

          <div>
            <h1>{t.auth_signin_title}</h1>
            <p className="sub">{t.auth_signin_sub}</p>
          </div>

          {ok && <div className="form-msg ok">{ok}</div>}
          {err && <div className="form-msg err">{err}</div>}

          {stage === "email" ? (
            <form onSubmit={sendCode} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div className="field">
                <label htmlFor="email">{t.auth_email_label}</label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder={t.auth_email_placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={busy}
                />
              </div>
              <button className="btn-submit" type="submit" disabled={busy || !email}>
                {busy ? t.auth_btn_sending : t.auth_btn_send}
              </button>
            </form>
          ) : (
            <form onSubmit={verifyCode} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div className="field">
                <label htmlFor="code">{t.auth_code_label}</label>
                <input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]*"
                  maxLength={6}
                  required
                  placeholder="000000"
                  className="otp-input"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  disabled={busy}
                  autoFocus
                />
              </div>
              <button className="btn-submit" type="submit" disabled={busy || code.length < 6}>
                {busy ? t.auth_btn_verifying : t.auth_btn_verify}
              </button>
              <div className="form-link">
                <button
                  type="button"
                  onClick={() => {
                    setStage("email");
                    setCode("");
                    setErr(null);
                    setOk(null);
                  }}
                  style={{ textDecoration: "underline", color: "var(--moss)" }}
                >
                  {t.auth_resend}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
