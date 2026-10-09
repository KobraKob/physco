# Requirements Document

## Introduction

This document specifies requirements for a complete, production-ready academic portfolio website for a person pursuing an MSc in Psychology. The site must communicate intellectual curiosity, research literacy, ethical judgment, and a recognisable editorial point of view. It is hosted on Vercel, built with Vite + React + TypeScript, and designed around the "Research Fieldnote" visual identity. All content must be accurate, verified, and conditionally rendered — no fabricated credentials, no placeholder text visible to visitors.

---

## Glossary

- **System**: The portfolio web application as a whole.
- **Site**: The publicly deployed version of the System hosted on Vercel.
- **Profile**: The typed content object in `src/content/profile.ts` holding all personal, academic, and contact data.
- **Projects**: The typed content array in `src/content/projects.ts` holding research and academic work entries.
- **MarginMap**: The original SVG-based decorative motif — thin vector lines connecting labelled nodes — representing a research-notation visual identity.
- **Renderer**: The React rendering layer responsible for converting Profile and Projects data into visible HTML.
- **VisibleContent**: Any content that is rendered into the HTML output accessible to site visitors.
- **ContentGuard**: The conditional rendering logic that hides any section or component when its data fields are absent, empty, or marked `"omit"`.
- **Build**: The Vite production build process invoked via `npm run build`.
- **TokenSystem**: The CSS custom properties defined in `src/styles/tokens.css` that centralise colour, typography, spacing, border, and motion values.
- **SkipLink**: An anchor element placed before all navigation that allows keyboard users to jump directly to the main content area.
- **FocusIndicator**: A visible outline or ring rendered on any interactive element when it receives keyboard focus.
- **ReducedMotionState**: The application state active when the user's OS preference `prefers-reduced-motion: reduce` is detected.

---

## Requirements

### Requirement 1: Project scaffolding and technology stack

**User Story:** As a developer deploying the site, I want the project to use Vite + React + TypeScript so that I can maintain a fast, type-safe, mostly static site that deploys cleanly on Vercel.

#### Acceptance Criteria

1. THE System SHALL be scaffolded with Vite, React, and TypeScript as the sole framework stack when the repository contains no existing project files.
2. THE Build SHALL produce a static output directory containing at minimum one `index.html` file and all referenced assets, suitable for Vercel deployment without requiring a back-end server.
3. THE System SHALL include a `vercel.json` file that configures a catch-all rewrite rule mapping all non-asset URL paths to `/index.html` so that direct URL visits and page refreshes on any client-side route resolve to the application entry point.
4. THE Build SHALL complete without TypeScript compilation errors, unresolved imports, missing static assets, or any `console.error` or `console.warn` output in the production bundle.
5. THE System SHALL not include private API keys, secrets, or credentials in any client-side source file or build artefact, and shall not expose any such values via the compiled JavaScript output.

---

### Requirement 2: Centralised content model

**User Story:** As the portfolio owner, I want all personal details and project entries stored in one place so that I can update the site without touching component code.

#### Acceptance Criteria

1. THE System SHALL define all personal, academic, and contact data in a single typed object exported from `src/content/profile.ts`.
2. THE System SHALL define all research and project entries in a typed array exported from `src/content/projects.ts`.
3. THE System SHALL use TypeScript interfaces that include at minimum: `name`, `role`, `programme`, `institution`, `bio`, `researchQuestions`, `skills`, `education`, `experience`, `links`, `cvPath`, and `contactEmail` on the profile object; and `slug`, `title`, `year`, `context`, `summary`, `question`, `contribution`, `methods`, `findingsOrLearning`, `limitations`, `collaborators`, `supervisor`, `references`, `artefact`, and `visibility` on each project object.
4. THE Renderer SHALL read all VisibleContent exclusively from Profile and Projects; component files SHALL NOT contain hardcoded personal names, institutions, credentials, or project details.
5. WHEN a profile field is absent or undefined, THE ContentGuard SHALL omit the corresponding UI element rather than rendering an empty string, null node, placeholder text, or default fallback value.
6. WHEN a project entry has `visibility` set to `"omit"`, THE ContentGuard SHALL exclude that entry from all rendered output, including lists, navigation anchors, and route definitions.
7. THE Build SHALL fail with a TypeScript type error when any value assigned to a profile or project field does not match the declared interface type.
8. WHEN `profile.cvPath` is absent or an empty string, THE ContentGuard SHALL omit all CV download links and buttons site-wide.

