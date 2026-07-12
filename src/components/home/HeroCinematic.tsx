"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonLink } from "@/components/ui/Button";

export default function HeroCinematic() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(imgRef.current, { scale: 1.15, opacity: 0 }, { scale: 1.02, opacity: 1, duration: 1.6 })
        .fromTo(
          headlineRef.current?.querySelectorAll(".word") ?? [],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.06 },
          "-=1.1"
        )
        .fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
        .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
        .fromTo(scrollHintRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3");

      if (!prefersReduced) {
        gsap.to(imgRef.current, {
          scale: 1.18,
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        gsap.to(headlineRef.current, {
          yPercent: -30,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        gsap.to(scrollHintRef.current, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "15% top",
            scrub: 0.6,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headline = "Membangun Masa Depan Dengan Presisi Rekayasa.";

  return (
    <div ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden bg-ink" id="top">
      <div ref={imgRef} className="absolute inset-0">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero/hero-main.jpg')" }}
          role="img"
          aria-label="Ilustrasi konsep rumah modern hasil rancangan Asia Engineer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
        <div className="absolute inset-0 bg-ink/10" />
      </div>

      <span className="absolute right-5 top-24 z-20 rounded-full border border-white/25 bg-black/30 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm lg:right-10">
        Ilustrasi Konsep
      </span>

      <div className="relative z-10 flex h-full w-full flex-col justify-end pb-20 lg:pb-28">
        <div className="container-wide">
          <div className="max-w-3xl text-center lg:text-left">
            <h1
              ref={headlineRef}
              className="text-balance font-heading text-[42px] font-bold leading-[1.08] text-white sm:text-[56px] lg:text-[72px]"
            >
              {headline.split(" ").map((word, i) => (
                <span key={i} className="word mr-3 inline-block">
                  {word}
                </span>
              ))}
            </h1>
            <p ref={subtitleRef} className="mx-auto mt-6 max-w-xl text-base text-white/75 sm:text-lg lg:mx-0">
              Solusi konstruksi premium untuk proyek residensial, komersial, dan industrial —
              dirancang dan dibangun dengan standar rekayasa yang teruji.
            </p>
            <div ref={ctaRef} className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <ButtonLink href="/portfolio" variant="primary">
                Lihat Portofolio
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Hubungi Insinyur Kami
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/60 lg:left-auto lg:right-10 lg:translate-x-0"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-10 w-px animate-pulse bg-white/50" />
        </div>
      </div>
    </div>
  );
}
