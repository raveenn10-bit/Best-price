"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { BUSINESS_SETTINGS, SRI_LANKA_DISTRICTS, formatLKR, getProductById } from "@/data/storeData";
import { useStore } from "@/context/StoreContext";

export default function CartPage() {
  const {
    cart,
    hydrated,
    totals,
    updateCartQty,
    removeFromCart,
    promoCodeApplied,
    applyPromoCode,
    selectedDistrict,
    setSelectedDistrict,
  } = useStore();
  const [code, setCode] = useState("");
  useEffect(() => {
    if (promoCodeApplied) setCode(BUSINESS_SETTINGS.demoPromoCode);
  }, [promoCodeApplied]);

  if (!hydrated) return <div className="w-full px-4 sm:px-6 lg:px-10 py-16 text-sm text-slate-500">Loading cart…</div>;
  const { subtotal, totalItems, promoDiscount, shipping, grandTotal, totalSaved } = totals;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8">
      <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mb-6">Shopping Cart ({totalItems} Items)</h1>

      {cart.length === 0 ? (
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <ShoppingBag className="w-12 h-12 text-rose-600 mx-auto" />
          <h2 className="font-display font-bold text-xl">Your Shopping Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">Browse our Flash Deals or Best Sellers to add products to your cart.</p>
          <Link href="/shop" className="inline-block bg-rose-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item, idx) => {
              const p = getProductById(item.productId);
              return (
                <div
                  key={`${item.productId}-${item.variation}`}
                  className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <Link href={`/product/${p.id}`} className="shrink-0">
                      <img src={p.image} alt={p.name} className="w-20 h-20 rounded-xl object-contain border border-slate-100 p-1.5" />
                    </Link>
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-rose-600">{p.brand}</span>
                      <Link href={`/product/${p.id}`} className="block font-display font-bold text-sm sm:text-base text-slate-900 hover:text-rose-600">
                        {p.name}
                      </Link>
                      <p className="text-xs text-slate-500 mt-0.5">Option: {item.variation}</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-display font-extrabold text-sm text-slate-900 tabular-nums">{formatLKR(p.discountPrice)}</span>
                        <span className="text-xs text-slate-400 line-through tabular-nums">{formatLKR(p.originalPrice)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <div className="flex items-center rounded-xl border border-slate-300 bg-white">
                      <button type="button" onClick={() => updateCartQty(idx, -1)} className="px-3 py-1.5 font-bold text-slate-700 hover:bg-slate-100" aria-label="Decrease">
                        -
                      </button>
                      <span className="px-3 py-1.5 text-xs font-bold tabular-nums">{item.qty}</span>
                      <button type="button" onClick={() => updateCartQty(idx, 1)} className="px-3 py-1.5 font-bold text-slate-700 hover:bg-slate-100" aria-label="Increase">
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="block font-display font-extrabold text-sm sm:text-base text-slate-950 tabular-nums">
                        {formatLKR(p.discountPrice * item.qty)}
                      </span>
                      <button type="button" onClick={() => removeFromCart(idx)} className="text-[11px] text-rose-600 hover:underline font-semibold">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 space-y-5 lg:sticky lg:top-36">
              <h2 className="font-display font-extrabold text-lg text-slate-900">Order Summary</h2>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Promo Code (Try <span className="text-rose-600">{BUSINESS_SETTINGS.demoPromoCode}</span>)
                </label>
                <form
                  className="flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    applyPromoCode(code);
                  }}
                >
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder={`Enter code ${BUSINESS_SETTINGS.demoPromoCode}`}
                    className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-slate-300 text-xs uppercase bg-white"
                  />
                  <button type="submit" className="bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition">
                    Apply
                  </button>
                </form>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Delivery District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
                >
                  {SRI_LANKA_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm pt-3 border-t border-slate-200 tabular-nums">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-slate-900">{formatLKR(subtotal)}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Promo Discount ({BUSINESS_SETTINGS.demoPromoCode} -10%)</span>
                    <span>-{formatLKR(promoDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Delivery ({selectedDistrict})</span>
                  <span className="font-semibold">
                    {shipping === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatLKR(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-display font-extrabold text-slate-950 pt-3 border-t border-slate-200">
                  <span>Total Payable</span>
                  <span className="text-rose-600">{formatLKR(grandTotal)}</span>
                </div>
                <p className="text-[11px] text-emerald-700 font-semibold">Total Savings on this order: {formatLKR(totalSaved)}</p>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 transition"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
