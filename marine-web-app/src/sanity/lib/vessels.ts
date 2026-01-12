import { getClient } from "./client";
import { vesselBySlugQuery, vesselSlugsQuery, vesselsQuery } from "./queries";
import type { Vessel } from "@/types";

const DEFAULT_REVALIDATE = 60 * 10;

type Locale = "ko" | "en";

type LocalizedSpecItem = {
    label: string;
    value: string;
};

type LocalizedEquipmentGroup = {
    category: string;
    items: string[];
};

type LocalizedDeckItem = {
    label: string;
    value: string;
};

export type LocalizedVessel = Omit<
    Vessel,
    | "nameEn"
    | "heroSubtitleEn"
    | "summary"
    | "mainDimensions"
    | "capacity"
    | "performance"
    | "conditions"
    | "accommodation"
    | "equipmentGroups"
    | "deckMachinery"
> & {
    name: string;
    heroSubtitle?: string;
    summary?: LocalizedSpecItem[];
    mainDimensions?: LocalizedSpecItem[];
    capacity?: LocalizedSpecItem[];
    performance?: LocalizedSpecItem[];
    conditions?: LocalizedSpecItem[];
    accommodation?: LocalizedSpecItem[];
    equipmentGroups?: LocalizedEquipmentGroup[];
    deckMachinery?: LocalizedDeckItem[];
};

const pickLocalized = (locale: Locale, value?: string, valueEn?: string) => {
    if (locale === "en" && valueEn) {
        return valueEn;
    }
    return value || "";
};

const localizeSpecs = (items: Vessel["summary"] | undefined, locale: Locale) =>
    items?.map((item) => ({
        label: item.label,
        value: pickLocalized(locale, item.value, item.valueEn),
    }));

const localizeDeck = (items: Vessel["deckMachinery"] | undefined, locale: Locale) =>
    items?.map((item) => ({
        label: item.label,
        value: pickLocalized(locale, item.value, item.valueEn),
    }));

const localizeEquipment = (groups: Vessel["equipmentGroups"] | undefined, locale: Locale) =>
    groups?.map((group) => ({
        category: group.category,
        items: group.items.map((item) => pickLocalized(locale, item.text, item.textEn)),
    }));

export async function getVessels(locale: Locale, preview = false) {
    const client = getClient(preview);
    const vessels = await client.fetch<Vessel[]>(
        vesselsQuery,
        {},
        {
            next: {
                revalidate: DEFAULT_REVALIDATE,
                tags: ["vessels"],
            },
        }
    );

    return vessels.map((vessel) => ({
        ...vessel,
        name: pickLocalized(locale, vessel.name, vessel.nameEn),
        heroSubtitle: pickLocalized(locale, vessel.heroSubtitle, vessel.heroSubtitleEn),
    }));
}

export async function getVesselBySlug(
    slug: string,
    locale: Locale,
    preview = false
): Promise<LocalizedVessel | null> {
    const client = getClient(preview);
    const vessel = await client.fetch<Vessel | null>(
        vesselBySlugQuery,
        { slug },
        {
            next: {
                revalidate: DEFAULT_REVALIDATE,
                tags: ["vessels", `vessel:${slug}`],
            },
        }
    );

    if (!vessel) {
        return null;
    }

    return {
        ...vessel,
        name: pickLocalized(locale, vessel.name, vessel.nameEn),
        heroSubtitle: pickLocalized(locale, vessel.heroSubtitle, vessel.heroSubtitleEn),
        summary: localizeSpecs(vessel.summary, locale),
        mainDimensions: localizeSpecs(vessel.mainDimensions, locale),
        capacity: localizeSpecs(vessel.capacity, locale),
        performance: localizeSpecs(vessel.performance, locale),
        conditions: localizeSpecs(vessel.conditions, locale),
        accommodation: localizeSpecs(vessel.accommodation, locale),
        equipmentGroups: localizeEquipment(vessel.equipmentGroups, locale),
        deckMachinery: localizeDeck(vessel.deckMachinery, locale),
    };
}

export async function getVesselSlugs(preview = false) {
    const client = getClient(preview);
    return client.fetch<Array<{ slug: string }>>(
        vesselSlugsQuery,
        {},
        {
            next: {
                revalidate: DEFAULT_REVALIDATE,
                tags: ["vessels"],
            },
        }
    );
}
