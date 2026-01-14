import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { BusinessServicesPage } from "@/components/sections/business";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    const titles: Record<string, string> = {
        ko: "사업영역 | 마린리서치",
        en: "Services | Marine Research",
    };

    const descriptions: Record<string, string> = {
        ko: "해상풍력, 지구물리탐사, 지반조사, 환경영향조사, 해저케이블 조사 등 종합 해양조사 서비스",
        en: "Comprehensive marine survey services including offshore wind, geophysical, geotechnical, environmental, and cable route surveys",
    };

    return {
        title: titles[locale] || titles.ko,
        description: descriptions[locale] || descriptions.ko,
    };
}

export default async function ServicesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <BusinessServicesPage />;
}
