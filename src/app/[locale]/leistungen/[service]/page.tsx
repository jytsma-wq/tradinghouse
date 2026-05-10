import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Check, ArrowRight, Import, ArrowUpFromLine, Truck } from 'lucide-react';
import { notFound } from 'next/navigation';

const slugToKey: Record<string, string> = {
  import: 'import',
  export: 'export',
  'logistik-zoll': 'logistik',
};

const serviceIcons: Record<string, any> = {
  import: Import,
  export: ArrowUpFromLine,
  logistik: Truck,
};

export function generateStaticParams() {
  return [
    { service: 'import' },
    { service: 'export' },
    { service: 'logistik-zoll' },
  ];
}

type Props = {
  params: Promise<{ locale: string; service: string }>;
};

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, service } = await params;
  setRequestLocale(locale);

  const translationKey = slugToKey[service];
  if (!translationKey) {
    notFound();
  }

  const t = await getTranslations('services');
  const Icon = serviceIcons[translationKey] || Truck;
  const features = t.raw(`items.${translationKey}.features`) as string[];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 md:py-24">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href="/leistungen"
          className="text-sm text-steel hover:text-accent transition-colors"
        >
          ← {t('title')}
        </Link>
      </nav>

      {/* Service Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-accent-light text-accent">
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <h1 className="font-bold text-4xl text-ink">
            {t(`items.${translationKey}.title`)}
          </h1>
        </div>
      </div>

      {/* Description */}
      <p className="text-steel text-lg leading-relaxed mb-8">
        {t(`items.${translationKey}.description`)}
      </p>

      {/* Features */}
      {features && features.length > 0 && (
        <div className="bg-surface border border-mist rounded-xl p-8 mb-8">
          <h2 className="text-lg font-bold text-ink mb-4">
            {locale === 'de' ? 'Was ich für Sie tue' : 'Що я роблю для вас'}
          </h2>
          <ul className="space-y-3">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-light text-accent mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-ink">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <Link
        href="/kontakt"
        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium px-6 py-3 rounded-lg transition-colors"
      >
        {locale === 'de' ? 'Jetzt anfragen' : 'Запитати зараз'}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
