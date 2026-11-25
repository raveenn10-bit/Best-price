import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/storeData";
import { shopHref } from "@/lib/routes";

export const metadata = { title: "All Categories | BestPrices.lk" };

export default function CategoriesPage() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8 space-y-8">
      <div>
        <span className="text-xs font-extrabold uppercase tracking-wider text-primary-600">All Departments</span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">Browse by Product Category</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Select any department or sub-category to filter the BestPrices.lk catalog.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORIES.map((cat) => {
          const count = PRODUCTS.filter((p) => p.category === cat.id).length;
          return (
            <div
              key={cat.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:border-primary-300 transition"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img src={cat.image} alt={cat.name} className="w-20 h-20 rounded-2xl object-contain bg-slate-50 p-2 border border-slate-100" />
                  <div>
                    <span className="text-[11px] font-bold text-primary-600">{count} Products</span>
                    <h2 className="font-display font-extrabold text-lg text-slate-900">{cat.name}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">{cat.shortDesc}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 my-4">
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub}
                      href={shopHref({ category: cat.id })}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-primary-50 hover:text-primary-600 text-slate-700 text-xs font-medium transition"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href={shopHref({ category: cat.id })}
                className="w-full mt-2 bg-slate-950 hover:bg-primary-600 text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 transition"
              >
                <span>Explore {cat.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
