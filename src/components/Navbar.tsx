"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import clsx from "clsx";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Suites", href: "/suites" },
    { label: "Experiences", href: "/experiences" }, // spa, lake, crafts
    { label: "Gallery", href: "/gallery" },
    { label: "Dining", href: "/dining" },
    { label: "About", href: "/about" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.header
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-4"
        >
            <div
                className="
          pointer-events-auto
          relative
          flex w-full max-w-6xl
          items-center justify-between gap-3
          rounded-full border border-white/70
          bg-white/50
          px-4 py-2
          shadow-lg shadow-black/10
          backdrop-blur-xl
          flex-row-reverse md:flex-row
        "
            >
                {/* Mobile hamburger */}
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="
            inline-flex md:hidden items-center justify-center
            h-9 w-9 rounded-full border border-white/80 bg-white/80
            text-neutral-900 shadow-sm
          "
                >
                    {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>

                {/* Brand */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full border border-[var(--brand-blue)] bg-white/60" />
                    <div className="leading-tight">
            <span className="block text-[11px] tracking-[0.25em] text-neutral-700 uppercase font-fancy">
              Yatu Hotel
            </span>
                        <span className="block text-[11px] text-neutral-500 font-body">
              Bishoftu · Arts & Luxurious Hotel
            </span>
                    </div>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center justify-center">
                    <div className="relative flex items-center gap-1 rounded-full border border-white/80 bg-white/40 px-1 py-1">
                        {NAV_LINKS.map((item) => {
                            const isActive =
                                pathname === item.href ||
                                (item.href !== "/" && pathname.startsWith(item.href));

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative px-2 py-1 text-sm"
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 rounded-full bg-[var(--brand-blue)]/95"
                                            transition={{
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                    <span
                                        className={clsx(
                                            "relative z-10 whitespace-nowrap text-[11px] font-body tracking-wide",
                                            isActive
                                                ? "text-white"
                                                : "text-neutral-700 hover:text-neutral-900"
                                        )}
                                    >
                    {item.label}
                  </span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Booking button (desktop + sm) */}
                <div className="hidden sm:flex items-center gap-2">
                    <Link
                        href="/booking"
                        className="
              group inline-flex items-center gap-2 rounded-full
              border border-[var(--brand-blue-light)] bg-[var(--brand-blue)]
              px-4 py-1.5 text-[11px] font-body font-semibold
              uppercase tracking-[0.22em] text-white shadow-sm
              hover:bg-[var(--brand-blue-light)] hover:text-[var(--brand-blue)]
              transition-colors
            "
                    >
                        <span>Book Now</span>
                        <motion.span
                            initial={{ x: 0, y: 0 }}
                            whileHover={{ x: 1.5, y: -1.5 }}
                            className="flex h-5 w-5 items-center justify-center rounded-full border border-white/70 bg-white/20"
                        >
                            <ArrowUpRight className="h-3 w-3" />
                        </motion.span>
                    </Link>
                </div>

                {/* Mobile dropdown menu */}
                {isOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18 }}
                        className="
              absolute left-0 right-0 top-full mt-3
              rounded-3xl border border-white/80 bg-white/90
              backdrop-blur-xl shadow-lg shadow-black/15
              px-4 py-3 md:hidden
            "
                    >
                        <ul className="flex flex-col gap-1">
                            {NAV_LINKS.map((item) => {
                                const isActive =
                                    pathname === item.href ||
                                    (item.href !== "/" && pathname.startsWith(item.href));

                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={clsx(
                                                "flex items-center justify-between rounded-full px-3 py-2 text-sm font-body",
                                                isActive
                                                    ? "bg-[var(--brand-blue)] text-white"
                                                    : "text-neutral-800 hover:bg-white"
                                            )}
                                        >
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}

                            <li className="mt-2">
                                <Link
                                    href="/booking"
                                    onClick={() => setIsOpen(false)}
                                    className="
                    flex items-center justify-center rounded-full
                    bg-[var(--brand-blue)] px-4 py-2 text-[11px] font-body
                    font-semibold uppercase tracking-[0.22em] text-white
                    shadow-sm hover:bg-[var(--brand-blue-light)]
                    hover:text-[var(--brand-blue)]
                  "
                                >
                                    Book Now
                                </Link>
                            </li>
                        </ul>
                    </motion.nav>
                )}
            </div>
        </motion.header>
    );
}
