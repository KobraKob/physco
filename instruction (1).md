# BUILD SPECIFICATION — MSc Psychology Portfolio

> **Role:** Act as a senior digital design architect, editorial art director, accessibility specialist, and front-end engineer. Build a complete, production-ready portfolio—not a wireframe, not a generic template, and not a design concept that only looks good in a screenshot.
>
> **Primary outcome:** A distinctive, credible, academically serious portfolio for a person pursuing an MSc in Psychology. The website should communicate intellectual curiosity, research literacy, ethical judgment, clarity, and a recognisable point of view. It must feel designed by a thoughtful human, not assembled from an AI landing-page prompt.
>
> **Hosting:** Vercel. **Priority order:** credibility and content accuracy → visual distinction → usability and accessibility → performance → maintainability.

---

## 0. How to execute this brief

1. **Inspect the repository before changing it.** Read the existing files, package manifest, framework, routes, and build scripts. Preserve working code and the current stack when reasonable. Do not overwrite the project blindly.
2. If the repository is empty, use **Vite + React + TypeScript** for a fast, maintainable, mostly static site suitable for Vercel. Avoid adding a back end unless a real requirement demands one.
3. Before implementation, briefly record the proposed visual system and page structure in the project notes or your implementation summary. Then build it. Do not stop after a mockup.
4. Create a complete responsive implementation with real interactions, meaningful content architecture, metadata, accessible states, and a working production build.
5. Where the client’s real information is missing, use **clearly marked content fields** and build a polished layout that can accommodate them. Do not invent their name, institution, grades, awards, publications, clinical experience, certifications, research results, or professional status. Never leave lorem ipsum or fake credentials in the finished site.
6. Keep editable profile and project content in one central data file, such as `src/content/profile.ts`, instead of scattering personal details across components.
7. Run the build and available checks. Fix warnings, broken links, layout overflow, console errors, and TypeScript errors before completion. Report what was actually tested; do not claim tests passed if they were not run.

## 1. Audience and positioning

### Primary audiences

- Academic supervisors and faculty.
- Research labs and potential research collaborators.
- Internship, research-assistant, and relevant early-career employers.
- Selection panels evaluating the student’s academic maturity.
- Where appropriate, professional contacts who want to understand the student’s interests and training.

### What the website must prove

A reviewer should be able to understand, within one minute:

- Who this person is and what stage of study they are at.
- What questions in psychology they genuinely want to investigate.
- What they have actually studied, produced, presented, or contributed to.
- How they reason about evidence, methods, limitations, and ethics.
- How to contact them or download their CV.

The site is an **academic and emerging-professional portfolio first**. It is not automatically a counselling website or private-practice website. Do not market therapy, diagnosis, psychological testing, treatment outcomes, or clinical services unless the client explicitly confirms their qualifications, relevant registration, scope of practice, and intended service. An MSc in Psychology alone must not be presented as proof of eligibility to practise as a Clinical Psychologist in India. Check exact programme nomenclature and current requirements through the Rehabilitation Council of India (RCI) where relevant.

### Voice

Precise, thoughtful, curious, grounded, and human. Use concrete sentences. Prefer evidence and reflection over grand claims. The tone may be intellectually expressive, but never mystical, diagnostic, overly sentimental, or self-important.

**Avoid phrases such as:** “unlocking the human mind,” “passionate about helping people,” “journey into the mind,” “where science meets compassion,” “healing starts here,” or any stock copy that could describe every psychology student.

**Better content principle:** state the question, context, contribution, method, what was learned, and what remains uncertain.

## 2. Art direction: “The Research Fieldnote”

### Core concept

Design this as a contemporary psychology research journal crossed with an independent editorial publication. Imagine a carefully art-directed field notebook: typeset arguments, marginal notes, evidence labels, fine rules, small diagrammatic systems, a strong index, and a few deliberate bursts of colour. It should feel analytical and alive—not clinical, sterile, corporate, or wellness-themed.

The visual language comes from **editorial typography, Swiss/international grid discipline, academic annotations, and original abstract data-inspired drawing**. Use these references as principles rather than copying a particular website. The visual surprise should come from composition, typography, spacing, and custom visual assets—not decoration pasted onto a template.

### Avoid the usual psychology-site clichés

