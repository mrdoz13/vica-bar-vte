/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* =====================================================================
   DATA — menus
   ===================================================================== */

const COFFEE_MENU = [
{
  group: "Espresso & milk",
  hint: "House blend — Bolaven highlands, Laos",
  items: [
  { id: "c1", name: "Americano", desc: "Double shot, hot water — clean & bittersweet.", variants: [
    { id: "c1h", tag: "Hot", price: 30 },
    { id: "c1c", tag: "Cold", price: 35 }]
  },
  { id: "c2", name: "Cappuccino", desc: "Espresso, steamed milk, dense foam crown.", variants: [
    { id: "c2h", tag: "Hot", price: 38 },
    { id: "c2c", tag: "Cold", price: 42 }]
  },
  { id: "c3", name: "Latte", desc: "Silky milk, gentle pour — our most loved.", variants: [
    { id: "c3h", tag: "Hot", price: 40 },
    { id: "c3c", tag: "Cold", price: 45 }]
  }]

},
{
  group: "Citrus & specialty",
  hint: "Bright, served over ice",
  items: [
  { id: "c4", name: "Americano · Honey & Lemon", desc: "Wildflower honey, fresh lemon, espresso over ice.", price: 45 },
  { id: "c5", name: "Americano · Orange", desc: "Hand-squeezed orange poured over a black shot.", price: 45 }]

},
{
  group: "Matcha",
  hint: "Ceremonial-grade from Uji",
  items: [
  { id: "c6", name: "Matcha Cloud", desc: "Matcha shot floated under cold sweet cream.", price: 55 },
  { id: "c7", name: "Matcha Latte", desc: "Whisked matcha, oat or fresh milk.", price: 48 }]

}];


const WINE_MENU = [
{
  group: "Red, by the glass",
  hint: "Low-intervention, mostly organic",
  items: [
  { id: "w1", name: "Nebbiolo, Langhe", desc: "Piedmont, Italy · earthy, rose petal, dried cherry.", origin: "Italy", price: 95 },
  { id: "w2", name: "Gamay, Beaujolais", desc: "France · juicy, peppered, bright cranberry.", origin: "France", price: 110 },
  { id: "w3", name: "Malbec, Mendoza", desc: "Argentina · plum, violet, soft chocolate finish.", origin: "Argentina", price: 95 },
  { id: "w4", name: "Shiraz, Barossa", desc: "Australia · blackberry, smoke, warm spice.", origin: "Australia", price: 105 }]

},
{
  group: "White, by the glass",
  hint: "Skin-contact options available — ask the bar",
  items: [
  { id: "w5", name: "Trebbiano, Lazio", desc: "Italy · stone fruit, salted almond, gentle skin contact.", origin: "Italy", price: 90 },
  { id: "w6", name: "Chenin Blanc, Loire", desc: "France · quince, beeswax, mineral spine.", origin: "France", price: 105 },
  { id: "w7", name: "Torrontés, Salta", desc: "Argentina · jasmine, white peach, dry finish.", origin: "Argentina", price: 95 },
  { id: "w8", name: "Riesling, Clare Valley", desc: "Australia · lime, slate, electric acidity.", origin: "Australia", price: 100 }]

},
{
  group: "Bubbles",
  items: [
  { id: "w9", name: "Prosecco DOC", desc: "Glera grape, Veneto · pear and green apple, soft mousse.", variants: [
    { id: "w9g", tag: "Glass", price: 95 },
    { id: "w9b", tag: "Bottle", price: 520 }]
  },
  { id: "w10", name: "Champagne · Grower", desc: "Vallée de la Marne · brioche, citrus zest, fine bead.", variants: [
    { id: "w10g", tag: "Glass", price: 180 },
    { id: "w10b", tag: "Bottle", price: 1200 }]
  }]

},
{
  group: "From the kitchen",
  hint: "Cured meats, cheese, and bread — built for sharing",
  items: [
  { id: "f1", name: "Salami board · Petit", desc: "Three Italian salumi, cornichons, focaccia.", price: 180 },
  { id: "f2", name: "Charcuterie · Grand", desc: "Five meats, two cheeses, marmalade, sourdough.", price: 320 },
  { id: "f3", name: "Cheese plate", desc: "Three cheeses, honeycomb, crackers, fresh fruit.", price: 220 },
  { id: "f4", name: "Olives & focaccia", desc: "Castelvetrano olives, warm rosemary focaccia.", price: 85 }]

}];


