"use client";
import { useState } from "react";

/* ── Tokens ─────────────────────────────── */
const INK    = "#0F0F0F";
const MUTED  = "#909090";
const SOFT   = "#C8C8C8";   /* very light text */
const RULE   = "#EBEBEB";
const ACCENT = "#B8750A";
const OFF    = "#F9F8F6";
const WHITE  = "#FFFFFF";

const WRAP: React.CSSProperties = { maxWidth: 1040, margin: "0 auto", padding: "0 48px" };
const SEC  = (bg: string): React.CSSProperties => ({ background: bg, padding: "96px 0" });
const SPLIT: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" };
const LBL: React.CSSProperties  = { fontSize: 11, fontWeight: 400, letterSpacing: "0.13em", textTransform: "uppercase", color: MUTED, marginBottom: 14 };

/* ── Primitives ─────────────────────────── */
function Tag({ n, label }: { n: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
      <span style={{ fontSize: "2.5rem", fontWeight: 500, letterSpacing: "-0.04em", color: RULE, lineHeight: 1 }}>{n}</span>
      <span style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.13em", textTransform: "uppercase", color: MUTED }}>{label}</span>
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.1rem)", fontWeight: 500, letterSpacing: "-0.025em", color: INK, lineHeight: 1.2, marginBottom: 28 }}>
      {children}
    </h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "0.9375rem", fontWeight: 300, color: "#444444", lineHeight: 1.85, marginBottom: 16 }}>
      {children}
    </p>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 12, fontSize: "0.875rem", fontWeight: 300, color: "#444444", lineHeight: 1.7 }}>
          <span style={{ color: ACCENT, flexShrink: 0, marginTop: "0.2em", fontSize: "0.55rem" }}>◆</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

/* Accent call-out with left border */
function Callout({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: `3px solid ${ACCENT}`, paddingLeft: 20, paddingTop: 4, paddingBottom: 4 }}>
      {label && <p style={{ ...LBL, color: ACCENT, marginBottom: 10 }}>{label}</p>}
      {children}
    </div>
  );
}

/* Subtle content box */
function Card({ children, tinted }: { children: React.ReactNode; tinted?: boolean }) {
  return (
    <div style={{ background: tinted ? "rgba(184,117,10,0.04)" : WHITE, border: `1px solid ${RULE}`, borderRadius: 8, padding: "20px 22px" }}>
      {children}
    </div>
  );
}

