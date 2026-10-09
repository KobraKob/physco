import React from 'react';
import type { Profile } from '../types/profile';
import { MarginMap } from './MarginMap';

export interface HeroSectionProps {
  profile: Profile;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  // Eyebrow string construction from factual profile fields
  const eyebrowText = [profile.programme, profile.institution].filter(Boolean).join(' · ');

  // Extract research questions sentences if available
  const researchQuestionsSummary =
    profile.researchQuestions && profile.researchQuestions.length > 0
      ? profile.researchQuestions
          .slice(0, 2)
          .map((rq) => rq.description)
          .filter(Boolean)
          .join(' ')
      : null;

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
    <section className="hero-section" aria-label="Introduction">
      <div className="site-container">
        <div className="hero-grid">
          {/* Left Text Column (Asymmetric split: narrower than MarginMap) */}
          <div className="hero-text-col">
            {eyebrowText && (
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-badge" aria-hidden="true" />
                <span>{eyebrowText}</span>
              </div>
            )}

            {profile.headline && <h1 className="hero-headline">{profile.headline}</h1>}

            {researchQuestionsSummary && (
              <p className="hero-description">{researchQuestionsSummary}</p>
            )}

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
                  <span>Contact</span>
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Custom SVG Margin-Map Motif (Marked aria-hidden="true") */}
          <div className="hero-visual-col" aria-hidden="true">
            <MarginMap variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
};
