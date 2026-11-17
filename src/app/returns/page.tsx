import React from "react";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata = { title: "Return & Refund Policy | BestPrices.lk" };

const BULLETS = [
  "7-Day Return Window: Eligible unopened or manufacturing-defective items may be returned within 7 calendar days of delivery with original packaging and invoice.",
  "Inspection & Replacement: Appliances and electronics undergo technical verification prior to replacement or LKR refund issuance.",
  "Non-Returnable Items: Opened personal care items, software codes, and physical damage caused by power surges are excluded."
];

export default function Page() {
  return <PolicyPage title="Return & Refund Policy" bullets={BULLETS} />;
}
