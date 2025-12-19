import { setRequestLocale } from "next-intl/server";
import { CategoryLandingPage } from "@/components/sections";
import { NAV_CONTENT } from "@/lib/navData";

const pageData = NAV_CONTENT["CONTACTS"];

export default async function ContactPage({
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
