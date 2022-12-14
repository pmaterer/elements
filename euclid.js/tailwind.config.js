module.exports = {
  mode: 'jit',
  purge: [
    './dist/**/*.html',
    './src/**/*.{js,jsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        "eb-garamond": ["EB Garamond", "serif"],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["even", "odd"],
    },
  },
  plugins: [],
};
