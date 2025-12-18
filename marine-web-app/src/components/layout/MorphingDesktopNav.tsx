"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Dummy Data ---
const NAV_CONTENT = {
    "ABOUT US": {
        categories: [
            {
                id: "profile",
                label: "Company Profile",
                title: "Leading Marine Surveyors",
                desc: "Over 20 years of excellence in offshore wind and geophysical surveys.",
                image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800&q=80",
                href: "/about/profile",
            },
            {
                id: "history",
                label: "History",
                title: "Our Journey",
                desc: "From humble beginnings in 2004 to a global marine solution provider.",
                image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
                href: "/about/history",
            },
            {
                id: "governance",
                label: "Governance",
                title: "Transparent Management",
                desc: "Committed to ethical business practices and sustainable growth.",
                image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
                href: "/about/governance",
            },
            {
                id: "team",
                label: "Leadership & Team",
                title: "Expert Team",
                desc: "Meet the experts driving innovation in marine research.",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
                href: "/about/team",
            },
        ],
    },
    "EXPLORE SERVICES": {
        categories: [
            {
                id: "offshore-wind",
                label: "Offshore Wind",
                title: "Offshore Wind Support",
                desc: "Comprehensive site characterization for reliable wind farm development.",
                image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80",
                href: "/services/offshore-wind",
            },
            {
                id: "geophysical",
                label: "Geophysical Survey",
                title: "Seabed Mapping",
                desc: "High-resolution MBES, SSS, and SBP data acquisition.",
                image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80",
                href: "/services/geophysical",
            },
            {
                id: "geotechnical",
                label: "Geotechnical",
                title: "Soil Investigation",
                desc: "Deep seabed sampling and CPT testing for foundation design.",
                image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80",
                href: "/services/geotechnical",
            },
            {
                id: "environmental",
                label: "Environmental",
                title: "Marine Environment",
                desc: "Ecosystem monitoring and impact assessment.",
                image: "https://images.unsplash.com/photo-1583212235753-9c5272806aa3?w=800&q=80",
                href: "/services/environmental",
            },
        ],
    },
    "CAREERS": {
        categories: [
            {
                id: "culture",
                label: "Our Culture",
                title: "Growth & Balance",
                desc: "A workplace that values innovation, safety, and personal growth.",
                image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
                href: "/careers/culture",
            },
            {
                id: "jobs",
                label: "Open Positions",
                title: "Join Our Team",
                desc: "Find your next challenge in marine engineering and survey.",
                image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
                href: "/careers/jobs",
            },
        ],
    },
    "SUSTAINABILITY": {
        categories: [
            {
                id: "esg",
                label: "ESG Strategy",
                title: "Sustainable Future",
                desc: "Our commitment to Environmental, Social, and Governance goals.",
                image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?w=800&q=80",
                href: "/sustainability/esg",
            },
            {
                id: "safety",
                label: "Health & Safety",
                title: "Safety First",
                desc: "Zero harm policy for our people and the environment.",
                image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
                href: "/sustainability/safety",
            },
        ],
    },
    "CONTACTS": {
        categories: [
            {
                id: "offices",
                label: "Our Offices",
                title: "Global Presence",
                desc: "Visit our headquarters or regional support centers.",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
                href: "/contact/offices",
            },
            {
                id: "inquiry",
                label: "Business Inquiry",
                title: "Get in Touch",
                desc: "Discuss your upcoming marine projects with us.",
                image: "https://images.unsplash.com/photo-1423666639041-f14d70fa71f7?w=800&q=80",
                href: "/contact/inquiry",
            },
        ],
    },
};

type NavKey = keyof typeof NAV_CONTENT;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

