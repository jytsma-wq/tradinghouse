'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function CTABanner() {
  const t = useTranslations();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="relative py-16 md:py-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/warehouse.jpg"
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden="true"
          quality={70}
        />
        {/* Overlay with accent color */}
        <div className="absolute inset-0 bg-accent/90" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        {/* ─── Title ─────────────────────────────────────────────── */}
        <motion.h2
          className="text-white text-2xl md:text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('home.ctaBanner.title')}
        </motion.h2>

        {/* ─── Subtitle ──────────────────────────────────────────── */}
        <motion.p
          className="text-white/80 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          {t('home.ctaBanner.subtitle')}
        </motion.p>

        {/* ─── CTA Button ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
          className="mt-8"
        >
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-white text-accent rounded-lg px-8 py-3 font-semibold hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
          >
            {t('home.ctaBanner.button')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
