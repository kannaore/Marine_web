"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Image specifications guide for production:
// - Hero images: 1920x1080 minimum (16:9 ratio), optimized WebP format
// - Feature images: 1600x900 or 1200x800 (16:9 or 3:2 ratio)
// - Grid images: 800x600 (4:3 ratio)
// - All images should be compressed to <500KB for optimal loading

interface StatItem {
    value: string;
    label: string;
}

interface FeatureSection {
    id: string;
    label: string;
    title: string;
    description: string;
    image: string;
    href: string;
    imagePosition: "left" | "right" | "full";
}

interface AboutPageSpacexProps {
    heroImage: string;
    heroTitle: string;
    heroSubtitle: string;
    stats: StatItem[];
    features: FeatureSection[];
}

// Stats Counter Component
function StatCounter({ stat, index }: { stat: StatItem; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center"
        >
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-display mb-2">
                {stat.value}
            </div>
            <div className="text-sm md:text-base text-white/50 uppercase tracking-[0.2em]">
                {stat.label}
            </div>
        </motion.div>
    );
}

// Hero Section Component
function HeroSection({
    image,
    title,
    subtitle
}: {
    image: string;
    title: string;
    subtitle: string;
}) {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050b14]/60 via-transparent to-[#050b14]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050b14]/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center items-center text-center px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-display mb-6 max-w-4xl leading-tight"
                >
                    {title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed"
                >
                    {subtitle}
                </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <ChevronDown size={32} className="text-white/50" />
                </motion.div>
            </motion.div>
        </section>
    );
}

// Full-Width Feature Section
function FullWidthFeature({ feature, index }: { feature: FeatureSection; index: number }) {
    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full min-h-screen flex flex-col justify-end pb-24 px-6">
                <div className="max-w-7xl mx-auto w-full">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-xs font-semibold text-cyan-400 uppercase tracking-[0.25em] mb-4 block"
                    >
                        {feature.label}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-6 max-w-3xl"
                    >
                        {feature.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-white/60 max-w-2xl mb-8"
                    >
                        {feature.description}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Link
                            href={feature.href}
                            className="inline-flex items-center gap-3 text-white hover:text-cyan-400 transition-colors group"
                        >
                            <span className="text-sm font-semibold uppercase tracking-wider">Learn More</span>
                            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// Split Feature Section (Left/Right Image)
function SplitFeature({
    feature,
    index
}: {
    feature: FeatureSection;
    index: number;
}) {
    const isImageLeft = feature.imagePosition === "left";

    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className={cn(
                    "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center",
                    isImageLeft && "lg:[direction:rtl]"
                )}>
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: isImageLeft ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className={cn(isImageLeft && "lg:[direction:ltr]")}
                    >
                        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-[0.25em] mb-4 block">
                            {feature.label}
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-display mb-6 leading-tight">
                            {feature.title}
                        </h2>
                        <p className="text-lg text-white/60 leading-relaxed mb-8">
                            {feature.description}
                        </p>
                        <Link
                            href={feature.href}
                            className="inline-flex items-center gap-3 text-white hover:text-cyan-400 transition-colors group"
                        >
                            <span className="text-sm font-semibold uppercase tracking-wider">Explore</span>
                            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: isImageLeft ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className={cn(
                            "relative aspect-[4/3] rounded-2xl overflow-hidden",
                            isImageLeft && "lg:[direction:ltr]"
                        )}
                    >
                        <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            className="object-cover"
                            quality={85}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050b14]/30 to-transparent" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// Main Component
export function AboutPageSpacex({
    heroImage,
    heroTitle,
    heroSubtitle,
    stats,
    features,
}: AboutPageSpacexProps) {
    return (
        <div className="bg-[#050b14]">
            {/* Hero Section */}
            <HeroSection
                image={heroImage}
                title={heroTitle}
                subtitle={heroSubtitle}
            />

            {/* Stats Section */}
            <section className="py-20 md:py-32 border-y border-white/10">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {stats.map((stat, index) => (
                            <StatCounter key={stat.label} stat={stat} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Sections */}
            {features.map((feature, index) => (
                feature.imagePosition === "full" ? (
                    <FullWidthFeature key={feature.id} feature={feature} index={index} />
                ) : (
                    <SplitFeature key={feature.id} feature={feature} index={index} />
                )
            ))}
        </div>
    );
}
