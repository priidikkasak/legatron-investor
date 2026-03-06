"use client";
import { useState } from "react";

/* ── Tokens ─────────────────────────────── */
const BG      = "#080808";
const SURFACE = "#111111";
const BORDER  = "#1E1E1E";
const MUTED   = "#555555";
const DIM     = "#888888";
const TEXT    = "#E8E8E8";
const WHITE   = "#FFFFFF";
const GOLD    = "#D4A017";
const GOLD2   = "rgba(212,160,23,0.12)";

const WRAP: React.CSSProperties = { maxWidth: 1080, margin: "0 auto", padding: "0 52px" };
const SEC = (bg = BG): React.CSSProperties => ({ background: bg, padding: "112px 0" });
const LBL: React.CSSProperties = { fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED };

/* ── Components ─────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p style={{ ...LBL, marginBottom: 48 }}>{children}</p>;
}

function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 style={{ fontSize: "clamp(3.2rem, 6.5vw, 6rem)", fontWeight: 600, letterSpacing: "-0.035em", color: WHITE, lineHeight: 1.02, marginBottom: 32 }}>
      {children}
    </h1>
  );
}

function H2({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 500, letterSpacing: "-0.028em", color: light ? TEXT : WHITE, lineHeight: 1.18, marginBottom: 24 }}>
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontSize: "1rem", fontWeight: 500, color: WHITE, marginBottom: 8, lineHeight: 1.4 }}>
      {children}
    </h3>
  );
}

function P({ children, dim }: { children: React.ReactNode; dim?: boolean }) {
  return (
    <p style={{ fontSize: "0.9375rem", fontWeight: 300, color: dim ? DIM : "#AAAAAA", lineHeight: 1.85, marginBottom: 16 }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div style={{ height: 1, background: BORDER, margin: "0" }} />;
}

function Tag({ n, label }: { n: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 56 }}>
      <span style={{ fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.2em", color: MUTED }}>{n}</span>
      <span style={{ fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED }}>— {label}</span>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.75rem", fontWeight: 400, color: GOLD, background: GOLD2, border: "1px solid rgba(212,160,23,0.2)", borderRadius: 999, padding: "4px 12px" }}>
      {children}
    </span>
  );
}

function GlowStat({ n, label, highlight }: { n: string; label: string; highlight?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)", fontWeight: 600, letterSpacing: "-0.04em", color: highlight ? GOLD : WHITE, lineHeight: 1 }}>{n}</div>
      <div style={{ fontSize: "0.8rem", fontWeight: 300, color: DIM, lineHeight: 1.5, maxWidth: 180 }}>{label}</div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: React.ReactNode; accent?: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: "14px 0", borderBottom: `1px solid ${BORDER}` }}>
      <span style={{ fontSize: "0.875rem", fontWeight: 300, color: DIM }}>{label}</span>
      <span style={{ fontSize: "0.875rem", fontWeight: accent ? 400 : 300, color: accent ? GOLD : TEXT }}>{value}</span>
    </div>
  );
}

function Moat({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div style={{ padding: "28px 0", borderTop: `1px solid ${BORDER}` }}>
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <span style={{ fontSize: "0.65rem", fontWeight: 500, color: MUTED, letterSpacing: "0.1em", paddingTop: 4, flexShrink: 0 }}>{n}</span>
        <div>
          <H3>{title}</H3>
          <p style={{ fontSize: "0.85rem", fontWeight: 300, color: DIM, lineHeight: 1.7 }}>{body}</p>
        </div>
      </div>
    </div>
  );
}

function PricingCard({ sub, seg, price, unit, featured, items }: { sub: string; seg: string; price: string; unit: string; featured?: boolean; items: string[] }) {
  return (
    <div style={{
      background: featured ? "rgba(212,160,23,0.07)" : SURFACE,
      border: `1px solid ${featured ? "rgba(212,160,23,0.35)" : BORDER}`,
      borderRadius: 16,
      padding: "28px 24px",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 0,
    }}>
      {featured && (
        <div style={{ position: "absolute", top: -1, left: 24, right: 24, height: 2, background: `linear-gradient(90deg, ${GOLD}, transparent)`, borderRadius: "0 0 2px 2px" }} />
      )}
      <p style={{ ...LBL, color: featured ? GOLD : MUTED, marginBottom: 6 }}>{sub}</p>
      <p style={{ fontSize: "1rem", fontWeight: 500, color: WHITE, marginBottom: 20 }}>{seg}</p>
      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: "2.4rem", fontWeight: 600, letterSpacing: "-0.04em", color: featured ? GOLD : WHITE, lineHeight: 1 }}>{price}</span>
        <span style={{ fontSize: "0.8rem", fontWeight: 300, color: MUTED, marginLeft: 6 }}>/ {unit}</span>
      </div>
      <Divider />
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 9 }}>
        {items.map((f, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ color: featured ? GOLD : MUTED, fontSize: "0.6rem", marginTop: "0.35em", flexShrink: 0 }}>◆</span>
            <span style={{ fontSize: "0.8rem", fontWeight: 300, color: DIM, lineHeight: 1.55 }}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ padding: "18px 0", borderBottom: `1px solid ${BORDER}`, cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "flex-start" }}>
        <span style={{ fontSize: "0.9rem", fontWeight: 400, color: TEXT, lineHeight: 1.5 }}>{q}</span>
        <span style={{ color: MUTED, flexShrink: 0, fontSize: "1.1rem", lineHeight: 1, transition: "transform 0.18s", transform: open ? "rotate(45deg)" : "none", display: "block", marginTop: 2 }}>+</span>
      </div>
      {open && <p style={{ marginTop: 12, fontSize: "0.875rem", fontWeight: 300, color: DIM, lineHeight: 1.9 }}>{a}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════ */
