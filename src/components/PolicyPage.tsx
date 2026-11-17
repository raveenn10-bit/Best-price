import React from "react";

export function PolicyPage({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-10">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-5">
        <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600">BestPrices.lk Policy</span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">{title}</h1>
        <ul className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed list-disc pl-5">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
