"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, X, ArrowRight } from "lucide-react";
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

function AccordionCard({ card, isExpanded, onToggle }: {
    card: AccordionCard;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.div
            layout
            className={cn(
                "relative overflow-hidden rounded-3xl transition-all duration-500",
                isExpanded
                    ? "col-span-1 md:col-span-2 lg:col-span-2"
                    : "col-span-1"
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
                    <div className={cn(
                        "absolute inset-0 transition-all duration-500",
                        isExpanded
                            ? "bg-gradient-to-r from-[#050b14]/95 via-[#050b14]/80 to-transparent"
                            : "bg-gradient-to-t from-[#050b14]/90 via-[#050b14]/50 to-[#050b14]/30"
                    )} />
                </div>

                {/* Content */}
                <div className="relative h-full p-8 md:p-10 flex flex-col">
                    {/* Category Tag */}
                    <span className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                        {card.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white font-display mb-4 leading-tight max-w-md">
                        {card.title}
                    </h3>

                    {/* Toggle Button */}
                    <button
                        onClick={onToggle}
                        className={cn(
                            "w-10 h-10 rounded-full border border-white/30 flex items-center justify-center",
                            "hover:bg-white/10 transition-all duration-300 mb-auto",
                            isExpanded && "bg-white/10"
                        )}
                    >
                        <motion.div
                            animate={{ rotate: isExpanded ? 45 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Plus size={20} className="text-white" />
                        </motion.div>
                    </button>

                    {/* Expanded Content */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="mt-6"
                            >
                                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6 max-w-lg">
                                    {card.description}
                                </p>
                                <Link
                                    href={card.href}
                                    className="inline-flex items-center gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors group"
                                >
                                    {card.linkText || "자세히 보기"}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Collapsed hint */}
                    {!isExpanded && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-white/50 text-sm mt-4 line-clamp-2"
                        >
                            {card.description.slice(0, 60)}...
                        </motion.p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export function AccordionCardsSection({
    sectionTitle = "더 알아보기",
    sectionSubtitle,
    cards
}: AccordionCardsSectionProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleToggle = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section className="relative py-24 md:py-32 bg-white overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-100/50 rounded-full blur-[150px] -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-[120px] translate-y-1/2" />

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm">
                        Explore More
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-display mt-4">
                        {sectionTitle}
                    </h2>
                    {sectionSubtitle && (
                        <p className="text-gray-500 mt-4 max-w-2xl text-lg">
                            {sectionSubtitle}
                        </p>
                    )}
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            layout
                        >
                            <AccordionCard
                                card={card}
                                isExpanded={expandedId === card.id}
                                onToggle={() => handleToggle(card.id)}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
