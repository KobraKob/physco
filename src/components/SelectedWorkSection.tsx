import React from 'react';
import type { Project } from '../types/project';
import { SectionLabel } from './SectionLabel';
import { ProjectRow } from './ProjectRow';

export interface SelectedWorkSectionProps {
  projects: Project[];
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ projects }) => {
  // Requirement 9.1 & 9.7: filter public projects; omit section if empty
  const publicProjects = projects.filter((p) => p.visibility === 'public');

  if (publicProjects.length === 0) {
    return null;
  }

  return (
    <section
      id="selected-work"
      className="section-wrapper"
      aria-labelledby="selected-work-heading"
    >
      <div className="site-container">
        <SectionLabel
          index="03"
          label="Research Archive"
          title="Selected Academic Projects &amp; Empirical Studies"
        />

        <div className="projects-container">
          {publicProjects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
