"use client";
import React from "react";
import Link from "next/link";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/types/store";
import { formatLKR } from "@/data/storeData";
import { useStore } from "@/context/StoreContext";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart, openQuickView } = useStore();
  const isWished = wishlist.includes(product.id);
  const savings = product.originalPrice - product.discountPrice;
  const soldRatio = Math.min(95, Math.round((product.soldCount / (product.soldCount + product.stockCount)) * 100));
  const href = `/product/${product.id}`;

  return (
    <article className="product-card bg-white rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col justify-between relative group">
      <div>
        <div className="relative aspect-square bg-white p-4 flex items-center justify-center overflow-hidden border-b border-slate-100">
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
            <span className="bg-rose-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm tabular-nums">
              -{product.discountPct}%
            </span>
            {product.isNewArrival && (
              <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">New</span>
            )}
          </div>

          <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle Wishlist"
              className={`w-8 h-8 rounded-full ${
                isWished ? "bg-rose-600 text-white" : "bg-white/90 text-slate-700 hover:bg-rose-50 hover:text-rose-600"
              } border border-slate-200 shadow-sm flex items-center justify-center transition`}
            >
              <Heart className={`w-4 h-4 ${isWished ? "fill-white" : ""}`} />
            </button>
            <button
              type="button"
              onClick={() => openQuickView(product.id)}
              aria-label="Quick View"
              className="w-8 h-8 rounded-full bg-white/90 text-slate-700 hover:bg-slate-900 hover:text-white border border-slate-200 shadow-sm flex items-center justify-center transition"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          <Link href={href} className="w-full h-full flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </Link>
        </div>

        <div className="p-3.5 sm:p-4">
          <div className="flex items-center justify-between gap-1 text-[11px] text-slate-500 mb-1">
            <span className="font-semibold text-rose-600 truncate">{product.brand}</span>
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {product.stockCount} in stock
            </span>
          </div>

          <Link
            href={href}
            className="block font-display font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 min-h-[2.5rem] hover:text-rose-600 transition leading-snug"
          >
            {product.name}
          </Link>

          <div className="mt-2.5 pt-2.5 border-t border-slate-100">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="font-display font-extrabold text-sm sm:text-base text-slate-950 tabular-nums">
                {formatLKR(product.discountPrice)}
              </span>
              <span className="text-[11px] text-slate-400 line-through tabular-nums">{formatLKR(product.originalPrice)}</span>
            </div>
            <p className="text-[10px] font-semibold text-emerald-700 mt-0.5 tabular-nums">
              Save {formatLKR(savings)} • 3x {formatLKR(Math.round(product.discountPrice / 3))}/mo
            </p>
          </div>

          {product.isFlashDeal && (
            <div className="mt-2.5">
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-600 rounded-full" style={{ width: `${soldRatio}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 tabular-nums">
                <span>Available: {product.stockCount}</span>
                <span className="font-semibold text-rose-600">{product.soldCount} Sold</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-1 flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => addToCart(product.id, 1)}
          className="flex-1 bg-slate-950 hover:bg-rose-600 text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </button>
        <button
          type="button"
          onClick={() => openQuickView(product.id)}
          className="px-2.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-semibold transition"
          title="Quick View"
        >
          Quick
        </button>
      </div>
    </article>
  );
}
