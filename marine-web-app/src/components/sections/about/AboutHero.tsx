"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useTranslations, useLocale } from "next-intl";

export function AboutHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("about");
    const locale = useLocale();
    const isKorean = locale === "ko";

    useGSAP(
        () => {
            if (!sectionRef.current || !bgRef.current) return;

            // Parallax background
            gsap.to(bgRef.current, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

            // Text animation
            const title = sectionRef.current.querySelector(".hero-title");
            const subtitle = sectionRef.current.querySelector(".hero-subtitle");

            if (title) {
                gsap.from(title, {
                    opacity: 0,
                    y: 60,
                    duration: 1,
                    delay: 0.2,
                    ease: "power3.out",
                });
            }
            if (subtitle) {
                gsap.from(subtitle, {
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    delay: 0.5,
                    ease: "power3.out",
                });
            }
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative flex min-h-[70vh] items-center justify-center overflow-hidden"
        >
            {/* Background */}
            <div ref={bgRef} className="absolute inset-0 -top-[10%] h-[120%]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80')",
                    }}
                />
                <div className="from-marine-dark/70 via-marine-dark/60 to-marine-dark absolute inset-0 bg-gradient-to-b" />
            </div>

            {/* Content */}
            <div className="relative z-10 px-6 pt-32 pb-20 text-center">
                <span className="bg-ocean-500/20 border-ocean-500/30 text-ocean-300 mb-6 inline-block rounded-full border px-4 py-2 text-sm font-medium">
                    {t("badge")}
                </span>

                <h1 className="hero-title font-display mb-6 text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl xl:text-7xl">
                    {isKorean ? (
                        <>
                            바다의 가능성을
                            <br />
                            <span className="text-gradient-ocean">발견합니다</span>
                        </>
                    ) : (
                        <>
                            Discovering the
                            <br />
                            <span className="text-gradient-ocean">Possibilities of the Sea</span>
                        </>
                    )}
                </h1>

                <p className="hero-subtitle mx-auto max-w-3xl text-lg leading-relaxed text-white/60 md:text-xl">
                    {t("description")}
                </p>
            </div>
        </section>
    );
}
