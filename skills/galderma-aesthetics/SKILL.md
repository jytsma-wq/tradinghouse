---
name: galderma-aesthetics
description: >
  Design skill that captures the visual DNA of Galderma Aesthetics (galdermaaesthetics.com) — a premium medical aesthetics
  brand with a clinical-luxury design language. Use this skill whenever building UI for medical aesthetics, dermatology,
  cosmetic treatments, pharma, healthcare, or any project that needs a trustworthy, sophisticated, clinical-luxury aesthetic.
  Also trigger when the user mentions "Galderma style", "medical aesthetics UI", "clinical premium design", "pharma landing page",
  or wants a calm, authoritative, science-forward visual language. This skill encodes the specific color tokens, typography rules,
  component patterns, spacing system, anti-patterns, and motion guidelines extracted from the live site and brand identity.
---

# Galderma Aesthetics — Design Skill

This skill distills the complete design system of Galderma Aesthetics into portable rules an AI agent can apply. It covers colors, typography, spatial design, components, imagery, motion, and anti-patterns — everything needed to produce UI that authentically matches the Galderma clinical-luxury aesthetic.

The Galderma visual language sits at the intersection of **medical authority** and **accessible beauty**: it communicates scientific rigor without feeling cold, and premium quality without feeling exclusive. Every design decision should reinforce that balance.

---

## Brand Personality

Five words that anchor every visual choice:

1. **Trustworthy** — Clean layouts, generous whitespace, restrained color. Nothing flashy or gimmicky.
2. **Professional** — Structured grids, consistent spacing, considered typography. No casual or playful elements.
3. **Scientific** — Precise alignments, data-conscious hierarchy, clinical image treatment. Evidence over decoration.
4. **Sophisticated** — Premium typography, refined color palettes, subtle motion. Luxury without ostentation.
5. **Patient-centric** — Warm photography, approachable copy, reassuring tone. Clinical but never intimidating.

---

## Color System

### Core Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#000000` | Primary headings, dark sections, primary buttons |
| `--color-white` | `#FFFFFF` | Page backgrounds, text on dark sections |
| `--color-accent-blue` | `#0066CC` | CTAs, links, interactive highlights |
| `--color-accent-blue-hover` | `#0052A3` | Hover state for blue interactive elements |
| `--color-surface-light` | `#F8F8F8` | Alternating section backgrounds, card surfaces |
| `--color-surface-subtle` | `#F4F4F4` | Subtle background differentiation |
| `--color-surface-warm` | `#F9FAFA` | Warm-tinted near-white surfaces |
| `--color-border` | `#E1E1E1` | Dividers, card borders, input borders |
| `--color-border-light` | `#E9E9E9` | Subtle separators |
| `--color-text-primary` | `#1A1A1A` | Main body text (never pure black for body copy) |
| `--color-text-secondary` | `#565656` | Supporting text, descriptions, captions |
| `--color-text-tertiary` | `#78808E` | Placeholder text, disabled states |
| `--color-text-on-dark` | `#FFFFFF` | Text on dark/colored backgrounds |
| `--color-accent-green` | `#68B631` | Success states, secondary accent |
| `--color-accent-teal` | `#32AE88` | Opt-out signals, confirmation badges |

### Color Rules

- **Tint every gray.** Never use pure `#888888` or `#999999`. All grays should carry a slight warm or cool bias. The Galderma palette trends warm — use grays with a barely perceptible warm undertone (e.g., `#565656` instead of `#555555`).
- **Black is for headings and dark sections only.** Body text uses `#1A1A1A` to avoid excessive contrast that feels harsh.
- **Blue is the single interactive color.** Links, CTAs, and active states all use the same blue family (`#0066CC` / `#0052A3`). Do not introduce secondary interactive colors.
- **Green is for success/confirmation only.** Never use green as a primary brand color.
- **Dark sections are full black (`#000000`), not dark gray.** This creates the dramatic contrast that is a Galderma signature — white sections next to true-black hero sections.
- **No purple gradients.** Ever. This is the most common AI-generated anti-pattern and it fundamentally contradicts the clinical-trust aesthetic.

---

## Typography

### Font Stack

The Galderma brand (designed by Studio C) uses two proprietary typefaces:

- **Display/Headings**: "Feature Display" — a bespoke serif with Light and Light Italic weights. If unavailable, substitute with **Cormorant Garamond** (weight 300–400) or **Playfair Display** (weight 400).
- **Body/UI**: "New Rail Alphabet" — a geometric sans-serif in Light (300) and Bold (700). If unavailable, substitute with **Inter** (only for body — never for display), **Proxima Nova**, or **DM Sans**.

