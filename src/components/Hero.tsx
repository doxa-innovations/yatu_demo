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
        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            // Intro animation
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
                        ease: "back.out(1.5)",
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

            // Subtle parallax on scroll
            gsap.to(textRef.current, {
                yPercent: -8,
                scrollTrigger: {
                    trigger: root,
                    start: "top top",
                    end: "bottom+=150 top",
                    scrub: true,
                },
            });

            gsap.to(circleRef.current, {
                yPercent: 8,
                scrollTrigger: {
                    trigger: root,
                    start: "top top",
                    end: "bottom+=150 top",
                    scrub: true,
                },
            });

            gsap.to(floatRef.current, {
                yPercent: -15,
                scrollTrigger: {
                    trigger: root,
                    start: "top top",
                    end: "bottom+=200 top",
                    scrub: true,
                },
            });
        }, root);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={rootRef}
            className="relative w-full min-h-[90vh] flex items-center px-4 pt-28 pb-16"
        >
            {/* Background image, full bleed */}
            <div className="absolute inset-0 -z-20">
                <Image
                    src="/yatuhome1.jpg"
                    alt="Yatu Hotel Bishoftu lounge area"
                    fill
                    priority
                    className="object-cover brightness-[0.7]"
                />
                {/* soft vignette + left darkening for text */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10" />
            </div>

            {/* Main content (no inner rectangle) */}
            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 md:flex-row md:items-center md:justify-between">
                {/* LEFT: Headline + single CTA */}
                <div ref={textRef} className="max-w-xl space-y-5 text-left">
                    <p className="text-[11px] tracking-[0.35em] uppercase text-white/80 font-body">
                        Bishoftu · Ethiopia
                    </p>

                    <h1 className="font-fancy text-4xl md:text-5xl lg:text-6xl leading-tight text-white">
                        Book Your
                        <span className="block">Comfort Room Today.</span>
                    </h1>

                    <p className="font-body text-sm md:text-base text-white/85 max-w-md">
                        A lakeside art retreat where handcrafted details, warm lighting, and
                        calm water views meet understated luxury.
                    </p>

                    {/* Single, primary CTA only */}
                    <div className="pt-2">
                        <a
                            href="/booking"
                            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-2.5 text-[11px] font-body font-semibold uppercase tracking-[0.22em] text-white shadow-md shadow-blue-500/30 hover:bg-blue-500 transition-colors"
                        >
                            Book your stay
                        </a>
                    </div>
                </div>

                {/* RIGHT: Circle preview + labels */}
                <div className="relative flex flex-col items-center md:items-end gap-4">
                    {/* Tagline to the right of circle */}
                    <div
                        ref={floatRef}
                        className="max-w-xs text-right text-[12px] font-body text-white/90"
                    >
                        Get ready for an artful escape. Reserve your spot now and step into
                        a lakeside retreat crafted for slow mornings and long evenings.
                    </div>

                    {/* Circle room preview */}
                    <div
                        ref={circleRef}
                        className="relative h-56 w-56 md:h-72 md:w-72 rounded-full overflow-hidden border-[5px] border-white/90 shadow-2xl shadow-black/25 bg-neutral-200"
                    >
                        <Image
                            src="/yatuhome.jpg"
                            alt="Signature room at Yatu Hotel"
                            fill
                            className="object-cover"
                        />

                        {/* inner vignette */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                    </div>

                    {/* Orbiting labels (Enchanting / Unique / Rejuvenate) */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center md:justify-end">
                        <div className="relative h-64 w-64 md:h-80 md:w-80">
                            {/* Enchanting */}
                            <div className="absolute -top-1 right-3 flex items-center gap-2">
                                <span className="text-[11px] font-body text-white">Enchanting</span>
                                <span className="h-2.5 w-2.5 rounded-full bg-white" />
                            </div>
                            {/* Unique */}
                            <div className="absolute top-1/2 right-0 flex -translate-y-1/2 items-center gap-2">
                                <span className="text-[11px] font-body text-white">Unique</span>
                                <span className="h-2.5 w-2.5 rounded-full bg-white" />
                            </div>
                            {/* Rejuvenate */}
                            <div className="absolute bottom-3 right-6 flex items-center gap-2">
                                <span className="text-[11px] font-body text-white">Rejuvenate</span>
                                <span className="h-2.5 w-2.5 rounded-full bg-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
