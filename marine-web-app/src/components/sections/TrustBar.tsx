"use client";

import { motion } from "framer-motion";

const clients = [
    { name: "해양수산부", logo: "/logos/mof.svg" },
    { name: "한국해양과학기술원", logo: "/logos/kiost.svg" },
    { name: "한국가스공사", logo: "/logos/kogas.svg" },
    { name: "SK E&S", logo: "/logos/sks.svg" },
    { name: "삼성물산", logo: "/logos/samsung.svg" },
    { name: "현대건설", logo: "/logos/hyundai.svg" },
];

export function TrustBar() {
    return (
        <section className="py-12 border-y border-white/5 bg-marine-dark/50 backdrop-blur-sm">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center gap-8"
                >
                    <p className="text-xs tracking-[0.3em] uppercase text-white/40 font-medium">
                        Trusted by Industry Leaders
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
                        {clients.map((client, index) => (
                            <motion.div
                                key={client.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group"
                            >
                                {/* Placeholder for logo - replace with actual logos */}
                                <div className="h-8 px-6 flex items-center justify-center text-white/30 group-hover:text-white/60 transition-colors duration-300 text-sm font-medium tracking-wide">
                                    {client.name}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
