import React, { useState, useEffect, useRef, useCallback } from 'react';

export type FocusMode = 'Notice' | 'Connect' | 'Context';

export interface AttentionFieldProps {
  className?: string;
}

interface NodePoint {
  id: number;
  x: number;
  y: number;
  r: number;
  fill: string;
  stroke?: string;
  driftClass: 'idle-drift-a' | 'idle-drift-b' | 'idle-drift-c' | '';
  cluster: 'core' | 'connect' | 'context';
}

const INITIAL_NODES: NodePoint[] = [
  // Core focal points (Notice mode emphasis)
  { id: 1, x: 90, y: 320, r: 4.5, fill: 'var(--color-berry)', stroke: 'var(--color-ink)', driftClass: 'idle-drift-a', cluster: 'core' },
  { id: 2, x: 160, y: 260, r: 3.5, fill: 'var(--color-ink)', stroke: 'var(--color-paper)', driftClass: 'idle-drift-b', cluster: 'core' },
  { id: 3, x: 240, y: 190, r: 5.5, fill: 'var(--color-guava)', stroke: 'var(--color-ink)', driftClass: 'idle-drift-c', cluster: 'core' },
  { id: 4, x: 310, y: 240, r: 3.5, fill: 'var(--color-berry)', stroke: 'var(--color-paper)', driftClass: 'idle-drift-a', cluster: 'core' },
  { id: 5, x: 380, y: 140, r: 4.5, fill: 'var(--color-moss)', stroke: 'var(--color-ink)', driftClass: 'idle-drift-b', cluster: 'core' },
  { id: 6, x: 450, y: 180, r: 3.5, fill: 'var(--color-ink)', stroke: 'var(--color-paper)', driftClass: 'idle-drift-c', cluster: 'core' },
  { id: 7, x: 530, y: 100, r: 5.5, fill: 'var(--color-citron)', stroke: 'var(--color-ink)', driftClass: 'idle-drift-a', cluster: 'core' },
  { id: 8, x: 600, y: 120, r: 4, fill: 'var(--color-guava)', stroke: 'var(--color-ink)', driftClass: 'idle-drift-b', cluster: 'core' },

  // Connecting transition nodes (Connect mode emphasis)
  { id: 9, x: 200, y: 310, r: 3, fill: 'var(--color-moss)', stroke: 'var(--color-paper)', driftClass: '', cluster: 'connect' },
  { id: 10, x: 280, y: 340, r: 3.5, fill: 'var(--color-ink)', stroke: 'var(--color-paper)', driftClass: 'idle-drift-c', cluster: 'connect' },
  { id: 11, x: 360, y: 290, r: 3, fill: 'var(--color-berry)', stroke: 'var(--color-paper)', driftClass: '', cluster: 'connect' },
  { id: 12, x: 430, y: 260, r: 3.5, fill: 'var(--color-moss)', stroke: 'var(--color-paper)', driftClass: 'idle-drift-a', cluster: 'connect' },
  { id: 13, x: 490, y: 210, r: 3, fill: 'var(--color-ink)', stroke: 'var(--color-paper)', driftClass: '', cluster: 'connect' },
  { id: 14, x: 560, y: 240, r: 3.5, fill: 'var(--color-berry)', stroke: 'var(--color-paper)', driftClass: 'idle-drift-b', cluster: 'connect' },

  // Context boundary & perimeter nodes (Context mode emphasis)
  { id: 15, x: 70, y: 110, r: 2.5, fill: 'var(--color-secondary)', stroke: 'var(--color-paper)', driftClass: '', cluster: 'context' },
  { id: 16, x: 140, y: 70, r: 3, fill: 'var(--color-secondary)', stroke: 'var(--color-paper)', driftClass: '', cluster: 'context' },
  { id: 17, x: 220, y: 90, r: 2.5, fill: 'var(--color-secondary)', stroke: 'var(--color-paper)', driftClass: '', cluster: 'context' },
  { id: 18, x: 330, y: 60, r: 3, fill: 'var(--color-moss)', stroke: 'var(--color-paper)', driftClass: '', cluster: 'context' },
  { id: 19, x: 440, y: 50, r: 2.5, fill: 'var(--color-secondary)', stroke: 'var(--color-paper)', driftClass: '', cluster: 'context' },
  { id: 20, x: 580, y: 50, r: 3, fill: 'var(--color-secondary)', stroke: 'var(--color-paper)', driftClass: '', cluster: 'context' },
  { id: 21, x: 120, y: 390, r: 2.5, fill: 'var(--color-secondary)', stroke: 'var(--color-paper)', driftClass: '', cluster: 'context' },
  { id: 22, x: 270, y: 400, r: 3, fill: 'var(--color-secondary)', stroke: 'var(--color-paper)', driftClass: '', cluster: 'context' },
  { id: 23, x: 490, y: 380, r: 2.5, fill: 'var(--color-secondary)', stroke: 'var(--color-paper)', driftClass: '', cluster: 'context' },
];