**Google Fonts fallback pairing**: Cormorant Garamond (headings) + DM Sans (body)

### Type Scale

| Element | Size | Weight | Line-height | Letter-spacing |
|---------|------|--------|-------------|----------------|
| H1 (Hero) | 40–48px | 300 (serif) or 700 (sans) | 1.15 | -0.01em |
| H2 (Section) | 28–32px | 300 (serif) or 600 (sans) | 1.2 | 0em |
| H3 (Subsection) | 20–24px | 400–600 | 1.3 | 0em |
| H4 (Card title) | 16–18px | 600 | 1.35 | 0.01em |
| Body large | 18px | 400 | 1.6 | 0em |
| Body | 16px | 400 | 1.6 | 0em |
| Body small | 14px | 400 | 1.5 | 0.01em |
| Caption | 12px | 400 | 1.4 | 0.02em |
| CTA/Button | 14–16px | 500–600 | 1 | 0.02em |

### Typography Rules

- **Serif for emotional moments.** Use the serif display font for hero headlines, pull quotes, and brand statements. These are the moments where warmth and humanity matter most.
- **Sans-serif for everything else.** Navigation, body copy, buttons, labels, captions — all sans-serif.
- **Light weights convey premium.** The Galderma brand deliberately uses Light (300) weight for large display text. This creates the "expensive, considered" feel. Do not default to Bold for headings.
- **Generous line-height for body text.** 1.6 is the minimum. The spacious vertical rhythm reinforces the calm, unhurried brand personality.
- **Never use letter-spacing below -0.02em.** The medical aesthetic requires readability above style.

---

## Spatial Design

### Spacing Scale (8px base grid)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Inline gaps, icon padding |
| `--space-sm` | 8px | Tight element spacing |
| `--space-md` | 16px | Component internal padding |
| `--space-lg` | 24px | Card padding, between related elements |
| `--space-xl` | 32px | Between sections within a page segment |
| `--space-2xl` | 48px | Between major page sections |
| `--space-3xl` | 64px | Hero padding, large section separators |
| `--space-4xl` | 80px | Full section breaks |
| `--space-5xl` | 120px | Page-level vertical breathing room |

### Layout Rules

- **Container max-width**: 1200px, centered. Content never stretches edge-to-edge on desktop.
- **Section padding**: 80px vertical (desktop), 48px (mobile). This generous spacing is non-negotiable — it creates the "premium whitespace" effect.
- **Grid**: 12-column grid with 24px gutters for product cards, 32px for editorial content.
- **Content alignment**: Headings left-aligned (never centered, except in hero overlays). Body text left-aligned. CTAs left-aligned with content.
- **Card grid**: 2-column layout for product/treatment cards on desktop, single column on mobile.
- **Never use full-bleed text.** All text content lives within the container. Only hero images and dark section backgrounds extend full-width.

---

## Components

### Navigation

- **Desktop**: White background, black text, horizontal links. Logo left, nav center, CTA right.
- **Sticky behavior**: Navigation remains fixed on scroll with a subtle shadow (`0 2px 8px rgba(0,0,0,0.08)`).
- **Mobile**: Hamburger menu, full-screen overlay with black background and white text.
- **Active state**: Underline accent or subtle blue color — never background highlight.
- **No mega-menus.** Keep navigation flat and direct, reflecting the no-nonsense clinical personality.

### Buttons

**Primary Button:**
```
background: #000000
color: #FFFFFF
padding: 12px 24px
border-radius: 4px
font-weight: 600
font-size: 14-16px
letter-spacing: 0.02em
transition: all 0.2s ease
hover: background #1A1A1A, slight translateY(-1px)
```

**Secondary Button:**
```
background: transparent
color: #000000 (or #0066CC for CTA variant)
border: 1px solid #000000 (or #0066CC)
padding: 10px 20px
border-radius: 4px
font-weight: 500
hover: background with 5% opacity of accent color
```

**On-dark Button:**
```
background: #FFFFFF
color: #000000
padding: 12px 24px
border-radius: 4px
font-weight: 600
hover: background #F4F4F4
```

**Button Rules:**
- Border-radius never exceeds 4px. Rounded buttons feel casual; sharp-ish corners feel clinical and precise.
- Never use ghost buttons as the primary CTA. The medical aesthetic needs visual weight and clarity.
- Button labels are verb phrases: "Find a Specialist", "Explore Treatments", "See Results".
- Every button has a hover transition of 200ms ease — no instant flips.

### Cards (Brand/Product Cards)

