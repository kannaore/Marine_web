"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const BOKEH_COUNT = 6;

interface BokehCircle {
    id: number;
    width: number;
    height: number;
    initialX: string;
    initialY: string;
    scale: number;
    color: string;
    duration: number;
    targetX: string[];
    targetY: string[];
}

export function BokehBackground() {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Generate stable random values on mount
    const bokehCircles = useMemo<BokehCircle[]>(() => {
        return [...Array(BOKEH_COUNT)].map((_, i) => ({
            id: i,
            width: Math.random() * 400 + 300,
            height: Math.random() * 400 + 300,
            initialX: Math.random() * 100 + "%",
            initialY: Math.random() * 100 + "%",
            scale: Math.random() * 1 + 0.5,
            color:
                i % 3 === 0
                    ? "var(--color-ocean-400)"
                    : i % 3 === 1
                      ? "var(--color-accent-purple)"
                      : "var(--color-accent-cyan)",
            duration: Math.random() * 20 + 20,
            targetX: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
            ],
            targetY: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
            ],
        }));
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    useGSAP(
        () => {
            if (!containerRef.current || !mounted) return;

            const circles = containerRef.current.querySelectorAll(".bokeh-circle");

            circles.forEach((circle, i) => {
                const bokeh = bokehCircles[i];
                if (!bokeh) return;

                // Create infinite animation loop
                const tl = gsap.timeline({ repeat: -1 });

                bokeh.targetX.forEach((x, j) => {
                    tl.to(circle, {
                        left: x,
                        top: bokeh.targetY[j],
                        duration: bokeh.duration / 3,
                        ease: "none",
                    });
                });
            });
        },
        { scope: containerRef, dependencies: [mounted, bokehCircles] }
    );

    if (!mounted) return null;

    return (
        <div ref={containerRef} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            {/* Base gradient layer */}
            <div className="bg-marine-dark absolute inset-0" />

            {/* Animated Bokeh Circles */}
            {bokehCircles.map((bokeh) => (
                <div
                    key={bokeh.id}
                    className="bokeh-circle absolute rounded-full opacity-[0.15] blur-[120px] will-change-transform"
                    style={{
                        width: bokeh.width + "px",
                        height: bokeh.height + "px",
                        left: bokeh.initialX,
                        top: bokeh.initialY,
                        transform: `scale(${bokeh.scale})`,
                        background: bokeh.color,
                    }}
                />
            ))}

            {/* Subtle noise or texture overlay if needed, currently keeping it clean */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(5,11,20,0)_0%,rgba(5,11,20,0.5)_100%)]" />
        </div>
    );
}
