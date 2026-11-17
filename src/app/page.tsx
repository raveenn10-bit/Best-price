"use client";
import React from "react";
import { CATEGORIES, HERO_SLIDES, PRODUCTS, BUSINESS_SETTINGS } from "@/data/storeData";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-950 text-white text-xs py-2 px-4 text-center">
        {BUSINESS_SETTINGS.name} Phase 01 Demo — Islandwide Delivery Across Sri Lanka • Developed by {BUSINESS_SETTINGS.developer}
      </div>
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        <section className="rounded-3xl bg-slate-950 text-white p-8 lg:p-14">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-500">{HERO_SLIDES[0].badge}</span>
          <h1 className="text-3xl lg:text-5xl font-extrabold mt-2 max-w-2xl">{HERO_SLIDES[0].title}</h1>
          <p className="text-slate-300 mt-3 max-w-xl">{HERO_SLIDES[0].subtitle}</p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold mb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl border border-slate-200 text-center">
                <img src={c.image} alt={c.name} className="w-16 h-16 mx-auto object-contain mb-2" />
                <h3 className="font-bold text-xs">{c.name}</h3>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold mb-4">Featured Flash Deals & Best Sellers</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
