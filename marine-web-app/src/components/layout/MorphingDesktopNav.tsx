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
    const imageContainerRef = useRef<HTMLDivElement>(null);  // 이미지 컨테이너
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

    const handleMouseEnterNav = useCallback((tab: NavKey) => {
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
    }, [cancelClose, displayedTab]);

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
                    // 첫 오픈: 40% 느리게
                    gsap.set(panel, { height: 0 });
                    gsap.set(dimmer, { opacity: 0 });
                    gsap.to(dimmer, {
                        opacity: 1,
                        duration: 0.45,
                        ease: "power2.out",
                        delay: 0.12,
                        overwrite: "auto",
                    });
                    gsap.to(panel, {
                        height: targetHeight,
                        duration: 0.56,
                        ease: "power2.out",
                        overwrite: "auto",
                    });
                } else {
                    // 탭 전환: 40% 느리게
                    gsap.to(dimmer, {
                        opacity: 1,
                        duration: 0.28,
                        ease: "power2.out",
                        overwrite: "auto",
                    });
                    gsap.to(panel, {
                        height: targetHeight,
                        duration: 0.45,
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

                // 닫기: 40% 느리게
                tl.to(panel, {
                    height: 0,
                    duration: 0.42,
                    ease: "power2.inOut",
                    overwrite: "auto",
                }).to(
                    dimmer,
                    {
                        opacity: 0,
                        duration: 0.34,
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
            const sectionLabel = target.querySelector('span');
            const buttons = target.querySelectorAll('button');
            const divider = target.querySelector('.absolute'); // 구분선
            const elements = [sectionLabel, ...Array.from(buttons)].filter(Boolean);

            // 기존 트윈 정리
            elements.forEach(el => el && gsap.killTweensOf(el));
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

            // Stagger 애니메이션 - 1단계: 메뉴가 먼저 나타남 (40% 느리게)
            elements.forEach((el, index) => {
                if (el) {
                    gsap.to(el, {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.5,
                        ease: "power2.out",
                        delay: isOpening ? 0.12 + index * 0.055 : 0.04 + index * 0.045,
                        overwrite: "auto",
                        clearProps: "filter",
                    });
                }
            });

            // 구분선 페이드인
            if (divider) {
                gsap.fromTo(divider,
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
            const title = target.querySelector('h3');
            const desc = target.querySelector('p');
            const link = target.querySelector('a');
            const elements = [title, desc, link].filter(Boolean);

            // Always animate content transitions (both tab and category changes)
            elements.forEach(el => el && gsap.killTweensOf(el));
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

                // 2단계: 서브메뉴 - 메뉴 뒤에 시작 (40% 느리게, 320ms~)
                elements.forEach((el, index) => {
                    if (el) {
                        gsap.to(el, {
                            opacity: 1,
                            x: 0,
                            y: 0,
                            filter: "blur(0px)",
                            duration: 0.56,
                            ease: "power2.out",
                            delay: isOpening ? 0.32 + index * 0.08 : 0.12 + index * 0.07,
                            overwrite: "auto",
                            clearProps: "filter",
                        });
                    }
                });

                // 3단계: 이미지 컨테이너 + 이미지 (40% 느리게, blur+slide 스타일 통일)
                const imageContainer = imageContainerRef.current;

                // 이미지 컨테이너: 다른 요소들과 동일한 blur+slide 스타일
                if (imageContainer) {
                    gsap.killTweensOf(imageContainer);
                    gsap.set(imageContainer, {
                        opacity: 0,
                        x: -12,
                        y: -8,
                        filter: "blur(10px)",
                    });
                    gsap.to(imageContainer, {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.56,
                        ease: "power2.out",
                        delay: isOpening ? 0.52 : 0.24,
                        overwrite: "auto",
                        clearProps: "filter",
                    });
                }

                // 이미지: 컨테이너와 동일한 스타일
                if (image) {
                    gsap.set(image, {
                        opacity: 0,
                        x: -10,
                        y: -6,
                        filter: "blur(12px)",
                    });
                    gsap.to(image, {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.6,
                        ease: "power2.out",
                        delay: isOpening ? 0.58 : 0.28,
                        overwrite: "auto",
                        clearProps: "filter",
                    });
                }
            } else if (categoryChanged) {
                // Category change within same tab: Apple-style staggered reveal
                // Each element fades in from blur, moving from top-left to bottom-right
                // Like Apple's "촤라락" cascading effect

                // Get all animatable children inside contentRef
                const title = target.querySelector('h3');
                const desc = target.querySelector('p');
                const link = target.querySelector('a');
                const elements = [title, desc, link].filter(Boolean);

                // Kill any ongoing animations
                elements.forEach(el => el && gsap.killTweensOf(el));
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

                // Stagger animate each element (40% 느리게)
                elements.forEach((el, index) => {
                    if (el) {
                        gsap.to(el, {
                            opacity: 1,
                            x: 0,
                            y: 0,
                            filter: "blur(0px)",
                            duration: 0.5,
                            ease: "power2.out",
                            delay: 0.07 + index * 0.08,
                            overwrite: "auto",
                            clearProps: "filter",
                        });
                    }
                });

                // 이미지 컨테이너 + 이미지 (blur+slide 스타일 통일)
                const imageContainer = imageContainerRef.current;

                if (imageContainer) {
                    gsap.killTweensOf(imageContainer);
                    gsap.set(imageContainer, {
                        opacity: 0,
                        x: -10,
                        y: -6,
                        filter: "blur(8px)",
                    });
                    gsap.to(imageContainer, {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.5,
                        ease: "power2.out",
                        delay: 0.18,
                        overwrite: "auto",
                        clearProps: "filter",
                    });
                }

                if (image) {
                    gsap.set(image, {
                        opacity: 0,
                        x: -8,
                        y: -5,
                        filter: "blur(10px)",
                    });
                    gsap.to(image, {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.55,
                        ease: "power2.out",
                        delay: 0.22,
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
                    className="relative group px-1 text-center"
                    onMouseEnter={() => handleMouseEnterNav(tab as NavKey)}
                >
                    <Link
                        href={NAV_CONTENT[tab as NavKey].href}
                        onClick={handleCloseDropdown}
                        className={cn(
                            "relative z-20 py-4 font-medium uppercase block text-center",
                            isKorean
                                ? "text-[14px] tracking-[0.14em] font-sans"
                                : "text-[12px] tracking-[0.18em] font-display font-semibold",
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
                                    >
                                        <div className="absolute right-0 top-2 bottom-2 w-px bg-white/10" />

                                        <span
                                            className={cn(
                                                "font-semibold text-white/55 uppercase mb-3 px-4",
                                                isKorean
                                                    ? "text-[14px] tracking-[0.12em] font-sans"
                                                    : "text-[14px] tracking-[0.16em] font-display"
                                            )}
                                        >
                                            {isKorean ? currentContent.sectionLabel : currentContent.sectionLabelEn}
                                        </span>

                                        {currentContent.categories.map((cat, idx) => (
                                            <button
                                                key={cat.id}
                                                onMouseEnter={() => handleCategoryEnter(idx)}
                                                className={cn(
                                                    "w-full text-left px-4 py-2.5 rounded-xl font-medium transition-colors duration-200 flex items-center justify-between font-sans border",
                                                    isKorean
                                                        ? "text-[14px] tracking-[0.02em]"
                                                        : "text-[14px] tracking-[0.03em]",
                                                    activeCategoryIndex === idx
                                                        ? "bg-white text-marine-dark/90 border-white/80"
                                                        : "text-white/75 hover:text-white hover:bg-white/5 border-transparent"
                                                )}
                                            >
                                                {isKorean ? cat.label : cat.labelEn}
                                                {activeCategoryIndex === idx && (
                                                    <ChevronRight size={16} className="text-marine-dark/80" />
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* pt-[36px]: 왼쪽 섹션 라벨(EXPLORE SERVICES) 높이만큼 상단 여백 추가하여 첫 번째 메뉴와 제목 정렬 */}
                                    <div className="flex-1 pl-10 pt-[44px]">
                                        <div
                                            ref={contentRef}
                                            className="flex gap-8 items-start"
                                            style={{ willChange: "opacity, transform, filter, clip-path" }}
                                        >
                                            <div className="flex-1 flex flex-col justify-start">
                                                <h3 className="text-[28px] font-semibold text-white mb-3 font-display tracking-tight leading-snug">
                                                    {isKorean ? currentCategory.title : currentCategory.titleEn}
                                                </h3>
                                                <p className="text-white/65 text-[16px] leading-relaxed mb-5 max-w-md font-sans">
                                                    {isKorean ? currentCategory.desc : currentCategory.descEn}
                                                </p>
                                                <Link
                                                    href={currentCategory.href}
                                                    className="inline-flex items-center gap-3 text-[14px] font-semibold text-white/90 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 hover:bg-white hover:text-marine-dark transition-colors duration-300 group w-fit -translate-x-1"
                                                >
                                                    Explore Details
                                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>

                                            <div
                                                ref={imageContainerRef}
                                                className="w-[300px] h-[200px] rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 shrink-0"
                                            >
                                                <div
                                                    ref={imageRef}
                                                    className="absolute inset-0 bg-cover bg-center"
                                                    style={{
                                                        willChange: "opacity, transform, filter",
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
