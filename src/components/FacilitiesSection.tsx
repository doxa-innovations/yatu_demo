"use client";

import { useEffect, useRef, MouseEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FACILITIES = [
    { id: "mini-bar", name: "Mini Bar", image: "/view1.jpg" },
    { id: "workspace", name: "Workspace", image: "/view2.jpg" },
    { id: "jacuzzi", name: "Jacuzzi Bathroom", image: "/room3.jpeg" },
    { id: "library", name: "Library Room", image: "/view1.jpg" },
    { id: "restaurant", name: "Restaurant", image: "/view2.jpg" },
];

// Diagonal “fan” layout config
const CARD_LAYOUT = [
    { rotate: -14, y: 24, z: 4 },
    { rotate: -7, y: 12, z: 6 },
    { rotate: 0, y: 0, z: 8 },
    { rotate: 7, y: 12, z: 6 },
    { rotate: 14, y: 24, z: 4 },
];

export default function FacilitiesSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLDivElement | null>(null);
    const cardsRowRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const sectionEl = sectionRef.current;
        if (!sectionEl) return;

        const ctx = gsap.context(() => {
            // Apply base diagonal layout
            cardRefs.current.forEach((card, index) => {
                if (!card) return;
                const layout = CARD_LAYOUT[index];
                gsap.set(card, {
                    rotate: layout.rotate,
                    y: layout.y,
                    zIndex: layout.z,
                });
            });

            // Scroll reveal
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top 75%",
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
                sectionEl.querySelectorAll("[data-facility-card]"),
                {
                    y: 40,
                    opacity: 0,
                    duration: 0.7,
                    stagger: 0.12,
                },
                "-=0.45"
            );

            // Subtle parallax on scroll
            gsap.to(cardRefs.current, {
                y: (index) => CARD_LAYOUT[index].y - 10,
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
                ease: "none",
            });
        }, sectionEl);

        return () => ctx.revert();
    }, []);

    // Hover: lift, straighten, bring to front
    const handleHoverIn = (e: MouseEvent<HTMLButtonElement>) => {
        const el = e.currentTarget;
        const index = Number(el.dataset.index);
        const layout = CARD_LAYOUT[index];

        gsap.set(el, { zIndex: 20 });

        gsap.to(el, {
            scale: 1.08,
            y: layout.y - 24,
            rotate: 0,
            rotateY: 6,
            duration: 0.4,
            ease: "power3.out",
        });
    };

    // Hover out: return to diagonal layout
    const handleHoverOut = (e: MouseEvent<HTMLButtonElement>) => {
        const el = e.currentTarget;
        const index = Number(el.dataset.index);
        const layout = CARD_LAYOUT[index];

        gsap.to(el, {
            scale: 1,
            y: layout.y,
            rotateY: 0,
            rotate: layout.rotate,
            zIndex: layout.z,
            duration: 0.45,
            ease: "power3.out",
        });
    };

    return (
        <section
            ref={sectionRef}
            className="w-full px-4 py-20 md:py-24 bg-gradient-to-b from-white via-white to-blue-300"
        >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
                {/* Top copy row */}
                <div
                    ref={headingRef}
                    className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
                >
                    <p className="max-w-md font-body text-sm text-neutral-600 md:text-[15px]">
                        Experience curated spaces that make every moment at Yatu feel
                        considered—from quiet reading corners and work-ready desks to intimate bars and
                        warm, plant-filled lounges.
                    </p>

                    <h2 className="font-fancy text-3xl leading-snug text-neutral-900 md:text-[2.3rem] md:text-right">
                        Premier Facilities and
                        <span className="block text-blue-800">Guest Services</span>
                    </h2>
                </div>

                {/* Cards row */}
                <div
                    ref={cardsRowRef}
                    className="flex gap-4 overflow-x-auto pb-4 md:justify-center md:overflow-visible"
                >
                    {FACILITIES.map((facility, index) => (
                        <button
                            key={facility.id}
                            type="button"
                            data-facility-card
                            data-index={index}
                            ref={(el) => {
                                cardRefs.current[index] = el;
                            }}
                            onMouseEnter={handleHoverIn}
                            onMouseLeave={handleHoverOut}
                            className="
                relative flex h-[280px] min-w-[160px] max-w-[190px]
                cursor-pointer overflow-hidden rounded-[32px]
                bg-neutral-200 shadow-md shadow-black/10
                transition-[box-shadow] duration-200
                hover:shadow-xl hover:shadow-black/20
              "
                        >
                            <Image
                                src={facility.image}
                                alt={facility.name}
                                fill
                                className="object-cover"
                            />

                            {/* subtle overlay */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/0" />

                            {/* label */}
                            <div className="absolute inset-x-0 bottom-5 px-4">
                                <p className="font-body text-[13px] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)]">
                                    {facility.name}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>


                <div className="flex justify-center pt-4">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-2 text-xs font-body font-semibold uppercase tracking-[0.22em] text-neutral-800 shadow-sm hover:bg-neutral-900 hover:text-white transition-colors"
                    >
                        See All
                    </button>
                </div>
            </div>
        </section>
    );
}
