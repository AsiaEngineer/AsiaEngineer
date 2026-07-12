"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealProps = {
  children: ReactNode;
  as?: "div" | "span";
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
  scale?: boolean;
};

export default function Reveal({
  children,
  as = "div",
  className = "",
  y = 32,
  delay = 0,
  duration = 0.9,
  stagger,
  scale = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = stagger ? Array.from(ref.current.children) : ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: prefersReduced ? 0 : y,
          scale: scale && !prefersReduced ? 0.96 : 1,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: prefersReduced ? 0.01 : duration,
          delay,
          ease: "power3.out",
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [y, delay, duration, stagger, scale]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
