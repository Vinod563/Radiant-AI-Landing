/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'mag-white':       '#FFFFFF',
        'mag-off':         '#FAFAFA',
        'mag-cream':       '#F5F3EF',
        'mag-light':       '#EDEBE7',
        'mag-border':      '#E2E0DC',
        'mag-muted':       '#9B9590',
        'mag-body':        '#5C5651',
        'mag-heading':     '#1A1714',
        'mag-black':       '#0D0B09',
        'brand-green':     '#91C46B',
        'brand-green-dark':'#6FA043',
        'brand-orange':    '#F0974E',
        'brand-purple':    '#596AE0',
        'brand-dark':      '#0D0B09',
        'brand-deep':      '#1A1714',
      },
      fontFamily: {
        heading: ['"Manrope"', 'system-ui', 'sans-serif'],
        display: ['"Manrope"', 'system-ui', 'sans-serif'],
        sans:    ['"Manrope"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'hero':      ['clamp(3.85rem, 8.4vw, 7.7rem)',   { lineHeight: '0.90', letterSpacing: '-0.04em' }],
        'display':   ['clamp(3.5rem, 7vw, 6.5rem)',    { lineHeight: '0.93', letterSpacing: '-0.03em' }],
        'title':     ['clamp(2rem, 4vw, 3.5rem)',     { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'subtitle':  ['clamp(1.4rem, 2.5vw, 2rem)',   { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      borderRadius: {
        'sm':  '6px',
        'md':  '10px',
        'lg':  '16px',
        'xl':  '24px',
        '2xl': '32px',
        '3xl': '40px',
      },
      keyframes: {
        'fade-in':   { from: { opacity: 0 }, to: { opacity: 1 } },
        'slide-up':  { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        'marquee':   { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        'fade-in':   'fade-in 0.8s ease forwards',
        'slide-up':  'slide-up 0.8s ease forwards',
        'marquee':   'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
}
