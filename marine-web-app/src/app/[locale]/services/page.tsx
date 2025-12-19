import { setRequestLocale } from "next-intl/server";
import { AboutPageSpacex } from "@/components/sections";

// SpaceX 스타일 Services 페이지 데이터 - 임팩트 있는 풀스크린 이미지
const SERVICES_PAGE_DATA = {
    heroImage: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1920&q=80", // Offshore wind
    heroTitle: "The Future of Marine Survey",
    heroSubtitle: "Pioneering advanced survey technologies for offshore energy, infrastructure, and environmental projects across the Asia-Pacific region.",

    stats: [
        { value: "500+", label: "Projects Delivered" },
        { value: "15+", label: "Countries Served" },
        { value: "99.9%", label: "Data Accuracy" },
        { value: "24/7", label: "Support Available" },
    ],

    features: [
        {
            id: "offshore-wind",
            label: "Offshore Wind",
            title: "Powering the Renewable Energy Revolution",
            description: "Comprehensive site characterization services for offshore wind farm development. From preliminary surveys to construction support, we provide the critical data needed for successful project execution.",
            image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1920&q=80",
            href: "/services/offshore-wind",
            imagePosition: "full" as const,
        },
        {
            id: "geophysical",
            label: "Geophysical Survey",
            title: "Mapping the Seabed with Precision",
            description: "State-of-the-art multibeam bathymetry, side-scan sonar, and sub-bottom profiling. Our high-resolution data acquisition ensures complete understanding of seabed conditions.",
            image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1200&q=80",
            href: "/services/geophysical",
            imagePosition: "right" as const,
        },
        {
            id: "geotechnical",
            label: "Geotechnical Investigation",
            title: "Understanding Subsurface Conditions",
            description: "Deep seabed sampling, CPT testing, and soil analysis for foundation design. Our integrated approach combines geophysical and geotechnical data for reliable results.",
            image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=1200&q=80",
            href: "/services/geotechnical",
            imagePosition: "left" as const,
        },
        {
            id: "environmental",
            label: "Environmental Monitoring",
            title: "Protecting Marine Ecosystems",
            description: "Comprehensive environmental baseline studies, impact assessments, and long-term monitoring programs. We help clients meet regulatory requirements while protecting ocean environments.",
            image: "https://images.unsplash.com/photo-1583212235753-9c5272806aa3?w=1920&q=80",
            href: "/services/environmental",
            imagePosition: "full" as const,
        },
    ],
};

export default async function ServicesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <AboutPageSpacex
            heroImage={SERVICES_PAGE_DATA.heroImage}
            heroTitle={SERVICES_PAGE_DATA.heroTitle}
            heroSubtitle={SERVICES_PAGE_DATA.heroSubtitle}
            stats={SERVICES_PAGE_DATA.stats}
            features={SERVICES_PAGE_DATA.features}
        />
    );
}
