"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CheckCircle2,
  ChevronRight,
  Flame,
  Grid,
  Heart,
  HelpCircle,
  Home,
  Info,
  MapPin,
  Menu,
  MessageCircle,
  PhoneCall,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Truck,
  User,
  X,
  Zap,
} from "lucide-react";
import { BUSINESS_SETTINGS, CATEGORIES, LOGO_SRC, PRODUCTS, formatLKR, getProductById } from "@/data/storeData";
import { useStore } from "@/context/StoreContext";
import { PAGES_REGISTRY, searchHref, shopHref } from "@/lib/routes";

/* -------------------------------------------------------------------------- */
/* Announcement bar                                                           */
/* -------------------------------------------------------------------------- */
function AnnouncementBar() {
  return (
    <div className="bg-slate-950 text-white text-xs border-b border-slate-800">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
          <span className="inline-flex items-center gap-1.5 bg-rose-600 text-white font-semibold px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-wider shrink-0">
            <Flame className="w-3.5 h-3.5" /> Hot Deals
          </span>
          <span className="text-slate-200 font-medium truncate">
            Islandwide Delivery Across Sri Lanka • Up to 44% OFF Flash Deals • Use Code{" "}
            <strong className="text-rose-400">{BUSINESS_SETTINGS.demoPromoCode}</strong> for 10% Extra Discount
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-slate-300 shrink-0">
          <Link href="/track-order" className="hover:text-white flex items-center gap-1 transition">
            <Truck className="w-3.5 h-3.5 text-rose-500" /> Track Order
          </Link>
          <span className="text-slate-700">|</span>
          <Link href="/faq" className="hover:text-white flex items-center gap-1 transition">
            <HelpCircle className="w-3.5 h-3.5 text-rose-500" /> Help & FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Search with live autocomplete                                              */
/* -------------------------------------------------------------------------- */
function useSearchMatches(query: string, category: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter((p) => {
    const matchesCat = category === "all" || p.category === category;
    const matchesText =
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q);
    return matchesCat && matchesText;
  }).slice(0, 5);
}

function AutocompleteDropdown({
  query,
  category,
  onPick,
}: {
  query: string;
  category: string;
  onPick: () => void;
}) {
  const router = useRouter();
  const matches = useSearchMatches(query, category);
  return (
    <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
      {matches.length === 0 ? (
        <div className="p-4 text-center text-xs text-slate-500">
          No instant matches for &quot;<strong>{query}</strong>&quot;. Press Enter to view full search options.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {matches.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                onPick();
                router.push(`/product/${p.id}`);
              }}
              className="w-full p-3 hover:bg-rose-50/50 flex items-center justify-between gap-3 text-left transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img src={p.image} alt={p.name} className="w-11 h-11 rounded-lg object-contain border border-slate-200 bg-white shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{p.name}</p>
                  <p className="text-[11px] text-slate-500">
                    {p.categoryLabel} • {p.brand}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="block text-xs font-extrabold text-rose-600 tabular-nums">{formatLKR(p.discountPrice)}</span>
                <span className="text-[10px] text-slate-400 line-through tabular-nums">{formatLKR(p.originalPrice)}</span>
              </div>
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              onPick();
              router.push(searchHref(query, category));
            }}
            className="w-full py-2.5 px-4 bg-slate-900 text-white text-xs font-bold text-center hover:bg-rose-600 transition"
          >
            View All Search Results for &quot;{query}&quot; →
          </button>
        </div>
      )}
    </div>
  );
}

function DesktopSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div ref={wrapRef} className="hidden md:block flex-1 max-w-2xl relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(false);
          router.push(searchHref(query.trim(), category));
        }}
        className="flex items-center w-full rounded-xl border-2 border-slate-200 focus-within:border-rose-600 bg-slate-50/70 focus-within:bg-white overflow-hidden transition-all shadow-sm"
      >
        <select
          aria-label="Search Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-transparent text-xs font-semibold text-slate-700 pl-3.5 pr-2 py-2.5 border-r border-slate-200 focus:outline-none cursor-pointer"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          type="search"
          value={query}
          placeholder="Search smartphones, 4K TVs, inverter fridges, air fryers..."
          autoComplete="off"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-transparent focus:outline-none"
        />
        <button
          type="submit"
          className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 font-semibold text-sm flex items-center gap-1.5 transition shrink-0"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
      </form>
      {open && query.trim() && <AutocompleteDropdown query={query} category={category} onPick={() => setOpen(false)} />}
    </div>
  );
}

function MobileSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div ref={wrapRef} className="mt-2.5 md:hidden relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(false);
          router.push(searchHref(query.trim()));
        }}
        className="flex items-center w-full rounded-xl border border-slate-300 focus-within:border-rose-600 bg-slate-50 focus-within:bg-white overflow-hidden"
      >
        <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
        <input
          type="search"
          value={query}
          placeholder="Search products, brands or categories..."
          autoComplete="off"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          className="w-full px-2.5 py-2 text-sm text-slate-900 bg-transparent focus:outline-none"
        />
        <button type="submit" className="bg-rose-600 text-white px-3.5 py-2 text-xs font-semibold shrink-0">
          Go
        </button>
      </form>
      {open && query.trim() && <AutocompleteDropdown query={query} category="all" onPick={() => setOpen(false)} />}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Header + category nav                                                      */
/* -------------------------------------------------------------------------- */
function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { user, wishlist, totals, hydrated } = useStore();
  const pathname = usePathname();
  const cartCount = hydrated ? totals.totalItems : 0;
  const wishCount = hydrated ? wishlist.length : 0;

  const navPill = (href: string, active: boolean) =>
    `px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition ${
      active ? "bg-slate-800 text-white" : "text-slate-200 hover:text-white hover:bg-slate-800"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-3">
        <div className="flex items-center justify-between gap-3 lg:gap-6">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenMenu}
              aria-label="Open Menu"
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 active:scale-95 transition"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex items-center gap-2 group">
              <img
                src={LOGO_SRC}
                alt="BestPrices.lk Official Logo"
                className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>
          </div>

          <DesktopSearch />

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <a
              href="tel:+94112345678"
              className="hidden xl:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-rose-200 transition"
            >
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">24/7 Support</span>
                <span className="text-xs font-bold text-slate-900 tabular-nums">011 234 5678</span>
              </div>
            </a>

            <Link
              href={user ? "/account" : "/auth"}
              className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
            >
              <User className="w-5 h-5 text-slate-700" />
              <div className="hidden sm:block text-left leading-tight">
                <span className="block text-[10px] text-slate-500 font-medium">{user ? user.name.split(" ")[0] : "Sign In"}</span>
                <span className="text-xs font-bold text-slate-900">Account</span>
              </div>
            </Link>

            <Link
              href="/wishlist"
              className="relative flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 hover:border-rose-200 hover:bg-rose-50/40 transition"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-slate-700" />
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                {wishCount}
              </span>
            </Link>

            <Link
              href="/cart"
              className="relative flex items-center gap-2.5 p-2 sm:px-3.5 sm:py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/20 transition"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-slate-950 text-white text-[10px] font-bold flex items-center justify-center tabular-nums border border-white/20">
                  {cartCount}
                </span>
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <span className="block text-[10px] text-rose-100 font-medium">My Cart</span>
                <span className="text-xs font-bold text-white tabular-nums">{formatLKR(hydrated ? totals.subtotal : 0)}</span>
              </div>
            </Link>
          </div>
        </div>

        <MobileSearch />
      </div>

      <nav className="bg-slate-900 text-white border-t border-slate-800">
        <div className="w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 py-1.5 flex-1 min-w-0 overflow-x-auto no-scrollbar">
            <Link
              href="/categories"
              className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-2 shrink-0 mr-2 transition"
            >
              <Grid className="w-4 h-4" />
              <span>All Categories</span>
            </Link>
            <Link href="/" className={navPill("/", pathname === "/")}>
              Home
            </Link>
            <Link
              href="/flash-deals"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-400 hover:bg-slate-800 flex items-center gap-1 shrink-0 transition ${
                pathname === "/flash-deals" ? "bg-slate-800" : ""
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-amber-400" /> Flash Deals
            </Link>
            <Link href="/shop" className={navPill("/shop", pathname === "/shop")}>
              Shop All
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                href={shopHref({ category: c.id })}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 shrink-0 transition"
              >
                {c.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-3 text-xs text-slate-300 shrink-0 pl-4">
            <Link href="/about" className="hover:text-white transition">
              About Us
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */
function Footer() {
  const link = "text-slate-400 hover:text-rose-400 transition";
  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-24 lg:pb-10 border-t border-slate-800 mt-16">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center bg-white px-3.5 py-2 rounded-xl shadow-sm">
              <img src={LOGO_SRC} alt="BestPrices.lk" className="h-9 w-auto object-contain" />
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Sri Lanka&apos;s modern online destination for genuine electronics, smart home appliances, kitchen essentials, and
              personal tech at transparent LKR prices with islandwide delivery.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-rose-500" /> Colombo & Islandwide Dispatch
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Genuine Products
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider mb-4">Departments</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href={shopHref({ category: "mobiles" })} className={link}>Mobiles & Smartphones</Link></li>
              <li><Link href={shopHref({ category: "laptops" })} className={link}>Laptops & Computing</Link></li>
              <li><Link href={shopHref({ category: "tv-audio" })} className={link}>4K Smart TVs & Audio</Link></li>
              <li><Link href={shopHref({ category: "home-appliances" })} className={link}>Refrigerators & Washers</Link></li>
              <li><Link href={shopHref({ category: "kitchen-appliances" })} className={link}>Kitchen Appliances</Link></li>
              <li><Link href={shopHref({ category: "wearables" })} className={link}>Smart Watches & Wearables</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider mb-4">Customer Hub</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/auth" className={link}>Login / Register</Link></li>
              <li><Link href="/account" className={link}>My Account Dashboard</Link></li>
              <li><Link href="/track-order" className={link}>Order Tracking</Link></li>
              <li><Link href="/wishlist" className={link}>Saved Wishlist</Link></li>
              <li><Link href="/cart" className={link}>Shopping Cart</Link></li>
              <li><Link href="/flash-deals" className={link}>Flash Deals Countdown</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider mb-4">Company & Policies</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className={link}>About BestPrices.lk</Link></li>
              <li><Link href="/contact" className={link}>Contact & Showrooms</Link></li>
              <li><Link href="/faq" className={link}>Frequently Asked Questions</Link></li>
              <li><Link href="/delivery" className={link}>Delivery Policy</Link></li>
              <li><Link href="/returns" className={link}>Return & Refund Policy</Link></li>
              <li><Link href="/privacy" className={link}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={link}>Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>
              © 2026 <strong className="text-white">BestPrices.lk</strong>. All Rights Reserved.
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span>
              Designed & Developed by{" "}
              <a href={BUSINESS_SETTINGS.developerUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-rose-400 hover:text-rose-300">
                {BUSINESS_SETTINGS.developer}
              </a>
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["VISA / MasterCard", "Cash on Delivery (LKR)", "Bank Transfer", "KOKO / MintPay Ready"].map((m) => (
              <span key={m} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-medium">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* WhatsApp widget                                                            */
/* -------------------------------------------------------------------------- */
export function whatsappLink(text: string) {
  return `https://wa.me/${BUSINESS_SETTINGS.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

