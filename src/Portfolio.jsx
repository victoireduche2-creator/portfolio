import { useState, useEffect, useRef, useCallback } from "react";

const t = {
  navy: "#1B3A5C",
  navyLight: "#2A5580",
  accent: "#5A9EC6",
  bg: "#FAFBFD",
  bgCard: "#FFFFFF",
  text: "#1B3A5C",
  textLight: "#6B7F94",
  border: "#E2E8F0"
};

const IDENTITY = {
  name: "Victoire Duché",
  metier: "Ouvrière en pâtisserie",
  email: "victoireduche2@gmail.com",
  phone: "06 13 99 19 18",
  address: "54 Rue Charles Beauhaire, 45140 St Jean de la Ruelle (temporaire)",
  accroche: "Passionnée et rigoureuse, je mets mon savoir-faire au service de créations soignées, entre tradition et modernité."
};

const DIPLOMES = [
  { annee: "2023 – 2025", titre: "BTM Pâtissier", lieu: "CMA / Orléans", detail: "Maître Artisan JSC / Maison JOUANNEAU à Neuville-aux-Bois" },
  { annee: "2022 – 2023", titre: "MC PGCCS", lieu: "CMA / Orléans", detail: "La Note Sucrée à Saint-Jean-de-la-Ruelle" },
  { annee: "2020 – 2022", titre: "CAP Pâtissier", lieu: "CMA / Orléans", detail: "" }
];

const EXPERIENCES = [
  { annee: "2025 – 2026", titre: "Ouvrière en pâtisserie", lieu: "Maître Artisan JSC / Maison JOUANNEAU, Neuville-aux-Bois" },
  { annee: "2025", titre: "Stage Galettes", lieu: "Animé par Jérôme LANGILIER / Ardon" },
  { annee: "2024", titre: "Stage de Pâques", lieu: "Animé par Thibault DORIDOT pour Cacao Barry / CMA Orléans" },
  { annee: "2024", titre: "Stage de Noël", lieu: "Animé par Thibault DORIDOT pour Cacao Barry / Callebaut Chocolate Academy Paris" },
  { annee: "2024", titre: "Gestion d'un stand lors du salon de la Gastronomie", lieu: "Orléans" },
  { annee: "2022", titre: "Commis d'aide en préparation à la Finale au MOF Chocolatier", lieu: "CMA Orléans" },
  { annee: "2020", titre: "Commis à l'épreuve pratique du BTM", lieu: "CMA Orléans" }
];