/* Table always in a box */
function Table({ cols, rows, widths }: { cols: string[]; rows: (string | React.ReactNode)[][]; widths?: string[] }) {
  return (
    <div style={{ border: `1px solid ${RULE}`, borderRadius: 8, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: OFF }}>
            {cols.map((c, i) => (
              <th key={i} style={{ ...LBL, marginBottom: 0, textAlign: "left", padding: "11px 18px", borderBottom: `1px solid ${RULE}`, width: widths?.[i] }}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? WHITE : "rgba(249,248,246,0.6)" }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ fontSize: "0.875rem", fontWeight: 300, color: "#333333", lineHeight: 1.6, padding: "11px 18px", borderBottom: ri < rows.length - 1 ? `1px solid ${RULE}` : "none", verticalAlign: "top" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ padding: "15px 0", borderBottom: `1px solid ${RULE}`, cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "flex-start" }}>
        <span style={{ fontSize: "0.9rem", fontWeight: 400, color: INK, lineHeight: 1.5 }}>{q}</span>
        <span style={{ color: SOFT, flexShrink: 0, fontSize: "1rem", lineHeight: 1, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none", display: "block", marginTop: 2 }}>+</span>
      </div>
      {open && <p style={{ marginTop: 10, fontSize: "0.875rem", fontWeight: 300, color: MUTED, lineHeight: 1.85 }}>{a}</p>}
    </div>
  );
}

function Logo({ s = 18 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="7" height="7" fill={INK} />
      <rect x="10" y="10" width="7" height="7" fill={ACCENT} />
    </svg>
  );
}

/* ══════════════════════════════════════════ */
export default function Page() {
  return (
    <div style={{ background: OFF, color: INK }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(249,248,246,0.96)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${RULE}` }}>
        <div style={{ ...WRAP, height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <Logo />
            <span style={{ fontSize: "0.875rem", fontWeight: 500, color: INK }}>Legatron</span>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            {["Lahendus", "Turg", "Toode", "Hinnad", "Visioon", "KKK"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: "0.8rem", fontWeight: 300, color: MUTED, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <a href="mailto:info@legatron.ai" style={{ fontSize: "0.8rem", fontWeight: 500, color: INK, textDecoration: "none", borderBottom: `1px solid ${INK}`, paddingBottom: 1 }}>
            info@legatron.ai
          </a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────── */}
      <section style={{ padding: "144px 0 96px" }}>
        <div style={WRAP}>
          <p style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", color: SOFT, marginBottom: 52 }}>
            Legatron · Strateegiline ariplaan · 2024
          </p>

          <h1 style={{ fontSize: "clamp(3rem, 6vw, 5.4rem)", fontWeight: 500, letterSpacing: "-0.03em", color: INK, lineHeight: 1.04, maxWidth: 780, marginBottom: 28 }}>
            Muudame seadused{" "}
            <span style={{ color: ACCENT }}>infrastruktuuriks.</span>
          </h1>

          <p style={{ fontSize: "1.05rem", fontWeight: 300, color: MUTED, lineHeight: 1.8, maxWidth: 460, marginBottom: 44 }}>
            AI-põhine platvorm, mis teeb oiguse ligipääsetavaks igale inimesele ja
            ettevotele - kiiremini, odavamalt ja täpsemini kui ükski jurist suudaks.
          </p>

          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a href="#missioon" style={{ background: INK, color: OFF, fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.05em", padding: "10px 22px", borderRadius: 4, textDecoration: "none" }}>
              Vaata ariplaan
            </a>
            <a href="#kkk" style={{ fontSize: "0.8rem", fontWeight: 300, color: MUTED, textDecoration: "none" }}>
              Investori KKK →
            </a>
          </div>

          {/* Võtmenumbrid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, marginTop: 80 }}>
            {[
              { n: "€300 mld", l: "Euroopa juriidiliste teenuste turg aastas" },
              { n: "10×",      l: "odavam ja kiirem kui traditsiooniline jurist" },
              { n: "50+",      l: "riiki plaanitud kaetuse alla 2030. aastaks" },
            ].map((s, i) => (
              <div key={i} style={{ paddingTop: 32, paddingRight: 40, borderTop: `2px solid ${i === 0 ? ACCENT : RULE}` }}>
                <div style={{ fontSize: "2.8rem", fontWeight: 500, letterSpacing: "-0.03em", color: i === 0 ? ACCENT : INK, lineHeight: 1, marginBottom: 8 }}>{s.n}</div>
                <div style={{ fontSize: "0.82rem", fontWeight: 300, color: MUTED, lineHeight: 1.55 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 01 MISSIOON ──────────────────────── */}
      <section id="missioon" style={SEC(WHITE)}>
        <div style={WRAP}>
          <Tag n="01" label="Missioon" />
          <div style={SPLIT}>
            <div>
              <H2>Miks maailm vajab Legatroni?</H2>
              <Body>
                Tänapäeva oigussüsteem on üles ehitatud asjatundjate jaoks, mitte tavaliste
                inimeste jaoks. Väikeettevotja, kes soovib teada, kas ta võib töötajat
                koondada, peab maksma juristile 150-400 € tunni kohta - ja ootama päevi
                vastust, mis on vaja juba täna.
              </Body>
              <Body>
                Eraisik, kes sõlmib lepingut, ei tea sageli, millised riskid see endas peidab.
                Legatron struktureerib seadused, kohtulahendid ja oigusnormid ning muudab
                need otsinguga kasutatavaks sekunditega.
              </Body>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <Callout label="Ühe lause missioon">
                <p style={{ fontSize: "0.9375rem", fontWeight: 400, color: INK, lineHeight: 1.75 }}>
                  Muuta seadused arusaadavaks ja koheselt kasutatavaks igale inimesele ja
                  ettevotele - kiiremini, odavamalt ja täpsemini kui ükski jurist suudaks.
                </p>
              </Callout>
              <div>
                <p style={LBL}>Mida kaotaks maailm ilma Legatronita</p>
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

      {/* ── 02 KONKURENTSIEELIS ──────────────── */}
      <section id="lahendus" style={SEC(OFF)}>
        <div style={WRAP}>
          <Tag n="02" label="Konkurentsieelis" />
          <H2>10× parem kui praegune alternatiiv</H2>

          <Callout label="Pohihüpotees - mida teised ei näe">
            <p style={{ fontSize: "0.9375rem", fontWeight: 300, color: "#444444", lineHeight: 1.85 }}>
              Seadus ise ei ole probleem - probleem on selle ligipääsetavus. Kui seadused
              struktureerida oigesti ning ühendada erineva taseme AI-mudelitega, saab
              oigusest reaalajas kasutatav infrastruktuur, nagu on internet ühenduvuse jaoks.
            </p>
          </Callout>

          <div style={{ ...SPLIT, marginTop: 48 }}>
            <div>
              <p style={LBL}>Võrdlus - jurist vs Legatron</p>
              <Table
                cols={["", "Jurist", "Legatron"]}
                widths={["35%", "30%", "35%"]}
                rows={[
                  ["Hind",          "150-400 € / tund",  <span style={{ color: ACCENT, fontWeight: 400 }}>alates 29 € / küsimus</span>],
                  ["Vastusekiirus", "1-5 tööpäeva",      <span style={{ color: ACCENT, fontWeight: 400 }}>sekunditega</span>],
                  ["Kättesaadavus", "tööajal",           <span style={{ color: ACCENT, fontWeight: 400 }}>24/7</span>],
                  ["Kvaliteet",     "varieerub",         <span style={{ color: ACCENT, fontWeight: 400 }}>konsistentne</span>],
                  ["Mastaap",       "ei skaleeru",       <span style={{ color: ACCENT, fontWeight: 400 }}>miljonid küsimused</span>],
                ]}
              />
            </div>
            <div>
              <p style={LBL}>Praegune seis</p>
              <Table
                cols={["Valdkond", "Seis"]}
                rows={[
                  ["Eesti oiguse struktureerimine", "Aktiivne töö, peamised seadused kaetud"],
                  ["AI-põhine seaduse otsing",      "MVP käivitamiseks valmis"],
                  ["Juristi valideeritud vastused",  "Koostöö toimib, protsess paika pandud"],
                  ["Riigikohtu lahendite analüüs",  "Integratsioon arenduses"],
                ]}
              />
            </div>
          </div>

          <div style={{ marginTop: 48 }}>
            <p style={LBL}>Meid on raske kopeerida</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[
                { n: "01", t: "Struktureeritud andmebaas",  d: "Aastatepikkune töö seaduste, kohtulahendite ja regulatsioonide kategoriseerimiseks riigi- ja valdkonnapõhiselt." },
                { n: "02", t: "Juristi valideeritud sisu",  d: "Iga oiguslik väide on inimekspert üle kontrollinud - täpsust, mida puhta AI-genereeritud sisu korral ei saavutata." },
                { n: "03", t: "Riigipõhine AI treening",    d: "Mudel treenitud konkreetse riigi oiguslikule kontekstile - tunduvalt parem täpsus kui üldmudelitel." },
                { n: "04", t: "Interdistsiplinaarne tiim",  d: "Juristi ja arendaja tihe koostöö - kombinatsioon, keda on aastatega keeruline järgi jäljendada." },
              ].map((m, i) => (
                <Card key={i}>
                  <p style={{ fontSize: "1.2rem", fontWeight: 500, letterSpacing: "-0.02em", color: RULE, lineHeight: 1, marginBottom: 14 }}>{m.n}</p>
                  <p style={{ fontSize: "0.82rem", fontWeight: 500, color: INK, marginBottom: 8 }}>{m.t}</p>
                  <p style={{ fontSize: "0.8rem", fontWeight: 300, color: MUTED, lineHeight: 1.65 }}>{m.d}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 TURG ──────────────────────────── */}
      <section id="turg" style={SEC(WHITE)}>
        <div style={WRAP}>
          <Tag n="03" label="Turg" />
          <div style={SPLIT}>
            <div>
              <H2>Suur turg, selge tee sisse</H2>
              <Body>
                Euroopa juriidiliste teenuste turg on hinnanguliselt üle 300 miljardi euro
                aastas. Isegi 0,1% sellest turust tähendab 300 mln € käivet. LegalTech kui
                AI vertikaali kasvutempo ületab üldist SaaS-i kasvu märkimisväärselt.
              </Body>
              <Body>
                Siseneme Eestist - kiire iteratsioon, digitaalne ühiskond, avalik seaduste
                andmestik. Seejärel Baltikum, Euroopa, globaalne.
              </Body>
            </div>
            <div>
              <p style={LBL}>Sihtgrupid</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { t: "Eraisik",                    s: "Projektipõhine kasutus",   d: "Vajab vastust konkreetsele küsimusele - üürileping, tööoigus, tarbijakaitse. Kiire, täpne, taskukohane." },
                  { t: "Väike ja Keskmine Ettevote", s: "Igapäevane oiguslik tugi", d: "Töölepingud, kliendisuhted, regulatsioonid. Korduvad küsimused kiirelt, ilma juristi ooteajata." },
                ].map((sg, i) => (
                  <Card key={i}>
                    <p style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: 4 }}>{sg.s}</p>
                    <p style={{ fontSize: "0.875rem", fontWeight: 500, color: INK, marginBottom: 6 }}>{sg.t}</p>
                    <p style={{ fontSize: "0.82rem", fontWeight: 300, color: MUTED, lineHeight: 1.65 }}>{sg.d}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div style={{ ...SPLIT, marginTop: 48 }}>
            <div>
              <p style={LBL}>Suurimad valupunktid</p>
              <List items={[
                "Ei teata, mida seadus täpselt lubab või keelab - eriti uute regulatsioonide korral",
                "Juristile helistamine on kallis, aeglane ja tundub üleliigne väikese küsimuse jaoks",
                "Vastus tuleb liiga aeglaselt - otsus tuleb teha täna, mitte nädala pärast",
                "Puudub usaldusväärne ja taskukohane allikas, kust kontrollida",
              ]} />
            </div>
            <div>
              <p style={LBL}>Turu laienemine</p>
              <Table
                cols={["Faas", "Fookus"]}
                rows={[
                  [<span style={{ color: ACCENT }}>Faas 1 — 2024</span>,      "Eesti MVP - digitaalne ühiskond, avalik andmestik"],
                  ["Faas 2 — 2025 Q1-Q2",                                      "Baltikum - Läti ja Leedu, sarnane oiguslik struktuur"],
                  ["Faas 3 — 2025 Q3-Q4",                                      "Euroopa - DE, FI, NL, selged andmestikud"],
                  ["Faas 4 — 2026+",                                            "Globaalne laienemine, API ärimudel, Enterprise"],
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 STRATEEGIA ────────────────────── */}
      <section id="strateegia" style={SEC(OFF)}>
        <div style={WRAP}>
          <Tag n="04" label="Strateegilised valikud" />
          <H2>Mida teeme - ja mida mitte</H2>

          <div style={SPLIT}>
            <div>
              <p style={{ ...LBL, color: ACCENT }}>Mida teeme ALATI</p>
              <List items={[
                "Anname vastustega alati seaduseviited - kasutaja peab saama iga väite taga oleva paragrahvi üles leida",
                "Hoiame seadused automaatselt ajakohased - süsteem uuendub koheselt, kui ametlikes andmestikes toimub muudatus",
                "Teeme juriidika lihtsaks - keel on selge, ilma ülemäärase juriidilise žargoonita",
              ]} />
            </div>
            <div>
              <p style={LBL}>Mida ei tee KUNAGI</p>
              <List items={[
                "Ei anna kontrollimata informatsiooni - kõik vastused on juristi valideeritud andmestiku põhjal",
                "Ei müü kasutaja andmeid - privaatsus on tingimusteta",
                "Ei tee anonüümset AI arvamust - iga vastus on seostatav konkreetse seaduseallikaga",
              ]} />
            </div>
          </div>

          <div style={{ marginTop: 48 }}>
            <Callout label="#1 Prioriteet sel aastal">
              <p style={{ fontSize: "0.9375rem", fontWeight: 400, color: INK, lineHeight: 1.75 }}>
                Ehitada kõige täpsem AI-põhine oiguse otsinguplatvorm Baltikumis - mida
                mõõdetakse vastuste täpsuse, kasutajate usalduse ja B2B klientide arvu järgi.
              </p>
            </Callout>
          </div>

          <div style={{ marginTop: 48 }}>
            <p style={LBL}>Peamised kitsaskohad ja lahendused</p>
            <Table
              cols={["Kitsaskoht", "Lahendus"]}
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
      <section id="taitmissusteem" style={SEC(WHITE)}>
        <div style={WRAP}>
          <Tag n="05" label="Täitmissüsteem" />
          <H2>Eesmärgid ja vastutus</H2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            <div>
              <p style={LBL}>Kvartalieesmärgid 2024</p>
              <Table
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
              <p style={LBL}>Igakuised vahe-eesmärgid</p>
              <Table
                cols={["Kuu", "Vahe-eesmärk"]}
                rows={[
                  [<span style={{ color: ACCENT }}>1</span>, "MVP launch, Eesti seadused, 100 kasutajat"],
                  ["2", "1 000 kasutajat, NPS mootmine (eesmärk: >50)"],
                  ["3", "B2B subscription müük, 3+ ettevote katseperioodil"],
                ]}
              />
            </div>
            <div>
              <p style={LBL}>Vastutusjaotus</p>
              <Table
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
      <section id="toode" style={SEC(OFF)}>
        <div style={WRAP}>
          <Tag n="06" label="Toode" />
          <H2>Toote teekond</H2>

          <Card tinted>
            <p style={{ ...LBL, color: ACCENT, marginBottom: 14 }}>V1 — Launchitav MVP</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 36px" }}>
              {["Kõik Eesti kehtivad seadused", "Automaatne uuendus muudatuste korral", "Riigikohtu lahendid", "AI-põhine otsing", "Seaduseviited iga vastuse juures", "Lihtne keeleline selgitus"].map((f, i) => (
                <span key={i} style={{ fontSize: "0.875rem", fontWeight: 300, color: "#333", display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ color: ACCENT, fontSize: "0.55rem" }}>◆</span>{f}
                </span>
              ))}
            </div>
          </Card>

          <div style={{ marginTop: 24 }}>
            <p style={LBL}>Toote roadmap</p>
            <Table
              cols={["Versioon", "Nimi", "Funktsionaalsus"]}
              widths={["12%", "22%", "66%"]}
              rows={[
                [<span style={{ color: ACCENT }}>V1</span>, "MVP",                   "Eesti seadused + AI otsing + seaduseviited + lihtne selgitus"],
                ["V2", "Dokumendianalüüs",     "Lepingute üleslaadimine, riskide tuvastamine, klauslite analüüs"],
                ["V3", "Lepingugeneraator",    "Tööleping, NDA, teenusleping, osanike leping - täidetav mall"],
                ["V4", "Muudatuste jälgimine", "Ettevote profiil, automaatsed teavitused, riskimuutuse analüüs"],
                ["V5", "Rahvusvaheline",       "Piiriülese äri toetamine: Eesti ettevote Slovakkias, startup Saksamaal"],
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── 07 ÄRIMUDEL ──────────────────────── */}
      <section id="hinnad" style={SEC(WHITE)}>
        <div style={WRAP}>
          <Tag n="07" label="Ärimudel" />
          <H2>Hinnakujundus</H2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
            {[
              { sub: "Projektipõhine", seg: "Eraisik",    price: "€29",     unit: "küsimus", featured: false, items: ["Üks detailne vastus", "Seaduseviited ja kohtulahendid", "Praktilised järgmised sammud", "Üürileping, tööoigus, tarbijakaitse"] },
              { sub: "Subscription",  seg: "VKE",         price: "€49",     unit: "kuu",     featured: true,  items: ["Piiramatu arv küsimusi", "Kõik oigusvaldkonnad", "Dokumendianalüüs", "Lepingute eelkontroll", "Kuni 50 töötajaga ettevoted"] },
              { sub: "Premium",       seg: "Ettevote",    price: "€199",    unit: "kuu",     featured: false, items: ["Kõik VKE eelised", "Lepingugeneraator", "Riskianalüüs soovitustega", "Prioriteetne tugi"] },
              { sub: "B2B Custom",    seg: "Enterprise",  price: "€1k-10k", unit: "kuu",     featured: false, items: ["API integratsioon", "SLA-garantiid", "Dedikeeritud kontroll", "Rahvusvaheline laienemine"] },
            ].map((p, i) => (
              <div key={i} style={{ border: `1px solid ${p.featured ? ACCENT : RULE}`, borderRadius: 8, padding: "22px 18px", background: p.featured ? "rgba(184,117,10,0.03)" : OFF, position: "relative", overflow: "hidden" }}>
                {p.featured && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: ACCENT }} />}
                <p style={{ fontSize: 10, fontWeight: 400, letterSpacing: "0.13em", textTransform: "uppercase", color: p.featured ? ACCENT : MUTED, marginBottom: 4 }}>{p.sub}</p>
                <p style={{ fontSize: "0.875rem", fontWeight: 500, color: INK, marginBottom: 14 }}>{p.seg}</p>
                <div style={{ marginBottom: 18 }}>
                  <span style={{ fontSize: "2rem", fontWeight: 500, letterSpacing: "-0.03em", color: p.featured ? ACCENT : INK, lineHeight: 1 }}>{p.price}</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 300, color: MUTED, marginLeft: 4 }}>/ {p.unit}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7, borderTop: `1px solid ${RULE}`, paddingTop: 14 }}>
                  {p.items.map((f, j) => (
                    <span key={j} style={{ fontSize: "0.77rem", fontWeight: 300, color: MUTED, lineHeight: 1.5 }}>— {f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p style={LBL}>Konkurentsihinnad võrreldes alternatiividega</p>
          <Table
            cols={["Teenus", "Ligikaudne kulu"]}
            rows={[
              ["Jurist (Eesti)",                           "150-400 € / tund, vastus 1-5 tööpäeva"],
              ["LegalTech platvormid (Legora, Harvey jt)", "Hinnad avalikult kättesaamatud, peamiselt EN-keelsed"],
              [<span style={{ color: ACCENT }}>Legatron VKE subscription</span>, "€49 / kuu - piiramatu kasutus, eestikeelne, seaduseviited"],
            ]}
          />
        </div>
      </section>

      {/* ── 08 VISIOON ───────────────────────── */}
      <section id="visioon" style={SEC(OFF)}>
        <div style={WRAP}>
          <Tag n="08" label="Globaalne visioon" />
          <div style={SPLIT}>
            <div>
              <H2>Oiguse infrastruktuur maailmale</H2>
              <Body>
                Legatron ei ehita lihtsalt tööriista. Pikaajaline visioon on saada maailma
                esimeseks riikideüleseks oiguse infrastruktuurisüsteemiks - süsteemiks,
                mille kaudu ettevotted ja eraisikud saavad teha kõik juriidilised otsused
                ükskõik millises riigis.
              </Body>
              <Callout label="Visioon 2030">
                <p style={{ fontSize: "0.9375rem", fontWeight: 300, color: "#444444", lineHeight: 1.85 }}>
                  Legatron on maailma juhtiv AI-oiguse platvorm, mis katab üle 50 riigi
                  seadused ja töötleb miljoneid küsimusi päevas.
                </p>
              </Callout>
            </div>
            <div>
              <p style={LBL}>Korratav laienemismudel</p>
              <Table
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
            </div>
          </div>

          <div style={{ marginTop: 48 }}>
            <p style={LBL}>Kasutusnäited rahvusvahelisel tasandil</p>
            <Table
              cols={["Stsenaarium", "Legatroni lahendus"]}
              rows={[
                ["Eesti ettevote soovib eksportida Slovakkiasse",  "Maksueeskirjad, toodete regulatsioonid, lepingunouded - koheselt"],
                ["Eraisik reisib ja töötab Hispaanias",            "Töötamine, elamisluba, tarbijaõigus - ühes kohas"],
                ["Startup asutab firma Saksamaal",                 "GmbH nouded, tööoigus, andmekaitse - struktureeritud ülevaade"],
                ["Pank kontrollib vastavust EL-i direktiivile",    "Automaatne regulatsioonikaart, seadusemuudatuste jälgimine"],
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── 09 KKK ───────────────────────────── */}
      <section id="kkk" style={SEC(WHITE)}>
        <div style={WRAP}>
          <Tag n="09" label="Investori KKK" />
          <div style={SPLIT}>
            <div>
              <H2>Küsimused ja vastused</H2>
              <Body>
                Kõige sagedamini küsitavad küsimused investoritelt - strateegilised ja
                tootefookusega.
              </Body>
            </div>
            <div>
              <p style={LBL}>Investorite küsimused</p>
              <div style={{ borderTop: `1px solid ${RULE}` }}>
                {[
                  { q: "Miks just nüüd?",                               a: "AI mudelite võimekus on 2023-2024 jooksul joudnud tasemele, kus struktureeritud oiguse andmestik koos keelemudeliga annab usaldusväärseid ja viidatavaid vastuseid. Varem polnud täpsus piisav, et turule minna vastutustundlikult." },
                  { q: "Miks alustada Eestist?",                        a: "Eesti on väike (1,4 mln), kõrgelt digitaliseeritud ja omab selget ning avalikult kättesaadavat seaduste andmebaasi (Riigi Teataja). See võimaldab kiiresti itereerida ja mudeli täpsust tõestada enne laiemat sisenemist." },
                  { q: "Kui suureks saab see kasvada?",                 a: "Euroopa juriidiliste teenuste turg on hinnanguliselt üle 300 miljardi euro aastas. Isegi 0,1% sellest turust tähendab 300 mln € käivet. LegalTech kui AI vertikaali kasvutempo ületab üldist SaaS-i kasvu märkimisväärselt." },
                  { q: "Mis takistab konkurente?",                      a: "Struktureeritud ja juristi-valideeritud riigipõhine andmestik on aastatepikkune töö. Üldised AI mudelid (ChatGPT jt) ei suuda seda asendada - neil puudub täpsus, viited ja lokaalne kontekst. Varajane positsioon loob võrgustikeefekti." },
                  { q: "Kuidas skaaleerimine rahvusvaheliselt toimib?", a: "Iga riik on eraldi moodul: seadused - lokaliseerimine - AI treenimine - launch. Mudel on korratav. Pärast kolme esimest riiki on protsess automatiseeritud ja kiiremat laienemist toetab API ärimudel." },
                ].map((item, i) => <FAQ key={i} q={item.q} a={item.a} />)}
              </div>

              <p style={{ ...LBL, marginTop: 36 }}>Strateegilised küsimused</p>
              <div style={{ borderTop: `1px solid ${RULE}` }}>
                {[
                  { q: "Kas seadused saavad API-ks?",                       a: "Jah. V3-V4 ajaks pakume API-t, mille kaudu ettevotted saavad oma rakendustes pärida konkreetseid seaduseviiteid, regulatiivseid noueid ja riskihinnanguid. See avab uue B2B tuluvoo." },
                  { q: "Kas Legatron võib olla oiguse operatsioonisüsteem?",a: "See on meie pikaajaline visioon. Ettevotted teevad kõik juriidilised otsused - lepingud, riskianalüüsid, regulatsioonikontroll - Legatroni kaudu, ilma et neil oleks vaja juristi kaasata rutiinsetes küsimustes." },
                  { q: "Kas Legatron automatiseerib juriidikat?",           a: "Osaliselt - jah. Rutiinsed tööd nagu lepingute koostamine, riskikontroll ja regulatsioonide jälgimine automatiseeritakse täielikult. Keeruline noustamine ja kohtuasi jäävad inimjuristi pärusmaaks." },
                  { q: "Kas oigus on järgmine suur AI vertikaali?",        a: "Koos tervishoiu, finantsteenuste ja haridusega on oigus üks maailma suurimaid ja kõrgeima väärtusega teenussektoreid. Erinevalt paljudest muudest sektoritest on seadusandlik andmestik avalik ja struktureeritud, mis muudab AI rakendamise kiiremaks." },
                ].map((item, i) => <FAQ key={i} q={item.q} a={item.a} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section style={{ padding: "120px 0" }}>
        <div style={{ ...WRAP, textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)", fontWeight: 500, letterSpacing: "-0.03em", color: INK, lineHeight: 1.1, marginBottom: 16, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            Seadused ei pea olema{" "}
            <span style={{ color: ACCENT }}>keerulised.</span>
          </h2>
          <p style={{ fontSize: "0.9375rem", fontWeight: 300, color: MUTED, marginBottom: 6 }}>
            Legatron muudab need arusaadavaks.
          </p>
          <p style={{ fontSize: "0.875rem", fontWeight: 300, color: SOFT, marginBottom: 44 }}>
            We win because we turn law into infrastructure.
          </p>
          <a href="mailto:info@legatron.ai" style={{ display: "inline-block", background: INK, color: OFF, fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.05em", padding: "11px 26px", borderRadius: 4, textDecoration: "none", marginBottom: 64 }}>
            info@legatron.ai
          </a>
          <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: 28, fontSize: 11, fontWeight: 300, color: SOFT, letterSpacing: "0.08em" }}>
            © 2024 Legatron · Investor-taseme dokument · Konfidentsiaalne
          </div>
        </div>
      </section>

    </div>
  );
}
