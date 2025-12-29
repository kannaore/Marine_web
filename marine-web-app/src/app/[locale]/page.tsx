import { setRequestLocale } from "next-intl/server";
import {
    HeroSection,
    TrustBar,
    StatsShowcase,
    CapabilitiesSection,
    FleetSection,
    CertificationsGallery,
    CaseStudiesSection,
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
            <StatsShowcase />
            <CapabilitiesSection />
            <FleetSection />
            <CertificationsGallery />
            <CaseStudiesSection />
            <TrustBar />
            <CTASection />
        </>
    );
}


