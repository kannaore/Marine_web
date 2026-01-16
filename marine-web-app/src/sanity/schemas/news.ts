import { defineField, defineType } from "sanity";

export default defineType({
    name: "news",
    title: "뉴스",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "제목",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "titleEn",
            title: "제목 (영문)",
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
            name: "publishedAt",
            title: "게시일",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "category",
            title: "카테고리",
            type: "string",
            options: {
                list: [
                    { title: "수주소식", value: "contract" },
                    { title: "회사소식", value: "company" },
                    { title: "인증", value: "certification" },
                    { title: "기술", value: "technology" },
                    { title: "기타", value: "other" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "excerpt",
            title: "요약",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "body",
            title: "본문",
            type: "array",
            of: [
                { type: "block" },
                {
                    type: "image",
                    options: { hotspot: true },
                },
            ],
        }),
        defineField({
            name: "featuredImage",
            title: "대표 이미지",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
    ],
    preview: {
        select: {
            title: "title",
            category: "category",
            date: "publishedAt",
            media: "featuredImage",
        },
        prepare(selection) {
            const { title, category, date } = selection;
            const categoryLabels: Record<string, string> = {
                contract: "수주소식",
                company: "회사소식",
                certification: "인증",
                technology: "기술",
                other: "기타",
            };
            return {
                ...selection,
                subtitle: `${categoryLabels[category] || category} • ${
                    date ? new Date(date).toLocaleDateString("ko-KR") : "날짜 없음"
                }`,
            };
        },
    },
    orderings: [
        {
            title: "게시일 (최신순)",
            name: "publishedAtDesc",
            by: [{ field: "publishedAt", direction: "desc" }],
        },
    ],
});
