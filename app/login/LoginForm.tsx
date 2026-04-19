"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { T, type Lang } from "../i18n";

type Stage = "email" | "code";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function LoginForm({ next }: { next: string }) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const router = useRouter();

  const [lang, setLang] = useState<Lang>("en");
  const [stage, setStage] = useState<Stage>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const t = T[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = t.lang;
    document.body.classList.toggle("rtl", t.dir === "rtl");
  }, [t.dir, t.lang]);

  async function signInWithGoogle() {
    setGoogleBusy(true);
    setErr(null);
    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      const nextParam = encodeURIComponent(next || "/dashboard");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback?next=${nextParam}`,
          queryParams: { prompt: "select_account" },
        },
      });
      if (error) throw error;
      // OAuth will redirect away — no need to clear busy state.
    } catch (e: unknown) {
      const m = e instanceof Error ? e.message : t.auth_err_generic;
      setErr(m);
      setGoogleBusy(false);
    }
  }

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setOk(null);
    try {
      const trimmed = email.trim().toLowerCase();
      const { error } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: { shouldCreateUser: true },
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
          <Link
            href="/"
            className="nav-brand"
            style={{ color: "var(--cream)" }}
          >
            Snailon
          </Link>
        </div>
        <div>
          <h2 dangerouslySetInnerHTML={{ __html: t.auth_signin_side_h2 }} />
          <p>{t.auth_signin_side_p}</p>
        </div>
        <div className="auth-side-meta">support@snailon.com</div>
      </aside>

      <main className="auth-main">
        <div className="auth-form">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link href="/" className="nav-link" style={{ fontSize: 13 }}>
              {t.auth_back}
            </Link>
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
            <>
              {/* Google OAuth */}
              <button
                type="button"
                className="btn-google"
                onClick={signInWithGoogle}
                disabled={googleBusy || busy}
              >
                <GoogleIcon />
                {googleBusy ? t.auth_btn_sending : t.auth_btn_google}
              </button>

              <div className="auth-divider">{t.auth_divider}</div>

              {/* Email OTP */}
              <form
                onSubmit={sendCode}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
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
                    disabled={busy || googleBusy}
                  />
                </div>
                <button
                  className="btn-submit"
                  type="submit"
                  disabled={busy || googleBusy || !email}
                >
                  {busy ? t.auth_btn_sending : t.auth_btn_send}
                </button>
              </form>
            </>
          ) : (
            <form
              onSubmit={verifyCode}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
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
              <button
                className="btn-submit"
                type="submit"
                disabled={busy || code.length < 6}
              >
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
                  style={{
                    textDecoration: "underline",
                    color: "var(--moss)",
                  }}
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
