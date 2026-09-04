# VoiceFlow — UI/UX Design Strategy

> **Project:** VoiceFlow — Professional Speech-to-Text Platform  
> **Framework:** Next.js 15 App Router + TypeScript + Tailwind CSS 4  
> **Component Library:** shadcn/ui (41 primitives) + Radix UI  
> **Animation:** Framer Motion + tw-animate-css  
> **Status:** Analysis Complete — Strategy Defined — Ready for Implementation

---

## 0. Project Architecture Summary

### Pages & Routes
| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `Home` (page.tsx) | Landing page with full app |
| `/api/groq` | API Route | Groq AI transcription |
| `/api/gemini` | API Route | Gemini AI transcription |

### Component Tree
```
RootLayout
├── Navbar (fixed, scroll-aware)
│   ├── Logo
│   ├── NavLinks
│   ├── MobileMenu (Sheet)
│   └── ThemeToggle
├── Hero
│   ├── HeroBadge
│   └── HeroActions
├── SpeechToText (main tool)
│   ├── ToolHeader
│   ├── LanguageSelector
│   ├── SessionStats
│   ├── HistorySheet
│   ├── TranscriptionArea
│   │   ├── AIToolbar
│   │   ├── AudioVisualizer
│   │   └── Status Bar
│   ├── ToolControls
│   ├── ClearDialog
│   ├── FindReplace
│   ├── BrowserUnsupported
│   └── ShortcutsDialog
├── Features
│   ├── FeaturesHeader
│   └── FeatureCard (×6)
├── Testimonials
│   ├── TestimonialHeader
│   └── TestimonialCard (×3)
├── FAQ
│   ├── FAQHeader
│   └── FAQList (Accordion)
├── Footer (landing)
│   ├── FooterBrand
│   └── FooterSection (×3)
└── Footer (speech-to-text)
```

### UI Library (41 shadcn primitives)
button, input, textarea, card, badge, alert, dialog, sheet, select, tooltip, popover, dropdown-menu, accordion, tabs, switch, checkbox, radio-group, slider, progress, separator, skeleton, table, pagination, navigation-menu, command, calendar, carousel, chart, resizable, drawer, context-menu, hover-card, collapsible, avatar, form, label, scroll-area, sonner, alert-dialog, aspect-ratio, breadcrumb, hover-card, tooltip

### Dependencies (preserved)
- `next ^15.2.3`, `react ^19.0.0`, `react-dom ^19.0.0`
- `@radix-ui/react-*` (accordion, alert-dialog, avatar, checkbox, collapsible, context-menu, dialog, dropdown-menu, hover-card, label, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, slider, switch, tabs, tooltip)
- `@google/generative-ai ^0.24.1`, `groq-sdk ^0.37.0`, `@langchain/core`, `@langchain/google-genai`
- `framer-motion ^12.34.0`, `lucide-react ^0.545.0`
- `tailwindcss ^4`, `@tailwindcss/postcss`, `tw-animate-css ^1.4.0`
- `sonner ^2.0.7`, `react-hot-toast ^2.6.0`
- `react-hook-form ^7.64.0`, `@hookform/resolvers ^5.2.2`, `zod ^4.1.12`
- `recharts ^2.15.4`, `embla-carousel-react ^8.6.0`
- `date-fns ^4.1.0`, `jspdf ^4.1.0`
- `clsx ^2.1.1`, `tailwind-merge ^3.3.1`, `class-variance-authority ^0.7.1`
- `vaul ^1.1.2`, `input-otp ^1.4.2`, `cmdk ^1.1.1`

---

## 1. DESIGN PRINCIPLES

### Core Philosophy
> *"Quiet confidence, not loud decoration."*

Every design decision follows these five pillars:

| # | Principle | Manifestation |
|---|-----------|---------------|
| 1 | **Radical Clarity** | Every element earns its place. If removing it doesn't reduce understanding, remove it. |
| 2 | **Purposeful Restraint** | No decorative gradients. No glassmorphism for its own sake. No unnecessary animations. |
| 3 | **Structural Honesty** | Cards are cards. Buttons are buttons. Modals are modals. No disguised elements. |
| 4 | **Typographic Authority** | Type is the primary design tool. Size, weight, and spacing create hierarchy — not color or borders. |
| 5 | **Calibrated Interaction** | Motion serves orientation, not entertainment. Every animation has a clear functional purpose. |

### Anti-Patterns (Explicitly Avoided)
- ❌ Excessive gradients (no multi-stop color sweeps on backgrounds or buttons)
- ❌ Glassmorphism as default (only where functional: overlapping layers)
- ❌ Extreme border-radius (> `1rem` only for circular/pill elements)
- ❌ Generic AI-generated aesthetics (no purple-to-blue gradients everywhere)
- ❌ Shadow stacking (single shadow per element, purposeful depth)
- ❌ Floating action buttons (no FAB patterns)
- ❌ Skeleton loaders everywhere (use subtle progress indicators)
- ❌ Conflicting border styles (one consistent border language)

---

## 2. COLOR SYSTEM

### Color Philosophy
Single-mode dark design with proper light mode support. Colors are defined in `oklch` for perceptual uniformity and smooth transitions.

### Primary Palette
| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `--primary` | `oklch(0.78 0.15 260)` | `oklch(0.35 0.12 260)` | Brand identity, key actions, active states |
| `--primary-foreground` | `oklch(0.99 0.01 270)` | `oklch(0.99 0.01 270)` | Text on primary backgrounds |
| `--accent` | `oklch(0.22 0.02 260)` | `oklch(0.96 0.02 260)` | Secondary highlights, hover states |
| `--accent-foreground` | `oklch(0.99 0.01 270)` | `oklch(0.15 0.03 260)` | Text on accent backgrounds |

