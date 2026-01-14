"use client";

import { useRef, useEffect } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

interface Service {
    id: number;
    title: string;
    titleKo: string;
    description: string[];
    gradient?: string;
    accentColor?: string;
}

interface BusinessDetailPopupProps {
    service: Service | null;
    isOpen: boolean;
    onClose: () => void;
}

export function BusinessDetailPopup({
    service,
    isOpen,
    onClose,
}: BusinessDetailPopupProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !contentRef.current) return;

        if (isOpen && service) {
            // Animate content in
            gsap.fromTo(
                contentRef.current,
                { y: 60, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    delay: 0.15,
                    ease: "power4.out",
                }
            );
        }
    }, { scope: containerRef, dependencies: [isOpen, service] });

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

    if (!service) return null;

    return (
        <div
            ref={containerRef}
            className={`business-detail ${isOpen ? "active" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label={`${service.titleKo} details`}
        >
            {/* Background overlay - click to close */}
            <div 
                className="detail-backdrop" 
                onClick={onClose}
                aria-hidden="true"
            />

            <div className="detail-inner">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="btn-detail-close"
                    aria-label="Close details"
                >
                    <X size={24} />
                </button>

                {/* Content */}
                <div ref={contentRef} className="detail-content" style={{ opacity: 0 }}>
                    {/* Header */}
                    <div className="detail-header">
                        <span className="label">서비스 상세</span>
                        <h2 className="title">{service.title}</h2>
                        <h3 className="title-ko">{service.titleKo}</h3>
                    </div>

                    {/* Main Visual - Gradient background */}
                    <div className={`detail-visual bg-gradient-to-br ${service.gradient || 'from-ocean-600 to-ocean-900'}`}>
                        <div className="visual-overlay" />
                    </div>

                    {/* Description */}
                    <div className="detail-desc">
                        {service.description.map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <a 
                        href="#" 
                        className="btn-detail-cta"
                        onClick={(e) => {
                            e.preventDefault();
                            // TODO: Navigate to service page
                        }}
                    >
                        <span>사이트 바로가기</span>
                        <ArrowUpRight size={18} />
                    </a>
                </div>
            </div>
        </div>
    );
}
