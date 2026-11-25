"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Star, Truck, Banknote, Headphones } from "lucide-react";
import { BRANDS, CATEGORIES, HERO_SLIDES, PRODUCTS, PROMO_BANNERS, SAMPLE_REVIEWS } from "@/data/storeData";
import { useCountdown } from "@/components/Countdown";
import { DesktopHeroVideo, MobileHeroVideo } from "@/components/HeroVideo";
import { BrandShowcase } from "@/components/BrandShowcase";
import { ProductRow, SectionTitle } from "@/components/ProductRow";
import { shopHref, searchHref } from "@/lib/routes";

/* ----------------------------- Countdown banner --------------------------- */
function DealsCountdownBanner() {
  const { hrs, mins, secs } = useCountdown();
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-8 bg-white">
      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-r from-[#05182F] via-primary-800 to-primary-600 text-white px-6 sm:px-10 py-8 sm:py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute right-40 -bottom-24 w-56 h-56 rounded-full bg-deal/10" />
        <div className="relative text-center lg:text-left">
          <span className="inline-block bg-deal text-[#080808] text-xs font-bold px-3 py-1 rounded-full mb-3">LIMITED TIME</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">MEGA FLASH SALE</h2>
          <p className="text-white/75 text-sm sm:text-base mt-2">Up to 44% off smartphones, TVs, laptops and home appliances — while stocks last.</p>
        </div>
        <div className="relative flex flex-col items-center gap-4">
          <div className="flex gap-2 sm:gap-3 tabular-nums">
            {[
              [hrs, "Hours"],
              [mins, "Minutes"],
              [secs, "Seconds"],
            ].map(([v, l]) => (
              <div key={l} className="w-[76px] sm:w-[92px] rounded-2xl bg-white/10 backdrop-blur border border-white/15 py-3 text-center">
                <span key={v} className="flip-in block text-3xl sm:text-4xl font-black">{v}</span>
                <span className="text-[11px] uppercase tracking-wider text-white/70">{l}</span>
              </div>
            ))}
          </div>
          <Link href="/flash-deals" className="soft-pulse btn-shine bg-deal hover:brightness-95 text-[#080808] font-bold text-sm px-7 py-3 rounded-full transition">
            Browse Deals
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Sections -------------------------------- */
const POPULAR_SEARCHES = [
  "5G Smartphones",
  "Gaming Laptops",
  "4K Smart TV",
  "Air Fryer",
  "Inverter Refrigerator",
  "Washing Machine",
  "Smart Watch",
  "Noise Cancelling Headphones",
  "Inverter AC",
  "Party Speaker",
  "Microwave Oven",
  "Espresso Machine",
];

function CategoryImageTiles({ ids }: { ids: string[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {ids.map((id) => {
        const c = CATEGORIES.find((x) => x.id === id);
        if (!c) return null;
        return (
          <Link
            key={c.id}
            href={shopHref({ category: c.id })}
            className="group bg-white rounded-[18px] border border-[#E9E9E9] shadow-card p-4 flex flex-col items-center text-center hover:border-primary-200 hover:shadow-cardHover transition"
          >
            <div className="h-28 sm:h-32 w-full flex items-center justify-center">
              <img src={c.image} alt="" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
            </div>
            <span className="mt-3 text-sm font-bold text-ink group-hover:text-primary-600">{c.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

const TRUST = [
  { icon: ShieldCheck, title: "100% Genuine Products", body: "Brand-new stock, sourced from trusted suppliers." },
  { icon: Truck, title: "Islandwide Delivery", body: "Colombo in 1–2 days, outstation in 2–4 working days." },
  { icon: Banknote, title: "Cash on Delivery", body: "Pay in LKR when your order reaches your door." },
  { icon: Headphones, title: "Friendly Support", body: "Call or WhatsApp us for stock and delivery checks." },
];

export default function HomePage() {
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival);
  const flash = PRODUCTS.filter((p) => p.isFlashDeal);
  const best = PRODUCTS.filter((p) => p.isBestSeller);
  const trending = PRODUCTS.filter((p) => p.isTrending);
  const recommended = PRODUCTS.filter((p) => p.isRecommended);

  return (
    <>
      <h1 className="sr-only">BestPrices.lk — online shopping for electronics and home appliances in Sri Lanka</h1>
      <MobileHeroVideo />
      <DesktopHeroVideo />
      <DealsCountdownBanner />

      <div className="bg-[#F6F6F6]">
        <div className="w-full px-4 sm:px-6 lg:px-10 py-10 sm:py-14 space-y-14 sm:space-y-16">
          <section>
            <SectionTitle title="NEW ARRIVALS ⭐" href="/shop" />
            <ProductRow products={newArrivals} />
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {PROMO_BANNERS.map((b) => (
              <Link
                key={b.id}
                href={shopHref({ category: b.category })}
                className="group relative overflow-hidden rounded-[22px] min-h-[220px] sm:min-h-[260px] flex items-end"
              >
                <img src={b.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative p-6 sm:p-8 text-white">
                  <span className="inline-block bg-deal text-[#080808] text-[11px] font-bold px-2.5 py-1 rounded-full mb-2">{b.badge}</span>
                  <h3 className="text-2xl sm:text-[32px] font-extrabold leading-tight">{b.title}</h3>
                  <p className="text-sm text-white/80 mt-1 max-w-md">{b.subtitle}</p>
                  <span className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold text-white group-hover:text-deal">
                    {b.ctaText} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </section>

          <section>
            <SectionTitle title="FLASH DEALS ⚡" href="/flash-deals" />
            <ProductRow products={flash} />
          </section>

          <BrandShowcase theme="ugreen" />

          <section className="cv-auto">
            <h2 className="text-xl sm:text-[26px] font-bold text-[#171717] mb-4">Popular Searches</h2>
            <div className="flex flex-wrap gap-2.5">
              {POPULAR_SEARCHES.map((q) => (
                <Link
                  key={q}
                  href={searchHref(q.split(" ").slice(-2).join(" "))}
                  className="bg-white px-[18px] py-2.5 rounded-full border border-[#DEDEDE] text-sm font-semibold text-[#171717] hover:border-primary-600 hover:text-primary-600 transition"
                >
                  {q}
                </Link>
              ))}
            </div>
          </section>

          <section className="cv-auto">
            <SectionTitle title="BEST SELLERS ⭐" href="/shop" />
            <CategoryImageTiles ids={CATEGORIES.map((c) => c.id)} />
            <div className="mt-6">
              <ProductRow products={best} />
            </div>
          </section>

          <BrandShowcase theme="anker" />

          <section className="cv-auto">
            <SectionTitle title="TRENDING NOW 🔥" href="/shop" />
            <ProductRow products={trending} />
          </section>

          <BrandShowcase theme="soundcore" />

          <section className="cv-auto">
            <SectionTitle title="TRENDING BRANDS" />
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
              {BRANDS.map((b) => (
                <Link
                  key={b.id}
                  href={shopHref({ brand: b.id })}
                  className="group bg-white rounded-[18px] border border-[#E9E9E9] h-24 sm:h-28 flex flex-col items-center justify-center text-center px-3 hover:border-primary-300 hover:shadow-cardHover transition"
                >
                  <span className="text-lg sm:text-xl font-black tracking-tight text-ink group-hover:text-primary-600">{b.name}</span>
                  <span className="text-[11px] text-slate-400 mt-0.5 truncate max-w-full">{b.tag}</span>
                </Link>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-3">Sample brand names shown for preview.</p>
          </section>

          <section className="cv-auto">
            <SectionTitle title="RECOMMENDED FOR YOU" href="/shop" />
            <ProductRow products={recommended} />
          </section>

          <section className="cv-auto">
            <SectionTitle title="Customer Reviews ⭐" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {SAMPLE_REVIEWS.map((r) => (
                <div key={r.id} className="bg-white rounded-[18px] border border-[#E9E9E9] p-5 sm:p-6 shadow-card">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[15px] text-ink">{r.customer}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{r.tag}</span>
                  </div>
                  <div className="flex gap-0.5 my-2 text-[#FBBC05]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{r.comment}</p>
                  <p className="text-xs text-primary-600 font-semibold mt-3">{r.product}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="cv-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRUST.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white rounded-[18px] border border-[#E9E9E9] p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] text-ink">{title}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{body}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="cv-auto bg-white rounded-[22px] border border-[#E9E9E9] p-6 sm:p-10 text-[15px] text-slate-600 leading-relaxed space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-ink">Online Shopping in Sri Lanka | BestPrices.lk – Your Trusted Electronics Store</h2>
            <p>
              BestPrices.lk brings you genuine smartphones, laptops, 4K smart TVs, home appliances, kitchen essentials and smart wearables at
              transparent LKR prices, with islandwide delivery to every district in Sri Lanka.
            </p>
            <h3 className="text-lg font-bold text-ink pt-2">100% Genuine Products You Can Trust</h3>
            <p>
              Every product is brand new and comes with clear warranty details. Not sure which model fits your needs? Message us on WhatsApp and
              our team will help you compare before you buy.
            </p>
            <h3 className="text-lg font-bold text-ink pt-2">What You Can Buy from BestPrices.lk</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {CATEGORIES.map((c) => (
                <Link key={c.id} href={shopHref({ category: c.id })} className="text-primary-600 font-semibold hover:underline">
                  {c.name}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
