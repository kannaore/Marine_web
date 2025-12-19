"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/navData";

interface CategoryCardProps {
    category: Category;
    index: number;
    gridLayout: 1 | 2 | 3;
}

function CategoryCard({ category, index, gridLayout }: CategoryCardProps) {
    // Determine card height based on grid layout
    const cardHeight = gridLayout === 1 ? "h-[320px]" : gridLayout === 2 ? "h-[380px]" : "h-[400px]";

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
        >
            <Link href={category.href} className="block group">
                <div
                    className={cn(
                        "relative overflow-hidden rounded-2xl",
                        "bg-white/[0.03] border border-white/10",
                        "transition-all duration-500 ease-out",
                        "hover:bg-white/[0.06] hover:border-white/20",
                        "hover:shadow-2xl hover:shadow-black/40",
                        "hover:scale-[1.02]",
                        cardHeight
                    )}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                            style={{ backgroundImage: `url('${category.image}')` }}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/80 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                        {/* Label */}
                        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-[0.2em] mb-3">
                            {category.label}
                        </span>

                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-display leading-tight">
                            {category.title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4 max-w-md">
                            {category.desc}
                        </p>

                        {/* Arrow Icon */}
                        <div className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors duration-300">
                            <span className="text-sm font-medium">Learn more</span>
                            <ArrowRight
                                size={18}
                                className="transform transition-transform duration-300 group-hover:translate-x-2"
                            />
                        </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

interface CategoryLandingPageProps {
    heroTitle: string;
    heroDesc: string;
    categories: Category[];
    gridLayout: 1 | 2 | 3;
}

export function CategoryLandingPage({
    heroTitle,
    heroDesc,
    categories,
    gridLayout
}: CategoryLandingPageProps) {
    // Grid column classes based on layout
    const gridCols = {
        1: "grid-cols-1 max-w-4xl",
        2: "grid-cols-1 md:grid-cols-2 max-w-6xl",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl",
    };

    return (
        <section className="min-h-screen pt-32 pb-24 px-6">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-6 leading-tight"
                >
                    {heroTitle}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                    className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto"
                >
                    {heroDesc}
                </motion.p>
            </div>

            {/* Category Grid */}
            <div className={cn("grid gap-6 md:gap-8 mx-auto", gridCols[gridLayout])}>
                {categories.map((category, index) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        index={index}
                        gridLayout={gridLayout}
                    />
                ))}
            </div>
        </section>
    );
}
