import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedAlternates, resolveLocaleParam } from "@/lib/localized-metadata";
import { primaryNavigation, searchPath } from "@/lib/site-structure";
import {
  HOME_PATH,
  categoryIcons,
  homeAdministrationLinks,
  homeDigitalServices,
  homeQuickAccess,
  homeSearchSuggestions,
  homeUsefulInfo,
} from "@/lib/home-content";
import { PortalSearchBar } from "@/components/public/search/portal-search-bar";
import { SearchSuggestionTag } from "@/components/public/content/ads-fragments";

const HOME_PATH_LOCALE = HOME_PATH;

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);

  const tHome = await getTranslations({ locale, namespace: "home" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  return {
    title: { absolute: tHome("metaTitle") },
    description: tMeta("description"),
    ...localizedAlternates(locale, HOME_PATH_LOCALE),
  };
}

/* Layout helpers below use the ADS design tokens through `var(--ads-*)` (the
 * single source of tokens — main.css) so light/dark switching and theming stay
 * owned by the Design System. Only the portal-specific arrangement of these
 * blocks is expressed here, inline, without any local stylesheet — same
 * convention as the reference page (`apps/test/page.tsx`). */

const heroContainerStyle: CSSProperties = {
  maxWidth: "52rem",
  marginInline: "auto",
  textAlign: "center",
};

const teaserCardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  height: "100%",
  padding: "1.25rem",
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
  borderTop: "3px solid var(--ads-color-primary)",
  textDecoration: "none",
  color: "var(--ads-color-text)",
};

const teaserTextStackStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.375rem",
};

const teaserTitleStyle: CSSProperties = {
  display: "block",
  fontSize: "1.0625rem",
  lineHeight: 1.35,
  fontWeight: 700,
};

const teaserDescStyle: CSSProperties = {
  display: "block",
  fontSize: "0.875rem",
  lineHeight: 1.55,
  color: "var(--ads-color-text-muted)",
};

const teaserArrowStyle: CSSProperties = {
  marginTop: "auto",
  alignSelf: "flex-end",
  fontSize: "1rem",
  color: "var(--ads-color-primary)",
};

const teaserIconStyle: CSSProperties = {
  fontSize: "1.375rem",
  lineHeight: 1,
  color: "var(--ads-color-primary)",
};

const noticeCardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.375rem",
  height: "100%",
  padding: "1.25rem",
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
  borderLeft: "3px solid var(--ads-color-primary)",
  textDecoration: "none",
  color: "var(--ads-color-text)",
};

const suggestionsLabelStyle: CSSProperties = {
  margin: "1.25rem 0 0",
  fontSize: "0.875rem",
  lineHeight: 1.5,
  color: "var(--ads-color-text-muted)",
};

const suggestionListStyle: CSSProperties = {
  listStyle: "none",
  margin: "0.75rem 0 0",
  padding: "0",
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  justifyContent: "center",
};

const rowLinkStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  padding: "1rem 1.25rem",
  fontWeight: 600,
  textDecoration: "none",
  color: "var(--ads-color-text)",
  border: "1px solid var(--ads-color-border)",
  borderTop: "none",
  background: "var(--ads-color-background)",
};

const noteStyle: CSSProperties = {
  margin: "1.25rem 0 0",
  fontSize: "0.8125rem",
  lineHeight: 1.5,
  color: "var(--ads-color-text-muted)",
};

/**
 * Homepage of the Service Public portal of the Republic of Astoria.
 *
 * The page is an *orientation* layer — the unified access point to the public
 * services:
 *
 *   01 Hero                — the search, the entry point of the portal
 *   02 Accès rapides       — the main intentions (faire, trouver, comprendre)
 *   03 Explorer            — the seven categories of the header taxonomy
 *   04 Annuaire            — finding an administration
 *   05 Services numériques — the State's online services
 *   06 Informations utiles — short notices useful for the procedures
 *
 * Every section is driven by `@/lib/home-content` (demonstration data, later a
 * government API) and the `home.*` message catalogs. The seven categories are
 * the header taxonomy (`primaryNavigation`): they never appear as a second
 * navigation, and every card links to the landing page of its header section.
 */