- No purple-to-blue or pink-to-orange gradients.
- No giant glowing orbs, glassmorphism, blurred blobs, or glossy 3D brains.
- No stock images of people holding their heads, therapy couches, puzzle-piece heads, hands around a heart, or generic smiling counsellors.
- No endless rounded cards, capsule tags, floating blobs, oversized emoji, dashboard layouts, or repetitive centred sections.
- No fake testimonials, invented case studies, inflated impact metrics, or made-up “research statistics.”
- No decorative brain illustrations presented as scientific models.
- No animation that delays access to content or makes the user wait through a theatrical intro.

### Visual signature

Create an **original “margin-map” motif**: thin vector lines connecting small labelled nodes, annotation marks, open circles, brackets, chart-like axes, or an abstract branching path. Treat this as a graphic identity, not as evidence, a brain scan, or a scientific diagram. It can recur in the hero, section transitions, and project covers, but each use must be composed for that specific location. Create it using SVG or CSS, not raster stock art.

The visual should be recognisable even if every photograph is removed. The typography and layout must do most of the work.

### Colour system

Start with this intentional, high-contrast palette; adjust only if contrast or real content demands it:

- **Paper:** `#F4F1E9` — primary background.
- **Ink:** `#1D211F` — main text and dark surfaces.
- **Secondary text:** `#5C625D` — supporting text; test actual contrast before use.
- **Signal cobalt:** `#3159C9` — links, active states, diagram details, key interaction colour.
- **Vermilion:** `#D9503D` — rare emphasis for indices, important annotations, or small graphic nodes.
- **Rule:** `#D8D4CA` — quiet separators on paper.
- **White:** `#FFFFFF` — use selectively for contrast and document-like surfaces.

Use colour with editorial restraint: paper and ink should dominate; cobalt provides navigation and structure; vermilion appears as a controlled accent, not a second theme. Do not use accent colours for long passages of body text unless contrast passes. Never communicate status or meaning by colour alone. Check colour contrast in code or with an audited tool.

### Typography

Use a purposeful contrast between an editorial display face and a highly legible interface/body face. A practical starting pairing is **Newsreader** for large editorial headings and **DM Sans** for body, UI, labels, and metadata. Include sensible system fallbacks. Load only the weights/styles actually used, with `font-display: swap`; use a local or system fallback if external font loading harms performance.

- Display headlines: confident serif, tight but readable leading, intentionally broken lines.
- Body: neutral sans-serif, generous leading, comfortable line length.
- Metadata: sans-serif, compact, slightly tracked, but not tiny.
- Use italics only to create a specific editorial contrast, not as a constant theme.
- Do not set important words as images.

### Layout and spatial system

Use a strict grid with asymmetry. Avoid both random placement and a uniform grid of identical cards.

- Max content width: approximately `1440px`.
- Desktop outer margins: `clamp(24px, 5vw, 80px)`.
- Mobile outer margins: `20–24px`.
- Desktop grid: 12 columns, consistent gutters, with sections allowed to break the grid intentionally.
- Tablet: 8-column logic or a simpler adaptive grid.
- Mobile: 4-column logic or a single-column flow.
- Base spacing scale: 4px. Use consistent steps such as 4, 8, 12, 16, 24, 32, 48, 64, 88, 112, and 144px. Use CSS variables and `clamp()` for fluid spacing.
- Section vertical spacing: generous and variable; usually `88–144px` on desktop and `64–88px` on mobile.
- Text measure: approximately 55–75 characters for long-form body copy; narrower for introductions and pull quotes.
- Borders: mostly 1px rules. Corners should be square or only subtly softened (`0–6px`), not pill-shaped by default.
- Keep alignment precise. Small misalignments look accidental; only break alignment when the composition clearly benefits.

### Scale and hierarchy

A suggested fluid type scale (adapt and test visually):

- Hero display: `clamp(2.8rem, 7.4vw, 7.5rem)`; line-height about `0.92–1.02`.
- Section titles: `clamp(2rem, 4vw, 4.5rem)`.
- Project titles: `clamp(1.5rem, 2.5vw, 2.4rem)`.
- Lead copy: `1.2–1.4rem` with comfortable leading.
- Body: `1–1.1rem`, line-height `1.55–1.75`.
- Eyebrows / metadata: approximately `0.75–0.875rem`; never shrink essential text to make the design feel sophisticated.

