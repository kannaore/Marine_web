"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { gsap, useGSAP } from "@/lib/gsap";
import { ChevronDown } from "lucide-react";
import { SentenceReveal } from "./SentenceReveal";
import { BusinessNav } from "./BusinessNav";
import { BusinessMenuPopup } from "./BusinessMenuPopup";
import { BusinessDetailPopup } from "./BusinessDetailPopup";
import { useAnimationConfig } from "@/hooks/useAnimationConfig";

import "swiper/css";

// 마린리서치 서비스 데이터 (6개 카테고리)
const servicesData = [
    {
        id: 1,
        title: "Offshore Wind",
        titleKo: "해상풍력",
        description: ["해상풍력발전단지 건설을 위한", "종합적인 해양조사 서비스를 제공합니다."],
        gradient: "from-ocean-600 via-ocean-700 to-marine-dark",
        accentColor: "ocean-500",
        imageSrc: "/images/services/offshore-wind.jpg",
        thumbnailSrc: "/images/services/menu/business-menu-visual-1.jpg",
        videoSrc: "/images/services/bg/business-visual-1.mp4",
    },
    {
        id: 2,
        title: "Geophysical Survey",
        titleKo: "지구물리조사",
        description: [
            "최첨단 멀티빔 음향측심기, 사이드스캔소나,",
            "서브바텀프로파일러를 활용합니다.",
        ],
        gradient: "from-accent-blue via-ocean-600 to-marine-dark",
        accentColor: "accent-blue",
        imageSrc: "/images/services/geophysical.jpg",
        thumbnailSrc: "/images/services/menu/business-menu-visual-3.jpg",
        videoSrc: "/images/services/bg/business-visual-3.mp4",
        videoSrcMobile: "/images/services/bg/business-visual-3-mo.mp4",
    },
    {
        id: 3,
        title: "Hydrographic Survey",
        titleKo: "수로조사",
        description: ["정밀 수심 측량과 해도 제작을 위한", "통합 수로조사 서비스입니다."],
        gradient: "from-accent-purple via-ocean-800 to-marine-dark",
        accentColor: "accent-purple",
        imageSrc: "/images/services/hydrographic.jpg",
        thumbnailSrc: "/images/services/menu/business-menu-visual-4.jpg",
        videoSrc: "/images/services/bg/business-visual-4.mp4",
        videoSrcMobile: "/images/services/bg/business-visual-4-mo.mp4",
    },
    {
        id: 4,
        title: "Physical Oceanography",
        titleKo: "해양물리조사",
        description: ["물리환경 데이터를 기반으로", "해양 프로젝트의 리스크를 줄입니다."],
        gradient: "from-accent-cyan via-ocean-600 to-marine-dark",
        accentColor: "accent-cyan",
        imageSrc: "/images/services/oceanography.jpg",
        thumbnailSrc: "/images/services/menu/business-menu-visual-5.jpg",
        videoSrc: "/images/services/bg/business-visual-5.mp4",
        videoSrcMobile: "/images/services/bg/business-visual-5-mo.mp4",
    },
    {
        id: 5,
        title: "Fisheries Resources Survey",
        titleKo: "수산자원조사",
        description: ["어장 환경과 자원 평가를 통해", "지속 가능한 관리 기반을 제공합니다."],
        gradient: "from-ocean-500 via-ocean-700 to-marine-dark",
        accentColor: "ocean-400",
        imageSrc: "/images/services/fisheries.jpg",
        thumbnailSrc: "/images/services/menu/business-menu-visual-6.jpg",
        videoSrc: "/images/services/bg/business-visual-6.mp4",
    },
    {
        id: 6,
        title: "Research & Development",
        titleKo: "R&D",
        description: ["해양조사 기술 혁신을 위한", "연구개발 활동입니다."],
        gradient: "from-ocean-800 via-accent-blue to-marine-dark",
        accentColor: "accent-blue",
        imageSrc: "/images/services/research.jpg",
        thumbnailSrc: "/images/services/menu/business-menu-visual-1.jpg",
    },
];

