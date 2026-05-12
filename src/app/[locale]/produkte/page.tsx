import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { localizedPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import {
  Cog,
  FlaskConical,
  Wheat,
  Building2,
  Factory,
  Cpu,
  ArrowRight,
} from 'lucide-react';

const categoryConfig = [
  { key: 'maschinen', Icon: Cog, slug: 'maschinen' },
  { key: 'chemie', Icon: FlaskConical, slug: 'chemie' },
  { key: 'agrar', Icon: Wheat, slug: 'agrar' },
  { key: 'baustoffe', Icon: Building2, slug: 'baustoffe' },
  { key: 'stahl', Icon: Factory, slug: 'stahl-metalle' },
  { key: 'elektronik', Icon: Cpu, slug: 'elektronik' },
] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });

  return localizedPageMetadata({
    locale,
    path: '/produkte',
    title: t('title'),
    description: t('subtitle'),
  });
}

export default async function ProduktePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('products');

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-bold text-4xl text-ink">{t('title')}</h1>
        <p className="text-steel mt-2 text-lg">{t('subtitle')}</p>
      </div>

      {/* Product Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryConfig.map(({ key, Icon, slug }) => (
          <Link
            key={key}
            href={`/produkte/${slug}` as any}
            className="group block bg-surface border border-mist rounded-xl p-8 hover:shadow-lg hover:border-accent/30 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent-light text-accent mb-5">
              <Icon className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-ink mb-2">
              {t(`categories.${key}.title`)}
            </h2>
            <p className="text-steel text-sm leading-relaxed mb-6">
              {t(`categories.${key}.description`)}
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:gap-2.5 transition-all duration-200">
              {t('inquire')}
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
