import React from "react";
import { StoreProvider } from "@/context/StoreContext";
import "./globals.css";

export const metadata = {
  title: "BestPrices.lk | Sri Lanka's Premier Electronics & Home Appliances Storefront",
  description: "Phase 01 Frontend E-Commerce Storefront for BestPrices.lk — Developed by Harsh Apex Digital Solutions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-900 antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
