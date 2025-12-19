"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// 1. Scroll-triggered Counter Hook
// ============================================
function useCounter(end: number, duration: number = 2000, isInView: boolean) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Easing function for smooth counting
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * end));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isInView, end, duration]);

    return count;
}

// ============================================
// 2. Animated Stat Card Component
// ============================================
function StatCard({ value, suffix, label, index }: {
    value: number;
    suffix: string;
    label: string;
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const count = useCounter(value, 2000, isInView);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center"
        >
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 font-display mb-2">
                {count.toLocaleString()}
                <span className="text-blue-600">{suffix}</span>
            </div>
            <div className="text-gray-500 text-sm md:text-base">{label}</div>
        </motion.div>
    );
}

// ============================================
// 3. Toss-style Accordion Card
// ============================================
interface AccordionCardData {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    href: string;
    linkText: string;
}

function TossAccordionCard({
    card,
    isExpanded,
    onToggle
}: {
    card: AccordionCardData;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.div
            layout
            className={cn(
                "relative overflow-hidden rounded-3xl cursor-pointer group",
                "transition-shadow duration-500",
                isExpanded ? "shadow-2xl" : "shadow-lg hover:shadow-xl"
            )}
            onClick={onToggle}
        >
            <motion.div
                layout
                className="relative"
                animate={{ height: isExpanded ? 500 : 400 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
                {/* Background Image with Zoom Effect */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute inset-0"
                        animate={{ scale: isExpanded ? 1.05 : 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                    {/* Gradient Overlay */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            background: isExpanded
                                ? "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)"
                                : "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)"
                        }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                {/* Content */}
                <div className="relative h-full p-8 md:p-10 flex flex-col">
                    {/* Category Badge */}
                    <motion.span
                        layout="position"
                        className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-4"
                    >
                        {card.category}
                    </motion.span>

                    {/* Title */}
                    <motion.h3
                        layout="position"
                        className="text-2xl md:text-3xl font-bold text-white font-display leading-tight max-w-md mb-4"
                    >
                        {card.title}
                    </motion.h3>

                    {/* Toggle Button */}
                    <motion.button
                        layout="position"
                        className={cn(
                            "w-11 h-11 rounded-full border-2 border-white/40 flex items-center justify-center",
                            "hover:bg-white/20 transition-colors duration-300",
                            "mb-auto"
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle();
                        }}
                    >
                        <motion.div
                            animate={{ rotate: isExpanded ? 45 : 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <Plus size={22} className="text-white" strokeWidth={2.5} />
                        </motion.div>
                    </motion.button>

                    {/* Expanded Content */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.4, delay: 0.15 }}
                                className="mt-6"
                            >
                                <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                                    {card.description}
                                </p>
                                <Link
                                    href={card.href}
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors group/link"
                                >
                                    {card.linkText}
                                    <ArrowRight
                                        size={18}
                                        className="group-hover/link:translate-x-1 transition-transform"
                                    />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Collapsed Hint */}
                    <AnimatePresence>
                        {!isExpanded && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-white/60 text-sm line-clamp-2 mt-auto"
                            >
                                {card.description.slice(0, 80)}...
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ============================================
// 4. Toss-style Team Section Card
// ============================================
interface TeamSectionData {
    id: string;
    name: string;
    tagline: string;
    description: string;
    image: string;
    href: string;
    linkText: string;
}

function TeamSectionCard({ section, index }: { section: TeamSectionData; index: number }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
        >
            <TossAccordionCard
                card={{
                    id: section.id,
                    category: section.name,
                    title: section.tagline,
                    description: section.description,
                    image: section.image,
                    href: section.href,
                    linkText: section.linkText,
                }}
                isExpanded={isExpanded}
                onToggle={() => setIsExpanded(!isExpanded)}
            />
        </motion.div>
    );
}

// ============================================
// 5. Main Page Component
// ============================================
interface AboutPageTossStyleProps {
    heroTitle: string;
    heroSubtitle: string;
    stats: { value: number; suffix: string; label: string }[];
    sections: TeamSectionData[];
}

export function AboutPageTossStyle({
    heroTitle,
    heroSubtitle,
    stats,
    sections,
}: AboutPageTossStyleProps) {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    return (
        <div className="min-h-screen bg-white">
            {/* ========== Hero Section ========== */}
            <section
                ref={heroRef}
                className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-50"
            >
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)`,
                            backgroundSize: '40px 40px'
                        }}
                    />
                </div>

                <motion.div
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="relative text-center px-6 max-w-5xl mx-auto"
                >
                    {/* Animated Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-8"
                    >
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-blue-600 text-sm font-medium">Since 2004</span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 font-display leading-tight mb-6"
                    >
                        {heroTitle.split('\n').map((line, i) => (
                            <span key={i}>
                                {line}
                                {i === 0 && <br />}
                            </span>
                        ))}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
                    >
                        {heroSubtitle}
                    </motion.p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    style={{ opacity: heroOpacity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2"
                    >
                        <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ========== Stats Section ========== */}
            <section className="py-24 md:py-32 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display">
                            숫자로 보는 마린리서치
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {stats.map((stat, index) => (
                            <StatCard
                                key={stat.label}
                                value={stat.value}
                                suffix={stat.suffix}
                                label={stat.label}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== Team/Department Sections ========== */}
            <section className="py-24 md:py-32 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display mb-4">
                            마린리서치를 이루는 조직
                        </h2>
                        <p className="text-gray-500 text-lg max-w-2xl">
                            각 분야의 전문가들이 협력하여 최고의 해양조사 서비스를 제공합니다
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {sections.map((section, index) => (
                            <TeamSectionCard
                                key={section.id}
                                section={section}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== CTA Section ========== */}
            <section className="py-24 md:py-32 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-display mb-6">
                            함께 바다의 미래를<br />만들어갑니다
                        </h2>
                        <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
                            마린리서치와 함께 해양의 무한한 가능성을 탐험하세요
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
                            >
                                문의하기
                                <ArrowRight size={18} />
                            </Link>
                            <Link
                                href="/careers"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-100 text-gray-900 font-semibold rounded-full hover:bg-gray-200 transition-colors"
                            >
                                채용 정보
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
