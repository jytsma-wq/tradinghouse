import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/config/site';
import { localizedPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';
import { InquiryForm } from '@/components/contact/InquiryForm';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return localizedPageMetadata({
    locale,
    path: '/kontakt',
    title: t('title'),
    description: t('subtitle'),
  });
}

export default async function KontaktPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contact');
  const address = `${siteConfig.address.street}, ${siteConfig.address.zip} ${siteConfig.address.city}, ${siteConfig.address.country}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 md:py-24">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-bold text-4xl text-ink">{t('title')}</h1>
        <p className="text-steel mt-2 text-lg">{t('subtitle')}</p>
      </div>

      {/* Two columns: Form + Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Left — Form */}
        <div className="md:col-span-3">
          <InquiryForm />
        </div>

        {/* Right — Contact Info */}
        <div className="md:col-span-2">
          <h2 className="text-lg font-bold text-ink mb-6">{t('direct')}</h2>

          <div className="space-y-5">
            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-light text-accent shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-steel">{t('info.emailLabel')}</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-ink font-medium hover:text-accent transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-light text-accent shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-steel">{t('info.phoneLabel')}</p>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="text-ink font-medium hover:text-accent transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            {/* Response Time */}
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-light text-accent shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-ink font-medium">{t('response')}</p>
              </div>
            </div>

            {/* Address + Map */}
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-light text-accent shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-steel">
                  {t('info.addressLabel')}
                </p>
                <p className="text-ink font-medium">{address}</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-mist bg-surface">
              <iframe
                src={mapSrc}
                title={t('info.mapTitle')}
                loading="lazy"
                className="h-64 w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
