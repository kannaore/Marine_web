"use client";

import { useRef, ReactNode, useEffect, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

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
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useGSAP(
        () => {
            if (!sectionRef.current || !isClient) return;

            // Parallax effect for background
            if (bgRef.current) {
                gsap.to(bgRef.current, {
                    yPercent: speed * 30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }

            // Opacity fade for content
            if (contentRef.current) {
                gsap.fromTo(
                    contentRef.current,
                    { opacity: 0.6 },
                    {
                        opacity: 1,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "center center",
                            scrub: true,
                        },
                    }
                );

                // Fade out when leaving
                gsap.to(contentRef.current, {
                    opacity: 0.6,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "center center",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }
        },
        { scope: sectionRef, dependencies: [speed, isClient] }
    );

    return (
        <section ref={sectionRef} className={`relative overflow-hidden ${className}`}>
            {bgImage && (
                <div
                    ref={bgRef}
                    className="absolute inset-0 -top-[20%] -bottom-[20%] h-[140%] w-full"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${bgImage})` }}
                    />
                    {overlay && (
                        <div className="from-marine-dark/80 via-marine-dark/60 to-marine-dark/80 absolute inset-0 bg-gradient-to-b" />
                    )}
                </div>
            )}
            <div ref={contentRef} className="relative z-10">
                {children}
            </div>
        </section>
    );
}
