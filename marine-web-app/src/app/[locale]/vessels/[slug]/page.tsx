import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Button, Container, SectionHeading } from "@/components/ui";

type SpecItem = {
    labelKey: string;
    value: string;
    unitKey?: string;
    unitText?: string;
};

type EquipmentGroup = {
    categoryKey: string;
    items: string[];
};

type DeckItem = {
    labelKey: string;
    value: string;
};

type Vessel = {
    name: string;
    heroImage: string;
    heroSubtitle: string;
    summary: SpecItem[];
    mainDimensions: SpecItem[];
    capacity: SpecItem[];
    performance: SpecItem[];
    conditions: SpecItem[];
    accommodation: SpecItem[];
    equipment: EquipmentGroup[];
    deckMachinery: DeckItem[];
    certifications: string[];
};

const VESSELS: Record<string, Vessel> = {
    starmarine: {
        name: "M/V Starmarine",
        heroImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80",
        heroSubtitle:
            "Multi-purpose survey vessel equipped for seismic, geophysical, and geotechnical operations.",
        summary: [
            { labelKey: "lengthOverall", value: "64.4", unitKey: "meters" },
            { labelKey: "grossTonnage", value: "2,085", unitText: "GRT" },
            { labelKey: "maxSpeed", value: "14.5", unitKey: "knots" },
            { labelKey: "workDeck", value: "430", unitKey: "squareMeters" },
            { labelKey: "endurance", value: "40", unitKey: "days" },
            { labelKey: "totalPersons", value: "36", unitKey: "persons" },
        ],
        mainDimensions: [
            { labelKey: "lengthOverall", value: "64.4", unitKey: "meters" },
            { labelKey: "breadth", value: "15.0", unitKey: "meters" },
            { labelKey: "depth", value: "6.5", unitKey: "meters" },
            { labelKey: "draught", value: "5.0", unitKey: "meters" },
        ],
        capacity: [
            { labelKey: "grossTonnage", value: "2,085", unitText: "GRT" },
            { labelKey: "workDeck", value: "430", unitKey: "squareMeters" },
            { labelKey: "laboratory", value: "90", unitKey: "squareMeters" },
        ],
        performance: [
            { labelKey: "maxSpeed", value: "14.5", unitKey: "knots" },
            { labelKey: "bollardPull", value: "41 tonnes (at 5 knots)" },
            { labelKey: "endurance", value: "40", unitKey: "days" },
        ],
        conditions: [
            { labelKey: "seaState", value: "0-2.5", unitKey: "meters" },
            { labelKey: "windSpeed", value: "0-20.5", unitKey: "knots" },
        ],
        accommodation: [
            { labelKey: "totalPersons", value: "36", unitKey: "persons" },
            { labelKey: "researchers", value: "19", unitKey: "persons" },
            { labelKey: "singleCabins", value: "6", unitKey: "cabins" },
            { labelKey: "doubleCabins", value: "15", unitKey: "cabins" },
            { labelKey: "hospital", value: "1 bed" },
        ],
        equipment: [
            {
                categoryKey: "seismic3d",
                items: [
                    "Sercel Seal acquisition system",
                    "ION Spectra navigation system",
                    "3D quality control system",
                    "Onboard seismic processing system",
                    "Sercel Sentinel solid streamer (240 ch, 3000m x 2)",
                    "Bolt Air Gun (4,578 cu. in.)",
                    "ION Digicourse control system",
                    "Streamer winches: 3000m x 2",
                    "Double gun winches: 500m x 2",
                    "Streamer storage winches: 300m x 2",
                    "Hamworthy Marine 3TH90W100 compressor (800 cfm x 2)",
                    "Hamworthy Marine 4TH565W100 compressor (400 cfm x 1)",
                ],
            },
            {
                categoryKey: "seismicHighRes",
                items: [
                    "Geometrics system (48 ch, 3.125m group interval)",
                    "Sub-bottom profiling system (3.5 kHz, 10,000m)",
                ],
            },
            {
                categoryKey: "gravityMagnetic",
                items: [
                    "Micro-g Lacoste / MGS-66 gravimeter",
                    "Marine Magnetics SeaSpy magnetometer",
                ],
            },
            {
                categoryKey: "marineGeology",
                items: [
                    "Multibeam echosounder (400m / 600m / 7000m models)",
                    "Side-scan sonar (100/400 kHz, 400/1250 kHz, 455 kHz)",
                    "Piston corer / vibrocorer / box corer",
                    "Low temperature sample store",
                    "Dark room",
                    "Simrad EK60 scientific echosounder",
                ],
            },
        ],
        deckMachinery: [
            { labelKey: "seaCrane", value: "2.8 tonnes @ 12.0m" },
            { labelKey: "aFrame", value: "10 tonnes @ 5.2m" },
            { labelKey: "deepSeaWinch", value: "14 mm x 10,000m" },
        ],
        certifications: ["iso9001", "iso14001", "iso45001", "gwoBst"],
    },
};

type TFunction = (key: string) => string;

function formatSpecValue(item: SpecItem, t: TFunction) {
    const unit = item.unitKey ? t(`units.${item.unitKey}`) : item.unitText;
    return unit ? `${item.value} ${unit}` : item.value;
}

