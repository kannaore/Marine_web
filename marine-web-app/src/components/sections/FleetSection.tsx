"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Image from "next/image";
import { Anchor, Ship, Gauge, Compass } from "lucide-react";

const vessels = [
    {
        id: "marine-explorer",
        name: "Marine Explorer I",
        nameKo: "마린 익스플로러 1호",
        type: "조사선",
        specs: {
            length: "42m",
            capacity: "18명",
            equipment: "Multibeam, ROV, CPT",
        },
        image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&q=80",
        description: "최신 멀티빔 음향측심기와 ROV를 탑재한 첨단 해양조사선",
    },
    {
        id: "ocean-surveyor",
        name: "Ocean Surveyor",
        nameKo: "오션 서베이어",
        type: "측량선",
        specs: {
            length: "35m",
            capacity: "12명",
            equipment: "Side-scan Sonar, Sub-bottom",
        },
        image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=80",
        description: "정밀 해저지형 조사를 위한 전용 측량선",
    },
    {
        id: "geo-pioneer",
        name: "Geo Pioneer",
        nameKo: "지오 파이오니어",
        type: "지반조사선",
        specs: {
            length: "55m",
            capacity: "25명",
            equipment: "CPT, Vibrocorer, Borehole",
        },
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
        description: "대형 해양 지반조사 프로젝트를 위한 전문 장비 탑재선",
    },
];

const equipment = [
    { name: "Multibeam Echosounder", icon: Gauge, count: "12+" },
    { name: "ROV Systems", icon: Compass, count: "6" },
    { name: "CPT Equipment", icon: Anchor, count: "8" },
    { name: "Survey Vessels", icon: Ship, count: "5" },
];

export function FleetSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            // Content fade and parallax
            if (contentRef.current) {
                gsap.fromTo(
                    contentRef.current,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 80%",
                            end: "20% 60%",
                            scrub: 1,
                        },
                    }
                );
            }

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

            // Equipment stats stagger
            const stats = sectionRef.current.querySelectorAll(".equipment-stat");
            gsap.from(stats, {
                opacity: 0,
                scale: 0.9,
                stagger: 0.1,
                duration: 0.4,
                delay: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none none",
                },
            });

            // Vessel cards stagger
            const cards = sectionRef.current.querySelectorAll(".vessel-card");
            gsap.from(cards, {
                opacity: 0,
                y: 40,
                stagger: 0.15,
                duration: 0.6,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "30% 80%",
                    toggleActions: "play none none none",
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="bg-marine-dark relative overflow-hidden py-32">
            {/* Background Gradient */}
            <div className="via-ocean-950/20 absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />

            {/* Decorative Grid */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                                     linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            <div ref={contentRef} className="relative z-10">
                <div className="container-custom">
                    {/* Section Header */}
                    <div className="section-header mb-20">
                        <span className="text-ocean-400 text-xs font-medium tracking-[0.3em] uppercase">
                            Fleet & Equipment
                        </span>
                        <h2 className="font-display mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                            World-Class
                            <br />
                            <span className="text-gradient-ocean">Survey Fleet</span>
                        </h2>
                    </div>

                    {/* Equipment Stats Bar */}
                    <div className="mb-20 grid grid-cols-2 gap-4 md:grid-cols-4">
                        {equipment.map((item) => (
                            <div
                                key={item.name}
                                className="equipment-stat group hover:border-ocean-400/30 rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-500 hover:bg-white/[0.04]"
                            >
                                <item.icon className="text-ocean-400 mb-4 h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                                <div className="mb-1 text-3xl font-bold text-white">
                                    {item.count}
                                </div>
                                <div className="text-sm text-white/50">{item.name}</div>
                            </div>
                        ))}
                    </div>

                    {/* Vessel Cards */}
                    <div className="grid gap-6 lg:grid-cols-3">
                        {vessels.map((vessel) => (
                            <div
                                key={vessel.id}
                                className="vessel-card group hover:border-ocean-400/20 relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] transition-all duration-500"
                            >
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={vessel.image}
                                        alt={vessel.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="from-marine-dark via-marine-dark/50 absolute inset-0 bg-gradient-to-t to-transparent" />

                                    {/* Type Badge */}
                                    <div className="bg-ocean-400/20 border-ocean-400/30 absolute top-4 left-4 rounded-full border px-3 py-1 backdrop-blur-sm">
                                        <span className="text-ocean-300 text-xs font-medium">
                                            {vessel.type}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-white">
                                            {vessel.name}
                                        </h3>
                                        <span className="text-xs text-white/40">
                                            {vessel.nameKo}
                                        </span>
                                    </div>

                                    <p className="mb-4 text-sm leading-relaxed text-white/60">
                                        {vessel.description}
                                    </p>

                                    {/* Specs */}
                                    <div className="flex flex-wrap gap-2">
                                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
                                            {vessel.specs.length}
                                        </span>
                                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
                                            {vessel.specs.capacity}
                                        </span>
                                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
                                            {vessel.specs.equipment}
                                        </span>
                                    </div>
                                </div>

                                {/* Hover Glow */}
                                <div className="bg-ocean-500/10 absolute -right-10 -bottom-10 h-40 w-40 opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-100" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