function WhatsAppWidget() {
  const pathname = usePathname();
  const raised = pathname.startsWith("/product/");
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  return (
    <div className={`fixed ${raised ? "bottom-36" : "bottom-20"} lg:bottom-6 right-4 z-40 flex flex-col items-end`}>
      {open && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold">BP</div>
              <div>
                <h4 className="font-bold text-sm leading-tight">BestPrices.lk Concierge</h4>
                <p className="text-[11px] text-emerald-100">Typically replies in under 5 mins</p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="text-white/80 hover:text-white" aria-label="Close">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 bg-slate-50 space-y-3 text-xs">
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-slate-700 shadow-sm">
              Ayubowan! 👋 Need stock confirmation, bulk pricing, or islandwide delivery details? Send us a WhatsApp message.
            </div>
            <input
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type your question (e.g. Fridge stock)..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-emerald-600"
            />
            <a
              href={whatsappLink(msg || "Hello BestPrices.lk! I would like to enquire about a product on your website.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <MessageCircle className="w-4 h-4" /> Start WhatsApp Chat
            </a>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="WhatsApp Support"
        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-full shadow-lg shadow-emerald-600/30 flex items-center gap-2 font-bold text-xs sm:text-sm transition transform hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-500" />
        <span className="hidden sm:inline">WhatsApp Enquiry</span>
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile bottom nav + drawer                                                 */
/* -------------------------------------------------------------------------- */
function MobileBottomNav() {
  const pathname = usePathname();
  const { user, totals, hydrated } = useStore();
  const tab = (active: boolean) =>
    `flex flex-col items-center justify-center gap-1 ${active ? "text-rose-600" : "text-slate-600 hover:text-rose-600"}`;
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(15,23,42,0.06)]">
      <div className="grid grid-cols-5 h-16">
        <Link href="/" className={tab(pathname === "/")}>
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Home</span>
        </Link>
        <Link href="/categories" className={tab(pathname === "/categories")}>
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Categories</span>
        </Link>
        <Link href="/flash-deals" className="flex flex-col items-center justify-center gap-1 text-rose-600">
          <div className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center -mt-3 shadow-md shadow-rose-600/30">
            <Zap className="w-4 h-4 fill-white" />
          </div>
          <span className="text-[10px] font-bold">Deals</span>
        </Link>
        <Link href="/cart" className={`relative ${tab(pathname === "/cart")}`}>
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute top-1.5 right-5 min-w-[16px] h-4 px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
            {hydrated ? totals.totalItems : 0}
          </span>
          <span className="text-[10px] font-semibold">Cart</span>
        </Link>
        <Link href={user ? "/account" : "/auth"} className={tab(pathname === "/account" || pathname === "/auth")}>
          <User className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Account</span>
        </Link>
      </div>
    </nav>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div onClick={onClose} className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50" />}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-80 max-w-[86vw] bg-white z-50 shadow-2xl transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 flex flex-col`}
        aria-hidden={!open}
      >
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <img src={LOGO_SRC} alt="BestPrices.lk" className="h-9 w-auto object-contain" />
          <button type="button" onClick={onClose} aria-label="Close Menu" className="p-2 rounded-lg text-slate-500 hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto flex-1 space-y-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Shop by Category</p>
            <div className="space-y-1">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.id}
                  href={shopHref({ category: c.id })}
                  onClick={onClose}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-between"
                >
                  <span>{c.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-200 pt-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Quick Links</p>
            <div className="grid grid-cols-2 gap-1.5">
              {PAGES_REGISTRY.filter((p) => p.id !== "product" && p.id !== "search").map((p) => (
                <Link
                  key={p.id}
                  href={p.href}
                  onClick={onClose}
                  className="text-left px-2.5 py-2 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-rose-600 hover:text-white text-slate-700 truncate transition"
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-900 text-white text-xs">
          <p className="font-bold">BestPrices.lk Customer Care</p>
          <p className="text-slate-400 mt-0.5">Hotline: {BUSINESS_SETTINGS.hotline}</p>
        </div>
      </aside>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Quick view + toasts                                                        */
/* -------------------------------------------------------------------------- */
function QuickViewModal() {
  const { quickViewId, closeQuickView, addToCart } = useStore();
  const router = useRouter();
  useEffect(() => {
    if (!quickViewId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeQuickView();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [quickViewId, closeQuickView]);
  if (!quickViewId) return null;
  const product = getProductById(quickViewId);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && closeQuickView()}
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-5 sm:p-8 relative">
        <button
          type="button"
          onClick={closeQuickView}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-rose-600 hover:text-white flex items-center justify-center text-slate-600 transition"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="aspect-square rounded-2xl bg-white border border-slate-200 p-6 flex items-center justify-center">
            <img src={product.image} alt={product.name} className="max-h-72 w-auto object-contain" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-rose-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">-{product.discountPct}% OFF</span>
              <span className="text-xs font-semibold text-emerald-600">{product.stockCount} Units Available</span>
            </div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">{product.name}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{product.shortDesc}</p>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-baseline gap-2">
                <span className="font-display font-extrabold text-2xl text-rose-600 tabular-nums">{formatLKR(product.discountPrice)}</span>
                <span className="text-sm text-slate-400 line-through tabular-nums">{formatLKR(product.originalPrice)}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                SKU: {product.sku} • Brand: {product.brand}
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  addToCart(product.id, 1);
                  closeQuickView();
                }}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-5 rounded-xl text-sm flex items-center justify-center gap-2 transition"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
              <button
                type="button"
                onClick={() => {
                  closeQuickView();
                  router.push(`/product/${product.id}`);
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-5 rounded-xl text-sm transition"
              >
                Full Specs & Zoom
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="fixed top-20 right-4 z-[60] space-y-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl text-white text-xs font-semibold shadow-xl border-l-4 ${
            t.type === "success" ? "bg-slate-900 border-rose-500" : "bg-rose-600 border-white"
          } animate-toast-in`}
        >
          {t.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-white shrink-0" />
          )}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Shell                                                                      */
/* -------------------------------------------------------------------------- */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <>
      <AnnouncementBar />
      <Header onOpenMenu={() => setMenuOpen(true)} />
      <main className="min-h-[75vh]">{children}</main>
      <Footer />
      <WhatsAppWidget />
      <MobileBottomNav />
      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <QuickViewModal />
      <Toasts />
    </>
  );
}
