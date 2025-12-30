"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Scroll-based parallax effects
    useGSAP(
        () => {
            if (!sectionRef.current || !isClient) return;

            // Background parallax
            if (bgRef.current) {
                gsap.to(bgRef.current, {
                    yPercent: 40,
                    scale: 1.15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }

            // Content fade out and parallax
            if (contentRef.current) {
                gsap.to(contentRef.current, {
                    opacity: 0,
                    yPercent: 100,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "50% top",
                        scrub: true,
                    },
                });
            }
        },
        { scope: sectionRef, dependencies: [isClient] }
    );

    // Initial entrance animations
    useGSAP(
        () => {
            if (!isClient) return;

            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

            if (badgeRef.current) {
                tl.from(badgeRef.current, { opacity: 0, y: 30, duration: 0.8 }, 0);
            }
            if (titleRef.current) {
                tl.from(titleRef.current, { opacity: 0, y: 40, duration: 0.8 }, 0.2);
            }
            if (descRef.current) {
                tl.from(descRef.current, { opacity: 0, y: 40, duration: 0.8 }, 0.4);
            }
            if (buttonsRef.current) {
                tl.from(buttonsRef.current, { opacity: 0, y: 40, duration: 0.8 }, 0.6);
            }
            if (scrollIndicatorRef.current) {
                tl.from(scrollIndicatorRef.current, { opacity: 0, duration: 1 }, 1.2);
            }
        },
        { dependencies: [isClient] }
    );

    // Scroll indicator bouncing animation
    useGSAP(
        () => {
            if (!scrollIndicatorRef.current || !isClient) return;

            const indicator = scrollIndicatorRef.current.querySelector(".scroll-line");
            if (indicator) {
                gsap.to(indicator, {
                    y: 8,
                    duration: 1,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                });
            }
        },
        { dependencies: [isClient] }
    );

    return (
        <section
            ref={sectionRef}
            className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-marine-dark"
        >
            {/* Parallax Background */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=80')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-marine-dark/40 via-marine-dark/20 to-marine-dark/90" />
                <div className="absolute inset-0 bg-marine-dark/30 backdrop-blur-[1px]" />
            </div>

            {/* Content */}
            <div
                ref={contentRef}
                className="relative z-10 container-custom text-center px-4"
            >
                <div className="max-w-4xl mx-auto space-y-8">
                    <div
                        ref={badgeRef}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-ocean-400 animate-pulse" />
                        <span className="text-ocean-100/90 text-sm font-medium tracking-wide">
                            Marine Survey Specialists
                        </span>
                    </div>

                    <h1
                        ref={titleRef}
                        className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight"
                    >
                        Unlocking the <br />
                        <span className="text-gradient-ocean relative">
                            Ocean's Potential
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-ocean-500 opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </span>
                    </h1>

                    <p
                        ref={descRef}
                        className="text-lg md:text-xl text-ocean-50/70 max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        We provide precise offshore wind, geophysical, and geotechnical solutions
                        to build a safer and more sustainable marine future.
                    </p>

                    <div
                        ref={buttonsRef}
                        className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
                    >
                        <Button size="lg" className="rounded-full px-8 bg-white text-marine-dark hover:bg-ocean-50 hover:shadow-xl hover:shadow-white/10 transition-all">
                            Explore Services
                            <ArrowRight size={18} className="ml-2" />
                        </Button>
                        <Button variant="secondary" size="lg" className="rounded-full px-8 border-white/20 hover:bg-white/10">
                            Our Projects
                        </Button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                ref={scrollIndicatorRef}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-3">
                    <span className="text-[10px] tracking-[0.2em] font-medium text-white/30 uppercase">Scroll to Discover</span>
                    <div
                        className="scroll-line w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0"
                    />
                </div>
            </div>
        </section>
    );
}
