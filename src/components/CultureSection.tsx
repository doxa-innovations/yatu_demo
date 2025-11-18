"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CULTURE_IMAGES = {
    terraces:
        "https://images.pexels.com/photos/33411905/pexels-photo-33411905.jpeg?auto=compress&cs=tinysrgb&w=1600",
    oceanCliff:
        "https://images.pexels.com/photos/34757096/pexels-photo-34757096.jpeg?auto=compress&cs=tinysrgb&w=1600",
    waterfall:
        "https://images.pexels.com/photos/33988923/pexels-photo-33988923.jpeg?auto=compress&cs=tinysrgb&w=1600",
    statue:
        "https://images.pexels.com/photos/31391434/pexels-photo-31391434.jpeg?auto=compress&cs=tinysrgb&w=1600",
};

export default function CultureSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLDivElement | null>(null);
    const gridRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const sectionEl = sectionRef.current;
        if (!sectionEl) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top 80%",
                    end: "bottom 40%",
                    toggleActions: "play none none reverse",
                },
                defaults: { ease: "power3.out" },
            });

            tl.from(headingRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
            }).from(
                gridRef.current?.querySelectorAll("[data-culture-card]") || [],
                {
                    y: 40,
                    opacity: 0,
                    duration: 0.7,
                    stagger: 0.12,
                },
                "-=0.4"
            );
        }, sectionEl);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full px-4 py-20 md:py-24 bg-white"
        >
            <div className="mx-auto w-full max-w-6xl space-y-10">
                {/* Top row: heading + copy + button */}
                <div
                    ref={headingRef}
                    className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between"
                >
                    <h2 className="font-fancy text-3xl leading-tight text-neutral-900 md:text-[2.3rem]">
                        Experience the Local
                        <span className="block">Culture and Sights</span>
                    </h2>

                    <div className="flex flex-col items-start gap-4 md:max-w-sm md:items-end md:text-right">
                        <p className="font-body text-sm text-neutral-600 md:text-[15px]">
                            Discover Bishoftu&apos;s crater lakes, lush landscapes, and
                            cultural landmarks—curated day trips and guided experiences that
                            turn your stay at Yatu into a story worth telling.
                        </p>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-2 text-xs font-body font-semibold uppercase tracking-[0.22em] text-neutral-900 shadow-sm hover:bg-neutral-900 hover:text-white transition-colors"
                        >
                            More Info
                            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-white">
                ↗
              </span>
                        </button>
                    </div>
                </div>

                {/* Image grid */}
                <div
                    ref={gridRef}
                    className="
            grid gap-4
            md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)_minmax(0,1.1fr)]
            md:auto-rows-[minmax(0,180px)]
          "
                >
                    {/* Left tall card */}
                    <div
                        data-culture-card
                        className="relative h-[260px] rounded-[32px] overflow-hidden bg-neutral-200 shadow-md shadow-black/10 md:row-span-2 md:h-full"
                    >
                        <Image
                            src={CULTURE_IMAGES.terraces}
                            alt="Lush green terraces landscape"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Middle top */}
                    <div
                        data-culture-card
                        className="relative h-[180px] rounded-[32px] overflow-hidden bg-neutral-200 shadow-md shadow-black/10"
                    >
                        <Image
                            src={CULTURE_IMAGES.oceanCliff}
                            alt="Dramatic coastal cliffs and sea"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Right tall card */}
                    <div
                        data-culture-card
                        className="relative h-[260px] rounded-[32px] overflow-hidden bg-neutral-200 shadow-md shadow-black/10 md:row-span-2 md:h-full"
                    >
                        <Image
                            src={CULTURE_IMAGES.statue}
                            alt="Cultural statue surrounded by greenery"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Middle bottom (waterfall) */}
                    <div
                        data-culture-card
                        className="relative h-[200px] rounded-[32px] overflow-hidden bg-neutral-200 shadow-md shadow-black/10 md:h-[210px]"
                    >
                        <Image
                            src={CULTURE_IMAGES.waterfall}
                            alt="Waterfall surrounded by lush greenery"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
