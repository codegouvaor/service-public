/**
 * URL structure of the public portal of the Ministry of Infrastructure and
 * Digital Affairs of the Republic of Astoria.
 *
 * Hrefs are locale-agnostic pathnames: the next-intl Link (registered as the
 * ADS link renderer) prefixes the active locale automatically. Labels are
 * never stored here — they come from the message catalogs through the key
 * provided by each entry (see `apps/messages/{fr,en}.json`).
 *
 * Architecture of the navigation:
 *
 *   primaryNavigation  → the seven institutional entries of the ministry. Each
 *                        entry opens a mega-menu panel structured in four
 *                        themes of four links:
 *                            7 entrées × 4 thèmes × 4 liens
 *
 * Everything is configuration-driven: the header and the footer derive their
 * markup from this array, so adding a domain/theme/link later never requires
 * rewriting a component.
 */
export const PORTAL_HOME = "/";

/** The seven institutional entries — both `nav.primary` and `footer.columns` keys. */
export type PrimaryNavKey =
  | "infrastructures"
  | "logement"
  | "energie"
  | "mobilite"
  | "numerique"
  | "territoires"
  | "ministere";

/** A destination inside a mega-menu panel; its label is a `nav.panel` message key. */
export type NavigationLink = {
  labelKey: string;
  href: string;
};

/**
 * A theme of a navigation section. In the mega-menu panel it heads one of the
 * four columns (`labelKey` → `nav.panel.<domain>.<theme>.title`); in the
 * footer it becomes a destination of the domain column. It carries the four
 * destinations of the theme.
 */
export type NavigationItem = NavigationLink & {
  /** Related destinations nested under this theme. */
  links: ReadonlyArray<NavigationLink>;
};

/**
 * One top-level entry of the Government Header navigation.
 *
 * Navigation principle (info.gouv.fr-inspired, adapted to Astoria): the header
 * is organised around the institutional perimeter of the ministry — the six
 * policy domains it is responsible for across the whole lifecycle of
 * infrastructure, plus the ministry itself:
 *
 *   Concevoir → Planifier → Construire → Exploiter → Maintenir →
 *   Moderniser → Résilient.
 *
 * Every domain opens a mega-menu panel composed of
 *  - a leader band: the domain name, a one-line description and the main
 *    action of the section (“Tout sur les infrastructures”, …),
 *  - four themes, each headed by its title and followed by its four
 *    destinations.
 *
 * Top-level labels resolve under `nav.primary` (`labelKey`), panel content
 * under `nav.panel` (`titleKey`, `paragraphKey`, nested `labelKey`s).
 */
export type NavigationSection = {
  type: "megaMenu";
  /** Message key (`nav.primary`) of the top-level tab. */
  labelKey: PrimaryNavKey;
  /** Landing page of the section, used by the leader action and active-state detection. */
  href: string;
  /** Leader band shown on top of the panel. */
  leader: {
    titleKey: string;
    paragraphKey: string;
    link: NavigationLink;
  };
  /** The four themes of the section, each with its four links. */
  primaryItems: ReadonlyArray<NavigationItem>;
};

export type FooterColumn = {
  /** Message key (`footer.columns`) of the column heading. */
  columnKey: string;
  links: ReadonlyArray<NavigationLink>;
};

export const sectionPaths = {
  infrastructures: "/infrastructures",
  logement: "/logement",
  energie: "/energie",
  mobilite: "/mobilite",
  numerique: "/numerique",
  territoires: "/territoires",
  ministere: "/ministere",
} as const;

export const legalPaths = {
  accessibility: "/legal/accessibility",
  privacy: "/legal/privacy",
  terms: "/legal/terms",
  cookies: "/legal/cookies",
  sitemap: "/sitemap",
} as const;

export const searchPath = "/search";

/** DOM ids used as skip-link targets. */
export const pageAnchors = {
  content: "main-content",
  footer: "main-footer",
} as const;

