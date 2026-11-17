"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, CreditCard, Headphones, ShieldCheck, Sparkles, Truck, Zap } from "lucide-react";
import { BRANDS, CATEGORIES, HERO_SLIDES, PRODUCTS, PROMO_BANNERS, SAMPLE_REVIEWS } from "@/data/storeData";
import { ProductCard } from "@/components/ProductCard";
import { CountdownBoxes } from "@/components/Countdown";
import { SectionHeader } from "@/components/SectionHeader";
import { useStore } from "@/context/StoreContext";
import { shopHref } from "@/lib/routes";

function HeroSlider() {
  const [idx, setIdx] = useState(0);
  const total = HERO_SLIDES.length;
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % total), 7000);
    return () => clearInterval(id);
  }, [idx, total]);
  const slide = HERO_SLIDES[idx];

  return (
    <section className="relative bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <img
            key={slide.desktopImage}
            src={slide.desktopImage}
            alt={slide.title}
            className="hidden sm:block w-full h-[380px] lg:h-[440px] object-cover object-center opacity-55 transition-all duration-500"
          />
          <img
            key={slide.mobileImage + "-m"}
            src={slide.mobileImage}
            alt={slide.title}
            className="block sm:hidden w-full h-[400px] object-cover object-center opacity-45"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent flex items-center">
            <div className="p-6 sm:p-10 lg:p-14 max-w-2xl space-y-4">
              <span className="inline-flex items-center gap-1.5 bg-rose-600 text-white text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" /> {slide.badge}
              </span>
              <h1 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white leading-tight">{slide.title}</h1>
              <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-xl">{slide.subtitle}</p>
              <div className="flex items-center gap-3 pt-1">
                <span className="text-amber-400 font-display font-extrabold text-sm sm:text-lg tabular-nums">{slide.priceCallout}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={shopHref({ category: slide.ctaCategory })}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-lg shadow-rose-600/30 transition"
                >
                  <span>{slide.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/flash-deals"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition"
                >
                  View Flash Deals
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIdx((i) => (i - 1 + total) % total)}
              aria-label="Previous Slide"
              className="w-9 h-9 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white border border-white/15 flex items-center justify-center transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-2">
              {HERO_SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === idx ? "w-7 bg-rose-500" : "w-2 bg-white/40 hover:bg-white"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIdx((i) => (i + 1) % total)}
              aria-label="Next Slide"
              className="w-9 h-9 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white border border-white/15 flex items-center justify-center transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const BEST_SELLER_TABS = [
  { id: "all", label: "All Best Sellers" },
  { id: "mobiles", label: "Mobiles" },
  { id: "home-appliances", label: "Home Appliances" },
  { id: "kitchen-appliances", label: "Kitchen" },
  { id: "tv-audio", label: "TV & Audio" },
];

const INFO_CARDS = [
  { icon: Truck, title: "Islandwide Delivery", body: "Colombo 1–2 days & Outstation 2–4 working days. Free delivery over Rs. 50,000." },
  { icon: ShieldCheck, title: "Sample Warranty UI", body: "Structured warranty badge slots ready for merchant warranty terms in Phase 02." },
  { icon: CreditCard, title: "Flexible LKR Payments", body: "Online Card UI, Cash on Delivery (COD), and Bank Transfer checkout options." },
  { icon: Headphones, title: "Direct WhatsApp Support", body: "Instant WhatsApp product enquiry & live order tracking assistance." },
];

