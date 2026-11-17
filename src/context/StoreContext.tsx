"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, DemoOrder } from "@/types/store";
import { PRODUCTS } from "@/data/storeData";

interface StoreContextValue {
  cart: CartItem[];
  wishlist: string[];
  orders: DemoOrder[];
  addToCart: (productId: string, qty?: number, variation?: string) => void;
  removeFromCart: (index: number) => void;
  toggleWishlist: (productId: string) => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([
    { productId: "bp-prod-06", qty: 1, variation: "5.5L XL Family" },
  ]);
  const [wishlist, setWishlist] = useState<string[]>(["bp-prod-01", "bp-prod-03"]);
  const [orders, setOrders] = useState<DemoOrder[]>([]);

  useEffect(() => {
    try {
      const c = localStorage.getItem("bp_demo_cart");
      if (c) setCart(JSON.parse(c));
      const w = localStorage.getItem("bp_demo_wishlist");
      if (w) setWishlist(JSON.parse(w));
    } catch {}
  }, []);

  const addToCart = (productId: string, qty = 1, variation = "Standard") => {
    setCart((prev) => {
      const next = [...prev];
      const existing = next.find((i) => i.productId === productId && i.variation === variation);
      if (existing) existing.qty += qty;
      else next.push({ productId, qty, variation });
      try {
        localStorage.setItem("bp_demo_cart", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => {
      const next = prev.filter((_, idx) => idx !== index);
      try {
        localStorage.setItem("bp_demo_cart", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem("bp_demo_wishlist", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return (
    <StoreContext.Provider value={{ cart, wishlist, orders, addToCart, removeFromCart, toggleWishlist }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
