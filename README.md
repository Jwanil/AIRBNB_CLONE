# 🏡 Airbnb Listing Page Clone

> A high-fidelity, pixel-perfect desktop clone of modern Airbnb's property listing experience, built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)

---

## 📸 Property Featured

**Mirashya Boutique Villa · Forest View Suite**  
*Guesthouse in Panaji, Goa, India*  
- ⭐ **4.98 Rating** (65 Reviews) · **Top 5% of Homes (Guest Favourite)**
- 2 Guests · 1 Bedroom · 1 Bed · 1 Private Bathroom

---

## ✨ Core Features & Screens

### 1. 🏠 Main Property Listing Page
- **Header & Navigation:** Standard search pill (`Anywhere`, `Any week`, `Add guests`), language selector, user profile pill.
- **Smart Sticky Header:** Appears on scroll past hero gallery with section anchor tabs (`Photos`, `Amenities`, `Reviews`, `Location`), dynamic pricing calculation, and a quick-action `Reserve` button.
- **Interactive Listing Title:** Real-time **Share** (copies URL to clipboard with toast notification) and **Save** (wishlist toggle with heart animation and `localStorage` persistence).
- **Asymmetric 5-Photo Hero Grid:** 1 large + 4 small photo layout with hover brightness effects and `"Show all photos"` 9-dot launcher.
- **Guest Favourite Banner:** Authentic laurel wreath design with Top 5% ranking status.
- **Host Info & Highlights:** Verified badge, tenure calculation, and SVG highlight tags (Outdoor entertainment, Cooling, Smart lock self check-in).
- **Expandable Description:** Translation notice and dynamic text accordion (`Show more` / `Show less`).
- **Amenities Preview & Modal:** 2-column preview grid + modal with all 50 categorized amenities (Bathroom, Bedroom, Kitchen, Safety, Outdoor, Parking, etc.) with backdrop blur and smooth transitions.
- **Dual-Month Interactive Calendar:** Live check-in/checkout date range selection, minimum stay validation, and past-date blocking with strikethrough styling.
- **Reviews & Rating Breakdown:** 6 category score meters (Cleanliness, Accuracy, Check-in, Communication, Location, Value), horizontally scrollable tag filters, and guest reviews.
- **Interactive SVG Map:** Candolim coastline, landmark circles, floating search icon, zoom controls, and custom centered home pin.
- **Meet Your Host & Things to Know:** Comprehensive host card with co-host thumbnails, response rate, payment protection disclaimer, house rules, and cancellation policies.

### 2. 🖼️ Categorized Photo Tour Modal
- Over 43+ high-resolution property photos grouped by room category (*Forest View Suite, Bedroom, Living Room, Full Kitchen, Full Bathroom, Exterior & Pool*).
- Sticky category jump-bar with **Scroll Spy** tracking.
- Seamless one-click transition into the fullscreen Lightbox from any photo.

### 3. 🔍 Fullscreen Lightbox Stage
- Full-viewport immersive carousel stage.
- **Keyboard Navigation:** `←` / `→` arrow keys to browse, `Escape` to close.
- 9-dot grid button to quickly return to the Photo Tour modal overview.
- Current room title and dynamic `X of 43` live photo counter.
- Background scroll locking when active.

---

## 🚀 Extra Engineering Features

- **Decoupled State Management:** Separate `BookingContext` (dates, price recalculations, loading flags) and `GalleryContext` (modals, lightboxes, scroll positions) for optimal render performance.
- **Skeleton Shimmer Loaders (`.airbnb-skeleton`):** Instant CSS shimmer feedback when switching dates on the calendar or calculating totals.
- **Past-Date Protection:** Dynamically blocks previous calendar dates with disabled cursor and strikethrough styles.
- **Error Boundaries & Safety:** Built-in Next.js App Router `error.tsx` crash-recovery screen and custom `not-found.tsx` (404) page.
- **Performance Optimization:** `React.memo` icon wrapper preventing unnecessary re-renders across 70+ SVGs, and variable font preloading (`AirbnbCerealVF.woff2`) for zero Cumulative Layout Shift (CLS).

---

## 🛠️ Project Structure

```
airbnb-clone/
├── docs/
│   ├── project-description.md   # Full project & technical specification
│   └── prompts.md               # Chronological AI prompt & workflow log
├── public/
│   ├── fonts/                   # AirbnbCerealVF variable font
│   └── images/                  # Scraped photos, SVGs, and avatars
├── src/
│   ├── app/
│   │   ├── error.tsx            # Error boundary fallback UI
│   │   ├── globals.css          # Global styles, font-face & skeletons
│   │   ├── layout.tsx           # Root layout with font preload & viewport
│   │   ├── not-found.tsx        # 404 page
│   │   └── page.tsx             # Main page orchestration
│   ├── components/              # 20+ isolated, reusable UI components
│   ├── context/
│   │   ├── BookingContext.tsx   # Date range & reservation state
│   │   └── GalleryContext.tsx   # Lightbox & photo tour modal state
│   └── lib/
│       ├── listing-data.ts      # Structured mock listing data
│       ├── storage.ts           # LocalStorage & SessionStorage helpers
│       └── svg-manifest.ts      # Inline SVG asset map
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js 18.18+ or 20+
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Jwanil/AIRBNB_CLONE.git
   cd AIRBNB_CLONE
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

To verify and test the optimized production build:
```bash
npm run build
npm run start
```

---

## 🌐 Deployment

This application is ready for 1-click deployment on **[Vercel](https://vercel.com/)**:

```bash
npx vercel --prod
```

---

## 📄 License
This project is built for educational and portfolio demonstration purposes. All Airbnb brand logos, icons, and assets belong to Airbnb, Inc.
