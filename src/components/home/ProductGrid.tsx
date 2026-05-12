'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Cog,
  FlaskConical,
  Wheat,
  Building2,
  Factory,
  Cpu,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';

const iconMap: Record<string, LucideIcon> = {
  cog: Cog,
  'flask-conical': FlaskConical,
  wheat: Wheat,
  'building-2': Building2,
  factory: Factory,
  cpu: Cpu,
};

const categoryImages: Record<string, string> = {
  maschinen: '/images/industrial-products.jpg',
  chemie: '/images/warehouse.jpg',
  agrar: '/images/agriculture.jpg',
  baustoffe: '/images/construction-materials.jpg',
  stahl: '/images/warehouse.jpg',
  elektronik: '/images/industrial-products.jpg',
};

const categories = [
  'maschinen',
  'chemie',
  'agrar',
  'baustoffe',
  'stahl',
  'elektronik',
] as const;

const categoryRoutes: Record<string, string> = {
  maschinen: '/produkte/maschinen',
  chemie: '/produkte/chemie',
  agrar: '/produkte/agrar',
  baustoffe: '/produkte/baustoffe',
  stahl: '/produkte/stahl-metalle',
  elektronik: '/produkte/elektronik',
};

// ─── Tilt Card Wrapper ────────────────────────────────────────────────

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -6, y: x * 6 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: shouldReduceMotion
          ? 'none'
          : `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: shouldReduceMotion ? 'transform 0s' : 'transform 0.15s ease-out',
      }}
    >
      {children}
    </motion.div>
  );
}

export function ProductGrid() {
  const t = useTranslations();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section ref={ref} className="bg-surface-raised py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        {/* ─── Overline ──────────────────────────────────────────── */}
        <motion.p
          className="text-accent uppercase tracking-widest text-xs font-semibold text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('products.overline')}
        </motion.p>

        {/* ─── Title ─────────────────────────────────────────────── */}
        <motion.h2
          className="text-ink text-3xl font-bold text-center mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          {t('products.title')}
        </motion.h2>

        {/* ─── Subtitle ──────────────────────────────────────────── */}
        <motion.p
          className="text-steel text-center mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
        >
          {t('products.subtitle')}
        </motion.p>

        {/* ─── Grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {categories.map((key, index) => {
            const Icon = iconMap[t(`products.categories.${key}.icon`)] || Cog;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.1 + index * 0.07,
                      }
                }
              >
                <TiltCard className="h-full">
                  <Link
                    href={categoryRoutes[key]}
                    className="block bg-surface border border-mist rounded-xl overflow-hidden hover:shadow-lg hover:border-accent/30 transition-all duration-300 cursor-pointer group h-full"
                  >
                    {/* Category Image with parallax hover */}
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={categoryImages[key]}
                        alt={t(`products.categories.${key}.title`)}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={75}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent" />
                      {/* Icon badge — animated on hover */}
                      <motion.div
                        className="absolute bottom-3 left-3 flex items-center justify-center w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm text-accent"
                        whileHover={shouldReduceMotion ? undefined : { rotate: [0, -10, 10, 0] }}
                        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Title */}
                      <h3 className="font-semibold text-ink group-hover:text-accent transition-colors duration-300">
                        {t(`products.categories.${key}.title`)}
                      </h3>

                      {/* Description */}
                      <p className="text-steel text-sm mt-2">
                        {t(`products.categories.${key}.description`)}
                      </p>

                      {/* Arrow link — slides on hover */}
                      <div className="flex items-center gap-1.5 text-accent text-sm font-medium mt-4 group-hover:gap-2.5 transition-all duration-300">
                        {t('products.inquire')}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
