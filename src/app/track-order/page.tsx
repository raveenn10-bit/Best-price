"use client";
import React, { useEffect, useState } from "react";
import { PackageSearch } from "lucide-react";
import { formatLKR } from "@/data/storeData";
import { useStore } from "@/context/StoreContext";

const STEPS = ["Order Placed", "Confirmed & Verified", "Packed at Colombo Hub", "Out for Delivery", "Delivered"];

export default function TrackOrderPage() {
  const { orders, trackedOrderId, setTrackedOrderId, hydrated } = useStore();
  const [input, setInput] = useState(trackedOrderId);
  useEffect(() => setInput(trackedOrderId), [trackedOrderId]);

  const order = orders.find((o) => o.id.toLowerCase() === trackedOrderId.trim().toLowerCase());

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-8 space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600">Order Tracker</span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">Track Your BestPrices.lk Order</h1>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setTrackedOrderId(input.trim());
          }}
          className="flex flex-col sm:flex-row gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Order ID (e.g. BP-2026-8492)"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:border-rose-600"
          />
          <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl">
            Track Order
          </button>
        </form>

        {hydrated && !order && (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <PackageSearch className="w-8 h-8 text-rose-600 mx-auto" />
            <p className="font-display font-bold text-slate-900">No order found for &quot;{trackedOrderId}&quot;</p>
            <p className="text-xs text-slate-500">
              Check the ID and try again.{orders[0] ? ` Your most recent order is ${orders[0].id}.` : ""}
            </p>
          </div>
        )}

        {hydrated && order && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs text-slate-500">Order Reference</p>
                <p className="font-display font-extrabold text-lg text-slate-900">{order.id}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Recipient & District</p>
                <p className="font-bold text-xs sm:text-sm text-slate-900">
                  {order.customerName} ({order.district})
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs text-slate-500">Total Amount</p>
                <p className="font-display font-extrabold text-base text-rose-600 tabular-nums">{formatLKR(order.total)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {STEPS.map((label, idx) => {
                const done = idx <= order.statusStep;
                return (
                  <div
                    key={label}
                    className={`p-3 rounded-xl border ${done ? "border-rose-500 bg-rose-50/60 text-slate-900" : "border-slate-200 bg-white text-slate-400"} text-center`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full mx-auto mb-1.5 flex items-center justify-center text-xs font-bold ${
                        done ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <p className="text-xs font-bold">{label}</p>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Items</p>
              {order.items.map((it) => (
                <div key={it.id + it.name} className="flex justify-between text-xs sm:text-sm text-slate-700">
                  <span className="truncate pr-3">
                    {it.qty} × {it.name}
                  </span>
                  <span className="font-semibold tabular-nums shrink-0">{formatLKR(it.price * it.qty)}</span>
                </div>
              ))}
              <p className="text-xs text-slate-500 pt-2">
                Placed {order.date} • {order.paymentMethod} • Delivering to {order.address}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
