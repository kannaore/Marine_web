"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BOKEH_COUNT = 6;

export function BokehBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Base gradient layer */}
            <div className="absolute inset-0 bg-marine-dark" />

            {/* Animated Bokeh Circles */}
            {[...Array(BOKEH_COUNT)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full blur-[120px] opacity-[0.15] will-change-transform"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        scale: Math.random() * 1 + 0.5,
                    }}
                    animate={{
                        x: [
                            Math.random() * 100 + "%",
                            Math.random() * 100 + "%",
                            Math.random() * 100 + "%",
                        ],
                        y: [
                            Math.random() * 100 + "%",
                            Math.random() * 100 + "%",
                            Math.random() * 100 + "%",
                        ],
                    }}
                    transition={{
                        duration: Math.random() * 20 + 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: Math.random() * 400 + 300 + "px",
                        height: Math.random() * 400 + 300 + "px",
                        background: i % 3 === 0
                            ? "var(--color-ocean-400)"
                            : i % 3 === 1
                                ? "var(--color-accent-purple)"
                                : "var(--color-accent-cyan)",
                    }}
                />
            ))}

            {/* Subtle noise or texture overlay if needed, currently keeping it clean */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(5,11,20,0)_0%,rgba(5,11,20,0.5)_100%)]" />
        </div>
    );
}
