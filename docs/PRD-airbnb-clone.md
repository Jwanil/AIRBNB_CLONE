# PRD: Airbnb Listing Page Clone (Playpower Labs Take-Home)

**Owner:** Jwanil
**Status:** Draft v1
**Reference (single source of truth):** https://airbnb-clone-umber-two.vercel.app
**Scope window:** ~3–4 hours, desktop only

---

## 1. Objective

Build a pixel-perfect, behaviorally-identical clone of a real Airbnb listing page, plus its two overlay views (Photo Tour, Lightbox). The deliverable is judged on visual fidelity, interaction/animation parity, accessibility, and how well AI coding agents were used to produce it — not on inventing new product features.

## 2. Background

This is a take-home assignment from Playpower Labs. The brief explicitly states:
- The reference URL is the **single source of truth** — match layout, spacing, typography, colors, icons, assets, hover/scroll animations, transitions, keyboard navigation, and focus management exactly.
- Desktop-only. Mobile is out of scope.
- Backend is **optional** — browser storage is an acceptable substitute.
- A production-scale architecture diagram (frontend, backend, storage, search, deployment scaling strategy) must be submitted alongside the app.
- Direct lift-and-shift of the reference codebase is disqualifying; work must be original.
- Evaluators will look at AI workflow usage (agents, sub-agents, skills, prompts), fidelity, architecture thinking, and code quality — the prompt sequence used may be requested.

## 3. Goals & Success Metrics

| Goal | Metric |
|---|---|
| Visual fidelity | Near-zero visual diff vs. reference at common breakpoints (spacing, type scale, color tokens, iconography, imagery) |
| Behavioral fidelity | Every hover state, scroll behavior, and transition present in the reference is reproduced with matching easing/duration |
| Accessibility | Full keyboard operability of gallery + lightbox (Tab order, Enter/Space activation, ←/→ navigation, Esc to close, focus trap + focus return, visible focus rings, ARIA roles/labels) |
| Code quality | Componentized, typed, readable, with sub-agent/skill configs included in submission |
| Architecture thinking | Diagram clearly shows how this evolves into a production vacation-rental marketplace |
| Originality | No copied source from the reference site; implementation derived from observed behavior only |

## 4. Scope

### In scope
- **Listing Page** — hero photo grid, title, share/save actions, property type + summary line, host info, amenities, description, (booking widget if present on reference), reviews section, map/location block — whatever sections the reference actually renders.
- **Photo Tour** — full-screen gallery view triggered by "Show all photos" or any hero thumbnail; grid/stacked layout with per-photo captions.
- **Lightbox** — single-photo viewer opened from any gallery photo; prev/next arrows, ← / → keyboard navigation, close (Esc + click-outside/X), smooth image transitions.
- Static/mock listing data (one listing is sufficient — the reference itself only shows one).
- Runs locally via `npm install && npm run dev` — no deployment required for submission.
- Architecture diagram for a production-scale version of this product.

### Out of scope
- Mobile/responsive layouts (not required by the brief — see §15 for an optional stretch pass, attempted only after desktop is fully done).
- Real authentication, payments, or booking transactions.
- Search results / map search page (the reference only exposes a single listing page — do not invent screens not present in the source of truth).
- Multi-listing marketplace functionality (this belongs in the architecture diagram, not the build).

## 5. Functional Requirements

### 5.1 Listing Page
- Reproduce exact section order, spacing, and grid structure from the reference.
- Photo grid: primary hero image + secondary thumbnails in the reference's exact grid arrangement, with a "Show all photos" affordance in the exact position/style.
- Sticky/scroll behavior for any element that sticks on scroll in the reference (e.g., booking card, nav bar) — match trigger scroll offset and transition.
- Hover states on all interactive elements (buttons, photo tiles, icons) matching the reference's hover animation (scale/opacity/underline/shadow — whichever applies).
- Share/Save icon buttons functional at least to a UI-state level (e.g., toggle saved state) even without backend persistence.

### 5.2 Photo Tour
- Opens as a full-screen/overlay route or modal — match whichever the reference uses (route change vs. modal overlay) including the transition used to enter/exit.
- Displays all listing photos with per-photo captions, grouped by room/area if the reference does so.
- Clicking any photo opens the Lightbox at that photo's index.
- Close affordance returns to the exact scroll position on the Listing Page.

### 5.3 Lightbox
- Opens directly from any gallery thumbnail or from within Photo Tour, always at the clicked photo's index.
- Prev/Next controls (click) and keyboard (← / →) navigate through the full photo set, wrapping or stopping at bounds exactly as the reference does.
- Esc closes; focus returns to the element that opened the lightbox.
- Image transition (fade/slide) matches reference timing.
- Focus is trapped inside the lightbox while open (Tab does not escape to the page behind it).

## 6. Non-Functional Requirements

