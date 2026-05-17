# 🚀 Auronix — Intelligence. Engineered. Elevated.

> **Software Development Company · Nagpur, Maharashtra, India**
> AI & ML · Web Development · Mobile Apps · ERP & System Design

[![Live Site](https://img.shields.io/badge/Live-auronix.in-7B4DFF?style=for-the-badge&logo=vercel)](https://auronix.in)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

---

## 📋 Overview

Auronix is a premium software engineering company based in Nagpur, India, building high-performance digital products for businesses across India and globally. This repository contains the full source code for the [auronix.in](https://auronix.in) marketing website.

### Key Features
- ⚡ **Three.js** particle field + icosahedron hero background
- 🎞️ **GSAP** scroll animations + timeline orchestration
- 🖱️ Custom cursor with trail + hover expand effects
- ✍️ Typewriter hero text cycling effect
- 📡 Radar widget animation
- 🧬 DNA helix canvas animation (About section)
- 📊 Animated counter metrics on scroll
- 🃏 Bento card grid (Services) with mouse-gradient glow
- 💬 WhatsApp contact form with form validation
- 📱 Fully responsive (desktop → tablet → mobile)
- 🔍 Full SEO: structured data, Open Graph, Twitter Card, sitemap

---

## 🗂️ Project Structure

```
auronix/
├── public/
│   ├── favicon.png          # Site favicon
│   ├── logo.png             # OG / share logo
│   ├── robots.txt           # Search engine crawler rules
│   └── sitemap.xml          # XML sitemap for Google
├── src/
│   ├── assets/              # Images, logos, service/tech icons
│   ├── components/
│   │   ├── BentoCard.jsx    # Mouse-gradient service card
│   │   ├── Cursor.jsx       # Custom cursor + trail
│   │   ├── Loader.jsx       # Page load animation
│   │   ├── Navbar.jsx       # Navigation + hamburger menu
│   │   ├── RadarWidget.jsx  # Hero radar animation
│   │   └── Ticker.jsx       # Data ticker strip
│   ├── hooks/
│   │   └── useGSAP.js       # CDN global accessor
│   ├── pages/
│   │   └── Home.jsx         # Page assembler
│   ├── sections/
│   │   ├── Hero.jsx         # Hero + Three.js + typewriter
│   │   ├── About.jsx        # DNA helix canvas + stat strips
│   │   ├── Services.jsx     # Bento grid services
│   │   ├── Process.jsx      # Horizontal process timeline
│   │   ├── Tech.jsx         # Hex tech stack display
│   │   ├── Metrics.jsx      # Animated counter stats
│   │   ├── Testimonials.jsx # Auto-scrolling testimonials
│   │   ├── CTA.jsx          # WhatsApp contact form
│   │   └── Footer.jsx       # Footer with links
│   ├── App.jsx
│   ├── index.css            # All styles (original CSS preserved)
│   └── main.jsx             # React entry point + BrowserRouter
├── index.html               # SEO-optimised HTML entry
├── vercel.json              # Vercel deployment config
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | CSS (original) + TailwindCSS 3 |
| Routing | React Router DOM v7 |
| Animations | GSAP 3.12.5 + ScrollTrigger (CDN) |
| 3D Graphics | Three.js r128 (CDN) |
| Fonts | Syne + DM Mono (Google Fonts) |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Install & Run

```bash
# Clone the repository
git clone https://github.com/your-org/auronix.git
cd auronix

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Development server: **http://localhost:5173**

---

## 🌐 Deployment (Vercel)

### Option 1 — Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

### Option 2 — Vercel Dashboard
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Framework: **Vite** (auto-detected)
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**

The `vercel.json` handles SPA routing (all paths → `index.html`) automatically.

---

## 🔍 SEO

The following SEO assets are included:

| File | Purpose |
|---|---|
| `index.html` | Full meta tags, OG, Twitter Card, canonical |
| `public/robots.txt` | Crawler rules + sitemap pointer |
| `public/sitemap.xml` | All pages/sections for Google indexing |
| Structured Data (JSON-LD) | Organization, LocalBusiness, WebSite schemas |
| Geo tags | Nagpur, Maharashtra coordinates |

### After deploying, submit to:
- **Google Search Console**: https://search.google.com/search-console
- **Bing Webmaster Tools**: https://www.bing.com/webmasters

---

## 📞 Contact

**Auronix Technologies**
📍 Nagpur, Maharashtra, India
📱 +91 70286 54498
🌐 [auronix.in](https://auronix.in)
💼 [linkedin.com/company/auronix](https://linkedin.com/company/auronix)

---

© 2025 Auronix Technologies. All rights reserved.
