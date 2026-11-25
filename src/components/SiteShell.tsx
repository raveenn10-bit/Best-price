"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUp,
  Banknote,
  CheckCircle2,
  Mail,
  ChevronRight,
  Flame,
  Grid,
  Heart,
  HelpCircle,
  Home,
  Info,
  MapPin,
  Menu,
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
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

/* -------------------------------------------------------------------------- */
/* Promo bar (scrolling trust messages)                                       */
/* -------------------------------------------------------------------------- */
const PROMO_MESSAGES = [
  { icon: ShieldCheck, text: "100% Genuine Products" },
  { icon: Zap, text: "Daily Tech Deals — Up to 44% OFF" },
  { icon: Truck, text: "Islandwide Delivery Across Sri Lanka" },
  { icon: Banknote, text: "Cash on Delivery Available" },
  { icon: Flame, text: "Use Code BEST10 for 10% Extra Discount" },
];

function AnnouncementBar() {
  const items = [...PROMO_MESSAGES, ...PROMO_MESSAGES];
  return (
    <section className="bg-[#09080B] text-white text-[13px] sm:text-sm font-medium h-10 sm:h-[50px] flex items-center overflow-hidden" aria-label="Store highlights">
      <div className="animate-marquee gap-10 sm:gap-14 pl-6">
        {items.map(({ icon: Icon, text }, i) => (
          <span key={i} className="inline-flex items-center gap-2 shrink-0 whitespace-nowrap">
            <Icon className="w-4 h-4 text-deal" />
            {text}
          </span>
        ))}
      </div>
    </section>
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
              className="w-full p-3 hover:bg-primary-50/50 flex items-center justify-between gap-3 text-left transition"
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
                <span className="block text-xs font-extrabold text-primary-600 tabular-nums">{formatLKR(p.discountPrice)}</span>
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
            className="w-full py-2.5 px-4 bg-slate-900 text-white text-xs font-bold text-center hover:bg-primary-600 transition"
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
    <div ref={wrapRef} className="hidden md:block flex-1 max-w-[620px] relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(false);
          router.push(searchHref(query.trim()));
        }}
        className="flex items-center h-11 rounded-full bg-[#F3F5F8] border border-transparent focus-within:border-primary-300 focus-within:bg-white transition"
      >
        <input
          type="search"
          value={query}
          placeholder="What are you looking for?"
          autoComplete="off"
          aria-label="Search products"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="flex-1 min-w-0 h-full pl-5 pr-3 text-sm text-ink bg-transparent focus:outline-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          aria-label="Search"
          className="w-9 h-9 mr-1 rounded-full bg-primary-100/70 hover:bg-primary-600 hover:text-white text-ink flex items-center justify-center transition"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>
      {open && query.trim() && <AutocompleteDropdown query={query} category="all" onPick={() => setOpen(false)} />}
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
    <div ref={wrapRef} className="md:hidden relative px-4 pb-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(false);
          router.push(searchHref(query.trim()));
        }}
        className="flex items-center h-11 rounded-full bg-[#F3F5F8] border border-transparent focus-within:border-primary-300 focus-within:bg-white"
      >
        <input
          type="search"
          value={query}
          placeholder="What are you looking for?"
          autoComplete="off"
          aria-label="Search products"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          className="flex-1 min-w-0 h-full pl-5 pr-2 text-sm text-ink bg-transparent focus:outline-none"
        />
        <button type="submit" aria-label="Search" className="w-9 h-9 mr-1 rounded-full bg-primary-100/70 text-ink flex items-center justify-center">
          <Search className="w-4 h-4" />
        </button>
      </form>
      {open && query.trim() && <AutocompleteDropdown query={query} category="all" onPick={() => setOpen(false)} />}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Header + navy category nav                                                 */
/* -------------------------------------------------------------------------- */
const QUICK_NAV = [
  { label: "Mobile Phones", href: shopHref({ category: "mobiles" }) },
  { label: "Laptops", href: shopHref({ category: "laptops" }) },
  { label: "TV & Audio", href: shopHref({ category: "tv-audio" }) },
  { label: "Home Appliances", href: shopHref({ category: "home-appliances" }) },
  { label: "Kitchen", href: shopHref({ category: "kitchen-appliances" }) },
  { label: "Smart Watches", href: shopHref({ category: "wearables" }) },
];

