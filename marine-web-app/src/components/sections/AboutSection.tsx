"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeIn, TextReveal } from "@/components/animations";
import { Button } from "@/components/ui";

const stats = [
    { number: "20+", label: "Years Experience" },
    { number: "500+", label: "Projects Completed" },
    { number: "50+", label: "Expert Team" },
    { number: "15+", label: "Countries Served" },
];

export function AboutSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <section id="about" ref={ref} className="relative overflow-hidden">
            {/* Parallax Background */}
            <motion.div style={{ y }} className="absolute inset-0 -top-[20%] h-[140%]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=1920&q=80')",
                    }}
                />
                <div className="absolute inset-0 bg-marine-dark/85" />
            </motion.div>

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
                                    <span className="gradient-text">발견합니다</span>
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
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass rounded-2xl p-8 text-center"
                                >
                                    <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-white/60 text-sm">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
