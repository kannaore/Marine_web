"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

    return (
        <section
            ref={containerRef}
            className="relative py-32 bg-marine-dark overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-950/20 to-transparent" />

            {/* Decorative Grid */}
            <div className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                                     linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            <motion.div style={{ opacity, y }} className="relative z-10">
                <div className="container-custom">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-20"
                    >
                        <span className="text-xs tracking-[0.3em] uppercase text-ocean-400 font-medium">
                            Fleet & Equipment
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
                            World-Class
                            <br />
                            <span className="text-gradient-ocean">Survey Fleet</span>
                        </h2>
                    </motion.div>

                    {/* Equipment Stats Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
                    >
                        {equipment.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index, duration: 0.4 }}
                                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-ocean-400/30 hover:bg-white/[0.04] transition-all duration-500"
                            >
                                <item.icon className="w-8 h-8 text-ocean-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                                <div className="text-3xl font-bold text-white mb-1">{item.count}</div>
                                <div className="text-sm text-white/50">{item.name}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Vessel Cards */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        {vessels.map((vessel, index) => (
                            <motion.div
                                key={vessel.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 * index, duration: 0.6 }}
                                className="group relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-ocean-400/20 transition-all duration-500"
                            >
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={vessel.image}
                                        alt={vessel.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-marine-dark via-marine-dark/50 to-transparent" />

                                    {/* Type Badge */}
                                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-ocean-400/20 border border-ocean-400/30 backdrop-blur-sm">
                                        <span className="text-xs font-medium text-ocean-300">{vessel.type}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xl font-bold text-white">{vessel.name}</h3>
                                        <span className="text-xs text-white/40">{vessel.nameKo}</span>
                                    </div>

                                    <p className="text-sm text-white/60 mb-4 leading-relaxed">
                                        {vessel.description}
                                    </p>

                                    {/* Specs */}
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 text-xs bg-white/5 rounded-full text-white/70">
                                            {vessel.specs.length}
                                        </span>
                                        <span className="px-3 py-1 text-xs bg-white/5 rounded-full text-white/70">
                                            {vessel.specs.capacity}
                                        </span>
                                        <span className="px-3 py-1 text-xs bg-white/5 rounded-full text-white/70">
                                            {vessel.specs.equipment}
                                        </span>
                                    </div>
                                </div>

                                {/* Hover Glow */}
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-ocean-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
