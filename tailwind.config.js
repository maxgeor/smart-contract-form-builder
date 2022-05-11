const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      gray: colors.slate,
      blue: colors.blue,
    },
    extend: {
      fontFamily: {
        bitter: ['Bitter', 'serif'],
        dm: ['DM Sans', 'sans'],
        karla: ['Karla', 'sans'],
        lora: ['Lora', 'serif'],
        work: ['Work Sans', 'sans'],
      },
    },
  },
  plugins: [],
}
