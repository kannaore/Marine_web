"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useTranslations, useLocale } from "next-intl";
import { FadeIn } from "@/components/animations";

export function GreetingSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const t = useTranslations("about");
    const locale = useLocale();
    const isKorean = locale === "ko";

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const quote = sectionRef.current.querySelector(".quote-line");
            if (quote) {
                gsap.from(quote, {
                    scaleX: 0,
                    transformOrigin: "left",
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                });
            }
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="bg-marine-dark py-24 md:py-32">
            <div className="container-custom">
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                    {/* Left: Image */}
                    <FadeIn>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        "url('https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80')",
                                }}
                            />
                            <div className="from-marine-dark/50 absolute inset-0 bg-gradient-to-t to-transparent" />
                        </div>
                    </FadeIn>

                    {/* Right: Content */}
                    <div>
                        <FadeIn>
                            <span className="text-ocean-400 mb-4 block text-sm font-medium tracking-widest uppercase">
                                {isKorean ? "인사말" : "CEO Message"}
                            </span>
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <h2 className="font-display mb-8 text-3xl leading-tight font-bold text-white md:text-4xl">
                                {isKorean
                                    ? "바다를 향한 약속,\n20년의 여정"
                                    : "A Promise to the Sea,\n20 Years of Journey"}
                            </h2>
                        </FadeIn>

                        <div className="quote-line bg-ocean-500 mb-8 h-1 w-16" />

                        <FadeIn delay={0.2}>
                            <blockquote className="mb-6 text-lg leading-relaxed text-white/70">
                                {isKorean
                                    ? '"마린리서치는 대한민국 해양조사 산업의 발전을 위해 끊임없이 도전하고 혁신해왔습니다. 앞으로도 고객 여러분과 함께 바다의 무한한 가능성을 열어가겠습니다."'
                                    : '"Marine Research has continuously challenged and innovated for the advancement of Korea\'s marine survey industry. We will continue to unlock the infinite possibilities of the sea with our valued customers."'}
                            </blockquote>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <div className="text-white/50">
                                <p className="font-medium text-white">
                                    {isKorean ? "홍길동" : "Hong Gil-dong"}
                                </p>
                                <p className="text-sm">
                                    {isKorean ? "마린리서치 대표이사" : "CEO, Marine Research"}
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