```
background: #FFFFFF
border-radius: 8px
box-shadow: 0 2px 8px rgba(0,0,0,0.06)
overflow: hidden
transition: box-shadow 0.3s ease
hover: box-shadow: 0 4px 16px rgba(0,0,0,0.1), translateY(-2px)
```

**Structure:**
- Full-bleed image top (16:9 or 4:3 aspect ratio)
- Logo/title overlay on image (if brand card)
- Text content below with 24px padding
- CTA link at bottom, left-aligned

**Dark variant:**
- Background: `#000000` or `#1A1A1A`
- Text: `#FFFFFF`
- Used for premium product showcases and hero-adjacent sections

### Hero Section

```
background: #000000 with full-bleed background image at 40-60% opacity
min-height: 70vh (desktop), 50vh (mobile)
content: vertically and horizontally centered
text: white, serif headline, sans-serif subtitle
CTA: white button on dark background
```

**Hero Rules:**
- The image is always darkened — never show a bright hero image behind text. Use a gradient overlay (from `rgba(0,0,0,0.7)` to `rgba(0,0,0,0.3)`).
- Hero text is always white. No dark text on images.
- Maximum two lines for the headline. If you need more, the headline is too long.
- Include exactly one CTA — never multiple competing buttons in the hero.

### Form Inputs

```
height: 48px
padding: 0 16px
border: 1px solid #D1D1D1
border-radius: 4px
font-size: 16px
color: #1A1A1A
background: #FFFFFF
focus: border-color #000000, no box-shadow
placeholder: #78808E
```

---

## Imagery

### Photography Style

- **Clinical-lifestyle blend**: Images show real people in clinical settings, but with soft, flattering lighting. Not sterile — but not Instagram either.
- **Before/after treatment photos**: Side-by-side with consistent framing, neutral backgrounds, and direct labeling ("Before" / "After").
- **Diversity in subjects**: Multiple skin tones, ages, and genders. The brand emphasizes inclusivity.
- **No extreme close-ups of skin.** Maintain a respectful distance. The focus is on the person, not the procedure.

### Image Treatment

- Border-radius: 8px for standalone images, 0px for hero backgrounds and card images that touch card edges.
- No decorative borders or frames around images.
- Aspect ratios: 16:9 for heroes, 4:3 for product cards, 1:1 for provider portraits.
- Soft, natural lighting preferred. No heavy vignettes, no dramatic shadows, no color filters.

### Icons

- Minimalist line icons, 1.5px stroke weight.
- Black (`#1A1A1A`) on light backgrounds, white on dark.
- Size: 24px standard, 20px for inline, 32px for feature highlights.
- Style reference: Phosphor Icons (regular weight) or Heroicons (outline).

### Image-to-Text Ratio

- Hero sections: 60% image, 40% text
- Product cards: 55% image, 45% text
- Editorial sections: 50/50 split (image left, text right, or vice versa)
- Text-heavy sections: 30% image, 70% text

---

## Motion Design

### Timing

| Context | Duration | Easing |
|---------|----------|--------|
| Button hover | 200ms | ease |
| Card hover lift | 300ms | ease-out |
| Menu open/close | 300ms | ease-in-out |
| Page section reveal | 600ms | ease-out |
| Hero carousel slide | 500ms | ease-in-out |
| Scroll-triggered animations | 800ms | cubic-bezier(0.25, 0.1, 0.25, 1) |

### Motion Rules

- **Never use bounce or elastic easing.** The clinical aesthetic demands smooth, controlled transitions.
- **Subtlety over spectacle.** If a user consciously notices an animation, it is too much. Motion should feel like the UI is breathing, not performing.
- **Stagger entrance animations by 100ms** for grouped elements (card grids, list items).
- **Always respect `prefers-reduced-motion`**. When reduced motion is preferred, disable all entrance animations and keep only essential state transitions (hover, focus) at 100ms.
- **Hero carousels auto-advance every 5 seconds** with a progress indicator.
- **No parallax scrolling.** It feels gimmicky and undermines the professional tone.

---

## Responsive Design

### Breakpoints

| Name | Width | Layout changes |
|------|-------|---------------|
| Mobile | < 768px | Single column, stacked cards, hamburger nav |
| Tablet | 768–1024px | 2-column grid, condensed spacing |
| Desktop | 1024–1440px | Full layout, generous spacing |
| Wide | > 1440px | Max-width container centered, no stretching |

### Mobile Adaptations

- Hero height reduces to 50vh
- Section padding reduces from 80px to 48px
- 2-column card grids become single column
- Navigation collapses to hamburger
- Font sizes reduce by ~15% across the scale
- Touch targets minimum 44x44px

---

## Page Structure Patterns

