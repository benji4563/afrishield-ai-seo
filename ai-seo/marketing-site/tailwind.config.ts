import type { Config } from 'tailwindcss';

/**
 * Palette is the AfriShield company green scale verbatim — see
 * docs/brand-guidelines.md. No hex value here is invented.
 * Layout tokens (container, section padding) are measured from AgentFlow —
 * see docs/research/AGENTFLOW-CLONE-SPEC.md.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#EAF7F1',
          100: '#C7EBDA',
          200: '#93D8B7',
          300: '#5CBE91',
          400: '#34A374',
          500: '#1D8A5C',
          600: '#0F7248',
          700: '#0A5936',
          800: '#073F27',
          900: '#04271A',
        },
        ink: '#14140F', // neutral.900 — dark section surface
        bone: '#F4F3EE', // neutral.100 — light section surface
        slate: '#5B5A52', // secondary text on light
        mute: '#8B8A80', // tertiary text on light
      },
      fontFamily: {
        display: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // AgentFlow H1 56px / lh 1.1 → fluid, brand weight 700
        h1: ['clamp(2.375rem, 6vw, 3.5rem)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.875rem, 4.6vw, 3rem)', { lineHeight: '1.08', letterSpacing: '-0.018em' }],
        h3: ['clamp(1.125rem, 2vw, 1.375rem)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        lead: ['1.0625rem', { lineHeight: '1.65' }],
        body: ['1rem', { lineHeight: '1.65' }],
        small: ['0.8125rem', { lineHeight: '1.6' }],
        label: ['0.75rem', { lineHeight: '1', letterSpacing: '0.1em' }],
      },
      maxWidth: {
        container: '1264px', // measured
        prose: '68ch',
      },
      spacing: {
        section: '120px', // measured
        'section-sm': '80px',
      },
      borderRadius: {
        // AgentFlow buttons measured at border-radius: 0 — the sharp edge is
        // part of the look. Cards get a small radius only.
        card: '4px',
      },
      keyframes: {
        'marquee-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        'node-pulse': {
          '0%, 100%': { opacity: '0.25', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.25)' },
        },
        'signal-travel': {
          from: { strokeDashoffset: 'var(--dash)' },
          to: { strokeDashoffset: '0' },
        },
        'rise-in': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'marquee-left': 'marquee-left 42s linear infinite',
        'marquee-right': 'marquee-right 42s linear infinite',
        'node-pulse': 'node-pulse 3.2s ease-in-out infinite',
        'rise-in': 'rise-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
