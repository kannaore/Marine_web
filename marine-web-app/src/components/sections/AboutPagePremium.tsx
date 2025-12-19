"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Quote, Play, ChevronDown, Anchor, Ship, Compass, Target, Users, Globe, Award, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Animated Counter Hook
function useCounter(end: number, duration: number = 2000) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isInView, end, duration]);

    return { count, ref };
}

// Floating Particles Background
function FloatingParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                />
            ))}
        </div>
    );
}

// Glassmorphism Card
function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn(
            "relative backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl",
            "shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden",
            className
        )}>
            {/* Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none" />
            <div className="relative z-10">{children}</div>
        </div>
    );
}

// Hero Section with Parallax
function HeroSection({ image, title, subtitle }: { image: string; title: string; subtitle: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={ref} className="relative h-screen w-full overflow-hidden">
            {/* Parallax Background */}
            <motion.div style={{ y }} className="absolute inset-0">
                <Image src={image} alt={title} fill className="object-cover scale-110" priority quality={90} />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050b14]/80 via-[#050b14]/40 to-[#050b14]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050b14]/60 to-transparent" />
            </motion.div>

            <FloatingParticles />

            {/* Content */}
            <motion.div style={{ opacity }} className="relative h-full flex flex-col justify-center items-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-8"
                >
                    <Anchor size={64} className="text-cyan-400 mx-auto animate-pulse" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-4xl md:text-5xl lg:text-7xl font-bold text-white font-display mb-6 max-w-5xl leading-tight"
                >
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                        바다의 미래
                    </span>
                    를
                    <br />
                    <span className="text-white">개척합니다</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-12"
                >
                    {subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="flex gap-4"
                >
                    <button className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300">
                        회사 소개 영상
                        <Play size={20} className="group-hover:scale-110 transition-transform" />
                    </button>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <ChevronDown size={36} className="text-white/40" />
                </motion.div>
            </motion.div>
        </section>
    );
}

