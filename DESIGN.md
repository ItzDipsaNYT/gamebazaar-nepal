# Design Brief

## Direction

GameBazaar Nepal — gaming-themed ecommerce platform with neon-accented dark UI, glassmorphic surfaces, and smooth motion.

## Tone

Futuristic gaming aesthetic with professional credibility; bold purple & cyan neon accents on deep navy backgrounds create premium, energetic atmosphere.

## Differentiation

Animated floating logo, glassmorphic cards with glowing neon borders, and particle/gradient hero background set it apart from generic ecommerce.

## Color Palette

| Token      | OKLCH         | Role                             |
| ---------- | ------------- | -------------------------------- |
| background | 0.10 0 0      | Deep navy base                   |
| foreground | 0.96 0 0      | Bright white text                |
| card       | 0.16 0 0      | Elevated card surface            |
| primary    | 0.65 0.22 307 | Purple neon accent               |
| accent     | 0.72 0.20 196 | Cyan neon accent                 |
| border     | 0.25 0.05 307 | Subtle purple-tinted borders     |
| muted      | 0.22 0 0      | Secondary surfaces               |

## Typography

- Display: Space Grotesk — headings, hero text, gaming-forward geometric aesthetic
- Body: DM Sans — paragraphs, labels, product descriptions, high readability
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold`, label `text-sm font-semibold uppercase`, body `text-base`

## Elevation & Depth

Glassmorphism with tiered shadows; card surfaces use backdrop blur + semi-transparent background, neon glow shadows for hover states.

## Structural Zones

| Zone    | Background           | Border                    | Notes                             |
| ------- | -------------------- | ------------------------- | --------------------------------- |
| Header  | card/40 backdrop     | border/50 purple tint     | Navigation, logo, cart, auth      |
| Hero    | gradient + particles | —                         | Animated dot-grid, gradient blend |
| Content | alternating bg/card  | border subtle glow        | Product grid, features sections   |
| Footer  | card/60 backdrop     | border-t border/50        | Links, contact, social icons      |

## Spacing & Rhythm

8px base unit; sections 2-4rem gap; cards 1rem padding; micro-spacing 0.5rem for labels.

## Component Patterns

- Buttons: purple/cyan rounded-lg, hover scale-105 + neon-glow shadow, 0.3s transition
- Cards: glass-card utility (backdrop + border), hover-lift animation, shadow on focus
- Badges: uppercase semibold label, color-coded by category (Streaming/Gaming/Software)

## Motion

- Entrance: fade-in 0.5s easing on page load, staggered card animations
- Hover: scale-105, neon glow intensity increase, 0.3s cubic-bezier
- Decorative: floating logo 3s ease-in-out, hero particle background loop

## Constraints

- No raw hex colors; all OKLCH tokens only
- No garish full-page gradients; use subtle blends on hero
- Glassmorphism on cards only, not entire layout
- Purple/cyan dominance; avoid competing accent colors

## Signature Detail

Animated floating logo with gaming controller icon positioned top-left; subtle pulsing glow creates premium, interactive feel that telegraphs product focus.
