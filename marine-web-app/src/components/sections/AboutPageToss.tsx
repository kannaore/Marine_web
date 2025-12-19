"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface StatItem {
    value: string;
    label: string;
    suffix?: string;
}

interface CompetencyCard {
    id: string;
    icon: string;
    title: string;
    description: string;
    image: string;
}

interface NewsItem {
    id: string;
    date: string;
    title: string;
    category: string;
    thumbnail?: string;
}

interface AboutPageTossProps {
    heroImage: string;
    heroTitle: string;
    heroSubtitle: string;
    stats: StatItem[];
    ceoMessage: {
        quote: string;
        name: string;
        title: string;
    };
    competencies: CompetencyCard[];
    news: NewsItem[];
}

// Hero Section with Stats
function HeroSection({
    image,
    title,
    subtitle,
    stats,
}: {
    image: string;
    title: string;
    subtitle: string;
    stats: StatItem[];
}) {
    return (
        <section className="relative min-h-[80vh] w-full overflow-hidden">
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
                <div className="absolute inset-0 bg-gradient-to-b from-[#050b14]/70 via-[#050b14]/50 to-[#050b14]" />
            </div>

            {/* Content */}
            <div className="relative h-full min-h-[80vh] flex flex-col justify-center items-center text-center px-6 py-32">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-display mb-4 max-w-3xl leading-tight"
                >
                    <span className="text-cyan-400">{title.split(",")[0]},</span>
                    <br />
                    {title.split(",").slice(1).join(",")}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-base md:text-lg text-white/60 max-w-xl leading-relaxed mb-12"
                >
                    {subtitle}
                </motion.p>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-8 md:gap-16"
                >
                    {stats.map((stat, index) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-display">
                                {stat.value}
                                <span className="text-cyan-400">{stat.suffix || "+"}</span>
                            </div>
                            <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// CEO Message / Quote Section (Light Background)
function CEOMessageSection({
    quote,
    name,
    title,
}: {
    quote: string;
    name: string;
    title: string;
}) {
    return (
        <section className="bg-white py-24 md:py-32">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <Quote size={48} className="text-cyan-500/30 mx-auto mb-8" />
                    <p className="text-xl md:text-2xl lg:text-3xl text-gray-800 font-medium leading-relaxed mb-8">
                        {quote}
                    </p>
                    <div className="text-gray-500">
                        <span className="font-semibold text-gray-800">{name}</span>
                        <span className="mx-2">·</span>
                        <span>{title}</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Competency Cards Section
function CompetencySection({ competencies }: { competencies: CompetencyCard[] }) {
    return (
        <section className="bg-gray-50 py-24 md:py-32">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display mb-4">
                        우수한 기술 경쟁력
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        마린리서치는 최첨단 장비와 전문 인력을 바탕으로 최고 수준의 해양조사 서비스를 제공합니다.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {competencies.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="text-3xl mb-3">{item.icon}</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// News / Press Release Section
function NewsSection({ news }: { news: NewsItem[] }) {
    return (
        <section className="bg-white py-24 md:py-32">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-between mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-display">
                        보도자료
                    </h2>
                    <Link
                        href="/news"
                        className="text-cyan-600 hover:text-cyan-700 text-sm font-medium flex items-center gap-1 group"
                    >
                        전체보기
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <div className="space-y-6">
                    {news.map((item, index) => (
                        <motion.article
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex gap-6 pb-6 border-b border-gray-100 last:border-0 group cursor-pointer"
                        >
                            {item.thumbnail && (
                                <div className="relative w-24 h-24 md:w-32 md:h-24 rounded-lg overflow-hidden shrink-0">
                                    <Image
                                        src={item.thumbnail}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-medium text-cyan-600 bg-cyan-50 px-2 py-1 rounded">
                                        {item.category}
                                    </span>
                                    <span className="text-xs text-gray-400">{item.date}</span>
                                </div>
                                <h3 className="text-base md:text-lg font-medium text-gray-900 group-hover:text-cyan-600 transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Main Component
export function AboutPageToss({
    heroImage,
    heroTitle,
    heroSubtitle,
    stats,
    ceoMessage,
    competencies,
    news,
}: AboutPageTossProps) {
    return (
        <div>
            {/* Hero with Stats (Dark) */}
            <HeroSection
                image={heroImage}
                title={heroTitle}
                subtitle={heroSubtitle}
                stats={stats}
            />

            {/* CEO Message (Light) */}
            <CEOMessageSection
                quote={ceoMessage.quote}
                name={ceoMessage.name}
                title={ceoMessage.title}
            />

            {/* Competencies (Light Gray) */}
            <CompetencySection competencies={competencies} />

            {/* News (White) */}
            <NewsSection news={news} />
        </div>
    );
}
