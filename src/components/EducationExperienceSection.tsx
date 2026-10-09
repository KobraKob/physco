import React from 'react';
import type { Profile } from '../types/profile';
import { SectionLabel } from './SectionLabel';

export interface EducationExperienceSectionProps {
  profile: Profile;
}

export const EducationExperienceSection: React.FC<EducationExperienceSectionProps> = ({
  profile,
}) => {
  // Requirement 11.5: Omit section if education is absent or empty
  if (!profile.education || profile.education.length === 0) {
    return null;
  }

  // Reverse chronological order for education
  const sortedEducation = [...profile.education].sort((a, b) => {
    return parseInt(b.startDate, 10) - parseInt(a.startDate, 10);
  });

  const hasExperience = profile.experience && profile.experience.length > 0;

  return (
    <section id="experience" className="section-wrapper" aria-labelledby="experience-heading">
      <div className="site-container">
        <SectionLabel
          index="05"
          label="Academic Trajectory"
          title="Education &amp; Scholarly Experience"
        />

        <div className="timeline-section-grid">
          {/* Education Column */}
          <div className="timeline-column">
            <h3 className="timeline-col-header">Formal Education</h3>
            <div className="timeline-items-list">
              {sortedEducation.map((edu, idx) => {
                const isCompleted = edu.status === 'completed';
                const dateDisplay =
                  edu.status === 'in progress'
                    ? `${edu.startDate} – ${edu.expectedEndDate || 'Present'}`
                    : `${edu.startDate} – ${edu.endDate || 'Completed'}`;

                return (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-date-status">
                      <span>{dateDisplay}</span>
                      <span
                        className={`status-badge ${
                          isCompleted ? 'status-completed' : 'status-in-progress'
                        }`}
                      >
                        {edu.status}
                      </span>
                    </div>

                    <h4 className="timeline-item-title">{edu.degree}</h4>
                    <p className="timeline-item-sub">{edu.institution}</p>

                    {/* Requirement 11.2: labelled dissertation or thesis */}
                    {edu.thesis && (
                      <div className="timeline-thesis">
                        <strong>Thesis Topic:</strong> {edu.thesis}
                      </div>
                    )}
                    {edu.dissertation && (
                      <div className="timeline-thesis">
                        <strong>Dissertation:</strong> {edu.dissertation}
                      </div>
                    )}

                    {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                      <div style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--color-secondary)' }}>
                        <strong>Selected Coursework:</strong> {edu.relevantCoursework.join(', ')}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Experience Column (Requirement 11.4) */}
          {hasExperience && (
            <div className="timeline-column">
              <h3 className="timeline-col-header">Research &amp; Academic Appointments</h3>
              <div className="timeline-items-list">
                {profile.experience!.map((exp, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-date-status">
                      <span>{exp.period}</span>
                    </div>

                    <h4 className="timeline-item-title">{exp.role}</h4>
                    <p className="timeline-item-sub">{exp.organization}</p>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.5', marginTop: '6px' }}>
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
