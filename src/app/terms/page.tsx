import React from "react";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata = { title: "Terms & Conditions | BestPrices.lk" };

const BULLETS = [
  "All product prices on BestPrices.lk are displayed in Sri Lankan Rupees (LKR) inclusive of applicable taxes unless stated otherwise.",
  "Flash Deal quantities are subject to stock availability; demo stock meters illustrate real-time inventory reservation behavior.",
  "Storefront UI, layout, and custom frontend architecture are developed by Harsh Apex Digital Solutions for BestPrices.lk."
];

export default function Page() {
  return <PolicyPage title="Terms & Conditions" bullets={BULLETS} />;
}
