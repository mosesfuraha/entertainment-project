/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Include TypeScript since you're likely using Angular
  ],
  theme: {
    extend: {
      // Custom font family
      fontFamily: {
        outfit: ['"Outfit"', "sans-serif"], // Added the Outfit font
      },
      // Custom colors
      colors: {
        primary: "#FC4747", // Add your primary red color
        dark: "#10141E", // Dark background color
        lightDark: "#161D2F", // Lighter dark background color
        accent: "#FFFFFF", // Accent color (white)
        grayText: "#gray-400", // Lighter gray for text
        blueAccent: "#blue-500", // Blue accent used for borders and focus
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"), // Add the tailwind-scrollbar plugin to enhance scrollbars
  ],
};