---

### Requirement 3: Token system and design foundations

**User Story:** As a developer maintaining the site, I want all design tokens defined in one CSS file so that visual consistency is enforced across every component.

#### Acceptance Criteria

1. THE TokenSystem SHALL define CSS custom properties scoped to `:root` for all colour values: `--color-paper: #F4F1E9`, `--color-ink: #1D211F`, `--color-secondary: #5C625D`, `--color-cobalt: #3159C9`, `--color-vermilion: #D9503D`, `--color-rule: #D8D4CA`, `--color-white: #FFFFFF`.
2. THE TokenSystem SHALL define CSS custom properties scoped to `:root` for the typographic scale using `clamp()` functions: hero display at `clamp(2.8rem, 7.4vw, 7.5rem)`, section titles at `clamp(2rem, 4vw, 4.5rem)`, project titles at `clamp(1.5rem, 2.5vw, 2.4rem)`, body at `clamp(1rem, 1.05vw, 1.1rem)`.
3. THE TokenSystem SHALL define CSS custom properties scoped to `:root` for a spacing scale at the values `4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 88px, 112px, 144px`.
4. THE TokenSystem SHALL define a `--font-display` custom property referencing `"Newsreader", Georgia, "Times New Roman", serif` and a `--font-body` custom property referencing `"DM Sans", Helvetica, Arial, sans-serif`.
5. THE TokenSystem SHALL define a `--motion-duration-short` value of `150ms` and a `--motion-duration-default` value of `300ms` for use in transitions.
6. THE TokenSystem SHALL load exactly Newsreader weights 400 and 700 (normal style) and DM Sans weights 400 and 500 (normal style), with `font-display: swap` applied to all `@font-face` or Google Fonts declarations.

---

### Requirement 4: Layout grid and responsive structure

**User Story:** As a visitor on any device, I want the site to present a well-composed, readable layout so that content is accessible and visually coherent at all screen widths.

#### Acceptance Criteria

1. THE System SHALL constrain main content to a maximum width of `1440px` and apply horizontal margins using `clamp(24px, 5vw, 80px)` on desktop and `20px–24px` on mobile.
2. THE System SHALL implement a 12-column CSS Grid on desktop viewports (≥1024px), an 8-column grid on tablet viewports (768px–1023px), and a 4-column or single-column flow on mobile viewports (below 768px).
3. THE System SHALL produce no horizontal overflow at viewport widths of 320px, 375px, 430px, 768px, 1024px, 1280px, and 1440px; this is verified by confirming `document.documentElement.scrollWidth` equals `window.innerWidth` at each breakpoint.
4. WHEN the viewport width is below 768px, THE Renderer SHALL reflow all multi-column desktop compositions such that no element's bounding box overlaps another element's bounding box and no element is clipped by its parent's overflow boundary.
5. THE System SHALL apply `max-width: 100%` and explicit `aspect-ratio` (via CSS) and `width`/`height` HTML attributes to all images and embeds; the computed dimensions of any image SHALL NOT change after the initial paint.
6. THE System SHALL use `CSS Grid` and `Flexbox` for all structural layout; absolute positioning SHALL be used only for decorative SVG elements that carry `aria-hidden="true"` and no interactive role, and whose containing block is wrapped with `overflow: hidden` or `overflow: clip`.

---

### Requirement 5: Site header and navigation

**User Story:** As a visitor, I want a compact, accessible navigation bar so that I can move between sections of the site from any scroll position.

