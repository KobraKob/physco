import React, { useEffect, useRef, useState } from 'react';

export interface SectionLabelProps {
  index: string;
  label: string;
  title: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ index, label, title }) => {
  const labelRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!labelRef.current) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // One-time reveal (Section 4 Addendum)
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(labelRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={labelRef}
      className={`section-header-block marginalia-block ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="section-label">
        <span className="section-label-index marginalia-index">[{index}]</span>
        <span className="section-label-text">{label}</span>
      </div>

      <h2 className="section-title">{title}</h2>

      {/* Editorial Bracket Underline (Draws left-to-right once in view) */}
      <div className="marginalia-bracket-line" aria-hidden="true">
        <span className="marginalia-rule-draw" />
      </div>
    </div>
  );
};
