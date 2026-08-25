# Agent Instructions — Airbnb Listing Page Clone

> Mirrored across CLAUDE.md, AGENTS.md, and GEMINI.md so the same instructions load in any AI coding environment (Claude Code, Codex, Cursor).

## Mission

Reproduce **https://airbnb-clone-umber-two.vercel.app** (Listing Page, Photo Tour, Lightbox — desktop only) with pixel-level visual fidelity and matching interaction/animation behavior. The reference is the single source of truth. When in doubt, re-inspect the reference — don't guess from generic Airbnb knowledge, and never copy its source directly (see Constraints).

This repo uses the same 3-layer architecture philosophy as our other agent projects, adapted for a frontend build: push everything measurable and repeatable into deterministic scripts, and reserve judgment calls for the agent.

## The 3-Layer Architecture (adapted for this project)

**Layer 1: Specs (`specs/`)** — what to build
- One markdown file per screen: `specs/listing-page.md`, `specs/photo-tour.md`, `specs/lightbox.md`, plus `specs/design-tokens.md`.
- Each spec captures what was actually observed on the reference (layout, spacing, color values, hover/transition behavior, keyboard behavior) — not assumptions.
- Specs are living documents. Update them the moment you discover something new about the reference (an easing curve, a breakpoint, a focus-trap detail) — don't just fix the code and move on.
- Don't overwrite a spec file's intent without flagging it — extend it.

**Layer 2: Orchestration** — this is you (the agent)
- Read the relevant spec before touching a screen's code.
- Decide implementation approach, call execution scripts (below) to gather ground truth or verify fidelity, then write/edit components.
- When a fidelity check fails, don't just eyeball a fix — pull the diff, read what's off (spacing, color, timing), fix it, re-run the check.
- Ask before making product decisions not covered by the spec or reference (e.g., "reference has no visible booking widget — do we omit it or stub one?").

**Layer 3: Execution (`scripts/`)** — deterministic tools
- `scripts/capture_reference.ts` — Playwright script that screenshots the reference at rest, on hover, with Photo Tour open, and with Lightbox open; dumps computed styles for key elements to `.tmp/reference/`.
- `scripts/capture_local.ts` — same script pointed at `localhost:3000` for the in-progress build.
- `scripts/diff_screenshots.ts` — pixel diff (e.g. `pixelmatch`) between `.tmp/reference/*` and `.tmp/local/*`, outputs a diff image + mismatch percentage per screen/state.
- `scripts/a11y_audit.ts` — runs `axe-core` against the local build for all three views, dumps violations.
- Check `scripts/` before writing a new one-off script — extend an existing script if it already does 90% of what's needed.

## Operating Principles

1. **Reference before assumption.** Every layout/spacing/color/timing decision traces back to something captured from the live reference, not memory of "how Airbnb usually looks."
2. **Images are already sourced.** All icons and property photos are pre-scraped into `images/` at the project root. Check there first for any asset need — never re-scrape, hotlink, or placeholder an image that already exists locally.
3. **Fidelity is a loop, not a one-shot.** Build → capture → diff → fix → re-diff. A screen isn't done until its diff score is acceptably low and the spec's documented interactions all work.
4. **Self-anneal on breakage.** Read the error/diff output, fix the script or component, retest, then update the relevant spec with what was learned (e.g., "reference uses a 200ms ease-out on lightbox fade, not the default 150ms").
5. **No lift-and-shift.** Never copy HTML/CSS/JS directly from the reference site's shipped bundle. Observe behavior and visuals, then implement independently. This is a hard constraint from the assignment (plagiarism-checked).
6. **Keep core scope tight.** Desktop fidelity for the three specified screens comes first — don't touch stretch goals until this is solid. No invented marketplace features — those belong in the architecture diagram, not the code (see `docs/architecture.md` / PRD §8). Optional extras (responsive layout, etc.) are addressed separately — see Stretch Goals below.

## Sub-Agents (suggested split, if running multiple agents/roles)

