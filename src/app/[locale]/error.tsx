"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function LocaleError({ reset }: { reset: () => void }) {
  const t = useTranslations("error");

  return (
    <section className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="text-accent text-sm font-semibold uppercase tracking-widest">
        Trading House
      </p>
      <h1 className="mt-3 text-3xl font-bold text-ink">{t("title")}</h1>
      <p className="mx-auto mt-3 max-w-xl text-steel">{t("message")}</p>
      <Button
        type="button"
        className="mt-8 bg-accent text-white hover:bg-accent-hover"
        onClick={() => reset()}
      >
        {t("reset")}
      </Button>
    </section>
  );
}
