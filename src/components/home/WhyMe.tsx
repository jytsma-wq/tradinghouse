'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2, Languages, User, Truck, UserCheck } from 'lucide-react';

const whyConfig = [
  { key: 'bilingual' as const, Icon: Languages, color: 'bg-accent-light text-accent' },
  { key: 'personal' as const, Icon: User, color: 'bg-warmth-light text-warmth' },
  { key: 'customs' as const, Icon: Truck, color: 'bg-accent-light text-accent' },
  { key: 'single' as const, Icon: UserCheck, color: 'bg-warmth-light text-warmth' },
];

export function WhyMe() {
  const t = useTranslations();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section ref={ref} className="bg-surface-raised py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4">
        {/* ─── Overline ──────────────────────────────────────────── */}
        <motion.p
          className="text-accent uppercase tracking-widest text-xs font-semibold text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('home.whyOverline')}
        </motion.p>

        {/* ─── Title ─────────────────────────────────────────────── */}
        <motion.h2
          className="text-ink text-3xl font-bold text-center mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          {t('home.whyTitle')}
        </motion.h2>

        {/* ─── Items Grid — Cards with hover lift ────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
          {whyConfig.map(({ key, Icon, color }, index) => (
            <motion.div
              key={key}
              className="group bg-surface border border-mist rounded-xl p-6 hover:border-accent/30 hover:shadow-md transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.12 + index * 0.1,
                    }
              }
              whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start gap-4">
                {/* Animated icon badge */}
                <motion.div
                  className={`flex items-center justify-center w-11 h-11 rounded-xl ${color} shrink-0`}
                  whileHover={shouldReduceMotion ? undefined : { rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <div>
                  <p className="text-ink font-semibold group-hover:text-accent transition-colors duration-300">
                    {t(`home.whyItems.${key}`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
