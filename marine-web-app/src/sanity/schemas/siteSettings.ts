import { defineField, defineType } from "sanity";

export default defineType({
    name: "siteSettings",
    title: "사이트 설정",
    type: "document",
    fields: [
        defineField({
            name: "companyName",
            title: "회사명",
            type: "string",
        }),
        defineField({
            name: "companyNameEn",
            title: "회사명 (영문)",
            type: "string",
        }),
        defineField({
            name: "logo",
            title: "로고",
            type: "image",
        }),
        defineField({
            name: "contact",
            title: "연락처",
            type: "object",
            fields: [
                { name: "phone", title: "전화번호", type: "string" },
                { name: "email", title: "이메일", type: "string" },
                { name: "address", title: "주소", type: "string" },
                { name: "addressEn", title: "주소 (영문)", type: "string" },
            ],
        }),
        defineField({
            name: "socialLinks",
            title: "소셜 미디어",
            type: "object",
            fields: [
                { name: "linkedin", title: "LinkedIn", type: "url" },
                { name: "facebook", title: "Facebook", type: "url" },
                { name: "instagram", title: "Instagram", type: "url" },
                { name: "youtube", title: "YouTube", type: "url" },
            ],
        }),
        defineField({
            name: "stats",
            title: "통계",
            type: "object",
            fields: [
                { name: "years", title: "경력 (년)", type: "number" },
                { name: "projects", title: "프로젝트 수", type: "number" },
                { name: "team", title: "팀원 수", type: "number" },
                { name: "countries", title: "국가 수", type: "number" },
            ],
        }),
        defineField({
            name: "seo",
            title: "SEO 설정",
            type: "object",
            fields: [
                { name: "title", title: "사이트 제목", type: "string" },
                { name: "description", title: "설명", type: "text" },
                { name: "ogImage", title: "OG 이미지", type: "image" },
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: "사이트 설정",
            };
        },
    },
});
