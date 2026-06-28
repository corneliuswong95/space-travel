# Orrery

**An education-first website for learning about space** — the solar system, stars, and
astronomy. Orrery is a *guided learning experience*, not a 3D toy: short, sequenced lessons are
the backbone, and interactive 3D scenes, charts, quizzes, and live NASA data are supporting
players that the lessons pull in.

The design avoids the generic black-and-neon "space UI." It's grounded in the real vernacular of
astronomy — printed star atlases, field notebooks, mission telemetry: *"a precise scientific
instrument meets a beautiful old star chart."*

> _Live demo: add your deployment URL here once it's hosted (see [Deploy](#deploy))._

---

## Highlights

- **A real learning path, not a sandbox.** Twelve sequenced lessons — a guided outward zoom from
  the Sun to spacetime — each ending in a quiz with explanatory feedback (on right *and* wrong
  answers). Progress is saved locally.
- **3D that serves the lesson.** Reusable planets rendered with real 2K texture maps, an
  atmospheric limb glow, and day/night lighting (react-three-fiber) — lazy-loaded and code-split
  so the prose is interactive before the canvas arrives. A pinned, scroll-scrubbed GSAP tour walks
  the solar system in one lesson.
- **Live sky, layered on — never required.** A `/sky` hub pulls NASA's Astronomy Picture of the
  Day (full archive, browsable back to 1995), near-Earth objects, full-disk Earth, and space
  weather. If a feed is down, the lesson still works from static data.
- **Built to a quality floor.** Fully responsive (including 3D), keyboard-navigable, WCAG-AA
  contrast, `prefers-reduced-motion` respected everywhere, real loading/empty/error states, and
  semantic HTML so every lesson is readable without the 3D.

## Features

| Area | What's there |
| --- | --- |
| **Lessons** (`/lessons/:slug`) | Twelve MDX lessons with atlas-plate headers (catalog number, hairline rule, real coordinates/stats), inline 3D viewers, fun-fact tangents, and a check-for-understanding quiz. |
| **The sky** (`/sky`) | Live hub: APOD archive with **month/year filter + lazy infinite scroll** back to the first picture (June 1995); near-Earth objects for the week; EPIC full-disk Earth; space weather (solar flares + geomagnetic storms); keyless NASA image-library search. Shared accessible lightbox; the Picture of the Day and EPIC Earth photos open a **zoom** view (pinch / scroll / double-tap). |
| **Launches** (`/launches`) | Upcoming and past-week rocket launches (Launch Library 2) and recent spaceflight headlines (Spaceflight News API) — both keyless. |
| **Explore** (`/explore`) | Free-roam solar-system sandbox: orbit the scene, pick any body (rail or click), and the camera eases to focus it with a live telemetry card. |
| **Home** (`/`) | Lesson catalog, today's APOD + nearest asteroids, and a locally-computed "Moon tonight" card. |

### The learning path

A guided outward zoom — from one ordinary star to the shape of spacetime:

1. **What is a star?** — what the Sun is made of, why it shines, and why one ordinary star explains most of the sky.
2. **The solar system** — eight planets in two families; reading distances and sizes in AU. *(Includes the GSAP scroll tour.)*
3. **Why the Moon has phases** — phases vs. eclipses, and why we only ever see one face.
4. **Mars, the red planet** — record-breaking terrain and the evidence for past water.
5. **The giant planets** — the gas and ice giants, their rings and moons.
6. **Comets, asteroids & dwarf planets** — the small bodies and where they come from.
7. **Reading the night sky** — constellations, the (backwards) magnitude scale, and coordinates.
8. **How stars live and die** — the main sequence, and the fates set by a star's mass.
9. **Black holes & neutron stars** — what's left when massive stars collapse.
10. **The Milky Way & the galaxies** — our galaxy's structure and the galaxy zoo beyond.
11. **The expanding universe** — redshift, Hubble's law, and the Big Bang.
12. **Space, time & light** — light-years, the cosmic speed limit, and looking back in time.

## Tech stack

- **React 19** + **Vite 8** + **TypeScript 6** (strict; `verbatimModuleSyntax` + `erasableSyntaxOnly` on)
- **react-three-fiber** + **@react-three/drei** + **three** — declarative 3D
- **GSAP** + **@gsap/react** (`useGSAP`) — scroll storytelling and motion
- **Recharts** — data visualization
- **MDX** (`@mdx-js/rollup` + `@mdx-js/react`) — lessons authored as content with embedded components
- **react-router-dom 7** — routing (lazy routes + scroll restoration)
- **react-zoom-pan-pinch** — pinch / scroll / double-tap photo zoom
- **@vercel/analytics** — privacy-light Web Analytics (no-op locally; collects on Vercel)
- Self-hosted fonts via **@fontsource** — Fraunces (display), Inter (body), IBM Plex Mono (data)
- **oxlint** for linting

## Getting started

**Prerequisites:** Node **20.19+** (or 22.12+) and npm.

```bash
git clone git@github.com:corneliuswong95/space-travel.git
cd space-travel
npm install

# Set up your NASA key (optional but recommended — see below)
cp .env.example .env
# then edit .env and paste your key

npm run dev          # start the dev server at http://localhost:5173
```

### Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Start the Vite dev server (HMR). |
| `npm run build` | Typecheck (`tsc -b`) then build to `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run oxlint. |

### Environment variables

| Variable | Required | Notes |
| --- | --- | --- |
| `VITE_NASA_API_KEY` | Recommended | A free key from [api.nasa.gov](https://api.nasa.gov). Falls back to `DEMO_KEY`, which is rate-limited (30/hour, 50/day per IP) — enough to load the app, but the live panels will mostly hit limits. |

`.env` is git-ignored; `.env.example` is the committed template. **Note:** because this is a
client-side Vite app, `VITE_*` values are inlined into the public JavaScript bundle at build time
— so the NASA key is visible to anyone who views the deployed site. That's inherent to
browser-side API calls and acceptable for this key (free, rate-limited, instantly regenerable).
Don't reuse it for anything sensitive.

## Live data sources

Everything below is an *enhancement* — static facts in `src/data/planets.ts` render offline, and
lessons never hard-depend on a live call.

| Source | Key? | Used for |
| --- | --- | --- |
| APOD — `api.nasa.gov` | yes | Astronomy Picture of the Day (today + full archive) |
| NeoWs — `api.nasa.gov` | yes | Near-Earth objects (today + week) |
| EPIC — `api.nasa.gov` | yes | Full-disk Earth from DSCOVR |
| DONKI — `api.nasa.gov` | yes | Space weather (solar flares, geomagnetic storms) |
| NASA Image Library — `images-api.nasa.gov` | no | Image search |
| Launch Library 2 — `thespacedevs.com` | no | Rocket launches |
| Spaceflight News API | no | Space headlines |

Responses are cached in `localStorage` (by date, or with a short TTL) to stay within rate limits.
NASA's gateway occasionally returns transient `503`s, so requests retry briefly before surfacing
an error.

## Project structure

```
src/
├── pages/        Home, LessonPage, Sky, Launches, Explore, NotFound
├── lessons/      THE CONTENT — index.ts (ordered registry) + NN-slug/{content.mdx, quiz.ts} (×12)
├── components/
│   ├── three/    Scene, Planet, Sun, Atmosphere, BodyViewer, ExploreSandbox, textures, shared
│   ├── story/    SolarTour (GSAP scroll tour), AtlasPlate (signature header), OrbitDiagram
│   ├── quiz/     Quiz, Question
│   ├── charts/   ComparisonChart (Recharts)
│   ├── nasa/     SkyToday, Apod*, Lightbox, PhotoZoom, NeoPanel/Week, EpicEarth, SpaceWeather, ImageSearch, MoonTonight
│   ├── launches/ LaunchCard, NewsCard
│   ├── mdx/      MDXComponents (Term, Readout, KeyIdea, Aside, FunFact, …)
│   ├── layout/   RootLayout (nav + footer + analytics)
│   └── ui/       Button, Card, Nav (hamburger on mobile), Loader
├── data/         planets.ts (static) · nasa.ts · launches.ts · news.ts · nasaImages.ts · cache.ts
├── hooks/        useProgress, useAsync, useNasa, useSpace, useExplore, useInView, usePrefersReducedMotion
└── styles/       tokens.css (design tokens), base.css
```

Design tokens (the palette, type scale, spacing, motion) live in `src/styles/tokens.css` as CSS
custom properties — components reference `var(--ink)`, `var(--amber)`, etc. rather than hard-coded
hex. Import alias `@/` → `src/`.

## Performance & accessibility

- 3D renders on demand (`frameloop` paused when off-screen), reuses one sphere geometry, and never
  allocates or calls `setState` inside the render loop.
- Textures start at 2K and load per body, not all upfront. The Three.js bundle is code-split so
  text and UI are interactive first.
- Reduced-motion swaps scrubbed/parallax motion for simple fades and stops ambient rotation.
- Every interactive element has visible keyboard focus; planets and cards are keyboard-reachable.

## Deploy

This is a static single-page app. Any static host works; **Vercel** is the smoothest. SPA history
fallback is already configured (`vercel.json` for Vercel, `public/_redirects` for Netlify), so deep
links like `/sky` resolve on refresh instead of 404-ing.

### Vercel (recommended)

1. Push to GitHub (already done), then at [vercel.com](https://vercel.com) sign in with GitHub.
2. **Add New… → Project** and import this repo. Vercel auto-detects Vite (build `npm run build`,
   output `dist`) — leave the defaults.
3. Under **Environment Variables**, add `VITE_NASA_API_KEY` with your key.
4. **Deploy.** You get a free `*.vercel.app` URL with HTTPS, and every push to `main` auto-redeploys.

> Tip: with the [Vercel plugin for Claude Code](https://vercel.com/plugin) installed, you can run
> `/bootstrap` or `/deploy` to wire up the project and env var from the terminal.

### Netlify

Same flow at [netlify.com](https://netlify.com): import the repo, build command `npm run build`,
publish directory `dist`, and add the `VITE_NASA_API_KEY` environment variable.

### GitHub Pages

Possible but more setup: set `base: '/space-travel/'` in `vite.config.ts`, add a Pages build
workflow, and handle the SPA 404 fallback. Vercel/Netlify are easier.

## Credits

- Planet & Sun textures: [Solar System Scope](https://www.solarsystemscope.com/textures/) — CC BY 4.0.
- Live data: [NASA Open APIs](https://api.nasa.gov), [The Space Devs](https://thespacedevs.com),
  and [Spaceflight News API](https://spaceflightnewsapi.net).

Built by **Cornelius Wong**.
