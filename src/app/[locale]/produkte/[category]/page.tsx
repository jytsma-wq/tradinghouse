import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Cog, FlaskConical, Wheat, Building2, Factory, Cpu, type LucideIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { categoryRoutes, getCategoryBySlug } from '@/config/routes';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { absoluteUrl, breadcrumbJsonLd, localizedAlternates, localizedPath } from '@/lib/seo';

const categoryIcons: Record<string, LucideIcon> = {
  maschinen: Cog,
  chemie: FlaskConical,
  agrar: Wheat,
  baustoffe: Building2,
  stahl: Factory,
  elektronik: Cpu,
};

export function generateStaticParams() {
  return categoryRoutes.map(({ slug }) => ({ category: slug }));
}

type Props = {
  params: Promise<{ locale: string; category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  const route = getCategoryBySlug(category);

  if (!route) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'products' });
  const categoryTitle = t(`categories.${route.key}.title`);
  const title =
    locale === 'de'
      ? `${categoryTitle} importieren | ${siteConfig.name}`
      : `${categoryTitle} імпортувати | ${siteConfig.name}`;
  const description = t(`categories.${route.key}.description`);
  const path = localizedPath(locale, `/produkte/${route.slug}`);

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: localizedAlternates(path),
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: locale === 'de' ? 'de_DE' : 'uk_UA',
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  const route = getCategoryBySlug(category);
  if (!route) {
    notFound();
  }

  const t = await getTranslations('products');
  const tNav = await getTranslations('nav');
  const translationKey = route.key;
  const categoryTitle = t(`categories.${translationKey}.title`);
  const Icon = categoryIcons[translationKey] || Cog;
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: tNav('home'), url: absoluteUrl(localizedPath(locale)) },
    { name: t('title'), url: absoluteUrl(localizedPath(locale, '/produkte')) },
    {
      name: categoryTitle,
      url: absoluteUrl(localizedPath(locale, `/produkte/${route.slug}`)),
    },
  ]);

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">{tNav('home')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/produkte">{t('title')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{categoryTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Category Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-accent-light text-accent">
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <h1 className="font-bold text-4xl text-ink">
            {categoryTitle}
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
