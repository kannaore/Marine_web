import { setRequestLocale } from "next-intl/server";
import { CategoryLandingPage } from "@/components/sections";
import { NAV_CONTENT } from "@/lib/navData";

const pageData = NAV_CONTENT["SUSTAINABILITY"];

export default async function SustainabilityPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <CategoryLandingPage
            heroTitle={pageData.heroTitle}
            heroDesc={pageData.heroDesc}
            categories={pageData.categories}
            gridLayout={pageData.gridLayout}
        />
    );
}
