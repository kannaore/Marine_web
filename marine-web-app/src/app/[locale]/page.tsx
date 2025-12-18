import { setRequestLocale } from "next-intl/server";
import {
    HeroSection,
    ServicesSection,
    CaseStudiesSection,
    AboutSection,
    NewsSection,
    CTASection,
} from "@/components/sections";

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <HeroSection />
            <ServicesSection />
            <CaseStudiesSection />
            <AboutSection />
            <NewsSection />
            <CTASection />
        </>
    );
}
