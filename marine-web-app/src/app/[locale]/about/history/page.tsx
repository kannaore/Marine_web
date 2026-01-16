"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

const historyData = [
    {
        year: "2024",
        events: [
            {
                titleKo: "해상풍력 분야 국내 시장점유율 1위 달성",
                titleEn: "Achieved #1 market share in domestic offshore wind sector",
            },
            {
                titleKo: "제2조사선 '마린이노베이터' 진수",
                titleEn: "Launch of second survey vessel 'Marine Innovator'",
            },
        ],
    },
    {
        year: "2023",
        events: [
            {
                titleKo: "연간 매출 1,000억원 돌파",
                titleEn: "Annual revenue exceeded 100 billion KRW",
            },
            {
                titleKo: "해양조사 자동화 시스템 특허 등록 (5건)",
                titleEn: "Registered 5 patents for marine survey automation systems",
            },
        ],
    },
    {
        year: "2022",
        events: [
            {
                titleKo: "동남아시아 지사 설립 (베트남)",
                titleEn: "Established Southeast Asia branch (Vietnam)",
            },
            {
                titleKo: "글로벌 해상풍력 컨소시엄 참여",
                titleEn: "Joined global offshore wind consortium",
            },
        ],
    },
    {
        year: "2020",
        events: [
            {
                titleKo: "대형 조사선 '마린리서처' 진수",
                titleEn: "Launch of survey vessel 'Marine Researcher'",
            },
            {
                titleKo: "해저 3D 매핑 기술 개발 완료",
                titleEn: "Completed development of subsea 3D mapping technology",
            },
        ],
    },
    {
        year: "2018",
        events: [
            {
                titleKo: "R&D 센터 설립",
                titleEn: "Established R&D Center",
            },
            {
                titleKo: "연간 프로젝트 수행 100건 돌파",
                titleEn: "Exceeded 100 projects annually",
            },
        ],
    },
    {
        year: "2015",
        events: [
            {
                titleKo: "ISO 9001/14001/45001 통합 인증 획득",
                titleEn: "Obtained ISO 9001/14001/45001 integrated certification",
            },
            {
                titleKo: "본사 신사옥 이전",
                titleEn: "Relocated to new headquarters",
            },
        ],
    },
    {
        year: "2010",
        events: [
            {
                titleKo: "해양조사업 등록",
                titleEn: "Registered as marine survey business",
            },
            {
                titleKo: "첫 해외 프로젝트 수주 (일본)",
                titleEn: "Won first overseas project (Japan)",
            },
        ],
    },
    {
        year: "2004",
        events: [
            {
                titleKo: "마린리서치 설립",
                titleEn: "Marine Research founded",
            },
        ],
    },
];

export default function HistoryPage() {
    const sectionRef = useRef<HTMLElement>(null);
    const locale = useLocale();
    const isKorean = locale === "ko";

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const items = sectionRef.current.querySelectorAll(".history-item");
            gsap.from(items, {
                opacity: 0,
                x: -30,
                stagger: 0.1,
                duration: 0.5,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <main ref={sectionRef} className="bg-marine-dark min-h-screen pt-32 pb-20">
            <div className="container-custom">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 text-white/50 transition-colors hover:text-white"
                    >
                        <ArrowLeft size={16} />
                        {isKorean ? "회사 소개" : "About Us"}
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-16">
                    <span className="text-ocean-400 mb-4 block text-sm font-medium tracking-widest uppercase">
                        {isKorean ? "연혁" : "History"}
                    </span>
                    <h1 className="font-display mb-4 text-4xl font-bold text-white md:text-5xl">
                        {isKorean ? "성장의 발자취" : "Milestones of Growth"}
                    </h1>
                    <p className="max-w-2xl text-lg text-white/60">
                        {isKorean
                            ? "2004년 설립 이래 대한민국 해양조사 산업을 선도해온 마린리서치의 여정입니다."
                            : "The journey of Marine Research, leading Korea's marine survey industry since 2004."}
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative pl-8 md:pl-16">
                    {/* Timeline Line */}
                    <div className="from-ocean-500 via-ocean-500/50 absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b to-transparent" />

                    {/* Timeline Items */}
                    <div className="space-y-16">
                        {historyData.map((yearData) => (
                            <div key={yearData.year} className="history-item relative">
                                {/* Year Dot */}
                                <div className="bg-ocean-500 border-marine-dark absolute top-1 -left-8 h-4 w-4 rounded-full border-4 md:-left-16" />

                                {/* Year */}
                                <div className="font-display text-ocean-400 mb-6 text-4xl font-bold md:text-5xl">
                                    {yearData.year}
                                </div>

                                {/* Events */}
                                <div className="space-y-4">
                                    {yearData.events.map((event, idx) => (
                                        <div
                                            key={idx}
                                            className="glass-panel rounded-xl p-5 transition-colors hover:bg-white/10"
                                        >
                                            <p className="font-medium text-white">
                                                {isKorean ? event.titleKo : event.titleEn}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
