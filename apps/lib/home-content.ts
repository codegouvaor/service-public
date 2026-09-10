/**
 * Homepage data of the Service Public portal.
 *
 * Follows the convention of the reference home page (`apps/test/page.tsx`):
 * the data structures below only carry machine keys, hrefs and icon classes —
 * every human-readable label resolves from the message catalogs through the
 * `home.*` namespace, so the page stays fully translatable.
 *
 * Most arrays are demonstration content: they are the seams where the future
 * catalogues of the portal (public services, digital services, useful
 * information…) plug in, exactly like the ministry reference.
 */
import type { FrIconClassName } from "@codegouvaor/react-ads/fr";
import type { PrimaryNavKey } from "./site-structure";
import { sectionPaths } from "./site-structure";

/** Canonical path of the homepage, used for the localized `alternates`. */
export const HOME_PATH = "/";

/**
 * Icon of each of the seven categories, keyed by the header taxonomy
 * (`nav.primary` / `PrimaryNavKey`) so the homepage cards and the header can
 * never drift apart.
 */
export const categoryIcons: Record<PrimaryNavKey, FrIconClassName> = {
  demarches: "fr-icon-file-text-line",
  droitsObligations: "fr-icon-book-2-line",
  servicesPublics: "fr-icon-government-line",
  vieQuotidienne: "fr-icon-home-4-line",
  entreprises: "fr-icon-briefcase-line",
  organisations: "fr-icon-community-line",
  international: "fr-icon-earth-line",
};

/** The four quick-access intentions of the homepage hero. */
export type QuickAccessItem = {
  key: string;
  href: string;
  iconId: FrIconClassName;
};

export const homeQuickAccess: QuickAccessItem[] = [
  { key: "demarche", href: sectionPaths.demarches, iconId: "fr-icon-edit-line" },
  {
    key: "service",
    href: sectionPaths.servicesPublics,
    iconId: "fr-icon-service-line",
  },
  {
    key: "droits",
    href: sectionPaths.droitsObligations,
    iconId: "fr-icon-shield-line",
  },
  {
    key: "administration",
    href: "/services-publics/administrations",
    iconId: "fr-icon-building-line",
  },
];

/** Popular searches suggested under the hero search field. */
export type SearchSuggestion = {
  key: string;
  query: string;
};

export const homeSearchSuggestions: SearchSuggestion[] = [
  { key: "identite", query: "carte d'identité" },
  { key: "impots", query: "impôts" },
  { key: "logement", query: "aide au logement" },
  { key: "entreprise", query: "créer une entreprise" },
];

/** Administration directory — browse-by-type links. */
export type AdministrationLink = {
  key: string;
  href: string;
};

export const homeAdministrationLinks: AdministrationLink[] = [
  {
    key: "centrales",
    href: "/services-publics/administrations/administrations-centrales",
  },
  {
    key: "territoriales",
    href: "/services-publics/administrations/collectivites-territoriales",
  },
  {
    key: "etablissements",
    href: "/services-publics/etablissements-publics",
  },
  {
    key: "locaux",
    href: "/services-publics/services/services-de-proximite",
  },
];

/**
 * Digital services presented on the homepage. Demonstration catalogue until
 * the official digital-services register is connected.
 */
export type DigitalServiceItem = {
  key: string;
  href: string;
  iconId: FrIconClassName;
};

export const homeDigitalServices: DigitalServiceItem[] = [
  {
    key: "mygouv",
    href: "/services-publics/services-numeriques/identite-numerique",
    iconId: "fr-icon-account-circle-line",
  },
  {
    key: "demarches",
    href: "/demarches/en-ligne",
    iconId: "fr-icon-edit-line",
  },
  {
    key: "documents",
    href: "/demarches/formulaires/certificats-attestations",
    iconId: "fr-icon-file-text-line",
  },
  {
    key: "aides",
    href: "/droits-obligations/droits/aides-et-prestations",
    iconId: "fr-icon-money-euro-circle-line",
  },
  {
    key: "logement",
    href: "/vie-quotidienne/logement-et-mobilite/aides-au-logement",
    iconId: "fr-icon-home-4-line",
  },
  {
    key: "entreprises",
    href: "/entreprises/creation-et-gestion",
    iconId: "fr-icon-briefcase-line",
  },
];

/** Short notices directly useful for accessing public services. */
export type UsefulInfoItem = {
  key: string;
  href?: string;
  iconId: FrIconClassName;
};

export const homeUsefulInfo: UsefulInfoItem[] = [
  {
    key: "nouvelleDemarche",
    href: "/demarches/en-ligne",
    iconId: "fr-icon-add-circle-line",
  },
  {
    key: "procedure",
    href: "/demarches",
    iconId: "fr-icon-refresh-line",
  },
  {
    key: "echeance",
    href: "/droits-obligations/obligations/echeances-administratives",
    iconId: "fr-icon-calendar-check-line",
  },
  {
    key: "interruption",
    href: "/services-publics/services-numeriques",
    iconId: "fr-icon-alarm-warning-line",
  },
];