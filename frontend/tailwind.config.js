module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'odd', 'even'],
      borderColor: ['hover'],
      scale: ["hover"]
    }
  },
  plugins: [],
}
