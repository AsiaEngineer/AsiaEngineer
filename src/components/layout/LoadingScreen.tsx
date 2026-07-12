"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDone(true);
      setHidden(true);
      return;
    }

    let raf: number;
    const start = performance.now();
    const duration = 1400;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
        setTimeout(() => setHidden(true), 500);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        done ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <p className="font-heading text-2xl font-bold tracking-tight text-white">Asia Engineer</p>
      <div className="mt-8 h-[2px] w-48 overflow-hidden bg-white/15">
        <div
          className="h-full bg-accent transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 font-mono-num text-xs text-white/50">{progress}%</p>
    </div>
  );
}
