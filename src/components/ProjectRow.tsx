import React from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../types/project';

export interface ProjectRowProps {
  project: Project;
  showFullCaseStudy?: boolean;
}

export const ProjectRow: React.FC<ProjectRowProps> = ({
  project,
  showFullCaseStudy = true,
}) => {
  // Validate artefact link
  const isValidArtefact =
    project.artefact &&
    project.artefact.href &&
    (project.artefact.href.startsWith('http://') ||
      project.artefact.href.startsWith('https://') ||
      project.artefact.href.startsWith('/'));

  return (
    <article className="project-card" aria-labelledby={`project-${project.slug}-title`}>
      {/* Top Metadata */}
      {(project.context || project.year) && (
        <div className="project-meta-top">
          {project.context && <span className="project-context-tag">{project.context}</span>}
          {project.year && <span className="project-year">{project.year}</span>}
        </div>
      )}

      {/* Title */}
      <h3 id={`project-${project.slug}-title`} className="project-header-title">
        <Link to={`/project/${project.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          {project.title}
        </Link>
      </h3>

      {/* Summary */}
      {project.summary && <p className="project-summary">{project.summary}</p>}

      {/* Case Study Structured Sequence (Requirement 9.3)
          Question → Context → Method → Contribution → Findings / Learning → Limitations → References / Artefact */}
      {showFullCaseStudy && (
        <div className="project-case-study">
          {/* 1. Question */}
          {project.question && (
            <div className="case-study-field">
              <span className="field-label">Core Research Question</span>
              <p className="field-value">{project.question}</p>
            </div>
          )}

          {/* 2. Context */}
          {project.context && (
            <div className="case-study-field">
              <span className="field-label">Academic Context</span>
              <p className="field-value">{project.context}</p>
            </div>
          )}

          {/* 3. Method */}
          {project.methods && project.methods.length > 0 && (
            <div className="case-study-field">
              <span className="field-label">Methodological Approach</span>
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
              <span className="field-label">Researcher Contribution</span>
              <p className="field-value">{project.contribution}</p>
            </div>
          )}

          {/* 5. Findings / Learning (Requirement 9.5) */}
          {project.findingsOrLearning && (
            <div className="case-study-field">
              <span className="field-label">Empirical Findings &amp; Observations</span>
              <p className="field-value">{project.findingsOrLearning}</p>
            </div>
          )}

          {/* 6. Limitations */}
          {project.limitations && (
            <div className="case-study-field">
              <span className="field-label">Methodological Limitations</span>
              <p className="field-value">{project.limitations}</p>
            </div>
          )}

          {/* 7. Attributions: Collaborators & Supervisor (Requirement 9.9) */}
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
                  <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--color-secondary)' }}>
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

      {/* Footer Actions: Dedicated Detail Link and Artefact Link */}
      <div className="project-footer-actions">
        <Link to={`/project/${project.slug}`} className="artefact-link">
          <span>Read complete project dossier</span>
          <span aria-hidden="true">→</span>
        </Link>

        {isValidArtefact && project.artefact && (
          <a
            href={project.artefact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="artefact-link"
          >
            <span>{project.artefact.label}</span>
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
};
