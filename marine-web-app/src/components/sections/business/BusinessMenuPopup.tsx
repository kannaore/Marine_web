"use client";

import { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

interface Service {
    id: number;
    title: string;
    titleKo: string;
    gradient?: string;
    posterSrc?: string;
    thumbnailSrc?: string;
}

interface BusinessMenuPopupProps {
    services: Service[];
    activeIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onItemClick: (index: number) => void;
}

export function BusinessMenuPopup({
    services,
    activeIndex,
    isOpen,
    onClose,
    onItemClick,
}: BusinessMenuPopupProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        if (isOpen) {
            // Animate menu items in (simpac exact values)
            gsap.fromTo(
                itemsRef.current.filter(Boolean),
                { y: 40, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.05,
                    delay: 0.2,
                    ease: "power4.out", // easeOutQuart equivalent
                }
            );
        }
    }, { scope: containerRef, dependencies: [isOpen] });

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Split services into rows: 3 on top, 2 (or rest) on bottom
    const topRow = services.slice(0, 3);
    const bottomRow = services.slice(3);

    return (
        <div
            ref={containerRef}
            className={`business-pop ${isOpen ? "active" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label="Services menu"
        >
            <div className="pop-inner">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="btn-pop-close"
                    aria-label="Close menu"
                >
                    <X size={24} />
                </button>

                {/* Menu Grid - 3+2 Staggered Layout */}
                <div className="business-menu">
                    <div className="menu-outer staggered-grid">
                        {/* Top Row - 3 items */}
                        <div className="grid-row top-row">
                            {topRow.map((service, index) => (
                                <div
                                    key={service.id}
                                    className={`menu-item ${index === activeIndex ? "active" : ""}`}
                                >
                                    <button
                                        ref={(el) => { itemsRef.current[index] = el; }}
                                        onClick={() => onItemClick(index)}
                                        className="btn-menu-nav"
                                        style={{ opacity: 0 }}
                                    >
                                        <span className="thumb">
                                            {service.thumbnailSrc ? (
                                                <img 
                                                    src={service.thumbnailSrc} 
                                                    alt={service.titleKo}
                                                    className="aspect-[4/3] w-full rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className={`aspect-[4/3] w-full rounded-lg bg-gradient-to-br ${service.gradient || 'from-ocean-600 to-ocean-900'}`} />
                                            )}
                                        </span>
                                        <span className="name">
                                            {service.titleKo}
                                        </span>
                                    </button>
                                </div>
                            ))}
                        </div>
                        {/* Bottom Row - 2 items (centered) */}
                        <div className="grid-row bottom-row">
                            {bottomRow.map((service, index) => {
                                const actualIndex = index + 3;
                                return (
                                    <div
                                        key={service.id}
                                        className={`menu-item ${actualIndex === activeIndex ? "active" : ""}`}
                                    >
                                        <button
                                            ref={(el) => { itemsRef.current[actualIndex] = el; }}
                                            onClick={() => onItemClick(actualIndex)}
                                            className="btn-menu-nav"
                                            style={{ opacity: 0 }}
                                        >
                                            <span className="thumb">
                                                {service.thumbnailSrc ? (
                                                    <img 
                                                        src={service.thumbnailSrc} 
                                                        alt={service.titleKo}
                                                        className="aspect-[4/3] w-full rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <div className={`aspect-[4/3] w-full rounded-lg bg-gradient-to-br ${service.gradient || 'from-ocean-600 to-ocean-900'}`} />
                                                )}
                                            </span>
                                            <span className="name">
                                                {service.titleKo}
                                            </span>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
