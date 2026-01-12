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

                <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                    <Link
                        href="/about"
                        className="absolute top-8 left-8 flex items-center gap-2 text-white/70 transition-colors hover:text-white"
                    >
                        <ArrowLeft size={20} />
                        <span>About Us</span>
                    </Link>

                    <span className="mb-4 text-sm font-semibold tracking-wider text-cyan-400 uppercase">
                        Certifications
                    </span>
                    <h1 className="font-display mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        인증 및 자격 현황
                    </h1>
                    <p className="max-w-2xl text-lg text-white/60">
                        국제 표준 인증을 통해 글로벌 수준의 품질과 안전을 보장합니다
                    </p>
                </div>
            </section>

            {/* ISO Certifications */}
            <section className="py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="mb-16 text-center">
                        <span className="text-sm font-semibold tracking-wider text-cyan-600 uppercase">
                            International Standards
                        </span>
                        <h2 className="font-display mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
                            국제 표준 인증
                        </h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {CERTIFICATIONS_DATA.certifications.map((cert) => (
                            <div
                                key={cert.id}
                                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600">
                                    <Shield size={32} className="text-white" />
                                </div>

                                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                                    {cert.name}
                                </h3>
                                <p className="mb-4 font-medium text-cyan-600">{cert.fullName}</p>
                                <p className="mb-6 text-sm text-gray-500">{cert.description}</p>

                                <div className="space-y-2 border-t border-gray-100 pt-4">
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
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="mb-16 text-center">
                        <span className="text-sm font-semibold tracking-wider text-cyan-600 uppercase">
                            Quality Certificates
                        </span>
                        <h2 className="font-display mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
                            기업 인증 현황
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {CERTIFICATIONS_DATA.qualityCertificates.map((cert) => (
                            <div
                                key={cert.name}
                                className="rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
                            >
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100">
                                        <Award size={20} className="text-cyan-600" />
                                    </div>
                                    <span className="text-sm text-gray-400">{cert.year}</span>
                                </div>
                                <h3 className="mb-2 font-bold text-gray-900">{cert.name}</h3>
                                <p className="text-sm text-gray-500">{cert.issuer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quality Commitment */}
            <section className="bg-[#050b14] py-20">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h2 className="font-display mb-6 text-3xl font-bold text-white md:text-4xl">
                        품질 관리 체계
                    </h2>
                    <p className="mx-auto mb-12 max-w-2xl text-lg text-white/60">
                        마린리서치는 체계적인 품질 관리 시스템을 통해 모든 프로젝트에서 일관된
                        품질을 보장합니다
                    </p>

                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                step: "01",
                                title: "품질 기획",
                                desc: "프로젝트별 품질 목표 및 계획 수립",
                            },
                            {
                                step: "02",
                                title: "품질 관리",
                                desc: "단계별 검수 및 품질 점검 수행",
                            },
                            {
                                step: "03",
                                title: "품질 보증",
                                desc: "최종 성과물 검증 및 고객 만족도 확인",
                            },
                        ].map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="font-display mb-4 text-5xl font-bold text-cyan-400">
                                    {item.step}
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
                                <p className="text-sm text-white/50">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
