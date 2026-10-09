import React from 'react';

export interface MarginMapProps {
  variant?: 'hero' | 'accent' | 'cover';
  className?: string;
}

export const MarginMap: React.FC<MarginMapProps> = ({ variant = 'hero', className = '' }) => {
  if (variant === 'hero') {
    return (
      <svg
        viewBox="0 0 680 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`margin-map-svg margin-map-hero ${className}`}
        aria-hidden="true"
        role="presentation"
        style={{ width: '100%', height: 'auto', maxHeight: '440px' }}
      >
        {/* Background Grid & Axes */}
        <line x1="40" y1="40" x2="640" y2="40" stroke="var(--color-ink)" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="40" y1="220" x2="640" y2="220" stroke="var(--color-ink)" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="40" y1="400" x2="640" y2="400" stroke="var(--color-ink)" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="40" y1="40" x2="40" y2="400" stroke="var(--color-ink)" strokeWidth="0.75" />
        <line x1="340" y1="40" x2="340" y2="400" stroke="var(--color-ink)" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="640" y1="40" x2="640" y2="400" stroke="var(--color-ink)" strokeWidth="0.75" />

        {/* Primary Pathway A (Berry) */}
        <path
          d="M 60 340 C 140 340, 180 180, 260 180 S 360 280, 440 120 S 540 80, 620 80"
          stroke="var(--color-berry)"
          strokeWidth="1.75"
          fill="transparent"
        />

        {/* Alternative Pathway B (Bifurcation - Moss) */}
        <path
          d="M 260 180 C 310 180, 340 320, 420 320 S 520 240, 600 240"
          stroke="var(--color-moss)"
          strokeWidth="1.25"
          strokeDasharray="4 4"
          fill="transparent"
        />

        {/* Citron Highlight Callout Block */}
        <rect x="250" y="142" width="138" height="20" fill="var(--color-citron)" rx="2" />

        {/* Node Elements & Annotation Brackets */}
        {/* Node 1 */}
        <circle cx="60" cy="340" r="5" stroke="var(--color-ink)" strokeWidth="1.5" fill="var(--color-paper)" />
        <circle cx="60" cy="340" r="2.5" fill="var(--color-berry)" />
        <text x="60" y="365" fill="var(--color-ink)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.05em">
          NODE 01: BASELINE
        </text>

        {/* Node 2 - Bifurcation with Guava Accent */}
        <circle cx="260" cy="180" r="6" stroke="var(--color-ink)" strokeWidth="1.5" fill="var(--color-paper)" />
        <circle cx="260" cy="180" r="3" fill="var(--color-guava)" />
        <text x="254" y="156" fill="var(--color-ink)" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight="600">
          BIFURCATION α [p &lt; .05]
        </text>

        {/* Node 3 */}
        <circle cx="440" cy="120" r="5" stroke="var(--color-berry)" strokeWidth="1.5" fill="var(--color-paper)" />
        <circle cx="440" cy="120" r="2" fill="var(--color-berry)" />
        <text x="448" y="115" fill="var(--color-ink)" fontSize="10" fontFamily="var(--font-mono)">
          OBSERVATION β
        </text>

        {/* Node 4 - Terminal */}
        <circle cx="620" cy="80" r="6" stroke="var(--color-guava)" strokeWidth="1.5" fill="var(--color-paper)" />
        <circle cx="620" cy="80" r="2.5" fill="var(--color-guava)" />
        <text x="548" y="65" fill="var(--color-ink)" fontSize="10" fontFamily="var(--font-mono)">
          CONVERGENCE γ
        </text>

        {/* Bracket Annotation */}
        <path d="M 440 330 L 440 345 L 600 345 L 600 330" stroke="var(--color-ink)" strokeWidth="1" fill="transparent" />
        <text x="460" y="362" fill="var(--color-ink)" fontSize="9" fontFamily="var(--font-mono)">
          RANGE OF VARIANCE: ±1.84 SD
        </text>

        {/* Coordinate Legend */}
        <text x="52" y="58" fill="var(--color-ink)" fontSize="9" fontFamily="var(--font-mono)" opacity="0.65">
          AXIS 1.0 (COGNITIVE LOAD)
        </text>
        <text x="520" y="392" fill="var(--color-ink)" fontSize="9" fontFamily="var(--font-mono)" opacity="0.65">
          CURIOUS MARGIN // FIELDNOTE
        </text>
      </svg>
    );
  }

  // Accent / Cover Variant: Methodological Workflow
  return (
    <svg
      viewBox="0 0 460 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`margin-map-svg margin-map-accent ${className}`}
      aria-hidden="true"
      role="presentation"
      style={{ width: '100%', height: 'auto', maxHeight: '180px' }}
    >
      {/* Horizontal Axis */}
      <line x1="30" y1="90" x2="430" y2="90" stroke="var(--color-ink)" strokeWidth="1" />
      <line x1="30" y1="30" x2="30" y2="150" stroke="var(--color-ink)" strokeWidth="0.75" strokeDasharray="3 3" />
      <line x1="430" y1="30" x2="430" y2="150" stroke="var(--color-ink)" strokeWidth="0.75" strokeDasharray="3 3" />

      {/* Citron Highlight Pill for Preregistration */}
      <rect x="140" y="30" width="168" height="18" fill="var(--color-citron)" rx="2" />

      {/* Methodological Vector Path (Berry) */}
      <path
        d="M 50 130 L 140 50 L 250 110 L 350 40 L 410 90"
        stroke="var(--color-berry)"
        strokeWidth="1.75"
        fill="transparent"
      />

      {/* Regression Baseline (Moss) */}
      <line x1="50" y1="130" x2="410" y2="90" stroke="var(--color-moss)" strokeWidth="1.25" strokeDasharray="4 2" />

      {/* Nodes */}
      <circle cx="50" cy="130" r="4" stroke="var(--color-ink)" strokeWidth="1.5" fill="var(--color-paper)" />
      <circle cx="140" cy="50" r="4" stroke="var(--color-berry)" strokeWidth="1.5" fill="var(--color-berry)" />
      <circle cx="250" cy="110" r="4" stroke="var(--color-ink)" strokeWidth="1.5" fill="var(--color-paper)" />
      <circle cx="350" cy="40" r="5" stroke="var(--color-guava)" strokeWidth="1.5" fill="var(--color-paper)" />
      <circle cx="350" cy="40" r="2.5" fill="var(--color-guava)" />
      <circle cx="410" cy="90" r="4" stroke="var(--color-ink)" strokeWidth="1.5" fill="var(--color-paper)" />

      {/* Annotations */}
      <text x="146" y="43" fill="var(--color-ink)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">
        PREREGISTERED SPECIFICATION
      </text>
      <text x="355" y="34" fill="var(--color-berry)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">
        EFFECT SIZE (η² = .11)
      </text>
      <text x="50" y="160" fill="var(--color-ink)" fontSize="8.5" fontFamily="var(--font-mono)" opacity="0.7">
        METHODOLOGICAL DISCIPLINE // EMPIRICAL PIPELINE
      </text>
    </svg>
  );
};
