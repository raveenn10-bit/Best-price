"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SearchX, SlidersHorizontal } from "lucide-react";
import { BRANDS, CATEGORIES, PRODUCTS, formatLKR } from "@/data/storeData";
import { ProductCard } from "@/components/ProductCard";

interface Filters {
  category: string;
  brand: string;
  maxPrice: number;
  sortBy: string;
  searchQuery: string;
}

const MAX_PRICE = 450000;

function defaults(): Filters {
  return { category: "all", brand: "all", maxPrice: MAX_PRICE, sortBy: "featured", searchQuery: "" };
}

export function Catalog({ isSearchView = false }: { isSearchView?: boolean }) {
  const params = useSearchParams();
  const [f, setF] = useState<Filters>(defaults);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Sync filters whenever the URL query changes (nav links, header search)
  useEffect(() => {
    setF({
      ...defaults(),
      category: params.get("category") || "all",
      brand: params.get("brand") || "all",
      searchQuery: params.get("q") || "",
    });
  }, [params]);

  const set = (patch: Partial<Filters>) => setF((prev) => ({ ...prev, ...patch }));
  const reset = () => setF(defaults());

  const filtered = useMemo(() => {
    const q = f.searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      if (f.category !== "all" && p.category !== f.category) return false;
      if (f.brand !== "all" && p.brand !== f.brand) return false;
      if (p.discountPrice > f.maxPrice) return false;
      if (q) {
        const hit =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });
    if (f.sortBy === "price-asc") list.sort((a, b) => a.discountPrice - b.discountPrice);
    else if (f.sortBy === "price-desc") list.sort((a, b) => b.discountPrice - a.discountPrice);
    else if (f.sortBy === "discount") list.sort((a, b) => b.discountPct - a.discountPct);
    else if (f.sortBy === "newest") list.sort((a, b) => Number(b.isNewArrival) - Number(a.isNewArrival));
    return list;
  }, [f]);

  const activeCategory = CATEGORIES.find((c) => c.id === f.category);
  const hasActive = f.category !== "all" || f.brand !== "all" || !!f.searchQuery || f.maxPrice !== MAX_PRICE;

  const pill = (active: boolean) =>
    `w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
      active ? "bg-primary-600 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
    }`;

  const controls = (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Keyword Filter</label>
        <input
          type="search"
          value={f.searchQuery}
          placeholder="Filter by model or keyword..."
          onChange={(e) => set({ searchQuery: e.target.value })}
          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-primary-600"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Category</label>
        <div className="space-y-1.5">
          <button type="button" onClick={() => set({ category: "all" })} className={pill(f.category === "all")}>
            <span>All Categories</span>
            <span>{PRODUCTS.length}</span>
          </button>
          {CATEGORIES.map((c) => (
            <button key={c.id} type="button" onClick={() => set({ category: c.id })} className={pill(f.category === c.id)}>
              <span>{c.name}</span>
              <span>{PRODUCTS.filter((p) => p.category === c.id).length}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Brand</label>
        <select
          value={f.brand}
          onChange={(e) => set({ brand: e.target.value })}
          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
        >
          <option value="all">All Brands</option>
          {BRANDS.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="uppercase tracking-wider text-slate-500">Max Price</span>
          <span className="text-primary-600 tabular-nums">{formatLKR(f.maxPrice)}</span>
        </div>
        <input
          type="range"
          min={20000}
          max={MAX_PRICE}
          step={10000}
          value={f.maxPrice}
          onChange={(e) => set({ maxPrice: Number(e.target.value) })}
          className="w-full accent-primary-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 tabular-nums">
          <span>Rs. 20,000</span>
          <span>Rs. 450,000</span>
        </div>
      </div>

      <button
        type="button"
        onClick={reset}
        className="w-full py-2.5 rounded-xl border border-slate-300 hover:bg-slate-900 hover:text-white text-xs font-bold transition"
      >
        Reset All Filters
      </button>
    </div>
  );

  const title = isSearchView
    ? f.searchQuery
      ? `Search Results for "${f.searchQuery}"`
      : "Search the BestPrices.lk Catalog"
    : activeCategory
      ? activeCategory.name
      : f.brand !== "all"
        ? `${f.brand} Products`
        : "Explore BestPrices.lk Catalog";

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/" className="hover:text-primary-600">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-900">{isSearchView ? "Search Results" : "Shop Catalog"}</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">{title}</h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setDrawerOpen((o) => !o)}
            className="lg:hidden bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <select
            aria-label="Sort Products"
            value={f.sortBy}
            onChange={(e) => set({ sortBy: e.target.value })}
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-800"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="discount">Biggest Discount %</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </div>

      {drawerOpen && (
        <div className="lg:hidden my-4 p-5 rounded-2xl bg-white border-2 border-primary-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-sm">Filter Products</h3>
            <button type="button" onClick={() => setDrawerOpen(false)} className="text-xs font-bold text-primary-600">
              Done
            </button>
          </div>
          {controls}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
        <aside className="hidden lg:block bg-white rounded-2xl border border-slate-200 p-5 h-fit sticky top-36">
          <h2 className="font-display font-bold text-base text-slate-900 mb-4 pb-3 border-b border-slate-100">Filter Catalog</h2>
          {controls}
        </aside>

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
            <span>
              Showing <strong className="text-slate-900">{filtered.length}</strong> products
            </span>
            {hasActive && (
              <button type="button" onClick={reset} className="text-primary-600 font-bold hover:underline">
                Clear active filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center mx-auto">
                <SearchX className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900">No Matching Products Found</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Try widening your maximum LKR price slider or clearing your category/brand filters.
              </p>
              <button type="button" onClick={reset} className="bg-primary-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
