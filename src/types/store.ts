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
  theme?: string;
}

export interface Brand {
  id: string;
  name: string;
  category: string;
  tag: string;
}

export interface PromoBanner {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  category: string;
  image: string;
}

export interface SampleReview {
  id: string;
  tag: string;
  customer: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface CartItem {
  productId: string;
  qty: number;
  variation: string;
}

export interface DemoUser {
  name: string;
  email: string;
  phone?: string;
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