// Animated gradient background component (fallback)
function AnimatedGradientBackground({
    gradient,
    isActive,
}: {
    gradient: string;
    isActive: boolean;
}) {
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!bgRef.current || !isActive) return;

            // Subtle animation for gradient
            gsap.to(bgRef.current, {
                backgroundPosition: "100% 100%",
                duration: 15,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        },
        { scope: bgRef, dependencies: [isActive] }
    );

    return (
        <div
            ref={bgRef}
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`}
            style={{ backgroundSize: "200% 200%", backgroundPosition: "0% 0%" }}
        />
    );
}

// Video background component with fallback to ImageBackground
function VideoBackground({
    videoSrc,
    videoSrcMobile,
    imageSrc,
    gradient,
    isActive,
}: {
    videoSrc?: string;
    videoSrcMobile?: string;
    imageSrc?: string;
    gradient: string;
    isActive: boolean;
}) {
    const [hasError, setHasError] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const currentSrc = isMobile && videoSrcMobile ? videoSrcMobile : videoSrc;

    // 비디오 없거나 에러 시 ImageBackground 폴백
    if (!currentSrc || hasError) {
        return <ImageBackground imageSrc={imageSrc} gradient={gradient} isActive={isActive} />;
    }

    return (
        <video
            className="absolute inset-0 h-full w-full object-cover"
            src={currentSrc}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setHasError(true)}
        />
    );
}

// Image background component with Ken Burns effect
function ImageBackground({
    imageSrc,
    gradient,
    isActive,
}: {
    imageSrc?: string;
    gradient: string;
    isActive: boolean;
}) {
    const imgRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!imgRef.current || !isActive) return;

            // Subtle Ken Burns zoom effect
            gsap.fromTo(
                imgRef.current,
                { scale: 1.0 },
                {
                    scale: 1.05,
                    duration: 20,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                }
            );
        },
        { scope: imgRef, dependencies: [isActive] }
    );

    // If no image, fall back to gradient
    if (!imageSrc) {
        return <AnimatedGradientBackground gradient={gradient} isActive={isActive} />;
    }

    return (
        <>
            <div
                ref={imgRef}
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            {/* Gradient overlay for color tinting */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40`} />
        </>
    );
}

