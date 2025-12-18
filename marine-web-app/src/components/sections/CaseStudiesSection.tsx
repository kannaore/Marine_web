"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading, CaseStudyCard, Button } from "@/components/ui";
import { FadeIn } from "@/components/animations";

const caseStudies = [
    {
        title: "신안 해상풍력 지반조사",
        location: "전라남도 신안군",
        category: "해상풍력",
        image:
            "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
    },
    {
        title: "부산신항 해저지형조사",
        location: "부산광역시",
        category: "지구물리",
        image:
            "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80",
    },
    {
        title: "울산 해양플랜트 CPT 조사",
        location: "울산광역시",
        category: "지오테크니컬",
        image:
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    },
    {
        title: "제주 해상케이블 루트조사",
        location: "제주특별자치도",
        category: "지구물리",
        image:
            "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
    },
    {
        title: "인천 LNG 터미널 조사",
        location: "인천광역시",
        category: "지오테크니컬",
        image:
            "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    },
];

export function CaseStudiesSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    return (
        <section
            id="projects"
            ref={containerRef}
            className="section-padding bg-marine-deeper overflow-hidden"
        >
            <div className="container-custom mb-12">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
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
                                className="ml-2 group-hover:translate-x-1 transition-transform"
                            />
                        </Button>
                    </FadeIn>
                </div>
            </div>

            {/* Horizontal Scroll Carousel */}
            <motion.div style={{ x }} className="flex gap-6 pl-6 md:pl-[max(2rem,calc((100vw-1400px)/2+2rem))]">
                {caseStudies.map((study, index) => (
                    <motion.div
                        key={study.title}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <CaseStudyCard
                            title={study.title}
                            location={study.location}
                            category={study.category}
                            image={study.image}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
