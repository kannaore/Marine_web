import { setRequestLocale } from "next-intl/server";
import { AboutPageLocomotiveStyle } from "@/components/sections";

// Locomotive 스타일 About 페이지 데이터
const ABOUT_PAGE_DATA = {
    heroTitle: "해양의 미래를 개척합니다",
    heroSubtitle: "2004년 설립 이래 대한민국 해양조사 산업의 새로운 기준을 만들어가고 있습니다. 최첨단 기술과 20년의 노하우로 바다의 무한한 가능성을 열어갑니다.",

    stats: [
        { value: "2,400억+", label: "누적 프로젝트 규모" },
        { value: "500+", label: "완료 프로젝트" },
        { value: "50+", label: "전문 기술 인력" },
        { value: "15+", label: "진출 국가" },
    ],

    marqueeText: "Marine Research • 해양조사 전문기업 • Since 2004",

    works: [
        {
            id: "organization",
            title: "Organization & Team",
            category: "조직 및 인력 현황",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
            href: "/about/organization",
        },
        {
            id: "certifications",
            title: "Certifications",
            category: "국제 표준 인증 현황",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
            href: "/about/certifications",
        },
        {
            id: "licenses",
            title: "Licenses",
            category: "보유 면허 현황",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80",
            href: "/about/licenses",
        },
        {
            id: "history",
            title: "Our History",
            category: "20년의 도전과 성장",
            image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1200&q=80",
            href: "/about#history",
        },
    ],
};

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <AboutPageLocomotiveStyle
            heroTitle={ABOUT_PAGE_DATA.heroTitle}
            heroSubtitle={ABOUT_PAGE_DATA.heroSubtitle}
            stats={ABOUT_PAGE_DATA.stats}
            works={ABOUT_PAGE_DATA.works}
            marqueeText={ABOUT_PAGE_DATA.marqueeText}
        />
    );
}