/* =====================================================================
   ICONS — tiny inline SVG set
   ===================================================================== */

const Icon = {
  Sun: (p) =>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>,

  Moon: (p) =>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>,

  Bag: (p) =>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 7h12l-1.2 12.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7z" />
      <path d="M9 7V5a3 3 0 1 1 6 0v2" />
    </svg>,

  Plus: (p) =>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>,

  Minus: (p) =>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
      <path d="M5 12h14" />
    </svg>,

  Check: (p) =>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 13l4 4L19 7" />
    </svg>,

  X: (p) =>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>,

  Arrow: (p) =>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>,

  Pin: (p) =>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>

};

/* =====================================================================
   Helpers
   ===================================================================== */

// Lao Kip — display prices are stored in thousands; format as "₭ 35,000".
const fmtKip = (priceK) => {
  const v = (priceK * 1000).toLocaleString("en-US");
  return v;
};

/* =====================================================================
   TopNav — brand + day/night toggle + cart trigger
   ===================================================================== */

function TopNav({ mode, setMode, cartCount, onOpenCart, cartBtnRef }) {
  return (
    <header className="nav">
      <div className="shell nav-inner">
        <div className="brand">
          Vica<span className="dot" aria-hidden="true"></span>
        </div>

        <div className="nav-right">
          <div className="mode-toggle" role="tablist" aria-label="Day or night mode">
            <span className={"knob " + (mode === "night" ? "night" : "")} aria-hidden="true"></span>
            <button
              role="tab"
              aria-selected={mode === "day"}
              className={mode === "day" ? "active" : ""}
              onClick={() => setMode("day")}>
              
              <Icon.Sun /> Coffee
            </button>
            <button
              role="tab"
              aria-selected={mode === "night"}
              className={mode === "night" ? "active" : ""}
              onClick={() => setMode("night")}>
              
              <Icon.Moon /> Wine
            </button>
          </div>

          <button
            className="cart-btn"
            aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            onClick={onOpenCart}
            ref={cartBtnRef}>
            
            <Icon.Bag />
            {cartCount > 0 && <span className="cart-badge tabular">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>);

}

/* =====================================================================
   Hero
   ===================================================================== */

function Hero({ mode }) {
  // Show coffee shop image in day mode, wine bar image in night mode.
  const heroImg = mode === "day" ? "images/coffee-shop.jpeg" : "images/wine-bar-1.jpeg";
  const tag = mode === "day" ?
  <>Specialty coffee by day, <em>natural wine</em> by night.</> :
  <>Natural wine by night, <em>specialty coffee</em> by day.</>;

  return (
    <section className="hero">
      <div className="shell hero-grid">
        <div>
          <div className="hero-eyebrow eyebrow">
            <span className="pip" aria-hidden="true"></span>
            <span>{mode === "day" ? "Now open — coffee service" : "Now open — wine service"}</span>
          </div>

          <h1 className="hero-title">
            Vic<span className="a">a</span>
          </h1>
          <p className="hero-tag">{tag}</p>

          <div className="hero-meta">
            <div>
              <div className="k">Where</div>
              <div className="v">Vientiane</div>
            </div>
            <div>
              <div className="k">By the river</div>
              <div className="v">Mekong</div>
            </div>
            <div>
              <div className="k">Est.</div>
              <div className="v tabular">2024</div>
            </div>
          </div>
        </div>

        <div>
          <div className="hero-image-wrap">
            <img src="images/coffee-shop.jpeg" alt="Inside Vica — morning service" className={mode === "day" ? "" : "away"} />
            <img src="images/wine-bar-1.jpeg" alt="Inside Vica — evening service" className={mode === "night" ? "" : "away"} />
            <div className="hero-caption">
              <span className="swatch" aria-hidden="true"></span>
              <span>{mode === "day" ? "Open — until 3:00 PM" : "Open — until 11:30 PM"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* =====================================================================
   Story
   ===================================================================== */

function Story({ mode }) {
  return (
    <section className="section">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="eyebrow">Our story</span>
            <h2 className="section-title">A small <em>room</em>, two moods.</h2>
          </div>
          <p className="section-lede">
            One bar, one neighbourhood, two rhythms — light and bright in the morning, low-lit and slow at night.
          </p>
        </div>

        <div className="story-grid">
          <div className="story-body">
            <p>
              We are an <span className="accent">organic wine bar</span> in Vientiane, Laos, that serves an authentic experience with smooth music where you can hang out.
            </p>
            <p>
              By day, we pour single-origin coffee from the Bolaven highlands. By dusk, the lamps come down and we open bottles from small growers across Italy, France, Australia and Argentina.
            </p>

            <div className="story-stats">
              <div className="story-stat">
                <div className="k">Wines on the wall</div>
                <div className="v tabular">120+</div>
              </div>
              <div className="story-stat">
                <div className="k">Coffee origin</div>
                <div className="v">Bolaven</div>
              </div>
              <div className="story-stat">
                <div className="k">Seats inside</div>
                <div className="v tabular">28</div>
              </div>
              <div className="story-stat">
                <div className="k">Steps from the Mekong</div>
                <div className="v tabular">90</div>
              </div>
            </div>
          </div>

          <div className="story-images">
            <div className="story-img">
              <img src={mode === "day" ? "images/coffee-shop.jpeg" : "images/wine-shelf.jpeg"} alt="" />
            </div>
            <div className="story-img wide">
              <img src={mode === "day" ? "images/wine-shelf-2.jpeg" : "images/wine-bar-2.jpeg"} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* =====================================================================
   Menu
   ===================================================================== */

function MenuItem({ item, onAdd }) {
  // Items can have variants (e.g. Hot/Cold, Glass/Bottle) or a single price.
  const variants = item.variants || [{ id: item.id, price: item.price }];
  const [addedId, setAddedId] = useState(null);

  const handleAdd = (variant, ev) => {
    onAdd({
      id: variant.id,
      name: item.name + (variant.tag ? " · " + variant.tag : ""),
      price: variant.price
    }, ev.currentTarget);
    setAddedId(variant.id);
    setTimeout(() => setAddedId(null), 900);
  };

  return (
    <div className="menu-item">
      <div>
        <div className="name">
          {item.name}
          {variants.length > 1 && variants.map((v) =>
          v.tag ? <span className="tag" key={v.id}>{v.tag}</span> : null
          )}
        </div>
        {item.desc && <div className="desc">{item.desc}</div>}
      </div>
      <div className="right">
        {variants.length === 1 ?
        <>
            <div className="price tabular">
              <span className="ccy" style={{ fontSize: "20px", color: "rgb(58, 54, 50)" }}>













































            </span>{fmtKip(variants[0].price)}
            </div>
            <button className={"add-btn " + (addedId === variants[0].id ? "added" : "")} aria-label={`Add ${item.name} to cart`} onClick={(ev) => handleAdd(variants[0], ev)}>
            
              {addedId === variants[0].id ? <Icon.Check /> : <Icon.Plus />}
            </button>
          </> : <div style={{ display: "inline-flex", gap: 12, alignItems: "center" }}>
            {variants.map((v) => <div key={v.id} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <div className="price tabular" style={{ minWidth: "auto" }}>
                  <span className="ccy">₭</span>{fmtKip(v.price)}
                </div>
                <button className={"add-btn " + (addedId === v.id ? "added" : "")} aria-label={`Add ${item.name} ${v.tag || ""} to cart`} onClick={(ev) => handleAdd(v, ev)}>
              
                  {addedId === v.id ? <Icon.Check /> : <Icon.Plus />}
                </button>
              </div>)}
          </div>}
      </div>
    </div>);}function Menu({ mode, onAdd }) {const data = mode === "day" ? COFFEE_MENU : WINE_MENU;const eyebrow = mode === "day" ? "Coffee menu" : "Wine & food menu";const title = mode === "day" ? <>Brewed with <em>care</em>, served with light.</> : <>Low-intervention bottles, <em>shared plates</em>.</>;const lede = mode === "day" ? "Espresso pulled to order, ice from filtered water, milk from local farms. Take it to go, or sit by the window." : "Our cellar leans natural — biodynamic and skin-contact options available. Ask the bar; we love a chat.";return <section className="section" id="menu">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="section-title">{title}</h2>
          </div>
          <div>
            <p className="section-lede">{lede}</p>
            <div style={{ marginTop: 20 }}>
              <span className="menu-mode">
                <span className="pip" aria-hidden="true"></span>
                {mode === "day" ? "Showing coffee · switch to wine ↑" : "Showing wine & food · switch to coffee ↑"}
              </span>
            </div>
          </div>
        </div>

        {mode === "night" && <div className="origin-row">
            <span className="eyebrow" style={{ marginRight: 6 }}>From</span>
            <span className="origin-chip">Italy</span>
            <span className="origin-chip">France</span>
            <span className="origin-chip">Australia</span>
            <span className="origin-chip">Argentina</span>
          </div>}

        <div className="menu-groups">
          {data.map((group) => <div className="menu-group" key={group.group}>
              <div className="menu-group-head">
                <h3>{group.group}</h3>
                {group.hint && <div className="hint">— {group.hint}</div>}
              </div>
              <div className="menu-list">
                {group.items.map((item) => <MenuItem key={item.id} item={item} onAdd={onAdd} />)}
              </div>
            </div>)}
        </div>
      </div>
    </section>;} /* =====================================================================
Visit / hours / contact
===================================================================== */function Visit() {return <section className="section">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="eyebrow">Visit</span>
            <h2 className="section-title">Two services, <em>one room</em>.</h2>
          </div>
          <p className="section-lede">
            Walk in any day. Reservations only for groups of six or more — message us on the number below.
          </p>
        </div>

        <div className="visit-grid">
          <div className="visit-card">
            <span className="eyebrow">Hours</span>
            <h4>Open daily</h4>
            <div className="pair"><span>Coffee</span><span>8:00 AM — 3:00 PM</span></div>
            <div className="pair"><span>Wine</span><span>6:00 PM — 11:30 PM</span></div>
            <p style={{ marginTop: 14, fontSize: 13 }}>Closed between 3 and 6 — we reset the room.</p>
          </div>
          <div className="visit-card">
            <span className="eyebrow">Find us</span>
            <h4>Vientiane, by the river.</h4>
            <p>Next to the Mekong River, a 90-second walk from the Chao Anouvong promenade.</p>
            <p style={{ marginTop: 10 }}>Quai Fa Ngum, Vientiane, Laos.</p>
          </div>
          <div className="visit-card">
            <span className="eyebrow">Contact</span>
            <h4>Mr. Pathanphone</h4>
            <p>Tel <span className="tabular">+856 5721 xxxxxx</span></p>
            <p>Or stop by — there is usually a seat at the bar.</p>
          </div>
        </div>
      </div>
    </section>;} /* =====================================================================
Footer
===================================================================== */function Footer() {
  return (
    <footer className="shell foot">
      <div className="brand">Vica<span className="dot" aria-hidden="true"></span></div>
      <div className="divider-mark">Coffee · Wine · Vientiane</div>
      <div>© {new Date().getFullYear()} Vica · By the Mekong</div>
    </footer>);

}

/* =====================================================================
   Cart panel
   ===================================================================== */

function CartPanel({ open, onClose, items, onInc, onDec, mode }) {
  // lock body scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {document.body.style.overflow = prev;};
    }
  }, [open]);

  // Escape closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);
  const serviceK = Math.round(subtotal * 0.1);
  const totalK = subtotal + serviceK;

  return (
    <>
      <div className={"cart-overlay " + (open ? "open" : "")} onClick={onClose} />
      <aside
        className={"cart-panel " + (open ? "open" : "")}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!open}>
        
        <div className="cart-head">
          <div className="title">
            Takeaway<small>{items.length === 0 ? "empty" : `${items.reduce((a, i) => a + i.qty, 0)} items`}</small>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close cart">
            <Icon.X />
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 ?
          <div className="cart-empty">
              <div className="icon"><Icon.Bag /></div>
              <div>
                <div className="title-l">Your bag is empty</div>
                <div style={{ marginTop: 8, fontSize: 13.5, maxWidth: 28 + "ch" }}>
                  Tap the {mode === "day" ? "coffee" : "wine"} you want to take away — it'll appear here.
                </div>
              </div>
            </div> :

          items.map((it) =>
          <div className="cart-line" key={it.id}>
                <div>
                  <div className="name">{it.name}</div>
                  <div className="meta">
                    <span className="tabular">₭{fmtKip(it.price)}</span> · each
                  </div>
                  <div className="qty">
                    <button onClick={() => onDec(it.id)} aria-label="Decrease quantity"><Icon.Minus /></button>
                    <span className="count">{it.qty}</span>
                    <button onClick={() => onInc(it.id)} aria-label="Increase quantity"><Icon.Plus /></button>
                  </div>
                </div>
                <div className="line-price tabular">
                  <span className="ccy" style={{ fontSize: 12, color: "var(--muted)", marginRight: 2 }}>₭</span>
                  {fmtKip(it.price * it.qty)}
                </div>
              </div>
          )
          }
        </div>

        <div className="cart-foot">
          <div className="cart-row">
            <span>Subtotal</span>
            <span className="v tabular">₭{fmtKip(subtotal)}</span>
          </div>
          <div className="cart-row">
            <span>Service (10%)</span>
            <span className="v tabular">₭{fmtKip(serviceK)}</span>
          </div>
          <div className="cart-row total">
            <span className="label">Total</span>
            <span className="v tabular">₭{fmtKip(totalK)}</span>
          </div>
          <button className="checkout" disabled={items.length === 0} onClick={() => alert("Demo only — would proceed to payment.")}>
            <span>Reserve for pickup</span>
            <Icon.Arrow />
          </button>
        </div>
      </aside>
    </>);

}

/* =====================================================================
   App — root
   ===================================================================== */

// Curated night palettes — [bg, surface, surface-2, ink, ink-soft, muted, accent]
const NIGHT_PALETTES = {
  cocoa:    ["#2c1d1a", "#392523", "#4a322f", "#f6ecd6", "#d8c5a4", "#a08b73", "#e0a05a"],
  charcoal: ["#1a1410", "#221a14", "#2c2218", "#f1e6d0", "#c6b69a", "#8b7a64", "#d4954e"],
  burgundy: ["#321a20", "#412229", "#522a34", "#f9ead6", "#e0c1a8", "#a88673", "#d4955e"],
  espresso: ["#3a281e", "#473226", "#564030", "#fbeed3", "#dec5a0", "#a89070", "#e8a86a"],
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "nightPalette": "cocoa"
}/*EDITMODE-END*/;

function App() {
  // Tweaks
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Mode: persist across reloads
  const [mode, setMode] = useState(() => {
    try {return localStorage.getItem("vica_mode") || "day";} catch {return "day";}
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
    try {localStorage.setItem("vica_mode", mode);} catch {}
  }, [mode]);

  // Apply chosen night palette as inline CSS vars while in night mode
  useEffect(() => {
    const root = document.documentElement;
    const keys = ["--bg","--surface","--surface-2","--ink","--ink-soft","--muted","--accent"];
    if (mode === "night") {
      const p = NIGHT_PALETTES[t.nightPalette] || NIGHT_PALETTES.cocoa;
      keys.forEach((k, i) => root.style.setProperty(k, p[i]));
    } else {
      keys.forEach((k) => root.style.removeProperty(k));
    }
  }, [mode, t.nightPalette]);

  // Cart
  const [items, setItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const cartBtnRef = useRef(null);

  const totalQty = items.reduce((a, i) => a + i.qty, 0);

  const addItem = useCallback((p, sourceEl) => {
    setItems((prev) => {
      const exists = prev.find((it) => it.id === p.id);
      if (exists) return prev.map((it) => it.id === p.id ? { ...it, qty: it.qty + 1 } : it);
      return [...prev, { ...p, qty: 1 }];
    });
    // Fly-to-cart pulse
    if (sourceEl && cartBtnRef.current) {
      flyToCart(sourceEl, cartBtnRef.current);
    }
  }, []);

  const incItem = useCallback((id) => {
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, qty: it.qty + 1 } : it));
  }, []);
  const decItem = useCallback((id) => {
    setItems((prev) => {
      return prev.
      map((it) => it.id === id ? { ...it, qty: it.qty - 1 } : it).
      filter((it) => it.qty > 0);
    });
  }, []);

  return (
    <>
      <div className="mode-veil day" aria-hidden="true"></div>
      <div className="mode-veil night" aria-hidden="true"></div>
      <TopNav
        mode={mode}
        setMode={setMode}
        cartCount={totalQty}
        onOpenCart={() => setCartOpen(true)}
        cartBtnRef={cartBtnRef} />
      
      <main>
        <Hero mode={mode} />
        <Story mode={mode} />
        <Menu mode={mode} onAdd={addItem} />
        <Visit />
      </main>
      <Footer />
      <CartPanel
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        onInc={incItem}
        onDec={decItem}
        mode={mode} />
      
      <TweaksPanel title="Tweaks">
        <TweakSection label="Night-mode palette" />
        <TweakColor
          label="Background mood"
          value={NIGHT_PALETTES[t.nightPalette] || NIGHT_PALETTES.cocoa}
          options={Object.values(NIGHT_PALETTES).map((p) => [p[0], p[6], p[3]])}
          onChange={(swatch) => {
            const found = Object.entries(NIGHT_PALETTES).find(([, p]) => p[0] === swatch[0]);
            if (found) setTweak("nightPalette", found[0]);
          }} />
        <div style={{ fontSize: 11, color: "rgba(41,38,27,.55)", marginTop: 4, lineHeight: 1.45 }}>
          Switch to <b>Wine</b> mode (top right) to preview. Each chip: bg · accent · text.
        </div>
      </TweaksPanel>
    </>);

}

/* =====================================================================
   Tiny fly-to-cart animation
   ===================================================================== */

function flyToCart(from, to) {
  const f = from.getBoundingClientRect();
  const t = to.getBoundingClientRect();
  const dot = document.createElement("div");
  dot.className = "fly-dot";
  dot.style.left = f.left + f.width / 2 - 7 + "px";
  dot.style.top = f.top + f.height / 2 - 7 + "px";
  document.body.appendChild(dot);

  const dx = t.left + t.width / 2 - (f.left + f.width / 2);
  const dy = t.top + t.height / 2 - (f.top + f.height / 2);

  dot.animate(
    [
    { transform: "translate(0,0) scale(1)", opacity: 1 },
    { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 40}px) scale(1.2)`, opacity: 1, offset: 0.5 },
    { transform: `translate(${dx}px, ${dy}px) scale(0.4)`, opacity: 0 }],

    { duration: 620, easing: "cubic-bezier(.5,.02,.7,.6)" }
  ).onfinish = () => dot.remove();
}

/* =====================================================================
   Mount
   ===================================================================== */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);