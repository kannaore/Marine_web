"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const stats = [
    {
        number: 20,
        suffix: "+",
        label: "Years of Excellence",
        description: "국내 해양조사의 선두주자",
    },
    {
        number: 500,
        suffix: "+",
        label: "Completed Projects",
        description: "글로벌 프로젝트 수행 경험",
    },
    {
        number: 2400,
        suffix: "B+",
        label: "Project Value (KRW)",
        description: "누적 프로젝트 수행 금액",
    },
    {
        number: 50,
        suffix: "+",
        label: "Expert Engineers",
        description: "산업기사 이상 전문 기술인력",
    },
];

function AnimatedNumber({
    target,
    suffix,
    inView,
}: {
    target: number;
    suffix: string;
    inView: boolean;
}) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (inView && !hasAnimated.current) {
            hasAnimated.current = true;
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    setCount(target);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [inView, target]);

    return (
        <span className="tabular-nums">
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}

export function StatsShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            // Header animation
            if (headerRef.current) {
                gsap.from(headerRef.current, {
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                });
            }

            // Stats items animation
            const items = sectionRef.current.querySelectorAll(".stat-item");
            items.forEach((item, index) => {
                gsap.from(item, {
                    opacity: 0,
                    y: 50,
                    duration: 0.6,
                    delay: index * 0.15,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play none none none",
                    },
                });

                // Vertical line animation
                const line = item.querySelector(".stat-line");
                if (line) {
                    gsap.from(line, {
                        scaleY: 0,
                        duration: 0.5,
                        delay: index * 0.15 + 0.3,
                        transformOrigin: "top",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 75%",
                            toggleActions: "play none none none",
                        },
                    });
                }
            });

            // Trigger number counting
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 70%",
                once: true,
                onEnter: () => setIsInView(true),
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="from-marine-dark to-marine-dark bg-gradient-to-b via-[#050a10] py-32 md:py-40"
        >
            <div className="container-custom">
                {/* Section Header */}
                <div ref={headerRef} className="mb-20 text-center">
                    <h2 className="font-display mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
                        Proven Track Record
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-white/50">
                        대한민국 해양조사 산업을 이끌어온 실적과 경험
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <div key={stat.label} className="stat-item group relative">
                            {/* Vertical Line */}
                            <div className="stat-line from-ocean-400/50 via-ocean-400/20 absolute top-0 left-0 h-full w-px bg-gradient-to-b to-transparent" />

                            <div className="pl-6">
                                {/* Number Label */}
                                <span className="text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                {/* Main Number */}
                                <div className="mt-2 mb-4">
                                    <span className="font-display text-5xl font-light text-white md:text-6xl lg:text-7xl">
                                        <AnimatedNumber
                                            target={stat.number}
                                            suffix={stat.suffix}
                                            inView={isInView}
                                        />
                                    </span>
                                </div>

                                {/* Label */}
                                <h3 className="mb-1 text-sm font-medium text-white/80 md:text-base">
                                    {stat.label}
                                </h3>
                                <p className="text-xs text-white/40">{stat.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
