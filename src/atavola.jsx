import { useState, useEffect, useRef, useCallback } from "react";
import { Phone, Mail, MapPin, ChevronDown } from "lucide-react";

const C = {
  bg: "#0C0908",
  surface: "#141110",
  surfaceAlt: "#191514",
  accent: "#8B1C1C",
  accentHov: "#A52424",
  cream: "#EEE4CC",
  secondary: "#9A8878",
  muted: "#584540",
  border: "#231915",
  borderMid: "#2E1E19",
};

const FOOD_TABS = [
  { id: "antipasti", label: "Antipasti", sub: "Starters" },
  { id: "insalate", label: "Insalate", sub: "Salads" },
  { id: "primi", label: "Primi", sub: "Pasta & First Courses" },
  { id: "secondi", label: "Secondi", sub: "Main Courses" },
  { id: "dolci", label: "Dolci", sub: "Desserts" },
  { id: "contorni", label: "Contorni & Caffè", sub: "Sides & Coffee" },
];

const WINE_TABS = [
  { id: "sparkling", label: "Sparkling" },
  { id: "white", label: "White & Rosé" },
  { id: "red", label: "Red" },
  { id: "cellar", label: "Cellar Selection" },
];

const FOOD = {
  antipasti: [
    { name: "Cappelletti in Brodo", price: 145, desc: "Fresh pasta pockets filled with ricotta & parmesan, in a home-made chicken broth" },
    { name: "Zuppa ai Frutti di Mare", price: 205, desc: "Home-made seafood soup with mussels, prawns, linefish & calamari, served with bruschetta" },
    { name: "Antipasto Misto", price: 235, desc: "A platter of sliced Parma Ham, Salame & Mortadella with mozzarella & tomato bruschetta, grilled veg & olives", note: "for 2" },
    { name: "Bruschette Miste", price: 165, desc: "Toasted Italian bread, topped with olive tapenade, grilled vegetables, fresh mozzarella & tomato with basil" },
    { name: "Carpaccio Cipriani", price: 185, desc: "Thinly sliced raw beef fillet topped with fresh rocket, shaved parmesan & a Cipriani dressing" },
    { name: "Cozze Tarantina", price: 180, desc: "Fresh mussels cooked in tomato, chilli, garlic & white wine, served with bruschetta" },
    { name: "Gnocchi Gorgonzola", price: 170, desc: "Potato dumplings tossed in a sauce of gorgonzola & cream, topped with parmesan" },
    { name: "Steak Tartare", price: 185, desc: "Minced raw beef fillet served with egg yolk, condiments, mixed baby leaves & bruschetta" },
    { name: "Zucchini Fritti", price: 135, desc: "Deep-fried baby marrow chips" },
  ],
  insalate: [
    { name: "Carciofi alla Parmigiana", price: 180, desc: "Grilled & marinated artichokes tossed with baby leaves, shaved parmesan and toasted ciabatta" },
    { name: "Caprese di Burrata", price: 215, desc: "Fresh hand-made mozzarella ball filled with soft stracciatella cheese, served on mixed baby leaves with Roma tomatoes and basil" },
    { name: "Insalata Greca", price: 175, desc: "Mixed green leaves topped with olives, feta cheese, red onion, cucumber and tomato" },
    { name: "Insalata di Pollo", price: 205, desc: "A mix of green leaves topped with grilled chicken breast, marinated vegetables and feta cheese" },
    { name: "Insalata Calamari", price: 215, desc: "Grilled calamari served on mixed leaves with marinated tomato and a touch of chili" },
  ],
  primi: [
    { name: "Cannelloni di Spinaci", price: 210, desc: "Fresh pasta tubes filled with spinach, ricotta & parmesan, baked with béchamel and a napoli sauce" },
    { name: "Melanzane alla Parmigiana", price: 195, desc: "Baked layers of aubergine, mozzarella, basil, napoletana sauce & parmesan" },
    { name: "Lasagna", price: 240, desc: "Bolognese baked meat lasagna with parmesan" },
    { name: "Tagliolini ai Funghi e Tartufo", price: 245, desc: "Fresh thin pasta tossed with wild mushrooms, fresh rocket & a touch of truffle paste, topped with parmesan" },
    { name: "Fusilli ai Broccoli", price: 205, desc: "Spiral pasta with fresh broccoli & olive oil, tossed with chilli, garlic, parsley, anchovies & parmesan" },
    { name: "Linguine Gamberoni", price: 315, desc: "Queen prawns tossed with extra virgin olive oil, garlic, chilli, parsley, lemon and diced fresh tomato" },
    { name: "Linguine Pescatore", price: 315, desc: "Thin pasta tossed in a sauce of tomato, mussels, prawns and calamari with a touch of chili and garlic" },
    { name: "Farfalle Prosciutto e Piselli", price: 245, desc: "Fresh bowtie pasta tossed with ham, mushroom, cream, peas & topped with parmesan" },
    { name: "Penne all'Amatriciana con Chorizo", price: 265, desc: "Tube pasta with tomato, onion, chilli, garlic, chorizo, mushrooms, baby spinach, a touch of cream & parmesan" },
    { name: "Tortelli ai Funghi e Parma", price: 265, desc: "Fresh pasta parcels of ricotta & ham, in a light cream & mushroom sauce, with rocket, truffle paste & parmesan" },
  ],
  secondi: [
    { name: "Pesce al Forno con Salsa Verde", price: 285, desc: "Grilled fresh line fish served with stewed lentils, steamed veg, diced tomato & salsa verde" },
    { name: "Saltimbocca alla Romana", price: "275 / 295", desc: "Grilled free-range chicken breast or veal topped with cheese, sage & prosciutto, served with potato & broccoli" },
    { name: "Vitello ai Funghi or Limone", price: 295, desc: "Grilled veal scallops with wild mushroom sauce or lemon sauce, served with broccoli on fresh pasta" },
    { name: "Tagliata di Manzo", price: 295, desc: "Herb-rubbed 250g rib eye, grilled to M/R, sliced & served with roast Roma tomatoes & broccoli" },
    { name: "Filetto della Casa", price: 305, desc: "Thinly sliced beef fillet, marinated & seared, topped with rocket, parmesan shavings & roasted potatoes" },
    { name: "Fegato alla Veneziana", price: 265, desc: "Fresh calves' liver with white wine & onions, served on potato purée or fresh ribbon pasta" },
  ],
  dolci: [
    { name: "Affogato e Caffè", price: 125, desc: "Choice of gelato flavour with espresso poured over" },
    { name: "Torta di Cioccolato", price: 155, desc: "Baked chocolate tart served with hazelnut gelato" },
    { name: "Dolce della Nonna", price: 145, desc: "Layers of amaretti biscuits, zabaglione, cream, walnuts & grated chocolate" },
    { name: "Pavlova", price: 135, desc: "Meringue topped with whipped cream, fresh fruit & berries" },
    { name: "Panna Cotta", price: 135, desc: "White chocolate and vanilla pod, served with a berry coulis" },
    { name: "Torta all'Arancia", price: 155, desc: "Flourless Italian almond and orange tart served with a mascarpone cream" },
    { name: "Tiramisù", price: 145, desc: "Layers of savoiardi biscuits soaked in espresso & liqueur, with a mascarpone cream" },
    { name: "Piatto di Cioccolato", price: 125, desc: "An assortment of four chocolate truffles" },
    { name: "Piatto di Formaggio", price: 180, desc: "Selection of cheeses with preserved figs, nuts, onion marmalade and crackers" },
    { name: "Dom Pedro", price: 105, desc: "With Kahlua or Whiskey & gelato" },
    { name: "Vin Santo con Biscotti", price: 125, desc: "Sweet wine and biscuits" },
  ],
  contorni: [
    { name: "Baby Spinach & Parmesan", price: 72, desc: "" },
    { name: "Potato Wedges", price: 52, desc: "" },
    { name: "Marinated Grilled Veg", price: 58, desc: "" },
    { name: "Side Broccoli", price: 55, desc: "" },
    { name: "Side Pasta", price: 49, desc: "" },
    { name: "Zucchini Fritti", price: 75, desc: "" },
  ],
};

