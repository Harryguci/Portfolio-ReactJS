---
name: Deep Space Lumina
colors:
  surface: '#111225'
  surface-dim: '#111225'
  surface-bright: '#37374d'
  surface-container-lowest: '#0b0c1f'
  surface-container-low: '#191a2d'
  surface-container: '#1d1e32'
  surface-container-high: '#27283d'
  surface-container-highest: '#323348'
  on-surface: '#e1e0fb'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e1e0fb'
  inverse-on-surface: '#2e2f43'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dbe7'
  primary: '#e1fdff'
  on-primary: '#00363a'
  primary-container: '#00f2ff'
  on-primary-container: '#006a71'
  inverse-primary: '#00696f'
  secondary: '#b8c4ff'
  on-secondary: '#002486'
  secondary-container: '#043ac5'
  on-secondary-container: '#aab8ff'
  tertiary: '#f9f6ff'
  on-tertiary: '#221e86'
  tertiary-container: '#d9d7ff'
  on-tertiary-container: '#5453b7'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#74f5ff'
  primary-fixed-dim: '#00dbe7'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b8c4ff'
  on-secondary-fixed: '#001355'
  on-secondary-fixed-variant: '#0036bc'
  tertiary-fixed: '#e2dfff'
  tertiary-fixed-dim: '#c2c1ff'
  on-tertiary-fixed: '#0b006b'
  on-tertiary-fixed-variant: '#3a399d'
  background: '#111225'
  on-background: '#e1e0fb'
  surface-variant: '#323348'
  deep-void: '#0a0b1e'
  neon-cyan: '#00f2ff'
  electric-indigo: '#4C6EF5'
  ghost-white: '#FFFFFF'
typography:
  headline-xxl:
    fontFamily: Anybody
    fontSize: 96px
    fontWeight: '800'
    lineHeight: 100%
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Anybody
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 110%
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Anybody
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 110%
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 160%
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 160%
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 100%
    letterSpacing: 0.2em
  nav-link:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 100%
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  section-gap: 160px
  container-max: 1440px
  gutter: 24px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is engineered for high-impact creative portfolios and digital agency landings. It leverages a **Futuristic Dark Mode** aesthetic that blends the technical precision of a gaming interface with the sophistication of a high-end fashion editorial.

The visual narrative is built on "Atmospheric Depth," utilizing deep radial gradients and neon luminescence to create an immersive, 3D-ready environment. The style prioritizes **Glassmorphism** for structural elements, allowing background animations and particle fields to remain visible through the UI, thereby enhancing the sense of digital transparency and technical prowess.

**Core Principles:**
- **Immersive Depth:** Use of light-sourced glows to simulate 3D space.
- **Cinematic High-Contrast:** Sharp white typography against midnight voids for maximum legibility and "pop."
- **Kinetic Precision:** Every element should feel as though it is powered by data or energy, suitable for GSAP-driven entrance and hover states.

## Colors

The palette is anchored in a monochromatic dark spectrum, punctuated by high-vibrancy "Energy Colors." 

- **Primary (Neon Cyan):** Reserved for interactive focal points, active states, and glowing accents. It represents the "light" in the void.
- **Secondary (Electric Indigo):** Used for depth-building gradients and subtle UI borders to soften the transition between black and cyan.
- **Backgrounds:** Utilize `#0a0b1e` as the base, but rarely as a flat color. Instead, use radial gradients that expand into slightly lighter blues to simulate a 3D atmosphere.
- **Text:** Pure white is used for primary headlines to ensure a "stamping" effect against the dark background.

## Typography

The typographic hierarchy is designed to be aggressive and modern. 

- **Headlines:** Use **Anybody** for its variable-width feel and bold, technical presence. Large-scale titles should use a tight letter-spacing to create a "blocky," authoritative look.
- **Body:** **Hanken Grotesk** provides a sharp, contemporary sans-serif experience that remains legible even at smaller scales or against glowing backgrounds.
- **Metadata/Labels:** **JetBrains Mono** is introduced for secondary data, small captions, and "HUD" elements to reinforce the futuristic, code-inspired aesthetic.

Large headlines (XXL) are intended for hero sections and should be treated as graphic elements, often using "Outline" text styles or clipping masks for images.

## Layout & Spacing

This design system uses a **Fixed Grid** approach with generous vertical "breathing room" to allow for immersive scroll animations.

- **Grid Model:** 12-column grid for desktop with 24px gutters. Elements should often "break" the grid slightly with floating offsets to suggest a 3D environment.
- **Vertical Rhythm:** Sections are separated by large gaps (160px+) to ensure that as the user scrolls, only one major visual thought occupies the viewport at a time.
- **Mobile Adaptation:** On mobile, margins reduce to 20px, and large display type scales down aggressively to maintain the "poster" aesthetic without causing horizontal overflow.
- **Safe Zones:** Use a 5% inner padding on the viewport edges to ensure that HUD-style corner elements don't get clipped by hardware notches or rounded device corners.

## Elevation & Depth

Depth in this system is achieved through light and transparency rather than physical shadow.

- **Glassmorphism:** All container surfaces (cards, navigation bars, modals) should use a backdrop-filter blur (minimum 12px) and a semi-transparent background (`rgba(255, 255, 255, 0.03)`).
- **Luminescent Outlines:** Instead of drop shadows, use a 1px border with a gradient stroke or low-opacity white/cyan to define object edges.
- **Glow Tiers:**
    - **Tier 1 (Surface):** Minimal blur, used for card containers.
    - **Tier 2 (Floating):** Substantial backdrop blur and a soft "bloom" effect using `box-shadow: 0 0 30px rgba(0, 242, 255, 0.15)`.
- **Background Depth:** Use multiple layers of radial gradients. A primary deep blue background with a secondary Cyan glow fixed behind the active cursor or a central focal point.

## Shapes

The shape language is primarily **Soft (0.25rem)** to maintain a technical, "hardware" feel. While the system is not entirely sharp (Brutalist), it avoids overly rounded or organic "bubbly" shapes.

- **Main UI Elements:** Buttons and input fields use a consistent 4px (Soft) radius.
- **Feature Cards:** May use a slightly larger radius (8px) but should never reach "Pill-shaped" status.
- **Circular Elements:** Reserved exclusively for profile avatars or specific "HUD" gauge elements to provide a geometric contrast to the rectangular grid.

## Components

### Buttons
- **Primary:** Neon Cyan background with black text. On hover, apply a `box-shadow` bloom effect and scale by 1.05.
- **Ghost:** 1px Cyan border with transparent background. Text in Cyan. Hover state fills the background with a 10% Cyan opacity.

### Navigation
- A "HUD" style top bar. Centered or split-aligned. Background uses a heavy backdrop blur (20px) and a bottom-border gradient stroke.

### Cards (Project/Service)
- No background color. Only a 1px `rgba(255, 255, 255, 0.1)` border. 
- On hover: The border color transitions to the primary Cyan, and the background gains a subtle `rgba(255, 255, 255, 0.05)` fill.
- Images inside cards should use a `grayscale(100%)` filter by default, transitioning to full color on hover to emphasize user interaction.

### Inputs
- Dark backgrounds (`#050610`). Borders only on the bottom or using very thin 1px ghost outlines. 
- Focus state: The bottom border glows Neon Cyan with a soft 4px blur.

### Chips & Tags
- Small, uppercase labels using **JetBrains Mono**. Encased in a thin, square-bordered box. These should look like technical metadata (e.g., "ROLE: DEVELOPER", "YEAR: 2025").