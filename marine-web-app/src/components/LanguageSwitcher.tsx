"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLocaleChange = (newLocale: string) => {
        if (locale === newLocale) return;
        const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPathname || `/${newLocale}`);
    };

    return (
        <div className="flex items-center gap-1.5 font-display text-sm font-medium tracking-wide">
            <button
                onClick={() => handleLocaleChange("en")}
                className={cn(
                    "transition-colors hover:text-white",
                    locale === "en" ? "text-white" : "text-white/40"
                )}
            >
                EN
            </button>
            <span className="text-white/20">/</span>
            <button
                onClick={() => handleLocaleChange("ko")}
                className={cn(
                    "transition-colors hover:text-white",
                    locale === "ko" ? "text-white" : "text-white/40"
                )}
            >
                KR
            </button>
        </div>
    );
}