const GELATO = [
  { name: "Chocolate", price: 60 },
  { name: "Hazelnut", price: 60 },
  { name: "Vanilla Bean", price: 60 },
  { name: "Sorbet", price: 60 },
];

const CAFFE = [
  { name: "Caffè Latte", price: 45 },
  { name: "Cappuccino", price: 45 },
  { name: "Espresso", price: 38 },
  { name: "Americano", price: 42 },
  { name: "Macchiato", price: 40 },
];

const WINES = {
  sparkling: [
    { name: "Laurent-Perrier Millésimé '15", price: 1995 },
    { name: "Laurent-Perrier La Cuvée Brut", price: 1295 },
    { name: "Pierre Mignon Rosé or Brut 375ml", price: 475 },
    { name: "Domaine Des Dieux 'Claudia' Brut '21", notes: "4½ stars — John Platter", price: 495 },
    { name: "Weltevrede 'Entheos' Brut MCC", notes: "Michelangelo Awards Gold Medal", price: 395 },
    { name: "Col di Rocca Prosecco Superiore DOCG", notes: "150ml R85", price: 365 },
  ],
  white: [
    { name: "Blackwater 'Lazy Lucy' Rosé '25", grape: "Mourvèdre, Syrah, Grenache", price: 255, glass: 90, tag: "Rosé" },
    { name: "Vrede en Lust 'Jess' Rosé '25", grape: "Pinotage, Shiraz, Grenache", price: 265, glass: 95, tag: "Rosé" },
    { name: "Elmie Limited Release Rosé '22", grape: "Mourvedre", price: 295, glass: 105, tag: "Rosé" },
    { name: "Oak Valley Sauvignon Blanc '25", notes: "4½ stars — John Platter", price: 295, glass: 105 },
    { name: "Groote Post 'Sea Salter' Sauv Blanc '25", notes: "4½ stars — John Platter", price: 345, glass: 120 },
    { name: "Iona Sauvignon Blanc '25", notes: "4½ stars — John Platter", price: 365, glass: 125 },
    { name: "Miles Mossop 'Chapters' Sauv Blanc '23", notes: "Five stars — John Platter", price: 475 },
    { name: "Opstal Estate Chenin Blanc '25", notes: "4½ stars — John Platter", price: 275, glass: 99 },
    { name: "Olifantsberg 'Old Vine' Chenin Blanc '25", notes: "4½ stars — John Platter", price: 325, glass: 115 },
    { name: "Gabrielskloof 'Synonym' Chenin Blanc '25", notes: "4½ stars — John Platter", price: 345, glass: 120 },
    { name: "Carinus Chenin Blanc '24", notes: "4½ stars — John Platter", price: 365, glass: 125 },
    { name: "Swerwer Swartland Chenin Blanc '24", notes: "4½ stars — John Platter", price: 425 },
    { name: "Lourens Family 'Lindi Carien' White '23", grape: "Chenin Blanc, Verdelho & Grenache Blanc", notes: "4½ stars — John Platter", price: 445 },
    { name: "Anysbos 'Disdit' White Blend '22", grape: "Chenin, Roussanne, Marsanne & Grenache Blanc", notes: "4½ stars — John Platter", price: 465, glass: 155 },
    { name: "The Foundry Grenache Blanc '22", notes: "Five stars — John Platter", price: 425, glass: 145 },
    { name: "Dog Star 'Sur Lie' Chardonnay '24", notes: "By John Loubser of Silverthorn Wines", price: 295, glass: 105 },
    { name: "Kruger 'Sans Chene' Chardonnay '25", notes: "Gilbert & Gaillard Gold Medal", price: 325, glass: 115 },
    { name: "Julien Schaal Chardonnay '24", notes: "4½ stars — John Platter", price: 365, glass: 125 },
    { name: "Callender Peak Chardonnay '22", notes: "Donovan Rall · 4½ stars — John Platter", price: 445 },
    { name: "Crystallum 'The Agnes' Chardonnay '23", notes: "4½ stars — John Platter", price: 595 },
  ],
  red: [
    { name: "Oak Valley 'Sounds of Silence' Pinot '24", notes: "4½ stars — John Platter", price: 325, glass: 110 },
    { name: "Crystallum 'Peter Max' Pinot Noir '24", notes: "4½ stars — John Platter", price: 595 },
    { name: "City on a Hill Swartland Cinsault '24", notes: "4½ stars — John Platter", price: 365, glass: 125 },
    { name: "Savage 'Follow the Line' Cinsault '23", notes: "4½ stars — John Platter", price: 575 },
    { name: "Anysbos 'Tesame' Red Blend '22", grape: "Grenache Noir, Shiraz & Cinsault", notes: "4½ stars — John Platter", price: 495, glass: 165 },
    { name: "Lourens Family 'Howard John' Red '23", grape: "Grenache Noir, Cinsault & Syrah", notes: "4½ stars — John Platter", price: 445 },
    { name: "Blackwater 'Omerta' Carignan", notes: "4½ stars — John Platter", price: 445 },
    { name: "Idiom 'Rosso di Stellenbosch' '21", grape: "Sangiovese, Barbera", price: 295, glass: 105 },
    { name: "Ataraxia Serenity '21", grape: "Pinot Noir, Cinsault, Pinotage", price: 475 },
    { name: "De Kleine Wijn 'Kreatuur' Red '23", grape: "Shiraz, Grenache, Cinsault, Carignan", notes: "4½ stars — John Platter", price: 345, glass: 120 },
    { name: "Eikendal Charisma '22", grape: "Shiraz, Petit Verdot, Sangiovese", notes: "4½ stars — John Platter", price: 345, glass: 120 },
    { name: "Lomond Belladonna SMV '20", notes: "4½ stars — John Platter", price: 365, glass: 125 },
    { name: "Carinus Family Vineyards Syrah '23", notes: "4½ stars — John Platter", price: 365, glass: 125 },
    { name: "Gabrielskloof 'The Blend' '24", grape: "Cabernet, Cab Franc, Merlot, Malbec", price: 325, glass: 110 },
  ],
  cellar: [
    { name: "'Kraaltjies' Unoaked Swartland Chenin '25", notes: "Clean & fruit driven, subtly creamy texture and moderate acidity · 4½★ Christian Eedes", price: 545 },
    { name: "Olifantsberg 'Lark' Chenin '22", notes: "Single vineyard, rich with core of peachiness · 4½★ John Platter", price: 475 },
    { name: "Charla Haasbroek Chenin Blanc '23", notes: "Opulent tropical fruit with honeyed and oxidative accents · 4½★ John Platter", price: 495 },
    { name: "Paulus Wine Co. 'Bosberaad' Chenin '23", notes: "40+ year Paardeberg bush vines by ex-Sadie winemaker · 4½★ John Platter", price: 545 },
    { name: "JC Wickens 'Tiernes' Chenin Blanc '23", notes: "Distinctive single vineyard Swartland Chenin planted 1982 · 4½★ John Platter", price: 575 },
    { name: "Alheit Fire by Night '22", notes: "Old Swartland Chenin bush vines, perfumed & fynbos notes with savoury lees · 4½★ John Platter", price: 765 },
    { name: "Alheit Vineyards Huilkrans '23", notes: "Dry farmed bush-vine Chenin from Citrusdal mountains — thrilling acidity & remarkable length · Five stars — John Platter", price: 1095 },
    { name: "The Sadie Family Skurfberg '23", notes: "Finely focused acidity with ripe pear and melon flavour, body & roundness · Five stars — John Platter", price: 995 },
    { name: "Momento Chenin Blanc / Verdelho '23", notes: "Flavorsome blend from Swartland & Bot Rivier · Five stars — John Platter", price: 495 },
    { name: "Mullineux 'Old Vines' White '24", notes: "Elegant flagship Chenin-led with Clairette Blanche, Grenache Blanc, Viognier, Semillon Gris & Verdelho · Five stars — John Platter", price: 645 },
    { name: "Alheit Vineyards 'Cartology' '24", notes: "Mainly Chenin with 10% Semillon. Soft yellow apple fruit & lemon zest freshness · Five stars — John Platter", price: 675 },
    { name: "David & Nadia Aristargos '22", notes: "Half Chenin with 8 other varieties. Complex floral, citrus & stonefruit. Intense yet silky with vibrant acidity · Five stars — John Platter", price: 695 },
    { name: "The Sadie Family Palladius '22", notes: "Complex assembly of 11 varieties & 17 vineyards across the Swartland · Five stars — John Platter", price: 1495 },
    { name: "Kruger Family Old Vine Chardonnay '23", notes: "Single-vineyard Swartland, fresh & delicate. Also available in magnum · 95+ Tim Atkin", price: 675 },
    { name: "Iona Chardonnay '22", notes: "Toasty oak richness, vibrant acidity with an array of citrus & fynbos scents · Five stars — John Platter", price: 675 },
    { name: "Crystallum 'Clay Shales' Chardonnay '23", notes: "Hemel-en-Aarde Ridge, bunch-pressed & barrel-fermented · 4½★ John Platter", price: 1295 },
    { name: "Crystallum 'Cuvee Cinema' Pinot Noir '23", notes: "Elegant structure, velvet tannins, taut acidity & earthy richness · 4½★ John Platter", price: 1295 },
    { name: "Storm Pinot Noir '22", notes: "Red berry fruit with tannins that are firm but ripe · 4½★ John Platter", price: 995 },
    { name: "The Sadie Family 'Soldaat' Grenache '22", notes: "Voluptuous & radiantly ripe with intense cherry, raspberry & pomegranate fruit · 4½★ John Platter", price: 995 },
    { name: "The Sadie Family 'Pofadder' Cinsault '23", notes: "Pale but substantial, bursting with radiant red berry fruit · Five stars — John Platter", price: 995 },
    { name: "Porseleinberg Syrah '21", notes: "Opulent layers of dark, baked fruit, savory & black cherry · 4½★ John Platter", price: 1095 },
    { name: "Mullineux 'Swartland' Syrah '22", notes: "Violet fragrance, creamy vanilla & savoury herbs. Outstanding Swartland expression · Five stars — John Platter", price: 645 },
    { name: "Boekenhoutskloof Stellenbosch Cab '16", notes: "Black fruit, plush leather & fragrant fynbos notes · 4½★ John Platter", price: 895 },
    { name: "Leeu Passant Stellenbosch Cabernet '21", notes: "Dark blackcurrant, graphite, floral perfume & fynbos · 4½★ John Platter", price: 795 },
  ],
};

