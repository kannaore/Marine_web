"use client";

import { useRef, RefObject, useEffect } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface ScrollAnimationOptions {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
}

interface FadeInOptions {
    delay?: number;
    duration?: number;
    y?: number;
    stagger?: number;
}

/**
 * useScrollAnimation - Scroll-linked animations with GSAP ScrollTrigger
 */
export function useScrollAnimation<T extends HTMLElement>(
    ref: RefObject<T | null>,
    animationConfig: gsap.TweenVars,
    options: ScrollAnimationOptions = {}
) {
    const { start = "top bottom", end = "bottom top", scrub = true, markers = false } = options;

    useGSAP(
        () => {
            if (!ref.current) return;

            gsap.to(ref.current, {
                ...animationConfig,
                scrollTrigger: {
                    trigger: ref.current,
                    start,
                    end,
                    scrub,
                    markers,
                },
            });
        },
        { scope: ref, dependencies: [animationConfig, options] }
    );
}

/**
 * useFadeInOnView - Triggers fade-in animation when element enters viewport
 */
export function useFadeInOnView<T extends HTMLElement>(
    ref: RefObject<T | null>,
    options: FadeInOptions = {}
) {
    const { delay = 0, duration = 0.6, y = 30, stagger = 0 } = options;

    useGSAP(
        () => {
            if (!ref.current) return;

            gsap.from(ref.current, {
                opacity: 0,
                y,
                delay,
                duration,
                stagger,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        },
        { scope: ref, dependencies: [delay, duration, y, stagger] }
    );
}

/**
 * useStaggerAnimation - For animating multiple child elements
 * Great for lists, grids, and card collections
 */
export function useStaggerAnimation<T extends HTMLElement>(
    ref: RefObject<T | null>,
    selector: string,
    options: FadeInOptions = {}
) {
    const { delay = 0, duration = 0.6, y = 30, stagger = 0.1 } = options;

    useGSAP(
        () => {
            if (!ref.current) return;

            const elements = ref.current.querySelectorAll(selector);
            if (elements.length === 0) return;

            gsap.from(elements, {
                opacity: 0,
                y,
                delay,
                duration,
                stagger,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        },
        { scope: ref, dependencies: [selector, delay, duration, y, stagger] }
    );
}

/**
 * useParallax - Simple parallax effect
 */
export function useParallax<T extends HTMLElement>(
    ref: RefObject<T | null>,
    speed: number = 0.5 // 0.5 = moves at half scroll speed, 2 = moves at double
) {
    useGSAP(
        () => {
            if (!ref.current) return;

            gsap.to(ref.current, {
                yPercent: -50 * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        },
        { scope: ref, dependencies: [speed] }
    );
}

/**
 * useAnimatePresence - Helper for enter/exit animations (simplified)
 */
export function useAnimatePresence<T extends HTMLElement>(
    ref: RefObject<T | null>,
    isVisible: boolean,
    options: { duration?: number; ease?: string } = {}
) {
    const { duration = 0.3, ease = "power2.out" } = options;
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (!ref.current) return;

        // Skip animation on initial mount if not visible
        if (!hasInitialized.current) {
            hasInitialized.current = true;
            if (!isVisible) {
                gsap.set(ref.current, { opacity: 0, display: "none" });
            }
            return;
        }

        if (isVisible) {
            gsap.set(ref.current, { display: "block" });
            gsap.to(ref.current, {
                opacity: 1,
                duration,
                ease,
            });
        } else {
            gsap.to(ref.current, {
                opacity: 0,
                duration,
                ease,
                onComplete: () => {
                    if (ref.current) {
                        gsap.set(ref.current, { display: "none" });
                    }
                },
            });
        }
    }, [isVisible, duration, ease, ref]);
}
