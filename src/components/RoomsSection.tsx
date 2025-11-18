"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROOMS = [
    {
        id: "deluxe",
        name: "Deluxe Room",
        image: "/room1.jpeg",
    },
    {
        id: "superior",
        name: "Superior Room",
        image: "/room2.jpeg",
    },
    {
        id: "executive",
        name: "Executive Room",
        image: "/room3.jpeg",
    },
];

export default function RoomsSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    const sectionRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);
    const calendarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // main scroll reveal
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    end: "bottom 30%",
                    toggleActions: "play none none reverse",
                },
                defaults: { ease: "power3.out" },
            });

            tl.from(textRef.current, {
                y: 40,
                opacity: 0,
                duration: 0.8,
            })
                .from(
                    cardsRef.current?.querySelectorAll("[data-room-card]") || [],
                    {
                        opacity: 0,
                        y: 30,
                        duration: 0.7,
                        stagger: 0.12,
                    },
                    "-=0.4"
                )
                .from(
                    calendarRef.current,
                    {
                        x: 40,
                        opacity: 0,
                        duration: 0.8,
                    },
                    "-=0.5"
                );


        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const goPrev = () => {
        setActiveIndex((prev) => (prev === 0 ? ROOMS.length - 1 : prev - 1));
    };

    const goNext = () => {
        setActiveIndex((prev) => (prev === ROOMS.length - 1 ? 0 : prev + 1));
    };

    return (
        <section
            ref={sectionRef}
            className="
        w-full px-4 py-16 md:py-24
        bg-gradient-to-b from-white via-blue-300 to-white
      "
        >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
                {/* LEFT: Rooms + text */}
                <div className="flex-1 space-y-8">
                    {/* Room cards */}
                    <div
                        ref={cardsRef}
                        className="flex gap-4 overflow-x-auto pb-2 md:overflow-visible"
                    >
                        {ROOMS.map((room, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <button
                                    type="button"
                                    key={room.id}
                                    onClick={() => setActiveIndex(index)}
                                    data-room-card
                                    className={`group relative flex h-44 min-w-[220px] flex-1 cursor-pointer overflow-hidden rounded-3xl bg-neutral-200 shadow-md transition-transform duration-200 ${
                                        isActive ? "scale-[1.03]" : "scale-100 hover:scale-[1.02]"
                                    }`}
                                >
                                    <Image
                                        src={room.image}
                                        alt={room.name}
                                        fill
                                        className="object-cover"
                                    />

                                    {/* gradient overlay */}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-black/5" />

                                    {/* Detail pill */}
                                    <div className="absolute left-3 top-3 rounded-full border border-white/60 bg-black/30 px-3 py-1 backdrop-blur-md">
                    <span className="text-[11px] font-body text-white/90">
                      Detail
                    </span>
                                    </div>

                                    {/* Room name */}
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <p className="font-body text-sm font-medium text-white drop-shadow-md">
                                            {room.name}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Text + booking */}
                    <div
                        ref={textRef}
                        className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
                    >
                        <div className="max-w-xl space-y-3">
                            <h2 className="font-fancy text-3xl leading-snug text-neutral-900 md:text-4xl">
                                Choose the Best Room
                                <span className="block">for Your Perfect Stay!</span>
                            </h2>
                            <p className="font-body text-sm text-neutral-600 md:text-[15px]">
                                Experience comfort and style at Yatu Hotel by choosing a room
                                tailored to how you like to rest—whether it&apos;s a lakeside
                                sunrise, a quiet workspace, or an art-filled corner to unwind.
                            </p>

                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-full border border-neutral-900 bg-white px-6 py-2 text-xs font-body font-semibold uppercase tracking-[0.22em] text-neutral-900 shadow-sm hover:bg-neutral-900 hover:text-white transition-colors"
                            >
                                <span>Booking</span>
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-white">
                  <ArrowUpRight className="h-3 w-3" />
                </span>
                            </button>
                        </div>

                        {/* Arrows */}
                        <div className="mt-2 flex items-center gap-2 md:mt-0">
                            <button
                                type="button"
                                onClick={goPrev}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 shadow-sm hover:bg-neutral-900 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={goNext}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 shadow-sm hover:bg-neutral-900 hover:text-white transition-colors"
                            >
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Calendar */}
                <div className="w-full max-w-sm self-center md:self-start">
                    <div className="mb-4 text-right">
                        <p className="font-fancy text-lg leading-snug text-neutral-900">
                            Check Your Availability Room
                            <span className="block">On This Calendar</span>
                        </p>
                    </div>

                    <div
                        ref={calendarRef}
                        className="rounded-3xl border border-neutral-200 bg-white/80 px-5 py-4 shadow-lg shadow-black/5 backdrop-blur-xl"
                    >
                        {/* Calendar header */}
                        <div className="mb-3 flex items-center justify-between">
                            <button className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100">
                                <ArrowLeft className="h-3 w-3" />
                            </button>
                            <p className="font-body text-sm font-medium text-neutral-800">
                                March 2024
                            </p>
                            <button className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100">
                                <ArrowRight className="h-3 w-3" />
                            </button>
                        </div>

                        {/* Week header */}
                        <div className="mb-2 grid grid-cols-7 text-center text-[11px] font-body text-neutral-400">
                            <span>M</span>
                            <span>T</span>
                            <span>W</span>
                            <span>T</span>
                            <span>F</span>
                            <span>S</span>
                            <span>S</span>
                        </div>

                        {/* Days (static mockup for now) */}
                        <div className="grid grid-cols-7 gap-1 text-center text-xs font-body">
                            {[
                                "",
                                "",
                                "",
                                "",
                                "",
                                1,
                                2,
                                3,
                                "",
                                5,
                                6,
                                7,
                                8,
                                9,
                                10,
                                11,
                                12,
                                13,
                                14,
                                15,
                                16,
                                17,
                                18,
                                19,
                                20,
                                21,
                                22,
                                23,
                                24,
                                25,
                                26,
                                27,
                                28,
                                29,
                                30,
                                31,
                            ].map((day, i) => {
                                if (day === "") return <span key={i} />;

                                const isSelected = day === 23;
                                const isHighlighted = day === 22;

                                return (
                                    <div
                                        key={i}
                                        className={`flex aspect-square items-center justify-center rounded-full
                    ${
                                            isSelected
                                                ? "bg-blue-600 text-white"
                                                : isHighlighted
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "text-neutral-700 hover:bg-neutral-100"
                                        }`}
                                    >
                                        {day}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
