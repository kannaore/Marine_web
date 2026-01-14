"use client";

import { Plus, Grid } from "lucide-react";

interface Service {
    id: number;
    title: string;
    titleKo: string;
    gradient?: string;
    posterSrc?: string;
}

interface BusinessNavProps {
    services: Service[];
    activeIndex: number;
    isReady: boolean;
    onMenuOpen: () => void;
    onLearnMore: () => void;
}

export function BusinessNav({
    services,
    activeIndex,
    isReady,
    onMenuOpen,
    onLearnMore,
}: BusinessNavProps) {
    const currentService = services[activeIndex];

    return (
        <div className={`business-nav ${isReady ? "ready" : ""}`}>
            <div className="nav-data">
                {/* Learn More Button - simpac style */}
                <button
                    onClick={onLearnMore}
                    className="btn-more-nav"
                >
                    <div className="thumb">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`absolute inset-0 transition-opacity duration-300 ${
                                    index === activeIndex ? "opacity-100" : "opacity-0"
                                }`}
                            >
                                {/* Gradient background matching service */}
                                <div className={`h-full w-full bg-gradient-to-br ${service.gradient || 'from-ocean-600 to-ocean-800'}`} />
                            </div>
                        ))}
                    </div>
                    <div className="more-text">
                        <span className="label">Learn more</span>
                        <span className="title">{currentService?.titleKo || currentService?.title}</span>
                    </div>
                    <Plus size={20} className="more-icon" />
                </button>

                {/* All Menu (Grid) Button */}
                <button
                    onClick={onMenuOpen}
                    className="btn-all-nav"
                    aria-label="Open all services menu"
                >
                    <Grid size={24} className="text-white" />
                </button>
            </div>
        </div>
    );
}
