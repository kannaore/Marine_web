import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { StatsShowcase } from "@/components/sections/StatsShowcase";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { FleetSection } from "@/components/sections/FleetSection";
import { CertificationsGallery } from "@/components/sections/CertificationsGallery";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CTASection } from "@/components/sections/CTASection";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
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
