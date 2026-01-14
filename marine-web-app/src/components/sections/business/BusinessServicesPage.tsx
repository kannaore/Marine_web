"use client";

import { useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { gsap, useGSAP } from "@/lib/gsap";
import { ChevronDown } from "lucide-react";
import { SentenceReveal } from "./SentenceReveal";
import { BusinessNav } from "./BusinessNav";
import { BusinessMenuPopup } from "./BusinessMenuPopup";

import "swiper/css";
import "swiper/css/effect-fade";

// 마린리서치 서비스 데이터 (6개 카테고리)
const servicesData = [
    {
        id: 1,
        title: "Offshore Wind",
        titleKo: "해상풍력",
        description: [
            "해상풍력발전단지 건설을 위한",
            "종합적인 해양조사 서비스를 제공합니다.",
        ],
        gradient: "from-ocean-600 via-ocean-700 to-marine-dark",
        accentColor: "ocean-500",
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
    },
    {
        id: 3,
        title: "Hydrographic Survey",
        titleKo: "수로조사",
        description: [
            "정밀 수심 측량과 해도 제작을 위한",
            "통합 수로조사 서비스입니다.",
        ],
        gradient: "from-accent-purple via-ocean-800 to-marine-dark",
        accentColor: "accent-purple",
    },
    {
        id: 4,
        title: "Physical Oceanography",
        titleKo: "해양물리조사",
        description: [
            "물리환경 데이터를 기반으로",
            "해양 프로젝트의 리스크를 줄입니다.",
        ],
        gradient: "from-accent-cyan via-ocean-600 to-marine-dark",
        accentColor: "accent-cyan",
    },
    {
        id: 5,
        title: "Fisheries Resources Survey",
        titleKo: "수산자원조사",
        description: [
            "어장 환경과 자원 평가를 통해",
            "지속 가능한 관리 기반을 제공합니다.",
        ],
        gradient: "from-ocean-500 via-ocean-700 to-marine-dark",
        accentColor: "ocean-400",
    },
    {
        id: 6,
        title: "Research & Development",
        titleKo: "R&D",
        description: [
            "해양조사 기술 혁신을 위한",
            "연구개발 활동입니다.",
        ],
        gradient: "from-ocean-800 via-accent-blue to-marine-dark",
        accentColor: "accent-blue",
    },
];

// Animated gradient background component
function AnimatedGradientBackground({ gradient, isActive }: { gradient: string; isActive: boolean }) {
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!bgRef.current || !isActive) return;

        // Subtle animation for gradient
        gsap.to(bgRef.current, {
            backgroundPosition: "100% 100%",
            duration: 15,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    }, { scope: bgRef, dependencies: [isActive] });

    return (
        <div
            ref={bgRef}
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`}
            style={{ backgroundSize: "200% 200%", backgroundPosition: "0% 0%" }}
        />
    );
}

export function BusinessServicesPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const dataSwiperRef = useRef<SwiperType | null>(null);
    const bgSwiperRef = useRef<SwiperType | null>(null);

    // Initialize and show content
    useGSAP(() => {
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
    }, { scope: containerRef });

    // Sync swipers
    const handleSlideChange = useCallback((swiper: SwiperType) => {
        setActiveIndex(swiper.activeIndex);
        if (bgSwiperRef.current && bgSwiperRef.current.activeIndex !== swiper.activeIndex) {
            bgSwiperRef.current.slideTo(swiper.activeIndex);
        }
        if (dataSwiperRef.current && dataSwiperRef.current.activeIndex !== swiper.activeIndex) {
            dataSwiperRef.current.slideTo(swiper.activeIndex);
        }
    }, []);

    const handleMenuItemClick = useCallback((index: number) => {
        if (dataSwiperRef.current) {
            dataSwiperRef.current.slideTo(index);
        }
        setIsMenuOpen(false);
    }, []);

    return (
        <div ref={containerRef} className="business-wrap" style={{ opacity: 0 }}>
            {/* Background Layer */}
            <div className={`business-view ${isReady ? "ready" : ""}`}>
                <div className="business-video">
                    <Swiper
                        modules={[EffectFade]}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        speed={1600}
                        allowTouchMove={false}
                        onSwiper={(swiper) => { bgSwiperRef.current = swiper; }}
                        className="h-full w-full"
                    >
                        {servicesData.map((service, index) => (
                            <SwiperSlide key={service.id}>
                                <div className="video-wrap relative h-full w-full">
                                    {/* Animated Gradient Background */}
                                    <AnimatedGradientBackground
                                        gradient={service.gradient}
                                        isActive={index === activeIndex}
                                    />
                                    {/* Noise texture overlay */}
                                    <div
                                        className="absolute inset-0 opacity-20"
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                                        }}
                                    />
                                    {/* Dark overlay for text readability */}
                                    <div className="absolute inset-0 bg-marine-dark/30" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Content Data Layer */}
                <div className="business-data">
                    <Swiper
                        modules={[EffectFade]}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        speed={1600}
                        onSwiper={(swiper) => { dataSwiperRef.current = swiper; }}
                        onSlideChange={handleSlideChange}
                        className="h-full w-full"
                    >
                        {servicesData.map((service) => (
                            <SwiperSlide key={service.id}>
                                <div className="item-data">
                                    <div className="inner">
                                        <SentenceReveal
                                            as="h3"
                                            text={service.title}
                                            isActive={servicesData[activeIndex]?.id === service.id}
                                        />
                                        <div className="item-desc">
                                            <SentenceReveal
                                                text={service.description}
                                                isActive={servicesData[activeIndex]?.id === service.id}
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
                <button className="btn-split" onClick={() => dataSwiperRef.current?.slideNext()}>
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
        </div>
    );
}
