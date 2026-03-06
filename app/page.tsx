"use client";
import { useState } from "react";

/* ── Design tokens ───────────────────────── */
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
  goldDim: "rgba(201,152,26,0.1)",
  goldBrd: "rgba(201,152,26,0.22)",
};

const WRAP: React.CSSProperties = { maxWidth: 1080, margin: "0 auto", padding: "0 56px" };
const GRID2: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72 };
const GRID3: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40 };
const GRID4: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 };
const LBL: React.CSSProperties  = { fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.muted, lineHeight: 1 };
const SEC  = (bg = C.bg): React.CSSProperties => ({ background: bg, padding: "120px 0" });

/* ── Primitives ─────────────────────────── */
const SectionTag = ({ n, label }: { n: string; label: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 64 }}>
    <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.12em", color: C.muted }}>{n}</span>
    <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: C.sub }}>{label}</span>
  </div>
);

const H2 = ({ children, hide }: { children: React.ReactNode; hide?: boolean }) => (
  <h2 className={hide ? "h2-hide" : ""} style={{ fontSize: "clamp(1.75rem, 2.6vw, 2.25rem)", fontWeight: 500, letterSpacing: "-0.026em", color: C.white, lineHeight: 1.2, marginBottom: 20 }}>
    {children}
  </h2>
);

const Sub = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: "0.9375rem", fontWeight: 300, color: C.sub, lineHeight: 1.85, marginBottom: 14 }}>
    {children}
  </p>
);

const ColLabel = ({ children }: { children: React.ReactNode }) => (
  <p style={{ ...LBL, marginBottom: 16 }}>{children}</p>
);

