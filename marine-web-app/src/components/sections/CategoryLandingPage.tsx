"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/navData";

interface CategoryCardProps {
    category: Category;
    index: number;
    gridLayout: 1 | 2 | 3;
    isKorean: boolean;
}

function CategoryCard({ category, index, gridLayout, isKorean }: CategoryCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardRef.current) {
            gsap.from(cardRef.current, {
                opacity: 0,
                y: 40,
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: "power2.out",
            });
        }
    }, [index]);

    const cardHeight =
        gridLayout === 1 ? "h-[320px]" : gridLayout === 2 ? "h-[380px]" : "h-[400px]";

    return (
        <div ref={cardRef}>
            <Link href={category.href} className="group block">
                <div
                    className={cn(
                        "relative overflow-hidden rounded-2xl",
                        "border border-white/10 bg-white/[0.03]",
                        "transition-all duration-500 ease-out",
                        "hover:border-white/20 hover:bg-white/[0.06]",
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
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/80 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                        <span className="mb-3 text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase">
                            {isKorean ? category.label : category.labelEn}
                        </span>
                        <h3 className="font-display mb-3 text-2xl leading-tight font-bold text-white md:text-3xl">
                            {isKorean ? category.title : category.titleEn}
                        </h3>
                        <p className="mb-4 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
                            {isKorean ? category.desc : category.descEn}
                        </p>
                        <div className="flex items-center gap-2 text-white/40 transition-colors duration-300 group-hover:text-white">
                            <span className="text-sm font-medium">
                                {isKorean ? "자세히 보기" : "Learn more"}
                            </span>
                            <ArrowRight
                                size={18}
                                className="transform transition-transform duration-300 group-hover:translate-x-2"
                            />
                        </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent" />
                    </div>
                </div>
            </Link>
        </div>
    );
}

interface CategoryLandingPageProps {
    heroTitle: string;
    heroTitleEn?: string;
    heroDesc: string;
    heroDescEn?: string;
    categories: Category[];
    gridLayout: 1 | 2 | 3;
}

export function CategoryLandingPage({
    heroTitle,
    heroTitleEn,
    heroDesc,
    heroDescEn,
    categories,
    gridLayout,
}: CategoryLandingPageProps) {
    const heroRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();
    const isKorean = locale === "ko";

    useEffect(() => {
        if (heroRef.current) {
            const title = heroRef.current.querySelector("h1");
            const desc = heroRef.current.querySelector("p");

            if (title) {
                gsap.from(title, {
                    opacity: 0,
                    y: 30,
                    duration: 0.7,
                    ease: "power2.out",
                });
            }
            if (desc) {
                gsap.from(desc, {
                    opacity: 0,
                    y: 20,
                    duration: 0.7,
                    delay: 0.1,
                    ease: "power2.out",
                });
            }
        }
    }, []);

    const gridCols = {
        1: "grid-cols-1 max-w-4xl",
        2: "grid-cols-1 md:grid-cols-2 max-w-6xl",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl",
    };

    return (
        <section className="min-h-screen px-6 pt-32 pb-24">
            {/* Hero Section */}
            <div ref={heroRef} className="mx-auto mb-16 max-w-4xl text-center md:mb-24">
                <h1 className="font-display mb-6 text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">
                    {isKorean ? heroTitle : heroTitleEn || heroTitle}
                </h1>
                <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
                    {isKorean ? heroDesc : heroDescEn || heroDesc}
                </p>
            </div>

            {/* Category Grid */}
            <div className={cn("mx-auto grid gap-6 md:gap-8", gridCols[gridLayout])}>
                {categories.map((category, index) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        index={index}
                        gridLayout={gridLayout}
                        isKorean={isKorean}
                    />
                ))}
            </div>
        </section>
    );
}
