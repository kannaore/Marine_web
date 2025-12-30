"use client";

import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import type { Category } from "@/lib/navData";

interface CategoryDetailPageProps {
    category: Category;
    sectionLabel: string;
    sectionLabelEn?: string;
    backHref: string;
}

export function CategoryDetailPage({
    category,
    sectionLabel,
    sectionLabelEn,
    backHref,
}: CategoryDetailPageProps) {
    const locale = useLocale();
    const isKorean = locale === "ko";

    const title = isKorean ? category.title : category.titleEn;
    const desc = isKorean ? category.desc : category.descEn;
    const label = isKorean ? sectionLabel : (sectionLabelEn || sectionLabel);
    const hasItems = Boolean(category.items?.length);

    return (
        <main className="min-h-screen bg-marine-dark">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-6 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${category.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050b14]/85 via-[#050b14]/70 to-[#050b14]" />
                </div>

                <div className="relative max-w-5xl mx-auto">
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-10"
                    >
                        <ArrowLeft size={18} />
                        <span>{isKorean ? `${label}(으)로 돌아가기` : `Back to ${label}`}</span>
                    </Link>

                    <div className="text-center">
                        <span className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em]">
                            {label}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mt-4 mb-6">
                            {title}
                        </h1>
                        <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
                            {desc}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="px-6 pb-24">
                <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                    {/* Overview */}
                    <div className="glass-panel rounded-2xl p-8">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                            {isKorean ? "개요" : "Overview"}
                        </span>
                        <h2 className="text-2xl font-bold text-white font-display mt-4 mb-4">
                            {isKorean ? "핵심 소개" : "Key Introduction"}
                        </h2>
                        <p className="text-white/60 leading-relaxed">
                            {desc}
                        </p>

                        <div className="mt-8">
                            <Link
                                href="/contact/inquiry"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-ocean-500 hover:bg-ocean-400 text-white font-medium rounded-xl transition-colors"
                            >
                                {isKorean ? "문의하기" : "Contact Us"}
                                <ChevronRight size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Key Items */}
                    <div className="glass-panel rounded-2xl p-8">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ocean-400">
                            {isKorean ? "세부 항목" : "Key Items"}
                        </span>
                        <h3 className="text-xl font-bold text-white font-display mt-4 mb-4">
                            {isKorean ? "서비스 범위" : "Service Scope"}
                        </h3>
                        {hasItems ? (
                            <ul className="space-y-3">
                                {category.items?.map((item) => (
                                    <li key={item.label}>
                                        {item.href ? (
                                            <Link
                                                href={item.href}
                                                className="flex items-center justify-between text-white/70 hover:text-white transition-colors py-2 border-b border-white/5"
                                            >
                                                <span>{isKorean ? item.label : (item.labelEn || item.label)}</span>
                                                <ChevronRight size={16} className="text-white/40" />
                                            </Link>
                                        ) : (
                                            <div className="flex items-center gap-3 py-2 border-b border-white/5">
                                                <div className="w-2 h-2 rounded-full bg-ocean-400" />
                                                <span className="text-white/70">
                                                    {isKorean ? item.label : (item.labelEn || item.label)}
                                                </span>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-white/60 leading-relaxed">
                                {isKorean
                                    ? "상세 콘텐츠는 준비 중입니다. 문의를 통해 자세한 정보를 확인하세요."
                                    : "Detailed content is being prepared. Contact us for more information."}
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
