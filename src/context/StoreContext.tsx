"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { CartItem, DemoOrder, DemoUser } from "@/types/store";
import { BUSINESS_SETTINGS, getProductById } from "@/data/storeData";

export type PaymentMethod = "cod" | "online" | "bank";

export interface Toast {
  id: number;
  message: string;
  type: "success" | "info";
}

export interface CartTotals {
  subtotal: number;
  totalItems: number;
  promoDiscount: number;
  shipping: number;
  grandTotal: number;
  totalSaved: number;
}

const DEFAULT_CART: CartItem[] = [
  { productId: "bp-prod-06", qty: 1, variation: "5.5L XL Family" },
  { productId: "bp-prod-10", qty: 1, variation: "Crimson Sport Silicone" },
];
const DEFAULT_WISHLIST = ["bp-prod-01", "bp-prod-03"];
const DEFAULT_ORDERS: DemoOrder[] = [
  {
    id: "BP-2026-8492",
    date: "2026-11-16",
    customerName: "Kasun Perera (Demo Order)",
    district: "Colombo",
    address: "No. 48, Havelock Road, Colombo 05",
    paymentMethod: "Cash on Delivery",
    statusStep: 3,
    statusLabel: "Out for Delivery",
    total: 181989,
    items: [
      { id: "bp-prod-03", name: '55" 4K QLED Smart Google TV', qty: 1, price: 159999 },
      { id: "bp-prod-06", name: "5.5L Digital Touch Smart Air Fryer XL", qty: 1, price: 21990 },
    ],
  },
];