function SpecGrid({ items, t }: { items: SpecItem[]; t: TFunction }) {
    return (
        <div className="grid gap-3">
            {items.map((item) => (
                <div
                    key={`${item.labelKey}-${item.value}`}
                    className="flex items-baseline justify-between gap-4 border-b border-white/10 py-3"
                >
                    <span className="text-sm text-white/60">{t(`labels.${item.labelKey}`)}</span>
                    <span className="text-sm text-white md:text-base">
                        {formatSpecValue(item, t)}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default async function VesselDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const vessel = VESSELS[slug];
    if (!vessel) {
        notFound();
    }

    const t = await getTranslations("vessel");

    return (
        <div className="bg-marine-dark">
            <section className="relative min-h-[80vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={vessel.heroImage}
                        alt={vessel.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="from-marine-dark/50 via-marine-dark/40 to-marine-dark absolute inset-0 bg-gradient-to-b" />
                </div>

                <div className="relative z-10 flex min-h-[80vh] items-center">
                    <Container className="py-24 md:py-32">
                        <div className="max-w-2xl space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.3em] text-white/70 uppercase">
                                <span className="bg-ocean-400 h-1.5 w-1.5 rounded-full" />
                                {t("hero.badge")}
                            </div>
                            <h1 className="font-display text-4xl font-bold text-white md:text-6xl">
                                {vessel.name}
                            </h1>
                            <p className="text-base text-white/70 md:text-lg">
                                {vessel.heroSubtitle}
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <Button size="lg">
                                    {t("hero.ctaPrimary")}
                                    <ArrowRight size={18} className="ml-2" />
                                </Button>
                                <Button variant="secondary" size="lg">
                                    {t("hero.ctaSecondary")}
                                </Button>
                            </div>
                        </div>
                    </Container>
                </div>
            </section>

            <section className="bg-marine-dark border-y border-white/10">
                <Container className="py-10 md:py-14">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {vessel.summary.map((item) => (
                            <div
                                key={`${item.labelKey}-${item.value}`}
                                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                            >
                                <p className="text-xs tracking-[0.2em] text-white/50 uppercase">
                                    {t(`labels.${item.labelKey}`)}
                                </p>
                                <p className="font-display mt-3 text-2xl font-semibold text-white">
                                    {formatSpecValue(item, t)}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-marine-deeper py-20 md:py-28">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-2">
                        <div>
                            <SectionHeading
                                title={t("sections.specs.title")}
                                subtitle={t("sections.specs.subtitle")}
                                align="left"
                            />
                            <SpecGrid items={vessel.mainDimensions} t={t} />
                        </div>
                        <div>
                            <SectionHeading
                                title={t("sections.capacity.title")}
                                subtitle={t("sections.capacity.subtitle")}
                                align="left"
                            />
                            <SpecGrid items={vessel.capacity} t={t} />
                        </div>
                    </div>
                </Container>
            </section>

            <section className="bg-marine-dark py-20 md:py-28">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-2">
                        <div>
                            <SectionHeading
                                title={t("sections.performance.title")}
                                subtitle={t("sections.performance.subtitle")}
                                align="left"
                            />
                            <div className="space-y-10">
                                <div>
                                    <p className="mb-4 text-xs tracking-[0.25em] text-white/50 uppercase">
                                        {t("sections.performance.performanceTitle")}
                                    </p>
                                    <SpecGrid items={vessel.performance} t={t} />
                                </div>
                                <div>
                                    <p className="mb-4 text-xs tracking-[0.25em] text-white/50 uppercase">
                                        {t("sections.performance.conditionsTitle")}
                                    </p>
                                    <SpecGrid items={vessel.conditions} t={t} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <SectionHeading
                                title={t("sections.accommodation.title")}
                                subtitle={t("sections.accommodation.subtitle")}
                                align="left"
                            />
                            <SpecGrid items={vessel.accommodation} t={t} />
                        </div>
                    </div>
                </Container>
            </section>

            <section className="bg-marine-deeper py-20 md:py-28">
                <Container>
                    <SectionHeading
                        title={t("sections.equipment.title")}
                        subtitle={t("sections.equipment.subtitle")}
                        align="left"
                    />
                    <p className="mb-8 text-sm text-white/50">{t("sections.equipment.note")}</p>
                    <div className="grid gap-8 lg:grid-cols-2">
                        {vessel.equipment.map((group) => (
                            <div
                                key={group.categoryKey}
                                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                            >
                                <h3 className="font-display text-lg font-semibold text-white">
                                    {t(`equipmentCategories.${group.categoryKey}`)}
                                </h3>
                                <ul className="mt-4 space-y-2 text-sm text-white/60">
                                    {group.items.map((item) => (
                                        <li key={item} className="flex gap-3">
                                            <span className="bg-ocean-400 mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-marine-dark py-20 md:py-28">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-2">
                        <div>
                            <SectionHeading
                                title={t("sections.deck.title")}
                                subtitle={t("sections.deck.subtitle")}
                                align="left"
                            />
                            <div className="grid gap-3">
                                {vessel.deckMachinery.map((item) => (
                                    <div
                                        key={item.labelKey}
                                        className="flex items-baseline justify-between gap-4 border-b border-white/10 py-3"
                                    >
                                        <span className="text-sm text-white/60">
                                            {t(`deckMachinery.${item.labelKey}`)}
                                        </span>
                                        <span className="text-sm text-white md:text-base">
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <SectionHeading
                                title={t("sections.certifications.title")}
                                subtitle={t("sections.certifications.subtitle")}
                                align="left"
                            />
                            <div className="flex flex-wrap gap-3">
                                {vessel.certifications.map((cert) => (
                                    <span
                                        key={cert}
                                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
                                    >
                                        {t(`certifications.${cert}`)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}
