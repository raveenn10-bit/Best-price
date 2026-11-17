# BestPrices.lk — Phase 01 Customer-Facing E-Commerce Storefront

**Developed by Harsh Apex Digital Solutions** (`https://harshapex.com.lk`)

## Overview
Complete, responsive Phase 01 customer-facing e-commerce frontend for **BestPrices.lk**, designed around Sri Lankan appliance and electronics retail benchmarks (`singersl.com`, `buyabans.com`, `daraz.lk`, `tondel.lk`) and the official **BestPrices.lk** red, black, and white brand identity.

## Project Structure
- **`src/app/`** — Next.js 15 App Router pages for all 19 storefront routes (home, shop, search, categories, product details, flash deals, wishlist, cart, checkout, login/register, account, order tracking, about, contact, FAQ and policies).
- **`src/components/`** — `SiteShell` (announcement bar, header with live search, category nav, footer, WhatsApp widget, mobile bottom nav & drawer, quick view, toasts), `ProductCard`, `Catalog` (filters/sort), `ProductDetails`.
- **`src/context/StoreContext.tsx`** — cart, wishlist, demo account, orders, promo code and delivery totals (persisted in `localStorage`).
- **`src/data/storeData.ts`** — Admin-Dashboard-ready data layer (products, categories, banners, brands, reviews, FAQs, districts, business settings).
- **`public/assets/`** — logo, banners and product photography.
- **`public/standalone-preview.html`** — original zero-build design prototype (reference only).

## Development
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Pushing to GitHub (`raveenn10-bit/Best-price.git`)
This repository is pre-initialized with Git and has `https://github.com/raveenn10-bit/Best-price.git` configured as `origin`. To push from your local machine:

```bash
./push-to-github.sh
# or manually:
git push -u origin main
```
