"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
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

export function MorphingDesktopNav({ onMenuOpen }: { onMenuOpen: (isOpen: boolean) => void }) {
    const [activeTab, setActiveTab] = useState<NavKey | null>(null);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [hasPlayedInitialAnimation, setHasPlayedInitialAnimation] = useState(false);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const prevActiveTabRef = useRef<NavKey | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        onMenuOpen(!!activeTab);
    }, [activeTab, onMenuOpen]);

    useEffect(() => {
        setActiveCategoryIndex(0);
    }, [activeTab]);

    // Track when dropdown first opens to trigger initial animation only once
    useEffect(() => {
        if (activeTab && prevActiveTabRef.current === null) {
            // Dropdown just opened - trigger animation
            setHasPlayedInitialAnimation(false);
            // Delay to sync with curtain animation (start when curtain is ~70% down)
            const timer = setTimeout(() => {
                setHasPlayedInitialAnimation(true);
            }, 300);
            return () => clearTimeout(timer);
        }
        prevActiveTabRef.current = activeTab;
    }, [activeTab]);

    // Clear timeout on unmount
    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

    // Delayed close with hover intent pattern
    const scheduleClose = useCallback(() => {
        closeTimeoutRef.current = setTimeout(() => {
            setActiveTab(null);
            prevActiveTabRef.current = null; // Reset so animation plays on next open
            setHasPlayedInitialAnimation(false);
        }, 150); // 150ms delay - enough to move mouse to dropdown
    }, []);

    const cancelClose = useCallback(() => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    }, []);

    const handleMouseEnterNav = useCallback((tab: NavKey) => {
        cancelClose();
        setActiveTab(tab);
    }, [cancelClose]);

    const handleMouseLeaveNav = useCallback(() => {
        scheduleClose();
    }, [scheduleClose]);

    const handleMouseEnterDropdown = useCallback(() => {
        cancelClose();
    }, [cancelClose]);

    const handleMouseLeaveDropdown = useCallback(() => {
        scheduleClose();
    }, [scheduleClose]);

    const handleCloseDropdown = () => {
        cancelClose();
        setActiveTab(null);
    };

    return (
        <div
            className="flex items-center gap-8 xl:gap-10"
            onMouseEnter={cancelClose}
            onMouseLeave={handleMouseLeaveNav}
        >
            {/* Nav Items */}
            {Object.keys(NAV_CONTENT).map((tab) => (
                <div
                    key={tab}
                    className="relative group px-1 text-center"
                    onMouseEnter={() => handleMouseEnterNav(tab as NavKey)}
                >
                    <button
                        className={cn(
                            "relative z-20 py-4 text-xs font-bold tracking-[0.15em] transition-colors duration-300 uppercase font-display",
                            activeTab === tab ? "text-white" : "text-white/60 hover:text-white"
                        )}
                    >
                        {tab}
                    </button>
                    {/* Extended hover area - minimal trigger area + bridge to dropdown */}
                    <div
                        className="absolute top-full left-1/2 -translate-x-1/2 w-[150%] h-2 bg-transparent z-10"
                    />
                    {/* Invisible bridge connecting nav item to dropdown content */}
                    {activeTab === tab && (
                        <div
                            className="absolute top-full left-1/2 -translate-x-1/2 z-10"
                            style={{
                                width: '300px',
                                height: '80px',
                                background: 'transparent',
                                clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)'
                            }}
                        />
                    )}
                </div>
            ))}

            {/* Portal to body for full-width dropdown */}
            {mounted && createPortal(
                <>
                    <AnimatePresence mode="wait">
                        {activeTab && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="fixed inset-0 z-[45]"
                            >
                                {/* Click overlay to close dropdown */}
                                <div
                                    className="absolute inset-0"
                                    onClick={handleCloseDropdown}
                                />

                                {/* Dropdown content wrapper - dynamic height based on categories */}
                                <div
                                    className="absolute top-0 left-0 right-0"
                                    style={{
                                        height: 88 + (NAV_CONTENT[activeTab].categories.length <= 2 ? 300 :
                                            NAV_CONTENT[activeTab].categories.length === 3 ? 350 : 400)
                                    }}
                                    onMouseEnter={handleMouseEnterDropdown}
                                    onMouseLeave={handleMouseLeaveDropdown}
                                >
                                    {/* Unified Background Container - single animation for both header and content */}
                                    <motion.div
                                        initial={{ clipPath: "inset(0 0 100% 0)" }}
                                        animate={{ clipPath: "inset(0 0 0% 0)" }}
                                        exit={{ clipPath: "inset(0 0 100% 0)" }}
                                        transition={{
                                            duration: 0.45,
                                            ease: [0.25, 0.46, 0.45, 0.94]
                                        }}
                                        className="relative overflow-hidden"
                                    >
                                        {/* Animated Background & Container - unified height animation */}
                                        <motion.div
                                            className="relative bg-marine-dark backdrop-blur-3xl border-b border-white/5 shadow-2xl"
                                            initial={false}
                                            animate={{
                                                height: 88 + (NAV_CONTENT[activeTab].categories.length <= 2 ? 300 :
                                                    NAV_CONTENT[activeTab].categories.length === 3 ? 350 : 400)
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 40,
                                                mass: 1
                                            }}
                                        >
                                            {/* Content Area - positioned below the header height */}
                                            <div
                                                ref={contentRef}
                                                className="absolute left-0 right-0 max-w-[1240px] mx-auto flex items-start py-10 px-10"
                                                style={{ top: 88 }}
                                            >
                                                {/* Left Column: Categories - with blur-to-focus animation and absolute positioned divider */}
                                                <motion.div
                                                    className="relative w-[280px] pr-8 flex flex-col gap-2"
                                                    style={{
                                                        // Dynamic divider height based on content area height (subtract 60px for bottom spacing)
                                                        ['--divider-height' as string]: `${(NAV_CONTENT[activeTab].categories.length <= 2 ? 300 :
                                                            NAV_CONTENT[activeTab].categories.length === 3 ? 350 : 400) - 60}px`
                                                    }}
                                                    initial={hasPlayedInitialAnimation ? false : { opacity: 0, filter: "blur(12px)" }}
                                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay: hasPlayedInitialAnimation ? 0 : 0.15,
                                                        ease: "easeOut"
                                                    }}
                                                >
                                                    {/* Vertical divider line - extends based on content height */}
                                                    <div
                                                        className="absolute right-0 top-0 w-px bg-white/10"
                                                        style={{ height: 'var(--divider-height)' }}
                                                    />

                                                    <span className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.25em] font-display mb-4 px-5">
                                                        {activeTab}
                                                    </span>

                                                    {/* All categories from all menus - show/hide based on activeTab */}
                                                    {NAV_CONTENT[activeTab].categories.map((cat, idx) => (
                                                        <button
                                                            key={cat.id}
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
                                                        </button>
                                                    ))}
                                                </motion.div>

                                                {/* Right Column: Detail Content */}
                                                <div className="flex-1 pl-12">
                                                    <AnimatePresence mode="wait">
                                                        <motion.div
                                                            key={activeTab + activeCategoryIndex}
                                                            initial={{ opacity: 0, x: 20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: -20 }}
                                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                                            className="flex gap-10 items-center"
                                                        >
                                                            <div className="flex-1 flex flex-col justify-center">
                                                                <h3 className="text-3xl font-bold text-white mb-4 font-display tracking-tight leading-tight">
                                                                    {NAV_CONTENT[activeTab].categories[activeCategoryIndex].title}
                                                                </h3>
                                                                <p className="text-white/60 text-base leading-relaxed mb-6 max-w-md">
                                                                    {NAV_CONTENT[activeTab].categories[activeCategoryIndex].desc}
                                                                </p>
                                                                <Link
                                                                    href={NAV_CONTENT[activeTab].categories[activeCategoryIndex].href}
                                                                    className="inline-flex items-center gap-3 text-sm font-bold text-white bg-white/5 border border-white/10 rounded-xl px-6 py-3 hover:bg-white hover:text-marine-dark transition-all duration-300 group w-fit shadow-lg shadow-black/20"
                                                                >
                                                                    Explore Details
                                                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                                </Link>
                                                            </div>

                                                            <div className="w-[320px] h-[220px] rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 shrink-0">
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
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Background Dimmer */}
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
                </>,
                document.body
            )}
        </div>
    );
}