- **fidelity-agent** — owns the capture/diff loop, drives visual pixel-matching against `specs/`.
- **motion-agent** — owns transitions/animations (Framer Motion), matches easing/duration observed on the reference.
- **a11y-agent** — owns keyboard nav, focus trap/return, ARIA labeling for gallery + lightbox; runs `scripts/a11y_audit.ts`.
- **state-agent** — owns client-side caching/storage (session/local/IndexedDB per PRD §9) and the mock-data query layer.
- **qa-agent** — final pass: console errors, dead code, unused imports, submission checklist.

Each sub-agent should read `specs/` for its area, use `scripts/` rather than re-inventing capture/diff logic, and report findings back into the relevant spec file.

## Repo Structure

```
specs/            # Layer 1 — per-screen ground-truth specs (living docs)
scripts/          # Layer 3 — capture, diff, a11y audit scripts
images/           # ALL reference assets already scraped — icons + every property photo. Root-level, not regenerated.
src/
  app/            # Next.js App Router routes (listing page, photo tour)
  components/     # Gallery, Lightbox, Listing sections
  lib/            # query hooks, storage wrapper (session/local/IndexedDB)
  styles/         # design tokens (from specs/design-tokens.md)
.tmp/             # reference + local screenshots, diff outputs — never commit, always regenerated
docs/
  architecture.md # production-scale architecture notes (backs the submitted diagram)
  prompts.md      # running log of AI prompts used, per submission requirement
PRD-airbnb-clone.md
```

**On `images/`:** every visual asset from the reference — property photos, host avatar, and all icons (share, save/heart, chevrons, amenity icons, etc.) — has already been scraped and lives here. Treat this as done; do not re-scrape or hotlink the reference site for images. If filenames aren't self-explanatory, an early task is to build `images/manifest.json` (semantic key → filename, e.g. `hero`, `thumb-1`, `icon-share`) so components and specs reference semantic keys instead of raw scraped filenames.

## Stretch Goals (Optional — Only After Core Is Done)

The brief doesn't require these, and a clean complete desktop implementation beats an over-engineered incomplete one — so these are attempted **only after** all three core screens pass their fidelity + accessibility bar. See PRD §15 for the full list and rationale. In priority order if time remains:

1. Responsive/mobile reflow of all three screens
2. README with setup + architecture notes
3. Basic unit tests for Lightbox keyboard navigation
4. SEO/meta tags, favicon, page title matching listing
5. Loading skeletons / blur-up image placeholders
6. Toast/microcopy feedback on Save/Share actions
7. 404 page + error boundary

No deployment is required for submission — the project should run locally via `npm install && npm run dev`. Document this clearly in the README rather than spending time on hosting.

## Accessibility Checklist (must pass before a screen is "done")

- [ ] All interactive elements reachable via Tab in a logical order
- [ ] Icon-only buttons have `aria-label`s
- [ ] Lightbox: ← / → navigate photos, Esc closes, focus traps inside while open, focus returns to trigger element on close
- [ ] Visible focus ring on every focusable element (don't rely on browser default if reference has a custom one)
- [ ] Gallery/dialog roles set appropriately (`role="dialog"`, `aria-modal="true"` where applicable)

## Constraints (don'ts)

- Don't push this repo to a public GitHub repository.
- Don't copy code or markup directly from the reference site. **Exception:** visual image assets (`images/`) are intentionally reused as-is — pixel-parity requires the actual photos/icons, and these were deliberately scraped rather than recreated. This exception covers images only, not HTML/CSS/JS.
- Don't build extra screens not present on the reference.
- Don't start on mobile/responsive or other stretch goals until all three core desktop screens are fidelity- and accessibility-complete (see Stretch Goals above).
- Don't skip the prompt log — `docs/prompts.md` must reflect the actual sequence of prompts used, updated as you go, not reconstructed at the end.

## Definition of Done (per screen)

Diff score against reference screenshot within an acceptable threshold at rest and on hover; every interaction in the relevant `specs/*.md` file works via mouse and keyboard; `scripts/a11y_audit.ts` reports no critical violations; no console errors.
