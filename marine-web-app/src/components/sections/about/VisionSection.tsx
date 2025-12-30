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
            className="py-24 md:py-32 bg-gradient-to-b from-marine-dark to-[#050a10]"
        >
            <div className="container-custom">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="text-ocean-400 text-sm font-medium tracking-widest uppercase mb-4 block">
                            {isKorean ? "비전 및 이념" : "Vision & Philosophy"}
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                            {isKorean
                                ? "지속 가능한 해양의 미래를 위해"
                                : "For a Sustainable Ocean Future"}
                        </h2>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {visionItems.map((item) => (
                        <div
                            key={item.titleEn}
                            className="vision-card glass-panel rounded-2xl p-8 text-center hover:bg-white/10 transition-colors duration-300"
                        >
                            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-ocean-500/20 flex items-center justify-center">
                                <item.icon className="w-8 h-8 text-ocean-400" />
                            </div>
                            <h3 className="font-display text-xl font-bold text-white mb-3">
                                {isKorean ? item.titleKo : item.titleEn}
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                {isKorean ? item.descKo : item.descEn}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