export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });
  const tPrimaryNav = await getTranslations({ locale, namespace: "nav.primary" });

  return (
    <>
      {/* 01 — Hero: the search is the most important function of the portal.
          Centred like the reference hero; the query goes to the portal search. */}
      <section className="gov-section" aria-labelledby="home-hero-title">
        <div className="gov-section__container" style={heroContainerStyle}>
          <p className="gov-kicker">{t("hero.kicker")}</p>
          <h1 id="home-hero-title">{t("hero.title")}</h1>
          <p className="gov-lead" style={{ marginBottom: "1.5rem", marginInline: "auto", maxWidth: "36rem" }}>
            {t("hero.lead")}
          </p>
          <div style={{ maxWidth: "42rem", marginInline: "auto" }}>
            <PortalSearchBar
              label={t("hero.searchLabel")}
              placeholder={t("hero.searchPlaceholder")}
            />
          </div>
          <p style={suggestionsLabelStyle} id="home-search-suggestions-label">
            {t("hero.suggestionsLabel")}
          </p>
          <ul style={suggestionListStyle} aria-labelledby="home-search-suggestions-label">
            {homeSearchSuggestions.map((suggestion) => (
              <li key={suggestion.key}>
                <SearchSuggestionTag
                  label={t(`hero.suggestions.${suggestion.key}`)}
                  href={`${searchPath}?q=${encodeURIComponent(suggestion.query)}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 02 — Accès rapides: the four main intentions, directly reachable. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="quick-access-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("quickAccess.kicker")}</p>
              <h2 id="quick-access-title" className="gov-section__title">
                {t("quickAccess.title")}
              </h2>
              <p className="gov-lead">{t("quickAccess.lead")}</p>
            </div>
          </div>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list">
            {homeQuickAccess.map((item) => (
              <li key={item.key} className="fr-col-12 fr-col-sm-6 fr-col-lg-3">
                <a href={item.href} style={teaserCardStyle}>
                  <span className={item.iconId} aria-hidden="true" style={teaserIconStyle} />
                  <span style={teaserTextStackStyle}>
                    <span style={teaserTitleStyle}>
                      {t(`quickAccess.items.${item.key}.title`)}
                    </span>
                    <span style={teaserDescStyle}>
                      {t(`quickAccess.items.${item.key}.desc`)}
                    </span>
                  </span>
                  <span
                    className="fr-icon-arrow-right-line"
                    aria-hidden="true"
                    style={teaserArrowStyle}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 — Explorer les services publics: the header taxonomy, directly
          reachable from the page. No second navigation: each card is the
          landing page of its header section. */}
      <section className="gov-section" aria-labelledby="categories-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("categories.kicker")}</p>
              <h2 id="categories-title" className="gov-section__title">
                {t("categories.title")}
              </h2>
              <p className="gov-lead">{t("categories.lead")}</p>
            </div>
          </div>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list">
            {primaryNavigation.map((section) => (
              <li key={section.labelKey} className="fr-col-12 fr-col-md-6 fr-col-lg-4">
                <a href={section.href} style={teaserCardStyle}>
                  <span
                    className={categoryIcons[section.labelKey]}
                    aria-hidden="true"
                    style={teaserIconStyle}
                  />
                  <span style={teaserTextStackStyle}>
                    <span style={teaserTitleStyle}>{tPrimaryNav(section.labelKey)}</span>
                    <span style={teaserDescStyle}>
                      {t(`categories.items.${section.labelKey}.desc`)}
                    </span>
                  </span>
                  <span
                    className="fr-icon-arrow-right-line"
                    aria-hidden="true"
                    style={teaserArrowStyle}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 — Annuaire des administrations: a dedicated entry point to find
          who provides the service. Same search engine as the hero, presented
          here in its compact variant. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="admin-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("admin.kicker")}</p>
              <h2 id="admin-title" className="gov-section__title">
                {t("admin.title")}
              </h2>
              <p className="gov-lead">{t("admin.lead")}</p>
            </div>
          </div>
          <div style={{ maxWidth: "40rem", marginBottom: "2rem" }}>
            <PortalSearchBar
              big={false}
              label={t("admin.searchLabel")}
              placeholder={t("admin.searchPlaceholder")}
            />
          </div>
          <p
            style={{ margin: "0 0 0.75rem", fontSize: "0.875rem", color: "var(--ads-color-text-muted)" }}
            id="admin-links-label"
          >
            {t("admin.linksLabel")}
          </p>
          <ul
            role="list"
            style={{ listStyle: "none", margin: "0", padding: "0", maxWidth: "72rem" }}
            aria-labelledby="admin-links-label"
          >
            {homeAdministrationLinks.map((link) => (
              <li key={link.key}>
                <a href={link.href} style={rowLinkStyle}>
                  {t(`admin.links.${link.key}`)}
                  <span className="fr-icon-arrow-right-line" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 — Services numériques: representative online services. Catalogue de
          démonstration until the official digital-services register is wired. */}
      <section className="gov-section" aria-labelledby="digital-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("digital.kicker")}</p>
              <h2 id="digital-title" className="gov-section__title">
                {t("digital.title")}
              </h2>
              <p className="gov-lead">{t("digital.lead")}</p>
            </div>
          </div>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list">
            {homeDigitalServices.map((item) => (
              <li key={item.key} className="fr-col-12 fr-col-md-6 fr-col-lg-4">
                <a href={item.href} style={teaserCardStyle}>
                  <span className={item.iconId} aria-hidden="true" style={teaserIconStyle} />
                  <span style={teaserTextStackStyle}>
                    <span style={teaserTitleStyle}>
                      {t(`digital.items.${item.key}.title`)}
                    </span>
                    <span style={teaserDescStyle}>
                      {t(`digital.items.${item.key}.desc`)}
                    </span>
                  </span>
                  <span
                    className="fr-icon-arrow-right-line"
                    aria-hidden="true"
                    style={teaserArrowStyle}
                  />
                </a>
              </li>
            ))}
          </ul>
          <p style={noteStyle}>{t("digital.note")}</p>
        </div>
      </section>

      {/* 06 — Informations utiles: short notices directly useful for accessing
          the services. Not a news feed — general communication belongs to
          info.gouv.aor. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="info-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("info.kicker")}</p>
              <h2 id="info-title" className="gov-section__title">
                {t("info.title")}
              </h2>
              <p className="gov-lead">{t("info.lead")}</p>
            </div>
          </div>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list">
            {homeUsefulInfo.map((item) => (
              <li key={item.key} className="fr-col-12 fr-col-md-6">
                <a href={item.href} style={noticeCardStyle}>
                  <span className={item.iconId} aria-hidden="true" style={teaserIconStyle} />
                  <span style={teaserTitleStyle}>{t(`info.items.${item.key}.title`)}</span>
                  <span style={teaserDescStyle}>{t(`info.items.${item.key}.desc`)}</span>
                </a>
              </li>
            ))}
          </ul>
          <p style={noteStyle}>{t("info.note")}</p>
        </div>
      </section>
    </>
  );
}