### Neutral Palette
| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `--background` | `oklch(0.06 0.01 270)` | `oklch(0.99 0.005 270)` | Page background |
| `--foreground` | `oklch(0.98 0.01 270)` | `oklch(0.08 0.01 270)` | Primary text |
| `--card` | `oklch(0.12 0.01 270)` | `oklch(1.0 0.005 270)` | Card surfaces |
| `--card-foreground` | `oklch(0.98 0.01 270)` | `oklch(0.08 0.01 270)` | Text on cards |
| `--popover` | `oklch(0.12 0.01 270)` | `oklch(1.0 0.005 270)` | Popover/dropdown surfaces |
| `--popover-foreground` | `oklch(0.98 0.01 270)` | `oklch(0.08 0.01 270)` | Text on popovers |

### Semantic Colors
| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `--muted` | `oklch(0.16 0.01 270)` | `oklch(0.97 0.01 270)` | Secondary backgrounds |
| `--muted-foreground` | `oklch(0.60 0.02 270)` | `oklch(0.45 0.02 270)` | Secondary text, captions |
| `--border` | `oklch(0.18 0.01 270)` | `oklch(0.90 0.01 270)` | Borders, dividers |
| `--input` | `oklch(0.16 0.01 270)` | `oklch(0.95 0.01 270)` | Input backgrounds |
| `--ring` | `oklch(0.65 0.12 260)` | `oklch(0.45 0.10 260)` | Focus rings |
| `--destructive` | `oklch(0.55 0.15 25)` | `oklch(0.65 0.15 25)` | Destructive actions |
| `--success` | `oklch(0.55 0.15 140)` | `oklch(0.40 0.15 140)` | Success states |
| `--warning` | `oklch(0.65 0.15 50)` | `oklch(0.70 0.15 50)` | Warning states |

### Brand Accent
A single, distinctive accent color replaces the current purple-blue gradient overload:
- **Primary**: A refined violet-blue (`oklch(0.78 0.15 260)` dark / `oklch(0.35 0.12 260)` light) — used sparingly for the single most important action
- **All other interactive elements** use muted neutrals or the secondary accent

### Implementation
Replace `app/globals.css` `:root` and `.dark` variables with the above. The `@theme inline` block maps these to Tailwind utilities.

---

## 3. TYPOGRAPHY SYSTEM

### Font Selection
- **Primary Sans**: `Geist` (already configured) — geometric, modern, highly legible
- **Primary Mono**: `Geist Mono` (already configured) — for code, stats, numeric data
- **No additional fonts** will be introduced

### Type Scale
Use a strict modular scale based on `1.125` (major third):

| Level | Name | Size (rem) | Size (px) | Weight | Line Height | Letter Spacing |
|-------|------|-----------|-----------|--------|-------------|----------------|
| 1 | `display` | `3.5rem` | `56px` | `900` (black) | `1.05` | `-0.03em` |
| 2 | `h1` | `2.25rem` | `36px` | `800` (extrabold) | `1.1` | `-0.02em` |
| 3 | `h2` | `1.75rem` | `28px` | `700` (bold) | `1.15` | `-0.015em` |
| 4 | `h3` | `1.375rem` | `22px` | `600` (semibold) | `1.2` | `-0.01em` |
| 5 | `h4` | `1.125rem` | `18px` | `600` (semibold) | `1.3` | `-0.005em` |
| 6 | `body-lg` | `1rem` | `16px` | `400` (regular) | `1.6` | `0` |
| 7 | `body` | `0.875rem` | `14px` | `400` (regular) | `1.6` | `0` |
| 8 | `small` | `0.8125rem` | `13px` | `400` (regular) | `1.5` | `0.01em` |
| 9 | `caption` | `0.75rem` | `12px` | `500` (medium) | `1.4` | `0.02em` |
| 10 | `label` | `0.6875rem` | `11px` | `600` (semibold) | `1.3` | `0.04em` (uppercase) |
| 11 | `badge` | `0.625rem` | `10px` | `700` (bold) | `1.2` | `0.06em` (uppercase) |

### Typography Rules
- **Headings**: Never use `italic`. Never use gradient text on headings. Use `tracking-tight` only for display/h1.
- **Body text**: Use `leading-relaxed` (1.6) for optimal readability. Never below `14px` for body content.
- **Numbers/stats**: Use `font-mono` for all numeric data (word counts, timers, percentages).
- **Labels/overlays**: Use uppercase, wide letter-spacing (`tracking-wider`), medium weight.
- **Links**: Underlined on hover only, no underline by default. `text-primary` on hover.

### Text Color Hierarchy
| Context | Color Token |
|---------|-------------|
| Primary text | `--foreground` |
| Secondary text | `--muted-foreground` |
| Disabled text | `--muted-foreground` with `opacity-50` |
| Placeholder | `--muted-foreground` with `opacity-40` |
| Inverse text on primary | `--primary-foreground` |

---

## 4. SPACING SYSTEM

### Base Unit
**4px** as the atomic unit. All spacing values are multiples of `0.25rem` (4px).

### Spacing Scale
| Token | Value | Usage |
|-------|-------|-------|
| `space-xs` | `0.25rem` (4px) | Icon gaps, tight internal padding |
| `space-sm` | `0.5rem` (8px) | Label-to-input gap, inline icon gaps |
| `space-md` | `1rem` (16px) | Card internal padding, section gaps |
| `space-lg` | `1.5rem` (24px) | Between form fields, card-to-card gap |
| `space-xl` | `2rem` (32px) | Section spacing, card header to body |
| `space-2xl` | `3rem` (48px) | Major section separation |
| `space-3xl` | `4rem` (64px) | Page-level section padding |

