import React from 'react';
import type { Profile } from '../types/profile';
import type { Project } from '../types/project';

export interface SiteFooterProps {
  profile: Profile;
  projects: Project[];
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ profile, projects }) => {
  const currentYear = new Date().getFullYear();

  // Consistent navigation links drawn from same set as header
  const navItems = [
    { id: 'about', label: 'About', show: Boolean(profile.bio) },
    {
      id: 'research',
      label: 'Research',
      show: Boolean(profile.researchQuestions && profile.researchQuestions.length > 0),
    },
    {
      id: 'selected-work',
      label: 'Selected Work',
      show: projects.some((p) => p.visibility === 'public'),
    },
    {
      id: 'skills',
      label: 'Methods',
      show: Boolean(profile.skills && profile.skills.length > 0),
    },
    {
      id: 'experience',
      label: 'Experience',
      show: Boolean(
        (profile.education && profile.education.length > 0) ||
          (profile.experience && profile.experience.length > 0)
      ),
    },
    { id: 'contact', label: 'Contact', show: Boolean(profile.contactEmail) },
  ].filter((item) => item.show);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerHeight = 72;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-container footer-inner">
        <div className="footer-copy">
          <span>
            © {currentYear} {profile.name} · {profile.programme}
          </span>
          <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.7, marginTop: '4px' }}>
            Academic Research Fieldnote Portfolio · Deployed on Vercel
          </span>
        </div>

        <nav className="footer-links" aria-label="Footer Navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="footer-link"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};
