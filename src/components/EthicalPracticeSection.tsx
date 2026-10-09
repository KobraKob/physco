import React from 'react';
import type { Profile } from '../types/profile';
import { SectionLabel } from './SectionLabel';

export interface EthicalPracticeSectionProps {
  profile: Profile;
}

export const EthicalPracticeSection: React.FC<EthicalPracticeSectionProps> = ({ profile }) => {
  // Requirement 13.1 & 13.3: Omit section if ethicalPractice is absent, empty, or whitespace
  if (!profile.ethicalPractice || profile.ethicalPractice.trim() === '') {
    return null;
  }

  return (
    <section id="ethics" className="section-wrapper" aria-labelledby="ethics-heading">
      <div className="site-container">
        <SectionLabel
          index="07"
          label="Research Responsibility"
          title="Ethical Principles &amp; Participant Protection"
        />

        <div className="ethics-card">
          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--color-citron)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              [ETHICAL SAFEGUARD &amp; INTEGRITY]
            </span>
          </div>
          <p className="ethics-text">{profile.ethicalPractice}</p>
        </div>
      </div>
    </section>
  );
};
