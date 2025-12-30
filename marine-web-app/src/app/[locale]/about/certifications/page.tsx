import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Award, Shield, CheckCircle2, FileCheck } from "lucide-react";

// 인증 현황 데이터
const CERTIFICATIONS_DATA = {
    heroImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=90",

    certifications: [
        {
            id: "iso9001",
            name: "ISO 9001:2015",
            fullName: "품질경영시스템",
            description: "국제 품질 관리 표준에 따른 체계적인 품질 보증 시스템 운영",
            issuer: "한국인정지원센터 (KAB)",
            validUntil: "2026.12.31",
            status: "active",
        },
        {
            id: "iso14001",
            name: "ISO 14001:2015",
            fullName: "환경경영시스템",
            description: "환경 영향 최소화를 위한 체계적인 환경 관리 시스템",
            issuer: "한국인정지원센터 (KAB)",
            validUntil: "2026.12.31",
            status: "active",
        },
        {
            id: "iso45001",
            name: "ISO 45001:2018",
            fullName: "안전보건경영시스템",
            description: "근로자 안전과 건강 보호를 위한 체계적인 안전 관리",
            issuer: "한국인정지원센터 (KAB)",
            validUntil: "2026.12.31",
            status: "active",
        },
    ],

    qualityCertificates: [
        {
            name: "기술혁신형 중소기업 (Inno-Biz)",
            issuer: "중소벤처기업부",
            year: "2022",
        },
        {
            name: "경영혁신형 중소기업 (Main-Biz)",
            issuer: "중소벤처기업부",
            year: "2021",
        },
        {
            name: "벤처기업 인증",
            issuer: "중소벤처기업부",
            year: "2020",
        },
        {
            name: "연구개발전담부서 인증",
            issuer: "한국산업기술진흥협회",
            year: "2019",
        },
    ],
};

export default async function CertificationsPage({
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
                    src={CERTIFICATIONS_DATA.heroImage}
                    alt="Certifications"
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
                        Certifications
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-4">
                        인증 및 자격 현황
                    </h1>
                    <p className="text-white/60 max-w-2xl text-lg">
                        국제 표준 인증을 통해 글로벌 수준의 품질과 안전을 보장합니다
                    </p>
                </div>
            </section>

            {/* ISO Certifications */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm">
                            International Standards
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display mt-4">
                            국제 표준 인증
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {CERTIFICATIONS_DATA.certifications.map((cert) => (
                            <div
                                key={cert.id}
                                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                    <Shield size={32} className="text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{cert.name}</h3>
                                <p className="text-cyan-600 font-medium mb-4">{cert.fullName}</p>
                                <p className="text-gray-500 text-sm mb-6">{cert.description}</p>

                                <div className="border-t border-gray-100 pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">발급기관</span>
                                        <span className="text-gray-700">{cert.issuer}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">유효기간</span>
                                        <span className="text-gray-700">{cert.validUntil}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">상태</span>
                                        <span className="inline-flex items-center gap-1 text-green-600">
                                            <CheckCircle2 size={14} />
                                            유효
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quality Certificates */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm">
                            Quality Certificates
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display mt-4">
                            기업 인증 현황
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {CERTIFICATIONS_DATA.qualityCertificates.map((cert) => (
                            <div
                                key={cert.name}
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                                        <Award size={20} className="text-cyan-600" />
                                    </div>
                                    <span className="text-sm text-gray-400">{cert.year}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{cert.name}</h3>
                                <p className="text-sm text-gray-500">{cert.issuer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quality Commitment */}
            <section className="py-20 bg-[#050b14]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-6">
                        품질 관리 체계
                    </h2>
                    <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto">
                        마린리서치는 체계적인 품질 관리 시스템을 통해 모든 프로젝트에서
                        일관된 품질을 보장합니다
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "품질 기획", desc: "프로젝트별 품질 목표 및 계획 수립" },
                            { step: "02", title: "품질 관리", desc: "단계별 검수 및 품질 점검 수행" },
                            { step: "03", title: "품질 보증", desc: "최종 성과물 검증 및 고객 만족도 확인" },
                        ].map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="text-5xl font-bold text-cyan-400 font-display mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-white/50 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
