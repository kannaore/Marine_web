import { setRequestLocale } from "next-intl/server";
import { AboutPagePremium } from "@/components/sections";
import { Ship, Users, Award, Globe } from "lucide-react";

// 프리미엄 About 페이지 데이터 - 더 풍성한 콘텐츠
const ABOUT_PAGE_DATA = {
    heroImage: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1920&q=90",
    heroSubtitle: "2004년 설립 이래 대한민국 해양조사 산업의 새로운 기준을 만들어가고 있습니다. 최첨단 기술과 20년의 노하우로 바다의 무한한 가능성을 열어갑니다.",

    stats: [
        { value: 2400, suffix: "억+", label: "누적 프로젝트 규모", icon: <Ship size={28} /> },
        { value: 500, suffix: "+", label: "완료 프로젝트", icon: <Award size={28} /> },
        { value: 50, suffix: "+", label: "전문 기술 인력", icon: <Users size={28} /> },
        { value: 15, suffix: "+", label: "진출 국가", icon: <Globe size={28} /> },
    ],

    ceoMessage: {
        quote: "바다는 인류의 마지막 미개척지입니다. 마린리서치는 20년간 축적된 기술력과 전문성을 바탕으로, 안전하고 지속 가능한 해양의 미래를 개척해 나가고 있습니다. 해상풍력, 해저케이블, 항만개발 등 대한민국의 핵심 해양 인프라 구축에 함께하며, 글로벌 해양 산업을 선도하는 기업으로 성장하겠습니다.",
        name: "홍길동",
        title: "마린리서치 대표이사",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
    },

    competencies: [
        {
            id: "equipment",
            icon: "🛳️",
            title: "최첨단 조사 장비",
            description: "멀티빔 음향측심기, 사이드스캔 소나, 천부지층탐사기 등 세계 최고 수준의 첨단 해양조사 장비를 보유하고 있습니다.",
            image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80",
        },
        {
            id: "experts",
            icon: "👨‍🔬",
            title: "전문 기술 인력",
            description: "해양학, 지질학, 측량학 분야의 석·박사급 전문 인력 50명 이상이 각 프로젝트에 참여합니다.",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
        },
        {
            id: "certification",
            icon: "🏆",
            title: "국제 인증 획득",
            description: "ISO 9001, ISO 14001, OHSAS 18001 등 국제 표준 인증을 통해 품질과 안전을 보장합니다.",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        },
        {
            id: "data",
            icon: "📊",
            title: "AI 기반 데이터 분석",
            description: "자체 개발 분석 소프트웨어와 인공지능 기반 해석 시스템으로 정확하고 빠른 결과물을 제공합니다.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        },
        {
            id: "network",
            icon: "🌏",
            title: "글로벌 파트너 네트워크",
            description: "아시아 태평양 지역 15개국 이상의 파트너사와 협력하여 대규모 해외 프로젝트를 성공적으로 수행합니다.",
            image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80",
        },
        {
            id: "safety",
            icon: "🛡️",
            title: "무재해 안전 관리",
            description: "창사 이래 무재해 기록을 유지하며, 체계적인 안전 관리 시스템과 교육 프로그램을 운영합니다.",
            image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
        },
    ],

    news: [
        {
            id: "news-1",
            date: "2024.12.15",
            title: "마린리서치, 서남해 해상풍력단지 해저지반조사 대규모 수주",
            category: "수주소식",
            thumbnail: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=400&q=80",
        },
        {
            id: "news-2",
            date: "2024.11.28",
            title: "2024 해양조사 기술세미나 성황리 개최... 업계 전문가 300명 참석",
            category: "행사",
            thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
        },
        {
            id: "news-3",
            date: "2024.11.10",
            title: "마린리서치, ESG 경영 우수기업 선정... 지속가능경영 박차",
            category: "기업소식",
            thumbnail: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?w=400&q=80",
        },
        {
            id: "news-4",
            date: "2024.10.25",
            title: "신규 조사선 '마린익스플로러 3호' 명명식 및 진수식 성황리 개최",
            category: "기업소식",
            thumbnail: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=400&q=80",
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
        <AboutPagePremium
            heroImage={ABOUT_PAGE_DATA.heroImage}
            heroSubtitle={ABOUT_PAGE_DATA.heroSubtitle}
            stats={ABOUT_PAGE_DATA.stats}
            ceoMessage={ABOUT_PAGE_DATA.ceoMessage}
            competencies={ABOUT_PAGE_DATA.competencies}
            news={ABOUT_PAGE_DATA.news}
        />
    );
}
