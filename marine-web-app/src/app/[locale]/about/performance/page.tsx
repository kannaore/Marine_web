import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";

// Placeholder project data
const projects = [
    {
        year: "2024",
        nameKo: "동해 부유식 해상풍력 실증단지 해양조사",
        nameEn: "East Sea Floating Offshore Wind Farm Survey",
        clientKo: "한국해상풍력(주)",
        clientEn: "Korea Offshore Wind Co.",
        dateKo: "2024.03 - 2024.12",
        dateEn: "Mar 2024 - Dec 2024",
    },
    {
        year: "2024",
        nameKo: "서남해 해상풍력 3단계 지형조사",
        nameEn: "Southwest Sea Offshore Wind Phase 3 Survey",
        clientKo: "한국전력공사",
        clientEn: "KEPCO",
        dateKo: "2024.01 - 2024.08",
        dateEn: "Jan 2024 - Aug 2024",
    },
    {
        year: "2023",
        nameKo: "제주 동부 해저케이블 노선조사",
        nameEn: "Jeju East Submarine Cable Route Survey",
        clientKo: "한국전력공사",
        clientEn: "KEPCO",
        dateKo: "2023.06 - 2023.12",
        dateEn: "Jun 2023 - Dec 2023",
    },
    {
        year: "2023",
        nameKo: "울산 부유식 해상풍력 해양환경조사",
        nameEn: "Ulsan Floating Wind Marine Environment Survey",
        clientKo: "SK E&S",
        clientEn: "SK E&S",
        dateKo: "2023.03 - 2023.10",
        dateEn: "Mar 2023 - Oct 2023",
    },
    {
        year: "2022",
        nameKo: "신안 해상풍력 지반조사",
        nameEn: "Sinan Offshore Wind Geotechnical Survey",
        clientKo: "해양에너지(주)",
        clientEn: "Marine Energy Co.",
        dateKo: "2022.05 - 2022.11",
        dateEn: "May 2022 - Nov 2022",
    },
    {
        year: "2022",
        nameKo: "동해 심해 가스전 탐사",
        nameEn: "East Sea Deep Gas Field Exploration",
        clientKo: "한국석유공사",
        clientEn: "KNOC",
        dateKo: "2022.01 - 2022.08",
        dateEn: "Jan 2022 - Aug 2022",
    },
];

export default async function PerformancePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const isKorean = locale === "ko";

    return (
        <main className="min-h-screen bg-marine-dark pt-32 pb-20">
            <div className="container-custom">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={16} />
                        {isKorean ? "회사 소개" : "About Us"}
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-12">
                    <span className="text-ocean-400 text-sm font-medium tracking-widest uppercase mb-4 block">
                        {isKorean ? "실적" : "Track Record"}
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                        {isKorean ? "프로젝트 실적" : "Project Portfolio"}
                    </h1>
                    <p className="text-white/60 text-lg max-w-2xl">
                        {isKorean
                            ? "마린리서치가 수행한 주요 프로젝트 목록입니다."
                            : "A list of major projects completed by Marine Research."}
                    </p>
                </div>

                {/* Projects Table */}
                <div className="glass-panel rounded-2xl overflow-hidden">
                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 border-b border-white/10">
                        <div className="col-span-1 text-white/50 text-sm font-medium">
                            {isKorean ? "연도" : "Year"}
                        </div>
                        <div className="col-span-5 text-white/50 text-sm font-medium">
                            {isKorean ? "프로젝트명" : "Project Name"}
                        </div>
                        <div className="col-span-3 text-white/50 text-sm font-medium">
                            {isKorean ? "발주처" : "Client"}
                        </div>
                        <div className="col-span-3 text-white/50 text-sm font-medium">
                            {isKorean ? "기간" : "Period"}
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-white/5">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-5 hover:bg-white/5 transition-colors"
                            >
                                <div className="col-span-1 text-ocean-400 font-medium md:text-base text-sm">
                                    {project.year}
                                </div>
                                <div className="col-span-5 text-white font-medium">
                                    {isKorean ? project.nameKo : project.nameEn}
                                </div>
                                <div className="col-span-3 text-white/60 text-sm md:text-base">
                                    {isKorean ? project.clientKo : project.clientEn}
                                </div>
                                <div className="col-span-3 text-white/50 text-sm">
                                    {isKorean ? project.dateKo : project.dateEn}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <p className="text-white/60 mb-6">
                        {isKorean
                            ? "프로젝트 문의가 있으신가요?"
                            : "Have a project inquiry?"}
                    </p>
                    <Link
                        href="/contact/inquiry"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-ocean-500 hover:bg-ocean-400 text-white font-medium rounded-xl transition-colors"
                    >
                        {isKorean ? "영업팀 연락하기" : "Contact Sales Team"}
                        <ChevronRight size={18} />
                    </Link>
                </div>
            </div>
        </main>
    );
}
