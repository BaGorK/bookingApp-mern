/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    container: {
      padding: {
        md: '10rem' /*you're setting the padding property for medium (md) screens to 10rem. */,
      },
    },
  },
  plugins: [],
};
