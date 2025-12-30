"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { MorphingDesktopNav } from "./MorphingDesktopNav";
import { NAV_CONTENT, type NavKey } from "@/lib/navData";

export function Header() {
    const locale = useLocale();
    const isKorean = locale === "ko";
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const backdropRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const mobileOverlayRef = useRef<HTMLDivElement>(null);
    const mobilePanelRef = useRef<HTMLDivElement>(null);
    const mobileNavItemsRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Backdrop blur animation
    useEffect(() => {
        if (!backdropRef.current) return;

        if (isMenuOpen) {
            gsap.set(backdropRef.current, { display: "block" });
            gsap.to(backdropRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.inOut",
            });
        } else {
            gsap.to(backdropRef.current, {
                opacity: 0,
                duration: 0.4,
                ease: "power2.inOut",
                onComplete: () => {
                    if (backdropRef.current) {
                        gsap.set(backdropRef.current, { display: "none" });
                    }
                },
            });
        }
    }, [isMenuOpen]);

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
            {/* Global Backdrop Blur Overlay (Apple-style) */}
            <div
                ref={backdropRef}
                className="fixed inset-0 z-[40] bg-black/20 backdrop-blur-[12px]"
                style={{
                    display: "none",
                    opacity: 0,
                    WebkitBackdropFilter: "blur(12px) saturate(150%) brightness(0.8)",
                }}
            />

            <header
                className={cn(
                    "fixed top-4 inset-x-0 mx-auto z-50 transition-all duration-500 ease-out",
                    "w-[90%] max-w-[1240px] rounded-2xl py-1 px-6",
                    "border border-transparent", // Always have border to prevent layout shift
                    isMenuOpen
                        ? "bg-transparent" // Transparent so solid background behind shows through
                        : isScrolled
                            ? "bg-marine-dark/40 !border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                            : ""
                )}
                style={{
                    WebkitBackdropFilter: isMenuOpen ? "none" : (isScrolled ? "blur(32px) saturate(180%) brightness(1.1)" : "none"),
                    backdropFilter: isMenuOpen ? "none" : (isScrolled ? "blur(32px) saturate(180%) brightness(1.1)" : "none"),
                }}
            >
                <div className="flex items-center justify-between">
                    {/* Left Section: Logo & Nav */}
                    <div className="flex items-center gap-12 xl:gap-16">
                        {/* Logo Section */}
                        <Link href="/" className="flex items-center gap-2 shrink-0 relative z-10">
                            <div className="relative w-24 lg:w-28 h-6 lg:h-7 transition-all duration-300">
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
                        <nav className="hidden lg:flex items-center">
                            <MorphingDesktopNav onMenuOpen={setIsMenuOpen} />
                        </nav>
                    </div>

                    {/* Right Actions */}
                    <div className="hidden lg:flex items-center gap-8 relative z-10">
                        <LanguageSwitcher />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="lg:hidden p-1 text-white relative z-10"
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
                    className="absolute right-0 top-0 bottom-0 w-[300px] bg-marine-dark border-l border-white/10 shadow-2xl"
                    style={{ transform: "translateX(100%)" }}
                >
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <span className="font-display font-bold text-lg text-white">MENU</span>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 text-white/60 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <nav ref={mobileNavItemsRef} className="p-6 flex flex-col gap-6">
                        {Object.keys(NAV_CONTENT).map((tab) => {
                            const item = NAV_CONTENT[tab as NavKey];
                            return (
                                <Link
                                    key={tab}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="mobile-nav-item text-lg font-medium text-white/80 hover:text-white transition-colors"
                                >
                                    {isKorean ? item.sectionLabel : tab}
                                </Link>
                            );
                        })}
                        <div className="mt-4 pt-6 border-t border-white/10">
                            <LanguageSwitcher />
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}
