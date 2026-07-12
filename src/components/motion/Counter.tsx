"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const played = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 90%",
      once: true,
      onEnter: () => {
        if (played.current) return;
        played.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration,
          ease: "power2.out",
          onUpdate: () => setDisplay(Math.round(obj.val)),
        });
      },
    });

    return () => trigger.kill();
  }, [value, duration]);

  return (
    <span ref={ref} className="font-mono-num">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