### Homepage Structure
1. **Hero Carousel** — Full-width, dark overlay, rotating treatment highlights
2. **Brand/Product Cards** — 2-column grid of treatment categories with logos
3. **Before/After Section** — Interactive comparison slider
4. **Science/Innovation Section** — Split layout (image + text), editorial tone
5. **Find a Specialist CTA** — Full-width dark section with search input
6. **Footer** — Multi-column with legal, social, navigation

### Product/Treatment Page Structure
1. **Product Hero** — Product-specific hero with brand color accent
2. **Treatment Overview** — What it treats, how it works
3. **Before/After Gallery** — Filterable by treatment area
4. **Science Section** — Clinical evidence, mechanism of action
5. **FAQ Accordion** — Common questions with expandable answers
6. **Find a Specialist** — CTA with location search

---

## UX Writing

### Voice

- **Tone**: Reassuring, knowledgeable, warm but not casual. Write like a trusted doctor, not a salesperson.
- **Perspective**: Second person ("you") when addressing patients, first person plural ("we") when discussing the brand.
- **Jargon**: Use clinical terms when accuracy matters (e.g., "hyaluronic acid"), but always define them on first use.

### Copy Patterns

| Element | Pattern | Example |
|---------|---------|---------|
| Headlines | Benefit-forward, concise | "Reveal Your Natural Beauty" |
| Subheadings | Descriptive, informative | "Dermal fillers designed to restore volume and smooth lines" |
| CTAs | Action verb + object | "Find a Specialist", "Explore Treatments", "See Results" |
| Body copy | Short paragraphs (3-4 sentences max) | Factual but warm |
| Error messages | Explain what happened + next step | "No specialists found in your area. Try expanding your search radius." |
| Empty states | Reassuring + actionable | "No results yet. Try adjusting your filters or search for a different treatment." |

### Copy Anti-patterns

- No exclamation marks. Ever. The brand is confident, not excitable.
- No slang, emojis, or informal abbreviations.
- No fear-based messaging ("Don't let wrinkles ruin..."). Use positive framing instead.
- No superlatives without evidence ("the best", "number one"). Let clinical data speak.

---

## Anti-Patterns (What NOT to Do)

These are the patterns that would break the Galderma aesthetic. If you find yourself doing any of these, stop and reconsider.

1. **No purple/pink gradients.** This is the cardinal sin of AI-generated medical UI. The Galderma brand is black, white, and blue — period.
2. **No cards inside cards.** Each card is a self-contained unit. Nesting them creates visual noise that contradicts the clean aesthetic.
3. **No rounded/pill buttons.** Maximum border-radius is 4px for buttons. Rounded buttons feel casual and consumer-oriented.
4. **No bright saturated backgrounds.** No lime green, hot pink, or electric blue sections. Color is used sparingly and with purpose.
5. **No decorative illustrations.** This is not a whimsical brand. Use photography and minimalist icons only.
6. **No Inter as the identity font.** Inter is fine for body text as a fallback, but never as the heading/display font.
7. **No gray text on colored backgrounds.** If the background is blue, the text must be white. If the background is dark, the text must be white. No exceptions.
8. **No auto-playing video with sound.** Video may auto-play muted in hero sections only, with a visible play/pause control.
9. **No bounce/elastic animations.** Smooth easing only.
10. **No full-bleed text.** All text lives within the 1200px container. Only backgrounds and images extend full-width.
11. **No gamification elements.** Progress bars, badges, and achievement systems are inappropriate for this brand.
12. **No colloquial AI language.** No "Let's dive in!", "Here's the thing", or "Ready to level up?". The voice is clinical and composed.

---

## Quick Reference

When building a page in the Galderma aesthetic, verify these checkpoints before delivering:

- [ ] Colors are from the defined palette only — no invented accent colors
- [ ] All grays are tinted (no pure mid-gray)
- [ ] Serif font used for hero/display headlines, sans-serif for everything else
- [ ] Heading weights include Light (300) for large display text
- [ ] Section spacing is 80px vertical (desktop), 48px (mobile)
- [ ] Container max-width is 1200px
- [ ] Buttons have 4px border-radius maximum
- [ ] Hero sections have dark overlay on images
- [ ] All interactive elements have 200-300ms transitions with smooth easing
- [ ] `prefers-reduced-motion` is respected
- [ ] No purple gradients, no nested cards, no pill buttons
- [ ] Copy is warm but clinical — no exclamation marks, no slang
- [ ] Photography is clinical-lifestyle blend, not stock or social-media style
- [ ] All text meets WCAG AA contrast (4.5:1 for body, 3:1 for large text)
- [ ] Touch targets are minimum 44x44px on mobile
