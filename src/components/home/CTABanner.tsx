'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

// Floating particles for visual depth
function FloatingParticle({
  delay,
  x,
  size,
  shouldReduceMotion,
}: {
  delay: number;
  x: string;
  size: number;
  shouldReduceMotion: boolean;
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-white/10"
      style={{ width: size, height: size, left: x }}
      animate={
        shouldReduceMotion
          ? { y: 0, opacity: 0.1, scale: 1 }
          : {
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 4 + delay,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            }
      }
    />
  );
}

export function CTABanner() {
  const t = useTranslations();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const shouldReduceMotion = useReducedMotion();

  const particles = [
    { delay: 0, x: '10%', size: 8 },
    { delay: 1, x: '25%', size: 5 },
    { delay: 2, x: '40%', size: 12 },
    { delay: 0.5, x: '55%', size: 6 },
    { delay: 1.5, x: '70%', size: 10 },
    { delay: 3, x: '85%', size: 7 },
    { delay: 2.5, x: '92%', size: 4 },
  ];

  return (
    <section ref={ref} className="relative py-16 md:py-24 overflow-hidden">
      {/* Background image with slow Ken Burns */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: shouldReduceMotion ? 1 : [1, 1.05, 1] }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 15, ease: 'linear', repeat: Infinity }}
        >
          <Image
            src="/images/warehouse.jpg"
            alt=""
            fill
            className="object-cover object-center"
            aria-hidden="true"
            sizes="100vw"
            quality={70}
          />
        </motion.div>
        {/* Overlay with accent color */}
        <div className="absolute inset-0 bg-accent/90" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-[1]">
        {particles.map((p, i) => (
          <FloatingParticle
            key={i}
            delay={p.delay}
            x={p.x}
            size={p.size}
            shouldReduceMotion={Boolean(shouldReduceMotion)}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        {/* ─── Title with blur reveal ─────────────────────────────── */}
        <motion.h2
          className="text-white text-2xl md:text-3xl font-bold"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 20, filter: 'blur(8px)' }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('home.ctaBanner.title')}
        </motion.h2>

        {/* ─── Subtitle ──────────────────────────────────────────── */}
        <motion.p
          className="text-white/80 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          {t('home.ctaBanner.subtitle')}
        </motion.p>

        {/* ─── CTA Button with bounce ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
          className="mt-8"
        >
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-2 bg-white text-accent rounded-lg px-8 py-3 font-semibold hover:bg-white/90 active:scale-[0.98] transition-all duration-200 shadow-lg"
          >
            <span>{t('home.ctaBanner.button')}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
