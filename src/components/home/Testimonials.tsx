"use client";

import { useTranslations } from "next-intl";

const testimonials = [
  // TODO: replace with real quotes
  {
    company: "Industrie Partner GmbH",
    country: "Deutschland",
    quote:
      "Trading House hat unsere Anfrage strukturiert aufgenommen und die nächsten Schritte klar vorbereitet.",
  },
  // TODO: replace with real quotes
  {
    company: "Agro Supply LLC",
    country: "Україна",
    quote:
      "Комунікація була зрозумілою, а процес пошуку постачальників - прозорим і практичним.",
  },
  // TODO: replace with real quotes
  {
    company: "Build Trade Group",
    country: "DE / UA",
    quote:
      "Ein persönlicher Ansprechpartner für Beschaffung, Dokumente und Logistik macht den Prozess deutlich einfacher.",
  },
];

export function Testimonials() {
  const t = useTranslations("home.testimonials");

  return (
    <section className="bg-canvas py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-accent uppercase tracking-widest text-xs font-semibold text-center">
          {t("overline")}
        </p>
        <h2 className="text-ink text-3xl font-bold text-center mt-2">
          {t("title")}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.company}
              className="rounded-xl border border-mist bg-surface p-6"
            >
              <p className="text-steel leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="mt-5 border-t border-mist pt-4">
                <p className="font-semibold text-ink">{testimonial.company}</p>
                <p className="text-sm text-steel">{testimonial.country}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
