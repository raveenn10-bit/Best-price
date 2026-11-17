"use client";
import React from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/types/store";
import { formatLKR } from "@/data/storeData";
import { useStore } from "@/context/StoreContext";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const isWished = wishlist.includes(product.id);

  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-lg">
      <div>
        <div className="relative aspect-square bg-white p-4 flex items-center justify-center border-b border-slate-100">
          <span className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full">
            -{product.discountPct}%
          </span>
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-rose-600"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWished ? "fill-rose-600 text-rose-600" : ""}`} />
          </button>
          <Link href={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
            <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
          </Link>
        </div>
        <div className="p-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-rose-600">{product.brand}</span>
            <span className="text-emerald-600 font-semibold">{product.stockCount} in stock</span>
          </div>
          <Link href={`/product/${product.id}`} className="font-bold text-sm text-slate-900 line-clamp-2 hover:text-rose-600">
            {product.name}
          </Link>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-baseline gap-2">
            <span className="font-extrabold text-base text-slate-950">{formatLKR(product.discountPrice)}</span>
            <span className="text-xs text-slate-400 line-through">{formatLKR(product.originalPrice)}</span>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 flex gap-2">
        <button
          type="button"
          onClick={() => addToCart(product.id, 1)}
          className="flex-1 bg-slate-950 hover:bg-rose-600 text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition"
        >
          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
        </button>
        <Link
          href={`/product/${product.id}`}
          className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 flex items-center"
        >
          <Eye className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
