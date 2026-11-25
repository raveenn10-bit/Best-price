"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/store";
import { ProductCard } from "@/components/ProductCard";

const EMOJI_RE = /(\p{Extended_Pictographic}\uFE0F?)\s*$/u;
function renderTitle(title: string) {
  const m = title.match(EMOJI_RE);
  if (!m) return title;
  return (
    <>
      {title.slice(0, m.index).trimEnd()} <span className="emoji-bounce">{m[1]}</span>
    </>
  );
}

export function SectionTitle({ title, href, linkLabel = "View All" }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5 sm:mb-6">
      <h2 className="section-title text-[26px] sm:text-[34px] lg:text-[40px]">{renderTitle(title)}</h2>
      {href && (
        <Link href={href} className="shrink-0 text-sm sm:text-base font-semibold text-primary-600 hover:text-primary-700 hover:underline pb-1">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}

/** Horizontally scrolling product row with arrow controls (6 visible on wide screens). */
export function ProductRow({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };
  return (
    <div className="relative group/row">
      <div ref={ref} className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-1 px-1">
        {products.map((p) => (
          <div
            key={p.id}
            className="snap-start shrink-0 w-[calc((100%-12px)/2)] sm:w-[calc((100%-32px)/3)] md:w-[calc((100%-48px)/4)] lg:w-[calc((100%-64px)/5)] xl:w-[calc((100%-80px)/6)]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      {products.length > 4 && (
        <>
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="hidden md:flex absolute -left-4 top-[38%] w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 text-ink items-center justify-center opacity-0 group-hover/row:opacity-100 hover:bg-primary-600 hover:text-white transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="hidden md:flex absolute -right-4 top-[38%] w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 text-ink items-center justify-center opacity-0 group-hover/row:opacity-100 hover:bg-primary-600 hover:text-white transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}
