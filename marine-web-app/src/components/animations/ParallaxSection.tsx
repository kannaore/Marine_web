"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxSectionProps {
    children: ReactNode;
    className?: string;
    speed?: number;
    bgImage?: string;
    overlay?: boolean;
}

export function ParallaxSection({
    children,
    className = "",
    speed = 0.5,
    bgImage,
    overlay = true,
}: ParallaxSectionProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 30}%`]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

    return (
        <section ref={ref} className={`relative overflow-hidden ${className}`}>
            {bgImage && (
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 -top-[20%] -bottom-[20%] w-full h-[140%]"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${bgImage})` }}
                    />
                    {overlay && (
                        <div className="absolute inset-0 bg-gradient-to-b from-marine-dark/80 via-marine-dark/60 to-marine-dark/80" />
                    )}
                </motion.div>
            )}
            <motion.div style={{ opacity }} className="relative z-10">
                {children}
            </motion.div>
        </section>
    );
}
