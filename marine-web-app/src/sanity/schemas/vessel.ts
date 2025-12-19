import { defineField, defineType } from "sanity";

const specLabelOptions = [
    { title: "전장", value: "lengthOverall" },
    { title: "선폭", value: "breadth" },
    { title: "심도", value: "depth" },
    { title: "흘수", value: "draught" },
    { title: "총톤수", value: "grossTonnage" },
    { title: "작업 면적", value: "workDeck" },
    { title: "실험실 면적", value: "laboratory" },
    { title: "최대 선속", value: "maxSpeed" },
    { title: "예인 능력", value: "bollardPull" },
    { title: "항해 지속일수", value: "endurance" },
    { title: "파고 높이", value: "seaState" },
    { title: "풍속", value: "windSpeed" },
    { title: "총 탑승 인원", value: "totalPersons" },
    { title: "연구원", value: "researchers" },
    { title: "1인용 선실", value: "singleCabins" },
    { title: "2인용 선실", value: "doubleCabins" },
    { title: "의무실", value: "hospital" },
];

const specLabelMap = specLabelOptions.reduce<Record<string, string>>((acc, item) => {
    acc[item.value] = item.title;
    return acc;
}, {});

const equipmentCategoryOptions = [
    { title: "3차원 탄성파 탐사", value: "seismic3d" },
    { title: "고해상 탄성파/지층 탐사", value: "seismicHighRes" },
    { title: "중·자력 탐사", value: "gravityMagnetic" },
    { title: "해저지형/저질 조사", value: "marineGeology" },
];

const equipmentCategoryMap = equipmentCategoryOptions.reduce<Record<string, string>>((acc, item) => {
    acc[item.value] = item.title;
    return acc;
}, {});

const deckMachineryOptions = [
    { title: "해상 크레인", value: "seaCrane" },
    { title: "A-프레임", value: "aFrame" },
    { title: "심해용 윈치", value: "deepSeaWinch" },
];

const deckMachineryMap = deckMachineryOptions.reduce<Record<string, string>>((acc, item) => {
    acc[item.value] = item.title;
    return acc;
}, {});

const certificationOptions = [
    { title: "ISO 9001", value: "iso9001" },
    { title: "ISO 14001", value: "iso14001" },
    { title: "ISO 45001", value: "iso45001" },
    { title: "GWO BST", value: "gwoBst" },
];

const specItem = {
    type: "object",
    fields: [
        defineField({
            name: "label",
            title: "항목",
            type: "string",
            options: {
                list: specLabelOptions,
            },
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "value",
            title: "값",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "valueEn",
            title: "값 (영문)",
            type: "string",
        }),
    ],
    preview: {
        select: {
            label: "label",
            value: "value",
        },
        prepare({ label, value }: { label?: string; value?: string }) {
            return {
                title: specLabelMap[label || ""] || label,
                subtitle: value,
            };
        },
    },
};

const equipmentItem = {
    type: "object",
    fields: [
        defineField({
            name: "text",
            title: "항목",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "textEn",
            title: "항목 (영문)",
            type: "string",
        }),
    ],
};

const equipmentGroup = {
    type: "object",
    fields: [
        defineField({
            name: "category",
            title: "분류",
            type: "string",
            options: {
                list: equipmentCategoryOptions,
            },
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "items",
            title: "장비 목록",
            type: "array",
            of: [equipmentItem],
            validation: (Rule: any) => Rule.min(1),
        }),
    ],
    preview: {
        select: {
            category: "category",
            items: "items",
        },
        prepare({
            category,
            items,
        }: {
            category?: string;
            items?: Array<{ text?: string }>;
        }) {
            return {
                title: equipmentCategoryMap[category || ""] || category,
                subtitle: items?.[0]?.text,
            };
        },
    },
};

const deckItem = {
    type: "object",
    fields: [
        defineField({
            name: "label",
            title: "항목",
            type: "string",
            options: {
                list: deckMachineryOptions,
            },
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "value",
            title: "값",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "valueEn",
            title: "값 (영문)",
            type: "string",
        }),
    ],
    preview: {
        select: {
            label: "label",
            value: "value",
        },
        prepare({ label, value }: { label?: string; value?: string }) {
            return {
                title: deckMachineryMap[label || ""] || label,
                subtitle: value,
            };
        },
    },
};

export default defineType({
    name: "vessel",
    title: "선박",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "선박명",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "nameEn",
            title: "선박명 (영문)",
            type: "string",
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "heroImage",
            title: "히어로 이미지",
            type: "image",
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "heroSubtitle",
            title: "히어로 설명",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "heroSubtitleEn",
            title: "히어로 설명 (영문)",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "summary",
            title: "핵심 요약",
            type: "array",
            of: [specItem],
            validation: (Rule) => Rule.max(8),
        }),
        defineField({
            name: "mainDimensions",
            title: "주요 제원",
            type: "array",
            of: [specItem],
        }),
        defineField({
            name: "capacity",
            title: "용량 및 면적",
            type: "array",
            of: [specItem],
        }),
        defineField({
            name: "performance",
            title: "운항 성능",
            type: "array",
            of: [specItem],
        }),
        defineField({
            name: "conditions",
            title: "운용 한계 조건",
            type: "array",
            of: [specItem],
        }),
        defineField({
            name: "accommodation",
            title: "거주 공간 및 탑승 인원",
            type: "array",
            of: [specItem],
        }),
        defineField({
            name: "equipmentGroups",
            title: "탐사 및 관측 장비",
            type: "array",
            of: [equipmentGroup],
        }),
        defineField({
            name: "deckMachinery",
            title: "데크 기계",
            type: "array",
            of: [deckItem],
        }),
        defineField({
            name: "certifications",
            title: "인증 및 교육",
            type: "array",
            of: [
                {
                    type: "string",
                    options: {
                        list: certificationOptions,
                    },
                },
            ],
        }),
        defineField({
            name: "featured",
            title: "메인 노출",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "order",
            title: "정렬 순서",
            type: "number",
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: "name",
            media: "heroImage",
        },
    },
});
