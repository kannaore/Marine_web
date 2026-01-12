"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/animations";
import { ChevronRight } from "lucide-react";

const historyData = [
    {
        year: "2024",
        titleKo: "해상풍력 분야 국내 1위 달성",
        titleEn: "Achieved #1 in Offshore Wind Sector",
        descKo: "국내 해상풍력 조사 프로젝트 점유율 1위",
        descEn: "Ranked #1 in domestic offshore wind survey projects",
    },
    {
        year: "2020",
        titleKo: "대형 조사선 '마린리서처' 진수",
        titleEn: "Launch of Survey Vessel 'Marine Researcher'",
        descKo: "1,500톤급 최첨단 해양조사선 자체 건조",
        descEn: "Self-built 1,500-ton state-of-the-art survey vessel",
    },
    {
        year: "2015",
        titleKo: "ISO 9001/14001/45001 인증 획득",
        titleEn: "ISO 9001/14001/45001 Certified",
        descKo: "품질·환경·안전보건 경영시스템 인증",
        descEn: "Quality, Environment, Safety Management System Certification",
    },
    {
        year: "2004",
        titleKo: "마린리서치 설립",
        titleEn: "Marine Research Founded",
        descKo: "해양조사 전문기업 마린리서치 창립",
        descEn: "Marine Research established as marine survey specialist",
    },
];

export function HistoryPreview() {
    const sectionRef = useRef<HTMLElement>(null);
    const locale = useLocale();
    const isKorean = locale === "ko";

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const items = sectionRef.current.querySelectorAll(".history-item");
            gsap.from(items, {
                opacity: 0,
                x: -30,
                stagger: 0.2,
                duration: 0.6,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
            });

            // Animate the timeline line
            const line = sectionRef.current.querySelector(".timeline-line");
            if (line) {
                gsap.from(line, {
                    scaleY: 0,
                    transformOrigin: "top",
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
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
                <FadeIn>
                    <div className="mb-16 flex items-end justify-between">
                        <div>
                            <span className="text-ocean-400 mb-4 block text-sm font-medium tracking-widest uppercase">
                                {isKorean ? "연혁" : "History"}
                            </span>
                            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                                {isKorean ? "성장의 발자취" : "Milestones of Growth"}
                            </h2>
                        </div>
                        <Link
                            href="/about/history"
                            className="text-ocean-400 hover:text-ocean-300 hidden items-center gap-2 transition-colors md:flex"
                        >
                            {isKorean ? "전체 연혁 보기" : "View Full History"}
                            <ChevronRight size={18} />
                        </Link>
                    </div>
                </FadeIn>

                <div className="relative pl-8 md:pl-12">
                    {/* Timeline Line */}
                    <div className="timeline-line from-ocean-500 via-ocean-500/50 absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b to-transparent" />

                    {/* Timeline Items */}
                    <div className="space-y-12">
                        {historyData.map((item, index) => (
                            <div key={item.year} className="history-item relative">
                                {/* Dot */}
                                <div className="bg-ocean-500 border-marine-dark absolute top-1 -left-8 h-4 w-4 rounded-full border-4 md:-left-12" />

                                <div className="flex items-start gap-6">
                                    <span className="font-display text-ocean-400 shrink-0 text-2xl font-bold md:text-3xl">
                                        {item.year}
                                    </span>
                                    <div>
                                        <h3 className="mb-1 text-lg font-semibold text-white md:text-xl">
                                            {isKorean ? item.titleKo : item.titleEn}
                                        </h3>
                                        <p className="text-sm text-white/50">
                                            {isKorean ? item.descKo : item.descEn}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile: View All Link */}
                <div className="mt-10 md:hidden">
                    <Link
                        href="/about/history"
                        className="text-ocean-400 inline-flex items-center gap-2"
                    >
                        {isKorean ? "전체 연혁 보기" : "View Full History"}
                        <ChevronRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