interface StoreContextValue {
  hydrated: boolean;
  cart: CartItem[];
  wishlist: string[];
  orders: DemoOrder[];
  user: DemoUser | null;
  promoCodeApplied: boolean;
  selectedDistrict: string;
  paymentMethod: PaymentMethod;
  trackedOrderId: string;
  totals: CartTotals;
  toasts: Toast[];
  quickViewId: string | null;
  addToCart: (productId: string, qty?: number, variation?: string | null) => void;
  updateCartQty: (index: number, delta: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  applyPromoCode: (code: string) => boolean;
  setSelectedDistrict: (d: string) => void;
  setPaymentMethod: (m: PaymentMethod) => void;
  setTrackedOrderId: (id: string) => void;
  signIn: (user: DemoUser) => void;
  signOut: () => void;
  placeOrder: (details: { name: string; address: string }) => DemoOrder;
  showToast: (message: string, type?: "success" | "info") => void;
  openQuickView: (id: string) => void;
  closeQuickView: () => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function writeLS(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(DEFAULT_CART);
  const [wishlist, setWishlist] = useState<string[]>(DEFAULT_WISHLIST);
  const [orders, setOrders] = useState<DemoOrder[]>(DEFAULT_ORDERS);
  const [user, setUser] = useState<DemoUser | null>(null);
  const [promoCodeApplied, setPromoCodeApplied] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("Colombo");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [trackedOrderId, setTrackedOrderId] = useState("BP-2026-8492");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const toastSeq = useRef(0);

  // Load persisted demo state once on the client
  useEffect(() => {
    setCart(readLS("bp_demo_cart", DEFAULT_CART));
    setWishlist(readLS("bp_demo_wishlist", DEFAULT_WISHLIST));
    setUser(readLS<DemoUser | null>("bp_demo_user", null));
    setOrders(readLS("bp_demo_orders", DEFAULT_ORDERS));
    setHydrated(true);
  }, []);

  // Persist after hydration
  useEffect(() => {
    if (hydrated) writeLS("bp_demo_cart", cart);
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) writeLS("bp_demo_wishlist", wishlist);
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (hydrated) writeLS("bp_demo_user", user);
  }, [user, hydrated]);
  useEffect(() => {
    if (hydrated) writeLS("bp_demo_orders", orders);
  }, [orders, hydrated]);

  const showToast = useCallback((message: string, type: "success" | "info" = "success") => {
    const id = ++toastSeq.current;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  const addToCart = useCallback(
    (productId: string, qty = 1, variation: string | null = null) => {
      const product = getProductById(productId);
      const v = variation || Object.values(product.variations || {}).map((x) => x[0]).join(" • ") || "Standard";
      setCart((prev) => {
        const idx = prev.findIndex((i) => i.productId === productId && i.variation === v);
        if (idx > -1) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: Math.min(product.stockCount, next[idx].qty + qty) };
          return next;
        }
        return [...prev, { productId, qty, variation: v }];
      });
      showToast(`Added "${product.name.slice(0, 32)}..." to cart`);
    },
    [showToast]
  );

  const updateCartQty = useCallback(
    (index: number, delta: number) => {
      setCart((prev) => {
        const item = prev[index];
        if (!item) return prev;
        const product = getProductById(item.productId);
        const nextQty = item.qty + delta;
        if (nextQty <= 0) return prev.filter((_, i) => i !== index);
        if (nextQty > product.stockCount) return prev;
        const next = [...prev];
        next[index] = { ...item, qty: nextQty };
        return next;
      });
    },
    []
  );

  const removeFromCart = useCallback(
    (index: number) => {
      setCart((prev) => prev.filter((_, i) => i !== index));
      showToast("Item removed from cart");
    },
    [showToast]
  );

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      const product = getProductById(productId);
      if (wishlist.includes(productId)) {
        setWishlist((prev) => prev.filter((id) => id !== productId));
        showToast("Removed from wishlist");
      } else {
        setWishlist((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
        showToast(`Saved "${product.name.slice(0, 28)}..." to wishlist`);
      }
    },
    [showToast, wishlist]
  );

  const applyPromoCode = useCallback(
    (code: string) => {
      const ok = code.trim().toUpperCase() === BUSINESS_SETTINGS.demoPromoCode;
      setPromoCodeApplied(ok);
      if (ok) showToast(`Promo code ${BUSINESS_SETTINGS.demoPromoCode} applied (10% extra discount)!`);
      else showToast(`Invalid demo code. Try ${BUSINESS_SETTINGS.demoPromoCode}`, "info");
      return ok;
    },
    [showToast]
  );

  const totals = useMemo<CartTotals>(() => {
    let subtotal = 0;
    let totalItems = 0;
    let originalTotal = 0;
    cart.forEach((item) => {
      const p = getProductById(item.productId);
      subtotal += p.discountPrice * item.qty;
      originalTotal += p.originalPrice * item.qty;
      totalItems += item.qty;
    });
    const promoDiscount = promoCodeApplied
      ? Math.round(subtotal * (BUSINESS_SETTINGS.demoPromoDiscountPct / 100))
      : 0;
    const shipping =
      subtotal === 0
        ? 0
        : subtotal >= BUSINESS_SETTINGS.freeShippingThreshold
          ? 0
          : selectedDistrict === "Colombo"
            ? BUSINESS_SETTINGS.standardShippingColombo
            : BUSINESS_SETTINGS.standardShippingIslandwide;
    const grandTotal = Math.max(0, subtotal - promoDiscount + shipping);
    const totalSaved = originalTotal - subtotal + promoDiscount;
    return { subtotal, totalItems, promoDiscount, shipping, grandTotal, totalSaved };
  }, [cart, promoCodeApplied, selectedDistrict]);

  const signIn = useCallback(
    (u: DemoUser) => {
      setUser(u);
      showToast(`Signed in as ${u.name} (Demo Mode)`);
    },
    [showToast]
  );
  const signOut = useCallback(() => {
    setUser(null);
    showToast("Signed out", "info");
  }, [showToast]);

  const placeOrder = useCallback(
    ({ name, address }: { name: string; address: string }) => {
      const id = "BP-2026-" + Math.floor(1000 + Math.random() * 9000);
      const order: DemoOrder = {
        id,
        date: new Date().toISOString().slice(0, 10),
        customerName: name || "Demo Customer",
        district: selectedDistrict,
        address: address || "Colombo, Sri Lanka",
        paymentMethod:
          paymentMethod === "cod"
            ? "Cash on Delivery"
            : paymentMethod === "online"
              ? "Online Payment UI (Demo)"
              : "Bank Transfer (Demo)",
        statusStep: 1,
        statusLabel: "Order Confirmed (Demo)",
        total: totals.grandTotal,
        items: cart.map((item) => {
          const p = getProductById(item.productId);
          return { id: p.id, name: p.name, qty: item.qty, price: p.discountPrice };
        }),
      };
      setOrders((prev) => [order, ...prev]);
      setTrackedOrderId(id);
      setCart([]);
      setPromoCodeApplied(false);
      showToast(`Demo Order ${id} placed! Redirecting to Order Tracker...`);
      return order;
    },
    [cart, paymentMethod, selectedDistrict, totals.grandTotal, showToast]
  );

  const value: StoreContextValue = {
    hydrated,
    cart,
    wishlist,
    orders,
    user,
    promoCodeApplied,
    selectedDistrict,
    paymentMethod,
    trackedOrderId,
    totals,
    toasts,
    quickViewId,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    applyPromoCode,
    setSelectedDistrict,
    setPaymentMethod,
    setTrackedOrderId,
    signIn,
    signOut,
    placeOrder,
    showToast,
    openQuickView: setQuickViewId,
    closeQuickView: () => setQuickViewId(null),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
