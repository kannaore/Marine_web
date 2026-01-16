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

export default async function LicensesPage({ params }: { params: Promise<{ locale: string }> }) {
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

                <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                    <Link
                        href="/about"
                        className="absolute top-8 left-8 flex items-center gap-2 text-white/70 transition-colors hover:text-white"
                    >
                        <ArrowLeft size={20} />
                        <span>About Us</span>
                    </Link>

                    <span className="mb-4 text-sm font-semibold tracking-wider text-cyan-400 uppercase">
                        Licenses
                    </span>
                    <h1 className="font-display mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        보유 면허 현황
                    </h1>
                    <p className="max-w-2xl text-lg text-white/60">
                        국가 공인 면허를 통해 전문적이고 신뢰할 수 있는 서비스를 제공합니다
                    </p>
                </div>
            </section>

            {/* Licenses List */}
            <section className="py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="mb-16 text-center">
                        <span className="text-sm font-semibold tracking-wider text-cyan-600 uppercase">
                            Official Licenses
                        </span>
                        <h2 className="font-display mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
                            공식 면허
                        </h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {LICENSES_DATA.licenses.map((license) => (
                            <div
                                key={license.id}
                                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-xl"
                            >
                                <div className="mb-6 flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
                                            <FileText size={28} className="text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {license.name}
                                            </h3>
                                            <p className="text-sm text-gray-400">
                                                {license.registrationNo}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                        <CheckCircle2 size={14} />
                                        유효
                                    </span>
                                </div>

                                <p className="mb-6 text-sm leading-relaxed text-gray-600">
                                    <span className="font-medium text-gray-900">수행 범위: </span>
                                    {license.scope}
                                </p>

                                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Building size={16} className="text-gray-400" />
                                        <div>
                                            <div className="text-xs text-gray-400">발급기관</div>
                                            <div className="text-gray-700">{license.issuer}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-gray-400" />
                                        <div>
                                            <div className="text-xs text-gray-400">유효기간</div>
                                            <div className="text-gray-700">
                                                {license.validUntil}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Capabilities */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="mb-16 text-center">
                        <span className="text-sm font-semibold tracking-wider text-cyan-600 uppercase">
                            Technical Capabilities
                        </span>
                        <h2 className="font-display mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
                            기술 수행 역량
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {LICENSES_DATA.technicalCapabilities.map((cap) => (
                            <div key={cap.category} className="rounded-2xl bg-white p-6 shadow-md">
                                <h3 className="mb-4 border-b border-gray-100 pb-4 font-bold text-gray-900">
                                    {cap.category}
                                </h3>
                                <ul className="space-y-3">
                                    {cap.items.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-center gap-2 text-sm text-gray-600"
                                        >
                                            <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
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
            <section className="bg-[#050b14] py-20">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h2 className="font-display mb-6 text-3xl font-bold text-white md:text-4xl">
                        프로젝트 문의
                    </h2>
                    <p className="mb-8 text-lg text-white/60">
                        공인된 면허와 전문 역량을 갖춘 마린리서치와 함께하세요
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white transition-shadow hover:shadow-lg"
                    >
                        문의하기
                    </Link>
                </div>
            </section>
        </div>
    );
}
