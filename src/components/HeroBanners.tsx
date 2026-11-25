"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { shopHref } from "@/lib/routes";

type Banner = {
  id: string;
  src: string;
  alt: string;
  href: string;
  /** Width / height of the artwork */
  ratio: number;
  /** Animated neon frames drawn over the artwork, in % of the image box */
  neon?: { left: number; top: number; width: number; height: number; radius: string }[];
};

const BANNERS: Banner[] = [
  {
    id: "blackout-friday",
    src: "/banners/hero/blackout-friday.webp",
    alt: "Blackout Friday sale, 27 to 30 November",
    href: "/flash-deals",
    ratio: 2,
    neon: [
      { left: 5.64, top: 17.5, width: 39.6, height: 41.2, radius: "8.5% / 16.4%" },
      { left: 2.5, top: 66.5, width: 94.8, height: 27.1, radius: "2.2% / 15%" },
    ],
  },
  { id: "mega-tech-rush", ratio: 2, src: "/banners/hero/mega-tech-rush.webp", alt: "Mega Tech Rush — smartphones and laptops", href: "/shop" },
  { id: "flash-deals", ratio: 16 / 9, src: "/banners/hero/flash-deals.webp", alt: "Flash Deals on top tech and home appliances", href: "/flash-deals" },
  { id: "mobile-essentials", ratio: 16 / 9, src: "/banners/hero/mobile-essentials.webp", alt: "Mobile Essentials — the latest smartphones", href: shopHref({ category: "mobiles" }) },
  { id: "laptop-computing", ratio: 2, src: "/banners/hero/laptop-computing.webp", alt: "Laptop & Computing deals", href: shopHref({ category: "laptops" }) },
  { id: "cinema-gaming", ratio: 16 / 9, src: "/banners/hero/cinema-gaming.webp", alt: "Cinema & Gaming — TVs and speakers", href: shopHref({ category: "tv-audio" }) },
  { id: "smart-home-upgrade", ratio: 2, src: "/banners/hero/smart-home-upgrade.webp", alt: "Smart Home Upgrade — fridges and washing machines", href: shopHref({ category: "home-appliances" }) },
];

const INTERVAL = 4000;

export function HeroBanners() {
  const total = BANNERS.length;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [drag, setDrag] = useState(0);
  const start = useRef<{ x: number; y: number; t: number } | null>(null);
  const moved = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const go = useCallback((n: number) => setIdx(((n % total) + total) % total), [total]);

  // Auto-swipe
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => go(idx + 1), INTERVAL);
    return () => clearTimeout(id);
  }, [idx, paused, go]);

  // Pause when the tab is hidden
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY, t: Date.now() };
    moved.current = false;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      moved.current = true;
      setDrag(dx);
    }
  };
  const onPointerUp = () => {
    if (!start.current) return;
    const width = trackRef.current?.clientWidth || 1;
    const fast = Date.now() - start.current.t < 300 && Math.abs(drag) > 30;
    if (drag < -width * 0.15 || (fast && drag < 0)) go(idx + 1);
    else if (drag > width * 0.15 || (fast && drag > 0)) go(idx - 1);
    setDrag(0);
    start.current = null;
  };

  return (
    <section
      className="hero-banners relative w-full overflow-hidden bg-[#1a0f2e] select-none"
      aria-roledescription="carousel"
      aria-label="Featured offers"
    >
      <div
        ref={trackRef}
        className="flex touch-pan-y"
        style={{
          transform: `translateX(calc(-${idx * 100}% + ${drag}px))`,
          transition: drag ? "none" : "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={() => start.current && onPointerUp()}
      >
        {BANNERS.map((b, i) => (
          <Link
            key={b.id}
            href={b.href}
            draggable={false}
            onClick={(e) => moved.current && e.preventDefault()}
            className="relative block w-full shrink-0 overflow-hidden"
            aria-hidden={i !== idx}
            tabIndex={i === idx ? 0 : -1}
          >
            {/* Soft blurred backdrop fills any space around the artwork and the strip below it */}
            <img src={b.src.replace("/hero/", "/hero/blur/")} alt="" aria-hidden="true" draggable={false} decoding="async" className="absolute inset-0 w-full h-full object-cover scale-110 opacity-80" />
            <span className="absolute inset-x-0 bottom-0 h-[var(--hero-strip)] bg-gradient-to-b from-transparent to-black/30" aria-hidden="true" />
            {/* Full-width artwork: fills the screen edge to edge, centred vertically */}
            <span className="hero-art relative block w-full overflow-hidden">
            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 block w-full" style={{ aspectRatio: b.ratio }}>
            <span className={`absolute inset-0 block ${i === idx ? "hero-zoom" : ""}`}>
              <img
                src={b.src}
                alt={b.alt}
                draggable={false}
                loading={i === 0 ? "eager" : "lazy"}
                decoding={i === 0 ? "sync" : "async"}
                fetchPriority={i === 0 ? "high" : "low"}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {b.neon?.map((n, k) => (
                <span
                  key={k}
                  aria-hidden="true"
                  className="neon-frame"
                  style={{
                    left: `${n.left}%`,
                    top: `${n.top}%`,
                    width: `${n.width}%`,
                    height: `${n.height}%`,
                    borderRadius: n.radius,
                  }}
                />
              ))}
            </span>
            </span>
            </span>
            {/* Strip under the artwork that the category card overlaps */}
            <span className="relative block h-[var(--hero-strip)]" aria-hidden="true" />
          </Link>
        ))}
      </div>

      {/* Dots with progress fill */}
      <div className="hidden sm:flex absolute bottom-[calc(var(--hero-strip)+10px)] left-1/2 -translate-x-1/2 items-center gap-1.5 sm:gap-2 bg-black/25 backdrop-blur-sm rounded-full px-2.5 py-1.5">
        {BANNERS.map((b, i) => (
          <button
            key={b.id}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show banner ${i + 1}`}
            className={`relative h-1.5 sm:h-2 rounded-full overflow-hidden transition-all duration-300 ${
              i === idx ? "w-7 sm:w-10 bg-white/40" : "w-1.5 sm:w-2 bg-white/60 hover:bg-white"
            }`}
          >
            {i === idx && (
              <span
                key={`${idx}-${paused}`}
                className="absolute inset-y-0 left-0 bg-white rounded-full"
                style={{ animation: paused ? "none" : `dotFill ${INTERVAL}ms linear forwards`, width: paused ? "100%" : undefined }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
