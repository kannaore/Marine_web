"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const clients = [
    { name: "해양수산부", logo: "/logos/mof.svg" },
    { name: "한국해양과학기술원", logo: "/logos/kiost.svg" },
    { name: "한국가스공사", logo: "/logos/kogas.svg" },
    { name: "SK E&S", logo: "/logos/sks.svg" },
    { name: "삼성물산", logo: "/logos/samsung.svg" },
    { name: "현대건설", logo: "/logos/hyundai.svg" },
];

export function TrustBar() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current || !containerRef.current) return;

            // Fade in container
            gsap.from(containerRef.current, {
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });

            // Stagger client items
            const items = containerRef.current.querySelectorAll(".client-item");
            gsap.from(items, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="py-12 border-y border-white/5 bg-marine-dark/50 backdrop-blur-sm">
            <div className="container-custom">
                <div
                    ref={containerRef}
                    className="flex flex-col items-center gap-8"
                >
                    <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-medium">
                        Trusted by Industry Leaders
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
                        {clients.map((client) => (
                            <div
                                key={client.name}
                                className="client-item group"
                            >
                                <div className="h-8 px-6 flex items-center justify-center text-white/30 group-hover:text-white/60 transition-colors duration-300 text-sm font-medium tracking-wide">
                                    {client.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
