"use client";

import Hero from "@/components/Hero";
import RoomsSection from "@/components/RoomsSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import CultureSection from "@/components/CultureSection";
import Footer from "@/components/Footer";
import LocationSection from "@/components/LocationSection";

export default function HomePage() {
    return (
        <div className="w-full min-h-screen">
            <Hero />
            <RoomsSection/>
            <FacilitiesSection/>
            <CultureSection/>
            <LocationSection/>
            <Footer/>
        </div>
    );
}
