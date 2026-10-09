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
          <p className="ethics-text">{profile.ethicalPractice}</p>
        </div>
      </div>
    </section>
  );
};
