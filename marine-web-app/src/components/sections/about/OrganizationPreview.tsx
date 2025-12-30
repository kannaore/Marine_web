"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/animations";
import { ChevronRight, Users, Briefcase, GraduationCap } from "lucide-react";

const orgStats = [
    {
        icon: Users,
        numberKo: "120+",
        numberEn: "120+",
        labelKo: "임직원",
        labelEn: "Employees",
    },
    {
        icon: Briefcase,
        numberKo: "50+",
        numberEn: "50+",
        labelKo: "기술인력",
        labelEn: "Engineers",
    },
    {
        icon: GraduationCap,
        numberKo: "30+",
        numberEn: "30+",
        labelKo: "석박사",
        labelEn: "PhDs & Masters",
    },
];

export function OrganizationPreview() {
    const sectionRef = useRef<HTMLElement>(null);
    const locale = useLocale();
    const isKorean = locale === "ko";

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const cards = sectionRef.current.querySelectorAll(".org-card");
            gsap.from(cards, {
                opacity: 0,
                y: 30,
                stagger: 0.15,
                duration: 0.5,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-marine-dark">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <div>
                        <FadeIn>
                            <span className="text-ocean-400 text-sm font-medium tracking-widest uppercase mb-4 block">
                                {isKorean ? "조직" : "Organization"}
                            </span>
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                                {isKorean
                                    ? "전문 인력이 이끄는\n기술 혁신"
                                    : "Technology Innovation\nLed by Experts"}
                            </h2>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <p className="text-white/60 text-lg leading-relaxed mb-8">
                                {isKorean
                                    ? "마린리서치는 해양조사 분야의 최고 전문가들로 구성되어 있습니다. 석박사급 연구인력과 풍부한 현장 경험을 갖춘 기술인력이 함께 고객에게 최상의 서비스를 제공합니다."
                                    : "Marine Research is composed of top experts in the marine survey field. Our PhD-level researchers and experienced engineers work together to provide the best services to our clients."}
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <Link
                                href="/about/organization"
                                className="inline-flex items-center gap-2 text-ocean-400 hover:text-ocean-300 transition-colors"
                            >
                                {isKorean ? "조직도 보기" : "View Organization"}
                                <ChevronRight size={18} />
                            </Link>
                        </FadeIn>
                    </div>

                    {/* Right: Stats Cards */}
                    <div className="grid grid-cols-3 gap-4">
                        {orgStats.map((stat) => (
                            <div
                                key={stat.labelEn}
                                className="org-card glass-panel rounded-2xl p-6 text-center"
                            >
                                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-ocean-500/20 flex items-center justify-center">
                                    <stat.icon className="w-6 h-6 text-ocean-400" />
                                </div>
                                <div className="font-display text-3xl font-bold text-white mb-1">
                                    {isKorean ? stat.numberKo : stat.numberEn}
                                </div>
                                <div className="text-white/50 text-sm">
                                    {isKorean ? stat.labelKo : stat.labelEn}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
