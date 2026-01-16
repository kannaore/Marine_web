import { defineField, defineType } from "sanity";

export default defineType({
    name: "project",
    title: "프로젝트",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "프로젝트명",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "titleEn",
            title: "프로젝트명 (영문)",
            type: "string",
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "category",
            title: "분류",
            type: "string",
            options: {
                list: [
                    { title: "해상풍력", value: "offshore-wind" },
                    { title: "지구물리", value: "geophysical" },
                    { title: "지오테크니컬", value: "geotechnical" },
                    { title: "해양환경", value: "marine-environment" },
                    { title: "기타", value: "other" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "client",
            title: "발주처",
            type: "string",
        }),
        defineField({
            name: "location",
            title: "위치",
            type: "string",
        }),
        defineField({
            name: "period",
            title: "수행기간",
            type: "object",
            fields: [
                { name: "start", title: "시작일", type: "date" },
                { name: "end", title: "종료일", type: "date" },
            ],
        }),
        defineField({
            name: "excerpt",
            title: "요약",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "description",
            title: "상세 설명",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "featuredImage",
            title: "대표 이미지",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "gallery",
            title: "갤러리",
            type: "array",
            of: [
                {
                    type: "image",
                    options: { hotspot: true },
                },
            ],
        }),
        defineField({
            name: "equipment",
            title: "투입장비",
            type: "array",
            of: [{ type: "reference", to: [{ type: "equipment" }] }],
        }),
        defineField({
            name: "featured",
            title: "메인 노출",
            type: "boolean",
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: "title",
            category: "category",
            media: "featuredImage",
        },
        prepare(selection) {
            const { title, category } = selection;
            const categoryLabels: Record<string, string> = {
                "offshore-wind": "해상풍력",
                geophysical: "지구물리",
                geotechnical: "지오테크니컬",
                "marine-environment": "해양환경",
                other: "기타",
            };
            return {
                ...selection,
                subtitle: categoryLabels[category] || category,
            };
        },
    },
});
