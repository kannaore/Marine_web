"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_CONTENT, type NavKey } from "@/lib/navData";

export function MorphingDesktopNav({ onMenuOpen }: { onMenuOpen: (isOpen: boolean) => void }) {
    const locale = useLocale();
    const isKorean = locale === "ko";
    const [activeTab, setActiveTab] = useState<NavKey | null>(null);
    const [displayedTab, setDisplayedTab] = useState<NavKey | null>(null); // Keeps content visible during close animation
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [hasPlayedInitialAnimation, setHasPlayedInitialAnimation] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const prevActiveTabRef = useRef<NavKey | null>(null);

    // Refs for GSAP animations
    const dropdownWrapperRef = useRef<HTMLDivElement>(null);
    const dropdownBgRef = useRef<HTMLDivElement>(null);
    const categoriesRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const dimmerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    const getMenuHeight = (tab: NavKey) => {
        const count = NAV_CONTENT[tab].categories.length;
        const minHeight = 300;
        const maxHeight = 520;
        const calculated = 180 + count * 52;
        return Math.min(maxHeight, Math.max(minHeight, calculated));
    };

    const getDropdownHeight = (tab: NavKey) => 88 + getMenuHeight(tab);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        onMenuOpen(!!activeTab);
    }, [activeTab, onMenuOpen]);

    useEffect(() => {
        setActiveCategoryIndex(0);
    }, [activeTab]);

    // Track when dropdown first opens to trigger initial animation only once
    useEffect(() => {
        if (activeTab && prevActiveTabRef.current === null) {
            setHasPlayedInitialAnimation(false);
            const timer = setTimeout(() => {
                setHasPlayedInitialAnimation(true);
            }, 300);
            return () => clearTimeout(timer);
        }
        prevActiveTabRef.current = activeTab;
    }, [activeTab]);

    // Clear timeout on unmount
    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

    // Dropdown open/close animation
    useEffect(() => {
        if (!mounted) return;

        if (activeTab) {
            // Sync displayedTab when opening
            setDisplayedTab(activeTab);

            // Open animations - slower for smoother feel
            if (dropdownWrapperRef.current) {
                gsap.set(dropdownWrapperRef.current, { display: "block" });
                gsap.to(dropdownWrapperRef.current, {
                    opacity: 1,
                    duration: 0.35,
                });
            }

            if (dropdownBgRef.current) {
                const height = getDropdownHeight(activeTab);

                gsap.to(dropdownBgRef.current, {
                    clipPath: "inset(0 0 0% 0)",
                    height,
                    duration: 0.6,
                    ease: "power3.out",
                });
            }

            if (categoriesRef.current && !hasPlayedInitialAnimation) {
                gsap.fromTo(categoriesRef.current,
                    { opacity: 0, filter: "blur(12px)" },
                    { opacity: 1, filter: "blur(0px)", duration: 0.5, delay: 0.15, ease: "power2.out" }
                );
            }

            if (dimmerRef.current) {
                gsap.set(dimmerRef.current, { display: "block" });
                gsap.to(dimmerRef.current, { opacity: 1, duration: 0.4 });
            }
        } else if (displayedTab && !isClosing) {
            // Close animations - curtain closes first, then hide wrapper
            setIsClosing(true);
            const closeDuration = 0.5;

            if (dropdownBgRef.current) {
                gsap.to(dropdownBgRef.current, {
                    clipPath: "inset(0 0 100% 0)",
                    duration: closeDuration,
                    ease: "power2.inOut",
                });
            }

            // Wrapper hides AFTER curtain animation completes
            if (dropdownWrapperRef.current) {
                gsap.to(dropdownWrapperRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    delay: closeDuration - 0.1,
                    onComplete: () => {
                        if (dropdownWrapperRef.current) {
                            gsap.set(dropdownWrapperRef.current, { display: "none" });
                        }
                        // NOW remove from DOM
                        setDisplayedTab(null);
                        setIsClosing(false);
                    },
                });
            }

            if (dimmerRef.current) {
                gsap.to(dimmerRef.current, {
                    opacity: 0,
                    duration: closeDuration,
                    onComplete: () => {
                        if (dimmerRef.current) {
                            gsap.set(dimmerRef.current, { display: "none" });
                        }
                    },
                });
            }
        }
    }, [activeTab, mounted, hasPlayedInitialAnimation]);

    // Content change animation - NO animation on category switch to prevent flicker
    useEffect(() => {
        if (!activeTab || !contentRef.current) return;

        // Only animate on initial open, not on category changes
        if (!hasPlayedInitialAnimation) {
            gsap.fromTo(contentRef.current,
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
            );

            if (imageRef.current) {
                gsap.fromTo(imageRef.current,
                    { scale: 1.1, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
                );
            }
        }
        // Category changes now use CSS transitions, no GSAP re-animation
    }, [activeTab, hasPlayedInitialAnimation]);

    // Height animation when switching tabs
    useEffect(() => {
        if (!activeTab || !dropdownBgRef.current) return;

        const height = getDropdownHeight(activeTab);

        gsap.to(dropdownBgRef.current, {
            height,
            duration: 0.3,
            ease: "power3.out",
        });
    }, [activeTab]);

    // Delayed close with hover intent pattern
    const scheduleClose = useCallback(() => {
        closeTimeoutRef.current = setTimeout(() => {
            setActiveTab(null);
            prevActiveTabRef.current = null;
            setHasPlayedInitialAnimation(false);
        }, 150);
    }, []);

    const cancelClose = useCallback(() => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    }, []);

    const handleMouseEnterNav = useCallback((tab: NavKey) => {
        cancelClose();
        setActiveTab(tab);
    }, [cancelClose]);

    const handleMouseLeaveNav = useCallback(() => {
        scheduleClose();
    }, [scheduleClose]);

    const handleMouseEnterDropdown = useCallback(() => {
        cancelClose();
    }, [cancelClose]);

    const handleMouseLeaveDropdown = useCallback(() => {
        scheduleClose();
    }, [scheduleClose]);

    const handleCloseDropdown = () => {
        cancelClose();
        setActiveTab(null);
    };

    // Use displayedTab for content to keep it visible during close animation
    const currentContent = displayedTab ? NAV_CONTENT[displayedTab] : null;
    const currentCategory = currentContent?.categories[activeCategoryIndex];
    const menuHeight = displayedTab ? getMenuHeight(displayedTab) : 0;
    const dropdownHeight = displayedTab ? 88 + menuHeight : 0;

    return (
        <div
            className="flex items-center gap-8 xl:gap-10"
            onMouseEnter={cancelClose}
            onMouseLeave={handleMouseLeaveNav}
        >
            {/* Nav Items */}
            {Object.keys(NAV_CONTENT).map((tab) => (
                <div
                    key={tab}
                    className="relative group px-1 text-center"
                    onMouseEnter={() => handleMouseEnterNav(tab as NavKey)}
                >
                    <Link
                        href={NAV_CONTENT[tab as NavKey].href}
                        onClick={handleCloseDropdown}
                        className={cn(
                            "relative z-20 py-4 text-[11px] font-bold tracking-[0.08em] transition-colors duration-300 uppercase font-display block text-center",
                            activeTab === tab ? "text-white" : "text-white/60 hover:text-white"
                        )}
                        style={{ minWidth: isKorean ? '48px' : 'auto' }}
                    >
                        {isKorean ? NAV_CONTENT[tab as NavKey].sectionLabel : tab}
                    </Link>
                    {/* Extended hover area */}
                    <div
                        className="absolute top-full left-1/2 -translate-x-1/2 w-[150%] h-2 bg-transparent z-10"
                    />
                    {/* Invisible bridge */}
                    {activeTab === tab && (
                        <div
                            className="absolute top-full left-1/2 -translate-x-1/2 z-10"
                            style={{
                                width: '300px',
                                height: '80px',
                                background: 'transparent',
                                clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)'
                            }}
                        />
                    )}
                </div>
            ))}

            {/* Portal for dropdown */}
            {mounted && createPortal(
                <>
                    <div
                        ref={dropdownWrapperRef}
                        className="fixed inset-0 z-[45]"
                        style={{ display: "none", opacity: 0 }}
                    >
                        {/* Click overlay */}
                        <div
                            className="absolute inset-0"
                            onClick={handleCloseDropdown}
                        />

                        {/* Dropdown content wrapper - use displayedTab to keep visible during close */}
                        {displayedTab && currentContent && currentCategory && (
                            <div
                                className="absolute top-0 left-0 right-0"
                                style={{
                                    height: dropdownHeight
                                }}
                                onMouseEnter={handleMouseEnterDropdown}
                                onMouseLeave={handleMouseLeaveDropdown}
                            >
                                {/* Background with curtain animation */}
                                <div
                                    ref={dropdownBgRef}
                                    className="relative overflow-hidden bg-marine-dark backdrop-blur-3xl border-b border-white/10 shadow-2xl"
                                    style={{
                                        clipPath: "inset(0 0 100% 0)",
                                        height: dropdownHeight
                                    }}
                                >
                                    {/* Content Area */}
                                    <div
                                        className="absolute left-0 right-0 max-w-[1240px] mx-auto flex items-start py-10 px-10"
                                        style={{ top: 88 }}
                                    >
                                        {/* Left Column: Categories */}
                                        <div
                                            ref={categoriesRef}
                                            className="relative w-[280px] pr-6 flex flex-col gap-2"
                                        >
                                            {/* Vertical divider */}
                                            <div
                                                className="absolute right-0 top-0 bottom-0 w-px bg-white/10"
                                            />

                                            <span className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.25em] font-display mb-4 px-5">
                                                {isKorean ? currentContent.sectionLabel : activeTab}
                                            </span>

                                            {currentContent.categories.map((cat, idx) => (
                                                <button
                                                    key={cat.id}
                                                    onMouseEnter={() => setActiveCategoryIndex(idx)}
                                                    className={cn(
                                                        "w-full text-left px-5 py-3 rounded-xl text-sm font-medium transition-colors duration-150 flex items-center justify-between",
                                                        activeCategoryIndex === idx
                                                            ? "bg-white text-marine-dark"
                                                            : "text-white/50 hover:bg-white/5 hover:text-white"
                                                    )}
                                                >
                                                    {isKorean ? cat.label : cat.labelEn}
                                                    {activeCategoryIndex === idx && (
                                                        <ChevronRight size={16} className="text-marine-dark" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Right Column: Detail Content */}
                                        <div className="flex-1 pl-12">
                                            <div
                                                ref={contentRef}
                                                className="flex gap-10 items-center transition-opacity duration-300"
                                            >
                                                <div className="flex-1 flex flex-col justify-center">
                                                    <h3 className="text-3xl font-bold text-white mb-4 font-display tracking-tight leading-tight">
                                                        {isKorean ? currentCategory.title : currentCategory.titleEn}
                                                    </h3>
                                                    <p className="text-white/60 text-base leading-relaxed mb-6 max-w-md">
                                                        {isKorean ? currentCategory.desc : currentCategory.descEn}
                                                    </p>
                                                    <Link
                                                        href={currentCategory.href}
                                                        className="inline-flex items-center gap-3 text-sm font-bold text-white bg-white/5 border border-white/10 rounded-xl px-6 py-3 hover:bg-white hover:text-marine-dark transition-all duration-300 group w-fit shadow-lg shadow-black/20"
                                                    >
                                                        Explore Details
                                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                    </Link>
                                                </div>

                                                <div className="w-[320px] h-[220px] rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 shrink-0">
                                                    <div
                                                        ref={imageRef}
                                                        className="absolute inset-0 bg-cover bg-center"
                                                        style={{ backgroundImage: `url('${currentCategory.image}')` }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050b14]/80 via-transparent to-transparent opacity-60" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Background Dimmer */}
                    <div
                        ref={dimmerRef}
                        className="fixed inset-0 top-0 bg-black/60 z-[30] h-screen w-screen pointer-events-none backdrop-blur-[8px]"
                        style={{
                            display: "none",
                            opacity: 0,
                            maskImage: "linear-gradient(to bottom, transparent 0%, black 20%)",
                            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%)"
                        }}
                    />
                </>,
                document.body
            )}
        </div>
    );
}