#### Acceptance Criteria

1. THE System SHALL render a site header containing the portfolio owner's name as a wordmark and navigation links to the sections: About, Research, Selected Work, Experience, and Contact.
2. WHILE the user scrolls the page, THE System SHALL keep the site header fixed to the top of the viewport such that the top edge of any anchor target element is positioned at or below the bottom edge of the header after scroll completion, and keyboard focus order does not include any element hidden behind the header.
3. WHEN the viewport width is below 768px, THE System SHALL render a mobile navigation control with a touch target of at least 44×44 CSS px that expands a navigation menu.
4. WHEN the mobile navigation menu is open and the user activates a navigation link, THE System SHALL close the menu and return keyboard focus to the activating control.
5. WHEN the mobile navigation menu is open and keyboard focus moves outside the navigation menu, THE System SHALL close the mobile navigation menu.
6. THE System SHALL indicate the currently active navigation section using a visible state that combines a non-colour visual change (such as underline, weight change, or border indicator) with any colour change, so that the active state is distinguishable without relying on colour alone.
7. WHEN a navigation link pointing to a section is activated, THE System SHALL scroll the viewport so that the top edge of the target section element is positioned at or below the bottom edge of the sticky header with zero overlap.
8. IF `profile.cvPath` is defined and resolves to a downloadable file, THEN THE System SHALL render a CV download link in the site header.

---

### Requirement 6: Hero section

**User Story:** As a visitor arriving at the site, I want an editorially distinctive hero section so that I immediately understand who this person is and what questions they pursue.

#### Acceptance Criteria

1. THE System SHALL render the hero section as a two-column layout in which the text column occupies the left side and the MarginMap SVG occupies the right side, with the text column being narrower than the MarginMap column to produce an asymmetric split.
2. THE System SHALL render within the hero text column: an eyebrow line stating the current degree and institution (from Profile), one headline summarising the person's approach to psychology, two sentences about current research questions (from Profile), a primary call-to-action button linking to the Selected Work section, and a secondary call-to-action button linking to the Contact section or CV download; the primary button SHALL be visually distinct from the secondary button through a difference in fill or border treatment independent of colour alone.
3. THE MarginMap SHALL be rendered as an inline SVG composed of thin vector lines, small open circles, bracket annotations, and labelled nodes using `var(--color-cobalt)` and `var(--color-vermilion)` as accent colours on a `var(--color-paper)` background.
4. THE MarginMap SVG SHALL be marked `aria-hidden="true"` and SHALL NOT appear in the accessibility tree.
5. WHEN the viewport width is below 768px, THE System SHALL reflow the hero to a single column with the text column rendered above the MarginMap, and the MarginMap SHALL be scaled so that no part of its bounding box overlaps any text content.
6. IF `profile.cvPath` is absent, THEN THE System SHALL not render the hero CV button and SHALL render the Contact button as the sole secondary call-to-action.
7. WHEN profile fields required by the hero are absent, THE ContentGuard SHALL hide the corresponding hero sub-element rather than rendering an empty or placeholder string.

---

### Requirement 7: About / point of view section

**User Story:** As a reviewer, I want a concise, well-edited narrative about the portfolio owner so that I understand their background, path into psychology, and intellectual approach.

#### Acceptance Criteria

1. THE System SHALL render an About section containing a narrative biography drawn from `profile.bio`.
2. WHERE `profile.workingPrinciples` is defined and contains between one and four entries, THE System SHALL render those entries as a horizontal inline strip of short principle statements beneath the biography; WHERE `profile.workingPrinciples` contains more than four entries, THE System SHALL render only the first four and discard the remainder.
3. THE System SHALL NOT render the About section when `profile.bio` is absent or empty.
4. THE System SHALL NOT render a portrait image element when `profile.portraitPath` is absent or empty.
5. WHEN `profile.portraitPath` is defined and non-empty, THE System SHALL render the portrait using that path as the image source.

---

### Requirement 8: Research interests section

