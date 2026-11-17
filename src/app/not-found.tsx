import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
      <p className="text-xs font-extrabold uppercase tracking-wider text-rose-600">404</p>
      <h1 className="font-display font-extrabold text-2xl text-slate-900">Page not found</h1>
      <p className="text-sm text-slate-500">The page or product you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm px-6 py-3 rounded-xl">
        Back to Home
      </Link>
    </div>
  );
}
