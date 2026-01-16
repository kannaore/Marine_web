"use client";

import { Wind, Radar, Mountain } from "lucide-react";
import { SectionHeading, ServiceCard } from "@/components/ui";
import { ScrollReveal, ScrollRevealItem } from "@/components/animations";

const services = [
    {
        title: "해상풍력 조사",
        description:
            "해상풍력발전단지 건설을 위한 종합적인 해양조사 서비스를 제공합니다. Site Characterization부터 정밀 지반조사까지 원스톱 솔루션을 제공합니다.",
        icon: <Wind size={24} />,
        image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80",
    },
    {
        title: "지구물리탐사",
        description:
            "최첨단 멀티빔 음향측심기, 사이드스캔소나, 서브바텀프로파일러를 활용하여 정밀한 해저지형 및 퇴적층 구조를 파악합니다.",
        icon: <Radar size={24} />,
        image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80",
    },
    {
        title: "지오테크니컬",
        description:
            "CPT, Vibrocore, Borehole 등 다양한 지반조사 장비를 보유하고 있으며, 프로젝트 특성에 맞는 최적의 조사방법을 제안합니다.",
        icon: <Mountain size={24} />,
        image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80",
    },
];

export function ServicesSection() {
    return (
        <section id="services" className="section-padding bg-marine-dark">
            <div className="container-custom">
                <SectionHeading
                    title="핵심 서비스"
                    subtitle="마린리서치는 해양조사의 모든 영역에서 전문적인 서비스를 제공합니다"
                />

                <ScrollReveal className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <ScrollRevealItem key={service.title}>
                            <ServiceCard
                                title={service.title}
                                description={service.description}
                                icon={service.icon}
                                image={service.image}
                            />
                        </ScrollRevealItem>
                    ))}
                </ScrollReveal>
            </div>
        </section>
    );
}
