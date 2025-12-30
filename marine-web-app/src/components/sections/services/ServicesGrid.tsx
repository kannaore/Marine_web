"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/animations";
import { ChevronRight, Wind, Globe, Anchor, Waves, Fish, FlaskConical, type LucideIcon } from "lucide-react";
import { NAV_CONTENT } from "@/lib/navData";

const iconMap: Record<string, LucideIcon> = {
    "offshore-wind": Wind,
    "geophysical": Globe,
    "hydrographic": Anchor,
    "marine-physics": Waves,
    "fishery": Fish,
    "rnd": FlaskConical,
};

export function ServicesGrid() {
    const sectionRef = useRef<HTMLElement>(null);
    const locale = useLocale();
    const isKorean = locale === "ko";

    const services = NAV_CONTENT["EXPLORE SERVICES"].categories;

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const cards = sectionRef.current.querySelectorAll(".service-card");
            gsap.from(cards, {
                opacity: 0,
                y: 50,
                stagger: 0.1,
                duration: 0.6,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-marine-dark">
            <div className="container-custom">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="text-ocean-400 text-sm font-medium tracking-widest uppercase mb-4 block">
                            {isKorean ? "전문 서비스" : "Expert Services"}
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                            {isKorean ? "종합 해양조사 서비스" : "Comprehensive Marine Survey Services"}
                        </h2>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                        const Icon = iconMap[service.id] || Globe;
                        return (
                            <Link
                                key={service.id}
                                href={service.href}
                                className="service-card group glass-panel rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{ backgroundImage: `url('${service.image}')` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-marine-dark via-marine-dark/50 to-transparent" />

                                    {/* Icon Badge */}
                                    <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-ocean-500/20 backdrop-blur-sm border border-ocean-500/30 flex items-center justify-center">
                                        <Icon size={24} className="text-ocean-400" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-ocean-300 transition-colors">
                                        {isKorean ? service.label : service.labelEn}
                                    </h3>
                                    <p className="text-white/60 text-sm mb-4 line-clamp-2">
                                        {isKorean ? service.desc : service.descEn}
                                    </p>

                                    {/* Sub-items if exist */}
                                    {service.items && service.items.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {service.items.slice(0, 3).map((item) => (
                                                <span
                                                    key={item.label}
                                                    className="text-xs px-2 py-1 bg-white/5 rounded-full text-white/50"
                                                >
                                                    {isKorean ? item.label : item.labelEn}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 text-ocean-400 text-sm font-medium group-hover:gap-3 transition-all">
                                        {isKorean ? "자세히 보기" : "Learn More"}
                                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
