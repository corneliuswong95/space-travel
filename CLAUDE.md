# Orrery — Interactive Space Learning Site

> Product working name: **Orrery** (placeholder — an orrery is a mechanical model of the
> solar system: an instrument, not a toy, which fits the design direction). Change it in
> `index.html` and `src/components/ui/Nav.tsx` if you want a different name.

---

## Quick reference (read this first)

**Dev commands**
- `npm run dev` — start the Vite dev server
- `npm run build` — typecheck (`tsc -b`) + production build
- `npm run preview` — preview the production build
- `npm run lint` — oxlint

**Stack (actual installed versions)**
- React 19 + Vite 8 + TypeScript 6 — strict. `verbatimModuleSyntax` is ON, so **always use
  `import type { ... }`** for type-only imports or the build fails. No TS `enum`/`namespace`
  (`erasableSyntaxOnly`). `noUnusedLocals`/`noUnusedParameters` are on.
- react-three-fiber + @react-three/drei — 3D (declarative Three.js)
- gsap + @gsap/react (`useGSAP`) — scroll storytelling + motion
- recharts — data visualization
- @mdx-js/rollup + @mdx-js/react — lessons authored in MDX; `MDXProvider` supplies styled components
- react-router-dom — routing (added; implied by `pages/`)
- react-zoom-pan-pinch — pinch / scroll / double-tap photo zoom (the `/sky` lightboxes)
- @vercel/analytics — privacy-light Web Analytics (`<Analytics/>`; no-op locally, collects on Vercel)
- @fontsource-variable/{fraunces,inter} + @fontsource/ibm-plex-mono — self-hosted fonts

**Conventions**
- TypeScript everywhere. Data files are `.ts`, not `.js` (spec preferred TS).
- Import alias `@/` → `src/` (set in `vite.config.ts` + `tsconfig.app.json`).
- Design tokens live in `src/styles/tokens.css` as CSS custom properties. **Never hard-code a
  palette hex in a component** — use `var(--ink)`, `var(--amber)`, etc.
