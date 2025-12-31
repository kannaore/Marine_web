"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_CONTENT, type NavKey } from "@/lib/navData";
import { gsap, useGSAP } from "@/lib/gsap";

export function MorphingDesktopNav({
    onMenuOpen,
    headerOffset = 88,
}: {
    onMenuOpen: (isOpen: boolean) => void;
    headerOffset?: number;
}) {
    const locale = useLocale();
    const isKorean = locale === "ko";
    const [activeTab, setActiveTab] = useState<NavKey | null>(null);
    const [displayedTab, setDisplayedTab] = useState<NavKey | null>(null);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    const dropdownWrapperRef = useRef<HTMLDivElement>(null);
    const dropdownBgRef = useRef<HTMLDivElement>(null);
    const dimmerRef = useRef<HTMLDivElement>(null);
    const categoriesRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const prevActiveTabRef = useRef<NavKey | null>(null);
    const closeTimelineRef = useRef<gsap.core.Timeline | null>(null);

    const { contextSafe } = useGSAP({ scope: dropdownWrapperRef });

    const getMenuHeight = (tab: NavKey) => {
        const count = NAV_CONTENT[tab].categories.length;
        const minHeight = 300;
        const maxHeight = 460;
        const calculated = 120 + count * 44;
        return Math.min(maxHeight, Math.max(minHeight, calculated));
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        onMenuOpen(!!displayedTab);
    }, [displayedTab, onMenuOpen]);

    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

    const scheduleClose = useCallback(
        contextSafe(() => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
            closeTimeoutRef.current = setTimeout(() => {
                setActiveTab(null);
            }, 150);
        }),
        [contextSafe]
    );

    const cancelClose = useCallback(() => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    }, []);

    const handleMouseEnterNav = useCallback((tab: NavKey) => {
        cancelClose();
        setActiveTab(tab);
        setDisplayedTab(tab);
        setActiveCategoryIndex(0);
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

    const currentContent = displayedTab ? NAV_CONTENT[displayedTab] : null;
    const currentCategory = currentContent?.categories[activeCategoryIndex]
        ?? currentContent?.categories[0]
        ?? null;
    const safeHeaderOffset = Math.max(0, headerOffset);
    const contentPaddingTop = safeHeaderOffset + 20;

    useGSAP(
        () => {
            if (!mounted) return;
            const wrapper = dropdownWrapperRef.current;
            const panel = dropdownBgRef.current;
            const dimmer = dimmerRef.current;

            if (!wrapper || !panel || !dimmer) return;

            const prevTab = prevActiveTabRef.current;
            const targetHeight = activeTab ? getMenuHeight(activeTab) + safeHeaderOffset : 0;

            if (activeTab) {
                if (closeTimelineRef.current) {
                    closeTimelineRef.current.kill();
                    closeTimelineRef.current = null;
                }
                gsap.set(wrapper, { display: "block", pointerEvents: "auto" });

                if (!prevTab) {
                    gsap.set(panel, { height: 0 });
                    gsap.set(dimmer, { opacity: 0 });
                    gsap.to(dimmer, {
                        opacity: 1,
                        duration: 0.32,
                        ease: "power2.out",
                        delay: 0.08,
                        overwrite: "auto",
                    });
                    gsap.to(panel, {
                        height: targetHeight,
                        duration: 0.4,
                        ease: "power2.out",
                        overwrite: "auto",
                    });
                } else {
                    gsap.to(dimmer, {
                        opacity: 1,
                        duration: 0.2,
                        ease: "power2.out",
                        overwrite: "auto",
                    });
                    gsap.to(panel, {
                        height: targetHeight,
                        duration: 0.32,
                        ease: "power2.out",
                        overwrite: "auto",
                    });
                }
            } else if (prevTab) {
                const tl = gsap.timeline({
                    onComplete: () => {
                        gsap.set(wrapper, { display: "none", pointerEvents: "none" });
                        setDisplayedTab(null);
                        closeTimelineRef.current = null;
                    },
                });

                closeTimelineRef.current = tl;

                tl.to(panel, {
                    height: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                    overwrite: "auto",
                }).to(
                    dimmer,
                    {
                        opacity: 0,
                        duration: 0.24,
                        ease: "power2.out",
                        overwrite: "auto",
                    },
                    0
                );
            } else {
                gsap.set(wrapper, { display: "none", pointerEvents: "none" });
                gsap.set(dimmer, { opacity: 0 });
                gsap.set(panel, { height: 0 });
            }

            prevActiveTabRef.current = activeTab;
        },
        { dependencies: [activeTab, safeHeaderOffset, mounted], scope: dropdownWrapperRef }
    );

    useGSAP(
        () => {
            if (!displayedTab || !categoriesRef.current) return;
            gsap.fromTo(
                categoriesRef.current,
                { opacity: 0, y: 8 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.28,
                    ease: "power2.out",
                    overwrite: "auto",
                    immediateRender: false,
                }
            );
        },
        { dependencies: [displayedTab], scope: categoriesRef }
    );

    useGSAP(
        () => {
            if (!displayedTab || !contentRef.current) return;
            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.32,
                    ease: "power2.out",
                    overwrite: "auto",
                    immediateRender: false,
                }
            );

            if (imageRef.current) {
                gsap.fromTo(
                    imageRef.current,
                    { opacity: 0.65, scale: 1.03 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.45,
                        ease: "power2.out",
                        overwrite: "auto",
                        immediateRender: false,
                    }
                );
            }
        },
        { dependencies: [displayedTab, activeCategoryIndex], scope: contentRef }
    );

    return (
        <div
            className="flex items-center gap-8 xl:gap-10"
            onMouseEnter={cancelClose}
            onMouseLeave={handleMouseLeaveNav}
        >
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
                            "relative z-20 py-4 font-medium uppercase block text-center",
                            isKorean
                                ? "text-[16px] tracking-[0.14em] font-sans"
                                : "text-[13px] tracking-[0.18em] font-display",
                            activeTab === tab ? "text-white" : "text-white/70 hover:text-white"
                        )}
                        style={{ minWidth: isKorean ? "84px" : "auto" }}
                    >
                        {isKorean ? NAV_CONTENT[tab as NavKey].sectionLabel : tab}
                    </Link>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[160%] h-3 bg-transparent" />
                </div>
            ))}

            {mounted && createPortal(
                <div
                    ref={dropdownWrapperRef}
                    className="fixed inset-0 z-[45]"
                    style={{ display: displayedTab ? "block" : "none" }}
                >
                    <div
                        ref={dimmerRef}
                        className="absolute inset-0 bg-black/45 backdrop-blur-[6px] opacity-0"
                        onClick={handleCloseDropdown}
                    />

                    {displayedTab && currentContent && currentCategory && (
                        <div
                            className="absolute left-0 right-0 top-0 z-10"
                            onMouseEnter={handleMouseEnterDropdown}
                            onMouseLeave={handleMouseLeaveDropdown}
                        >
                            <div
                                ref={dropdownBgRef}
                                className="nav-flyout-panel relative overflow-hidden border-b border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.55)] bg-marine-dark/85"
                            >
                                <div
                                    className="absolute left-0 right-0 max-w-[1240px] mx-auto flex items-start px-8 pb-6"
                                    style={{ paddingTop: contentPaddingTop }}
                                >
                                    <div
                                        ref={categoriesRef}
                                        className="relative w-[260px] pr-6 flex flex-col gap-2"
                                        style={{ willChange: "opacity, transform" }}
                                    >
                                        <div className="absolute right-0 top-2 bottom-2 w-px bg-white/10" />

                                        <span
                                            className={cn(
                                                "font-semibold text-white/55 uppercase mb-3 px-4",
                                                isKorean
                                                    ? "text-[12px] tracking-[0.16em] font-sans"
                                                    : "text-[11px] tracking-[0.2em] font-display"
                                            )}
                                        >
                                            {isKorean ? currentContent.sectionLabel : currentContent.sectionLabelEn}
                                        </span>

                                        {currentContent.categories.map((cat, idx) => (
                                            <button
                                                key={cat.id}
                                                onMouseEnter={() => setActiveCategoryIndex(idx)}
                                                className={cn(
                                                    "w-full text-left px-4 py-2.5 rounded-xl font-medium transition-colors duration-200 flex items-center justify-between font-sans",
                                                    isKorean
                                                        ? "text-[17px] tracking-[0.02em]"
                                                        : "text-[15px] tracking-[0.03em]",
                                                    activeCategoryIndex === idx
                                                        ? "bg-white/10 text-white border border-white/10"
                                                        : "text-white/75 hover:text-white hover:bg-white/5"
                                                )}
                                            >
                                                {isKorean ? cat.label : cat.labelEn}
                                                {activeCategoryIndex === idx && (
                                                    <ChevronRight size={16} className="text-white/90" />
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex-1 pl-10">
                                        <div
                                            ref={contentRef}
                                            className="flex gap-8 items-center"
                                            style={{ willChange: "opacity, transform" }}
                                        >
                                            <div className="flex-1 flex flex-col justify-center">
                                                <h3 className="text-[28px] font-semibold text-white mb-3 font-display tracking-tight leading-snug">
                                                    {isKorean ? currentCategory.title : currentCategory.titleEn}
                                                </h3>
                                                <p className="text-white/65 text-base leading-relaxed mb-5 max-w-md font-sans">
                                                    {isKorean ? currentCategory.desc : currentCategory.descEn}
                                                </p>
                                                <Link
                                                    href={currentCategory.href}
                                                    className="inline-flex items-center gap-3 text-sm font-semibold text-white/90 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 hover:bg-white hover:text-marine-dark transition-colors duration-300 group w-fit"
                                                >
                                                    Explore Details
                                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>

                                            <div className="w-[300px] h-[200px] rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 shrink-0">
                                                <div
                                                    ref={imageRef}
                                                    className="absolute inset-0 bg-cover bg-center"
                                                    style={{
                                                        willChange: "opacity, transform",
                                                        backgroundImage: `url('${currentCategory.image}')`,
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#050b14]/70 via-transparent to-transparent" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>,
                document.body
            )}
        </div>
    );
}
