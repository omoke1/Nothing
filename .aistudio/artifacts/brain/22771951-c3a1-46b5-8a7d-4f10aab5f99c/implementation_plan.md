# 16VC Kinetic Platform (Nothin' Motion Architecture + 16VC Content & Monochrome Branding)

Transform the cloned `noth.in` WebGL and GSAP ScrollTrigger experience into the official **16VC (`16vc.co`)** platform—combining `noth.in`'s kinetic typography, fluid shader reveal, Flip transitions, and physics interactions with `16VC`'s venture capital content, team, SF26 startups, and stark black-and-white monochrome aesthetic.

## User Review & Critical Decisions

> [!IMPORTANT]
> All three product and design decisions have been confirmed and incorporated into this plan:

- **Confirmed Decision 1 — Home Asymmetric Showcase Grid**: Populate the main showcase grid with **16VC's 3 Core Offerings** (*01. Capital — $100K–$2M per cheque*, *02. Studio — Save up to $500K*, *03. Fellowship — SF26 Cohort*) alongside **featured SF26 startups & focus areas** (*Netaro*, *NetRanks AI*, *Dexter Copilot*).
- **Confirmed Decision 2 — Monochrome Visual Media & 3D Objects**: Combine **monochrome-filtered video reels & interactive 3D objects** with **16VC team portraits** (*Sridhar Arunagiri, Victor Gembala, Oliver Jones, Luis Fernando de Andrade*) and high-contrast monochrome startup/venture visuals.
- **Confirmed Decision 3 — Full Multi-Page Navigation**: Provide complete, seamless Taxi.js multi-page navigation across **Home (`/`)**, **Offerings (`/offerings` + `/capital` & `/studio`)**, **Portfolio & SF26 Founders (`/portfolio` & `/founders`)**, **Manifesto (`/manifesto`)**, **Team (`/team`)**, and **Contact (`/contact`)**.

---

## 1. Overview & Core Concept

