/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-dark':      '#010F1E',
        'brand-secondary': '#051A30',
        'brand-deep':      '#000A14',
        'brand-green':     '#91C46B',
        'brand-green-dark':'#6FA043',
        'brand-orange':    '#F0974E',
        'brand-purple':    '#596AE0',
        'brand-violet':    '#a855f7',
        'brand-red':       '#F05030',
        'brand-teal':      '#2DD4BF',
        'brand-success':   '#00c87d',
        'mac-red':         '#ff5f57',
        'mac-yellow':      '#febc2e',
        'mac-green':       '#28c840',
        'text-primary':    '#F0F4F8',
        'text-secondary':  '#94A3B8',
        'text-muted':      '#8899AA',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(4rem,8vw,7.5rem)',   { lineHeight:'0.95', letterSpacing:'-0.03em' }],
        'display-xl':  ['clamp(3rem,6vw,5.5rem)',   { lineHeight:'1.0',  letterSpacing:'-0.025em' }],
        'display-lg':  ['clamp(2.2rem,4.5vw,4rem)', { lineHeight:'1.05', letterSpacing:'-0.02em' }],
        'display-md':  ['clamp(1.6rem,3vw,2.8rem)', { lineHeight:'1.1',  letterSpacing:'-0.015em' }],
      },
      borderRadius: {
        'sm':  '6px',
        'md':  '10px',
        'lg':  '16px',
        'xl':  '24px',
        '2xl': '32px',
      },
      keyframes: {
        pulse2:   { '0%,100%': { opacity:1, transform:'scale(1)' },      '50%': { opacity:0.5, transform:'scale(0.8)' } },
        fadeUp:   { from: { opacity:0, transform:'translateY(32px)' },   to: { opacity:1, transform:'translateY(0)' } },
        shimmer:  { '0%': { transform:'translateX(-100%)' },             '100%': { transform:'translateX(100%)' } },
        float:    { '0%,100%': { transform:'translateY(0)' },            '50%': { transform:'translateY(-8px)' } },
        lineGrow: { from: { transform:'scaleX(0)' },                     to: { transform:'scaleX(1)' } },
      },
      animation: {
        'pulse2':    'pulse2 2s ease-in-out infinite',
        'fade-up':   'fadeUp 0.7s ease forwards',
        'shimmer':   'shimmer 2.5s infinite',
        'float':     'float 4s ease-in-out infinite',
        'line-grow': 'lineGrow 1.2s ease forwards',
      },
    },
  },
  plugins: [],
}