- Lesson **metadata** → `src/lessons/index.ts` (the ordered registry = the learning path).
  Lesson **content** → pure MDX (no frontmatter; we don't run a frontmatter plugin).
  Lesson **quiz** → `quiz.ts` beside the content.
- Static facts (`src/data/planets.ts`) are the source of truth and render offline. NASA live
  data is layered on top — never a hard dependency for reading a lesson.

**Setup decisions**
- Chose TS over JS.
- Added `react-router-dom` and `@mdx-js/react` (required by the architecture, not in the
  original install list).
- Self-host fonts via @fontsource instead of a Google Fonts `<link>` (perf, offline, no layout shift).
- No frontmatter in MDX — lesson metadata is in the typed registry instead.
- 3D planets use **real 2K texture maps** (Solar System Scope, CC BY 4.0) in `public/textures/`,
  loaded per body via drei `useTexture` (see `src/components/three/textures.ts`); Saturn's ring
  uses the alpha PNG with radial-remapped UVs. Credit is in the footer + `public/textures/CREDITS.txt`.
  Three.js is lazy-loaded (its own chunk) so lesson prose is interactive before the canvas arrives.
  Bodies also get a Fresnel atmosphere rim (`src/components/three/Atmosphere.tsx`) and the Sun a
  soft corona; scenes use low ambient + a warm key light for a real day/night terminator.
- Photo zoom is a fullscreen overlay (`src/components/nasa/PhotoZoom.tsx`, react-zoom-pan-pinch)
  opened from the APOD and EPIC lightboxes — a **tap zooms**, a **drag still scrolls** the lightbox.
- Deploys as a static SPA (Vercel recommended). `vercel.json` + `public/_redirects` add the SPA
  history fallback so deep links resolve; Web Analytics via `@vercel/analytics`. `VITE_NASA_API_KEY`
  goes in the host's env vars **and** local `.env` (gitignored). See README "Deploy".

**Build status**
- [x] Scaffold, deps, MDX + alias config, design system, signature header
- [x] `planets.ts`, first MDX lesson, Home catalog, LessonPage
- [x] `useProgress` (localStorage), Quiz with explanatory feedback, Recharts comparison
- [x] Reusable 3D `<Planet>`/`<Sun>`/`<Scene>` + `<BodyViewer>` — real 2K texture maps
      (Solar System Scope, CC BY 4.0) in `public/textures/`, lazy-loaded per body; Three.js
      lazy-loaded in its own chunk, in-view render pause, reduced-motion aware. Embedded in
      lessons + the Explore page.
- [x] GSAP ScrollTrigger lesson narrative (build step 5) — a pinned, scroll-scrubbed
      solar-system tour (Sun → outer edge) with synced text beats in lesson 02; reduced
      motion serves a static overview. See `src/components/story/SolarTour.tsx`.
- [x] Live NASA panel (build step 6) — APOD + nearest near-Earth objects on Home (`SkyToday`),
      with a "see more" link to a dedicated `/sky` page: the full APOD archive as rich cards +
      a detail lightbox (HD image / embedded video / full text). Cached by date in
      localStorage; key via `VITE_NASA_API_KEY` (DEMO_KEY fallback). Real loading/error/empty
      states; lessons never depend on it. See `src/data/nasa.ts`, `src/pages/Sky.tsx`.
- [x] Explore free-roam sandbox (build step 7) — orbitable solar-system lineup; pick any body
      (rail or click in-scene) and the camera eases to focus it with a live telemetry card.
      See `src/components/three/ExploreSandbox.tsx`.

**The full build order (1–7) is complete.** Since then: the learning path grew to **twelve
lessons** — a guided outward zoom from the Sun to spacetime (stars, solar system, Moon phases,
Mars, the giant planets, comets/asteroids/dwarf planets, reading the night sky, how stars live &
die, black holes & neutron stars, the Milky Way & galaxies, the expanding universe, space–time &
light), each with a conceptual quiz and `FunFact` tangents; planets render with real texture maps;
Explore ↔ lessons cross-link; Home shows a locally-computed "Moon tonight" card; and a
`/launches` tab shows upcoming + past-week launches (Launch Library 2) and space headlines
(Spaceflight News API), both keyless. `VITE_NASA_API_KEY` is set in `.env` (gitignored).

The **`/sky` page** is a live hub (all sections degrade gracefully on failure): the full APOD
archive — month/year dropdowns jump to any month back to the first picture (June 1995), and an
IntersectionObserver lazy-loads earlier months as you scroll (one cached request per month) —
with a shared accessible `Lightbox`; EPIC full-disk Earth; space weather (DONKI solar flares +
geomagnetic storms); the week's near-Earth objects (NeoWs); and a NASA image-library search
(keyless). The archive loader is `fetchApodForMonth` (`src/data/nasa.ts`) driven by the
`useApodArchive` hook (`src/hooks/useNasa.ts`); other feeds use the generic `src/hooks/useAsync.ts`.
The Mars rover gallery was dropped (NASA's `mars-photos` endpoint 404s) and replaced by EPIC; the
EONET Earth-events feed was also removed.

**Polish pass since then:** the header collapses to a hamburger menu on phones; the Explore info
card and lesson term-tooltips were made mobile-safe; the APOD/EPIC lightboxes scroll as one column
on mobile (big photo, scroll for the description) and the photo opens a fullscreen pinch-zoom
viewer. 3D bodies gained a Fresnel atmosphere rim and a reworked Sun corona with a real terminator.
The single-APOD cache self-corrects so it never sticks on yesterday's picture before NASA publishes
today's (validates the cached date). Deploy + Web Analytics wired up (see README). Footer reads
"By Cornelius Wong".

---

# Project Context (source of truth)

## 1. What we're building
An education-first website for learning about space — the solar system, stars, and astronomy.
The product is a guided learning experience, not just a 3D toy. The lesson content is the
backbone; the 3D scenes, charts, and quizzes are supporting components that lessons pull in.

Audience: secondary students (~ages 13–18) and adult learners. Both want to be treated as
capable and curious — no childish mascots, cartoon styling, or baby talk, but no assumed prior
expertise either. Assume a wide range of devices, including mid-range phones and school laptops.

The single job of the site: help someone actually learn and retain something about space through
a sequenced path of short lessons, each ending in a check for understanding.

Differentiator vs. existing 3D solar-system simulators: a structured learning path with progress
tracking and quizzes, combined with the 3D and live data — not a free-roam simulator and not a
flat fact page.

## 2. Tech stack (decided)
- React + Vite (TypeScript)
- react-three-fiber + @react-three/drei for 3D
- GSAP + @gsap/react (`useGSAP`) for scroll-driven storytelling and motion (GSAP + all plugins free as of 2025)
- Recharts for data visualization
- MDX (`@mdx-js/rollup`) so lessons are authored as content with embedded components
- NASA Open APIs for live data (APOD, near-Earth objects, EPIC full-disk Earth, DONKI space
  weather). Free key from api.nasa.gov; store as `VITE_NASA_API_KEY`, never commit it.

## 3. Architecture
Lessons are content, not code. The 3D, quiz, and chart pieces are reusable components.

```
src/  (── = actual current layout; the original plan is preserved in the prose around it)
├── pages/        Home, LessonPage, Sky, Launches, Explore, NotFound
├── lessons/      THE CONTENT — index.ts (ordered registry) + NN-slug/{content.mdx, quiz.ts} (×12)
├── components/
│   ├── three/    Scene, Planet, Sun, Atmosphere, BodyViewer, ExploreSandbox, textures, shared
│   ├── story/    SolarTour (GSAP scroll tour), AtlasPlate (signature header), OrbitDiagram
│   ├── quiz/     Quiz, Question
│   ├── charts/   ComparisonChart (Recharts)
│   ├── nasa/     SkyToday, Apod{Panel,Card}, ApodLightbox, Lightbox, PhotoZoom, NeoPanel, NeoWeek,
│   │             EpicEarth, SpaceWeather, ImageSearch, MoonTonight, FeedStates
│   ├── launches/ LaunchCard, NewsCard
│   ├── mdx/      MDXComponents (Term, Readout, KeyIdea, Aside, FunFact, …)
│   ├── layout/   RootLayout (nav + footer + <Analytics/>)
│   └── ui/       Button, Card, Nav (hamburger on mobile), Loader
├── data/         planets.ts (static, offline) · nasa.ts (APOD/NEO/EPIC/DONKI — key) ·
│                 launches.ts, news.ts, nasaImages.ts (keyless feeds) · cache.ts (TTL)
├── hooks/        useProgress, useAsync (generic), useNasa, useSpace, useExplore,
│                 useInView, usePrefersReducedMotion
└── styles/       tokens.css, base.css

Root: vercel.json + public/_redirects (SPA history fallback) · .env / .env.example (NASA key)
```

Principle: static facts render instantly and work offline; live NASA data is an enhancement,
never a hard dependency for core lessons.

## 4. Design direction
Do NOT default to the generic "space website" look (pure-black background, glowing cyan/neon
accents, floating starfield). Ground the design in the real-world vernacular of astronomy:
observatories, printed star atlases, field notebooks, mission telemetry. "Precise scientific
instrument meets beautiful old star chart," not sci-fi movie UI. Keep a single coherent point of
view — don't mix tropes.

Palette (derive everything from these):
- `--ink` `#0B1026` — deep indigo-navy base (not pure black; warmer, more specific)
- `--ink-2` `#161B3D` — raised surfaces / cards on the dark base
- `--paper` `#F3ECDD` — warm parchment for reading-heavy content panels (star-atlas paper)
- `--amber` `#E8A33D` — primary accent: starlight / brass / sodium-lamp warmth (used sparingly)
- `--rust` `#B0552F` — secondary accent for emphasis and data highlights
- `--slate` `#8A93B8` — muted text and hairline rules on dark

Type (three roles):
- Display: high-contrast serif with personality, used with restraint (Fraunces) — titles, hero.
- Body: clean, highly readable (Inter) — lesson prose.
- Data/utility: monospace (IBM Plex Mono) — coordinates, distances, magnitudes, telemetry labels.
  This is where the "scientific instrument" feel comes from.

Signature element (the one thing the site is remembered by): lesson section headers styled like
star-atlas plate entries — a monospace catalog number, a hairline rule, and the object's real
coordinates/stats rendered like an instrument readout. Ties the "atlas + telemetry" concept
together and encodes real information.

Restraint: spend boldness in one place (signature + hero 3D moment). Keep everything else quiet
and disciplined. When in doubt, remove one thing.

## 5. Performance — non-negotiable (steady 60fps on a mid-range laptop, graceful on phones)
- Render only when needed: R3F `frameloop="demand"` for static scenes; `invalidate()` on change.
- `useFrame` discipline: never allocate (`new THREE.Vector3()`, arrays) inside it; create once
  outside. No `setState` in the render loop — mutate refs.
- Textures: start at 2K, not 4K. Compressed (KTX2/basis) where possible. Lazy-load planet
  textures; don't load all eight upfront.
- Geometry: reuse one sphere geometry across planets; vary by props. Instancing for asteroid /
  star fields, not thousands of meshes.
- Suspense + on-brand loaders. Progressive reveal as assets arrive.
- Code-split the 3D so lesson text/UI is interactive before the heavy 3D arrives. Text-first.
- Mobile fallback: detect low-end / `prefers-reduced-motion`, serve a lighter scene (fewer
  bodies, no postprocessing, lower DPR via `<Canvas dpr={[1, 1.5]}>`).
- Avoid heavy postprocessing (bloom) unless measured and worth it; first thing to cut on mobile.

## 6. Motion & interactivity (serves comprehension, not decoration)
- One orchestrated scroll moment per lesson beats many scattered effects (GSAP ScrollTrigger:
  pin a 3D scene, scrub a narrative, then release).
- Micro-interactions: hover planet → subtle scale + telemetry readout; click → eased camera
  transition (~600–800ms). Consistent eases site-wide.
- Camera moves eased and interruptible — never instant jumps, never sluggish.
- Always respect `prefers-reduced-motion`: replace scrubbed/parallax motion with simple fades;
  stop ambient rotation.

## 7. Quality floor (build to this from the start)
- Fully responsive to mobile, including 3D scenes.
- Visible keyboard focus on every interactive element; planets/cards keyboard-reachable.
- Reduced motion respected everywhere.
- Semantic HTML + alt text — the learning content must work without the 3D. Screen-reader users
  must be able to read every lesson.
- Real loading/empty/error states in the interface's voice. If a NASA call fails, the lesson
  still works from static data; the live panel shows a plain, non-apologetic message.
- WCAG AA contrast for all text (check amber-on-ink and text-on-parchment).

## 8. Content level & copy
Audience: secondary students + adults. Accessible reading level without dumbing down. Use real
terms (perihelion, magnitude, light-year) but define each plainly on first use. Lead with the
real number/fact, then why it matters. Convey genuine wonder, never via hype or exclamation
marks — the facts are impressive on their own.

Quizzes test understanding, not just recall: prefer "why does Mercury have extreme temperature
swings?" over "what is Mercury's diameter?". A few recall questions for confidence, but
conceptual ones are the point. Give explanatory feedback on both right AND wrong answers — the
feedback is part of the lesson.

Microcopy: active voice, sentence case, plain verbs. Name things by what the learner does
("Explore Mars", "Check what you learned"), not by system mechanics. An action keeps its name
through the whole flow. Empty/error states give direction, not mood.

## 9. Build order
1. One lesson rendering from MDX with static facts from `data/planets.ts`.
2. A single reusable `<Planet>` 3D component (sphere + texture + orbit controls).
3. One `<Quiz>` with `useProgress` saving completion (localStorage fine for v1).
4. A Recharts comparison (planet sizes or distances) from static data.
5. GSAP ScrollTrigger narrative wrapping the 3D scene in one lesson.
6. Live NASA data (APOD of the day, nearest asteroid approaches) as an enhancement panel.
7. The free-roam `Explore` sandbox, last.
After each step: verify it's smooth (frame rate) and accessible (tab through it).

## 10. Things to avoid
- The generic black + neon-cyan "space UI" look.
- Loading all textures/planets upfront.
- Allocations or `setState` inside `useFrame`.
- Animation for its own sake.
- Making the 3D a hard dependency for reading a lesson.
- 4K textures, heavy bloom, or thousands of individual meshes on first pass.
