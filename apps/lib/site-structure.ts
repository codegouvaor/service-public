/**
 * URL structure of the public portal of the Republic of Astoria.
 *
 * Hrefs are locale-agnostic pathnames: the next-intl Link (registered as the
 * ADS link renderer) prefixes the active locale automatically. Labels are
 * never stored here — they come from the message catalogs through the key
 * provided by each entry (see `apps/messages/{fr,en}.json`).
 *
 * Architecture of the navigation:
 *
 *   primaryNavigation  → the seven user-centric entries of the portal. Each
 *                        entry opens a mega-menu panel structured in four
 *                        themes of four links:
 *                            7 entrées × 4 thèmes × 4 liens
 *
 * The information architecture is deliberately *not* organised around the
 * internal structure of the ministries: a visitor arrives with an
 * administrative need (a procedure to run, a service to find, a right to
 * understand) without knowing which ministry is responsible. The portal is
 * organised around what people look for:
 *
 *   Démarches             → ce que je dois faire
 *   Droits & obligations  → ce que je dois comprendre
 *   Services publics      → qui fournit le service
 *   Vie quotidienne       → les situations de la vie courante
 *   Entreprises           → les entreprises
 *   Organisations         → les associations, fondations et institutions
 *   International         → les services pour / des personnes à l'étranger
 *
 * `Rechercher` and `Se connecter` are transversal functions of the platform
 * (search, MyGouv identity), not categories of the catalogue: they live in
 * the header, outside the primary navigation.
 *
 * Everything is configuration-driven: the header and the footer derive their
 * markup from this array, so adding a domain/theme/link later never requires
 * rewriting a component.
 */
export const PORTAL_HOME = "/";

/** The seven user-centric entries — both `nav.primary` and `footer.columns` keys. */
export type PrimaryNavKey =
  | "demarches"
  | "droitsObligations"
  | "servicesPublics"
  | "vieQuotidienne"
  | "entreprises"
  | "organisations"
  | "international";

/** A destination inside a mega-menu panel; its label is a `nav.panel` message key. */
export type NavigationLink = {
  labelKey: string;
  href: string;
};

/**
 * A theme of a navigation section. In the mega-menu panel it heads one of the
 * four columns (`labelKey` → `nav.panel.<section>.<theme>.title`); in the
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
 * Navigation principle: the header is organised around the needs and usages
 * of the visitors, not around the internal structure of the ministries. Each
 * entry opens a mega-menu panel composed of
 *  - a leader band: the category name, a one-line description and the main
 *    action of the section (“Toutes les démarches”, …),
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
  demarches: "/demarches",
  droitsObligations: "/droits-obligations",
  servicesPublics: "/services-publics",
  vieQuotidienne: "/vie-quotidienne",
  entreprises: "/entreprises",
  organisations: "/organisations",
  international: "/international",
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
 * Main navigation of the Government Header of the Service Public portal of
 * the Republic of Astoria — the permanent information architecture of the
 * platform, organised in seven user-centric entries:
 *
 *   Démarches             → faire      : toutes les démarches, en ligne, formulaires, rendez-vous
 *   Droits & obligations  → comprendre : droits, obligations, règles et procédures, recours
 *   Services publics      → trouver    : administrations, services, établissements, services numériques
 *   Vie quotidienne       → vivre      : famille, travail et études, logement et mobilité, santé
 *   Entreprises           → entreprendre : création, fiscalité, employeurs, aides
 *   Organisations         → s'engager  : associations, fondations, institutions, agréments
 *   International         → à l'étranger : immigration, Astoriens à l'étranger, consulats, diplomaties
 *
 * Each entry opens a mega-menu panel with a leader band and four themes — each
 * theme headed by its title and followed by its four destinations. The panel is
 * not the sitemap of the portal; it exposes the destinations that matter to the
 * visitor journey. The structure is configuration-driven: adding a section only
 * means adding an entry here (and the matching messages).
 *
 * The portal stays a *point of access*: the specialised portals (MyGouv for
 * identity, diplomatie.gouv.aor for foreign policy and diplomatic
 * communication) remain responsible for their own features.
 *
 * Hrefs follow the URL plan of the portal; several point to pages being
 * published and will resolve as soon as those sections ship.
 */
