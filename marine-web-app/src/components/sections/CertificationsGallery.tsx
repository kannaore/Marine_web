"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const certifications = [
    {
        id: 1,
        title: "ISO 9001:2015",
        type: "품질경영시스템",
        description: "Quality Management System",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80",
    },
    {
        id: 2,
        title: "ISO 14001:2015",
        type: "환경경영시스템",
        description: "Environmental Management System",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80",
    },
    {
        id: 3,
        title: "ISO 45001:2018",
        type: "안전보건경영시스템",
        description: "Occupational Health & Safety",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
    },
    {
        id: 4,
        title: "해양조사업 등록",
        type: "해양수산부 인증",
        description: "Marine Survey License",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80",
    },
    {
        id: 5,
        title: "수중음파탐지기 특허",
        type: "특허 제10-1234567호",
        description: "Underwater Acoustic Detection",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80",
    },
    {
        id: 6,
        title: "해저지형 분석 특허",
        type: "특허 제10-2345678호",
        description: "Seafloor Analysis Technology",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    },
    {
        id: 7,
        title: "기업부설연구소",
        type: "한국산업기술진흥협회",
        description: "Corporate R&D Center",
        image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=400&q=80",
    },
    {
        id: 8,
        title: "벤처기업 인증",
        type: "중소벤처기업부",
        description: "Venture Company Certification",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
    },
];

export function CertificationsGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = 4;
    const maxIndex = Math.max(0, certifications.length - itemsPerView);
    const containerRef = useRef<HTMLDivElement>(null);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    return (
        <section className="py-24 bg-marine-dark overflow-hidden">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-end justify-between mb-12"
                >
                    <div>
                        <span className="text-xs tracking-[0.3em] uppercase text-ocean-400 font-medium">
                            Trust & Credentials
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3">
                            Certifications & Patents
                        </h2>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="hidden md:flex gap-3">
                        <button
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentIndex >= maxIndex}
                            className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </motion.div>

                {/* Carousel Track */}
                <div ref={containerRef} className="relative">
                    <motion.div
                        className="flex gap-4"
                        animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 35,
                            mass: 0.8
                        }}
                    >
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, duration: 0.4 }}
                                className="min-w-[calc(100%/2-0.5rem)] md:min-w-[calc(100%/4-0.75rem)] flex-shrink-0"
                            >
                                <div className="group relative h-[280px] rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden hover:border-ocean-400/30 hover:bg-white/[0.04] transition-all duration-500">
                                    {/* Certificate Image */}
                                    <div className="relative h-[160px] overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
                                        <Image
                                            src={cert.image}
                                            alt={cert.title}
                                            fill
                                            className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-marine-dark via-marine-dark/60 to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <p className="text-[10px] font-medium text-ocean-400/80 uppercase tracking-wider mb-1">
                                            {cert.type}
                                        </p>
                                        <h3 className="text-sm font-semibold text-white leading-tight mb-1 group-hover:text-ocean-300 transition-colors">
                                            {cert.title}
                                        </h3>
                                        <p className="text-xs text-white/40">
                                            {cert.description}
                                        </p>
                                    </div>

                                    {/* Subtle Glow */}
                                    <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-ocean-500/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Progress Dots */}
                <div className="mt-8 flex items-center justify-center gap-2">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === i
                                    ? "w-8 bg-ocean-400"
                                    : "w-1.5 bg-white/20 hover:bg-white/40"
                                }`}
                        />
                    ))}
                </div>

                {/* Mobile Navigation */}
                <div className="flex md:hidden justify-center gap-3 mt-6">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex >= maxIndex}
                        className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </section>
    );
}
