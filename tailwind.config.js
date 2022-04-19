module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#FFFFFF",
          2: "#F1F1F1",
          3: "#FFF9E8",
          4: "#FFC107",
          orange: {
            1: "#FF5722",
          },
          dark: {
            1: "#291E4F",
          },
        },
      },
    },
  },
  plugins: [],
}
