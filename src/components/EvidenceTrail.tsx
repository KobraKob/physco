import React, { useEffect, useRef, useState } from 'react';

export interface EvidenceTrailStage {
  key: string;
  label: string;
  active?: boolean;
}

export interface EvidenceTrailProps {
  stages: EvidenceTrailStage[];
  className?: string;
}

export const EvidenceTrail: React.FC<EvidenceTrailProps> = ({ stages, className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsDrawn(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsDrawn(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsDrawn(true);
          observer.disconnect(); // Disconnect after one-time reveal (Section 3 Addendum)
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!stages || stages.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`evidence-trail-container ${isDrawn ? 'is-drawn' : ''} ${className}`}
      aria-label="Research thinking spine: Question, Context, Method, Contribution, Findings, Limitations"
    >
      <div className="evidence-trail-track" aria-hidden="true">
        {/* SVG Drawing Spine */}
        <svg
          viewBox="0 0 100 12"
          preserveAspectRatio="none"
          className="evidence-trail-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0"
            y1="6"
            x2="100"
            y2="6"
            stroke="var(--color-berry)"
            strokeWidth="1.5"
            className="evidence-spine-line"
          />
        </svg>
      </div>

      {/* Staggered Stage Nodes */}
      <ol className="evidence-trail-nodes" role="list">
        {stages.map((stage, idx) => {
          const isCurrentActive = stage.active ?? false;
          const staggerDelay = isDrawn ? `${idx * 60}ms` : '0ms';

          return (
            <li
              key={stage.key}
              className={`evidence-node-item ${isCurrentActive ? 'active' : ''}`}
              style={{ transitionDelay: staggerDelay }}
            >
              <div className="node-marker-wrap">
                <span className="node-marker-circle" aria-hidden="true" />
              </div>
              <span className="node-label-text">{stage.label}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