/* Boxed data table */
const DataTable = ({ cols, rows, widths, accent, scroll }: {
  cols?: string[];
  rows: (string | React.ReactNode)[][];
  widths?: string[];
  accent?: number;
  scroll?: boolean;
}) => (
  <div className={scroll ? "tbl-wrap" : ""} style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      {cols && (
        <thead>
          <tr style={{ background: C.surf2 }}>
            {cols.map((c, i) => (
              <th key={i} style={{ ...LBL, padding: "11px 18px", textAlign: "left", borderBottom: `1px solid ${C.border}`, width: widths?.[i], fontWeight: 500 }}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} style={{ background: ri % 2 === 0 ? C.surf : C.surf2 }}>
            {row.map((cell, ci) => (
              <td key={ci} style={{
                fontSize: "0.855rem",
                fontWeight: ci === accent ? 400 : 300,
                color: ci === accent ? C.gold : C.sub,
                lineHeight: 1.65,
                padding: "12px 18px",
                borderBottom: ri < rows.length - 1 ? `1px solid ${C.border}` : "none",
                verticalAlign: "top",
              }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* Bullet list */
const BulletList = ({ items, gold }: { items: string[]; gold?: boolean }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
    {items.map((item, i) => (
      <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <span style={{ color: gold ? C.gold : C.muted, fontSize: "0.45rem", marginTop: "0.55em", flexShrink: 0 }}>◆</span>
        <span style={{ fontSize: "0.875rem", fontWeight: 300, color: C.dim, lineHeight: 1.72 }}>{item}</span>
      </div>
    ))}
  </div>
);

/* Highlight box */
const Highlight = ({ label, children }: { label?: string; children: React.ReactNode }) => (
  <div style={{ background: C.surf2, border: `1px solid ${C.border}`, borderLeft: `2px solid ${C.gold}`, borderRadius: 10, padding: "24px 28px" }}>
    {label && <p style={{ ...LBL, color: C.gold, marginBottom: 14 }}>{label}</p>}
    {children}
  </div>
);

/* Pricing card */
const PricingCard = ({ sub, seg, price, unit, featured, items }: {
  sub: string; seg: string; price: string; unit: string; featured?: boolean; items: string[];
}) => (
  <div style={{
    background: featured ? C.goldDim : C.surf,
    border: `1px solid ${featured ? C.goldBrd : C.border}`,
    borderRadius: 12,
    padding: "26px 22px",
    display: "flex",
    flexDirection: "column",
  }}>
    <p style={{ ...LBL, color: featured ? C.gold : C.muted, marginBottom: 8 }}>{sub}</p>
    <p style={{ fontSize: "0.95rem", fontWeight: 500, color: C.white, marginBottom: 20 }}>{seg}</p>
    <div style={{ marginBottom: 22 }}>
      <span style={{ fontSize: "2.2rem", fontWeight: 600, letterSpacing: "-0.04em", color: featured ? C.gold : C.white, lineHeight: 1 }}>{price}</span>
      <span style={{ fontSize: "0.78rem", fontWeight: 300, color: C.muted, marginLeft: 6 }}>/ {unit}</span>
    </div>
    <div style={{ height: 1, background: C.border, marginBottom: 20 }} />
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      {items.map((f, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ color: featured ? C.gold : C.muted, fontSize: "0.45rem", marginTop: "0.55em", flexShrink: 0 }}>◆</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 300, color: C.dim, lineHeight: 1.55 }}>{f}</span>
        </div>
      ))}
    </div>
  </div>
);

/* FAQ */
const FAQ = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ padding: "17px 0", borderBottom: `1px solid ${C.border}`, cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "flex-start" }}>
        <span style={{ fontSize: "0.9rem", fontWeight: 400, color: C.text, lineHeight: 1.5 }}>{q}</span>
        <span style={{ color: C.muted, flexShrink: 0, fontSize: "1.1rem", lineHeight: 1, transition: "transform 0.18s", transform: open ? "rotate(45deg)" : "none", marginTop: 1 }}>+</span>
      </div>
      {open && <p style={{ marginTop: 12, fontSize: "0.865rem", fontWeight: 300, color: C.dim, lineHeight: 1.9 }}>{a}</p>}
    </div>
  );
};

/* ══════════════════════════════════════════ */
export default function Page() {
  return (
    <div style={{ background: C.bg, color: C.text }}>
      <style>{`
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
        .col2 { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; }
        .col3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
        .col4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .moat4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: ${C.border}; border: 1px solid ${C.border}; border-radius: 10px; overflow: hidden; }
        .nav-links { display: flex; gap: 32px; }
        .tbl-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr; gap: 40px; }
          .col2 { grid-template-columns: 1fr; gap: 48px; }
          .col3 { grid-template-columns: 1fr; gap: 40px; }
          .col4 { grid-template-columns: 1fr 1fr; gap: 10px; }
          .moat4 { grid-template-columns: 1fr 1fr; }
          .nav-links { display: none; }
          .section-pad { padding: 72px 0 !important; }
          .wrap-pad { padding: 0 24px !important; }
          .hero-pad { padding: 120px 0 80px !important; }
          .h2-hide { display: none !important; }
        }
        @media (max-width: 480px) {
          .col4 { grid-template-columns: 1fr; }
          .moat4 { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(8,8,8,0.92)", backdropFilter: "blur(24px)" }}>
        <div className="wrap-pad" style={{ ...WRAP, height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <rect x="0" y="0" width="13" height="13" fill={C.white} fillOpacity="0.9" />
              <rect x="16" y="17" width="14" height="13" fill={C.gold} />
            </svg>
            <span style={{ fontSize: "1.25rem", fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, color: C.white, letterSpacing: "0.01em", lineHeight: 1 }}>Legatron</span>
          </div>
          <div className="nav-links">
            {["Lahendus", "Turg", "Toode", "Hinnad", "Visioon", "KKK"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: "0.8rem", fontWeight: 300, color: C.muted, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <a href="mailto:info@legatron.ai" style={{ fontSize: "0.78rem", fontWeight: 400, color: C.white, textDecoration: "none", background: C.surf2, border: `1px solid ${C.border2}`, padding: "7px 18px", borderRadius: 8 }}>
            Võta ühendust
          </a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────── */}
      <section className="hero-pad" style={{ padding: "164px 0 128px", background: C.bg, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 900, height: 500, background: `radial-gradient(ellipse at 50% 0%, rgba(201,152,26,0.07) 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div className="wrap-pad" style={WRAP}>
          <h1 style={{ fontSize: "clamp(3.4rem, 6.8vw, 6.2rem)", fontWeight: 600, letterSpacing: "-0.036em", color: C.white, lineHeight: 1.0, maxWidth: 820, marginBottom: 28 }}>
            Muudame seadused{" "}
            <span style={{ color: C.gold }}>infrastruktuuriks.</span>
          </h1>

          <p style={{ fontSize: "1.05rem", fontWeight: 300, color: C.dim, lineHeight: 1.82, maxWidth: 480, marginBottom: 44 }}>
            AI-põhine platvorm, mis teeb oiguse ligipääsetavaks igale inimesele ja
            ettevotele - kiiremini, odavamalt ja täpsemini kui ükski jurist suudaks.
          </p>

          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 100 }}>
            <a href="#missioon" style={{ background: C.white, color: C.bg, fontSize: "0.84rem", fontWeight: 600, letterSpacing: "0.01em", padding: "12px 26px", borderRadius: 10, textDecoration: "none" }}>
              Vaata ariplaan
            </a>
            <a href="#kkk" style={{ fontSize: "0.84rem", fontWeight: 300, color: C.dim, textDecoration: "none", padding: "12px 4px" }}>
              Investori KKK →
            </a>
          </div>

          <div className="stats-grid" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 52 }}>
            {[
              { n: "€300 mld", l: "Euroopa juriidiliste teenuste turg aastas", gold: true },
              { n: "10×",      l: "odavam ja kiirem kui traditsiooniline jurist", gold: false },
              { n: "50+",      l: "riiki plaanitud kaetuse alla 2030. aastaks", gold: false },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)", fontWeight: 600, letterSpacing: "-0.04em", color: s.gold ? C.gold : C.white, lineHeight: 1, marginBottom: 10 }}>{s.n}</div>
                <div style={{ fontSize: "0.82rem", fontWeight: 300, color: C.muted, lineHeight: 1.55 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 01 MISSIOON ──────────────────────── */}
      <section id="missioon" className="section-pad" style={SEC(C.bg)}>
        <div className="wrap-pad" style={WRAP}>
          <SectionTag n="01" label="Missioon" />
          <div className="col2">
            <div>
              <H2>Miks maailm vajab Legatroni?</H2>
              <Sub>
                Tänapäeva oigussüsteem on üles ehitatud asjatundjate jaoks, mitte tavaliste
                inimeste jaoks. Väikeettevotja, kes soovib teada, kas ta võib töötajat
                koondada, peab maksma juristile 150-400 € tunni kohta - ja ootama päevi
                vastust, mis on vaja juba täna.
              </Sub>
              <Sub>
                Eraisik, kes sõlmib lepingut, ei tea sageli, millised riskid see endas peidab.
                Legatron struktureerib seadused, kohtulahendid ja oigusnormid ning muudab
                need sekunditega otsinguks kättesaadavaks.
              </Sub>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <Highlight label="Ühe lause missioon">
                <p style={{ fontSize: "1rem", fontWeight: 300, color: C.text, lineHeight: 1.82 }}>
                  Muuta seadused arusaadavaks ja koheselt kasutatavaks igale inimesele ja
                  ettevotele - kiiremini, odavamalt ja täpsemini kui ükski jurist suudaks.
                </p>
              </Highlight>
              <div>
                <ColLabel>Mida kaotaks maailm ilma Legatronita</ColLabel>
                <BulletList items={[
                  "Lepingutel põhinevad vaidlused, mida oleks saanud vältida",
                  "Trahvid regulatsiooninouete mittetäitmise eest",
                  "Otsused, mis põhinevad valedel eeldustel oigusliku vastutuse kohta",
                  "Ressursside raiskamine teenustele, mis on väikeettevotjatele taskukohatud",
                ]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 KONKURENTSIEELIS ──────────────── */}
      <section id="lahendus" className="section-pad" style={SEC(C.bg)}>
        <div className="wrap-pad" style={WRAP}>
          <SectionTag n="02" label="Konkurentsieelis" />
          <div className="col2">
            <div>
              <H2>10× parem kui praegune alternatiiv</H2>
              <Sub>
                Seadus ise ei ole probleem - probleem on selle ligipääsetavus. Kui seadused
                struktureerida oigesti ning ühendada AI-mudelitega, saab oigusest reaalajas
                kasutatav infrastruktuur, nagu on internet ühenduvuse jaoks.
              </Sub>
              <div style={{ marginTop: 28 }}>
                <ColLabel>Praegune seis</ColLabel>
                <DataTable
                  cols={["Valdkond", "Seis"]}
                  rows={[
                    ["Eesti oiguse struktureerimine", "Aktiivne - pohiseadused kaetud"],
                    ["AI-põhine seaduse otsing",      "MVP käivitamiseks valmis"],
                    ["Juristi valideeritud vastused",  "Protsess paika pandud"],
                    ["Riigikohtu lahendite analüüs",  "Integratsioon arenduses"],
                  ]}
                />
              </div>
            </div>
            <div>
              <H2>Jurist vs Legatron</H2>
              <DataTable
                cols={["", "Jurist", "Legatron"]}
                widths={["30%", "30%", "40%"]}
                rows={[
                  ["Hind",          "150-400 € / tund",  <span style={{ color: C.gold, fontWeight: 400 }}>alates 29 € / küsimus</span>],
                  ["Vastusekiirus", "1-5 tööpäeva",      <span style={{ color: C.gold, fontWeight: 400 }}>sekunditega</span>],
                  ["Kättesaadavus", "tööajal",           <span style={{ color: C.gold, fontWeight: 400 }}>24/7</span>],
                  ["Kvaliteet",     "varieerub",         <span style={{ color: C.gold, fontWeight: 400 }}>konsistentne</span>],
                  ["Mastaap",       "ei skaleeru",       <span style={{ color: C.gold, fontWeight: 400 }}>miljonid küsimused</span>],
                ]}
              />
            </div>
          </div>

          <div style={{ marginTop: 72 }}>
            <ColLabel>Meid on raske kopeerida</ColLabel>
            <div className="moat4" style={{ gap: 1 }}>
              {[
                { n: "01", t: "Struktureeritud andmebaas",  d: "Aastatepikkune töö seaduste, kohtulahendite ja regulatsioonide kategoriseerimiseks riigi- ja valdkonnapõhiselt." },
                { n: "02", t: "Juristi valideeritud sisu",  d: "Iga oiguslik väide on inimekspert üle kontrollinud - täpsust, mida puhta AI korral ei saavutata." },
                { n: "03", t: "Riigipõhine AI treening",    d: "Mudel treenitud konkreetse riigi oiguslikule kontekstile - tunduvalt parem täpsus kui üldmudelitel." },
                { n: "04", t: "Interdistsiplinaarne tiim",  d: "Juristi ja arendaja tihe koostöö - kombinatsioon, keda on aastatega keeruline järgi jäljendada." },
              ].map((m, i) => (
                <div key={i} style={{ background: C.surf, padding: "24px 22px" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 500, color: C.muted, letterSpacing: "0.12em", marginBottom: 14 }}>{m.n}</p>
                  <p style={{ fontSize: "0.875rem", fontWeight: 500, color: C.white, marginBottom: 10, lineHeight: 1.4 }}>{m.t}</p>
                  <p style={{ fontSize: "0.8rem", fontWeight: 300, color: C.dim, lineHeight: 1.7 }}>{m.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 TURG ──────────────────────────── */}
      <section id="turg" className="section-pad" style={SEC(C.bg)}>
        <div className="wrap-pad" style={WRAP}>
          <SectionTag n="03" label="Turg" />
          <div className="col2">
            <div>
              <H2>Suur turg, selge tee sisse</H2>
              <Sub>
                Euroopa juriidiliste teenuste turg on hinnanguliselt üle 300 miljardi euro
                aastas. Isegi 0,1% sellest turust tähendab 300 mln € käivet. LegalTech
                kui AI vertikaali kasvutempo ületab üldist SaaS-i kasvu märkimisväärselt.
              </Sub>
              <Sub>
                Siseneme Eestist - kiire iteratsioon, digitaalne ühiskond, avalik seaduste
                andmestik. Seejärel Baltikum, Euroopa, globaalne.
              </Sub>
              <div style={{ marginTop: 28 }}>
                <ColLabel>Turu laienemine</ColLabel>
                <DataTable
                  rows={[
                    [<span style={{ color: C.gold, fontWeight: 400 }}>Faas 1 — 2024</span>,     "Eesti MVP - digitaalne ühiskond, avalik andmestik"],
                    ["Faas 2 — 2025 Q1-Q2",                                                      "Baltikum - Läti ja Leedu, sarnane oiguslik struktuur"],
                    ["Faas 3 — 2025 Q3-Q4",                                                      "Euroopa - DE, FI, NL, selged andmestikud"],
                    ["Faas 4 — 2026+",                                                            "Globaalne laienemine, API ärimudel, Enterprise"],
                  ]}
                />
              </div>
            </div>
            <div>
              <H2>Sihtgrupid</H2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {[
                  { t: "Eraisik",                    s: "Projektipõhine kasutus",   d: "Vajab vastust konkreetsele küsimusele - üürileping, tööoigus, tarbijakaitse. Kiire, täpne, taskukohane." },
                  { t: "Väike ja Keskmine Ettevote", s: "Igapäevane oiguslik tugi", d: "Töölepingud, kliendisuhted, regulatsioonid. Korduvad küsimused kiirelt, ilma juristi ooteajata." },
                ].map((sg, i) => (
                  <div key={i} style={{ background: C.surf2, border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px 22px" }}>
                    <p style={{ ...LBL, marginBottom: 8 }}>{sg.s}</p>
                    <p style={{ fontSize: "0.9rem", fontWeight: 500, color: C.white, marginBottom: 8 }}>{sg.t}</p>
                    <p style={{ fontSize: "0.84rem", fontWeight: 300, color: C.dim, lineHeight: 1.72 }}>{sg.d}</p>
                  </div>
                ))}
              </div>
              <ColLabel>Suurimad valupunktid</ColLabel>
              <BulletList items={[
                "Ei teata, mida seadus täpselt lubab - eriti uute regulatsioonide korral",
                "Juristile helistamine on kallis, aeglane ja tundub üleliigne",
                "Vastus tuleb liiga aeglaselt - otsus tuleb teha täna",
                "Puudub usaldusväärne ja taskukohane allikas, kust kontrollida",
              ]} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 STRATEEGIA ────────────────────── */}
      <section id="strateegia" className="section-pad" style={SEC(C.bg)}>
        <div className="wrap-pad" style={WRAP}>
          <SectionTag n="04" label="Strateegilised valikud" />
          <div className="col2">
            <div>
              <H2>Mida teeme - ja mida mitte</H2>
              <ColLabel>Teeme ALATI</ColLabel>
              <BulletList gold items={[
                "Anname vastustega alati seaduseviited - kasutaja saab iga väite taga oleva paragrahvi üles leida",
                "Hoiame seadused automaatselt ajakohased - süsteem uuendub koheselt muudatuste korral",
                "Teeme juriidikat lihtsaks - keel on selge, ilma ülemäärase žargoonita",
              ]} />
            </div>
            <div>
              <H2 hide>Printsiibid</H2>
              <ColLabel>Ei tee KUNAGI</ColLabel>
              <BulletList items={[
                "Ei anna kontrollimata informatsiooni - kõik vastused on juristi valideeritud andmestiku põhjal",
                "Ei müü kasutaja andmeid - privaatsus on tingimusteta",
                "Ei tee anonüümset AI arvamust - iga vastus on seostatav seaduseallikaga",
              ]} />
            </div>
          </div>

          <div style={{ marginTop: 56 }}>
            <Highlight label="#1 Prioriteet sel aastal">
              <p style={{ fontSize: "1.05rem", fontWeight: 300, color: C.text, lineHeight: 1.82 }}>
                Ehitada kõige täpsem AI-põhine oiguse otsinguplatvorm Baltikumis - mida
                mõõdetakse vastuste täpsuse, kasutajate usalduse ja B2B klientide arvu järgi.
              </p>
            </Highlight>
          </div>

          <div style={{ marginTop: 48 }}>
            <ColLabel>Peamised kitsaskohad ja lahendused</ColLabel>
            <DataTable
              cols={["Kitsaskoht", "Lahendus"]}
              widths={["45%", "55%"]}
              rows={[
                ["Oiguse andmete struktureerimine on aeganoudev", "Juristi-juhitud valideerimisprotsess koos AI abistamisega"],
                ["AI täpsus on kriitilise tähtsusega",            "Pidev mudeli treenimine, A/B testimine, feedback loop"],
                ["Kasutajate usaldus uue platvormi vastu",        "Läbipaistvus: allikad nähtavad, jurist tagab täpsuse"],
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── 05 TÄITMISSÜSTEEM ────────────────── */}
      <section id="taitmissusteem" className="section-pad" style={SEC(C.bg)}>
        <div className="wrap-pad" style={WRAP}>
          <SectionTag n="05" label="Täitmissüsteem" />
          <H2>Eesmärgid ja vastutus</H2>
          <div className="col3" style={{ marginTop: 40 }}>
            <div>
              <ColLabel>Kvartalieesmärgid 2024</ColLabel>
              <DataTable
                cols={["Kvartal", "Eesmärk"]}
                rows={[
                  [<span style={{ color: C.gold, fontWeight: 400 }}>Q1</span>, "Eesti MVP launch - pohiseadused, Riigikohtu lahendid"],
                  ["Q2", "Baltikumi laienemine - Läti, Leedu, 3 B2B klienti"],
                  ["Q3", "Euroopa piloot - DE/FI/NL, API beetaversioon"],
                  ["Q4", "10 000 aktiivsed kasutajad, Enterprise klient"],
                ]}
              />
            </div>
            <div>
              <ColLabel>Igakuised vahe-eesmärgid</ColLabel>
              <DataTable
                cols={["Kuu", "Vahe-eesmärk"]}
                rows={[
                  [<span style={{ color: C.gold, fontWeight: 400 }}>1</span>, "MVP launch, Eesti seadused, 100 kasutajat"],
                  ["2", "1 000 kasutajat, NPS mootmine (eesmärk: >50)"],
                  ["3", "B2B subscription müük, 3+ ettevote katseperioodil"],
                ]}
              />
            </div>
            <div>
              <ColLabel>Vastutusjaotus</ColLabel>
              <DataTable
                cols={["Roll", "Vastutusala"]}
                rows={[
                  ["CEO",   "Kasv, partnerlused, investorisuhted"],
                  ["CTO",   "AI mudel, toote arendus, andmestiku kvaliteet"],
                  ["Legal", "Oiguslik täpsus, valideerimisprotsess"],
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 TOODE ─────────────────────────── */}
      <section id="toode" className="section-pad" style={SEC(C.bg)}>
        <div className="wrap-pad" style={WRAP}>
          <SectionTag n="06" label="Toode" />
          <div className="col2">
            <div>
              <H2>Toote teekond</H2>
              <Sub>Viis selget versioonitasandit - iga järgnev avab uue tuluvoo ja suurendab kasutajate haaret.</Sub>
              <div style={{ marginTop: 28 }}>
                <Highlight label="V1 — Launchitav MVP">
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 0" }}>
                    {["Kõik Eesti kehtivad seadused", "Automaatne uuendus muudatuste korral", "Riigikohtu lahendid", "AI-põhine otsing", "Seaduseviited iga vastuse juures", "Lihtne keeleline selgitus"].map((f, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ color: C.gold, fontSize: "0.45rem", flexShrink: 0 }}>◆</span>
                        <span style={{ fontSize: "0.83rem", fontWeight: 300, color: C.dim }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </Highlight>
              </div>
            </div>
            <div>
              <H2>Roadmap</H2>
              <DataTable
                cols={["Ver", "Nimi", "Funktsionaalsus"]}
                widths={["10%", "28%", "62%"]}
                rows={[
                  [<span style={{ color: C.gold, fontWeight: 400 }}>V1</span>, "MVP",                   "Eesti seadused, AI otsing, seaduseviited"],
                  ["V2", "Dokumendianalüüs",     "Lepingute üleslaadimine, riskide tuvastamine"],
                  ["V3", "Lepingugeneraator",    "Tööleping, NDA, teenusleping - täidetav mall"],
                  ["V4", "Muudatuste jälgimine", "Ettevote profiil, automaatsed teavitused"],
                  ["V5", "Rahvusvaheline",       "Piiriülese äri toetamine, globaalne turg"],
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 07 ÄRIMUDEL ──────────────────────── */}
      <section id="hinnad" className="section-pad" style={SEC(C.bg)}>
        <div className="wrap-pad" style={WRAP}>
          <SectionTag n="07" label="Ärimudel" />
          <H2>Hinnakujundus</H2>

          <div className="col4" style={{ marginTop: 40, marginBottom: 56 }}>
            {[
              { sub: "Projektipõhine", seg: "Eraisik",    price: "€29",     unit: "küsimus", items: ["Üks detailne vastus", "Seaduseviited ja kohtulahendid", "Praktilised järgmised sammud"] },
              { sub: "Subscription",  seg: "VKE",         price: "€49",     unit: "kuu",     featured: true,  items: ["Piiramatu küsimuste arv", "Kõik oigusvaldkonnad", "Dokumendianalüüs", "Kuni 50 töötajaga ettevoted"] },
              { sub: "Premium",       seg: "Ettevote",    price: "€199",    unit: "kuu",     items: ["Kõik VKE eelised", "Lepingugeneraator", "Riskianalüüs soovitustega", "Prioriteetne tugi"] },
              { sub: "B2B Custom",    seg: "Enterprise",  price: "€1k-10k", unit: "kuu",     items: ["API integratsioon", "SLA-garantiid", "Rahvusvaheline laienemine"] },
            ].map((p, i) => <PricingCard key={i} {...p} />)}
          </div>

          <ColLabel>Konkurentsihinnad</ColLabel>
          <DataTable
            cols={["Teenus", "Ligikaudne kulu"]}
            widths={["45%", "55%"]}
            rows={[
              ["Jurist (Eesti)",                           "150-400 € / tund, vastus 1-5 tööpäeva"],
              ["LegalTech platvormid (Legora, Harvey jt)", "Hinnad avalikult kättesaamatud, peamiselt EN-keelsed"],
              [<span style={{ color: C.gold, fontWeight: 400 }}>Legatron VKE subscription</span>, "€49 / kuu - piiramatu kasutus, eestikeelne, seaduseviited"],
            ]}
          />
        </div>
      </section>

      {/* ── 08 VISIOON ───────────────────────── */}
      <section id="visioon" className="section-pad" style={SEC(C.bg)}>
        <div className="wrap-pad" style={WRAP}>
          <SectionTag n="08" label="Globaalne visioon" />
          <div className="col2">
            <div>
              <H2>Oiguse infrastruktuur maailmale</H2>
              <Sub>
                Legatron ei ehita lihtsalt tööriista. Pikaajaline visioon on saada maailma
                esimeseks riikideüleseks oiguse infrastruktuurisüsteemiks - süsteemiks,
                mille kaudu ettevotted ja eraisikud saavad teha kõik juriidilised otsused
                ükskõik millises riigis.
              </Sub>
              <Highlight label="Visioon 2030">
                <p style={{ fontSize: "1rem", fontWeight: 300, color: C.text, lineHeight: 1.82 }}>
                  Legatron on maailma juhtiv AI-oiguse platvorm, mis katab üle 50 riigi
                  seadused ja töötleb miljoneid küsimusi päevas.
                </p>
              </Highlight>
            </div>
            <div>
              <H2>Korratav laienemismudel</H2>
              <DataTable
                cols={["Samm", "Tegevus"]}
                widths={["12%", "88%"]}
                rows={[
                  ["1", "Siseneme riiki, kus on avalik ja struktureeritud seaduste andmestik"],
                  ["2", "Partnerlusjurist lokaalse oiguse valideerimiseks"],
                  ["3", "AI mudeli treenimine riigi-spetsiifilisele kontekstile"],
                  ["4", "Launch kohaliku meedia ja juriidikakogukonnaga"],
                  ["5", "Andmestiku pidev täiendamine seadusemuudatuste korral"],
                ]}
              />
              <div style={{ marginTop: 28 }}>
                <ColLabel>Kasutusnäited rahvusvahelisel tasandil</ColLabel>
                <DataTable
                  cols={["Stsenaarium", "Legatroni lahendus"]}
                  widths={["50%", "50%"]}
                  rows={[
                    ["Eesti ettevote soovib eksportida Slovakkiasse",  "Maksueeskirjad, toodete regulatsioonid - koheselt"],
                    ["Eraisik reisib ja töötab Hispaanias",            "Töötamine, elamisluba, tarbijaõigus - ühes kohas"],
                    ["Startup asutab firma Saksamaal",                 "GmbH nouded, tööoigus, andmekaitse"],
                    ["Pank kontrollib vastavust EL-i direktiivile",    "Automaatne regulatsioonikaart"],
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 09 KKK ───────────────────────────── */}
      <section id="kkk" className="section-pad" style={SEC(C.bg)}>
        <div className="wrap-pad" style={WRAP}>
          <SectionTag n="09" label="Investori KKK" />
          <div className="col2">
            <div>
              <H2>Küsimused ja vastused</H2>
              <Sub>
                Kõige sagedamini küsitavad küsimused investoritelt - strateegilised ja
                tootefookusega.
              </Sub>
            </div>
            <div>
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                {[
                  { q: "Miks just nüüd?",                               a: "AI mudelite võimekus on 2023-2024 jooksul joudnud tasemele, kus struktureeritud oiguse andmestik koos keelemudeliga annab usaldusväärseid ja viidatavaid vastuseid. Varem polnud täpsus piisav, et turule minna vastutustundlikult." },
                  { q: "Miks alustada Eestist?",                        a: "Eesti on väike (1,4 mln), kõrgelt digitaliseeritud ja omab selget ning avalikult kättesaadavat seaduste andmebaasi (Riigi Teataja). See võimaldab kiiresti itereerida ja mudeli täpsust tõestada enne laiemat sisenemist." },
                  { q: "Kui suureks saab see kasvada?",                 a: "Euroopa juriidiliste teenuste turg on hinnanguliselt üle 300 miljardi euro aastas. Isegi 0,1% sellest turust tähendab 300 mln € käivet. LegalTech kui AI vertikaali kasvutempo ületab üldist SaaS-i kasvu märkimisväärselt." },
                  { q: "Mis takistab konkurente?",                      a: "Struktureeritud ja juristi-valideeritud riigipõhine andmestik on aastatepikkune töö. Üldised AI mudelid (ChatGPT jt) ei suuda seda asendada - neil puudub täpsus, viited ja lokaalne kontekst. Varajane positsioon loob võrgustikeefekti." },
                  { q: "Kuidas skaaleerimine rahvusvaheliselt toimib?", a: "Iga riik on eraldi moodul: seadused - lokaliseerimine - AI treenimine - launch. Mudel on korratav. Pärast kolme esimest riiki on protsess automatiseeritud ja kiiremat laienemist toetab API ärimudel." },
                  { q: "Kas seadused saavad API-ks?",                        a: "Jah. V3-V4 ajaks pakume API-t, mille kaudu ettevotted saavad oma rakendustes pärida konkreetseid seaduseviiteid, regulatiivseid noueid ja riskihinnanguid. See avab uue B2B tuluvoo." },
                  { q: "Kas Legatron võib olla oiguse operatsioonisüsteem?", a: "See on meie pikaajaline visioon. Ettevotted teevad kõik juriidilised otsused - lepingud, riskianalüüsid, regulatsioonikontroll - Legatroni kaudu, ilma et neil oleks vaja juristi kaasata rutiinsetes küsimustes." },
                  { q: "Kas oigus on järgmine suur AI vertikaali?",          a: "Koos tervishoiu, finantsteenuste ja haridusega on oigus üks maailma suurimaid teenussektoreid. Seadusandlik andmestik on avalik ja struktureeritud, mis muudab AI rakendamise kiiremaks kui teistes sektorites." },
                ].map((item, i) => <FAQ key={i} {...item} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section style={{ padding: "148px 0", background: C.bg, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 1000, height: 600, background: `radial-gradient(ellipse, rgba(201,152,26,0.07) 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div className="wrap-pad" style={{ ...WRAP, textAlign: "center", position: "relative" }}>
          <p style={{ ...LBL, marginBottom: 36 }}>Ühinege visiooniga</p>
          <h2 style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)", fontWeight: 600, letterSpacing: "-0.036em", color: C.white, lineHeight: 1.04, marginBottom: 20, maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
            Seadused ei pea olema{" "}
            <span style={{ color: C.gold }}>keerulised.</span>
          </h2>
          <p style={{ fontSize: "1rem", fontWeight: 300, color: C.dim, marginBottom: 52, lineHeight: 1.8 }}>
            We win because we turn law into infrastructure.
          </p>
          <a href="mailto:info@legatron.ai" style={{ display: "inline-block", background: C.white, color: C.bg, fontSize: "0.875rem", fontWeight: 600, padding: "14px 34px", borderRadius: 12, textDecoration: "none", marginBottom: 88 }}>
            info@legatron.ai
          </a>
          <div style={{ height: 1, background: C.border, marginBottom: 28 }} />
          <p style={{ ...LBL }}>© 2024 Legatron · Investor-taseme dokument · Konfidentsiaalne</p>
        </div>
      </section>

    </div>
  );
}
