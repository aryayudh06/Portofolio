# Portfolio – Arya Yudha Kusuma Pranata

React-based portfolio with fluid, reactive components. Same content and purpose as the original site, built with React (Vite).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build
```

## Assets

- **Images** (hero, about, skills, projects) are served from `public/img/`. Your existing `src/img` contents have been copied to `public/img`. Add or replace files in `public/img/` (e.g. `public/img/Hero-Profile2.jpg`, `public/img/skills/`, `public/img/projects/`).

## Tech

- **React 18** – components and state
- **Vite** – build and dev server
- **CSS** – fluid layout with `clamp()`, responsive grids, and transitions

Sections: Navbar (sticky, mobile menu), Hero, About, Skills, Projects, Footer. Content is driven by `src/data/portfolio.js` for easy updates.
