// Navigation data shared between MorphingDesktopNav and category landing pages

export const NAV_CONTENT = {
    "ABOUT US": {
        href: "/about",
        heroTitle: "About Marine Research",
        heroDesc: "Over 20 years of excellence in offshore wind and marine geophysical surveys. Learn about our journey, values, and the expert team driving innovation.",
        gridLayout: 2 as const, // 2-column grid for 4 items
        categories: [
            {
                id: "profile",
                label: "Company Profile",
                title: "Leading Marine Surveyors",
                desc: "Over 20 years of excellence in offshore wind and geophysical surveys.",
                image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800&q=80",
                href: "/about/profile",
            },
            {
                id: "history",
                label: "History",
                title: "Our Journey",
                desc: "From humble beginnings in 2004 to a global marine solution provider.",
                image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
                href: "/about/history",
            },
            {
                id: "governance",
                label: "Governance",
                title: "Transparent Management",
                desc: "Committed to ethical business practices and sustainable growth.",
                image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
                href: "/about/governance",
            },
            {
                id: "team",
                label: "Leadership & Team",
                title: "Expert Team",
                desc: "Meet the experts driving innovation in marine research.",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
                href: "/about/team",
            },
        ],
    },
    "EXPLORE SERVICES": {
        href: "/services",
        heroTitle: "Our Services",
        heroDesc: "Comprehensive marine survey solutions from offshore wind site characterization to environmental monitoring. Discover how we support your projects.",
        gridLayout: 2 as const, // 2-column grid for 4 items
        categories: [
            {
                id: "offshore-wind",
                label: "Offshore Wind",
                title: "Offshore Wind Support",
                desc: "Comprehensive site characterization for reliable wind farm development.",
                image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80",
                href: "/services/offshore-wind",
            },
            {
                id: "geophysical",
                label: "Geophysical Survey",
                title: "Seabed Mapping",
                desc: "High-resolution MBES, SSS, and SBP data acquisition.",
                image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80",
                href: "/services/geophysical",
            },
            {
                id: "geotechnical",
                label: "Geotechnical",
                title: "Soil Investigation",
                desc: "Deep seabed sampling and CPT testing for foundation design.",
                image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80",
                href: "/services/geotechnical",
            },
            {
                id: "environmental",
                label: "Environmental",
                title: "Marine Environment",
                desc: "Ecosystem monitoring and impact assessment.",
                image: "https://images.unsplash.com/photo-1583212235753-9c5272806aa3?w=800&q=80",
                href: "/services/environmental",
            },
        ],
    },
    "CAREERS": {
        href: "/careers",
        heroTitle: "Join Our Team",
        heroDesc: "Build your career in marine engineering and survey. We value innovation, safety, and personal growth.",
        gridLayout: 1 as const, // 1-column for 2 items (full-width cards)
        categories: [
            {
                id: "culture",
                label: "Our Culture",
                title: "Growth & Balance",
                desc: "A workplace that values innovation, safety, and personal growth.",
                image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
                href: "/careers/culture",
            },
            {
                id: "jobs",
                label: "Open Positions",
                title: "Join Our Team",
                desc: "Find your next challenge in marine engineering and survey.",
                image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
                href: "/careers/jobs",
            },
        ],
    },
    "SUSTAINABILITY": {
        href: "/sustainability",
        heroTitle: "Sustainability",
        heroDesc: "Our commitment to environmental stewardship and sustainable practices in marine operations.",
        gridLayout: 3 as const, // 3-column spread for 2 items (centered)
        categories: [
            {
                id: "esg",
                label: "ESG Strategy",
                title: "Sustainable Future",
                desc: "Our commitment to Environmental, Social, and Governance goals.",
                image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?w=800&q=80",
                href: "/sustainability/esg",
            },
            {
                id: "safety",
                label: "Health & Safety",
                title: "Safety First",
                desc: "Zero harm policy for our people and the environment.",
                image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
                href: "/sustainability/safety",
            },
        ],
    },
    "CONTACTS": {
        href: "/contact",
        heroTitle: "Contact Us",
        heroDesc: "Get in touch with our global team. We're here to discuss your upcoming marine projects.",
        gridLayout: 2 as const, // 2-column for 2 items
        categories: [
            {
                id: "offices",
                label: "Our Offices",
                title: "Global Presence",
                desc: "Visit our headquarters or regional support centers.",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
                href: "/contact/offices",
            },
            {
                id: "inquiry",
                label: "Business Inquiry",
                title: "Get in Touch",
                desc: "Discuss your upcoming marine projects with us.",
                image: "https://images.unsplash.com/photo-1423666639041-f14d70fa71f7?w=800&q=80",
                href: "/contact/inquiry",
            },
        ],
    },
};

export type NavKey = keyof typeof NAV_CONTENT;
export type Category = typeof NAV_CONTENT[NavKey]["categories"][number];