function Header({ onOpenMenu, onOpenCategories }: { onOpenMenu: () => void; onOpenCategories: () => void }) {
  const { user, wishlist, totals, hydrated } = useStore();
  const pathname = usePathname();
  const cartCount = hydrated ? totals.totalItems : 0;
  const wishCount = hydrated ? wishlist.length : 0;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_1px_5px_rgba(0,0,0,0.07)]">
      <div className="w-full px-4 sm:px-6 lg:px-10 h-[68px] sm:h-[82px] flex items-center justify-between gap-4 lg:gap-8">
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open menu"
            className="lg:hidden w-10 h-10 -ml-2 rounded-full text-ink hover:bg-slate-100 flex items-center justify-center"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" aria-label="BestPrices.lk home" className="flex items-center">
            <img src={LOGO_SRC} alt="BestPrices.lk" className="h-9 sm:h-11 w-auto object-contain" />
          </Link>
        </div>

        <DesktopSearch />

        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          <Link
            href={user ? "/account" : "/auth"}
            className="flex items-center gap-2.5 px-2 sm:px-3 h-10 rounded-full hover:bg-slate-50 transition"
          >
            <User className="w-6 h-6 text-ink" />
            <span className="hidden lg:block leading-tight text-left">
              <span className="block text-xs text-slate-500">{user ? `Hello, ${user.name.split(" ")[0]}` : "Hello, sign in"}</span>
              <span className="block text-sm font-bold text-ink">My account</span>
            </span>
          </Link>

          <Link
            href="/wishlist"
            aria-label={`Wishlist (${wishCount})`}
            className="relative w-10 h-10 rounded-full border-[2.4px] border-primary-600 text-[#333] flex items-center justify-center hover:bg-primary-50 transition"
          >
            <Heart className="w-[18px] h-[18px]" />
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
              {wishCount}
            </span>
          </Link>

          <Link href="/cart" aria-label={`Cart (${cartCount} items)`} className="flex items-center gap-2.5 pl-2 sm:pl-3 h-10">
            <span className="relative">
              <ShoppingBag className="w-7 h-7 text-ink" />
              <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-price text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            </span>
            <span className="hidden sm:block leading-tight">
              <span className="block text-xs text-slate-500">Cart</span>
              <span className="block text-sm font-bold text-ink tabular-nums">LKR {(hydrated ? totals.subtotal : 0).toLocaleString("en-LK")}</span>
            </span>
          </Link>
        </div>
      </div>

      <MobileSearch />

      <nav className="bg-navy text-white" aria-label="Main">
        <div className="w-full px-4 sm:px-6 lg:px-10 h-12 flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCategories}
            className="flex items-center gap-2 pr-4 mr-1 h-full text-sm sm:text-[15px] font-semibold shrink-0 border-r border-white/15 hover:text-deal transition"
          >
            <Menu className="w-5 h-5" /> All Categories
          </button>
          <div className="flex-1 min-w-0 flex items-center gap-1 overflow-x-auto no-scrollbar">
            <Link
              href="/flash-deals"
              className={`px-3 py-1.5 rounded-full text-sm font-semibold shrink-0 flex items-center gap-1 text-deal hover:bg-white/10 transition ${
                pathname === "/flash-deals" ? "bg-white/10" : ""
              }`}
            >
              <Zap className="w-4 h-4 fill-deal" /> Deals
            </Link>
            <Link href="/shop" className="px-3 py-1.5 rounded-full text-sm font-medium shrink-0 hover:bg-white/10 transition">
              Shop
            </Link>
            {QUICK_NAV.map((l) => (
              <Link key={l.label} href={l.href} className="px-3 py-1.5 rounded-full text-sm font-medium text-white/90 shrink-0 hover:bg-white/10 hover:text-white transition">
                {l.label}
              </Link>
            ))}
          </div>
          <a href="tel:+94112345678" className="hidden lg:flex items-center gap-2 text-sm font-semibold shrink-0 hover:text-deal transition">
            <PhoneCall className="w-4 h-4" /> {BUSINESS_SETTINGS.hotline}
          </a>
        </div>
      </nav>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* All-categories drawer (mega menu)                                          */
