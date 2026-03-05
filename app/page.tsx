"use client";

import { useState } from "react";

const GOLD = "#C9982A";
const DIM = "rgba(216,216,216,0.45)";
const LINE = "rgba(255,255,255,0.07)";

function Logo({ size = 36 }: { size?: number }) {
  const sq = size * 0.42;
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="3" y="3" width={sq} height={sq} fill="white" />
      <rect x="17" y="17" width={sq} height={sq} fill={GOLD} />
    </svg>
  );
}

function Row({ label, value, gold }: { label: string; value: string; gold?: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: `1px solid ${LINE}`, padding: "14px 0" }}>
      <span style={{ fontSize: "0.875rem", color: DIM }}>{label}</span>
      <span style={{ fontSize: "0.875rem", color: gold ? GOLD : "#D8D8D8", fontWeight: gold ? 500 : 300 }}>{value}</span>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{ borderTop: `1px solid ${LINE}`, padding: "20px 0", cursor: "pointer" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24 }}>
        <p className="serif" style={{ fontSize: "1rem", color: "#D8D8D8", lineHeight: 1.5 }}>{q}</p>
        <span style={{ color: GOLD, fontSize: "1.2rem", flexShrink: 0, marginTop: 2, lineHeight: 1, transition: "transform 0.25s", transform: open ? "rotate(45deg)" : "none", display: "block" }}>+</span>
      </div>
      {open && (
        <p style={{ marginTop: 12, fontSize: "0.875rem", color: DIM, lineHeight: 1.8, maxWidth: 560 }}>{a}</p>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <main style={{ background: "#0C0F1A", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        borderBottom: `1px solid ${LINE}`,
        background: "rgba(12,15,26,0.9)", backdropFilter: "blur(20px)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Logo size={26} />
            <span className="serif" style={{ fontSize: "1.05rem", color: "#fff", letterSpacing: "0.01em" }}>Legatron</span>
          </div>
          <a href="mailto:info@legatron.ai" style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: DIM, textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={e => (e.currentTarget.style.color = DIM)}>
            info@legatron.ai
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 40px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <div style={{ marginBottom: 64 }}>
            <Logo size={44} />
          </div>

          <h1 className="serif" style={{
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: 32,
            maxWidth: 780,
          }}>
            Seadused muutuvad{" "}
            <span style={{ color: GOLD, fontStyle: "italic" }}>infrastruktuuriks.</span>
          </h1>

          <p style={{ fontSize: "1.1rem", color: DIM, lineHeight: 1.75, maxWidth: 520, marginBottom: 56 }}>
            AI-põhine platvorm, mis muudab oiguse ligipääsetavaks igale inimesele ja
            ettevotele - kiiremini, odavamalt ja täpsemini kui ükski jurist suudaks.
          </p>

          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a href="#missioon" style={{
              display: "inline-block",
              background: GOLD, color: "#0C0F1A",
              fontWeight: 500, fontSize: "0.8rem",
              letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "12px 28px", borderRadius: 6, textDecoration: "none",
            }}>
              Vaata ariplaan
            </a>
            <a href="mailto:info@legatron.ai" style={{ fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", color: DIM, textDecoration: "none" }}>
              Vota ühendust →
            </a>
          </div>

          {/* 3 numbrit */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: `1px solid ${LINE}`, marginTop: 96,
          }}>
            {[
              { n: "€300 mld", l: "Euroopa juriidiliste teenuste turg" },
              { n: "10×", l: "odavam kui traditsiooniline jurist" },
              { n: "24/7", l: "kättesaadav, ilma ooteajata" },
            ].map((s, i) => (
              <div key={i} style={{ paddingTop: 32, paddingRight: i < 2 ? 40 : 0 }}>
                <div className="serif" style={{ fontSize: "2.5rem", fontWeight: 700, color: GOLD, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: "0.78rem", color: DIM, marginTop: 8, letterSpacing: "0.03em", lineHeight: 1.5 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSIOON */}
      <section id="missioon" style={{ padding: "100px 40px", borderTop: `1px solid ${LINE}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80 }}>
          <div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>01 - Missioon</p>
            <h2 className="serif" style={{ fontSize: "2rem", color: "#fff", lineHeight: 1.3, fontWeight: 600 }}>
              Miks maailm vajab Legatroni?
            </h2>
          </div>
          <div>
            <p style={{ fontSize: "1rem", color: DIM, lineHeight: 1.9, marginBottom: 48 }}>
              Tänapäeva oigussüsteem on üles ehitatud asjatundjate jaoks, mitte tavaliste
              inimeste jaoks. Väikeettevotja peab maksma 150-400 € tunni kohta - ja ootama
              päevi vastust, mis on vaja juba täna. Eraisik, kes sõlmib lepingut, ei tea
              sageli, millised riskid see endas peidab.
            </p>
            <p style={{ fontSize: "1rem", color: "#D8D8D8", lineHeight: 1.9 }}>
              Legatron lahendab selle probleemi: AI-põhine platvorm, mis struktureerib
              seadused, kohtulahendid ja oigusnormid ning muudab need otsinguga
              kasutatavaks sekunditega.
            </p>

            <div style={{ marginTop: 48 }}>
              {[
                "Lepingutel põhinevad vaidlused, mida oleks saanud vältida",
                "Trahvid regulatsiooninouete mittetäitmise eest",
                "Otsused, mis põhinevad valedel eeldustel oigusliku vastutuse kohta",
                "Ressursside raiskamine teenustele, mis on väikeettevotjatele taskukohatud",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 16, padding: "12px 0", borderTop: `1px solid ${LINE}` }}>
                  <span style={{ color: GOLD, flexShrink: 0, marginTop: 1 }}>—</span>
                  <span style={{ fontSize: "0.875rem", color: DIM, lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LAHENDUS */}
      <section id="lahendus" style={{ padding: "100px 40px", borderTop: `1px solid ${LINE}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, marginBottom: 72 }}>
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>02 - Lahendus</p>
              <h2 className="serif" style={{ fontSize: "2rem", color: "#fff", lineHeight: 1.3, fontWeight: 600 }}>
                10× parem kui praegune alternatiiv
              </h2>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <p style={{ fontSize: "1rem", color: DIM, lineHeight: 1.9 }}>
                Legatron ei ole lihtsalt kiirem jurist - see on täiesti uus infrastruktuurikiht,
                mis muudab oiguse ligipääsetavaks kõigile.
              </p>
            </div>
          </div>

          {/* Võrdlus */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", borderTop: `1px solid ${LINE}` }}>
            {/* Päis */}
            <div style={{ padding: "12px 0", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: DIM }} />
            <div style={{ padding: "12px 0", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: DIM }}>Jurist</div>
            <div style={{ padding: "12px 0", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: GOLD }}>Legatron</div>

            {[
              ["Hind", "150-400 € / tund", "alates 29 € / küsimus"],
              ["Vastusekiirus", "1-5 tööpäeva", "sekunditega"],
              ["Kättesaadavus", "tööajal", "24/7"],
              ["Kvaliteet", "varieerub", "konsistentne"],
              ["Mastaap", "ei skaleeru", "miljonid küsimused"],
            ].map(([label, jurist, leg], i) => (
              <>
                <div key={`a${i}`} style={{ padding: "16px 0", borderTop: `1px solid ${LINE}`, fontSize: "0.875rem", color: DIM }}>{label}</div>
                <div key={`b${i}`} style={{ padding: "16px 0", borderTop: `1px solid ${LINE}`, fontSize: "0.875rem", color: DIM }}>{jurist}</div>
                <div key={`c${i}`} style={{ padding: "16px 0", borderTop: `1px solid ${LINE}`, fontSize: "0.875rem", color: "#D8D8D8", fontWeight: 500 }}>{leg}</div>
              </>
            ))}
          </div>

          {/* Kaitsevall */}
          <div style={{ marginTop: 80 }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: DIM, marginBottom: 32 }}>
              Meid on raske kopeerida
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1 }}>
              {[
                { n: "01", t: "Struktureeritud andmebaas", d: "Aastatepikkune töö seaduste, kohtulahendite ja regulatsioonide kategoriseerimiseks." },
                { n: "02", t: "Juristi valideeritud sisu", d: "Iga oiguslik väide on inimekspert üle kontrollinud - täpsus, mida AI üksi ei anna." },
                { n: "03", t: "Riigipõhine AI treening", d: "Mudel treenitud konkreetse riigi oiguslikule kontekstile - tunduvalt parem kui üldmudelid." },
                { n: "04", t: "Interdistsiplinaarne tiim", d: "Juristi ja arendaja tihe koostöö - kombinatsioon, keda on aastatega raske järgi jäljendada." },
              ].map((m, i) => (
                <div key={i} style={{ padding: "28px 24px", borderTop: `1px solid ${LINE}`, borderLeft: i > 0 ? `1px solid ${LINE}` : "none" }}>
                  <div className="serif" style={{ fontSize: "1.5rem", color: "rgba(201,152,42,0.25)", marginBottom: 16, fontWeight: 700 }}>{m.n}</div>
                  <h4 style={{ fontSize: "0.875rem", color: "#D8D8D8", marginBottom: 10, fontWeight: 500 }}>{m.t}</h4>
                  <p style={{ fontSize: "0.8rem", color: DIM, lineHeight: 1.7 }}>{m.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TURG */}
      <section id="turg" style={{ padding: "100px 40px", borderTop: `1px solid ${LINE}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, marginBottom: 72 }}>
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>03 - Turg</p>
              <h2 className="serif" style={{ fontSize: "2rem", color: "#fff", lineHeight: 1.3, fontWeight: 600 }}>
                Suur turg, selge tee sisse
              </h2>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <p style={{ fontSize: "1rem", color: DIM, lineHeight: 1.9 }}>
                Euroopa juriidiliste teenuste turg on üle 300 miljardi euro aastas.
                Alustame Eestist ja laieneme süstemaatiliselt - iga riik on eraldi moodul,
                mudel on korratav.
              </p>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${LINE}` }}>
            {[
              { faas: "Faas 1", aeg: "2024", geo: "Eesti", desc: "Kiire iteratsioon, digitaalne ühiskond, tugev oigussüsteem. MVP launch.", active: true },
              { faas: "Faas 2", aeg: "2025 Q1-Q2", geo: "Baltikum - Läti, Leedu", desc: "Sarnane oiguslik struktuur, kiire laienemine olemasoleva mudeli põhjal.", active: false },
              { faas: "Faas 3", aeg: "2025 Q3-Q4", geo: "Euroopa - DE, FI, NL", desc: "Selged andmestikud, suur turg, API beetaversioon.", active: false },
              { faas: "Faas 4", aeg: "2026+", geo: "Globaalne laienemine", desc: "API ärimudel, Enterprise, üle 50 riigi kaetus.", active: false },
            ].map((f, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr auto", gap: 40, padding: "20px 0", borderBottom: `1px solid ${LINE}`, alignItems: "center" }}>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: f.active ? GOLD : DIM }}>{f.faas}</span>
                <span style={{ fontSize: "0.8rem", color: DIM }}>{f.aeg}</span>
                <span style={{ fontSize: "0.875rem", color: "#D8D8D8" }}>{f.geo}</span>
                <span style={{ fontSize: "0.8rem", color: DIM, textAlign: "right" }}>
                  {f.active ? <span style={{ color: GOLD, fontWeight: 500 }}>Aktiivne</span> : f.desc.split(".")[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOODE */}
      <section id="toode" style={{ padding: "100px 40px", borderTop: `1px solid ${LINE}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, marginBottom: 72 }}>
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>04 - Toode</p>
              <h2 className="serif" style={{ fontSize: "2rem", color: "#fff", lineHeight: 1.3, fontWeight: 600 }}>
                Toote teekond
              </h2>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <p style={{ fontSize: "1rem", color: DIM, lineHeight: 1.9 }}>
                MVP on käivitamiseks valmis. Iga järgmine versioon lisab uue kihi väärtust
                ja suurendab keskmist tellimusväärtust.
              </p>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${LINE}` }}>
            {[
              {
                v: "V1 - MVP",
                title: "Eesti seadused + AI otsing",
                features: ["Kõik Eesti kehtivad seadused", "Automaatne uuendus", "Riigikohtu lahendid", "Seaduseviited iga vastuse juures"],
                current: true,
              },
              {
                v: "V2",
                title: "Dokumendianalüüs",
                features: ["Lepingute üleslaadimine", "Riskide tuvastamine", "Oluliste klauslite analüüs"],
                current: false,
              },
              {
                v: "V3",
                title: "Lepingugeneraator",
                features: ["Tööleping, NDA, teenusleping", "Osanike leping", "Täidetav mall koos selgitustega"],
                current: false,
              },
              {
                v: "V4",
                title: "Muudatuste jälgimine",
                features: ["Ettevote profiil", "Automaatsed teavitused", "Riskimuutuse analüüs"],
                current: false,
              },
              {
                v: "V5",
                title: "Rahvusvaheline",
                features: ["Piiriülese äri toetamine", "Mitu riiki ühes lepingus", "Globaalne API"],
                current: false,
              },
            ].map((r, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 200px 1fr", gap: 40, padding: "24px 0", borderBottom: `1px solid ${LINE}`, alignItems: "start" }}>
                <span className="serif" style={{ fontSize: "0.9rem", color: r.current ? GOLD : DIM, fontWeight: r.current ? 600 : 400 }}>{r.v}</span>
                <span style={{ fontSize: "0.9rem", color: "#D8D8D8", paddingTop: 1 }}>{r.title}</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 24px" }}>
                  {r.features.map((f, j) => (
                    <span key={j} style={{ fontSize: "0.8rem", color: DIM }}>— {f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HINNAD */}
      <section id="hinnad" style={{ padding: "100px 40px", borderTop: `1px solid ${LINE}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, marginBottom: 72 }}>
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>05 - Ärimudel</p>
              <h2 className="serif" style={{ fontSize: "2rem", color: "#fff", lineHeight: 1.3, fontWeight: 600 }}>
                Selge hinnakujundus
              </h2>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <p style={{ fontSize: "1rem", color: DIM, lineHeight: 1.9 }}>
                Traditsiooniline juriidiline noustamine algab 150 € tunnist. Legatron pakub
                sama tulemust murdosa hinnaga - koheselt, iga kord.
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, borderTop: `1px solid ${LINE}` }}>
            {[
              {
                segment: "Eraisik",
                price: "€29",
                unit: "küsimus",
                features: ["Üks detailne vastus", "Seaduseviited", "Praktilised soovitused", "Üürileping, tööoigus, tarbijakaitse"],
              },
              {
                segment: "Väike ja Keskmine Ettevote",
                price: "€49",
                unit: "kuu",
                features: ["Piiramatu arv küsimusi", "Dokumendianalüüs", "Lepingute eelkontroll", "Kuni 50 töötajaga ettevoted"],
                featured: true,
              },
              {
                segment: "Premium Ettevote",
                price: "€199",
                unit: "kuu",
                features: ["Kõik SME eelised", "Lepingugeneraator", "Riskianalüüs", "Prioriteetne tugi"],
              },
              {
                segment: "Enterprise",
                price: "€1k-10k",
                unit: "kuu",
                features: ["API integratsioon", "SLA-garantiid", "Rahvusvaheline", "Pangad, kindlustus, korporatsioonid"],
              },
            ].map((p, i) => (
              <div key={i} style={{
                padding: "32px 24px",
                borderLeft: i > 0 ? `1px solid ${LINE}` : "none",
                borderBottom: p.featured ? `2px solid ${GOLD}` : "none",
              }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: p.featured ? GOLD : DIM, marginBottom: 20 }}>{p.segment}</p>
                <div style={{ marginBottom: 24 }}>
                  <span className="serif" style={{ fontSize: "2.4rem", fontWeight: 700, color: p.featured ? GOLD : "#D8D8D8" }}>{p.price}</span>
                  <span style={{ fontSize: "0.8rem", color: DIM, marginLeft: 6 }}>/ {p.unit}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {p.features.map((f, j) => (
                    <span key={j} style={{ fontSize: "0.8rem", color: DIM, lineHeight: 1.5 }}>— {f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISIOON */}
      <section id="visioon" style={{ padding: "100px 40px", borderTop: `1px solid ${LINE}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, marginBottom: 72 }}>
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>06 - Visioon</p>
              <h2 className="serif" style={{ fontSize: "2rem", color: "#fff", lineHeight: 1.3, fontWeight: 600 }}>
                Globaalne oiguse infrastruktuur
              </h2>
            </div>
            <div>
              <p style={{ fontSize: "1rem", color: DIM, lineHeight: 1.9, marginBottom: 40 }}>
                Legatron ei ehita lihtsalt tööriista. Pikaajaline visioon on saada maailma
                esimeseks riikideüleseks oiguse infrastruktuurisüsteemiks - süsteemiks,
                mille kaudu ettevotted ja eraisikud saavad teha kõik juriidilised otsused
                ükskõik millises riigis.
              </p>
              <p className="serif" style={{ fontSize: "1.3rem", color: "#fff", lineHeight: 1.6, fontStyle: "italic", borderLeft: `2px solid ${GOLD}`, paddingLeft: 24 }}>
                Visioon 2030: üle 50 riigi seadused, miljonid küsimused päevas, ettevottetele
                ja eraisikutele üle maailma.
              </p>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${LINE}` }}>
            {[
              { s: "Eesti ettevote soovib eksportida Slovakkiasse", l: "Maksueeskirjad, lepingunouded, toodete regulatsioonid - koheselt." },
              { s: "Eraisik kolib tööle Hispaaniasse", l: "Töötamine, elamisluba, tarbijaõigus - kõik ühes kohas." },
              { s: "Startup asutab firma Saksamaal", l: "GmbH nouded, tööoigus, andmekaitse - struktureeritud ülevaade." },
              { s: "Pank kontrollib vastavust EL-i direktiivile", l: "Automaatne regulatsioonikaart, seadusemuudatuste jälgimine." },
            ].map((c, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, padding: "18px 0", borderBottom: `1px solid ${LINE}` }}>
                <span style={{ fontSize: "0.875rem", color: DIM }}>{c.s}</span>
                <span style={{ fontSize: "0.875rem", color: "#D8D8D8" }}>{c.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KKK */}
      <section id="kkk" style={{ padding: "100px 40px", borderTop: `1px solid ${LINE}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80 }}>
          <div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>07 - KKK</p>
            <h2 className="serif" style={{ fontSize: "2rem", color: "#fff", lineHeight: 1.3, fontWeight: 600 }}>
              Investori küsimused
            </h2>
          </div>
          <div>
            {[
              { q: "Miks just nüüd?", a: "AI mudelite võimekus jõudis 2023-2024 jooksul tasemele, kus struktureeritud oiguse andmestik koos keelemudeliga annab usaldusväärseid ja viidatavaid vastuseid. Varem polnud täpsus piisav, et turule minna vastutustundlikult." },
              { q: "Miks alustada Eestist?", a: "Eesti on väike (1,4 mln), kõrgelt digitaliseeritud ja omab selget ning avalikult kättesaadavat seaduste andmebaasi (Riigi Teataja). See võimaldab kiiresti itereerida ja mudeli täpsust tõestada enne laiemat sisenemist." },
              { q: "Kui suureks saab see kasvada?", a: "Euroopa juriidiliste teenuste turg on hinnanguliselt üle 300 miljardi euro aastas. Isegi 0,1% sellest turust tähendab 300 mln € käivet. LegalTech kui AI vertikaali kasvutempo ületab üldist SaaS-i kasvu märkimisväärselt." },
              { q: "Mis takistab konkurente?", a: "Struktureeritud ja juristi-valideeritud riigipõhine andmestik on aastatepikkune töö. Üldised AI mudelid (ChatGPT jt) ei suuda seda asendada - neil puudub täpsus, viited ja lokaalne kontekst. Varajane positsioon loob võrgustikeefekti." },
              { q: "Kuidas skaaleerimine rahvusvaheliselt toimib?", a: "Iga riik on eraldi moodul: seadused - lokaliseerimine - AI treenimine - launch. Mudel on korratav. Pärast kolme esimest riiki on protsess automatiseeritud ja kiiremat laienemist toetab API ärimudel." },
              { q: "Kas oigus on järgmine suur AI vertikaali?", a: "Koos tervishoiu, finantsteenuste ja haridusega on oigus üks maailma suurimaid ja kõrgeima väärtusega teenussektoreid. Erinevalt paljudest muudest sektoritest on seadusandlik andmestik avalik ja struktureeritud, mis muudab AI rakendamise kiiremaks." },
            ].map((item, i) => <Faq key={i} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "120px 40px", borderTop: `1px solid ${LINE}`, textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <Logo size={40} />
          <h2 className="serif" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#fff", lineHeight: 1.2, marginTop: 32, marginBottom: 24, fontWeight: 700 }}>
            Seadused ei pea olema{" "}
            <span style={{ color: GOLD, fontStyle: "italic" }}>keerulised.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: DIM, lineHeight: 1.8, marginBottom: 48 }}>
            Legatron muudab need arusaadavaks. Liitume Baltikumi kiireima legaltechi
            ehitamise teekonnale.
          </p>

          <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: DIM, marginBottom: 12 }}>
            Küsimuste korral
          </p>
          <a href="mailto:info@legatron.ai" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: "1rem", color: GOLD, textDecoration: "none", fontWeight: 400 }}>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <rect x="0.5" y="0.5" width="15" height="11" rx="1" stroke={GOLD} />
              <path d="M0.5 1.5L8 7.5L15.5 1.5" stroke={GOLD} />
            </svg>
            info@legatron.ai
          </a>

          <div style={{ marginTop: 80, paddingTop: 32, borderTop: `1px solid ${LINE}`, fontSize: "0.72rem", color: "rgba(216,216,216,0.2)", letterSpacing: "0.06em" }}>
            © 2024 Legatron · Investor-taseme dokument · Konfidentsiaalne
          </div>
        </div>
      </section>

    </main>
  );
}
