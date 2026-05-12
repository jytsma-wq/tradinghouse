import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { localizedPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'datenschutz' });

  return localizedPageMetadata({
    locale,
    path: '/datenschutz',
    title: t('title'),
    description: t('subtitle'),
  });
}

export default async function DatenschutzPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('datenschutz');

  const sections = [
    { headingKey: 'controller', textKey: 'controllerText' },
    { headingKey: 'collection', textKey: 'collectionText' },
    { headingKey: 'contactForm', textKey: 'contactFormText' },
    { headingKey: 'emailProcessor', textKey: 'emailProcessorText' },
    { headingKey: 'cookies', textKey: 'cookiesText' },
    { headingKey: 'rights', textKey: 'rightsText' },
  ] as const;

  return (
    <section className="max-w-3xl mx-auto px-4 py-16 md:py-24">
      <h1 className="font-bold text-4xl text-ink mb-2">{t('title')}</h1>
      <p className="text-steel text-sm mb-10">{t('subtitle')}</p>

      <div className="space-y-8 text-steel">
        {sections.map(({ headingKey, textKey }) => (
          <div key={headingKey}>
            <h2 className="text-sm font-bold text-ink uppercase tracking-wider mb-2">
              {t(headingKey)}
            </h2>
            <p className="leading-relaxed">{t(textKey)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
