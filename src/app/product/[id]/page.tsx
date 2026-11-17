import React from "react";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/storeData";
import { ProductDetails } from "@/components/ProductDetails";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  return { title: product ? `${product.name} | BestPrices.lk` : "Product Not Found | BestPrices.lk" };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) notFound();
  return <ProductDetails product={product} />;
}
