import React from "react";
import type { Metadata } from "next";
import { StoreProvider } from "@/context/StoreContext";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "BestPrices.lk | Sri Lanka's Premier Electronics & Home Appliances Storefront",
  description:
    "Genuine electronics, smart home appliances and kitchen essentials at transparent LKR prices with islandwide delivery across Sri Lanka.",
  icons: { icon: "/assets/logo/BestPrices-logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-900 antialiased pb-20 lg:pb-0">
        <StoreProvider>
          <SiteShell>{children}</SiteShell>
        </StoreProvider>
      </body>
    </html>
  );
}
