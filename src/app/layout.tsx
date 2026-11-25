import React from "react";
import type { Metadata } from "next";
import { StoreProvider } from "@/context/StoreContext";
import { SiteShell } from "@/components/SiteShell";
import { SmoothScroll } from "@/components/SmoothScroll";
import "@fontsource-variable/inter";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "BestPrices.lk | Sri Lanka's Premier Electronics & Home Appliances Storefront",
  description:
    "Genuine electronics, smart home appliances and kitchen essentials at transparent LKR prices with islandwide delivery across Sri Lanka.",
  icons: { icon: "/assets/logo/BestPrices-logo.webp" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased pb-20 lg:pb-0">
        <StoreProvider>
          <SiteShell>{children}</SiteShell>
          <SmoothScroll />
        </StoreProvider>
      </body>
    </html>
  );
}
