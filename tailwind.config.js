module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    theme: {
      backgroundColor: (theme) => ({
        ...theme("colors"),
        primary: "#0E123E",
        secondary: "#AF91EB",
        danger: "#e3342f",
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