export default function Page() {
  return (
    <div style={{ background: BG, color: TEXT, minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(8,8,8,0.88)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ ...WRAP, height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect width="6.5" height="6.5" fill={WHITE} />
              <rect x="9.5" y="9.5" width="6.5" height="6.5" fill={GOLD} />
            </svg>
            <span style={{ fontSize: "0.875rem", fontWeight: 500, color: WHITE, letterSpacing: "-0.01em" }}>Legatron</span>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            {["Lahendus", "Turg", "Toode", "Hinnad", "Visioon", "KKK"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: "0.78rem", fontWeight: 300, color: MUTED, textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
                onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
              >{l}</a>
            ))}
          </div>
          <a href="mailto:info@legatron.ai" style={{ fontSize: "0.78rem", fontWeight: 400, color: WHITE, textDecoration: "none", background: SURFACE, border: `1px solid ${BORDER}`, padding: "7px 16px", borderRadius: 8 }}>
            Võta ühendust
          </a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────── */}
      <section style={{ padding: "160px 0 120px", position: "relative", overflow: "hidden" }}>
        {/* subtle glow */}
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(212,160,23,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={WRAP}>
          <div style={{ marginBottom: 28 }}>
            <Pill>Investori dokument · Konfidentsiaalne · 2024</Pill>
          </div>

          <H1>
            Muudame seadused{"\n"}
            <span style={{ color: GOLD }}>infrastruktuuriks.</span>
          </H1>

          <p style={{ fontSize: "1.1rem", fontWeight: 300, color: DIM, lineHeight: 1.8, maxWidth: 500, marginBottom: 48 }}>
            AI-põhine platvorm, mis teeb oiguse ligipääsetavaks igale inimesele ja
            ettevotele - kiiremini, odavamalt ja täpsemini kui ükski jurist suudaks.
          </p>

          <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 96 }}>
            <a href="#missioon" style={{ background: WHITE, color: BG, fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.02em", padding: "12px 26px", borderRadius: 10, textDecoration: "none" }}>
              Vaata ariplaan
            </a>
            <a href="#kkk" style={{ fontSize: "0.82rem", fontWeight: 300, color: DIM, textDecoration: "none" }}>
              Investori KKK →
            </a>
          </div>

          {/* Stats */}
          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
            {[
              { n: "€300 mld", l: "Euroopa juriidiliste teenuste turg aastas", hi: true },
              { n: "10×",      l: "odavam ja kiirem kui traditsiooniline jurist", hi: false },
              { n: "50+",      l: "riiki plaanitud kaetuse alla 2030. aastaks", hi: false },
            ].map((s, i) => (
              <div key={i} style={{ paddingRight: 40 }}>
                <GlowStat n={s.n} label={s.l} highlight={s.hi} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 01 MISSIOON ──────────────────────── */}
      <section id="missioon" style={SEC(SURFACE)}>
        <div style={WRAP}>
          <Tag n="01" label="Missioon" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <H2>Miks maailm vajab Legatroni?</H2>
              <P>
                Tänapäeva oigussüsteem on üles ehitatud asjatundjate jaoks, mitte tavaliste
                inimeste jaoks. Väikeettevotja, kes soovib teada, kas ta võib töötajat
                koondada, peab maksma juristile 150-400 € tunni kohta - ja ootama päevi
                vastust, mis on vaja juba täna.
              </P>
              <P>
                Eraisik, kes sõlmib lepingut, ei tea sageli, millised riskid see endas peidab.
                Legatron struktureerib seadused, kohtulahendid ja oigusnormid ning muudab
                need otsinguks ja kasutamiseks kättesaadavaks sekunditega.
              </P>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {/* Mission quote */}
              <div style={{ borderLeft: `2px solid ${GOLD}`, paddingLeft: 24, paddingBottom: 32, marginBottom: 32 }}>
                <p style={{ ...LBL, color: GOLD, marginBottom: 14 }}>Ühe lause missioon</p>
                <p style={{ fontSize: "1.05rem", fontWeight: 300, color: TEXT, lineHeight: 1.8 }}>
                  Muuta seadused arusaadavaks ja koheselt kasutatavaks igale inimesele ja
                  ettevotele - kiiremini, odavamalt ja täpsemini kui ükski jurist suudaks.
                </p>
              </div>
              <div>
                <p style={{ ...LBL, marginBottom: 20 }}>Mida kaotaks maailm ilma Legatronita</p>
                {[
                  "Lepingutel põhinevad vaidlused, mida oleks saanud vältida",
                  "Trahvid regulatsiooninouete mittetäitmise eest",
                  "Otsused, mis põhinevad valedel eeldustel oigusliku vastutuse kohta",
                  "Ressursside raiskamine teenustele, mis on väikeettevotjatele taskukohatud",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                    <span style={{ color: GOLD, fontSize: "0.5rem", marginTop: "0.4em", flexShrink: 0 }}>◆</span>
                    <span style={{ fontSize: "0.875rem", fontWeight: 300, color: DIM, lineHeight: 1.7 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 KONKURENTSIEELIS ──────────────── */}
      <section id="lahendus" style={SEC(BG)}>
        <div style={WRAP}>
          <Tag n="02" label="Konkurentsieelis" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <H2>10× parem kui praegune alternatiiv</H2>
              <P>
                Seadus ise ei ole probleem - probleem on selle ligipääsetavus. Kui seadused
                struktureerida oigesti ning ühendada erineva taseme AI-mudelitega, saab
                oigusest reaalajas kasutatav infrastruktuur.
              </P>
              <div style={{ marginTop: 32 }}>
                <p style={{ ...LBL, marginBottom: 0 }}>Praegune seis</p>
                <div style={{ marginTop: 16 }}>
                  {[
                    ["Eesti oiguse struktureerimine", "Aktiivne - pohiseadused kaetud"],
                    ["AI-põhine seaduse otsing",      "MVP käivitamiseks valmis"],
                    ["Juristi valideeritud vastused",  "Protsess paika pandud"],
                    ["Riigikohtu lahendite analüüs",  "Integratsioon arenduses"],
                  ].map(([k, v], i) => <Row key={i} label={k} value={v} />)}
                </div>
              </div>
            </div>
            <div>
              <p style={{ ...LBL, marginBottom: 20 }}>Jurist vs Legatron</p>
              <div>
                {[
                  ["Hind",          "150-400 € / tund",  "alates 29 € / küsimus"],
                  ["Vastusekiirus", "1-5 tööpäeva",      "sekunditega"],
                  ["Kättesaadavus", "tööajal",           "24/7"],
                  ["Kvaliteet",     "varieerub",         "konsistentne"],
                  ["Mastaap",       "ei skaleeru",       "miljonid küsimused"],
                ].map(([label, bad, good], i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, padding: "14px 0", borderBottom: `1px solid ${BORDER}`, alignItems: "center" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 300, color: DIM }}>{label}</span>
                    <span style={{ fontSize: "0.82rem", fontWeight: 300, color: MUTED }}>{bad}</span>
                    <span style={{ fontSize: "0.82rem", fontWeight: 400, color: GOLD }}>{good}</span>
                  </div>
                ))}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, paddingTop: 10 }}>
                  <span style={{ ...LBL }}></span>
                  <span style={{ ...LBL }}>Jurist</span>
                  <span style={{ ...LBL, color: GOLD }}>Legatron</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 80 }}>
            <p style={{ ...LBL, marginBottom: 0 }}>Meid on raske kopeerida</p>
            <div style={{ marginTop: 0 }}>
              {[
                { n: "01", t: "Struktureeritud andmebaas",  d: "Aastatepikkune töö seaduste, kohtulahendite ja regulatsioonide kategoriseerimiseks riigi- ja valdkonnapõhiselt." },
                { n: "02", t: "Juristi valideeritud sisu",  d: "Iga oiguslik väide on inimekspert üle kontrollinud - täpsust, mida puhta AI-genereeritud sisu korral ei saavutata." },
                { n: "03", t: "Riigipõhine AI treening",    d: "Mudel treenitud konkreetse riigi oiguslikule kontekstile - tunduvalt parem täpsus kui üldmudelitel." },
                { n: "04", t: "Interdistsiplinaarne tiim",  d: "Juristi ja arendaja tihe koostöö - kombinatsioon, keda on aastatega keeruline järgi jäljendada." },
              ].map((m, i) => <Moat key={i} n={m.n} title={m.t} body={m.d} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 TURG ──────────────────────────── */}
      <section id="turg" style={SEC(SURFACE)}>
        <div style={WRAP}>
          <Tag n="03" label="Turg" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <H2>Suur turg, selge tee sisse</H2>
              <P>
                Euroopa juriidiliste teenuste turg on hinnanguliselt üle 300 miljardi euro
                aastas. Isegi 0,1% sellest turust tähendab 300 mln € käivet. LegalTech kui
                AI vertikaali kasvutempo ületab üldist SaaS-i kasvu märkimisväärselt.
              </P>
              <P>
                Siseneme Eestist - kiire iteratsioon, digitaalne ühiskond, avalik seaduste
                andmestik. Seejärel Baltikum, Euroopa, globaalne.
              </P>
              <div style={{ marginTop: 24 }}>
                <p style={{ ...LBL, marginBottom: 16 }}>Turu laienemine</p>
                {[
                  ["Faas 1 — 2024",     "Eesti MVP - digitaalne ühiskond, avalik andmestik", true],
                  ["Faas 2 — 2025 Q1",  "Baltikum - Läti ja Leedu, sarnane struktuur", false],
                  ["Faas 3 — 2025 Q3",  "Euroopa - DE, FI, NL, selged andmestikud", false],
                  ["Faas 4 — 2026+",    "Globaalne laienemine, API ärimudel, Enterprise", false],
                ].map(([k, v, acc], i) => <Row key={i} label={k as string} value={v as string} accent={!!acc} />)}
              </div>
            </div>
            <div>
              <p style={{ ...LBL, marginBottom: 20 }}>Sihtgrupid</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { t: "Eraisik",                    s: "Projektipõhine kasutus",   d: "Vajab vastust konkreetsele küsimusele - üürileping, tööoigus, tarbijakaitse. Kiire, täpne, taskukohane." },
                  { t: "Väike ja Keskmine Ettevote", s: "Igapäevane oiguslik tugi", d: "Töölepingud, kliendisuhted, regulatsioonid. Korduvad küsimused kiirelt, ilma juristi ooteajata." },
                ].map((sg, i) => (
                  <div key={i} style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "22px 24px" }}>
                    <p style={{ ...LBL, marginBottom: 8 }}>{sg.s}</p>
                    <p style={{ fontSize: "0.95rem", fontWeight: 500, color: WHITE, marginBottom: 10 }}>{sg.t}</p>
                    <p style={{ fontSize: "0.85rem", fontWeight: 300, color: DIM, lineHeight: 1.7 }}>{sg.d}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <p style={{ ...LBL, marginBottom: 16 }}>Suurimad valupunktid</p>
                {[
                  "Ei teata, mida seadus täpselt lubab - eriti uute regulatsioonide korral",
                  "Juristile helistamine on kallis, aeglane ja tundub üleliigne",
                  "Vastus tuleb liiga aeglaselt - otsus tuleb teha täna",
                  "Puudub usaldusväärne ja taskukohane allikas, kust kontrollida",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
                    <span style={{ color: GOLD, fontSize: "0.5rem", marginTop: "0.4em", flexShrink: 0 }}>◆</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 300, color: DIM, lineHeight: 1.7 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 STRATEEGIA ────────────────────── */}
      <section id="strateegia" style={SEC(BG)}>
        <div style={WRAP}>
          <Tag n="04" label="Strateegilised valikud" />
          <H2>Mida teeme - ja mida mitte</H2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginTop: 40 }}>
            <div>
              <p style={{ ...LBL, color: GOLD, marginBottom: 20 }}>Teeme ALATI</p>
              {[
                "Anname vastustega alati seaduseviited - kasutaja saab iga väite taga oleva paragrahvi üles leida",
                "Hoiame seadused automaatselt ajakohased - süsteem uuendub koheselt",
                "Teeme juriidikat lihtsaks - keel on selge, ilma ülemäärase žargoonita",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                  <span style={{ color: GOLD, fontSize: "0.5rem", marginTop: "0.4em", flexShrink: 0 }}>◆</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 300, color: DIM, lineHeight: 1.7 }}>{item}</span>
                </div>
              ))}
            </div>
            <div>
              <p style={{ ...LBL, marginBottom: 20 }}>Ei tee KUNAGI</p>
              {[
                "Ei anna kontrollimata informatsiooni - kõik vastused on juristi valideeritud andmestiku põhjal",
                "Ei müü kasutaja andmeid - privaatsus on tingimusteta",
                "Ei tee anonüümset AI arvamust - iga vastus on seostatav seaduseallikaga",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                  <span style={{ color: MUTED, fontSize: "0.5rem", marginTop: "0.4em", flexShrink: 0 }}>◆</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 300, color: DIM, lineHeight: 1.7 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 64, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "36px 40px", borderLeft: `3px solid ${GOLD}` }}>
            <p style={{ ...LBL, color: GOLD, marginBottom: 14 }}>#1 Prioriteet sel aastal</p>
            <p style={{ fontSize: "1.1rem", fontWeight: 300, color: TEXT, lineHeight: 1.8, maxWidth: 640 }}>
              Ehitada kõige täpsem AI-põhine oiguse otsinguplatvorm Baltikumis - mida
              mõõdetakse vastuste täpsuse, kasutajate usalduse ja B2B klientide arvu järgi.
            </p>
          </div>

          <div style={{ marginTop: 48 }}>
            <p style={{ ...LBL, marginBottom: 20 }}>Peamised kitsaskohad ja lahendused</p>
            {[
              ["Oiguse andmete struktureerimine on aeganoudev", "Juristi-juhitud valideerimisprotsess koos AI abistamisega"],
              ["AI täpsus on kriitilise tähtsusega",            "Pidev mudeli treenimine, A/B testimine, feedback loop"],
              ["Kasutajate usaldus uue platvormi vastu",        "Läbipaistvus: allikad nähtavad, jurist tagab täpsuse"],
            ].map(([k, v], i) => <Row key={i} label={k} value={v} />)}
          </div>
        </div>
      </section>

      {/* ── 05 TÄITMISSÜSTEEM ────────────────── */}
      <section id="taitmissusteem" style={SEC(SURFACE)}>
        <div style={WRAP}>
          <Tag n="05" label="Täitmissüsteem" />
          <H2>Eesmärgid ja vastutus</H2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48 }}>
            <div>
              <p style={{ ...LBL, marginBottom: 16 }}>Kvartalieesmärgid 2024</p>
              {[
                ["Q1", "Eesti MVP launch - pohiseadused, Riigikohtu lahendid", true],
                ["Q2", "Baltikumi laienemine - Läti, Leedu, 3 B2B klienti", false],
                ["Q3", "Euroopa piloot - DE/FI/NL, API beetaversioon", false],
                ["Q4", "10 000 aktiivsed kasutajad, Enterprise klient", false],
              ].map(([k, v, acc], i) => <Row key={i} label={k as string} value={v as string} accent={!!acc} />)}
            </div>
            <div>
              <p style={{ ...LBL, marginBottom: 16 }}>Igakuised vahe-eesmärgid</p>
              {[
                ["Kuu 1", "MVP launch, Eesti seadused, 100 kasutajat", true],
                ["Kuu 2", "1 000 kasutajat, NPS mootmine (eesmärk: >50)", false],
                ["Kuu 3", "B2B subscription müük, 3+ ettevote katseperioodil", false],
              ].map(([k, v, acc], i) => <Row key={i} label={k as string} value={v as string} accent={!!acc} />)}
            </div>
            <div>
              <p style={{ ...LBL, marginBottom: 16 }}>Vastutusjaotus</p>
              {[
                ["CEO",   "Kasv, partnerlused, investorisuhted"],
                ["CTO",   "AI mudel, toote arendus, andmestiku kvaliteet"],
                ["Legal", "Oiguslik täpsus, valideerimisprotsess"],
              ].map(([k, v], i) => <Row key={i} label={k} value={v} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 TOODE ─────────────────────────── */}
      <section id="toode" style={SEC(BG)}>
        <div style={WRAP}>
          <Tag n="06" label="Toode" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <H2>Toote teekond</H2>
              <P>Viis selget versioonitasandit - iga järgnev avab uue tuluvoo ja suurendab kasutajate haaret.</P>

              {/* V1 highlight */}
              <div style={{ marginTop: 32, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "24px 26px" }}>
                <p style={{ ...LBL, color: GOLD, marginBottom: 14 }}>V1 — Launchitav MVP</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {["Kõik Eesti kehtivad seadused", "Automaatne uuendus muudatuste korral", "Riigikohtu lahendid", "AI-põhine otsing", "Seaduseviited iga vastuse juures", "Lihtne keeleline selgitus"].map((f, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ color: GOLD, fontSize: "0.5rem", flexShrink: 0 }}>◆</span>
                      <span style={{ fontSize: "0.85rem", fontWeight: 300, color: DIM }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p style={{ ...LBL, marginBottom: 20 }}>Toote roadmap</p>
              {[
                ["V1", "MVP",                   "Eesti seadused + AI otsing + seaduseviited", true],
                ["V2", "Dokumendianalüüs",       "Lepingute üleslaadimine, riskide tuvastamine", false],
                ["V3", "Lepingugeneraator",      "Tööleping, NDA, teenusleping - täidetav mall", false],
                ["V4", "Muudatuste jälgimine",   "Ettevote profiil, automaatsed teavitused", false],
                ["V5", "Rahvusvaheline",         "Piiriülese äri toetamine - globaalne turg", false],
              ].map(([ver, name, desc, acc], i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "40px 120px 1fr", gap: 16, padding: "14px 0", borderBottom: `1px solid ${BORDER}`, alignItems: "baseline" }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 500, color: acc ? GOLD : MUTED }}>{ver}</span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 400, color: acc ? WHITE : TEXT }}>{name}</span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 300, color: DIM, lineHeight: 1.55 }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 07 ÄRIMUDEL ──────────────────────── */}
      <section id="hinnad" style={SEC(SURFACE)}>
        <div style={WRAP}>
          <Tag n="07" label="Ärimudel" />
          <H2>Hinnakujundus</H2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 56 }}>
            {[
              { sub: "Projektipõhine", seg: "Eraisik",    price: "€29",     unit: "küsimus", featured: false, items: ["Üks detailne vastus", "Seaduseviited ja kohtulahendid", "Praktilised järgmised sammud"] },
              { sub: "Subscription",  seg: "VKE",         price: "€49",     unit: "kuu",     featured: true,  items: ["Piiramatu küsimuste arv", "Kõik oigusvaldkonnad", "Dokumendianalüüs", "Kuni 50 töötajaga ettevoted"] },
              { sub: "Premium",       seg: "Ettevote",    price: "€199",    unit: "kuu",     featured: false, items: ["Kõik VKE eelised", "Lepingugeneraator", "Riskianalüüs soovitustega", "Prioriteetne tugi"] },
              { sub: "B2B Custom",    seg: "Enterprise",  price: "€1k-10k", unit: "kuu",     featured: false, items: ["API integratsioon", "SLA-garantiid", "Rahvusvaheline laienemine"] },
            ].map((p, i) => <PricingCard key={i} {...p} />)}
          </div>

          <p style={{ ...LBL, marginBottom: 20 }}>Konkurentsihinnad</p>
          {[
            ["Jurist (Eesti)",                           "150-400 € / tund, vastus 1-5 tööpäeva"],
            ["LegalTech platvormid (Legora, Harvey jt)", "Hinnad avalikult kättesaamatud, peamiselt EN-keelsed"],
            ["Legatron VKE subscription",                "€49 / kuu - piiramatu kasutus, eestikeelne, seaduseviited"],
          ].map(([k, v, ], i) => <Row key={i} label={k} value={v} accent={i === 2} />)}
        </div>
      </section>

      {/* ── 08 VISIOON ───────────────────────── */}
      <section id="visioon" style={SEC(BG)}>
        <div style={WRAP}>
          <Tag n="08" label="Globaalne visioon" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <H2>Oiguse infrastruktuur maailmale</H2>
              <P>
                Legatron ei ehita lihtsalt tööriista. Pikaajaline visioon on saada maailma
                esimeseks riikideüleseks oiguse infrastruktuurisüsteemiks - süsteemiks,
                mille kaudu ettevotted ja eraisikud saavad teha kõik juriidilised otsused
                ükskõik millises riigis.
              </P>
              <div style={{ marginTop: 32, background: SURFACE, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${GOLD}`, borderRadius: 12, padding: "24px 28px" }}>
                <p style={{ ...LBL, color: GOLD, marginBottom: 14 }}>Visioon 2030</p>
                <p style={{ fontSize: "1rem", fontWeight: 300, color: TEXT, lineHeight: 1.8 }}>
                  Legatron on maailma juhtiv AI-oiguse platvorm, mis katab üle 50 riigi
                  seadused ja töötleb miljoneid küsimusi päevas.
                </p>
              </div>
            </div>
            <div>
              <p style={{ ...LBL, marginBottom: 20 }}>Korratav laienemismudel</p>
              {[
                "Siseneme riiki, kus on avalik ja struktureeritud seaduste andmestik",
                "Partnerlusjurist lokaalse oiguse valideerimiseks",
                "AI mudeli treenimine riigi-spetsiifilisele kontekstile",
                "Launch kohaliku meedia ja juriidikakogukonnaga",
                "Andmestiku pidev täiendamine seadusemuudatuste korral",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 20, padding: "14px 0", borderBottom: `1px solid ${BORDER}`, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 500, color: MUTED, flexShrink: 0, paddingTop: 3 }}>0{i+1}</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 300, color: DIM, lineHeight: 1.7 }}>{item}</span>
                </div>
              ))}

              <div style={{ marginTop: 40 }}>
                <p style={{ ...LBL, marginBottom: 16 }}>Kasutusnäited rahvusvahelisel tasandil</p>
                {[
                  ["Eesti ettevote soovib eksportida Slovakkiasse",  "Maksueeskirjad, toodete regulatsioonid - koheselt"],
                  ["Eraisik reisib ja töötab Hispaanias",            "Töötamine, elamisluba, tarbijaõigus - ühes kohas"],
                  ["Startup asutab firma Saksamaal",                 "GmbH nouded, tööoigus, andmekaitse"],
                  ["Pank kontrollib vastavust EL-i direktiivile",    "Automaatne regulatsioonikaart"],
                ].map(([k, v], i) => <Row key={i} label={k} value={v} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 09 KKK ───────────────────────────── */}
      <section id="kkk" style={SEC(SURFACE)}>
        <div style={WRAP}>
          <Tag n="09" label="Investori KKK" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <H2>Küsimused ja vastused</H2>
              <P dim>
                Kõige sagedamini küsitavad küsimused investoritelt - strateegilised ja
                tootefookusega.
              </P>
            </div>
            <div>
              <div style={{ borderTop: `1px solid ${BORDER}` }}>
                {[
                  { q: "Miks just nüüd?",                               a: "AI mudelite võimekus on 2023-2024 jooksul joudnud tasemele, kus struktureeritud oiguse andmestik koos keelemudeliga annab usaldusväärseid ja viidatavaid vastuseid. Varem polnud täpsus piisav, et turule minna vastutustundlikult." },
                  { q: "Miks alustada Eestist?",                        a: "Eesti on väike (1,4 mln), kõrgelt digitaliseeritud ja omab selget ning avalikult kättesaadavat seaduste andmebaasi (Riigi Teataja). See võimaldab kiiresti itereerida ja mudeli täpsust tõestada enne laiemat sisenemist." },
                  { q: "Kui suureks saab see kasvada?",                 a: "Euroopa juriidiliste teenuste turg on hinnanguliselt üle 300 miljardi euro aastas. Isegi 0,1% sellest turust tähendab 300 mln € käivet. LegalTech kui AI vertikaali kasvutempo ületab üldist SaaS-i kasvu märkimisväärselt." },
                  { q: "Mis takistab konkurente?",                      a: "Struktureeritud ja juristi-valideeritud riigipõhine andmestik on aastatepikkune töö. Üldised AI mudelid (ChatGPT jt) ei suuda seda asendada - neil puudub täpsus, viited ja lokaalne kontekst." },
                  { q: "Kuidas skaaleerimine rahvusvaheliselt toimib?", a: "Iga riik on eraldi moodul: seadused - lokaliseerimine - AI treenimine - launch. Mudel on korratav. Pärast kolme esimest riiki on protsess automatiseeritud ja kiiremat laienemist toetab API ärimudel." },
                  { q: "Kas seadused saavad API-ks?",                       a: "Jah. V3-V4 ajaks pakume API-t, mille kaudu ettevotted saavad oma rakendustes pärida konkreetseid seaduseviiteid, regulatiivseid noueid ja riskihinnanguid. See avab uue B2B tuluvoo." },
                  { q: "Kas Legatron võib olla oiguse operatsioonisüsteem?",a: "See on meie pikaajaline visioon. Ettevotted teevad kõik juriidilised otsused - lepingud, riskianalüüsid, regulatsioonikontroll - Legatroni kaudu." },
                  { q: "Kas oigus on järgmine suur AI vertikaali?",        a: "Koos tervishoiu, finantsteenuste ja haridusega on oigus üks maailma suurimaid teenussektoreid. Erinevalt paljudest muudest sektoritest on seadusandlik andmestik avalik ja struktureeritud." },
                ].map((item, i) => <FAQ key={i} q={item.q} a={item.a} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section style={{ padding: "140px 0", position: "relative", overflow: "hidden", background: BG }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 800, height: 500, background: "radial-gradient(ellipse, rgba(212,160,23,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ ...WRAP, textAlign: "center", position: "relative" }}>
          <p style={{ ...LBL, marginBottom: 32 }}>Ühinege visiooniga</p>
          <h2 style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)", fontWeight: 600, letterSpacing: "-0.035em", color: WHITE, lineHeight: 1.05, marginBottom: 20, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
            Seadused ei pea olema{" "}
            <span style={{ color: GOLD }}>keerulised.</span>
          </h2>
          <p style={{ fontSize: "1rem", fontWeight: 300, color: DIM, marginBottom: 48, lineHeight: 1.8 }}>
            We win because we turn law into infrastructure.
          </p>
          <a href="mailto:info@legatron.ai" style={{ display: "inline-block", background: WHITE, color: BG, fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.02em", padding: "14px 32px", borderRadius: 12, textDecoration: "none", marginBottom: 80 }}>
            info@legatron.ai
          </a>
          <Divider />
          <p style={{ ...LBL, marginTop: 28 }}>
            © 2024 Legatron · Investor-taseme dokument · Konfidentsiaalne
          </p>
        </div>
      </section>

    </div>
  );
}
