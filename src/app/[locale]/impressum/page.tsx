import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/config/site';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('impressum');

  return (
    <section className="max-w-3xl mx-auto px-4 py-16 md:py-24">
      <h1 className="font-bold text-4xl text-ink mb-2">{t('title')}</h1>
      <p className="text-steel text-sm mb-10">{t('subtitle')}</p>

      <div className="space-y-8 text-steel">
        {/* Owner */}
        <div>
          <h2 className="text-sm font-bold text-ink uppercase tracking-wider mb-2">
            {t('owner')}
          </h2>
          <p>Trading House</p>
        </div>

        {/* Address */}
        <div>
          <h2 className="text-sm font-bold text-ink uppercase tracking-wider mb-2">
            {t('address')}
          </h2>
          <p>
            {siteConfig.address.street}
            <br />
            {siteConfig.address.zip} {siteConfig.address.city}
            <br />
            {siteConfig.address.country}
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-sm font-bold text-ink uppercase tracking-wider mb-2">
            {t('contact')}
          </h2>
          <div className="space-y-1">
            <p>
              {t('email')}: <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">{siteConfig.email}</a>
            </p>
            <p>
              {t('phone')}: <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="text-accent hover:underline">{siteConfig.phone}</a>
            </p>
          </div>
        </div>

        {/* VAT */}
        <div>
          <h2 className="text-sm font-bold text-ink uppercase tracking-wider mb-2">
            {t('vat')}
          </h2>
          <p>{t('vatValue')}</p>
        </div>

        {/* Responsible */}
        <div>
          <h2 className="text-sm font-bold text-ink uppercase tracking-wider mb-2">
            {t('responsible')}
          </h2>
          <p>Trading House, {siteConfig.address.city}</p>
        </div>

        {/* Disclaimer */}
        <div>
          <h2 className="text-sm font-bold text-ink uppercase tracking-wider mb-2">
            {t('disclaimer')}
          </h2>
          <p className="leading-relaxed">{t('disclaimerText')}</p>
        </div>
      </div>
    </section>
  );
}
