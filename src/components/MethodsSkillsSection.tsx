import React from 'react';
import type { Profile, SkillItem } from '../types/profile';
import { SectionLabel } from './SectionLabel';

export interface MethodsSkillsSectionProps {
  profile: Profile;
}

export const MethodsSkillsSection: React.FC<MethodsSkillsSectionProps> = ({ profile }) => {
  // Requirement 10.4: Omit section if skills is absent or empty
  if (!profile.skills || profile.skills.length === 0) {
    return null;
  }

  // Group skills by category
  const categories = Array.from(new Set(profile.skills.map((s) => s.category)));

  return (
    <section id="skills" className="section-wrapper" aria-labelledby="skills-heading">
      <div className="site-container">
        <SectionLabel
          index="04"
          label="Methodological Literacy"
          title="Methods, Analytical Tools &amp; Capabilities"
        />

        <div className="skills-grid">
          {categories.map((category) => {
            const categorySkills = (profile.skills as SkillItem[]).filter(
              (s) => s.category === category
            );

            return (
              <div key={category} className="skill-category-col">
                <h3 className="skill-cat-title">{category}</h3>
                <ul className="skill-list" role="list">
                  {categorySkills.map((skill, index) => (
                    <li key={index} className="skill-card" role="listitem">
                      <div className="skill-name">{skill.name}</div>

                      {/* Requirement 10.2: Exact experience level strings */}
                      {skill.experienceLevel && (
                        <span className="skill-level-badge">
                          [{skill.experienceLevel}]
                        </span>
                      )}

                      {/* Requirement 10.5: Supplementary example reference */}
                      {skill.example && skill.example.trim() !== '' && (
                        <span className="skill-example">
                          Artifact: {skill.example}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
