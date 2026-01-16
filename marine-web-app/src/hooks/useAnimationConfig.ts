"use client";

import { useControls } from "leva";
import { useLayoutEffect } from "react";

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

// Glass defaults (matches globals.css)
export const GLASS_DEFAULTS = {
    // Refraction
    blur: 32,
    saturate: 180,
    brightness: 100,
    contrast: 100,
    // Surface
    bgColor: { r: 47, g: 54, b: 58 },
    bgOpacity: 0.4,
    noiseOpacity: 0,
    blendMode: "normal",
    // Edge
    borderWidth: 1,
    borderOpacity: 0.15,
    borderRadius: 8,
    gradientBorder: false,
    borderColor: { r: 255, g: 255, b: 255 },
    // Shadow
    shadowBlur: 30,
    shadowSpread: 0,
    shadowOpacity: 0.3,
    innerGlow: 0,
    topBevel: false,
};

export function useAnimationConfig(): AnimationConfigValues {
    const isDev = process.env.NODE_ENV === "development";

    useGlassConfig();

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

export function useGlassConfig() {
    const isDev = process.env.NODE_ENV === "development";

    // Folder 1: Refraction (blur, filters)
    const refraction = useControls(
        "Glass.Refraction",
        {
            blur: { value: GLASS_DEFAULTS.blur, min: 0, max: 50, step: 1, label: "Blur (px)" },
            saturate: { value: GLASS_DEFAULTS.saturate, min: 100, max: 250, step: 5, label: "Saturate (%)" },
            brightness: { value: GLASS_DEFAULTS.brightness, min: 80, max: 130, step: 5, label: "Brightness (%)" },
            contrast: { value: GLASS_DEFAULTS.contrast, min: 80, max: 120, step: 5, label: "Contrast (%)" },
        },
        { collapsed: true, render: () => isDev }
    );

    // Folder 2: Surface (background)
    const surface = useControls(
        "Glass.Surface",
        {
            bgColor: { value: GLASS_DEFAULTS.bgColor, label: "BG Color" },
            bgOpacity: { value: GLASS_DEFAULTS.bgOpacity, min: 0.05, max: 0.5, step: 0.05, label: "BG Opacity" },
            noiseOpacity: { value: GLASS_DEFAULTS.noiseOpacity, min: 0, max: 0.2, step: 0.01, label: "Noise" },
            blendMode: { value: GLASS_DEFAULTS.blendMode, options: ["normal", "multiply", "screen", "overlay", "soft-light"], label: "Blend Mode" },
        },
        { collapsed: true, render: () => isDev }
    );

    // Folder 3: Edge (border)
    const edge = useControls(
        "Glass.Edge",
        {
            borderWidth: { value: GLASS_DEFAULTS.borderWidth, min: 0, max: 2, step: 0.5, label: "Border Width" },
            borderOpacity: { value: GLASS_DEFAULTS.borderOpacity, min: 0, max: 0.6, step: 0.05, label: "Border Opacity" },
            borderRadius: { value: GLASS_DEFAULTS.borderRadius, min: 0, max: 50, step: 1, label: "Border Radius" },
            gradientBorder: { value: GLASS_DEFAULTS.gradientBorder, label: "Gradient Border" },
            borderColor: { value: GLASS_DEFAULTS.borderColor, label: "Border Color" },
        },
        { collapsed: true, render: () => isDev }
    );

    // Folder 4: Shadow (depth)
    const shadow = useControls(
        "Glass.Shadow",
        {
            shadowBlur: { value: GLASS_DEFAULTS.shadowBlur, min: 0, max: 60, step: 1, label: "Shadow Blur" },
            shadowSpread: { value: GLASS_DEFAULTS.shadowSpread, min: -10, max: 20, step: 1, label: "Shadow Spread" },
            shadowOpacity: { value: GLASS_DEFAULTS.shadowOpacity, min: 0, max: 0.5, step: 0.05, label: "Shadow Opacity" },
            innerGlow: { value: GLASS_DEFAULTS.innerGlow, min: 0, max: 20, step: 1, label: "Inner Glow" },
            topBevel: { value: GLASS_DEFAULTS.topBevel, label: "Top Bevel" },
        },
        { collapsed: true, render: () => isDev }
    );

    // Update CSS variables
    useLayoutEffect(() => {
        const root = document.documentElement;
        const { r, g, b } = surface.bgColor;
        const { r: br, g: bg, b: bb } = edge.borderColor;

        // Refraction
        root.style.setProperty("--glass-blur-sm", `blur(${Math.max(8, refraction.blur - 12)}px)`);
        root.style.setProperty("--glass-blur-md", `blur(${refraction.blur}px)`);
        root.style.setProperty("--glass-blur-lg", `blur(${refraction.blur + 8}px)`);
        root.style.setProperty("--glass-saturate", `saturate(${refraction.saturate}%)`);
        root.style.setProperty("--glass-brightness", `brightness(${refraction.brightness}%)`);
        root.style.setProperty("--glass-contrast", `contrast(${refraction.contrast}%)`);

        // Surface
        root.style.setProperty("--glass-bg-dark", `rgba(${r}, ${g}, ${b}, ${surface.bgOpacity})`);
        root.style.setProperty("--glass-bg-darker", `rgba(${r}, ${g}, ${b}, ${Math.min(1, surface.bgOpacity + 0.2)})`);
        root.style.setProperty("--glass-noise-opacity", `${surface.noiseOpacity}`);
        root.style.setProperty("--glass-blend-mode", surface.blendMode);

        // Edge
        root.style.setProperty("--glass-border", `${edge.borderWidth}px solid rgba(${br}, ${bg}, ${bb}, ${edge.borderOpacity})`);
        root.style.setProperty("--glass-border-radius", `${edge.borderRadius}px`);
        root.style.setProperty("--glass-gradient-border", edge.gradientBorder 
            ? `linear-gradient(135deg, rgba(${br},${bg},${bb},${edge.borderOpacity * 1.5}), rgba(${br},${bg},${bb},${edge.borderOpacity * 0.3}))`
            : "none"
        );

        // Shadow
        root.style.setProperty("--glass-shadow", `0 ${shadow.shadowBlur / 2}px ${shadow.shadowBlur}px ${shadow.shadowSpread}px rgba(0, 0, 0, ${shadow.shadowOpacity})`);
        root.style.setProperty("--glass-inner-glow", shadow.innerGlow > 0 
            ? `inset 0 0 ${shadow.innerGlow}px rgba(255, 255, 255, 0.1)` 
            : "none"
        );
        root.style.setProperty("--glass-top-bevel", shadow.topBevel 
            ? "inset 0 1px 0 rgba(255, 255, 255, 0.15)" 
            : "none"
        );
    }, [refraction, surface, edge, shadow]);

    return { refraction, surface, edge, shadow };
}
