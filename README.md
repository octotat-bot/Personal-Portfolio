# Personal Portfolio

My portfolio site: a monochrome, editorial design with a scroll-driven hero, an index of my projects with two in-depth case studies, and an AI chat widget that answers questions about my work.

## How it works

- **Scroll-driven hero:** plays 153 WebP frames on a canvas as you scroll. Scripts in `scripts/` build the frames and check their quality.
- **One source for project data:** `frontend/data/projects.js` feeds the Work and Toolkit sections and the chatbot prompt, so they can't drift apart.
- **AI chat:** `api/chat.js` is a Vercel serverless function that calls Gemini, which keeps the API key on the server.
- **Live activity:** a section that shows current LeetCode stats.

## Stack

React 19, Vite, Tailwind CSS, Framer Motion, GSAP, Google GenAI SDK, Vercel

## Run it locally

```bash
npm install
npm run dev
```

The chat widget needs `GEMINI_API_KEY` set for the serverless function. The rest of the site works without it.
