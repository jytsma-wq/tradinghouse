import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function LocaleNotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <section className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="text-accent text-sm font-semibold uppercase tracking-widest">
        Trading House
      </p>
      <h1 className="mt-3 text-4xl font-bold text-ink">404</h1>
      <p className="mt-3 text-2xl font-bold text-ink">{t("title")}</p>
      <p className="mx-auto mt-3 max-w-xl text-steel">{t("message")}</p>
      <Button asChild className="mt-8 bg-accent text-white hover:bg-accent-hover">
        <Link href="/">{t("home")}</Link>
      </Button>
    </section>
  );
}
