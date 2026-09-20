import type { HaloTheme, Niche } from "./types";

export const NICHES: Record<
  Niche,
  {
    label: string;
    teamLabel: string;
    offeringLabel: string;
    offeringSingular: string;
    bookLabel: string;
    locationLabel: string;
    halo: HaloTheme;
  }
> = {
  barber: {
    label: "Barber",
    teamLabel: "Barbers",
    offeringLabel: "Services",
    offeringSingular: "Service",
    bookLabel: "Book a chair",
    locationLabel: "Shop",
    halo: "ember",
  },
  tattoo: {
    label: "Tattoo",
    teamLabel: "Artists",
    offeringLabel: "Work",
    offeringSingular: "Session",
    bookLabel: "Book a session",
    locationLabel: "Studio",
    halo: "ink",
  },
  food_truck: {
    label: "Food",
    teamLabel: "Kitchen",
    offeringLabel: "Menu",
    offeringSingular: "Plate",
    bookLabel: "Reserve a pickup",
    locationLabel: "Today's lot",
    halo: "solstice",
  },
};

export const NICHE_LIST: Niche[] = ["barber", "tattoo", "food_truck"];

export function isNiche(value: string): value is Niche {
  return value === "barber" || value === "tattoo" || value === "food_truck";
}
