'use client';

import { useState, type KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, Link } from '@/i18n/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  Cog,
  FlaskConical,
  Wheat,
  Building2,
  Factory,
  Cpu,
  Download,
  Upload,
  Truck,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

// ─── Static data ───────────────────────────────────────────────────────────

const locales = [
  { code: 'de' as const, flag: '\u{1F1E9}\u{1F1EA}', label: 'DE' },
  { code: 'uk' as const, flag: '\u{1F1FA}\u{1F1E6}', label: 'UK' },
];

const productItems = [
  { key: 'maschinen', route: '/produkte/maschinen', Icon: Cog },
  { key: 'chemie', route: '/produkte/chemie', Icon: FlaskConical },
  { key: 'agrar', route: '/produkte/agrar', Icon: Wheat },
  { key: 'baustoffe', route: '/produkte/baustoffe', Icon: Building2 },
  { key: 'stahl', route: '/produkte/stahl-metalle', Icon: Factory },
  { key: 'elektronik', route: '/produkte/elektronik', Icon: Cpu },
] as const;

const serviceItems = [
  { key: 'import', route: '/leistungen/import', Icon: Download },
  { key: 'export', route: '/leistungen/export', Icon: Upload },
  { key: 'logistik', route: '/leistungen/logistik-zoll', Icon: Truck },
] as const;

// ─── Framer Motion variants ────────────────────────────────────────────────

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

const subItemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

