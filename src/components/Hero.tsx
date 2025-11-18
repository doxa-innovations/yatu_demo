"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);
    const circleRef = useRef<HTMLDivElement | null>(null);
    const floatRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!rootRef.current) return;

        const ctx = gsap.context(() => {
            // Initial entrance timeline
            const tl = gsap.timeline({
                defaults: { ease: "power3.out", duration: 1 },
            });

            tl.from(textRef.current, {
                y: 40,
                opacity: 0,
            })
                .from(
                    circleRef.current,
                    {
                        scale: 0,
                        opacity: 0,
                        ease: "back.out(1.6)",
                    },
                    "-=0.5"
                )
                .from(
                    floatRef.current,
                    {
                        y: 20,
                        opacity: 0,
                    },
                    "-=0.6"
                );

            // Scroll-based subtle parallax & movement
            if (!rootRef.current) return;

            // Text moves slightly up as you scroll
            gsap.to(textRef.current, {
                yPercent: -10,
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top top",
                    end: "bottom+=150 top",
                    scrub: true,
                },
            });

            // Circle image gently drifts down
            gsap.to(circleRef.current, {
                yPercent: 10,
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top top",
                    end: "bottom+=150 top",
                    scrub: true,
                },
            });

            // Floating badge drifts up and rotates slightly
            gsap.to(floatRef.current, {
                yPercent: -25,
                rotation: -5,
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top top",
                    end: "bottom+=200 top",
                    scrub: true,
                },
            });
        }, rootRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={rootRef}
            className="relative w-full min-h-[90vh] flex items-center justify-center px-4 pb-16 pt-32"
        >
            {/* Background image */}
            <div className="absolute inset-0 -z-20">
                <Image
                    src="/yatuhome1.jpg" // change to your actual hero image
                    alt="Yatu Hotel Bishoftu lakeside view"
                    fill
                    priority
                    className="object-cover brightness-[0.6]"
                />
                {/* soft blue overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-blue-900/20 to-white/0" />
            </div>

            {/* Glass container */}
            <div className="relative z-10 w-full max-w-6xl rounded-[32px] border border-white/60 bg-white/40 backdrop-blur-2xl shadow-xl shadow-black/15 px-6 py-8 md:px-10 md:py-12">
                <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
                    {/* LEFT: Text */}
                    <div ref={textRef} className="max-w-xl space-y-5">
                        <p className="text-[11px] tracking-[0.35em] uppercase text-white font-body">
                            Bishoftu · Ethiopia
                        </p>

                        <h1 className="font-fancy text-4xl md:text-5xl lg:text-6xl leading-tight text-white">
                            Where Art Meets
                            <span className="block text-blue-600">
               Luxury
              </span>
                        </h1>

                        <p className="font-body text-sm md:text-base text-white">
                            Yatu Hotel blends Ethiopian craftsmanship, curated interiors, and
                            serene lake views to give you a calm, luxurious escape just an
                            hour from Addis.
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 pt-2">
                            <a
                                href="/booking"
                                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-7 py-2.5 text-[11px] font-body font-semibold uppercase tracking-[0.22em] text-white shadow-md shadow-blue-500/30 hover:bg-blue-500 transition-colors"
                            >
                                Book your stay
                            </a>

                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full border border-blue-200/80 bg-white/60 px-6 py-2.5 text-[11px] font-body font-semibold uppercase tracking-[0.22em] text-blue-700 hover:bg-blue-50/80 transition-colors"
                            >
                                Explore suites
                            </button>
                        </div>

                        {/* Small descriptor line */}
                        <div className="pt-3 flex flex-wrap gap-3 text-[11px] font-body text-neutral-500">
              <span className="inline-flex items-center gap-2">
                <span className="h-1 w-6 rounded-full bg-blue-500" />
                Crafted interiors
              </span>
                            <span className="inline-flex items-center gap-2">
                <span className="h-1 w-6 rounded-full bg-blue-300" />
                Lakeside dining
              </span>
                            <span className="inline-flex items-center gap-2">
                <span className="h-1 w-6 rounded-full bg-blue-200" />
                Art & decor from local makers
              </span>
                        </div>
                    </div>

                    {/* RIGHT: Room circle preview + floating badge */}
                    <div className="relative flex flex-col items-center justify-center md:items-end">
                        {/* Soft floating badge */}
                        <div
                            ref={floatRef}
                            className="absolute -top-6 left-4 md:-top-10 md:-left-8 rounded-2xl border border-white/70 bg-white/80 backdrop-blur-xl px-4 py-2 shadow-md shadow-black/10"
                        >
                            <p className="text-[10px] font-body uppercase tracking-[0.22em] text-neutral-500">
                                Signature Lake Suite
                            </p>
                            <p className="mt-1 text-xs font-body text-neutral-900">
                                Handcrafted decor & lakeview balcony.
                            </p>
                        </div>

                        {/* Circle room preview */}
                        <div
                            ref={circleRef}
                            className="relative h-52 w-52 md:h-72 md:w-72 rounded-full overflow-hidden border-[6px] border-white shadow-2xl shadow-black/20 bg-neutral-200"
                        >
                            <Image
                                src="/yatuhome.jpg" // update to your actual path
                                alt="Signature room at Yatu Hotel"
                                fill
                                className="object-cover"
                            />

                            {/* inner soft vignette */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />

                            {/* bottom label inside circle */}
                            <div className="absolute inset-x-0 bottom-4 flex justify-center">
                                <div className="rounded-full bg-black/55 px-4 py-1.5 backdrop-blur-md">
                                    <p className="text-[10px] font-body uppercase tracking-[0.22em] text-white/80">
                                        Lakefront · King Bed · Artisan details
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Helper label under circle */}
                        <p className="mt-4 text-[11px] font-body text-neutral-600 text-center md:text-right">
                            Scroll to discover experiences, dining, and art at Yatu Hotel.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