/**
 * Main navigation of the Government Header of the Ministry of Infrastructure
 * and Digital Affairs of the Republic of Astoria — the permanent information
 * architecture of the portal, organised in seven entries built around the
 * institutional perimeter of the ministry:
 *
 *   Infrastructures  → Construire : normes, réseaux, patrimoine, grands projets
 *   Logement         → Loger    : habitat, construction, rénovation, logement public
 *   Énergie          → Alimenter : électricité, réseaux, production, transition
 *   Mobilité         → Relier   : routier, ferroviaire, transports, aérien & maritime
 *   Numérique        → Numériser : connectivité, infrastructures, services, données
 *   Territoires      → Aménager : aménagement, eau, environnement, résilience
 *   Le Ministère     → Incarner : missions, administration, politiques, international
 *
 * Each domain opens a mega-menu panel with a leader band and four themes — each
 * theme headed by its title and followed by its four destinations. The panel is
 * not the sitemap of the portal; it exposes the destinations that matter to the
 * visitor journey. The structure is configuration-driven: adding a section only
 * means adding an entry here (and the matching messages).
 *
 * Hrefs follow the URL plan of the portal; several point to pages being
 * published and will resolve as soon as those sections ship.
 */
export const primaryNavigation: ReadonlyArray<NavigationSection> = [
  {
    type: "megaMenu",
    labelKey: "infrastructures",
    href: sectionPaths.infrastructures,
    leader: {
      titleKey: "infrastructures.title",
      paragraphKey: "infrastructures.text",
      link: {
        labelKey: "infrastructures.allLink",
        href: sectionPaths.infrastructures,
      },
    },
    primaryItems: [
      {
        labelKey: "infrastructures.construction.title",
        href: "/infrastructures/construction",
        links: [
          {
            labelKey: "infrastructures.construction.normes",
            href: "/infrastructures/construction/normes-de-construction",
          },
          {
            labelKey: "infrastructures.construction.marches",
            href: "/infrastructures/construction/marches-publics",
          },
          {
            labelKey: "infrastructures.construction.constructionPublique",
            href: "/infrastructures/construction/construction-publique",
          },
          {
            labelKey: "infrastructures.construction.securite",
            href: "/infrastructures/construction/securite-des-infrastructures",
          },
        ],
      },
      {
        labelKey: "infrastructures.reseaux.title",
        href: "/infrastructures/reseaux",
        links: [
          {
            labelKey: "infrastructures.reseaux.reseauxNationaux",
            href: "/infrastructures/reseaux/reseaux-nationaux",
          },
          {
            labelKey: "infrastructures.reseaux.eau",
            href: "/infrastructures/reseaux/eau",
          },
          {
            labelKey: "infrastructures.reseaux.assainissement",
            href: "/infrastructures/reseaux/assainissement",
          },
          {
            labelKey: "infrastructures.reseaux.reseauxEnergetiques",
            href: "/infrastructures/reseaux/reseaux-energetiques",
          },
        ],
      },
      {
        labelKey: "infrastructures.patrimoine.title",
        href: "/infrastructures/patrimoine",
        links: [
          {
            labelKey: "infrastructures.patrimoine.patrimoinePublic",
            href: "/infrastructures/patrimoine/patrimoine-public",
          },
          {
            labelKey: "infrastructures.patrimoine.batimentsPublics",
            href: "/infrastructures/patrimoine/batiments-publics",
          },
          {
            labelKey: "infrastructures.patrimoine.entretien",
            href: "/infrastructures/patrimoine/entretien",
          },
          {
            labelKey: "infrastructures.patrimoine.modernisation",
            href: "/infrastructures/patrimoine/modernisation",
          },
        ],
      },
      {
        labelKey: "infrastructures.grandsProjets.title",
        href: "/infrastructures/grands-projets",
        links: [
          {
            labelKey: "infrastructures.grandsProjets.projetsNationaux",
            href: "/infrastructures/grands-projets/projets-nationaux",
          },
          {
            labelKey: "infrastructures.grandsProjets.projetsEnCours",
            href: "/infrastructures/grands-projets/projets-en-cours",
          },
          {
            labelKey: "infrastructures.grandsProjets.projetsRealises",
            href: "/infrastructures/grands-projets/projets-realises",
          },
          {
            labelKey: "infrastructures.grandsProjets.appelsAProjets",
            href: "/infrastructures/grands-projets/appels-a-projets",
          },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "logement",
    href: sectionPaths.logement,
    leader: {
      titleKey: "logement.title",
      paragraphKey: "logement.text",
      link: {
        labelKey: "logement.allLink",
        href: sectionPaths.logement,
      },
    },
    primaryItems: [
      {
        labelKey: "logement.habitat.title",
        href: "/logement/habitat",
        links: [
          {
            labelKey: "logement.habitat.politiqueLogement",
            href: "/logement/habitat/politique-du-logement",
          },
          {
            labelKey: "logement.habitat.accession",
            href: "/logement/habitat/accession-au-logement",
          },
          {
            labelKey: "logement.habitat.collectif",
            href: "/logement/habitat/habitat-collectif",
          },
          {
            labelKey: "logement.habitat.individuel",
            href: "/logement/habitat/habitat-individuel",
          },
        ],
      },
      {
        labelKey: "logement.construction.title",
        href: "/logement/construction",
        links: [
          {
            labelKey: "logement.construction.constructionNeuve",
            href: "/logement/construction/construction-neuve",
          },
          {
            labelKey: "logement.construction.normesHabitat",
            href: "/logement/construction/normes-de-l-habitat",
          },
          {
            labelKey: "logement.construction.urbanismeResidentiel",
            href: "/logement/construction/urbanisme-residentiel",
          },
          {
            labelKey: "logement.construction.promoteurs",
            href: "/logement/construction/promoteurs-et-operateurs",
          },
        ],
      },
      {
        labelKey: "logement.renovation.title",
        href: "/logement/renovation",
        links: [
          {
            labelKey: "logement.renovation.renovationEnergetique",
            href: "/logement/renovation/renovation-energetique",
          },
          {
            labelKey: "logement.renovation.rehabilitation",
            href: "/logement/renovation/rehabilitation",
          },
          {
            labelKey: "logement.renovation.adaptationLogements",
            href: "/logement/renovation/adaptation-des-logements",
          },
          {
            labelKey: "logement.renovation.performanceBatiments",
            href: "/logement/renovation/performance-des-batiments",
          },
        ],
      },
      {
        labelKey: "logement.logementPublic.title",
        href: "/logement/logement-public",
        links: [
          {
            labelKey: "logement.logementPublic.logementSocial",
            href: "/logement/logement-public/logement-social",
          },
          {
            labelKey: "logement.logementPublic.parcPublic",
            href: "/logement/logement-public/parc-public",
          },
          {
            labelKey: "logement.logementPublic.attribution",
            href: "/logement/logement-public/attribution",
          },
          {
            labelKey: "logement.logementPublic.operateursPublics",
            href: "/logement/logement-public/operateurs-publics",
          },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "energie",
    href: sectionPaths.energie,
    leader: {
      titleKey: "energie.title",
      paragraphKey: "energie.text",
      link: {
        labelKey: "energie.allLink",
        href: sectionPaths.energie,
      },
    },
    primaryItems: [
      {
        labelKey: "energie.electricite.title",
        href: "/energie/electricite",
        links: [
          {
            labelKey: "energie.electricite.productionElectrique",
            href: "/energie/electricite/production-electrique",
          },
          {
            labelKey: "energie.electricite.reseauElectrique",
            href: "/energie/electricite/reseau-electrique",
          },
          {
            labelKey: "energie.electricite.distribution",
            href: "/energie/electricite/distribution",
          },
          {
            labelKey: "energie.electricite.securiteEnergetique",
            href: "/energie/electricite/securite-energetique",
          },
        ],
      },
      {
        labelKey: "energie.reseaux.title",
        href: "/energie/reseaux",
        links: [
          {
            labelKey: "energie.reseaux.reseauxNationaux",
            href: "/energie/reseaux/reseaux-nationaux",
          },
          {
            labelKey: "energie.reseaux.interconnexions",
            href: "/energie/reseaux/interconnexions",
          },
          {
            labelKey: "energie.reseaux.stockage",
            href: "/energie/reseaux/stockage",
          },
          {
            labelKey: "energie.reseaux.infrastructuresCritiques",
            href: "/energie/reseaux/infrastructures-critiques",
          },
        ],
      },
      {
        labelKey: "energie.production.title",
        href: "/energie/production",
        links: [
          {
            labelKey: "energie.production.nucleaire",
            href: "/energie/production/nucleaire",
          },
          {
            labelKey: "energie.production.renouvelables",
            href: "/energie/production/renouvelables",
          },
          {
            labelKey: "energie.production.hydraulique",
            href: "/energie/production/hydraulique",
          },
          {
            labelKey: "energie.production.autresSources",
            href: "/energie/production/autres-sources",
          },
        ],
      },
      {
        labelKey: "energie.transition.title",
        href: "/energie/transition",
        links: [
          {
            labelKey: "energie.transition.transitionEnergetique",
            href: "/energie/transition/transition-energetique",
          },
          {
            labelKey: "energie.transition.decarbonation",
            href: "/energie/transition/decarbonation",
          },
          {
            labelKey: "energie.transition.efficaciteEnergetique",
            href: "/energie/transition/efficacite-energetique",
          },
          {
            labelKey: "energie.transition.innovation",
            href: "/energie/transition/innovation",
          },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "mobilite",
    href: sectionPaths.mobilite,
    leader: {
      titleKey: "mobilite.title",
      paragraphKey: "mobilite.text",
      link: {
        labelKey: "mobilite.allLink",
        href: sectionPaths.mobilite,
      },
    },
    primaryItems: [
      {
        labelKey: "mobilite.routier.title",
        href: "/mobilite/routier",
        links: [
          {
            labelKey: "mobilite.routier.routesNationales",
            href: "/mobilite/routier/routes-nationales",
          },
          {
            labelKey: "mobilite.routier.autoroutes",
            href: "/mobilite/routier/autoroutes",
          },
          {
            labelKey: "mobilite.routier.ouvragesArt",
            href: "/mobilite/routier/ouvrages-d-art",
          },
          {
            labelKey: "mobilite.routier.entretienRoutier",
            href: "/mobilite/routier/entretien-routier",
          },
        ],
      },
      {
        labelKey: "mobilite.ferroviaire.title",
        href: "/mobilite/ferroviaire",
        links: [
          {
            labelKey: "mobilite.ferroviaire.reseauFerroviaire",
            href: "/mobilite/ferroviaire/reseau-ferroviaire",
          },
          {
            labelKey: "mobilite.ferroviaire.gares",
            href: "/mobilite/ferroviaire/gares",
          },
          {
            labelKey: "mobilite.ferroviaire.transportFerroviaire",
            href: "/mobilite/ferroviaire/transport-ferroviaire",
          },
          {
            labelKey: "mobilite.ferroviaire.modernisation",
            href: "/mobilite/ferroviaire/modernisation",
          },
        ],
      },
      {
        labelKey: "mobilite.transports.title",
        href: "/mobilite/transports",
        links: [
          {
            labelKey: "mobilite.transports.transportsPublics",
            href: "/mobilite/transports/transports-publics",
          },
          {
            labelKey: "mobilite.transports.mobiliteUrbaine",
            href: "/mobilite/transports/mobilite-urbaine",
          },
          {
            labelKey: "mobilite.transports.mobiliteRegionale",
            href: "/mobilite/transports/mobilite-regionale",
          },
          {
            labelKey: "mobilite.transports.intermodalite",
            href: "/mobilite/transports/intermodalite",
          },
        ],
      },
      {
        labelKey: "mobilite.aerienMaritime.title",
        href: "/mobilite/aerien-maritime",
        links: [
          {
            labelKey: "mobilite.aerienMaritime.aeroports",
            href: "/mobilite/aerien-maritime/aeroports",
          },
          {
            labelKey: "mobilite.aerienMaritime.ports",
            href: "/mobilite/aerien-maritime/ports",
          },
          {
            labelKey: "mobilite.aerienMaritime.transportMaritime",
            href: "/mobilite/aerien-maritime/transport-maritime",
          },
          {
            labelKey: "mobilite.aerienMaritime.transportAerien",
            href: "/mobilite/aerien-maritime/transport-aerien",
          },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "numerique",
    href: sectionPaths.numerique,
    leader: {
      titleKey: "numerique.title",
      paragraphKey: "numerique.text",
      link: {
        labelKey: "numerique.allLink",
        href: sectionPaths.numerique,
      },
    },
    primaryItems: [
      {
        labelKey: "numerique.connectivite.title",
        href: "/numerique/connectivite",
        links: [
          {
            labelKey: "numerique.connectivite.tresHautDebit",
            href: "/numerique/connectivite/tres-haut-debit",
          },
          {
            labelKey: "numerique.connectivite.fibre",
            href: "/numerique/connectivite/fibre",
          },
          {
            labelKey: "numerique.connectivite.reseauxMobiles",
            href: "/numerique/connectivite/reseaux-mobiles",
          },
          {
            labelKey: "numerique.connectivite.couvertureTerritoriale",
            href: "/numerique/connectivite/couverture-territoriale",
          },
        ],
      },
      {
        labelKey: "numerique.infrastructuresNumeriques.title",
        href: "/numerique/infrastructures-numeriques",
        links: [
          {
            labelKey: "numerique.infrastructuresNumeriques.dataCenters",
            href: "/numerique/infrastructures-numeriques/data-centers",
          },
          {
            labelKey: "numerique.infrastructuresNumeriques.cloudGouvernemental",
            href: "/numerique/infrastructures-numeriques/cloud-gouvernemental",
          },
          {
            labelKey: "numerique.infrastructuresNumeriques.reseauxPublics",
            href: "/numerique/infrastructures-numeriques/reseaux-publics",
          },
          {
            labelKey: "numerique.infrastructuresNumeriques.hebergement",
            href: "/numerique/infrastructures-numeriques/hebergement",
          },
        ],
      },
      {
        labelKey: "numerique.servicesPublics.title",
        href: "/numerique/services-publics",
        links: [
          {
            labelKey: "numerique.servicesPublics.identiteNumerique",
            href: "/numerique/services-publics/identite-numerique",
          },
          {
            labelKey: "numerique.servicesPublics.interoperabilite",
            href: "/numerique/services-publics/interoperabilite",
          },
          {
            labelKey: "numerique.servicesPublics.apiGouvernementales",
            href: "/numerique/services-publics/api-gouvernementales",
          },
          {
            labelKey: "numerique.servicesPublics.plateformesPubliques",
            href: "/numerique/services-publics/plateformes-publiques",
          },
        ],
      },
      {
        labelKey: "numerique.donneesTechnologies.title",
        href: "/numerique/donnees-technologies",
        links: [
          {
            labelKey: "numerique.donneesTechnologies.donneesPubliques",
            href: "/numerique/donnees-technologies/donnees-publiques",
          },
          {
            labelKey: "numerique.donneesTechnologies.intelligenceArtificielle",
            href: "/numerique/donnees-technologies/intelligence-artificielle",
          },
          {
            labelKey: "numerique.donneesTechnologies.standardsNumeriques",
            href: "/numerique/donnees-technologies/standards-numeriques",
          },
          {
            labelKey: "numerique.donneesTechnologies.souveraineteTechnologique",
            href: "/numerique/donnees-technologies/souverainete-technologique",
          },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "territoires",
    href: sectionPaths.territoires,
    leader: {
      titleKey: "territoires.title",
      paragraphKey: "territoires.text",
      link: {
        labelKey: "territoires.allLink",
        href: sectionPaths.territoires,
      },
    },
    primaryItems: [
      {
        labelKey: "territoires.amenagement.title",
        href: "/territoires/amenagement",
        links: [
          {
            labelKey: "territoires.amenagement.amenagementTerritoire",
            href: "/territoires/amenagement/amenagement-du-territoire",
          },
          {
            labelKey: "territoires.amenagement.urbanisme",
            href: "/territoires/amenagement/urbanisme",
          },
          {
            labelKey: "territoires.amenagement.planification",
            href: "/territoires/amenagement/planification-territoriale",
          },
          {
            labelKey: "territoires.amenagement.developpementRegional",
            href: "/territoires/amenagement/developpement-regional",
          },
        ],
      },
      {
        labelKey: "territoires.eau.title",
        href: "/territoires/eau",
        links: [
          {
            labelKey: "territoires.eau.gestionEau",
            href: "/territoires/eau/gestion-de-l-eau",
          },
          {
            labelKey: "territoires.eau.ressourcesHydriques",
            href: "/territoires/eau/ressources-hydriques",
          },
          {
            labelKey: "territoires.eau.distribution",
            href: "/territoires/eau/distribution",
          },
          {
            labelKey: "territoires.eau.preventionRisques",
            href: "/territoires/eau/prevention-des-risques",
          },
        ],
      },
      {
        labelKey: "territoires.environnement.title",
        href: "/territoires/environnement",
        links: [
          {
            labelKey: "territoires.environnement.infrastructuresDurables",
            href: "/territoires/environnement/infrastructures-durables",
          },
          {
            labelKey: "territoires.environnement.biodiversite",
            href: "/territoires/environnement/biodiversite",
          },
          {
            labelKey: "territoires.environnement.transitionTerritoriale",
            href: "/territoires/environnement/transition-territoriale",
          },
          {
            labelKey: "territoires.environnement.performanceEnvironnementale",
            href: "/territoires/environnement/performance-environnementale",
          },
        ],
      },
      {
        labelKey: "territoires.resilience.title",
        href: "/territoires/resilience",
        links: [
          {
            labelKey: "territoires.resilience.resilienceTerritoriale",
            href: "/territoires/resilience/resilience-territoriale",
          },
          {
            labelKey: "territoires.resilience.risquesNaturels",
            href: "/territoires/resilience/risques-naturels",
          },
          {
            labelKey: "territoires.resilience.continuiteServices",
            href: "/territoires/resilience/continuite-des-services",
          },
          {
            labelKey: "territoires.resilience.infrastructuresCritiques",
            href: "/territoires/resilience/infrastructures-critiques",
          },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "ministere",
    href: sectionPaths.ministere,
    leader: {
      titleKey: "ministere.title",
      paragraphKey: "ministere.text",
      link: {
        labelKey: "ministere.allLink",
        href: sectionPaths.ministere,
      },
    },
    primaryItems: [
      {
        labelKey: "ministere.leMinistere.title",
        href: "/ministere/le-ministere",
        links: [
          {
            labelKey: "ministere.leMinistere.missions",
            href: "/ministere/le-ministere/missions",
          },
          {
            labelKey: "ministere.leMinistere.organisation",
            href: "/ministere/le-ministere/organisation",
          },
          {
            labelKey: "ministere.leMinistere.ministre",
            href: "/ministere/le-ministere/ministre",
          },
          {
            labelKey: "ministere.leMinistere.secretairesEtat",
            href: "/ministere/le-ministere/secretaires-d-etat",
          },
        ],
      },
      {
        labelKey: "ministere.administration.title",
        href: "/ministere/administration",
        links: [
          {
            labelKey: "ministere.administration.directions",
            href: "/ministere/administration/directions",
          },
          {
            labelKey: "ministere.administration.services",
            href: "/ministere/administration/services",
          },
          {
            labelKey: "ministere.administration.implantations",
            href: "/ministere/administration/implantations",
          },
          {
            labelKey: "ministere.administration.recrutement",
            href: "/ministere/administration/recrutement",
          },
        ],
      },
      {
        labelKey: "ministere.politiquesPubliques.title",
        href: "/ministere/politiques-publiques",
        links: [
          {
            labelKey: "ministere.politiquesPubliques.strategie",
            href: "/ministere/politiques-publiques/strategie",
          },
          {
            labelKey: "ministere.politiquesPubliques.programmes",
            href: "/ministere/politiques-publiques/programmes",
          },
          {
            labelKey: "ministere.politiquesPubliques.budgets",
            href: "/ministere/politiques-publiques/budgets",
          },
          {
            labelKey: "ministere.politiquesPubliques.evaluation",
            href: "/ministere/politiques-publiques/evaluation",
          },
        ],
      },
      {
        labelKey: "ministere.international.title",
        href: "/ministere/international",
        links: [
          {
            labelKey: "ministere.international.organisationsInternationales",
            href: "/ministere/international/organisations-internationales",
          },
          {
            labelKey: "ministere.international.cooperation",
            href: "/ministere/international/cooperation",
          },
          {
            labelKey: "ministere.international.affairesEuropeennes",
            href: "/ministere/international/affaires-europeennes",
          },
          {
            labelKey: "ministere.international.representations",
            href: "/ministere/international/representations",
          },
        ],
      },
    ],
  },
];

/**
 * Secondary navigation zone of the site footer, distinct from the main
 * navigation of the header. It mirrors the seven entries of the header
 * navigation and derives its links from the themes of each section — so the
 * footer and the header can never drift apart.
 *
 * Column titles resolve under `footer.columns`, links under `nav.panel`.
 */
export const footerNavigation: ReadonlyArray<FooterColumn> = primaryNavigation.map(
  (section) => ({
    columnKey: section.labelKey,
    links: section.primaryItems,
  })
);
