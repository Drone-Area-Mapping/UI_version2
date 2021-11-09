module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: (theme) => ({
        ...theme("colors"),
        primary: "#5568FE",
        background: "#353434",
        startBtn: "#05FF00",
        stopBtn: "#FF0000",
      }),
      backgroundImage: (theme) => ({
        ...theme("colors"),
        box: "linear-gradient(157.89deg, #585858 2.85%, #272727 99.42%, #726F6F 99.43%)",
      }),
      fontFamily: {
        text: ["Nunito Sans", "sans-serif"],
        heading: ["Quicksand", "sans-serif"],
        title: ["Ubuntu", "sans-serif"],
      },
      borderColor: (theme) => ({
        ...theme("colors"),
        startBtn: "#05FF00",
        stopBtn: "#FF0000",
      }),
    },
  },
  variants: {
    extend: {
      animation: ["hover", "focus"],
    },
  },
  plugins: [],
};
