'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const steps = ['step1', 'step2', 'step3'] as const;

export function HowIWork() {
  const t = useTranslations();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-canvas py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        {/* ─── Header ──────────────────────────────────────────────── */}
        <motion.p
          className="text-accent uppercase tracking-widest text-xs font-semibold text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('home.howOverline')}
        </motion.p>

        <motion.h2
          className="text-ink text-3xl font-bold text-center mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          {t('home.howTitle')}
        </motion.h2>

        {/* ─── Two-column: Steps + Image ───────────────────────────── */}
        <div className="mt-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Steps */}
          <div className="flex-1 flex flex-col gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                className="flex items-start gap-5"
                initial={{ opacity: 0, x: -24 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.15 + index * 0.15,
                }}
              >
                {/* Number circle */}
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-base shrink-0 mt-1">
                  {index + 1}
                </div>

                {/* Step content */}
                <div>
                  <h3 className="font-semibold text-ink">
                    {t(`home.howSteps.${step}.title`)}
                  </h3>
                  <p className="text-steel text-sm mt-1 leading-relaxed">
                    {t(`home.howSteps.${step}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image — Shipping / Logistics */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/shipping-logistics.jpg"
                alt={t('home.howImageAlt')}
                width={1344}
                height={768}
                className="w-full h-auto object-cover"
                quality={85}
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-ink/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
