"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_CONTENT, type NavKey } from "@/lib/navData";
import { gsap, useGSAP } from "@/lib/gsap";

const NAV_ORDER = Object.keys(NAV_CONTENT) as NavKey[];

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
    const openFromClosedRef = useRef(false);
    const tabDirectionRef = useRef<1 | -1 | 0>(0);
    const prevDisplayedTabForContentRef = useRef<NavKey | null>(null);
    const prevCategoryIndexRef = useRef<number>(0);

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

    const handleMouseEnterNav = useCallback(
        (tab: NavKey) => {
            cancelClose();
            const isOpening = displayedTab === null;
            openFromClosedRef.current = isOpening;
            if (!isOpening && displayedTab && displayedTab !== tab) {
                const prevIndex = NAV_ORDER.indexOf(displayedTab);
                const nextIndex = NAV_ORDER.indexOf(tab);
                if (prevIndex !== -1 && nextIndex !== -1) {
                    tabDirectionRef.current = nextIndex > prevIndex ? 1 : -1;
                } else {
                    tabDirectionRef.current = 0;
                }
            } else {
                tabDirectionRef.current = 0;
            }
            setActiveTab(tab);
            setDisplayedTab(tab);
            setActiveCategoryIndex(0);
        },
        [cancelClose, displayedTab]
    );

    const handleMouseLeaveNav = useCallback(() => {
        scheduleClose();
    }, [scheduleClose]);

    const handleMouseEnterDropdown = useCallback(() => {
        cancelClose();
    }, [cancelClose]);

    const handleMouseLeaveDropdown = useCallback(() => {
        scheduleClose();
    }, [scheduleClose]);

    const handleCategoryEnter = useCallback((index: number) => {
        setActiveCategoryIndex(index);
    }, []);

    const handleCloseDropdown = () => {
        cancelClose();
        setActiveTab(null);
    };

    const currentContent = displayedTab ? NAV_CONTENT[displayedTab] : null;
    const currentCategory =
        currentContent?.categories[activeCategoryIndex] ?? currentContent?.categories[0] ?? null;
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
            if (!displayedTab || !categoriesRef.current) {
                return;
            }
            const isOpening = openFromClosedRef.current;
            const target = categoriesRef.current;

            // 카테고리 섹션 내부의 자식 요소들 선택 (콘텐츠 애니메이션과 동일한 패턴)
            const sectionLabel = target.querySelector("span");
            const buttons = target.querySelectorAll("button");
            const divider = target.querySelector(".absolute"); // 구분선
            const elements = [sectionLabel, ...Array.from(buttons)].filter(Boolean);

            // 기존 트윈 정리
            elements.forEach((el) => el && gsap.killTweensOf(el));
            if (divider) gsap.killTweensOf(divider);

            // 각 자식 요소에 초기 상태 설정 후 stagger 애니메이션
            elements.forEach((el) => {
                if (el) {
                    gsap.set(el, {
                        opacity: 0,
                        x: -12,
                        y: -6,
                        filter: "blur(8px)",
                    });
                }
            });

            // Stagger 애니메이션 - 촤라락 효과
            elements.forEach((el, index) => {
                if (el) {
                    gsap.to(el, {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.4,
                        ease: "power2.out",
                        delay: isOpening ? 0.12 + index * 0.05 : 0.02 + index * 0.04,
                        overwrite: "auto",
                        clearProps: "filter",
                    });
                }
            });

            // 구분선 페이드인
            if (divider) {
                gsap.fromTo(
                    divider,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3, delay: isOpening ? 0.15 : 0.05 }
                );
            }
        },
        { dependencies: [displayedTab] }
    );

    // Apple-style content animation with staggered fade + slide
    useGSAP(
        () => {
            if (!displayedTab || !contentRef.current) {
                prevDisplayedTabForContentRef.current = displayedTab ?? null;
                prevCategoryIndexRef.current = activeCategoryIndex;
                return;
            }
            const tabChanged = prevDisplayedTabForContentRef.current !== displayedTab;
            const categoryChanged = prevCategoryIndexRef.current !== activeCategoryIndex;

            // Update refs for next comparison
            prevDisplayedTabForContentRef.current = displayedTab;
            prevCategoryIndexRef.current = activeCategoryIndex;

            // Apple-style: animate on tab change OR category change
            const target = contentRef.current;
            const image = imageRef.current;

            // Get all animatable children inside contentRef
            const title = target.querySelector("h3");
            const desc = target.querySelector("p");
            const link = target.querySelector("a");
            const elements = [title, desc, link].filter(Boolean);

            // Always animate content transitions (both tab and category changes)
            elements.forEach((el) => el && gsap.killTweensOf(el));
            if (image) gsap.killTweensOf(image);

            if (tabChanged) {
                // Tab change: Apple-style staggered reveal from top-left to bottom-right
                const isOpening = openFromClosedRef.current;

                // Set initial state for all elements: blurred, shifted top-left
                elements.forEach((el) => {
                    if (el) {
                        gsap.set(el, {
                            opacity: 0,
                            x: -12,
                            y: -8,
                            filter: "blur(10px)",
                        });
                    }
                });

                // Stagger animate each element
                elements.forEach((el, index) => {
                    if (el) {
                        gsap.to(el, {
                            opacity: 1,
                            x: 0,
                            y: 0,
                            filter: "blur(0px)",
                            duration: 0.4,
                            ease: "power2.out",
                            delay: isOpening ? 0.15 + index * 0.07 : 0.05 + index * 0.06,
                            overwrite: "auto",
                            clearProps: "filter",
                        });
                    }
                });

                // Image animation
                if (image) {
                    gsap.set(image, {
                        opacity: 0,
                        scale: 1.08,
                        x: -15,
                        y: -10,
                        filter: "blur(15px)",
                    });
                    gsap.to(image, {
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.5,
                        ease: "power2.out",
                        delay: isOpening ? 0.12 : 0.06,
                        overwrite: "auto",
                        clearProps: "filter",
                    });
                }
            } else if (categoryChanged) {
                // Category change within same tab: Apple-style staggered reveal
                // Each element fades in from blur, moving from top-left to bottom-right
                // Like Apple's "촤라락" cascading effect

                // Get all animatable children inside contentRef
                const title = target.querySelector("h3");
                const desc = target.querySelector("p");
                const link = target.querySelector("a");
                const elements = [title, desc, link].filter(Boolean);

                // Kill any ongoing animations
                elements.forEach((el) => el && gsap.killTweensOf(el));
                if (image) gsap.killTweensOf(image);

                // Set initial state for all elements: blurred, shifted top-left
                elements.forEach((el) => {
                    if (el) {
                        gsap.set(el, {
                            opacity: 0,
                            x: -8,
                            y: -6,
                            filter: "blur(8px)",
                        });
                    }
                });

                // Stagger animate each element with Apple-like timing
                elements.forEach((el, index) => {
                    if (el) {
                        gsap.to(el, {
                            opacity: 1,
                            x: 0,
                            y: 0,
                            filter: "blur(0px)",
                            duration: 0.35,
                            ease: "power2.out",
                            delay: 0.05 + index * 0.06, // Stagger: 0.05, 0.11, 0.17
                            overwrite: "auto",
                            clearProps: "filter",
                        });
                    }
                });

                // Image: slightly delayed, with scale and blur
                if (image) {
                    gsap.set(image, {
                        opacity: 0,
                        scale: 1.05,
                        x: -10,
                        y: -8,
                        filter: "blur(12px)",
                    });
                    gsap.to(image, {
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.4,
                        ease: "power2.out",
                        delay: 0.08,
                        overwrite: "auto",
                        clearProps: "filter",
                    });
                }
            }
        },
        { dependencies: [displayedTab, activeCategoryIndex] }
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
                    className="group relative px-1 text-center"
                    onMouseEnter={() => handleMouseEnterNav(tab as NavKey)}
                >
                    <Link
                        href={NAV_CONTENT[tab as NavKey].href}
                        onClick={handleCloseDropdown}
                        className={cn(
                            "relative z-20 block py-4 text-center font-medium uppercase",
                            isKorean
                                ? "font-sans text-[14px] tracking-[0.14em]"
                                : "font-display text-[12px] font-semibold tracking-[0.18em]",
                            activeTab === tab ? "text-white" : "text-white/70 hover:text-white"
                        )}
                        style={{ minWidth: isKorean ? "84px" : "auto" }}
                    >
                        {isKorean ? NAV_CONTENT[tab as NavKey].sectionLabel : tab}
                    </Link>
                    <div className="absolute top-full left-1/2 h-3 w-[160%] -translate-x-1/2 bg-transparent" />
                </div>
            ))}

            {mounted &&
                createPortal(
                    <div
                        ref={dropdownWrapperRef}
                        className="fixed inset-0 z-[45]"
                        style={{ display: displayedTab ? "block" : "none" }}
                    >
                        <div
                            ref={dimmerRef}
                            className="absolute inset-0 bg-black/45 opacity-0 backdrop-blur-[6px]"
                            onClick={handleCloseDropdown}
                        />

                        {displayedTab && currentContent && currentCategory && (
                            <div
                                className="absolute top-0 right-0 left-0 z-10"
                                onMouseEnter={handleMouseEnterDropdown}
                                onMouseLeave={handleMouseLeaveDropdown}
                            >
                                <div
                                    ref={dropdownBgRef}
                                    className="nav-flyout-panel bg-marine-dark/85 relative overflow-hidden border-b border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                                >
                                    <div
                                        className="absolute right-0 left-0 mx-auto flex max-w-[1240px] items-start px-8 pb-6"
                                        style={{ paddingTop: contentPaddingTop }}
                                    >
                                        <div
                                            ref={categoriesRef}
                                            className="relative flex w-[260px] flex-col gap-2 pr-6"
                                        >
                                            <div className="absolute top-2 right-0 bottom-2 w-px bg-white/10" />

                                            <span
                                                className={cn(
                                                    "mb-3 px-4 font-semibold text-white/55 uppercase",
                                                    isKorean
                                                        ? "font-sans text-[14px] tracking-[0.12em]"
                                                        : "font-display text-[14px] tracking-[0.16em]"
                                                )}
                                            >
                                                {isKorean
                                                    ? currentContent.sectionLabel
                                                    : currentContent.sectionLabelEn}
                                            </span>

                                            {currentContent.categories.map((cat, idx) => (
                                                <button
                                                    key={cat.id}
                                                    onMouseEnter={() => handleCategoryEnter(idx)}
                                                    className={cn(
                                                        "flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left font-sans font-medium transition-colors duration-200",
                                                        isKorean
                                                            ? "text-[14px] tracking-[0.02em]"
                                                            : "text-[14px] tracking-[0.03em]",
                                                        activeCategoryIndex === idx
                                                            ? "text-marine-dark/90 border border-white/80 bg-white"
                                                            : "text-white/75 hover:bg-white/5 hover:text-white"
                                                    )}
                                                >
                                                    {isKorean ? cat.label : cat.labelEn}
                                                    {activeCategoryIndex === idx && (
                                                        <ChevronRight
                                                            size={16}
                                                            className="text-marine-dark/80"
                                                        />
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex-1 pl-10">
                                            <div
                                                ref={contentRef}
                                                className="flex items-start gap-8"
                                                style={{
                                                    willChange:
                                                        "opacity, transform, filter, clip-path",
                                                }}
                                            >
                                                <div className="flex flex-1 flex-col justify-start">
                                                    <h3 className="font-display mb-3 text-[28px] leading-snug font-semibold tracking-tight text-white">
                                                        {isKorean
                                                            ? currentCategory.title
                                                            : currentCategory.titleEn}
                                                    </h3>
                                                    <p className="mb-5 max-w-md font-sans text-[16px] leading-relaxed text-white/65">
                                                        {isKorean
                                                            ? currentCategory.desc
                                                            : currentCategory.descEn}
                                                    </p>
                                                    <Link
                                                        href={currentCategory.href}
                                                        className="hover:text-marine-dark group inline-flex w-fit -translate-x-1 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-[14px] font-semibold text-white/90 transition-colors duration-300 hover:bg-white"
                                                    >
                                                        Explore Details
                                                        <ChevronRight
                                                            size={18}
                                                            className="transition-transform group-hover:translate-x-1"
                                                        />
                                                    </Link>
                                                </div>

                                                <div className="relative h-[200px] w-[300px] shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                                                    <div
                                                        ref={imageRef}
                                                        className="absolute inset-0 bg-cover bg-center"
                                                        style={{
                                                            willChange:
                                                                "opacity, transform, filter",
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