Implement semantic styles rather than assigning arbitrary font sizes section by section. Do not use extreme typography that clips, overlaps, or becomes inaccessible on mobile.

## 3. Page structure and content logic

Prefer a highly art-directed home page supported by dedicated research/project detail pages only when the client has enough substance to justify them. Do not make a large, empty multi-page site. Build content sections as modular components and hide sections that have no verified content, rather than displaying empty placeholders.

### A. Header / navigation

- Small wordmark: the person’s real name, or a restrained initials mark only if approved.
- Clear links: `About`, `Research`, `Selected work`, `Experience`, `Contact`—rename or remove based on actual content.
- A functional CV link only when a valid PDF exists.
- Keep header compact and quiet. A simple sticky header is acceptable if it does not obscure anchors or create a bulky bar.
- Mobile navigation must be usable with touch and keyboard. No tiny menu controls. Close it after navigation and return focus appropriately.
- Active navigation state must be visible and must not rely on colour alone.

### B. Hero: intellectual identity in one glance

Compose the hero asymmetrically. Put the main editorial headline on one side and a custom SVG margin-map / research notation system on the other. Avoid a generic split hero with a portrait and two buttons unless a real portrait genuinely strengthens the person’s identity.

Hero content should include:

1. A short, factual eyebrow: current degree / field and institution when supplied and verified.
2. One original headline explaining how the person approaches psychology. It must reflect the client’s actual interests, not invented expertise.
3. Two short sentences about current questions or interests.
4. One primary action: `Explore selected work` or equivalent.
5. One secondary action: `Download CV` only if the file works; otherwise use `Contact`.
6. A restrained location / status line only if useful and approved.

Copy direction examples are structural only; personalise them with the client’s information:

- “Studying how context shapes the way we think, feel, and behave.”
- “Questions first. Evidence next. Conclusions held lightly.”

Do not use either line as final content without checking that it describes the person.

### C. About / point of view

Make this a concise, well-edited narrative—not a long generic biography. Include current study, the path into psychology, interests that have evidence behind them, and a view of how psychological questions should be approached. A real portrait can be added if the client provides a high-quality image and consents to publishing it. Do not use AI-generated portraits or fake institutional environments as substitutes for the person.

A small “working principles” strip may feature 3 short principles such as evidence, context, and ethics, provided the client endorses them. These are statements of approach, not claimed qualifications.

### D. Research interests

Show the actual topics the student wants to explore. Each topic should have a meaningful one- or two-sentence explanation describing the question, not a buzzword list. Potential fields may include social, cognitive, developmental, health, clinical, organisational, community, or cultural psychology, but **do not assign any of them to the client until confirmed**.

Use a distinctive typographic list or indexed editorial rows. Do not make every interest a rounded card. If the person’s interests are still broad, phrase them as questions being explored rather than specialisms.

### E. Selected work / research archive

This is the most important proof section. Prioritise completed or verifiable academic work over decorative claims. Display real material if available:

- Dissertation or thesis topic and stage.
- Research proposal or literature review.
- Class research project.
- Research methods / statistics project.
- Seminar, poster, presentation, or conference contribution.
- Publicly available article, paper, or publication.
- Ethical, community, or fieldwork project, where disclosure is allowed.
- Relevant writing sample or reflective academic essay.

For each project, show only facts the client can support. A useful project record includes:

- Title and date / academic year.
- Context: class project, thesis, independent study, internship, presentation, etc.
- The question or objective.
- The student’s specific contribution and the collaborators / supervisor where relevant.
- Methods or literature approach, accurately described.
- Main findings or lessons **only when real and allowed to disclose**.
- Limitations and what the student would examine next.
- Link to a paper, poster, slide deck, or downloadable PDF if the file is authorised for public access.

A well-designed project detail page should read like a compact research case study: **Question → Context → Method → Contribution → Findings / learning → Limitations → References / artefact**. The answer should expose thought process, not just produce an attractive project thumbnail.

Never present an assignment as a peer-reviewed publication. Do not imply the student independently conducted work that was group-based. Attribute collaborators and supervisors appropriately. Do not publish copyrighted course materials or restricted documents without permission.

If the client has only one strong project, feature one deeply. If there are two or three real projects, vary the layout to suit their content. Never add fictional project entries to fill the grid.

### F. Methods and skills

