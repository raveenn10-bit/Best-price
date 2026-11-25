"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Banknote, CheckCircle2, CreditCard, Landmark, ShieldAlert, ShoppingBag } from "lucide-react";
import { SRI_LANKA_DISTRICTS, formatLKR, getProductById } from "@/data/storeData";
import { PaymentMethod, useStore } from "@/context/StoreContext";

const METHODS: { id: PaymentMethod; title: string; sub: string; icon: typeof Banknote }[] = [
  { id: "cod", title: "Cash on Delivery", sub: "Pay in LKR upon receiving", icon: Banknote },
  { id: "online", title: "Online Card / KOKO", sub: "Gateway preview only", icon: CreditCard },
  { id: "bank", title: "Bank Transfer", sub: "Quote slip reference", icon: Landmark },
];

const input = "w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-primary-600";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, hydrated, totals, user, selectedDistrict, setSelectedDistrict, paymentMethod, setPaymentMethod, placeOrder } = useStore();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", notes: "" });
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (user) setForm((f) => ({ ...f, name: f.name || user.name, email: f.email || user.email, phone: f.phone || user.phone || "" }));
  }, [user]);

  if (!hydrated) return <div className="w-full px-4 sm:px-6 lg:px-10 py-16 text-sm text-slate-500">Loading checkout…</div>;

  if (cart.length === 0 && !placing) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-10 py-8">
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <ShoppingBag className="w-12 h-12 text-primary-600 mx-auto" />
          <h1 className="font-display font-bold text-xl">Your Cart is Empty</h1>
          <p className="text-xs sm:text-sm text-slate-500">Add a product to your cart before checking out.</p>
          <Link href="/shop" className="inline-block bg-primary-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const { subtotal, totalItems, promoDiscount, shipping, grandTotal } = totals;
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8">
      <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-xs text-amber-900">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
        <span>
          <strong>Secure Checkout:</strong> We never ask for your card details on this page. Our team will call to confirm your order before
          dispatch.
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPlacing(true);
          placeOrder({ name: form.name, address: form.address });
          router.push("/track-order");
        }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
            <h2 className="font-display font-extrabold text-lg text-slate-900">1. Customer & Delivery Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input type="text" required value={form.name} onChange={set("name")} placeholder="Kasun Perera" className={input} autoComplete="name" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number (Sri Lanka) *</label>
                <input
                  type="tel"
                  required
                  pattern="[0-9+\s]{9,15}"
                  title="Enter a valid Sri Lankan mobile number, e.g. 077 123 4567"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="077 123 4567"
                  className={input}
                  autoComplete="tel"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input type="email" required value={form.email} onChange={set("email")} placeholder="you@example.lk" className={input} autoComplete="email" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Delivery District *</label>
                <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className={`${input} bg-white`}>
                  {SRI_LANKA_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Street Address & Landmark *</label>
              <input
                type="text"
                required
                value={form.address}
                onChange={set("address")}
                placeholder="No. 48, Havelock Road, Colombo 05"
                className={input}
                autoComplete="street-address"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Notes (Optional)</label>
              <input type="text" value={form.notes} onChange={set("notes")} placeholder="Call before delivery / Gate code..." className={input} />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
            <h2 className="font-display font-extrabold text-lg text-slate-900">2. Select Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {METHODS.map(({ id, title, sub, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPaymentMethod(id)}
                  className={`p-4 rounded-2xl border-2 text-left transition ${
                    paymentMethod === id ? "border-primary-600 bg-primary-50/50" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Icon className="w-5 h-5 text-primary-600 mb-2" />
                  <p className="font-display font-bold text-xs sm:text-sm text-slate-900">{title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>
                </button>
              ))}
            </div>

            {paymentMethod === "online" ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <p className="font-bold text-slate-900">Online Card / KOKO Payments</p>
                <p>
                  Online card and KOKO / MintPay payments are coming soon. For now, our team will contact you to arrange payment after you place
                  your order.
                </p>
              </div>
            ) : paymentMethod === "bank" ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <p className="font-bold text-slate-900">Bank Transfer</p>
                <p>Our bank account details will be sent to you by SMS and email after you place your order.</p>
                <input type="text" placeholder="Optional transfer reference number" className="w-full mt-2 px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs" />
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                Pay <strong>{formatLKR(grandTotal)}</strong> in cash or card-on-delivery when our courier arrives at your doorstep in{" "}
                <strong>{selectedDistrict}</strong>.
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 space-y-5 lg:sticky lg:top-36">
            <h2 className="font-display font-extrabold text-lg text-slate-900">Order Review ({totalItems} Items)</h2>
            <div className="divide-y divide-slate-200 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => {
                const p = getProductById(item.productId);
                return (
                  <div key={`${item.productId}-${item.variation}`} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img src={p.image} alt={p.name} className="w-11 h-11 rounded-lg object-contain bg-white border border-slate-200 p-1 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate">{p.name}</p>
                        <p className="text-slate-500 truncate">
                          Qty: {item.qty} • {item.variation}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 tabular-nums shrink-0">{formatLKR(p.discountPrice * item.qty)}</span>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 text-xs sm:text-sm pt-3 border-t border-slate-200 tabular-nums">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatLKR(subtotal)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Promo Discount</span>
                  <span>-{formatLKR(promoDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Delivery ({selectedDistrict})</span>
                <span>{shipping === 0 ? "FREE" : formatLKR(shipping)}</span>
              </div>
              <div className="flex justify-between text-lg font-display font-extrabold text-slate-950 pt-2 border-t border-slate-200">
                <span>Total</span>
                <span className="text-primary-600">{formatLKR(grandTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary-600/25 transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Place Order ({formatLKR(grandTotal)})</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