### Container Padding
| Breakpoint | Padding |
|------------|---------|
| Mobile (< 640px) | `1rem` (16px) left/right |
| Tablet (640–1024px) | `1.5rem` (24px) left/right |
| Desktop (≥ 1024px) | `2rem` (32px) left/right |
| Wide (≥ 1280px) | Max-width `72rem` centered, `2rem` padding |

### Section Spacing
| Element | Spacing |
|---------|---------|
| Between sections | `space-3xl` (4rem) vertical |
| Within section header to content | `space-xl` (2rem) |
| Card internal padding | `space-lg` (1.5rem) |
| Grid gap (2-col) | `space-lg` (1.5rem) |
| Grid gap (3-col+) | `space-lg` (1.5rem) |

---

## 5. BORDER RADIUS SYSTEM

### Philosophy
Consistent, purposeful border-radius. No more `rounded-[2rem]` and `rounded-md` coexisting.

### Scale
| Token | Value | Usage |
|-------|-------|-------|
| `radius-none` | `0` | Tags, badges, inline elements |
| `radius-sm` | `0.25rem` (4px) | Inputs, small interactive elements |
| `radius-md` | `0.5rem` (8px) | Cards, buttons, dropdowns |
| `radius-lg` | `0.75rem` (12px) | Larger cards, dialogs |
| `radius-xl` | `1rem` (16px) | Cards, sheets, section containers |
| `radius-2xl` | `1.5rem` (24px) | Hero sections, large containers |
| `radius-full` | `9999px` | Pills, circles, avatars, badges |

### Rules
- **Buttons**: `radius-md` (8px) default. `radius-full` only for the main recording button.
- **Cards**: `radius-xl` (16px). Never more.
- **Dialogs/Sheets**: `radius-xl` (16px) on desktop, `radius-lg` (12px) on mobile.
- **Inputs/Textareas**: `radius-sm` (4px) or `radius-md` (8px).
- **Badges/Labels**: `radius-full` (pill shape) or `radius-none`.
- **Tool-specific elements** (like the recording button): `radius-full` (circular).
- **NEVER** use `rounded-[2rem]`, `rounded-[3rem]`, or any arbitrary large values.

---

## 6. SHADOW SYSTEM

### Philosophy
Shadows communicate elevation and interactivity, not decoration. Maximum one shadow per element at any given state.

### Shadow Scale
| Token | Value | Usage |
|-------|-------|-------|
| `shadow-none` | `none` | Default flat elements |
| `shadow-xs` | `0 1px 2px 0 oklch(0 0.001 270 / 0.05)` | Subtle depth on cards |
| `shadow-sm` | `0 1px 3px 0 oklch(0 0.001 270 / 0.1), 0 1px 2px -1px oklch(0 0.001 270 / 0.1)` | Standard card elevation |
| `shadow-md` | `0 4px 6px -1px oklch(0 0.001 270 / 0.1), 0 2px 4px -2px oklch(0 0.001 270 / 0.1)` | Hover states, dropdowns |
| `shadow-lg` | `0 10px 15px -3px oklch(0 0.001 270 / 0.1), 0 4px 6px -4px oklch(0 0.001 270 / 0.1)` | Modals, popovers |
| `shadow-xl` | `0 20px 25px -5px oklch(0 0.001 270 / 0.1), 0 8px 10px -6px oklch(0 0.001 270 / 0.1)` | Dialogs on overlay |
| `shadow-2xl` | `0 25px 50px -12px oklch(0 0.001 270 / 0.25)` | Maximum elevation (rare) |
| `shadow-ring` | `0 0 0 2px var(--ring)` | Focus state (replaces ring-offset) |

### Rules
- **Default cards**: `shadow-xs` or no shadow + border
- **Hover**: Transition from `shadow-xs` → `shadow-sm` (not jump to `shadow-lg`)
- **Focus**: `shadow-ring` (focus ring) — never shadow + ring simultaneously
- **Modals/Dialogs**: `shadow-xl` on the dialog content
- **Navbar scroll state**: `shadow-sm` only when scrolled
- **NEVER** use `shadow-primary/20`, `shadow-primary/25`, etc. — shadows should be neutral (black/white based)
- **NEVER** stack multiple shadows on one element
- **Transitions**: `shadow` transitions use `duration-200` with `ease-out`

---

## 7. BUTTON STYLES

### Anatomy
```
[Icon] [Label] [Optional: Chevron/Arrow]
```

### Variants
| Variant | Background | Text | Border | Use Case |
|---------|-----------|------|--------|----------|
| `default` | `--primary` | `--primary-foreground` | none | Primary CTA |
| `secondary` | `--secondary` | `--secondary-foreground` | none | Secondary action |
| `outline` | transparent | `--foreground` | `--border` (1px) | Tertiary action |
| `ghost` | transparent | `--foreground` | none | Minimal action, toolbars |
| `destructive` | `--destructive` | `--destructive-foreground` | none | Dangerous actions |
| `link` | transparent | `--primary` | none | Inline links |

### Sizes
| Size | Height | Padding | Font Size | Radius |
|------|--------|---------|-----------|--------|
| `xs` | `1.75rem` (28px) | `0.5rem` horizontal | `0.75rem` (12px) | `radius-sm` |
| `sm` | `2rem` (32px) | `0.75rem` horizontal | `0.8125rem` (13px) | `radius-md` |
| `default` | `2.5rem` (40px) | `1rem` horizontal | `0.875rem` (14px) | `radius-md` |
| `lg` | `3rem` (48px) | `1.5rem` horizontal | `1rem` (16px) | `radius-md` |
| `xl` | `3.5rem` (56px) | `2rem` horizontal | `1.125rem` (18px) | `radius-lg` |