If verified, present methods as evidence-backed capabilities, not skill bars or invented proficiency scores. Examples that may be relevant—but must be checked with the client—include literature searching, critical appraisal, research design, survey design, qualitative interviewing, thematic analysis, quantitative analysis, statistics, academic writing, referencing, presentations, and tools such as SPSS, R, Jamovi, JASP, Excel, NVivo, or other real tools used.

Prefer three groups such as `Research`, `Analysis`, and `Communication`, each paired with a concrete example or artifact. Use exact confidence level when appropriate: `coursework exposure`, `used in a supervised project`, or `independent project experience`. Do not create 95% skill meters, arbitrary ratings, or a wall of technology logos.

### G. Education and experience

Use a clean chronological record. Distinguish degree title, institution, dates, status, dissertation/thesis where applicable, and relevant coursework if the client supplies it. Use official course naming and do not imply graduation before graduation. Keep other experience concise and explain why it is relevant, but do not force unrelated jobs into a psychology narrative.

### H. Writing / publication / presentation

Show publications, posters, talks, essays, or presentations only when real. Give complete and consistent bibliographic metadata where available. Use DOI or stable repository links when available. If no publications exist, omit this section or rename it to `Writing & presentations` only when actual samples exist. Do not manufacture citations, journal names, DOIs, conference acceptance, or publication status.

### I. Ethical practice / research responsibility

A compact section can state what the student takes seriously: consent, confidentiality, cultural context, careful interpretation, transparent limitations, and the distinction between evidence and speculation. Make it personal and accurate, not a claim of professional mastery.

Do not expose case reports, raw interview transcripts, identifiable participant details, mental-health histories, assessment results, clinical notes, or private institution records. Anonymisation is not just deleting names; details can identify someone in combination. Share fieldwork or case material only when institutionally permitted, appropriately consented, reviewed as needed, and genuinely necessary. When uncertain, omit it.

Do not reproduce copyrighted psychological test questions, protocols, scoring keys, or secure test material. Do not present mock diagnostic interpretations as real clinical competence.

### J. Contact / closing section

Create a strong, quiet ending—not a sales pitch. A concise invitation to discuss research, academic collaboration, or appropriate opportunities is enough. Provide working links for the email address, approved professional profile, and/or CV. Use a real `mailto:` link as a robust fallback. If a form is included, connect it to a real service and handle validation, success, failure, and spam appropriately; otherwise do not present a fake working form.

Include a simple footer with the real name, year, and selected links. Avoid unnecessary legal boilerplate. Add a privacy note only if relevant to actual data collection.

## 4. Interaction design: purposeful, not performative

Every interaction must solve a real problem or give useful feedback.

- Navigation scrolls correctly to sections and accounts for any sticky header.
- Project links open a readable detail page or a real artefact; they must not dead-end.
- Download links must download/open the intended file.
- Email and external links must work.
- Hover states should reveal small changes in underline, rule, index, or position—not large animated transformations.
- Project rows may show a subtle arrow/annotation on hover, but interaction must remain clear without hover on touch devices.
- If a project filter is useful and enough projects exist, implement real keyboard-operable filtering. With only a few projects, skip the filter rather than adding a pointless interface.
- No fake loading screens, cursor followers, scroll hijacking, unskippable reveal sequences, auto-playing audio, or motion that blocks text.
- Use animation sparingly: short opacity/transform transitions, roughly 150–350ms, with no exaggerated spring effects. Respect `prefers-reduced-motion: reduce` and provide a calm no-motion state.
- Content remains visible if JavaScript animation fails or runs slowly. Never hide primary content until an animation finishes.

## 5. Responsive design requirements

Design mobile deliberately; do not merely stack the desktop page.

Test at widths around 320, 375, 430, 768, 1024, 1280, and 1440px, plus a tall viewport. At minimum:

- No horizontal overflow or cropped text.
- Hero headline wraps elegantly and stays within the viewport.
- The custom SVG motif scales and never competes with essential content.
- Desktop project compositions become clear single-column or two-column layouts on mobile.
- Metadata can wrap without overlapping titles.
- Navigation, links, and touch controls have comfortable hit areas; aim for 44×44 CSS px for primary touch targets where practical.
- Long headings, email addresses, and links do not break the layout.
- Any fixed/sticky elements do not obstruct content or keyboard focus.
- Use responsive images, `max-width: 100%`, and explicit aspect ratios where applicable.
- Check landscape mobile, 200% zoom, and text-spacing/reflow behaviour.

