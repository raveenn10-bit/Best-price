export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  categoryLabel: string;
  brand: string;
  originalPrice: number;
  discountPrice: number;
  discountPct: number;
  stockCount: number;
  soldCount: number;
  rating: number;
  reviewCount: number;
  isFlashDeal: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isTrending: boolean;
  isRecommended: boolean;
  image: string;
  gallery: string[];
  shortDesc: string;
  variations: Record<string, string[]>;
  specs: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  shortDesc: string;
  icon: string;
  image: string;
  subcategories: string[];
}

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  priceCallout: string;
  ctaPrimary: string;
  ctaCategory: string;
  desktopImage: string;
  mobileImage: string;
}

export interface CartItem {
  productId: string;
  qty: number;
  variation: string;
}

export interface DemoOrder {
  id: string;
  date: string;
  customerName: string;
  district: string;
  address: string;
  paymentMethod: string;
  statusStep: number;
  statusLabel: string;
  total: number;
  items: { id: string; name: string; qty: number; price: number }[];
}