### Rules
- **Only one CTA per viewport** — use `default` variant for the single most important action
- **Toolbars**: `ghost` or `outline` variant with `sm` size
- **Landing page CTA**: `lg` size, `default` variant, `radius-md`
- **Recording button**: `radius-full`, `w-20 h-20` (mobile), `w-24 h-24` (desktop) — this is the ONLY full-radius button that's not pill-shaped
- **Icon-only buttons**: `size-icon` with equal width/height
- **Disabled**: `opacity-50` + `pointer-events-none` — never use different color for disabled
- **Hover**: Subtle background change only (no scale, no shadow changes unless elevated)
- **Active**: `scale-[0.98]` for tactile feedback, duration `100ms`
- **Focus**: `shadow-ring` with `ring-2` offset

### What Changes from Current
- Remove `rounded-full px-6 font-semibold shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-blue-600` patterns
- Remove `hover:scale-105` on regular buttons (only on the recording button)
- Remove gradient buttons entirely
- Remove `shadow-lg shadow-primary/25` patterns

---

## 8. INPUT STYLES

### Anatomy
```
[Label] [Input/Textarea] [Optional: Helper Text/Error]
```

### Text Input
| Property | Value |
|----------|-------|
| Height | `2.5rem` (40px) — `h-10` |
| Padding | `0.75rem` horizontal, `0.5rem` vertical |
| Font | `0.875rem` (14px) |
| Radius | `radius-sm` (4px) |
| Border | `--border`, `1px` |
| Background | `--input` |
| Focus | `border-ring` + `shadow-ring` (`ring-2`, `ring-ring/50`) |
| Placeholder | `--muted-foreground` at `opacity-50` |

### Textarea
| Property | Value |
|----------|-------|
| Min Height | `10rem` (160px) |
| Padding | `1rem` all sides |
| Font | `1rem` (16px) |
| Radius | `radius-xl` (16px) |
| Border | `--border`, `1px` |
| Background | `--card` |
| Resize | Vertical only |
| Focus | `border-ring` + `shadow-ring` |

### Select
| Property | Value |
|----------|-------|
| Height | `2.5rem` (40px) |
| Radius | `radius-md` (8px) |
| Trigger | Same as input style |
| Dropdown | `radius-lg` (12px), `shadow-lg` |

### Form Validation
- **Valid**: Green border `border-success` on focus (subtle)
- **Invalid**: Red border `border-destructive` + `shadow-ring` with `--destructive`
- **Error message**: `--destructive` color, `caption` size, below the input
- **Helper text**: `--muted-foreground`, `small` size

### Rules
- **Never** use `bg-background` on inputs — use `--input` for clear separation
- **Never** use `border-2` on standard inputs — `1px` is the standard
- **Radius consistency**: All inputs use the same `radius-sm` or `radius-md`
- **Focus ring**: Always visible, `ring-2` with `ring-ring/50` opacity
- **Disabled**: `opacity-50`, `cursor-not-allowed`, `--muted` background

---

## 9. CARD STYLES

### Anatomy
```
[CardHeader (optional)] [CardContent] [CardFooter (optional)]
```

### Base Card
| Property | Value |
|----------|-------|
| Background | `--card` |
| Border | `--border`, `1px` |
| Border Radius | `radius-xl` (16px) |
| Padding | `space-lg` (1.5rem) |
| Shadow | `shadow-xs` default |
| Hover Shadow | `shadow-sm` |
| Transition | `duration-200`, `ease-out` |

### Card Variants
| Variant | Background | Border | Shadow | Use Case |
|---------|-----------|--------|--------|----------|
| `elevated` | `--card` | none | `shadow-sm` | Standout cards |
| `outlined` | `--card` | `--border` 1px | none | Default cards |
| `filled` | `--muted` | none | none | Grouped content |
| `ghost` | transparent | none | none | Minimal surfaces |

### Card Header
| Property | Value |
|----------|-------|
| Padding | `space-lg` (1.5rem) top/bottom, `space-lg` left/right |
| Border Bottom | `--border`, `1px` (when separator needed) |
| Title | `h4` level (18px, semibold) |
| Description | `small` level (13px), `--muted-foreground` |

### Card Grid Layouts
| Grid | Columns | Gap |
|------|---------|-----|
| 1 col | 1 | — |
| 2 col | 2 | `space-lg` |
| 3 col | 3 | `space-lg` |
| 4 col | 4 | `space-lg` |
| Responsive | 1 → 2 → 3 | `space-lg` |

### Rules
- **Maximum one card type per page section** — don't mix elevated and outlined cards in the same grid
- **Feature cards**: `outlined` variant, `radius-xl`, `space-lg` padding
- **Testimonial cards**: `outlined`, `radius-xl`, slightly elevated on hover
- **NEVER** use `rounded-[2rem]`, `rounded-[3rem]`, or `rounded-3xl` on cards — all cards use `radius-xl`
- **NEVER** use `bg-secondary/20` or `bg-black/20` on cards — use `--card` or `--muted`
- **NEVER** use `backdrop-blur-xl` on cards unless they're overlapping a blurred background

---

## 10. TABLE STYLES

### Anatomy
```
[Table Header] [Table Body] [Table Footer (optional)]
```

### Table Container
| Property | Value |
|----------|-------|
| Background | `--card` |
| Border Radius | `radius-xl` |
| Overflow | `rounded-xl` clip |
| Border | `--border`, `1px` |

### Row Styles
| State | Background | Border |
|-------|-----------|--------|
| Default | `--card` | `--border`, `1px` bottom |
| Hover | `--muted` at `opacity-50` | same |
| Selected | `--accent` | same |
| Stripped (zebra) | alternating `--card` / `--muted` at `opacity-30` | same |

