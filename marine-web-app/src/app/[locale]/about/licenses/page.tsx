import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, FileText, CheckCircle2, Calendar, Building } from "lucide-react";

// 면허 현황 데이터
const LICENSES_DATA = {
    heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=90",

    licenses: [
        {
            id: "marine-survey",
            name: "해양조사업",
            registrationNo: "제2024-001호",
            issuer: "해양수산부",
            issuedDate: "2020.03.15",
            validUntil: "2025.03.14",
            scope: "해양물리탐사, 해양지질조사, 해양환경조사",
            status: "active",
        },
        {
            id: "surveying",
            name: "측량업",
            registrationNo: "제2024-002호",
            issuer: "국토교통부",
            issuedDate: "2019.05.20",
            validUntil: "2024.05.19",
            scope: "공공측량, 지적측량, 수로측량",
            status: "active",
        },
        {
            id: "hydrographic",
            name: "수로조사업",
            registrationNo: "제2024-003호",
            issuer: "해양수산부",
            issuedDate: "2021.01.10",
            validUntil: "2026.01.09",
            scope: "수심측량, 해저지형조사, 항로조사",
            status: "active",
        },
        {
            id: "environmental",
            name: "환경영향평가업",
            registrationNo: "제2024-004호",
            issuer: "환경부",
            issuedDate: "2022.06.01",
            validUntil: "2027.05.31",
            scope: "해양환경영향평가, 생태계조사",
            status: "active",
        },
    ],

    technicalCapabilities: [
        {
            category: "해양물리탐사",
            items: ["멀티빔 음향측심", "사이드스캔 소나", "천부지층탐사", "자력탐사"],
        },
        {
            category: "해양지질조사",
            items: ["해저시추", "CPT 관입시험", "피스톤코어링", "그랩샘플링"],
        },
        {
            category: "해양측량",
            items: ["DGPS 측위", "RTK 측량", "수심측량", "해안선측량"],
        },
        {
            category: "해양환경조사",
            items: ["수질분석", "퇴적물분석", "생태계조사", "해양오염조사"],
        },
    ],
};

export default async function LicensesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
                <Image
                    src={LICENSES_DATA.heroImage}
                    alt="Licenses"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050b14]/70 via-[#050b14]/50 to-[#050b14]" />

                <div className="relative h-full flex flex-col justify-center items-center text-center px-6">
                    <Link
                        href="/about"
                        className="absolute top-8 left-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>About Us</span>
                    </Link>

                    <span className="text-cyan-400 font-semibold tracking-wider uppercase text-sm mb-4">
                        Licenses
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-4">
                        보유 면허 현황
                    </h1>
                    <p className="text-white/60 max-w-2xl text-lg">
                        국가 공인 면허를 통해 전문적이고 신뢰할 수 있는 서비스를 제공합니다
                    </p>
                </div>
            </section>

            {/* Licenses List */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm">
                            Official Licenses
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display mt-4">
                            공식 면허
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {LICENSES_DATA.licenses.map((license) => (
                            <div
                                key={license.id}
                                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                                            <FileText size={28} className="text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{license.name}</h3>
                                            <p className="text-sm text-gray-400">{license.registrationNo}</p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                        <CheckCircle2 size={14} />
                                        유효
                                    </span>
                                </div>

                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                    <span className="font-medium text-gray-900">수행 범위: </span>
                                    {license.scope}
                                </p>

                                <div className="grid grid-cols-2 gap-4 text-sm border-t border-gray-100 pt-6">
                                    <div className="flex items-center gap-2">
                                        <Building size={16} className="text-gray-400" />
                                        <div>
                                            <div className="text-gray-400 text-xs">발급기관</div>
                                            <div className="text-gray-700">{license.issuer}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-gray-400" />
                                        <div>
                                            <div className="text-gray-400 text-xs">유효기간</div>
                                            <div className="text-gray-700">{license.validUntil}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Capabilities */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm">
                            Technical Capabilities
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display mt-4">
                            기술 수행 역량
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {LICENSES_DATA.technicalCapabilities.map((cap) => (
                            <div
                                key={cap.category}
                                className="bg-white rounded-2xl p-6 shadow-md"
                            >
                                <h3 className="font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">
                                    {cap.category}
                                </h3>
                                <ul className="space-y-3">
                                    {cap.items.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-center gap-2 text-sm text-gray-600"
                                        >
                                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[#050b14]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-6">
                        프로젝트 문의
                    </h2>
                    <p className="text-white/60 text-lg mb-8">
                        공인된 면허와 전문 역량을 갖춘 마린리서치와 함께하세요
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg transition-shadow"
                    >
                        문의하기
                    </Link>
                </div>
            </section>
        </div>
    );
}
