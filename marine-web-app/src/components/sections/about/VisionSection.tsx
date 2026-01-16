"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLocale } from "next-intl";
import { FadeIn } from "@/components/animations";
import { Target, Lightbulb, Users, Globe } from "lucide-react";

const visionItems = [
    {
        icon: Target,
        titleKo: "미션",
        titleEn: "Mission",
        descKo: "정밀한 해양조사를 통해 안전하고 지속 가능한 해양 환경을 구현합니다.",
        descEn: "We create a safe and sustainable marine environment through precision surveys.",
    },
    {
        icon: Lightbulb,
        titleKo: "비전",
        titleEn: "Vision",
        descKo: "아시아 최고의 해양조사 전문기업으로 성장합니다.",
        descEn: "We aim to become Asia's leading marine survey company.",
    },
    {
        icon: Users,
        titleKo: "핵심 가치",
        titleEn: "Core Values",
        descKo: "전문성, 신뢰, 혁신, 안전을 최우선으로 합니다.",
        descEn: "We prioritize expertise, trust, innovation, and safety.",
    },
    {
        icon: Globe,
        titleKo: "목표",
        titleEn: "Goal",
        descKo: "글로벌 해양조사 시장에서 기술 리더십을 확보합니다.",
        descEn: "We secure technology leadership in the global marine survey market.",
    },
];

export function VisionSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const locale = useLocale();
    const isKorean = locale === "ko";

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const cards = sectionRef.current.querySelectorAll(".vision-card");
            gsap.from(cards, {
                opacity: 0,
                y: 40,
                stagger: 0.15,
                duration: 0.6,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="from-marine-dark bg-gradient-to-b to-[#050a10] py-24 md:py-32"
        >
            <div className="container-custom">
                <FadeIn>
                    <div className="mb-16 text-center">
                        <span className="text-ocean-400 mb-4 block text-sm font-medium tracking-widest uppercase">
                            {isKorean ? "비전 및 이념" : "Vision & Philosophy"}
                        </span>
                        <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                            {isKorean
                                ? "지속 가능한 해양의 미래를 위해"
                                : "For a Sustainable Ocean Future"}
                        </h2>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {visionItems.map((item) => (
                        <div
                            key={item.titleEn}
                            className="vision-card glass-panel rounded-2xl p-8 text-center transition-colors duration-300 hover:bg-white/10"
                        >
                            <div className="bg-ocean-500/20 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                                <item.icon className="text-ocean-400 h-8 w-8" />
                            </div>
                            <h3 className="font-display mb-3 text-xl font-bold text-white">
                                {isKorean ? item.titleKo : item.titleEn}
                            </h3>
                            <p className="text-sm leading-relaxed text-white/60">
                                {isKorean ? item.descKo : item.descEn}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
