import { setRequestLocale } from "next-intl/server";

export default async function ServicesLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    // Services page - hide footer only
    return (
        <>
            <style>{`
                footer, contentinfo { display: none !important; }
            `}</style>
            <div className="fixed inset-0 z-10 overflow-hidden">
                {children}
            </div>
        </>
    );
}
