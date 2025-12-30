"use client";

import { useRef, ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface FadeInProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    duration?: number;
    className?: string;
}

const directionConfig = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
};

export function FadeIn({
    children,
    direction = "up",
    delay = 0,
    duration = 0.8,
    className = "",
}: FadeInProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!ref.current) return;

            const offset = directionConfig[direction];

            gsap.from(ref.current, {
                opacity: 0,
                ...offset,
                delay,
                duration,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        },
        { scope: ref, dependencies: [direction, delay, duration] }
    );

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
