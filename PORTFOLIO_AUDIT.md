# Portfolio audit — recruiter readiness (2026-11-01)

Goal: a recruiter should know **who Mukund is, what he wants, and his two best projects within ~15 seconds**, and an engineer who clicks through should find nothing that contradicts the resume or GitHub.

The site is technically current (React 19, Vite 7). The problems are what it says and how long it takes to say it.

---

## Done on branch `fix/recruiter-audit`

- **Contact info fixed.** The email was misspelled (`mangalmukund123` → `manglamukund123@gmail.com`), including in the chatbot's error message. GitHub pointed to `github.com/mukundmangla`, which returns 404; it now points to `octotat-bot`. LeetCode now points to `u/Hakka123`, and LinkedIn to `in/mukund-mangla`.
- **Project data has one source:** `frontend/data/projects.js`. The Projects section and `api/chat.js` both read from it. The old duplicate `projects` array in `content.js` has been deleted, and that duplication is how dates and descriptions had drifted apart.
- **The chatbot no longer gets the unverified case-study numbers** ("Empathy Score +80%", "Hallucination Rate −65%", the "Project Lead" testimonial). The data is still in `content.js` with a warning comment, but nothing uses it.
- **Two dates corrected** to match the resume: Ember and Grief Companion → 2026.
- **Missing files added:** `projects/marginalia.png`, `projects/placenext.png` and `projects/portfolio.png` as monochrome title cards (placeholders), plus `og-image.png` (1200×630 link preview) and the PNG favicons and `apple-touch-icon.png` that `index.html` already referenced.
- The "Portfolio Website" project's dead `demo: "#"` button is gone, and its GitHub link now points to the actual repo.

---

## Done on branch `redesign/editorial` (2026-11-04)

- Everything below the hero rebuilt in one editorial system (tokens in `index.css`): Work → About → Toolkit → Contact.
- Transit map replaced by two case studies (RepoMind, Marginalia), a project index, and an "Earlier work" list. Stock Unsplash photos are no longer shown.
- Self-ratings, "Speed Demon", "AI Architect", "15+ LLM Integrations" and "20+ AI Workflows" removed. Toolkit lists only tools some project uses, linked to those projects. LangGraph, PyTorch, Scikit-Learn and Transformers dropped for lack of a project.
- Custom cursor, sorting background, liquid-glass nav, gooey text and missing sound files removed; `three`, `@react-three/*`, `maath`, `use-sound`, `react-icons`, `lucide-react` uninstalled.
- Labelled form fields with inline errors, visible focus, skip link, 44px targets, reduced-motion support.
- Sitemap reduced to `/`. Lint: 38 → 6 problems, all in vendored `components/ui/` files.

## Still to do, in priority order

### 1. Use one headline everywhere (needs Mukund's decision)
These four places currently describe him differently:
- `index.html` `<title>` / meta: "Full Stack Developer | 225+ LeetCode Solutions"
- `frontend/components/sections/textBlocks.js`: "Full-stack engineer & GenAI builder"
- `content.js` `aboutContent.intro`: "building the next generation of Agentic AI Systems"
- `content.js` `contactInfo.availability`: "Open to AI/Agentic Engineering roles"

Pick one line, such as "Full-stack engineer who builds LLM-powered products", and use it in all four. Also add internship availability (dates, remote or city), because recruiters filter on it.

### 2. Remove self-ratings and claims with no evidence
- `content.js` `skills`: `proficiency` 85–95%, rendered as percentages in `Skills.jsx`; "Expert"; "Mastered LangGraph & ReAct Patterns"; "S-Tier Speed Demon"; "AI Architect". LangGraph isn't in any project's tech list. Replace these with evidence, e.g. "used in RepoMind, Marginalia" with links.
- `aboutContent.stats`: "15+ LLM Integrations", "20+ AI Workflows". These can't be checked. Keep only numbers that can (e.g. LeetCode count, which is live).
- `projects.js`: HabitFlow lists "Deep Learning analytics" and OpsPilot lists "Agentic workflow". Keep these only if the repo shows them.
- `timeline` "Strategic Gap Year" wording: either state it plainly or drop it.

### 3. Make every date match the resume
The remaining years in `projects.js` haven't been checked. DreamSignal, HabitFlow, SmartResume, Balancio and PlaceNext say 2024; OpsPilot and Notora say 2023; TaskFlow and Weather say 2022. Make them match `public/resume.pdf` and the git history of each repo.

### 4. Show fewer projects and lead with the best
- Lead with **RepoMind** and **Marginalia**. Their `challenges` text names a real failure and its fix, which is the strongest signal on the site.
- Turn each of those two into a short case study: problem → what broke → fix → **one number you actually measured**. Marginalia already has pytest, so a 20–30 question retrieval test can give a hit-rate number.
- Move Weather Forecast, TaskFlow and Notora to an "earlier work" list, or remove them.

### 5. Use real screenshots and add demo videos
- Several projects use stock Unsplash photos: SmartResume, Balancio, Notora, TaskFlow, Weather.
- `public/projects/Balancio.jpg`, `SmartResume.png`, `notora.png` and `task-flow.png` are AI-generated promo images, not screenshots of the running apps. Check the others too (ember, habitflow, griefcompanion, opspilot).
- The new title cards for Marginalia, PlaceNext and Portfolio are placeholders. Replace them with real screenshots; Playwright against the live demos works.
- RepoMind's backend runs on Render and Marginalia on Streamlit Cloud, and both sleep when idle. A recruiter hitting a cold start assumes the project is broken. Add a 30–60s recorded demo (`video` field, same as DreamSignal) to the top projects.

### 6. Get to the first useful screen faster
- `LoadingScreen.jsx` has `MIN_DURATION = 6200`, which forces 6.2s even when everything is cached. Cut it to about 1s, and skip it entirely on repeat visits (sessionStorage) and under `prefers-reduced-motion`.
- `HeroSequence.module.css` sets `.section` to `height: 600vh`, and the name only appears at `revealAt: 0.25`. Put name, role, a **Resume** button and a **Projects** button in the first frame. Shorten the hero to about 250–300vh and add a "skip intro" link.
- Test on a phone over 4G. Recruiters often open LinkedIn links on mobile.
- Keep the cinematic sequence itself. It's real evidence for frontend roles; it just shouldn't block the content.

### 7. Smaller fixes
- `Contact.jsx` and `Magnetic.jsx` load `/sounds/send.mp3` and `/sounds/hover.mp3`, but `public/sounds/` doesn't exist. Either add the files or remove `use-sound`.
- `index.css` sets `cursor: none` globally. Make sure the custom cursor never disappears, and fall back to the system cursor on touch devices and under reduced motion.
- Unused dependencies: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `maath`. Unused files: `components/sections/SkillsNetwork.jsx`, `components/ui/demo.jsx`.
- 3 existing lint errors: `api/chat.js` (`process` global), plus two unused variables in `Projects.jsx`.
- `public/sitemap.xml` has a `lastmod` of 2025-01-15 and lists `#about` / `#skills` URLs. Google ignores fragments, so keep only `/`.
- `index.html` canonical, OG and sitemap all point to `https://mukundmangla.com/`. Confirm that domain is live and is his, or switch them to the real Vercel URL.
- Add Vercel Analytics to see whether visitors actually reach Projects.

### 8. Update the resume
`public/resume.pdf` is from May 2026, before RepoMind and Marginalia were added. It uses the college email, and its summary is generic. Update it alongside the site, because it's the file recruiters actually forward.
