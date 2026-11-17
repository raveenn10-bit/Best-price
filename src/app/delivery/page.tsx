import React from "react";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata = { title: "Delivery Policy | BestPrices.lk" };

const BULLETS = [
  "Colombo & Suburbs Express: 1 to 2 working days (Standard fee Rs. 650, or FREE on orders above Rs. 50,000).",
  "Islandwide Outstation Delivery: 2 to 4 working days across all 25 Sri Lankan districts (Standard fee Rs. 1,250, or FREE on orders above Rs. 50,000).",
  "Open-Box Inspection: Customers may verify external physical condition upon delivery before signing the courier receipt."
];

export default function Page() {
  return <PolicyPage title="Delivery Policy" bullets={BULLETS} />;
}
