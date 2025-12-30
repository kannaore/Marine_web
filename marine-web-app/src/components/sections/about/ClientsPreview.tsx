"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/animations";
import { ChevronRight } from "lucide-react";

// Placeholder client logos - replace with actual logos
const clients = [
    { name: "한국해양과학기술원", nameEn: "KIOST" },
    { name: "해양수산부", nameEn: "MOF" },
    { name: "한국전력공사", nameEn: "KEPCO" },
    { name: "한국석유공사", nameEn: "KNOC" },
    { name: "SK E&S", nameEn: "SK E&S" },
    { name: "오스테드", nameEn: "Ørsted" },
    { name: "이퀴노르", nameEn: "Equinor" },
    { name: "해양환경공단", nameEn: "KOEM" },
];

export function ClientsPreview() {
    const sectionRef = useRef<HTMLElement>(null);
    const locale = useLocale();
    const isKorean = locale === "ko";

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const logos = sectionRef.current.querySelectorAll(".client-logo");
            gsap.from(logos, {
                opacity: 0,
                scale: 0.9,
                stagger: 0.1,
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
            className="py-24 md:py-32 bg-gradient-to-b from-[#050a10] to-marine-dark"
        >
            <div className="container-custom">
                <FadeIn>
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <span className="text-ocean-400 text-sm font-medium tracking-widest uppercase mb-4 block">
                                {isKorean ? "주요 고객사" : "Our Clients"}
                            </span>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                                {isKorean ? "신뢰받는 파트너십" : "Trusted Partnerships"}
                            </h2>
                        </div>
                        <Link
                            href="/about/clients"
                            className="hidden md:flex items-center gap-2 text-ocean-400 hover:text-ocean-300 transition-colors"
                        >
                            {isKorean ? "전체 고객사 보기" : "View All Clients"}
                            <ChevronRight size={18} />
                        </Link>
                    </div>
                </FadeIn>

                {/* Clients Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {clients.map((client) => (
                        <div
                            key={client.nameEn}
                            className="client-logo glass-panel rounded-xl p-6 md:p-8 flex items-center justify-center hover:bg-white/10 transition-colors duration-300"
                        >
                            <span className="text-white/60 font-medium text-center text-sm md:text-base">
                                {isKorean ? client.name : client.nameEn}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Mobile: View All Link */}
                <div className="md:hidden mt-8 text-center">
                    <Link
                        href="/about/clients"
                        className="inline-flex items-center gap-2 text-ocean-400"
                    >
                        {isKorean ? "전체 고객사 보기" : "View All Clients"}
                        <ChevronRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