Use CSS Grid/Flexbox and fluid variables. Avoid position-absolute layout for essential textual content. Absolute positioning is acceptable for decorative SVG details when their bounds are safe.

## 6. Accessibility requirements

Target **WCAG 2.2 AA** as a practical baseline. Accessibility is part of the design, not a later patch.

- Use semantic landmarks: `header`, `nav`, `main`, meaningful `section` headings, and `footer`.
- Include a skip link to main content.
- Maintain a logical heading order; one primary `h1`.
- Ensure all functions work by keyboard, with visible focus indicators. Never remove the outline without replacing it.
- Use meaningful link names; avoid repeated “click here.”
- Provide text alternatives for meaningful images. Mark purely decorative SVGs `aria-hidden="true"` and keep them out of the accessibility tree.
- Meet contrast targets: at least 4.5:1 for normal text and 3:1 for large text, with non-text UI contrast checked where relevant.
- Do not rely on colour alone to communicate state, category, or link status.
- Make navigation and any filters keyboard usable, including clear focus and selected states.
- Respect reduced-motion preferences.
- Ensure forms have persistent labels, useful errors, and clear success/failure messages if a form is genuinely implemented.
- Keep content readable at 200% zoom and under increased text spacing.
- Set a descriptive document title and language. Use `lang="en"` unless the client confirms another primary language.

## 7. Performance, SEO, and Vercel delivery

### Performance

Treat performance as part of the visual experience. Target good Core Web Vitals at the 75th percentile when real field data becomes available: **LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1**. These are targets, not guarantees.

- Keep the build lightweight. Avoid large animation libraries and unnecessary UI kits.
- Prefer CSS and inline SVG for bespoke motifs. Do not add charting libraries to draw a static decorative diagram.
- Use optimised AVIF/WebP images where appropriate; specify dimensions/aspect ratios and lazy-load below-the-fold images.
- Do not lazy-load the main hero image if it is the LCP element; prioritise it sensibly.
- Minimise font files and weights. Avoid layout shifts while fonts load.
- Split code only where useful. Avoid huge dependency stacks for a single-page portfolio.
- Prevent layout shift by reserving image and embed space.
- Remove unused packages and console logging from production code.

### SEO and sharing

- Unique, accurate `<title>` and meta description, written for a real psychology student.
- Canonical URL only after the actual production domain is known. Do not hardcode a guessed domain.
- Open Graph and social preview metadata. Use a designed OG image with real name / truthful role and no misleading credentials.
- Correct favicon and app/browser theme metadata.
- Semantic HTML, descriptive internal links, heading hierarchy, and descriptive image alt text.
- Generate `sitemap.xml` and `robots.txt` when the canonical production domain is known; otherwise leave the domain easy to configure and do not invent it.
- Add `Person` structured data only for truthful known fields. Do not use schema properties to imply licence, clinical practice, employer, or awards that do not exist.
- PDFs should have descriptive filenames. Keep downloadable CV / project documents small and readable.
- No keyword stuffing, hidden text, or fake FAQ content for SEO.

### Deployment

- Must deploy successfully on Vercel from the linked Git repository.
- If using Vite + React Router, configure fallback rewrites in `vercel.json` so direct visits and refreshes on internal routes work correctly. Verify deep links after build/deployment when possible.
- Ensure `build` and `preview` scripts work and that the production build does not depend on local files or secrets.
- No private API keys or secrets in client-side code.
- Use Vercel preview deployment for review if available; do not state a deployment was completed unless it actually was.

## 8. Code architecture and quality

Keep the project simple. Adapt paths to the existing repository if it already has conventions.

A reasonable structure for a new Vite/React project:

```text
src/
  components/
    SiteHeader.tsx
    SiteFooter.tsx
    SectionLabel.tsx
    MarginMap.tsx
    ProjectRow.tsx
    ProjectDetail.tsx
  content/
    profile.ts
    projects.ts
  pages/
    HomePage.tsx
    ProjectPage.tsx
  styles/
    tokens.css
    global.css
    components.css
  App.tsx
  main.tsx
public/
  favicon.svg
  cv.pdf                  # only when supplied and approved
  og-image.png            # generate from verified content
  robots.txt
  sitemap.xml             # configure canonical domain once known
vercel.json               # if required for client-side routes
```

