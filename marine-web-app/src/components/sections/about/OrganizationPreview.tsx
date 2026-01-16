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
        <section ref={sectionRef} className="bg-marine-dark py-24 md:py-32">
            <div className="container-custom">
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                    {/* Left: Content */}
                    <div>
                        <FadeIn>
                            <span className="text-ocean-400 mb-4 block text-sm font-medium tracking-widest uppercase">
                                {isKorean ? "조직" : "Organization"}
                            </span>
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <h2 className="font-display mb-6 text-3xl font-bold text-white md:text-4xl">
                                {isKorean
                                    ? "전문 인력이 이끄는\n기술 혁신"
                                    : "Technology Innovation\nLed by Experts"}
                            </h2>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <p className="mb-8 text-lg leading-relaxed text-white/60">
                                {isKorean
                                    ? "마린리서치는 해양조사 분야의 최고 전문가들로 구성되어 있습니다. 석박사급 연구인력과 풍부한 현장 경험을 갖춘 기술인력이 함께 고객에게 최상의 서비스를 제공합니다."
                                    : "Marine Research is composed of top experts in the marine survey field. Our PhD-level researchers and experienced engineers work together to provide the best services to our clients."}
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <Link
                                href="/about/organization"
                                className="text-ocean-400 hover:text-ocean-300 inline-flex items-center gap-2 transition-colors"
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
                                <div className="bg-ocean-500/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                                    <stat.icon className="text-ocean-400 h-6 w-6" />
                                </div>
                                <div className="font-display mb-1 text-3xl font-bold text-white">
                                    {isKorean ? stat.numberKo : stat.numberEn}
                                </div>
                                <div className="text-sm text-white/50">
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
