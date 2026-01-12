import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";

// Placeholder client data
const clients = [
    { name: "한국해양과학기술원", nameEn: "KIOST", category: "정부기관" },
    { name: "해양수산부", nameEn: "Ministry of Oceans and Fisheries", category: "정부기관" },
    { name: "한국전력공사", nameEn: "KEPCO", category: "공기업" },
    { name: "한국석유공사", nameEn: "KNOC", category: "공기업" },
    { name: "한국가스공사", nameEn: "KOGAS", category: "공기업" },
    { name: "해양환경공단", nameEn: "KOEM", category: "공기업" },
    { name: "한국해양수산개발원", nameEn: "KMI", category: "연구기관" },
    { name: "SK E&S", nameEn: "SK E&S", category: "민간기업" },
    { name: "포스코", nameEn: "POSCO", category: "민간기업" },
    { name: "삼성물산", nameEn: "Samsung C&T", category: "민간기업" },
    { name: "현대건설", nameEn: "Hyundai E&C", category: "민간기업" },
    { name: "오스테드", nameEn: "Ørsted", category: "외국기업" },
    { name: "이퀴노르", nameEn: "Equinor", category: "외국기업" },
    { name: "토탈에너지", nameEn: "TotalEnergies", category: "외국기업" },
    { name: "쉘", nameEn: "Shell", category: "외국기업" },
    { name: "BP", nameEn: "BP", category: "외국기업" },
];

const categories = [
    { ko: "정부기관", en: "Government" },
    { ko: "공기업", en: "Public Enterprise" },
    { ko: "연구기관", en: "Research Institute" },
    { ko: "민간기업", en: "Private Company" },
    { ko: "외국기업", en: "International" },
];

export default async function ClientsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const isKorean = locale === "ko";

    return (
        <main className="bg-marine-dark min-h-screen pt-32 pb-20">
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
                <div className="mb-12">
                    <span className="text-ocean-400 mb-4 block text-sm font-medium tracking-widest uppercase">
                        {isKorean ? "고객사" : "Clients"}
                    </span>
                    <h1 className="font-display mb-4 text-4xl font-bold text-white md:text-5xl">
                        {isKorean ? "주요 고객사" : "Our Clients"}
                    </h1>
                    <p className="max-w-2xl text-lg text-white/60">
                        {isKorean
                            ? "마린리서치와 함께한 국내외 주요 파트너입니다."
                            : "Major domestic and international partners who have worked with Marine Research."}
                    </p>
                </div>

                {/* Clients by Category */}
                <div className="space-y-12">
                    {categories.map((cat) => {
                        const categoryClients = clients.filter((c) => c.category === cat.ko);
                        if (categoryClients.length === 0) return null;

                        return (
                            <div key={cat.ko}>
                                <h2 className="text-ocean-400 mb-6 text-lg font-semibold">
                                    {isKorean ? cat.ko : cat.en}
                                </h2>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                    {categoryClients.map((client) => (
                                        <div
                                            key={client.nameEn}
                                            className="glass-panel flex items-center justify-center rounded-xl p-6 transition-colors hover:bg-white/10"
                                        >
                                            <span className="text-center font-medium text-white/80">
                                                {isKorean ? client.name : client.nameEn}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <p className="mb-6 text-white/60">
                        {isKorean ? "파트너십에 관심이 있으신가요?" : "Interested in partnership?"}
                    </p>
                    <Link
                        href="/contact/inquiry"
                        className="bg-ocean-500 hover:bg-ocean-400 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium text-white transition-colors"
                    >
                        {isKorean ? "영업팀 연락하기" : "Contact Sales Team"}
                        <ChevronRight size={18} />
                    </Link>
                </div>
            </div>
        </main>
    );
}
