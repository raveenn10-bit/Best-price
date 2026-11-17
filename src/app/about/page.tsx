import React from "react";
import { BUSINESS_SETTINGS } from "@/data/storeData";

export const metadata = { title: "About Us | BestPrices.lk" };

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-10 space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-5">
        <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600">About BestPrices.lk</span>
        <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900">Sri Lanka&apos;s Next-Generation E-Commerce Storefront</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          <strong>BestPrices.lk</strong> is engineered to bring Sri Lankan shoppers a clean, fast, and transparent way to compare and purchase consumer
          electronics, home appliances, kitchen essentials, and smart wearables in LKR.
        </p>
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm text-slate-700">
          <p className="font-display font-bold text-slate-900">Phase 01 Architecture — Developed by {BUSINESS_SETTINGS.developer}</p>
          <p>
            Built with a modular component architecture and isolated data stores so Firebase, live inventory sync, and the Admin Dashboard can be
            connected seamlessly in Phase 02 without modifying UI components.
          </p>
        </div>
      </div>
    </div>
  );
}
