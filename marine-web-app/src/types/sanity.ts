// Sanity Schema Types

export interface SanityImage {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
    hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
    };
}

export interface SanitySlug {
    _type: "slug";
    current: string;
}

export interface SanityBlock {
    _type: "block";
    _key: string;
    children: Array<{
        _type: "span";
        _key: string;
        text: string;
        marks?: string[];
    }>;
    markDefs?: Array<{
        _type: string;
        _key: string;
        [key: string]: unknown;
    }>;
    style?: string;
}

export interface Project {
    _id: string;
    title: string;
    titleEn?: string;
    slug: SanitySlug;
    category: "offshore-wind" | "geophysical" | "geotechnical" | "marine-environment" | "other";
    client?: string;
    location?: string;
    period?: {
        start?: string;
        end?: string;
    };
    excerpt?: string;
    description?: SanityBlock[];
    featuredImage?: SanityImage;
    gallery?: SanityImage[];
    equipment?: Equipment[];
    featured?: boolean;
}

export interface Service {
    _id: string;
    title: string;
    titleEn?: string;
    slug: SanitySlug;
    description?: string;
    descriptionEn?: string;
    icon?: string;
    features?: string[];
    featuredImage?: SanityImage;
    order?: number;
}

export interface News {
    _id: string;
    title: string;
    titleEn?: string;
    slug: SanitySlug;
    publishedAt: string;
    category: "contract" | "company" | "certification" | "technology" | "other";
    excerpt?: string;
    body?: SanityBlock[];
    featuredImage?: SanityImage;
}

export interface Equipment {
    _id: string;
    name: string;
    nameEn?: string;
    category?: "survey" | "geotechnical" | "vessel" | "other";
    description?: string;
    image?: SanityImage;
    specifications?: Array<{
        key: string;
        value: string;
    }>;
}

export interface VesselSpecItem {
    label: string;
    value: string;
    valueEn?: string;
}

export interface VesselEquipmentItem {
    text: string;
    textEn?: string;
}

export interface VesselEquipmentGroup {
    category: "seismic3d" | "seismicHighRes" | "gravityMagnetic" | "marineGeology";
    items: VesselEquipmentItem[];
}

export interface VesselDeckItem {
    label: "seaCrane" | "aFrame" | "deepSeaWinch";
    value: string;
    valueEn?: string;
}

export interface Vessel {
    _id: string;
    name: string;
    nameEn?: string;
    slug: SanitySlug;
    heroSubtitle?: string;
    heroSubtitleEn?: string;
    heroImage?: SanityImage;
    summary?: VesselSpecItem[];
    mainDimensions?: VesselSpecItem[];
    capacity?: VesselSpecItem[];
    performance?: VesselSpecItem[];
    conditions?: VesselSpecItem[];
    accommodation?: VesselSpecItem[];
    equipmentGroups?: VesselEquipmentGroup[];
    deckMachinery?: VesselDeckItem[];
    certifications?: Array<"iso9001" | "iso14001" | "iso45001" | "gwoBst">;
    featured?: boolean;
    order?: number;
}

export interface SiteSettings {
    companyName?: string;
    companyNameEn?: string;
    logo?: SanityImage;
    contact?: {
        phone?: string;
        email?: string;
        address?: string;
        addressEn?: string;
    };
    socialLinks?: {
        linkedin?: string;
        facebook?: string;
        instagram?: string;
        youtube?: string;
    };
    stats?: {
        years?: number;
        projects?: number;
        team?: number;
        countries?: number;
    };
    seo?: {
        title?: string;
        description?: string;
        ogImage?: SanityImage;
    };
}

// Category labels
export const categoryLabels: Record<string, { ko: string; en: string }> = {
    "offshore-wind": { ko: "해상풍력", en: "Offshore Wind" },
    geophysical: { ko: "지구물리", en: "Geophysical" },
    geotechnical: { ko: "지오테크니컬", en: "Geotechnical" },
    "marine-environment": { ko: "해양환경", en: "Marine Environment" },
    other: { ko: "기타", en: "Other" },
};

export const newsCategoryLabels: Record<string, { ko: string; en: string }> = {
    contract: { ko: "수주소식", en: "Contract News" },
    company: { ko: "회사소식", en: "Company News" },
    certification: { ko: "인증", en: "Certification" },
    technology: { ko: "기술", en: "Technology" },
    other: { ko: "기타", en: "Other" },
};
