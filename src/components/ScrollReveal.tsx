"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "main section, main .product-card, main [data-reveal]";

/** Fades sections and cards up as they scroll into view. Runs on every route change. */
export function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const prepare = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (el.dataset.revealed) return;
        el.dataset.revealed = "1";
        // Stagger siblings (e.g. cards in a row)
        const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
        const idx = Math.max(0, siblings.indexOf(el));
        el.style.setProperty("--reveal-delay", `${Math.min(idx, 6) * 70}ms`);
        el.classList.add("reveal");
        io.observe(el);
      });
    };

    // Wait a frame so the new route has rendered
    const raf = requestAnimationFrame(() => prepare(document));
    const mo = new MutationObserver(() => prepare(document));
    const main = document.querySelector("main");
    if (main) mo.observe(main, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);
  return null;
}
