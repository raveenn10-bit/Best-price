export const PAGES_REGISTRY = [
  { id: "home", label: "Home", href: "/" },
  { id: "shop", label: "Shop", href: "/shop" },
  { id: "categories", label: "Categories", href: "/categories" },
  { id: "product", label: "Product Details", href: "/product/bp-prod-01" },
  { id: "flash-deals", label: "Flash Deals", href: "/flash-deals" },
  { id: "search", label: "Search Results", href: "/search" },
  { id: "wishlist", label: "Wishlist", href: "/wishlist" },
  { id: "cart", label: "Shopping Cart", href: "/cart" },
  { id: "checkout", label: "Checkout", href: "/checkout" },
  { id: "auth", label: "Login & Register", href: "/auth" },
  { id: "account", label: "My Account", href: "/account" },
  { id: "track-order", label: "Order Tracking", href: "/track-order" },
  { id: "about", label: "About Us", href: "/about" },
  { id: "contact", label: "Contact Us", href: "/contact" },
  { id: "faq", label: "FAQ", href: "/faq" },
  { id: "privacy", label: "Privacy Policy", href: "/privacy" },
  { id: "terms", label: "Terms & Conditions", href: "/terms" },
  { id: "returns", label: "Return & Refund", href: "/returns" },
  { id: "delivery", label: "Delivery Policy", href: "/delivery" },
];

export function shopHref(opts: { category?: string; brand?: string } = {}) {
  const params = new URLSearchParams();
  if (opts.category && opts.category !== "all") params.set("category", opts.category);
  if (opts.brand && opts.brand !== "all") params.set("brand", opts.brand);
  const qs = params.toString();
  return qs ? `/shop?${qs}` : "/shop";
}

export function searchHref(q: string, category = "all") {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category !== "all") params.set("category", category);
  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
}

export function isActivePath(pathname: string, href: string) {
  const base = href.split("?")[0];
  if (base === "/") return pathname === "/";
  if (base.startsWith("/product/")) return pathname.startsWith("/product/");
  return pathname === base;
}
