import type { HaloTheme, Niche } from "@/lib/axiom/types";

/**
 * Scout paste target.
 * Copy business.ts from Scout, replace this file, set active: true, deploy the clone.
 * Owner uploads photos in Studio after they unlock with the PIN.
 */
export const BUSINESS: {
  active: boolean;
  id: string;
  name: string;
  niche: Niche;
  tagline: string;
  about: string;
  halo: HaloTheme;
  pin: string;
  locationName: string;
  locationNote: string;
  heroImage: string | null;
  team: { name: string; role: string; bio: string }[];
  offerings: {
    member: number;
    title: string;
    description: string;
    minutes: number;
    cents: number;
    kind: "service" | "menu";
  }[];
  posts: string[];
} = {
  active: true,
  id: "new-era-barberz",
  name: "New Era Barberz",
  niche: "barber",
  tagline: "24 hour booking.",
  about: "Book the chair even after close. Fill the rest in Desk.",
  halo: "ember",
  pin: "4242",
  locationName: "",
  locationNote: "",
  heroImage: null,
  team: [],
  offerings: [],
  posts: [],
};
