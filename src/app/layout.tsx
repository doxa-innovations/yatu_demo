import type { Metadata } from "next";
import "./globals.css";
import {Navbar} from "@/components/Navbar";
import { Fraunces, Inter } from "next/font/google";

const fraunces = Fraunces({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-fraunces",
});

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Yatu Hotel Bishoftu – Arts & Luxurious Hotel",
    description:
        "A lakeside retreat in Bishoftu blending Ethiopian art, crafts, and serene luxury.",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${fraunces.variable} ${inter.variable}`}
        >
        <body className="min-h-screen bg-neutral-50 text-neutral-900 font-body">
        <Navbar />
        <main className="relative">{children}</main>
        </body>
        </html>
    );
}