Rules:

- Use TypeScript types/interfaces for profile and project content.
- Centralise colour, type, spacing, content widths, border, and motion tokens in CSS custom properties.
- Prefer small composable components over one enormous JSX file.
- Avoid `any` unless justified. Keep console clean and avoid React key warnings.
- Use proper buttons for actions and anchors for navigation. Never use a clickable `div` for a control.
- Use a coherent icon set such as Lucide only where an icon improves recognition; use SVG line weight consistently. Do not sprinkle icons on every link.
- Keep content content-first and render sections based on real available entries. A missing award, publication, or project should not produce an empty box.
- Avoid overengineering CMS, auth, databases, API endpoints, or an admin dashboard. Content is currently maintained in code unless the client asks otherwise.
- Include comments for non-obvious logic, not every line.

## 9. Content model: make client edits easy

Define a typed content object. Exact naming can vary, but it should cover the following fields without forcing fake content:

```ts
export type LinkItem = {
  label: string;
  href: string;
  kind?: "email" | "external" | "download";
};

export type Project = {
  slug: string;
  title: string;
  year?: string;
  context?: string; // thesis, coursework, independent study, presentation, etc.
  summary: string;
  question?: string;
  contribution?: string;
  methods?: string[];
  findingsOrLearning?: string;
  limitations?: string;
  collaborators?: string[];
  supervisor?: string;
  references?: { label: string; href: string }[];
  artefact?: LinkItem;
  visibility: "public" | "omit";
};
```

Keep personal data in a profile object with fields for name, factual role/status, programme, institution, expected completion date if supplied, bio, research questions, skills backed by evidence, education, experience, links, CV path, and contact email. Use optional fields and render conditionally.

Never display literal placeholders such as `[YOUR NAME]`, `Lorem ipsum`, `Add publication here`, or `0+ projects` to visitors. During implementation, use a local clearly documented content checklist or a restrained hidden/dev-only validation to identify missing fields. When a missing value is essential to the public design, use neutral truthful copy or hide the component—not fake data.

## 10. Research and professional safeguards

Use the following as design/content guardrails; this is not legal advice and does not replace checking the client’s university or applicable Indian rules.

1. **Verify academic and professional titles.** Use the exact programme name and current status provided by the client. Do not call the person a Clinical Psychologist, therapist, counsellor, licensed practitioner, or specialist merely because they study psychology. Confirm qualifications and registration before any relevant title or service claim. For India, consult current RCI sources if clinical or rehabilitation psychology titles and regulated programmes are involved.
2. **No false public claims.** Every degree, credential, award, publication, affiliation, skill, and claim of impact must be verifiable. The site should be impressive through evidence and editorial execution, not inflated wording.
3. **Protect confidentiality.** Do not publish identifiable client / participant information, private interview details, raw data, psychological reports, case notes, or assessment outputs. Do not assume removing a name is sufficient. Obtain the necessary permission and check institutional obligations for anything derived from people.
4. **Protect research participants.** Do not imply ethics approval, consent, or institutional review occurred unless that fact is documented and may be disclosed. Respect withdrawal, privacy, and limitations around sharing study materials.
5. **Protect test security.** Do not publish proprietary psychometric test content, scoring instructions, answer keys, or other restricted assessment material.
6. **Be clear about role and supervision.** When work was undertaken in coursework, a group, a placement, or under supervision, state that context accurately. Do not imply independent clinical responsibility.
7. **Use sources responsibly.** Cite papers or resources represented in project write-ups; distinguish the student’s own interpretation from published findings. Do not make broad claims like “research proves” without an appropriate source.
8. **Avoid diagnosis as entertainment.** No pop-psychology quizzes, unsupported claims about personality, or content that trivialises mental illness.

Relevant references are listed at the end. APA is an international reference for ethical principles, not a substitute for Indian law or the client’s institutional policy. ICMR guidance applies within its scope; check whether it governs a given project.

## 11. Distinction criteria: what makes this portfolio stand out

The website earns distinction from depth, coherence, and craft—not from the number of sections.

