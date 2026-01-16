import { defineField, defineType } from "sanity";

export default defineType({
    name: "equipment",
    title: "장비",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "장비명",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "nameEn",
            title: "장비명 (영문)",
            type: "string",
        }),
        defineField({
            name: "category",
            title: "분류",
            type: "string",
            options: {
                list: [
                    { title: "측량장비", value: "survey" },
                    { title: "지반조사장비", value: "geotechnical" },
                    { title: "선박", value: "vessel" },
                    { title: "기타", value: "other" },
                ],
            },
        }),
        defineField({
            name: "description",
            title: "설명",
            type: "text",
        }),
        defineField({
            name: "image",
            title: "이미지",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "specifications",
            title: "사양",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "key", title: "항목", type: "string" },
                        { name: "value", title: "값", type: "string" },
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: "name",
            category: "category",
            media: "image",
        },
    },
});