export function BusinessServicesPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [bgSwiper, setBgSwiper] = useState<SwiperType | null>(null);
    const [dataSwiper, setDataSwiper] = useState<SwiperType | null>(null);

    // Animation config from leva (debug controls)
    const { swiperSpeed, wheelThreshold, wheelDecay } = useAnimationConfig();

    // Wheel scroll state (simpac-style accumulator pattern)
    const wheelAccum = useRef(0);
    const wheelLastT = useRef(0);

    // Detect touch device on mount
    useEffect(() => {
        setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }, []);

    // Wheel event handler (simpac-identical logic)
    const handleWheel = useCallback(
        (e: WheelEvent) => {
            // Guard: ensure Swipers are initialized
            if (!(dataSwiper as any)?.initialized || !(bgSwiper as any)?.initialized) {
                return;
            }

            // Block during transition or when popups are open
            if (dataSwiper?.animating || bgSwiper?.animating || isMenuOpen || isDetailOpen) {
                console.log("[Swiper] Wheel blocked:", {
                    dataAnimating: dataSwiper?.animating,
                    bgAnimating: bgSwiper?.animating,
                    isMenuOpen,
                    isDetailOpen,
                });
                e.preventDefault();
                return;
            }

            // Normalize to pixels (deltaMode 1 = lines → ~16px per line)
            const dy = (e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY) || 0;

            // Accumulate with decay reset
            const now = performance.now();
            if (now - wheelLastT.current > wheelDecay) wheelAccum.current = 0;
            wheelLastT.current = now;
            wheelAccum.current += dy;

            // Below threshold - just prevent default and wait
            if (Math.abs(wheelAccum.current) < wheelThreshold) {
                e.preventDefault();
                return;
            }

            e.preventDefault();

            if (wheelAccum.current > 0) {
                dataSwiper?.slideNext(swiperSpeed);
                bgSwiper?.slideNext(swiperSpeed);
            } else {
                dataSwiper?.slidePrev(swiperSpeed);
                bgSwiper?.slidePrev(swiperSpeed);
            }

            // Reset accumulator after action
            wheelAccum.current = 0;
            console.log("[Swiper] Transition started, realIndex:", dataSwiper?.realIndex);
        },
        [wheelThreshold, wheelDecay, isMenuOpen, isDetailOpen, dataSwiper, bgSwiper, swiperSpeed]
    );

    // Register wheel event listener
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Use passive: false to allow preventDefault
        container.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
        };
    }, [handleWheel]);

    // Initialize and show content
    useGSAP(
        () => {
            if (!containerRef.current) return;

            const tl = gsap.timeline({
                delay: 0.3,
                onComplete: () => setIsReady(true),
            });

            tl.to(containerRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
            });
        },
        { scope: containerRef }
    );

    const handleSlideChange = useCallback((swiper: SwiperType) => {
        const newIndex = swiper.realIndex;
        console.log("[Swiper] SlideChange:", { realIndex: newIndex });
        setActiveIndex(newIndex);
    }, []);

    const handleSlideChangeTransitionEnd = useCallback(() => {
        console.log("[Swiper] TransitionEnd fired");
    }, []);

    const handleMenuItemClick = useCallback(
        (index: number) => {
            dataSwiper?.slideToLoop(index, swiperSpeed);
            bgSwiper?.slideToLoop(index, swiperSpeed);
            setIsMenuOpen(false);
        },
        [dataSwiper, bgSwiper, swiperSpeed]
    );

    return (
        <div ref={containerRef} className="business-wrap" style={{ opacity: 0 }}>
            {/* Background Layer */}
            <div className={`business-view ${isReady ? "ready" : ""}`}>
                <div className="business-video">
                    <Swiper
                        speed={swiperSpeed}
                        loop={true}
                        loopAdditionalSlides={2}
                        allowTouchMove={isTouchDevice}
                        onSwiper={setBgSwiper}
                        onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
                        className="h-full w-full"
                    >
                        {servicesData.map((service, index) => (
                            <SwiperSlide key={service.id}>
                                <div className="video-wrap relative h-full w-full">
                                    {/* Video Background with image fallback */}
                                    <VideoBackground
                                        videoSrc={service.videoSrc}
                                        videoSrcMobile={service.videoSrcMobile}
                                        imageSrc={service.imageSrc}
                                        gradient={service.gradient}
                                        isActive={index === activeIndex}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Content Data Layer */}
                <div className="business-data">
                    <Swiper
                        speed={swiperSpeed}
                        loop={true}
                        loopAdditionalSlides={2}
                        allowTouchMove={isTouchDevice}
                        onSwiper={setDataSwiper}
                        onSlideChange={handleSlideChange}
                        onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
                        className="h-full w-full"
                    >
                        {servicesData.map((service) => (
                            <SwiperSlide key={service.id}>
                                <div className={`item-data item-${service.id}`}>
                                    <div className="inner">
                                        <SentenceReveal
                                            as="h3"
                                            text={service.title}
                                            isActive={servicesData[activeIndex]?.id === service.id}
                                        />
                                        <div className="item-desc">
                                            <SentenceReveal
                                                text={service.description}
                                                isActive={
                                                    servicesData[activeIndex]?.id === service.id
                                                }
                                                delay={0.2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Navigation Controls */}
            <BusinessNav
                services={servicesData}
                activeIndex={activeIndex}
                isReady={isReady}
                onMenuOpen={() => setIsMenuOpen(true)}
                onLearnMore={() => setIsDetailOpen(true)}
            />

            {/* Scroll Indicator */}
            <div className={`nav-scroller ${isReady ? "open" : ""}`}>
                <button className="btn-split" onClick={() => dataSwiper?.slideNext(swiperSpeed)}>
                    <span>Scroll to explore</span>
                    <ChevronDown size={16} />
                </button>
            </div>

            {/* Menu Popup */}
            <BusinessMenuPopup
                services={servicesData}
                activeIndex={activeIndex}
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onItemClick={handleMenuItemClick}
            />

            {/* Detail Popup */}
            <BusinessDetailPopup
                service={servicesData[activeIndex]}
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
            />
        </div>
    );
}
