"use client";
import React from "react";
import { Zap } from "lucide-react";
import { PRODUCTS } from "@/data/storeData";
import { ProductCard } from "@/components/ProductCard";
import { useCountdown } from "@/components/Countdown";

export default function FlashDealsPage() {
  const deals = PRODUCTS.filter((p) => p.isFlashDeal);
  const { hrs, mins, secs } = useCountdown();
  const boxes: [string, string][] = [
    [hrs, "Hours"],
    [mins, "Mins"],
    [secs, "Secs"],
  ];
  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8 space-y-8">
      <div className="rounded-3xl bg-slate-950 text-white p-6 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 bg-primary-600 text-white text-xs font-extrabold px-3 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5 fill-white" /> DAILY FLASH SALE
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl">Up to 44% OFF Flash Deals</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">Grab limited-stock electronics and home appliances before the countdown resets.</p>
        </div>
        <div className="flex items-center gap-2 tabular-nums">
          {boxes.map(([v, l]) => (
            <div key={l} className="bg-primary-600 px-4 py-3 rounded-2xl text-center min-w-[72px]">
              <span className="block font-display font-extrabold text-2xl">{v}</span>
              <span className="text-[10px] uppercase">{l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {deals.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