### Header Styles
| Property | Value |
|----------|-------|
| Background | `--muted` |
| Text | `caption` size (12px), semibold, uppercase, `tracking-wider` |
| Padding | `space-md` (1rem) horizontal, `space-sm` (8px) vertical |
| Border | `--border`, `1px` bottom |

### Cell Styles
| Property | Value |
|----------|-------|
| Padding | `space-md` (1rem) horizontal, `space-sm` (8px) vertical |
| Text | `body` size (14px) |
| Alignment | Left by default, center for numeric |
| Border | `1px` bottom, `--border` |

### Empty State
| Element | Content |
|---------|---------|
| Container | Centered, `space-2xl` vertical padding |
| Icon | `lucide` icon, `w-12 h-12`, `--muted-foreground` at `opacity-30` |
| Title | `h3` level, `--muted-foreground` |
| Description | `body` size, `--muted-foreground` at `opacity-70` |

---

## 11. NAVIGATION STYLES

### Navbar
| Property | Value |
|----------|-------|
| Position | `fixed`, top, `z-50` |
| Height | `4rem` (64px) |
| Background (scrolled) | `--background` at `opacity-85`, `backdrop-blur-xl` |
| Background (unscrolled) | transparent |
| Border Bottom | `--border`, `1px` (only when scrolled) |
| Shadow (scrolled) | `shadow-sm` |
| Transition | `duration-300`, `ease-out` |

### Logo
| Property | Value |
|----------|-------|
| Size | `w-8 h-8` icon container |
| Font | `font-bold`, `text-xl`, `tracking-tight` |
| Icon | `w-5 h-5` inside `rounded-lg` container |
| Gap | `space-sm` (8px) between icon and text |

### Nav Links
| Property | Value |
|----------|-------|
| Font | `body` size (14px), `font-medium` |
| Color | `--muted-foreground` default, `--foreground` on hover |
| Hover | `color` transition, `duration-200` |
| Active | `--primary` color |
| Spacing | `space-lg` (1.5rem) between items |
| Underline | Subtle `border-b-2` with `--primary` on active, hidden by default |

### Mobile Menu
| Property | Value |
|----------|-------|
| Sheet Side | `left` |
| Width | `min(85vw, 20rem)` |
| Background | `--card` |
| Border | `--border`, `1px` right |
| Content | Logo at top, nav links in vertical list with `space-lg` gaps |
| Overlay | `--background` at `opacity-80` |

### Breadcrumb (if used)
| Property | Value |
|----------|-------|
| Separator | `/` or `chevron-right` |
| Font | `small` size (13px) |
| Active | `--foreground` |
| Inactive | `--muted-foreground` |
| Padding | `space-sm` (8px) |

### Pagination
| Property | Value |
|----------|-------|
| Alignment | Centered |
| Item Size | `2.5rem` (40px) circle |
| Active | `default` variant |
| Inactive | `ghost` variant |
| Gap | `space-xs` (4px) |
| Border Radius | `radius-md` |

---

## 12. MODAL STYLES

### Dialog/Modal
| Property | Value |
|----------|-------|
| Position | Centered (`top-1/2`, `left-1/2`, `-translate-x-1/2`, `-translate-y-1/2`) |
| Width | `min(90vw, 28rem)` for small, `min(90vw, 42rem)` for large |
| Background | `--popover` |
| Border | `--border`, `1px` |
| Border Radius | `radius-xl` (16px) |
| Shadow | `shadow-xl` |
| Padding | `space-xl` (2rem) |
| Overlay | `--background` at `opacity-70`, `backdrop-blur-sm` |
| Animation | `fade-in` + `zoom-in-95` on open, reverse on close |
| Duration | `duration-200`, `ease-out` |

### Dialog Header
| Property | Value |
|----------|-------|
| Title | `h3` level (22px), `font-bold` |
| Description | `body` size (14px), `--muted-foreground` |
| Spacing | `space-lg` gap between title and description |
| Padding | `space-lg` bottom (separates from content) |

### Dialog Footer
| Property | Value |
|----------|-------|
| Layout | Column on mobile, row on desktop |
| Gap | `space-sm` (8px) between buttons |
| Alignment | Right-aligned on desktop |
| Padding | `space-lg` top, `space-lg` bottom |
| Border | `--border`, `1px` top |

### Alert Dialog (Confirmation)
| Property | Value |
|----------|-------|
| Icon | `w-14 h-14` circle container with `bg-destructive/10` |
| Title | `h2` level (28px), centered, `font-bold` |
| Description | `body` size, centered, `--muted-foreground` |
| Actions | Cancel (`outline`) + Confirm (`destructive`) |
| Button Height | `2.75rem` (44px) |

### Sheet (Side Panel)
| Property | Value |
|----------|-------|
| Width | `min(85vw, 24rem)` mobile, `min(40vw, 32rem)` desktop |
| Background | `--popover` |
| Border | `--border`, `1px` on the side |
| Border Radius | `radius-xl` on the side, `0` on the opposite |
| Shadow | `shadow-lg` |
| Padding | `space-lg` |
| Handle | Visible drag indicator at top center (`w-10 h-1`, `--muted-foreground`, `rounded-full`) |

### Rules
- **NEVER** use `rounded-[2rem]` or `rounded-[2.5rem]` on dialogs — use `radius-xl`
- **NEVER** use `backdrop-blur-xl` on overlay — `backdrop-blur-sm` or none
- **NEVER** use `bg-black/90` on dialog content — use `--popover`
- **NEVER** use `bg-background/90` on dialogs — use `--popover` with proper border
- **Focus trap**: Ensure Radix's built-in focus management is preserved
- **Stacking**: Maximum 2 modals stacked at once

---

## 13. BADGE STYLES

### Anatomy
```
[Optional: Icon] [Label]
```

