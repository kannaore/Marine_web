"use client";

import { useControls, folder, button } from "leva";
import { useState, useCallback, useEffect, useRef } from "react";

// ======================
// Local Storage Keys (versioned to force new defaults on update)
// ======================

const STORAGE_VERSION = "v2"; // Increment to force new defaults
const WIREFRAME_STORAGE_KEY = `hero-wireframe-controls-${STORAGE_VERSION}`;
const TYPOGRAPHY_STORAGE_KEY = `hero-typography-controls-${STORAGE_VERSION}`;

// ======================
// Font Options - Direct font stacks for cross-browser compatibility
// ======================

export const FONT_OPTIONS: Record<string, string> = {
    Outfit: '"Outfit", system-ui, sans-serif',
    Pretendard:
        '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
    "Readex Pro": '"Readex Pro", system-ui, sans-serif',
    Inter: "Inter, system-ui, sans-serif",
    Roboto: "Roboto, system-ui, sans-serif",
    "System UI": "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
};

// ======================
// Wireframe Controls
// ======================

export interface WireframeControlValues {
    // Grid
    gridDensityX: number;
    gridDensityY: number;
    lineWidth: number;

    // Glow
    glowIntensity: number;
    glowRadius: number;

    // Terrain
    waveHeight: number;
    animationSpeed: number;
    noiseScale: number;
    noiseOctaves: number;

    // Height fade
    heightFadeStart: number;
    heightFadeEnd: number;

    // Colors
    colorLow: string;
    colorHigh: string;
    peakGlowColor: string;

    // Bloom
    bloomIntensity: number;
    bloomThreshold: number;

    // Fog
    fogNear: number;
    fogFar: number;

    // Camera
    cameraY: number;
    cameraZ: number;

    // Vignette
    vignetteOffset: number;
    vignetteDarkness: number;

    // Noise
    noiseOpacity: number;
    
    // Mouse Interaction
    mouseEnabled: boolean;
    mouseRadius: number;
    mouseStrength: number;
    mouseHighlightIntensity: number;
    // Bathymetry color ramp (5 stops: edge → center)
    bathyColor1: string; // Edge (lowest influence) - purple/indigo
    bathyColor2: string; // Blue
    bathyColor3: string; // Cyan/Green
    bathyColor4: string; // Yellow
    bathyColor5: string; // Center (highest influence) - orange/red
    bathyColorPower: number; // Color ramp curve: <1 = more cool colors, >1 = more warm colors
}

// Forward declare TextStoreState for HeroPreset (actual interface is defined in Typography section)
// Using a type alias that will be compatible with the actual interface
interface TextStoreStateForPreset {
    headline: TextStyleValuesBase;
    highlight: TextStyleValuesBase;
    subtitle: TextStyleValuesBase;
    cta: TextStyleValuesBase;
}

interface TextStyleValuesBase {
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    letterSpacing: number;
    lineHeight: number;
    color: string;
    opacity: number;
    effects: {
        gradientEnabled: boolean;
        gradientStart: string;
        gradientEnd: string;
        gradientAngle: number;
        gradientSpread: number;
        glowEnabled: boolean;
        glowColor: string;
        glowSize: number;
        glowOpacity: number;
    };
}

// Preset interface for Export/Import
export interface HeroPreset {
    version: string;
    createdAt: string;
    name: string;
    wireframe: WireframeControlValues;
    typography: TextStoreStateForPreset;
}

// Default values from wireframe_set screenshots
const WIREFRAME_DEFAULTS: WireframeControlValues = {
    // Grid
    gridDensityX: 200,
    gridDensityY: 200,
    lineWidth: 0.15,

    // Glow - disabled
    glowIntensity: 0.0,
    glowRadius: 1.0,

    // Terrain
    waveHeight: 5.0,
    animationSpeed: 0.14,
    noiseScale: 0.11,
    noiseOctaves: 1,

    // Height fade
    heightFadeStart: 0.85,
    heightFadeEnd: 0.4,

    // Colors
    colorLow: "#000000",
    colorHigh: "#939bba",
    peakGlowColor: "#615e69",

    // Bloom - disabled
    bloomIntensity: 0.0,
    bloomThreshold: 0.0,

    // Fog
    fogNear: 8,
    fogFar: 65,

    // Camera
    cameraY: 0.0,
    cameraZ: 11,

    // Vignette
    vignetteOffset: 0.4,
    vignetteDarkness: 0.75,

    // Noise - disabled
    noiseOpacity: 0.0,
    
    // Mouse Interaction
    mouseEnabled: true,
    mouseRadius: 9.0,
    mouseStrength: 2.5,
    mouseHighlightIntensity: 1.0,
    // Bathymetry color ramp (5 stops: edge → center)
    bathyColor1: "#5f23f5", // Edge - vibrant purple
    bathyColor2: "#1f76d4", // Blue
    bathyColor3: "#50c878", // Emerald green
    bathyColor4: "#f4d03f", // Yellow
    bathyColor5: "#e67e22", // Center - orange
    bathyColorPower: 3.0, // <1 = expand cool colors, >1 = expand warm colors (웜톤 강조)
};

// Helper to load from localStorage (client-side only)
function loadWireframeFromStorage(): WireframeControlValues {
    // Always return defaults on server - will hydrate on client
    if (typeof window === "undefined") return WIREFRAME_DEFAULTS;

    // Client-side: try to load from localStorage
    try {
        const saved = localStorage.getItem(WIREFRAME_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            // Merge with defaults to ensure all keys exist
            return { ...WIREFRAME_DEFAULTS, ...parsed };
        }
    } catch (e) {
        console.warn("Failed to load wireframe controls from storage:", e);
    }
    return WIREFRAME_DEFAULTS;
}

