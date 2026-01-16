import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Users, Building2, Award, Briefcase } from "lucide-react";

// 조직도 데이터
const ORGANIZATION_DATA = {
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=90",

    departments: [
        {
            id: "management",
            name: "경영지원본부",
            head: "김경영",
            headTitle: "본부장",
            description: "회사 운영 전반 및 전략 기획 담당",
            teams: ["경영기획팀", "인사총무팀", "재무회계팀"],
            icon: <Building2 size={24} />,
        },
        {
            id: "technical",
            name: "기술연구본부",
            head: "이기술",
            headTitle: "본부장 (공학박사)",
            description: "해양조사 기술 개발 및 연구",
            teams: ["기술개발팀", "데이터분석팀", "R&D센터"],
            icon: <Award size={24} />,
        },
        {
            id: "survey",
            name: "조사사업본부",
            head: "박조사",
            headTitle: "본부장",
            description: "현장 조사 운영 및 프로젝트 관리",
            teams: ["해양물리팀", "해양지질팀", "측량팀", "안전관리팀"],
            icon: <Briefcase size={24} />,
        },
    ],

    stats: [
        { label: "총 임직원", value: "50+", suffix: "명" },
        { label: "석·박사급 인력", value: "30+", suffix: "명" },
        { label: "평균 경력", value: "12", suffix: "년" },
        { label: "기술자격 보유자", value: "40+", suffix: "명" },
    ],
};

export default async function OrganizationPage({
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
                    src={ORGANIZATION_DATA.heroImage}
                    alt="Organization"
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
                        Organization & Team
                    </span>
                    <h1 className="font-display mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        조직 및 인력 현황
                    </h1>
                    <p className="max-w-2xl text-lg text-white/60">
                        각 분야 전문가들이 협업하여 최고 수준의 해양조사 서비스를 제공합니다
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {ORGANIZATION_DATA.stats.map((stat, index) => (
                            <div key={stat.label} className="text-center">
                                <div className="font-display text-4xl font-bold text-cyan-600 md:text-5xl">
                                    {stat.value}
                                    <span className="text-2xl">{stat.suffix}</span>
                                </div>
                                <div className="mt-2 text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Organization Chart */}
            <section className="py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="mb-16 text-center">
                        <span className="text-sm font-semibold tracking-wider text-cyan-600 uppercase">
                            Organization Chart
                        </span>
                        <h2 className="font-display mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
                            조직 구조
                        </h2>
                    </div>

                    {/* CEO */}
                    <div className="mb-12 flex justify-center">
                        <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-6 text-center text-white shadow-xl">
                            <div className="mb-1 text-sm text-white/80">대표이사</div>
                            <div className="text-xl font-bold">홍길동</div>
                        </div>
                    </div>

                    {/* Connecting Line */}
                    <div className="mb-8 flex justify-center">
                        <div className="h-12 w-px bg-gray-300" />
                    </div>

                    {/* Horizontal Line */}
                    <div className="mx-auto mb-8 hidden max-w-4xl md:block">
                        <div className="h-px bg-gray-300" />
                    </div>

                    {/* Departments */}
                    <div className="grid gap-8 md:grid-cols-3">
                        {ORGANIZATION_DATA.departments.map((dept, index) => (
                            <div
                                key={dept.id}
                                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
                            >
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                                        {dept.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{dept.name}</h3>
                                        <p className="text-sm text-gray-500">{dept.description}</p>
                                    </div>
                                </div>

                                <div className="mb-4 border-t border-gray-100 pt-4">
                                    <div className="mb-1 text-sm text-gray-400">본부장</div>
                                    <div className="font-medium text-gray-900">{dept.head}</div>
                                    <div className="text-xs text-cyan-600">{dept.headTitle}</div>
                                </div>

                                <div className="space-y-2">
                                    {dept.teams.map((team) => (
                                        <div
                                            key={team}
                                            className="flex items-center gap-2 text-sm text-gray-600"
                                        >
                                            <div className="h-2 w-2 rounded-full bg-cyan-400" />
                                            {team}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Expertise */}
            <section className="bg-[#050b14] py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="mb-16 text-center">
                        <span className="text-sm font-semibold tracking-wider text-cyan-400 uppercase">
                            Our Expertise
                        </span>
                        <h2 className="font-display mt-4 text-3xl font-bold text-white md:text-4xl">
                            전문 분야
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { title: "해양물리탐사", desc: "멀티빔, 사이드스캔, SBP" },
                            { title: "해양지질조사", desc: "시추, CPT, 코어링" },
                            { title: "해양측량", desc: "수심측량, 위치측위" },
                            { title: "데이터분석", desc: "AI 기반 해석" },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-colors hover:bg-white/10"
                            >
                                <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
                                <p className="text-sm text-white/60">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                        함께 성장할 인재를 찾습니다
                    </h2>
                    <p className="mb-8 text-gray-500">
                        마린리서치와 함께 해양조사 전문가로 성장하세요
                    </p>
                    <Link
                        href="/careers"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white transition-shadow hover:shadow-lg"
                    >
                        채용 정보 보기
                    </Link>
                </div>
            </section>
        </div>
    );
}
