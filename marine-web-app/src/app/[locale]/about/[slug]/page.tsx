import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CategoryDetailPage } from "@/components/sections/CategoryDetailPage";
import { NAV_CONTENT, findCategoryBySlug } from "@/lib/navData";

const SECTION = "ABOUT US" as const;

export default async function AboutDetailPage({
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
            backHref={NAV_CONTENT[SECTION].href}
        />
    );
}
