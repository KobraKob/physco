import React, { useEffect, useState } from 'react';

interface RailSection {
  id: string;
  label: string;
  index: string;
}

const SECTIONS: RailSection[] = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'research', label: 'Research', index: '02' },
  { id: 'selected-work', label: 'Selected Work', index: '03' },
  { id: 'skills', label: 'Methods', index: '04' },
  { id: 'experience', label: 'Trajectory', index: '05' },
  { id: 'publications', label: 'Output', index: '06' },
  { id: 'ethics', label: 'Ethics', index: '07' },
  { id: 'contact', label: 'Contact', index: '08' },
];

export const MarginProgressRail: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('about');
  const [activeNum, setActiveNum] = useState<string>('01');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall page scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(1, Math.max(0, currentScroll / totalScroll)) : 0;
      setScrollProgress(progress);

      // Determine active section
      const scrollPosition = window.scrollY + 200;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const sec = SECTIONS[i];
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sec.id);
          setActiveNum(sec.index);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerHeight = 72;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <aside
      className="margin-progress-rail"
      aria-label="Editorial reading position rail"
      role="complementary"
    >
      <div className="rail-indicator-group">
        <span className="rail-index-badge">
          [{activeNum} / 08]
        </span>

        {/* 1px Vertical Track with Scroll Fill Indicator */}
        <div className="rail-vertical-track" aria-hidden="true">
          <div
            className="rail-progress-bar"
            style={{ transform: `scaleY(${scrollProgress})` }}
          />
        </div>

        {/* Subtle Section Jump Nodes */}
        <nav className="rail-nodes-list" aria-label="Quick section navigation">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                className={`rail-node-dot ${isActive ? 'is-active' : ''}`}
                aria-label={`Jump to Section ${sec.index}: ${sec.label}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => handleScrollTo(sec.id)}
              >
                <span className="rail-dot-pill" />
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
