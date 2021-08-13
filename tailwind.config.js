module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Roboto"'],
        poppin: ['"Poppins"'],
      },
    },
    boxShadow: {
      default: "0 2px 12px rgba(0, 0, 0, 0.4)",
    },
  },
  variants: {
    backgroundColor: ({ after }) => after(["disabled"]),
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
};
