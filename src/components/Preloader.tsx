"use client";
import { useEffect, useState } from "react";
import { LOGO_SRC } from "@/data/storeData";

const MIN_MS = 900; // long enough to read the logo, short enough not to annoy
const MAX_MS = 4000; // never block the page longer than this

/**
 * Simple branded preloader: logo, red progress bar, "LOADING".
 * Rendered in the server HTML so it covers the page instantly; shown once per browser session.
 */
export function Preloader() {
  const [progress, setProgress] = useState(12);
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("pl-skip")) {
      setGone(true);
      return;
    }
    try {
      sessionStorage.setItem("bp_preloaded", "1");
    } catch {}

    const started = performance.now();
    // Ease the bar toward 90% while the page loads
    const tick = setInterval(() => setProgress((p) => (p < 90 ? p + (90 - p) * 0.12 : p)), 120);

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      clearInterval(tick);
      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => setHide(true), 300);
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const cap = setTimeout(finish, MAX_MS);
    return () => {
      clearInterval(tick);
      clearTimeout(cap);
      window.removeEventListener("load", finish);
    };
  }, []);

  useEffect(() => {
    if (!hide) return;
    document.documentElement.classList.remove("pl-lock");
    const t = setTimeout(() => setGone(true), 600);
    return () => clearTimeout(t);
  }, [hide]);

  if (gone) return null;

  return (
    <div id="bp-preloader" className={`preloader ${hide ? "is-hidden" : ""}`} role="status" aria-label="Loading BestPrices.lk">
      <div className="preloader-inner">
        <img src={LOGO_SRC} alt="BestPrices.lk" width={300} height={100} className="preloader-logo" fetchPriority="high" />
        <div className="preloader-bar" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="preloader-label">Loading</p>
      </div>
    </div>
  );
}
