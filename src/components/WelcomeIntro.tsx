"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, X } from "lucide-react";

type GsapNS = typeof import("gsap").gsap;
type Glyphs = typeof import("@/data/welcomeGlyphs");

const HOLD_AFTER = 0.35; // seconds the finished sentence stays before the fade
const FADE_OUT = 0.9;

/**
 * "Hello, welcome to BestPrices.lk" handwritten intro, shown right after the logo preloader.
 * SVG outline strokes drawn with GSAP, timed letter-by-letter to the voiceover (3 s total).
 * Once per session; reduced-motion shows the sentence still; sound blocked => plays silently
 * with a "tap for sound" option. Never blocks the site for more than a few seconds.
 */
export function WelcomeIntro() {
  const [gone, setGone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [data, setData] = useState<Glyphs | null>(null);
  const [soundBlocked, setSoundBlocked] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const gsapRef = useRef<GsapNS | null>(null);
  const tlRef = useRef<ReturnType<GsapNS["timeline"]> | null>(null);
  const tickRef = useRef<(() => void) | null>(null);
  const finishedRef = useRef(false);
  const reduce = useRef(false);
  const [twoLine, setTwoLine] = useState(false);

  const unlock = () => document.documentElement.classList.remove("pl-lock");

  const leave = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setLeaving(true);
    unlock();
    window.dispatchEvent(new Event("bp:intro-done"));
    setTimeout(() => setGone(true), FADE_OUT * 1000 + 50);
  }, []);

  // Skip entirely when already seen this session
  useEffect(() => {
    if (document.documentElement.classList.contains("pl-skip")) setGone(true);
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTwoLine(window.matchMedia("(max-width: 639px)").matches);
  }, []);

  // Load glyph data + GSAP in parallel with the preloader (small, code-split)
  useEffect(() => {
    if (gone) return;
    let alive = true;
    Promise.all([import("@/data/welcomeGlyphs"), import("gsap")]).then(([g, m]) => {
      if (!alive) return;
      gsapRef.current = m.gsap;
      setData(g);
    });
    return () => {
      alive = false;
    };
  }, [gone]);

  const stopSync = () => {
    if (tickRef.current && gsapRef.current) gsapRef.current.ticker.remove(tickRef.current);
    tickRef.current = null;
  };

  /** Build (or rebuild) the handwriting timeline and start it together with the audio. */
  const run = useCallback(
    (withSound: boolean) => {
      const gsap = gsapRef.current;
      const svg = svgRef.current;
      const audio = audioRef.current;
      if (!gsap || !svg || !data) return;
      stopSync();
      tlRef.current?.kill();

      const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path[data-g]"));
      const swash = svg.querySelector<SVGPathElement>("path[data-swash]");
      const tl = gsap.timeline({ paused: true, onComplete: () => gsap.delayedCall(HOLD_AFTER, leave) });

      if (reduce.current) {
        gsap.set(paths, { strokeDashoffset: 0, fillOpacity: 1, opacity: 1 });
        if (swash) gsap.set(swash, { strokeDashoffset: 0, opacity: 1 });
        tl.to({}, { duration: data.WELCOME_DURATION });
      } else {
        paths.forEach((p) => {
          const g = data.WELCOME_GLYPHS[Number(p.dataset.g)];
          const len = Math.ceil(p.getTotalLength()) + 2;
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, fillOpacity: 0, opacity: 0 });
          // Pen stroke traces the letter while it fades in, then the ink fills
          tl.to(p, { strokeDashoffset: 0, opacity: 1, duration: g.dur, ease: "power1.inOut" }, g.start);
          tl.to(p, { fillOpacity: 1, duration: Math.max(0.12, g.dur * 0.7), ease: "power1.out" }, g.start + g.dur * 0.45);
        });
        if (swash) {
          const len = Math.ceil(swash.getTotalLength()) + 2;
          gsap.set(swash, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
          tl.to(swash, { strokeDashoffset: 0, opacity: 1, duration: data.WELCOME_SWASH.dur, ease: "power2.out" }, data.WELCOME_SWASH.start);
        }
        // Guarantee the timeline is exactly the voiceover length
        tl.to({}, { duration: 0.001 }, data.WELCOME_DURATION - 0.001);
      }
      tlRef.current = tl;

      const startClock = () => tl.play(0);

      if (withSound && audio) {
        audio.currentTime = 0;
        const p = audio.play();
        if (p) {
          p.then(() => {
            setSoundBlocked(false);
            // Lock the drawing to the audio clock so words and handwriting never drift apart
            tl.pause(0);
            const tick = () => {
              if (audio.paused || audio.ended) {
                if (tl.time() < tl.duration()) tl.play();
                stopSync();
                return;
              }
              tl.time(Math.min(audio.currentTime, tl.duration()));
            };
            tickRef.current = tick;
            gsap.ticker.add(tick);
          }).catch(() => {
            // Autoplay with sound was blocked: write silently, offer sound
            setSoundBlocked(true);
            startClock();
          });
        } else startClock();
      } else startClock();
    },
    [data, leave]
  );

  // Start when the preloader hands over (or right away if it already has)
  useEffect(() => {
    if (!data || gone) return;
    const go = () => requestAnimationFrame(() => run(true));
    if ((window as unknown as { __bpPreloaderDone?: boolean }).__bpPreloaderDone) go();
    else window.addEventListener("bp:preloader-done", go, { once: true });
    // Safety net: never hold the site longer than this
    const cap = setTimeout(leave, 12000);
    return () => {
      window.removeEventListener("bp:preloader-done", go);
      clearTimeout(cap);
    };
  }, [data, gone, run, leave]);

  useEffect(() => () => {
    stopSync();
    tlRef.current?.kill();
  }, []);

  if (gone) return null;

  return (
    <div className={`welcome-intro ${leaving ? "is-leaving" : ""}`} aria-live="polite">
      <audio ref={audioRef} preload="auto" playsInline>
        <source src="/audio/welcome-voiceover.webm" type="audio/webm; codecs=opus" />
        <source src="/audio/welcome-voiceover.m4a" type="audio/mp4" />
      </audio>

      <h1 className="sr-only">Hello, welcome to BestPrices.lk</h1>
      <div className="welcome-stage">
        {data && (
          <svg ref={svgRef} viewBox={twoLine ? data.WELCOME_MOBILE.viewBox : data.WELCOME_VIEWBOX} className="welcome-svg" aria-hidden="true">
            {[1, 2].map((line) => (
              <g key={line} transform={twoLine ? (line === 1 ? data.WELCOME_MOBILE.line1 : data.WELCOME_MOBILE.line2) : undefined}>
                {data.WELCOME_GLYPHS.map((g, k) =>
                  g.line !== line ? null : (
                    <path
                      key={k}
                      data-g={k}
                      d={g.d}
                      fill={g.accent ? "#e60000" : "#111111"}
                      stroke={g.accent ? "#e60000" : "#111111"}
                      strokeWidth={0.9}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ opacity: 0, fillOpacity: 0 }}
                    />
                  )
                )}
                {line === 2 && (
                  <path data-swash="" d={data.WELCOME_SWASH.d} fill="none" stroke="#e60000" strokeWidth={2.4} strokeLinecap="round" style={{ opacity: 0 }} />
                )}
              </g>
            ))}
          </svg>
        )}
      </div>

      <div className="welcome-actions">
        {soundBlocked && !leaving && (
          <button type="button" onClick={() => run(true)} className="welcome-btn">
            <Volume2 className="w-4 h-4" /> Play with sound
          </button>
        )}
        <button type="button" onClick={leave} className="welcome-btn welcome-btn-ghost" aria-label="Skip intro">
          Skip <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
