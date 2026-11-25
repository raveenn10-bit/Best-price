"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play, Volume2, VolumeX } from "lucide-react";

export const HERO_VIDEO = {
  desktop: { src: "/videos/hero-desktop.mp4", poster: "/videos/hero-desktop-poster.webp" },
  mobile: { src: "/videos/hero-mobile.mp4", poster: "/videos/hero-mobile-poster.webp" },
  durationMs: 15040,
  alt: "BestPrices.lk — phones, laptops, audio and smart watches",
};

/** "Upgrade Your Tech. Upgrade Your Life." text overlay shown on the brand film */
export function HeroOverlay({ compact = false, animateKey }: { compact?: boolean; animateKey?: string | number }) {
  return (
    <div key={animateKey} className={`hero-in relative z-[4] text-white ${compact ? "space-y-2" : "space-y-3 lg:space-y-4 max-w-xl"}`}>
      <p className={`font-bold uppercase tracking-[0.18em] text-[#ff3b3b] ${compact ? "text-[11px]" : "text-xs lg:text-sm"}`}>BestPrices.lk</p>
      <h2 className={`font-extrabold leading-[1.05] tracking-tight ${compact ? "text-[28px]" : "text-4xl lg:text-6xl"}`}>
        <span className="block">Upgrade Your Tech.</span>
        <span className="block text-[#ff2a2a] drop-shadow-[0_0_18px_rgba(255,42,42,0.45)]">Upgrade Your Life.</span>
      </h2>
      <p className={`text-white/80 ${compact ? "text-sm" : "text-base lg:text-lg"}`}>Discover premium electronics, smart gadgets and everyday essentials.</p>
      <div className={`flex flex-wrap gap-2.5 ${compact ? "pt-1" : "pt-2"}`}>
        <Link
          href="/shop"
          onPointerDown={(e) => e.stopPropagation()}
          className={`btn-shine inline-flex items-center gap-2 bg-[#e60000] hover:bg-[#ff1a1a] text-white font-bold rounded-lg shadow-[0_8px_30px_-6px_rgba(230,0,0,0.6)] transition ${compact ? "text-sm px-4 py-2.5" : "text-sm lg:text-base px-6 py-3 lg:py-3.5"}`}
        >
          Shop Now <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/flash-deals"
          onPointerDown={(e) => e.stopPropagation()}
          className={`inline-flex items-center border border-white/35 hover:border-white bg-black/30 hover:bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg transition ${compact ? "text-sm px-4 py-2.5" : "text-sm lg:text-base px-6 py-3 lg:py-3.5"}`}
        >
          Explore Deals
        </Link>
      </div>
    </div>
  );
}

/** True when the visitor asked for less data or less motion: show the poster, don't auto-download video. */
export function prefersLightMode() {
  if (typeof window === "undefined") return false;
  const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !!conn?.saveData ||
    conn?.effectiveType === "2g" ||
    conn?.effectiveType === "slow-2g"
  );
}

/** Resolves after the page has finished loading and the browser is idle, so video never competes with first paint. */
export function whenIdle(cb: () => void) {
  const run = () => {
    const ric = (window as unknown as { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) ric(cb, { timeout: 1500 });
    else setTimeout(cb, 300);
  };
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });
}

export function MuteButton({ muted, onToggle, className = "" }: { muted: boolean; onToggle: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      onPointerDown={(e) => e.stopPropagation()}
      aria-label={muted ? "Turn sound on" : "Mute video"}
      className={`w-10 h-10 rounded-full bg-black/45 hover:bg-black/70 backdrop-blur text-white border border-white/25 flex items-center justify-center transition ${className}`}
    >
      {muted ? <VolumeX className="w-[18px] h-[18px]" /> : <Volume2 className="w-[18px] h-[18px]" />}
    </button>
  );
}

/**
 * Desktop video slide inside the hero carousel.
 * Loads only after the page is idle, plays only while it is the active slide,
 * and tells the carousel when it has finished (or could not play).
 */
export function VideoSlide({
  active,
  muted,
  onEnded,
  onFail,
}: {
  active: boolean;
  muted: boolean;
  onEnded: () => void;
  onFail: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (window.matchMedia("(max-width: 639px)").matches) return; // phones use MobileHeroVideo
    if (prefersLightMode()) {
      onFail();
      return;
    }
    whenIdle(() => setSrc(HERO_VIDEO.desktop.src));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = muted;
  }, [muted]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    if (active) {
      v.currentTime = 0;
      const p = v.play();
      if (p) p.catch(() => onFail());
    } else {
      v.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, src]);

  return (
    <video
      ref={ref}
      src={src}
      poster={HERO_VIDEO.desktop.poster}
      muted
      playsInline
      preload={src ? "auto" : "none"}
      onEnded={onEnded}
      onError={() => src && onFail()}
      aria-label={HERO_VIDEO.alt}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

/**
 * Phones: the vertical cut of the commercial, full width above the banners.
 * Starts downloading only once it is on screen and the page is idle; pauses when scrolled away.
 */
export function MobileHeroVideo() {
  const wrap = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | undefined>(undefined);
  const [muted, setMuted] = useState(true);
  const [light, setLight] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 639px)").matches) return; // desktop uses the carousel slide
    const isLight = prefersLightMode();
    setLight(isLight);
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        const v = ref.current;
        if (e.isIntersecting) {
          if (!isLight) whenIdle(() => setSrc((s) => s || HERO_VIDEO.mobile.src));
          if (v && v.src) v.play().catch(() => {});
        } else if (v) {
          v.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (ref.current) ref.current.muted = muted;
  }, [muted]);

  return (
    <div ref={wrap} className="sm:hidden relative w-full overflow-hidden bg-black hero-cine" style={{ height: "min(125vw, calc(100svh - 230px))" }}>
      <video
        ref={ref}
        src={src}
        poster={HERO_VIDEO.mobile.poster}
        muted
        loop
        playsInline
        autoPlay={!light}
        preload={src ? "auto" : "none"}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label={HERO_VIDEO.alt}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <span className="hero-vignette" aria-hidden="true" />
      <span className="hero-grain" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 z-[4] px-4 pb-5 pt-28 bg-gradient-to-t from-black/90 via-black/55 to-transparent">
        <HeroOverlay compact />
      </div>
      <div className="absolute top-3 right-3 z-[5]">
        {src ? (
          <MuteButton muted={muted} onToggle={() => setMuted((m) => !m)} />
        ) : (
          light && (
            <button
              type="button"
              onClick={() => setSrc(HERO_VIDEO.mobile.src)}
              aria-label="Play video"
              className="w-11 h-11 rounded-full bg-white/90 text-ink flex items-center justify-center shadow-lg"
            >
              <Play className="w-5 h-5 fill-current" />
            </button>
          )
        )}
      </div>
      {!playing && src && !light && <span className="sr-only">Loading video</span>}
    </div>
  );
}
