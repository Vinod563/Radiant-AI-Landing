/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        radiant: {
          primary: '#0F172A',
          secondary: '#1E40AF',
          accent: '#3B82F6',
          light: '#F8FAFC',
          dark: '#020617',
        },
      },
    },
  },
  plugins: [],
};
