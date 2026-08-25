# Airbnb Listing Page Clone — Project Overview & Technical Documentation

> **Live Reference Site:** [airbnb-clone-umber-two.vercel.app](https://airbnb-clone-umber-two.vercel.app)  
> **Property Featured:** Mirashya Boutique Villa · Forest View Suite (Panaji, Goa, India)  
> **Architecture:** 3-Layer Deterministic Architecture (Specs → Orchestration → Execution)  
> **Framework Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, date-fns, React Hot Toast

---

## 1. Executive Summary

This project is a high-fidelity, pixel-perfect frontend replication of the modern Airbnb desktop property listing experience. Built using Next.js 16 with Turbopack, the application accurately reproduces the visual aesthetics, micro-interactions, layout proportions, typography hierarchy, and state synchronization of Airbnb's production platform while running purely with clean, plagiarism-free client-side code and modern React 19 architecture.

---

## 2. What We Built (PRD & Reference Requirements)

The application faithfully implements all core screens, sections, and interactive systems specified in `PRD-airbnb-clone.md` and the reference assignment brief:

### A. Screen 1: Main Property Listing Page
- **Navigation & Header:**
  - Standard Airbnb header with search pill (`Anywhere`, `Any week`, `Add guests`), globe language icon, and user profile menu pill.
  - **Dynamic Sticky Header Bar:** Smoothly appears when scrolling past the hero photo grid, featuring category anchor tabs (`Photos`, `Amenities`, `Reviews`, `Location`), live pricing, star rating, and a functional quick-action `Reserve` button.
- **Listing Title & Social Actions:**
  - Authentic typography matching the reference listing title.
  - **Functional `Share` button:** Copies the current listing URL to clipboard with a toast notification.
  - **Functional `Save` button:** Toggles wishlist state with filled heart SVG and persists selection to `localStorage`.
- **5-Photo Hero Grid:**
  - Asymmetric 1-large + 4-small photo layout with 8px radius, subtle hover brightness transitions, and an anchored `"Show all photos"` 9-dot pill button.
- **Guest Favourite Badge & Property Badges:**
  - Centered laurel wreath SVG badges with authentic rating breakdown (4.98 stars, 65 reviews) and Top 5% ranking banner.
- **Host Information & Property Highlights:**
  - Host avatar thumbnail, verified host badge, hosting tenure calculation, and highlights with custom SVG icons (Outdoor entertainment, Designed for staying cool, Self check-in).
- **Description & Sleeping Arrangements:**
  - Automatically translated notice bar, expandable text accordion (`Show more` / `Show less`), and bedroom card showcasing bed configuration.
- **Amenities Section:**
  - 2-column, 10-item preview grid with exact SVGs (including crossed-out strikethrough styling for absent alarms per the live reference).
  - Button opening the **All 50 Amenities Modal** with categorized sections (Bathroom, Bedroom & laundry, Heating/Cooling, Home safety, Kitchen, Outdoor, Parking, etc.) and backdrop blur.
- **Interactive Calendar & Availability Section:**
  - Dual-month interactive calendar showing availability in Panaji/Candolim, minimum stay calculations, and instant date range selection.
- **Reviews & Ratings Breakdown:**
  - Top category rating meters (Cleanliness, Accuracy, Check-in, Communication, Location, Value) with 5.0 / 4.8 scores.
  - Horizontally scrollable tag filter pills (`Comfort (6)`, `Accuracy (5)`, `Hot tub (5)`, `Hospitality (8)`, etc.).
  - Grid of guest reviews with avatars, dates, and review commentary.
- **Map & Location Section:**
  - SVG map interface with Candolim coastline, translucent landmark circles, floating search icon, zoom in/out controls, and a centered black home-pin bubble.
  - Neighborhood highlights with chevron expander.
- **Meet Your Host Section:**
  - Large host card featuring response rate (100%), response time (within an hour), education, co-hosts avatars/initials, and payment protection disclaimer with shield icon.
- **Things to Know & Footer:**
  - 3-column grid covering House rules, Safety & property, and Cancellation policy.
  - Complete Airbnb desktop footer with legal links and copyright.

---

### B. Screen 2: Photo Tour Modal
- **Categorized Room-by-Room Gallery:**
  - Full modal overlay displaying all 43+ listing photos grouped by room (Forest View Suite, Bedroom, Living Room, Full Kitchen, Full Bathroom, Exterior & Pool).
- **Sticky Room Jump Navigation:**
  - Top category pill bar that tracks active scroll position (Scroll Spy) and allows instant smooth-scrolling to any room section.
- **Interactive Header:**
  - Back arrow button, room title, and integrated Share/Save buttons with synchronized state.
- **Direct Lightbox Launch:**
  - Clicking any photo in the tour instantly launches the Lightbox starting from that specific photo.

---

### C. Screen 3: Fullscreen Lightbox Stage
- **Immersive Viewing Experience:**
  - Clean, distraction-free fullscreen carousel view with centered high-resolution photos.
- **Keyboard & Click Controls:**
  - `←` Left Arrow: Previous photo.
  - `→` Right Arrow: Next photo.
  - `Escape`: Close lightbox.
  - Floating circular Prev/Next chevron buttons with hover states.
- **Header Metadata & Grid Overview:**
  - Displays current room category and `X of 43` live counter.
  - 9-dot grid button returns directly to the Photo Tour modal overview.
- **Scroll Locking:**
  - Prevents background page scrolling while the lightbox or modals are open.

---

## 3. Extra Features & Enhancements (Above & Beyond the PRD)

In addition to fulfilling the core requirements, several production-grade features, safety mechanisms, and architectural optimizations were implemented:

### 1. Dual-Context Architecture (`GalleryContext` + `BookingContext`)
- Completely decoupled gallery modal state from calendar/reservation state for strict separation of concerns and reduced re-render cycles.
- Global date range state (`checkInDate`, `checkOutDate`) seamlessly connects the main page calendar, the sticky sidebar `BookingCard`, and the top scrolling `Header` navbar in real-time.

### 2. Intelligent Date Range & Past-Date Protection
- Default check-in date is dynamically set to today's date (+5 nights checkout).
- All past dates prior to today are automatically disabled with a `not-allowed` cursor and strikethrough visual styling.
- Interactive date selection updates price breakdown calculations, total taxes, and night counts on the fly.

### 3. Skeleton Loading Shimmers (`.airbnb-skeleton`)
- Added custom CSS shimmer keyframe skeleton loaders to the price badges and date slots.
- When users select new check-in/checkout dates, dates and totals briefly show a smooth loading shimmer before rendering updated calculations, delivering a snappy, responsive feel.

### 4. Interactive Reservation Modal
- Clicking the `"Reserve"` button on either the floating sidebar card or the top scrolling sticky navbar opens an Airbnb-themed interactive reservation confirmation modal with check-in details, price calculation, and guest selection.

### 5. Robust Security & Error Boundaries
- **`src/app/error.tsx`:** Modern Next.js App Router error boundary that catches unexpected client-side runtime errors and provides an Airbnb-styled *"Something went wrong"* recovery screen with a `"Try again"` button.
- **`src/app/not-found.tsx`:** Custom 404 page styled with Airbnb's brand palette and a *"Go to homepage"* redirect button.

### 6. Performance & Rendering Optimization
- **`React.memo()` on `AirbnbIcon`:** Memoized icon wrapper to prevent redundant re-renders across 70+ SVG icon instances during scroll or date selection events.
- **Variable Font Preloading:** `<link rel="preload">` configuration for `AirbnbCerealVF.woff2` variable font (100–900 weight range) ensuring zero layout shift (CLS) on initial paint.
- **Next.js 16 Viewport & Metadata:** Standalone `viewport` export configured for optimal mobile/desktop scaling and theme color definition.

### 7. Clean Codebase & Zero Indirection
- Removed intermediate icon mapping abstractions by directly inlining exact SVG filenames into components.
- Eliminated all dead code, unused scaffold assets, and development viewers, resulting in a streamlined, production-ready build (`npm run build` exits with 0 errors).

---

## 4. Verification & Quality Assurance

- **Static Generation:** Prerenders 100% statically as static HTML/CSS/JS bundles for instant edge delivery.
- **Accessibility:** Modal elements feature `role="dialog"`, `aria-modal="true"`, descriptive `aria-label` tags, and complete keyboard navigation loops.
- **Cross-Browser Styling:** Tested for layout stability across modern Chromium, WebKit (Safari), and Gecko (Firefox) engines.
