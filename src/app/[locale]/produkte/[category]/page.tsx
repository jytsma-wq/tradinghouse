import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Cog, FlaskConical, Wheat, Building2, Factory, Cpu } from 'lucide-react';
import { notFound } from 'next/navigation';

const slugToKey: Record<string, string> = {
  maschinen: 'maschinen',
  chemie: 'chemie',
  agrar: 'agrar',
  baustoffe: 'baustoffe',
  'stahl-metalle': 'stahl',
  elektronik: 'elektronik',
};

const categoryIcons: Record<string, any> = {
  maschinen: Cog,
  chemie: FlaskConical,
  agrar: Wheat,
  baustoffe: Building2,
  stahl: Factory,
  elektronik: Cpu,
};

export function generateStaticParams() {
  return [
    { category: 'maschinen' },
    { category: 'chemie' },
    { category: 'agrar' },
    { category: 'baustoffe' },
    { category: 'stahl-metalle' },
    { category: 'elektronik' },
  ];
}

type Props = {
  params: Promise<{ locale: string; category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  const translationKey = slugToKey[category];
  if (!translationKey) {
    notFound();
  }

  const t = await getTranslations('products');
  const Icon = categoryIcons[translationKey] || Cog;

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 md:py-24">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href="/produkte"
          className="text-sm text-steel hover:text-accent transition-colors"
        >
          ← {t('title')}
        </Link>
      </nav>

      {/* Category Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-accent-light text-accent">
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <h1 className="font-bold text-4xl text-ink">
            {t(`categories.${translationKey}.title`)}
          </h1>
        </div>
      </div>

      {/* Description */}
      <p className="text-steel text-lg leading-relaxed mb-8">
        {t(`categories.${translationKey}.description`)}
      </p>

      {/* Sourcing Message */}
      <div className="bg-surface border border-mist rounded-xl p-8 mb-8">
        <h2 className="text-xl font-bold text-ink mb-3">
          Ich beschaffe für Sie
        </h2>
        <p className="text-steel leading-relaxed">
          {locale === 'de'
            ? `Sie suchen Produkte aus dem Bereich ${t(`categories.${translationKey}.title`)}? Ich beschaffe diese persönlich für Sie — von der Suche über die Qualitätsprüfung bis zur Lieferung. Kontaktieren Sie mich für ein unverbindliches Angebot.`
            : `Ви шукаєте продукцію з категорії ${t(`categories.${translationKey}.title`)}? Я особисто доставлю її для вас — від пошуку до перевірки якості та доставки. Зв'яжіться зі мною для безкоштовної пропозиції.`}
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/kontakt"
        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium px-6 py-3 rounded-lg transition-colors"
      >
        Kontakt aufnehmen
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