const ff = {
  display: "'Cormorant Garamond', 'Palatino Linotype', Georgia, serif",
  body: "'EB Garamond', 'Palatino Linotype', Georgia, serif",
};

function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function RevealDiv({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function OvalLogo({ width = 130 }) {
  const h = width * 0.67;
  return (
    <svg width={width} height={h} viewBox="0 0 130 87" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="65" cy="43.5" rx="62" ry="40.5" fill={C.accent} />
      <ellipse cx="65" cy="43.5" rx="58" ry="36.5" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
      <text x="65" y="51" textAnchor="middle" fill="white" fontSize="22" fontFamily="'Cormorant Garamond', Georgia, serif" fontStyle="italic" fontWeight="400" letterSpacing="0.5">A Tavola</text>
    </svg>
  );
}

function Ornament() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", margin: "0 auto" }}>
      <div style={{ width: 48, height: 1, background: C.borderMid }} />
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.accent }} />
      <div style={{ width: 48, height: 1, background: C.borderMid }} />
    </div>
  );
}

function SectionHead({ eyebrow, title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      {eyebrow && (
        <p style={{ fontFamily: ff.display, fontSize: 12, letterSpacing: "0.35em", textTransform: "uppercase", color: C.accent, marginBottom: 14 }}>
          {eyebrow}
        </p>
      )}
      <h2 style={{ fontFamily: ff.display, fontWeight: 400, fontStyle: "italic", fontSize: "clamp(40px,6vw,62px)", color: C.cream, lineHeight: 1, margin: "0 0 20px" }}>
        {title}
      </h2>
      {sub && <p style={{ fontFamily: ff.body, fontSize: 18, color: C.secondary, fontStyle: "italic", marginBottom: 24, lineHeight: 1.6 }}>{sub}</p>}
      <Ornament />
    </div>
  );
}

