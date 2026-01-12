import { setRequestLocale } from "next-intl/server";
import {
    AboutHero,
    GreetingSection,
    VisionSection,
    HistoryPreview,
    ClientsPreview,
    OrganizationPreview,
    CertificationsPreview,
} from "@/components/sections/about";
import { StatsShowcase } from "@/components/sections/StatsShowcase";
import { CTASection } from "@/components/sections/CTASection";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main className="bg-marine-dark min-h-screen">
            {/* Hero Section */}
            <AboutHero />

            {/* CEO Greeting */}
            <GreetingSection />

            {/* Stats Overview */}
            <StatsShowcase />

            {/* Vision & Philosophy */}
            <VisionSection />

            {/* History Preview */}
            <HistoryPreview />

            {/* Clients Preview */}
            <ClientsPreview />

            {/* Organization Preview */}
            <OrganizationPreview />

            {/* Certifications Preview */}
            <CertificationsPreview />

            {/* CTA */}
            <CTASection />
        </main>
    );
}