- **Fidelity-first:** every ambiguous implementation choice is resolved by re-inspecting the reference (DevTools computed styles, timing, spacing) rather than guessing from generic Airbnb knowledge.
- **Performance:** images lazy-loaded outside the initial viewport; no layout shift on load; smooth 60fps transitions.
- **Accessibility:** WCAG-reasonable semantics — proper roles for dialog/gallery, `aria-label`s on icon-only buttons, logical tab order, visible focus states.
- **Browser support:** latest Chrome/Edge/Firefox, desktop only.
- **No dead code / no leftover scaffolding** in the final submission.

## 7. Tech Stack

- **Frontend:** Next.js (App Router) + React + TypeScript
- **Styling:** Tailwind CSS with a small design-token layer (colors, spacing, radii, shadows) extracted from the reference, so hand-tuned pixel values aren't scattered inline
- **Animation:** Framer Motion for transitions/overlays (matches reference-style motion without hand-rolled CSS keyframes for everything)
- **State:** local component state + React Context for gallery/lightbox index; no global store needed at this scope
- **Backend (optional, this build):** none required — see §9 for the client-side approach used instead, and §8 for what a *real* backend would look like at production scale
- **Deployment:** not required for submission — run locally via `npm install && npm run dev`. Skip hosting entirely unless you want to attempt it as a bonus; it isn't judged.

**Asset sourcing:** every image on the reference — property photos, host avatar, and all icons (share, save/heart, chevrons, amenity icons, etc.) — has already been scraped and stored locally in an `images/` folder at the project root. Components should reference these local files directly rather than hotlinking the reference site or re-scraping. This also means no image CDN/optimization service is needed for the take-home build (Next.js `<Image>` can serve directly from `public/images` or an equivalent local path).

## 8. Backend Applications (Production-Scale Proposal)

The take-home itself doesn't need a backend, but the brief asks for an architecture diagram showing how this scales into a real vacation-rental marketplace. These are the backend services/applications that diagram — and a future iteration of this codebase — would include:

| Service | Responsibility | Notes |
|---|---|---|
| **Listings Service** | CRUD for listings, photos, amenities, pricing rules, availability calendar | Owns listing data; source of truth for the page this task clones |
| **Media Service** | Image upload, resizing/transcoding, CDN origin | Backed by object storage (S3/GCS) + CDN (CloudFront/Cloudflare) |
| **Search & Discovery Service** | Geo + filter search, ranking | Elasticsearch/OpenSearch or Algolia; indexed async from Listings Service |
| **Booking/Reservation Service** | Availability locking, date-range booking, cancellation rules | Needs strong consistency (transactional DB) to prevent double-booking |
| **Pricing Service** | Dynamic pricing, fees, currency conversion | Can be a rules engine or ML-driven pricing model downstream |
| **User/Identity Service** | Auth (guest + host), profile, sessions | OAuth2/JWT; could use a managed auth provider (Auth0/Clerk) or roll-your-own |
| **Reviews & Ratings Service** | Post-stay reviews, rating aggregation | Async aggregation job updates cached rating on the Listings Service |
| **Messaging Service** | Host↔guest chat, inquiry threads | WebSocket/pub-sub (e.g., via Redis or a managed service) |
| **Notifications Service** | Email/SMS/push for booking events | Event-driven, subscribes to Booking Service events (queue-based) |
| **Payments Service** | Payment intent, payout to hosts | Wraps a PSP (Stripe Connect is the natural fit for marketplace payouts) |
| **Analytics/Event Service** | Page views, funnel tracking, experimentation | Fire client events to a stream (Kafka/Kinesis) → warehouse |

