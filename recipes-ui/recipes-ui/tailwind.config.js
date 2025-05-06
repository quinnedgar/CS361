import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Ensure the HTML file is checked
    './src/**/*.{js,ts,jsx,tsx}', // Check for JS/JSX/TS files in the src directory
  ],
  theme: {
    extend: {},
  },
  plugins: [forms],
};
