"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Navigation } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MAP_EMBED_SRC =
    // 🔴 IMPORTANT: Replace this with your real Google Maps embed URL
   "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.256083328516!2d38.9418685!3d8.7619598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b735b267d4763%3A0xe1cfb0446583a79!2sYatu%20International%20Hotel!5e0!3m2!1sen!2set!4v1763541254850!5m2!1sen!2set\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade";

export default function LocationSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const sectionEl = sectionRef.current;
        if (!sectionEl) return;

        const ctx = gsap.context(() => {
            gsap.from(contentRef.current, {
                y: 40,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top 80%",
                    end: "bottom 40%",
                    toggleActions: "play none none reverse",
                },
            });
        }, sectionEl);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full px-4 py-20 md:py-24 bg-gradient-to-b from-blue-300 via-white to-white"
        >
            <div
                ref={contentRef}
                className="mx-auto flex w-full max-w-6xl flex-col gap-10 md:flex-row md:items-stretch md:justify-between"
            >
                {/* LEFT: copy card */}
                <div className="flex-1">
                    <div className="h-full rounded-3xl border border-blue-100 bg-white/80 px-6 py-6 shadow-lg shadow-blue-100/40 backdrop-blur-xl md:px-8 md:py-8">
                        <p className="text-[11px] font-body uppercase tracking-[0.28em] text-blue-700/80">
                            Find Us
                        </p>

                        <h2 className="mt-3 font-fancy text-3xl leading-snug text-neutral-900 md:text-[2.1rem]">
                            Lakeside in Bishoftu,
                            <span className="block">just an hour from Addis.</span>
                        </h2>

                        <p className="mt-4 font-body text-sm text-neutral-600 md:text-[15px]">
                            Yatu Hotel is tucked along one of Bishoftu&apos;s crater lakes, away
                            from the city rush but close enough for an effortless weekend escape.
                            Easy road access, calm surroundings, and views that make you forget
                            your notifications exist.
                        </p>

                        <div className="mt-6 space-y-3 text-sm font-body text-neutral-700">
                            <p className="flex items-start gap-3">
                                <MapPin className="mt-[2px] h-4 w-4 text-blue-600" />
                                <span>
                  Yatu Hotel, Lakeside Road
                  <br />
                  Bishoftu, Oromia, Ethiopia
                </span>
                            </p>

                            <p className="text-xs text-neutral-500">
                                Exact directions and navigation are available on Google Maps and
                                other map apps.
                            </p>
                        </div>

                        <div className="mt-6">
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Yatu+Hotel+Bishoftu"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2 text-[11px] font-body font-semibold uppercase tracking-[0.22em] text-white shadow-md shadow-blue-500/30 hover:bg-blue-500 transition-colors"
                            >
                                <Navigation className="h-3.5 w-3.5" />
                                <span>Get Directions</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* RIGHT: map */}
                <div className="flex-1">
                    <div className="h-[320px] overflow-hidden rounded-[32px] border border-blue-100 bg-blue-50/40 shadow-lg shadow-blue-100/40 md:h-full">
                        <iframe
                            src={MAP_EMBED_SRC}
                            className="h-full w-full"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            aria-label="Map showing Yatu Hotel location in Bishoftu"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
