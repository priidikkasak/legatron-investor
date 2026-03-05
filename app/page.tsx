"use client";
import { useState } from "react";

/* ─── Tokens ─────────────────────────────────────── */
const G = "#C9982A";          // gold
const W = "#FFFFFF";
const D = "rgba(200,200,200,0.45)";  // dim text
const L = "rgba(255,255,255,0.07)";  // line

/* ─── Primitives ──────────────────────────────────── */
const serif = { fontFamily: "'DM Serif Display', Georgia, serif" } as const;
const mono  = { fontFamily: "ui-monospace, 'SF Mono', monospace" } as const;

function Logo({ s = 32 }: { s?: number }) {
  const q = s * 0.44;
  return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
      <rect x="2" y="2" width={q} height={q} fill={W} />
      <rect x="16" y="16" width={q} height={q} fill={G} />
    </svg>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: G, fontWeight: 400, marginBottom: 20 }}>
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ ...serif, fontSize: "clamp(1.6rem,2.5vw,2.2rem)", color: W, lineHeight: 1.2, fontWeight: 400, marginBottom: 16 }}>
      {children}
    </h2>
  );
}

function Body({ children, dim }: { children: React.ReactNode; dim?: boolean }) {
  return (
    <p style={{ fontSize: "0.9rem", color: dim ? D : "#C8C8C8", lineHeight: 1.85 }}>
      {children}
    </p>
  );
}

function Rule() {
  return <div style={{ borderTop: `1px solid ${L}`, marginBottom: 40 }} />;
}

/* 2-col layout */
function Split({ label, title, children }: { label: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 64, alignItems: "start" }}>
      <div style={{ paddingTop: 4 }}>
        <Label>{label}</Label>
        <H2>{title}</H2>
      </div>
      <div>{children}</div>
    </div>
  );
}