**User Story:** As a faculty reviewer, I want to see the genuine research topics the student wants to investigate so that I can assess their intellectual focus and potential fit.

#### Acceptance Criteria

1. THE System SHALL render a Research Interests section displaying each entry from `profile.researchQuestions` as a typographically distinct row that includes a visible numeric index and a description of one or two sentences.
2. THE System SHALL use a vertically stacked, indexed row layout for research interest items rather than a uniform card grid in which all items share identical dimensions and spacing.
3. THE System SHALL NOT render the Research Interests section when `profile.researchQuestions` is absent or empty.
4. WHEN a research interest entry lacks a description field, THE ContentGuard SHALL omit the description sub-element for that entry rather than rendering an empty line.
5. THE System SHALL render research interest text as supplied from the data source without appending qualifications, certifications, or professional designations that are not present in the source data.

---

### Requirement 9: Selected work / research archive section

**User Story:** As an academic supervisor or employer, I want to see actual academic work with context and methodology so that I can evaluate the student's research capability.

#### Acceptance Criteria

1. THE System SHALL render a Selected Work section displaying all Projects entries where `visibility` equals `"public"`.
2. FOR EACH visible project, THE System SHALL render at minimum the `title` field; all other fields (`year`, `context`, `summary`, `question`, `contribution`, `methods`, `findingsOrLearning`, `limitations`) SHALL be rendered only when present and non-empty in the project entry.
3. THE System SHALL render a project detail view structured in the sequence: Question → Context → Method → Contribution → Findings / Learning → Limitations → References / Artefact, rendering only the sections whose corresponding data fields are present and non-empty.
4. WHEN a project entry includes an `artefact` field whose `href` is a non-empty string beginning with `http://`, `https://`, or `/`, THE System SHALL render a link to that artefact using the `artefact.label` as the visible link text.
5. THE System SHALL NOT render a project's `findingsOrLearning` field when that field is absent or undefined.
6. THE System SHALL render only field values that originate directly from the `src/content/projects.ts` data file; no project field value SHALL be generated, interpolated, or defaulted by component code.
7. THE System SHALL NOT render the Selected Work section when no Projects entries have `visibility` set to `"public"`.
8. THE System SHALL NOT render placeholder cards, empty grid cells, or filler layout elements when the count of visible projects is fewer than a layout-defined minimum.
9. WHEN a project entry's `collaborators` array is non-empty or `supervisor` is defined, THE System SHALL render those values under a clearly labelled "Collaborators" or "Supervisor" sub-heading within the project entry.

---

### Requirement 10: Methods and skills section

**User Story:** As a potential research collaborator, I want to see verified research methods and tools the student has used so that I can assess practical capability without inflated claims.

#### Acceptance Criteria

1. THE System SHALL render a Methods and Skills section grouping capabilities under categories drawn from `profile.skills`, using category names supplied in the data.
2. FOR EACH skill entry where the `experienceLevel` field is present and non-empty, THE System SHALL render the experience level as one of the exact strings: `"coursework exposure"`, `"used in a supervised project"`, or `"independent project experience"`; WHEN `experienceLevel` is absent, THE ContentGuard SHALL omit the level sub-element for that skill entry.
3. THE System SHALL NOT render percentage bars, star ratings, arbitrary numeric scores, or progress indicators to represent skill proficiency.
4. THE System SHALL NOT render the Methods and Skills section when `profile.skills` is absent or empty.
5. WHERE a skill entry contains a non-empty `example` string field, THE System SHALL render that string as a supplementary example reference alongside the skill name.

---

### Requirement 11: Education and experience section

**User Story:** As a reviewer, I want a clear chronological record of the student's education and relevant experience so that I can understand their academic trajectory.

#### Acceptance Criteria

