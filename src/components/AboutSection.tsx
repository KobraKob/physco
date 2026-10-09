import React from 'react';
import type { Profile } from '../types/profile';
import { SectionLabel } from './SectionLabel';

export interface AboutSectionProps {
  profile: Profile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  // Requirement 7.3: Omit section if profile.bio is absent or empty
  if (!profile.bio || profile.bio.trim() === '') {
    return null;
  }

  // Requirement 7.2: Up to 4 working principles
  const principles =
    profile.workingPrinciples && profile.workingPrinciples.length > 0
      ? profile.workingPrinciples.slice(0, 4)
      : [];

  return (
    <section id="about" className="section-wrapper" aria-labelledby="about-heading">
      <div className="site-container">
        <SectionLabel index="01" label="Point of View" title="About & Academic Stance" />

        <div className="about-grid">
          {/* Narrative Biography Column */}
          <div className="about-bio-column">
            <p className="about-bio">{profile.bio}</p>

            {/* Requirement 7.4 & 7.5: Portrait only rendered if defined and non-empty */}
            {profile.portraitPath && profile.portraitPath.trim() !== '' && (
              <div style={{ marginTop: '32px' }}>
                <img
                  src={profile.portraitPath}
                  alt={`Academic portrait of ${profile.name}`}
                  width="480"
                  height="600"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    aspectRatio: '4 / 5',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-subtle)',
                    border: 'var(--border-rule)',
                  }}
                />
              </div>
            )}
          </div>

          {/* Working Principles Column / Strip */}
          {principles.length > 0 && (
            <div className="working-principles-box">
              <span className="principles-heading">Working Principles</span>
              <ul className="principles-list" aria-label="Core Academic Principles">
                {principles.map((principle, index) => (
                  <li key={index} className="principle-item">
                    <span className="principle-bullet" aria-hidden="true">
                      ■
                    </span>
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
