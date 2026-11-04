# Personal portfolio — Mukund Mangla

Vite + React 19 + Tailwind 3 + Framer Motion, deployed on Vercel. `api/chat.js` is a Vercel serverless function (Gemini) for the "AI clone" chat widget.

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`
- `npm run lint`

## Where content lives
- `frontend/data/projects.js` — **the only place project data is defined.** Used by `components/sections/Projects.jsx` and `api/chat.js`. `tier` sets placement: `featured` (case study), `more` (index), `earlier` (compact list). `projectsUsing(tech)` powers the Toolkit section.
- `frontend/data/content.js` — skill groups (a tool only renders if a project lists it), about, timeline, contact info.
- Design tokens (`--ink`, `--rule`, …) and shared classes (`btn-ed`, `eyebrow`, `link-ed`) live in `frontend/index.css`; section header and reveal helpers in `components/ui/editorial.jsx`.
- `frontend/components/sections/textBlocks.js` — hero text and reveal timing.
- `public/hero-frames/` — 153 WebP frames for the scroll-driven canvas hero. Source PNGs live in `assets-src/` (not deployed).

## Rules
- **Never invent metrics, testimonials, dates or capabilities.** Every claim on the site, and everything the chatbot is told, must be checkable against a repo, the resume, or a measurement Mukund ran. If a number is needed and doesn't exist, ask.
- Visual language: monochrome, editorial (DM Serif Display + DM Mono, black background, thin rules). No colourful gradients or glossy effects.
- Keep the resume (`public/resume.pdf`), the site and GitHub consistent with each other.

## Current work
See `PORTFOLIO_AUDIT.md` for the prioritised to-do list from the 2026-11-01 review. Work top-down; item 1 needs Mukund's decision before editing copy.
