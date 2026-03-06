"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const C = {
  bg:      "#080808",
  surf:    "#0F0F0F",
  surf2:   "#141414",
  border:  "#1F1F1F",
  border2: "#2A2A2A",
  muted:   "#505050",
  dim:     "#777777",
  sub:     "#AAAAAA",
  text:    "#E2E2E2",
  white:   "#FFFFFF",
  gold:    "#C9981A",
  error:   "#E05555",
};

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError(data.error || "Vale kasutajanimi või parool");
      }
    } catch {
      setError("Ühenduse viga. Proovi uuesti.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 56 }}>
        <svg width="32" height="32" viewBox="0 0 30 30" fill="none">
          <rect x="0" y="0" width="18" height="18" fill={C.white} />
          <rect x="12" y="12" width="18" height="18" fill={C.gold} />
        </svg>
        <span style={{ fontSize: "1.5rem", fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, color: C.white, letterSpacing: "0.01em", lineHeight: 1 }}>
          Legatron
        </span>
      </div>

      {/* Card */}
      <div style={{ width: "100%", maxWidth: 380, background: C.surf, border: `1px solid ${C.border}`, borderRadius: 16, padding: "40px 36px" }}>
        <p style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>
          Investori juurdepääs
        </p>
        <h1 style={{ fontSize: "1.4rem", fontWeight: 500, letterSpacing: "-0.02em", color: C.white, marginBottom: 32, lineHeight: 1.2 }}>
          Sisene
        </h1>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 10, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>
              Kasutajanimi
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              style={{
                width: "100%",
                background: C.surf2,
                border: `1px solid ${C.border2}`,
                borderRadius: 8,
                padding: "12px 14px",
                fontSize: "0.9rem",
                fontWeight: 300,
                color: C.white,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 10, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>
              Parool
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              style={{
                width: "100%",
                background: C.surf2,
                border: `1px solid ${C.border2}`,
                borderRadius: 8,
                padding: "12px 14px",
                fontSize: "0.9rem",
                fontWeight: 300,
                color: C.white,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <p style={{ fontSize: "0.82rem", fontWeight: 300, color: C.error, margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 8,
              background: C.white,
              color: C.bg,
              border: "none",
              borderRadius: 10,
              padding: "13px",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              transition: "opacity 0.15s",
            }}
          >
            {loading ? "..." : "Sisene"}
          </button>
        </form>
      </div>

      <p style={{ marginTop: 32, fontSize: "0.78rem", fontWeight: 300, color: C.muted }}>
        Konfidentsiaalne dokument
      </p>
    </div>
  );
}
