import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocaleParam } from "@/lib/localized-metadata";

type PageProps = { params: Promise<{ locale: string }> };

export default async function Page({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "nav.panel" });

  return (
    <div className="gov-section">
      <div className="gov-section__container gov-prose">
        <h1>{t("vieQuotidienne.familleEtatCivil.mariagePacs")}</h1>
      </div>
    </div>
  );
}
