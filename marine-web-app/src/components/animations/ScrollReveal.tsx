"use client";

import { useRef, ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    stagger?: number;
}

export function ScrollReveal({
    children,
    className = "",
    stagger = 0.1,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!ref.current) return;

            // Animate direct children with stagger
            const items = ref.current.querySelectorAll(":scope > *");
            if (items.length === 0) return;

            gsap.from(items, {
                opacity: 0,
                y: 40,
                duration: 0.6,
                stagger,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        },
        { scope: ref, dependencies: [stagger] }
    );

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

interface ScrollRevealItemProps {
    children: ReactNode;
    className?: string;
}

/**
 * ScrollRevealItem - Use this inside ScrollReveal for individual item styling
 * The animation is handled by the parent ScrollReveal component
 */
export function ScrollRevealItem({
    children,
    className = "",
}: ScrollRevealItemProps) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}
