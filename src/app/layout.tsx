import React from "react";
import { StoreProvider } from "@/context/StoreContext";

export const metadata = {
  title: "BestPrices.lk | Sri Lanka's Premier Electronics & Home Appliances Storefront",
  description: "Phase 01 Frontend E-Commerce Storefront for BestPrices.lk — Developed by Harsh Apex Digital Solutions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
