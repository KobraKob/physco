import React from 'react';
import type { Profile } from '../types/profile';
import { AttentionField } from './AttentionField';

export interface HeroSectionProps {
  profile: Profile;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  // Eyebrow string construction from factual profile fields
  const programmeText = profile.programme || 'MSc in Psychological Science';
  const institutionText = profile.institution || 'University of Delhi';

  // Extract research questions sentences if available
  const researchQuestionsSummary =
    profile.researchQuestions && profile.researchQuestions.length > 0
      ? profile.researchQuestions
          .slice(0, 2)
          .map((rq) => rq.description)
          .filter(Boolean)
          .join(' ')
      : 'Currently investigating cognitive heuristics, framing effects, and social attribution biases under uncertainty.';

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerHeight = 72;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="hero-section hero-poster-layout" aria-label="Introduction">
      <div className="site-container">
        {/* Top Editorial Metadata Bar (Inspiration from reference image) */}
        <div className="hero-editorial-topbar" aria-hidden="true">
          <span className="hero-topbar-meta">[{programmeText}]</span>
          <span className="hero-topbar-meta">[{institutionText}]</span>
          <span className="hero-topbar-meta">[FIELDNOTE REF. 2026/27]</span>
        </div>

        <div className="hero-grid">
          {/* Left Text Column: Massive Headline & Editorial Inquiry */}
          <div className="hero-text-col">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-badge" aria-hidden="true" />
              <span>{profile.role || 'MSc Psychology Candidate'}</span>
            </div>

            {/* Motion 1: Hero Headline with Staggered Lines */}
            <h1 className="hero-headline hero-staggered-headline">
              <span className="hero-headline-line">Questions first.</span>
              <span className="hero-headline-line">Evidence next.</span>
              <span className="hero-headline-line">
                Conclusions held <span className="citron-highlight">with discipline.</span>
              </span>
            </h1>

            <div className="hero-prose-block">
              <p className="hero-description">{researchQuestionsSummary}</p>
              <p className="hero-secondary-note">
                Through empirical calibration and behavioral observation, cognitive heuristics become
                a threshold: between intuitive certainty and normative probabilistic reasoning.
              </p>
            </div>

            <div className="hero-actions">
              <a
                href="#selected-work"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('selected-work');
                }}
              >
                <span>Explore selected work</span>
                <span aria-hidden="true">↓</span>
              </a>

              {profile.cvPath && profile.cvPath.trim() !== '' ? (
                <a
                  href={profile.cvPath}
                  className="btn-secondary"
                  download
                  aria-label="Download Curriculum Vitae (PDF)"
                >
                  <span>Download CV</span>
                  <span aria-hidden="true">↓</span>
                </a>
              ) : (
                <a
                  href="#contact"
                  className="btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo('contact');
                  }}
                >
                  <span>Contact Candidate</span>
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Visual Column: Portrait Framing + Attention Field */}
          <div className="hero-visual-col">
            {/* Editorial Portrait Frame (Audit 2.B & Reference Image Inspiration) */}
            {profile.portraitPath && profile.portraitPath.trim() !== '' ? (
              <div className="hero-portrait-frame">
                <div className="portrait-offset-backdrop" aria-hidden="true" />
                <div className="portrait-image-wrapper">
                  <img
                    src={profile.portraitPath}
                    alt={`Academic portrait of ${profile.name}`}
                    width="540"
                    height="680"
                    className="hero-portrait-img"
                  />
                  <div className="portrait-caption-label">
                    <span>[RESEARCH CANDIDATE // {profile.name}]</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Tasteful Non-Photographic Editorial Plate (when photo is not provided) */
              <div className="hero-portrait-frame fallback-monograph-plate">
                <div className="portrait-offset-backdrop" aria-hidden="true" />
                <div className="portrait-image-wrapper monograph-content-wrap">
                  <div className="monograph-header-meta">
                    <span className="marginal-note">[RESEARCH MONOGRAM // AS]</span>
                    <span className="monograph-seal">MSc</span>
                  </div>
                  <div className="monograph-body-quote">
                    <span className="quote-mark" aria-hidden="true">“</span>
                    <p>
                      How context and cognitive framing shape judgment under uncertainty.
                    </p>
                  </div>
                  <div className="monograph-footer-meta">
                    <span>DEPARTMENT OF PSYCHOLOGY</span>
                    <span>UNIVERSITY OF DELHI</span>
                  </div>
                </div>
              </div>
            )}

            {/* Signature Interaction A & D: Attention Field with Shift Focus */}
            <div className="hero-attention-field-wrap">
              <AttentionField />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
