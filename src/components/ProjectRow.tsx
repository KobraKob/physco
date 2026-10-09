import React from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../types/project';
import { EvidenceTrail, type EvidenceTrailStage } from './EvidenceTrail';

export interface ProjectRowProps {
  project: Project;
  showFullCaseStudy?: boolean;
  isFeatured?: boolean;
  surfaceVariant?: 'featured' | 'lavender' | 'seaglass';
}

export const ProjectRow: React.FC<ProjectRowProps> = ({
  project,
  showFullCaseStudy = true,
  isFeatured = false,
  surfaceVariant = 'lavender',
}) => {
  // Validate artefact link
  const isValidArtefact =
    project.artefact &&
    project.artefact.href &&
    (project.artefact.href.startsWith('http://') ||
      project.artefact.href.startsWith('https://') ||
      project.artefact.href.startsWith('/'));

  // Derive genuine research sequence stages that exist in this project
  const stages: EvidenceTrailStage[] = [
    project.question ? { key: 'question', label: 'Question' } : null,
    project.context ? { key: 'context', label: 'Context' } : null,
    project.methods && project.methods.length > 0 ? { key: 'method', label: 'Method' } : null,
    project.contribution ? { key: 'contribution', label: 'Contribution' } : null,
    project.findingsOrLearning ? { key: 'findings', label: 'Findings' } : null,
    project.limitations ? { key: 'limitations', label: 'Limitations' } : null,
  ].filter(Boolean) as EvidenceTrailStage[];

  const cardVariantClass = isFeatured
    ? 'project-card-featured'
    : surfaceVariant === 'seaglass'
    ? 'project-card-seaglass'
    : 'project-card-lavender';

  return (
    <article
      className={`project-card ${cardVariantClass}`}
      aria-labelledby={`project-${project.slug}-title`}
    >
      {/* Top Metadata */}
      <div className="project-meta-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {isFeatured && (
            <span className="featured-project-badge">
              [FEATURED INVESTIGATION]
            </span>
          )}
          {project.context && (
            <span className="project-context-tag">[{project.context}]</span>
          )}
        </div>
        {project.year && <span className="project-year">{project.year}</span>}
      </div>

      {/* Title */}
      <h3 id={`project-${project.slug}-title`} className="project-header-title">
        <Link to={`/project/${project.slug}`} className="project-title-link">
          {project.title}
        </Link>
      </h3>

      {/* Summary */}
      {project.summary && <p className="project-summary">{project.summary}</p>}

      {/* Case Study Structured Sequence with Signature Interaction B (Evidence Trail) */}
      {showFullCaseStudy && (
        <div className="project-case-study">
          {/* Animated Evidence Trail Spine */}
          {stages.length > 0 && <EvidenceTrail stages={stages} />}

          {/* 1. Question */}
          {project.question && (
            <div className="case-study-field">
              <span className="field-label">1. Core Research Question</span>
              <p className="field-value">{project.question}</p>
            </div>
          )}

          {/* 2. Context */}
          {project.context && (
            <div className="case-study-field">
              <span className="field-label">2. Academic Setting &amp; Context</span>
              <p className="field-value">{project.context}</p>
            </div>
          )}

          {/* 3. Method */}
          {project.methods && project.methods.length > 0 && (
            <div className="case-study-field">
              <span className="field-label">3. Methodological Approach</span>
              <div className="methods-tags-list">
                {project.methods.map((method, idx) => (
                  <span key={idx} className="method-tag">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 4. Contribution */}
          {project.contribution && (
            <div className="case-study-field">
              <span className="field-label">4. Researcher Contribution</span>
              <p className="field-value">{project.contribution}</p>
            </div>
          )}

          {/* 5. Findings / Learning */}
          {project.findingsOrLearning && (
            <div className="case-study-field">
              <span className="field-label">5. Empirical Findings &amp; Observations</span>
              <p className="field-value">{project.findingsOrLearning}</p>
            </div>
          )}

          {/* 6. Limitations */}
          {project.limitations && (
            <div className="case-study-field">
              <span className="field-label">6. Methodological Limitations</span>
              <p className="field-value">{project.limitations}</p>
            </div>
          )}

          {/* 7. Attributions */}
          {(project.collaborators || project.supervisor) && (
            <div className="project-attributions">
              {project.collaborators && project.collaborators.length > 0 && (
                <div className="attr-item">
                  <strong>Collaborators:</strong> {project.collaborators.join(', ')}
                </div>
              )}
              {project.supervisor && (
                <div className="attr-item">
                  <strong>Supervisor:</strong> {project.supervisor}
                </div>
              )}
            </div>
          )}

          {/* 8. References */}
          {project.references && project.references.length > 0 && (
            <div className="case-study-field" style={{ marginTop: '8px' }}>
              <span className="field-label">Key Scholarly References</span>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                {project.references.map((ref, idx) => (
                  <li key={idx} style={{ fontSize: '0.85rem' }}>
                    {ref.href.startsWith('https://') ? (
                      <a href={ref.href} target="_blank" rel="noopener noreferrer">
                        {ref.label}
                      </a>
                    ) : (
                      <span>{ref.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Footer Actions: Dedicated Detail Link and Artefact Link with Physical Lift and Translating Arrow */}
      <div className="project-footer-actions">
        <Link to={`/project/${project.slug}`} className="artefact-link project-dossier-link">
          <span>Read complete project dossier</span>
          <span className="link-arrow-mark" aria-hidden="true">→</span>
        </Link>

        {isValidArtefact && project.artefact && (
          <a
            href={project.artefact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="artefact-link"
          >
            <span>{project.artefact.label}</span>
            <span className="link-arrow-mark" aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
};
