import React from "react";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata = { title: "Privacy Policy | BestPrices.lk" };

const BULLETS = [
  "Your Data: Cart items, wishlists and account details are stored on your own device and used only to process your orders.",
  "Order Information: Customer contact and delivery details are used exclusively for order fulfillment, delivery and warranty registration.",
  "Payment Security: BestPrices.lk does not store raw credit/debit card numbers; online transactions are processed via PCI-DSS compliant Sri Lankan payment gateways."
];

export default function Page() {
  return <PolicyPage title="Privacy Policy" bullets={BULLETS} />;
}
