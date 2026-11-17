import React from "react";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata = { title: "Privacy Policy | BestPrices.lk" };

const BULLETS = [
  "Phase 01 Demo Data Scope: During Phase 01, cart items, wishlists, and demo orders are stored strictly inside your local browser (localStorage) and are never transmitted to an external database.",
  "Future Phase 02 Compliance: Upon backend integration, customer contact and delivery details will be encrypted in transit and used exclusively for order fulfillment and warranty registration.",
  "Payment Security: BestPrices.lk does not store raw credit/debit card numbers; online transactions in Phase 02 will be processed via PCI-DSS compliant Sri Lankan payment gateways."
];

export default function Page() {
  return <PolicyPage title="Privacy Policy" bullets={BULLETS} />;
}
