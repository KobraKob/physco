import React from 'react';
import type { Profile } from '../types/profile';
import { SectionLabel } from './SectionLabel';

export interface ContactSectionProps {
  profile: Profile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  // Requirement 14.2: Only external links starting with https://
  const validLinks = (profile.links || []).filter(
    (link) => link.href && link.href.startsWith('https://')
  );

  return (
    <section id="contact" className="section-wrapper" aria-labelledby="contact-heading">
      <div className="site-container">
        <SectionLabel
          index="08"
          label="Dialogue &amp; Collaboration"
          title="Contact &amp; Scholarly Inquiries"
        />

        <div className="contact-section-inner">
          <div className="contact-narrative">
            <p className="contact-text">
              I welcome correspondence regarding graduate research collaborations, cognitive and
              behavioural project opportunities, methodology discussions, or academic inquiries.
            </p>
            <p style={{ marginTop: '16px', fontSize: '0.95rem', color: 'var(--color-secondary)' }}>
              Responses are typically sent within two to three working days. For formal academic
              verification, please reach out via institutional email.
            </p>
          </div>

          <div className="contact-links-box">
            <div>
              <span className="marginal-note" style={{ display: 'block', marginBottom: '8px' }}>
                DIRECT INQUIRY
              </span>
              {/* Requirement 14.1 & 16.10: mailto: link with descriptive text (not bare email) */}
              <a
                href={`mailto:${profile.contactEmail}`}
                className="email-contact-link"
                aria-label={`Send academic email to ${profile.name}`}
              >
                <span>Initiate correspondence via email</span>
                <span aria-hidden="true">✉</span>
              </a>
            </div>

            {validLinks.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <span className="marginal-note" style={{ display: 'block', marginBottom: '8px' }}>
                  SCHOLARLY &amp; PROFESSIONAL PROFILES
                </span>
                <ul className="external-links-list">
                  {validLinks.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="artefact-link"
                      >
                        <span>{link.label}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
