"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
    {
        number: 20,
        suffix: "+",
        label: "Years of Excellence",
        description: "국내 해양조사의 선두주자"
    },
    {
        number: 500,
        suffix: "+",
        label: "Completed Projects",
        description: "글로벌 프로젝트 수행 경험"
    },
    {
        number: 2400,
        suffix: "B+",
        label: "Project Value (KRW)",
        description: "누적 프로젝트 수행 금액"
    },
    {
        number: 50,
        suffix: "+",
        label: "Expert Engineers",
        description: "산업기사 이상 전문 기술인력"
    },
];

function AnimatedNumber({
    target,
    suffix,
    inView
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
            {count.toLocaleString()}{suffix}
        </span>
    );
}

export function StatsShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            className="py-32 md:py-40 bg-gradient-to-b from-marine-dark via-[#050a10] to-marine-dark"
        >
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                        Proven Track Record
                    </h2>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto">
                        대한민국 해양조사 산업을 이끌어온 실적과 경험
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            className="relative group"
                        >
                            {/* Vertical Line */}
                            <motion.div
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                                className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-ocean-400/50 via-ocean-400/20 to-transparent origin-top"
                            />

                            <div className="pl-6">
                                {/* Number Label */}
                                <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-medium">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                {/* Main Number */}
                                <div className="mt-2 mb-4">
                                    <span className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-white">
                                        <AnimatedNumber
                                            target={stat.number}
                                            suffix={stat.suffix}
                                            inView={isInView}
                                        />
                                    </span>
                                </div>

                                {/* Label */}
                                <h3 className="text-sm md:text-base font-medium text-white/80 mb-1">
                                    {stat.label}
                                </h3>
                                <p className="text-xs text-white/40">
                                    {stat.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
