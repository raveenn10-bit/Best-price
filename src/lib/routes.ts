export const PAGES_REGISTRY = [
  { id: "home", label: "1. Home", href: "/" },
  { id: "shop", label: "2. Shop", href: "/shop" },
  { id: "categories", label: "3. Categories", href: "/categories" },
  { id: "product", label: "4. Product Details", href: "/product/bp-prod-01" },
  { id: "flash-deals", label: "5. Flash Deals", href: "/flash-deals" },
  { id: "search", label: "6. Search Results", href: "/search" },
  { id: "wishlist", label: "7. Wishlist", href: "/wishlist" },
  { id: "cart", label: "8. Shopping Cart", href: "/cart" },
  { id: "checkout", label: "9. Checkout", href: "/checkout" },
  { id: "auth", label: "10. Login & Register", href: "/auth" },
  { id: "account", label: "11. My Account", href: "/account" },
  { id: "track-order", label: "12. Order Tracking", href: "/track-order" },
  { id: "about", label: "13. About Us", href: "/about" },
  { id: "contact", label: "14. Contact Us", href: "/contact" },
  { id: "faq", label: "15. FAQ", href: "/faq" },
  { id: "privacy", label: "16. Privacy Policy", href: "/privacy" },
  { id: "terms", label: "17. Terms & Conditions", href: "/terms" },
  { id: "returns", label: "18. Return & Refund", href: "/returns" },
  { id: "delivery", label: "19. Delivery Policy", href: "/delivery" },
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
