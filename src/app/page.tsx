"use client";

import Hero from "@/components/Hero";
import RoomsSection from "@/components/RoomsSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import CultureSection from "@/components/CultureSection";

export default function HomePage() {
    return (
        <div className="w-full min-h-screen">
            <Hero />
            <RoomsSection/>
            <FacilitiesSection/>
            <CultureSection/>
        </div>
    );
}