1. THE System SHALL render an Education and Experience section displaying entries from `profile.education` in reverse chronological order (most recent first), each showing degree title, institution, start date, end date or expected end date, and status; valid status values are `"in progress"`, `"completed"`, and `"deferred"`.
2. WHEN a `profile.education` entry includes a non-empty `dissertation` or `thesis` field, THE System SHALL render that field as a labelled sub-element beneath the degree entry.
3. IF a `profile.education` entry has `status` set to `"in progress"` and `completionDate` is a future date or absent, THEN THE System SHALL NOT render that entry's status as `"completed"`.
4. THE System SHALL render experience entries from `profile.experience` only when those entries are present and non-empty in the data source.
5. THE System SHALL NOT render the Education section when `profile.education` is absent or empty.

---

### Requirement 12: Writing, publication, and presentation section

**User Story:** As a reviewer, I want to see real publications, posters, talks, or writing samples so that I can assess the student's scholarly communication.

#### Acceptance Criteria

1. THE System SHALL render a Writing and Presentations section displaying entries from `profile.publications` where both the `title` field and the `date` field are non-empty strings.
2. FOR EACH publication or presentation entry, THE System SHALL render the following fields when present and non-empty: title, authors, venue or course, date, and a DOI or stable URL.
3. THE System SHALL NOT render the Writing and Presentations section when `profile.publications` is absent, empty, or contains no entries with both a non-empty `title` and a non-empty `date`.
4. WHEN a publication entry includes a `doi` or `url` field that is a non-empty string beginning with `https://`, THE System SHALL render that value as an accessible anchor element whose visible text is descriptive of the destination and is not a bare URL string.
5. WHEN a publication entry includes a `doi` or `url` field that does not begin with `https://`, THE System SHALL omit the link element for that entry rather than rendering a broken or non-HTTPS link.

---

### Requirement 13: Ethical practice section

**User Story:** As an academic or employer, I want to understand the student's approach to research ethics and professional responsibility so that I can assess their judgment.

#### Acceptance Criteria

1. WHERE `profile.ethicalPractice` is defined and is a non-empty, non-whitespace string, THE System SHALL render an Ethical Practice section displaying that content as a narrative statement.
2. THE System SHALL NOT use titles, headings, or framing copy within the Ethical Practice section that claim professional mastery, clinical qualification, or authorisation to practise independently.
3. THE System SHALL NOT render the Ethical Practice section when `profile.ethicalPractice` is absent, empty, or contains only whitespace characters.
4. THE System SHALL NOT render in any section any data that could alone or in combination identify a specific research participant or client, including but not limited to: full name, date of birth, institutional ID, session notes, assessment scores, or verbatim interview transcripts.

---

### Requirement 14: Contact section and footer

**User Story:** As a visitor who wants to reach out, I want a clear and quiet contact section so that I can find the owner's email, CV, and professional links without a sales pitch.

#### Acceptance Criteria

1. THE System SHALL render a Contact section containing an anchor element whose `href` is `mailto:` followed by the value of `profile.contactEmail`, with visible link text that is descriptive and not a bare email address.
2. THE System SHALL render external profile links from `profile.links` only for entries where the `href` field is a non-empty string beginning with `https://`.
3. THE System SHALL NOT render a contact form element unless the form `action` or submission handler is connected to a real, operational form-handling endpoint.
4. IF a form submission handler is absent or non-operational, THEN THE System SHALL NOT render the form element.
5. THE System SHALL render a `<footer>` element containing the owner's name, the current calendar year as a four-digit string, and navigation links drawn from the same link set used in the site header.

---

### Requirement 15: MarginMap SVG motif system

**User Story:** As a visitor, I want to encounter a distinctive, coherent visual identity across the site so that the editorial character feels intentional and recognisable.

#### Acceptance Criteria

