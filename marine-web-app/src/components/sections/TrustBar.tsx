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
        <section
            ref={sectionRef}
            className="bg-marine-dark/50 border-y border-white/5 py-12 backdrop-blur-sm"
        >
            <div className="container-custom">
                <div ref={containerRef} className="flex flex-col items-center gap-8">
                    <p className="text-xs font-medium tracking-[0.3em] text-white/40 uppercase">
                        Trusted by Industry Leaders
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
                        {clients.map((client) => (
                            <div key={client.name} className="client-item group">
                                <div className="flex h-8 items-center justify-center px-6 text-sm font-medium tracking-wide text-white/30 transition-colors duration-300 group-hover:text-white/60">
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
