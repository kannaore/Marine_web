"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// Custom Cursor Component (Locomotive style)
// ============================================
function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 10);
            cursorY.set(e.clientY - 10);
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-5 h-5 bg-orange-500 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
            style={{ x: cursorXSpring, y: cursorYSpring }}
        />
    );
}

// ============================================
// Magnetic Button Component
// ============================================
function MagneticButton({ children, href, className }: {
    children: React.ReactNode;
    href: string;
    className?: string;
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const x = (e.clientX - centerX) * 0.3;
        const y = (e.clientY - centerY) * 0.3;
        setPosition({ x, y });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    return (
        <motion.a
            ref={ref}
            href={href}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            className={className}
        >
            {children}
        </motion.a>
    );
}

// ============================================
// Large Typography Hero (Locomotive style)
// ============================================
function LocomotiveHero({ title, subtitle }: { title: string; subtitle: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Split title into words for staggered animation
    const words = title.split(" ");

    return (
        <section
            ref={containerRef}
            className="relative h-screen flex items-center bg-[#0a0a0a] overflow-hidden"
        >
            {/* Gradient Orb Background */}
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />

            <motion.div
                style={{ y, opacity }}
                className="relative w-full max-w-[1600px] mx-auto px-8 md:px-16"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-3 mb-8"
                >
                    <span className="w-3 h-3 bg-orange-500 rounded-full" />
                    <span className="text-gray-400 text-sm uppercase tracking-[0.3em]">
                        Since 2004 • Marine Research
                    </span>
                </motion.div>

                {/* Giant Title */}
                <h1 className="overflow-hidden">
                    {words.map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: i * 0.15,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="inline-block mr-6 text-[clamp(3rem,10vw,9rem)] font-bold text-white leading-[0.95] font-display"
                        >
                            {word}
                        </motion.span>
                    ))}
                </h1>

                {/* Subtitle with Reveal */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-gray-400 text-lg md:text-xl max-w-2xl mt-8 leading-relaxed"
                >
                    {subtitle}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-12"
                >
                    <MagneticButton
                        href="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 text-black font-bold rounded-full hover:bg-orange-400 transition-colors"
                    >
                        Let&apos;s Talk
                        <ArrowRight size={20} />
                    </MagneticButton>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gray-500 text-sm"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent" />
                </motion.div>
            </motion.div>
        </section>
    );
}

// ============================================
// Featured Work Card (Locomotive style)
// ============================================
interface WorkCardData {
    id: string;
    title: string;
    category: string;
    image: string;
    href: string;
}

function WorkCard({ work, index }: { work: WorkCardData; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
        >
            <Link
                href={work.href}
                className="group block relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-900">
                    <motion.div
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={work.image}
                            alt={work.title}
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Overlay */}
                    <motion.div
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center"
                    >
                        <motion.div
                            animate={{ scale: isHovered ? 1 : 0.5, opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center"
                        >
                            <ArrowUpRight size={28} className="text-black" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Text */}
                <div className="mt-6 flex items-start justify-between">
                    <div>
                        <motion.h3
                            animate={{ x: isHovered ? 10 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-2xl md:text-3xl font-bold text-white font-display"
                        >
                            {work.title}
                        </motion.h3>
                        <p className="text-gray-500 mt-1">{work.category}</p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

// ============================================
// Marquee Text (Locomotive style)
// ============================================
function MarqueeText({ text }: { text: string }) {
    return (
        <div className="overflow-hidden py-8 bg-orange-500">
            <motion.div
                animate={{ x: [0, -1000] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="flex whitespace-nowrap"
            >
                {[...Array(10)].map((_, i) => (
                    <span
                        key={i}
                        className="text-black text-2xl md:text-4xl font-bold uppercase tracking-wider mx-8"
                    >
                        {text} •
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

// ============================================
// Stats Section (Locomotive style)
// ============================================
function StatsSection({ stats }: { stats: { value: string; label: string }[] }) {
    return (
        <section className="py-32 bg-[#0a0a0a]">
            <div className="max-w-[1600px] mx-auto px-8 md:px-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="text-center md:text-left"
                        >
                            <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-display mb-2">
                                {stat.value}
                            </div>
                            <div className="text-gray-500 text-sm uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================
// Main Page Component
// ============================================
interface AboutPageLocomotiveStyleProps {
    heroTitle: string;
    heroSubtitle: string;
    stats: { value: string; label: string }[];
    works: WorkCardData[];
    marqueeText: string;
}

export function AboutPageLocomotiveStyle({
    heroTitle,
    heroSubtitle,
    stats,
    works,
    marqueeText,
}: AboutPageLocomotiveStyleProps) {
    return (
        <div className="bg-[#0a0a0a] min-h-screen">
            <CustomCursor />

            {/* Hero */}
            <LocomotiveHero title={heroTitle} subtitle={heroSubtitle} />

            {/* Stats */}
            <StatsSection stats={stats} />

            {/* Marquee */}
            <MarqueeText text={marqueeText} />

            {/* Featured Work */}
            <section className="py-32 bg-[#0a0a0a]">
                <div className="max-w-[1600px] mx-auto px-8 md:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-end justify-between mb-16"
                    >
                        <div>
                            <span className="text-orange-500 text-sm uppercase tracking-[0.3em]">
                                Our Expertise
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mt-4">
                                Featured Work
                            </h2>
                        </div>
                        <Link
                            href="/services"
                            className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            View All
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        {works.map((work, index) => (
                            <WorkCard key={work.id} work={work} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-[#0a0a0a] border-t border-white/10">
                <div className="max-w-4xl mx-auto px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-8">
                            Ready to explore<br />the ocean?
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
                            바다의 무한한 가능성을 함께 탐험하세요
                        </p>
                        <MagneticButton
                            href="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-100 transition-colors"
                        >
                            Get in Touch
                            <ArrowRight size={22} />
                        </MagneticButton>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
