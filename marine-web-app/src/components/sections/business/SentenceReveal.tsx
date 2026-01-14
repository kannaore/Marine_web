"use client";

import { useRef, useEffect, useState, type JSX } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useAnimationConfig } from "@/hooks/useAnimationConfig";

type AllowedTags = "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface SentenceRevealProps {
    text: string | string[];
    as?: AllowedTags;
    className?: string;
    isActive?: boolean;
    delay?: number;
}

export function SentenceReveal({
    text,
    as: Tag = "div",
    className = "",
    isActive = true,
    delay = 0,
}: SentenceRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [, setHasRevealed] = useState(false);

    // Get animation config from leva debug controls
    const { textDuration, textStagger, textDelay } = useAnimationConfig();

    const sentences = Array.isArray(text) ? text : [text];

    useGSAP(() => {
        if (!containerRef.current || !isActive) return;

        const values = containerRef.current.querySelectorAll(".sentence-value");
        if (values.length === 0) return;

        // Reset first
        gsap.set(values, { y: "100%", opacity: 0 });

        // Animate in with stagger (values from leva debug controls)
        gsap.to(values, {
            y: "0%",
            opacity: 1,
            duration: textDuration,
            stagger: textStagger,
            delay: delay + textDelay,
            ease: "power4.out", // easeOutQuart equivalent
            onComplete: () => setHasRevealed(true),
        });

        return () => {
            // Cleanup on deactivation
            if (!isActive) {
                gsap.set(values, { y: "100%", opacity: 0 });
                setHasRevealed(false);
            }
        };
    }, { scope: containerRef, dependencies: [isActive, delay, textDuration, textStagger, textDelay] });

    // Reset when becoming inactive
    useEffect(() => {
        if (!isActive && containerRef.current) {
            const values = containerRef.current.querySelectorAll(".sentence-value");
            gsap.set(values, { y: "100%", opacity: 0 });
            setHasRevealed(false);
        }
    }, [isActive]);

    const content = (
        <>
            {sentences.map((sentence, index) => (
                <span key={index} className="sentence block overflow-hidden">
                    <span
                        className="sentence-value block"
                        style={{ transform: "translateY(100%)", opacity: 0 }}
                    >
                        {sentence}
                    </span>
                </span>
            ))}
        </>
    );

    // Use a wrapper div for ref, render Tag inside for semantic HTML
    if (Tag === "div") {
        return (
            <div ref={containerRef} className={`effect-sentence ${className}`}>
                {content}
            </div>
        );
    }

    // For heading tags, wrap in a div for ref but render Tag for semantics
    return (
        <div ref={containerRef} className={`effect-sentence ${className}`}>
            <Tag className="contents">
                {sentences.map((sentence, index) => (
                    <span key={index} className="sentence block overflow-hidden">
                        <span
                            className="sentence-value block"
                            style={{ transform: "translateY(100%)", opacity: 0 }}
                        >
                            {sentence}
                        </span>
                    </span>
                ))}
            </Tag>
        </div>
    );
}