export const primaryNavigation: ReadonlyArray<NavigationSection> = [
  {
    type: "megaMenu",
    labelKey: "demarches",
    href: sectionPaths.demarches,
    leader: {
      titleKey: "demarches.title",
      paragraphKey: "demarches.text",
      link: {
        labelKey: "demarches.allLink",
        href: sectionPaths.demarches,
      },
    },
    primaryItems: [
      {
        labelKey: "demarches.toutesLesDemarches.title",
        href: "/demarches/toutes-les-demarches",
        links: [
          {
            labelKey: "demarches.toutesLesDemarches.renouvelerCarteIdentite",
            href: "/demarches/toutes-les-demarches/renouveler-carte-identite",
          },
          {
            labelKey: "demarches.toutesLesDemarches.changerAdresse",
            href: "/demarches/toutes-les-demarches/changement-adresse",
          },
          {
            labelKey: "demarches.toutesLesDemarches.actesEtatCivil",
            href: "/demarches/toutes-les-demarches/actes-etat-civil",
          },
          {
            labelKey: "demarches.toutesLesDemarches.immatriculerVehicule",
            href: "/demarches/toutes-les-demarches/immatriculer-vehicule",
          },
        ],
      },
      {
        labelKey: "demarches.enLigne.title",
        href: "/demarches/en-ligne",
        links: [
          {
            labelKey: "demarches.enLigne.effectuerEnLigne",
            href: "/demarches/en-ligne/effectuer-une-demarche",
          },
          {
            labelKey: "demarches.enLigne.creerCompteMyGouv",
            href: "/demarches/en-ligne/creer-compte-mygouv",
          },
          {
            labelKey: "demarches.enLigne.suivreDemande",
            href: "/demarches/en-ligne/suivre-une-demande",
          },
          {
            labelKey: "demarches.enLigne.payerEnLigne",
            href: "/demarches/en-ligne/payer-en-ligne",
          },
        ],
      },
      {
        labelKey: "demarches.formulaires.title",
        href: "/demarches/formulaires",
        links: [
          {
            labelKey: "demarches.formulaires.rechercherFormulaire",
            href: "/demarches/formulaires/rechercher-un-formulaire",
          },
          {
            labelKey: "demarches.formulaires.certificatsAttestations",
            href: "/demarches/formulaires/certificats-attestations",
          },
          {
            labelKey: "demarches.formulaires.modelesCourriers",
            href: "/demarches/formulaires/modeles-de-courriers",
          },
          {
            labelKey: "demarches.formulaires.piecesJustificatives",
            href: "/demarches/formulaires/pieces-justificatives",
          },
        ],
      },
      {
        labelKey: "demarches.rendezVous.title",
        href: "/demarches/rendez-vous",
        links: [
          {
            labelKey: "demarches.rendezVous.prendreRendezVous",
            href: "/demarches/rendez-vous/prendre-rendez-vous",
          },
          {
            labelKey: "demarches.rendezVous.annulerRendezVous",
            href: "/demarches/rendez-vous/annuler-rendez-vous",
          },
          {
            labelKey: "demarches.rendezVous.prefectures",
            href: "/demarches/rendez-vous/prefectures",
          },
          {
            labelKey: "demarches.rendezVous.accueilServicesPublics",
            href: "/demarches/rendez-vous/accueil-services-publics",
          },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "droitsObligations",
    href: sectionPaths.droitsObligations,
    leader: {
      titleKey: "droitsObligations.title",
      paragraphKey: "droitsObligations.text",
      link: {
        labelKey: "droitsObligations.allLink",
        href: sectionPaths.droitsObligations,
      },
    },
    primaryItems: [
      {
        labelKey: "droitsObligations.droits.title",
        href: "/droits-obligations/droits",
        links: [
          {
            labelKey: "droitsObligations.droits.droitsUsagers",
            href: "/droits-obligations/droits/droits-des-usagers",
          },
          {
            labelKey: "droitsObligations.droits.protectionDonnees",
            href: "/droits-obligations/droits/protection-donnees-personnelles",
          },
          {
            labelKey: "droitsObligations.droits.accesDocumentsAdministratifs",
            href: "/droits-obligations/droits/acces-documents-administratifs",
          },
          {
            labelKey: "droitsObligations.droits.aidesPrestations",
            href: "/droits-obligations/droits/aides-et-prestations",
          },
        ],
      },
      {
        labelKey: "droitsObligations.obligations.title",
        href: "/droits-obligations/obligations",
        links: [
          {
            labelKey: "droitsObligations.obligations.obligationsUsagers",
            href: "/droits-obligations/obligations/obligations-des-usagers",
          },
          {
            labelKey: "droitsObligations.obligations.declarationsObligatoires",
            href: "/droits-obligations/obligations/declarations-obligatoires",
          },
          {
            labelKey: "droitsObligations.obligations.echeancesAdministratives",
            href: "/droits-obligations/obligations/echeances-administratives",
          },
          {
            labelKey: "droitsObligations.obligations.sanctions",
            href: "/droits-obligations/obligations/sanctions",
          },
        ],
      },
      {
        labelKey: "droitsObligations.reglesProcedures.title",
        href: "/droits-obligations/regles-et-procedures",
        links: [
          {
            labelKey: "droitsObligations.reglesProcedures.reglesApplicables",
            href: "/droits-obligations/regles-et-procedures/regles-applicables",
          },
          {
            labelKey: "droitsObligations.reglesProcedures.proceduresAdministratives",
            href: "/droits-obligations/regles-et-procedures/procedures-administratives",
          },
          {
            labelKey: "droitsObligations.reglesProcedures.delaisReponse",
            href: "/droits-obligations/regles-et-procedures/delais-de-reponse",
          },
          {
            labelKey: "droitsObligations.reglesProcedures.voiesSaisine",
            href: "/droits-obligations/regles-et-procedures/voies-de-saisine",
          },
        ],
      },
      {
        labelKey: "droitsObligations.recoursReclamations.title",
        href: "/droits-obligations/recours-et-reclamations",
        links: [
          {
            labelKey: "droitsObligations.recoursReclamations.contesterDecision",
            href: "/droits-obligations/recours-et-reclamations/contester-une-decision",
          },
          {
            labelKey: "droitsObligations.recoursReclamations.defenseurDesDroits",
            href: "/droits-obligations/recours-et-reclamations/defenseur-des-droits",
          },
          {
            labelKey: "droitsObligations.recoursReclamations.deposerReclamation",
            href: "/droits-obligations/recours-et-reclamations/deposer-une-reclamation",
          },
          {
            labelKey: "droitsObligations.recoursReclamations.mediation",
            href: "/droits-obligations/recours-et-reclamations/mediation",
          },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "servicesPublics",
    href: sectionPaths.servicesPublics,
    leader: {
      titleKey: "servicesPublics.title",
      paragraphKey: "servicesPublics.text",
      link: {
        labelKey: "servicesPublics.allLink",
        href: sectionPaths.servicesPublics,
      },
    },
    primaryItems: [
      {
        labelKey: "servicesPublics.administrations.title",
        href: "/services-publics/administrations",
        links: [
          {
            labelKey: "servicesPublics.administrations.administrationsCentrales",
            href: "/services-publics/administrations/administrations-centrales",
          },
          {
            labelKey: "servicesPublics.administrations.servicesDeconcentres",
            href: "/services-publics/administrations/services-deconcentres",
          },
          {
            labelKey: "servicesPublics.administrations.collectivitesTerritoriales",
            href: "/services-publics/administrations/collectivites-territoriales",
          },
          {
            labelKey: "servicesPublics.administrations.autoritesIndependantes",
            href: "/services-publics/administrations/autorites-independantes",
          },
        ],
      },
      {
        labelKey: "servicesPublics.services.title",
        href: "/services-publics/services",
        links: [
          {
            labelKey: "servicesPublics.services.servicesProximite",
            href: "/services-publics/services/services-de-proximite",
          },
          {
            labelKey: "servicesPublics.services.guichetsAccueil",
            href: "/services-publics/services/guichets-et-accueils",
          },
          {
            labelKey: "servicesPublics.services.horairesCoordonnees",
            href: "/services-publics/services/horaires-et-coordonnees",
          },
          {
            labelKey: "servicesPublics.services.trouverService",
            href: "/services-publics/services/trouver-un-service",
          },
        ],
      },
      {
        labelKey: "servicesPublics.etablissementsPublics.title",
        href: "/services-publics/etablissements-publics",
        links: [
          {
            labelKey: "servicesPublics.etablissementsPublics.etablissementsNationaux",
            href: "/services-publics/etablissements-publics/etablissements-nationaux",
          },
          {
            labelKey: "servicesPublics.etablissementsPublics.operateursEtat",
            href: "/services-publics/etablissements-publics/operateurs-de-l-etat",
          },
          {
            labelKey: "servicesPublics.etablissementsPublics.education",
            href: "/services-publics/etablissements-publics/education",
          },
          {
            labelKey: "servicesPublics.etablissementsPublics.sante",
            href: "/services-publics/etablissements-publics/sante",
          },
        ],
      },
      {
        labelKey: "servicesPublics.servicesNumeriques.title",
        href: "/services-publics/services-numeriques",
        links: [
          {
            labelKey: "servicesPublics.servicesNumeriques.portailsTeleservices",
            href: "/services-publics/services-numeriques/portails-et-teleservices",
          },
          {
            labelKey: "servicesPublics.servicesNumeriques.identiteNumerique",
            href: "/services-publics/services-numeriques/identite-numerique",
          },
          {
            labelKey: "servicesPublics.servicesNumeriques.applicationsOfficielles",
            href: "/services-publics/services-numeriques/applications-officielles",
          },
          {
            labelKey: "servicesPublics.servicesNumeriques.donneesOuvertes",
            href: "/services-publics/services-numeriques/donnees-ouvertes",
          },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "vieQuotidienne",
    href: sectionPaths.vieQuotidienne,
    leader: {
      titleKey: "vieQuotidienne.title",
      paragraphKey: "vieQuotidienne.text",
      link: {
        labelKey: "vieQuotidienne.allLink",
        href: sectionPaths.vieQuotidienne,
      },
    },
    primaryItems: [
      {
        labelKey: "vieQuotidienne.familleEtatCivil.title",
        href: "/vie-quotidienne/famille-et-etat-civil",
        links: [
          {
            labelKey: "vieQuotidienne.familleEtatCivil.mariagePacs",
            href: "/vie-quotidienne/famille-et-etat-civil/mariage-pacs",
          },
          {
            labelKey: "vieQuotidienne.familleEtatCivil.naissance",
            href: "/vie-quotidienne/famille-et-etat-civil/naissance",
          },
          {
            labelKey: "vieQuotidienne.familleEtatCivil.etatCivil",
            href: "/vie-quotidienne/famille-et-etat-civil/etat-civil",
          },
          {
            labelKey: "vieQuotidienne.familleEtatCivil.succession",
            href: "/vie-quotidienne/famille-et-etat-civil/successions",
          },
        ],
      },
      {
        labelKey: "vieQuotidienne.travailEtudes.title",
        href: "/vie-quotidienne/travail-et-etudes",
        links: [
          {
            labelKey: "vieQuotidienne.travailEtudes.emploi",
            href: "/vie-quotidienne/travail-et-etudes/emploi",
          },
          {
            labelKey: "vieQuotidienne.travailEtudes.formationProfessionnelle",
            href: "/vie-quotidienne/travail-et-etudes/formation-professionnelle",
          },
          {
            labelKey: "vieQuotidienne.travailEtudes.scolarite",
            href: "/vie-quotidienne/travail-et-etudes/scolarite",
          },
          {
            labelKey: "vieQuotidienne.travailEtudes.enseignementSuperieur",
            href: "/vie-quotidienne/travail-et-etudes/enseignement-superieur",
          },
        ],
      },
      {
        labelKey: "vieQuotidienne.logementMobilite.title",
        href: "/vie-quotidienne/logement-et-mobilite",
        links: [
          {
            labelKey: "vieQuotidienne.logementMobilite.aidesLogement",
            href: "/vie-quotidienne/logement-et-mobilite/aides-au-logement",
          },
          {
            labelKey: "vieQuotidienne.logementMobilite.locationPropriete",
            href: "/vie-quotidienne/logement-et-mobilite/location-et-propriete",
          },
          {
            labelKey: "vieQuotidienne.logementMobilite.transportsDeplacements",
            href: "/vie-quotidienne/logement-et-mobilite/transports-et-deplacements",
          },
          {
            labelKey: "vieQuotidienne.logementMobilite.permisConduire",
            href: "/vie-quotidienne/logement-et-mobilite/permis-de-conduire",
          },
        ],
      },
      {
        labelKey: "vieQuotidienne.santeSolidarite.title",
        href: "/vie-quotidienne/sante-et-solidarite",
        links: [
          {
            labelKey: "vieQuotidienne.santeSolidarite.santeRemboursements",
            href: "/vie-quotidienne/sante-et-solidarite/sante-et-remboursements",
          },
          {
            labelKey: "vieQuotidienne.santeSolidarite.handicap",
            href: "/vie-quotidienne/sante-et-solidarite/handicap",
          },
          {
            labelKey: "vieQuotidienne.santeSolidarite.personnesAgees",
            href: "/vie-quotidienne/sante-et-solidarite/personnes-agees",
          },
          {
            labelKey: "vieQuotidienne.santeSolidarite.solidarite",
            href: "/vie-quotidienne/sante-et-solidarite/solidarite",
          },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "entreprises",
    href: sectionPaths.entreprises,
    leader: {
      titleKey: "entreprises.title",
      paragraphKey: "entreprises.text",
      link: {
        labelKey: "entreprises.allLink",
        href: sectionPaths.entreprises,
      },
    },
    primaryItems: [
      {
        labelKey: "entreprises.creationGestion.title",
        href: "/entreprises/creation-et-gestion",
        links: [
          {
            labelKey: "entreprises.creationGestion.creerEntreprise",
            href: "/entreprises/creation-et-gestion/creer-une-entreprise",
          },
          {
            labelKey: "entreprises.creationGestion.formesJuridiques",
            href: "/entreprises/creation-et-gestion/formes-juridiques",
          },
          {
            labelKey: "entreprises.creationGestion.formalitesImmatriculation",
            href: "/entreprises/creation-et-gestion/formalites-et-immatriculation",
          },
          {
            labelKey: "entreprises.creationGestion.cessationActivite",
            href: "/entreprises/creation-et-gestion/cessation-d-activite",
          },
        ],
      },
      {
        labelKey: "entreprises.fiscaliteComptabilite.title",
        href: "/entreprises/fiscalite-et-comptabilite",
        links: [
          {
            labelKey: "entreprises.fiscaliteComptabilite.impotsEntreprises",
            href: "/entreprises/fiscalite-et-comptabilite/impots-des-entreprises",
          },
          {
            labelKey: "entreprises.fiscaliteComptabilite.tva",
            href: "/entreprises/fiscalite-et-comptabilite/tva",
          },
          {
            labelKey: "entreprises.fiscaliteComptabilite.comptabilite",
            href: "/entreprises/fiscalite-et-comptabilite/comptabilite",
          },
          {
            labelKey: "entreprises.fiscaliteComptabilite.paiementImpots",
            href: "/entreprises/fiscalite-et-comptabilite/paiement-des-impots",
          },
        ],
      },
      {
        labelKey: "entreprises.employeurs.title",
        href: "/entreprises/employeurs",
        links: [
          {
            labelKey: "entreprises.employeurs.embaucherSalarie",
            href: "/entreprises/employeurs/embaucher-un-salarie",
          },
          {
            labelKey: "entreprises.employeurs.salaireCotisations",
            href: "/entreprises/employeurs/salaire-et-cotisations",
          },
          {
            labelKey: "entreprises.employeurs.contratsTravail",
            href: "/entreprises/employeurs/contrats-de-travail",
          },
          {
            labelKey: "entreprises.employeurs.santeSecuriteTravail",
            href: "/entreprises/employeurs/sante-et-securite-au-travail",
          },
        ],
      },
      {
        labelKey: "entreprises.aidesFinancement.title",
        href: "/entreprises/aides-et-financement",
        links: [
          {
            labelKey: "entreprises.aidesFinancement.aidesEntreprises",
            href: "/entreprises/aides-et-financement/aides-aux-entreprises",
          },
          {
            labelKey: "entreprises.aidesFinancement.financementsPublics",
            href: "/entreprises/aides-et-financement/financements-publics",
          },
          {
            labelKey: "entreprises.aidesFinancement.innovationRecherche",
            href: "/entreprises/aides-et-financement/innovation-et-recherche",
          },
          {
            labelKey: "entreprises.aidesFinancement.marchesPublics",
            href: "/entreprises/aides-et-financement/marches-publics",
          },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "organisations",
    href: sectionPaths.organisations,
    leader: {
      titleKey: "organisations.title",
      paragraphKey: "organisations.text",
      link: {
        labelKey: "organisations.allLink",
        href: sectionPaths.organisations,
      },
    },
    primaryItems: [
      {
        labelKey: "organisations.associations.title",
        href: "/organisations/associations",
        links: [
          {
            labelKey: "organisations.associations.creerAssociation",
            href: "/organisations/associations/creer-une-association",
          },
          {
            labelKey: "organisations.associations.declarationRecepisse",
            href: "/organisations/associations/declaration-et-recepisse",
          },
          {
            labelKey: "organisations.associations.gestionAdministration",
            href: "/organisations/associations/gestion-et-administration",
          },
          {
            labelKey: "organisations.associations.subventionsPubliques",
            href: "/organisations/associations/subventions-publiques",
          },
        ],
      },
      {
        labelKey: "organisations.fondations.title",
        href: "/organisations/fondations",
        links: [
          {
            labelKey: "organisations.fondations.creerFondation",
            href: "/organisations/fondations/creer-une-fondation",
          },
          {
            labelKey: "organisations.fondations.reconnaissanceUtilitePublique",
            href: "/organisations/fondations/reconnaissance-utilite-publique",
          },
          {
            labelKey: "organisations.fondations.gestionFondations",
            href: "/organisations/fondations/gestion-des-fondations",
          },
          {
            labelKey: "organisations.fondations.mecenatDons",
            href: "/organisations/fondations/mecenat-et-dons",
          },
        ],
      },
      {
        labelKey: "organisations.institutions.title",
        href: "/organisations/institutions",
        links: [
          {
            labelKey: "organisations.institutions.institutionsPubliques",
            href: "/organisations/institutions/institutions-publiques",
          },
          {
            labelKey: "organisations.institutions.ordresProfessionnels",
            href: "/organisations/institutions/ordres-professionnels",
          },
          {
            labelKey: "organisations.institutions.syndicats",
            href: "/organisations/institutions/syndicats",
          },
          {
            labelKey: "organisations.institutions.instancesConcertation",
            href: "/organisations/institutions/instances-de-concertation",
          },
        ],
      },
      {
        labelKey: "organisations.declarationsAgrements.title",
        href: "/organisations/declarations-et-agrements",
        links: [
          {
            labelKey: "organisations.declarationsAgrements.declarationsObligatoires",
            href: "/organisations/declarations-et-agrements/declarations-obligatoires",
          },
          {
            labelKey: "organisations.declarationsAgrements.agrementsHabilitations",
            href: "/organisations/declarations-et-agrements/agrements-et-habilitations",
          },
          {
            labelKey: "organisations.declarationsAgrements.labelsOfficiels",
            href: "/organisations/declarations-et-agrements/labels-officiels",
          },
          {
            labelKey: "organisations.declarationsAgrements.fondsPublics",
            href: "/organisations/declarations-et-agrements/access-aux-fonds-publics",
          },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "international",
    href: sectionPaths.international,
    leader: {
      titleKey: "international.title",
      paragraphKey: "international.text",
      link: {
        labelKey: "international.allLink",
        href: sectionPaths.international,
      },
    },
    primaryItems: [
      {
        labelKey: "international.etrangersImmigration.title",
        href: "/international/etrangers-et-immigration",
        links: [
          {
            labelKey: "international.etrangersImmigration.visas",
            href: "/international/etrangers-et-immigration/visas",
          },
          {
            labelKey: "international.etrangersImmigration.titresSejour",
            href: "/international/etrangers-et-immigration/titres-de-sejour",
          },
          {
            labelKey: "international.etrangersImmigration.nationalite",
            href: "/international/etrangers-et-immigration/nationalite",
          },
          {
            labelKey: "international.etrangersImmigration.asileProtection",
            href: "/international/etrangers-et-immigration/asile-et-protection",
          },
        ],
      },
      {
        labelKey: "international.astoriensEtranger.title",
        href: "/international/astoriens-a-l-etranger",
        links: [
          {
            labelKey: "international.astoriensEtranger.sInstallerEtranger",
            href: "/international/astoriens-a-l-etranger/s-installer-a-l-etranger",
          },
          {
            labelKey: "international.astoriensEtranger.travaillerEtranger",
            href: "/international/astoriens-a-l-etranger/travailler-a-l-etranger",
          },
          {
            labelKey: "international.astoriensEtranger.etudierEtranger",
            href: "/international/astoriens-a-l-etranger/etudier-a-l-etranger",
          },
          {
            labelKey: "international.astoriensEtranger.demenagerEtranger",
            href: "/international/astoriens-a-l-etranger/demenager-a-l-etranger",
          },
        ],
      },
      {
        labelKey: "international.servicesConsulaires.title",
        href: "/international/services-consulaires",
        links: [
          {
            labelKey: "international.servicesConsulaires.actesEtatCivil",
            href: "/international/services-consulaires/actes-etat-civil",
          },
          {
            labelKey: "international.servicesConsulaires.documentsConsulaires",
            href: "/international/services-consulaires/documents-consulaires",
          },
          {
            labelKey: "international.servicesConsulaires.assistanceRessortissants",
            href: "/international/services-consulaires/assistance-aux-ressortissants",
          },
          {
            labelKey: "international.servicesConsulaires.electionsEtranger",
            href: "/international/services-consulaires/elections-a-l-etranger",
          },
        ],
      },
      {
        labelKey: "international.representationsDiplomatiques.title",
        href: "/international/representations-diplomatiques",
        links: [
          {
            labelKey: "international.representationsDiplomatiques.ambassadesConsulats",
            href: "/international/representations-diplomatiques/ambassades-et-consulats",
          },
          {
            labelKey: "international.representationsDiplomatiques.trouverRepresentation",
            href: "/international/representations-diplomatiques/trouver-une-representation",
          },
          {
            labelKey: "international.representationsDiplomatiques.accreditations",
            href: "/international/representations-diplomatiques/accreditations",
          },
          {
            labelKey: "international.representationsDiplomatiques.communauteAstorienne",
            href: "/international/representations-diplomatiques/communaute-astorienne",
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