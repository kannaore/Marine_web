"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/animations";
import {
    ChevronRight,
    Wind,
    Globe,
    Anchor,
    Waves,
    Fish,
    FlaskConical,
    type LucideIcon,
} from "lucide-react";
import { NAV_CONTENT } from "@/lib/navData";

const iconMap: Record<string, LucideIcon> = {
    "offshore-wind": Wind,
    geophysical: Globe,
    hydrographic: Anchor,
    "marine-physics": Waves,
    fishery: Fish,
    rnd: FlaskConical,
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
        <section ref={sectionRef} className="bg-marine-dark py-24 md:py-32">
            <div className="container-custom">
                <FadeIn>
                    <div className="mb-16 text-center">
                        <span className="text-ocean-400 mb-4 block text-sm font-medium tracking-widest uppercase">
                            {isKorean ? "전문 서비스" : "Expert Services"}
                        </span>
                        <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                            {isKorean
                                ? "종합 해양조사 서비스"
                                : "Comprehensive Marine Survey Services"}
                        </h2>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => {
                        const Icon = iconMap[service.id] || Globe;
                        return (
                            <Link
                                key={service.id}
                                href={service.href}
                                className="service-card group glass-panel overflow-hidden rounded-2xl transition-all duration-300 hover:bg-white/10"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{ backgroundImage: `url('${service.image}')` }}
                                    />
                                    <div className="from-marine-dark via-marine-dark/50 absolute inset-0 bg-gradient-to-t to-transparent" />

                                    {/* Icon Badge */}
                                    <div className="bg-ocean-500/20 border-ocean-500/30 absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl border backdrop-blur-sm">
                                        <Icon size={24} className="text-ocean-400" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="font-display group-hover:text-ocean-300 mb-2 text-xl font-bold text-white transition-colors">
                                        {isKorean ? service.label : service.labelEn}
                                    </h3>
                                    <p className="mb-4 line-clamp-2 text-sm text-white/60">
                                        {isKorean ? service.desc : service.descEn}
                                    </p>

                                    {/* Sub-items if exist */}
                                    {service.items && service.items.length > 0 && (
                                        <div className="mb-4 flex flex-wrap gap-2">
                                            {service.items.slice(0, 3).map((item) => (
                                                <span
                                                    key={item.label}
                                                    className="rounded-full bg-white/5 px-2 py-1 text-xs text-white/50"
                                                >
                                                    {isKorean ? item.label : item.labelEn}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="text-ocean-400 flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3">
                                        {isKorean ? "자세히 보기" : "Learn More"}
                                        <ChevronRight
                                            size={16}
                                            className="transition-transform group-hover:translate-x-1"
                                        />
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
