import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Check, ArrowRight, Import, ArrowUpFromLine, Truck } from 'lucide-react';
import Image from 'next/image';

const serviceConfig = [
  { key: 'import', slug: 'import', Icon: Import, image: '/images/industrial-products.jpg' },
  { key: 'export', slug: 'export', Icon: ArrowUpFromLine, image: '/images/shipping-logistics.jpg' },
  { key: 'logistik', slug: 'logistik-zoll', Icon: Truck, image: '/images/warehouse.jpg' },
] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LeistungenPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('services');

  return (
    <section className="max-w-5xl mx-auto px-4 py-16 md:py-24">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-bold text-4xl text-ink">{t('title')}</h1>
        <p className="text-steel mt-2 text-lg">{t('subtitle')}</p>
      </div>

      {/* Service Cards — with images */}
      <div className="flex flex-col gap-8">
        {serviceConfig.map(({ key, slug, Icon, image }) => {
          const features = t.raw(`items.${key}.features`) as string[];

          return (
            <div
              key={key}
              className="bg-surface border border-mist rounded-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                {/* Image */}
                <div className="md:col-span-2 relative h-48 md:h-auto min-h-[200px]">
                  <Image
                    src={image}
                    alt={t(`items.${key}.title`)}
                    fill
                    className="object-cover"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/20 md:bg-gradient-to-l md:from-transparent md:to-surface/30" />
                </div>

                {/* Content */}
                <div className="md:col-span-3 p-6 md:p-8">
                  {/* Service Icon + Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-light text-accent">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-ink">
                      {t(`items.${key}.title`)}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-steel leading-relaxed mb-6">
                    {t(`items.${key}.description`)}
                  </p>

                  {/* Features List */}
                  {features && features.length > 0 && (
                    <ul className="space-y-2.5 mb-6">
                      {features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                          <span className="text-ink text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  <Link
                    href={`/leistungen/${slug}` as any}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all duration-200"
                  >
                    {t('learnMore')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