export function MorphingDesktopNav({ onMenuOpen }: { onMenuOpen: (isOpen: boolean) => void }) {
    const [activeTab, setActiveTab] = useState<NavKey | null>(null);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

    useEffect(() => {
        onMenuOpen(!!activeTab);
    }, [activeTab, onMenuOpen]);

    useEffect(() => {
        if (activeTab) {
            setActiveCategoryIndex(0);
        }
    }, [activeTab]);

    return (
        <div className="flex items-center gap-8 xl:gap-10" onMouseLeave={() => setActiveTab(null)}>
            {/* Nav Items */}
            {Object.keys(NAV_CONTENT).map((tab) => (
                <div key={tab} className="relative group px-1 text-center">
                    <button
                        onMouseEnter={() => setActiveTab(tab as NavKey)}
                        className={cn(
                            "relative z-20 py-4 text-xs font-bold tracking-[0.15em] transition-colors duration-300 uppercase font-display",
                            activeTab === tab ? "text-white" : "text-white/60 hover:text-white"
                        )}
                    >
                        {tab}
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[120%] h-12 bg-transparent z-10" />
                </div>
            ))}

            <AnimatePresence>
                {activeTab && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="fixed top-[64px] left-0 w-full pt-2 z-[40]"
                    >
                        {/* 1. Full-Width Header Section (Solid Background) */}
                        <div className="w-full bg-marine-dark h-12 flex items-center border-b border-white/5 relative z-20 shadow-xl">
                            <div className="container-custom mx-auto max-w-[1240px] px-10 flex w-full">
                                <span className="text-[12px] font-bold text-white/40 uppercase tracking-[0.3em] font-display">{activeTab}</span>
                            </div>
                        </div>

                        {/* 2. Full-Width Body Section (Glass/Bokeh Background) */}
                        <div className="w-full bg-[#050b14]/70 backdrop-blur-3xl min-h-[520px] flex justify-center border-b border-white/5 shadow-2xl relative z-10">
                            <div className="container-custom mx-auto max-w-[1240px] flex w-full h-full relative z-10">
                                {/* Left Column: Categories */}
                                <motion.div
                                    key={activeTab}
                                    className="w-[300px] border-r border-white/10 py-10 px-8 flex flex-col gap-2 z-10"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {NAV_CONTENT[activeTab].categories.map((cat, idx) => (
                                        <motion.button
                                            key={cat.id}
                                            variants={itemVariants}
                                            onMouseEnter={() => setActiveCategoryIndex(idx)}
                                            className={cn(
                                                "w-full text-left px-5 py-4 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-between group",
                                                activeCategoryIndex === idx
                                                    ? "bg-white text-marine-dark shadow-xl scale-[1.02]"
                                                    : "text-white/50 hover:bg-white/5 hover:text-white"
                                            )}
                                        >
                                            {cat.label}
                                            {activeCategoryIndex === idx && (
                                                <ChevronRight size={16} className="text-marine-dark" />
                                            )}
                                        </motion.button>
                                    ))}
                                </motion.div>

                                {/* Right Column: Dynamic Detail Content */}
                                <div className="flex-1 p-12 pl-20 relative z-10">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTab + activeCategoryIndex}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                            className="h-full flex gap-12"
                                        >
                                            <div className="flex-1 flex flex-col justify-center">
                                                <h3 className="text-4xl font-bold text-white mb-6 font-display tracking-tight leading-tight">
                                                    {NAV_CONTENT[activeTab].categories[activeCategoryIndex].title}
                                                </h3>
                                                <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
                                                    {NAV_CONTENT[activeTab].categories[activeCategoryIndex].desc}
                                                </p>
                                                <Link
                                                    href={NAV_CONTENT[activeTab].categories[activeCategoryIndex].href}
                                                    className="inline-flex items-center gap-3 text-sm font-bold text-white bg-white/5 border border-white/10 rounded-xl px-8 py-4 hover:bg-white hover:text-marine-dark transition-all duration-300 group w-fit shadow-lg shadow-black/20"
                                                >
                                                    Explore Details
                                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>

                                            <div className="w-[450px] aspect-[4/3] rounded-2xl overflow-hidden relative shadow-2xl border border-white/10">
                                                <motion.div
                                                    key={NAV_CONTENT[activeTab].categories[activeCategoryIndex].image}
                                                    initial={{ scale: 1.1, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ duration: 0.6 }}
                                                    className="absolute inset-0 bg-cover bg-center"
                                                    style={{ backgroundImage: `url('${NAV_CONTENT[activeTab].categories[activeCategoryIndex].image}')` }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#050b14]/80 via-transparent to-transparent opacity-60" />
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Dimmer when menu open */}
            <AnimatePresence>
                {activeTab && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 top-0 bg-black/60 z-[30] h-screen w-screen pointer-events-none backdrop-blur-[8px]"
                        style={{
                            maskImage: "linear-gradient(to bottom, transparent 0%, black 20%)",
                            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%)"
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
