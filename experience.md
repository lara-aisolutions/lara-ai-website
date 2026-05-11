# LARA.ai Website — Experience Log

## Project Context
Production website for LARA.ai (lara-ai.in) — an Anthropic Claude-powered AI solutions studio
based in Delhi, India. Goal: impress Anthropic for Partner Network, convert business clients,
and give recruiters/HR a clear view of technical capability.

---

## Session 1 — 2026-05-12

### What Was Built
Complete production website from scratch. Transformed a single-file index.html (with inline
CSS/JS) into a properly structured multi-file project.

### Files Created / Modified
- `index.html` — Full rewrite: clean HTML, logo images, Team section, Formspree form, hamburger
  mobile nav, favicon tags, accessibility attributes (ARIA)
- `style.css` — All CSS extracted from index.html + new styles: hamburger menu, Team section,
  progress bars for certification completion, partner callout block, nav active states,
  form success state, scroll-reveal delay utilities
- `script.js` — All JS extracted + new: hamburger toggle, active nav section detection, async
  Formspree form submission with success/error handling, progress bar animation on scroll
- `.gitignore` — Standard web project gitignore
- `experience.md` — This file
- `DEPLOYMENT.md` — Full deployment guide (Cloudflare Pages + GitHub + Formspree + DNS)

### Design System
- Fonts: Syne (display/headings, wt 700/800) + DM Sans (body, wt 300/400/500)
- Colors: black #0a0a0a, white #ffffff, accent #FF4D00, accent-light #FF6B2B
- Grey scale: grey-100 #f5f5f3, grey-200 #e8e8e5, grey-400 #9a9a95, grey-700 #3a3a37
- Nav height: 74px (CSS var --nav-h)
- Custom cursor on desktop (hidden on mobile via CSS + JS)
- Scroll reveal: .reveal + .visible classes via IntersectionObserver
- Stagger delays: .reveal-delay-1 through .reveal-delay-4 (80ms steps)

### Sections (in order)
1. Nav — sticky blur nav with logo image, links, hamburger mobile button
2. Hero — dark background, animated badge, headline, stats (5+ products, 100% Claude, 5 courses)
3. About — two-column grid, founder quote callout, 4 capability cards
4. Products — 3-column grid, 5 real products + 1 "in pipeline" card, outcome text per card
5. Claude/Certifications — dark section, Anthropic Academy certs with progress bars, metrics panel
6. Services — 6-card grid (Claude API, Agentic Workflows, MCP, Claude Code, Consulting, Political AI)
7. Team — two-person grid (Latika Sharma + Ravi Verma), MSME callout banner
8. Contact — two-column: contact info left, Formspree form right
9. Footer — logo image, copyright, nav links

### Logo Files Used
- Nav + Footer: `logo/website-navbar-logo.png` (height: 32px nav, 24px footer, inverted for footer)
- Favicon: `logo/favicon.ico` (primary) + `logo/favicon-32.png` + `logo/favicon-16.png` +
  `logo/favicon-128.png` (apple-touch-icon)
- `lara-logo-transparent.png` and `lara-icon-transparent.png` available but not yet placed in
  design — could be used in hero or about section if design evolves

### Contact Form
- Uses Formspree. Action URL is placeholder: `https://formspree.io/f/YOUR_FORM_ID`
- User needs to register at formspree.io, create a form, replace YOUR_FORM_ID in index.html
- Form fields: name, email, company, message + hidden _subject field
- Async JS submission with success/error states

### Known Next Steps
- Replace `YOUR_FORM_ID` in index.html with actual Formspree ID after registration
- Deploy to Cloudflare Pages following DEPLOYMENT.md
- Point DNS at Hostinger to Cloudflare Pages
- Consider adding OG image (1200×630) using youtube-banner-2560x1440.png cropped
- lara-logo-transparent.png could be placed as a decorative element in the hero section
- Products section could gain individual product pages (future iteration)

### Things That Work Well
- 3-col product grid fills perfectly with 5 real products + 1 "in pipeline" = 6 cards
- Progress bars for in-progress certs animate on scroll (via IntersectionObserver)
- Fallback onerror on all img tags → text LARA.ai if image fails to load
- Mobile menu overlays full screen on hamburger tap, all links close it
- Form falls back to mailto: alert if Formspree submission fails

### Things to Avoid
- Do NOT use inline CSS or JS — all styles in style.css, all scripts in script.js
- Do NOT reference node_modules or build tools — this is a pure static site
- Do NOT commit .env files or API keys
