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
            className="from-marine-dark bg-gradient-to-b to-[#050a10] py-24 md:py-32"
        >
            <div className="container-custom">
                <FadeIn>
                    <div className="mb-12 flex items-end justify-between">
                        <div>
                            <span className="text-ocean-400 mb-4 block text-sm font-medium tracking-widest uppercase">
                                {isKorean ? "인증 및 자격" : "Certifications & Licenses"}
                            </span>
                            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                                {isKorean ? "신뢰할 수 있는 역량" : "Certified Excellence"}
                            </h2>
                        </div>
                        <Link
                            href="/about/certifications"
                            className="text-ocean-400 hover:text-ocean-300 hidden items-center gap-2 transition-colors md:flex"
                        >
                            {isKorean ? "전체 인증 보기" : "View All Certifications"}
                            <ChevronRight size={18} />
                        </Link>
                    </div>
                </FadeIn>

                {/* Certifications Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {certifications.map((cert) => (
                        <div
                            key={cert.titleEn}
                            className="cert-card glass-panel rounded-2xl p-8 transition-colors duration-300 hover:bg-white/10"
                        >
                            <div className="flex items-start gap-4">
                                <div className="bg-ocean-500/20 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl">
                                    <cert.icon className="text-ocean-400 h-7 w-7" />
                                </div>
                                <div>
                                    <div className="font-display mb-1 text-3xl font-bold text-white">
                                        {isKorean ? cert.countKo : cert.countEn}
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold text-white/80">
                                        {isKorean ? cert.titleKo : cert.titleEn}
                                    </h3>
                                    <p className="text-sm text-white/50">
                                        {isKorean ? cert.descKo : cert.descEn}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile: View All Link */}
                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/about/certifications"
                        className="text-ocean-400 inline-flex items-center gap-2"
                    >
                        {isKorean ? "전체 인증 보기" : "View All Certifications"}
                        <ChevronRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
