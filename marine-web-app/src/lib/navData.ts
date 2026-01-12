export type CategoryItem = {
    label: string;
    labelEn?: string;
    href?: string;
};

export type Category = {
    id: string;
    label: string;
    labelEn: string;
    title: string;
    titleEn: string;
    desc: string;
    descEn: string;
    href: string;
    image: string;
    detail?: string;
    items?: CategoryItem[];
};

export type NavSection = {
    href: string;
    sectionLabel: string;
    sectionLabelEn: string;
    heroTitle: string;
    heroTitleEn: string;
    heroDesc: string;
    heroDescEn: string;
    gridLayout: 1 | 2 | 3;
    categories: Category[];
};

export const NAV_CONTENT: Record<string, NavSection> = {
    "ABOUT US": {
        href: "/about",
        sectionLabel: "회사 소개",
        sectionLabelEn: "About Us",
        heroTitle: "회사 소개",
        heroTitleEn: "About Us",
        heroDesc:
            "정밀 해양조사와 해양기술로 미래를 설계하는 Marine Research의 철학과 역사를 소개합니다.",
        heroDescEn:
            "Discover the philosophy and history of Marine Research, shaping the future through precision marine surveys and ocean technology.",
        gridLayout: 3,
        categories: [
            {
                id: "certifications",
                label: "인증 및 자격",
                labelEn: "Certifications & Licenses",
                title: "인증 및 자격",
                titleEn: "Certifications & Licenses",
                desc: "면허, 인증, 특허 등 품질과 신뢰를 증명하는 자격 현황입니다.",
                descEn: "Our licenses, certifications, and patents that demonstrate quality and trust.",
                href: "/about/certifications",
                image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&q=90",
                items: [
                    { label: "면허", labelEn: "Licenses" },
                    { label: "인증", labelEn: "Certifications" },
                    { label: "특허", labelEn: "Patents" },
                ],
            },
            {
                id: "organization",
                label: "조직",
                labelEn: "Organization",
                title: "조직 및 인재",
                titleEn: "Organization & Talent",
                desc: "현장 전문성과 연구 역량을 갖춘 조직 체계를 소개합니다.",
                descEn: "Our organizational structure with field expertise and research capabilities.",
                href: "/about/organization",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=90",
                items: [
                    { label: "조직도", labelEn: "Organizational Chart" },
                    { label: "인원", labelEn: "Staff" },
                    { label: "채용 연결", labelEn: "Join Our Team" },
                ],
            },
            {
                id: "performance",
                label: "실적",
                labelEn: "Track Record",
                title: "프로젝트 실적",
                titleEn: "Project Track Record",
                desc: "전체 프로젝트 이름, 발주처, 날짜를 포함한 실적 현황입니다.",
                descEn: "Complete record of projects including names, clients, and dates.",
                href: "/about/performance",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=90",
            },
            {
                id: "history",
                label: "연혁",
                labelEn: "History",
                title: "회사 연혁",
                titleEn: "Company History",
                desc: "해양조사 기술의 진화와 함께한 Marine Research의 발자취입니다.",
                descEn: "The milestones of Marine Research alongside the evolution of marine survey technology.",
                href: "/about/history",
                image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=90",
            },
            {
                id: "clients",
                label: "고객사",
                labelEn: "Clients",
                title: "주요 고객사",
                titleEn: "Our Clients",
                desc: "Marine Research와 함께한 파트너와 프로젝트를 소개합니다.",
                descEn: "Partners and projects we've collaborated with.",
                href: "/about/clients",
                image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=90",
            },
        ],
    },
    "EXPLORE SERVICES": {
        href: "/services",
        sectionLabel: "서비스",
        sectionLabelEn: "Explore Services",
        heroTitle: "사업분야",
        heroTitleEn: "Our Services",
        heroDesc: "수로조사부터 해양에너지까지, 해양 데이터와 기술을 통합적으로 제공합니다.",
        heroDescEn:
            "From hydrographic surveys to marine energy, we provide integrated marine data and technology solutions.",
        gridLayout: 3,
        categories: [
            {
                id: "offshore-wind",
                label: "해상풍력",
                labelEn: "Offshore Wind",
                title: "해상풍력",
                titleEn: "Offshore Wind",
                desc: "해상풍력발전단지 건설을 위한 종합적인 해양조사 서비스를 제공합니다.",
                descEn: "Comprehensive marine survey services for offshore wind farm construction.",
                href: "/services/offshore-wind",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=90",
            },
            {
                id: "geophysical",
                label: "지구물리조사",
                labelEn: "Geophysical Survey",
                title: "지구물리조사",
                titleEn: "Geophysical Survey",
                desc: "최첨단 멀티빔 음향측심기, 사이드스캔소나, 서브바텀프로파일러를 활용합니다.",
                descEn: "Utilizing state-of-the-art multibeam echosounders, side-scan sonar, and sub-bottom profilers.",
                href: "/services/geophysical",
                image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1400&q=90",
            },
            {
                id: "hydrographic",
                label: "수로조사",
                labelEn: "Hydrographic Survey",
                title: "수로조사",
                titleEn: "Hydrographic Survey",
                desc: "정밀 수심 측량과 해도 제작을 위한 통합 수로조사 서비스입니다.",
                descEn: "Integrated hydrographic survey services for precision bathymetry and chart production.",
                href: "/services/hydrographic",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=90",
                items: [
                    { label: "수로측량", labelEn: "Hydrographic Surveying" },
                    { label: "해도제작", labelEn: "Chart Production" },
                    { label: "해양정보서비스", labelEn: "Marine Information Services" },
                    { label: "해양관측", labelEn: "Ocean Observation" },
                ],
            },
            {
                id: "marine-physics",
                label: "해양물리조사",
                labelEn: "Physical Oceanography",
                title: "해양물리조사",
                titleEn: "Physical Oceanography",
                desc: "물리환경 데이터를 기반으로 해양 프로젝트의 리스크를 줄입니다.",
                descEn: "Reducing project risks through physical oceanographic data analysis.",
                href: "/services/marine-physics",
                image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1400&q=90",
            },
            {
                id: "fishery",
                label: "수산자원조사",
                labelEn: "Fisheries Resources Survey",
                title: "수산자원조사",
                titleEn: "Fisheries Resources Survey",
                desc: "어장 환경과 자원 평가를 통해 지속 가능한 관리 기반을 제공합니다.",
                descEn: "Providing sustainable management foundations through fisheries environment and resource assessment.",
                href: "/services/fishery",
                image: "https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=1400&q=90",
            },
            {
                id: "rnd",
                label: "R&D",
                labelEn: "R&D",
                title: "연구개발",
                titleEn: "Research & Development",
                desc: "해양조사 기술 혁신을 위한 연구개발 활동입니다.",
                descEn: "Research and development activities for marine survey technology innovation.",
                href: "/services/rnd",
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=90",
            },
        ],
    },
    ASSETS: {
        href: "/assets",
        sectionLabel: "장비",
        sectionLabelEn: "Assets",
        heroTitle: "보유자산",
        heroTitleEn: "Our Assets",
        heroDesc: "정밀 해양조사를 위한 선박과 장비 자산을 소개합니다.",
        heroDescEn: "Our fleet and equipment assets for precision marine surveys.",
        gridLayout: 2,
        categories: [
            {
                id: "vessels",
                label: "선박",
                labelEn: "Vessels",
                title: "보유선박",
                titleEn: "Our Vessels",
                desc: "대형 조사선부터 지원선까지 다양한 선박 라인업을 보유합니다.",
                descEn: "A diverse fleet of vessels from large research ships to support vessels.",
                href: "/assets/vessels",
                image: "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?w=1400&q=90",
            },
            {
                id: "equipment",
                label: "장비",
                labelEn: "Equipment",
                title: "보유장비",
                titleEn: "Our Equipment",
                desc: "다종 센서와 관측 장비로 해양 데이터를 정밀하게 수집합니다.",
                descEn: "Precision marine data collection with various sensors and observation equipment.",
                href: "/assets/equipment",
                image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1400&q=90",
            },
        ],
    },
    SUSTAINABILITY: {
        href: "/sustainability",
        sectionLabel: "ESG",
        sectionLabelEn: "Sustainability",
        heroTitle: "ESG 경영",
        heroTitleEn: "Sustainability",
        heroDesc: "환경과 안전, 윤리를 기반으로 지속 가능한 해양조사를 실천합니다.",
        heroDescEn:
            "Practicing sustainable marine surveys based on environment, safety, and ethics.",
        gridLayout: 2,
        categories: [
            {
                id: "safety",
                label: "안전보건경영",
                labelEn: "Health & Safety",
                title: "안전보건경영",
                titleEn: "Health & Safety Management",
                desc: "현장 안전과 건강을 최우선으로 관리합니다.",
                descEn: "Prioritizing on-site safety and health management.",
                href: "/sustainability/safety",
                image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1400&q=90",
            },
            {
                id: "environment",
                label: "환경경영",
                labelEn: "Environmental",
                title: "환경경영",
                titleEn: "Environmental Management",
                desc: "해양 환경 보전을 위한 친환경 운영 원칙입니다.",
                descEn: "Eco-friendly operational principles for marine environment conservation.",
                href: "/sustainability/environment",
                image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=90",
            },
            {
                id: "social",
                label: "인권경영",
                labelEn: "Social",
                title: "인권경영",
                titleEn: "Social Responsibility",
                desc: "존중과 배려를 바탕으로 인권경영을 실천합니다.",
                descEn: "Practicing social responsibility based on respect and consideration.",
                href: "/sustainability/social",
                image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=90",
            },
            {
                id: "governance",
                label: "윤리경영",
                labelEn: "Governance",
                title: "윤리경영",
                titleEn: "Corporate Governance",
                desc: "투명한 경영과 공정한 윤리 기준을 준수합니다.",
                descEn: "Adhering to transparent management and fair ethical standards.",
                href: "/sustainability/governance",
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=90",
            },
        ],
    },
    CAREERS: {
        href: "/careers",
        sectionLabel: "채용",
        sectionLabelEn: "Careers",
        heroTitle: "채용",
        heroTitleEn: "Careers",
        heroDesc: "Marine Research와 함께할 인재를 기다립니다.",
        heroDescEn: "We're looking for talented individuals to join Marine Research.",
        gridLayout: 1,
        categories: [
            {
                id: "jobs",
                label: "채용 공고",
                labelEn: "Careers",
                title: "채용 공고",
                titleEn: "Job Openings",
                desc: "현재 진행 중인 채용 포지션과 지원 절차를 확인하세요.",
                descEn: "View current job openings and application procedures.",
                href: "/careers/jobs",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=90",
            },
        ],
    },
    CONTACT: {
        href: "/contact",
        sectionLabel: "고객지원",
        sectionLabelEn: "Contact",
        heroTitle: "고객지원",
        heroTitleEn: "Contact Us",
        heroDesc: "문의사항이나 협력 제안을 기다립니다.",
        heroDescEn: "We welcome your inquiries and partnership proposals.",
        gridLayout: 2,
        categories: [
            {
                id: "inquiry",
                label: "문의하기",
                labelEn: "Contact Us",
                title: "문의하기",
                titleEn: "Contact Us",
                desc: "프로젝트 문의 및 협력 제안을 남겨주세요.",
                descEn: "Leave your project inquiries and partnership proposals.",
                href: "/contact/inquiry",
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=90",
            },
            {
                id: "location",
                label: "찾아오시는 길",
                labelEn: "Location",
                title: "오시는 길",
                titleEn: "Our Location",
                desc: "본사 위치, 연락처, 방문 안내 정보를 확인하실 수 있습니다.",
                descEn: "Find our headquarters location, contact info, and visiting information.",
                href: "/contact/location",
                image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=90",
            },
        ],
    },
};

export type NavKey = keyof typeof NAV_CONTENT;

export function findCategoryBySlug(section: NavKey, slug: string) {
    return NAV_CONTENT[section].categories.find((category) => category.id === slug);
}
