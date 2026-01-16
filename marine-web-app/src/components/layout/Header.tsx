"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { MorphingDesktopNav } from "./MorphingDesktopNav";
import { NAV_CONTENT, type NavKey } from "@/lib/navData";

export function Header() {
    const locale = useLocale();
    const pathname = usePathname();
    const isKorean = locale === "ko";
    const forceGlass = pathname.includes("/services");
    const [isScrolled, setIsScrolled] = useState(forceGlass);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [headerOffset, setHeaderOffset] = useState(88);

    const headerRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const mobileOverlayRef = useRef<HTMLDivElement>(null);
    const mobilePanelRef = useRef<HTMLDivElement>(null);
    const mobileNavItemsRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20 || forceGlass);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [forceGlass]);

    useEffect(() => {
        if (!headerRef.current) return;

        const updateOffset = () => {
            if (!headerRef.current) return;
            const rect = headerRef.current.getBoundingClientRect();
            setHeaderOffset(Math.round(rect.bottom));
        };

        updateOffset();
        const resizeObserver = new ResizeObserver(updateOffset);
        resizeObserver.observe(headerRef.current);
        window.addEventListener("resize", updateOffset);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", updateOffset);
        };
    }, []);

    // Mobile menu animation
    useEffect(() => {
        if (!mobileMenuRef.current || !mobileOverlayRef.current || !mobilePanelRef.current) return;

        if (isMobileMenuOpen) {
            gsap.set(mobileMenuRef.current, { display: "block" });
            gsap.to(mobileOverlayRef.current, {
                opacity: 1,
                duration: 0.3,
            });
            gsap.to(mobilePanelRef.current, {
                x: 0,
                duration: 0.4,
                ease: "power3.out",
            });

            // Stagger nav items
            if (mobileNavItemsRef.current) {
                const items = mobileNavItemsRef.current.querySelectorAll(".mobile-nav-item");
                gsap.from(items, {
                    opacity: 0,
                    x: 20,
                    stagger: 0.1,
                    delay: 0.2,
                    duration: 0.4,
                });
            }
        } else {
            gsap.to(mobileOverlayRef.current, {
                opacity: 0,
                duration: 0.3,
            });
            gsap.to(mobilePanelRef.current, {
                x: "100%",
                duration: 0.3,
                ease: "power3.in",
                onComplete: () => {
                    if (mobileMenuRef.current) {
                        gsap.set(mobileMenuRef.current, { display: "none" });
                    }
                },
            });
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            <header
                ref={headerRef}
                className={cn(
                    "fixed inset-x-0 top-4 z-50 mx-auto transition-all duration-500 ease-out",
                    "w-[90%] max-w-[1240px] rounded-2xl px-6 py-1",
                    "border border-transparent", // Always have border to prevent layout shift
                    isMenuOpen
                        ? "bg-transparent" // Transparent so solid background behind shows through
                        : isScrolled
                          ? "bg-marine-dark/50 !border-white/8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                          : ""
                )}
                style={{
                    WebkitBackdropFilter: isMenuOpen
                        ? "none"
                        : isScrolled
                          ? "blur(15px) saturate(180%) brightness(1.1)"
                          : "none",
                    backdropFilter: isMenuOpen
                        ? "none"
                        : isScrolled
                          ? "blur(15px) saturate(180%) brightness(1.1)"
                          : "none",
                }}
            >
                <div className="flex items-center justify-between">
                    {/* Left Section: Logo & Nav */}
                    <div className="flex items-center gap-12 xl:gap-16">
                        {/* Logo Section */}
                        <Link href="/" className="relative z-10 flex shrink-0 items-center gap-2">
                            <div className="relative h-6 w-24 transition-all duration-300 lg:h-7 lg:w-28">
                                <Image
                                    src="/logo.png"
                                    alt="Marine Research Logo"
                                    fill
                                    sizes="(min-width: 1024px) 112px, 96px"
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation - Morphing Menu */}
                        <nav className="hidden items-center lg:flex">
                            <MorphingDesktopNav
                                onMenuOpen={setIsMenuOpen}
                                headerOffset={headerOffset}
                            />
                        </nav>
                    </div>

                    {/* Right Actions */}
                    <div className="relative z-10 hidden items-center gap-8 lg:flex">
                        <LanguageSwitcher />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="relative z-10 p-1 text-white lg:hidden"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            <div
                ref={mobileMenuRef}
                className="fixed inset-0 z-[60] lg:hidden"
                style={{ display: "none" }}
            >
                <div
                    ref={mobileOverlayRef}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    style={{ opacity: 0 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                />
                <div
                    ref={mobilePanelRef}
                    className="bg-marine-dark absolute top-0 right-0 bottom-0 w-[300px] border-l border-white/10 shadow-2xl"
                    style={{ transform: "translateX(100%)" }}
                >
                    <div className="flex items-center justify-between border-b border-white/10 p-6">
                        <span className="font-display text-lg font-bold text-white">MENU</span>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 text-white/60 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <nav ref={mobileNavItemsRef} className="flex flex-col gap-6 p-6">
                        {Object.keys(NAV_CONTENT).map((tab) => {
                            const item = NAV_CONTENT[tab as NavKey];
                            return (
                                <Link
                                    key={tab}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="mobile-nav-item text-lg font-medium text-white/80 transition-colors hover:text-white"
                                >
                                    {isKorean ? item.sectionLabel : tab}
                                </Link>
                            );
                        })}
                        <div className="mt-4 border-t border-white/10 pt-6">
                            <LanguageSwitcher />
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}