### Variants
| Variant | Background | Text | Border | Use Case |
|---------|-----------|------|--------|----------|
| `default` | `--primary` | `--primary-foreground` | none | Primary status |
| `secondary` | `--muted` | `--muted-foreground` | none | Secondary label |
| `outline` | transparent | `--foreground` | `--border`, `1px` | Neutral tag |
| `destructive` | `--destructive` | `--destructive-foreground` | none | Error/danger |
| `success` | `--success` | `--success-foreground` | none | Success state |
| `warning` | `--warning` | `--warning-foreground` | none | Warning state |

### Sizes
| Size | Height | Padding | Font | Radius |
|------|--------|---------|------|--------|
| `sm` | `1.25rem` (20px) | `0.375rem` horizontal | `caption` (12px), bold | `radius-full` |
| `default` | `1.5rem` (24px) | `0.5rem` horizontal | `small` (13px), semibold | `radius-full` |
| `lg` | `1.75rem` (28px) | `0.75rem` horizontal | `small` (13px), semibold | `radius-full` |

### Rules
- **Always pill-shaped** (`radius-full`) unless used inline as a tag
- **Never use `bg-primary/10` with `text-primary`** — that's a custom style, use `secondary` variant instead
- **Never use `bg-secondary/50`** — use `muted` variant
- **Icon inside badge**: `w-3 h-3` or `w-3.5 h-3.5`
- **Group badges**: `space-xs` (4px) gap between badges

---

## 14. STATUS STYLES

### Recording Status
| State | Indicator | Color | Animation |
|-------|-----------|-------|-----------|
| Idle | Circle, `--muted` | `muted-foreground` | None |
| Recording | Circle, pulsing | `--destructive` | `animate-pulse` on indicator, `ping` ring |
| Processing | Circle, pulsing | `--warning` | `animate-pulse` |
| Complete | Checkmark circle | `--success` | `motion` fade-in + scale |
| Error | Error circle | `--destructive` | `shake` animation |

### Progress Indicator
| Type | Style | Color | Height |
|------|-------|-------|--------|
| Linear | Bar, rounded-full | `--primary` | `0.25rem` (4px) |
| Circular | SVG arc | `--primary` | `w-8 h-8` |
| Step | Dot/number | `--muted` (inactive), `--primary` (active) | `0.5rem` (8px) dot |

### Validation Status
| State | Border | Icon | Message |
|-------|--------|------|---------|
| Valid | `border-success` | Check circle, `--success` | Green text |
| Invalid | `border-destructive` | Alert circle, `--destructive` | Red text |
| Loading | `--border` with animation | Spinner | Muted text |

### Toast/Notification
| Type | Background | Border | Icon | Duration |
|------|-----------|--------|------|----------|
| Success | `--card` | `--success`, `1px` | Check circle | `3000ms` |
| Error | `--card` | `--destructive`, `1px` | Alert circle | `4000ms` |
| Warning | `--card` | `--warning`, `1px` | Alert triangle | `4000ms` |
| Info | `--card` | `--primary`, `1px` | Info circle | `3000ms` |

---

## 15. RESPONSIVE BREAKPOINTS

### Official Breakpoints
| Name | Min Width | Max Width | Typical Device |
|------|-----------|-----------|----------------|
| `sm` | `640px` | `767px` | Large phones (landscape) |
| `md` | `768px` | `1023px` | Tablets |
| `lg` | `1024px` | `1279px` | Laptops, small desktops |
| `xl` | `1280px` | `1535px` | Desktops |
| `2xl` | `1536px` | — | Large desktops |

### Responsive Strategy

#### Navigation
| Breakpoint | Behavior |
|------------|----------|
| `< md` | Hamburger menu (Sheet), logo only, CTA hidden or shown as icon |
| `≥ md` | Full nav links visible, CTA button shown |

#### Grid Layouts
| Breakpoint | Features Grid | Testimonials | FAQ |
|------------|--------------|-------------|-----|
| `< sm` | 1 col | 1 col | 1 col |
| `≥ sm` | 1 col | 1 col | 1 col |
| `≥ md` | 2 col | 2 col | 1 col |
| `≥ lg` | 3 col | 3 col | 1 col |
| `≥ xl` | 3 col | 3 col | 1 col |

#### SpeechToText Tool
| Breakpoint | Layout |
|------------|--------|
| `< md` | Single column, stacked sidebar below main area |
| `≥ md` | `lg:grid-cols-4` with sidebar (`lg:col-span-1`) and main (`lg:col-span-3`) |
| `≥ lg` | Same as md but with more comfortable spacing |

#### Typography Scale
| Element | Mobile | Desktop |
|---------|--------|---------|
| Display | `2.5rem` | `3.5rem` |
| H1 | `1.875rem` | `2.25rem` |
| H2 | `1.5rem` | `1.75rem` |
| H3 | `1.25rem` | `1.375rem` |
| Hero heading | `2rem` | `3.5rem` |
| Body | `1rem` | `1rem` |

#### Touch Targets
| Element | Minimum Size |
|---------|-------------|
| Buttons | `44px` × `44px` |
| Links | `44px` height (padding) |
| Checkboxes | `44px` × `44px` hit area |
| Radio buttons | `44px` × `44px` hit area |
| Slider | `44px` height track |

#### Safe Areas
- Add `env(safe-area-inset-bottom)` padding for notched devices
- Use `pb-safe` or equivalent padding on bottom elements

---

## 16. ANIMATION PRINCIPLES

### Core Principles
1. **Purposeful motion** — Every animation answers "where did this come from?" or "where is it going?"
2. **Consistent duration** — All animations use the same duration scale
3. **Natural easing** — `ease-out` for entry, `ease-in` for exit, `ease-in-out` for continuous
4. **Respect preferences** — Always check `prefers-reduced-motion`

