"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface GSAPProviderProps {
    children: React.ReactNode;
}

export function GSAPProvider({ children }: GSAPProviderProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Configure GSAP defaults for smooth animations
        gsap.defaults({
            ease: "power2.out",
            duration: 0.8,
        });

        // Configure ScrollTrigger defaults
        ScrollTrigger.defaults({
            toggleActions: "play none none reverse",
            start: "top 80%",
            end: "bottom 20%",
        });

        // Add smooth scroll behavior via CSS (free alternative to ScrollSmoother)
        document.documentElement.style.scrollBehavior = "smooth";

        // Refresh ScrollTrigger on resize
        const handleResize = () => {
            ScrollTrigger.refresh();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            ScrollTrigger.killAll();
        };
    }, []);

    return (
        <div ref={containerRef} className="gsap-container">
            {children}
        </div>
    );
}
