'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  const t = useTranslations();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative min-h-[90dvh] flex items-center bg-canvas overflow-hidden"
    >
      {/* ─── Background Hero Image with Ken Burns ────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.0 }}
          animate={{ scale: shouldReduceMotion ? 1 : 1.08 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }
          }
        >
          <Image
            src="/images/hero-trade.jpg"
            alt={t('home.hero.imageAlt')}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            quality={85}
          />
        </motion.div>
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/65 to-ink/35" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ─── Left: Text (60%) ─────────────────────────────────── */}
          <motion.div
            className="flex-1 lg:flex-[3] text-center lg:text-left"
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Overline with typing shimmer */}
            <motion.p
              className="text-accent-light tracking-widest text-xs uppercase font-semibold"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                animate={{ opacity: shouldReduceMotion ? 1 : [0.7, 1, 0.7] }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {t('home.hero.greeting')}
              </motion.span>
            </motion.p>

            {/* Main headline with staggered word reveal */}
            <h1
              className="text-white font-bold leading-tight tracking-tight mt-4"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              {t('home.hero.location').split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 30, filter: 'blur(8px)' }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.08 }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Bilingual line with fade-in */}
            <motion.p
              className="text-white/80 text-lg mt-4"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
            >
              {t('home.hero.bilingual')}
            </motion.p>

            {/* CTA Button with shine effect */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
            >
              <Link
                href="/kontakt"
                className="group relative inline-flex items-center gap-3 bg-accent text-white rounded-lg px-6 py-3 font-semibold transition-colors hover:bg-accent-hover active:scale-[0.98] duration-200 shadow-lg shadow-accent/25 overflow-hidden"
              >
                {/* Shine sweep on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative z-10">{t('home.hero.cta')}</span>
                <span className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-white/20">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 duration-200" />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* ─── Right: Decorative Badge with enhanced motion ────────── */}
          <motion.div
            className="flex-1 lg:flex-[2] flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div className="relative">
              {/* Glassmorphism card with flags */}
              <motion.div
                className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl flex items-center justify-center relative overflow-hidden backdrop-blur-md bg-white/10 border border-white/20"
                animate={{ y: shouldReduceMotion ? 0 : [0, -10, 0] }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 4,
                  repeat: shouldReduceMotion ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Rotating abstract ring */}
                <motion.div
                  className="absolute inset-4 rounded-2xl border border-white/10"
                  animate={{ rotate: shouldReduceMotion ? 0 : 360 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 30, repeat: Infinity, ease: 'linear' }}
                />

                {/* Inner abstract shapes — pulsing */}
                <motion.div
                  className="absolute top-6 left-6 w-20 h-20 rounded-2xl bg-white/5 rotate-6"
                  animate={shouldReduceMotion ? { opacity: 0.3, rotate: 6 } : { opacity: [0.3, 0.6, 0.3], rotate: [6, 10, 6] }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute bottom-8 right-8 w-16 h-16 rounded-xl bg-white/5 -rotate-12"
                  animate={shouldReduceMotion ? { opacity: 0.3, rotate: -12 } : { opacity: [0.3, 0.6, 0.3], rotate: [-12, -8, -12] }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                />

                {/* Flags container */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-4">
                    <motion.span
                      className="text-5xl sm:text-6xl"
                      role="img"
                      aria-label="German flag"
                      animate={{ scale: shouldReduceMotion ? 1 : [1, 1.05, 1] }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      🇩🇪
                    </motion.span>
                    <div className="flex flex-col items-center">
                      <motion.div
                        className="w-8 h-0.5 bg-white/30 rounded-full"
                        animate={{ scaleX: shouldReduceMotion ? 1 : [1, 1.3, 1] }}
                        transition={shouldReduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <motion.div
                        className="w-12 h-0.5 bg-white/50 rounded-full mt-1"
                        animate={{ scaleX: shouldReduceMotion ? 1 : [1, 1.2, 1] }}
                        transition={shouldReduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                      />
                      <motion.div
                        className="w-8 h-0.5 bg-white/30 rounded-full mt-1"
                        animate={{ scaleX: shouldReduceMotion ? 1 : [1, 1.3, 1] }}
                        transition={shouldReduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                      />
                    </div>
                    <motion.span
                      className="text-5xl sm:text-6xl"
                      role="img"
                      aria-label="Ukrainian flag"
                      animate={{ scale: shouldReduceMotion ? 1 : [1, 1.05, 1] }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    >
                      🇺🇦
                    </motion.span>
                  </div>
                  <motion.p
                    className="text-white font-semibold text-sm tracking-wide mt-2"
                    animate={{ opacity: shouldReduceMotion ? 1 : [0.7, 1, 0.7] }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    DE ↔ UA
                  </motion.p>
                </div>
              </motion.div>

              {/* Floating accent dot — orbital */}
              <motion.div
                className="absolute -top-4 -right-4 w-6 h-6 bg-accent rounded-full"
                animate={shouldReduceMotion ? { y: 0, scale: 1 } : { y: [0, -6, 0], scale: [1, 1.1, 1] }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />

              {/* Secondary floating dot — opposite phase */}
              <motion.div
                className="absolute -bottom-3 -left-3 w-4 h-4 bg-warmth rounded-full"
                animate={shouldReduceMotion ? { y: 0, scale: 1 } : { y: [0, 8, 0], scale: [1, 1.15, 1] }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />

              {/* Third decorative dot — orbiting */}
              <motion.div
                className="absolute top-1/2 -left-5 w-3 h-3 bg-accent-light rounded-full"
                animate={shouldReduceMotion ? { y: 0, x: 0 } : { y: [-12, 12, -12], x: [-3, 3, -3] }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Scroll indicator at bottom ──────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white/60"
            animate={{ y: shouldReduceMotion ? 0 : [0, 16, 0] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
