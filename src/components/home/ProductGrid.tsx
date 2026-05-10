'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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

export function ProductGrid() {
  const t = useTranslations();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-surface-raised py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        {/* ─── Overline ──────────────────────────────────────────── */}
        <motion.p
          className="text-accent uppercase tracking-widest text-xs font-semibold text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('products.overline')}
        </motion.p>

        {/* ─── Title ─────────────────────────────────────────────── */}
        <motion.h2
          className="text-ink text-3xl font-bold text-center mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          {t('products.title')}
        </motion.h2>

        {/* ─── Subtitle ──────────────────────────────────────────── */}
        <motion.p
          className="text-steel text-center mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
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
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1 + index * 0.07,
                }}
              >
                <Link
                  href={categoryRoutes[key]}
                  className="block bg-surface border border-mist rounded-xl overflow-hidden hover:shadow-md hover:border-accent/30 transition-all duration-300 cursor-pointer group"
                >
                  {/* Category Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={categoryImages[key]}
                      alt={t(`products.categories.${key}.title`)}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      quality={75}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                    {/* Icon badge */}
                    <div className="absolute bottom-3 left-3 flex items-center justify-center w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm text-accent">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Title */}
                    <h3 className="font-semibold text-ink">
                      {t(`products.categories.${key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-steel text-sm mt-2">
                      {t(`products.categories.${key}.description`)}
                    </p>

                    {/* Arrow link */}
                    <div className="flex items-center gap-1.5 text-accent text-sm font-medium mt-4 group-hover:gap-2.5 transition-all duration-300">
                      {t('products.inquire')}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
