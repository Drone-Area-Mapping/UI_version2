module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: (theme) => ({
        ...theme("colors"),
        primary: "#5568FE",
        background: "#353434",
      }),
      fontFamily: {
        text: ["Nunito Sans", "sans-serif"],
        heading: ["Quicksand", "sans-serif"],
        title: ["Ubuntu", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover", "focus"],
    },
  },
  plugins: [],
};
