"use client";
import { useState } from "react";

/* ── Design tokens ────────────────────────────── */
const INK    = "#111111";
const MUTED  = "#888888";
const RULE   = "#E8E8E5";
const ACCENT = "#B8750A";   /* amber - used sparingly */

/* ── Micro-components ─────────────────────────── */
function Tag({ n, label }: { n: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 32 }}>
      <span style={{ fontSize: 11, color: MUTED, letterSpacing: "0.14em", fontWeight: 400 }}>{n}</span>
      <span style={{ fontSize: 11, color: MUTED, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 400 }}>{label}</span>
    </div>
  );
}

function H({ children, size = "2.2rem" }: { children: React.ReactNode; size?: string }) {
  return (
    <h2 style={{ fontSize: `clamp(1.6rem, 2.5vw, ${size})`, color: INK, lineHeight: 1.2, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 24 }}>
      {children}
    </h2>
  );
}

function P({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <p style={{ fontSize: "0.9375rem", color: muted ? MUTED : "#333333", lineHeight: 1.85, marginBottom: 18 }}>
      {children}
    </p>
  );
}

function HR() {
  return <div style={{ borderTop: `1px solid ${RULE}`, margin: "80px 0" }} />;
}

function List({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: 14, fontSize: "0.9rem", color: "#333", lineHeight: 1.7 }}>
          <span style={{ color: ACCENT, flexShrink: 0, marginTop: "0.15em", fontSize: "0.75rem" }}>◆</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
      {children}
    </div>
  );
}

function Box({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div style={{
      padding: "24px 28px",
      border: `1px solid ${accent ? "rgba(184,117,10,0.3)" : RULE}`,
      background: accent ? "rgba(184,117,10,0.03)" : "#FFFFFF",
      borderRadius: 4,
    }}>
      {children}
    </div>
  );
}

