import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { Check, ArrowRight, Import, ArrowUpFromLine, Truck, type LucideIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { getServiceBySlug, serviceRoutes } from '@/config/routes';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { absoluteUrl, breadcrumbJsonLd, localizedAlternates, localizedPath } from '@/lib/seo';

const serviceIcons: Record<string, LucideIcon> = {
  import: Import,
  export: ArrowUpFromLine,
  logistik: Truck,
};

export function generateStaticParams() {
  return serviceRoutes.map(({ slug }) => ({ service: slug }));
}

type Props = {
  params: Promise<{ locale: string; service: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, service } = await params;
  const route = getServiceBySlug(service);

  if (!route) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'services' });
  const serviceTitle = t(`items.${route.key}.title`);
  const description = t(`items.${route.key}.description`);
  const title = `${serviceTitle} | ${siteConfig.name}`;
  const path = localizedPath(locale, `/leistungen/${route.slug}`);

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

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, service } = await params;
  setRequestLocale(locale);

  const route = getServiceBySlug(service);
  if (!route) {
    notFound();
  }

  const t = await getTranslations('services');
  const tNav = await getTranslations('nav');
  const translationKey = route.key;
  const serviceTitle = t(`items.${translationKey}.title`);
  const Icon = serviceIcons[translationKey] || Truck;
  const features = t.raw(`items.${translationKey}.features`) as string[];
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: tNav('home'), url: absoluteUrl(localizedPath(locale)) },
    { name: t('title'), url: absoluteUrl(localizedPath(locale, '/leistungen')) },
    {
      name: serviceTitle,
      url: absoluteUrl(localizedPath(locale, `/leistungen/${route.slug}`)),
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
              <Link href="/leistungen">{t('title')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{serviceTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Service Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-accent-light text-accent">
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <h1 className="font-bold text-4xl text-ink">
            {serviceTitle}
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
