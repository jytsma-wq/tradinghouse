'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const steps = ['step1', 'step2', 'step3'] as const;

export function HowIWork() {
  const t = useTranslations();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Parallax on the image
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="bg-canvas py-20 md:py-28 overflow-hidden">
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
          {/* Steps with animated connector */}
          <div className="flex-1 flex flex-col gap-0 relative">
            {/* Animated vertical connector line */}
            <motion.div
              className="absolute left-5 top-5 bottom-5 w-0.5 bg-accent/20 rounded-full origin-top"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />

            {steps.map((step, index) => (
              <motion.div
                key={step}
                className="flex items-start gap-5 relative"
                initial={{ opacity: 0, x: -24 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.15 + index * 0.2,
                }}
              >
                {/* Number circle — pulses when active */}
                <motion.div
                  className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-base shrink-0 mt-1 z-10 shadow-md shadow-accent/20"
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <motion.span
                    animate={isInView ? { scale: [0, 1.2, 1] } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.2 }}
                  >
                    {index + 1}
                  </motion.span>
                </motion.div>

                {/* Step content */}
                <motion.div
                  className="bg-surface border border-mist rounded-xl p-4 flex-1 group hover:border-accent/30 hover:shadow-md transition-all duration-300"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <h3 className="font-semibold text-ink group-hover:text-accent transition-colors">
                    {t(`home.howSteps.${step}.title`)}
                  </h3>
                  <p className="text-steel text-sm mt-1 leading-relaxed">
                    {t(`home.howSteps.${step}.description`)}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Image — Parallax scroll effect */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <motion.div style={{ y: imageY }}>
                <Image
                  src="/images/shipping-logistics.jpg"
                  alt={t('home.howImageAlt')}
                  width={1344}
                  height={768}
                  className="w-full h-auto object-cover scale-110"
                  quality={85}
                />
              </motion.div>
              {/* Gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-ink/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
