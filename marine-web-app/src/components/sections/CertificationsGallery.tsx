"use client";

import { useState, useRef, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
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
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    // Carousel slide animation
    useEffect(() => {
        if (!trackRef.current) return;

        gsap.to(trackRef.current, {
            x: `-${currentIndex * (100 / itemsPerView)}%`,
            duration: 0.5,
            ease: "power3.out",
        });
    }, [currentIndex, itemsPerView]);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            // Header animation
            if (headerRef.current) {
                gsap.from(headerRef.current, {
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

            // Cards stagger animation
            const cards = sectionRef.current.querySelectorAll(".cert-card");
            gsap.from(cards, {
                opacity: 0,
                y: 20,
                stagger: 0.05,
                duration: 0.4,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
            });
        },
        { scope: sectionRef }
    );

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    return (
        <section ref={sectionRef} className="bg-marine-dark overflow-hidden py-24">
            <div className="container-custom">
                {/* Header */}
                <div ref={headerRef} className="mb-12 flex items-end justify-between">
                    <div>
                        <span className="text-ocean-400 text-xs font-medium tracking-[0.3em] uppercase">
                            Trust & Credentials
                        </span>
                        <h2 className="font-display mt-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                            Certifications & Patents
                        </h2>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="hidden gap-3 md:flex">
                        <button
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-white/20 hover:bg-white/10 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            <ChevronLeft className="h-5 w-5 text-white" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentIndex >= maxIndex}
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-white/20 hover:bg-white/10 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            <ChevronRight className="h-5 w-5 text-white" />
                        </button>
                    </div>
                </div>

                {/* Carousel Track */}
                <div className="relative overflow-hidden">
                    <div ref={trackRef} className="flex gap-4">
                        {certifications.map((cert) => (
                            <div
                                key={cert.id}
                                className="cert-card min-w-[calc(100%/2-0.5rem)] flex-shrink-0 md:min-w-[calc(100%/4-0.75rem)]"
                            >
                                <div className="group hover:border-ocean-400/30 relative h-[280px] overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-500 hover:bg-white/[0.04]">
                                    {/* Certificate Image */}
                                    <div className="relative h-[160px] overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
                                        <Image
                                            src={cert.image}
                                            alt={cert.title}
                                            fill
                                            className="object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                                        />
                                        <div className="from-marine-dark via-marine-dark/60 absolute inset-0 bg-gradient-to-t to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <div className="absolute right-0 bottom-0 left-0 p-4">
                                        <p className="text-ocean-400/80 mb-1 text-[10px] font-medium tracking-wider uppercase">
                                            {cert.type}
                                        </p>
                                        <h3 className="group-hover:text-ocean-300 mb-1 text-sm leading-tight font-semibold text-white transition-colors">
                                            {cert.title}
                                        </h3>
                                        <p className="text-xs text-white/40">{cert.description}</p>
                                    </div>

                                    {/* Subtle Glow */}
                                    <div className="bg-ocean-500/10 absolute -right-8 -bottom-8 h-24 w-24 opacity-0 blur-[40px] transition-opacity duration-500 group-hover:opacity-100" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Dots */}
                <div className="mt-8 flex items-center justify-center gap-2">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                currentIndex === i
                                    ? "bg-ocean-400 w-8"
                                    : "w-1.5 bg-white/20 hover:bg-white/40"
                            }`}
                        />
                    ))}
                </div>

                {/* Mobile Navigation */}
                <div className="mt-6 flex justify-center gap-3 md:hidden">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <ChevronLeft className="h-5 w-5 text-white" />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex >= maxIndex}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <ChevronRight className="h-5 w-5 text-white" />
                    </button>
                </div>
            </div>
        </section>
    );
}
