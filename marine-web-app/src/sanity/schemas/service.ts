import { defineField, defineType } from "sanity";

export default defineType({
    name: "service",
    title: "서비스",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "서비스명",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "titleEn",
            title: "서비스명 (영문)",
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
            name: "description",
            title: "설명",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "descriptionEn",
            title: "설명 (영문)",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "icon",
            title: "아이콘",
            type: "string",
            description: "Lucide 아이콘 이름 (예: Wind, Radar, Mountain)",
        }),
        defineField({
            name: "features",
            title: "특징",
            type: "array",
            of: [{ type: "string" }],
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
            name: "order",
            title: "정렬 순서",
            type: "number",
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: "title",
            media: "featuredImage",
        },
    },
});
