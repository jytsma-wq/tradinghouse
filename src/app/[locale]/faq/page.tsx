import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/config/site";
import { localizedAlternates, localizedPath } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

type FaqItem = {
  question: string;
  answer: string;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  const title = `${t("title")} | ${siteConfig.name}`;
  const path = localizedPath(locale, "/faq");

  return {
    title: {
      absolute: title,
    },
    description: t("subtitle"),
    alternates: localizedAlternates(path),
    openGraph: {
      title,
      description: t("subtitle"),
      url: path,
      siteName: siteConfig.name,
      locale: locale === "de" ? "de_DE" : "uk_UA",
      type: "website",
    },
  };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("faq");
  const items = t.raw("items") as FaqItem[];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mb-10">
        <h1 className="font-bold text-4xl text-ink">{t("title")}</h1>
        <p className="text-steel mt-2 text-lg">{t("subtitle")}</p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {items.map((item, index) => (
          <AccordionItem
            key={item.question}
            value={`item-${index}`}
            className="rounded-xl border border-mist bg-surface px-5"
          >
            <AccordionTrigger className="text-left text-ink hover:text-accent">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-steel leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
