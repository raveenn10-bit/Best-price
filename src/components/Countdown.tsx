"use client";
import React, { useEffect, useState } from "react";

const START_SECONDS = 19 * 3600 + 42 * 60 + 18;

export function useCountdown() {
  const [secs, setSecs] = useState(START_SECONDS);
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return { hrs: pad(Math.floor(secs / 3600)), mins: pad(Math.floor((secs % 3600) / 60)), secs: pad(secs % 60) };
}

export function CountdownBoxes({ size = "md" }: { size?: "md" | "lg" }) {
  const { hrs, mins, secs } = useCountdown();
  const box =
    size === "lg"
      ? "bg-rose-600 text-white px-4 py-2 rounded-xl text-center min-w-[64px]"
      : "bg-rose-600 text-white px-3 py-1.5 rounded-xl text-center min-w-[52px]";
  const num = size === "lg" ? "block font-display font-extrabold text-xl leading-none" : "block font-display font-extrabold text-base leading-none";
  const items: [string, string][] = [
    [hrs, "Hrs"],
    [mins, "Min"],
    [secs, "Sec"],
  ];
  return (
    <div className="flex items-center gap-1.5 tabular-nums">
      {items.map(([v, l], i) => (
        <React.Fragment key={l}>
          {i > 0 && <span className="font-bold text-rose-500">:</span>}
          <div className={box}>
            <span className={num}>{v}</span>
            <span className="text-[9px] uppercase opacity-80">{l}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
