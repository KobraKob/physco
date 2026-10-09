import React from 'react';
import type { Profile } from '../types/profile';
import { SectionLabel } from './SectionLabel';

export interface ResearchSectionProps {
  profile: Profile;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({ profile }) => {
  // Requirement 8.3: Omit section if researchQuestions is absent or empty
  if (!profile.researchQuestions || profile.researchQuestions.length === 0) {
    return null;
  }

  return (
    <section id="research" className="section-wrapper" aria-labelledby="research-heading">
      <div className="site-container">
        <SectionLabel
          index="02"
          label="Areas of Inquiry"
          title="Research Questions & Focal Interests"
        />

        {/* Vertically stacked indexed rows layout (Requirement 8.2) */}
        <div className="research-questions-list" role="list">
          {profile.researchQuestions.map((rq, idx) => {
            const indexStr = String(idx + 1).padStart(2, '0');
            return (
              <div key={idx} className="research-question-row" role="listitem">
                <div className="rq-index" aria-label={`Question ${indexStr}`}>
                  [{indexStr}]
                </div>
                <div className="rq-content">
                  <h3 className="rq-topic">{rq.topic}</h3>
                  {rq.description && rq.description.trim() !== '' && (
                    <p className="rq-description">{rq.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
