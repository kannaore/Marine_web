"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const capabilities = [
    {
        id: "geophysical",
        title: "Geophysical Survey",
        titleKo: "지구물리탐사",
        description: "High-resolution seafloor mapping using state-of-the-art multibeam echosounders, side-scan sonar, magnetometers, and sub-bottom profilers.",
        features: ["Multibeam Bathymetry", "Side-scan Sonar", "Sub-bottom Profiler", "Magnetometer Survey"],
        image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1200&q=80",
    },
    {
        id: "geotechnical",
        title: "Geotechnical Investigation",
        titleKo: "지반조사",
        description: "Comprehensive seabed characterization through CPT testing, vibrocoring, borehole drilling, and laboratory analysis.",
        features: ["CPT/PCPT Testing", "Vibrocoring", "Borehole Drilling", "Lab Analysis"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    },
    {
        id: "environmental",
        title: "Environmental Monitoring",
        titleKo: "해양환경 모니터링",
        description: "Real-time monitoring of ocean conditions using ADCP, CTD profilers, and water quality sensors for comprehensive environmental assessment.",
        features: ["ADCP Current Measurement", "CTD Profiling", "Water Quality", "Tide Gauge"],
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80",
    },
    {
        id: "offshore-wind",
        title: "Offshore Wind Survey",
        titleKo: "해상풍력 조사",
        description: "Complete site characterization for offshore wind farms including turbine positioning, cable routing, and environmental impact assessment.",
        features: ["Site Assessment", "Cable Route Survey", "Foundation Design", "EIA Support"],
        image: "https://images.unsplash.com/photo-1466629437334-b4f6603563c5?w=1200&q=80",
    },
];

export function CapabilitiesSection() {
    const containerRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section
            ref={containerRef}
            className="relative bg-marine-dark"
        >
            {/* Sticky Container */}
            <div className="sticky top-0 min-h-screen flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    {capabilities.map((cap, index) => (
                        <motion.div
                            key={cap.id}
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: activeIndex === index ? 1 : 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Image
                                src={cap.image}
                                alt={cap.title}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-marine-dark via-marine-dark/80 to-transparent" />
                        </motion.div>
                    ))}
                </div>

                {/* Content */}
                <div className="relative z-10 container-custom py-20">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left - Text Content */}
                        <div>
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-xs tracking-[0.3em] uppercase text-ocean-400 font-medium"
                            >
                                Our Capabilities
                            </motion.span>

                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1, duration: 0.6 }}
                                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-8"
                            >
                                End-to-End<br />
                                Marine Solutions
                            </motion.h2>

                            {/* Capability List */}
                            <div className="space-y-4">
                                {capabilities.map((cap, index) => (
                                    <motion.button
                                        key={cap.id}
                                        onClick={() => setActiveIndex(index)}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                                        className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${activeIndex === index
                                                ? "border-ocean-400/50 bg-ocean-400/10"
                                                : "border-white/5 bg-white/5 hover:border-white/10"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className={`text-lg font-medium transition-colors ${activeIndex === index ? "text-ocean-400" : "text-white"
                                                }`}>
                                                {cap.title}
                                            </h3>
                                            <span className="text-xs text-white/40">
                                                {cap.titleKo}
                                            </span>
                                        </div>

                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: activeIndex === index ? "auto" : 0,
                                                opacity: activeIndex === index ? 1 : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-sm text-white/60 mb-4">
                                                {cap.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {cap.features.map((feature) => (
                                                    <span
                                                        key={feature}
                                                        className="px-3 py-1 text-xs bg-white/10 rounded-full text-white/70"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </motion.button>
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
