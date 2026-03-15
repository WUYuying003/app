/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Darker Grotesque', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive'],
      },
      colors: {
        brand: {
          gold: '#F5B720',
          orange: '#F09628',
          dark: '#1A1A1A',
          body: '#374151',
        },
      },
      borderRadius: {
        pill: '9999px',
        card: '18px',
      },
    },
  },
  plugins: [],
}
