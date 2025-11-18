import Link from "next/link";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-gradient-to-t from-[#020617] via-[#020617] to-[#020617]/80 text-white/80">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 md:py-16">
                {/* Top row */}
                <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
                    {/* Brand block */}
                    <div className="max-w-sm space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full border border-[var(--brand-blue-light)] bg-white/10" />
                            <div className="leading-tight">
                                <p className="font-fancy text-sm tracking-[0.3em] uppercase text-white">
                                    Yatu Hotel
                                </p>
                                <p className="font-body text-[11px] text-white/60">
                                    Bishoftu · Lakeside Art Retreat
                                </p>
                            </div>
                        </div>

                        <p className="font-body text-sm text-white/70">
                            A calm corner on the shores of Bishoftu, where handcrafted details,
                            warm lighting, and water views create a quiet luxury escape just an
                            hour from Addis.
                        </p>

                        <Link
                            href="/booking"
                            className="inline-flex items-center justify-center rounded-full border border-[var(--brand-blue-light)] bg-[var(--brand-blue)] px-6 py-2 text-[11px] font-body font-semibold uppercase tracking-[0.22em] text-white shadow-sm hover:bg-[var(--brand-blue-light)] hover:text-[var(--brand-blue)] transition-colors"
                        >
                            Book Now
                        </Link>
                    </div>

                    {/* Links */}
                    <div className="flex flex-1 flex-col gap-8 md:flex-row md:justify-end">
                        <div className="min-w-[140px] space-y-3">
                            <p className="font-body text-xs uppercase tracking-[0.22em] text-white/60">
                                Hotel
                            </p>
                            <ul className="space-y-2 text-sm font-body">
                                <li>
                                    <Link href="/suites" className="hover:text-white">
                                        Suites & Rooms
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/experiences" className="hover:text-white">
                                        Experiences
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dining" className="hover:text-white">
                                        Dining
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/gallery" className="hover:text-white">
                                        Gallery
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="min-w-[180px] space-y-3">
                            <p className="font-body text-xs uppercase tracking-[0.22em] text-white/60">
                                Visit Us
                            </p>
                            <div className="space-y-2 text-sm font-body">
                                <p>Bishoftu, Ethiopia</p>
                                <p className="text-white/60">
                                    Overlooking one of the crater lakes, a short drive from Addis Ababa.
                                </p>
                            </div>

                            <div className="space-y-1 text-sm font-body">
                                <p className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-[var(--brand-blue-light)]" />
                                    <span>+251 (0) 91 000 0000</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-[var(--brand-blue-light)]" />
                                    <span>stay@yatuhotel.com</span>
                                </p>
                            </div>

                            <div className="mt-3 flex items-center gap-3">
                                <a
                                    href="#"
                                    aria-label="Instagram"
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/15 transition-colors"
                                >
                                    <Instagram className="h-4 w-4" />
                                </a>
                                <a
                                    href="#"
                                    aria-label="Facebook"
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/15 transition-colors"
                                >
                                    <Facebook className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom row */}
                <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-[11px] font-body text-white/50 md:flex-row md:items-center">
                    <p>© {new Date().getFullYear()} Yatu Hotel, Bishoftu. All rights reserved.</p>
                    <div className="flex flex-wrap items-center gap-4">
                        <button className="hover:text-white">Privacy Policy</button>
                        <span className="h-1 w-1 rounded-full bg-white/30" />
                        <button className="hover:text-white">Terms</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
