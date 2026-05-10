# Task: Create 5 Homepage Components for Trading House Website

## Summary
Created all 5 homepage components as specified, plus fixed several existing issues in the project to make everything work correctly.

## Files Created

### 1. `/src/components/home/Hero.tsx`
- Asymmetric hero with text left (60%) / visual right (40%)
- Overline, headline, bilingual line, CTA button with arrow icon in circle
- Decorative DE-UA visual with flags, abstract shapes, floating animation dots
- framer-motion scroll-reveal with useInView
- Responsive: stacks vertically on mobile

### 2. `/src/components/home/ProductGrid.tsx`
- 3x2 grid of product categories (3 cols lg, 2 md, 1 sm)
- 6 categories: maschinen, chemie, agrar, baustoffe, stahl, elektronik
- Icon mapping from translation key to lucide-react icons
- Cards with hover effects, transition animations
- Links to /produkte/[category] routes

### 3. `/src/components/home/HowIWork.tsx`
- 3-step process section with numbered circles
- Dashed connecting lines between steps (horizontal desktop, vertical mobile)
- framer-motion staggered reveal animations

### 4. `/src/components/home/WhyMe.tsx`
- 4 trust items in 2x2 grid (md+), 1 col (sm)
- CheckCircle2 icons, clean layout without cards
- framer-motion fade-up animations

### 5. `/src/components/home/CTABanner.tsx`
- Full-width bg-accent section
- White text with CTA button (bg-white text-accent)
- ArrowRight icon in button
- framer-motion scroll-reveal

## Files Fixed

### `/src/components/layout/Header.tsx`
- Replaced `Export` icon import (doesn't exist in lucide-react) with `Upload`
- Replaced `Import` icon with `Download` for consistency

### `/src/components/layout/Footer.tsx`
- Fixed params issue: Footer doesn't receive params as a non-page component
- Used `getLocale()` from next-intl/server instead

### `/next.config.ts`
- Added `createNextIntlPlugin` from next-intl/plugin
- Required for next-intl v4 to work properly

### `/src/app/[locale]/layout.tsx`
- Added `getMessages()` and passed `locale` + `messages` to NextIntlClientProvider
- Moved font imports (DM_Sans, DM_Mono) from root layout to locale layout
- Now renders proper `<html>` and `<body>` tags with lang attribute

### `/src/app/layout.tsx`
- Simplified to just pass through children (no html/body tags)
- Avoids nested html/body tags

## Verification
- Both `/de` and `/uk` routes return HTTP 200
- All 5 components render correctly with translated content
- framer-motion animations are initialized (opacity:0 → animate on client)
- No lint errors in src/ directory
