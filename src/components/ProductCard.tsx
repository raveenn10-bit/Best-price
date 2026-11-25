"use client";
import React from "react";
import Link from "next/link";
import { Eye, Heart, ShoppingCart, Sparkles } from "lucide-react";
import { Product } from "@/types/store";
import { formatLKR } from "@/data/storeData";
import { useStore } from "@/context/StoreContext";

const lkr = (n: number) => n.toLocaleString("en-LK");

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart, openQuickView } = useStore();
  const isWished = wishlist.includes(product.id);
  const href = `/product/${product.id}`;
  const installment = Math.round(product.discountPrice / 3);

  return (
    <article className="product-card relative bg-white rounded-[18px] border border-[#E9E9E9] shadow-card overflow-hidden flex flex-col h-full group">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col items-start gap-1.5">
        {product.isFlashDeal && (
          <span className="bg-deal text-[#080808] text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-[24px_0_24px_24px] leading-none">
            ⚡ DEAL
          </span>
        )}
        {product.isNewArrival && !product.isFlashDeal && (
          <span className="bg-primary-600 text-white text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full leading-none">NEW</span>
        )}
        {product.discountPct > 0 && (
          <span className="bg-price text-white text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full leading-none tabular-nums">
            -{product.discountPct}%
          </span>
        )}
      </div>

      {/* Hover tools column */}
      <div className="card-tools absolute top-3 right-3 z-10 flex flex-col bg-white rounded-xl shadow-[0_2px_5px_rgba(0,0,0,0.13)] overflow-hidden">
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
          className={`w-10 h-10 flex items-center justify-center transition ${isWished ? "text-price" : "text-ink hover:text-primary-600"}`}
        >
          <Heart className={`w-4 h-4 ${isWished ? "fill-price" : ""}`} />
        </button>
        <button
          type="button"
          onClick={() => openQuickView(product.id)}
          aria-label={`Quick view ${product.name}`}
          className="w-10 h-10 flex items-center justify-center text-ink hover:text-primary-600 border-t border-slate-100 transition"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => addToCart(product.id, 1)}
          aria-label={`Add ${product.name} to cart`}
          className="w-10 h-10 flex items-center justify-center text-ink hover:text-primary-600 border-t border-slate-100 transition"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>

      <Link href={href} className="block aspect-square bg-white p-5">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </Link>

      <div className="px-3.5 sm:px-4 pb-4 flex flex-col flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{product.brand}</span>
        <Link
          href={href}
          className="mt-0.5 text-[13px] sm:text-[15px] font-bold text-[#333] leading-snug line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem] hover:text-primary-600 transition"
        >
          {product.name}
        </Link>

        <div className="mt-2">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-[13px] sm:text-sm text-[#737373]">Now</span>
            <span className="text-sm sm:text-base font-bold text-price tabular-nums">LKR {lkr(product.discountPrice)}</span>
          </div>
          <span className="text-[11px] sm:text-xs text-slate-400 line-through tabular-nums">{formatLKR(product.originalPrice)}</span>
        </div>

        <div className="mt-2 animated-gradient text-white rounded-lg px-2.5 py-1.5 text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 tabular-nums">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">You save LKR {lkr(product.originalPrice - product.discountPrice)}</span>
        </div>
        <p className="mt-1.5 text-[11px] sm:text-xs text-[#8E8E8E] font-semibold leading-snug text-center bg-slate-50 rounded-lg py-1.5 tabular-nums">
          or 3 X <b className="font-black">LKR {lkr(installment)}</b> with installments
        </p>

        <div className="mt-auto pt-3">
          <button
            type="button"
            onClick={() => addToCart(product.id, 1)}
            className="w-full border-2 border-primary-600 text-primary-700 hover:bg-primary-600 hover:text-white text-xs sm:text-sm font-bold py-2 rounded-full transition active:scale-[0.98]"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