// Animated Stats Section
function StatsSection({ stats }: { stats: { value: number; suffix: string; label: string; icon: React.ReactNode }[] }) {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Blur Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050b14] via-[#0a1628] to-[#050b14]" />
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />

            <div className="relative max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => {
                        const { count, ref } = useCounter(stat.value);
                        return (
                            <motion.div
                                key={stat.label}
                                ref={ref}
                                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <GlassCard className="p-8 text-center hover:scale-105 transition-transform duration-300">
                                    <div className="text-cyan-400 mb-4 flex justify-center">{stat.icon}</div>
                                    <div className="text-4xl md:text-5xl font-bold text-white font-display mb-2">
                                        {count.toLocaleString()}
                                        <span className="text-cyan-400">{stat.suffix}</span>
                                    </div>
                                    <div className="text-sm text-white/50">{stat.label}</div>
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// Vision & Mission Section
function VisionMissionSection() {
    return (
        <section className="relative py-32 bg-white overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050b14] to-transparent" />
            <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-cyan-100 rounded-full blur-[100px] opacity-50" />

            <div className="relative max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm">Our Vision</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-display mt-4 leading-tight">
                        해양의 무한한 가능성을
                        <br />
                        <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                            현실로 만듭니다
                        </span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {[
                        {
                            icon: <Target size={48} className="text-cyan-600" />,
                            title: "미션",
                            desc: "첨단 해양조사 기술로 대한민국의 해양 인프라 발전에 기여하고, 안전하고 지속 가능한 바다를 만들어갑니다.",
                            gradient: "from-cyan-500/20 to-blue-500/20",
                        },
                        {
                            icon: <Compass size={48} className="text-purple-600" />,
                            title: "비전",
                            desc: "2030년까지 아시아 태평양 지역 최고의 해양조사 전문기업으로 성장하여, 글로벌 해양 산업을 선도합니다.",
                            gradient: "from-purple-500/20 to-pink-500/20",
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className={cn(
                                "relative p-10 rounded-3xl overflow-hidden",
                                "bg-gradient-to-br", item.gradient,
                                "border border-gray-100 hover:shadow-2xl transition-shadow duration-500"
                            )}
                        >
                            <div className="mb-6">{item.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// CEO Message with Animated Quote
function CEOSection({ quote, name, title, image }: { quote: string; name: string; title: string; image: string }) {
    return (
        <section className="relative py-32 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50, rotate: -5 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                            <Image src={image} alt={name} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                        </div>
                        {/* Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="absolute -bottom-6 -right-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-xl"
                        >
                            <span className="font-bold">Since 2004</span>
                        </motion.div>
                    </motion.div>

                    {/* Quote */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Quote size={64} className="text-cyan-500/30 mb-6" />
                        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-light italic">
                            "{quote}"
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-px bg-gradient-to-r from-cyan-500 to-blue-500" />
                            <div>
                                <div className="font-bold text-gray-900 text-lg">{name}</div>
                                <div className="text-gray-500">{title}</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// Timeline / History Section
function HistorySection() {
    const milestones = [
        { year: "2004", title: "회사 설립", desc: "해양조사 전문기업 마린리서치 창립" },
        { year: "2010", title: "첫 대형 프로젝트", desc: "국가 해양조사 사업 첫 수주" },
        { year: "2015", title: "해상풍력 진출", desc: "서남해 해상풍력 조사 착수" },
        { year: "2018", title: "글로벌 확장", desc: "동남아시아 지역 진출" },
        { year: "2022", title: "기술 혁신", desc: "AI 기반 해저 분석 시스템 개발" },
        { year: "2024", title: "업계 선도", desc: "아시아 태평양 Top 10 기업 선정" },
    ];

    return (
        <section className="relative py-32 bg-[#050b14] overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-cyan-400 font-semibold tracking-wider uppercase text-sm">Our Journey</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-display mt-4">
                        20년의 <span className="text-cyan-400">도전과 성장</span>
                    </h2>
                </motion.div>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />

                    {milestones.map((milestone, index) => (
                        <motion.div
                            key={milestone.year}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={cn(
                                "relative flex items-center mb-12",
                                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                            )}
                        >
                            <div className={cn("w-1/2 px-8", index % 2 === 0 ? "text-right" : "text-left")}>
                                <GlassCard className="p-6 inline-block hover:scale-105 transition-transform duration-300">
                                    <div className="text-cyan-400 font-bold text-2xl mb-2">{milestone.year}</div>
                                    <div className="text-white font-semibold text-lg mb-1">{milestone.title}</div>
                                    <div className="text-white/60 text-sm">{milestone.desc}</div>
                                </GlassCard>
                            </div>

                            {/* Center Dot */}
                            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.8)]" />

                            <div className="w-1/2" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Core Values Section
function ValuesSection() {
    const values = [
        { icon: <Ship size={32} />, title: "도전", desc: "미지의 바다를 향한 끊임없는 도전 정신", color: "from-cyan-500 to-blue-500" },
        { icon: <Users size={32} />, title: "협력", desc: "팀워크와 파트너십을 통한 시너지 창출", color: "from-blue-500 to-purple-500" },
        { icon: <Award size={32} />, title: "전문성", desc: "최고 수준의 기술력과 품질 추구", color: "from-purple-500 to-pink-500" },
        { icon: <Globe size={32} />, title: "지속가능성", desc: "환경과 공존하는 책임있는 경영", color: "from-pink-500 to-orange-500" },
    ];

    return (
        <section className="relative py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm">Core Values</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-display mt-4">
                        우리의 <span className="text-cyan-600">핵심 가치</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 50, rotateX: -20 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                        >
                            {/* Hover Gradient */}
                            <div className={cn(
                                "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                                "bg-gradient-to-br", value.color
                            )} />

                            <div className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center mb-6",
                                "bg-gradient-to-br", value.color, "text-white"
                            )}>
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Competency Cards with Hover Effects
function CompetencySection({ competencies }: { competencies: { id: string; icon: string; title: string; description: string; image: string }[] }) {
    return (
        <section className="relative py-32 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm">Capabilities</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-display mt-4">
                        우수한 <span className="text-cyan-600">기술 경쟁력</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mt-4">
                        최첨단 장비와 전문 인력을 바탕으로 최고 수준의 해양조사 서비스를 제공합니다
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {competencies.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -15 }}
                            className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-5xl">{item.icon}</div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                                <div className="mt-4 flex items-center text-cyan-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    자세히 보기 <ArrowRight size={16} className="ml-1" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// News Section with Modern Cards
function NewsSection({ news }: { news: { id: string; date: string; title: string; category: string; thumbnail?: string }[] }) {
    return (
        <section className="relative py-32 bg-white overflow-hidden">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-end justify-between mb-12"
                >
                    <div>
                        <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm">News</span>
                        <h2 className="text-4xl font-bold text-gray-900 font-display mt-2">보도자료</h2>
                    </div>
                    <Link href="/news" className="group flex items-center gap-2 text-cyan-600 font-medium hover:text-cyan-700">
                        전체보기 <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </motion.div>

                <div className="space-y-6">
                    {news.map((item, index) => (
                        <motion.article
                            key={item.id}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ x: 10 }}
                            className="group flex gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            {item.thumbnail && (
                                <div className="relative w-32 h-24 rounded-xl overflow-hidden shrink-0 shadow-lg">
                                    <Image src={item.thumbnail} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                            )}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">{item.category}</span>
                                    <span className="text-xs text-gray-400">{item.date}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors">{item.title}</h3>
                            </div>
                            <ArrowRight size={20} className="text-gray-300 group-hover:text-cyan-500 transition-colors shrink-0 mt-6" />
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}

// CTA Section
function CTASection() {
    return (
        <section className="relative py-32 bg-[#050b14] overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[150px]" />
            </div>

            <FloatingParticles />

            <div className="relative max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-6">
                        함께 <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">미래</span>를 만들어갑니다
                    </h2>
                    <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
                        마린리서치와 함께 해양의 무한한 가능성을 탐험하세요
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all duration-300"
                        >
                            문의하기
                            <ArrowRight size={20} className="inline ml-2 group-hover:translate-x-2 transition-transform" />
                        </Link>
                        <Link
                            href="/services"
                            className="px-10 py-5 border border-white/20 rounded-full text-white font-semibold hover:bg-white/10 transition-colors"
                        >
                            서비스 살펴보기
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Main Component
interface AboutPagePremiumProps {
    heroImage: string;
    heroSubtitle: string;
    stats: { value: number; suffix: string; label: string; icon: React.ReactNode }[];
    ceoMessage: { quote: string; name: string; title: string; image: string };
    competencies: { id: string; icon: string; title: string; description: string; image: string }[];
    news: { id: string; date: string; title: string; category: string; thumbnail?: string }[];
}

export function AboutPagePremium({
    heroImage,
    heroSubtitle,
    stats,
    ceoMessage,
    competencies,
    news,
}: AboutPagePremiumProps) {
    return (
        <div className="overflow-hidden">
            <HeroSection image={heroImage} title="바다의 미래를, 개척합니다" subtitle={heroSubtitle} />
            <StatsSection stats={stats} />
            <VisionMissionSection />
            <CEOSection {...ceoMessage} />
            <HistorySection />
            <ValuesSection />
            <CompetencySection competencies={competencies} />
            <NewsSection news={news} />
            <CTASection />
        </div>
    );
}