1. THE System SHALL render the MarginMap as an inline SVG element defined in React/JSX source code using SVG path, circle, line, and text elements; it SHALL NOT reference an external raster image file or a third-party icon library for the MarginMap graphic.
2. THE MarginMap SVG element SHALL use only `var(--color-cobalt)`, `var(--color-vermilion)`, `var(--color-ink)`, and `transparent` as fill and stroke values; it SHALL NOT apply CSS gradient functions, box-shadow, filter glow, backdrop-filter, or raster texture fills.
3. THE System SHALL render at least two distinct MarginMap SVG instances across the site (e.g., hero and a section transition or project cover); no two instances SHALL share identical SVG `d` attribute path data on their primary path elements AND identical `viewBox` values simultaneously.
4. THE MarginMap SHALL scale correctly across the responsive breakpoints defined in Requirement 4 without its bounding box overflowing its parent container or overlapping any text content node.
5. THE System SHALL NOT render brain illustrations, puzzle-piece imagery, glowing orbs, glassmorphism panels, or generic wellness iconography in the MarginMap or any other visual element.

---

### Requirement 16: Accessibility

**User Story:** As a keyboard or assistive-technology user, I want the site to meet WCAG 2.2 AA requirements so that I can navigate, read, and interact with all content without barriers.

#### Acceptance Criteria

1. THE System SHALL render a SkipLink as the first focusable element in the document, linking to the `main` content landmark.
2. THE System SHALL use semantic HTML landmarks: `<header>`, `<nav>`, `<main>`, meaningful `<section>` elements with accessible headings, and `<footer>`.
3. THE System SHALL maintain a single `<h1>` per page and a logical, non-skipping heading hierarchy throughout.
4. THE System SHALL ensure all interactive elements are operable by keyboard alone, with a FocusIndicator that has a minimum contrast ratio of 3:1 against adjacent colours and occupies a minimum area of 2 CSS px on all sides of the element; the FocusIndicator SHALL NOT be set to `outline: none` without an equivalent visible replacement meeting the same contrast and area criteria.
5. THE System SHALL provide meaningful, unique link text for every anchor; no link text SHALL be "click here," "read more," or a bare URL.
6. THE System SHALL provide `alt` text for every meaningful image that describes the image's content or function; `alt` text SHALL NOT be an empty string for meaningful images, SHALL NOT be a filename, and SHALL NOT duplicate the adjacent visible caption.
7. THE System SHALL meet a colour contrast ratio of at least 4.5:1 for text smaller than 18pt (or 14pt bold) and at least 3:1 for text at 18pt or larger (or 14pt bold or larger) and for non-text UI elements, verified against the TokenSystem colour pairs.
8. THE System SHALL NOT communicate link state, category membership, or interactive status through colour difference alone; an additional visible indicator (underline, shape, label, or icon) SHALL also be present.
9. THE System SHALL set `<html lang="en">` and a descriptive, unique `<title>` on every page.
10. WHEN `profile.contactEmail` is rendered as a link, THE System SHALL use a `mailto:` href and descriptive accessible link text rather than displaying a bare email address as non-interactive text.

---

### Requirement 17: Animation and motion

**User Story:** As a visitor who may have vestibular or motion-sensitivity conditions, I want animations to be purposeful and suppressible so that motion never prevents me from accessing content.

#### Acceptance Criteria

1. THE System SHALL restrict all CSS transitions and animations to opacity and transform property changes, using durations no shorter than `150ms` and no longer than `400ms`.
2. THE System SHALL NOT implement scroll hijacking, auto-playing audio, unskippable intro sequences, cursor followers, or loading screens that delay access to primary content.
3. WHILE `prefers-reduced-motion: reduce` is active, THE System SHALL set the duration of all CSS transitions and animations to `0.01ms` and disable all keyframe animations.
4. THE System SHALL ensure all primary content is visible and readable when CSS animations have not yet completed and when JavaScript is disabled or unavailable.
5. THE System SHALL NOT implement hover interactions as the sole means of revealing content that is required to understand or use a section of the page; all such content SHALL also be accessible via a non-hover mechanism (tap, focus, or persistent visibility).

---

### Requirement 18: Performance

**User Story:** As a visitor on a range of devices and connections, I want the site to load quickly and remain stable so that content is accessible without waiting or layout jumping.

#### Acceptance Criteria