export function useWireframeControls(): WireframeControlValues {
    // Use state instead of ref to handle hydration properly
    const [initialValues, setInitialValues] = useState<WireframeControlValues>(WIREFRAME_DEFAULTS);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load from localStorage after hydration
    useEffect(() => {
        const loaded = loadWireframeFromStorage();
        setInitialValues(loaded);
        setIsHydrated(true);
    }, []);

    const controls = useControls(
        "🌊 Wireframe",
        {
            Grid: folder(
                {
                    gridDensityX: {
                        value: initialValues.gridDensityX,
                        min: 0,
                        max: 400,
                        step: 10,
                        label: "Density X",
                    },
                    gridDensityY: {
                        value: initialValues.gridDensityY,
                        min: 0,
                        max: 300,
                        step: 10,
                        label: "Density Y",
                    },
                    lineWidth: {
                        value: initialValues.lineWidth,
                        min: 0.01,
                        max: 0.3,
                        step: 0.005,
                        label: "Line Width",
                    },
                },
                { collapsed: true }
            ),

            Glow: folder(
                {
                    glowIntensity: {
                        value: initialValues.glowIntensity,
                        min: 0,
                        max: 1,
                        step: 0.05,
                        label: "Intensity",
                    },
                    glowRadius: {
                        value: initialValues.glowRadius,
                        min: 0,
                        max: 8,
                        step: 0.5,
                        label: "Radius",
                    },
                },
                { collapsed: true }
            ),

            Terrain: folder(
                {
                    waveHeight: {
                        value: initialValues.waveHeight,
                        min: 0,
                        max: 20,
                        step: 0.5,
                        label: "Wave Height",
                    },
                    animationSpeed: {
                        value: initialValues.animationSpeed,
                        min: 0.005,
                        max: 0.15,
                        step: 0.005,
                        label: "Speed",
                    },
                    noiseScale: {
                        value: initialValues.noiseScale,
                        min: 0,
                        max: 0.5,
                        step: 0.01,
                        label: "Noise Scale (부드러움)",
                    },
                    noiseOctaves: {
                        value: initialValues.noiseOctaves,
                        min: 0,
                        max: 6,
                        step: 1,
                        label: "Octaves (디테일)",
                    },
                },
                { collapsed: true }
            ),

            "Height Fade": folder(
                {
                    heightFadeStart: {
                        value: initialValues.heightFadeStart,
                        min: 0,
                        max: 1,
                        step: 0.05,
                        label: "Fade Start (낮은부분 시작)",
                    },
                    heightFadeEnd: {
                        value: initialValues.heightFadeEnd,
                        min: 0,
                        max: 1,
                        step: 0.05,
                        label: "Fade End (완전투명)",
                    },
                },
                { collapsed: true }
            ),

            Colors: folder(
                {
                    colorLow: { value: initialValues.colorLow, label: "Low (Far)" },
                    colorHigh: { value: initialValues.colorHigh, label: "High (Near)" },
                    peakGlowColor: { value: initialValues.peakGlowColor, label: "Peak Glow" },
                },
                { collapsed: true }
            ),

            "Post Processing": folder(
                {
                    bloomIntensity: {
                        value: initialValues.bloomIntensity,
                        min: 0,
                        max: 4,
                        step: 0.1,
                        label: "Bloom",
                    },
                    bloomThreshold: {
                        value: initialValues.bloomThreshold,
                        min: 0,
                        max: 1,
                        step: 0.05,
                        label: "Bloom Threshold",
                    },
                    vignetteOffset: {
                        value: initialValues.vignetteOffset,
                        min: 0,
                        max: 1,
                        step: 0.05,
                        label: "Vignette Offset",
                    },
                    vignetteDarkness: {
                        value: initialValues.vignetteDarkness,
                        min: 0,
                        max: 1.5,
                        step: 0.05,
                        label: "Vignette Dark",
                    },
                    noiseOpacity: {
                        value: initialValues.noiseOpacity,
                        min: 0,
                        max: 0.1,
                        step: 0.005,
                        label: "Noise",
                    },
                },
                { collapsed: true }
            ),

            Fog: folder(
                {
                    fogNear: {
                        value: initialValues.fogNear,
                        min: 0,
                        max: 40,
                        step: 1,
                        label: "Near",
                    },
                    fogFar: {
                        value: initialValues.fogFar,
                        min: 0,
                        max: 120,
                        step: 5,
                        label: "Far",
                    },
                },
                { collapsed: true }
            ),

            Camera: folder(
                {
                    cameraY: {
                        value: initialValues.cameraY,
                        min: -5,
                        max: 15,
                        step: 0.5,
                        label: "Position Y",
                    },
                    cameraZ: {
                        value: initialValues.cameraZ,
                        min: 0,
                        max: 35,
                        step: 1,
                        label: "Position Z",
                    },
                },
                { collapsed: true }
            ),
            
            "🖱️ Mouse Interaction": folder(
                {
                    mouseEnabled: {
                        value: initialValues.mouseEnabled,
                        label: "Enable",
                    },
                    mouseRadius: {
                        value: initialValues.mouseRadius,
                        min: 5,
                        max: 40,
                        step: 1,
                        label: "Radius",
                    },
                    mouseStrength: {
                        value: initialValues.mouseStrength,
                        min: 0,
                        max: 10,
                        step: 0.5,
                        label: "Strength",
                    },
                    mouseHighlightIntensity: {
                        value: initialValues.mouseHighlightIntensity,
                        min: 0,
                        max: 1,
                        step: 0.05,
                        label: "Color Intensity",
                    },
                    bathyColor1: {
                        value: initialValues.bathyColor1,
                        label: "Edge (Purple)",
                    },
                    bathyColor2: {
                        value: initialValues.bathyColor2,
                        label: "Blue",
                    },
                    bathyColor3: {
                        value: initialValues.bathyColor3,
                        label: "Green",
                    },
                    bathyColor4: {
                        value: initialValues.bathyColor4,
                        label: "Yellow",
                    },
                    bathyColor5: {
                        value: initialValues.bathyColor5,
                        label: "Center (Orange)",
                    },
                    bathyColorPower: {
                        value: initialValues.bathyColorPower,
                        min: 0.1,
                        max: 5.0,
                        step: 0.1,
                        label: "Color Curve (↓쿨톤 ↑웜톤)",
                    },
                },
                { collapsed: false }
            ),

            "Save to Storage": button(() => {
                try {
                    localStorage.setItem(WIREFRAME_STORAGE_KEY, JSON.stringify(controls));
                    alert("✅ Wireframe settings saved!");
                } catch (e) {
                    console.error("Failed to save:", e);
                    alert("❌ Failed to save settings");
                }
            }),

            "Reset to Defaults": button(() => {
                localStorage.removeItem(WIREFRAME_STORAGE_KEY);
                alert("🔄 Settings reset! Refresh the page to apply defaults.");
            }),
            
            "📤 Export All Settings": button(() => {
                // Get typography from localStorage
                const typographySaved = localStorage.getItem(TYPOGRAPHY_STORAGE_KEY);
                const typography: TextStoreState = typographySaved
                    ? JSON.parse(typographySaved)
                    : {
                        headline: TEXT_DEFAULTS.headline,
                        highlight: { ...TEXT_DEFAULTS.highlight, ...HIGHLIGHT_DEFAULTS },
                        subtitle: TEXT_DEFAULTS.subtitle,
                        cta: TEXT_DEFAULTS.cta,
                    };
                
                const name = prompt("Enter preset name:", "My Preset") || "My Preset";
                
                const preset: HeroPreset = {
                    version: STORAGE_VERSION,
                    createdAt: new Date().toISOString(),
                    name,
                    wireframe: controls as WireframeControlValues,
                    typography,
                };
                
                // Download JSON
                const json = JSON.stringify(preset, null, 2);
                const blob = new Blob([json], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `marine-preset-${name.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().slice(0, 10)}.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                alert(`✅ Preset "${name}" exported!`);
            }),
            
            "📥 Import Settings": button(() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = ".json,application/json";
                
                input.onchange = async (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (!file) return;
                    
                    try {
                        const text = await file.text();
                        const preset = JSON.parse(text) as HeroPreset;
                        
                        // Validate preset structure
                        if (!preset.version || !preset.wireframe || !preset.typography) {
                            alert("❌ Invalid preset file: missing required fields");
                            return;
                        }
                        
                        const confirmApply = confirm(
                            `Apply preset "${preset.name}"?\n` +
                            `Created: ${new Date(preset.createdAt).toLocaleString()}\n` +
                            `Version: ${preset.version}\n\n` +
                            `This will replace all current settings.`
                        );
                        
                        if (confirmApply) {
                            // Save to localStorage
                            localStorage.setItem(WIREFRAME_STORAGE_KEY, JSON.stringify(preset.wireframe));
                            localStorage.setItem(TYPOGRAPHY_STORAGE_KEY, JSON.stringify(preset.typography));
                            
                            alert("✅ Preset applied! Page will reload.");
                            window.location.reload();
                        }
                    } catch (err) {
                        console.error("Failed to parse preset:", err);
                        alert("❌ Failed to parse preset file");
                    }
                };
                
                input.click();
            }),
        },
        { collapsed: false },
        [initialValues, isHydrated]
    );

    // Auto-save on changes (debounced)
    useEffect(() => {
        const timeout = setTimeout(() => {
            try {
                localStorage.setItem(WIREFRAME_STORAGE_KEY, JSON.stringify(controls));
            } catch (e) {
                // Silent fail for auto-save
            }
        }, 500);
        return () => clearTimeout(timeout);
    }, [controls]);

    return controls as WireframeControlValues;
}

// ======================
// Typography Controls - Separate store per text type
// ======================

export type TextType = "headline" | "highlight" | "subtitle" | "cta";

// Text effects that can be applied to ANY text type
export interface TextEffects {
    // Gradient
    gradientEnabled: boolean;
    gradientStart: string;
    gradientEnd: string;
    gradientAngle: number; // 0-360 degrees
    gradientSpread: number; // 50-200 percent
    // Glow
    glowEnabled: boolean;
    glowColor: string;
    glowSize: number;
    glowOpacity: number;
}

export interface TextStyleValues {
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    letterSpacing: number;
    lineHeight: number;
    color: string;
    opacity: number;
    // Effects (optional for all text types)
    effects: TextEffects;
}

// Legacy interface for backward compatibility
export interface HighlightStyleValues extends TextStyleValues {
    // Keep old fields for backward compatibility with existing code
    glowColor: string;
    glowSize: number;
    glowOpacity: number;
    gradientStart: string;
    gradientEnd: string;
}

// Default effects - disabled by default except for highlight
const EFFECTS_DEFAULTS: TextEffects = {
    gradientEnabled: false,
    gradientStart: "#ffffff",
    gradientEnd: "#91edff",
    gradientAngle: 90,
    gradientSpread: 100,
    glowEnabled: false,
    glowColor: "#61e5ff",
    glowSize: 0,
    glowOpacity: 0.35,
};

// Highlight has effects enabled by default
const HIGHLIGHT_EFFECTS_DEFAULTS: TextEffects = {
    gradientEnabled: true,
    gradientStart: "#efe9e9",
    gradientEnd: "#91edff",
    gradientAngle: 90,
    gradientSpread: 100,
    glowEnabled: false,
    glowColor: "#61e5ff",
    glowSize: 0,
    glowOpacity: 0.35,
};

// Default values for each text type (synced from debug controls - 2026.1.13)
const TEXT_DEFAULTS: Record<TextType, TextStyleValues> = {
    headline: {
        fontFamily: "Pretendard",
        fontSize: 5.9,
        fontWeight: 100,
        letterSpacing: -0.02,
        lineHeight: 1.1,
        color: "#ffffff",
        opacity: 1,
        effects: {
            gradientEnabled: true,
            gradientStart: "#ffffff",
            gradientEnd: "#91edff",
            gradientAngle: 180,
            gradientSpread: 50,
            glowEnabled: false,
            glowColor: "#61e5ff",
            glowSize: 0,
            glowOpacity: 0.35,
        },
    },
    highlight: {
        fontFamily: "Pretendard",
        fontSize: 5.5,
        fontWeight: 400,
        letterSpacing: -0.1,
        lineHeight: 1.1,
        color: "#ffffff",
        opacity: 1,
        effects: {
            gradientEnabled: true,
            gradientStart: "#ffffff",
            gradientEnd: "#5fa4b1",
            gradientAngle: 180,
            gradientSpread: 60,
            glowEnabled: false,
            glowColor: "#61e5ff",
            glowSize: 0,
            glowOpacity: 0.35,
        },
    },
    subtitle: {
        fontFamily: "Pretendard",
        fontSize: 1.3,
        fontWeight: 300,
        letterSpacing: -0.02,
        lineHeight: 1.25,
        color: "#ffffff",
        opacity: 0.7,
        effects: {
            gradientEnabled: false,
            gradientStart: "#ffffff",
            gradientEnd: "#91edff",
            gradientAngle: 90,
            gradientSpread: 100,
            glowEnabled: false,
            glowColor: "#61e5ff",
            glowSize: 0,
            glowOpacity: 0.35,
        },
    },
    cta: {
        fontFamily: "Pretendard",
        fontSize: 0.8,
        fontWeight: 300,
        letterSpacing: -0.02,
        lineHeight: 2,
        color: "#ffffff",
        opacity: 0.7,
        effects: {
            gradientEnabled: false,
            gradientStart: "#ffffff",
            gradientEnd: "#91edff",
            gradientAngle: 90,
            gradientSpread: 100,
            glowEnabled: false,
            glowColor: "#61e5ff",
            glowSize: 0,
            glowOpacity: 0.35,
        },
    },
};

// Legacy defaults for backward compatibility
const HIGHLIGHT_DEFAULTS: Omit<HighlightStyleValues, keyof TextStyleValues> = {
    glowColor: "#61e5ff",
    glowSize: 0,
    glowOpacity: 0.35,
    gradientStart: "#efe9e9",
    gradientEnd: "#91edff",
};

// Store for each text type's custom values
interface TextStoreState {
    headline: TextStyleValues;
    highlight: HighlightStyleValues;
    subtitle: TextStyleValues;
    cta: TextStyleValues;
}

// Helper to merge effects with defaults
function mergeEffects(saved: Partial<TextEffects> | undefined, defaults: TextEffects): TextEffects {
    return {
        ...defaults,
        ...saved,
    };
}

// Helper to load from localStorage
function loadTypographyFromStorage(): TextStoreState {
    if (typeof window === "undefined") {
        return {
            headline: { ...TEXT_DEFAULTS.headline },
            highlight: { ...TEXT_DEFAULTS.highlight, ...HIGHLIGHT_DEFAULTS },
            subtitle: { ...TEXT_DEFAULTS.subtitle },
            cta: { ...TEXT_DEFAULTS.cta },
        };
    }
    try {
        const saved = localStorage.getItem(TYPOGRAPHY_STORAGE_KEY);
        console.log("[Typography] Loading from localStorage:", saved ? "found" : "not found");
        if (saved) {
            const parsed = JSON.parse(saved);
            console.log("[Typography] Parsed headline:", parsed.headline);
            console.log("[Typography] Parsed highlight:", parsed.highlight);
            const result = {
                headline: {
                    ...TEXT_DEFAULTS.headline,
                    ...parsed.headline,
                    effects: mergeEffects(parsed.headline?.effects, EFFECTS_DEFAULTS),
                },
                highlight: {
                    ...TEXT_DEFAULTS.highlight,
                    ...HIGHLIGHT_DEFAULTS,
                    ...parsed.highlight,
                    effects: mergeEffects(parsed.highlight?.effects, HIGHLIGHT_EFFECTS_DEFAULTS),
                },
                subtitle: {
                    ...TEXT_DEFAULTS.subtitle,
                    ...parsed.subtitle,
                    effects: mergeEffects(parsed.subtitle?.effects, EFFECTS_DEFAULTS),
                },
                cta: {
                    ...TEXT_DEFAULTS.cta,
                    ...parsed.cta,
                    effects: mergeEffects(parsed.cta?.effects, EFFECTS_DEFAULTS),
                },
            };
            console.log("[Typography] Final loaded headline:", result.headline);
            return result;
        }
    } catch (e) {
        console.warn("Failed to load typography controls from storage:", e);
    }
    return {
        headline: { ...TEXT_DEFAULTS.headline },
        highlight: { ...TEXT_DEFAULTS.highlight, ...HIGHLIGHT_DEFAULTS },
        subtitle: { ...TEXT_DEFAULTS.subtitle },
        cta: { ...TEXT_DEFAULTS.cta },
    };
}

export function useTypographyControls() {
    // Local state to store values for each text type
    const [textStore, setTextStore] = useState<TextStoreState>(() => {
        // Initialize with defaults - will load from localStorage in useEffect
        return {
            headline: { ...TEXT_DEFAULTS.headline },
            highlight: { ...TEXT_DEFAULTS.highlight, ...HIGHLIGHT_DEFAULTS },
            subtitle: { ...TEXT_DEFAULTS.subtitle },
            cta: { ...TEXT_DEFAULTS.cta },
        };
    });
    const [activeText, setActiveText] = useState<TextType>("headline");
    const [isHydrated, setIsHydrated] = useState(false);

    // Ref to track current activeText for use in onChange callbacks
    const activeTextRef = useRef<TextType>("headline");
    activeTextRef.current = activeText;

    // Ref to track textStore for use in onChange callbacks (avoids stale closures)
    const textStoreRef = useRef<TextStoreState>(textStore);
    textStoreRef.current = textStore;

    // Flag to prevent onChange from firing during programmatic sync
    // When set() is called to sync Leva UI, it triggers onChange callbacks
    // This flag tells onChange to ignore those calls
    const isSyncingRef = useRef(false);

    // Flag to prevent auto-save during initial loading phase
    // This stays true until we're confident the initial load is complete
    // Prevents race condition where defaults might be saved before localStorage is loaded
    const isInitializingRef = useRef(true);

    // Weight options map
    const weightOptions = {
        Thin: 100,
        Light: 300,
        Regular: 400,
        Medium: 500,
        SemiBold: 600,
        Bold: 700,
        Black: 900,
    };

    // Ref to store loaded values for initial sync
    const loadedValuesRef = useRef<TextStoreState | null>(null);

    // Load from localStorage after hydration
    useEffect(() => {
        const loaded = loadTypographyFromStorage();
        loadedValuesRef.current = loaded; // Store for sync effect
        setTextStore(loaded);
        setIsHydrated(true);
    }, []);

    // SINGLE useControls call with onChange callbacks - NO circular updates
    const [, set] = useControls(
        "✍️ Typography",
        () => ({
            activeText: {
                value: activeText,
                options: ["headline", "highlight", "subtitle", "cta"] as TextType[],
                label: "📝 Select Text",
                onChange: (v: TextType) => {
                    setActiveText(v);
                },
            },

            Font: folder(
                {
                    fontFamily: {
                        value: textStore[activeText].fontFamily,
                        options: Object.keys(FONT_OPTIONS),
                        label: "Family",
                        onChange: (v: string) => {
                            if (isSyncingRef.current || isInitializingRef.current) return;
                            const current = activeTextRef.current;
                            setTextStore((prev) => ({
                                ...prev,
                                [current]: { ...prev[current], fontFamily: v },
                            }));
                        },
                    },
                    fontSize: {
                        value: textStore[activeText].fontSize,
                        min: 0.5,
                        max: 12,
                        step: 0.1,
                        label: "Size (rem)",
                        onChange: (v: number) => {
                            if (isSyncingRef.current || isInitializingRef.current) return;
                            const current = activeTextRef.current;
                            setTextStore((prev) => ({
                                ...prev,
                                [current]: { ...prev[current], fontSize: v },
                            }));
                        },
                    },
                    fontWeight: {
                        value: textStore[activeText].fontWeight,
                        options: weightOptions,
                        label: "Weight",
                        onChange: (v: number) => {
                            if (isSyncingRef.current || isInitializingRef.current) return;
                            const current = activeTextRef.current;
                            setTextStore((prev) => ({
                                ...prev,
                                [current]: { ...prev[current], fontWeight: v },
                            }));
                        },
                    },
                },
                { collapsed: false }
            ),

            Spacing: folder(
                {
                    letterSpacing: {
                        value: textStore[activeText].letterSpacing,
                        min: -0.1,
                        max: 0.5,
                        step: 0.01,
                        label: "Letter (em)",
                        onChange: (v: number) => {
                            if (isSyncingRef.current || isInitializingRef.current) return;
                            const current = activeTextRef.current;
                            setTextStore((prev) => ({
                                ...prev,
                                [current]: { ...prev[current], letterSpacing: v },
                            }));
                        },
                    },
                    lineHeight: {
                        value: textStore[activeText].lineHeight,
                        min: 0.8,
                        max: 3,
                        step: 0.05,
                        label: "Line Height",
                        onChange: (v: number) => {
                            if (isSyncingRef.current || isInitializingRef.current) return;
                            const current = activeTextRef.current;
                            setTextStore((prev) => ({
                                ...prev,
                                [current]: { ...prev[current], lineHeight: v },
                            }));
                        },
                    },
                },
                { collapsed: true }
            ),

            Color: folder(
                {
                    color: {
                        value: textStore[activeText].color,
                        label: "Text Color",
                        onChange: (v: string) => {
                            if (isSyncingRef.current || isInitializingRef.current) return;
                            const current = activeTextRef.current;
                            setTextStore((prev) => ({
                                ...prev,
                                [current]: { ...prev[current], color: v },
                            }));
                        },
                    },
                    opacity: {
                        value: textStore[activeText].opacity,
                        min: 0,
                        max: 1,
                        step: 0.05,
                        label: "Opacity",
                        onChange: (v: number) => {
                            if (isSyncingRef.current || isInitializingRef.current) return;
                            const current = activeTextRef.current;
                            setTextStore((prev) => ({
                                ...prev,
                                [current]: { ...prev[current], opacity: v },
                            }));
                        },
                    },
                },
                { collapsed: true }
            ),

            "✨ Text Effects": folder(
                {
                    // Gradient controls
                    gradientEnabled: {
                        value: textStore[activeText].effects?.gradientEnabled ?? false,
                        label: "Enable Gradient",
                        onChange: (v: boolean) => {
                            if (isSyncingRef.current || isInitializingRef.current) return;
                            const current = activeTextRef.current;
                            setTextStore((prev) => ({
                                ...prev,
                                [current]: {
                                    ...prev[current],
                                    effects: { ...prev[current].effects, gradientEnabled: v },
                                },
                            }));
                        },
                    },
                    gradientStart: {
                        value: textStore[activeText].effects?.gradientStart ?? "#ffffff",
                        label: "Gradient Start",
                        onChange: (v: string) => {
                            if (isSyncingRef.current || isInitializingRef.current) return;
                            const current = activeTextRef.current;
                            setTextStore((prev) => ({
                                ...prev,
                                [current]: {
                                    ...prev[current],
                                    effects: { ...prev[current].effects, gradientStart: v },
                                },
                            }));
                        },
                    },
                    gradientEnd: {
                        value: textStore[activeText].effects?.gradientEnd ?? "#91edff",
                        label: "Gradient End",
                        onChange: (v: string) => {
                            if (isSyncingRef.current || isInitializingRef.current) return;
                            const current = activeTextRef.current;
                            setTextStore((prev) => ({
                                ...prev,
                                [current]: {
                                    ...prev[current],
                                    effects: { ...prev[current].effects, gradientEnd: v },
                                },
                            }));
                        },
                    },
                    gradientAngle: {
                        value: textStore[activeText].effects?.gradientAngle ?? 90,
                        min: 0,
                        max: 360,
                        step: 5,
                        label: "Gradient Angle (°)",
                        onChange: (v: number) => {
                            if (isSyncingRef.current || isInitializingRef.current) return;
                            const current = activeTextRef.current;
                            setTextStore((prev) => ({
                                ...prev,
                                [current]: {
                                    ...prev[current],
                                    effects: { ...prev[current].effects, gradientAngle: v },
                                },
                            }));
                        },
                    },
                    gradientSpread: {
                        value: textStore[activeText].effects?.gradientSpread ?? 100,
                        min: 50,
                        max: 200,
                        step: 5,
                        label: "Gradient Spread (%)",
                        onChange: (v: number) => {
                            if (isSyncingRef.current || isInitializingRef.current) return;
                            const current = activeTextRef.current;
                            setTextStore((prev) => ({
                                ...prev,
                                [current]: {
                                    ...prev[current],
                                    effects: { ...prev[current].effects, gradientSpread: v },
                                },
                            }));
                        },
                    },
                    // Glow controls
                    glowEnabled: {
                        value: textStore[activeText].effects?.glowEnabled ?? false,
                        label: "Enable Glow",
                        onChange: (v: boolean) => {
                            if (isSyncingRef.current || isInitializingRef.current) return;
                            const current = activeTextRef.current;
                            setTextStore((prev) => ({
                                ...prev,
                                [current]: {
                                    ...prev[current],
                                    effects: { ...prev[current].effects, glowEnabled: v },
                                },
                            }));
                        },
                    },
                    glowColor: {
                        value: textStore[activeText].effects?.glowColor ?? "#61e5ff",
                        label: "Glow Color",
                        onChange: (v: string) => {
                            if (isSyncingRef.current || isInitializingRef.current) return;
                            const current = activeTextRef.current;
                            setTextStore((prev) => ({
                                ...prev,
                                [current]: {
                                    ...prev[current],
                                    effects: { ...prev[current].effects, glowColor: v },
                                },
                            }));
                        },
                    },
                    glowSize: {
                        value: textStore[activeText].effects?.glowSize ?? 0,
                        min: 0,
                        max: 40,
                        step: 1,
                        label: "Glow Size (px)",
                        onChange: (v: number) => {
                            if (isSyncingRef.current || isInitializingRef.current) return;
                            const current = activeTextRef.current;
                            setTextStore((prev) => ({
                                ...prev,
                                [current]: {
                                    ...prev[current],
                                    effects: { ...prev[current].effects, glowSize: v },
                                },
                            }));
                        },
                    },
                    glowOpacity: {
                        value: textStore[activeText].effects?.glowOpacity ?? 0.35,
                        min: 0,
                        max: 1,
                        step: 0.05,
                        label: "Glow Opacity",
                        onChange: (v: number) => {
                            if (isSyncingRef.current || isInitializingRef.current) return;
                            const current = activeTextRef.current;
                            setTextStore((prev) => ({
                                ...prev,
                                [current]: {
                                    ...prev[current],
                                    effects: { ...prev[current].effects, glowOpacity: v },
                                },
                            }));
                        },
                    },
                },
                { collapsed: false }
            ),

            "Save to Storage": button(() => {
                try {
                    localStorage.setItem(
                        TYPOGRAPHY_STORAGE_KEY,
                        JSON.stringify(textStoreRef.current)
                    );
                    alert("✅ Typography settings saved!");
                } catch (e) {
                    console.error("Failed to save:", e);
                    alert("❌ Failed to save settings");
                }
            }),

            "📋 Export to Code": button(() => {
                try {
                    const code = generateDefaultsCode(textStoreRef.current);
                    navigator.clipboard.writeText(code);
                    console.log("=== TEXT_DEFAULTS Code ===\n" + code);
                    alert("✅ TEXT_DEFAULTS code copied to clipboard!\nAlso logged to console.");
                } catch (e) {
                    console.error("Failed to copy:", e);
                    // Fallback: just log to console
                    const code = generateDefaultsCode(textStoreRef.current);
                    console.log("=== TEXT_DEFAULTS Code (copy manually) ===\n" + code);
                    alert("📋 Code logged to console (clipboard access denied)");
                }
            }),

            "Reset Current": button(() => {
                const current = activeTextRef.current;

                const setAny = set as (values: Record<string, unknown>) => void;

                const resetValues = { ...TEXT_DEFAULTS[current] };
                const resetEffects =
                    current === "highlight" ? HIGHLIGHT_EFFECTS_DEFAULTS : EFFECTS_DEFAULTS;

                if (current === "highlight") {
                    setTextStore((prev) => ({
                        ...prev,
                        highlight: {
                            ...resetValues,
                            ...HIGHLIGHT_DEFAULTS,
                            effects: resetEffects,
                        } as HighlightStyleValues,
                    }));
                } else {
                    setTextStore((prev) => ({
                        ...prev,
                        [current]: { ...resetValues, effects: resetEffects },
                    }));
                }

                // Update leva UI with all effect values
                setAny({
                    fontFamily: resetValues.fontFamily,
                    fontSize: resetValues.fontSize,
                    fontWeight: resetValues.fontWeight,
                    letterSpacing: resetValues.letterSpacing,
                    lineHeight: resetValues.lineHeight,
                    color: resetValues.color,
                    opacity: resetValues.opacity,
                    gradientEnabled: resetEffects.gradientEnabled,
                    gradientStart: resetEffects.gradientStart,
                    gradientEnd: resetEffects.gradientEnd,
                    gradientAngle: resetEffects.gradientAngle,
                    gradientSpread: resetEffects.gradientSpread,
                    glowEnabled: resetEffects.glowEnabled,
                    glowColor: resetEffects.glowColor,
                    glowSize: resetEffects.glowSize,
                    glowOpacity: resetEffects.glowOpacity,
                });
            }),
            
            "📤 Export All Settings": button(() => {
                // Get wireframe from localStorage
                const wireframeSaved = localStorage.getItem(WIREFRAME_STORAGE_KEY);
                const wireframe: WireframeControlValues = wireframeSaved
                    ? { ...WIREFRAME_DEFAULTS, ...JSON.parse(wireframeSaved) }
                    : WIREFRAME_DEFAULTS;
                
                const name = prompt("Enter preset name:", "My Preset") || "My Preset";
                
                const preset: HeroPreset = {
                    version: STORAGE_VERSION,
                    createdAt: new Date().toISOString(),
                    name,
                    wireframe,
                    typography: textStoreRef.current,
                };
                
                // Download JSON
                const json = JSON.stringify(preset, null, 2);
                const blob = new Blob([json], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `marine-preset-${name.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().slice(0, 10)}.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                alert(`✅ Preset "${name}" exported!`);
            }),
            
            "📥 Import Settings": button(() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = ".json,application/json";
                
                input.onchange = async (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (!file) return;
                    
                    try {
                        const text = await file.text();
                        const preset = JSON.parse(text) as HeroPreset;
                        
                        // Validate preset structure
                        if (!preset.version || !preset.wireframe || !preset.typography) {
                            alert("❌ Invalid preset file: missing required fields");
                            return;
                        }
                        
                        const confirmApply = confirm(
                            `Apply preset "${preset.name}"?\n` +
                            `Created: ${new Date(preset.createdAt).toLocaleString()}\n` +
                            `Version: ${preset.version}\n\n` +
                            `This will replace all current settings.`
                        );
                        
                        if (confirmApply) {
                            // Save to localStorage
                            localStorage.setItem(WIREFRAME_STORAGE_KEY, JSON.stringify(preset.wireframe));
                            localStorage.setItem(TYPOGRAPHY_STORAGE_KEY, JSON.stringify(preset.typography));
                            
                            alert("✅ Preset applied! Page will reload.");
                            window.location.reload();
                        }
                    } catch (err) {
                        console.error("Failed to parse preset:", err);
                        alert("❌ Failed to parse preset file");
                    }
                };
                
                input.click();
            }),
        }),
        { collapsed: false },
        [isHydrated]
    ); // Only depend on isHydrated - NOT textStore or activeText

    // Sync leva UI when activeText changes (show that text type's values)
    useEffect(() => {
        if (!isHydrated) return;

        const setAny = set as (values: Record<string, unknown>) => void;

        const values = textStore[activeText];
        const effects = values.effects || EFFECTS_DEFAULTS;

        const updateObj: Record<string, unknown> = {
            fontFamily: values.fontFamily,
            fontSize: values.fontSize,
            fontWeight: values.fontWeight,
            letterSpacing: values.letterSpacing,
            lineHeight: values.lineHeight,
            color: values.color,
            opacity: values.opacity,
            // Effects - now for ALL text types
            gradientEnabled: effects.gradientEnabled,
            gradientStart: effects.gradientStart,
            gradientEnd: effects.gradientEnd,
            gradientAngle: effects.gradientAngle,
            gradientSpread: effects.gradientSpread,
            glowEnabled: effects.glowEnabled,
            glowColor: effects.glowColor,
            glowSize: effects.glowSize,
            glowOpacity: effects.glowOpacity,
        };

        // Set syncing flag to prevent onChange callbacks from firing
        isSyncingRef.current = true;
        setAny(updateObj);
        // Use setTimeout to reset flag after Leva processes the update (more reliable than rAF)
        setTimeout(() => {
            isSyncingRef.current = false;
        }, 50);
    }, [activeText, isHydrated, set]); // NOT textStore - prevents circular updates

    // Also sync leva UI after hydration (once textStore is loaded)
    // Using a ref to ensure this only runs once after initial load
    const hasInitialSyncedRef = useRef(false);
    useEffect(() => {
        if (!isHydrated) return;
        if (hasInitialSyncedRef.current) return; // Only run once
        if (!loadedValuesRef.current) return; // Wait for loaded values
        hasInitialSyncedRef.current = true;

        const setAny = set as (values: Record<string, unknown>) => void;

        // Use loaded values from ref (guaranteed to be the correct loaded values)
        const loadedStore = loadedValuesRef.current;
        const values = loadedStore[activeText];
        const effects = values.effects || EFFECTS_DEFAULTS;

        console.log("[Typography] Initial sync to Leva UI:", {
            activeText,
            fontSize: values.fontSize,
        });

        // Set syncing flag to prevent onChange callbacks from firing
        isSyncingRef.current = true;
        setAny({
            activeText: activeText,
            fontFamily: values.fontFamily,
            fontSize: values.fontSize,
            fontWeight: values.fontWeight,
            letterSpacing: values.letterSpacing,
            lineHeight: values.lineHeight,
            color: values.color,
            opacity: values.opacity,
            // Effects
            gradientEnabled: effects.gradientEnabled,
            gradientStart: effects.gradientStart,
            gradientEnd: effects.gradientEnd,
            gradientAngle: effects.gradientAngle,
            gradientSpread: effects.gradientSpread,
            glowEnabled: effects.glowEnabled,
            glowColor: effects.glowColor,
            glowSize: effects.glowSize,
            glowOpacity: effects.glowOpacity,
        });
        // Use setTimeout to reset flag after Leva processes the update (more reliable than rAF)
        setTimeout(() => {
            isSyncingRef.current = false;
        }, 50);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHydrated]); // Only run when hydrated

    // Clear initialization flag after hydration + delay
    // This ensures localStorage values are fully loaded before any auto-save
    useEffect(() => {
        if (!isHydrated) return;
        
        // Wait 1500ms after hydration before allowing auto-save
        // This accounts for:
        // - Leva's internal initialization
        // - Initial sync effect running
        // - Any onChange callbacks that fire during setup
        const timer = setTimeout(() => {
            isInitializingRef.current = false;
            console.log("[Typography] Initialization complete, auto-save enabled");
        }, 1500);
        
        return () => clearTimeout(timer);
    }, [isHydrated]);

    // Auto-save on changes (debounced)
    useEffect(() => {
        // Don't auto-save during initialization phase
        if (!isHydrated || isInitializingRef.current) return;

        const timeout = setTimeout(() => {
            try {
                console.log("[Typography] Auto-saving textStore:", {
                    headline: textStore.headline,
                    highlight: {
                        gradientStart: textStore.highlight.gradientStart,
                        gradientEnd: textStore.highlight.gradientEnd,
                    },
                });
                localStorage.setItem(TYPOGRAPHY_STORAGE_KEY, JSON.stringify(textStore));
            } catch (e) {
                console.warn("[Typography] Auto-save failed:", e);
            }
        }, 500);
        return () => clearTimeout(timeout);
    }, [textStore, isHydrated]);

    // Style getters - always return stored values
    const getStyleForText = useCallback(
        (textType: TextType): React.CSSProperties => {
            const values = textStore[textType];
            return {
                fontFamily: FONT_OPTIONS[values.fontFamily] || values.fontFamily,
                fontSize: `${values.fontSize}rem`,
                fontWeight: values.fontWeight,
                letterSpacing: `${values.letterSpacing}em`,
                lineHeight: values.lineHeight,
                color: values.color,
                opacity: values.opacity,
            };
        },
        [textStore]
    );

    // NEW: Universal effect style getter for ANY text type
    // Returns gradient/glow styles if effects are enabled for that text type
    const getTextEffectStyle = useCallback(
        (textType: TextType): React.CSSProperties => {
            const values = textStore[textType];
            const effects = values.effects;

            // If no effects or neither gradient nor glow enabled, return empty
            if (!effects || (!effects.gradientEnabled && !effects.glowEnabled)) {
                return {};
            }

            const result: React.CSSProperties = {};

            // Apply gradient effect
            if (effects.gradientEnabled) {
                // Calculate gradient color stop positions based on spread
                // spread 100% = 0% to 100% (standard linear)
                // spread 50% = 25% to 75% (more concentrated, faster transition)
                // spread 200% = -50% to 150% (more spread out, slower transition)
                const spreadFactor = effects.gradientSpread / 100;
                const startPct = 50 - 50 * spreadFactor;
                const endPct = 50 + 50 * spreadFactor;

                result.backgroundImage = `linear-gradient(${effects.gradientAngle}deg, ${effects.gradientStart} ${startPct}%, ${effects.gradientEnd} ${endPct}%)`;
                result.WebkitBackgroundClip = "text";
                result.WebkitTextFillColor = "transparent";
                result.backgroundClip = "text";
            }

            // Apply glow effect
            if (effects.glowEnabled && effects.glowSize > 0) {
                const glowRgba = hexToRgba(effects.glowColor, effects.glowOpacity);
                result.textShadow = `0 0 ${effects.glowSize}px ${glowRgba}, 0 0 ${effects.glowSize * 2}px ${glowRgba}`;
            }

            return result;
        },
        [textStore]
    );

    // Legacy: Keep getHighlightStyle for backward compatibility
    // FIXED: Use longhand properties (backgroundImage) instead of shorthand (background)
    // This avoids React warning: "Updating a style property during rerender (background)
    // when a conflicting property is set (backgroundClip)"
    const getHighlightStyle = useCallback((): React.CSSProperties => {
        const values = textStore.highlight;
        const effects = values.effects || HIGHLIGHT_EFFECTS_DEFAULTS;

        // If gradient is disabled, return minimal style
        if (!effects.gradientEnabled) {
            // Just return glow if enabled
            if (effects.glowEnabled && effects.glowSize > 0) {
                const glowRgba = hexToRgba(effects.glowColor, effects.glowOpacity);
                return {
                    textShadow: `0 0 ${effects.glowSize}px ${glowRgba}, 0 0 ${effects.glowSize * 2}px ${glowRgba}`,
                };
            }
            return {};
        }

        const glowRgba = hexToRgba(effects.glowColor, effects.glowOpacity);

        // Calculate gradient color stop positions based on spread
        // spread 100% = 0% to 100% (standard linear)
        // spread 50% = 25% to 75% (more concentrated, faster transition)
        // spread 200% = -50% to 150% (more spread out, slower transition)
        const spreadFactor = effects.gradientSpread / 100;
        const startPct = 50 - 50 * spreadFactor;
        const endPct = 50 + 50 * spreadFactor;

        return {
            // Use backgroundImage instead of background shorthand to avoid conflict with backgroundClip
            backgroundImage: `linear-gradient(${effects.gradientAngle}deg, ${effects.gradientStart} ${startPct}%, ${effects.gradientEnd} ${endPct}%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            // Use textShadow instead of filter for glow - works better with transparent text
            textShadow:
                effects.glowEnabled && effects.glowSize > 0
                    ? `0 0 ${effects.glowSize}px ${glowRgba}, 0 0 ${effects.glowSize * 2}px ${glowRgba}`
                    : "none",
        };
    }, [textStore.highlight]);

    return {
        activeText,
        setActiveText, // Allow external selection (click-to-select)
        textStore,
        getStyleForText,
        getTextEffectStyle,
        getHighlightStyle,
    };
}

// ======================
// Utility Functions
// ======================

function hexToRgba(hex: string, alpha: number): string {
    // Handle invalid hex
    if (!hex || hex.length < 7) return `rgba(255, 255, 255, ${alpha})`;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Generate TypeScript code for TEXT_DEFAULTS from current settings
function generateDefaultsCode(textStore: TextStoreState): string {
    const formatEffects = (effects: TextEffects, indent: string = "        "): string => {
        return `{
${indent}    gradientEnabled: ${effects.gradientEnabled},
${indent}    gradientStart: '${effects.gradientStart}',
${indent}    gradientEnd: '${effects.gradientEnd}',
${indent}    gradientAngle: ${effects.gradientAngle},
${indent}    gradientSpread: ${effects.gradientSpread},
${indent}    glowEnabled: ${effects.glowEnabled},
${indent}    glowColor: '${effects.glowColor}',
${indent}    glowSize: ${effects.glowSize},
${indent}    glowOpacity: ${effects.glowOpacity},
${indent}}`;
    };

    const formatTextStyle = (name: string, values: TextStyleValues): string => {
        return `    ${name}: {
        fontFamily: '${values.fontFamily}',
        fontSize: ${values.fontSize},
        fontWeight: ${values.fontWeight},
        letterSpacing: ${values.letterSpacing},
        lineHeight: ${values.lineHeight},
        color: '${values.color}',
        opacity: ${values.opacity},
        effects: ${formatEffects(values.effects)},
    }`;
    };

    return `// Generated from debug controls - ${new Date().toLocaleString()}
const TEXT_DEFAULTS: Record<TextType, TextStyleValues> = {
${formatTextStyle("headline", textStore.headline)},
${formatTextStyle("highlight", textStore.highlight)},
${formatTextStyle("subtitle", textStore.subtitle)},
${formatTextStyle("cta", textStore.cta)},
};`;
}

function generateAllCSS(textStore: TextStoreState): string {
    let css = "";

    // Headline
    css += `.hero-headline {
    font-family: ${FONT_OPTIONS[textStore.headline.fontFamily]};
    font-size: ${textStore.headline.fontSize}rem;
    font-weight: ${textStore.headline.fontWeight};
    letter-spacing: ${textStore.headline.letterSpacing}em;
    line-height: ${textStore.headline.lineHeight};
    color: ${textStore.headline.color};
    opacity: ${textStore.headline.opacity};
}

`;

    // Highlight
    const hl = textStore.highlight;
    const glowRgba = hexToRgba(hl.glowColor, hl.glowOpacity);
    css += `.hero-headline-highlight {
    background: linear-gradient(90deg, ${hl.gradientStart} 0%, ${hl.gradientEnd} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: ${hl.glowSize > 0 ? `0 0 ${hl.glowSize}px ${glowRgba}` : "none"};
}

`;

    // Subtitle
    css += `.hero-subtitle {
    font-family: ${FONT_OPTIONS[textStore.subtitle.fontFamily]};
    font-size: ${textStore.subtitle.fontSize}rem;
    font-weight: ${textStore.subtitle.fontWeight};
    letter-spacing: ${textStore.subtitle.letterSpacing}em;
    line-height: ${textStore.subtitle.lineHeight};
    color: rgba(255, 255, 255, ${textStore.subtitle.opacity});
}

`;

    // CTA
    css += `.hero-cta-text {
    font-family: ${FONT_OPTIONS[textStore.cta.fontFamily]};
    font-size: ${textStore.cta.fontSize}rem;
    font-weight: ${textStore.cta.fontWeight};
    letter-spacing: ${textStore.cta.letterSpacing}em;
    line-height: ${textStore.cta.lineHeight};
    color: rgba(255, 255, 255, ${textStore.cta.opacity});
    text-transform: uppercase;
}`;

    return css;
}

// ======================
// Preset System - Export/Import all settings as JSON
// ======================

// Note: HeroPreset interface is defined at top of file

// Download JSON file to user's device
function downloadPresetJSON(preset: HeroPreset): void {
    const json = JSON.stringify(preset, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `marine-preset-${preset.name.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Create file input and trigger file picker
function importPresetJSON(): Promise<HeroPreset | null> {
    return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json,application/json";
        
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) {
                resolve(null);
                return;
            }
            
            try {
                const text = await file.text();
                const preset = JSON.parse(text) as HeroPreset;
                
                // Validate preset structure
                if (!preset.version || !preset.wireframe || !preset.typography) {
                    alert("❌ Invalid preset file: missing required fields");
                    resolve(null);
                    return;
                }
                
                resolve(preset);
            } catch (err) {
                console.error("Failed to parse preset:", err);
                alert("❌ Failed to parse preset file");
                resolve(null);
            }
        };
        
        input.click();
    });
}

// Export function for use in components
export function createPresetExporter(
    getWireframeControls: () => WireframeControlValues,
    getTypographyStore: () => TextStoreState
) {
    return {
        exportPreset: (name: string = "My Preset") => {
            const preset: HeroPreset = {
                version: STORAGE_VERSION,
                createdAt: new Date().toISOString(),
                name,
                wireframe: getWireframeControls(),
                typography: getTypographyStore(),
            };
            downloadPresetJSON(preset);
            console.log("[Preset] Exported:", preset);
        },
        
        importPreset: async (): Promise<HeroPreset | null> => {
            const preset = await importPresetJSON();
            if (preset) {
                console.log("[Preset] Imported:", preset);
            }
            return preset;
        },
    };
}

// Hook for preset management with apply functionality
export function usePresetManager() {
    const applyPreset = useCallback((
        preset: HeroPreset,
        options: {
            setWireframeValues?: (values: WireframeControlValues) => void;
            setTypographyStore?: (store: TextStoreState) => void;
        }
    ) => {
        // Apply wireframe settings
        if (options.setWireframeValues && preset.wireframe) {
            localStorage.setItem(WIREFRAME_STORAGE_KEY, JSON.stringify(preset.wireframe));
        }
        
        // Apply typography settings
        if (options.setTypographyStore && preset.typography) {
            localStorage.setItem(TYPOGRAPHY_STORAGE_KEY, JSON.stringify(preset.typography));
        }
        
        // Reload to apply changes (cleanest way to reset all Leva controls)
        alert("✅ Preset applied! Page will reload to apply settings.");
        window.location.reload();
    }, []);
    
    const exportCurrentSettings = useCallback(() => {
        // Load current settings from localStorage
        const wireframeSaved = localStorage.getItem(WIREFRAME_STORAGE_KEY);
        const typographySaved = localStorage.getItem(TYPOGRAPHY_STORAGE_KEY);
        
        const wireframe: WireframeControlValues = wireframeSaved 
            ? { ...WIREFRAME_DEFAULTS, ...JSON.parse(wireframeSaved) }
            : WIREFRAME_DEFAULTS;
            
        const typography: TextStoreState = typographySaved
            ? JSON.parse(typographySaved)
            : {
                headline: TEXT_DEFAULTS.headline,
                highlight: { ...TEXT_DEFAULTS.highlight, ...HIGHLIGHT_DEFAULTS },
                subtitle: TEXT_DEFAULTS.subtitle,
                cta: TEXT_DEFAULTS.cta,
            };
        
        const name = prompt("Enter preset name:", "My Preset") || "My Preset";
        
        const preset: HeroPreset = {
            version: STORAGE_VERSION,
            createdAt: new Date().toISOString(),
            name,
            wireframe,
            typography,
        };
        
        downloadPresetJSON(preset);
        alert(`✅ Preset "${name}" exported!`);
    }, []);
    
    const importAndApplyPreset = useCallback(async () => {
        const preset = await importPresetJSON();
        if (!preset) return;
        
        const confirmApply = confirm(
            `Apply preset "${preset.name}"?\n` +
            `Created: ${new Date(preset.createdAt).toLocaleString()}\n` +
            `Version: ${preset.version}\n\n` +
            `This will replace all current settings.`
        );
        
        if (confirmApply) {
            // Save to localStorage
            localStorage.setItem(WIREFRAME_STORAGE_KEY, JSON.stringify(preset.wireframe));
            localStorage.setItem(TYPOGRAPHY_STORAGE_KEY, JSON.stringify(preset.typography));
            
            alert("✅ Preset applied! Page will reload.");
            window.location.reload();
        }
    }, []);
    
    return {
        exportCurrentSettings,
        importAndApplyPreset,
        applyPreset,
    };
}
