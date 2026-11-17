"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Heart, MessageCircle, ShoppingCart, Zap, ZoomIn } from "lucide-react";
import { Product } from "@/types/store";
import { PRODUCTS, formatLKR } from "@/data/storeData";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/ProductCard";
import { whatsappLink } from "@/components/SiteShell";
import { shopHref } from "@/lib/routes";

export function ProductDetails({ product }: { product: Product }) {
  const router = useRouter();
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(Object.entries(product.variations || {}).map(([k, v]) => [k, v[0]]))
  );

  const isWished = wishlist.includes(product.id);
  const savings = product.originalPrice - product.discountPrice;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const variationSummary = Object.values(selected).join(" • ") || "Standard";

  const buyNow = (q: number) => {
    addToCart(product.id, q, variationSummary);
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-8 pb-28">
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 overflow-x-auto no-scrollbar">
        <Link href="/" className="hover:text-rose-600 shrink-0">
          Home
        </Link>
        <span>/</span>
        <Link href={shopHref({ category: product.category })} className="hover:text-rose-600 shrink-0">
          {product.categoryLabel}
        </Link>
        <span>/</span>
        <span className="font-semibold text-slate-900 truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-4">
          <div className="zoom-container aspect-square rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 flex items-center justify-center relative shadow-sm">
            <span className="absolute top-4 left-4 z-10 bg-rose-600 text-white text-xs font-extrabold px-3 py-1 rounded-full">
              SAVE {product.discountPct}%
            </span>
            <span className="absolute bottom-4 right-4 z-10 bg-slate-900/80 text-white text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <ZoomIn className="w-3.5 h-3.5" /> Hover / Tap to Zoom
            </span>
            <img src={gallery[galleryIdx] || product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
          </div>

          {gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
              {gallery.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setGalleryIdx(i)}
                  className={`w-20 h-20 rounded-2xl border-2 p-2 bg-white shrink-0 transition ${
                    galleryIdx === i ? "border-rose-600 shadow-sm" : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-6 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">{product.brand}</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              In Stock ({product.stockCount} Available)
            </span>
            <span className="text-xs text-slate-400">SKU: {product.sku}</span>
          </div>

          <h1 className="font-display font-extrabold text-xl sm:text-3xl text-slate-900 leading-tight">{product.name}</h1>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="text-amber-400">★★★★★</span>
            <span className="font-semibold text-slate-700">{product.rating}</span>
            <span>({product.reviewCount} sample ratings) • {product.soldCount} sold</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{product.shortDesc}</p>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-rose-600 tabular-nums">{formatLKR(product.discountPrice)}</span>
              <span className="text-base text-slate-400 line-through tabular-nums">{formatLKR(product.originalPrice)}</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full tabular-nums">Save {formatLKR(savings)}</span>
            </div>
            <p className="text-xs text-slate-500 tabular-nums">
              Or 3x Monthly Demo Installments of <strong>{formatLKR(Math.round(product.discountPrice / 3))}</strong> (UI Preview Only)
            </p>
          </div>

          {Object.entries(product.variations || {}).map(([name, options]) => (
            <div key={name}>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                {name}: <span className="text-slate-900">{selected[name]}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelected((s) => ({ ...s, [name]: opt }))}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                      selected[name] === opt
                        ? "border-rose-600 bg-rose-50 text-rose-700"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-2 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-xl border border-slate-300 bg-white">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3.5 py-2.5 text-slate-700 hover:bg-slate-100 font-bold" aria-label="Decrease quantity">
                  -
                </button>
                <span className="px-4 py-2.5 text-sm font-bold tabular-nums">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(product.stockCount, q + 1))}
                  className="px-3.5 py-2.5 text-slate-700 hover:bg-slate-100 font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => addToCart(product.id, qty, variationSummary)}
                className="flex-1 bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={() => buyNow(qty)}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 transition"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border ${
                  isWished ? "border-rose-600 bg-rose-50 text-rose-600" : "border-slate-300 text-slate-700 hover:bg-slate-100"
                } transition`}
                aria-label="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWished ? "fill-rose-600" : ""}`} />
              </button>
            </div>

            <a
              href={whatsappLink(`Hi BestPrices.lk, I want to enquire about ${product.name} (${formatLKR(product.discountPrice)})`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Enquire via WhatsApp for Stock & Delivery</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8">
          <h2 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 mb-4">Technical Specifications</h2>
          <div className="divide-y divide-slate-200 text-xs sm:text-sm">
            {Object.entries(product.specs || {}).map(([k, v]) => (
              <div key={k} className="py-3 grid grid-cols-3 gap-4">
                <span className="font-semibold text-slate-500">{k}</span>
                <span className="col-span-2 font-medium text-slate-900">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 h-fit">
          <h2 className="font-display font-extrabold text-lg text-slate-900">Delivery & Demo Guarantee</h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>
                <strong>Colombo & Suburbs:</strong> Express 1–2 working day delivery (Rs. 650 or Free over Rs. 50,000).
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>
                <strong>Outstation Islandwide:</strong> Insured courier delivery in 2–4 working days.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>
                <strong>Phase 01 Notice:</strong> Product specifications and warranty badges are structured for client catalog population.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display font-extrabold text-xl text-slate-900 mb-5">Related Products</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {(related.length ? related : PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4)).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 flex items-center justify-between gap-3 shadow-lg">
        <div className="min-w-0">
          <span className="block text-[10px] text-slate-500 font-medium truncate max-w-[140px]">{product.name}</span>
          <span className="font-display font-extrabold text-sm text-rose-600 tabular-nums">{formatLKR(product.discountPrice)}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" onClick={() => addToCart(product.id, 1, variationSummary)} className="bg-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl">
            Add to Cart
          </button>
          <button type="button" onClick={() => buyNow(1)} className="bg-rose-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
