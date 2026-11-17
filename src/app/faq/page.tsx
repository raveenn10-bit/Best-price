import React from "react";
import { FAQS } from "@/data/storeData";

export const metadata = { title: "FAQ | BestPrices.lk" };

export default function FaqPage() {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-10 space-y-6">
      <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">Frequently Asked Questions</h1>
      <div className="space-y-3">
        {FAQS.map((item) => (
          <details key={item.q} className="group bg-white rounded-2xl border border-slate-200 p-5 open:border-rose-300">
            <summary className="font-display font-bold text-sm sm:text-base text-slate-900 cursor-pointer flex items-center justify-between gap-3 list-none">
              <span>{item.q}</span>
              <span className="text-rose-600 font-extrabold transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
