import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { CheckCircle2, MapPin, Languages } from 'lucide-react';

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

        {/* Right Column — Decorative Element */}
        <div className="md:col-span-2">
          <div className="bg-accent-light rounded-3xl p-8 flex flex-col items-center justify-center text-center min-h-[320px]">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
              <MapPin className="w-8 h-8 text-accent" />
            </div>
            <p className="text-accent font-bold text-xl mb-1">Berlin</p>
            <p className="text-steel text-sm">{t('locationDetail')}</p>
            <div className="mt-6 w-12 h-0.5 bg-accent/20 rounded-full" />
            <p className="mt-4 text-steel text-sm italic leading-relaxed max-w-[220px]">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
