"use client";

import { FadeIn } from "@/components/animations";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    align?: "left" | "center";
    light?: boolean;
}

export function SectionHeading({
    title,
    subtitle,
    align = "center",
    light = false,
}: SectionHeadingProps) {
    const alignClass = align === "center" ? "text-center" : "text-left";

    return (
        <div className={`mb-12 md:mb-16 ${alignClass}`}>
            <FadeIn>
                <h2
                    className={`font-display mb-4 text-3xl font-bold md:text-4xl lg:text-5xl ${
                        light ? "text-marine-dark" : "text-white"
                    }`}
                >
                    {title}
                </h2>
            </FadeIn>
            {subtitle && (
                <FadeIn delay={0.1}>
                    <p
                        className={`max-w-2xl text-lg md:text-xl ${
                            align === "center" ? "mx-auto" : ""
                        } ${light ? "text-marine-dark/70" : "text-white/60"}`}
                    >
                        {subtitle}
                    </p>
                </FadeIn>
            )}
        </div>
    );
}
