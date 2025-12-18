import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    // List of all supported locales
    locales: ["ko", "en"],

    // Default locale when visiting a non-locale path
    defaultLocale: "ko",

    // Prefix the default locale in the URL as well
    localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