/* -------------------------------------------------------------------------- */
function CategoryDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [active, setActive] = useState(CATEGORIES[0].id);
  const cat = CATEGORIES.find((c) => c.id === active) || CATEGORIES[0];
  const items = PRODUCTS.filter((p) => p.category === cat.id);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-full max-w-[880px] bg-white shadow-2xl flex flex-col">
        <div className="bg-navy text-white h-14 px-5 flex items-center justify-between shrink-0">
          <span className="font-bold text-base">All Categories</span>
          <button type="button" onClick={onClose} aria-label="Close categories" className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 min-h-0 flex flex-col sm:flex-row">
          <div className="sm:w-60 shrink-0 border-b sm:border-b-0 sm:border-r border-slate-200 p-3 flex sm:flex-col gap-1 overflow-x-auto sm:overflow-y-auto no-scrollbar">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onMouseEnter={() => setActive(c.id)}
                onClick={() => setActive(c.id)}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-semibold shrink-0 transition ${
                  active === c.id ? "bg-primary-50 text-primary-600" : "text-[#30343B] hover:bg-slate-50"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-ink">{cat.name}</h2>
              <Link href={shopHref({ category: cat.id })} onClick={onClose} className="text-sm font-semibold text-primary-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {cat.subcategories.map((s) => (
                <Link
                  key={s}
                  href={shopHref({ category: cat.id })}
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-full border border-[#DEDEDE] text-sm font-medium text-[#171717] hover:border-primary-600 hover:text-primary-600 transition"
                >
                  {s}
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {items.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-primary-300 transition"
                >
                  <img src={p.image} alt="" className="w-14 h-14 object-contain shrink-0" />
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-ink line-clamp-2">{p.name}</span>
                    <span className="block text-xs font-bold text-price mt-0.5 tabular-nums">LKR {p.discountPrice.toLocaleString("en-LK")}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */
function Footer() {
  const link = "text-[#A1A1AA] hover:text-white transition";
  return (
    <footer className="bg-[#09090B] text-[#A1A1AA] pt-14 pb-24 lg:pb-10">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-12 border-b border-white/10">
          <div className="space-y-5">
            <div className="inline-flex items-center bg-white px-3.5 py-2 rounded-xl">
              <img src={LOGO_SRC} alt="BestPrices.lk" className="h-9 w-auto object-contain" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">Inquiries? Call Us!</p>
              <a href="tel:+94112345678" className="block text-2xl font-extrabold text-white mt-1 hover:text-primary-400 tabular-nums">
                {BUSINESS_SETTINGS.hotline}
              </a>
            </div>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-400 shrink-0" /> {BUSINESS_SETTINGS.headOffice}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <a href={`mailto:${BUSINESS_SETTINGS.supportEmail}`} className={link}>
                  {BUSINESS_SETTINGS.supportEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href={whatsappLink("Hello BestPrices.lk!")} target="_blank" rel="noopener noreferrer" className={link}>
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-4">Let Us Help You</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/account" className={link}>My Account</Link></li>
              <li><Link href="/track-order" className={link}>Order Tracking</Link></li>
              <li><Link href="/faq" className={link}>FAQs</Link></li>
              <li><Link href="/delivery" className={link}>Delivery Policy</Link></li>
              <li><Link href="/returns" className={link}>Return & Refund</Link></li>
              <li><Link href="/privacy" className={link}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={link}>Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-4">Get to Know Us</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className={link}>About Us</Link></li>
              <li><Link href="/flash-deals" className={link}>All Deals</Link></li>
              <li><Link href="/shop" className={link}>Shop All Products</Link></li>
              <li><Link href="/categories" className={link}>All Categories</Link></li>
              <li><Link href="/wishlist" className={link}>Wishlist</Link></li>
              <li><Link href="/contact" className={link}>Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-4">Shop by Department</h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link href={shopHref({ category: c.id })} className={link}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
          <span className="text-center lg:text-left">
            © {new Date().getFullYear()} <strong className="text-white">BestPrices.lk</strong>. All Rights Reserved. • Designed & Developed by{" "}
            <a href={BUSINESS_SETTINGS.developerUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-primary-400">
              {BUSINESS_SETTINGS.developer}
            </a>
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["Cash on Delivery", "Bank Transfer", "Islandwide Delivery"].map((m) => (
              <span key={m} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-white/80 font-semibold">
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
    <div className={`fixed ${raised ? "bottom-36" : "bottom-20"} lg:bottom-6 left-3 sm:left-5 z-40 flex flex-col items-start`}>
      {open && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"><WhatsAppIcon className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-sm leading-tight">BestPrices.lk Concierge</h4>
                <p className="text-[11px] text-white/85">Typically replies in under 5 mins</p>
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
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#25D366]"
            />
            <a
              href={whatsappLink(msg || "Hello BestPrices.lk! I would like to enquire about a product on your website.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="w-full bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <WhatsAppIcon className="w-4 h-4" /> Start WhatsApp Chat
            </a>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat with us on WhatsApp"
        className="group relative w-[72px] h-[72px] rounded-full bg-[#25D366]/15 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-wa-pulse" />
        <span className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/40 group-hover:bg-[#1ebe5b] transition-colors">
          <WhatsAppIcon className="w-8 h-8" />
        </span>
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
    `flex flex-col items-center justify-center gap-1 ${active ? "text-primary-600" : "text-slate-600 hover:text-primary-600"}`;
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
        <Link href="/flash-deals" className="flex flex-col items-center justify-center gap-1 text-primary-600">
          <div className="w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center -mt-3 shadow-md shadow-primary-600/30">
            <Zap className="w-4 h-4 fill-white" />
          </div>
          <span className="text-[10px] font-bold">Deals</span>
        </Link>
        <Link href="/cart" className={`relative ${tab(pathname === "/cart")}`}>
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute top-1.5 right-5 min-w-[16px] h-4 px-1 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
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
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-primary-50 hover:text-primary-600 flex items-center justify-between"
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
                  className="text-left px-2.5 py-2 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-primary-600 hover:text-white text-slate-700 truncate transition"
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
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-primary-600 hover:text-white flex items-center justify-center text-slate-600 transition"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="aspect-square rounded-2xl bg-white border border-slate-200 p-6 flex items-center justify-center">
            <img src={product.image} alt={product.name} className="max-h-72 w-auto object-contain" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-primary-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">-{product.discountPct}% OFF</span>
              <span className="text-xs font-semibold text-emerald-600">{product.stockCount} Units Available</span>
            </div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">{product.name}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{product.shortDesc}</p>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-baseline gap-2">
                <span className="font-display font-extrabold text-2xl text-price tabular-nums">{formatLKR(product.discountPrice)}</span>
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
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-5 rounded-xl text-sm flex items-center justify-center gap-2 transition"
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
            t.type === "success" ? "bg-slate-900 border-primary-500" : "bg-primary-600 border-white"
          } animate-toast-in`}
        >
          {t.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0" />
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
function BackToTop() {
  const pathname = usePathname();
  const raised = pathname.startsWith("/product/");
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed ${raised ? "bottom-36" : "bottom-24"} lg:bottom-8 right-4 sm:right-6 z-40 w-[52px] h-[52px] rounded-full bg-primary-700 hover:bg-primary-800 text-white border border-white/50 shadow-lg flex items-center justify-center transition`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
    setCatsOpen(false);
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <>
      <AnnouncementBar />
      <Header onOpenMenu={() => setMenuOpen(true)} onOpenCategories={() => setCatsOpen(true)} />
      <main className="min-h-[75vh]">{children}</main>
      <Footer />
      <WhatsAppWidget />
      <BackToTop />
      <CategoryDrawer open={catsOpen} onClose={() => setCatsOpen(false)} />
      <MobileBottomNav />
      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <QuickViewModal />
      <Toasts />
    </>
  );
}
