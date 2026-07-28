'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * The visual signature — see docs/brand-guidelines.md.
 *
 * This is the AfriShield company mark (locked direction B, "signal node")
 * scaled up and made live: one centre node, four radiating links. The centre
 * is the client's site; the outer nodes are the surfaces people actually find
 * them on. Links draw outward on a stagger, then the outer nodes breathe.
 *
 * Geometry is the mark's own proportions from the company guidelines, scaled
 * 10x from its 48px artboard — not redrawn by eye.
 */

const CENTRE = { x: 240, y: 240 };

const SURFACES = [
  { x: 240, y: 70, label: 'Google Search', anchor: 'middle' as const, dy: -22 },
  { x: 390, y: 160, label: 'AI answers', anchor: 'start' as const, dy: -14 },
  { x: 390, y: 330, label: 'Maps & local', anchor: 'start' as const, dy: 22 },
  { x: 100, y: 370, label: 'Referrals', anchor: 'middle' as const, dy: 26 },
];

export function SignalNode({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 480 480"
      className={className}
      role="img"
      aria-label="One site at the centre, linked outward to Google Search, AI answers, Maps and local, and referrals."
    >
      <defs>
        <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
          {/* Sub-10% green wash — the only place green touches a background. */}
          <stop offset="0%" stopColor="#5CBE91" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#5CBE91" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={CENTRE.x} cy={CENTRE.y} r="200" fill="url(#node-glow)" />

      {SURFACES.map((surface, i) => {
        const length = Math.hypot(surface.x - CENTRE.x, surface.y - CENTRE.y);
        return (
          <g key={surface.label}>
            <motion.line
              x1={CENTRE.x}
              y1={CENTRE.y}
              x2={surface.x}
              y2={surface.y}
              stroke="#5CBE91"
              strokeWidth="1.5"
              strokeDasharray={length}
              initial={reduced ? { strokeDashoffset: 0 } : { strokeDashoffset: length }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.9, delay: 0.25 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.circle
              cx={surface.x}
              cy={surface.y}
              r="8"
              fill="#5CBE91"
              initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: `${surface.x}px ${surface.y}px` }}
            />
            {!reduced && (
              <circle
                cx={surface.x}
                cy={surface.y}
                r="8"
                fill="none"
                stroke="#5CBE91"
                strokeWidth="1.5"
                className="animate-node-pulse"
                style={{
                  transformOrigin: `${surface.x}px ${surface.y}px`,
                  animationDelay: `${i * 0.8}s`,
                }}
              />
            )}
            <text
              x={surface.x}
              y={surface.y + surface.dy}
              textAnchor={surface.anchor}
              className="fill-white/55 font-mono text-[13px] uppercase tracking-[0.1em]"
            >
              {surface.label}
            </text>
          </g>
        );
      })}

      <motion.circle
        cx={CENTRE.x}
        cy={CENTRE.y}
        r="14"
        fill="#5CBE91"
        initial={reduced ? { scale: 1 } : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: `${CENTRE.x}px ${CENTRE.y}px` }}
      />
      <text
        x={CENTRE.x}
        y={CENTRE.y + 44}
        textAnchor="middle"
        className="fill-white font-mono text-[13px] uppercase tracking-[0.1em]"
      >
        Your site
      </text>
    </svg>
  );
}

/** The same mark at logo scale — used in the nav and footer. */
export function SignalNodeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="5" fill="currentColor" />
      <line x1="24" y1="24" x2="24" y2="7" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="7" r="3" fill="currentColor" />
      <line x1="24" y1="24" x2="39" y2="16" stroke="currentColor" strokeWidth="2" />
      <circle cx="39" cy="16" r="3" fill="currentColor" />
      <line x1="24" y1="24" x2="39" y2="33" stroke="currentColor" strokeWidth="2" />
      <circle cx="39" cy="33" r="3" fill="currentColor" />
      <line x1="24" y1="24" x2="10" y2="37" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="37" r="3" fill="currentColor" />
    </svg>
  );
}
