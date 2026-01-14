"use client";

import { useControls } from "leva";

/**
 * Animation configuration hook for BusinessServicesPage
 * Provides real-time adjustable parameters for:
 * - Swiper transition speed
 * - Text reveal animation timing
 * - Wheel scroll sensitivity
 * 
 * Only shows controls in development mode (NODE_ENV=development)
 */

export interface AnimationConfigValues {
    // Swiper
    swiperSpeed: number;
    // Text animation
    textDuration: number;
    textStagger: number;
    textDelay: number;
    // Wheel scroll
    wheelThreshold: number;
    wheelDecay: number;
}

// Default values (simpac-matched)
const ANIMATION_DEFAULTS: AnimationConfigValues = {
    swiperSpeed: 1600,      // ms - Swiper transition speed
    textDuration: 0.6,      // s - GSAP text reveal duration
    textStagger: 0.05,      // s - GSAP stagger between lines
    textDelay: 0.05,        // s - delay before text animation starts
    wheelThreshold: 60,     // px - minimum scroll delta to trigger slide change
    wheelDecay: 150,        // ms - time before wheel accumulator resets
};

export function useAnimationConfig(): AnimationConfigValues {
    // Only render controls in development mode
    const isDev = process.env.NODE_ENV === "development";

    const controls = useControls(
        "🎬 Animation",
        {
            swiperSpeed: {
                value: ANIMATION_DEFAULTS.swiperSpeed,
                min: 500,
                max: 3000,
                step: 100,
                label: "Swiper Speed (ms)",
            },
            textDuration: {
                value: ANIMATION_DEFAULTS.textDuration,
                min: 0.2,
                max: 2,
                step: 0.1,
                label: "Text Duration (s)",
            },
            textStagger: {
                value: ANIMATION_DEFAULTS.textStagger,
                min: 0.01,
                max: 0.2,
                step: 0.01,
                label: "Text Stagger (s)",
            },
            textDelay: {
                value: ANIMATION_DEFAULTS.textDelay,
                min: 0,
                max: 0.5,
                step: 0.01,
                label: "Text Delay (s)",
            },
            wheelThreshold: {
                value: ANIMATION_DEFAULTS.wheelThreshold,
                min: 20,
                max: 150,
                step: 10,
                label: "Wheel Threshold (px)",
            },
            wheelDecay: {
                value: ANIMATION_DEFAULTS.wheelDecay,
                min: 50,
                max: 300,
                step: 10,
                label: "Wheel Decay (ms)",
            },
        },
        { collapsed: true, render: () => isDev }
    );

    return controls as AnimationConfigValues;
}

// Export defaults for use when leva is not available (SSR, production static)
export { ANIMATION_DEFAULTS };