export default function HomePage() {
  const { showToast } = useStore();
  const [bestTab, setBestTab] = useState("all");
  const [email, setEmail] = useState("");

  const flashDeals = PRODUCTS.filter((p) => p.isFlashDeal);
  const bestSellers = PRODUCTS.filter((p) => (bestTab === "all" ? p.isBestSeller : p.category === bestTab)).slice(0, 8);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);
  const trending = PRODUCTS.filter((p) => p.isTrending).slice(0, 4);
  const recommended = PRODUCTS.filter((p) => p.isRecommended).slice(0, 4);

  return (
    <>
      <HeroSlider />

      {/* Shop by category */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-10">
        <SectionHeader eyebrow="Browse Departments" title="Shop by Category" linkHref="/categories" linkLabel="View All Categories" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={shopHref({ category: cat.id })}
              className="group bg-white hover:bg-rose-50/40 rounded-2xl border border-slate-200 hover:border-rose-300 p-4 text-center flex flex-col items-center transition shadow-sm hover:shadow-md"
            >
              <div className="w-20 h-20 rounded-2xl bg-slate-50 group-hover:bg-white p-2.5 flex items-center justify-center mb-3 border border-slate-100">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900 group-hover:text-rose-600">{cat.name}</h3>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{cat.shortDesc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash deals */}
      <section className="bg-slate-950 text-white py-10 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-600/30">
                <Zap className="w-6 h-6 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white">Flash Price Rush</h2>
                  <span className="bg-rose-600/20 text-rose-400 border border-rose-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full">LIVE NOW</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Limited-stock daily markdowns inspired by Sri Lanka&apos;s top appliance flash sales</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Offer Ends In:</span>
              <CountdownBoxes />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 text-slate-900">
            {flashDeals.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/flash-deals"
              className="inline-flex items-center gap-2 bg-white hover:bg-rose-600 text-slate-950 hover:text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition"
            >
              <span>Explore All {flashDeals.length} Flash Deals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-12">
        <SectionHeader eyebrow="Top Rated in Sri Lanka" title="Best-Selling Products">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {BEST_SELLER_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setBestTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
                  bestTab === tab.id ? "bg-rose-600 text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </SectionHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Promo banners */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {PROMO_BANNERS.map((b) => (
            <div
              key={b.id}
              className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 min-h-[240px] sm:min-h-[270px] flex items-center group"
            >
              <img
                src={b.image}
                alt={b.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="relative z-10 p-6 sm:p-8 max-w-md space-y-3 text-white">
                <span className="inline-block bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  {b.badge}
                </span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl leading-snug">{b.title}</h3>
                <p className="text-xs sm:text-sm text-slate-200">{b.subtitle}</p>
                <Link
                  href={shopHref({ category: b.category })}
                  className="bg-white hover:bg-rose-600 text-slate-950 hover:text-white font-bold text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 transition"
                >
                  <span>{b.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New arrivals & trending */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-12 space-y-12">
        <div>
          <SectionHeader eyebrow="Just Landed" title="New Arrivals" linkHref="/shop" linkLabel="Explore All" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
        <div>
          <SectionHeader eyebrow="Most Viewed This Week" title="Trending Products" linkHref="/shop" linkLabel="See Trending" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {trending.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="bg-slate-50 border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <SectionHeader eyebrow="Curated Catalog Brands" title="Shop by Brand">
            <span className="text-[11px] font-medium text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full w-fit">
              Note: Sample demo brand filters — no official partnership claimed in Phase 01
            </span>
          </SectionHeader>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-8">
            {BRANDS.map((b) => (
              <Link
                key={b.id}
                href={shopHref({ brand: b.id })}
                className="bg-white hover:bg-rose-600 group rounded-xl border border-slate-200 hover:border-rose-600 p-3.5 text-center transition shadow-sm"
              >
                <span className="block font-display font-extrabold text-sm text-slate-900 group-hover:text-white">{b.name}</span>
                <span className="block text-[10px] text-slate-400 group-hover:text-rose-100 mt-0.5 truncate">{b.category}</span>
              </Link>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl bg-white border border-slate-200 py-4 px-2">
            <div className="animate-marquee flex items-center gap-8">
              {[...BRANDS, ...BRANDS].map((b, i) => (
                <Link
                  key={`${b.id}-${i}`}
                  href={shopHref({ brand: b.id })}
                  className="flex items-center gap-2.5 px-5 py-2 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200/70 shrink-0 transition"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                  <span className="font-display font-extrabold text-sm text-slate-800 tracking-tight">{b.name}</span>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">{b.tag}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recommended */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-12">
        <SectionHeader eyebrow="Curated For You" title="Recommended Products" linkHref="/shop" linkLabel="View Catalog" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {recommended.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <SectionHeader eyebrow="Customer Feedback UI" title="Customer Reviews (Sample Layout)">
            <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full w-fit">
              Clearly Identified Sample Content — Phase 01 Demo
            </span>
          </SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {SAMPLE_REVIEWS.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">{r.tag}</span>
                    <div className="flex items-center text-amber-400 text-xs shrink-0">★★★★★</div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">&ldquo;{r.comment}&rdquo;</p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{r.customer}</p>
                  <p className="text-[11px] text-rose-600 font-medium">
                    {r.product} • {r.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery / warranty / payment info */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INFO_CARDS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="p-5 rounded-2xl bg-white border border-slate-200 flex items-start gap-3.5 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-slate-900">{title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 pb-6">
        <div className="rounded-3xl bg-slate-950 text-white p-6 sm:p-10 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-500">VIP Price Alerts</span>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl">Subscribe for Flash Deal Alerts & Exclusive LKR Vouchers</h2>
            <p className="text-xs sm:text-sm text-slate-400">Get notified first when weekend appliance price drops go live on BestPrices.lk.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              showToast(`Subscribed ${email} to BestPrices.lk Flash Deal alerts!`);
              setEmail("");
            }}
            className="w-full lg:w-auto flex flex-col sm:flex-row gap-2.5 sm:min-w-[420px]"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-rose-500"
            />
            <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shrink-0 transition">
              Subscribe Now
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
