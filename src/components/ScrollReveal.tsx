"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL = "main section, main .product-card, main [data-reveal]";
const PAUSABLE = "main section, .bottom-glow";

/**
 * - Fades sections and cards up as they scroll into view.
 * - Pauses decorative animation loops inside sections that are off-screen,
 *   so the browser only animates what you can actually see.
 */
export function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            revealIO.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const pauseIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle("offscreen-paused", !e.isIntersecting);
      },
      { rootMargin: "150px 0px" }
    );

    const prepare = () => {
      if (!reduce) {
        document.querySelectorAll<HTMLElement>(REVEAL).forEach((el) => {
          if (el.dataset.revealed) return;
          el.dataset.revealed = "1";
          const siblings = el.parentElement ? el.parentElement.children : null;
          const idx = siblings ? Math.max(0, Array.prototype.indexOf.call(siblings, el)) : 0;
          el.style.setProperty("--reveal-delay", `${Math.min(idx, 6) * 70}ms`);
          el.classList.add("reveal");
          revealIO.observe(el);
        });
      }
      document.querySelectorAll<HTMLElement>(PAUSABLE).forEach((el) => {
        if (el.dataset.pausable) return;
        el.dataset.pausable = "1";
        pauseIO.observe(el);
      });
    };

    // Batch DOM-change checks into one per frame (the countdown ticks every second)
    let queued = 0;
    const schedule = () => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        prepare();
      });
    };

    schedule();
    const mo = new MutationObserver(schedule);
    const main = document.querySelector("main");
    if (main) mo.observe(main, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(queued);
      mo.disconnect();
      revealIO.disconnect();
      pauseIO.disconnect();
    };
  }, [pathname]);
  return null;
}
