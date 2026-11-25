"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRound } from "lucide-react";
import { formatLKR } from "@/data/storeData";
import { useStore } from "@/context/StoreContext";

export default function AccountPage() {
  const router = useRouter();
  const { user, orders, hydrated, signOut, setTrackedOrderId } = useStore();

  if (!hydrated) return <div className="w-full px-4 sm:px-6 lg:px-10 py-16 text-sm text-slate-500">Loading account…</div>;

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 shadow-sm">
          <UserRound className="w-10 h-10 text-primary-600 mx-auto" />
          <h1 className="font-display font-extrabold text-xl text-slate-900">Sign in to view your account</h1>
          <p className="text-xs sm:text-sm text-slate-500">Track orders, manage your saved address and view your order history.</p>
          <Link href="/auth" className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm px-6 py-3 rounded-xl">
            Sign In / Register
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8 space-y-8">
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 rounded-2xl bg-primary-600 flex items-center justify-center font-display font-extrabold text-xl shrink-0">
            {user.name.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary-400">My Account Dashboard</span>
            <h1 className="font-display font-extrabold text-xl sm:text-2xl truncate">{user.name}</h1>
            <p className="text-xs text-slate-400 truncate">
              {user.email}
              {user.phone ? ` • ${user.phone}` : ""}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/track-order" className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl">
            Track Orders
          </Link>
          <button
            type="button"
            onClick={() => {
              signOut();
              router.push("/auth");
            }}
            className="bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-display font-extrabold text-lg text-slate-900">Recent Orders ({orders.length})</h2>
          <div className="space-y-3">
            {orders.length === 0 && <p className="text-sm text-slate-500">No orders yet.</p>}
            {orders.map((o) => (
              <div key={o.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display font-bold text-sm text-slate-900">{o.id}</span>
                    <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">{o.statusLabel}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {o.date} • {o.paymentMethod} • {o.district}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display font-extrabold text-sm text-primary-600 tabular-nums">{formatLKR(o.total)}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setTrackedOrderId(o.id);
                      router.push("/track-order");
                    }}
                    className="bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl"
                  >
                    Track
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 h-fit">
          <h2 className="font-display font-extrabold text-lg text-slate-900">Saved Delivery Address</h2>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1 text-slate-600">
            <p className="font-bold text-slate-900">{user.name}</p>
            <p>{orders[0]?.address || "No address saved yet — it will be saved with your first order."}</p>
            {orders[0] && <p>{orders[0].district} District, Sri Lanka</p>}
            <p className="pt-1 text-primary-600 font-semibold">Default Shipping & Billing Address</p>
          </div>
        </div>
      </div>
    </div>
  );
}
