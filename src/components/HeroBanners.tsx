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
// Alternate slow camera moves so consecutive slides feel different
const MOVES = ["kb-in-left", "kb-in-right", "kb-out-up", "kb-in-right", "kb-in-left", "kb-out-up", "kb-in-left"];

export function HeroBanners() {
  const total = BANNERS.length;
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const start = useRef<{ x: number; y: number; t: number } | null>(null);
  const dragX = useRef(0);
  const moved = useRef(false);
  const rootRef = useRef<HTMLElement>(null);

  const go = useCallback(
    (n: number) => {
      setIdx((cur) => {
        const next = ((n % total) + total) % total;
        if (next !== cur) setPrev(cur);
        return next;
      });
      setCycle((c) => c + 1);
    },
    [total]
  );

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => go(idx + 1), INTERVAL);
    return () => clearTimeout(id);
  }, [idx, paused, go, cycle]);

  // Pause when the tab is hidden
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Scroll parallax + pointer drift (transform-only, one write per frame)
  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      raf = 0;
      const h = el.offsetHeight || 1;
      const y = Math.min(window.scrollY, h);
      el.style.setProperty("--hero-scroll", `${(y * 0.35).toFixed(1)}px`);
      el.style.setProperty("--hero-fade", (Math.min(y / h, 1) * 0.6).toFixed(3));
      el.style.setProperty("--hero-px", `${px.toFixed(2)}px`);
      el.style.setProperty("--hero-py", `${py.toFixed(2)}px`);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width - 0.5) * -18;
      py = ((e.clientY - r.top) / r.height - 0.5) * -12;
      queue();
    };
    window.addEventListener("scroll", queue, { passive: true });
    el.addEventListener("pointermove", onPointer);
    queue();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      el.removeEventListener("pointermove", onPointer);
    };
  }, []);

  // Swipe (touch or mouse drag)
  const onPointerDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY, t: Date.now() };
    dragX.current = 0;
    moved.current = false;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(e.clientY - start.current.y)) {
      moved.current = true;
      dragX.current = dx;
    }
  };
  const onPointerUp = () => {
    if (!start.current) return;
    const dx = dragX.current;
    if (dx < -40) go(idx + 1);
    else if (dx > 40) go(idx - 1);
    start.current = null;
  };

  return (
    <section
      ref={rootRef}
      className="hero-cine hero-art relative w-full overflow-hidden bg-black select-none touch-pan-y"
      aria-roledescription="carousel"
      aria-label="Featured offers"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="hero-parallax absolute inset-0">
        {BANNERS.map((b, i) => {
          const state = i === idx ? "is-active" : i === prev ? "is-leaving" : "";
          return (
            <Link
              key={b.id}
              href={b.href}
              draggable={false}
              onClick={(e) => moved.current && e.preventDefault()}
              className={`hero-slide absolute inset-0 block ${state}`}
              aria-hidden={i !== idx}
              tabIndex={i === idx ? 0 : -1}
            >
              <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 block w-full" style={{ aspectRatio: b.ratio }}>
                <span key={i === idx ? `on-${cycle}` : "off"} className={`absolute inset-0 block ${i === idx ? MOVES[i % MOVES.length] : ""}`}>
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
                      style={{ left: `${n.left}%`, top: `${n.top}%`, width: `${n.width}%`, height: `${n.height}%`, borderRadius: n.radius }}
                    />
                  ))}
                </span>
              </span>
            </Link>
          );
        })}
      </div>

      {/* Cinematic finish */}
      <span className="hero-vignette" aria-hidden="true" />
      <span className="hero-grain" aria-hidden="true" />
      <span key={`sweep-${cycle}`} className="hero-sweep" aria-hidden="true" />
      <span className="hero-scrollfade" aria-hidden="true" />

      {/* Slide counter */}
      <div className="pointer-events-none absolute right-4 sm:right-8 lg:right-12 bottom-6 sm:bottom-8 z-[4] hidden sm:flex items-baseline gap-1.5 text-white font-black tabular-nums drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
        <span key={idx} className="hero-count text-xl lg:text-2xl">{String(idx + 1).padStart(2, "0")}</span>
        <span className="text-xs lg:text-sm text-white/70">/ {String(total).padStart(2, "0")}</span>
      </div>

      {/* Story-style progress bars */}
      <div className="absolute left-4 right-4 sm:left-8 sm:right-28 lg:left-12 lg:right-36 bottom-2 sm:bottom-3 z-[4] flex gap-1.5 sm:gap-2" role="tablist">
        {BANNERS.map((b, i) => (
          <button
            key={b.id}
            type="button"
            role="tab"
            aria-selected={i === idx}
            aria-label={`Show banner ${i + 1}: ${b.alt}`}
            onClick={(e) => {
              e.stopPropagation();
              go(i);
            }}
            className="group relative flex-1 h-4 flex items-center"
          >
            <span className="relative block w-full h-[3px] rounded-full bg-white/30 overflow-hidden group-hover:bg-white/50 transition-colors">
              <span
                key={i === idx ? `p-${cycle}-${paused}` : `p-${i}`}
                className="absolute inset-y-0 left-0 bg-white rounded-full"
                style={{
                  width: i < idx ? "100%" : i === idx ? undefined : "0%",
                  animation: i === idx && !paused ? `dotFill ${INTERVAL}ms linear forwards` : "none",
                }}
              />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