/* Clean data table */
function DataTable({ cols, rows }: { cols: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: `2px solid ${INK}` }}>
          {cols.map((c, i) => (
            <th key={i} style={{ textAlign: "left", padding: "0 0 10px", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, paddingRight: i < cols.length - 1 ? 24 : 0 }}>
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} style={{ borderBottom: `1px solid ${RULE}` }}>
            {row.map((cell, ci) => (
              <td key={ci} style={{ padding: "13px 0", paddingRight: ci < row.length - 1 ? 24 : 0, fontSize: "0.875rem", color: ci === 0 ? "#333" : INK, lineHeight: 1.55, verticalAlign: "top" }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* FAQ accordion */
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ borderBottom: `1px solid ${RULE}`, padding: "18px 0", cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "flex-start" }}>
        <span style={{ fontSize: "0.9375rem", color: INK, fontWeight: 400 }}>{q}</span>
        <span style={{ color: MUTED, flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none", display: "block", lineHeight: 1, fontSize: "1.1rem", marginTop: 1 }}>+</span>
      </div>
      {open && <p style={{ marginTop: 14, fontSize: "0.875rem", color: MUTED, lineHeight: 1.85 }}>{a}</p>}
    </div>
  );
}

/* ── Page wrapper ─────────────────────────────── */
const WRAP = { maxWidth: 1040, margin: "0 auto", padding: "0 40px" };

/* ── Logo (two overlapping squares) ──────────── */
function Logo({ s = 28 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
      <rect x="1" y="1" width="12" height="12" fill={INK} />
      <rect x="15" y="15" width="12" height="12" fill={ACCENT} />
    </svg>
  );
}

/* ══════════════════════════════════════════════ */
export default function Page() {
  return (
    <div style={{ background: "#FAFAF8" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(250,250,248,0.94)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${RULE}`,
      }}>
        <div style={{ ...WRAP, height: 54, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Logo s={20} />
            <span style={{ fontSize: "0.9rem", fontWeight: 500, color: INK, letterSpacing: "-0.01em" }}>Legatron</span>
          </div>
          <div style={{ display: "flex", gap: 36 }}>
            {["Lahendus", "Turg", "Toode", "Hinnad", "Visioon"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: "0.8rem", color: MUTED, textDecoration: "none", letterSpacing: "0.01em" }}>{l}</a>
            ))}
          </div>
          <a href="mailto:info@legatron.ai" style={{ fontSize: "0.8rem", fontWeight: 500, color: INK, textDecoration: "none", borderBottom: `1px solid ${INK}`, paddingBottom: 1 }}>
            info@legatron.ai
          </a>
        </div>
      </nav>

      {/* ═══ HERO ═══════════════════════════════ */}
      <section style={{ paddingTop: 140, paddingBottom: 100 }}>
        <div style={WRAP}>

          <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, fontWeight: 400, marginBottom: 56 }}>
            Legatron · Strateegiline ariplaan · 2024
          </p>

          <h1 style={{ fontSize: "clamp(3rem, 6.5vw, 5.5rem)", color: INK, lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 500, maxWidth: 820, marginBottom: 36 }}>
            Muudame seadused{" "}
            <span style={{ fontStyle: "italic", color: ACCENT }}>infrastruktuuriks.</span>
          </h1>

          <p style={{ fontSize: "1.1rem", color: MUTED, lineHeight: 1.8, maxWidth: 520, marginBottom: 52, fontWeight: 300 }}>
            AI-põhine platvorm, mis teeb oiguse ligipääsetavaks igale inimesele ja
            ettevotele - kiiremini, odavamalt ja täpsemini kui ükski jurist suudaks.
          </p>

          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a href="#lahendus" style={{
              display: "inline-block", background: INK, color: "#FAFAF8",
              fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.04em",
              padding: "11px 24px", borderRadius: 3, textDecoration: "none",
            }}>
              Vaata ariplaan
            </a>
            <a href="#kkk" style={{ fontSize: "0.8rem", color: MUTED, textDecoration: "none" }}>
              Investori KKK →
            </a>
          </div>

          {/* 3 numbrit */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", marginTop: 96, paddingTop: 40, borderTop: `1px solid ${RULE}`, gap: 40 }}>
            {[
              { n: "€300 mld", l: "Euroopa juriidiliste teenuste turg aastas" },
              { n: "10×", l: "odavam ja kiirem kui traditsiooniline jurist" },
              { n: "50+", l: "riiki plaanitud kaetuse alla 2030. aastaks" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: "2.8rem", fontWeight: 500, letterSpacing: "-0.03em", color: ACCENT, lineHeight: 1, marginBottom: 8 }}>{s.n}</div>
                <div style={{ fontSize: "0.82rem", color: MUTED, lineHeight: 1.55 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MISSIOON ════════════════════════════ */}
      <section id="missioon" style={{ background: "#FFFFFF", paddingTop: 88, paddingBottom: 88, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
        <div style={WRAP}>
          <Tag n="01" label="Missioon" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <H>Miks maailm vajab Legatroni?</H>
              <P muted>
                Tänapäeva oigussüsteem on üles ehitatud asjatundjate jaoks, mitte tavaliste
                inimeste jaoks. Seadused on keerulised, aeglased ja kallid mõista.
              </P>
              <P muted>
                Väikeettevotja, kes soovib teada, kas ta võib töötajat koondada, peab maksma
                juristile 150-400 € tunni kohta - ja ootama päevi vastust, mis on vaja juba
                täna. Eraisik, kes sõlmib lepingut, ei tea sageli, millised riskid see endas peidab.
              </P>
              <P muted>
                Legatron lahendab selle probleemi: AI-põhine platvorm, mis struktureerib
                seadused, kohtulahendid ja oigusnormid ning muudab need otsinguga
                kasutatavaks sekunditega.
              </P>
            </div>

            <div>
              <Box accent>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: ACCENT, marginBottom: 12 }}>Ühe lause missioon</p>
                <p style={{ fontSize: "1rem", color: INK, lineHeight: 1.7 }}>
                  Muuta seadused arusaadavaks ja koheselt kasutatavaks igale inimesele ja
                  ettevotele - kiiremini, odavamalt ja täpsemini kui ükski jurist suudaks.
                </p>
              </Box>

              <div style={{ marginTop: 32 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 16 }}>
                  Mida kaotaks maailm ilma Legatronita
                </p>
                <List items={[
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

      {/* ═══ KONKURENTSIEELIS ════════════════════ */}
      <section id="lahendus" style={{ paddingTop: 88, paddingBottom: 88 }}>
        <div style={WRAP}>
          <Tag n="02" label="Konkurentsieelis" />
          <H>10× parem kui praegune alternatiiv</H>

          <div style={{ marginBottom: 56 }}>
            <Box accent>
              <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>Pohihüpotees - mida teised ei näe</p>
              <p style={{ fontSize: "0.9375rem", color: "#333", lineHeight: 1.8 }}>
                Seadus ise ei ole probleem - probleem on selle ligipääsetavus. Kui seadused
                struktureerida oigesti ning ühendada erineva taseme AI-mudelitega, saab
                oigusest reaalajas kasutatav infrastruktuur, nagu on internet ühenduvuse jaoks.
              </p>
            </Box>
          </div>

          <Grid2>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>
                Võrdlus - jurist vs Legatron
              </p>
              <DataTable
                cols={["", "Jurist", "Legatron"]}
                rows={[
                  ["Hind", "150-400 € / tund", <span style={{ color: ACCENT, fontWeight: 500 }}>alates 29 € / küsimus</span>],
                  ["Vastusekiirus", "1-5 tööpäeva", <span style={{ color: ACCENT, fontWeight: 500 }}>sekunditega</span>],
                  ["Kättesaadavus", "tööajal", <span style={{ color: ACCENT, fontWeight: 500 }}>24/7</span>],
                  ["Kvaliteet", "kogemus varieerub", <span style={{ color: ACCENT, fontWeight: 500 }}>konsistentne</span>],
                  ["Mastaap", "ei skaleeru", <span style={{ color: ACCENT, fontWeight: 500 }}>miljonid küsimused</span>],
                ]}
              />
            </div>

            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>
                Praegune seis
              </p>
              <DataTable
                cols={["Valdkond", "Seis"]}
                rows={[
                  ["Eesti oiguse struktureerimine", "Aktiivne töö, peamised seadused kaetud"],
                  ["AI-põhine seaduse otsing", "MVP käivitamiseks valmis"],
                  ["Juristi valideeritud vastused", "Koostöö toimib, protsess paika pandud"],
                  ["Riigikohtu lahendite analüüs", "Integratsioon arenduses"],
                ]}
              />
            </div>
          </Grid2>

          <div style={{ marginTop: 56 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 24 }}>
              Meid on raske kopeerida - 4 omavahel põimunud komponenti
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: `1px solid ${RULE}`, borderRadius: 4, overflow: "hidden" }}>
              {[
                { n: "01", t: "Struktureeritud andmebaas", d: "Aastatepikkune töö seaduste, kohtulahendite ja regulatsioonide kategoriseerimiseks riigi- ja valdkonnapõhiselt." },
                { n: "02", t: "Juristi valideeritud sisu", d: "Iga oiguslik väide on inimekspert üle kontrollinud - täpsust, mida puhta AI-genereeritud sisu korral ei saavutata." },
                { n: "03", t: "Riigipõhine AI treening", d: "Mudel treenitud konkreetse riigi oiguslikule kontekstile - tunduvalt parem täpsus kui üldmudelitel." },
                { n: "04", t: "Interdistsiplinaarne tiim", d: "Juristi ja arendaja tihe koostöö - keda on aastatega keeruline järgi jäljendada." },
              ].map((m, i) => (
                <div key={i} style={{ padding: "24px 20px", background: "#FFFFFF", borderLeft: i > 0 ? `1px solid ${RULE}` : "none" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 500, color: RULE, marginBottom: 14, lineHeight: 1, letterSpacing: "-0.02em" }}>{m.n}</div>
                  <p style={{ fontSize: "0.83rem", fontWeight: 500, color: INK, marginBottom: 8 }}>{m.t}</p>
                  <p style={{ fontSize: "0.8rem", color: MUTED, lineHeight: 1.65 }}>{m.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TURG ════════════════════════════════ */}
      <section id="turg" style={{ background: "#FFFFFF", paddingTop: 88, paddingBottom: 88, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
        <div style={WRAP}>
          <Tag n="03" label="Turg" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginBottom: 56 }}>
            <div>
              <H>Suur turg, selge tee sisse</H>
              <P muted>
                Euroopa juriidiliste teenuste turg on hinnanguliselt üle 300 miljardi euro
                aastas. Isegi 0,1% selle turust tähendab 300 mln € käivet. LegalTech kui
                AI vertikaali kasvutempo ületab üldist SaaS-i kasvu märkimisväärselt.
              </P>
              <P muted>
                Siseneme Eestist - kiire iteratsioon, digitaalne ühiskond, avalik
                seaduste andmestik. Seejärel Baltikum, Euroopa, globaalne.
              </P>
            </div>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>Sihtgrupid</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { t: "Eraisik", s: "Projektipõhine kasutus", d: "Vajab vastust konkreetsele küsimusele - üürileping, tööoigus, tarbijakaitse, pärimisõigus. Kiire, täpne, taskukohane." },
                  { t: "Väike ja Keskmine Ettevote", s: "Igapäevane oiguslik tugi", d: "Töölepingud, kliendisuhted, regulatsioonid, vastutus. Korduvad küsimused kiirelt, ilma juristi ooteajata." },
                ].map((sg, i) => (
                  <Box key={i}>
                    <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 6 }}>{sg.s}</p>
                    <p style={{ fontSize: "0.875rem", fontWeight: 500, color: INK, marginBottom: 8 }}>{sg.t}</p>
                    <p style={{ fontSize: "0.82rem", color: MUTED, lineHeight: 1.65 }}>{sg.d}</p>
                  </Box>
                ))}
              </div>
            </div>
          </div>

          <Grid2>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>Suurimad valupunktid</p>
              <List items={[
                "Ei teata, mida seadus täpselt lubab või keelab - eriti uute regulatsioonide korral",
                "Juristile helistamine on kallis, aeglane ja tundub üleliigne väikese küsimuse jaoks",
                "Vastus tuleb liiga aeglaselt - otsus tuleb teha täna, mitte nädala pärast",
                "Puudub usaldusväärne ja taskukohane allikas, kust kontrollida",
              ]} />
            </div>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>Turu laienemine</p>
              <DataTable
                cols={["Faas", "Fookus"]}
                rows={[
                  [<span style={{ color: ACCENT, fontWeight: 500 }}>Faas 1 — 2024</span>, "Eesti MVP - kiire iteratsioon, digitaalne ühiskond"],
                  ["Faas 2 — 2025 Q1-Q2", "Baltikum - Läti ja Leedu, sarnane oiguslik struktuur"],
                  ["Faas 3 — 2025 Q3-Q4", "Euroopa - DE, FI, NL, selged andmestikud"],
                  ["Faas 4 — 2026+", "Globaalne laienemine, API ärimudel, Enterprise"],
                ]}
              />
            </div>
          </Grid2>
        </div>
      </section>

      {/* ═══ STRATEEGILISED VALIKUD ══════════════ */}
      <section id="strateegia" style={{ paddingTop: 88, paddingBottom: 88 }}>
        <div style={WRAP}>
          <Tag n="04" label="Strateegilised valikud" />
          <H>Mida teeme - ja mida mitte</H>

          <Grid2>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: ACCENT, marginBottom: 20 }}>Mida teeme ALATI</p>
              <List items={[
                "Anname vastustega alati seaduseviited - kasutaja peab saama iga väite taga oleva paragrahvi üles leida",
                "Hoiame seadused automaatselt ajakohased - süsteem uuendub koheselt, kui ametlikes andmestikes toimub muudatus",
                "Teeme juriidika lihtsaks - keel on selge, ilma ülemäärase juriidilise žargoonita",
              ]} />
            </div>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>Mida ei tee KUNAGI</p>
              <List items={[
                "Ei anna kontrollimata informatsiooni - kõik vastused on juristi valideeritud andmestiku põhjal",
                "Ei müü kasutaja andmeid - privaatsus on tingimusteta",
                "Ei tee anonüümset AI arvamust - iga vastus on seostatav konkreetse seaduseallikaga",
              ]} />
            </div>
          </Grid2>

          <div style={{ marginTop: 48 }}>
            <Box accent>
              <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: ACCENT, marginBottom: 12 }}>#1 Prioriteet sel aastal</p>
              <p style={{ fontSize: "1rem", color: INK, lineHeight: 1.7 }}>
                Ehitada kõige täpsem AI-põhine oiguse otsinguplatvorm Baltikumis - mida
                mõõdetakse vastuste täpsuse, kasutajate usalduse ja B2B klientide arvu järgi.
              </p>
            </Box>
          </div>

          <div style={{ marginTop: 48 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>Peamised kitsaskohad ja lahendused</p>
            <DataTable
              cols={["Kitsaskoht", "Lahendus"]}
              rows={[
                ["Oiguse andmete struktureerimine on aeganoudev", "Juristi-juhitud valideerimisprotsess koos AI abistamisega"],
                ["AI täpsus on kriitilise tähtsusega", "Pidev mudeli treenimine, A/B testimine, feedback loop"],
                ["Kasutajate usaldus uue platvormi vastu", "Läbipaistvus: allikad nähtavad, jurist tagab täpsuse"],
              ]}
            />
          </div>
        </div>
      </section>

      {/* ═══ TÄITMISSÜSTEEM ══════════════════════ */}
      <section id="taitmissusteem" style={{ background: "#FFFFFF", paddingTop: 88, paddingBottom: 88, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
        <div style={WRAP}>
          <Tag n="05" label="Täitmissüsteem" />
          <H>Eesmärgid ja vastutus</H>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, marginBottom: 56 }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>Kvartalieesmärgid 2024</p>
              <DataTable
                cols={["Kvartal", "Eesmärk"]}
                rows={[
                  [<span style={{ color: ACCENT }}>Q1</span>, "Eesti MVP launch - pohiseadused, Riigikohtu lahendid"],
                  ["Q2", "Baltikumi laienemine - Läti, Leedu, 3 B2B klienti"],
                  ["Q3", "Euroopa piloot - DE/FI/NL, API beetaversioon"],
                  ["Q4", "10 000 aktiivsed kasutajad, Enterprise klient"],
                ]}
              />
            </div>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>Igakuised vahe-eesmärgid</p>
              <DataTable
                cols={["Kuu", "Vahe-eesmärk"]}
                rows={[
                  [<span style={{ color: ACCENT }}>1</span>, "MVP launch, esimesed 100 kasutajat"],
                  ["2", "1 000 kasutajat, NPS mootmine (eesmärk: >50)"],
                  ["3", "B2B subscription müük, 3+ ettevote katseperioodil"],
                ]}
              />
            </div>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>Vastutusjaotus</p>
              <DataTable
                cols={["Roll", "Vastutusala"]}
                rows={[
                  ["CEO", "Kasv, partnerlused, investorisuhted"],
                  ["CTO", "AI mudel, toote arendus, andmestiku kvaliteet"],
                  ["Legal", "Oiguslik täpsus, valideerimisprotsess"],
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TOODE ═══════════════════════════════ */}
      <section id="toode" style={{ paddingTop: 88, paddingBottom: 88 }}>
        <div style={WRAP}>
          <Tag n="06" label="Toode" />
          <H>Toote teekond</H>

          <Box accent>
            <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>V1 — Launchitav MVP</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 40px" }}>
              {["Kõik Eesti kehtivad seadused", "Automaatne uuendus muudatuste korral", "Riigikohtu lahendid integreeritud", "AI-põhine otsing", "Seaduseviited iga vastuse juures", "Lihtne keeleline selgitus"].map((f, i) => (
                <span key={i} style={{ fontSize: "0.875rem", color: "#333", display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ color: ACCENT, fontSize: "0.65rem" }}>◆</span>{f}
                </span>
              ))}
            </div>
          </Box>

          <div style={{ marginTop: 40 }}>
            <DataTable
              cols={["Versioon", "Nimi", "Funktsionaalsus"]}
              rows={[
                [<span style={{ color: ACCENT }}>V1</span>, "MVP", "Eesti seadused + AI otsing + seaduseviited + lihtne selgitus"],
                ["V2", "Dokumendianalüüs", "Lepingute üleslaadimine, riskide tuvastamine, klauslite analüüs"],
                ["V3", "Lepingugeneraator", "Tööleping, NDA, teenusleping, osanike leping - täidetav mall"],
                ["V4", "Muudatuste jälgimine", "Ettevote profiil, automaatsed teavitused, riskimuutuse analüüs"],
                ["V5", "Rahvusvaheline", "Piiriülese äri toetamine: Eesti ettevote Slovakkias, startup Saksamaal"],
              ]}
            />
          </div>
        </div>
      </section>

      {/* ═══ HINNAD ══════════════════════════════ */}
      <section id="hinnad" style={{ background: "#FFFFFF", paddingTop: 88, paddingBottom: 88, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
        <div style={WRAP}>
          <Tag n="07" label="Ärimudel" />
          <H>Hinnakujundus</H>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 48 }}>
            {[
              { seg: "Eraisik", sub: "Projektipõhine", price: "€29", unit: "küsimus", items: ["Üks detailne vastus", "Seaduseviited ja kohtulahendid", "Praktilised järgmised sammud", "Üürileping, tööoigus, tarbijakaitse"], featured: false },
              { seg: "VKE", sub: "Subscription", price: "€49", unit: "kuu", items: ["Piiramatu arv küsimusi", "Kõik oigusvaldkonnad", "Dokumendianalüüs", "Lepingute eelkontroll", "Kuni 50 töötajaga ettevoted"], featured: true },
              { seg: "Premium", sub: "Ettevote", price: "€199", unit: "kuu", items: ["Kõik VKE eelised", "Lepingugeneraator", "Riskianalüüs soovitustega", "Prioriteetne tugi"], featured: false },
              { seg: "Enterprise", sub: "B2B Custom", price: "€1k-10k", unit: "kuu", items: ["API integratsioon", "SLA-garantiid", "Dedikeeritud kontroll", "Rahvusvaheline laienemine", "Pangad, kindlustus, korporatsioonid"], featured: false },
            ].map((p, i) => (
              <div key={i} style={{ border: `1px solid ${p.featured ? ACCENT : RULE}`, borderRadius: 4, padding: "24px 20px", background: p.featured ? "rgba(184,117,10,0.03)" : "#FAFAF8", position: "relative" }}>
                {p.featured && <div style={{ position: "absolute", top: -1, left: 20, right: 20, height: 2, background: ACCENT }} />}
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: p.featured ? ACCENT : MUTED, marginBottom: 4 }}>{p.sub}</p>
                <p style={{ fontSize: "0.8rem", fontWeight: 500, color: INK, marginBottom: 16 }}>{p.seg}</p>
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: "2.2rem", fontWeight: 500, letterSpacing: "-0.03em", color: p.featured ? ACCENT : INK, lineHeight: 1 }}>{p.price}</span>
                  <span style={{ fontSize: "0.78rem", color: MUTED, marginLeft: 5 }}>/ {p.unit}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, borderTop: `1px solid ${RULE}`, paddingTop: 16 }}>
                  {p.items.map((f, j) => (
                    <span key={j} style={{ fontSize: "0.78rem", color: MUTED, lineHeight: 1.5 }}>— {f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>Konkurentsihinnad võrreldes alternatiividega</p>
          <DataTable
            cols={["Teenus", "Ligikaudne kulu"]}
            rows={[
              ["Jurist (Eesti)", "150-400 € / tund, vastus 1-5 tööpäeva"],
              ["LegalTech platvormid (Legora, Harvey jt)", "Hinnad avalikult kättesaamatud, peamiselt EN-keelsed"],
              [<span style={{ color: ACCENT, fontWeight: 500 }}>Legatron VKE subscription</span>, "€49 / kuu - piiramatu kasutus, eestikeelne, seaduseviited"],
            ]}
          />
        </div>
      </section>

      {/* ═══ GLOBAALNE VISIOON ═══════════════════ */}
      <section id="visioon" style={{ paddingTop: 88, paddingBottom: 88 }}>
        <div style={WRAP}>
          <Tag n="08" label="Globaalne visioon" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginBottom: 56 }}>
            <div>
              <H>Oiguse infrastruktuur maailmale</H>
              <P muted>
                Legatron ei ehita lihtsalt tööriista. Pikaajaline visioon on saada maailma
                esimeseks riikideüleseks oiguse infrastruktuurisüsteemiks - süsteemiks,
                mille kaudu ettevotted ja eraisikud saavad teha kõik juriidilised otsused
                ükskõik millises riigis.
              </P>
              <Box accent>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: ACCENT, marginBottom: 10 }}>Visioon 2030</p>
                <p style={{ fontSize: "1rem", color: INK, lineHeight: 1.7 }}>
                  Legatron on maailma juhtiv AI-oiguse platvorm, mis katab üle 50 riigi
                  seadused ja töötleb miljoneid küsimusi päevas.
                </p>
              </Box>
            </div>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>Korratav laienemismudel</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { n: "1", t: "Siseneme riiki, kus on avalik ja struktureeritud seaduste andmestik" },
                  { n: "2", t: "Partnerlusjurist lokaalse oiguse valideerimiseks" },
                  { n: "3", t: "AI mudeli treenimine riigi-spetsiifilisele kontekstile" },
                  { n: "4", t: "Launch kohaliku meedia ja juriidikakogukonnaga" },
                  { n: "5", t: "Andmestiku pidev täiendamine seadusemuudatuste korral" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, padding: "14px 0", borderBottom: `1px solid ${RULE}`, alignItems: "flex-start" }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: 500, color: ACCENT, lineHeight: 1, flexShrink: 0, marginTop: 3 }}>{s.n}</span>
                    <span style={{ fontSize: "0.875rem", color: "#333", lineHeight: 1.65 }}>{s.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>Kasutusnäited rahvusvahelisel tasandil</p>
          <DataTable
            cols={["Stsenaarium", "Legatroni lahendus"]}
            rows={[
              ["Eesti ettevote soovib eksportida Slovakkiasse", "Maksueeskirjad, toodete regulatsioonid, lepingunouded - koheselt"],
              ["Eraisik reisib ja töötab Hispaanias", "Töötamine, elamisluba, tarbijaõigus - ühes kohas"],
              ["Startup asutab firma Saksamaal", "GmbH nouded, tööoigus, andmekaitse - struktureeritud ülevaade"],
              ["Pank kontrollib vastavust EL-i direktiivile", "Automaatne regulatsioonikaart, seadusemuudatuste jälgimine"],
            ]}
          />
        </div>
      </section>

      {/* ═══ KKK ═════════════════════════════════ */}
      <section id="kkk" style={{ background: "#FFFFFF", paddingTop: 88, paddingBottom: 88, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
        <div style={WRAP}>
          <Tag n="09" label="Investori KKK" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80 }}>
            <div>
              <H>Küsimused ja vastused</H>
              <P muted>
                Kõige sagedamini küsitavad küsimused investoritelt - strateegilised ja
                tootefookusega.
              </P>
            </div>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 4, borderBottom: `2px solid ${INK}`, paddingBottom: 10 }}>Investorite küsimused</p>
              {[
                { q: "Miks just nüüd?", a: "AI mudelite võimekus on 2023-2024 jooksul joudnud tasemele, kus struktureeritud oiguse andmestik koos keelemudeliga annab usaldusväärseid ja viidatavaid vastuseid. Varem polnud täpsus piisav, et turule minna vastutustundlikult." },
                { q: "Miks alustada Eestist?", a: "Eesti on väike (1,4 mln), kõrgelt digitaliseeritud ja omab selget ning avalikult kättesaadavat seaduste andmebaasi (Riigi Teataja). See võimaldab kiiresti itereerida ja mudeli täpsust tõestada enne laiemat sisenemist." },
                { q: "Kui suureks saab see kasvada?", a: "Euroopa juriidiliste teenuste turg on hinnanguliselt üle 300 miljardi euro aastas. Isegi 0,1% sellest turust tähendab 300 mln € käivet. LegalTech kui AI vertikaali kasvutempo ületab üldist SaaS-i kasvu märkimisväärselt." },
                { q: "Mis takistab konkurente?", a: "Struktureeritud ja juristi-valideeritud riigipõhine andmestik on aastatepikkune töö. Üldised AI mudelid (ChatGPT jt) ei suuda seda asendada - neil puudub täpsus, viited ja lokaalne kontekst. Varajane positsioon loob võrgustikeefekti." },
                { q: "Kuidas skaaleerimine rahvusvaheliselt toimib?", a: "Iga riik on eraldi moodul: seadused - lokaliseerimine - AI treenimine - launch. Mudel on korratav. Pärast kolme esimest riiki on protsess automatiseeritud ja kiiremat laienemist toetab API ärimudel." },
              ].map((item, i) => <FAQ key={i} q={item.q} a={item.a} />)}

              <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginTop: 32, marginBottom: 4, borderBottom: `2px solid ${INK}`, paddingBottom: 10 }}>Strateegilised küsimused</p>
              {[
                { q: "Kas seadused saavad API-ks?", a: "Jah. V3-V4 ajaks pakume API-t, mille kaudu ettevotted saavad oma rakendustes pärida konkreetseid seaduseviiteid, regulatiivseid noueid ja riskihinnanguid. See avab uue B2B tuluvoo." },
                { q: "Kas Legatron võib olla oiguse operatsioonisüsteem?", a: "See on meie pikaajaline visioon. Ettevotted teevad kõik juriidilised otsused - lepingud, riskianalüüsid, regulatsioonikontroll - Legatroni kaudu, ilma et neil oleks vaja juristi kaasata rutiinsetes küsimustes." },
                { q: "Kas Legatron automatiseerib juriidikat?", a: "Osaliselt - jah. Rutiinsed tööd nagu lepingute koostamine, riskikontroll ja regulatsioonide jälgimine automatiseeritakse täielikult. Keeruline noustamine ja kohtuasi jäävad inimjuristi pärusmaaks." },
                { q: "Kas oigus on järgmine suur AI vertikaali?", a: "Koos tervishoiu, finantsteenuste ja haridusega on oigus üks maailma suurimaid ja kõrgeima väärtusega teenussektoreid. Erinevalt paljudest muudest sektoritest on seadusandlik andmestik avalik ja struktureeritud, mis muudab AI rakendamise kiiremaks." },
              ].map((item, i) => <FAQ key={i} q={item.q} a={item.a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NARRATIIV / CTA ═════════════════════ */}
      <section style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div style={{ ...WRAP, textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 500, letterSpacing: "-0.03em", color: INK, lineHeight: 1.1, marginBottom: 24, maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
            Seadused ei pea olema{" "}
            <span style={{ color: ACCENT }}>keerulised.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: MUTED, marginBottom: 12, lineHeight: 1.7 }}>
            Legatron muudab need arusaadavaks.
          </p>
          <p style={{ fontSize: "0.875rem", color: MUTED, marginBottom: 56 }}>
            We win because we turn law into infrastructure.
          </p>

          <a href="mailto:info@legatron.ai" style={{
            display: "inline-block", background: INK, color: "#FAFAF8",
            fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.04em",
            padding: "14px 32px", borderRadius: 3, textDecoration: "none", marginBottom: 60,
          }}>
            info@legatron.ai
          </a>

          <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 28, fontSize: 11, color: "#BBBBBB", letterSpacing: "0.08em" }}>
            © 2024 Legatron · Investor-taseme dokument · Konfidentsiaalne
          </div>
        </div>
      </section>

    </div>
  );
}
