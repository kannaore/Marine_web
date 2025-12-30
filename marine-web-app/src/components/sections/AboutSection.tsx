"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { FadeIn, TextReveal } from "@/components/animations";
import { Button } from "@/components/ui";

const stats = [
    { number: "20+", label: "Years Experience" },
    { number: "500+", label: "Projects Completed" },
    { number: "50+", label: "Expert Team" },
    { number: "15+", label: "Countries Served" },
];

export function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            // Parallax background
            if (bgRef.current) {
                gsap.to(bgRef.current, {
                    yPercent: 30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }

            // Stats cards stagger
            const statCards = sectionRef.current.querySelectorAll(".stat-card");
            gsap.from(statCards, {
                opacity: 0,
                y: 30,
                stagger: 0.1,
                duration: 0.5,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none none",
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section id="about" ref={sectionRef} className="relative overflow-hidden">
            {/* Parallax Background */}
            <div ref={bgRef} className="absolute inset-0 -top-[20%] h-[140%]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=1920&q=80')",
                    }}
                />
                <div className="absolute inset-0 bg-marine-dark/85" />
            </div>

            <div className="relative z-10 section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Text Content */}
                        <div>
                            <FadeIn>
                                <span className="inline-block mb-4 px-4 py-2 bg-ocean-500/20 border border-ocean-500/30 rounded-full text-ocean-300 text-sm">
                                    회사소개
                                </span>
                            </FadeIn>

                            <FadeIn delay={0.1}>
                                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                    바다의 가능성을
                                    <br />
                                    <span className="text-gradient-ocean">발견합니다</span>
                                </h2>
                            </FadeIn>

                            <div className="text-lg text-white/70 leading-relaxed mb-8">
                                <TextReveal text="마린리서치는 2004년 설립 이래 대한민국 해양조사 산업을 선도해 왔습니다. 해상풍력, 항만, 해저케이블 등 다양한 해양 프로젝트에서 축적한 경험과 기술력을 바탕으로 고객에게 최적의 솔루션을 제공합니다." />
                            </div>

                            <FadeIn delay={0.3}>
                                <div className="flex flex-wrap gap-4">
                                    <Button>회사소개서 다운로드</Button>
                                    <Button variant="secondary">연혁 보기</Button>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="stat-card glass-panel rounded-2xl p-8 text-center"
                                >
                                    <div className="font-display text-4xl md:text-5xl font-bold text-gradient-ocean mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-white/60 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
