/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        chocolate: '#7B3F00',
        chocolateLight: '#D7A98C',
        background: '#F8F4F0',
      },
    },
  },
  plugins: [],
};
