"use client";

import { Leva } from "leva";

/**
 * Debug controls panel for development mode only.
 * Renders the leva UI panel for real-time parameter adjustment.
 * 
 * In production (NODE_ENV !== 'development'), this renders nothing.
 */
export function DebugControls() {
    // Only render in development mode
    if (process.env.NODE_ENV !== "development") {
        return null;
    }

    return (
        <Leva
            collapsed={false}
            oneLineLabels={false}
            flat={false}
            theme={{
                sizes: {
                    rootWidth: "320px",
                    controlWidth: "160px",
                },
                colors: {
                    elevation1: "rgba(10, 25, 47, 0.95)",
                    elevation2: "rgba(17, 34, 64, 0.95)",
                    elevation3: "rgba(23, 42, 69, 0.95)",
                    accent1: "#64ffda",
                    accent2: "#5ccfee",
                    accent3: "#47a3c7",
                    highlight1: "#ffffff",
                    highlight2: "#ccd6f6",
                    highlight3: "#8892b0",
                },
            }}
        />
    );
}