/* Table */
function Table({ head, rows }: { head: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div style={{ borderTop: `1px solid ${L}` }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${head.length}, 1fr)`, padding: "10px 0", borderBottom: `1px solid ${L}` }}>
        {head.map((h, i) => (
          <span key={i} style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: i === 0 ? D : G }}>{h}</span>
        ))}
      </div>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "grid", gridTemplateColumns: `repeat(${head.length}, 1fr)`, padding: "13px 0", borderBottom: `1px solid ${L}` }}>
          {row.map((cell, ci) => (
            <span key={ci} style={{ fontSize: "0.85rem", color: ci === 0 ? D : "#C8C8C8", lineHeight: 1.55 }}>{cell}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

/* Dash list */
function DashList({ items }: { items: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 12 }}>
          <span style={{ color: G, flexShrink: 0, marginTop: 1 }}>—</span>
          <span style={{ fontSize: "0.875rem", color: "#C8C8C8", lineHeight: 1.7 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

/* FAQ */
function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ borderTop: `1px solid ${L}`, padding: "18px 0", cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 24 }}>
        <span style={{ fontSize: "0.9rem", color: "#C8C8C8" }}>{q}</span>
        <span style={{ color: G, flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none", display: "block", lineHeight: 1 }}>+</span>
      </div>
      {open && <p style={{ marginTop: 12, fontSize: "0.85rem", color: D, lineHeight: 1.8 }}>{a}</p>}
    </div>
  );
}

/* ─── Page ────────────────────────────────────────── */
export default function Page() {
  const W_ = { maxWidth: 1080, margin: "0 auto", padding: "0 48px" };
  const sec = { padding: "88px 0", borderTop: `1px solid ${L}` };

  return (
    <div style={{ background: "#0A0C14", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(10,12,20,0.88)", backdropFilter: "blur(18px)", borderBottom: `1px solid ${L}` }}>
        <div style={{ ...W_, height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Logo s={22} />
            <span style={{ ...serif, fontSize: "0.95rem", color: W, letterSpacing: "0.01em" }}>Legatron</span>
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {["Lahendus","Turg","Toode","Hinnad","Visioon"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: D, textDecoration: "none" }}>{l}</a>
            ))}
            <a href="mailto:info@legatron.ai" style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: G, textDecoration: "none" }}>Kontakt</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 0 0" }}>
        <div style={{ ...W_, width: "100%" }}>
          <div style={{ marginBottom: 56 }}><Logo s={40} /></div>

          <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: G, marginBottom: 28 }}>
            Strateegiline ariplaan · Investor-taseme dokument · 2024
          </p>

          <h1 style={{ ...serif, fontSize: "clamp(3.2rem,6vw,5.8rem)", color: W, lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: 28, maxWidth: 820 }}>
            Muudame seadused{" "}
            <span style={{ color: G, fontStyle: "italic" }}>infrastruktuuriks.</span>
          </h1>

          <p style={{ fontSize: "1.05rem", color: D, lineHeight: 1.85, maxWidth: 500, marginBottom: 52 }}>
            AI-põhine platvorm, mis teeb oiguse ligipääsetavaks igale inimesele ja
            ettevotele - kiiremini, odavamalt ja täpsemini kui ükski jurist suudaks.
          </p>

          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a href="#missioon" style={{ display: "inline-block", background: G, color: "#0A0C14", fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", padding: "11px 26px", borderRadius: 5, textDecoration: "none" }}>
              Vaata ariplaan
            </a>
            <a href="mailto:info@legatron.ai" style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: D, textDecoration: "none" }}>
              info@legatron.ai →
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: `1px solid ${L}`, marginTop: 88 }}>
            {[
              { n: "€300 mld", l: "Euroopa juriidiliste teenuste turg aastas" },
              { n: "10×", l: "odavam kui traditsiooniline juriidiline noustamine" },
              { n: "24/7", l: "kättesaadav, ilma ooteajata, koheselt" },
            ].map((s, i) => (
              <div key={i} style={{ paddingTop: 28, paddingBottom: 28, paddingRight: i < 2 ? 40 : 0 }}>
                <div style={{ ...serif, fontSize: "2.6rem", color: G, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: "0.78rem", color: D, marginTop: 8, lineHeight: 1.5 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSIOON ── */}
      <section id="missioon" style={{ ...sec }}>
        <div style={W_}>
          <Split label="01 — Missioon" title="Miks maailm vajab Legatroni?">
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {/* Missioon lause */}
              <div style={{ borderLeft: `2px solid ${G}`, paddingLeft: 20 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: G, marginBottom: 10 }}>Ühe lause missioon</p>
                <p style={{ ...serif, fontSize: "1.15rem", color: W, lineHeight: 1.5, fontStyle: "italic" }}>
                  Muuta seadused arusaadavaks ja koheselt kasutatavaks igale inimesele ja
                  ettevotele - kiiremini, odavamalt ja täpsemini kui ükski jurist suudaks.
                </p>
              </div>

              <Body>
                Tänapäeva oigussüsteem on üles ehitatud asjatundjate jaoks, mitte tavaliste
                inimeste jaoks. Väikeettevotja, kes soovib teada, kas ta võib töötajat
                koondada, peab maksma juristile 150-400 € tunni kohta - ja ootama päevi
                vastust, mis võib olla vaja juba täna. Eraisik, kes sõlmib lepingut, ei tea
                sageli, millised riskid see endas peidab.
              </Body>

              <Body>
                Legatron lahendab selle probleemi: AI-põhine platvorm, mis struktureerib
                seadused, kohtulahendid ja oigusnormid ning muudab need otsinguga
                kasutatavaks sekunditega.
              </Body>

              {/* Mida kaotaks maailm */}
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 16 }}>
                  Mida kaotaks maailm ilma Legatronita
                </p>
                <DashList items={[
                  "Lepingutel põhinevad vaidlused, mida oleks saanud vältida",
                  "Trahvid ja tühistused regulatsiooninouete mittetäitmise eest",
                  "Otsused, mis põhinevad valedel eeldustel oigusliku vastutuse kohta",
                  "Ressursside raiskamine teenustele, mis on mikro- ja väikeettevotjatele taskukohatud",
                ]} />
              </div>
            </div>
          </Split>
        </div>
      </section>

      {/* ── LAHENDUS / KONKURENTSIEELIS ── */}
      <section id="lahendus" style={{ ...sec }}>
        <div style={W_}>
          <Split label="02 — Konkurentsieelis" title={<>10× parem kui praegune<br />alternatiiv</>}>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

              {/* Pohihüpotees */}
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 14 }}>
                  Pohihüpotees - mida teised ei näe
                </p>
                <div style={{ background: "rgba(201,152,42,0.05)", border: `1px solid rgba(201,152,42,0.15)`, borderRadius: 8, padding: "18px 20px" }}>
                  <Body>
                    Seadus ise ei ole probleem - probleem on selle ligipääsetavus. Kui seadused
                    struktureerida oigesti ning ühendada erineva taseme AI-mudelitega, saab
                    oigusest reaalajas kasutatav infrastruktuur, nagu on internet ühenduvuse jaoks.
                  </Body>
                </div>
              </div>

              {/* 10x tabel */}
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 14 }}>
                  Võrdlus - praegune alternatiiv
                </p>
                <Table
                  head={["", "Jurist (praegu)", "Legatron"]}
                  rows={[
                    ["Hind", "150-400 € tunni kohta", "alates 29 € / küsimus"],
                    ["Vastusekiirus", "1-5 tööpäeva", "sekunditega"],
                    ["Kättesaadavus", "ainult tööajal", "24/7, koheselt"],
                    ["Kvaliteet", "kogemus varieerub", "konsistentne"],
                    ["Mastaap", "ei skaleeru", "miljonid küsimused paralleelselt"],
                  ]}
                />
              </div>

              {/* Praegune seis */}
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 14 }}>
                  Kus oleme juba tugevas seisus
                </p>
                <Table
                  head={["Valdkond", "Praegune seis"]}
                  rows={[
                    ["Eesti oiguse struktureerimine", "Aktiivne töö, kaetud peamised seadused"],
                    ["AI-põhine seaduse otsing", "MVP käivitamiseks valmis"],
                    ["Juristi valideeritud vastused", "Koostöö toimib, protsess paika pandud"],
                    ["Riigikohtu lahendite analüüs", "Integratsioon arenduses"],
                  ]}
                />
              </div>

              {/* 4 sammast */}
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 20 }}>
                  Meid on raske kopeerida - 4 omavahel põimunud komponenti
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                  {[
                    { n: "01", t: "Struktureeritud andmebaas", d: "Aastatepikkune töö seaduste, kohtulahendite ja regulatsioonide kategoriseerimiseks riigi- ja valdkonnapõhiselt." },
                    { n: "02", t: "Juristi valideeritud sisu", d: "Iga oiguslik väide on inimekspert üle kontrollinud - täpsust, mida puhta AI-genereeritud sisu korral ei saavutata." },
                    { n: "03", t: "Riigipõhine AI treening", d: "Mudel treenitud konkreetse riigi oiguslikule kontekstile - tunduvalt parem täpsus kui üldmudelitel." },
                    { n: "04", t: "Interdistsiplinaarne tiim", d: "Juristi ja arendaja tihe koostöö - kombinatsioon, keda on aastatega keeruline järgi jäljendada." },
                  ].map((m, i) => (
                    <div key={i} style={{ padding: "20px 18px", border: `1px solid ${L}`, borderTop: i < 2 ? `1px solid ${L}` : "none" }}>
                      <div style={{ ...serif, fontSize: "1.4rem", color: "rgba(201,152,42,0.2)", marginBottom: 10 }}>{m.n}</div>
                      <p style={{ fontSize: "0.82rem", color: W, marginBottom: 6, fontWeight: 400 }}>{m.t}</p>
                      <p style={{ fontSize: "0.8rem", color: D, lineHeight: 1.65 }}>{m.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Split>
        </div>
      </section>

      {/* ── TURG ── */}
      <section id="turg" style={{ ...sec }}>
        <div style={W_}>
          <Split label="03 — Turg" title={<>Suur turg,<br />selge tee sisse</>}>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

              {/* Sihtgrupid */}
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 14 }}>Sihtgrupid</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { title: "Eraisik", sub: "Projektipõhine kasutus", desc: "Vajab vastust konkreetsele küsimusele - üürileping, tööoigus, tarbijakaitse, pärimisõigus. Kiire, täpne, taskukohane." },
                    { title: "VKE", sub: "Väike ja Keskmine Ettevote", desc: "Igapäevane oiguslik tugi. Töölepingud, kliendisuhted, regulatsioonid, vastutus. Korduvad küsimused kiirelt." },
                  ].map((s, i) => (
                    <div key={i} style={{ padding: "20px", border: `1px solid ${L}`, borderRadius: 6 }}>
                      <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: G, marginBottom: 6 }}>{s.sub}</p>
                      <p style={{ fontSize: "0.9rem", color: W, marginBottom: 10, fontWeight: 400 }}>{s.title}</p>
                      <p style={{ fontSize: "0.82rem", color: D, lineHeight: 1.65 }}>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Valupunktid */}
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 16 }}>Suurimad valupunktid</p>
                <DashList items={[
                  "Ei teata, mida seadus täpselt lubab või keelab - eriti uute regulatsioonide korral",
                  "Juristile helistamine on kallis, aeglane ja tundub üleliigne väikese küsimuse jaoks",
                  "Vastus tuleb liiga aeglaselt - otsus tuleb teha täna, mitte nädala pärast",
                  "Puudub usaldusväärne ja taskukohane allikas, kust kontrollida",
                ]} />
              </div>

              {/* Laienemine */}
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 14 }}>Turu laienemine</p>
                <Table
                  head={["Faas", "Geograafia ja fookus"]}
                  rows={[
                    [<span style={{ color: G }}>Faas 1 — 2024</span>, "Eesti - kiire iteratsioon, digitaalne ühiskond, tugev oigussüsteem"],
                    ["Faas 2 — 2025 Q1-Q2", "Baltikum - Läti, Leedu, sarnane oiguslik struktuur"],
                    ["Faas 3 — 2025 Q3-Q4", "Euroopa - alustades riikidega, kus on selged andmestikud (DE, FI, NL)"],
                    ["Faas 4 — 2026+", "Globaalne laienemine, API ärimudel, Enterprise"],
                  ]}
                />
              </div>
            </div>
          </Split>
        </div>
      </section>

      {/* ── STRATEEGILISED VALIKUD ── */}
      <section id="strateegia" style={{ ...sec }}>
        <div style={W_}>
          <Split label="04 — Strateegia" title={<>Strateegilised<br />valikud</>}>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {/* ALATI */}
                <div>
                  <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: G, marginBottom: 16 }}>Mida teeme ALATI</p>
                  <DashList items={[
                    "Anname vastustega alati seaduseviited - kasutaja peab saama iga väite taga oleva paragrahvi üles leida",
                    "Hoiame seadused automaatselt ajakohased - süsteem uuendub koheselt, kui ametlikes andmestikes toimub muudatus",
                    "Teeme juriidika lihtsaks ja arusaadavaks - keel on selge, ilma ülemäärase juriidilise žargoonita",
                  ]} />
                </div>
                {/* KUNAGI */}
                <div>
                  <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 16 }}>Mida ei tee KUNAGI</p>
                  <DashList items={[
                    "Ei anna kontrollimata informatsiooni - kõik vastused on juristi valideeritud andmestiku põhjal",
                    "Ei müü kasutaja andmeid - privaatsus on tingimusteta",
                    "Ei tee anonüümset AI arvamust - iga vastus on seostatav konkreetse seaduseallikaga",
                  ]} />
                </div>
              </div>

              {/* #1 Prioriteet */}
              <div style={{ background: "rgba(201,152,42,0.05)", border: `1px solid rgba(201,152,42,0.18)`, borderRadius: 8, padding: "22px 24px" }}>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: G, marginBottom: 12 }}>#1 Prioriteet sel aastal</p>
                <p style={{ fontSize: "0.9rem", color: W, lineHeight: 1.7 }}>
                  Ehitada kõige täpsem AI-põhine oiguse otsinguplatvorm Baltikumis - mida
                  mõõdetakse vastuste täpsuse, kasutajate usalduse ja B2B klientide arvu järgi.
                </p>
              </div>

              {/* Kitsaskohad */}
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 14 }}>Peamised kitsaskohad ja lahendused</p>
                <Table
                  head={["Kitsaskoht", "Lahendus"]}
                  rows={[
                    ["Oiguse andmete struktureerimine on aeganoudev", "Juristi-juhitud valideerimisprotsess koos AI abistamisega"],
                    ["AI täpsus on kriitilise tähtsusega", "Pidev mudeli treenimine, A/B testimine, feedback loop"],
                    ["Kasutajate usaldus uue platvormi vastu", "Läbipaistvus: allikad nähtavad, jurist tagab täpsuse"],
                  ]}
                />
              </div>
            </div>
          </Split>
        </div>
      </section>

      {/* ── TÄITMISSÜSTEEM ── */}
      <section id="taitmissusteem" style={{ ...sec }}>
        <div style={W_}>
          <Split label="05 — Täitmissüsteem" title={<>Eesmärgid ja<br />vastutus</>}>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

              {/* Kvartalid */}
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 14 }}>Kvartalieesmärgid 2024</p>
                <Table
                  head={["Kvartal", "Eesmärk"]}
                  rows={[
                    [<span style={{ color: G }}>Q1 2024</span>, "Eesti MVP launch - kaetud kõik pohiseadused, Riigikohtu lahendid integreeritud"],
                    ["Q2 2024", "Baltikumi laienemine - Läti ja Leedu seadused lisatud, 3 B2B klienti"],
                    ["Q3 2024", "Euroopa esimesed riigid - DE/FI/NL piloot, API beetaversioon"],
                    ["Q4 2024", "Skaaleerimine - 10 000 aktiivsed kasutajad, Enterprise klient"],
                  ]}
                />
              </div>

              {/* Kuu vahe-eesmärgid */}
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 14 }}>Igakuised vahe-eesmärgid</p>
                <Table
                  head={["Kuu", "Vahe-eesmärk"]}
                  rows={[
                    ["Kuu 1", "MVP launch - Eesti seadused, AI otsing, esimesed 100 kasutajat"],
                    ["Kuu 2", "1 000 registreeritud kasutajat, esimene NPS mootmine (eesmärk: >50)"],
                    ["Kuu 3", "B2B subscription müük algatatud, 3+ ettevote katseperioodil"],
                  ]}
                />
              </div>

              {/* Vastutusjaotus */}
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 14 }}>Vastutusjaotus</p>
                <Table
                  head={["Roll", "Vastutusala"]}
                  rows={[
                    ["CEO", "Kasv, partnerlused, investorisuhted, kliendipidamine"],
                    ["CTO", "AI mudel, toote arendus, andmestiku kvaliteet"],
                    ["Legal advisor", "Oiguslik täpsus, valideerimisprotsess, riskijuhtimine"],
                  ]}
                />
              </div>
            </div>
          </Split>
        </div>
      </section>

      {/* ── TOODE ── */}
      <section id="toode" style={{ ...sec }}>
        <div style={W_}>
          <Split label="06 — Toode" title={<>Toote teekond</>}>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

              {/* MVP */}
              <div style={{ border: `1px solid rgba(201,152,42,0.25)`, borderRadius: 8, padding: "22px 24px", background: "rgba(201,152,42,0.04)" }}>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: G, marginBottom: 14 }}>V1 — Launchitav MVP</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 32px" }}>
                  {[
                    "Kõik Eesti kehtivad seadused",
                    "Automaatne uuendus muudatuste korral",
                    "Riigikohtu lahendid",
                    "AI-põhine otsing",
                    "Seaduseviited iga vastuse juures",
                    "Lihtne keeleline selgitus",
                  ].map((f, i) => (
                    <span key={i} style={{ fontSize: "0.83rem", color: "#C8C8C8" }}>— {f}</span>
                  ))}
                </div>
              </div>

              {/* Roadmap */}
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 14 }}>Toote roadmap</p>
                <Table
                  head={["Versioon", "Funktsionaalsus"]}
                  rows={[
                    [<span style={{ color: G }}>V1 — MVP</span>, "Eesti seadused + AI otsing + seaduseviited + lihtne selgitus"],
                    ["V2 — Dokumendianalüüs", "Lepingute üleslaadimise võimalus, riskide tuvastamine, oluliste klauslite analüüs"],
                    ["V3 — Lepingugeneraator", "Tööleping, NDA, teenusleping, osanike leping - täidetav mall koos selgitustega"],
                    ["V4 — Muudatuste jälgimine", "Ettevote profiil, automaatsed teavitused seadusemuudatuste kohta, riskimuutuse analüüs"],
                    ["V5 — Rahvusvaheline", "Piiriülese äri toetamine: Eesti ettevote Slovakkias, eraisik Hispaanias, startup Saksamaal"],
                  ]}
                />
              </div>
            </div>
          </Split>
        </div>
      </section>

      {/* ── HINNAD ── */}
      <section id="hinnad" style={{ ...sec }}>
        <div style={W_}>
          <Split label="07 — Ärimudel" title={<>Hinnakujundus</>}>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

              {/* 4 paketti */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                {[
                  {
                    seg: "Eraisik — Projektipõhine", price: "€29", unit: "küsimus",
                    features: ["Üks detailne vastus koos seaduseviidete ja kohtulahendite linkidega", "Praktilised soovitused järgmisteks sammudeks", "Juriidiliselt valideeritud andmestik", "Sobib: üürileping, tööoigus, tarbijakaitse"],
                    featured: false,
                  },
                  {
                    seg: "Väike ja Keskmine Ettevote", price: "€49", unit: "kuu",
                    features: ["Piiramatu arv küsimusi kõigis oigusvaldkondades", "Dokumendianalüüs - lepingute kontrollimine ja riskide tuvastamine", "Lepingute eelkontroll enne allkirjastamist", "Sobib: ettevoted kuni 50 töötajaga"],
                    featured: true,
                  },
                  {
                    seg: "Premium Ettevote", price: "€199", unit: "kuu",
                    features: ["Kõik SME paketi eelised", "Lepingugeneraator - töölepingud, NDA, teenuslepingud, osanike lepped", "Detailne riskianalüüs koos soovitustega", "Prioriteetne vastusekiirus ja eelisjärjekorras tugi"],
                    featured: false,
                  },
                  {
                    seg: "Enterprise / B2B Custom", price: "€1k-10k", unit: "kuu",
                    features: ["Kohandatud integratsioon ettevote süsteemidega (API)", "Dedikeeritud juriidilise täpsuse kontroll", "SLA-garantiid ja aruandlus", "Rahvusvaheline laienemine - mitu riiki ühes lepingus"],
                    featured: false,
                  },
                ].map((p, i) => (
                  <div key={i} style={{ border: p.featured ? `1px solid rgba(201,152,42,0.4)` : `1px solid ${L}`, borderRadius: 8, padding: "22px 20px", background: p.featured ? "rgba(201,152,42,0.04)" : "transparent" }}>
                    <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: p.featured ? G : D, marginBottom: 12 }}>{p.seg}</p>
                    <div style={{ marginBottom: 18 }}>
                      <span style={{ ...serif, fontSize: "2.2rem", color: p.featured ? G : W }}>{p.price}</span>
                      <span style={{ fontSize: "0.78rem", color: D, marginLeft: 6 }}>/ {p.unit}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      {p.features.map((f, j) => (
                        <span key={j} style={{ fontSize: "0.78rem", color: D, lineHeight: 1.5 }}>— {f}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Konkurentsihinnad */}
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 14 }}>Konkurentsihinnad võrreldes alternatiividega</p>
                <Table
                  head={["Teenus", "Ligikaudne kulu"]}
                  rows={[
                    ["Jurist (Eesti)", "150-400 € / tund, vastus 1-5 tööpäeva"],
                    ["LegalTech platvormid (Legora, Harvey jt)", "Hinnad avalikult kättesaamatud, peamiselt EN-keelsed"],
                    [<span style={{ color: G }}>Legatron SME subscription</span>, "€49 / kuu - piiramatu kasutus, eestikeelne, seaduseviited"],
                  ]}
                />
              </div>
            </div>
          </Split>
        </div>
      </section>

      {/* ── GLOBAALNE VISIOON ── */}
      <section id="visioon" style={{ ...sec }}>
        <div style={W_}>
          <Split label="08 — Globaalne visioon" title={<>Oiguse infrastruktuur<br />maailmale</>}>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

              <Body>
                Legatron ei ehita lihtsalt tööriista. Pikaajaline visioon on saada maailma
                esimeseks riikideüleseks oiguse infrastruktuurisüsteemiks - süsteemiks,
                mille kaudu ettevotted ja eraisikud saavad teha kõik juriidilised otsused
                ükskõik millises riigis.
              </Body>

              <div style={{ borderLeft: `2px solid ${G}`, paddingLeft: 20 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: G, marginBottom: 10 }}>Visioon 2030</p>
                <p style={{ ...serif, fontSize: "1.05rem", color: W, lineHeight: 1.55, fontStyle: "italic" }}>
                  Legatron on maailma juhtiv AI-oiguse platvorm, mis katab üle 50 riigi
                  seadused ja töötleb miljoneid küsimusi päevas - ettevottetele, eraisikutele
                  ja institutsioonidele.
                </p>
              </div>

              {/* Kasutusnäited */}
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 14 }}>Kasutusnäited rahvusvahelisel tasandil</p>
                <Table
                  head={["Stsenaarium", "Legatroni lahendus"]}
                  rows={[
                    ["Eesti ettevote soovib eksportida Slovakkiasse", "Maksueeskirjad, toodete regulatsioonid, lepingunouded - koheselt"],
                    ["Eraisik reisib Hispaaniasse", "Töötamine, elamisluba, tarbijaõigus - ühes kohas"],
                    ["Startup asutab firma Saksamaal", "GmbH nouded, tööoigus, andmekaitse - struktureeritud ülevaade"],
                    ["Pank kontrollib vastavust EL-i direktiivile", "Automaatne regulatsioonikaart, seadusemuudatuste jälgimine"],
                  ]}
                />
              </div>

              {/* Laienemise mudel */}
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 16 }}>Laienemine riikide kaupa - korratav mudel</p>
                <DashList items={[
                  "Samm 1: Siseneme riiki, kus on avalik ja struktureeritud seaduste andmestik",
                  "Samm 2: Partnerlusjurist lokaalse oiguse valideerimiseks",
                  "Samm 3: AI mudeli treenimine riigi-spetsiifilisele kontekstile",
                  "Samm 4: Launch kohaliku meedia ja juriidikakogukonnaga",
                  "Samm 5: Andmestiku pidev täiendamine seadusemuudatuste korral",
                ]} />
              </div>
            </div>
          </Split>
        </div>
      </section>

      {/* ── KKK ── */}
      <section id="kkk" style={{ ...sec }}>
        <div style={W_}>
          <Split label="09 — Investori KKK" title={<>Küsimused<br />ja vastused</>}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 20 }}>Investorite küsimused</p>
              {[
                { q: "Miks just nüüd?", a: "AI mudelite võimekus on 2023-2024 jooksul joudnud tasemele, kus struktureeritud oiguse andmestik koos keelemudeliga annab usaldusväärseid ja viidatavaid vastuseid. Varem polnud täpsus piisav, et turule minna vastutustundlikult." },
                { q: "Miks alustada Eestist?", a: "Eesti on väike (1,4 mln), kõrgelt digitaliseeritud ja omab selget ning avalikult kättesaadavat seaduste andmebaasi (Riigi Teataja). See võimaldab kiiresti itereerida ja mudeli täpsust tõestada enne laiemat sisenemist." },
                { q: "Kui suureks saab see kasvada?", a: "Euroopa juriidiliste teenuste turg on hinnanguliselt üle 300 miljardi euro aastas. Isegi 0,1% sellest turust tähendab 300 mln € käivet. LegalTech kui AI vertikaali kasvutempo ületab üldist SaaS-i kasvu märkimisväärselt." },
                { q: "Mis takistab konkurente?", a: "Struktureeritud ja juristi-valideeritud riigipõhine andmestik on aastatepikkune töö. Üldised AI mudelid (ChatGPT jt) ei suuda seda asendada - neil puudub täpsus, viited ja lokaalne kontekst. Varajane positsioon loob võrgustikeefekti." },
                { q: "Kuidas skaaleerimine rahvusvaheliselt toimib?", a: "Iga riik on eraldi moodul: seadused - lokaliseerimine - AI treenimine - launch. Mudel on korratav. Pärast kolme esimest riiki on protsess automatiseeritud ja kiiremat laienemist toetab API ärimudel." },
              ].map((item, i) => <Faq key={i} q={item.q} a={item.a} />)}

              <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, margin: "32px 0 20px" }}>Strateegilised küsimused toote ja turu kohta</p>
              {[
                { q: "Kas seadused saavad API-ks?", a: "Jah. V3-V4 ajaks pakume API-t, mille kaudu ettevotted saavad oma rakendustes pärida konkreetseid seaduseviiteid, regulatiivseid noueid ja riskihinnanguid. See avab uue B2B tuluvoo." },
                { q: "Kas Legatron võib olla oiguse operatsioonisüsteem?", a: "See on meie pikaajaline visioon. Ettevotted teevad kõik juriidilised otsused - lepingud, riskianalüüsid, regulatsioonikontroll - Legatroni kaudu, ilma et neil oleks vaja juristi kaasata rutiinsetes küsimustes." },
                { q: "Kas Legatron automatiseerib juriidikat?", a: "Osaliselt - jah. Rutiinsed tööd nagu lepingute koostamine, riskikontroll ja regulatsioonide jälgimine automatiseeritakse täielikult. Keeruline noustamine ja kohtuasi jäävad inimjuristi pärusmaaks." },
                { q: "Kas oigus on järgmine suur AI vertikaali?", a: "Koos tervishoiu, finantsteenuste ja haridusega on oigus üks maailma suurimaid ja kõrgeima väärtusega teenussektoreid. Erinevalt paljudest muudest sektoritest on seadusandlik andmestik avalik ja struktureeritud, mis muudab AI rakendamise kiiremaks." },
              ].map((item, i) => <Faq key={i} q={item.q} a={item.a} />)}
            </div>
          </Split>
        </div>
      </section>

      {/* ── STRATEEGILINE NARRATIIV / CTA ── */}
      <section style={{ ...sec, textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", padding: "0 48px" }}>
          <Logo s={36} />
          <h2 style={{ ...serif, fontSize: "clamp(2rem,4vw,3.4rem)", color: W, lineHeight: 1.15, margin: "32px 0 20px", fontWeight: 400 }}>
            Seadused ei pea olema{" "}
            <span style={{ color: G, fontStyle: "italic" }}>keerulised.</span>
          </h2>
          <p style={{ fontSize: "0.9rem", color: D, lineHeight: 1.85, marginBottom: 12 }}>
            Legatron muudab need arusaadavaks.
          </p>
          <p style={{ ...serif, fontSize: "1rem", color: D, fontStyle: "italic", marginBottom: 52 }}>
            We win because we turn law into infrastructure.
          </p>

          <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: D, marginBottom: 12 }}>Küsimuste korral</p>
          <a href="mailto:info@legatron.ai" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: "0.95rem", color: G, textDecoration: "none" }}>
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
              <rect x=".5" y=".5" width="14" height="10" rx="1" stroke={G} />
              <path d="M.5 1.5L7.5 7 14.5 1.5" stroke={G} />
            </svg>
            info@legatron.ai
          </a>

          <div style={{ marginTop: 72, paddingTop: 28, borderTop: `1px solid ${L}`, fontSize: 11, color: "rgba(200,200,200,0.2)", letterSpacing: "0.08em" }}>
            © 2024 Legatron · Investor-taseme dokument · Konfidentsiaalne
          </div>
        </div>
      </section>

    </div>
  );
}
