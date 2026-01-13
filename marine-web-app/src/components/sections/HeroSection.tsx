"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { WireframeTerrainScene } from "@/components/ui/WireframeTerrainScene";
import { useTypographyControls } from "@/hooks/useHeroDebugControls";

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    const [isClient, setIsClient] = useState(false);
    const [isSceneLoaded, setIsSceneLoaded] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const t = useTranslations("hero");
    
    // Typography controls from leva
    const typography = useTypographyControls();

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Split headline into words for staggered animation
    const headline = t('headline');
    const headlineWords = useMemo(() => {
        return headline.split(' ').map((word, index, arr) => ({
            word,
            isHighlight: index === arr.length - 1, // Last word is highlighted
        }));
    }, [headline]);

    useGSAP(
        () => {
            if (!sectionRef.current || !isClient || !isSceneLoaded) return;

            // Get all word elements
            const wordElements = headlineRef.current?.querySelectorAll('.hero-word-inner');
            
            // Premium entrance animation timeline
            const tl = gsap.timeline({ 
                defaults: { ease: "power4.out" }
            });

            // Staggered word-by-word reveal with blur + scale + y
            if (wordElements && wordElements.length > 0) {
                tl.from(wordElements, {
                    y: 80,
                    opacity: 0,
                    scale: 0.9,
                    filter: "blur(12px)",
                    duration: 1.4,
                    stagger: 0.1,
                }, 0.2);
            }

            // Subtitle with blur reveal
            if (subtitleRef.current) {
                tl.from(subtitleRef.current, {
                    y: 30,
                    opacity: 0,
                    filter: "blur(8px)",
                    duration: 1.2,
                    ease: "power3.out",
                }, 0.8);
            }

            // Scroll indicator fade in
            if (scrollIndicatorRef.current) {
                tl.from(scrollIndicatorRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                    ease: "power2.out",
                }, 1.4);
            }

            // Scroll Parallax Effect - more dramatic
            if (contentRef.current) {
                gsap.to(contentRef.current, {
                    opacity: 0,
                    yPercent: -30,
                    scale: 0.95,
                    filter: "blur(4px)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "60% top",
                        scrub: 0.5,
                    },
                });
            }

            // Scroll progress for 3D terrain
            gsap.to({}, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.3,
                    onUpdate: (self) => setScrollProgress(self.progress),
                },
            });

            // Scroll Indicator - gentle pulse
            if (scrollIndicatorRef.current) {
                const indicator = scrollIndicatorRef.current.querySelector(".scroll-line");
                if (indicator) {
                    gsap.to(indicator, {
                        y: 10,
                        opacity: 0.3,
                        duration: 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                    });
                }
            }
        },
        { scope: sectionRef, dependencies: [isClient, isSceneLoaded] }
    );

    return (
        <section ref={sectionRef} className="relative h-screen min-h-[800px] overflow-hidden bg-[#05050A]">
            {/* Loading placeholder */}
            {!isSceneLoaded && (
                <div className="absolute inset-0 bg-[#05050A] z-0" />
            )}

            {/* Three.js 3D Wireframe Terrain Background */}
            <WireframeTerrainScene
                className="absolute inset-0 z-0"
                onLoad={() => setIsSceneLoaded(true)}
                scrollProgress={scrollProgress}
            />

            {/* Subtle depth overlay */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[#05050A]/60 pointer-events-none" />

            {/* Content - pointer-events-none on container, but enabled on interactive elements */}
            <div ref={contentRef} className="relative z-10 flex h-full items-center justify-center pointer-events-none">
                <div className="text-center px-6 max-w-6xl">
                    <h1 
                        ref={headlineRef} 
                        className="hero-headline pointer-events-auto"
                        style={typography.getStyleForText('headline')}
                    >
                        {headlineWords.map((item, index) => (
                            <span key={index} className="hero-word">
                                <span 
                                    className={`hero-word-inner ${item.isHighlight ? 'hero-headline-highlight' : ''}`}
                                    style={{
                                        ...(item.isHighlight 
                                            ? typography.getHighlightStyle() 
                                            : typography.getTextEffectStyle('headline')),
                                        cursor: 'pointer',
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        typography.setActiveText(item.isHighlight ? 'highlight' : 'headline');
                                    }}
                                >
                                    {item.word}
                                </span>
                                {index < headlineWords.length - 1 && ' '}
                            </span>
                        ))}
                    </h1>
                    <p 
                        ref={subtitleRef} 
                        className="hero-subtitle mt-8 pointer-events-auto"
                        style={{
                            ...typography.getStyleForText('subtitle'),
                            cursor: 'pointer',
                        }}
                        onClick={() => typography.setActiveText('subtitle')}
                    >
                        {t('subtitle')}
                    </p>
                    <p 
                        className="hero-cta-text mt-24 pointer-events-auto"
                        style={{
                            ...typography.getStyleForText('cta'),
                            cursor: 'pointer',
                        }}
                        onClick={() => typography.setActiveText('cta')}
                    >
                        {t('ctaText')}
                    </p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div ref={scrollIndicatorRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                <div className="flex flex-col items-center gap-3">
                    <span className="text-[10px] font-light tracking-[0.15em] text-white/40 uppercase">
                        {t('scrollHint')}
                    </span>
                    <div className="scroll-line h-12 w-[1px] bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
                </div>
            </div>
        </section>
    );
}
