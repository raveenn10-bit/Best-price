"use client";
import { useEffect, useRef, useState } from "react";

const MAX_MS = 5200; // never block the page longer than this

/**
 * Logo-reveal preloader. Shown once per browser session, rendered in the server HTML
 * so it covers the page instantly. Hides when the reveal finishes and the page has loaded.
 */
export function Preloader() {
  const ref = useRef<HTMLVideoElement>(null);
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("pl-skip")) {
      setGone(true);
      return;
    }
    try {
      sessionStorage.setItem("bp_preloaded", "1");
    } catch {}

    let videoDone = false;
    let pageDone = document.readyState === "complete";
    const finish = () => {
      setProgress(100);
      setTimeout(() => setHide(true), 250);
    };
    const check = () => videoDone && pageDone && finish();

    const v = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!v || reduce) videoDone = true;
    else {
      v.play().catch(() => {
        videoDone = true;
        check();
      });
      v.addEventListener("ended", () => {
        videoDone = true;
        check();
      });
      v.addEventListener("timeupdate", () => {
        if (v.duration) setProgress((p) => Math.max(p, Math.min(92, (v.currentTime / v.duration) * 100)));
      });
    }
    const onLoad = () => {
      pageDone = true;
      check();
    };
    if (!pageDone) window.addEventListener("load", onLoad, { once: true });
    check();
    const cap = setTimeout(finish, reduce ? 900 : MAX_MS);
    return () => {
      clearTimeout(cap);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (!hide) return;
    document.documentElement.classList.remove("pl-lock");
    const t = setTimeout(() => setGone(true), 650);
    return () => clearTimeout(t);
  }, [hide]);

  if (gone) return null;

  return (
    <div id="bp-preloader" className={`preloader ${hide ? "is-hidden" : ""}`} role="status" aria-label="Loading BestPrices.lk">
      <div className="preloader-inner">
        <video
          ref={ref}
          src="/videos/preloader.mp4"
          poster="/videos/preloader-poster.webp"
          muted
          playsInline
          autoPlay
          preload="auto"
          className="preloader-video"
        />
        <div className="preloader-bar" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="preloader-label">Loading</p>
      </div>
    </div>
  );
}
