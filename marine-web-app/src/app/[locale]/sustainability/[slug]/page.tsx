import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CategoryDetailPage } from "@/components/sections/CategoryDetailPage";
import { NAV_CONTENT, findCategoryBySlug } from "@/lib/navData";

const SECTION = "SUSTAINABILITY" as const;

export default async function SustainabilityDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const category = findCategoryBySlug(SECTION, slug);
    if (!category) {
        notFound();
    }

    return (
        <CategoryDetailPage
            category={category}
            sectionLabel={NAV_CONTENT[SECTION].sectionLabel}
            sectionLabelEn={NAV_CONTENT[SECTION].sectionLabelEn}
            backHref={NAV_CONTENT[SECTION].href}
        />
    );
}