### Animation Duration Scale
| Duration | Token | Usage |
|----------|-------|-------|
| `100ms` | `duration-100` | Click feedback, instant state changes |
| `150ms` | `duration-150` | Hover states, color transitions |
| `200ms` | `duration-200` | Standard transitions (shadows, borders) |
| `300ms` | `duration-300` | Modal open/close, panel slides |
| `400ms` | `duration-400` | Section reveals, page transitions |
| `500ms` | `duration-500` | Complex layout changes |

### Easing Functions
| Curve | Usage |
|-------|-------|
| `ease-out` | Elements entering the viewport (fast start, slow end) |
| `ease-in` | Elements leaving the viewport (slow start, fast end) |
| `ease-in-out` | Continuous loops, toggles |
| `spring` (Framer Motion) | Interactive elements (buttons, draggable items) |

### Animation Patterns

#### Page Load
```
1. Fade in from opacity 0 → 1 (duration-400, ease-out)
2. Stagger children by 100ms
3. Slide up from 10px translateY → 0
```

#### Hover States
```
1. Background color transition (duration-150, ease-out)
2. Shadow transition (duration-200, ease-out)
3. Border color transition (duration-150, ease-out)
NO scale transform on regular elements
```

#### Click/Press
```
1. Scale down to scale(0.98) on mousedown (duration-100)
2. Scale back to scale(1) on mouseup (duration-150)
3. Only on interactive elements that have physical presence
```

#### Modal/Sheet
```
1. Overlay: fade-in opacity 0 → 1 (duration-300, ease-out)
2. Content: zoom-in-95 → scale(1) (duration-300, ease-out)
3. Slide: translateY(20px) → translateY(0) (duration-300, ease-out)
Exit: Reverse of entry with duration-200
```

#### List Items
```
1. Stagger entrance: 50ms delay per item
2. Fade-in + slide-up
3. Exit: fade-out only (no slide to preserve layout)
```

#### Recording Button (Special)
```
1. Press: scale(0.95) (duration-100)
2. Recording start: Pulse ring animation (infinite, 1.5s)
3. Status text: fade-in (duration-200)
NO bounce or elastic animations
```

