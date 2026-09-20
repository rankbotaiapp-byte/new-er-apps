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
  active: false,
  id: "client-studio",
  name: "Client Studio",
  niche: "barber",
  tagline: "Book through the night.",
  about: "Paste the Scout file over this object, set active to true, deploy the clone.",
  halo: "ember",
  pin: "4242",
  locationName: "",
  locationNote: "",
  heroImage: null,
  team: [],
  offerings: [],
  posts: [],
};