// ─── External sub-components ───────────────────────────────────────────────

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative px-2 py-2 text-base font-medium transition-colors duration-200 hover:text-accent ${
        active ? 'text-accent' : 'text-steel'
      }`}
    >
      {label}
      {active && (
        <motion.span
          layoutId="activeNav"
          className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  );
}

function ProductDropdownItem({
  item,
}: {
  item: (typeof productItems)[number];
}) {
  const t = useTranslations();
  const { Icon } = item;
  return (
    <DropdownMenuItem asChild>
      <Link
        href={item.route}
        className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-ink transition-colors cursor-pointer hover:bg-accent-light focus:bg-accent-light focus:text-accent"
      >
        <span className="flex items-center justify-center w-8 h-8 rounded-md bg-accent-light text-accent">
          <Icon className="w-4 h-4" />
        </span>
        <span>{t(`products.categories.${item.key}.title`)}</span>
      </Link>
    </DropdownMenuItem>
  );
}

function ServiceDropdownItem({
  item,
}: {
  item: (typeof serviceItems)[number];
}) {
  const t = useTranslations();
  const { Icon } = item;
  return (
    <DropdownMenuItem asChild>
      <Link
        href={item.route}
        className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-ink transition-colors cursor-pointer hover:bg-accent-light focus:bg-accent-light focus:text-accent"
      >
        <span className="flex items-center justify-center w-8 h-8 rounded-md bg-accent-light text-accent">
          <Icon className="w-4 h-4" />
        </span>
        <span>{t(`services.items.${item.key}.title`)}</span>
      </Link>
    </DropdownMenuItem>
  );
}

// ─── Main Header Component ─────────────────────────────────────────────────

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLocale =
    locales.find(
      (l) =>
        pathname.startsWith(`/${l.code}`) ||
        (!pathname.startsWith('/uk') && l.code === 'de')
    ) || locales[0];

  function isActive(path: string): boolean {
    return pathname === path;
  }

  function isParentActive(parent: string): boolean {
    return pathname.startsWith(parent);
  }

  function handleDropdownTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.currentTarget.click();
    }
  }

  return (
    <>
      {/* ─── Sticky Header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-mist bg-canvas/85 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/75">
        {/* Top row: Logo centered, language & mobile on sides */}
        <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-3 pb-1 max-w-7xl">
          {/* Left spacer — balances language switcher */}
          <div className="flex-1 flex items-center">
            {/* Language Switcher (desktop) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden lg:flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-base font-medium text-steel transition-colors hover:text-accent hover:bg-accent-light outline-none">
                  <Globe className="w-4 h-4" />
                  <span>
                    {currentLocale.flag} {currentLocale.label}
                  </span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-36 p-1.5 bg-surface border-mist shadow-lg"
              >
                {locales.map((locale) => (
                  <DropdownMenuItem
                    key={locale.code}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                      currentLocale.code === locale.code
                        ? 'bg-accent-light text-accent font-semibold'
                        : 'text-ink hover:bg-accent-light hover:text-accent'
                    }`}
                    onSelect={() => {
                      router.replace(pathname, { locale: locale.code });
                    }}
                  >
                    <span className="text-base">{locale.flag}</span>
                    <span>{locale.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Center: Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="text-xl font-bold tracking-wider text-ink">
              TRADING HOUSE
            </span>
          </Link>

          {/* Right: Language (mobile) + Hamburger */}
          <div className="flex-1 flex items-center justify-end gap-2">
            {/* Language flag only on mobile/tablet */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="lg:hidden flex items-center gap-1 rounded-md px-2 py-1.5 text-base font-medium text-steel transition-colors hover:text-accent hover:bg-accent-light outline-none">
                  <Globe className="w-4 h-4" />
                  <span>{currentLocale.flag}</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-36 p-1.5 bg-surface border-mist shadow-lg"
              >
                {locales.map((locale) => (
                  <DropdownMenuItem
                    key={locale.code}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                      currentLocale.code === locale.code
                        ? 'bg-accent-light text-accent font-semibold'
                        : 'text-ink hover:bg-accent-light hover:text-accent'
                    }`}
                    onSelect={() => {
                      router.replace(pathname, { locale: locale.code });
                    }}
                  >
                    <span className="text-base">{locale.flag}</span>
                    <span>{locale.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-ink transition-colors hover:bg-accent-light hover:text-accent"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom row: Navigation centered under logo */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="hidden lg:flex items-center justify-center gap-2 pb-3">
            <NavLink href="/" label={t('nav.home')} active={isActive('/')} />

            {/* Produkte dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  onKeyDown={handleDropdownTriggerKeyDown}
                  className={`relative flex items-center gap-1 px-2 py-2 text-base font-medium transition-colors duration-200 hover:text-accent outline-none ${
                    isParentActive('/produkte') ? 'text-accent' : 'text-steel'
                  }`}
                >
                  {t('nav.products')}
                  <ChevronDown className="w-4 h-4 opacity-60" />
                  {isParentActive('/produkte') && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-64 p-2 bg-surface border-mist shadow-lg"
              >
                {productItems.map((item) => (
                  <ProductDropdownItem key={item.key} item={item} />
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Leistungen dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  onKeyDown={handleDropdownTriggerKeyDown}
                  className={`relative flex items-center gap-1 px-2 py-2 text-base font-medium transition-colors duration-200 hover:text-accent outline-none ${
                    isParentActive('/leistungen') ? 'text-accent' : 'text-steel'
                  }`}
                >
                  {t('nav.services')}
                  <ChevronDown className="w-4 h-4 opacity-60" />
                  {isParentActive('/leistungen') && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-56 p-2 bg-surface border-mist shadow-lg"
              >
                {serviceItems.map((item) => (
                  <ServiceDropdownItem key={item.key} item={item} />
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink href="/ueber-mich" label={t('nav.about')} active={isActive('/ueber-mich')} />
            <NavLink href="/kontakt" label={t('nav.contact')} active={isActive('/kontakt')} />
            <NavLink href="/faq" label={t('nav.faq')} active={isActive('/faq')} />
          </nav>
        </div>
      </header>

      {/* ─── Mobile Full-Screen Overlay ──────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-canvas"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            transition={{ duration: 0.2 }}
          >
            {/* Top bar with logo and close */}
            <div className="flex items-center justify-between px-4 sm:px-6 h-16 border-b border-mist">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2"
              >
                <span className="text-xl font-bold tracking-wider text-ink">
                  TRADING HOUSE
                </span>
              </Link>
              <button
                className="flex items-center justify-center w-10 h-10 rounded-md text-ink transition-colors hover:bg-accent-light hover:text-accent"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile nav links */}
            <motion.nav
              className="flex flex-col px-6 pt-6 pb-8 overflow-y-auto max-h-[calc(100vh-4rem)]"
              variants={containerVariants}
            >
              {/* Home */}
              <motion.div variants={itemVariants}>
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 text-xl font-medium transition-colors hover:text-accent ${
                    isActive('/') ? 'text-accent' : 'text-ink'
                  }`}
                >
                  {t('nav.home')}
                </Link>
              </motion.div>

              {/* Produkte */}
              <motion.div variants={itemVariants}>
                <div className="py-3 text-xl font-medium text-ink">
                  {t('nav.products')}
                </div>
                <div className="ml-4 flex flex-col border-l border-mist pl-4">
                  {productItems.map((item) => {
                    const { Icon } = item;
                    return (
                      <motion.div key={item.key} variants={subItemVariants}>
                        <Link
                          href={item.route}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 py-2.5 text-base font-medium transition-colors hover:text-accent ${
                            isActive(item.route) ? 'text-accent' : 'text-steel'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {t(`products.categories.${item.key}.title`)}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Leistungen */}
              <motion.div variants={itemVariants}>
                <div className="py-3 text-xl font-medium text-ink">
                  {t('nav.services')}
                </div>
                <div className="ml-4 flex flex-col border-l border-mist pl-4">
                  {serviceItems.map((item) => {
                    const { Icon } = item;
                    return (
                      <motion.div key={item.key} variants={subItemVariants}>
                        <Link
                          href={item.route}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 py-2.5 text-base font-medium transition-colors hover:text-accent ${
                            isActive(item.route) ? 'text-accent' : 'text-steel'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {t(`services.items.${item.key}.title`)}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* About */}
              <motion.div variants={itemVariants}>
                <Link
                  href="/ueber-mich"
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 text-xl font-medium transition-colors hover:text-accent ${
                    isActive('/ueber-mich') ? 'text-accent' : 'text-ink'
                  }`}
                >
                  {t('nav.about')}
                </Link>
              </motion.div>

              {/* Contact */}
              <motion.div variants={itemVariants}>
                <Link
                  href="/kontakt"
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 text-xl font-medium transition-colors hover:text-accent ${
                    isActive('/kontakt') ? 'text-accent' : 'text-ink'
                  }`}
                >
                  {t('nav.contact')}
                </Link>
              </motion.div>

              {/* FAQ */}
              <motion.div variants={itemVariants}>
                <Link
                  href="/faq"
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 text-xl font-medium transition-colors hover:text-accent ${
                    isActive('/faq') ? 'text-accent' : 'text-ink'
                  }`}
                >
                  {t('nav.faq')}
                </Link>
              </motion.div>

              {/* Language switcher */}
              <motion.div variants={itemVariants}>
                <DropdownMenuSeparator className="my-4" />
                <div className="flex items-center gap-3 py-3">
                  <Globe className="w-5 h-5 text-steel" />
                  <div className="flex gap-2">
                    {locales.map((locale) => (
                      <button
                        key={locale.code}
                        onClick={() => {
                          router.replace(pathname, { locale: locale.code });
                          setMobileOpen(false);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                          currentLocale.code === locale.code
                            ? 'bg-accent-light text-accent'
                            : 'text-steel hover:bg-accent-light hover:text-accent'
                        }`}
                      >
                        <span>{locale.flag}</span>
                        <span>{locale.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