1. THE System SHALL target Core Web Vitals thresholds of LCP ≤ 2.5s, INP ≤ 200ms, and CLS ≤ 0.1 as measured at the 75th percentile in field data or under simulation on a mid-range mobile device with a Fast 3G connection throttle.
2. THE System SHALL specify both `width` and `height` HTML attributes and a CSS `aspect-ratio` declaration on all `<img>` elements; the computed dimensions of any `<img>` SHALL NOT change between the initial layout paint and the fully loaded state.
3. THE System SHALL NOT apply `loading="lazy"` to the hero image or any image that is the LCP element; all above-the-fold images SHALL use `loading="eager"` or omit the `loading` attribute.
4. THE System SHALL deliver all raster images using a `<picture>` element containing an AVIF source, a WebP source, and a JPEG or PNG `<img>` fallback.
5. THE System SHALL NOT add animation libraries, charting libraries, or UI component kits whose minified and gzipped size exceeds 10 KB to produce visuals achievable with CSS or inline SVG.
6. THE System SHALL remove all `console.log` calls and unused package imports from the production build such that the built output contains no `console.log` invocations.

---

### Requirement 19: SEO and metadata

**User Story:** As a potential collaborator or employer searching online, I want the site to be discoverable and share-correctly so that it presents an accurate impression of the person.

#### Acceptance Criteria

1. THE System SHALL render a unique, accurate `<title>` and `<meta name="description">` on every page, with values drawn exclusively from the Profile data source and containing no placeholder strings.
2. THE System SHALL render Open Graph metadata tags (`og:title`, `og:description`, `og:image`, `og:url`) on every page, with all values drawn exclusively from the Profile data source and containing no placeholder strings.
3. THE System SHALL NOT hardcode a canonical URL or sitemap domain; the domain SHALL be stored as a single string constant in one configurable source file, initialised to the literal string `YOUR_DOMAIN_HERE` until replaced with the real domain.
4. THE System SHALL render `Person` JSON-LD structured data containing only the fields that have non-empty, truthful values in the Profile data source; it SHALL NOT include `jobTitle`, `memberOf`, `award`, or `hasCredential` schema properties unless those fields are explicitly confirmed in the Profile data.
5. THE System SHALL include a `robots.txt` and a `sitemap.xml` in the `public/` directory; the `sitemap.xml` SHALL reference the domain constant from criterion 3 rather than a hardcoded URL string.
6. THE System SHALL NOT render hidden text elements, meta keyword tags with repeated terms, or FAQ sections containing questions not relevant to the portfolio owner.

---

### Requirement 20: Professional and ethical content safeguards

**User Story:** As the portfolio owner, I want the site to protect my professional standing and comply with ethical obligations so that no content misrepresents my qualifications or harms others.

#### Acceptance Criteria

1. THE System SHALL NOT render any of the following titles or designations unless the client has supplied documented evidence of the corresponding verified qualification and registration: "Clinical Psychologist", "Counselling Psychologist", "Therapist", "Counsellor", "Licensed Practitioner", "Registered Psychologist", or any equivalent regulated title.
2. THE System SHALL NOT render any project, credential, award, publication, testimonial, research result, statistic, or impact claim that does not originate from a non-empty field in the Profile or Projects data source.
3. THE System SHALL NOT render any data that could alone or in combination identify a specific research participant or client, including but not limited to: full name, date of birth, institutional ID number, verbatim session notes, raw assessment scores, or verbatim interview transcripts.
4. WHEN a project entry's `collaborators` array is non-empty or `supervisor` field is defined, THE System SHALL render those attribution values such that the student's role is scoped to their stated `contribution` field and does not imply sole authorship or independent clinical responsibility.
5. THE System SHALL NOT render quiz components, personality-type assessments, or interactive diagnostic tools in any section of the site.
6. THE System SHALL NOT render a project or work entry using the label "peer-reviewed", "published", or "accepted for publication" unless the corresponding entry contains a non-empty `doi` or `url` field referencing the published record.
