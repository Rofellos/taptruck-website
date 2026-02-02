/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
  extend: {
    colors: {
      brand: {
        primary: 'rgb(var(--brand-primary) / <alpha-value>)',
        secondary: 'rgb(var(--brand-secondary) / <alpha-value>)',
        accent: 'rgb(var(--brand-accent) / <alpha-value>)',
      },
      bg: 'rgb(var(--bg) / <alpha-value>)',
      fg: 'rgb(var(--fg) / <alpha-value>)',
    }
  }
},
  plugins: [],
};