function MenuItem({ name, price, desc, note }) {
  return (
    <div style={{ padding: "18px 0", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
        <span style={{ fontFamily: ff.display, fontSize: 19, fontStyle: "italic", color: C.cream, fontWeight: 500, flex: 1 }}>
          {name}
          {note && <span style={{ fontFamily: ff.body, fontSize: 12, color: C.accent, marginLeft: 10, letterSpacing: "0.05em", fontStyle: "normal" }}>{note}</span>}
        </span>
        <span style={{ fontFamily: ff.body, fontSize: 16, color: C.accent, fontWeight: 600, whiteSpace: "nowrap" }}>
          R{price}
        </span>
      </div>
      {desc && <p style={{ fontFamily: ff.body, fontSize: 15, color: C.secondary, marginTop: 4, lineHeight: 1.65 }}>{desc}</p>}
    </div>
  );
}

function WineItem({ name, notes, grape, price, glass, tag }) {
  return (
    <div style={{ padding: "16px 0", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontFamily: ff.display, fontSize: 18, fontStyle: "italic", color: C.cream, fontWeight: 500 }}>{name}</span>
            {tag && (
              <span style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", background: C.accent, color: "white", padding: "2px 7px", borderRadius: 2, fontFamily: ff.body }}>
                {tag}
              </span>
            )}
          </div>
          {grape && <p style={{ fontFamily: ff.body, fontSize: 13, color: C.muted, marginTop: 2, fontStyle: "italic" }}>{grape}</p>}
          {notes && <p style={{ fontFamily: ff.body, fontSize: 13, color: C.secondary, marginTop: 3 }}>{notes}</p>}
        </div>
        <div style={{ textAlign: "right", minWidth: 80 }}>
          <div style={{ fontFamily: ff.body, fontSize: 17, color: C.cream, fontWeight: 600 }}>R{price}</div>
          {glass && <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>250ml R{glass}</div>}
        </div>
      </div>
    </div>
  );
}

function TabRow({ tabs, active, setActive }) {
  return (
    <div style={{ display: "flex", overflowX: "auto", borderBottom: `1px solid ${C.border}`, marginBottom: 40, gap: 0 }}>
      {tabs.map((t) => {
        const on = active === t.id;
        return (
          <button key={t.id} onClick={() => setActive(t.id)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "10px 18px",
            borderBottom: on ? `2px solid ${C.accent}` : "2px solid transparent",
            marginBottom: -1,
            transition: "all 0.2s",
            whiteSpace: "nowrap",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
          }}>
            <span style={{ fontFamily: ff.display, fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", color: on ? C.cream : C.muted, transition: "color 0.2s" }}>
              {t.label}
            </span>
            {t.sub && (
              <span style={{ fontFamily: ff.body, fontSize: 11, color: on ? C.secondary : C.muted, fontStyle: "italic", transition: "color 0.2s" }}>
                {t.sub}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function SubHead({ children }) {
  return (
    <div style={{
      fontFamily: ff.display, fontSize: 13, letterSpacing: "0.3em", textTransform: "uppercase",
      color: C.accent, borderTop: `1px solid ${C.border}`, paddingTop: 28, marginTop: 12, marginBottom: 4
    }}>
      {children}
    </div>
  );
}

function NavLink({ href, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: ff.display, fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
        color: hov ? C.cream : C.secondary, textDecoration: "none", transition: "color 0.2s",
      }}>
      {children}
    </a>
  );
}

function CTA({ href, children, variant = "solid" }) {
  const [hov, setHov] = useState(false);
  const solid = variant === "solid";
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: ff.display, fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
        background: solid ? (hov ? C.accentHov : C.accent) : "transparent",
        color: solid ? "white" : (hov ? C.cream : C.secondary),
        border: solid ? "none" : `1px solid ${hov ? C.borderMid : C.border}`,
        padding: "14px 34px", textDecoration: "none", display: "inline-block", transition: "all 0.25s",
      }}>
      {children}
    </a>
  );
}

export default function ATavola() {
  const scrolled = useScrolled();
  const [activeFood, setActiveFood] = useState("antipasti");
  const [activeWine, setActiveWine] = useState("sparkling");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.textContent = `
      html { scroll-behavior: smooth; }
      *,*::before,*::after { box-sizing: border-box; }
      @keyframes heroFade { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
      @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(7px); } }
      .hero-1 { animation: heroFade 1s ease 0.2s both; }
      .hero-2 { animation: heroFade 1s ease 0.55s both; }
      .hero-3 { animation: heroFade 1s ease 0.85s both; }
      .hero-4 { animation: heroFade 1s ease 1.1s both; }
      .hero-5 { animation: heroFade 1s ease 1.35s both; }
      .scroll-icon { animation: bounce 2.4s ease-in-out infinite; }
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: #0C0908; }
      ::-webkit-scrollbar-thumb { background: #2E1E19; border-radius: 3px; }
    `;
    document.head.appendChild(style);
  }, []);

  const px = { padding: "0 clamp(20px, 5vw, 72px)" };
  const container = { maxWidth: 940, margin: "0 auto", ...px };

  return (
    <div style={{ background: C.bg, color: C.cream, fontFamily: ff.body, minHeight: "100vh" }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        padding: scrolled ? "12px clamp(20px,5vw,72px)" : "20px clamp(20px,5vw,72px)",
        background: scrolled ? "rgba(12,9,8,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <OvalLogo width={scrolled ? 80 : 100} />
        <div style={{ display: "flex", gap: "clamp(20px,3vw,40px)" }}>
          {[["#about","About"],["#menu","Menu"],["#wines","Wines"],["#contact","Contact"]].map(([h,l]) => (
            <NavLink key={h} href={h}>{l}</NavLink>
          ))}
        </div>
        <a href="tel:+27216711763" style={{ fontFamily: ff.body, fontSize: 14, color: C.secondary, textDecoration: "none", display: "flex", alignItems: "center", gap: 7 }}>
          <Phone size={13} style={{ color: C.accent }} /> 021 671 1763
        </a>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: `radial-gradient(ellipse at 25% 75%, rgba(139,28,28,0.14) 0%, transparent 55%),
                     radial-gradient(ellipse at 75% 25%, rgba(139,28,28,0.07) 0%, transparent 50%),
                     linear-gradient(170deg, #0C0908 0%, #131008 50%, #0C0908 100%)`,
        position: "relative", overflow: "hidden", textAlign: "center",
        padding: "100px clamp(20px,5vw,60px) 80px",
      }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "65vw", height: "65vw", maxWidth: 720, maxHeight: 720, borderRadius: "50%", border: `1px solid rgba(139,28,28,0.07)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "40vw", height: "40vw", maxWidth: 440, maxHeight: 440, borderRadius: "50%", border: `1px solid rgba(139,28,28,0.04)`, pointerEvents: "none" }} />

        <p className="hero-1" style={{ fontFamily: ff.display, fontSize: 12, letterSpacing: "0.4em", textTransform: "uppercase", color: C.accent, marginBottom: 20 }}>
          Italian Food · Claremont · Est. 2008
        </p>
        <h1 className="hero-2" style={{ fontFamily: ff.display, fontWeight: 300, fontStyle: "italic", fontSize: "clamp(68px,13vw,148px)", color: C.cream, lineHeight: 0.9, letterSpacing: "-0.01em", margin: "0 0 6px" }}>
          Buonasera
        </h1>
        <div className="hero-3" style={{ margin: "28px auto", display: "flex", alignItems: "center", gap: 16, justifyContent: "center" }}>
          <div style={{ width: 56, height: 1, background: C.border }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.accent }} />
          <div style={{ width: 56, height: 1, background: C.border }} />
        </div>
        <p className="hero-3" style={{ fontFamily: ff.body, fontSize: "clamp(16px,2.4vw,21px)", fontStyle: "italic", color: C.secondary, maxWidth: 460, margin: "0 auto 44px", lineHeight: 1.7 }}>
          Authentic Italian cuisine in the heart of Cape Town's Southern Suburbs
        </p>
        <div className="hero-4" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <CTA href="tel:+27216711763" variant="solid">Reserve a Table</CTA>
          <CTA href="#menu" variant="outline">View the Menu</CTA>
        </div>

        <div className="hero-5 scroll-icon" style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", color: C.muted, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: ff.display, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase" }}>Scroll</span>
          <ChevronDown size={15} />
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section id="about" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ ...container, padding: "80px clamp(20px,5vw,72px)" }}>
          <RevealDiv>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "48px 40px" }}>
              {[
                { label: "Our Story", content: "A family restaurant in every sense, we have been serving up fresh, seasonal Italian cuisine since opening our doors in 2008." },
                { label: "Opening Hours", content: null, hours: true },
                { label: "Location", content: null, location: true },
                { label: "Please Note", content: "BYO is welcome and charged at R100 per bottle. We recommend calling ahead to secure your table." },
              ].map((item) => (
                <div key={item.label}>
                  <p style={{ fontFamily: ff.display, fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: C.accent, marginBottom: 14 }}>{item.label}</p>
                  {item.hours && (
                    <div style={{ fontFamily: ff.body, fontSize: 16, color: C.secondary, lineHeight: 2 }}>
                      <div>Mon – Fri · Lunch & Dinner</div>
                      <div style={{ color: C.muted, fontSize: 14 }}>Closed daily 15:30 – 17:30</div>
                      <div>Saturday · Dinner only</div>
                      <div style={{ color: C.muted, fontSize: 14 }}>Closed Sundays</div>
                    </div>
                  )}
                  {item.location && (
                    <div style={{ fontFamily: ff.body, fontSize: 16, color: C.secondary, lineHeight: 2 }}>
                      <div>Shop 1, Library Square</div>
                      <div>Wilderness Road, Claremont</div>
                      <div><a href="tel:+27216711763" style={{ color: C.accent, textDecoration: "none" }}>021 671 1763</a></div>
                      <div><a href="mailto:info@atavola.co.za" style={{ color: C.muted, textDecoration: "none", fontSize: 14 }}>info@atavola.co.za</a></div>
                    </div>
                  )}
                  {item.content && <p style={{ fontFamily: ff.body, fontSize: 16, color: C.secondary, lineHeight: 1.75 }}>{item.content}</p>}
                </div>
              ))}
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ── FOOD MENU ── */}
      <section id="menu" style={{ padding: "100px 0", background: C.bg }}>
        <div style={container}>
          <RevealDiv>
            <SectionHead eyebrow="A Tavola" title="The Menu" sub="Fresh, seasonal Italian — crafted with care every day." />
          </RevealDiv>
          <RevealDiv delay={0.1}>
            <TabRow tabs={FOOD_TABS} active={activeFood} setActive={setActiveFood} />
          </RevealDiv>
          <RevealDiv delay={0.15}>
            {activeFood === "contorni" ? (
              <div>
                <SubHead>Contorni — Sides</SubHead>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 0 }}>
                  {FOOD.contorni.map((item, i) => <MenuItem key={i} {...item} />)}
                </div>
                <SubHead>Gelato — Per Scoop</SubHead>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 0 }}>
                  {GELATO.map((item, i) => <MenuItem key={i} name={item.name} price={item.price} desc="Per scoop" />)}
                </div>
                <SubHead>Caffè</SubHead>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 0 }}>
                  {CAFFE.map((item, i) => <MenuItem key={i} name={item.name} price={item.price} desc="" />)}
                </div>
              </div>
            ) : (
              <div>{(FOOD[activeFood] || []).map((item, i) => <MenuItem key={i} {...item} />)}</div>
            )}
          </RevealDiv>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.borderMid}, transparent)` }} />

      {/* ── WINE ── */}
      <section id="wines" style={{ padding: "100px 0", background: C.surfaceAlt }}>
        <div style={container}>
          <RevealDiv>
            <SectionHead eyebrow="Carefully Curated" title="Wine List" sub="A thoughtfully selected list of South Africa's finest, with particular passion for Swartland & boutique producers." />
          </RevealDiv>
          <RevealDiv delay={0.1}>
            <TabRow tabs={WINE_TABS} active={activeWine} setActive={setActiveWine} />
          </RevealDiv>
          <RevealDiv delay={0.15}>
            {(WINES[activeWine] || []).map((item, i) => <WineItem key={i} {...item} />)}
          </RevealDiv>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "100px 0", background: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div style={container}>
          <RevealDiv>
            <SectionHead eyebrow="Find Us" title="Visit Us" />
          </RevealDiv>
          <RevealDiv delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "48px 60px", marginBottom: 64 }}>
              <div>
                <p style={{ fontFamily: ff.display, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: C.accent, marginBottom: 16 }}>Address</p>
                <div style={{ fontFamily: ff.body, fontSize: 17, color: C.secondary, lineHeight: 2 }}>
                  <div>Shop 1, Library Square</div>
                  <div>Wilderness Road</div>
                  <div>Claremont, Western Cape</div>
                </div>
              </div>
              <div>
                <p style={{ fontFamily: ff.display, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: C.accent, marginBottom: 16 }}>Contact</p>
                <div style={{ fontFamily: ff.body, fontSize: 17, color: C.secondary, lineHeight: 2 }}>
                  <div><a href="tel:+27216711763" style={{ color: C.accent, textDecoration: "none" }}>021 671 1763</a></div>
                  <div><a href="mailto:info@atavola.co.za" style={{ color: C.secondary, textDecoration: "none" }}>info@atavola.co.za</a></div>
                  <div><a href="https://www.atavola.co.za" style={{ color: C.secondary, textDecoration: "none", fontSize: 14 }}>www.atavola.co.za</a></div>
                </div>
              </div>
              <div>
                <p style={{ fontFamily: ff.display, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: C.accent, marginBottom: 16 }}>Hours</p>
                <div style={{ fontFamily: ff.body, fontSize: 17, color: C.secondary, lineHeight: 2 }}>
                  <div>Mon – Fri</div>
                  <div style={{ color: C.muted, fontSize: 15 }}>Lunch & Dinner (closed 15:30–17:30)</div>
                  <div>Saturday · Dinner only</div>
                  <div style={{ color: C.muted, fontSize: 15 }}>Closed Sundays</div>
                </div>
              </div>
              <div>
                <p style={{ fontFamily: ff.display, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: C.accent, marginBottom: 16 }}>Follow Us</p>
                <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                  {[
                  ].map(({ href, Icon, label }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                      display: "flex", alignItems: "center", gap: 8,
                      fontFamily: ff.body, fontSize: 15, color: C.secondary, textDecoration: "none",
                    }}>
                      <Icon size={16} style={{ color: C.accent }} /> {label}
                    </a>
                  ))}
                </div>
                <p style={{ fontFamily: ff.body, fontSize: 15, color: C.muted, lineHeight: 1.7 }}>
                  BYO welcome · R100 per bottle
                </p>
              </div>
            </div>
          </RevealDiv>
          <RevealDiv delay={0.2} style={{ textAlign: "center" }}>
            <CTA href="tel:+27216711763" variant="solid">Make a Reservation</CTA>
          </RevealDiv>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: "36px clamp(20px,5vw,72px)" }}>
        <div style={{ maxWidth: 940, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <OvalLogo width={72} />
          <p style={{ fontFamily: ff.display, fontSize: 12, color: C.muted, letterSpacing: "0.12em", textAlign: "center" }}>
            © 2025 A Tavola Italian Food · Claremont, Cape Town
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {[["#menu","Menu"],["#wines","Wines"],["#contact","Contact"]].map(([h,l]) => (
              <NavLink key={h} href={h}>{l}</NavLink>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
