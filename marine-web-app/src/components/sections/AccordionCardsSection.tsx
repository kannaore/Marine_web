"use client";

import { useState, useRef, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Plus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionCard {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    href: string;
    linkText?: string;
}

interface AccordionCardsSectionProps {
    sectionTitle?: string;
    sectionSubtitle?: string;
    cards: AccordionCard[];
}

function AccordionCard({
    card,
    isExpanded,
    onToggle,
}: {
    card: AccordionCard;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (iconRef.current) {
            gsap.to(iconRef.current, {
                rotation: isExpanded ? 45 : 0,
                duration: 0.3,
            });
        }

        if (contentRef.current) {
            if (isExpanded) {
                gsap.to(contentRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    delay: 0.1,
                });
            } else {
                gsap.to(contentRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                });
            }
        }
    }, [isExpanded]);

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-3xl transition-all duration-500",
                isExpanded ? "col-span-1 md:col-span-2 lg:col-span-2" : "col-span-1"
            )}
        >
            <div className="relative h-full min-h-[400px] md:min-h-[450px]">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                    />
                    <div
                        className={cn(
                            "absolute inset-0 transition-all duration-500",
                            isExpanded
                                ? "bg-gradient-to-r from-[#050b14]/95 via-[#050b14]/80 to-transparent"
                                : "bg-gradient-to-t from-[#050b14]/90 via-[#050b14]/50 to-[#050b14]/30"
                        )}
                    />
                </div>

                {/* Content */}
                <div className="relative flex h-full flex-col p-8 md:p-10">
                    {/* Category Tag */}
                    <span className="mb-4 text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase">
                        {card.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-display mb-4 max-w-md text-2xl leading-tight font-bold text-white md:text-3xl">
                        {card.title}
                    </h3>

                    {/* Toggle Button */}
                    <button
                        onClick={onToggle}
                        className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full border border-white/30",
                            "mb-auto transition-all duration-300 hover:bg-white/10",
                            isExpanded && "bg-white/10"
                        )}
                    >
                        <div ref={iconRef}>
                            <Plus size={20} className="text-white" />
                        </div>
                    </button>

                    {/* Expanded Content */}
                    {isExpanded && (
                        <div
                            ref={contentRef}
                            className="mt-6"
                            style={{ opacity: 0, transform: "translateY(20px)" }}
                        >
                            <p className="mb-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
                                {card.description}
                            </p>
                            <Link
                                href={card.href}
                                className="group inline-flex items-center gap-2 font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                            >
                                {card.linkText || "자세히 보기"}
                                <ArrowRight
                                    size={18}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </Link>
                        </div>
                    )}

                    {/* Collapsed hint */}
                    {!isExpanded && (
                        <p className="mt-4 line-clamp-2 text-sm text-white/50">
                            {card.description.slice(0, 60)}...
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export function AccordionCardsSection({
    sectionTitle = "더 알아보기",
    sectionSubtitle,
    cards,
}: AccordionCardsSectionProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            // Header animation
            const header = sectionRef.current.querySelector(".section-header");
            if (header) {
                gsap.from(header, {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                });
            }

            // Cards stagger
            const cardItems = sectionRef.current.querySelectorAll(".accordion-card");
            gsap.from(cardItems, {
                opacity: 0,
                y: 50,
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

    const handleToggle = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-white py-24 md:py-32">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-cyan-100/50 blur-[150px]" />
            <div className="absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/2 rounded-full bg-blue-100/50 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Section Header */}
                <div className="section-header mb-16">
                    <span className="text-sm font-semibold tracking-wider text-cyan-600 uppercase">
                        Explore More
                    </span>
                    <h2 className="font-display mt-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                        {sectionTitle}
                    </h2>
                    {sectionSubtitle && (
                        <p className="mt-4 max-w-2xl text-lg text-gray-500">{sectionSubtitle}</p>
                    )}
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {cards.map((card) => (
                        <div key={card.id} className="accordion-card">
                            <AccordionCard
                                card={card}
                                isExpanded={expandedId === card.id}
                                onToggle={() => handleToggle(card.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