**Suggested integration pattern:** API Gateway in front of these services (or a BFF layer in Next.js API routes for the frontend's needs), with services communicating internally via REST/gRPC for request/response and an event bus (Kafka/SQS/SNS) for async workflows (booking confirmed → notify, review submitted → re-aggregate rating, etc.). This is the shape the architecture diagram should show, alongside CDN + edge caching for the frontend, read replicas for Listings/Search, and autoscaled stateless service pods behind the gateway.

## 9. Client-Side Caching & Storage Strategy (This Build)

Since the take-home build uses static/mock data and no backend, the goal of client-side caching here isn't "avoid a slow network" — it's to demonstrate the *pattern* a real app would use, and to make the UI feel instant on repeat interactions (gallery re-opens, lightbox re-navigation).

- **In-memory data cache (React Query / SWR):** wrap the mock "listing fetch" in a query hook even though the source is local — this is the seam where a real API call would slot in later, and it gives free request de-duping + stale-time caching.
- **`sessionStorage` for UI/view state:** last opened lightbox index, whether Photo Tour was open, gallery scroll position — restored on back/forward navigation within the session, cleared on tab close.
- **`localStorage` for user preferences:** saved/favorited toggle state on the listing, so a "Save" click persists across reloads without a backend.
- **`IndexedDB` (via a tiny wrapper, e.g. `idb`) for image blobs (stretch, optional):** cache decoded/prefetched gallery images so re-opening the Photo Tour or Lightbox is instant, avoiding a re-fetch/re-decode.
- **Prefetching:** on hover of a thumbnail, prefetch the next 2–3 images in gallery order so lightbox navigation feels instant.
- **Cache invalidation:** all of the above is versioned by a `listingId` + a schema version key, so a future real backend integration can safely bust stale client caches on deploy.

This gives a clean "what changes when a backend arrives" story for the architecture diagram: the React Query layer's mock fetcher gets swapped for a real fetcher hitting the Listings Service; everything else (session/local/IndexedDB caching) stays as-is.

## 10. Data Model (Take-Home Scope)

```
Listing {
  id, title, propertyType, summaryLine,
  host: { name, avatarUrl, isSuperhost, joinedYear },
  photos: Photo[],
  amenities: Amenity[],
  description: string,
  rating: number, reviewCount: number,
  location: { lat, lng, area, country },
}

Photo {
  id, url,         // local path into images/, e.g. "/images/listing-hero.jpg" — not the reference site's URL
  alt, room/areaLabel, caption
}

Amenity { id, label, iconName }
```

## 11. Milestones (target: 3–4 hrs)

1. **Setup & reference audit (30 min):** scaffold Next.js + Tailwind, inspect reference DOM/CSS, capture reference screenshots at key states (default, hover, gallery open, lightbox open). Image assets are already scraped into `images/`, so this step is DOM/CSS/timing audit only, not asset gathering.
2. **Design tokens + static layout (45 min):** colors, spacing, type scale; build Listing Page static structure.
3. **Interactivity (60 min):** hover states, sticky behavior, Photo Tour overlay, Lightbox with keyboard nav + focus trap.
4. **Animation pass (45 min):** match transition timing/easing across all three views.
5. **Accessibility + caching pass (30 min):** ARIA, focus management, session/local storage wiring.
6. **QA + diff pass (30 min):** side-by-side comparison against reference; fix drift.
7. **Architecture diagram + prompt log + README (30 min):** finalize the production-scale diagram, prompt log, and a short README with `npm install && npm run dev` instructions — no deployment needed.
8. **Stretch goals, if time remains (see §15):** attempt in priority order; stop the moment core desktop fidelity would be put at risk.

## 12. Deliverables & Submission Checklist

- [ ] Zipped project (code + architecture diagram as image/PDF)
- [ ] Architecture diagram covering frontend, backend, storage, search, deployment scaling
- [ ] README with local run instructions (`npm install && npm run dev`) — no live deployment required
- [ ] Sub-agent / skill config files included in the repo
- [ ] Prompt sequence log used for AI-assisted development
- [ ] **Not** pushed to a public GitHub repository

## 13. Risks / Open Questions

- Exact section order/content on the reference page needs direct visual inspection (this PRD doesn't assume Airbnb's generic layout — verify against the live reference before building).
- Whether the reference's Photo Tour is a route change or a modal changes the implementation approach and should be confirmed early.
- Font matching (self-hosted vs. system fallback) affects perceived fidelity most — verify via computed styles.

## 14. Definition of Done

A screen is "done" when: layout/spacing/type/color visually matches the reference at normal + hover states, every documented interaction works via mouse and keyboard, no console errors, and Lighthouse accessibility score is not materially worse than a hand-checked pass on focus order and ARIA labeling.

## 15. Stretch Goals / Extra Polish (Optional)

None of these are required by the brief — the assignment is explicit that desktop-only, and that "a clean, complete implementation is better than an over-engineered incomplete one." Treat everything below as bonus scope, attempted **only after** §14's Definition of Done is met for all three core screens. Priority order, roughly effort-sorted low → higher:

1. **Responsive/mobile layout** — reflow the Listing Page, Photo Tour, and Lightbox at tablet (~768px) and mobile (~390px) breakpoints: single-column hero instead of the grid, stacked sections, simplified header, swipeable gallery. This is the single highest-signal stretch item since the brief calls it out by name as not required — doing it well (without breaking desktop fidelity) is a clear differentiator.
2. **README** — setup steps, architecture summary, and a link to the prompt log. Cheap to write, high signal for evaluators skimming the submission.
3. **Component tests** — Jest + React Testing Library covering Lightbox keyboard navigation (←/→/Esc) and focus trap/return; reinforces the accessibility and code-quality evaluation criteria.
4. **SEO/meta polish** — proper `<title>`, meta description, Open Graph + Twitter card tags for the listing page, favicon matching the reference's.
5. **Loading polish** — skeleton placeholders or a blur-up effect while gallery images decode, so there's no layout shift or blank flash.
6. **Micro-feedback on actions** — a small toast or inline confirmation on Save ("Saved") and Share ("Link copied"), matching the reference's tone if it has one.
7. **404 page + error boundary** — minor robustness touch, low effort.
8. **Dark mode toggle** — only if time allows and it's clearly additive (off by default, reference fidelity unaffected when off); lowest priority since it's not something the reference itself has.

Stop at any point where a stretch item risks introducing regressions to the core desktop fidelity — the core build is what's actually being scored.