- A memorable editorial hero, with an original vector identity that connects naturally to research thinking.
- Real scholarly work presented with context, methods, contribution, and limitations.
- At least one distinctive layout moment beyond a row of cards: for example, a research question set like a journal margin note, a project timeline intersecting a thin annotated path, or a large editorial project spread.
- Strong typography and disciplined grid usage.
- Clear reading rhythm: short lines, visual pauses, hierarchy, and meaningful variation.
- Small details that show care: custom underline, index numbering, page progress only if unobtrusive, precise anchor offsets, elegant focus states, well-set metadata, and carefully designed project artefact links.
- A real content point of view. No fabricated authority and no inflated personal brand.
- Responsive compositions that feel designed on mobile, not merely compressed.

Make the whole site feel like one publication with a clear editorial system. Do not design each section as a separate landing-page feature.

## 12. Quality assurance checklist

Before calling the project finished, verify each item and report the outcome:

### Content
- [ ] All personal, academic, and professional details are supplied, verified, or intentionally omitted.
- [ ] No fabricated projects, credentials, publications, testimonials, results, quotes, statistics, or claims.
- [ ] Programme and role terminology is accurate.
- [ ] No confidential participant, client, assessment, or restricted material is published.
- [ ] All visible links and downloadable artefacts work.

### Visual / responsive
- [ ] Distinctive Research Fieldnote direction is consistent from top to bottom.
- [ ] No gradients, stock psychology clichés, card-wall repetition, or generic AI copy.
- [ ] Mobile widths tested, including narrow screens.
- [ ] No horizontal scroll, clipped headlines, layout overlap, or broken text wrapping.
- [ ] Hover, focus, active, disabled, and reduced-motion states are considered where applicable.

### Accessibility
- [ ] Keyboard-only navigation works.
- [ ] Focus is visible and not hidden behind sticky elements.
- [ ] Headings, landmarks, link text, image alt text, and skip link are correct.
- [ ] Contrast checked against WCAG 2.2 AA targets.
- [ ] 200% zoom and reduced-motion preference checked.

### Technical
- [ ] Production build passes.
- [ ] No TypeScript, console, missing-key, broken asset, or unresolved import errors.
- [ ] No missing favicon, obviously broken metadata, or unconfigured fake canonical URL.
- [ ] Deep-link refresh works if client-side routes are used.
- [ ] Images and fonts are optimised; layout shifts are minimised.
- [ ] Vercel deployment settings and build output are correct.

### Final handoff
Return:
1. A concise summary of the design and structure delivered.
2. The main files created or changed.
3. The exact content fields the client still needs to provide.
4. Build/test results and anything not verified.
5. The exact Vercel deployment steps, only if deployment has not already been completed.

Do not stop at “the website is ready.” Confirm that the build works and identify remaining real-content dependencies.

---

## 13. Research references

Use these sources to inform the implementation. They are starting points, not an excuse to paste generic guidance onto the site.

- **Rehabilitation Council of India (official):** regulated programme information for clinical and rehabilitation psychology. Check current programme names and requirements if relevant to the client’s exact qualification.  
  https://rehabcouncil.nic.in/regular-mode/  
  Registration search: https://rciregistration.nic.in/rehabcouncil/newsearchpage.jsp
- **American Psychological Association — Ethical Principles of Psychologists and Code of Conduct:** useful reference for public statements, confidentiality, privacy, informed consent, research conduct, and assessment materials. It is not Indian law.  
  https://www.apa.org/ethics/code
- **Indian Council of Medical Research (official) — guidelines index:** consult the relevant current guidance when the project is within ICMR’s remit.  
  https://www.icmr.gov.in/guidelines
- **W3C — Web Content Accessibility Guidelines (WCAG) 2.2:** normative accessibility reference.  
  https://www.w3.org/TR/WCAG22/  
  Understanding documents: https://www.w3.org/WAI/WCAG22/Understanding/
- **web.dev — Core Web Vitals:** current performance metrics and target thresholds.  
  https://web.dev/articles/vitals  
  https://web.dev/articles/defining-core-web-vitals-thresholds
- **Vercel — Vite deployment documentation:** framework/deployment reference for a Vite implementation.  
  https://vercel.com/docs/frameworks/frontend/vite

---

## Final instruction

Build with restraint and conviction. Every element must have a job. Every claim must have evidence. Every animation must respect the reader. Every screen size must feel intentional. The goal is not to make a psychology student look like an established clinician; the goal is to make their real intellectual work, potential, and care with evidence impossible to overlook.
