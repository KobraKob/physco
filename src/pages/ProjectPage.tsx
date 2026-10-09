import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../content/projects';
import { profile } from '../content/profile';
import { SkipLink } from '../components/SkipLink';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { MarginMap } from '../components/MarginMap';

export const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const project = projects.find((p) => p.slug === slug && p.visibility === 'public');

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — Research Dossier | ${profile.name}`;
      window.scrollTo(0, 0);
    } else {
      document.title = `Project Not Found | ${profile.name}`;
    }
  }, [project]);

  if (!project) {
    return (
      <>
        <SkipLink />
        <SiteHeader profile={profile} projects={projects} />
        <main id="main-content" className="site-container section-wrapper" style={{ minHeight: '60vh' }}>
          <div style={{ maxWidth: '640px', margin: '48px auto', textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '16px' }}>
              Project Dossier Not Available
            </h1>
            <p style={{ color: 'var(--color-secondary)', marginBottom: '32px' }}>
              The requested research entry either does not exist, has been archived, or is omitted in
              accordance with content confidentiality guidelines.
            </p>
            <Link to="/" className="btn-primary">
              Return to Portfolio Overview
            </Link>
          </div>
        </main>
        <SiteFooter profile={profile} projects={projects} />
      </>
    );
  }

  const isValidArtefact =
    project.artefact &&
    project.artefact.href &&
    (project.artefact.href.startsWith('http://') ||
      project.artefact.href.startsWith('https://') ||
      project.artefact.href.startsWith('/'));

  return (
    <>
      <SkipLink />
      <SiteHeader profile={profile} projects={projects} />

      <main id="main-content" className="site-container section-wrapper">
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '32px' }}>
          <Link
            to="/#selected-work"
            style={{
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-secondary)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>←</span>
            <span>Return to Selected Work</span>
          </Link>
        </div>

        {/* Project Header */}
        <header style={{ marginBottom: '40px', borderBottom: 'var(--border-rule)', paddingBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '12px' }}>
            {project.context && (
              <span className="project-context-tag">[{project.context}]</span>
            )}
            {project.year && <span className="project-year">{project.year}</span>}
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              lineHeight: 1.1,
              marginBottom: '20px',
            }}
          >
            {project.title}
          </h1>

          {project.summary && (
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'var(--color-secondary)', maxWidth: '72ch' }}>
              {project.summary}
            </p>
          )}
        </header>

        {/* Methodological Vector Diagram (Distinct Variant 2) */}
        <div
          style={{
            marginBottom: '48px',
            padding: '24px',
            border: 'var(--border-rule)',
            background: 'var(--color-paper)',
          }}
          aria-hidden="true"
        >
          <MarginMap variant="accent" />
        </div>

        {/* Case Study Details Sequence */}
        <div className="project-case-study" style={{ background: '#ECE8DD', borderRadius: 'var(--radius-subtle)' }}>
          {project.question && (
            <div className="case-study-field">
              <span className="field-label">1. Primary Research Question</span>
              <p className="field-value" style={{ fontSize: '1.05rem', fontWeight: 500 }}>
                {project.question}
              </p>
            </div>
          )}

          {project.context && (
            <div className="case-study-field">
              <span className="field-label">2. Academic Setting &amp; Context</span>
              <p className="field-value">{project.context}</p>
            </div>
          )}

          {project.methods && project.methods.length > 0 && (
            <div className="case-study-field">
              <span className="field-label">3. Methodological Protocol</span>
              <div className="methods-tags-list">
                {project.methods.map((method, idx) => (
                  <span key={idx} className="method-tag">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.contribution && (
            <div className="case-study-field">
              <span className="field-label">4. Specific Research Contribution</span>
              <p className="field-value">{project.contribution}</p>
            </div>
          )}

          {project.findingsOrLearning && (
            <div className="case-study-field">
              <span className="field-label">5. Empirical Findings &amp; Observations</span>
              <p className="field-value">{project.findingsOrLearning}</p>
            </div>
          )}

          {project.limitations && (
            <div className="case-study-field">
              <span className="field-label">6. Identified Methodological Limitations</span>
              <p className="field-value">{project.limitations}</p>
            </div>
          )}

          {(project.collaborators || project.supervisor) && (
            <div className="project-attributions" style={{ marginTop: '16px' }}>
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

          {project.references && project.references.length > 0 && (
            <div className="case-study-field" style={{ marginTop: '16px' }}>
              <span className="field-label">7. Scholarly References</span>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                {project.references.map((ref, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--color-secondary)' }}>
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

        {/* External Artefact Link */}
        {isValidArtefact && project.artefact && (
          <div style={{ marginTop: '36px', display: 'flex', justifyContent: 'flex-start' }}>
            <a
              href={project.artefact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>{project.artefact.label}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}
      </main>

      <SiteFooter profile={profile} projects={projects} />
    </>
  );
};
