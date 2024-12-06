/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: { max: '375px' }, // Defines the custom breakpoint for 0px to 375px
      },
      spacing: {
        26: '6.5rem', // Custom width for w-26 (26 x 0.25rem = 6.5rem)
      },
    },
  },
  plugins: [],
}

