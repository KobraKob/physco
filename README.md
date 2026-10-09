# MSc Psychology Academic Research Portfolio

> A distinctive, academically serious portfolio for an MSc Psychology candidate, designed under the **"Research Fieldnote"** visual identity and built for seamless deployment on **Vercel**.

---

## 1. Overview

This website serves as an academic and emerging-professional research portfolio for an MSc in Psychological Science student. It showcases:
- **Intellectual identity & point of view** without hyperbole or clinical over-claims.
- **Areas of empirical inquiry** (cognitive framing, heuristics, and social attribution).
- **Verifiable academic projects** formatted in rigorous research case studies (`Question → Context → Method → Contribution → Findings / Learning → Limitations → References / Artefact`).
- **Evidence-backed research skills & methodological tools** (no arbitrary progress bars or stars).
- **Chronological education & academic appointments**.
- **Scholarly writing & conference presentations** with verified HTTPS links.
- **Ethical commitments** adhering to institutional and participant protection guidelines.

All content is maintained in centralized data files (`src/content/profile.ts` and `src/content/projects.ts`) and guarded by strict conditional rendering rules (`ContentGuard`).

---

## 2. Tech Stack Choices & Justification

- **Vite 8 + React 19 + TypeScript**: Delivers an ultra-fast, type-safe, static client-side application with zero backend overhead, ideal for static edge hosting on Vercel.
- **Vanilla CSS Tokens (`tokens.css`, `global.css`, `components.css`)**: Built entirely with CSS custom properties and fluid typography (`clamp()`). No heavy component libraries or CSS-in-JS runtimes, ensuring minimal bundle size (<100 kB gzipped JS) and zero layout shift.
- **React Router DOM 7**: Client-side routing with clean URLs (`/` and `/project/:slug`), paired with `vercel.json` SPA rewrite rules.
- **Lucide Icons & Native Inline SVG**: Bespoke vector "Margin-Map" research notation motifs with high-contrast editorial colors and zero raster dependencies.
- **Vitest & React Testing Library**: Automated unit and integration testing validating ContentGuard conditions, WCAG 2.2 AA accessibility landmarks, and visual motif variances.

---

## 3. Project Structure

```text
physco/
├── public/
│   ├── favicon.svg          # Bespoke editorial SVG favicon
│   ├── robots.txt           # Configurable crawler directives
│   └── sitemap.xml          # XML sitemap with configurable domain constant
├── src/
│   ├── components/
│   │   ├── AboutSection.tsx             # Biography & 4-item working principles strip
│   │   ├── ContactSection.tsx           # Mailto link & verified HTTPS scholarly profiles
│   │   ├── EducationExperienceSection.tsx # Chronological education & appointments
│   │   ├── EthicalPracticeSection.tsx   # Participant protection & empirical honesty
│   │   ├── HeroSection.tsx              # Asymmetric 2-column layout & MarginMap
│   │   ├── MarginMap.tsx                # Distinct SVG vector motifs (hero & accent)
│   │   ├── MethodsSkillsSection.tsx     # Categorized skills with exact experience labels
│   │   ├── ProjectRow.tsx               # Structured case study sequence
│   │   ├── ResearchSection.tsx          # Vertically stacked indexed research questions
│   │   ├── SectionLabel.tsx             # Editorial numbered section header
│   │   ├── SelectedWorkSection.tsx      # Public research projects archive
│   │   ├── SiteFooter.tsx               # Semantic footer with dynamic year & links
│   │   ├── SiteHeader.tsx               # Sticky header with mobile drawer & focus trap
│   │   └── SkipLink.tsx                 # Accessible skip link to main content
│   ├── content/
│   │   ├── config.ts                    # Central site domain & metadata configuration
│   │   ├── profile.ts                   # Centralized candidate personal & academic data
│   │   └── projects.ts                  # Centralized research projects archive
│   ├── pages/
│   │   ├── HomePage.tsx                 # Full portfolio layout
│   │   └── ProjectPage.tsx              # In-depth project dossier by slug
│   ├── styles/
│   │   ├── components.css               # Editorial component styling & mobile drawers
│   │   ├── global.css                   # CSS reset, grid, and focus rings
│   │   └── tokens.css                   # Color, typography, spacing, and motion tokens
│   ├── types/
│   │   ├── profile.ts                   # Type definitions for student profile
│   │   └── project.ts                   # Type definitions for project entries
│   ├── App.tsx                          # Router configuration
│   ├── main.tsx                         # React entry point
│   └── vite-env.d.ts                    # Vite client types
├── tests/
│   ├── setup.ts                         # Jest DOM matcher setup
│   ├── contentGuard.test.tsx            # Tests for conditional rendering & edge cases
│   └── rendering.test.tsx               # Tests for accessibility landmarks & SVG motifs
├── vercel.json                          # SPA routing rewrites for Vercel
├── vite.config.ts                       # Vite bundler & Vitest configuration
├── tsconfig.json                        # Strict TypeScript compiler options
└── package.json                         # Project dependencies and npm scripts
```

---

## 4. Installation & Setup

1. **Clone or navigate into the repository**:
   ```bash
   cd physco
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 5. Running Tests & Quality Checks

Run the automated test suite with Vitest:
```bash
npm test
```

Run TypeScript verification and production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 6. How the Client Updates Content

All portfolio information is centralized in two files:
1. **`src/content/profile.ts`**: Edit name, degree, institution, bio, working principles (up to 4), research questions, categorized skills, education, experience, publications, ethical statement, and contact links.
2. **`src/content/projects.ts`**: Add or modify research projects. Set `visibility: "omit"` to hide a project without deleting its entry.
3. **`src/content/config.ts`**: Replace `'YOUR_DOMAIN_HERE'` with the live custom production domain once registered.

---

## 7. Deployment to Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the repository.
4. Framework preset: **Vite**.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Click **Deploy**. Vercel will automatically read `vercel.json` for client-side route rewrites.
