import React from "react";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { PRODUCTS } from "@/data/storeData";
import { searchHref } from "@/lib/routes";

const img = (id: string) => PRODUCTS.find((p) => p.id === id)?.image || PRODUCTS[0].image;

type Tile = { label: string; href: string; image?: string; special?: "new" | "deals" | "best" | "all"; hot?: boolean };

const TILES: Tile[] = [
  { label: "New Arrivals", href: "/shop", special: "new" },
  { label: "Flash Deals", href: "/flash-deals", special: "deals" },
  { label: "Smartphones", href: searchHref("Smartphone"), image: img("bp-prod-01"), hot: true },
  { label: "Laptops", href: searchHref("Laptop"), image: img("bp-prod-02") },
  { label: "Smart TVs", href: searchHref("Google TV"), image: img("bp-prod-04") },
  { label: "Headphones", href: searchHref("Headphones"), image: img("bp-prod-07") },
  { label: "Party Speakers", href: searchHref("Speaker"), image: img("bp-prod-11") },
  { label: "Smart Watches", href: searchHref("Smartwatch"), image: img("bp-prod-10") },
  { label: "Best Sellers", href: "/shop", special: "best" },
  { label: "Refrigerators", href: searchHref("Refrigerator"), image: img("bp-prod-03") },
  { label: "Washing Machines", href: searchHref("Washing Machine"), image: img("bp-prod-05") },
  { label: "Air Conditioners", href: searchHref("Air Conditioner"), image: img("bp-prod-08") },
  { label: "Air Fryers", href: searchHref("Air Fryer"), image: img("bp-prod-06"), hot: true },
  { label: "Coffee Makers", href: searchHref("Espresso"), image: img("bp-prod-09") },
  { label: "Microwaves", href: searchHref("Microwave"), image: img("bp-prod-12") },
  { label: "Shop All", href: "/shop", special: "all" },
];

function Starburst({ text, from, to, textClass = "text-white" }: { text: string; from: string; to: string; textClass?: string }) {
  const id = `g-${text.replace(/\W/g, "")}`;
  // 16-point starburst
  const pts = Array.from({ length: 32 }, (_, i) => {
    const r = i % 2 === 0 ? 48 : 41;
    const a = (Math.PI * 2 * i) / 32 - Math.PI / 2;
    return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <span className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full slow-spin" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <polygon points={pts} fill={`url(#${id})`} />
      </svg>
      <span className={`relative font-black italic tracking-tight text-lg sm:text-2xl drop-shadow ${textClass}`}>{text}</span>
    </span>
  );
}

function TileVisual({ t }: { t: Tile }) {
  if (t.special === "new") return <Starburst text="NEW" from="#1c75bc" to="#05458d" />;
  if (t.special === "deals") return <Starburst text="DEALS" from="#ffd60a" to="#ff8a00" textClass="text-[#b3000c]" />;
  if (t.special === "best") return <Starburst text="TOP" from="#ff4fa3" to="#e52329" />;
  if (t.special === "all")
    return (
      <span className="w-full h-full rounded-full bg-gradient-to-br from-primary-600 to-primary-800 text-white flex flex-col items-center justify-center">
        <LayoutGrid className="w-8 h-8 sm:w-10 sm:h-10" />
      </span>
    );
  return <img src={t.image} alt="" loading="lazy" className="w-[78%] h-[78%] object-contain mix-blend-multiply" />;
}

export function CategoryCircles() {
  return (
    <section className="relative z-10 w-full px-4 sm:px-6 lg:px-10 pt-5 sm:pt-8">
      <div className="bg-white rounded-[24px] shadow-[0_10px_40px_-12px_rgba(5,69,141,0.25)] border border-slate-100 px-3 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-rows-2 grid-flow-col auto-cols-[96px] sm:auto-cols-[132px] lg:grid-flow-row lg:grid-rows-none lg:grid-cols-8 lg:auto-cols-auto gap-x-3 sm:gap-x-5 gap-y-6 sm:gap-y-8 overflow-x-auto no-scrollbar lg:overflow-visible pb-1">
          {TILES.map((t, i) => (
            <Link key={t.label} href={t.href} className="cat-tile group flex flex-col items-center text-center" data-reveal style={{ ["--reveal-delay" as string]: `${(i % 8) * 50}ms` }}>
              <span className="relative block w-[86px] h-[86px] sm:w-[118px] sm:h-[118px] lg:w-[124px] lg:h-[124px] xl:w-[132px] xl:h-[132px]">
                <span className="cat-ring" aria-hidden="true" />
                <span className="cat-circle relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                  <TileVisual t={t} />
                </span>
                {t.hot && (
                  <span className="wiggle absolute -top-1 -right-1 sm:top-0 sm:right-0 bg-gradient-to-br from-[#ffb400] to-[#e52329] text-white text-[10px] sm:text-xs font-black italic px-2 py-1 rounded-full shadow-md border-2 border-white">
                    🔥HOT
                  </span>
                )}
              </span>
              <span className="mt-2.5 text-[12px] sm:text-[15px] font-bold text-ink leading-tight group-hover:text-primary-600 transition-colors">{t.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
