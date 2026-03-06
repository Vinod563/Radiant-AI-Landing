/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#91C46B',
          'green-dark': '#598C33',
          lime: '#C7DD75',
        },
        teal: {
          dark: '#044862',
          navy: '#09465D',
          deep: '#11174F',
          border: '#588596',
        },
        accent: {
          blue: '#6173DE',
          purple: '#596AE0',
          orange: '#F0974E',
        },
        surface: {
          white: '#FFFFFF',
          cyan: '#F4F9FC',
          gray: '#F5F8F9',
          lavender: '#EFE7FC',
          peach: '#FADFC8',
          'off-blue': '#F1F5FE',
          'pale-green': '#DAFFE4',
        },
        content: {
          primary: '#303133',
          dark: '#313638',
          black: '#101828',
          body: '#4D5355',
          paragraph: '#475467',
          secondary: '#5F6466',
          muted: '#A3A3A3',
        },
        border: {
          light: '#E2E4E4',
          subtle: '#D7DEE3',
          blue: '#DBEEFF',
          teal: '#588596',
        },
      },
      fontFamily: {
        primary: ['Poppins', 'sans-serif'],
        secondary: ['Inter', 'sans-serif'],
        fallback: ['Raleway', 'sans-serif'],
      },
      boxShadow: {
        card: '1px 8px 24px 0px rgba(197,197,197,0.25)',
        'mega-menu': '0px 7px 9px rgba(4,38,50,0.11)',
        sm: '0px 4px 7px rgba(0,0,0,0.1)',
        lg: '0px 17px 31px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        pill: '30px',
        button: '20px',
        card: '16px',
      },
    },
  },
  plugins: [],
};
