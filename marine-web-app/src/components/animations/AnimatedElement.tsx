"use client";

import { useRef, ReactNode, HTMLAttributes, forwardRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type AnimationType =
    | "fadeIn"
    | "fadeInUp"
    | "fadeInDown"
    | "fadeInLeft"
    | "fadeInRight"
    | "scale"
    | "slideUp"
    | "slideDown";

interface AnimatedElementProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    animation?: AnimationType;
    delay?: number;
    duration?: number;
    stagger?: number;
    start?: string;
}

const animationVariants: Record<AnimationType, gsap.TweenVars> = {
    fadeIn: { opacity: 0 },
    fadeInUp: { opacity: 0, y: 50 },
    fadeInDown: { opacity: 0, y: -50 },
    fadeInLeft: { opacity: 0, x: -50 },
    fadeInRight: { opacity: 0, x: 50 },
    scale: { opacity: 0, scale: 0.8 },
    slideUp: { opacity: 0, y: 100 },
    slideDown: { opacity: 0, y: -100 },
};

/**
 * AnimatedElement - Scroll-triggered animations with GSAP
 */
export const AnimatedElement = forwardRef<HTMLDivElement, AnimatedElementProps>(
    function AnimatedElement(
        {
            children,
            animation = "fadeIn",
            delay = 0,
            duration = 0.6,
            stagger = 0,
            start = "top 85%",
            className,
            style,
            ...props
        },
        forwardedRef
    ) {
        const internalRef = useRef<HTMLDivElement>(null);
        const ref = (forwardedRef as React.RefObject<HTMLDivElement>) || internalRef;

        useGSAP(
            () => {
                if (!ref.current) return;

                const fromVars = animationVariants[animation];

                gsap.from(ref.current, {
                    ...fromVars,
                    delay,
                    duration,
                    stagger,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ref.current,
                        start,
                        toggleActions: "play none none none",
                    },
                });
            },
            { scope: ref, dependencies: [animation, delay, duration, stagger, start] }
        );

        return (
            <div ref={ref} className={className} style={style} {...props}>
                {children}
            </div>
        );
    }
);

/**
 * AnimatedGroup - For animating a group of children with stagger
 */
interface AnimatedGroupProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    animation?: AnimationType;
    staggerDelay?: number;
    duration?: number;
    start?: string;
    childSelector?: string;
}

export function AnimatedGroup({
    children,
    animation = "fadeInUp",
    staggerDelay = 0.1,
    duration = 0.6,
    start = "top 85%",
    childSelector = ":scope > *",
    className,
    style,
    ...props
}: AnimatedGroupProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!ref.current) return;

            const elements = ref.current.querySelectorAll(childSelector);
            if (elements.length === 0) return;

            const fromVars = animationVariants[animation];

            gsap.from(elements, {
                ...fromVars,
                duration,
                stagger: staggerDelay,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start,
                    toggleActions: "play none none none",
                },
            });
        },
        { scope: ref, dependencies: [animation, staggerDelay, duration, start, childSelector] }
    );

    return (
        <div ref={ref} className={className} style={style} {...props}>
            {children}
        </div>
    );
}

/**
 * ParallaxElement - Simple parallax container
 */
interface ParallaxElementProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    speed?: number; // 0.5 = slower, 1.5 = faster than scroll
}

export function ParallaxElement({
    children,
    speed = 0.5,
    className,
    style,
    ...props
}: ParallaxElementProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!ref.current) return;

            gsap.to(ref.current, {
                yPercent: -30 * speed,
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

    return (
        <div ref={ref} className={className} style={style} {...props}>
            {children}
        </div>
    );
}
