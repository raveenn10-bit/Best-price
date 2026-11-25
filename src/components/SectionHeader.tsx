import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeader({
  eyebrow,
  title,
  linkHref,
  linkLabel,
  children,
}: {
  eyebrow: string;
  title: string;
  linkHref?: string;
  linkLabel?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
      <div>
        <span className="text-xs font-extrabold uppercase tracking-wider text-primary-600">{eyebrow}</span>
        <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 mt-0.5">{title}</h2>
      </div>
      {children}
      {linkHref && linkLabel && (
        <Link href={linkHref} className="text-xs sm:text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1 shrink-0">
          {linkLabel} <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
