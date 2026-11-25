import React from "react";
import type { Metadata } from "next";
import { StoreProvider } from "@/context/StoreContext";
import { SiteShell } from "@/components/SiteShell";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
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
    <html lang="en" className="pl-lock" suppressHydrationWarning>
      <head>
        {/* Skip the preloader after the first page view in this session, before anything paints */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('bp_preloaded')){var d=document.documentElement;d.classList.add('pl-skip');d.classList.remove('pl-lock')}}catch(e){}",
          }}
        />
        <link rel="preload" href="/videos/preloader.mp4" as="video" type="video/mp4" />
      </head>
      <body className="bg-white text-slate-900 antialiased pb-20 lg:pb-0">
        <Preloader />
        <StoreProvider>
          <SiteShell>{children}</SiteShell>
          <SmoothScroll />
        </StoreProvider>
      </body>
    </html>
  );
}
