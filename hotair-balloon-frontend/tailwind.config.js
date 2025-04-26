// tailwind.config.js

// We import the default theme to extend it
import defaultTheme from "tailwindcss/defaultTheme";
import textShadow from "tailwindcss-textshadow";

/** @type {import('tailwindcss').Config} */
export default {
  // Specify the files Tailwind should scan for classes
  content: [
    "./index.html", // Include the root HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS/JSX/TSX files in src
  ],
  theme: {
    extend: {
      // Extend the default font families
      fontFamily: {
        // Set 'Poppins' as the primary sans-serif font, with fallbacks
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      // Extend themes to add text-shadow utilities (using tailwindcss-textshadow plugin)
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color, rgba(0,0,0,0.3))",
        DEFAULT: "0 2px 4px var(--tw-shadow-color, rgba(0,0,0,0.3))", // Allows using just `text-shadow`
        md: "0 3px 6px var(--tw-shadow-color, rgba(0,0,0,0.4))",
        lg: "0 10px 15px var(--tw-shadow-color, rgba(0,0,0,0.4))",
      },
    },
  },
  // Add the text-shadow plugin
  plugins: [textShadow],
};