const p = (folder, file) => `${import.meta.env.BASE_URL}img/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;

const CATEGORIES = [
  {
    title: "BTM & Ouvrière",
    description: "Créations réalisées durant le BTM Pâtissier et en tant qu'ouvrière.",
    images: [
      "IMG_0544.jpg","IMG_1497.JPG","IMG_1675.JPG","IMG_1844.jpg",
      "IMG_2513.jpg","IMG_2517.jpg","IMG_2527.jpg","IMG_2530.jpg",
      "IMG_3324.jpg","IMG_3329.jpg","IMG_3358.jpg","IMG_3365.jpg",
      "IMG_3634.jpg","IMG_3635.jpg","IMG_3640.jpg","IMG_3641.JPG",
      "IMG_3766.JPG","IMG_3950.jpg","IMG_4014.JPG","IMG_4209.jpg",
      "IMG_4210.JPG","IMG_4212.jpg","IMG_4235.jpg","IMG_4881.JPG",
      "IMG_4899.jpg","IMG_4901.jpg","IMG_4906.jpg","IMG_4907.jpg",
      "IMG_5642.jpg","IMG_6815.JPG","IMG_7004.jpg","IMG_7404.jpg",
      "IMG_7416.jpg","IMG_7420.jpg","IMG_7421.jpg","IMG_8160.jpg",
      "IMG_8189.jpg","IMG_8199.jpg","IMG_8215.jpg","IMG_8793.jpg",
      "IMG_8843.jpg","IMG_8906.jpg","IMG_8907.jpg","IMG_8920.jpg",
      "IMG_8921.jpg","IMG_9005.jpg","IMG_9189.jpg","IMG_9307.png",
      "IMG_9310.jpg","IMG_9511.jpg","IMG_9910.jpg"
    ].map(f => p("BTM et Ouvrière", f))
  },
  {
    title: "CAP & MC PGCCS",
    description: "Travaux de formation en CAP Pâtissier et Mention Complémentaire.",
    images: [
      "IMG_0439.jpg","IMG_1696.JPG","IMG_2816.jpg","IMG_2905.jpg",
      "IMG_2978.jpg","IMG_3368.jpg","IMG_3505.jpg","IMG_3556.jpg",
      "IMG_3703.jpg","IMG_3717.jpg","IMG_4514.jpg","IMG_4519.jpg",
      "IMG_4586.jpg","IMG_4773.jpg","IMG_4846.jpg","IMG_4847.jpg",
      "IMG_5102.jpg","IMG_5105.jpg","IMG_5108.jpg","IMG_5216.jpg",
      "IMG_5219.jpg","IMG_5221.jpg","IMG_5223.JPG","IMG_5231.JPG",
      "IMG_5232.JPG","IMG_5236.JPG","IMG_5237.JPG","IMG_5238.JPG",
      "IMG_5239.JPG","IMG_5240.JPG","IMG_5242.JPG","IMG_5245.JPG",
      "IMG_5246.JPG","IMG_5247.JPG","IMG_5249.JPG","IMG_5252.JPG",
      "IMG_5253.JPG","IMG_5254.JPG","IMG_5508.jpg","IMG_5571.jpg",
      "IMG_5762.jpg","IMG_5800.jpg","IMG_5805.JPG","IMG_5876.jpg",
      "IMG_5981.jpg","IMG_6084.JPG","IMG_6151.jpg","IMG_6354.jpg",
      "IMG_6979.jpg","IMG_7001.jpg","img_3_1679674591549.jpg",
      "img_4_1679674743968.jpg","img_6_1679674803008.jpg"
    ].map(f => p("CAP et MCPGCCS", f))
  },
  {
    title: "Essais concours Galette",
    description: "Recherches et essais pour les concours de galette des rois.",
    images: [
      "9363E9B4-8209-41D9-B0D7-2C81325DDB90.jpg",
      "IMG_6154.jpg","IMG_6155.jpg","IMG_6157.jpg","IMG_6339.jpg"
    ].map(f => p("Essaies concours Galette", f))
  },
  {
    title: "Pièces en chocolat",
    description: "Pièces artistiques en chocolat.",
    images: [
      "IMG_1675.JPG","IMG_6488.JPG","IMG_7447.jpg","IMG_8845.jpg","IMG_8848.jpg"
    ].map(f => p("pièces en chocolat", f))
  },
  {
    title: "Pièces montées",
    description: "Montages événementiels.",
    images: [
      "IMG_1497.JPG","IMG_2490.jpg","IMG_2753.jpg","IMG_3547.jpg",
      "IMG_3945.jpg","IMG_5438.jpg","IMG_5628.jpg","IMG_6207.jpg",
      "IMG_6211.jpg","IMG_7060.jpg","IMG_8843.jpg"
    ].map(f => p("pièces montées", f))
  }
];

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const revealRefs = useRef([]);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    revealRefs.current = revealRefs.current.filter(el => el && document.contains(el));
    const obs = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = "translateY(0)"; obs.unobserve(e.target); }
    }), { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    revealRefs.current.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [activeCategory]);

  const addR = useCallback((el) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); }, []);
  const rv = (d = 0) => ({ opacity: 0, transform: "translateY(24px)", transition: `opacity 0.6s cubic-bezier(.22,1,.36,1) ${d}s, transform 0.6s cubic-bezier(.22,1,.36,1) ${d}s` });

  const activeCat = CATEGORIES[activeCategory];

  return (
    <div style={{ background: t.bg, color: t.text, fontFamily: "'Inter',system-ui,sans-serif", fontSize: 15, fontWeight: 400, lineHeight: 1.7, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* ═══ LIGHTBOX ═══ */}
      {lightbox && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, cursor: "pointer" }}
          onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" style={{ maxWidth: "90vw", maxHeight: "88vh", objectFit: "contain", borderRadius: 4 }} />
        </div>
      )}

      {/* ═══════════════════════════════════════
         NAV
         ═══════════════════════════════════════ */}
      <nav style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 5000, padding: scrolled ? "12px 6vw" : "20px 6vw", display: "flex", justifyContent: "space-between", alignItems: "center", background: scrolled || menuOpen ? "rgba(255,255,255,0.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled || menuOpen ? `1px solid ${t.border}` : "none", transition: "all 0.35s" }}>
        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 600, color: t.navy }}>
          {IDENTITY.name.split(" ")[0]}<span style={{ color: t.accent }}>.</span>
        </span>
        <div className="nav-links" style={{ display: "flex", gap: 24 }}>
          {[["Parcours","parcours"],["Créations","creations"],["Contact","contact"]].map(([l,id]) => (
            <a key={id} href={`#${id}`} style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", color: t.textLight, textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={(e) => e.target.style.color = t.navy} onMouseLeave={(e) => e.target.style.color = t.textLight}>{l}</a>
          ))}
        </div>
        <button className="nav-burger" onClick={() => setMenuOpen(m => !m)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: t.navy, fontSize: 24, padding: "2px 4px", lineHeight: 1, alignItems: "center", justifyContent: "center" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>
      {menuOpen && (
        <div style={{ position: "fixed", top: 57, left: 0, right: 0, zIndex: 4999, background: "rgba(255,255,255,0.97)", borderBottom: `1px solid ${t.border}`, padding: "20px 6vw", display: "flex", flexDirection: "column", gap: 18 }}>
          {[["Parcours","parcours"],["Créations","creations"],["Contact","contact"]].map(([l,id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}
              style={{ fontSize: 14, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: t.navy, textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════════
         HERO
         ═══════════════════════════════════════ */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 6vw", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 640, position: "relative", zIndex: 2 }}>
          <div ref={addR} style={{ ...rv(0), display: "inline-block", background: t.navy, color: "#fff", padding: "4px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 24 }}>
            {IDENTITY.metier}
          </div>
          <h1 ref={addR} style={{ ...rv(0.1), fontFamily: "'Playfair Display',serif", fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 700, lineHeight: 1.05, color: t.navy, marginBottom: 20, letterSpacing: "-0.02em" }}>
            {IDENTITY.name}
          </h1>
          <p ref={addR} style={{ ...rv(0.2), fontSize: 16, color: t.textLight, lineHeight: 1.7, maxWidth: 480, marginBottom: 32, fontWeight: 300 }}>
            {IDENTITY.accroche}
          </p>
          <div ref={addR} style={{ ...rv(0.3), display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#creations" style={{ display: "inline-block", padding: "12px 28px", background: t.navy, color: "#fff", fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", textDecoration: "none", borderRadius: 6, transition: "background 0.3s" }}
              onMouseEnter={(e) => e.target.style.background = t.navyLight} onMouseLeave={(e) => e.target.style.background = t.navy}>Voir mes créations</a>
            <a href="#contact" style={{ display: "inline-block", padding: "12px 28px", border: `1.5px solid ${t.navy}`, color: t.navy, fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", textDecoration: "none", borderRadius: 6, background: "transparent", transition: "background 0.3s" }}
              onMouseEnter={(e) => e.target.style.background = t.navy + "0a"} onMouseLeave={(e) => e.target.style.background = "transparent"}>Me contacter</a>
          </div>
        </div>
        <div className="hero-deco" style={{ position: "absolute", right: "-5vw", top: "50%", transform: "translateY(-50%)", width: "clamp(300px,42vw,560px)", height: "clamp(300px,42vw,560px)", borderRadius: "50%", background: `linear-gradient(135deg, ${t.navy}08, ${t.accent}12)`, border: `1px solid ${t.border}`, pointerEvents: "none" }} />
        <div className="hero-deco" style={{ position: "absolute", right: "2vw", top: "calc(50% + 60px)", transform: "translateY(-50%)", width: "clamp(140px,18vw,220px)", height: "clamp(140px,18vw,220px)", borderRadius: "50%", border: `1px solid ${t.accent}30`, pointerEvents: "none" }} />
      </section>

      {/* ═══════════════════════════════════════
         PARCOURS
         ═══════════════════════════════════════ */}
      <section id="parcours" style={{ padding: "clamp(60px,8vw,120px) 6vw", maxWidth: 1100, margin: "0 auto" }}>
        <div ref={addR} style={rv(0)}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: t.accent, marginBottom: 8 }}>Parcours</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 600, color: t.navy, marginBottom: 8 }}>Formation & Expérience</h2>
          <div style={{ width: 40, height: 2, background: t.accent, borderRadius: 1, marginBottom: 48 }} />
        </div>

        <div className="parcours-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(30px,4vw,60px)" }}>
          <div ref={addR} style={rv(0.1)}>
            <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: t.navy, marginBottom: 20 }}>Diplômes</h3>
            {DIPLOMES.map((d, i) => (
              <div key={i} style={{ position: "relative", paddingLeft: 20, marginBottom: 24, borderLeft: `2px solid ${t.border}` }}>
                <div style={{ position: "absolute", left: -5, top: 4, width: 8, height: 8, borderRadius: "50%", background: t.accent }} />
                <div style={{ fontSize: 11, fontWeight: 600, color: t.accent, marginBottom: 2 }}>{d.annee}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: t.navy }}>{d.titre}</div>
                <div style={{ fontSize: 12, color: t.textLight }}>{d.lieu}</div>
                {d.detail && <div style={{ fontSize: 11, color: t.textLight, marginTop: 2, fontStyle: "italic" }}>{d.detail}</div>}
              </div>
            ))}
          </div>
          <div ref={addR} style={rv(0.2)}>
            <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: t.navy, marginBottom: 20 }}>Expériences</h3>
            {EXPERIENCES.map((x, i) => (
              <div key={i} style={{ position: "relative", paddingLeft: 20, marginBottom: 24, borderLeft: `2px solid ${t.border}` }}>
                <div style={{ position: "absolute", left: -5, top: 4, width: 8, height: 8, borderRadius: "50%", background: t.navy }} />
                <div style={{ fontSize: 11, fontWeight: 600, color: t.accent, marginBottom: 2 }}>{x.annee}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: t.navy }}>{x.titre}</div>
                <div style={{ fontSize: 12, color: t.textLight }}>{x.lieu}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
         GALERIE
         ═══════════════════════════════════════ */}
      <section id="creations" style={{ padding: "clamp(60px,8vw,120px) 6vw", maxWidth: 1200, margin: "0 auto" }}>
        <div ref={addR} style={rv(0)}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: t.accent, marginBottom: 8 }}>Portfolio</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 600, color: t.navy, marginBottom: 8 }}>Mes Créations</h2>
          <div style={{ width: 40, height: 2, background: t.accent, borderRadius: 1, marginBottom: 32 }} />
        </div>

        <div ref={addR} style={{ ...rv(0.1), display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          {CATEGORIES.map((cat, i) => (
            <button key={i} onClick={() => setActiveCategory(i)}
              style={{
                padding: "9px 20px", borderRadius: 24, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.3s", border: "none",
                background: activeCategory === i ? t.navy : "transparent",
                color: activeCategory === i ? "#fff" : t.textLight,
                boxShadow: activeCategory === i ? `0 2px 8px ${t.navy}30` : "none",
                outline: activeCategory !== i ? `1.5px solid ${t.border}` : "none"
              }}
              onMouseEnter={(e) => { if (activeCategory !== i) e.target.style.color = t.navy; }}
              onMouseLeave={(e) => { if (activeCategory !== i) e.target.style.color = t.textLight; }}>
              {cat.title}
            </button>
          ))}
        </div>

        {activeCat.description && (
          <p style={{ fontSize: 14, color: t.textLight, marginBottom: 24, maxWidth: 500 }}>{activeCat.description}</p>
        )}

        <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
          {activeCat.images.map((src, i) => (
            <div ref={addR} key={i} style={{ ...rv(0), position: "relative", aspectRatio: "4/5", borderRadius: 8, overflow: "hidden", cursor: "pointer", background: t.bgCard, border: `1px solid ${t.border}` }}
              onClick={() => setLightbox(src)}>
              <img src={src} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }}
                onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.04)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
         CONTACT
         ═══════════════════════════════════════ */}
      <section id="contact" style={{ padding: "clamp(60px,8vw,120px) 6vw", maxWidth: 900, margin: "0 auto" }}>
        <div ref={addR} style={{ ...rv(0), textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: t.accent, marginBottom: 8 }}>Contact</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 600, color: t.navy, marginBottom: 8 }}>Travaillons ensemble</h2>
          <div style={{ width: 40, height: 2, background: t.accent, borderRadius: 1, margin: "0 auto 32px" }} />
        </div>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 16 }}>
          {[
            { icon: "✉️", label: "Email", value: IDENTITY.email },
            { icon: "📱", label: "Téléphone", value: IDENTITY.phone },
            { icon: "🟢", label: "Disponibilité", value: "Septembre 2026" }
          ].map((b, i) => (
            <div ref={addR} key={i} style={{ ...rv(0.08 * (i + 1)), padding: "24px 18px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>{b.icon}</div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: t.accent, marginBottom: 4 }}>{b.label}</div>
              <div style={{ fontSize: 13, color: t.navy, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.value}</div>
            </div>
          ))}
        </div>
        <div ref={addR} style={{ ...rv(0.32), padding: "24px 18px", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, textAlign: "center" }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>📍</div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: t.accent, marginBottom: 4 }}>Adresse</div>
          <div style={{ fontSize: 13, color: t.navy, fontWeight: 500 }}>{IDENTITY.address}</div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: `1px solid ${t.border}`, padding: "28px 6vw", textAlign: "center", maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ fontSize: 11, color: t.textLight }}>© 2026 {IDENTITY.name} — {IDENTITY.metier}</p>
      </footer>

      <style>{`
        html { scroll-behavior: smooth; }
        body { margin: 0; overflow-x: hidden; }
        * { box-sizing: border-box; }
        ::selection { background: ${t.navy}; color: #fff; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-burger { display: flex !important; }
          .hero-deco { display: none !important; }
        }
        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
