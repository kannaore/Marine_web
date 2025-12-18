"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { MorphingDesktopNav } from "./MorphingDesktopNav";

const navItems = [
    { label: "ABOUT US", href: "#about" },
    { label: "EXPLORE SERVICES", href: "#services" },
    { label: "CAREERS", href: "#careers" },
    { label: "SUSTAINABILITY", href: "#sustainability" },
    { label: "CONTACTS", href: "#contact" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Global Backdrop Blur Overlay (Apple-style) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed inset-0 z-[40] bg-black/20 backdrop-blur-[12px]"
                        style={{
                            WebkitBackdropFilter: "blur(12px) saturate(150%) brightness(0.8)",
                        }}
                    />
                )}
            </AnimatePresence>

            <header
                className={cn(
                    "fixed top-4 inset-x-0 mx-auto z-50 transition-all duration-500 ease-out",
                    "w-[90%] max-w-[1240px] rounded-2xl py-1 px-6",
                    "border border-transparent", // Always have border to prevent layout shift
                    isMenuOpen
                        ? "bg-transparent" // Transparent so solid background behind shows through
                        : isScrolled
                            ? "bg-marine-dark/40 !border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                            : ""
                )}
                style={{
                    WebkitBackdropFilter: isMenuOpen ? "none" : (isScrolled ? "blur(32px) saturate(180%) brightness(1.1)" : "none"),
                    backdropFilter: isMenuOpen ? "none" : (isScrolled ? "blur(32px) saturate(180%) brightness(1.1)" : "none"),
                }}
            >
                <div className="flex items-center justify-between">
                    {/* Left Section: Logo & Nav */}
                    <div className="flex items-center gap-12 xl:gap-16">
                        {/* Logo Section */}
                        <Link href="/" className="flex items-center gap-2 shrink-0 relative z-10">
                            <div className="relative w-24 lg:w-28 h-6 lg:h-7 transition-all duration-300">
                                <Image
                                    src="/logo.png"
                                    alt="Marine Research Logo"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation - Morphing Menu */}
                        <nav className="hidden lg:flex items-center">
                            <MorphingDesktopNav onMenuOpen={setIsMenuOpen} />
                        </nav>
                    </div>

                    {/* Right Actions */}
                    <div className="hidden lg:flex items-center gap-8 relative z-10">
                        <LanguageSwitcher />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="lg:hidden p-1 text-white relative z-10"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] lg:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="absolute right-0 top-0 bottom-0 w-[300px] bg-marine-dark border-l border-white/10 shadow-2xl"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <span className="font-display font-bold text-lg text-white">MENU</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 text-white/60 hover:text-white"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <nav className="p-6 flex flex-col gap-6">
                                {navItems.map((item, index) => (
                                    <motion.a
                                        key={item.label}
                                        href={item.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-medium text-white/80 hover:text-white transition-colors"
                                    >
                                        {item.label}
                                    </motion.a>
                                ))}
                                <div className="mt-4 pt-6 border-t border-white/10">
                                    <LanguageSwitcher />
                                </div>
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
