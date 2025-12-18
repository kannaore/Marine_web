"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export function HeroSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section
            ref={ref}
            className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-marine-dark"
        >
            {/* Parallax Background */}
            <motion.div
                style={{ y, scale }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=80')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-marine-dark/40 via-marine-dark/20 to-marine-dark/90" />
                <div className="absolute inset-0 bg-marine-dark/30 backdrop-blur-[1px]" />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ opacity, y: textY }}
                className="relative z-10 container-custom text-center px-4"
            >
                <div className="max-w-4xl mx-auto space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-ocean-400 animate-pulse" />
                        <span className="text-ocean-100/90 text-sm font-medium tracking-wide">
                            Marine Survey Specialists
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight"
                    >
                        Unlocking the <br />
                        <span className="text-gradient-ocean relative">
                            Ocean's Potential
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-ocean-500 opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-lg md:text-xl text-ocean-50/70 max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        We provide precise offshore wind, geophysical, and geotechnical solutions
                        to build a safer and more sustainable marine future.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
                    >
                        <Button size="lg" className="rounded-full px-8 bg-white text-marine-dark hover:bg-ocean-50 hover:shadow-xl hover:shadow-white/10 transition-all">
                            Explore Services
                            <ArrowRight size={18} className="ml-2" />
                        </Button>
                        <Button variant="secondary" size="lg" className="rounded-full px-8 border-white/20 hover:bg-white/10">
                            Our Projects
                        </Button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-3">
                    <span className="text-[10px] tracking-[0.2em] font-medium text-white/30 uppercase">Scroll to Discover</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0"
                    />
                </div>
            </motion.div>
        </section>
    );
}
