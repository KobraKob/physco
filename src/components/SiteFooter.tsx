import React, { useState, useEffect } from 'react';
import type { Profile } from '../types/profile';
import type { Project } from '../types/project';

export interface SiteFooterProps {
  profile: Profile;
  projects: Project[];
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ profile, projects }) => {
  const currentYear = new Date().getFullYear();
  const [isMotionDisabled, setIsMotionDisabled] = useState(false);
  const [isOsReducedMotion, setIsOsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsOsReducedMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) => setIsOsReducedMotion(e.matches);
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, []);

  const toggleMotion = () => {
    if (isOsReducedMotion) return; // Operating system setting always respected (Section 7 Addendum)
    const next = !isMotionDisabled;
    setIsMotionDisabled(next);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('motion-disabled', next);
    }
  };

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

        {/* Navigation and Accessible Still Mode Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-24)' }}>
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

          {/* Signature Interaction 7.8: Accessible Motion On/Off Still Mode */}
          <button
            type="button"
            className="motion-toggle-btn"
            aria-pressed={isMotionDisabled || isOsReducedMotion}
            onClick={toggleMotion}
            title={
              isOsReducedMotion
                ? 'Operating system reduced motion is active'
                : 'Toggle ambient motion preference'
            }
          >
            <span>Motion: </span>
            <span style={{ fontWeight: 600 }}>
              {isOsReducedMotion ? 'System Reduced' : isMotionDisabled ? 'Off' : 'On'}
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
