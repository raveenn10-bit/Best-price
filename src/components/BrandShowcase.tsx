"use client";
import React, { useRef } from "react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { whatsappLink } from "@/components/SiteShell";

type Hotspot = { name: string; price: string; left: number; top: number; width: number; height: number; radius: string };

export type BrandTheme = "ugreen" | "anker" | "soundcore";

type Showcase = {
  theme: BrandTheme;
  brand: string;
  title: string;
  tagline: string;
  src: string;
  alt: string;
  hotspots: Hotspot[];
};

// Box positions are % of the 2172×724 artwork
const pct = (x1: number, y1: number, x2: number, y2: number) => ({
  left: (x1 / 2172) * 100,
  top: (y1 / 724) * 100,
  width: ((x2 - x1) / 2172) * 100,
  height: ((y2 - y1) / 724) * 100,
});

export const SHOWCASES: Record<BrandTheme, Showcase> = {
  ugreen: {
    theme: "ugreen",
    brand: "UGREEN",
    title: "Save More on UGREEN Power Banks",
    tagline: "Fast-charging power banks for phones, tablets and laptops.",
    src: "/banners/brands/ugreen.webp",
    alt: "UGREEN power bank flash deals",
    hotspots: [
      { name: "UGREEN Nexode Pro 10000mAh Power Bank (PD 55W)", price: "LKR 12,500", ...pct(30, 232, 727, 652), radius: "5.8% / 9.6%" },
      { name: "UGREEN 25742 20W 10000mAh Power Bank", price: "LKR 6,990", ...pct(760, 232, 1427, 652), radius: "6% / 9.6%" },
      { name: "UGREEN 25683 20W 20000mAh Power Bank", price: "LKR 9,500", ...pct(1446, 232, 2142, 652), radius: "5.8% / 9.6%" },
    ],
  },
  anker: {
    theme: "anker",
    brand: "ANKER",
    title: "Power Up with Anker",
    tagline: "Reliable chargers, power banks and cables.",
    src: "/banners/brands/anker.webp",
    alt: "Anker charging deals",
    hotspots: [
      { name: "Anker 623 MagGo 2-in-1 Magnetic Wireless Charger", price: "LKR 12,500", ...pct(706, 92, 1174, 656), radius: "8% / 6.6%" },
      { name: "Anker PowerCore 10000 Compact Power Bank", price: "LKR 8,990", ...pct(1180, 92, 1642, 656), radius: "8% / 6.6%" },
      { name: "Anker USB-C to USB-C Cable 100W (1.8m)", price: "LKR 5,990", ...pct(1650, 95, 2120, 658), radius: "8% / 6.6%" },
    ],
  },
  soundcore: {
    theme: "soundcore",
    brand: "soundcore",
    title: "Soundcore Audio Deals",
    tagline: "Headphones, earbuds and speakers with powerful sound.",
    src: "/banners/brands/soundcore.webp",
    alt: "Soundcore audio deals",
    hotspots: [
      { name: "Soundcore Space One Over-Ear Headphones", price: "LKR 42,500", ...pct(808, 160, 1282, 645), radius: "8.5% / 8.2%" },
      { name: "Soundcore Liberty 4 NC True Wireless Earbuds", price: "LKR 18,990", ...pct(1238, 168, 1697, 645), radius: "8.5% / 8.2%" },
      { name: "Soundcore Motion 300 Portable Bluetooth Speaker", price: "LKR 24,990", ...pct(1660, 172, 2127, 652), radius: "8.5% / 8.2%" },
    ],
  },
};

const THEME: Record<BrandTheme, { band: string; accent: string; chip: string; wordmark: string }> = {
  ugreen: {
    band: "from-[#03290f] via-[#0a5a26] to-[#03290f]",
    accent: "#7CFF4F",
    chip: "bg-[#7CFF4F] text-[#0a3d17]",
    wordmark: "font-black tracking-[0.08em] text-white",
  },
  anker: {
    band: "from-[#04235c] via-[#0b5fc4] to-[#04235c]",
    accent: "#38D6FF",
    chip: "bg-[#38D6FF] text-[#04235c]",
    wordmark: "font-black tracking-[0.06em] text-white",
  },
  soundcore: {
    band: "from-[#0b0620] via-[#2b0f63] to-[#0b0620]",
    accent: "#B65CFF",
    chip: "bg-gradient-to-r from-[#22d3ee] to-[#b65cff] text-white",
    wordmark: "font-extrabold tracking-tight text-[#22d3ee] lowercase",
  },
};

export function BrandShowcase({ theme }: { theme: BrandTheme }) {
  const s = SHOWCASES[theme];
  const t = THEME[theme];
  const tiltRef = useRef<HTMLDivElement>(null);

  // Gentle 3D tilt that follows the pointer (desktop only)
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 4).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 5).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <section
      className={`brand-band brand-${theme} cv-auto relative -mx-4 sm:-mx-6 lg:-mx-10 overflow-hidden bg-gradient-to-r ${t.band}`}
      style={{ ["--brand-accent" as string]: t.accent }}
      aria-label={s.title}
    >
      {/* Animated background light */}
      <span className="brand-orb brand-orb-1" aria-hidden="true" />
      <span className="brand-orb brand-orb-2" aria-hidden="true" />
      <span className="brand-streaks" aria-hidden="true" />

      <div className="relative px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className={`text-3xl sm:text-5xl ${t.wordmark}`}>{s.brand}</span>
              <span className={`brand-chip text-[11px] sm:text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${t.chip}`}>Hot deals</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-4xl font-black text-white uppercase tracking-tight brand-title">{s.title}</h2>
            <p className="text-sm sm:text-base text-white/75 mt-1">{s.tagline}</p>
          </div>
          <a
            href={whatsappLink(`Hi BestPrices.lk, I'd like to know about your ${s.brand} deals.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine self-start md:self-auto inline-flex items-center gap-2 bg-white text-ink hover:bg-[var(--brand-accent)] font-bold text-sm px-5 py-3 rounded-full shadow-lg transition"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" /> Ask about {s.brand} stock
          </a>
        </div>

        {/* Banner scales to fit the screen width on every device */}
        <div>
          <div className="w-full [perspective:1400px]" onPointerMove={onMove} onPointerLeave={onLeave}>
            <div ref={tiltRef} className="brand-tilt relative rounded-[12px] sm:rounded-[26px] overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
              <img src={s.src} alt={s.alt} loading="lazy" decoding="async" width={2172} height={724} draggable={false} className="block w-full h-auto select-none" />
              <span className="brand-shine" aria-hidden="true" />
              <span className="brand-spot" aria-hidden="true" />
              {s.hotspots.map((h, i) => (
                <a
                  key={h.name}
                  href={whatsappLink(`Hi BestPrices.lk, I'm interested in the ${h.name} (${h.price}). Is it in stock?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${h.name}, ${h.price} — enquire on WhatsApp`}
                  className="brand-hotspot group"
                  style={{
                    left: `${h.left}%`,
                    top: `${h.top}%`,
                    width: `${h.width}%`,
                    height: `${h.height}%`,
                    borderRadius: h.radius,
                    ["--i" as string]: i,
                  }}
                >
                  <span className="brand-hotspot-ring" style={{ borderRadius: h.radius }} />
                  <span className="brand-hotspot-cta">
                    <WhatsAppIcon className="w-3.5 h-3.5" /> Order on WhatsApp
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
