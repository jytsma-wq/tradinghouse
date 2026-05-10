'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Cog,
  FlaskConical,
  Wheat,
  Building2,
  Factory,
  Cpu,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  cog: Cog,
  'flask-conical': FlaskConical,
  wheat: Wheat,
  'building-2': Building2,
  factory: Factory,
  cpu: Cpu,
};

const categories = [
  'maschinen',
  'chemie',
  'agrar',
  'baustoffe',
  'stahl',
  'elektronik',
] as const;

export function MarqueeTicker() {
  const t = useTranslations();

  // Duplicate the items for seamless loop
  const items = [...categories, ...categories];

  return (
    <div className="relative overflow-hidden bg-ink py-4">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-ink to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-ink to-transparent z-10" />

      <motion.div
        className="flex items-center gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 25,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {items.map((key, index) => {
          const Icon = iconMap[t(`products.categories.${key}.icon`)] || Cog;
          return (
            <div
              key={`${key}-${index}`}
              className="flex items-center gap-2.5 text-white/70 hover:text-accent-light transition-colors duration-300"
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wide">
                {t(`products.categories.${key}.title`)}
              </span>
              <span className="text-accent-light/40 ml-4">•</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
