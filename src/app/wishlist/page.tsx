"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { getProductById } from "@/data/storeData";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";

export default function WishlistPage() {
  const router = useRouter();
  const { wishlist, addToCart, hydrated } = useStore();
  const items = hydrated ? wishlist.map(getProductById) : [];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">Saved Wishlist ({items.length})</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Your saved products on this device.</p>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={() => {
              items.forEach((p) => addToCart(p.id, 1));
              router.push("/cart");
            }}
            className="bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition"
          >
            Move All to Cart
          </button>
        )}
      </div>

      {!hydrated ? null : items.length === 0 ? (
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <Heart className="w-10 h-10 text-primary-500 mx-auto" />
          <h3 className="font-display font-bold text-lg">Your Wishlist is Empty</h3>
          <p className="text-xs sm:text-sm text-slate-500">Tap the heart icon on any product card to save items for comparison.</p>
          <Link href="/shop" className="inline-block bg-slate-950 text-white text-xs font-bold px-5 py-2.5 rounded-xl">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