### Framer Motion Configuration
```tsx
const motionConfig = {
  transition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1], // ease-out
  },
  variants: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
};
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### What Changes from Current
- Remove `hover:scale-105` and `active:scale-95` from all buttons except the recording button
- Remove `animate-ping` from recording indicator (use simpler pulse)
- Remove complex multi-layer shadow animations
- Remove `whileHover={{ scale: 1.05 }}` on the recording button (use only `whileTap`)
- Standardize all animation durations to the scale above

---

## Implementation Roadmap

### Phase 1: Foundation (Design Tokens)
1. Update `app/globals.css` with new color system, typography, spacing, shadow, and radius variables
2. Update `@theme inline` block to map new design tokens
3. Create/update `tailwind.config.ts` with custom configuration (if needed)
4. Update `components.json` baseColor if changing from slate

### Phase 2: UI Library
5. Update all 41 shadcn/ui components to follow new design system
6. Update `button.tsx` with new variants, sizes, and radius rules
7. Update `input.tsx`, `textarea.tsx`, `select.tsx` with new input styles
8. Update `card.tsx` with new radius, shadow, and variant rules
9. Update `badge.tsx` with new sizes and variants
10. Update `dialog.tsx`, `sheet.tsx`, `alert-dialog.tsx` with new modal styles
11. Update `tabs.tsx`, `accordion.tsx`, `table.tsx` with new styles
12. Update remaining UI components (`tooltip`, `popover`, `dropdown-menu`, etc.)

### Phase 3: Page Components
13. Update `Navbar` with new navigation styles
14. Update `Hero` with new typography and spacing
15. Update `Features` and `FeatureCard` with new card styles
16. Update `Testimonials` with new testimonial card styles
17. Update `FAQ` with new accordion styles
18. Update `Footer` with new footer styles
19. Update `SpeechToText` and all sub-components with new tool styles
20. Update `ThemeToggle` with proper light/dark toggle

### Phase 4: States & Polish
21. Create loading state components
22. Create empty state components
23. Create error state components
24. Implement proper light mode
25. Add responsive refinements
26. Final consistency audit

### Phase 5: Verification
27. Test all breakpoints
28. Verify color contrast (WCAG AA)
29. Test keyboard navigation
30. Verify `prefers-reduced-motion` support
31. Cross-browser testing

---

## Current Design Issues (Detailed)

### Inconsistencies Found
1. **Border Radius Chaos**: `rounded-[2rem]`, `rounded-[3rem]`, `rounded-3xl`, `rounded-xl`, `rounded-lg`, `rounded-md`, `rounded-full`, `rounded-2xl`, `rounded-[2.5rem]` all coexist
2. **Shadow Overload**: `shadow-2xl shadow-primary/20`, `shadow-lg shadow-primary/25`, `shadow-xl shadow-red-500/5`, `shadow-sm`, `shadow-xs` — primary-colored shadows everywhere
3. **Background Chaos**: `bg-black/20`, `bg-background/70`, `bg-background/80`, `bg-background/90`, `bg-card`, `bg-muted`, `bg-secondary/20`, `bg-secondary/30`, `bg-white/10`, `bg-black/30`, `bg-black/90` — dozens of opacity values used inconsistently
4. **Gradient Overuse**: `bg-gradient-to-r from-primary to-blue-600`, `bg-gradient-to-br from-primary to-blue-600`, `bg-gradient-to-b from-foreground to-foreground/60`, gradient overlays on cards
5. **Glassmorphism Overuse**: `backdrop-blur-xl` on 15+ components, often with `bg-black/20` or `bg-background/XX`
6. **Scale Animation on Buttons**: `hover:scale-105 active:scale-95` on every button — feels playful, not professional
7. **Extreme Border Radius**: `rounded-[2rem]`, `rounded-[3rem]`, `rounded-[2.5rem]` on cards and buttons — not standard
8. **Two Different Footer Components**: Landing footer and SpeechToText footer have different styles and purposes
9. **No Light Mode**: Despite CSS variable infrastructure, only dark mode is fully implemented
10. **Color Inconsistency**: Primary actions use purple/blue gradients, but the color system defines a single primary
11. **Mixed Font Weights**: `font-black`, `font-bold`, `font-semibold`, `font-medium`, `font-bold` used inconsistently for similar elements
12. **No Loading States**: Only `Skeleton` component exists, no loading indicators in SpeechToText
13. **No Empty States**: Only HistorySheet has one empty state, no other components have empty/error states

### Color Audit
- **Current primary color**: `oklch(0.985 0.002 247.839)` — this is near-white, clearly wrong for a primary
- **Current background**: Very dark (`oklch(0.1 0.005 285.823)`)
- **Current card**: `oklch(0.12 0.005 285.823)` — slightly lighter than background
- **The `--primary` variable points to foreground color** — this is a bug in the current setup

### Architecture Notes
- All CSS variables use `oklch` color space (good for perceptual uniformity)
- `@theme inline` maps CSS variables to Tailwind utilities
- Components use `cn()` utility for class merging
- `framer-motion` used for animations throughout
- Radix UI primitives provide headless functionality
- `sonner` and `react-hot-toast` both used for notifications (consider consolidating)

---

## File Structure for Implementation

```
D:\Next_AI\Voice\my-app\
├── app/
│   ├── globals.css          # Updated design tokens
│   ├── layout.tsx           # Updated (add Toaster config)
│   └── page.tsx             # Updated layout
├── components/
│   ├── ui/                  # All 41 shadcn components updated
│   │   ├── button.tsx       # Updated variants, sizes
│   │   ├── input.tsx        # Updated styles
│   │   ├── textarea.tsx     # Updated styles
│   │   ├── card.tsx         # Updated variants
│   │   ├── badge.tsx        # Updated variants
│   │   ├── dialog.tsx       # Updated modal styles
│   │   ├── sheet.tsx        # Updated sheet styles
│   │   ├── alert-dialog.tsx # Updated confirmation styles
│   │   ├── tabs.tsx         # Updated tab styles
│   │   ├── accordion.tsx    # Updated accordion styles
│   │   ├── table.tsx        # Updated table styles
│   │   ├── select.tsx       # Updated select styles
│   │   ├── tooltip.tsx      # Updated tooltip styles
│   │   ├── popover.tsx      # Updated popover styles
│   │   ├── dropdown-menu.tsx# Updated dropdown styles
│   │   ├── tooltip.tsx      # Updated tooltip styles
│   │   ├── switch.tsx       # Updated switch styles
│   │   ├── checkbox.tsx     # Updated checkbox styles
│   │   ├── radio-group.tsx  # Updated radio styles
│   │   ├── slider.tsx       # Updated slider styles
│   │   ├── progress.tsx     # Updated progress styles
│   │   ├── skeleton.tsx     # Updated skeleton styles
│   │   ├── separator.tsx    # Updated separator styles
│   │   ├── alert.tsx        # Updated alert styles
│   │   ├── avatar.tsx       # Updated avatar styles
│   │   ├── label.tsx        # Updated label styles
│   │   ├── form.tsx         # Updated form styles
│   │   ├── scroll-area.tsx  # Updated scroll styles
│   │   ├── sonner.tsx       # Updated toast styles
│   │   ├── navigation-menu.tsx # Updated nav styles
│   │   ├── command.tsx      # Updated command styles
│   │   ├── calendar.tsx     # Updated calendar styles
│   │   ├── carousel.tsx     # Updated carousel styles
│   │   ├── chart.tsx        # Updated chart styles
│   │   ├── resizable.tsx    # Updated resizable styles
│   │   ├── drawer.tsx       # Updated drawer styles
│   │   ├── pagination.tsx   # Updated pagination styles
│   │   ├── context-menu.tsx # Updated context menu styles
│   │   ├── hover-card.tsx   # Updated hover card styles
│   │   └── collapsible.tsx  # Updated collapsible styles
│   ├── Navbar.tsx           # Updated
│   ├── Hero.tsx             # Updated
│   ├── Features.tsx         # Updated
│   ├── Testimonials.tsx     # Updated
│   ├── FAQ.tsx              # Updated
│   ├── Footer.tsx           # Updated
│   ├── SpeechToText.tsx     # Updated
│   ├── ThemeToggle.tsx      # Updated
│   ├── navbar/              # Updated
│   ├── hero/                # Updated
│   ├── features/            # Updated
│   ├── testimonials/        # Updated
│   ├── faq/                 # Updated
│   ├── footer/              # Updated
│   └── speech-to-text/      # Updated (13 components)
├── hooks/                   # Unchanged
├── lib/                     # Unchanged
├── types/                   # Unchanged
└── public/                  # Unchanged
```

---

## Conclusion

This design strategy transforms VoiceFlow from a feature-rich but visually inconsistent application into a premium, elegant, and professional platform. The key shifts are:

1. **From decorative to structural** — Remove gradients, glassmorphism, and excessive shadows
2. **From chaotic to systematic** — Unified border-radius, shadow, spacing, and typography scales
3. **From playful to professional** — Remove scale animations, excessive border-radius on interactive elements
4. **From dark-only to dual-mode** — Proper light mode support with the same design quality
5. **From inconsistent to cohesive** — Single button language, card language, navigation language

Every change preserves existing business logic, API calls, authentication, database operations, and state management. This is purely a UI/UX transformation.
