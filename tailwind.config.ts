import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#080806',
          surface: '#1a1916',
          elevated: '#252420',
        },
        ia: {
          text: '#f2ede8',
          secondary: '#a89f94',
          muted: '#6b6560',
          border: '#2d2c29',
          'border-subtle': '#1f1e1b',
          orange: '#e85d04',
          blue: '#4a90d9',
          gold: '#c5b358',
          sage: '#6b8f47',
          concrete: '#8a8278',
          sand: '#d4c5a9',
          rust: '#9b3a1a',
          cream: '#f2eee5',
          paper: '#faf8f2',
          ink: '#11110e',
          cave: '#1a1915',
          leaf: '#23362a',
          moss: '#6f7f61',
          earth: '#9a754e',
          plaster: '#d7c49b',
          water: '#afc8c5',
          mist: '#dde3db',
          line: 'rgba(17, 17, 14, 0.16)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Times New Roman', 'serif'],
        editorial: ['var(--font-editorial)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        body: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(4rem,10vw,9rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem,6vw,5.5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.75rem,4vw,3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.1em' }],
      },
      spacing: {
        section: '8rem',
        'section-sm': '4rem',
      },
      borderRadius: {
        DEFAULT: '2px',
        sm: '1px',
        md: '4px',
        lg: '6px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        scan: 'scan 8s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}

export default config
