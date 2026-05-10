'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = ['step1', 'step2', 'step3'] as const;

export function HowIWork() {
  const t = useTranslations();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-canvas py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4">
        {/* ─── Overline ──────────────────────────────────────────── */}
        <motion.p
          className="text-accent uppercase tracking-widest text-xs font-semibold text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          SO ARBEITE ICH
        </motion.p>

        {/* ─── Title ─────────────────────────────────────────────── */}
        <motion.h2
          className="text-ink text-3xl font-bold text-center mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          {t('home.howTitle')}
        </motion.h2>

        {/* ─── Steps ─────────────────────────────────────────────── */}
        <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-0">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              className="flex flex-col md:flex-row items-center flex-1"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15 + index * 0.15,
              }}
            >
              {/* Step content */}
              <div className="flex flex-col items-center text-center">
                {/* Number circle */}
                <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-ink mt-4">
                  {t(`home.howSteps.${step}.title`)}
                </h3>

                {/* Description */}
                <p className="text-steel text-sm mt-2 max-w-xs">
                  {t(`home.howSteps.${step}.description`)}
                </p>
              </div>

              {/* Connecting line (between steps, desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center w-full px-4 pt-0 self-start mt-6">
                  <div className="w-full border-t-2 border-dashed border-mist" />
                </div>
              )}

              {/* Connecting line (between steps, mobile only - vertical) */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex flex-col items-center my-2">
                  <div className="h-8 border-l-2 border-dashed border-mist" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
