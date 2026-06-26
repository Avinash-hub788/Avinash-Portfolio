# Avinash J — Personal Portfolio

A modern, dark-themed personal portfolio website for a senior software engineer. Built with React 18, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Chrome/silver gradient** display headline via CSS background-clip
- **Purple → magenta → orange** accent gradient CTA buttons
- **Dark-on-dark cards** with subtle gray borders
- **Infinite CSS marquee** testimonials (right-to-left, pause on hover)
- **Sticky project cards** that stack as you scroll
- **Smooth scroll** + **scroll-margin-top: 80px** on all sections
- **Framer Motion** entrance animations throughout
- **Fully responsive** — mobile-first, desktop-polished
- **Reduced-motion** safe — marquee disabled, scroll-snap fallback
- **SEO optimised** — title, description, OG, Twitter Card meta tags
- **Kanit font** from Google Fonts
- **Zero hardcoded** profile/experience/project/testimonial content in components
- **Email copy** button in footer

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output is in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx            # Sticky frosted-glass navbar + mobile drawer
│   ├── SocialLinks.tsx       # Filtered social icon pills
│   ├── HeroSection.tsx       # Full-viewport hero with avatar, stats, CTAs
│   ├── AboutSection.tsx      # Bio + detail cards + skills grid
│   ├── ExperienceSection.tsx # Numbered experience rows from JSON
│   ├── ServicesSection.tsx   # Numbered service rows (Backend, AI, Frontend, Cloud)
│   ├── ProjectsSection.tsx   # Sticky project card stack
│   ├── ProjectCard.tsx       # Individual project card with image fallback
│   ├── TestimonialsSection.tsx # CSS-only infinite marquee testimonials
│   └── Footer.tsx            # 3-col footer with brand, nav, contact
├── data/
│   └── portfolio.json        # ALL content lives here
├── hooks/
│   └── usePortfolio.ts       # Typed hook returning portfolio data
├── types/
│   └── portfolio.ts          # TypeScript interfaces for all data shapes
├── utils/
│   └── animations.ts         # Shared Framer Motion Variants
├── App.tsx
├── main.tsx
└── index.css                 # Global styles, marquee keyframes, gradients
```

---

## ✏️ Editing Content

**All content lives in: `src/data/portfolio.json`**

### Profile & Social

```json
"profile": {
  "name": "Your Name",
  "shortName": "FirstName",
  "tagline": "Your tagline...",
  "role": "Senior Software Engineer",
  "specialization": "Full-Stack & AI/ML Engineering",
  "location": "City, Country",
  "yearsOfExperience": 7,
  "bio": "Your bio paragraph...",
  "avatarSvg": "",
  "social": {
    "github": "https://github.com/...",
    "instagram": "https://instagram.com/...",
    "linkedin": "https://linkedin.com/in/...",
    "email": "you@example.com",
    "phone": "+1 234 567 8900",
    "website": "https://yoursite.com"
  }
}
```

> Leave any social field as `""` or remove it to hide that link.

### Adding Experience

```json
{
  "company": "Company Name",
  "role": "Your Role",
  "period": "Jan 2022 – Present",
  "location": "City / Remote",
  "summary": "One sentence summary.",
  "highlights": ["Bullet 1", "Bullet 2", "Bullet 3"]
}
```

### Adding Projects

```json
{
  "id": "unique-id",
  "title": "Project Name",
  "subtitle": "Short subtitle",
  "description": "Full description...",
  "stack": ["React", "TypeScript"],
  "role": "Lead Engineer",
  "year": "2024",
  "link": "https://...",
  "image": "",
  "highlight": true
}
```

> Leave `link` as `""` to hide the Live Project button.  
> Leave `image` as `""` to show a gradient placeholder.  
> Set `highlight: true` to sort to the top of the projects list.

### Adding Testimonials

```json
{
  "id": "unique-id",
  "quote": "Their words here...",
  "name": "Full Name",
  "role": "Title, Company",
  "avatarColor": "#7C3AED"
}
```

### Adding Skills

```json
{
  "name": "Category Name",
  "items": ["Skill 1", "Skill 2", "Skill 3"]
}
```

---

## 🎨 Customising the Design

| Token | File | Default |
|-------|------|---------|
| Background | `index.css` body | `#0C0C0C` |
| Chrome headline | `.hero-heading` in `index.css` | `#646973 → #BBCCD7` |
| Accent gradient | `.accent-gradient` in `index.css` | Purple → Magenta → Orange |
| Font | `index.html` + `index.css` | Kanit (Google Fonts) |
| Marquee speed | `.marquee-track` animation-duration | `40s` |

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript check + production bundle |
| `npm run preview` | Serve production build locally |
| `npm run lint` | ESLint check |

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript 5 | Type safety |
| Vite 8 | Build tool + HMR |
| Tailwind CSS 3 | Utility CSS |
| Framer Motion | Animations |
| lucide-react | Icons |
| Kanit (Google Fonts) | Typography |
