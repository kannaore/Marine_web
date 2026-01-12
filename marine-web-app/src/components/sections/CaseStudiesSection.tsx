"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";
import { SectionHeading, CaseStudyCard, Button } from "@/components/ui";
import { FadeIn } from "@/components/animations";

const caseStudies = [
    {
        title: "신안 해상풍력 지반조사",
        location: "전라남도 신안군",
        category: "해상풍력",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    },
    {
        title: "부산신항 해저지형조사",
        location: "부산광역시",
        category: "지구물리",
        image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80",
    },
    {
        title: "울산 해양플랜트 CPT 조사",
        location: "울산광역시",
        category: "지오테크니컬",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    },
    {
        title: "제주 해상케이블 루트조사",
        location: "제주특별자치도",
        category: "지구물리",
        image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
    },
    {
        title: "인천 LNG 터미널 조사",
        location: "인천광역시",
        category: "지오테크니컬",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    },
];

export function CaseStudiesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current || !carouselRef.current) return;

            // Horizontal scroll parallax
            gsap.to(carouselRef.current, {
                xPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            // Cards stagger
            const cards = carouselRef.current.querySelectorAll(".case-card");
            gsap.from(cards, {
                opacity: 0,
                y: 40,
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
            id="projects"
            ref={sectionRef}
            className="section-padding bg-marine-dark overflow-hidden"
        >
            <div className="container-custom mb-12">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <SectionHeading
                        title="프로젝트 실적"
                        subtitle="다양한 해양 프로젝트에서 축적한 전문성과 노하우"
                        align="left"
                    />
                    <FadeIn>
                        <Button variant="ghost" className="group">
                            전체 보기
                            <ArrowRight
                                size={16}
                                className="ml-2 transition-transform group-hover:translate-x-1"
                            />
                        </Button>
                    </FadeIn>
                </div>
            </div>

            {/* Horizontal Scroll Carousel */}
            <div
                ref={carouselRef}
                className="flex gap-6 pl-6 md:pl-[max(2rem,calc((100vw-1400px)/2+2rem))]"
            >
                {caseStudies.map((study) => (
                    <div key={study.title} className="case-card">
                        <CaseStudyCard
                            title={study.title}
                            location={study.location}
                            category={study.category}
                            image={study.image}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
