'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  const t = useTranslations();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative min-h-[90dvh] flex items-center bg-canvas overflow-hidden"
    >
      {/* ─── Background Hero Image with Overlay ──────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-trade.jpg"
          alt={t('home.hero.imageAlt')}
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/60 to-ink/30" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ─── Left: Text (60%) ─────────────────────────────────── */}
          <motion.div
            className="flex-1 lg:flex-[3] text-center lg:text-left"
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Overline */}
            <p className="text-accent-light tracking-widest text-xs uppercase font-semibold">
              {t('home.hero.greeting')}
            </p>

            {/* Main headline */}
            <h1
              className="text-white font-bold leading-tight tracking-tight mt-4"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              {t('home.hero.location')}
            </h1>

            {/* Bilingual line */}
            <p className="text-white/80 text-lg mt-4">
              {t('home.hero.bilingual')}
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-3 bg-accent text-white rounded-lg px-6 py-3 font-semibold transition-colors hover:bg-accent-hover active:scale-[0.98] duration-200 shadow-lg shadow-accent/25"
              >
                {t('home.hero.cta')}
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* ─── Right: Decorative Badge (40%) ──────────────────────── */}
          <motion.div
            className="flex-1 lg:flex-[2] flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div className="relative">
              {/* Glassmorphism card with flags */}
              <motion.div
                className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl flex items-center justify-center relative overflow-hidden backdrop-blur-md bg-white/10 border border-white/20"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Inner abstract shapes */}
                <div className="absolute top-6 left-6 w-20 h-20 rounded-2xl bg-white/5 rotate-6" />
                <div className="absolute bottom-8 right-8 w-16 h-16 rounded-xl bg-white/5 -rotate-12" />

                {/* Flags container */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl sm:text-6xl" role="img" aria-label="German flag">
                      🇩🇪
                    </span>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-0.5 bg-white/30 rounded-full" />
                      <div className="w-12 h-0.5 bg-white/50 rounded-full mt-1" />
                      <div className="w-8 h-0.5 bg-white/30 rounded-full mt-1" />
                    </div>
                    <span className="text-5xl sm:text-6xl" role="img" aria-label="Ukrainian flag">
                      🇺🇦
                    </span>
                  </div>
                  <p className="text-white font-semibold text-sm tracking-wide mt-2">
                    DE ↔ UA
                  </p>
                </div>
              </motion.div>

              {/* Floating accent dot */}
              <motion.div
                className="absolute -top-4 -right-4 w-6 h-6 bg-accent rounded-full"
                animate={{ y: [0, -6, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />

              {/* Secondary floating dot */}
              <motion.div
                className="absolute -bottom-3 -left-3 w-4 h-4 bg-warmth rounded-full"
                animate={{ y: [0, 8, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
