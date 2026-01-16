"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface TextRevealProps {
    text: string;
    className?: string;
}

export function TextReveal({ text, className = "" }: TextRevealProps) {
    const containerRef = useRef<HTMLParagraphElement>(null);
    const [isClient, setIsClient] = useState(false);
    const words = text.split(" ");

    useEffect(() => {
        setIsClient(true);
    }, []);

    useGSAP(
        () => {
            if (!containerRef.current || !isClient) return;

            const wordElements = containerRef.current.querySelectorAll(".text-reveal-word");
            if (wordElements.length === 0) return;

            // Create a timeline for progressive reveal
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                    end: "top 30%",
                    scrub: true,
                },
            });

            wordElements.forEach((word, index) => {
                const progress = index / wordElements.length;
                tl.fromTo(
                    word,
                    { opacity: 0.2, y: 20 },
                    { opacity: 1, y: 0, duration: 0.1 },
                    progress
                );
            });
        },
        { scope: containerRef, dependencies: [isClient, words.length] }
    );

    return (
        <p ref={containerRef} className={`flex flex-wrap ${className}`}>
            {words.map((word, i) => (
                <span key={i} className="relative mt-2 mr-3">
                    <span className="text-reveal-word inline-block" style={{ opacity: 0.2 }}>
                        {word}
                    </span>
                </span>
            ))}
        </p>
    );
}
