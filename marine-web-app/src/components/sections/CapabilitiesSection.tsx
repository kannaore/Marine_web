"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Image from "next/image";

const capabilities = [
    {
        id: "geophysical",
        title: "Geophysical Survey",
        titleKo: "지구물리탐사",
        description:
            "High-resolution seafloor mapping using state-of-the-art multibeam echosounders, side-scan sonar, magnetometers, and sub-bottom profilers.",
        features: [
            "Multibeam Bathymetry",
            "Side-scan Sonar",
            "Sub-bottom Profiler",
            "Magnetometer Survey",
        ],
        image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1200&q=80",
    },
    {
        id: "geotechnical",
        title: "Geotechnical Investigation",
        titleKo: "지반조사",
        description:
            "Comprehensive seabed characterization through CPT testing, vibrocoring, borehole drilling, and laboratory analysis.",
        features: ["CPT/PCPT Testing", "Vibrocoring", "Borehole Drilling", "Lab Analysis"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    },
    {
        id: "environmental",
        title: "Environmental Monitoring",
        titleKo: "해양환경 모니터링",
        description:
            "Real-time monitoring of ocean conditions using ADCP, CTD profilers, and water quality sensors for comprehensive environmental assessment.",
        features: ["ADCP Current Measurement", "CTD Profiling", "Water Quality", "Tide Gauge"],
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80",
    },
    {
        id: "offshore-wind",
        title: "Offshore Wind Survey",
        titleKo: "해상풍력 조사",
        description:
            "Complete site characterization for offshore wind farms including turbine positioning, cable routing, and environmental impact assessment.",
        features: ["Site Assessment", "Cable Route Survey", "Foundation Design", "EIA Support"],
        image: "https://images.unsplash.com/photo-1466629437334-b4f6603563c5?w=1200&q=80",
    },
];

export function CapabilitiesSection() {
    const containerRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
    const detailRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Background fade animation
    useEffect(() => {
        if (!isClient) return;

        bgRefs.current.forEach((bg, index) => {
            if (bg) {
                gsap.to(bg, {
                    opacity: activeIndex === index ? 1 : 0,
                    duration: 0.8,
                });
            }
        });

        // Animate detail expansion
        detailRefs.current.forEach((detail, index) => {
            if (detail) {
                if (activeIndex === index) {
                    gsap.to(detail, {
                        height: "auto",
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                } else {
                    gsap.to(detail, {
                        height: 0,
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                }
            }
        });
    }, [activeIndex, isClient]);

    useGSAP(
        () => {
            if (!containerRef.current || !isClient) return;

            // Stagger entrance animation
            const buttons = containerRef.current.querySelectorAll(".capability-button");
            gsap.from(buttons, {
                opacity: 0,
                x: -30,
                stagger: 0.1,
                duration: 0.5,
                delay: 0.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        },
        { scope: containerRef, dependencies: [isClient] }
    );

    return (
        <section ref={containerRef} className="bg-marine-dark relative">
            {/* Sticky Container */}
            <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    {capabilities.map((cap, index) => (
                        <div
                            key={cap.id}
                            ref={(el) => {
                                bgRefs.current[index] = el;
                            }}
                            className="absolute inset-0"
                            style={{ opacity: index === 0 ? 1 : 0 }}
                        >
                            <Image
                                src={cap.image}
                                alt={cap.title}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                            <div className="from-marine-dark via-marine-dark/80 absolute inset-0 bg-gradient-to-r to-transparent" />
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="container-custom relative z-10 py-20">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        {/* Left - Text Content */}
                        <div>
                            <span className="text-ocean-400 text-xs font-medium tracking-[0.3em] uppercase">
                                Our Capabilities
                            </span>

                            <h2 className="font-display mt-4 mb-8 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                                End-to-End
                                <br />
                                Marine Solutions
                            </h2>

                            {/* Capability List */}
                            <div className="space-y-4">
                                {capabilities.map((cap, index) => (
                                    <button
                                        key={cap.id}
                                        onClick={() => setActiveIndex(index)}
                                        className={`capability-button w-full rounded-xl border p-6 text-left transition-all duration-300 ${
                                            activeIndex === index
                                                ? "border-ocean-400/50 bg-ocean-400/10"
                                                : "border-white/5 bg-white/5 hover:border-white/10"
                                        }`}
                                    >
                                        <div className="mb-2 flex items-center justify-between">
                                            <h3
                                                className={`text-lg font-medium transition-colors ${
                                                    activeIndex === index
                                                        ? "text-ocean-400"
                                                        : "text-white"
                                                }`}
                                            >
                                                {cap.title}
                                            </h3>
                                            <span className="text-xs text-white/40">
                                                {cap.titleKo}
                                            </span>
                                        </div>

                                        <div
                                            ref={(el) => {
                                                detailRefs.current[index] = el;
                                            }}
                                            className="overflow-hidden"
                                            style={{
                                                height: index === 0 ? "auto" : 0,
                                                opacity: index === 0 ? 1 : 0,
                                            }}
                                        >
                                            <p className="mb-4 text-sm text-white/60">
                                                {cap.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {cap.features.map((feature) => (
                                                    <span
                                                        key={feature}
                                                        className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right - Empty for image display */}
                        <div className="hidden lg:block" />
                    </div>
                </div>
            </div>

            {/* Scroll Space */}
            <div className="h-[100vh]" />
        </section>
    );
}
