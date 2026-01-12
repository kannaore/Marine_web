import { setRequestLocale } from "next-intl/server";
import { ServicesHero, ServicesGrid } from "@/components/sections/services";
import { CTASection } from "@/components/sections/CTASection";

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main className="bg-marine-dark min-h-screen">
            {/* Hero Section */}
            <ServicesHero />

            {/* Services Grid */}
            <ServicesGrid />

            {/* CTA */}
            <CTASection />
        </main>
    );
}
