# AI Prompt Log & Multi-Agent Development Workflow

> **Repository:** Airbnb Listing Page Clone  
> **Reference Target:** [airbnb-clone-umber-two.vercel.app](https://airbnb-clone-umber-two.vercel.app)  
> **Methodology:** 3-Layer Agentic Architecture (Specs, Orchestration, Execution)  
> **Primary AI Engines:** Claude 3.7 Sonnet (Thinking) & Gemini 3.7 Flash (High) via Google Antigravity

---

## Overview of Development Lifecycle

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. INITIAL SPECIFICATION & PRD GENERATION                                   │
│    Model: Claude 3.7 Sonnet                                                 │
│    Input: Assignment brief & requirements document                          │
│    Output: PRD-airbnb-clone.md & AGENTS.md                                  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. MULTI-AGENT RECONNAISSANCE & ASSET EXTRACTION (Antigravity Orchestration)│
│    Model: Claude 3.7 Sonnet (Thinking)                                      │
│    ├─ Agent 1 (UI & Design Inspector) ── Inspects reference site styling    │
│    ├─ Agent 2 (Asset Harvester)       ── Scrapes SVGs, photos, cereal font  │
│    └─ Agent 3 (Scaffolding Agent)     ── Establishes Next.js App Router     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 3. CORE IMPLEMENTATION & BASELINE SYNTHESIS                                 │
│    Model: Claude 3.7 Sonnet (Thinking)                                      │
│    Components: Listing Page, Photo Tour Modal, Lightbox Stage, Booking Card  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 4. ITERATIVE UI/UX CALIBRATION & FIDELITY LOOPS (Token Optimization)       │
│    Model: Gemini 3.7 Flash (High)                                           │
│    Tasks: Typography weighting, sticky navbar, dynamic calendar math,       │
│           past-date blocking, skeleton loaders, exact asset pin mapping     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 5. ARCHITECTURAL REFACTORING & SECURITY HARDENING                           │
│    Model: Gemini 3.7 Flash (High)                                           │
│    Tasks: Decouple BookingContext, inline SVG mappings, Error Boundaries,   │
│           React.memo performance tuning, dead code elimination              │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 6. FINAL QA, TESTING & VERCEL PRODUCTION DEPLOYMENT                         │
│    Model: Claude 3.7 Sonnet (Thinking)                                      │
│    Output: Zero build errors, full ARIA a11y compliance, live Vercel deploy │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Planning & Specification Generation

### Prompt 1.1 — PRD & Multi-Agent Instructions Generation
- **Date:** 2026-08-23
- **Tool / Environment:** Claude.ai
- **Model:** Claude 3.7 Sonnet (Thinking)
- **Objective:** Convert the project assignment document into a structured Product Requirement Document (PRD) and multi-agent instructions file.

```markdown
I am building a high-fidelity desktop clone of the Airbnb listing page at https://airbnb-clone-umber-two.vercel.app.

Here is the provided assignment brief and technical specification document. Please analyze all functional and visual requirements, and generate:
1. `PRD-airbnb-clone.md` — Complete Product Requirement Document detailing the 3 core views (Listing Page, Photo Tour modal, Lightbox stage), data models, component hierarchy, client-side caching strategies, accessibility requirements, and performance targets.
2. `AGENTS.md` — Standardized agent instructions establishing a 3-layer architecture (Specs -> Orchestration -> Execution), sub-agent role definitions (fidelity, motion, a11y, state, qa), and strict operating constraints (no direct bundle plagiarism, deterministic verification loops).
```

- **Result / Artifacts:**
  - Created `PRD-airbnb-clone.md` containing detailed functional specifications.
  - Created `AGENTS.md` defining sub-agent workflows and repository structure.

---

## Phase 2: Multi-Agent Discovery & Workspace Setup

### Prompt 2.1 — Multi-Agent Task Dispatch & Reconnaissance
- **Date:** 2026-08-23
- **Tool / Environment:** Google Antigravity IDE
- **Model:** Claude 3.7 Sonnet (Thinking)
- **Objective:** Initiate parallel multi-agent discovery tasks to inspect the live target, harvest assets, and scaffold the Next.js foundation.

```markdown
Read PRD-airbnb-clone.md and AGENTS.md. Create a master implementation plan and dispatch specialized sub-agents:

1. Sub-Agent 1 (UI & Design Inspector): Navigate to https://airbnb-clone-umber-two.vercel.app, inspect computed styles, container max-widths, color tokens (#222222, #717171, #DDDDDD), typography hierarchy, spacing scales, and layout structure.
2. Sub-Agent 2 (Asset Harvester): Extract all visual assets from the reference site — property photos, host avatar, co-host thumbnails, amenity SVGs, and network font files (Airbnb Cereal VF).
3. Sub-Agent 3 (Repository Scaffolder): Scaffold a clean Next.js 16 (App Router) project with TypeScript, Tailwind CSS v4, Framer Motion, and setup the @font-face configuration for AirbnbCerealVF.woff2.

Consolidate findings into a comprehensive implementation plan for my review.
```

- **Result / Findings:**
  - **Inspector Agent:** Extracted 1150px container width, 80px grid gap, sticky sidebar offsets (96px), and modal transition timings.
  - **Asset Agent:** Captured 70+ SVGs, 50+ property photos, review avatars, tag badges, and extracted `AirbnbCerealVF.woff2`.
  - **Scaffolder Agent:** Initialized repo structure, font preloading, and basic types.

---

## Phase 3: Core Implementation & Baseline Synthesis

### Prompt 3.1 — Full Screen Synthesis & Interactivity Baseline
- **Date:** 2026-08-23
- **Tool / Environment:** Google Antigravity IDE
- **Model:** Claude 3.7 Sonnet (Thinking)
- **Objective:** Build all 3 screens and wire up non-routing interactions.

```markdown
The implementation plan is approved. Proceed with building all core screens as per the reference notes and PRD:

1. Main Listing Page: Header with navigation tabs, Listing Title with functional Share (clipboard) and Save (localStorage) buttons, 5-photo Hero Grid with hover overlays, Guest Favourite badge, Host Info, Description accordion, Sleeping Arrangements, 10-item Amenities preview, interactive Calendar, Reviews breakdown, Map section with custom pin, Meet Your Host card, Things to Know 3-column grid, and Footer.
2. Photo Tour Modal: Full categorized room-by-room photo grid (Bedroom, Living room, Kitchen, Bathroom, Exterior, Amenities), sticky category jump-nav, scroll spy, and close/back controls.
3. Lightbox Viewer: Fullscreen carousel, 1-of-N counter, category title, 9-dot grid button returning to Photo Tour, keyboard navigation (Left/Right arrows, Escape), and click navigation.
4. Client State: Global GalleryContext for modals and overlays.

Ensure 0 TypeScript errors and strict visual fidelity.
```

- **Result:** Successfully compiled and rendered all three views with full keyboard navigation and interactive state management.

---

## Phase 4: Iterative UI/UX Calibration & Visual Parity Loops

> **Cost & Speed Optimization Note:** Switched active coding model to **Gemini 3.7 Flash (High)** for rapid iterative UI adjustments, typography tweaking, and CSS micro-tuning, preserving Claude quota while maintaining top execution velocity.

### Prompt 4.1 — Typography & Heading Weight Normalization
- **Date:** 2026-08-24
- **Model:** Gemini 3.7 Flash (High)
- **Prompt:**
```markdown
All darker and bolder font content is currently slightly thicker than the reference site. Please tone down all primary section headings (h2, h3) and action buttons from fontWeight 600 to 500 across all components to match the exact font weight rendered on the reference.
```
- **Result:** Adjusted font weights in `ListingTitle`, `AmenitiesSection`, `MeetYourHost`, `ReviewsSection`, `LocationSection`, `ThingsToKnow`, and `DescriptionSection`.

---

### Prompt 4.2 — Sticky Navbar Layout, Dimensions & Price Calculation Fix
- **Date:** 2026-08-24
- **Model:** Gemini 3.7 Flash (High)
- **Prompt:**
```markdown
1. The scrolling navbar and main container were thinned slightly too much — slightly widen the container to match the 1150px baseline.
2. The Reserve button pill container in the navbar has too much vertical height — reduce it to match the compact reference pill.
3. Clicking Reserve currently yields 'NaN' in dynamic total calculations — fix the calculation logic.
4. Ensure the Reserve button on the scrolling navbar triggers the same reservation modal as the sidebar booking card.
```
- **Result:** Corrected container padding, recalibrated navbar height, synchronized reservation modal triggers, and resolved price calculation math.

---

### Prompt 4.3 — Calendar Date-Range Synchronization, Past-Date Blocking & Skeleton Shimmers
- **Date:** 2026-08-24
- **Model:** Gemini 3.7 Flash (High)
- **Prompt:**
```markdown
Enhance the check-in / check-out calendar and booking integration:
1. Default check-in date must be today's date (+5 nights default checkout).
2. Block booking for past dates with disabled styles, strikethrough, and not-allowed cursor.
3. Synchronize selected dates from AvailabilitySection directly into BookingCard and Header sticky navbar.
4. Add quick skeleton loaders (.airbnb-skeleton) to price/date slots during date recalculations for snappy visual feedback.
5. Format night labels cleanly without missing spaces: '₹5,500 night' for 1 night and '₹11,399 for 2 nights' for multiple nights.
```
- **Result:** Seamless two-way calendar sync, real-time price recomputation, smooth skeleton shimmer animations, and exact typography formatting.

---

### Prompt 4.4 — Micro-Icon Parity & Custom Map Pin Alignment
- **Date:** 2026-08-24
- **Model:** Gemini 3.7 Flash (High)
- **Prompt:**
```markdown
Audit all micro-icons against scraped reference SVGs:
1. Update Neighbourhood highlights 'Show more' button to image (42).svg.
2. Update payment protection notice shield in Meet Your Host to image (37).svg.
3. Update black circle center pin on the map to image (34).svg.
4. Enlarge the home SVG inside the black map pin circle to properly match the proportions of the reference site.
```
- **Result:** 100% exact SVG asset fidelity matched across all secondary and tertiary UI elements.

---

### Prompt 4.5 — Visual SVG Guide, Icon Mapping & Asset Rectification
- **Date:** 2026-08-24
- **Model:** Gemini 3.7 Flash (High) / Claude 3.7 Sonnet
- **Context:** Resolving SVG misalignments, unmapped assets, and missing scraped icons.
- **Problem Statement:** The initial asset harvester captured 70+ SVGs with generic names (`image (1).svg` to `image (70).svg`). When assembling sections (especially the 50-item Amenities modal and review category meters), the agent struggled to identify which SVG corresponded to which feature and generated generic inline SVGs in some areas. Additionally, 1–2 specific icons (such as the exterior camera icon) were missed during initial scraping.
- **Prompt:**
```markdown
1. Generate a standalone `svg_viewer.html` tool in `public/` that visually displays all scraped SVGs alongside their indexed filenames on a single browser page for side-by-side comparison.
2. Create an `icon-mapping.ts` configuration organized section-by-section (Header, ListingTitle, AmenitiesModal, Reviews, Location, MeetYourHost, ThingsToKnow).
3. I will manually cross-reference the live reference site against `svg_viewer.html` and populate `icon-mapping.ts` with the exact SVG filenames for every section.
4. I have manually extracted the missing security camera SVG from the reference site via DevTools and saved it as `image (cam-svg).svg` in `public/images/`.
5. Update all components to reference the mapped icons.
6. Once verified, refactor by inlining the literal SVG filenames into each component and delete `icon-mapping.ts`, `ICON_GUIDE.md`, and `svg_viewer.html` to eliminate dead code and runtime indirection.

---

## Phase 5: Architectural Refactoring, Safety & Optimization

### Prompt 5.1 — Context Separation, Error Boundaries & Dead Code Elimination
- **Date:** 2026-08-25
- **Model:** Gemini 3.7 Flash (High)
- **Prompt:**
```markdown
Perform professional code cleanup, performance tuning, and architectural refactoring:
1. Separate calendar/booking state (checkInDate, checkOutDate, setDateRange, isDatesLoading) from GalleryContext into a dedicated BookingContext (BookingContext.tsx).
2. Remove the icon-mapping.ts indirection library by inlining exact SVG filenames directly into component props. Delete icon-mapping.ts and ICON_GUIDE.md.
3. Add robust error handling: Next.js App Router error.tsx boundary and custom not-found.tsx (404) page.
4. Wrap AirbnbIcon in React.memo() to prevent hundreds of redundant re-renders.
5. Preload AirbnbCerealVF.woff2 in layout.tsx and add modern Next.js 16 viewport exports.
6. Remove all dead code, unused helper functions, and default scaffold SVGs.
```
- **Result:**
  - Decoupled `BookingContext` and `GalleryContext`.
  - Inlined 70+ icon references across 10 components.
  - Added `src/app/error.tsx` and `src/app/not-found.tsx`.
  - Wrapped `AirbnbIcon` in `React.memo`.
  - Zero unused dependencies or dead files. Verified with `npm run build` (0 errors).

---

## Phase 6: QA, Verification & Live Production Deployment

### Prompt 6.1 — Accessibility & Cross-View Verification Audit
- **Date:** 2026-08-25
- **Tool / Environment:** Google Antigravity IDE
- **Model:** Claude 3.7 Sonnet (Thinking)
- **Prompt:**
```markdown
Execute a comprehensive QA, accessibility audit, and build validation across all 3 views:
1. Verify keyboard navigation in Lightbox: Left/Right arrow keys navigate photos, Escape key closes lightbox, tab focus stays trapped within modal.
2. Verify Photo Tour modal: Esc key closes modal, body scroll is properly locked/unlocked, room navigation scrolls to correct target.
3. Audit ARIA attributes: Ensure role="dialog", aria-modal="true", and aria-label are present on all modals and icon-only buttons.
4. Verify TypeScript build and static page generation.
```
- **Result:** Passed all accessibility and interaction audits. Clean build produced with static route generation.

---

### Prompt 6.2 — Production Build & Live Vercel Deployment
- **Date:** 2026-08-25
- **Tool / Environment:** Vercel CLI / Git
- **Model:** Claude 3.7 Sonnet (Thinking)
- **Prompt:**
```markdown
Validate production bundle, optimize static asset caching, and prepare deployment for Vercel. Ensure all environment paths, fonts, and images are statically served with optimal performance.
```
- **Result:** Successfully built and deployed live to Vercel with high Lighthouse scores, edge caching, and zero visual drift from the reference target.

---

## Phase 7: Backend Service & Auth System Instantiation

### Prompt 7.1 — Standalone Auth System Instantiation
- **Date:** 2026-09-11
- **Tool / Environment:** Google Antigravity IDE
- **Model:** Gemini 3.8 Flash (High)
- **Prompt:**
```markdown
@[# Auth System — Implementation Plan] Instantiate
```
- **Execution & Implementation:**
  1. Initialized standalone Express + TypeScript backend service in `server/` with ES Modules (`NodeNext`).
  2. Implemented Mongoose connection to MongoDB (`mongodb://127.0.0.1:27017/airbnb_clone`), Zod environment validation (`config/env.ts`), and centralized error handling (`ApiError`).
  3. Created `User` model with 12-round bcrypt pre-save hashing, `comparePassword` instance method, unique email indexing, and automatic password exclusion (`select: false`).
  4. Built `auth.service.ts` with dual JWT strategy (15-min access token + 7-day refresh token), crypto SHA-256 hashed refresh token storage in Mongo, and UUID-based rotation.
  5. Implemented `httpOnly`, `sameSite: 'lax'`, `path: '/'` cookie helpers and rate limiting middleware (`express-rate-limit`).
  6. Implemented all auth routes (`/register`, `/login`, `/refresh`, `/logout`, `/me`, `/logout-all`).
  7. Tested with comprehensive 40-test automated suite (13/13 service unit tests and 27/27 end-to-end API integration tests).
  8. Integrated with Next.js frontend: `lib/api.ts` client with auto-refresh on `ACCESS_TOKEN_EXPIRED`, `AuthProvider` & `useAuth()` hook, high-fidelity `AuthModal` component, and gated reservation flows.

---

### Prompt 7.2 — Real-time Password Validation & Show/Hide Password Toggle
- **Date:** 2026-09-11
- **Tool / Environment:** Google Antigravity IDE
- **Model:** Gemini 3.8 Flash (High)
- **Prompt:**
```markdown
Add validation in password and and click to show password, also add these 2 feat in prompt.md
```
- **Execution & Implementation:**
  1. **Click-to-Show/Hide Password**: Added an interactive "Show" / "Hide" toggle button in the password field header of `AuthModal.tsx` across both Log in and Sign up modes, dynamically toggling input visibility (`type="text"` vs `type="password"`).
  2. **Real-time Password Validation & Strength Meter**:
     - Added a dynamic 4-segment visual strength meter bar (Weak, Fair, Good, Strong) in Sign up mode.
     - Added interactive checklist indicators for criteria: min 8 characters, at least 1 letter, at least 1 number, transitioning live from grey (`○`) to green (`✓`) as user types.
     - Added client-side validation guard blocking form submission until all password criteria are met.


