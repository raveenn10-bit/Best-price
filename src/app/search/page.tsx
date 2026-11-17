import React, { Suspense } from "react";
import { Catalog } from "@/components/Catalog";

export const metadata = { title: "Search Results | BestPrices.lk" };

export default function Page() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-sm text-slate-500">Loading catalog…</div>}>
      <Catalog isSearchView />
    </Suspense>
  );
}
