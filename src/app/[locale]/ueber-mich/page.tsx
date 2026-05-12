import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { CheckCircle2, MapPin, Languages } from 'lucide-react';
import Image from 'next/image';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function UeberMichPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');

  const ctItems = [
    { key: 'bilingual' as const },
    { key: 'personal' as const },
    { key: 'customs' as const },
    { key: 'single' as const },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-start">
        {/* Left Column — Text Content */}
        <div className="md:col-span-3">
          {/* Overline */}
          <p className="text-accent uppercase tracking-widest text-xs font-semibold">
            {t('subtitle')}
          </p>

          {/* Title */}
          <h1 className="font-bold text-4xl text-ink mt-3">{t('title')}</h1>

          {/* Story */}
          <p className="text-steel text-lg mt-6 leading-relaxed">
            {t('story')}
          </p>

          {/* Approach */}
          <p className="text-steel mt-4 leading-relaxed">{t('approach')}</p>

          {/* What sets me apart */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-ink mb-4">{t('ctLabel')}</h2>
            <ul className="space-y-3">
              {ctItems.map(({ key }) => (
                <li key={key} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-ink">{t(`ctItems.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div className="mt-8 flex items-center gap-3">
            <Languages className="w-5 h-5 text-steel shrink-0" />
            <div>
              <span className="font-semibold text-ink">{t('languages')}: </span>
              <span className="text-steel">{t('languageList')}</span>
            </div>
          </div>

          {/* Location */}
          <div className="mt-4 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-steel shrink-0" />
            <div>
              <span className="font-semibold text-ink">{t('location')}: </span>
              <span className="text-steel">{t('locationDetail')}</span>
            </div>
          </div>
        </div>

        {/* Right Column — Portrait Photo */}
        <div className="md:col-span-2">
          <div className="relative">
            {/* Portrait image */}
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/aleksandr-portrait.jpg"
                alt={t('portraitAlt')}
                width={864}
                height={1152}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                quality={90}
              />
            </div>

            {/* Decorative accent bar below image */}
            <div className="mt-4 flex items-center gap-3">
              <div className="h-1 w-12 bg-accent rounded-full" />
              <p className="text-ink font-semibold text-sm">Aleksandr</p>
            </div>

            {/* Location badge */}
            <div className="mt-3 flex items-center gap-2 bg-accent-light rounded-xl px-4 py-3">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <div>
                <p className="text-accent font-bold text-sm">Berlin</p>
                <p className="text-steel text-xs">{t('locationDetail')}</p>
              </div>
            </div>

            {/* Floating decorative dot */}
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-warmth rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