export const AttentionField: React.FC<AttentionFieldProps> = ({ className = '' }) => {
  const [focusMode, setFocusMode] = useState<FocusMode>('Notice');
  const [offsets, setOffsets] = useState<Record<number, { dx: number; dy: number }>>({});
  const [isInViewport, setIsInViewport] = useState(true);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const rafId = useRef<number | null>(null);
  const isFinePointer = useRef<boolean>(false);

  // Check if animation is permitted (Respects OS Reduced-Motion AND Site Still Mode - Audit Finding 2.D)
  const isMotionPermitted = useCallback(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    if (document.documentElement.classList.contains('motion-disabled')) {
      return false;
    }
    return true;
  }, []);

  // Detect fine-pointer capability
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      isFinePointer.current = window.matchMedia('(pointer: fine)').matches;
    }
  }, []);

  // Clear offsets if motion becomes disabled (Audit Finding 2.D)
  useEffect(() => {
    const handleMotionChange = () => {
      if (!isMotionPermitted()) {
        setOffsets({});
      }
    };

    const mq = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if (mq) {
      mq.addEventListener('change', handleMotionChange);
    }

    const observer = typeof MutationObserver !== 'undefined' ? new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName === 'class') {
          handleMotionChange();
        }
      });
    }) : null;

    if (observer) {
      observer.observe(document.documentElement, { attributes: true });
    }

    return () => {
      if (mq) mq.removeEventListener('change', handleMotionChange);
      if (observer) observer.disconnect();
    };
  }, [isMotionPermitted]);

  // Pause idle work when outside viewport (Section 2 & 4 Addendum)
  useEffect(() => {
    if (!svgRef.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(svgRef.current);
    return () => observer.disconnect();
  }, []);

  // Pause on document visibilitychange
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsInViewport(false);
      } else if (svgRef.current) {
        setIsInViewport(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Pointer response strictly bounded to SVG bounds, max 5px shift, throttled via requestAnimationFrame
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (!isFinePointer.current || !svgRef.current || !isMotionPermitted()) return;

      const rect = svgRef.current.getBoundingClientRect();
      const svgX = ((e.clientX - rect.left) / rect.width) * 680;
      const svgY = ((e.clientY - rect.top) / rect.height) * 440;

      if (rafId.current) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const newOffsets: Record<number, { dx: number; dy: number }> = {};

        INITIAL_NODES.forEach((node) => {
          const dist = Math.hypot(node.x - svgX, node.y - svgY);
          // Only nearby cluster responds within a radius of 130px
          if (dist < 130) {
            const power = (1 - dist / 130) * 4.8; // Strict max 4.8px shift (Audit Section 4 Motion 2)
            const angle = Math.atan2(node.y - svgY, node.x - svgX);
            newOffsets[node.id] = {
              dx: Math.cos(angle) * power,
              dy: Math.sin(angle) * power,
            };
          }
        });

        setOffsets(newOffsets);
      });
    },
    [isMotionPermitted]
  );

  const handlePointerLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      setOffsets({});
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className={`attention-field-container ${className}`}>
      {/* Signature Interaction D: Shift Focus Accessible Control */}
      <div className="shift-focus-bar" role="toolbar" aria-label="Shift focus exploration">
        <span className="shift-focus-label">Shift focus:</span>
        {(['Notice', 'Connect', 'Context'] as FocusMode[]).map((mode) => {
          const isSelected = focusMode === mode;
          return (
            <button
              key={mode}
              type="button"
              className={`shift-focus-btn ${isSelected ? 'active' : ''}`}
              aria-pressed={isSelected}
              onClick={() => setFocusMode(mode)}
            >
              {mode}
            </button>
          );
        })}
      </div>

      {/* SVG Metaphor: The Attention Field Observation Map */}
      <svg
        ref={svgRef}
        viewBox="0 0 680 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`attention-field-svg ${isInViewport ? 'is-active' : 'is-paused'}`}
        aria-hidden="true"
        role="presentation"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ width: '100%', height: 'auto', maxHeight: '440px' }}
      >
        {/* Subtle grid and frame axes */}
        <line x1="40" y1="40" x2="640" y2="40" stroke="var(--color-rule)" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="40" y1="220" x2="640" y2="220" stroke="var(--color-rule)" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="40" y1="400" x2="640" y2="400" stroke="var(--color-rule)" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="40" y1="40" x2="40" y2="400" stroke="var(--color-rule)" strokeWidth="0.75" />
        <line x1="340" y1="40" x2="340" y2="400" stroke="var(--color-rule)" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="640" y1="40" x2="640" y2="400" stroke="var(--color-rule)" strokeWidth="0.75" />

        {/* Primary Vector Pathways */}
        {/* Pathway A (Core Berry Trail) */}
        <path
          d="M 90 320 C 160 320, 180 190, 240 190 S 340 280, 450 180 S 520 100, 600 120"
          stroke="var(--color-berry)"
          strokeWidth={focusMode === 'Connect' ? '2.25' : '1.5'}
          strokeOpacity={focusMode === 'Context' ? '0.45' : '1'}
          fill="transparent"
          style={{ transition: 'stroke-width var(--motion-ui) ease, stroke-opacity var(--motion-ui) ease' }}
        />

        {/* Pathway B (Secondary Moss Branch) */}
        <path
          d="M 240 190 C 280 190, 310 310, 380 290 S 480 230, 560 240"
          stroke="var(--color-moss)"
          strokeWidth={focusMode === 'Connect' ? '1.75' : '1'}
          strokeDasharray="4 4"
          strokeOpacity={focusMode === 'Context' ? '0.4' : '0.85'}
          fill="transparent"
          style={{ transition: 'stroke-width var(--motion-ui) ease, stroke-opacity var(--motion-ui) ease' }}
        />

        {/* Context Surrounding Contour (Context mode emphasis) */}
        <path
          d="M 70 110 C 140 70, 220 90, 330 60 S 440 50, 580 50"
          stroke="var(--color-secondary)"
          strokeWidth="0.75"
          strokeDasharray="2 4"
          strokeOpacity={focusMode === 'Context' ? '0.85' : '0.25'}
          fill="transparent"
          style={{ transition: 'stroke-opacity var(--motion-ui) ease' }}
        />

        {/* Citron Highlight Callout Block */}
        <rect
          x="230"
          y="156"
          width="134"
          height="18"
          fill="var(--color-citron)"
          rx="2"
          opacity={focusMode === 'Notice' ? 1 : 0.65}
          style={{ transition: 'opacity var(--motion-ui) ease' }}
        />

        {/* Nested Node Architecture (Audit 2.C & 5: Outer group handles CSS keyframe drift, inner group handles pointer spring shift) */}
        {INITIAL_NODES.map((node) => {
          const offset = offsets[node.id] || { dx: 0, dy: 0 };

          // Compute opacity based on FocusMode
          let opacity = 1;
          if (focusMode === 'Notice' && node.cluster !== 'core') opacity = 0.4;
          if (focusMode === 'Connect' && node.cluster === 'context') opacity = 0.35;
          if (focusMode === 'Context' && node.cluster === 'core') opacity = 0.75;

          return (
            <g
              key={node.id}
              className={`node-idle-wrap ${node.driftClass}`}
              style={{ transition: 'opacity var(--motion-ui) ease' }}
            >
              <g
                className="node-spring-wrap"
                style={{
                  transform: `translate(${offset.dx}px, ${offset.dy}px)`,
                  transition: 'transform 140ms cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill={node.fill}
                  stroke={node.stroke}
                  strokeWidth="1.25"
                  opacity={opacity}
                />
              </g>
            </g>
          );
        })}

        {/* Annotation Labels */}
        <text
          x="234"
          y="169"
          fill="var(--color-ink)"
          fontSize="9"
          fontFamily="var(--font-mono)"
          fontWeight="600"
          letterSpacing="0.04em"
        >
          OBSERVATION α [p &lt; .05]
        </text>

        <text
          x="60"
          y="346"
          fill="var(--color-secondary)"
          fontSize="9.5"
          fontFamily="var(--font-mono)"
          letterSpacing="0.05em"
          opacity={focusMode === 'Notice' ? 1 : 0.65}
        >
          POINT 01 // CALIBRATION
        </text>

        <text
          x="520"
          y="85"
          fill="var(--color-ink)"
          fontSize="9.5"
          fontFamily="var(--font-mono)"
          opacity={focusMode === 'Notice' ? 1 : 0.65}
        >
          POINT 02 // STIMULUS
        </text>

        {/* Variance Bracket (Context mode emphasis) */}
        <path
          d="M 420 330 L 420 345 L 580 345 L 580 330"
          stroke="var(--color-ink)"
          strokeWidth="1"
          strokeOpacity={focusMode === 'Context' ? '1' : '0.45'}
          fill="transparent"
          style={{ transition: 'stroke-opacity var(--motion-ui) ease' }}
        />
        <text
          x="440"
          y="360"
          fill="var(--color-secondary)"
          fontSize="8.5"
          fontFamily="var(--font-mono)"
          opacity={focusMode === 'Context' ? 1 : 0.5}
        >
          CONFIDENCE INTERVAL (95%)
        </text>

        {/* Legend */}
        <text x="50" y="58" fill="var(--color-secondary)" fontSize="8.5" fontFamily="var(--font-mono)" opacity="0.6">
          ATTENTION FIELD // FIELDNOTE REF. 01
        </text>
      </svg>
    </div>
  );
};
