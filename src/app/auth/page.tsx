"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LOGO_SRC } from "@/data/storeData";
import { useStore } from "@/context/StoreContext";

const input = "w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-rose-600";

export default function AuthPage() {
  const router = useRouter();
  const { signIn } = useStore();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const tabBtn = (active: boolean) => `py-2.5 rounded-lg transition ${active ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`;

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <img src={LOGO_SRC} alt="BestPrices.lk" className="h-10 mx-auto object-contain" />
          <span className="inline-block bg-rose-50 text-rose-600 text-[11px] font-bold px-3 py-0.5 rounded-full">Phase 01 Demo Authentication</span>
          <h1 className="font-display font-extrabold text-2xl text-slate-900">{tab === "login" ? "Welcome Back" : "Create Your Account"}</h1>
        </div>

        <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 text-xs font-bold">
          <button type="button" onClick={() => setTab("login")} className={tabBtn(tab === "login")}>
            Sign In
          </button>
          <button type="button" onClick={() => setTab("register")} className={tabBtn(tab === "register")}>
            Register
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fallbackName = email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Customer";
            signIn({ name: tab === "register" && name.trim() ? name.trim() : fallbackName, email, phone: phone || undefined });
            router.push("/account");
          }}
          className="space-y-4"
        >
          {tab === "register" && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Kasun Perera" className={input} autoComplete="name" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="077 123 4567" className={input} autoComplete="tel" />
              </div>
            </>
          )}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.lk" className={input} autoComplete="email" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={input}
              autoComplete={tab === "login" ? "current-password" : "new-password"}
            />
          </div>
          <button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl text-sm transition">
            {tab === "login" ? "Sign In" : "Create Account"}
          </button>
          <p className="text-[11px] text-center text-slate-400">Demo mode: details stay in this browser only. Real accounts arrive in Phase 02.</p>
        </form>
      </div>
    </div>
  );
}