- **What It Does**: Delivers an avant-garde, Awwwards-caliber interactive web experience for **16VC**, an early-stage venture capital firm and startup studio in London backing AI, Enterprise Software, Deep Tech, and FinTech founders.
- **Target Audience / Persona**: Early-stage technology and AI founders seeking pre-seed/seed capital ($100K–$2M), studio co-building support (saving up to $500K), or admission into the 16VC Summer Fellowship (SF26), as well as co-investors and LP partners.
- **Key Value**: Elevates 16VC's thesis, offerings, manifesto, team, and 41+ SF26 cohort companies into an unforgettable, high-retention kinetic storytelling experience with zero color distractions.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Hero & WebGL Fluid Reveal**: Visitors arrive on a crisp white canvas featuring the oversized **`16VC`** custom SVG vector wordmark. Moving the cursor triggers the Three.js WebGL fluid simulation mask revealing the underlying high-contrast monochrome video reel. Top-left displays *"Backing the future. We invest in bold founders pushing the boundaries of enterprise software, AI & deep tech."* with a primary **"Submit Your Pitch →"** (`tally.so/r/n9YAg5`) button. Bottom bar shows *"Venture Capital · London"* and 16VC social links (*LinkedIn / X / Substack / YouTube*).
  2. **Showreel & Thesis Section (`( Our Thesis )`)**: Scrolling scrubs the headline *"We back founders building the infrastructure of tomorrow."* while scaling the monochrome showreel video down to a right-aligned frame beside 16VC's thesis: *"$100K–$2M Cheque Size · Seed & Pre-Seed · Enterprise Software, AI & Deep Tech — 16VC focuses on early-stage enterprise software companies where technology creates lasting competitive advantages."*
  3. **Asymmetric Showcase Grid (`W O R K S` / `F O C U S`)**: The morphing GSAP Flip letters transition across the viewport above *"Ambitious founders should not need permission to build."* The asymmetric 12-column grid showcases:
     - **01. Capital** — *"$100K–$2M per cheque · Seed & Pre-Seed investments"*
     - **02. Studio** — *"Save up to $500K · Co-building from idea to launch"*
     - **03. Fellowship (SF26)** — *"Active & accepting applications · 41+ SF26 cohort builders"*
     - **Netaro** — *"SF26 Cohort · Founded by Yash Patel"*
     - **NetRanks AI** — *"SF26 Cohort · Founded by Berat Reha Sonmez"*
     - **Dexter Copilot** — *"SF26 Cohort · Founded by Astemir & Kanshobi Azhakhov"*
     Hovering any card activates the custom magnetic `EXPLORE →` cursor and routes to its dedicated detail view.
  4. **Pinned Monochrome Gallery Zoom**: Scrolls into the architectural gallery installation (rendered in strict monochrome grayscale) with synchronized floor reflection and interactive `SOUND` toggle.
  5. **The 16VC Manifesto, Focus Areas & Team (`( What We Believe )`)**:
     - Displays the 16VC belief statement (*"We back founders early. Sometimes before revenue. Sometimes before product market fit. Sometimes before the obvious proof exists."*) with parallax monochrome visuals.
     - Oversized headline *"Capital is only part of the job."* followed by `"We focus on :"` (*AI & Machine Learning, Enterprise Software, Deep Tech, FinTech, Web3 & Decentralization, Developer Tools*).
     - Cursor-repelling monochrome 3D objects interspersed with **`1` `6` `V` `C`** vector glyphs.
     - **`16VC People :`** listing **Leadership & General Partner** (*Sridhar Arunagiri — Founder & General Partner 🇮🇳*) and **Advisors** (*Victor Gembala — Strategic Advisor 🇬🇧, Oliver Jones — Technology Advisor 🇦🇹, Luis Fernando de Andrade — Tech Advisor 🇧🇷*) with their monochrome portraits.
  6. **Glitch Elevator Section**: Scroll-velocity ASCII character glitching (`we are 16vc`) that scatters on scroll to reveal *"16VC backs bold founders building what comes next."*
  7. **16VC FAQs (`F A Q S`)**: Interactive line-split accordions answering key founder questions:
     - *What cheque size and stage does 16VC invest in?* (`$100K–$2M`, pre-seed through seed, SPV deal-by-deal structure)
     - *How does 16VC Studio co-building work?* (Hands-on technical engineering, product strategy, GTM, saving up to $500K)
     - *What is the 16VC Summer Fellowship (SF26)?* (Mentorship, operator network, and cohort community for early-stage builders)
     - *What does 16VC look for in founders?* (Founder ambition, speed of learning, customer obsession, clarity of thinking, long-term vision)
  8. **Footer & Interactive Assistant**:
     - *"Ready to build the future?"* with **"Apply to the Accelerator →"** (`tally.so/r/5BPNXd`), **"Pitch Your Idea →"** (`tally.so/r/n9YAg5`), and **`info@16vc.co`**.
     - Giant elastic **`16VC`** SVG wordmark with hover spring physics.
     - Legal & location bar: *"© 2026 16VC Limited (Company No. 16224768) — 125 Kingsway, London WC2B 6NH, United Kingdom"*, plus quick links to **OFFERINGS**, **PORTFOLIO**, **MANIFESTO**, **TEAM**, **CONTACT**.
     - Bottom-right **`ASK 16VC`** monochrome assistant widget pre-loaded with 16VC investment thesis, cheque size, studio, fellowship, and contact details.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Brutalist institutional venture capital meets kinetic editorial motion.
  - *Color Palette & Mood*: Strict 100% monochromatic Black (`#000000`), Pure White (`#FFFFFF`), and neutral grayscale (`#E3E1DE`, `#8A8A8A`, `#1A1A1A`). All videos, 3D floating objects, and photography use CSS/WebGL grayscale contrast filters (`filter: grayscale(100%) contrast(1.08)`) so zero non-monochrome hues appear anywhere.
  - *Typography & Hierarchy*: `PP Neue Montreal` (`Ppneuemontreal`) across display headlines, body prose, and tabular numeric indices (`01`, `02`, `03`, `$100K–$2M`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1 — Custom `16VC` SVG Paths for Hero, Nav, Loader, and Footer**:
  - *Chosen Approach*: Construct multi-path `<svg>` geometry for `1`, `6`, `V`, `C` (plus apostrophe/dot accent path matching the `.nothin-apos` / `.nav-apos` selector contract) so that `main.js`'s staggered path entrance (`tf()`), nav logo hover expansion (`vv()`), WebGL SVG texture baker (`lA()`), and footer elastic hover (`hx()`) animate each glyph of **`16VC`** natively without breaking a single GSAP selector.
  - *Why*: Preserves 100% of the WebGL fluid shader and elastic SVG physics while rebranding every wordmark from `NOTHIN'` to `16VC`.
- **Decision 2 — Monochrome Pipeline Across WebGL & DOM Media**:
  - *Chosen Approach*: Apply global monochrome rules to all `.loader-img`, `.formes-w img`, `.video-hero-bg`, `.showreel-light`, `.video-sticky`, `.video-reflet`, `.img-work`, `.image`, `.img-ascenseur`, `.merguez-img`, and `.ballon-img` elements, while integrating downloaded 16VC team photos (`sri1.png`, `victor.jpg`, `oliver.jpg`, `luis.jpg`) and custom monochrome 16VC visual cards.
  - *Why*: Ensures strict adherence to `16vc.co`'s black-and-white visual identity while keeping all video textures and 3D physics interactive.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        Browser / Client Runtime                          │
├──────────────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ Window Fetch Interceptor & Local Route/Asset Resolver              │  │
│  │  • Routes: /, /offerings, /capital, /studio, /portfolio,           │  │
│  │            /founders, /manifesto, /team, /contact, /works/*        │  │
│  │  • Chat API: /webhook/chat-config-v2 & /webhook/chat-ia-v2 (16VC)  │  │
│  └───────────────────────────────┬────────────────────────────────────┘  │
│                                  ▼                                       │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ App Shell & Monochrome Theme Layer                                 │  │
│  │  • Custom 16VC Nav SVG (.nav-logo) + Expanding Menu (.menu-w)      │  │
│  │  • Monochrome CSS Filter Pipeline (grayscale + high-contrast B&W)  │  │
│  │  • Interactive ASK 16VC Assistant Widget                           │  │
│  └───────────────────────────────┬────────────────────────────────────┘  │
│                                  ▼                                       │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ Taxi.js View Container ([data-taxi] -> [data-taxi-view])           │  │
│  │  ├── Home View: 16VC Fluid Hero + Thesis Reel + Offerings/SF26     │  │
│  │  │              Grid + Gallery Zoom + Manifesto/Team + FAQs        │  │
│  │  ├── Offerings / Capital / Studio Views: Deep-dive 16VC pillars    │  │
│  │  ├── Portfolio & SF26 Founders View: 41+ SF26 startups & builders  │  │
│  │  ├── Manifesto View: 5 core 16VC principles & belief statements    │  │
│  │  └── Team & Contact Views: Partners/Advisors + London HQ & Tally   │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

- **Data Model & State**:
  - `PAGES_DATA` dictionary maps every internal route (`/`, `/offerings`, `/capital`, `/studio`, `/portfolio`, `/founders`, `/manifesto`, `/team`, `/contact`, and individual showcase slugs) to its localized HTML view, page title, and Webflow layout ID.
  - Interactive SF26 Founder & Startup directory on `/portfolio` and `/founders` supports live client-side search filtering across all 41+ SF26 companies and founders.
- **Interactive Component & State Mapping**:
  - **Navbar (`16VC` + `MENU ::`)**: Hovering `16VC` expands individual vector characters; hovering/clicking `MENU ::` reveals links to `OFFERINGS`, `PORTFOLIO`, `MANIFESTO`, `TEAM`, `CONTACT`.
  - **Showcase Cards & Case Studies**: Clicking any Offering or SF26 Startup card transitions smoothly via Taxi.js to its full detail page with next-item scroll-timeline navigation (`jv()`).
  - **FAQ Accordions**: Clicking any 16VC question animates line-masked answers with `+` to `—` icon morphing.
  - **ASK 16VC Widget**: Answers founder questions about cheque size ($100K–$2M), stage (Pre-Seed & Seed), Studio co-building (save up to $500K), SF26 Fellowship, and provides direct CTAs to Pitch (`tally.so/r/n9YAg5`) or email `info@16vc.co`.
