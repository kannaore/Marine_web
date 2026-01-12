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
    const label = isKorean ? sectionLabel : sectionLabelEn || sectionLabel;
    const hasItems = Boolean(category.items?.length);

    return (
        <main className="bg-marine-dark min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden px-6 pt-32 pb-24">
                {/* Background */}
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${category.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050b14]/85 via-[#050b14]/70 to-[#050b14]" />
                </div>

                <div className="relative mx-auto max-w-5xl">
                    <Link
                        href={backHref}
                        className="mb-10 inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
                    >
                        <ArrowLeft size={18} />
                        <span>{isKorean ? `${label}(으)로 돌아가기` : `Back to ${label}`}</span>
                    </Link>

                    <div className="text-center">
                        <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase">
                            {label}
                        </span>
                        <h1 className="font-display mt-4 mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                            {title}
                        </h1>
                        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/60 md:text-xl">
                            {desc}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="px-6 pb-24">
                <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.2fr_1fr]">
                    {/* Overview */}
                    <div className="glass-panel rounded-2xl p-8">
                        <span className="text-ocean-400 text-xs font-semibold tracking-[0.2em] uppercase">
                            {isKorean ? "개요" : "Overview"}
                        </span>
                        <h2 className="font-display mt-4 mb-4 text-2xl font-bold text-white">
                            {isKorean ? "핵심 소개" : "Key Introduction"}
                        </h2>
                        <p className="leading-relaxed text-white/60">{desc}</p>

                        <div className="mt-8">
                            <Link
                                href="/contact/inquiry"
                                className="bg-ocean-500 hover:bg-ocean-400 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium text-white transition-colors"
                            >
                                {isKorean ? "문의하기" : "Contact Us"}
                                <ChevronRight size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Key Items */}
                    <div className="glass-panel rounded-2xl p-8">
                        <span className="text-ocean-400 text-xs font-semibold tracking-[0.2em] uppercase">
                            {isKorean ? "세부 항목" : "Key Items"}
                        </span>
                        <h3 className="font-display mt-4 mb-4 text-xl font-bold text-white">
                            {isKorean ? "서비스 범위" : "Service Scope"}
                        </h3>
                        {hasItems ? (
                            <ul className="space-y-3">
                                {category.items?.map((item) => (
                                    <li key={item.label}>
                                        {item.href ? (
                                            <Link
                                                href={item.href}
                                                className="flex items-center justify-between border-b border-white/5 py-2 text-white/70 transition-colors hover:text-white"
                                            >
                                                <span>
                                                    {isKorean
                                                        ? item.label
                                                        : item.labelEn || item.label}
                                                </span>
                                                <ChevronRight size={16} className="text-white/40" />
                                            </Link>
                                        ) : (
                                            <div className="flex items-center gap-3 border-b border-white/5 py-2">
                                                <div className="bg-ocean-400 h-2 w-2 rounded-full" />
                                                <span className="text-white/70">
                                                    {isKorean
                                                        ? item.label
                                                        : item.labelEn || item.label}
                                                </span>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="leading-relaxed text-white/60">
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
