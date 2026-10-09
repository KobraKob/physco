import React from 'react';
import type { Profile } from '../types/profile';
import { SectionLabel } from './SectionLabel';

export interface WritingPresentationsSectionProps {
  profile: Profile;
}

export const WritingPresentationsSection: React.FC<WritingPresentationsSectionProps> = ({
  profile,
}) => {
  // Requirement 12.1 & 12.3: filter entries with both non-empty title and non-empty date
  const validPublications = (profile.publications || []).filter(
    (pub) => pub.title && pub.title.trim() !== '' && pub.date && pub.date.trim() !== ''
  );

  if (validPublications.length === 0) {
    return null;
  }

  return (
    <section id="publications" className="section-wrapper" aria-labelledby="writing-heading">
      <div className="site-container">
        <SectionLabel
          index="06"
          label="Scholarly Output"
          title="Writing &amp; Conference Presentations"
        />

        <div className="pub-list" role="list">
          {validPublications.map((item, idx) => {
            // Requirement 12.4 & 12.5: link must start with https://
            const linkHref = item.url || item.doi;
            const isSecureLink = linkHref && linkHref.startsWith('https://');

            return (
              <div key={idx} className="pub-item" role="listitem">
                <h3 className="pub-title">{item.title}</h3>

                <div className="pub-meta">
                  {item.authors && <span>{item.authors} </span>}
                  {item.date && <span>({item.date}). </span>}
                  {item.venue && <em>{item.venue}. </em>}
                </div>

                {isSecureLink && (
                  <div style={{ marginTop: '4px' }}>
                    <a
                      href={linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="artefact-link"
                      aria-label={`Access publication record for ${item.title}`}
                    >
                      <span>Access proceedings / record</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
