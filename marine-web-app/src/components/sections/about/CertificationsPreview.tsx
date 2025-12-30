"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/animations";
import { ChevronRight, Award, FileCheck, Lightbulb } from "lucide-react";

const certifications = [
    {
        icon: Award,
        titleKo: "면허",
        titleEn: "Licenses",
        countKo: "15+",
        countEn: "15+",
        descKo: "해양조사업, 수로측량업 등",
        descEn: "Marine Survey, Hydrographic Survey, etc.",
    },
    {
        icon: FileCheck,
        titleKo: "인증",
        titleEn: "Certifications",
        countKo: "10+",
        countEn: "10+",
        descKo: "ISO 9001, 14001, 45001 등",
        descEn: "ISO 9001, 14001, 45001, etc.",
    },
    {
        icon: Lightbulb,
        titleKo: "특허",
        titleEn: "Patents",
        countKo: "20+",
        countEn: "20+",
        descKo: "해양조사 관련 기술 특허",
        descEn: "Marine survey technology patents",
    },
];

export function CertificationsPreview() {
    const sectionRef = useRef<HTMLElement>(null);
    const locale = useLocale();
    const isKorean = locale === "ko";

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const cards = sectionRef.current.querySelectorAll(".cert-card");
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
        <section
            ref={sectionRef}
            className="py-24 md:py-32 bg-gradient-to-b from-marine-dark to-[#050a10]"
        >
            <div className="container-custom">
                <FadeIn>
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <span className="text-ocean-400 text-sm font-medium tracking-widest uppercase mb-4 block">
                                {isKorean ? "인증 및 자격" : "Certifications & Licenses"}
                            </span>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                                {isKorean ? "신뢰할 수 있는 역량" : "Certified Excellence"}
                            </h2>
                        </div>
                        <Link
                            href="/about/certifications"
                            className="hidden md:flex items-center gap-2 text-ocean-400 hover:text-ocean-300 transition-colors"
                        >
                            {isKorean ? "전체 인증 보기" : "View All Certifications"}
                            <ChevronRight size={18} />
                        </Link>
                    </div>
                </FadeIn>

                {/* Certifications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {certifications.map((cert) => (
                        <div
                            key={cert.titleEn}
                            className="cert-card glass-panel rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-xl bg-ocean-500/20 flex items-center justify-center shrink-0">
                                    <cert.icon className="w-7 h-7 text-ocean-400" />
                                </div>
                                <div>
                                    <div className="font-display text-3xl font-bold text-white mb-1">
                                        {isKorean ? cert.countKo : cert.countEn}
                                    </div>
                                    <h3 className="text-lg font-semibold text-white/80 mb-2">
                                        {isKorean ? cert.titleKo : cert.titleEn}
                                    </h3>
                                    <p className="text-white/50 text-sm">
                                        {isKorean ? cert.descKo : cert.descEn}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile: View All Link */}
                <div className="md:hidden mt-8 text-center">
                    <Link
                        href="/about/certifications"
                        className="inline-flex items-center gap-2 text-ocean-400"
                    >
                        {isKorean ? "전체 인증 보기" : "View All Certifications"}
                        <ChevronRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
