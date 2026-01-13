import type { Metadata } from "next";
import { Outfit, Readex_Pro } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import { Header, Footer } from "@/components/layout";
import { GSAPProvider, LevaProvider } from "@/components/providers";
import { BokehBackground } from "@/components/ui/BokehBackground";
import { routing } from "@/i18n/routing";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

const readexPro = Readex_Pro({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500"],
    variable: "--font-readex-pro",
    display: "swap",
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    const titles: Record<string, string> = {
        ko: "마린리서치 | 해양조사 전문기업",
        en: "Marine Research | Marine Survey Specialists",
    };

    const descriptions: Record<string, string> = {
        ko: "해상풍력, 지구물리탐사, 지반조사 전문 기업. 안전하고 지속 가능한 해양의 미래를 만들어갑니다.",
        en: "Specialists in offshore wind, geophysical surveys, and geotechnical investigations. Creating a safe and sustainable ocean future.",
    };

    return {
        title: {
            default: titles[locale] || titles.ko,
            template: `%s | ${locale === "en" ? "Marine Research" : "마린리서치"}`,
        },
        description: descriptions[locale] || descriptions.ko,
        keywords: [
            "해양조사",
            "해상풍력",
            "지구물리탐사",
            "지반조사",
            "마린리서치",
            "Marine Research",
            "offshore wind",
            "geophysical survey",
            "geotechnical",
        ],
        openGraph: {
            title: titles[locale] || titles.ko,
            description: descriptions[locale] || descriptions.ko,
            type: "website",
            locale: locale === "en" ? "en_US" : "ko_KR",
        },
        alternates: {
            languages: {
                ko: "/ko",
                en: "/en",
            },
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as "ko" | "en")) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Get messages for the current locale
    const messages = await getMessages();

    return (
        <html lang={locale} className={`${outfit.variable} ${readexPro.variable}`} suppressHydrationWarning>
            <head>
                <link
                    rel="stylesheet"
                    as="style"
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
                />
            </head>
            <body className="font-sans antialiased">
                <NextIntlClientProvider messages={messages}>
                    <LevaProvider>
                        <GSAPProvider>
                            <BokehBackground />
                            <Header />
                            <main>{children}</main>
                            <Footer />
                        </GSAPProvider>
                    </LevaProvider>
                </NextIntlClientProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
