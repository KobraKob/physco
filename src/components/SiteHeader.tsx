import React, { useState, useEffect, useRef } from 'react';
import type { Profile } from '../types/profile';
import type { Project } from '../types/project';

export interface SiteHeaderProps {
  profile: Profile;
  projects: Project[];
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ profile, projects }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null);

  // Compute available navigation sections based on ContentGuard
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

  // Track scroll position to update active navigation item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      let current = '';

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = item.id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  // Handle focus outside mobile drawer to satisfy Requirement 5.5
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleFocusIn = (e: FocusEvent) => {
      if (
        mobileDrawerRef.current &&
        !mobileDrawerRef.current.contains(e.target as Node) &&
        mobileToggleRef.current !== e.target
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        mobileToggleRef.current?.focus();
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    mobileToggleRef.current?.focus();

    const targetEl = document.getElementById(id);
    if (targetEl) {
      // Smooth scroll target positioning with sticky header offset
      const headerHeight = 72;
      const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="site-header" role="banner">
      <div className="site-container header-inner">
        {/* Wordmark */}
        <div className="wordmark-container">
          <a href="#" className="wordmark" aria-label={`${profile.name} - Home`}>
            {profile.name}
          </a>
          <span className="wordmark-sub">{profile.role}</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-desktop" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
              >
                {item.label}
              </a>
            );
          })}

          {/* Conditional CV download link */}
          {profile.cvPath && profile.cvPath.trim() !== '' && (
            <a
              href={profile.cvPath}
              className="nav-cv-button"
              download
              aria-label="Download Curriculum Vitae (PDF)"
            >
              CV (PDF)
            </a>
          )}
        </nav>

        {/* Mobile Navigation Toggle (touch target at least 44x44px) */}
        <button
          ref={mobileToggleRef}
          type="button"
          className="mobile-nav-toggle"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          ref={mobileDrawerRef}
          className="mobile-menu-drawer"
          role="region"
          aria-label="Mobile Navigation Menu"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
              >
                <span>{item.label}</span>
                <span className="marginal-index">→</span>
              </a>
            );
          })}
          {profile.cvPath && profile.cvPath.trim() !== '' && (
            <a
              href={profile.cvPath}
              className="nav-cv-button"
              style={{ alignSelf: 'flex-start', marginTop: '8px' }}
              download
            >
              Download CV (PDF)
            </a>
          )}
        </div>
      )}
    </header>
  );
};
