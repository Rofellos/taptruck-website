/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#2b1a0a',
          700: '#7a3e12',
          500: '#c47a2c',
          300: '#e7b981',
          100: '#f6e6c9'
        }
      }
    }
  },
  plugins: []
};
