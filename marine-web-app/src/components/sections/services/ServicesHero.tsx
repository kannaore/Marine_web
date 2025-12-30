"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLocale } from "next-intl";

const stats = [
    { valueKo: "500+", valueEn: "500+", labelKo: "완료 프로젝트", labelEn: "Projects Delivered" },
    { valueKo: "15+", valueEn: "15+", labelKo: "서비스 국가", labelEn: "Countries Served" },
    { valueKo: "99.9%", valueEn: "99.9%", labelKo: "데이터 정확도", labelEn: "Data Accuracy" },
    { valueKo: "24/7", valueEn: "24/7", labelKo: "기술 지원", labelEn: "Support Available" },
];

export function ServicesHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
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

            // Stats animation
            const statItems = sectionRef.current.querySelectorAll(".stat-item");
            gsap.from(statItems, {
                opacity: 0,
                y: 30,
                stagger: 0.1,
                duration: 0.6,
                delay: 0.5,
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
            className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        >
            {/* Background */}
            <div ref={bgRef} className="absolute inset-0 -top-[10%] h-[120%]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-marine-dark/70 via-marine-dark/60 to-marine-dark" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 pt-32 pb-20">
                <span className="inline-block mb-6 px-4 py-2 bg-ocean-500/20 border border-ocean-500/30 rounded-full text-ocean-300 text-sm font-medium">
                    {isKorean ? "사업분야" : "Our Services"}
                </span>

                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
                    {isKorean ? (
                        <>
                            해양조사의<br />
                            <span className="text-gradient-ocean">새로운 기준</span>
                        </>
                    ) : (
                        <>
                            The Future of<br />
                            <span className="text-gradient-ocean">Marine Survey</span>
                        </>
                    )}
                </h1>

                <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-16">
                    {isKorean
                        ? "수로조사부터 해상풍력까지, 최첨단 기술로 해양 프로젝트의 성공을 이끕니다."
                        : "From hydrographic surveys to offshore wind, leading marine projects to success with cutting-edge technology."}
                </p>

                {/* Stats */}
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div key={stat.labelEn} className="stat-item text-center">
                            <div className="text-3xl md:text-4xl font-bold text-ocean-400 font-display">
                                {isKorean ? stat.valueKo : stat.valueEn}
                            </div>
                            <div className="text-white/50 text-sm mt-2">
                                {isKorean ? stat.labelKo : stat.labelEn}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
