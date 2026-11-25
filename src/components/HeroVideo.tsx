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

  // After a manual "play" tap (data saver / slow connection), start as soon as the source is set
  const wantPlay = useRef(false);
  useEffect(() => {
    const v = ref.current;
    if (v && src && wantPlay.current) v.play().catch(() => {});
  }, [src]);

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
      <div className="hero-copy absolute inset-x-0 bottom-0 z-[4] px-4 pb-5 pt-28 bg-gradient-to-t from-black/90 via-black/55 to-transparent">
        <HeroOverlay compact />
      </div>
      <div className="absolute top-3 right-3 z-[5]">
        {src ? (
          <MuteButton muted={muted} onToggle={() => setMuted((m) => !m)} />
        ) : (
          light && (
            <button
              type="button"
              onClick={() => { wantPlay.current = true; setSrc(HERO_VIDEO.mobile.src); }}
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

/**
 * Desktop/tablet hero: the landscape brand film, edge to edge, looping, with the overlay.
 * Loads after the page is idle; poster shows instantly; pauses when scrolled away.
 */
export function DesktopHeroVideo() {
  const wrap = useRef<HTMLElement>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | undefined>(undefined);
  const [muted, setMuted] = useState(true);
  const [light, setLight] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 639px)").matches) return; // phones use MobileHeroVideo
    const isLight = prefersLightMode();
    setLight(isLight);
    if (!isLight) whenIdle(() => setSrc(HERO_VIDEO.desktop.src));
    const el = wrap.current;
    if (!el) return;

    // Pause off-screen + gentle scroll parallax (transform only)
    const io = new IntersectionObserver(([e]) => {
      const v = ref.current;
      if (!v || !v.src) return;
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(el);
    let raf = 0;
    const onScroll = () => {
      if (raf || isLight) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = el.offsetHeight || 1;
        const y = Math.min(window.scrollY, h);
        el.style.setProperty("--hero-scroll", `${(y * 0.3).toFixed(1)}px`);
        el.style.setProperty("--hero-fade", (Math.min(y / h, 1) * 0.6).toFixed(3));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (ref.current) ref.current.muted = muted;
  }, [muted]);

  // After a manual "play" tap (data saver / slow connection), start as soon as the source is set
  const wantPlay = useRef(false);
  useEffect(() => {
    const v = ref.current;
    if (v && src && wantPlay.current) v.play().catch(() => {});
  }, [src]);

  return (
    <section ref={wrap} className="hidden sm:block hero-cine hero-art relative w-full overflow-hidden bg-black" aria-label="BestPrices.lk">
      <div className="hero-parallax absolute inset-0">
        <video
          ref={ref}
          src={src}
          poster={HERO_VIDEO.desktop.poster}
          muted
          loop
          playsInline
          autoPlay={!light}
          preload={src ? "auto" : "none"}
          aria-label={HERO_VIDEO.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 z-[3] bg-gradient-to-r from-black/85 via-black/45 to-transparent" aria-hidden="true" />
      <span className="hero-vignette" aria-hidden="true" />
      <span className="hero-grain" aria-hidden="true" />
      <span className="hero-scrollfade" aria-hidden="true" />
      <div className="hero-copy absolute inset-0 z-[4] flex items-center px-8 lg:px-16 xl:px-24">
        <HeroOverlay />
      </div>
      <div className="absolute right-6 lg:right-12 bottom-6 lg:bottom-8 z-[5]">
        {src ? (
          <MuteButton muted={muted} onToggle={() => setMuted((m) => !m)} />
        ) : (
          light && (
            <button
              type="button"
              onClick={() => { wantPlay.current = true; setSrc(HERO_VIDEO.desktop.src); }}
              aria-label="Play video"
              className="w-12 h-12 rounded-full bg-white/90 text-ink flex items-center justify-center shadow-lg"
            >
              <Play className="w-5 h-5 fill-current" />
            </button>
          )
        )}
      </div>
    </section>
  );
}
